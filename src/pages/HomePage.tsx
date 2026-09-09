import React from 'react';
import { ArrowRight, CalendarCheck, ShieldCheck } from '@phosphor-icons/react';
import { PAGES_DATA, STUDIO_INFO } from '../data/siteData';
import { CLIENT_PHOTOS } from '../assets/images';
import { RibbonDivider } from '../components/RibbonDivider';

interface HomePageProps {
  onNavigate: (path: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  const page = PAGES_DATA.home;
  const hero = page.sections[0];
  const intro = page.sections[1];
  const servicesSec = page.sections[2];
  const testimonials = page.sections[3];
  const closing = page.sections[4];

  const sessionCards = [
    {
      title: "Newborn Photography",
      slug: "/services/newborn-photography",
      timing: "5 to 20 days old",
      tagline: "Two hours unhurried, two wrap outfits, feeding breaks built in.",
      image: CLIENT_PHOTOS.photo1.src,
      alt: CLIENT_PHOTOS.photo1.alt
    },
    {
      title: "Maternity Photography",
      slug: "/services/maternity-photography",
      timing: "28 to 34 weeks",
      tagline: "Soft, unposed bump portraits in warm natural studio light.",
      image: CLIENT_PHOTOS.photo3.src,
      alt: CLIENT_PHOTOS.photo3.alt
    },
    {
      title: "Family Photography",
      slug: "/services/family-photography",
      timing: "All ages & sitter sessions",
      tagline: "Real interaction and patience with young kids, in studio or nearby park.",
      image: CLIENT_PHOTOS.photo4.src,
      alt: CLIENT_PHOTOS.photo4.alt
    },
    {
      title: "Cake Smash Photography",
      slug: "/services/cake-smash-photography",
      timing: "First birthday",
      tagline: "A messy, joyful milestone session with full studio cleanup included.",
      image: CLIENT_PHOTOS.photo2.src,
      alt: CLIENT_PHOTOS.photo2.alt
    }
  ];

  return (
    <div className="w-full">
      {/* 1. HERO SECTION: Asymmetric film-strip hero */}
      <section className="pt-8 pb-20 md:pt-16 md:pb-28 max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Hero Text Column (7 cols) */}
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
              <button
                onClick={() => onNavigate('/contact')}
                className="px-8 py-3.5 rounded-full bg-[#6E4E53] text-[#FAF5EF] font-medium text-base hover:bg-[#583D42] transition-colors shadow-sm inline-flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-[#9CAA8C]"
              >
                <span>{hero.cta_text}</span>
                <ArrowRight size={18} weight="light" />
              </button>

              <button
                onClick={() => onNavigate('/services/newborn-photography')}
                className="px-6 py-3.5 rounded-full border border-[#9CAA8C] text-[#362E2B] text-base hover:bg-[#EAD3CE]/30 transition-colors inline-flex items-center gap-2"
              >
                <span>Explore Newborn Sessions</span>
              </button>
            </div>

            <div className="pt-2 flex items-center gap-2 text-xs text-[#9CAA8C] uppercase tracking-wider">
              <span>Home studio in Lightsview</span>
              <span>&middot;</span>
              <span>Every session starts at {STUDIO_INFO.basePrice}</span>
            </div>
          </div>

          {/* Right Hero Asymmetric Photo Frame (5 cols) */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Asymmetric film-strip offset frame */}
              <div className="relative rounded-[20px] overflow-hidden shadow-[0_12px_36px_-8px_rgba(110,78,83,0.18)] border border-[#EAD3CE]/80 bg-[#FAF5EF]">
                <img
                  src={CLIENT_PHOTOS.photo1.src}
                  alt={hero.image_alt_text || CLIENT_PHOTOS.photo1.alt}
                  className="w-full h-auto object-cover aspect-[4/3] transform hover:scale-102 transition-transform duration-700 ease-out"
                />
              </div>

              {/* Offset film-strip accent label */}
              <div className="absolute -bottom-6 -left-4 bg-[#FAF5EF] border border-[#EAD3CE] px-5 py-3 rounded-[16px] shadow-sm hidden sm:block">
                <span className="block caption-text text-[#6E4E53] font-semibold">
                  Real Client Session
                </span>
                <span className="font-display text-sm text-[#362E2B]">
                  Lightsview Home Studio
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Signature Ribbon Divider */}
      <RibbonDivider />

      {/* 2. STUDIO INTRO SECTION: A Studio Built on Patience */}
      <section className="py-20 max-w-5xl mx-auto px-6 lg:px-12 text-center">
        <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl text-[#362E2B] mb-6 font-normal">
          {intro.headline}
        </h2>

        <div className="max-w-3xl mx-auto space-y-6 text-base sm:text-lg text-[#362E2B]/85 leading-relaxed">
          <p>{intro.body_copy}</p>
        </div>

        <div className="mt-8 flex justify-center">
          <button
            onClick={() => onNavigate('/about')}
            className="px-7 py-3 rounded-full border border-[#9CAA8C] text-[#362E2B] text-sm hover:bg-[#EAD3CE]/30 transition-colors inline-flex items-center gap-2"
          >
            <span>{intro.cta_text}</span>
            <ArrowRight size={16} weight="light" />
          </button>
        </div>
      </section>

      {/* Signature Ribbon Divider */}
      <RibbonDivider />

      {/* 3. SERVICES OVERVIEW SECTION: Asymmetric 2x2 Film-Strip Sessions */}
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

        {/* Asymmetric film-strip staggered layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {sessionCards.map((card, idx) => {
            const isOffset = idx % 2 === 1;
            return (
              <div
                key={card.slug}
                className={`bg-[#FAF5EF] border border-[#EAD3CE] rounded-[20px] overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col group ${
                  isOffset ? 'md:translate-y-6' : ''
                }`}
              >
                <div className="relative overflow-hidden aspect-[16/10] bg-[#FAF5EF]">
                  <img
                    src={card.image}
                    alt={card.alt}
                    className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500 ease-out"
                  />
                  <div className="absolute top-4 right-4 bg-[#FAF5EF]/95 border border-[#EAD3CE] px-3.5 py-1 rounded-full text-xs text-[#6E4E53] font-medium shadow-xs">
                    {card.timing}
                  </div>
                </div>

                <div className="p-7 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <h3 className="font-display text-2xl text-[#362E2B] mb-2 font-normal group-hover:text-[#6E4E53] transition-colors">
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
                      className="text-sm font-medium text-[#6E4E53] hover:text-[#362E2B] inline-flex items-center gap-1.5 transition-colors"
                    >
                      <span>Session Details</span>
                      <ArrowRight size={14} weight="light" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
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

      {/* 4. TESTIMONIALS SECTION: Real Attributed Google Reviews */}
      <section className="py-20 max-w-6xl mx-auto px-6 lg:px-12">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-2">
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl text-[#362E2B] font-normal">
            {testimonials.headline}
          </h2>
          <p className="font-display text-lg sm:text-xl text-[#6E4E53] italic">
            {testimonials.subheadline}
          </p>
        </div>

        {/* Real review quotes in restrained, tactile asymmetric layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-[#FAF5EF] border border-[#EAD3CE] rounded-[20px] p-8 shadow-xs flex flex-col justify-between">
            <p className="text-base text-[#362E2B]/85 italic leading-relaxed mb-6 font-display text-lg">
              &ldquo;She is really very nice. Very cooperative and warm welcoming behaviour of her and family. Really recommend.&rdquo;
            </p>
            <div className="pt-4 border-t border-[#EAD3CE]/40">
              <span className="caption-text text-[#6E4E53] font-semibold block">
                Harmandeep K.
              </span>
              <span className="text-xs text-[#9CAA8C]">Google Review</span>
            </div>
          </div>

          <div className="bg-[#FAF5EF] border border-[#EAD3CE] rounded-[20px] p-8 shadow-xs flex flex-col justify-between md:-translate-y-3">
            <p className="text-base text-[#362E2B]/85 italic leading-relaxed mb-6 font-display text-lg">
              &ldquo;I am happy with experience of getting my 5 weeks baby photoshoot done by Falguni. She is excellent, amazing and wonderful.&rdquo;
            </p>
            <div className="pt-4 border-t border-[#EAD3CE]/40">
              <span className="caption-text text-[#6E4E53] font-semibold block">
                Prabhjot G.
              </span>
              <span className="text-xs text-[#9CAA8C]">Google Review</span>
            </div>
          </div>

          <div className="bg-[#FAF5EF] border border-[#EAD3CE] rounded-[20px] p-8 shadow-xs flex flex-col justify-between">
            <p className="text-base text-[#362E2B]/85 italic leading-relaxed mb-6 font-display text-lg">
              &ldquo;Very professional and very calm, especially needed this kind of patience when it is newborns or month old baby&apos;s photoshoot.&rdquo;
            </p>
            <div className="pt-4 border-t border-[#EAD3CE]/40">
              <span className="caption-text text-[#6E4E53] font-semibold block">
                Gurpreet S.
              </span>
              <span className="text-xs text-[#9CAA8C]">Google Review</span>
            </div>
          </div>
        </div>
      </section>

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
