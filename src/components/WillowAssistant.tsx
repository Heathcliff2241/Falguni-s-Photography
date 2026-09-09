import React, { useState, useEffect, useRef } from "react";
import { 
  ChatCircleDots, 
  X, 
  PaperPlaneRight, 
  Sparkle, 
  CheckCircle, 
  ArrowClockwise,
  CalendarCheck,
  Phone
} from "@phosphor-icons/react";
import { AnimatePresence, motion } from "motion/react";
import { getApiUrl } from "../utils/api";

export interface WillowMessage {
  id: string;
  role: "user" | "model";
  text: string;
  timestamp: Date;
  isBookingTrigger?: boolean;
}

export interface WillowBookingData {
  id?: string;
  customerName: string;
  customerEmail: string;
  phone: string;
  sessionType: string;
  timeframeOrDueDate?: string;
  notes?: string;
}

interface WillowAssistantProps {
  onSessionSelect?: (service: string) => void;
  openInitially?: boolean;
}

export const WillowAssistant: React.FC<WillowAssistantProps> = ({ openInitially = false }) => {
  const [isOpen, setIsOpen] = useState(openInitially);
  const [messages, setMessages] = useState<WillowMessage[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const initializeWelcomeMessage = () => {
    const welcome: WillowMessage = {
      id: "welcome",
      role: "model",
      text: "Hello, I'm Willow. I help new and expecting parents find the right session with Falguni here at our home studio in Lightsview, Adelaide.\n\nEvery session starts at $300 and moves at your baby's gentle pace with plenty of time for feeding and cuddles. How can I help you today?",
      timestamp: new Date(),
    };
    setMessages([welcome]);
  };

  // Load chat history from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("willow_chat_history");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setMessages(
          parsed.map((m: any) => ({
            ...m,
            timestamp: new Date(m.timestamp),
          }))
        );
      } catch {
        initializeWelcomeMessage();
      }
    } else {
      initializeWelcomeMessage();
    }
  }, []);

  // Save chat to localStorage on changes
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem("willow_chat_history", JSON.stringify(messages));
    }
  }, [messages]);

  // Auto scroll to bottom
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isLoading, isOpen]);

  // Global event listener to allow buttons across the site to open Willow with a prompt
  useEffect(() => {
    const handleOpenWillow = (event: any) => {
      setIsOpen(true);
      const detail = event?.detail;
      if (detail?.prompt) {
        handleSendMessage(detail.prompt);
      }
    };

    window.addEventListener("open-willow", handleOpenWillow);
    return () => window.removeEventListener("open-willow", handleOpenWillow);
  }, [messages, isLoading]);

  const clearChat = () => {
    localStorage.removeItem("willow_chat_history");
    initializeWelcomeMessage();
  };

  const handleSendMessage = async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || isLoading) return;

    const userMessage: WillowMessage = {
      id: "usr_" + Math.random().toString(36).substring(2, 9),
      role: "user",
      text: trimmed,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);

    try {
      // Map history for Gemini
      const history = messages.map((m) => ({
        role: m.role,
        parts: [{ text: m.text }],
      }));

      const res = await fetch(getApiUrl("/api/chat"), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: trimmed,
          history,
        }),
      });

      if (!res.ok) {
        throw new Error(`Server returned status ${res.status}`);
      }

      const data = await res.json();
      let replyText = data.text || data.reply || "Thank you for sharing. Falguni loves working with little ones at their own pace. Would you like to check dates?";

      // Check if response contains a [BOOKING_DATA: ...] trigger
      const bookingMatch = replyText.match(/\[BOOKING_DATA:\s*({.*?})\]/);
      let extractedBooking: WillowBookingData | null = null;

      if (bookingMatch) {
        try {
          extractedBooking = JSON.parse(bookingMatch[1]);
          // Clean the tag from displayed chat text
          replyText = replyText.replace(/\[BOOKING_DATA:\s*({.*?})\]/, "").trim();
        } catch (e) {
          console.error("Failed to parse booking JSON:", e);
        }
      }

      const modelMessage: WillowMessage = {
        id: "bot_" + Math.random().toString(36).substring(2, 9),
        role: "model",
        text: replyText,
        timestamp: new Date(),
        isBookingTrigger: !!extractedBooking,
      };

      setMessages((prev) => [...prev, modelMessage]);

      if (extractedBooking) {
        const newBooking = {
          ...extractedBooking,
          id: "book_" + Math.random().toString(36).substring(2, 9),
          createdAt: new Date().toISOString(),
        };

        // Save booking into local storage
        const currentRaw = localStorage.getItem("falguni_studio_bookings");
        const currentList = currentRaw ? JSON.parse(currentRaw) : [];
        currentList.push(newBooking);
        localStorage.setItem("falguni_studio_bookings", JSON.stringify(currentList));

        // Trigger email notification via backend
        fetch(getApiUrl("/api/book"), {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newBooking),
        }).catch((mailErr) => {
          console.warn("Notice: could not dispatch email notification:", mailErr);
        });

        // Add confirmed appointment inquiry message in chat
        setTimeout(() => {
          setMessages((prev) => [
            ...prev,
            {
              id: "bot_confirm_" + Math.random().toString(36).substring(2, 9),
              role: "model",
              text: `📷 **Booking Inquiry Sent to Falguni**\n\n**Parent:** ${newBooking.customerName}\n**Session:** ${newBooking.sessionType}\n**Due Date / Timeframe:** ${newBooking.timeframeOrDueDate || "Flexible"}\n${newBooking.customerEmail ? `**Email:** ${newBooking.customerEmail}\n` : ""}**Phone:** ${newBooking.phone || "Not specified"}\n\nFalguni has received your details and will follow up personally within 24 hours to confirm your session date and answer any questions!`,
              timestamp: new Date(),
            },
          ]);
        }, 600);
      }
    } catch (error) {
      console.error("Error sending message to Willow:", error);
      let fallbackText = "Every session at Falguni's home studio in Lightsview starts at $300 and moves strictly at your baby's pace. Would you like to check dates around your timeframe?";
      const lower = trimmed.toLowerCase();
      if (lower.includes("price") || lower.includes("cost")) {
        fallbackText = "All sessions start at $300. For newborns, that covers a gentle two-hour session, two wrap outfits, and six fully edited photos. Would you like to hold a date?";
      } else if (lower.includes("when") || lower.includes("newborn")) {
        fallbackText = "For newborns, five to twenty days old is the sweet spot when babies sleep deepest. If you'd like, what is your due date so Falguni can note it down?";
      }

      setMessages((prev) => [
        ...prev,
        {
          id: "bot_err_" + Math.random().toString(36).substring(2, 9),
          role: "model",
          text: fallbackText,
          timestamp: new Date(),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const quickPrompts = [
    { label: "Best newborn window?", text: "When is the best time to book newborn photos?" },
    { label: "Session pricing ($300)", text: "How much does a session cost and what is included?" },
    { label: "Book with Falguni", text: "I'd like to book a photography session for my baby." },
    { label: "Where is the studio?", text: "Where is Falguni's studio located in Adelaide?" },
  ];

  return (
    <>
      {/* Floating Action Button */}
      <motion.button
        id="willow-floating-button"
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#6E4E53] text-[#FAF5EF] shadow-2xl hover:bg-[#5A3F43] transition-colors cursor-pointer border border-[#FAF5EF]/20"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Open Willow Studio Assistant"
      >
        {isOpen ? (
          <X size={24} weight="regular" />
        ) : (
          <div className="relative">
            <ChatCircleDots size={26} weight="regular" />
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#9CAA8C] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-[#9CAA8C]"></span>
            </span>
          </div>
        )}
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="willow-chat-window"
            initial={{ opacity: 0, y: 30, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.92 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="fixed bottom-24 right-4 sm:right-6 z-50 flex h-[580px] w-[calc(100vw-2rem)] max-w-[400px] flex-col rounded-[24px] bg-[#FAF5EF] border border-[#EAD3CE] shadow-2xl overflow-hidden text-[#362E2B]"
          >
            {/* Header */}
            <div className="flex items-center justify-between bg-[#6E4E53] px-4 py-3.5 text-[#FAF5EF]">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#FAF5EF]/15 text-[#FAF5EF] font-display font-medium text-base">
                  W
                </div>
                <div>
                  <h3 className="font-display text-base font-medium tracking-tight leading-none text-[#FAF5EF]">
                    Willow
                  </h3>
                  <p className="text-[11px] text-[#EAD3CE] flex items-center gap-1 font-sans mt-0.5">
                    <Sparkle size={11} weight="fill" className="text-[#EAD3CE]" />
                    Falguni's Studio &middot; Lightsview Adelaide
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={clearChat}
                  className="rounded-full px-2 py-0.5 text-[11px] font-sans hover:bg-[#FAF5EF]/15 transition-all border border-[#FAF5EF]/20 text-[#FAF5EF]/80 flex items-center gap-1"
                  title="Reset conversation"
                >
                  <ArrowClockwise size={11} />
                  Reset
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="rounded-full p-1.5 hover:bg-[#FAF5EF]/15 transition-colors text-[#FAF5EF]"
                  aria-label="Close"
                >
                  <X size={16} />
                </button>
              </div>
            </div>

            {/* Message Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3.5 bg-[#FAF5EF]/60">
              {messages.map((m) => (
                <div
                  key={m.id}
                  className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] rounded-[18px] px-4 py-3 text-[13.5px] font-sans leading-relaxed shadow-sm whitespace-pre-line ${
                      m.role === "user"
                        ? "bg-[#6E4E53] text-[#FAF5EF] rounded-br-xs"
                        : "bg-white text-[#362E2B] border border-[#EAD3CE]/50 rounded-bl-xs"
                    }`}
                  >
                    {m.text.split("**").map((part, index) => {
                      if (index % 2 === 1) {
                        return (
                          <strong key={index} className="font-semibold text-inherit">
                            {part}
                          </strong>
                        );
                      }
                      return part;
                    })}
                    <div
                      className={`text-[10px] mt-1.5 text-right block ${
                        m.role === "user" ? "text-[#FAF5EF]/60" : "text-[#362E2B]/40"
                      }`}
                    >
                      {m.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    </div>
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="flex justify-start">
                  <div className="max-w-[85%] rounded-[18px] rounded-bl-xs px-4 py-3 bg-white text-[#362E2B] border border-[#EAD3CE]/50 shadow-sm flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-[#6E4E53] animate-bounce [animation-delay:-0.3s]"></span>
                    <span className="h-2 w-2 rounded-full bg-[#6E4E53] animate-bounce [animation-delay:-0.15s]"></span>
                    <span className="h-2 w-2 rounded-full bg-[#6E4E53] animate-bounce"></span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Prompts */}
            {messages.length <= 2 && (
              <div className="px-3.5 py-2.5 bg-[#EAD3CE]/20 border-t border-[#EAD3CE]/40">
                <p className="text-[11px] text-[#6E4E53] font-sans font-medium mb-1.5">
                  Popular questions:
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {quickPrompts.map((p, i) => (
                    <button
                      key={i}
                      onClick={() => handleSendMessage(p.text)}
                      className="rounded-full bg-white px-2.5 py-1 text-xs text-[#6E4E53] border border-[#EAD3CE] hover:border-[#6E4E53] hover:bg-[#FAF5EF] transition-colors text-left cursor-pointer font-sans"
                    >
                      {p.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input Form */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage(inputValue);
              }}
              className="flex items-center gap-2 border-t border-[#EAD3CE] bg-white p-3"
            >
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ask Willow about sessions, pricing, or dates..."
                disabled={isLoading}
                className="flex-1 rounded-full bg-[#FAF5EF] px-4 py-2 text-xs sm:text-sm text-[#362E2B] border border-[#EAD3CE] placeholder-[#362E2B]/40 focus:border-[#6E4E53] focus:outline-none focus:ring-1 focus:ring-[#6E4E53]"
              />
              <button
                type="submit"
                disabled={!inputValue.trim() || isLoading}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-[#6E4E53] text-[#FAF5EF] hover:bg-[#5A3F43] transition-all disabled:opacity-40 disabled:hover:bg-[#6E4E53] cursor-pointer"
                aria-label="Send message"
              >
                <PaperPlaneRight size={16} weight="bold" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
export default WillowAssistant;
