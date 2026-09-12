import React, { useState } from 'react';
import { 
  ArrowRight, 
  CalendarCheck, 
  Star, 
  Clock, 
  ChatCircleDots, 
  Check,
  MagnifyingGlassPlus,
  X,
  MapPin,
  Phone,
  ShieldCheck,
  Heart,
  Sparkle
} from '@phosphor-icons/react';
import { PAGES_DATA, STUDIO_INFO } from '../data/siteData';
import { CLIENT_PHOTOS } from '../assets/images';
import { RibbonDivider } from '../components/RibbonDivider';
import { PolaroidPhoto } from '../components/PolaroidPhoto';
import { ReviewsSection } from '../components/ReviewsSection';
import { BookingForm } from '../components/BookingForm';
import { FaqAccordion } from '../components/FaqAccordion';

interface HomePageProps {
  onNavigate?: (path: string) => void;
}

export const HomePage: React.FC<HomePageProps> = () => {
  // Hero Interactive Availability Checker State
  const [selectedSession, setSelectedSession] = useState<string>('Newborn Photography');
  const [timeframeInput, setTimeframeInput] = useState<string>('');

  // Active Tab for Sessions Explorer
  const [activeSessionTab, setActiveSessionTab] = useState<string>('newborn');

  // Gallery Filter & Lightbox State
  const [activeGalleryFilter, setActiveGalleryFilter] = useState<string>('all');
  const [lightboxPhoto, setLightboxPhoto] = useState<{
    src: string;
    fallbackSrc?: string;
    alt: string;
    caption: string;
    subcaption?: string;
  } | null>(null);

  const scrollToSection = (targetId: string) => {
    const el = document.getElementById(targetId);
    if (el) {
      const navOffset = 80;
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const handleHeroCheckAvailability = (e: React.FormEvent) => {
    e.preventDefault();
    scrollToSection('contact');
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

  const handleSelectSessionForBooking = (sessionName: string) => {
    setSelectedSession(sessionName);
    scrollToSection('contact');
  };

  // Gallery items with categories
  const allGalleryItems = [
    {
      ...CLIENT_PHOTOS.newborn,
      category: 'newborn',
      categoryLabel: 'Newborn Session',
      tapeVariant: 'kraft' as const,
      tapeAngle: -2,
    },
    {
      ...CLIENT_PHOTOS.maternity,
      category: 'maternity',
      categoryLabel: 'Maternity Session',
      tapeVariant: 'blush' as const,
      tapeAngle: 1.5,
    },
    {
      ...CLIENT_PHOTOS.cakeSmash,
      category: 'cakeSmash',
      categoryLabel: 'Cake Smash Session',
      tapeVariant: 'sage' as const,
      tapeAngle: -1.5,
    },
    {
      ...CLIENT_PHOTOS.family,
      category: 'family',
      categoryLabel: 'Family Session',
      tapeVariant: 'kraft' as const,
      tapeAngle: 2,
    },
  ];

  const filteredGalleryItems = activeGalleryFilter === 'all'
    ? allGalleryItems
    : allGalleryItems.filter(item => item.category === activeGalleryFilter);

  // Consolidated Comprehensive FAQs
  const landingFaqItems = [
    {
      question: "When should I book my newborn photography session?",
      answer: "We recommend booking during your second or third trimester based on your estimated due date. Newborn sessions work best between 5 and 20 days old, when babies sleep deeply and curl naturally. Booking early holds your spot on Falguni's studio calendar (only 4 to 6 spots per month), and we confirm the exact date once baby arrives."
    },
    {
      question: "What happens if my baby is fussy, hungry, or needs diaper changes during the shoot?",
      answer: "Every newborn session runs for a generous two hours specifically so there is never any rush. Falguni and her husband keep the studio warm and calm. If baby needs nursing, bottle feeding, soothing, or a nappy change, we stop completely. Sessions move strictly to your baby's pace."
    },
    {
      question: "Are newborn wraps, outfits, and props provided?",
      answer: "Yes, Falguni provides soft organic wraps, knit outfits, headbands, and sanitized props in gentle studio neutral palettes. You don't need to bring anything other than standard baby essentials (nappies, wipes, and milk)."
    },
    {
      question: "Can parents and siblings participate in the photoshoot?",
      answer: "Yes, parent and sibling portraits are warmly welcomed during every newborn session at no extra charge. We recommend simple, solid neutral clothing (creams, whites, soft earthy tones) to keep photos timeless."
    },
    {
      question: "What is the best time for maternity photos?",
      answer: "Most expectant parents book between 28 and 34 weeks, when your bump is nicely rounded and standing or sitting remains comfortable. We provide wardrobe guidance before your session."
    },
    {
      question: "What is included in the $300 session fee?",
      answer: "All sessions start at $300 all-inclusive, covering the dedicated session time, styling, props, and professionally retouched high-resolution digital images with full personal print rights. There are zero surprise viewing-room fees or forced print packages."
    },
    {
      question: "How do we receive our photos and how long does it take?",
      answer: "Your edited high-resolution images are delivered via a private, password-protected online digital gallery within two weeks of your session. You can download and print them anywhere you choose."
    },
    {
      question: "Where is the studio located and is parking easy?",
      answer: "Our home studio is located at 26 South Pkwy, Northfield SA 5085, right in the Lightsview community. Free, easy on-street parking is right outside the door, so transferring baby and pram from your car is stress-free."
    }
  ];

  return (
    <div className="w-full">
      {/* 1. HERO SECTION: Conversion-Optimized Above-the-Fold */}
      <section id="hero" className="pt-6 pb-16 md:pt-12 md:pb-24 max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Hero Text & Interactive Availability Card (7 cols) */}
          <div className="lg:col-span-7 space-y-5 text-left">
            
            {/* Primary SEO H1 */}
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

            {/* Interactive Studio Availability & Date Hold Card */}
            <div className="mt-4 p-5 rounded-2xl bg-white/70 border border-[#EAD3CE] shadow-sm backdrop-blur-xs space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase tracking-wider font-semibold text-[#6E4E53] flex items-center gap-1.5">
                  <CalendarCheck size={16} weight="bold" className="text-[#6E4E53]" />
                  Check Dates & Hold Your Month
                </span>
                <span className="text-[11px] text-[#9CAA8C] font-medium">
                  From {STUDIO_INFO.basePrice} All-Inclusive
                </span>
              </div>

              {/* Session Selector Chips */}
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
                    className={`px-2.5 py-1.5 text-xs rounded-lg font-medium transition-all text-center cursor-pointer ${
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
              <form onSubmit={handleHeroCheckAvailability} className="flex flex-col sm:flex-row gap-2.5 items-stretch">
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
                <a
                  href={`tel:${STUDIO_INFO.phone.replace(/\s+/g, '')}`}
                  className="px-4 py-2.5 rounded-xl border border-[#9CAA8C] text-[#362E2B] font-medium text-xs hover:bg-[#EAD3CE]/30 transition-colors flex items-center justify-center gap-1.5 whitespace-nowrap cursor-pointer"
                  title={`Call Falguni directly: ${STUDIO_INFO.phoneDisplay}`}
                >
                  <Phone size={16} weight="regular" className="text-[#6E4E53]" />
                  <span>Call Falguni</span>
                </a>
              </form>
            </div>

            {/* Micro Sub-note */}
            <div className="pt-1 flex items-center justify-between text-xs text-[#362E2B]/70">
              <span className="flex items-center gap-1 text-[#9CAA8C]">
                <Clock size={14} weight="bold" />
                Only 4 to 6 newborn spots accepted each month to keep sessions unrushed.
              </span>
              <button 
                onClick={() => scrollToSection('sessions')}
                className="text-xs text-[#6E4E53] hover:underline cursor-pointer"
              >
                View session details &rarr;
              </button>
            </div>

          </div>

          {/* Right Hero Printed Polaroid Frame with Washi Tape & Social Proof Stamp (5 cols) */}
          <div className="lg:col-span-5 flex flex-col items-center relative">
            <div className="relative">
              <PolaroidPhoto
                src={CLIENT_PHOTOS.newborn.src}
                fallbackSrc={CLIENT_PHOTOS.newborn.fallbackSrc}
                alt="Newborn baby sleeping wrapped in a soft cream blanket during a photography session in Adelaide"
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
                  &ldquo;Falguni was so calm and patient with our baby. Warm studio, zero rush. Truly recommend.&rdquo;
                </p>
                <span className="block text-[10px] text-[#6E4E53] font-semibold mt-1">
                  Harmandeep K., Adelaide Mother
                </span>
              </div>
            </div>
          </div>

        </div>
      </section>

      <RibbonDivider />

      {/* 2. ABOUT STUDIO SECTION: A Studio Built on Patience */}
      <section id="about" className="py-20 max-w-6xl mx-auto px-6 lg:px-12">
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
              <span className="caption-text text-[#9CAA8C] uppercase tracking-wider text-xs font-semibold">
                Our Home Studio Philosophy
              </span>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl text-[#362E2B] font-normal">
                A Quiet Studio in Lightsview Built on Patience
              </h2>
              <p className="font-display text-lg sm:text-xl text-[#6E4E53] italic">
                A calm, unhurried space tailored entirely to your baby&apos;s cues.
              </p>
            </div>

            <div className="space-y-4 text-base sm:text-lg text-[#362E2B]/85 leading-relaxed">
              <p>
                Falguni photographs newborns from five days old, working alongside her husband to keep sessions warm, relaxed, and unhurried. Parents return for second babies, first birthdays, and updated family portraits because the home studio feels comfortable and welcoming from the moment you step through the door.
              </p>
              <p>
                Her approach is straightforward: give babies time, follow their cues, and capture real expressions without forcing rigid poses. There is never any clock-watching when baby needs a cuddle or feed.
              </p>
            </div>

            {/* Studio highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 text-sm text-[#362E2B]/90">
              <div className="flex items-start gap-2.5 p-3 rounded-xl bg-white/50 border border-[#EAD3CE]">
                <Heart size={18} weight="fill" className="text-[#6E4E53] shrink-0 mt-0.5" />
                <div>
                  <strong className="block font-medium">Warm & Temperature Regulated</strong>
                  <span className="text-xs text-[#362E2B]/75">Kept cozy so babies stay sleepy and relaxed while unwrapped.</span>
                </div>
              </div>
              <div className="flex items-start gap-2.5 p-3 rounded-xl bg-white/50 border border-[#EAD3CE]">
                <ShieldCheck size={18} weight="fill" className="text-[#9CAA8C] shrink-0 mt-0.5" />
                <div>
                  <strong className="block font-medium">Sanitized Props & Wraps</strong>
                  <span className="text-xs text-[#362E2B]/75">Freshly laundered organic fabrics, gentle on delicate newborn skin.</span>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={() => scrollToSection('sessions')}
                className="px-7 py-3 rounded-full border border-[#9CAA8C] text-[#362E2B] text-sm hover:bg-[#EAD3CE]/30 transition-colors inline-flex items-center gap-2 cursor-pointer"
              >
                <span>Explore Session Types</span>
                <ArrowRight size={16} weight="light" />
              </button>
            </div>
          </div>
        </div>
      </section>

      <RibbonDivider />

      {/* 3. SESSIONS & PACKAGES SECTION: Detailed Milestone Explorers */}
      <section id="sessions" className="py-20 max-w-7xl mx-auto px-6 lg:px-12">
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <span className="caption-text text-[#9CAA8C] uppercase tracking-wider text-xs font-semibold">
            Boutique Offerings
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl text-[#362E2B] font-normal">
            Sessions Designed for Every Milestone
          </h2>
          <p className="font-display text-xl text-[#6E4E53] italic">
            Every session starts at {STUDIO_INFO.basePrice} all-inclusive.
          </p>
          <p className="text-base text-[#362E2B]/80 max-w-xl mx-auto">
            Newborn, maternity, family, and cake smash sessions tailored to the age and stage you want to remember.
          </p>
        </div>

        {/* Interactive Session Category Selector */}
        <div className="flex justify-center flex-wrap gap-2 mb-10">
          {[
            { id: 'newborn', label: 'Newborn (5-20 Days)' },
            { id: 'maternity', label: 'Maternity (28-34 Weeks)' },
            { id: 'family', label: 'Family & Sitters' },
            { id: 'cakeSmash', label: 'First Birthday Cake Smash' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveSessionTab(tab.id)}
              className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-medium transition-all cursor-pointer ${
                activeSessionTab === tab.id
                  ? 'bg-[#6E4E53] text-[#FAF5EF] shadow-sm'
                  : 'bg-white/80 text-[#362E2B]/80 hover:bg-[#EAD3CE]/40 border border-[#EAD3CE]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Session Detail Content Cards */}
        {activeSessionTab === 'newborn' && (
          <div className="bg-[#FAF5EF] border border-[#EAD3CE] rounded-[24px] p-8 lg:p-12 shadow-sm animate-in fade-in duration-300">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              <div className="lg:col-span-6 space-y-5 text-left">
                <div className="space-y-1.5">
                  <span className="text-xs font-semibold text-[#9CAA8C] uppercase tracking-wider">
                    Our Specialty &middot; Lightsview Studio
                  </span>
                  <h3 className="font-display text-3xl sm:text-4xl text-[#362E2B] font-normal">
                    Newborn Photography
                  </h3>
                  <p className="font-display text-lg text-[#6E4E53] italic">
                    Best between 5 and 20 days old &middot; Two hours unhurried
                  </p>
                </div>

                <p className="text-sm sm:text-base text-[#362E2B]/85 leading-relaxed">
                  Sessions run for two unhurried hours in our temperature-regulated Lightsview studio. Two wrap outfits are provided, with ample time set aside for feeds, cuddles, and settling. Parents return because they never feel pressured or rushed.
                </p>

                <div className="space-y-2.5 pt-2 border-t border-[#EAD3CE]/60">
                  <span className="text-xs font-semibold text-[#6E4E53] uppercase tracking-wider block">
                    What&apos;s Included for {STUDIO_INFO.basePrice}:
                  </span>
                  <ul className="space-y-2 text-xs sm:text-sm text-[#362E2B]/90">
                    <li className="flex items-center gap-2">
                      <Check size={16} weight="bold" className="text-[#9CAA8C] shrink-0" />
                      <span><strong>2 hours of unhurried studio time</strong> with nursing breaks built in</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check size={16} weight="bold" className="text-[#9CAA8C] shrink-0" />
                      <span><strong>Two wrap outfits & props</strong> in soft studio neutral tones</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check size={16} weight="bold" className="text-[#9CAA8C] shrink-0" />
                      <span><strong>6 professionally retouched high-resolution images</strong> with print release</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check size={16} weight="bold" className="text-[#9CAA8C] shrink-0" />
                      <span><strong>Optional parent & sibling portraits</strong> included at no extra cost</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check size={16} weight="bold" className="text-[#9CAA8C] shrink-0" />
                      <span><strong>Flexible date adjustment</strong> if baby arrives earlier or later than expected</span>
                    </li>
                  </ul>
                </div>

                <div className="pt-4 flex items-center gap-4">
                  <button
                    onClick={() => handleSelectSessionForBooking('Newborn Photography')}
                    className="px-6 py-3 rounded-full bg-[#6E4E53] text-[#FAF5EF] text-sm hover:bg-[#583D42] transition-colors inline-flex items-center gap-2 shadow-xs cursor-pointer"
                  >
                    <span>Book Newborn Session</span>
                    <CalendarCheck size={16} weight="light" />
                  </button>
                  <span className="caption-text text-xs text-[#9CAA8C] font-semibold">
                    From {STUDIO_INFO.basePrice}
                  </span>
                </div>
              </div>

              <div className="lg:col-span-6 flex justify-center">
                <PolaroidPhoto
                  src={CLIENT_PHOTOS.newborn.src}
                  fallbackSrc={CLIENT_PHOTOS.newborn.fallbackSrc}
                  alt="Gentle newborn photography session in Adelaide"
                  caption="Gentle Newborn Studio Session"
                  subcaption="Lightsview Home Studio &middot; 5 to 20 Days Old"
                  tapeVariant="kraft"
                  tapeAngle={-1.5}
                />
              </div>
            </div>
          </div>
        )}

        {activeSessionTab === 'maternity' && (
          <div className="bg-[#FAF5EF] border border-[#EAD3CE] rounded-[24px] p-8 lg:p-12 shadow-sm animate-in fade-in duration-300">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              <div className="lg:col-span-6 space-y-5 text-left">
                <div className="space-y-1.5">
                  <span className="text-xs font-semibold text-[#9CAA8C] uppercase tracking-wider">
                    Celebrating Motherhood
                  </span>
                  <h3 className="font-display text-3xl sm:text-4xl text-[#362E2B] font-normal">
                    Maternity Photography
                  </h3>
                  <p className="font-display text-lg text-[#6E4E53] italic">
                    Best between 28 and 34 weeks &middot; Soft natural studio light
                  </p>
                </div>

                <p className="text-sm sm:text-base text-[#362E2B]/85 leading-relaxed">
                  Simple, elegant portraits in the weeks before your baby arrives. Using soft studio lighting and neutral backdrops, attention stays on you and your bump. We offer wardrobe advice before your session so you feel relaxed and confident.
                </p>

                <div className="space-y-2.5 pt-2 border-t border-[#EAD3CE]/60">
                  <span className="text-xs font-semibold text-[#6E4E53] uppercase tracking-wider block">
                    What&apos;s Included for {STUDIO_INFO.basePrice}:
                  </span>
                  <ul className="space-y-2 text-xs sm:text-sm text-[#362E2B]/90">
                    <li className="flex items-center gap-2">
                      <Check size={16} weight="bold" className="text-[#9CAA8C] shrink-0" />
                      <span><strong>Up to 90 minutes of relaxed studio portraiture</strong></span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check size={16} weight="bold" className="text-[#9CAA8C] shrink-0" />
                      <span><strong>Wardrobe styling & guidance</strong> tailored to your comfort</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check size={16} weight="bold" className="text-[#9CAA8C] shrink-0" />
                      <span><strong>Partners and older children</strong> welcome at no extra fee</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check size={16} weight="bold" className="text-[#9CAA8C] shrink-0" />
                      <span><strong>Fully edited high-resolution digital gallery</strong> within two weeks</span>
                    </li>
                  </ul>
                </div>

                <div className="pt-4 flex items-center gap-4">
                  <button
                    onClick={() => handleSelectSessionForBooking('Maternity Photography')}
                    className="px-6 py-3 rounded-full bg-[#6E4E53] text-[#FAF5EF] text-sm hover:bg-[#583D42] transition-colors inline-flex items-center gap-2 shadow-xs cursor-pointer"
                  >
                    <span>Book Maternity Session</span>
                    <CalendarCheck size={16} weight="light" />
                  </button>
                  <span className="caption-text text-xs text-[#9CAA8C] font-semibold">
                    From {STUDIO_INFO.basePrice}
                  </span>
                </div>
              </div>

              <div className="lg:col-span-6 flex justify-center">
                <PolaroidPhoto
                  src={CLIENT_PHOTOS.maternity.src}
                  fallbackSrc={CLIENT_PHOTOS.maternity.fallbackSrc}
                  alt="Expecting mother in natural studio light"
                  caption="Studio Light Maternity Portrait"
                  subcaption="Lightsview Studio &middot; 28 to 34 Weeks"
                  tapeVariant="blush"
                  tapeAngle={1.5}
                />
              </div>
            </div>
          </div>
        )}

        {activeSessionTab === 'family' && (
          <div className="bg-[#FAF5EF] border border-[#EAD3CE] rounded-[24px] p-8 lg:p-12 shadow-sm animate-in fade-in duration-300">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              <div className="lg:col-span-6 space-y-5 text-left">
                <div className="space-y-1.5">
                  <span className="text-xs font-semibold text-[#9CAA8C] uppercase tracking-wider">
                    Connection & Laughter
                  </span>
                  <h3 className="font-display text-3xl sm:text-4xl text-[#362E2B] font-normal">
                    Family & Sitter Photography
                  </h3>
                  <p className="font-display text-lg text-[#6E4E53] italic">
                    All ages & sitter milestones (6-9 months) &middot; Studio or outdoor
                  </p>
                </div>

                <p className="text-sm sm:text-base text-[#362E2B]/85 leading-relaxed">
                  Natural portraits of your family, captured comfortably. Falguni gives children time to play and laugh naturally rather than demanding stiff poses. Available in our warm indoor studio or at a nearby north-eastern Adelaide park.
                </p>

                <div className="space-y-2.5 pt-2 border-t border-[#EAD3CE]/60">
                  <span className="text-xs font-semibold text-[#6E4E53] uppercase tracking-wider block">
                    What&apos;s Included for {STUDIO_INFO.basePrice}:
                  </span>
                  <ul className="space-y-2 text-xs sm:text-sm text-[#362E2B]/90">
                    <li className="flex items-center gap-2">
                      <Check size={16} weight="bold" className="text-[#9CAA8C] shrink-0" />
                      <span><strong>1 hour session for up to 5 family members</strong></span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check size={16} weight="bold" className="text-[#9CAA8C] shrink-0" />
                      <span><strong>Studio or outdoor park setting</strong> in Adelaide NE</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check size={16} weight="bold" className="text-[#9CAA8C] shrink-0" />
                      <span><strong>Patient, playful guidance</strong> for energetic toddlers & kids</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check size={16} weight="bold" className="text-[#9CAA8C] shrink-0" />
                      <span><strong>Fully edited digital gallery</strong> delivered within 2 weeks</span>
                    </li>
                  </ul>
                </div>

                <div className="pt-4 flex items-center gap-4">
                  <button
                    onClick={() => handleSelectSessionForBooking('Family Photography')}
                    className="px-6 py-3 rounded-full bg-[#6E4E53] text-[#FAF5EF] text-sm hover:bg-[#583D42] transition-colors inline-flex items-center gap-2 shadow-xs cursor-pointer"
                  >
                    <span>Book Family Session</span>
                    <CalendarCheck size={16} weight="light" />
                  </button>
                  <span className="caption-text text-xs text-[#9CAA8C] font-semibold">
                    From {STUDIO_INFO.basePrice}
                  </span>
                </div>
              </div>

              <div className="lg:col-span-6 flex justify-center">
                <PolaroidPhoto
                  src={CLIENT_PHOTOS.family.src}
                  fallbackSrc={CLIENT_PHOTOS.family.fallbackSrc}
                  alt="Family laughing together during photography session"
                  caption="Unhurried Family Connection"
                  subcaption="Lightsview Studio or Outdoor Park"
                  tapeVariant="sage"
                  tapeAngle={-1.5}
                />
              </div>
            </div>
          </div>
        )}

        {activeSessionTab === 'cakeSmash' && (
          <div className="bg-[#FAF5EF] border border-[#EAD3CE] rounded-[24px] p-8 lg:p-12 shadow-sm animate-in fade-in duration-300">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              <div className="lg:col-span-6 space-y-5 text-left">
                <div className="space-y-1.5">
                  <span className="text-xs font-semibold text-[#9CAA8C] uppercase tracking-wider">
                    First Birthday Milestone
                  </span>
                  <h3 className="font-display text-3xl sm:text-4xl text-[#362E2B] font-normal">
                    Cake Smash Photography
                  </h3>
                  <p className="font-display text-lg text-[#6E4E53] italic">
                    Turning One Celebration &middot; Full studio cleanup included
                  </p>
                </div>

                <p className="text-sm sm:text-base text-[#362E2B]/85 leading-relaxed">
                  Celebrate your little one turning one with a joyful, messy milestone session. Falguni coordinates the backdrop styling, lets your baby explore their cake, and finishes with a warm bubble bath splash so baby leaves fresh and clean. Falguni handles all cleanup!
                </p>

                <div className="space-y-2.5 pt-2 border-t border-[#EAD3CE]/60">
                  <span className="text-xs font-semibold text-[#6E4E53] uppercase tracking-wider block">
                    What&apos;s Included for {STUDIO_INFO.basePrice}:
                  </span>
                  <ul className="space-y-2 text-xs sm:text-sm text-[#362E2B]/90">
                    <li className="flex items-center gap-2">
                      <Check size={16} weight="bold" className="text-[#9CAA8C] shrink-0" />
                      <span><strong>Milestone clean portrait</strong> before the cake</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check size={16} weight="bold" className="text-[#9CAA8C] shrink-0" />
                      <span><strong>Messy cake smash fun</strong> with custom themed setup</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check size={16} weight="bold" className="text-[#9CAA8C] shrink-0" />
                      <span><strong>Warm bubble bath splash photos</strong> (baby goes home clean!)</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check size={16} weight="bold" className="text-[#9CAA8C] shrink-0" />
                      <span><strong>Zero stress</strong> — studio handles all cleanup & mess</span>
                    </li>
                  </ul>
                </div>

                <div className="pt-4 flex items-center gap-4">
                  <button
                    onClick={() => handleSelectSessionForBooking('Cake Smash Photography')}
                    className="px-6 py-3 rounded-full bg-[#6E4E53] text-[#FAF5EF] text-sm hover:bg-[#583D42] transition-colors inline-flex items-center gap-2 shadow-xs cursor-pointer"
                  >
                    <span>Book Cake Smash</span>
                    <CalendarCheck size={16} weight="light" />
                  </button>
                  <span className="caption-text text-xs text-[#9CAA8C] font-semibold">
                    From {STUDIO_INFO.basePrice}
                  </span>
                </div>
              </div>

              <div className="lg:col-span-6 flex justify-center">
                <PolaroidPhoto
                  src={CLIENT_PHOTOS.cakeSmash.src}
                  fallbackSrc={CLIENT_PHOTOS.cakeSmash.fallbackSrc}
                  alt="First birthday cake smash baby photoshoot"
                  caption="First Birthday Celebration"
                  subcaption="Milestone Portraits &middot; Bath Splash Included"
                  tapeVariant="kraft"
                  tapeAngle={2}
                />
              </div>
            </div>
          </div>
        )}
      </section>

      <RibbonDivider />

      {/* 4. PORTFOLIO GALLERY SECTION: Filterable Polaroid Grid & Lightbox */}
      <section id="gallery" className="py-20 max-w-7xl mx-auto px-6 lg:px-12">
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
          <span className="caption-text text-[#9CAA8C] uppercase tracking-wider text-xs font-semibold">
            Visual Portfolio
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl text-[#362E2B] font-normal">
            Real Moments in Our Studio
          </h2>
          <p className="font-display text-xl text-[#6E4E53] italic">
            Photographs from actual sessions in Lightsview, Adelaide. No stock imagery.
          </p>
        </div>

        {/* Gallery Filter Buttons */}
        <div className="flex justify-center flex-wrap gap-2 mb-12">
          {[
            { id: 'all', label: 'All Photos' },
            { id: 'newborn', label: 'Newborns' },
            { id: 'maternity', label: 'Maternity' },
            { id: 'cakeSmash', label: 'Cake Smash' },
            { id: 'family', label: 'Families' }
          ].map((btn) => (
            <button
              key={btn.id}
              onClick={() => setActiveGalleryFilter(btn.id)}
              className={`px-4 py-2 rounded-full text-xs font-medium transition-all cursor-pointer ${
                activeGalleryFilter === btn.id
                  ? 'bg-[#6E4E53] text-[#FAF5EF]'
                  : 'bg-[#FAF5EF] text-[#362E2B]/80 hover:bg-[#EAD3CE]/40 border border-[#EAD3CE]'
              }`}
            >
              {btn.label}
            </button>
          ))}
        </div>

        {/* Polaroid Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10 items-center">
          {filteredGalleryItems.map((item, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center group relative cursor-pointer"
              onClick={() => setLightboxPhoto(item)}
            >
              <div className="relative w-full flex justify-center">
                <PolaroidPhoto
                  src={item.src}
                  fallbackSrc={item.fallbackSrc}
                  alt={item.alt}
                  caption={item.caption}
                  subcaption={item.categoryLabel}
                  tapeVariant={item.tapeVariant}
                  tapeAngle={item.tapeAngle}
                  interactive={true}
                />

                {/* Hover zoom icon badge */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                  <div className="w-10 h-10 rounded-full bg-[#FAF5EF]/95 text-[#6E4E53] flex items-center justify-center shadow-md border border-[#EAD3CE]">
                    <MagnifyingGlassPlus size={18} weight="bold" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox Modal */}
        {lightboxPhoto && (
          <div 
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200"
            onClick={() => setLightboxPhoto(null)}
          >
            <div 
              className="bg-[#FAF5EF] border border-[#EAD3CE] rounded-[24px] p-6 max-w-2xl w-full relative shadow-2xl space-y-4"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setLightboxPhoto(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-[#EAD3CE]/50 text-[#362E2B] hover:bg-[#EAD3CE] transition-colors cursor-pointer"
                aria-label="Close photo view"
              >
                <X size={20} weight="bold" />
              </button>

              <div className="rounded-xl overflow-hidden max-h-[70vh] flex items-center justify-center bg-black/5">
                <img
                  src={lightboxPhoto.src}
                  alt={lightboxPhoto.alt}
                  className="max-h-[65vh] w-auto object-contain rounded-lg"
                  onError={(e) => {
                    if (lightboxPhoto.fallbackSrc && e.currentTarget.src !== lightboxPhoto.fallbackSrc) {
                      e.currentTarget.src = lightboxPhoto.fallbackSrc;
                    }
                  }}
                />
              </div>

              <div className="text-center space-y-1">
                <h4 className="font-display text-xl text-[#362E2B] font-medium">
                  {lightboxPhoto.caption}
                </h4>
                {lightboxPhoto.subcaption && (
                  <p className="caption-text text-xs text-[#6E4E53]">
                    {lightboxPhoto.subcaption}
                  </p>
                )}
              </div>
            </div>
          </div>
        )}
      </section>

      <RibbonDivider />

      {/* 5. TRANSPARENT PRICING SECTION: What's Included */}
      <section id="pricing" className="py-20 max-w-6xl mx-auto px-6 lg:px-12">
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <span className="caption-text text-[#9CAA8C] uppercase tracking-wider text-xs font-semibold">
            Simple & Transparent
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl text-[#362E2B] font-normal">
            All-Inclusive Studio Pricing
          </h2>
          <p className="font-display text-xl text-[#6E4E53] italic">
            Zero hidden viewing room fees or mandatory print bundles.
          </p>
        </div>

        {/* Pricing Comparison Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-stretch max-w-4xl mx-auto">
          {/* Main Package Card */}
          <div className="bg-[#FAF5EF] border-2 border-[#6E4E53] rounded-[24px] p-8 sm:p-10 shadow-md flex flex-col justify-between relative">
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#6E4E53] text-[#FAF5EF] px-4 py-1 rounded-full text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5">
              <Sparkle size={13} weight="fill" />
              <span>Most Popular</span>
            </div>

            <div className="space-y-6">
              <div className="text-center border-b border-[#EAD3CE]/60 pb-6">
                <h3 className="font-display text-3xl text-[#362E2B] mb-2 font-normal">
                  Standard Studio Package
                </h3>
                <div className="flex items-baseline justify-center gap-1">
                  <span className="font-display text-5xl font-semibold text-[#6E4E53]">
                    {STUDIO_INFO.basePrice}
                  </span>
                  <span className="text-sm text-[#362E2B]/70">all-inclusive</span>
                </div>
                <p className="text-xs text-[#9CAA8C] mt-2 font-medium">
                  Valid for Newborn, Maternity, Family, or Cake Smash
                </p>
              </div>

              <ul className="space-y-3 text-sm text-[#362E2B]/90 text-left">
                <li className="flex items-start gap-2.5">
                  <Check size={18} weight="bold" className="text-[#9CAA8C] shrink-0 mt-0.5" />
                  <span><strong>Up to 2 hours</strong> dedicated studio time (with nursing & calming breaks)</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check size={18} weight="bold" className="text-[#9CAA8C] shrink-0 mt-0.5" />
                  <span><strong>Two wrap outfits & props included</strong> from our curated studio collection</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check size={18} weight="bold" className="text-[#9CAA8C] shrink-0 mt-0.5" />
                  <span><strong>6 fully retouched, high-resolution digital photos</strong></span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check size={18} weight="bold" className="text-[#9CAA8C] shrink-0 mt-0.5" />
                  <span><strong>Personal print release</strong> (print anywhere without restrictions)</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check size={18} weight="bold" className="text-[#9CAA8C] shrink-0 mt-0.5" />
                  <span><strong>Parents & siblings welcome</strong> at no extra fee</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check size={18} weight="bold" className="text-[#9CAA8C] shrink-0 mt-0.5" />
                  <span><strong>Private online download gallery</strong> delivered in 2 weeks</span>
                </li>
              </ul>
            </div>

            <div className="pt-8 text-center">
              <button
                onClick={() => scrollToSection('contact')}
                className="w-full py-3.5 rounded-full bg-[#6E4E53] text-[#FAF5EF] text-sm font-medium hover:bg-[#583D42] transition-colors shadow-sm cursor-pointer"
              >
                Reserve Session for {STUDIO_INFO.basePrice}
              </button>
              <p className="text-[11px] text-[#362E2B]/60 mt-2">
                $50 deposit locks in your month. Balance due on session day.
              </p>
            </div>
          </div>

          {/* Studio Guarantees & Booking Assurance Card */}
          <div className="bg-[#FAF5EF] border border-[#EAD3CE] rounded-[24px] p-8 sm:p-10 shadow-xs flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <h3 className="font-display text-2xl text-[#362E2B] font-normal">
                The Falguni Promise
              </h3>
              <p className="text-sm text-[#362E2B]/80 leading-relaxed">
                We believe photographing your newborn or family should be a relaxed, joyful memory, not a stressful high-pressure sales pitch.
              </p>

              <div className="space-y-4 pt-2">
                <div className="p-4 rounded-xl bg-white/60 border border-[#EAD3CE]/60">
                  <span className="font-semibold text-xs text-[#6E4E53] uppercase tracking-wider block mb-1">
                    Zero Forced Upsells
                  </span>
                  <p className="text-xs text-[#362E2B]/80 leading-relaxed">
                    You receive full-resolution digital files with complete printing rights. You are never forced into expensive framed prints or surprise viewing sessions.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-white/60 border border-[#EAD3CE]/60">
                  <span className="font-semibold text-xs text-[#6E4E53] uppercase tracking-wider block mb-1">
                    Flexible Arrival Scheduling
                  </span>
                  <p className="text-xs text-[#362E2B]/80 leading-relaxed">
                    Babies arrive on their own schedule! When baby is born early or late, simply send a text and we adjust your session within the 5–20 day sweet spot.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-white/60 border border-[#EAD3CE]/60">
                  <span className="font-semibold text-xs text-[#6E4E53] uppercase tracking-wider block mb-1">
                    Need Extra Photos?
                  </span>
                  <p className="text-xs text-[#362E2B]/80 leading-relaxed">
                    If you fall in love with additional images from your proof gallery, optional individual digital add-ons are available at simple, modest pricing.
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-2 text-center">
              <a
                href={`tel:${STUDIO_INFO.phone.replace(/\s+/g, '')}`}
                className="inline-flex items-center gap-2 text-sm text-[#6E4E53] hover:underline"
              >
                <Phone size={15} weight="bold" />
                <span>Questions? Call Falguni directly at {STUDIO_INFO.phoneDisplay}</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      <RibbonDivider />

      {/* 6. SOCIAL PROOF & GOOGLE REVIEWS SECTION */}
      <ReviewsSection id="reviews" defaultLayout="carousel" />

      <RibbonDivider />

      {/* 7. FREQUENTLY ASKED QUESTIONS ACCORDION */}
      <section id="faq" className="py-20 max-w-4xl mx-auto px-6 lg:px-12">
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <span className="caption-text text-[#9CAA8C] uppercase tracking-wider text-xs font-semibold">
            Clear Answers
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl text-[#362E2B] font-normal">
            Frequently Asked Questions
          </h2>
          <p className="font-display text-lg text-[#6E4E53] italic">
            Everything expecting and new parents want to know before booking.
          </p>
        </div>

        <FaqAccordion items={landingFaqItems} headingTag="h3" title="" />
      </section>

      <RibbonDivider />

      {/* 8. BOOKING FORM & STUDIO LOCATION / NAP SECTION */}
      <section id="contact" className="py-20 max-w-7xl mx-auto px-6 lg:px-12">
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <span className="caption-text text-[#9CAA8C] uppercase tracking-wider text-xs font-semibold">
            Reserve Studio Time
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl text-[#362E2B] font-normal">
            Book Your Session with Falguni
          </h2>
          <p className="font-display text-xl text-[#6E4E53] italic">
            Only 4 to 6 newborn dates accepted each month to ensure every family receives unhurried care.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-start">
          
          {/* Left: Embedded Interactive Booking Form (7 cols) */}
          <div className="lg:col-span-7 bg-[#FAF5EF] border border-[#EAD3CE] rounded-[24px] p-8 sm:p-10 shadow-sm">
            <h3 className="font-display text-2xl text-[#362E2B] mb-2 font-normal">
              Send Your Booking Inquiry
            </h3>
            <p className="text-xs sm:text-sm text-[#362E2B]/75 mb-6">
              Share your due date or preferred timeframe. Falguni will reply within 24 hours with exact date availability.
            </p>

            <BookingForm defaultSessionType={selectedSession} />
          </div>

          {/* Right: Studio NAP & Location Info (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[#FAF5EF] border border-[#EAD3CE] rounded-[24px] p-8 shadow-sm space-y-5">
              <h3 className="font-display text-2xl text-[#362E2B] font-normal">
                Studio Location & Details
              </h3>

              <div className="space-y-4 text-sm text-[#362E2B]/85">
                <div className="flex items-start gap-3">
                  <MapPin size={20} weight="light" className="text-[#9CAA8C] shrink-0 mt-0.5" />
                  <div>
                    <strong className="block font-medium text-[#362E2B]">Studio Address:</strong>
                    <span>{STUDIO_INFO.address}</span>
                    <span className="block text-xs text-[#9CAA8C] mt-0.5">Lightsview / Northfield, Adelaide</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone size={20} weight="light" className="text-[#9CAA8C] shrink-0 mt-0.5" />
                  <div>
                    <strong className="block font-medium text-[#362E2B]">Direct Telephone:</strong>
                    <a href={`tel:${STUDIO_INFO.phone.replace(/\s+/g, '')}`} className="hover:text-[#6E4E53] font-medium">
                      {STUDIO_INFO.phoneDisplay}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock size={20} weight="light" className="text-[#9CAA8C] shrink-0 mt-0.5" />
                  <div>
                    <strong className="block font-medium text-[#362E2B]">Opening Hours:</strong>
                    <span>{STUDIO_INFO.hours}</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-[#EAD3CE]/60">
                <span className="caption-text text-xs text-[#6E4E53] font-semibold block mb-2">
                  Serving North-Eastern Adelaide:
                </span>
                <p className="text-xs text-[#362E2B]/75 leading-relaxed">
                  Northfield, Lightsview, Clearview, Greenacres, Walkerville, Prospect, Oakden, Gilles Plains, and greater Adelaide.
                </p>
              </div>

              <div className="pt-2">
                <a
                  href="https://maps.google.com/?q=26+South+Pkwy,+Northfield+SA+5085,+Australia"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 rounded-full border border-[#9CAA8C] text-[#362E2B] text-xs font-medium hover:bg-[#EAD3CE]/30 transition-colors inline-flex items-center justify-center gap-2"
                >
                  <MapPin size={15} weight="light" />
                  <span>Get Directions on Google Maps &rarr;</span>
                </a>
              </div>
            </div>

            {/* Reassurance Card */}
            <div className="p-6 rounded-[20px] bg-[#EAD3CE]/20 border border-[#EAD3CE] text-xs text-[#362E2B]/85 space-y-2">
              <div className="flex items-center gap-2 text-[#6E4E53] font-semibold">
                <ShieldCheck size={16} weight="fill" />
                <span>Zero Risk Booking</span>
              </div>
              <p className="leading-relaxed">
                No payment is required to submit an inquiry. We confirm your date and answer all your questions first before any deposit is paid.
              </p>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
};
