import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

import { askWillow, extractBookingFromChat } from "./gemini";
import { 
  addInquiry, 
  getAllInquiries, 
  saveConversationTranscript, 
  getAllTranscripts, 
  sendAdminNotificationEmail 
} from "./store";

const app = express();

// Enable CORS for cross-origin requests (e.g. from Vercel preview or custom domains)
app.use(cors({
  origin: true,
  credentials: true,
}));

app.use(express.json());

// Track conversations that have already triggered a completed booking inquiry to prevent duplicates
const bookedConversations = new Set<string>();

// Health check endpoint
app.get("/api/health", (_req, res) => {
  res.json({ 
    status: "ok", 
    studio: "Falguni's Photography", 
    suburb: "Lightsview, Adelaide",
    geminiConfigured: !!process.env.GEMINI_API_KEY,
    emailConfigured: !!(process.env.SMTP_USER || process.env.RESEND_API_KEY),
  });
});

// Willow Assistant Chat endpoint with proactive booking detection
app.post("/api/assistant/chat", async (req, res) => {
  try {
    const { conversationId, messages, latestMessage } = req.body;
    const convId = conversationId || ('conv_' + Date.now());
    const reply = await askWillow(messages || []);

    const updatedMessages = [
      ...(messages || []),
      {
        id: 'bot_' + Date.now(),
        sender: 'assistant' as const,
        text: reply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ];

    saveConversationTranscript({
      id: convId,
      createdAt: new Date().toISOString(),
      summary: latestMessage || "Inquiry chat",
      messages: updatedMessages,
    });

    // Analyze if the chat has sufficient booking details (name/email/session)
    let bookingCreated = false;
    let createdInquiry = null;

    const extracted = await extractBookingFromChat(updatedMessages);
    const isHandoffPhrase = reply.toLowerCase().includes("passed your details") || 
                           reply.toLowerCase().includes("follow up within a day") ||
                           reply.toLowerCase().includes("confirm your date");

    if ((extracted.isReadyToBook || isHandoffPhrase) && !bookedConversations.has(convId) && extracted.email) {
      bookedConversations.add(convId);
      
      const fullChat = updatedMessages.map((m: any) => `${m.sender}: ${m.text}`).join("\n");
      createdInquiry = addInquiry({
        name: extracted.name || 'Studio Client',
        email: extracted.email,
        phone: extracted.phone,
        sessionType: extracted.sessionType || 'Newborn Photography',
        timeframeOrDueDate: extracted.timeframeOrDueDate || 'Confirmed via Willow chat',
        preferredDates: extracted.preferredDates,
        notes: `[Booked via Willow Chatbot]\n${extracted.notes || fullChat}`,
        source: 'willow_assistant',
      });

      // Dispatch email notification via Nodemailer (Gmail SMTP) / Resend
      await sendAdminNotificationEmail({
        visitorName: createdInquiry.name,
        sessionType: createdInquiry.sessionType,
        timeframeOrDueDate: createdInquiry.timeframeOrDueDate,
        contactEmail: createdInquiry.email,
        contactPhone: createdInquiry.phone,
        summary: fullChat,
        source: "willow_assistant",
      });

      bookingCreated = true;
    }

    res.json({ 
      reply, 
      bookingCreated, 
      inquiry: createdInquiry,
      extracted: extracted.isBookingIntent ? extracted : undefined
    });
  } catch (e: any) {
    console.error("[Willow Chat Error]:", e);
    res.status(500).json({ error: e.message || "Failed to process chat" });
  }
});

// Direct In-Chat Booking endpoint (for 1-click booking card inside chat)
app.post("/api/assistant/book", async (req, res) => {
  try {
    const { conversationId, name, email, phone, sessionType, timeframeOrDueDate, notes } = req.body;
    if (!name || !email || !sessionType) {
      return res.status(400).json({ error: "Name, email, and session type are required to book." });
    }

    const inquiry = addInquiry({
      name,
      email,
      phone,
      sessionType,
      timeframeOrDueDate: timeframeOrDueDate || "Not specified",
      notes: notes ? `[Direct In-Chat Booking] ${notes}` : "[Direct In-Chat Booking]",
      source: "willow_assistant",
    });

    if (conversationId) {
      bookedConversations.add(conversationId);
    }

    // Send Gmail SMTP notification immediately
    await sendAdminNotificationEmail({
      visitorName: name,
      sessionType,
      timeframeOrDueDate: timeframeOrDueDate || "Not specified",
      contactEmail: email,
      contactPhone: phone,
      summary: notes || "Submitted directly through Willow chatbot booking form",
      source: "willow_assistant",
    });

    res.json({ success: true, inquiry });
  } catch (e: any) {
    console.error("[Chat Booking Error]:", e);
    res.status(500).json({ error: e.message || "Failed to book session from chat" });
  }
});

// Booking inquiry endpoint
app.post("/api/inquiry", async (req, res) => {
  try {
    const { name, email, phone, sessionType, timeframeOrDueDate, preferredDates, notes, source } = req.body;
    if (!name || !email || !sessionType) {
      return res.status(400).json({ error: "Name, email, and session type are required." });
    }

    const inquiry = addInquiry({
      name,
      email,
      phone,
      sessionType,
      timeframeOrDueDate: timeframeOrDueDate || "Not specified",
      preferredDates,
      notes,
      source: source || "form",
    });

    // Dispatch Resend/SMTP email notification server-side to ADMIN_NOTIFICATION_EMAIL
    await sendAdminNotificationEmail({
      visitorName: name,
      sessionType,
      timeframeOrDueDate: timeframeOrDueDate || "Not specified",
      contactEmail: email,
      contactPhone: phone,
      summary: notes,
      source: source || "form",
    });

    res.json({ success: true, inquiry });
  } catch (e: any) {
    console.error("[Inquiry Error]:", e);
    res.status(500).json({ error: e.message || "Failed to submit inquiry" });
  }
});

// Admin Data endpoint
app.get("/api/admin/data", (_req, res) => {
  res.json({
    inquiries: getAllInquiries(),
    transcripts: getAllTranscripts(),
  });
});

export default app;
