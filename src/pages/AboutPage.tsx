import React from 'react';
import { ArrowRight, Heart, Users, Clock, ShieldCheck } from '@phosphor-icons/react';
import { PAGES_DATA, STUDIO_INFO } from '../data/siteData';
import { CLIENT_PHOTOS } from '../assets/images';
import { RibbonDivider } from '../components/RibbonDivider';

interface AboutPageProps {
  onNavigate: (path: string) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  const page = PAGES_DATA.about;
  const hero = page.sections[0];
  const howFeels = page.sections[1];

  return (
    <div className="w-full">
      {/* 1. HERO SECTION: Exactly one H1 */}
      <section className="pt-8 pb-20 md:pt-16 md:pb-28 max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <div className="lg:col-span-7 space-y-6 text-left">
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl text-[#362E2B] leading-[1.12] font-normal">
              {hero.headline}
            </h1>

            <p className="text-base sm:text-lg text-[#362E2B]/85 max-w-2xl leading-relaxed">
              {hero.body_copy}
            </p>

            <div className="pt-4 flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <button
                onClick={() => onNavigate('/contact')}
                className="px-8 py-3.5 rounded-full bg-[#6E4E53] text-[#FAF5EF] font-medium text-base hover:bg-[#583D42] transition-colors shadow-sm inline-flex items-center gap-2"
              >
                <span>Book a Session</span>
                <ArrowRight size={18} weight="light" />
              </button>

              <button
                onClick={() => onNavigate('/gallery')}
                className="px-6 py-3.5 rounded-full border border-[#9CAA8C] text-[#362E2B] text-base hover:bg-[#EAD3CE]/30 transition-colors"
              >
                View Gallery
              </button>
            </div>

            <div className="pt-2 flex items-center gap-2 text-xs text-[#9CAA8C] uppercase tracking-wider">
              <span>Home Studio in Lightsview, Adelaide</span>
              <span>&middot;</span>
              <span>5.0 Stars on Google (60 Reviews)</span>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="relative rounded-[20px] overflow-hidden shadow-[0_12px_36px_-8px_rgba(110,78,83,0.18)] border border-[#EAD3CE]/80 bg-[#FAF5EF]">
              <img
                src={CLIENT_PHOTOS.photo2.src}
                alt={hero.image_alt_text || "Falguni's Photography home studio setup in Lightsview, Adelaide"}
                className="w-full h-auto object-cover aspect-[4/3] transform hover:scale-102 transition-transform duration-700 ease-out"
              />
            </div>
          </div>
        </div>
      </section>

      <RibbonDivider />

      {/* 2. HOW A SESSION FEELS: H2 */}
      <section className="py-20 max-w-5xl mx-auto px-6 lg:px-12 text-center">
        <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl text-[#362E2B] mb-6 font-normal">
          {howFeels.headline}
        </h2>

        <div className="max-w-3xl mx-auto space-y-6 text-base sm:text-lg text-[#362E2B]/85 leading-relaxed">
          <p>{howFeels.body_copy}</p>
        </div>

        {/* Studio pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 text-left">
          <div className="bg-[#FAF5EF] border border-[#EAD3CE] rounded-[20px] p-8 shadow-xs">
            <div className="w-10 h-10 rounded-full bg-[#9CAA8C]/20 text-[#6E4E53] flex items-center justify-center mb-4">
              <Clock size={20} weight="light" />
            </div>
            <h3 className="font-display text-2xl text-[#362E2B] font-normal mb-2">
              Unrushed Pacing
            </h3>
            <p className="text-sm text-[#362E2B]/80 leading-relaxed">
              Sessions move strictly to your baby&apos;s cues. Never watching a timer or cutting off a feed.
            </p>
          </div>

          <div className="bg-[#FAF5EF] border border-[#EAD3CE] rounded-[20px] p-8 shadow-xs">
            <div className="w-10 h-10 rounded-full bg-[#9CAA8C]/20 text-[#6E4E53] flex items-center justify-center mb-4">
              <Users size={20} weight="light" />
            </div>
            <h3 className="font-display text-2xl text-[#362E2B] font-normal mb-2">
              Husband &amp; Wife Team
            </h3>
            <p className="text-sm text-[#362E2B]/80 leading-relaxed">
              Falguni photographs while her husband handles wraps, lighting, and setup so the room stays calm.
            </p>
          </div>

          <div className="bg-[#FAF5EF] border border-[#EAD3CE] rounded-[20px] p-8 shadow-xs">
            <div className="w-10 h-10 rounded-full bg-[#9CAA8C]/20 text-[#6E4E53] flex items-center justify-center mb-4">
              <Heart size={20} weight="light" />
            </div>
            <h3 className="font-display text-2xl text-[#362E2B] font-normal mb-2">
              True Comfort
            </h3>
            <p className="text-sm text-[#362E2B]/80 leading-relaxed">
              A private home studio space where parents can take a deep breath and feel at ease.
            </p>
          </div>
        </div>

        <div className="mt-14">
          <button
            onClick={() => onNavigate('/contact')}
            className="px-8 py-3.5 rounded-full bg-[#6E4E53] text-[#FAF5EF] font-medium text-base hover:bg-[#583D42] transition-colors shadow-sm inline-flex items-center gap-2"
          >
            <span>{howFeels.cta_text || 'Book a Session'}</span>
            <ArrowRight size={18} weight="light" />
          </button>
        </div>
      </section>
    </div>
  );
};
