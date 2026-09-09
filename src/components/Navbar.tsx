import React, { useState } from 'react';
import { List, X, Phone, CalendarCheck } from '@phosphor-icons/react';
import { STUDIO_INFO } from '../data/siteData';

interface NavbarProps {
  currentPath: string;
  onNavigate: (path: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentPath, onNavigate }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { label: 'Home', path: '/' },
    { label: 'Newborn', path: '/services/newborn-photography' },
    { label: 'Maternity', path: '/services/maternity-photography' },
    { label: 'Family', path: '/services/family-photography' },
    { label: 'Cake Smash', path: '/services/cake-smash-photography' },
    { label: 'About', path: '/about' },
    { label: 'Gallery', path: '/gallery' },
    { label: 'Contact', path: '/contact' },
  ];

  const handleNavClick = (path: string) => {
    onNavigate(path);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FAF5EF]/95 backdrop-blur-sm border-b border-[#EAD3CE]/50 transition-colors">
      {/* Top micro-bar with studio location & phone */}
      <div className="hidden sm:flex justify-between items-center px-6 lg:px-12 py-1.5 text-xs text-[#6E4E53] border-b border-[#EAD3CE]/30">
        <span className="tracking-wide">
          Home studio in Lightsview, Adelaide &middot; Unhurried sessions from {STUDIO_INFO.basePrice}
        </span>
        <a 
          href={`tel:${STUDIO_INFO.phone.replace(/\s+/g, '')}`} 
          className="flex items-center gap-1.5 hover:text-[#362E2B] transition-colors"
        >
          <Phone size={14} weight="light" />
          <span>{STUDIO_INFO.phoneDisplay}</span>
        </a>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 h-20 flex items-center justify-between">
        {/* Brand logo */}
        <button
          onClick={() => handleNavClick('/')}
          className="text-left group cursor-pointer focus:outline-none"
        >
          <span className="block font-display text-2xl lg:text-3xl text-[#362E2B] font-normal tracking-tight group-hover:text-[#6E4E53] transition-colors">
            Falguni&apos;s Photography
          </span>
          <span className="block caption-text text-[11px] text-[#9CAA8C] tracking-wider -mt-1">
            Lightsview &middot; Adelaide
          </span>
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden xl:flex items-center gap-7 text-[14px]">
          {navItems.map((item) => {
            const isActive = currentPath === item.path;
            return (
              <button
                key={item.path}
                onClick={() => handleNavClick(item.path)}
                className={`transition-colors py-1 cursor-pointer relative focus:outline-none ${
                  isActive 
                    ? 'text-[#6E4E53] font-medium' 
                    : 'text-[#362E2B]/80 hover:text-[#6E4E53]'
                }`}
              >
                {item.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-[#9CAA8C]" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Right CTA */}
        <div className="hidden sm:flex items-center gap-4">
          <button
            onClick={() => handleNavClick('/contact')}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#6E4E53] text-[#FAF5EF] text-sm hover:bg-[#583D42] transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-[#9CAA8C]"
          >
            <CalendarCheck size={16} weight="light" />
            <span>Book Session</span>
          </button>
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="xl:hidden p-2 text-[#362E2B] hover:text-[#6E4E53] focus:outline-none"
          aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
        >
          {mobileMenuOpen ? <X size={26} weight="light" /> : <List size={26} weight="light" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-[#FAF5EF] border-b border-[#EAD3CE] px-6 py-6 shadow-lg">
          <nav className="flex flex-col gap-4">
            {navItems.map((item) => {
              const isActive = currentPath === item.path;
              return (
                <button
                  key={item.path}
                  onClick={() => handleNavClick(item.path)}
                  className={`text-left py-2 text-base transition-colors flex items-center justify-between ${
                    isActive 
                      ? 'text-[#6E4E53] font-medium pl-2 border-l-2 border-[#9CAA8C]' 
                      : 'text-[#362E2B]/80 hover:text-[#6E4E53]'
                  }`}
                >
                  <span>{item.label}</span>
                  {isActive && <span className="text-xs text-[#9CAA8C] uppercase tracking-wider">Current</span>}
                </button>
              );
            })}

            <div className="pt-4 mt-2 border-t border-[#EAD3CE] flex flex-col gap-3">
              <button
                onClick={() => handleNavClick('/contact')}
                className="w-full py-3 text-center rounded-full bg-[#6E4E53] text-[#FAF5EF] text-sm hover:bg-[#583D42] transition-colors"
              >
                Book a Session
              </button>
              <a
                href={`tel:${STUDIO_INFO.phone.replace(/\s+/g, '')}`}
                className="flex items-center justify-center gap-2 py-2 text-sm text-[#6E4E53]"
              >
                <Phone size={16} weight="light" />
                <span>Call {STUDIO_INFO.phoneDisplay}</span>
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
