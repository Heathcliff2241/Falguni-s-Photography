import fs from 'fs';
import path from 'path';
import { BookingInquiry, ConversationTranscript } from '../types';

const DATA_DIR = path.resolve(process.cwd(), 'data');
const INQUIRIES_FILE = path.join(DATA_DIR, 'inquiries.json');
const TRANSCRIPTS_FILE = path.join(DATA_DIR, 'transcripts.json');

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  try {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  } catch (e) {
    console.warn('Could not create data directory:', e);
  }
}

// Initial seed data with realistic sample reviews if empty
function loadInquiries(): BookingInquiry[] {
  try {
    if (fs.existsSync(INQUIRIES_FILE)) {
      const content = fs.readFileSync(INQUIRIES_FILE, 'utf-8');
      return JSON.parse(content);
    }
  } catch (e) {
    console.warn('Error reading inquiries file:', e);
  }
  return [];
}

function saveInquiries(inquiries: BookingInquiry[]) {
  try {
    fs.writeFileSync(INQUIRIES_FILE, JSON.stringify(inquiries, null, 2), 'utf-8');
  } catch (e) {
    console.warn('Error writing inquiries file:', e);
  }
}

function loadTranscripts(): ConversationTranscript[] {
  try {
    if (fs.existsSync(TRANSCRIPTS_FILE)) {
      const content = fs.readFileSync(TRANSCRIPTS_FILE, 'utf-8');
      return JSON.parse(content);
    }
  } catch (e) {
    console.warn('Error reading transcripts file:', e);
  }
  return [];
}

function saveTranscripts(transcripts: ConversationTranscript[]) {
  try {
    fs.writeFileSync(TRANSCRIPTS_FILE, JSON.stringify(transcripts, null, 2), 'utf-8');
  } catch (e) {
    console.warn('Error writing transcripts file:', e);
  }
}

let inMemoryInquiries: BookingInquiry[] = loadInquiries();
let inMemoryTranscripts: ConversationTranscript[] = loadTranscripts();

export function addInquiry(inquiry: Omit<BookingInquiry, 'id' | 'createdAt' | 'status'>): BookingInquiry {
  const newInquiry: BookingInquiry = {
    ...inquiry,
    id: 'inq_' + Date.now() + '_' + Math.random().toString(36).substring(2, 6),
    createdAt: new Date().toISOString(),
    status: 'new'
  };

  inMemoryInquiries.unshift(newInquiry);
  saveInquiries(inMemoryInquiries);
  return newInquiry;
}

export function getAllInquiries(): BookingInquiry[] {
  return inMemoryInquiries;
}

export function saveConversationTranscript(transcript: ConversationTranscript): void {
  const existingIdx = inMemoryTranscripts.findIndex(t => t.id === transcript.id);
  if (existingIdx >= 0) {
    inMemoryTranscripts[existingIdx] = transcript;
  } else {
    inMemoryTranscripts.unshift(transcript);
  }
  saveTranscripts(inMemoryTranscripts);
}

export function getAllTranscripts(): ConversationTranscript[] {
  return inMemoryTranscripts;
}

// Server-side Resend Email Notification
export async function sendAdminNotificationEmail(payload: {
  visitorName: string;
  sessionType: string;
  timeframeOrDueDate: string;
  contactEmail: string;
  contactPhone?: string;
  summary?: string;
  source: string;
}): Promise<boolean> {
  const adminEmail = process.env.ADMIN_NOTIFICATION_EMAIL || 'falguni.studio@example.com';
  const apiKey = process.env.RESEND_API_KEY;

  console.log(`[Notification] Preparing email for Admin: ${adminEmail} regarding session: ${payload.sessionType} by ${payload.visitorName}`);

  if (!apiKey) {
    console.log('[Notification] RESEND_API_KEY not configured. Inquiries logged safely to server database.');
    return true;
  }

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: "Falguni's Photography Inquiries <inquiries@falguniphotography.com.au>",
        to: adminEmail,
        subject: `New Booking Inquiry: ${payload.sessionType} — ${payload.visitorName}`,
        html: `
          <div style="font-family: sans-serif; color: #362E2B; padding: 20px; line-height: 1.6;">
            <h2 style="color: #6E4E53; font-family: serif;">New Studio Inquiry Received</h2>
            <p><strong>Visitor:</strong> ${payload.visitorName}</p>
            <p><strong>Session:</strong> ${payload.sessionType}</p>
            <p><strong>Due Date / Timeframe:</strong> ${payload.timeframeOrDueDate}</p>
            <p><strong>Email:</strong> ${payload.contactEmail}</p>
            <p><strong>Phone:</strong> ${payload.contactPhone || 'Not provided'}</p>
            <p><strong>Source:</strong> ${payload.source === 'willow_assistant' ? 'Willow AI Assistant' : 'Booking Form'}</p>
            ${payload.summary ? `<p><strong>Notes/Summary:</strong><br>${payload.summary}</p>` : ''}
            <hr style="border: none; border-top: 1px solid #EAD3CE; margin: 20px 0;">
            <p style="font-size: 12px; color: #9CAA8C;">Falguni's Photography &middot; 26 South Pkwy, Northfield SA 5085</p>
          </div>
        `,
      }),
    });

    if (!res.ok) {
      const errBody = await res.text();
      console.warn('[Resend Email Notice]:', res.status, errBody);
      return false;
    }

    console.log('[Resend Email]: Notification successfully dispatched.');
    return true;
  } catch (err) {
    console.warn('[Resend Email Exception]:', err);
    return false;
  }
}
