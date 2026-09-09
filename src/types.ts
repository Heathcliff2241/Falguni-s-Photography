export type ServiceType = 
  | 'newborn'
  | 'maternity'
  | 'family'
  | 'cake-smash';

export interface SectionData {
  section_name: string;
  heading_tag: 'h1' | 'h2' | 'h3';
  headline: string;
  subheadline?: string;
  body_copy: string;
  cta_text?: string;
  image_source?: string;
  image_alt_text?: string;
  seo_notes?: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface PageData {
  name: string;
  url: string;
  purpose: string;
  meta_title: string;
  meta_description: string;
  sections: SectionData[];
  faq_block: FaqItem[];
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
}

export interface BookingInquiry {
  id: string;
  createdAt: string;
  name: string;
  email: string;
  phone?: string;
  sessionType: string;
  timeframeOrDueDate: string;
  preferredDates?: string;
  notes?: string;
  source: 'form' | 'willow_assistant';
  transcriptSummary?: string;
  status: 'new' | 'contacted' | 'booked';
}

export interface ConversationTranscript {
  id: string;
  createdAt: string;
  inquiryId?: string;
  visitorName?: string;
  sessionType?: string;
  summary?: string;
  messages: ChatMessage[];
}
