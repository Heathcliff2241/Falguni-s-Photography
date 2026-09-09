import React from 'react';
import { ArrowRight, Check } from '@phosphor-icons/react';
import { PAGES_DATA, STUDIO_INFO } from '../data/siteData';
import { CLIENT_PHOTOS } from '../assets/images';
import { RibbonDivider } from '../components/RibbonDivider';
import { FaqAccordion } from '../components/FaqAccordion';
import { BookingForm } from '../components/BookingForm';
import { PolaroidPhoto } from '../components/PolaroidPhoto';

interface FamilyPageProps {
  onNavigate: (path: string) => void;
}

export const FamilyPage: React.FC<FamilyPageProps> = ({ onNavigate }) => {
  const page = PAGES_DATA.family;
  const hero = page.sections[0];
  const included = page.sections[1];
  const testimonials = page.sections[2];

  return (
    <div className="w-full">
      {/* 1. HERO SECTION: Exactly one H1 */}
      <section className="pt-8 pb-20 md:pt-16 md:pb-28 max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <div className="lg:col-span-7 space-y-6 text-left">
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl text-[#362E2B] leading-[1.12] font-normal">
              {hero.headline}
            </h1>

            <p className="font-display text-xl sm:text-2xl text-[#6E4E53] italic font-normal leading-relaxed">
              {hero.subheadline}
            </p>

            <p className="text-base sm:text-lg text-[#362E2B]/85 max-w-2xl leading-relaxed">
              {hero.body_copy}
            </p>

            <div className="pt-4 flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <a
                href="#booking-section"
                className="px-8 py-3.5 rounded-full bg-[#6E4E53] text-[#FAF5EF] font-medium text-base hover:bg-[#583D42] transition-colors shadow-sm inline-flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-[#9CAA8C]"
              >
                <span>{hero.cta_text}</span>
                <ArrowRight size={18} weight="light" />
              </a>

              <button
                onClick={() => onNavigate('/gallery')}
                className="px-6 py-3.5 rounded-full border border-[#9CAA8C] text-[#362E2B] text-base hover:bg-[#EAD3CE]/30 transition-colors"
              >
                View Gallery
              </button>
            </div>

            <div className="pt-2 flex items-center gap-2 text-xs text-[#9CAA8C] uppercase tracking-wider">
              <span>Covers Family &amp; Sitter Sessions (6-9 mos)</span>
              <span>&middot;</span>
              <span>From {STUDIO_INFO.basePrice}</span>
            </div>
          </div>

          <div className="lg:col-span-5 flex justify-center">
            <PolaroidPhoto
              src={CLIENT_PHOTOS.family.src}
              fallbackSrc={CLIENT_PHOTOS.family.fallbackSrc}
              alt={hero.image_alt_text || CLIENT_PHOTOS.family.alt}
              caption="Unhurried Family Laughter"
              subcaption="Studio & Outdoor"
              tapeVariant="kraft"
              tapeAngle={2}
            />
          </div>
        </div>
      </section>

      <RibbonDivider />

      {/* 2. WHAT'S INCLUDED: H2 */}
      <section className="py-20 max-w-5xl mx-auto px-6 lg:px-12">
        <div className="bg-[#EAD3CE]/25 border border-[#EAD3CE] rounded-[24px] p-8 md:p-14 space-y-6 text-center">
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl text-[#362E2B] font-normal">
            {included.headline}
          </h2>

          <p className="text-base sm:text-lg text-[#362E2B]/85 max-w-3xl mx-auto leading-relaxed">
            {included.body_copy}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6 text-left">
            <div className="bg-[#FAF5EF] p-5 rounded-[16px] border border-[#EAD3CE]">
              <div className="w-7 h-7 rounded-full bg-[#9CAA8C]/20 text-[#6E4E53] flex items-center justify-center mb-3">
                <Check size={16} weight="light" />
              </div>
              <h3 className="font-display text-xl text-[#362E2B] font-medium mb-1">
                Up to 5 People
              </h3>
              <p className="text-xs text-[#362E2B]/75 leading-relaxed">
                Starting at $300, with a small per-person add-on for extended families.
              </p>
            </div>

            <div className="bg-[#FAF5EF] p-5 rounded-[16px] border border-[#EAD3CE]">
              <div className="w-7 h-7 rounded-full bg-[#9CAA8C]/20 text-[#6E4E53] flex items-center justify-center mb-3">
                <Check size={16} weight="light" />
              </div>
              <h3 className="font-display text-xl text-[#362E2B] font-medium mb-1">
                Studio or Outdoor
              </h3>
              <p className="text-xs text-[#362E2B]/75 leading-relaxed">
                Available year-round at Lightsview studio or a nearby park in north-east Adelaide.
              </p>
            </div>

            <div className="bg-[#FAF5EF] p-5 rounded-[16px] border border-[#EAD3CE]">
              <div className="w-7 h-7 rounded-full bg-[#9CAA8C]/20 text-[#6E4E53] flex items-center justify-center mb-3">
                <Check size={16} weight="light" />
              </div>
              <h3 className="font-display text-xl text-[#362E2B] font-medium mb-1">
                Full Edited Gallery
              </h3>
              <p className="text-xs text-[#362E2B]/75 leading-relaxed">
                Delivered digitally in high resolution within two weeks of your session.
              </p>
            </div>
          </div>
        </div>
      </section>

      <RibbonDivider />

      {/* 3. TESTIMONIALS: H2 */}
      <section className="py-20 max-w-5xl mx-auto px-6 lg:px-12 text-center">
        <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl text-[#362E2B] mb-12 font-normal">
          {testimonials.headline}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
          <div className="bg-[#FAF5EF] border border-[#EAD3CE] rounded-[20px] p-8 shadow-xs flex flex-col justify-between">
            <p className="font-display text-xl text-[#362E2B]/90 italic leading-relaxed mb-6">
              &ldquo;The way she worked with our kids was simply amazing, patient, kind, and creative, bringing out their genuine smiles.&rdquo;
            </p>
            <div className="pt-4 border-t border-[#EAD3CE]/40">
              <span className="caption-text text-[#6E4E53] font-semibold block">
                Kuljeet S.
              </span>
              <span className="text-xs text-[#9CAA8C]">Google Review</span>
            </div>
          </div>

          <div className="bg-[#FAF5EF] border border-[#EAD3CE] rounded-[20px] p-8 shadow-xs flex flex-col justify-between">
            <p className="font-display text-xl text-[#362E2B]/90 italic leading-relaxed mb-6">
              &ldquo;Very happy with quality and the service!&rdquo;
            </p>
            <div className="pt-4 border-t border-[#EAD3CE]/40">
              <span className="caption-text text-[#6E4E53] font-semibold block">
                Anwar
              </span>
              <span className="text-xs text-[#9CAA8C]">Google Review</span>
            </div>
          </div>
        </div>
      </section>

      <RibbonDivider />

      {/* 4. FAQ BLOCK */}
      <section className="py-16 max-w-4xl mx-auto px-6 lg:px-12">
        <FaqAccordion items={page.faq_block} title="Family Session Questions" headingTag="h2" />
      </section>

      <RibbonDivider />

      {/* 5. BOOKING INQUIRY FORM */}
      <section id="booking-section" className="py-20 max-w-3xl mx-auto px-6 lg:px-12">
        <div className="text-center mb-10 space-y-2">
          <h2 className="font-display text-3xl sm:text-4xl text-[#362E2B] font-normal">
            Book a Family Session
          </h2>
          <p className="text-sm text-[#362E2B]/75">
            Let us know preferred days and who will be joining. Falguni will confirm available dates.
          </p>
        </div>
        <BookingForm defaultSessionType="Family Photography" />
      </section>
    </div>
  );
};
