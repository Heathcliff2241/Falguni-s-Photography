import React, { useState, useEffect, useRef } from 'react';
import { ChatCircleDots, X, PaperPlaneRight, CalendarCheck, CheckCircle, Sparkle } from '@phosphor-icons/react';
import { ChatMessage } from '../types';
import { getApiUrl } from '../utils/api';

interface WillowAssistantProps {
  onSessionSelect?: (service: string) => void;
}

export const WillowAssistant: React.FC<WillowAssistantProps> = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [hasUnread, setHasUnread] = useState(false);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [conversationId, setConversationId] = useState<string>('');
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [bookingLoading, setBookingLoading] = useState(false);

  // In-chat booking state
  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [sessionType, setSessionType] = useState('Newborn Photography');
  const [timeframe, setTimeframe] = useState('');
  const [bookingNotes, setBookingNotes] = useState('');

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome-1',
      sender: 'assistant',
      text: "Hello, I'm Willow. I help new and expecting parents find the right session with Falguni here in Lightsview. You can ask me questions about pricing, timing, or book a session directly here.",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!conversationId) {
      const id = 'conv_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7);
      setConversationId(id);
    }
  }, [conversationId]);

  // Global event listener to allow other components (like hero CTA or quick checker) to open Willow
  useEffect(() => {
    const handleOpenWillow = (event: any) => {
      setIsOpen(true);
      setHasUnread(false);
      const detail = event?.detail;
      if (detail?.prompt) {
        handleSend(detail.prompt);
      } else if (detail?.openBooking) {
        setShowBookingForm(true);
        if (detail.sessionType) setSessionType(detail.sessionType);
        if (detail.timeframe) setTimeframe(detail.timeframe);
      }
    };

    window.addEventListener('open-willow', handleOpenWillow);
    return () => window.removeEventListener('open-willow', handleOpenWillow);
  }, [conversationId, messages]);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen, showBookingForm, bookingSuccess]);

  const handleSend = async (customText?: string) => {
    const userText = (customText || input).trim();
    if (!userText || isTyping) return;

    // Check if user clicked book prompt
    if (userText.toLowerCase() === "i'd like to book a session" || userText.toLowerCase() === "book a session") {
      setShowBookingForm(true);
    }

    const userMessage: ChatMessage = {
      id: 'user_' + Date.now(),
      sender: 'user',
      text: userText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput('');
    setIsTyping(true);

    try {
      const response = await fetch(getApiUrl('/api/assistant/chat'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          conversationId,
          messages: updatedMessages,
          latestMessage: userText,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to reach assistant server');
      }

      const data = await response.json();
      const botMessage: ChatMessage = {
        id: 'bot_' + Date.now(),
        sender: 'assistant',
        text: data.reply || "Thanks for sharing. Falguni loves working with little ones at their own pace. Would you like to check available dates for your session?",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, botMessage]);

      if (data.bookingCreated) {
        setBookingSuccess(true);
        const confirmMsg: ChatMessage = {
          id: 'bot_confirm_' + Date.now(),
          sender: 'assistant',
          text: `Your booking request has been sent to Falguni. She will check her studio schedule and reply within 24 hours to confirm your date.`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };
        setMessages((prev) => [...prev, confirmMsg]);
      }
    } catch (err) {
      console.warn('Willow chat backend notice:', err);
      let fallback = "Every session at Falguni's home studio starts at $300 and moves strictly at your baby's pace. Would you like to book a date or check timing?";
      if (userText.toLowerCase().includes('price') || userText.toLowerCase().includes('cost')) {
        fallback = "All sessions start at $300. For newborns, that covers a gentle two-hour session, two wrap outfits, and six fully edited photos. Would you like to hold a date?";
      } else if (userText.toLowerCase().includes('when') || userText.toLowerCase().includes('newborn')) {
        fallback = "For newborns, five to twenty days old is the sweet spot when babies sleep deepest. If you'd like, what is your due date so we can note it down for Falguni?";
      }

      setMessages((prev) => [
        ...prev,
        {
          id: 'bot_fallback_' + Date.now(),
          sender: 'assistant',
          text: fallback,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleInChatBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName.trim() || !clientEmail.trim()) return;

    setBookingLoading(true);
    try {
      const res = await fetch(getApiUrl('/api/assistant/book'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          conversationId,
          name: clientName.trim(),
          email: clientEmail.trim(),
          phone: clientPhone.trim(),
          sessionType,
          timeframeOrDueDate: timeframe.trim() || 'Not specified',
          notes: bookingNotes.trim(),
        }),
      });

      if (!res.ok) {
        throw new Error('Could not submit booking');
      }

      setBookingSuccess(true);
      setShowBookingForm(false);

      // Append confirmation to chat
      const confirmMessage: ChatMessage = {
        id: 'bot_booked_' + Date.now(),
        sender: 'assistant',
        text: `Thank you, ${clientName}. Your booking request for a ${sessionType} session (${timeframe || 'flexible date'}) has been sent to Falguni. She will check her studio calendar and reply to ${clientEmail} within 24 hours.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, confirmMessage]);
    } catch (err) {
      console.error('Chat booking error:', err);
      alert('Could not submit booking right now. Please try again or use our contact form.');
    } finally {
      setBookingLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSend();
    }
  };

  const quickPrompts = [
    "Book a session with Falguni",
    "When is the best newborn window?",
    "How much does a session cost?",
    "What is included in $300?",
  ];

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Assistant Modal Window */}
      {isOpen ? (
        <div className="w-[92vw] sm:w-[400px] h-[550px] bg-[#FAF5EF] rounded-[22px] border border-[#EAD3CE] shadow-2xl flex flex-col overflow-hidden text-[#362E2B] animate-in fade-in zoom-in-95 duration-200">
          {/* Header */}
          <div className="bg-[#FAF5EF] px-5 py-3.5 border-b border-[#EAD3CE] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-[#9CAA8C]/25 flex items-center justify-center text-[#6E4E53] font-medium text-sm">
                W
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="font-display text-lg text-[#362E2B] font-medium leading-none">
                    Willow
                  </h3>
                  <span className="inline-flex items-center gap-0.5 text-[10px] text-[#6E4E53] bg-[#EAD3CE]/40 px-1.5 py-0.5 rounded-full font-medium">
                    <Sparkle size={10} weight="fill" />
                    Assistant
                  </span>
                </div>
                <span className="caption-text text-[10px] text-[#9CAA8C]">
                  Falguni's Studio &middot; Lightsview Adelaide
                </span>
              </div>
            </div>
            
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => setShowBookingForm(!showBookingForm)}
                className={`text-xs px-2.5 py-1 rounded-full border transition-colors flex items-center gap-1 ${
                  showBookingForm
                    ? 'bg-[#6E4E53] text-[#FAF5EF] border-[#6E4E53]'
                    : 'border-[#9CAA8C] text-[#6E4E53] hover:bg-[#EAD3CE]/30'
                }`}
                title="Toggle booking intake form"
              >
                <CalendarCheck size={14} weight="regular" />
                <span>{showBookingForm ? 'Chat' : 'Book'}</span>
              </button>

              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 text-[#362E2B]/60 hover:text-[#6E4E53] rounded-full hover:bg-[#EAD3CE]/40 transition-colors"
                aria-label="Close Willow Assistant"
              >
                <X size={18} weight="light" />
              </button>
            </div>
          </div>

          {/* In-Chat Quick Booking Form Overlay/Panel */}
          {showBookingForm ? (
            <div className="flex-1 overflow-y-auto p-4 bg-[#FAF5EF] text-sm">
              <div className="bg-white/80 border border-[#EAD3CE] rounded-xl p-4 shadow-sm space-y-3">
                <div className="border-b border-[#EAD3CE]/60 pb-2">
                  <h4 className="font-display text-base text-[#6E4E53] font-medium">
                    Book Directly with Falguni
                  </h4>
                  <p className="text-xs text-[#362E2B]/70">
                    Sessions start at $300. Falguni will follow up within 24 hours to confirm your date.
                  </p>
                </div>

                <form onSubmit={handleInChatBookingSubmit} className="space-y-2.5">
                  <div>
                    <label className="block text-[11px] font-medium text-[#362E2B]/80 mb-0.5">Your Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Sarah Jenkins"
                      value={clientName}
                      onChange={(e) => setClientName(e.target.value)}
                      className="w-full px-3 py-1.5 text-xs rounded-lg border border-[#EAD3CE] focus:outline-none focus:border-[#9CAA8C] bg-[#FAF5EF]/50"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[11px] font-medium text-[#362E2B]/80 mb-0.5">Email *</label>
                      <input
                        type="email"
                        required
                        placeholder="sarah@example.com"
                        value={clientEmail}
                        onChange={(e) => setClientEmail(e.target.value)}
                        className="w-full px-3 py-1.5 text-xs rounded-lg border border-[#EAD3CE] focus:outline-none focus:border-[#9CAA8C] bg-[#FAF5EF]/50"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-medium text-[#362E2B]/80 mb-0.5">Phone (optional)</label>
                      <input
                        type="tel"
                        placeholder="0400 000 000"
                        value={clientPhone}
                        onChange={(e) => setClientPhone(e.target.value)}
                        className="w-full px-3 py-1.5 text-xs rounded-lg border border-[#EAD3CE] focus:outline-none focus:border-[#9CAA8C] bg-[#FAF5EF]/50"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[11px] font-medium text-[#362E2B]/80 mb-0.5">Session Type</label>
                      <select
                        value={sessionType}
                        onChange={(e) => setSessionType(e.target.value)}
                        className="w-full px-2 py-1.5 text-xs rounded-lg border border-[#EAD3CE] focus:outline-none focus:border-[#9CAA8C] bg-[#FAF5EF]/50"
                      >
                        <option value="Newborn Photography">Newborn Session</option>
                        <option value="Maternity Photography">Maternity Session</option>
                        <option value="Family Photography">Family Session</option>
                        <option value="Cake Smash Photography">Cake Smash Session</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[11px] font-medium text-[#362E2B]/80 mb-0.5">Due Date / Target</label>
                      <input
                        type="text"
                        placeholder="e.g. Mid November / 2 weeks"
                        value={timeframe}
                        onChange={(e) => setTimeframe(e.target.value)}
                        className="w-full px-3 py-1.5 text-xs rounded-lg border border-[#EAD3CE] focus:outline-none focus:border-[#9CAA8C] bg-[#FAF5EF]/50"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-medium text-[#362E2B]/80 mb-0.5">Questions or notes (optional)</label>
                    <textarea
                      rows={2}
                      placeholder="Any siblings or special requests..."
                      value={bookingNotes}
                      onChange={(e) => setBookingNotes(e.target.value)}
                      className="w-full px-3 py-1.5 text-xs rounded-lg border border-[#EAD3CE] focus:outline-none focus:border-[#9CAA8C] bg-[#FAF5EF]/50"
                    />
                  </div>

                  <div className="pt-1 flex gap-2">
                    <button
                      type="submit"
                      disabled={bookingLoading}
                      className="flex-1 py-2 rounded-lg bg-[#6E4E53] text-[#FAF5EF] text-xs font-medium hover:bg-[#583D42] disabled:opacity-50 transition-colors flex items-center justify-center gap-1.5 shadow-sm"
                    >
                      <CalendarCheck size={14} weight="bold" />
                      <span>{bookingLoading ? 'Sending...' : 'Confirm Booking Inquiry'}</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowBookingForm(false)}
                      className="px-3 py-2 rounded-lg border border-[#EAD3CE] text-xs hover:bg-[#EAD3CE]/40 transition-colors text-[#362E2B]/70"
                    >
                      Back to Chat
                    </button>
                  </div>
                </form>
              </div>
            </div>
          ) : (
            /* Standard Messages List */
            <div className="flex-1 overflow-y-auto p-4 space-y-3.5 text-sm">
              {messages.map((msg) => {
                const isBot = msg.sender === 'assistant';
                const isBookingNotice = msg.text.includes('Your booking request has been sent') || msg.text.includes('Thank you, ');
                return (
                  <div
                    key={msg.id}
                    className={`flex flex-col ${isBot ? 'items-start' : 'items-end'}`}
                  >
                    <div
                      className={`max-w-[85%] px-4 py-3 rounded-2xl leading-relaxed text-sm ${
                        isBookingNotice
                          ? 'bg-[#9CAA8C]/20 border border-[#9CAA8C]/50 text-[#362E2B] rounded-tl-sm font-medium'
                          : isBot
                          ? 'bg-[#EAD3CE]/35 text-[#362E2B] rounded-tl-sm border border-[#EAD3CE]/60'
                          : 'bg-[#6E4E53] text-[#FAF5EF] rounded-tr-sm'
                      }`}
                    >
                      {msg.text}
                    </div>
                    <span className="text-[10px] text-[#362E2B]/40 px-1 mt-1">
                      {msg.timestamp}
                    </span>
                  </div>
                );
              })}

              {isTyping && (
                <div className="flex items-center gap-1.5 text-xs text-[#9CAA8C] italic px-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#9CAA8C] animate-bounce" />
                  <span className="w-1.5 h-1.5 rounded-full bg-[#9CAA8C] animate-bounce [animation-delay:0.2s]" />
                  <span className="w-1.5 h-1.5 rounded-full bg-[#9CAA8C] animate-bounce [animation-delay:0.4s]" />
                  <span className="ml-1 text-[11px]">Willow is replying...</span>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          )}

          {/* Quick Prompts */}
          {!showBookingForm && messages.length < 6 && (
            <div className="px-4 py-2 border-t border-[#EAD3CE]/40 flex gap-1.5 overflow-x-auto no-scrollbar">
              {quickPrompts.map((prompt, i) => (
                <button
                  key={i}
                  onClick={() => {
                    if (prompt.includes("Book a session")) {
                      setShowBookingForm(true);
                    } else {
                      handleSend(prompt);
                    }
                  }}
                  className="whitespace-nowrap px-2.5 py-1 text-xs rounded-full bg-[#EAD3CE]/40 text-[#6E4E53] hover:bg-[#EAD3CE] transition-colors shrink-0 flex items-center gap-1"
                >
                  {prompt.includes("Book") && <CalendarCheck size={12} weight="bold" />}
                  <span>{prompt}</span>
                </button>
              ))}
            </div>
          )}

          {/* Input Box */}
          {!showBookingForm && (
            <div className="p-3 bg-[#FAF5EF] border-t border-[#EAD3CE] flex items-center gap-2">
              <input
                type="text"
                placeholder="Ask Willow about dates, pricing, or say 'book'..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                disabled={isTyping}
                className="flex-1 px-3.5 py-2.5 rounded-full border border-[#EAD3CE] bg-[#FAF5EF] text-sm text-[#362E2B] focus:outline-none focus:border-[#9CAA8C] placeholder:text-[#362E2B]/40"
              />
              <button
                onClick={() => handleSend()}
                disabled={!input.trim() || isTyping}
                className="w-9 h-9 rounded-full bg-[#6E4E53] text-[#FAF5EF] flex items-center justify-center hover:bg-[#583D42] disabled:opacity-40 transition-colors shrink-0"
                aria-label="Send message"
              >
                <PaperPlaneRight size={16} weight="light" />
              </button>
            </div>
          )}
        </div>
      ) : (
        /* Minimized Floating Button */
        <button
          onClick={() => {
            setIsOpen(true);
            setHasUnread(false);
          }}
          className="group relative flex items-center gap-2.5 px-4 py-3 rounded-full bg-[#6E4E53] text-[#FAF5EF] shadow-lg hover:bg-[#583D42] transition-all hover:scale-102 focus:outline-none focus:ring-2 focus:ring-[#9CAA8C]"
          aria-label="Chat with Willow or Book"
        >
          <ChatCircleDots size={22} weight="light" />
          <div className="flex flex-col text-left">
            <span className="text-sm font-medium tracking-wide leading-none">
              Chat & Book with Willow
            </span>
            <span className="text-[10px] text-[#FAF5EF]/80 leading-tight mt-0.5">
              Instant Answers &middot; Hold a Date
            </span>
          </div>
          {hasUnread && (
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-[#9CAA8C] rounded-full border-2 border-[#FAF5EF]" />
          )}
        </button>
      )}
    </div>
  );
};
