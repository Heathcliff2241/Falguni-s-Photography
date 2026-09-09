import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";
import nodemailer from "nodemailer";

dotenv.config();

const app = express();

// Enable CORS for frontend cross-origin requests
app.use(cors({
  origin: true,
  credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Initialize Gemini API Client
const apiKey = process.env.GEMINI_API_KEY;
let ai: GoogleGenAI | null = null;

if (apiKey) {
  ai = new GoogleGenAI({
    apiKey: apiKey,
  });
}

// In-memory store for inquiries and conversation transcripts
export interface StoredInquiry {
  id: string;
  createdAt: string;
  name: string;
  email: string;
  phone?: string;
  sessionType: string;
  timeframeOrDueDate: string;
  notes?: string;
  status: "new" | "contacted" | "booked";
  source: string;
}

const inMemoryInquiries: StoredInquiry[] = [
  {
    id: "inq_welcome_demo",
    createdAt: new Date().toISOString(),
    name: "Demo Parent",
    email: "parent@example.com",
    phone: "0469 753 238",
    sessionType: "Newborn Photography",
    timeframeOrDueDate: "Due next month",
    notes: "Interested in the 2-hour baby-led session with family shots.",
    status: "new",
    source: "willow_assistant",
  },
];

const inMemoryTranscripts: Array<{
  id: string;
  createdAt: string;
  summary: string;
  messages: Array<{ role: string; text: string }>;
}> = [];

// Health check
app.get("/api/health", (_req, res) => {
  res.json({
    status: "ok",
    studio: "Falguni's Photography",
    location: "Lightsview / Northfield, Adelaide, SA",
    model: "gemini-3.5-flash",
    geminiConfigured: !!apiKey,
    smtpConfigured: !!(process.env.SMTP_USER && process.env.SMTP_PASS),
  });
});

// System instruction for Willow at Falguni's Photography
const WILLOW_SYSTEM_INSTRUCTION = `You are Willow, the virtual studio assistant for "Falguni's Photography" in Lightsview / Northfield, Adelaide, South Australia.
Your tone is gentle, calm, warm, patient, and unhurried. Speak like a welcoming, trustworthy friend who knows the studio well.
Never act frantic, corporate, or rushed. Do not use em dashes or corporate marketing jargon.

CRITICAL CONSTRAINT:
- Never use excessive emojis, emoticons, or decorative text symbols in your responses. Keep responses clean, readable, and authentic.

ABOUT THE STUDIO:
- Studio Name: Falguni's Photography
- Address: 26 South Pkwy, Northfield SA 5085 (Lightsview area), Adelaide, South Australia.
- Phone: +61 469 753 238
- Lead Photographer & Owners: Falguni and her husband.
- Philosophy: Unhurried, baby-led sessions. Falguni never rushes. She pauses whenever baby needs feeding, burping, nappy changes, or soothing cuddles.
- Atmosphere: A peaceful, temperature-controlled home studio equipped with soft organic wraps, curated props, and cozy seating for parents.
- Reputation: 5.0 stars across 60+ Google reviews praising Falguni's calm patience, gentle touch, and welcoming care.

SERVICES & PRICING:
1. Newborn Photography (Starts at $300):
   - Best window: 5 to 20 days old when babies sleep deepest and curl into sweet womb poses.
   - Includes: 2-hour relaxed baby-led session, two wrap outfit changes, six fully edited high-resolution digital images.
   - Family & parents: Optional shots with parents are welcomed at no extra charge.
   - A non-refundable deposit secures the date around the due date.
2. Maternity Photography (Starts at $300):
   - Best window: Between 28 and 34 weeks when the bump is beautifully rounded and mum is still comfortable.
   - Includes: 90-minute session, wardrobe guidance, partner and siblings welcome.
3. Family & Sitter Photography (Starts at $300):
   - Ideal for sitting milestones (6 to 9 months) or relaxed family portraits (up to 5 people).
   - In studio or scenic nearby outdoor locations in north-east Adelaide.
4. Cake Smash Photography (Starts at $300):
   - First birthday milestone celebration.
   - Includes: 45-minute fun session, custom backdrop, full studio cleanup, and an optional warm bubble bath splash afterwards.

YOUR GOAL:
1. Reassure expecting and new parents that their baby will be handled with utmost patience, care, and safety.
2. Answer questions about session timing, pricing ($300 starting package), what is included, and studio location.
3. Guide parents gently to schedule or inquire about a session.
4. To book or submit an inquiry, collect:
   - Parent / Client name
   - Email address (for written confirmation and follow-up)
   - Contact phone number
   - Session type (Newborn, Maternity, Family, or Cake Smash)
   - Baby's due date, approximate birth date, or current age
   - Preferred timeframe or weekday/weekend preference
   - Any notes or questions (siblings, special requests)

Once you have gathered these details (or if the user provides their contact details wishing to book), confirm warmly that you have everything Falguni needs, and then append the following EXACT custom text on its own separate line at the very end of your response to trigger the client-side booking summary and email delivery:
[BOOKING_DATA: {"customerName":"ParentName","customerEmail":"EmailAddress","phone":"PhoneNumber","sessionType":"SessionType","timeframeOrDueDate":"DueDateOrTimeframe","notes":"AnyNotes"}]

Ensure all placeholder values inside the JSON are filled with what the user provided. If any details are missing, gently ask for them one at a time, but do not be rigid if they provide contact info and just want Falguni to reach out.

Mention warmly that Falguni will follow up personally within 24 hours to confirm dates and details.`;

// Chat API route for Willow (supports /api/chat and /api/assistant/chat)
const handleChat = async (req: express.Request, res: express.Response) => {
  try {
    const { message, messages, history, latestMessage } = req.body || {};

    const userMessage = (message || latestMessage || (Array.isArray(messages) && messages[messages.length - 1]?.text) || "").trim();

    if (!apiKey || !ai) {
      return res.status(200).json({
        text: "Every session at Falguni's home studio in Lightsview starts at $300 and moves strictly at your baby's pace with plenty of time for feeding and cuddles. You can reach Falguni directly at +61 469 753 238 or share your details here to hold a date around your due date.",
        reply: "Every session at Falguni's home studio in Lightsview starts at $300 and moves strictly at your baby's pace with plenty of time for feeding and cuddles. You can reach Falguni directly at +61 469 753 238 or share your details here to hold a date around your due date.",
      });
    }

    // Format previous messages cleanly
    let formattedHistory: Array<{ role: string; parts: Array<{ text: string }> }> = [];

    if (Array.isArray(history)) {
      formattedHistory = history
        .filter((h) => h && h.parts && Array.isArray(h.parts) && h.parts[0]?.text)
        .map((h) => ({
          role: h.role === "assistant" || h.role === "model" ? "model" : "user",
          parts: [{ text: h.parts[0].text }],
        }));
    } else if (Array.isArray(messages)) {
      formattedHistory = messages
        .slice(0, -1)
        .filter((m) => m && m.text)
        .map((m) => ({
          role: m.sender === "user" || m.role === "user" ? "user" : "model",
          parts: [{ text: m.text }],
        }));
    }

    // Call Gemini 3.5 Flash ONLY
    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: [
        ...formattedHistory,
        { role: "user", parts: [{ text: userMessage || "Hello Willow" }] },
      ],
      config: {
        systemInstruction: WILLOW_SYSTEM_INSTRUCTION,
        temperature: 0.6,
      },
    });

    const replyText =
      response.text?.trim() ||
      "Thank you for reaching out. Falguni's home studio in Lightsview offers calm, unhurried 2-hour sessions starting at $300. Would you like to check dates around your timeframe?";

    // Save transcript in background
    inMemoryTranscripts.unshift({
      id: "conv_" + Date.now(),
      createdAt: new Date().toISOString(),
      summary: userMessage,
      messages: [
        ...formattedHistory.map((h) => ({ role: h.role, text: h.parts[0].text })),
        { role: "user", text: userMessage },
        { role: "model", text: replyText },
      ],
    });

    return res.json({
      text: replyText,
      reply: replyText,
    });
  } catch (error: any) {
    console.error("Gemini API error (gemini-3.5-flash):", error);
    return res.status(200).json({
      text: "Falguni's home studio in Lightsview welcomes newborn, maternity, and family sessions with unhurried patience. Sessions start at $300. Would you like to share your baby's due date or preferred timing?",
      reply: "Falguni's home studio in Lightsview welcomes newborn, maternity, and family sessions with unhurried patience. Sessions start at $300. Would you like to share your baby's due date or preferred timing?",
    });
  }
};

app.post("/api/chat", handleChat);
app.post("/api/assistant/chat", handleChat);

// Booking Email Notification Endpoint using SMTP Nodemailer (supports /api/book and /api/inquiry)
const handleBooking = async (req: express.Request, res: express.Response) => {
  try {
    const body = req.body || {};
    const customerName = body.customerName || body.name || "Client";
    const customerEmail = body.customerEmail || body.email || "";
    const phone = body.phone || body.contactPhone || "";
    const sessionType = body.sessionType || "Newborn Photography";
    const timeframeOrDueDate = body.timeframeOrDueDate || body.time || "To be confirmed";
    const notes = body.notes || body.handlingNotes || "";

    // Store in memory
    const newInquiry: StoredInquiry = {
      id: "inq_" + Date.now() + "_" + Math.random().toString(36).substring(2, 6),
      createdAt: new Date().toISOString(),
      name: customerName,
      email: customerEmail,
      phone,
      sessionType,
      timeframeOrDueDate,
      notes,
      status: "new",
      source: body.source || "willow_assistant",
    };
    inMemoryInquiries.unshift(newInquiry);

    const host = process.env.SMTP_HOST;
    const port = process.env.SMTP_PORT ? parseInt(process.env.SMTP_PORT) : 587;
    const user = process.env.SMTP_USER || process.env.GMAIL_USER;
    const pass = process.env.SMTP_PASS || process.env.GMAIL_APP_PASSWORD;
    const adminEmail = process.env.ADMIN_NOTIFICATION_EMAIL || process.env.ADMIN_EMAIL || user || "falguni.photography@gmail.com";

    if (!host || !user || !pass) {
      console.warn("SMTP credentials not fully configured in environment. Booking recorded in studio dashboard.");
      return res.json({
        success: true,
        emailSent: false,
        simulated: true,
        inquiry: newInquiry,
        message: "Booking received successfully. Recorded in studio dashboard.",
      });
    }

    // Initialize SMTP Transporter
    const transporter = nodemailer.createTransport({
      host,
      port,
      secure: port === 465,
      auth: {
        user,
        pass,
      },
    });

    // HTML Template for Falguni (Admin)
    const adminHtml = `
      <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; padding: 25px; border: 1px solid #EAD3CE; border-radius: 20px; background-color: #FAF5EF; color: #362E2B;">
        <div style="text-align: center; margin-bottom: 25px;">
          <h2 style="color: #6E4E53; font-family: Georgia, serif; font-size: 24px; margin: 0 0 5px 0;">New Studio Booking Inquiry</h2>
          <p style="color: #9CAA8C; font-size: 13px; text-transform: uppercase; letter-spacing: 2px; margin: 0; font-weight: bold;">Falguni's Photography &middot; Lightsview Adelaide</p>
        </div>
        
        <p style="font-size: 15px; line-height: 1.6; color: #554A45;">
          Hi Falguni, Willow has collected a new session inquiry from your website! Here are the client details to follow up:
        </p>
        
        <div style="background-color: #ffffff; padding: 22px; border-radius: 16px; border: 1px solid #EAD3CE; margin: 20px 0;">
          <table style="width: 100%; font-size: 14px; border-collapse: collapse; color: #362E2B;">
            <tr>
              <td style="padding: 8px 0; font-weight: bold; width: 140px; color: #6E4E53;">Client Name:</td>
              <td style="padding: 8px 0; font-weight: bold; font-size: 15px;">${customerName}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #6E4E53;">Session Type:</td>
              <td style="padding: 8px 0; font-weight: bold; color: #6E4E53;">${sessionType}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #6E4E53;">Due Date / Age:</td>
              <td style="padding: 8px 0;">${timeframeOrDueDate}</td>
            </tr>
            <tr style="border-top: 1px solid #f4ece6;">
              <td style="padding: 8px 0; font-weight: bold; color: #6E4E53;">Phone:</td>
              <td style="padding: 8px 0;"><a href="tel:${phone}" style="color: #6E4E53; text-decoration: none; font-weight: bold;">${phone || "Not provided"}</a></td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #6E4E53;">Email:</td>
              <td style="padding: 8px 0;">${customerEmail ? `<a href="mailto:${customerEmail}" style="color: #6E4E53;">${customerEmail}</a>` : "Not provided"}</td>
            </tr>
            <tr style="border-top: 1px solid #f4ece6;">
              <td style="padding: 10px 0 0 0; font-weight: bold; color: #6E4E53; vertical-align: top;">Notes:</td>
              <td style="padding: 10px 0 0 0; color: #554A45; line-height: 1.5;">${notes || "No additional notes provided."}</td>
            </tr>
          </table>
        </div>
        
        <p style="font-size: 12px; color: #8A7B75; text-align: center; margin-top: 25px; border-top: 1px solid #EAD3CE; padding-top: 15px;">
          Sent automatically by Willow Studio Assistant &middot; Falguni's Photography
        </p>
      </div>
    `;

    // Send email to Falguni
    await transporter.sendMail({
      from: `"${customerName} via Willow Assistant" <${user}>`,
      to: adminEmail,
      subject: `📷 New Studio Inquiry: ${customerName} (${sessionType})`,
      html: adminHtml,
      replyTo: customerEmail || undefined,
    });

    // Send confirmation email to Parent (if email provided)
    if (customerEmail && customerEmail.trim() !== "") {
      const clientHtml = `
        <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; padding: 25px; border: 1px solid #EAD3CE; border-radius: 20px; background-color: #FAF5EF; color: #362E2B;">
          <div style="text-align: center; margin-bottom: 25px;">
            <h2 style="color: #6E4E53; font-family: Georgia, serif; font-size: 24px; margin: 0 0 5px 0;">Falguni's Photography</h2>
            <p style="color: #9CAA8C; font-size: 13px; text-transform: uppercase; letter-spacing: 2px; margin: 0; font-weight: bold;">Newborn &middot; Maternity &middot; Family</p>
          </div>
          
          <p style="font-size: 16px; color: #362E2B; line-height: 1.6;">
            Hi ${customerName},
          </p>
          <p style="font-size: 15px; color: #554A45; line-height: 1.6;">
            Thank you so much for reaching out to our home studio! Falguni has received your inquiry for a <strong>${sessionType}</strong> session and will review her calendar to get back to you shortly ${phone ? `at <strong>${phone}</strong>` : `via this email`}.
          </p>
          
          <div style="background-color: #ffffff; padding: 20px; border-radius: 16px; border: 1px solid #EAD3CE; margin: 20px 0;">
            <h3 style="color: #6E4E53; font-family: Georgia, serif; border-bottom: 1px solid #FAF5EF; padding-bottom: 8px; margin-top: 0; font-size: 16px;">
              Your Inquiry Summary
            </h3>
            <table style="width: 100%; font-size: 14px; border-collapse: collapse; color: #362E2B;">
              <tr>
                <td style="padding: 6px 0; font-weight: bold; width: 140px; color: #6E4E53;">Session:</td>
                <td style="padding: 6px 0;">${sessionType} (Starts at $300)</td>
              </tr>
              <tr>
                <td style="padding: 6px 0; font-weight: bold; color: #6E4E53;">Timeframe:</td>
                <td style="padding: 6px 0;">${timeframeOrDueDate}</td>
              </tr>
              <tr>
                <td style="padding: 6px 0; font-weight: bold; color: #6E4E53;">Studio Address:</td>
                <td style="padding: 6px 0;">26 South Pkwy, Northfield SA 5085</td>
              </tr>
            </table>
          </div>

          <p style="font-size: 14px; color: #554A45; line-height: 1.6; text-align: center; border-top: 1px solid #EAD3CE; padding-top: 15px;">
            <strong>Need to speak with Falguni sooner?</strong><br />
            Call or text directly at <strong>+61 469 753 238</strong>.
          </p>
        </div>
      `;

      await transporter.sendMail({
        from: `"Falguni's Photography" <${user}>`,
        to: customerEmail,
        subject: `🌸 Booking Inquiry Received &middot; Falguni's Photography`,
        html: clientHtml,
      });
    }

    res.json({ success: true, emailSent: true, inquiry: newInquiry });
  } catch (err: any) {
    console.error("Nodemailer SMTP error:", err);
    res.status(500).json({ success: false, error: err.message || "Failed to send emails" });
  }
};

app.post("/api/book", handleBooking);
app.post("/api/inquiry", handleBooking);
app.post("/api/assistant/book", handleBooking);

// Admin data endpoint
app.get("/api/admin/data", (_req, res) => {
  res.json({
    inquiries: inMemoryInquiries,
    transcripts: inMemoryTranscripts,
  });
});

export default app;
