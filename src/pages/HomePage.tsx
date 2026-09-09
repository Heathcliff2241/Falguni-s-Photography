import React, { useState } from 'react';
import { 
  ArrowRight, 
  CalendarCheck, 
  Star, 
  Clock, 
  ChatCircleDots, 
  Check
} from '@phosphor-icons/react';
import { PAGES_DATA, STUDIO_INFO } from '../data/siteData';
import { CLIENT_PHOTOS } from '../assets/images';
import { RibbonDivider } from '../components/RibbonDivider';
import { PolaroidPhoto } from '../components/PolaroidPhoto';
import { ReviewsSection } from '../components/ReviewsSection';

interface HomePageProps {
  onNavigate: (path: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  const page = PAGES_DATA.home;
  const hero = page.sections[0];
  const intro = page.sections[1];
  const servicesSec = page.sections[2];
  const closing = page.sections[4];

  // Above-the-fold Interactive Availability Checker State
  const [selectedSession, setSelectedSession] = useState<string>('Newborn Photography');
  const [timeframeInput, setTimeframeInput] = useState<string>('');

  const handleCheckAvailability = (e: React.FormEvent) => {
    e.preventDefault();
    onNavigate(`/contact?service=${encodeURIComponent(selectedSession)}${timeframeInput ? `&due=${encodeURIComponent(timeframeInput)}` : ''}`);
  };

  const handleOpenWillowBooking = () => {
    window.dispatchEvent(new CustomEvent('open-willow', {
      detail: {
        openBooking: true,
        sessionType: selectedSession,
        timeframe: timeframeInput || 'Flexible timeframe'
      }
    }));
  };

  const sessionCards = [
    {
      title: "Newborn Photography",
      slug: "/services/newborn-photography",
      timing: "5 to 20 days old",
      tagline: "Two hours unhurried, two wrap outfits, feeding breaks built in.",
      image: CLIENT_PHOTOS.newborn.src,
      alt: CLIENT_PHOTOS.newborn.alt,
      caption: "Gentle Newborn Studio Session",
      subcaption: "Newborn Session",
      tapeVariant: "kraft" as const,
      tapeAngle: -2,
    },
    {
      title: "Maternity Photography",
      slug: "/services/maternity-photography",
      timing: "28 to 34 weeks",
      tagline: "Soft, unposed bump portraits in warm natural studio light.",
      image: CLIENT_PHOTOS.maternity.src,
      alt: CLIENT_PHOTOS.maternity.alt,
      caption: "Studio Light Maternity Portrait",
      subcaption: "Maternity Session",
      tapeVariant: "blush" as const,
      tapeAngle: 1.5,
    },
    {
      title: "Family Photography",
      slug: "/services/family-photography",
      timing: "All ages & sitter sessions",
      tagline: "Real interaction and patience with young kids, in studio or nearby park.",
      image: CLIENT_PHOTOS.family.src,
      alt: CLIENT_PHOTOS.family.alt,
      caption: "Unhurried Family Connection",
      subcaption: "Family Session",
      tapeVariant: "sage" as const,
      tapeAngle: -1.5,
    },
    {
      title: "Cake Smash Photography",
      slug: "/services/cake-smash-photography",
      timing: "First birthday",
      tagline: "A messy, joyful milestone session with full studio cleanup included.",
      image: CLIENT_PHOTOS.cakeSmash.src,
      alt: CLIENT_PHOTOS.cakeSmash.alt,
      caption: "First Birthday Celebration",
      subcaption: "Cake Smash",
      tapeVariant: "kraft" as const,
      tapeAngle: 2,
    }
  ];

  return (
    <div className="w-full">
      {/* 1. HERO SECTION: Conversion-Optimized Above-the-Fold */}
      <section className="pt-6 pb-16 md:pt-12 md:pb-24 max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Hero Text & Interactive Availability Card (7 cols) */}
          <div className="lg:col-span-7 space-y-5 text-left">
            
            {/* Primary Headline */}
            <h1 className="font-display text-3xl sm:text-5xl lg:text-[54px] text-[#362E2B] leading-[1.12] font-normal tracking-tight">
              Newborn and Family Photography in Lightsview, Adelaide
            </h1>

            {/* Subheadline */}
            <p className="font-display text-lg sm:text-xl text-[#6E4E53] italic font-normal leading-relaxed">
              Quiet studio sessions timed around your baby, with feeding breaks built in, soft wraps provided, and pricing from {STUDIO_INFO.basePrice}.
            </p>

            {/* Value Proposition Pills */}
            <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-2.5 pt-1 text-xs text-[#362E2B]">
              <span className="inline-flex items-center gap-1.5 bg-[#FAF5EF] px-3 py-1.5 rounded-full border border-[#EAD3CE]">
                <Check size={14} weight="bold" className="text-[#9CAA8C]" />
                <span>2-Hour Session with Feeding Breaks</span>
              </span>
              <span className="inline-flex items-center gap-1.5 bg-[#FAF5EF] px-3 py-1.5 rounded-full border border-[#EAD3CE]">
                <Check size={14} weight="bold" className="text-[#9CAA8C]" />
                <span>Wraps and Props Provided</span>
              </span>
              <span className="inline-flex items-center gap-1.5 bg-[#FAF5EF] px-3 py-1.5 rounded-full border border-[#EAD3CE]">
                <Check size={14} weight="bold" className="text-[#9CAA8C]" />
                <span>Parents and Siblings Welcome</span>
              </span>
              <span className="inline-flex items-center gap-1.5 bg-[#FAF5EF] px-3 py-1.5 rounded-full border border-[#EAD3CE]">
                <Check size={14} weight="bold" className="text-[#9CAA8C]" />
                <span>All Sessions From {STUDIO_INFO.basePrice}</span>
              </span>
            </div>

            {/* Above-the-Fold Interactive Studio Availability & Booking Card */}
            <div className="mt-4 p-5 rounded-2xl bg-white/70 border border-[#EAD3CE] shadow-sm backdrop-blur-xs space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase tracking-wider font-semibold text-[#6E4E53] flex items-center gap-1.5">
                  <CalendarCheck size={16} weight="bold" className="text-[#6E4E53]" />
                  Check Dates and Book Studio Time
                </span>
                <span className="text-[11px] text-[#9CAA8C] font-medium">
                  From {STUDIO_INFO.basePrice} All-Inclusive
                </span>
              </div>

              {/* Session Selector Chips without emojis */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
                {[
                  { label: "Newborn", val: "Newborn Photography" },
                  { label: "Maternity", val: "Maternity Photography" },
                  { label: "Family", val: "Family Photography" },
                  { label: "Cake Smash", val: "Cake Smash Photography" },
                ].map((s) => (
                  <button
                    key={s.val}
                    type="button"
                    onClick={() => setSelectedSession(s.val)}
                    className={`px-2.5 py-1.5 text-xs rounded-lg font-medium transition-all text-center ${
                      selectedSession === s.val
                        ? "bg-[#6E4E53] text-[#FAF5EF] shadow-xs"
                        : "bg-[#FAF5EF] text-[#362E2B]/80 hover:bg-[#EAD3CE]/40 border border-[#EAD3CE]"
                    }`}
                  >
                    {s.label}
                  </button>
                ))}
              </div>

              {/* Due date input and Action Buttons */}
              <form onSubmit={handleCheckAvailability} className="flex flex-col sm:flex-row gap-2.5 items-stretch">
                <input
                  type="text"
                  placeholder="Baby's due date or preferred month (e.g. November)..."
                  value={timeframeInput}
                  onChange={(e) => setTimeframeInput(e.target.value)}
                  className="flex-1 px-3.5 py-2.5 rounded-xl border border-[#EAD3CE] bg-[#FAF5EF] text-xs text-[#362E2B] focus:outline-none focus:border-[#9CAA8C] placeholder:text-[#362E2B]/40"
                />
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-[#6E4E53] text-[#FAF5EF] font-medium text-xs hover:bg-[#583D42] transition-colors shadow-xs flex items-center justify-center gap-1.5 whitespace-nowrap cursor-pointer"
                >
                  <CalendarCheck size={16} weight="bold" />
                  <span>Book with Falguni</span>
                </button>
                <button
                  type="button"
                  onClick={handleOpenWillowBooking}
                  className="px-4 py-2.5 rounded-xl border border-[#9CAA8C] text-[#362E2B] font-medium text-xs hover:bg-[#EAD3CE]/30 transition-colors flex items-center justify-center gap-1.5 whitespace-nowrap cursor-pointer"
                  title="Ask Willow assistant to hold your date"
                >
                  <ChatCircleDots size={16} weight="regular" className="text-[#6E4E53]" />
                  <span>Hold via Chat</span>
                </button>
              </form>
            </div>

            {/* Micro Sub-note */}
            <div className="pt-1 flex items-center justify-between text-xs text-[#362E2B]/70">
              <span className="flex items-center gap-1 text-[#9CAA8C]">
                <Clock size={14} weight="bold" />
                Only 4 to 6 newborn spots accepted each month to keep sessions unrushed.
              </span>
              <button 
                onClick={() => onNavigate('/services/newborn-photography')}
                className="text-xs text-[#6E4E53] hover:underline cursor-pointer"
              >
                Learn what is included &rarr;
              </button>
            </div>

          </div>

          {/* Right Hero Printed Polaroid Frame with Washi Tape & Social Proof Stamp (5 cols) */}
          <div className="lg:col-span-5 flex flex-col items-center relative">
            <div className="relative">
              <PolaroidPhoto
                src={CLIENT_PHOTOS.newborn.src}
                alt={hero.image_alt_text || CLIENT_PHOTOS.newborn.alt}
                caption="Gentle Newborn Studio Session"
                subcaption="Lightsview Home Studio &middot; 5 to 20 Days Old"
                tapeVariant="kraft"
                tapeAngle={-2}
              />

              {/* Floating Real Review Overlay Badge */}
              <div className="absolute -bottom-5 sm:-bottom-7 -left-4 sm:-left-6 bg-[#FAF5EF] border border-[#EAD3CE] rounded-xl p-3.5 shadow-lg max-w-[260px] sm:max-w-[280px] z-20 text-left">
                <div className="flex items-center gap-1 text-[#C98A2C] mb-1">
                  <Star size={12} weight="fill" />
                  <Star size={12} weight="fill" />
                  <Star size={12} weight="fill" />
                  <Star size={12} weight="fill" />
                  <Star size={12} weight="fill" />
                  <span className="text-[10px] text-[#362E2B]/60 ml-1">Google Review</span>
                </div>
                <p className="text-[11px] text-[#362E2B]/85 italic leading-snug">
                  "Falguni was so calm and patient with our baby. Warm studio, zero rush. Truly recommend."
                </p>
                <span className="block text-[10px] text-[#6E4E53] font-semibold mt-1">
                  Harmandeep K., Adelaide Mother
                </span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Signature Ribbon Divider */}
      <RibbonDivider />

      {/* 2. STUDIO INTRO SECTION: A Studio Built on Patience */}
      <section className="py-20 max-w-6xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <div className="lg:col-span-5 flex justify-center order-2 lg:order-1">
            <PolaroidPhoto
              src={CLIENT_PHOTOS.falguni.src}
              fallbackSrc={CLIENT_PHOTOS.falguni.fallbackSrc}
              alt="Falguni, newborn and family photographer at Falguni's Photography home studio in Lightsview Adelaide"
              caption="Meet Falguni"
              subcaption="Lead Photographer & Mother · Lightsview Studio"
              tapeVariant="kraft"
              tapeAngle={1.5}
              aspectRatio="aspect-square"
            />
          </div>

          <div className="lg:col-span-7 space-y-6 text-left order-1 lg:order-2">
            <div className="space-y-2">
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl text-[#362E2B] font-normal">
                {intro.headline}
              </h2>
              <p className="font-display text-lg sm:text-xl text-[#6E4E53] italic">
                A calm, unhurried space tailored entirely to your baby.
              </p>
            </div>

            <div className="space-y-4 text-base sm:text-lg text-[#362E2B]/85 leading-relaxed">
              <p>{intro.body_copy}</p>
              <p className="text-sm text-[#6E4E53]/90 italic">
                &ldquo;Sessions move strictly to baby cues. Never watching a timer or cutting off a feed.&rdquo;
              </p>
            </div>

            <div className="pt-2">
              <button
                onClick={() => onNavigate('/about')}
                className="px-7 py-3 rounded-full border border-[#9CAA8C] text-[#362E2B] text-sm hover:bg-[#EAD3CE]/30 transition-colors inline-flex items-center gap-2 cursor-pointer"
              >
                <span>{intro.cta_text}</span>
                <ArrowRight size={16} weight="light" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Signature Ribbon Divider */}
      <RibbonDivider />

      {/* 3. SERVICES OVERVIEW SECTION: Printed Polaroids with Tape */}
      <section className="py-20 max-w-7xl mx-auto px-6 lg:px-12">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl text-[#362E2B] font-normal">
            {servicesSec.headline}
          </h2>
          <p className="font-display text-xl text-[#6E4E53] italic">
            {servicesSec.subheadline}
          </p>
          <p className="text-base text-[#362E2B]/80 max-w-xl mx-auto">
            {servicesSec.body_copy}
          </p>
        </div>

        {/* 2x2 Grid with Uniform Polaroid Photos with Washi Tape */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-14 items-stretch">
          {sessionCards.map((card) => (
            <div
              key={card.slug}
              className="bg-[#FAF5EF] border border-[#EAD3CE] rounded-[22px] p-6 sm:p-8 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between group"
            >
              {/* Polaroid Photo with Tape - EXACT SAME SIZE */}
              <div className="pt-2 pb-6">
                <PolaroidPhoto
                  src={card.image}
                  alt={card.alt}
                  caption={card.caption}
                  subcaption={card.timing}
                  tapeVariant={card.tapeVariant}
                  tapeAngle={card.tapeAngle}
                  onClick={() => onNavigate(card.slug)}
                  interactive={true}
                />
              </div>

              <div className="space-y-4 pt-2 border-t border-[#EAD3CE]/50">
                <div>
                  <h3 className="font-display text-2xl text-[#362E2B] mb-1.5 font-normal group-hover:text-[#6E4E53] transition-colors">
                    {card.title}
                  </h3>
                  <p className="text-sm text-[#362E2B]/80 leading-relaxed">
                    {card.tagline}
                  </p>
                </div>

                <div className="pt-2 flex items-center justify-between border-t border-[#EAD3CE]/40">
                  <span className="caption-text text-[#9CAA8C] font-semibold">
                    From {STUDIO_INFO.basePrice}
                  </span>
                  <button
                    onClick={() => onNavigate(card.slug)}
                    className="text-sm font-medium text-[#6E4E53] hover:text-[#362E2B] inline-flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <span>Session Details</span>
                    <ArrowRight size={14} weight="light" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-20">
          <button
            onClick={() => onNavigate('/gallery')}
            className="px-8 py-3.5 rounded-full bg-[#6E4E53] text-[#FAF5EF] text-sm md:text-base hover:bg-[#583D42] transition-colors inline-flex items-center gap-2"
          >
            <span>{servicesSec.cta_text}</span>
            <ArrowRight size={16} weight="light" />
          </button>
        </div>
      </section>

      {/* Signature Ribbon Divider */}
      <RibbonDivider />

      {/* 4. SOCIAL PROOF & CLIENT REVIEWS SECTION */}
      <ReviewsSection id="reviews" defaultLayout="carousel" />

      {/* Signature Ribbon Divider */}
      <RibbonDivider />

      {/* 5. CLOSING CTA SECTION */}
      <section className="py-20 max-w-4xl mx-auto px-6 lg:px-12 text-center">
        <div className="bg-[#EAD3CE]/25 border border-[#EAD3CE] rounded-[24px] p-10 md:p-16 space-y-6">
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl text-[#362E2B] font-normal">
            {closing.headline}
          </h2>
          <p className="font-display text-xl text-[#6E4E53] italic max-w-xl mx-auto">
            {closing.subheadline}
          </p>
          <div className="pt-4">
            <button
              onClick={() => onNavigate('/contact')}
              className="px-9 py-4 rounded-full bg-[#6E4E53] text-[#FAF5EF] font-medium text-base hover:bg-[#583D42] transition-colors shadow-sm inline-flex items-center gap-2"
            >
              <span>{closing.cta_text}</span>
              <CalendarCheck size={18} weight="light" />
            </button>
          </div>
          <p className="text-xs text-[#9CAA8C] uppercase tracking-wider pt-2">
            Home studio in Lightsview &middot; Sessions from {STUDIO_INFO.basePrice}
          </p>
        </div>
      </section>
    </div>
  );
};

