import React, { useState } from 'react';
import { ArrowRight, MagnifyingGlassPlus, X } from '@phosphor-icons/react';
import { PAGES_DATA, STUDIO_INFO } from '../data/siteData';
import { CLIENT_PHOTOS } from '../assets/images';
import { RibbonDivider } from '../components/RibbonDivider';

interface GalleryPageProps {
  onNavigate: (path: string) => void;
}

export const GalleryPage: React.FC<GalleryPageProps> = ({ onNavigate }) => {
  const page = PAGES_DATA.gallery;
  const intro = page.sections[0];

  const [activePhoto, setActivePhoto] = useState<{ src: string; alt: string; caption: string } | null>(null);

  const galleryItems = [
    {
      ...CLIENT_PHOTOS.photo1,
      aspect: 'aspect-[4/3]',
      offset: '',
      category: 'Newborn Session',
    },
    {
      ...CLIENT_PHOTOS.photo3,
      aspect: 'aspect-[3/4]',
      offset: 'md:translate-y-8',
      category: 'Maternity Session',
    },
    {
      ...CLIENT_PHOTOS.photo2,
      aspect: 'aspect-[4/3]',
      offset: '',
      category: 'Newborn Session',
    },
    {
      ...CLIENT_PHOTOS.photo4,
      aspect: 'aspect-[4/3]',
      offset: 'md:translate-y-6',
      category: 'Family Session',
    },
  ];

  return (
    <div className="w-full">
      {/* 1. GALLERY INTRO SECTION: Single H1 */}
      <section className="pt-8 pb-16 md:pt-16 md:pb-20 max-w-5xl mx-auto px-6 lg:px-12 text-center">
        <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl text-[#362E2B] leading-[1.12] font-normal mb-4">
          {intro.headline}
        </h1>

        <p className="font-display text-xl sm:text-2xl text-[#6E4E53] italic font-normal mb-3">
          {intro.subheadline}
        </p>

        <p className="text-base text-[#362E2B]/85 max-w-2xl mx-auto leading-relaxed">
          {intro.body_copy}
        </p>

        <div className="pt-4 flex items-center justify-center gap-2 text-xs text-[#9CAA8C] uppercase tracking-wider">
          <span>Client-Supplied Photographs</span>
          <span>&middot;</span>
          <span>No Stock Imagery</span>
        </div>
      </section>

      {/* 2. ASYMMETRIC FILM-STRIP GALLERY GRID */}
      <section className="py-8 max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-start">
          {galleryItems.map((item, idx) => (
            <div
              key={idx}
              className={`group relative bg-[#FAF5EF] border border-[#EAD3CE] rounded-[20px] overflow-hidden shadow-[0_10px_30px_-6px_rgba(110,78,83,0.12)] transition-all duration-500 hover:shadow-[0_16px_40px_-6px_rgba(110,78,83,0.18)] ${item.offset}`}
            >
              <div className={`relative w-full ${item.aspect} overflow-hidden cursor-pointer`}
                onClick={() => setActivePhoto(item)}
              >
                <img
                  src={item.src}
                  alt={item.alt}
                  className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-700 ease-out"
                />

                {/* Subtle overlay on hover */}
                <div className="absolute inset-0 bg-[#362E2B]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-[#FAF5EF]/90 text-[#6E4E53] flex items-center justify-center shadow-md">
                    <MagnifyingGlassPlus size={22} weight="light" />
                  </div>
                </div>

                <div className="absolute top-4 left-4 bg-[#FAF5EF]/95 border border-[#EAD3CE] px-3.5 py-1 rounded-full text-xs text-[#6E4E53] font-medium shadow-xs">
                  {item.category}
                </div>
              </div>

              {/* Photo Caption */}
              <div className="p-5 border-t border-[#EAD3CE]/50 flex items-center justify-between">
                <span className="caption-text text-[#6E4E53] font-semibold">
                  {item.caption}
                </span>
                <span className="text-xs text-[#9CAA8C]">
                  Adelaide Home Studio
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Lightbox Modal */}
      {activePhoto && (
        <div
          className="fixed inset-0 z-50 bg-[#362E2B]/80 backdrop-blur-xs flex items-center justify-center p-4"
          onClick={() => setActivePhoto(null)}
        >
          <div
            className="relative max-w-4xl max-h-[90vh] bg-[#FAF5EF] rounded-[22px] overflow-hidden p-3 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActivePhoto(null)}
              className="absolute top-5 right-5 z-10 w-9 h-9 rounded-full bg-[#FAF5EF]/90 text-[#362E2B] hover:text-[#6E4E53] flex items-center justify-center shadow-sm"
              aria-label="Close photo"
            >
              <X size={20} weight="light" />
            </button>

            <img
              src={activePhoto.src}
              alt={activePhoto.alt}
              className="max-h-[75vh] w-auto mx-auto object-contain rounded-[16px]"
            />

            <div className="p-4 text-center">
              <p className="font-display text-lg text-[#362E2B]">
                {activePhoto.alt}
              </p>
              <p className="caption-text text-[#9CAA8C] mt-1">
                Falguni&apos;s Photography &middot; Lightsview Studio
              </p>
            </div>
          </div>
        </div>
      )}

      <RibbonDivider />

      {/* Closing CTA */}
      <section className="py-16 max-w-3xl mx-auto px-6 lg:px-12 text-center">
        <h2 className="font-display text-3xl sm:text-4xl text-[#362E2B] font-normal mb-4">
          Capture Your Baby&apos;s Early Weeks
        </h2>
        <p className="text-base text-[#362E2B]/80 max-w-xl mx-auto mb-8">
          Sessions start at $300 with two hours unhurried studio time. Book in advance to protect your date around arrival.
        </p>
        <button
          onClick={() => onNavigate('/contact')}
          className="px-8 py-3.5 rounded-full bg-[#6E4E53] text-[#FAF5EF] font-medium text-base hover:bg-[#583D42] transition-colors inline-flex items-center gap-2 shadow-sm"
        >
          <span>Check Available Dates</span>
          <ArrowRight size={18} weight="light" />
        </button>
      </section>
    </div>
  );
};
