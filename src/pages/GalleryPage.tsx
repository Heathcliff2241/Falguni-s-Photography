import React, { useState } from 'react';
import { ArrowRight, MagnifyingGlassPlus, X } from '@phosphor-icons/react';
import { PAGES_DATA } from '../data/siteData';
import { CLIENT_PHOTOS } from '../assets/images';
import { RibbonDivider } from '../components/RibbonDivider';
import { PolaroidPhoto } from '../components/PolaroidPhoto';

interface GalleryPageProps {
  onNavigate: (path: string) => void;
}

export const GalleryPage: React.FC<GalleryPageProps> = ({ onNavigate }) => {
  const page = PAGES_DATA.gallery;
  const intro = page.sections[0];

  const [activePhoto, setActivePhoto] = useState<{ src: string; alt: string; caption: string } | null>(null);

  const galleryItems = [
    {
      ...CLIENT_PHOTOS.newborn,
      category: 'Newborn Session',
      tapeVariant: 'kraft' as const,
      tapeAngle: -2,
    },
    {
      ...CLIENT_PHOTOS.maternity,
      category: 'Maternity Session',
      tapeVariant: 'blush' as const,
      tapeAngle: 1.5,
    },
    {
      ...CLIENT_PHOTOS.cakeSmash,
      category: 'Cake Smash Session',
      tapeVariant: 'sage' as const,
      tapeAngle: -1.5,
    },
    {
      ...CLIENT_PHOTOS.family,
      category: 'Family Session',
      tapeVariant: 'kraft' as const,
      tapeAngle: 2,
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
          <span>Printed Polaroid Display</span>
          <span>&middot;</span>
          <span>No Stock Imagery</span>
        </div>
      </section>

      {/* 2. UNIFORM PRINTED POLAROID GALLERY GRID - ALL SAME SIZES */}
      <section className="py-8 max-w-6xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16 items-center">
          {galleryItems.map((item, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center group relative cursor-pointer"
              onClick={() => setActivePhoto(item)}
            >
              {/* Polaroid Photo with Washi Tape - Uniform Size */}
              <div className="relative w-full flex justify-center">
                <PolaroidPhoto
                  src={item.src}
                  alt={item.alt}
                  caption={item.caption}
                  subcaption={item.category}
                  tapeVariant={item.tapeVariant}
                  tapeAngle={item.tapeAngle}
                  interactive={true}
                />

                {/* Hover hint badge */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                  <div className="w-11 h-11 rounded-full bg-[#FAF5EF]/95 text-[#6E4E53] flex items-center justify-center shadow-lg border border-[#EAD3CE]">
                    <MagnifyingGlassPlus size={20} weight="light" />
                  </div>
                </div>
              </div>

              {/* Caption metadata */}
              <div className="mt-3 text-center">
                <span className="caption-text text-xs text-[#9CAA8C] uppercase tracking-wider">
                  {item.category} &middot; Lightsview Studio
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
            className="relative max-w-4xl max-h-[90vh] bg-[#FAF5EF] rounded-[22px] overflow-hidden p-4 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActivePhoto(null)}
              className="absolute top-5 right-5 z-10 w-9 h-9 rounded-full bg-[#FAF5EF]/90 text-[#362E2B] hover:text-[#6E4E53] flex items-center justify-center shadow-sm cursor-pointer"
              aria-label="Close photo"
            >
              <X size={20} weight="light" />
            </button>

            <img
              src={activePhoto.src}
              alt={activePhoto.alt}
              referrerPolicy="no-referrer"
              className="max-h-[75vh] w-auto mx-auto object-contain rounded-[14px]"
            />

            <div className="p-4 text-center">
              <p className="font-display text-lg text-[#362E2B]">
                {activePhoto.caption}
              </p>
              <p className="caption-text text-[#9CAA8C] mt-1 text-xs">
                Falguni&apos;s Photography &middot; Lightsview Home Studio, Adelaide
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
          className="px-8 py-3.5 rounded-full bg-[#6E4E53] text-[#FAF5EF] font-medium text-base hover:bg-[#583D42] transition-colors inline-flex items-center gap-2 shadow-sm cursor-pointer"
        >
          <span>Check Available Dates</span>
          <ArrowRight size={18} weight="light" />
        </button>
      </section>
    </div>
  );
};
