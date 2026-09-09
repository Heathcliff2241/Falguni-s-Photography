import React, { useState } from 'react';
import { CheckCircle, ArrowRight } from '@phosphor-icons/react';
import { getApiUrl } from '../utils/api';

interface BookingFormProps {
  defaultSessionType?: string;
  onSuccess?: () => void;
}

export const BookingForm: React.FC<BookingFormProps> = ({ 
  defaultSessionType = 'Newborn Photography',
  onSuccess 
}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    sessionType: defaultSessionType,
    timeframeOrDueDate: '',
    preferredDates: '',
    notes: '',
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch(getApiUrl('/api/inquiry'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          source: 'form',
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Something went wrong while sending your inquiry.');
      }

      setSubmitted(true);
      if (onSuccess) onSuccess();
    } catch (err: any) {
      console.error('Inquiry submission error:', err);
      // Even if network or offline, gracefully inform
      setError(err.message || 'Could not connect to studio server. Please call +61 469 753 238.');
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="bg-[#FAF5EF] border border-[#9CAA8C] rounded-[20px] p-8 md:p-12 text-center max-w-xl mx-auto shadow-sm">
        <div className="w-14 h-14 bg-[#9CAA8C]/20 rounded-full flex items-center justify-center mx-auto mb-4 text-[#6E4E53]">
          <CheckCircle size={32} weight="light" />
        </div>
        <h3 className="font-display text-2xl md:text-3xl text-[#362E2B] mb-2">
          Thank you, {formData.name}
        </h3>
        <p className="text-[#362E2B]/85 text-base leading-relaxed mb-6">
          Your booking inquiry has been received. Falguni will review her calendar and follow up with you within a day or two with available dates and next steps.
        </p>
        <p className="text-xs text-[#9CAA8C] tracking-wide uppercase">
          Studio in Lightsview, Adelaide &middot; From $300
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-[#FAF5EF] border border-[#EAD3CE] rounded-[20px] p-6 md:p-10 max-w-xl mx-auto shadow-sm text-left"
    >
      {error && (
        <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-sm text-red-700">
          {error}
        </div>
      )}

      <div className="space-y-5">
        {/* Session Type */}
        <div>
          <label className="block caption-text text-[#6E4E53] font-semibold mb-2">
            Session Type *
          </label>
          <select
            value={formData.sessionType}
            onChange={(e) => setFormData({ ...formData, sessionType: e.target.value })}
            required
            className="w-full px-4 py-3.5 rounded-xl border border-[#EAD3CE] bg-[#FAF5EF] text-[#362E2B] focus:outline-none focus:border-[#9CAA8C] focus:ring-1 focus:ring-[#9CAA8C] text-sm"
          >
            <option value="Newborn Photography">Newborn Photography (best 5-20 days)</option>
            <option value="Maternity Photography">Maternity Photography (ideal 28-34 weeks)</option>
            <option value="Family Photography">Family Photography</option>
            <option value="Sitter Photography">Sitter Photography (6-9 months)</option>
            <option value="Cake Smash Photography">Cake Smash Photography (first birthday)</option>
          </select>
        </div>

        {/* Parent / Client Name */}
        <div>
          <label className="block caption-text text-[#6E4E53] font-semibold mb-2">
            Your Full Name *
          </label>
          <input
            type="text"
            required
            placeholder="e.g. Prabhjot or Veerpal"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-4 py-3.5 rounded-xl border border-[#EAD3CE] bg-[#FAF5EF] text-[#362E2B] focus:outline-none focus:border-[#9CAA8C] focus:ring-1 focus:ring-[#9CAA8C] text-sm placeholder:text-[#362E2B]/40"
          />
        </div>

        {/* Email & Phone Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block caption-text text-[#6E4E53] font-semibold mb-2">
              Email Address *
            </label>
            <input
              type="email"
              required
              placeholder="you@example.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-3.5 rounded-xl border border-[#EAD3CE] bg-[#FAF5EF] text-[#362E2B] focus:outline-none focus:border-[#9CAA8C] focus:ring-1 focus:ring-[#9CAA8C] text-sm placeholder:text-[#362E2B]/40"
            />
          </div>
          <div>
            <label className="block caption-text text-[#6E4E53] font-semibold mb-2">
              Mobile Phone *
            </label>
            <input
              type="tel"
              required
              placeholder="04XX XXX XXX"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full px-4 py-3.5 rounded-xl border border-[#EAD3CE] bg-[#FAF5EF] text-[#362E2B] focus:outline-none focus:border-[#9CAA8C] focus:ring-1 focus:ring-[#9CAA8C] text-sm placeholder:text-[#362E2B]/40"
            />
          </div>
        </div>

        {/* Timeframe or Due Date */}
        <div>
          <label className="block caption-text text-[#6E4E53] font-semibold mb-2">
            Baby&apos;s Due Date or Current Age *
          </label>
          <input
            type="text"
            required
            placeholder="e.g. Due October 14, or 2 weeks old, or 11 months old"
            value={formData.timeframeOrDueDate}
            onChange={(e) => setFormData({ ...formData, timeframeOrDueDate: e.target.value })}
            className="w-full px-4 py-3.5 rounded-xl border border-[#EAD3CE] bg-[#FAF5EF] text-[#362E2B] focus:outline-none focus:border-[#9CAA8C] focus:ring-1 focus:ring-[#9CAA8C] text-sm placeholder:text-[#362E2B]/40"
          />
        </div>

        {/* Preferred Dates / Window */}
        <div>
          <label className="block caption-text text-[#6E4E53] font-semibold mb-2">
            Preferred Date Range or Days of the Week
          </label>
          <input
            type="text"
            placeholder="e.g. Weekday mornings, or mid-November weekend"
            value={formData.preferredDates}
            onChange={(e) => setFormData({ ...formData, preferredDates: e.target.value })}
            className="w-full px-4 py-3.5 rounded-xl border border-[#EAD3CE] bg-[#FAF5EF] text-[#362E2B] focus:outline-none focus:border-[#9CAA8C] focus:ring-1 focus:ring-[#9CAA8C] text-sm placeholder:text-[#362E2B]/40"
          />
        </div>

        {/* Notes */}
        <div>
          <label className="block caption-text text-[#6E4E53] font-semibold mb-2">
            Questions or Notes for Falguni
          </label>
          <textarea
            rows={3}
            placeholder="Tell us about siblings joining, colors you like, or any questions..."
            value={formData.notes}
            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
            className="w-full px-4 py-3.5 rounded-xl border border-[#EAD3CE] bg-[#FAF5EF] text-[#362E2B] focus:outline-none focus:border-[#9CAA8C] focus:ring-1 focus:ring-[#9CAA8C] text-sm placeholder:text-[#362E2B]/40"
          />
        </div>

        {/* Submit button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-4 px-6 rounded-full bg-[#6E4E53] text-[#FAF5EF] font-medium text-sm md:text-base hover:bg-[#583D42] transition-colors flex items-center justify-center gap-2 disabled:opacity-70 shadow-sm mt-4 focus:outline-none focus:ring-2 focus:ring-[#9CAA8C]"
        >
          <span>{loading ? 'Sending to Falguni...' : 'Send Booking Request'}</span>
          {!loading && <ArrowRight size={18} weight="light" />}
        </button>

        <p className="text-center text-xs text-[#362E2B]/60 pt-2">
          Sessions start at $300. A non-refundable deposit secures your date once confirmed.
        </p>
      </div>
    </form>
  );
};
