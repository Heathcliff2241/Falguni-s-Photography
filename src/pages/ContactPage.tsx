import React from 'react';
import { MapPin, Phone, Clock, EnvelopeSimple } from '@phosphor-icons/react';
import { PAGES_DATA, STUDIO_INFO } from '../data/siteData';
import { CLIENT_PHOTOS } from '../assets/images';
import { RibbonDivider } from '../components/RibbonDivider';
import { FaqAccordion } from '../components/FaqAccordion';
import { BookingForm } from '../components/BookingForm';
import { PolaroidPhoto } from '../components/PolaroidPhoto';

interface ContactPageProps {
  onNavigate: (path: string) => void;
}

export const ContactPage: React.FC<ContactPageProps> = () => {
  const page = PAGES_DATA.contact;
  const hero = page.sections[0];

  return (
    <div className="w-full">
      {/* 1. HERO SECTION: Exactly one H1 */}
      <section className="pt-8 pb-16 md:pt-16 md:pb-24 max-w-7xl mx-auto px-6 lg:px-12">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl text-[#362E2B] leading-[1.12] font-normal">
            {hero.headline}
          </h1>

          <p className="font-display text-xl sm:text-2xl text-[#6E4E53] italic font-normal max-w-2xl mx-auto leading-relaxed">
            {hero.subheadline}
          </p>

          <p className="text-base text-[#362E2B]/85 max-w-2xl mx-auto leading-relaxed">
            {hero.body_copy}
          </p>
        </div>

        {/* 2-Column Booking and Studio Info Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Form (7 cols) */}
          <div className="lg:col-span-7">
            <BookingForm />
          </div>

          {/* Right Column: Studio Card & Image (5 cols) */}
          <div className="lg:col-span-5 space-y-8">
            <div className="bg-[#FAF5EF] border border-[#EAD3CE] rounded-[22px] p-8 shadow-sm space-y-6">
              <h2 className="font-display text-2xl sm:text-3xl text-[#362E2B] font-normal">
                Studio Visit Details
              </h2>

              <div className="space-y-4 text-sm text-[#362E2B]/85">
                <div className="flex items-start gap-3">
                  <MapPin size={20} weight="light" className="text-[#9CAA8C] mt-0.5 shrink-0" />
                  <div>
                    <strong className="block text-[#362E2B] font-medium">Home Studio Location</strong>
                    <span>{STUDIO_INFO.address}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone size={20} weight="light" className="text-[#9CAA8C] mt-0.5 shrink-0" />
                  <div>
                    <strong className="block text-[#362E2B] font-medium">Phone &amp; SMS</strong>
                    <a href={`tel:${STUDIO_INFO.phone.replace(/\s+/g, '')}`} className="hover:text-[#6E4E53]">
                      {STUDIO_INFO.phoneDisplay}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock size={20} weight="light" className="text-[#9CAA8C] mt-0.5 shrink-0" />
                  <div>
                    <strong className="block text-[#362E2B] font-medium">Opening Hours</strong>
                    <span>{STUDIO_INFO.hours}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <EnvelopeSimple size={20} weight="light" className="text-[#9CAA8C] mt-0.5 shrink-0" />
                  <div>
                    <strong className="block text-[#362E2B] font-medium">Booking Window</strong>
                    <span>Sessions from {STUDIO_INFO.basePrice} &middot; Deposit secures date</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-[#EAD3CE]/60">
                <p className="text-xs text-[#362E2B]/70 leading-relaxed">
                  Located in Lightsview, serving Northfield, Broadview, Walkerville, Campbelltown, and all north-eastern Adelaide suburbs.
                </p>
              </div>
            </div>

            {/* Printed Polaroid with Tape */}
            <div className="flex justify-center pt-2">
              <PolaroidPhoto
                src={CLIENT_PHOTOS.maternity.src}
                alt={hero.image_alt_text || CLIENT_PHOTOS.maternity.alt}
                caption="Maternity, Newborn & Family"
                subcaption="Lightsview Studio"
                tapeVariant="blush"
                tapeAngle={-1.5}
              />
            </div>
          </div>
        </div>
      </section>

      <RibbonDivider />

      {/* FAQ SECTION */}
      <section className="py-16 max-w-4xl mx-auto px-6 lg:px-12">
        <FaqAccordion items={page.faq_block} title="Booking &amp; Location FAQ" headingTag="h2" />
      </section>
    </div>
  );
};
