import React from 'react';
import { MapPin, Phone, Clock, ShieldCheck } from '@phosphor-icons/react';
import { STUDIO_INFO } from '../data/siteData';

interface FooterProps {
  onNavigate: (path: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const serviceLinks = [
    { label: 'Newborn Photography', path: '/services/newborn-photography' },
    { label: 'Maternity Photography', path: '/services/maternity-photography' },
    { label: 'Family & Sitter Photography', path: '/services/family-photography' },
    { label: 'Cake Smash Photography', path: '/services/cake-smash-photography' },
  ];

  const quickLinks = [
    { label: 'Home', path: '/' },
    { label: 'About Falguni', path: '/about' },
    { label: 'Real Photo Gallery', path: '/gallery' },
    { label: 'Book Your Session', path: '/contact' },
  ];

  return (
    <footer className="bg-[#FAF5EF] border-t border-[#EAD3CE] text-[#362E2B] pt-16 pb-12 mt-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Col 1: Studio Info */}
          <div className="space-y-4">
            <h3 className="font-display text-2xl text-[#362E2B]">
              Falguni&apos;s Photography
            </h3>
            <p className="text-sm text-[#362E2B]/80 leading-relaxed">
              Unhurried newborn, maternity, family and cake smash photography in Lightsview, Adelaide. Every session moves at your baby&apos;s pace.
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#EAD3CE]/40 text-xs text-[#6E4E53]">
              <span className="text-[#B99A5B] font-semibold tracking-wide">&#9733;&#9733;&#9733;&#9733;&#9733;</span>
              <span>{STUDIO_INFO.googleRating} on Google ({STUDIO_INFO.reviewCount} reviews)</span>
            </div>
          </div>

          {/* Col 2: Services */}
          <div>
            <h4 className="caption-text text-[#6E4E53] font-semibold mb-4">
              Sessions
            </h4>
            <ul className="space-y-2.5 text-sm">
              {serviceLinks.map((link) => (
                <li key={link.path}>
                  <button
                    onClick={() => {
                      onNavigate(link.path);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="text-[#362E2B]/80 hover:text-[#6E4E53] transition-colors text-left"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Studio & Navigation */}
          <div>
            <h4 className="caption-text text-[#6E4E53] font-semibold mb-4">
              Information
            </h4>
            <ul className="space-y-2.5 text-sm">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <button
                    onClick={() => {
                      onNavigate(link.path);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="text-[#362E2B]/80 hover:text-[#6E4E53] transition-colors text-left"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Studio Contact & NAP */}
          <div className="space-y-3">
            <h4 className="caption-text text-[#6E4E53] font-semibold mb-4">
              Studio Location
            </h4>
            <div className="flex items-start gap-3 text-sm text-[#362E2B]/85">
              <MapPin size={18} weight="light" className="text-[#9CAA8C] mt-0.5 shrink-0" />
              <span>{STUDIO_INFO.address}</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-[#362E2B]/85">
              <Phone size={18} weight="light" className="text-[#9CAA8C] shrink-0" />
              <a href={`tel:${STUDIO_INFO.phone.replace(/\s+/g, '')}`} className="hover:text-[#6E4E53]">
                {STUDIO_INFO.phoneDisplay}
              </a>
            </div>
            <div className="flex items-center gap-3 text-sm text-[#362E2B]/85">
              <Clock size={18} weight="light" className="text-[#9CAA8C] shrink-0" />
              <span>{STUDIO_INFO.hours}</span>
            </div>
            <p className="text-xs text-[#362E2B]/60 pt-2 leading-relaxed">
              Serving {STUDIO_INFO.serviceArea}.
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-[#EAD3CE]/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#362E2B]/70">
          <p>&copy; {new Date().getFullYear()} Falguni&apos;s Photography. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span>Lightsview &middot; Northfield &middot; Adelaide SA</span>
            <button
              onClick={() => {
                onNavigate('/admin');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="text-[#9CAA8C] hover:text-[#6E4E53] flex items-center gap-1 transition-colors"
              title="Studio Admin Portal"
            >
              <ShieldCheck size={14} weight="light" />
              <span>Studio Inquiries</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
