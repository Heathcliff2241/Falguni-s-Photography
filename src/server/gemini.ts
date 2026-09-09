import { GoogleGenAI } from '@google/genai';

let aiClient: GoogleGenAI | null = null;

function getAiClient(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return null;
  }
  if (!aiClient) {
    aiClient = new GoogleGenAI({ apiKey });
  }
  return aiClient;
}

const WILLOW_SYSTEM_INSTRUCTION = `
You are Willow, the assistant for Falguni's Photography, a boutique newborn, maternity, family and cake smash photography studio in Lightsview, Adelaide, South Australia.

Persona & Voice:
- Warm, gentle, unhurried tone that mirrors the studio's own approach.
- Never pushy, never rapid-fire, never promotional.
- Speak like a calm friend who knows the booking process well, not a corporate chatbot.
- Never use em dashes. Never use corporate marketing jargon.

Studio Facts:
- Studio: Home studio in Lightsview / Northfield, Adelaide, run by Falguni and her husband.
- Atmosphere: Calm, patient, 2-hour sessions moving at baby's own pace with time for feeding and settling breaks.
- Pricing: Every session package starts at $300. A non-refundable deposit secures the date.
- Newborn Photography: Best window is 5 to 20 days old when babies sleep deepest. Includes two wrap outfits, six fully edited photos, and optional shots with parents.
- Maternity Photography: Best between 28 and 34 weeks. 90-minute session, wardrobe guidance, partner and siblings welcome.
- Family & Sitter Photography: Relaxed interaction for families or sitting babies (6 to 9 months). Studio or nearby outdoor location in north-east Adelaide. Up to 5 people included.
- Cake Smash Photography: First birthday milestone, 45 minutes, backdrop and studio cleanup included, optional warm bath setup.
- Address: 26 South Pkwy, Northfield SA 5085, Australia.
- Phone: +61 469 753 238.
- Reputation: 5.0 stars across 60 Google reviews praising patience, calm, and welcoming care.

Booking Intake Flow:
Answer any visitor questions directly and calmly using the facts above. When the visitor shows interest in booking or checking dates, collect these data points ONE AT A TIME (do not ask for all 5 at once):
1. Name
2. Session type (newborn, maternity, family, or cake smash)
3. Baby's due date or current age
4. Preferred date range or weekday/weekend preference
5. Email or phone for follow-up

Once all details are gathered, hand off warmly with this exact phrase:
"Thanks, I have passed your details along to Falguni. She will follow up within a day or two to confirm your date."
`;

export async function askWillow(messages: { sender: string; text: string }[]): Promise<string> {
  const client = getAiClient();
  if (!client) {
    // Intelligent gentle fallback if key not configured
    const lastMsg = messages[messages.length - 1]?.text?.toLowerCase() || '';
    if (lastMsg.includes('price') || lastMsg.includes('cost')) {
      return "Every session at Falguni's home studio starts at $300, which includes a gentle two-hour session, two wrap outfit changes, and six fully edited photos. Would you like to check dates around your timeframe?";
    }
    if (lastMsg.includes('when') || lastMsg.includes('newborn')) {
      return "The sweet spot for newborn photos is between five and twenty days old, when babies curl up smallest and sleep deepest. Do you have a due date in mind?";
    }
    return "Falguni's home studio in Lightsview is built entirely around patience and moving at your baby's pace. What kind of session are you thinking about?";
  }

  try {
    // Format conversation history for Gemini
    const contents = messages.map(m => ({
      role: m.sender === 'user' ? 'user' : 'model',
      parts: [{ text: m.text }]
    }));

    const response = await client.models.generateContent({
      model: 'gemini-3.8-flash',
      contents,
      config: {
        systemInstruction: WILLOW_SYSTEM_INSTRUCTION,
        temperature: 0.6,
        maxOutputTokens: 300,
      }
    });

    const reply = response.text?.trim();
    return reply || "Thanks for your message. Falguni would love to help capture these early days. Would you like to share your baby's due date or age?";
  } catch (error) {
    console.warn('[Gemini API Willow error]:', error);
    return "Falguni's home studio in Lightsview welcomes babies and families with unhurried patience. Every session starts at $300. Would you like to let us know your preferred timeframe?";
  }
}

