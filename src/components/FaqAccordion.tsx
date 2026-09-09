import React, { useState } from 'react';
import { CaretDown } from '@phosphor-icons/react';
import { FaqItem } from '../types';

interface FaqAccordionProps {
  items: FaqItem[];
  title?: string;
  headingTag?: 'h2' | 'h3';
}

export const FaqAccordion: React.FC<FaqAccordionProps> = ({ 
  items, 
  title = "Frequently Asked Questions",
  headingTag = 'h2'
}) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  if (!items || items.length === 0) return null;

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  const HeadingComponent = headingTag;

  return (
    <div className="w-full max-w-3xl mx-auto my-12">
      <HeadingComponent className="font-display text-3xl md:text-4xl text-[#362E2B] mb-8 text-center">
        {title}
      </HeadingComponent>

      <div className="space-y-4">
        {items.map((item, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div
              key={idx}
              className="bg-[#FAF5EF] border border-[#EAD3CE] rounded-[18px] overflow-hidden transition-all duration-200"
            >
              <button
                type="button"
                onClick={() => toggle(idx)}
                className="w-full px-6 py-5 text-left flex items-center justify-between gap-4 focus:outline-none focus:ring-1 focus:ring-[#9CAA8C]"
                aria-expanded={isOpen}
              >
                <span className="font-display text-lg md:text-xl text-[#362E2B] font-medium leading-snug">
                  {item.question}
                </span>
                <span className={`text-[#9CAA8C] transition-transform duration-200 shrink-0 ${isOpen ? 'rotate-180' : ''}`}>
                  <CaretDown size={18} weight="light" />
                </span>
              </button>

              {isOpen && (
                <div className="px-6 pb-6 pt-1 text-sm md:text-base text-[#362E2B]/85 leading-relaxed border-t border-[#EAD3CE]/40">
                  {item.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
