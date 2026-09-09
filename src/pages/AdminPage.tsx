import React, { useState, useEffect } from 'react';
import { ShieldCheck, ChatCircleDots, CalendarCheck, Clock, EnvelopeSimple, Phone, ArrowLeft } from '@phosphor-icons/react';
import { BookingInquiry, ConversationTranscript } from '../types';
import { getApiUrl } from '../utils/api';

interface AdminPageProps {
  onNavigate: (path: string) => void;
}

export const AdminPage: React.FC<AdminPageProps> = ({ onNavigate }) => {
  const [inquiries, setInquiries] = useState<BookingInquiry[]>([]);
  const [transcripts, setTranscripts] = useState<ConversationTranscript[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'inquiries' | 'transcripts'>('inquiries');
  const [selectedTranscript, setSelectedTranscript] = useState<ConversationTranscript | null>(null);

  const fetchAdminData = async () => {
    setLoading(true);
    try {
      const res = await fetch(getApiUrl('/api/admin/data'));
      if (res.ok) {
        const data = await res.json();
        setInquiries(data.inquiries || []);
        setTranscripts(data.transcripts || []);
      }
    } catch (e) {
      console.warn('Admin fetch fallback:', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdminData();
  }, []);

  return (
    <div className="w-full max-w-7xl mx-auto px-6 lg:px-12 py-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-8 border-b border-[#EAD3CE] mb-8">
        <div>
          <button
            onClick={() => onNavigate('/')}
            className="text-xs text-[#9CAA8C] hover:text-[#6E4E53] inline-flex items-center gap-1 mb-2 font-medium"
          >
            <ArrowLeft size={14} weight="light" />
            <span>Return to Studio Website</span>
          </button>
          <h1 className="font-display text-3xl sm:text-4xl text-[#362E2B] font-normal flex items-center gap-2.5">
            <ShieldCheck size={32} weight="light" className="text-[#6E4E53]" />
            <span>Studio Inquiries &amp; Transcripts</span>
          </h1>
          <p className="text-sm text-[#362E2B]/75 mt-1">
            Private management portal for Falguni&apos;s Photography
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('inquiries')}
            className={`px-5 py-2.5 rounded-full text-xs font-semibold tracking-wider uppercase transition-colors ${
              activeTab === 'inquiries'
                ? 'bg-[#6E4E53] text-[#FAF5EF]'
                : 'bg-[#FAF5EF] text-[#362E2B] border border-[#EAD3CE] hover:bg-[#EAD3CE]/40'
            }`}
          >
            Inquiries ({inquiries.length})
          </button>
          <button
            onClick={() => setActiveTab('transcripts')}
            className={`px-5 py-2.5 rounded-full text-xs font-semibold tracking-wider uppercase transition-colors ${
              activeTab === 'transcripts'
                ? 'bg-[#6E4E53] text-[#FAF5EF]'
                : 'bg-[#FAF5EF] text-[#362E2B] border border-[#EAD3CE] hover:bg-[#EAD3CE]/40'
            }`}
          >
            Willow Chats ({transcripts.length})
          </button>
          <button
            onClick={fetchAdminData}
            className="p-2.5 rounded-full border border-[#EAD3CE] text-[#362E2B] hover:bg-[#EAD3CE]/40"
            title="Refresh"
          >
            <Clock size={16} weight="light" />
          </button>
        </div>
      </div>

      {loading ? (
        <div className="py-20 text-center text-sm text-[#9CAA8C]">
          Loading studio data...
        </div>
      ) : activeTab === 'inquiries' ? (
        /* INQUIRIES LIST */
        inquiries.length === 0 ? (
          <div className="bg-[#FAF5EF] border border-[#EAD3CE] rounded-[20px] p-12 text-center text-[#362E2B]/70">
            <CalendarCheck size={36} weight="light" className="mx-auto text-[#9CAA8C] mb-3" />
            <p className="font-display text-xl text-[#362E2B] mb-1">No inquiries received yet</p>
            <p className="text-sm">Inquiries submitted via the booking form or Willow AI Assistant will appear here.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {inquiries.map((inq) => (
              <div
                key={inq.id}
                className="bg-[#FAF5EF] border border-[#EAD3CE] rounded-[20px] p-6 shadow-xs flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="caption-text text-[#9CAA8C] font-semibold">
                      {inq.sessionType}
                    </span>
                    <span className={`text-[11px] px-2.5 py-0.5 rounded-full uppercase tracking-wider font-semibold ${
                      inq.source === 'willow_assistant' 
                        ? 'bg-[#9CAA8C]/20 text-[#6E4E53]' 
                        : 'bg-[#EAD3CE]/50 text-[#362E2B]'
                    }`}>
                      {inq.source === 'willow_assistant' ? 'Willow AI' : 'Web Form'}
                    </span>
                  </div>

                  <h3 className="font-display text-2xl text-[#362E2B]">
                    {inq.name}
                  </h3>

                  <div className="space-y-1 text-xs text-[#362E2B]/80">
                    <div className="flex items-center gap-1.5">
                      <EnvelopeSimple size={14} weight="light" className="text-[#9CAA8C]" />
                      <span>{inq.email}</span>
                    </div>
                    {inq.phone && (
                      <div className="flex items-center gap-1.5">
                        <Phone size={14} weight="light" className="text-[#9CAA8C]" />
                        <span>{inq.phone}</span>
                      </div>
                    )}
                  </div>

                  <div className="p-3 bg-[#EAD3CE]/20 rounded-xl text-xs space-y-1">
                    <div>
                      <strong className="text-[#6E4E53]">Timeframe / Due Date:</strong> {inq.timeframeOrDueDate}
                    </div>
                    {inq.preferredDates && (
                      <div>
                        <strong className="text-[#6E4E53]">Preferred:</strong> {inq.preferredDates}
                      </div>
                    )}
                    {inq.notes && (
                      <div className="pt-1 border-t border-[#EAD3CE]/40 italic text-[#362E2B]/90">
                        &ldquo;{inq.notes}&rdquo;
                      </div>
                    )}
                  </div>
                </div>

                <div className="pt-4 mt-4 border-t border-[#EAD3CE]/40 flex items-center justify-between text-[11px] text-[#362E2B]/50">
                  <span>{new Date(inq.createdAt).toLocaleDateString()} at {new Date(inq.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                  <span className="uppercase text-[#9CAA8C] font-semibold">Status: {inq.status}</span>
                </div>
              </div>
            ))}
          </div>
        )
      ) : (
        /* TRANSCRIPTS LIST */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-5 space-y-4">
            <h2 className="caption-text text-[#6E4E53] font-semibold">
              Logged Conversations
            </h2>
            {transcripts.length === 0 ? (
              <div className="bg-[#FAF5EF] border border-[#EAD3CE] rounded-[18px] p-8 text-center text-sm text-[#362E2B]/70">
                No chat transcripts recorded yet.
              </div>
            ) : (
              transcripts.map((t) => (
                <div
                  key={t.id}
                  onClick={() => setSelectedTranscript(t)}
                  className={`p-5 rounded-[18px] border transition-all cursor-pointer ${
                    selectedTranscript?.id === t.id
                      ? 'bg-[#EAD3CE]/30 border-[#9CAA8C]'
                      : 'bg-[#FAF5EF] border-[#EAD3CE] hover:border-[#9CAA8C]/60'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-display text-lg text-[#362E2B]">
                      {t.visitorName || 'Visitor'}
                    </span>
                    <span className="text-[11px] text-[#9CAA8C]">
                      {new Date(t.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-xs text-[#362E2B]/70 line-clamp-2">
                    {t.summary || t.messages[t.messages.length - 1]?.text || 'Active chat'}
                  </p>
                  <span className="text-[10px] text-[#6E4E53] mt-2 block uppercase tracking-wider">
                    {t.messages.length} messages
                  </span>
                </div>
              ))
            )}
          </div>

          <div className="lg:col-span-7">
            {selectedTranscript ? (
              <div className="bg-[#FAF5EF] border border-[#EAD3CE] rounded-[22px] p-6 shadow-sm">
                <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#EAD3CE]">
                  <div>
                    <h3 className="font-display text-2xl text-[#362E2B]">
                      {selectedTranscript.visitorName || 'Visitor Conversation'}
                    </h3>
                    <span className="caption-text text-[11px] text-[#9CAA8C]">
                      Session ID: {selectedTranscript.id}
                    </span>
                  </div>
                  <ChatCircleDots size={24} weight="light" className="text-[#6E4E53]" />
                </div>

                <div className="space-y-3 max-h-[500px] overflow-y-auto p-2">
                  {selectedTranscript.messages.map((m, idx) => (
                    <div
                      key={idx}
                      className={`p-3.5 rounded-xl text-sm leading-relaxed ${
                        m.sender === 'assistant'
                          ? 'bg-[#EAD3CE]/35 border border-[#EAD3CE]/60 text-[#362E2B]'
                          : 'bg-[#6E4E53] text-[#FAF5EF]'
                      }`}
                    >
                      <div className="text-[10px] uppercase tracking-wider mb-1 opacity-75">
                        {m.sender === 'assistant' ? 'Willow' : 'Visitor'} &middot; {m.timestamp}
                      </div>
                      {m.text}
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="bg-[#FAF5EF] border border-[#EAD3CE] rounded-[22px] p-12 text-center text-sm text-[#362E2B]/60">
                Select a conversation on the left to read the full transcript.
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
