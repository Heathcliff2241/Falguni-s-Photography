import React, { useState, useEffect, useRef } from 'react';
import { ChatCircleDots, X, PaperPlaneRight, ArrowClockwise } from '@phosphor-icons/react';
import { ChatMessage } from '../types';

interface WillowAssistantProps {
  onSessionSelect?: (service: string) => void;
}

export const WillowAssistant: React.FC<WillowAssistantProps> = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [hasUnread, setHasUnread] = useState(false);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [conversationId, setConversationId] = useState<string>('');

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome-1',
      sender: 'assistant',
      text: "Hello, I'm Willow. I help new and expecting parents find the right session with Falguni here in Lightsview. Are you looking for newborn, maternity, family, or cake smash photos?",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Generate unique conversation session id
    if (!conversationId) {
      const id = 'conv_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7);
      setConversationId(id);
    }
  }, [conversationId]);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  const handleSend = async (customText?: string) => {
    const userText = (customText || input).trim();
    if (!userText || isTyping) return;

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
      const response = await fetch('/api/assistant/chat', {
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
    } catch (err) {
      console.warn('Willow chat backend notice:', err);
      // Friendly, unhurried local fallback
      let fallback = "Every session at Falguni's home studio starts at $300 and moves strictly at your baby's pace. Would you like to share your baby's due date or age so we can check the best window?";
      if (userText.toLowerCase().includes('price') || userText.toLowerCase().includes('cost')) {
        fallback = "All sessions start at $300. For newborns, that covers a gentle two-hour session, two wrap outfits, and six fully edited photos. Would you like to hold a date?";
      } else if (userText.toLowerCase().includes('when') || userText.toLowerCase().includes('sweet spot') || userText.toLowerCase().includes('newborn')) {
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

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSend();
    }
  };

  const quickPrompts = [
    "When is the best newborn window?",
    "How much does a session cost?",
    "What is included in a newborn shoot?",
    "I'd like to book a session",
  ];

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Assistant Modal Window */}
      {isOpen ? (
        <div className="w-[90vw] sm:w-[380px] h-[520px] bg-[#FAF5EF] rounded-[22px] border border-[#EAD3CE] shadow-xl flex flex-col overflow-hidden text-[#362E2B] animate-in fade-in zoom-in-95 duration-200">
          {/* Header */}
          <div className="bg-[#FAF5EF] px-5 py-4 border-b border-[#EAD3CE] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-[#9CAA8C]/25 flex items-center justify-center text-[#6E4E53] font-medium text-sm">
                W
              </div>
              <div>
                <h3 className="font-display text-lg text-[#362E2B] font-medium leading-none">
                  Willow
                </h3>
                <span className="caption-text text-[10px] text-[#9CAA8C]">
                  Studio Assistant &middot; Lightsview
                </span>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 text-[#362E2B]/60 hover:text-[#6E4E53] rounded-full hover:bg-[#EAD3CE]/40 transition-colors"
              aria-label="Close Willow Assistant"
            >
              <X size={18} weight="light" />
            </button>
          </div>

          {/* Messages List */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3.5 text-sm">
            {messages.map((msg) => {
              const isBot = msg.sender === 'assistant';
              return (
                <div
                  key={msg.id}
                  className={`flex flex-col ${isBot ? 'items-start' : 'items-end'}`}
                >
                  <div
                    className={`max-w-[85%] px-4 py-3 rounded-2xl leading-relaxed text-sm ${
                      isBot
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
                <span className="ml-1 text-[11px]">Willow is typing warmly...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompts */}
          {messages.length < 5 && (
            <div className="px-4 py-2 border-t border-[#EAD3CE]/40 flex gap-1.5 overflow-x-auto no-scrollbar">
              {quickPrompts.map((prompt, i) => (
                <button
                  key={i}
                  onClick={() => handleSend(prompt)}
                  className="whitespace-nowrap px-2.5 py-1 text-xs rounded-full bg-[#EAD3CE]/40 text-[#6E4E53] hover:bg-[#EAD3CE] transition-colors shrink-0"
                >
                  {prompt}
                </button>
              ))}
            </div>
          )}

          {/* Input Box */}
          <div className="p-3 bg-[#FAF5EF] border-t border-[#EAD3CE] flex items-center gap-2">
            <input
              type="text"
              placeholder="Ask Willow about sessions, timing, or dates..."
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
        </div>
      ) : (
        /* Minimized Floating Button */
        <button
          onClick={() => {
            setIsOpen(true);
            setHasUnread(false);
          }}
          className="group relative flex items-center gap-2.5 px-4 py-3 rounded-full bg-[#6E4E53] text-[#FAF5EF] shadow-md hover:bg-[#583D42] transition-all hover:scale-102 focus:outline-none focus:ring-2 focus:ring-[#9CAA8C]"
          aria-label="Chat with Willow"
        >
          <ChatCircleDots size={22} weight="light" />
          <span className="text-sm font-medium tracking-wide">
            Chat with Willow
          </span>
          {hasUnread && (
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-[#9CAA8C] rounded-full border-2 border-[#FAF5EF]" />
          )}
        </button>
      )}
    </div>
  );
};
