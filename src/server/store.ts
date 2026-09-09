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

import { sendBookingNotificationEmail } from './mailer';

// Server-side Email Notification (supports Nodemailer Gmail SMTP and Resend)
export async function sendAdminNotificationEmail(payload: {
  visitorName: string;
  sessionType: string;
  timeframeOrDueDate: string;
  contactEmail: string;
  contactPhone?: string;
  summary?: string;
  source: string;
}): Promise<boolean> {
  return await sendBookingNotificationEmail(payload);
}