export interface ExtractedBooking {
  isBookingIntent: boolean;
  isReadyToBook: boolean;
  name?: string;
  email?: string;
  phone?: string;
  sessionType?: string;
  timeframeOrDueDate?: string;
  preferredDates?: string;
  notes?: string;
}

/**
 * Extracts booking details from the chat messages either via Gemini structured JSON
 * or heuristic regex fallback if Gemini is unavailable.
 */
export async function extractBookingFromChat(messages: { sender: string; text: string }[]): Promise<ExtractedBooking> {
  const fullText = messages.map(m => `${m.sender}: ${m.text}`).join('\n');
  const userTexts = messages.filter(m => m.sender === 'user').map(m => m.text).join(' ');

  // Heuristic extraction
  const emailMatch = fullText.match(/\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b/);
  const phoneMatch = fullText.match(/(?:\+?61|0)[2-478](?:[ -]?[0-9]){8}\b/) || fullText.match(/\b04[0-9]{2}[ -]?[0-9]{3}[ -]?[0-9]{3}\b/) || fullText.match(/\b\d{8,12}\b/);
  
  let detectedSession = 'Newborn Photography';
  const lowerUser = userTexts.toLowerCase();
  if (lowerUser.includes('maternity') || lowerUser.includes('bump') || lowerUser.includes('pregnancy')) {
    detectedSession = 'Maternity Photography';
  } else if (lowerUser.includes('cake') || lowerUser.includes('smash') || lowerUser.includes('first birthday')) {
    detectedSession = 'Cake Smash Photography';
  } else if (lowerUser.includes('family') || lowerUser.includes('sitter') || lowerUser.includes('toddler')) {
    detectedSession = 'Family Photography';
  }

  const client = getAiClient();
  if (client && messages.length >= 3 && (emailMatch || lowerUser.includes('book') || lowerUser.includes('due date'))) {
    try {
      const prompt = `Analyze this customer chat with Willow, the photography studio assistant for Falguni's Photography in Adelaide.
Extract the booking details into JSON with these exact keys:
{
  "isBookingIntent": boolean,
  "isReadyToBook": boolean (true if at least an email or phone AND a name or timeframe/session are found),
  "name": string or null,
  "email": string or null,
  "phone": string or null,
  "sessionType": "Newborn Photography" | "Maternity Photography" | "Family Photography" | "Cake Smash Photography",
  "timeframeOrDueDate": string or null,
  "preferredDates": string or null,
  "notes": string or null
}

Chat transcript:
${fullText}

Return ONLY valid raw JSON, without markdown blocks.`;

      const result = await client.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: [{ role: 'user', parts: [{ text: prompt }] }],
        config: {
          temperature: 0.1,
          responseMimeType: 'application/json',
        }
      });

      const parsed = JSON.parse(result.text || '{}');
      return {
        isBookingIntent: Boolean(parsed.isBookingIntent || emailMatch),
        isReadyToBook: Boolean(parsed.isReadyToBook || (parsed.email && parsed.sessionType)),
        name: parsed.name || (emailMatch ? 'Studio Client' : undefined),
        email: parsed.email || emailMatch?.[0],
        phone: parsed.phone || phoneMatch?.[0],
        sessionType: parsed.sessionType || detectedSession,
        timeframeOrDueDate: parsed.timeframeOrDueDate || 'To be confirmed with Falguni',
        preferredDates: parsed.preferredDates || undefined,
        notes: parsed.notes || fullText,
      };
    } catch (e) {
      console.warn('[Booking Extraction Gemini Error]:', e);
    }
  }

  // Fast deterministic fallback
  const isReady = Boolean(emailMatch);
  return {
    isBookingIntent: isReady || lowerUser.includes('book') || lowerUser.includes('session'),
    isReadyToBook: isReady,
    name: isReady ? 'Studio Client' : undefined,
    email: emailMatch?.[0],
    phone: phoneMatch?.[0],
    sessionType: detectedSession,
    timeframeOrDueDate: 'Captured via chat session',
    notes: fullText,
  };
}
