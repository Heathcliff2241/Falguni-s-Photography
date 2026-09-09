import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import dotenv from "dotenv";

dotenv.config();

import { askWillow } from "./src/server/gemini";
import { 
  addInquiry, 
  getAllInquiries, 
  saveConversationTranscript, 
  getAllTranscripts, 
  sendAdminNotificationEmail 
} from "./src/server/store";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Health check endpoint
  app.get("/api/health", (_req, res) => {
    res.json({ status: "ok", studio: "Falguni's Photography", suburb: "Lightsview, Adelaide" });
  });

  // Willow Assistant Chat endpoint
  app.post("/api/assistant/chat", async (req, res) => {
    try {
      const { conversationId, messages, latestMessage } = req.body;
      const reply = await askWillow(messages || []);

      const convId = conversationId || ('conv_' + Date.now());
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

      // If handoff confirmation phrase is triggered, dispatch admin notification
      if (reply.includes("passed your details along to Falguni")) {
        const fullChat = updatedMessages.map((m: any) => `${m.sender}: ${m.text}`).join("\n");
        await sendAdminNotificationEmail({
          visitorName: "Willow Chat Visitor",
          sessionType: "Studio Session Inquiry",
          timeframeOrDueDate: "Captured via chat",
          contactEmail: "See transcript in portal",
          summary: fullChat,
          source: "willow_assistant",
        });
      }

      res.json({ reply });
    } catch (e: any) {
      console.error("[Willow Chat Error]:", e);
      res.status(500).json({ error: e.message || "Failed to process chat" });
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

      // Dispatch Resend email notification server-side to ADMIN_NOTIFICATION_EMAIL
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

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Falguni's Photography server running on http://localhost:${PORT}`);
  });
}

startServer();
