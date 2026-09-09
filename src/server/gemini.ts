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
"Thanks — I've passed your details along to Falguni. She'll follow up within a day or two to confirm your date."
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
        maxOutputTokens: 250,
      }
    });

    const reply = response.text?.trim();
    return reply || "Thanks for your message. Falguni would love to help capture these early days. Would you like to share your baby's due date or age?";
  } catch (error) {
    console.warn('[Gemini API Willow error]:', error);
    return "Falguni's home studio in Lightsview welcomes babies and families with unhurried patience. Every session starts at $300. Would you like to let us know your preferred timeframe?";
  }
}
