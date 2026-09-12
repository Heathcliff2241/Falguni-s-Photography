import React, { useState, useEffect } from 'react';
import { List, X, Phone, CalendarCheck } from '@phosphor-icons/react';
import { STUDIO_INFO } from '../data/siteData';

interface NavbarProps {
  currentPath: string;
  onNavigate: (path: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentPath, onNavigate }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('hero');

  const navLinks = [
    { label: 'Studio', targetId: 'about' },
    { label: 'Sessions', targetId: 'sessions' },
    { label: 'Gallery', targetId: 'gallery' },
    { label: 'Pricing', targetId: 'pricing' },
    { label: 'Reviews', targetId: 'reviews' },
    { label: 'FAQ', targetId: 'faq' },
    { label: 'Contact', targetId: 'contact' },
  ];

  // Scroll spy to highlight current active section
  useEffect(() => {
    if (currentPath !== '/') return;

    const sectionIds = ['hero', 'about', 'sessions', 'gallery', 'pricing', 'reviews', 'faq', 'contact'];
    
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 140; // Offset for navbar height

      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const id = sectionIds[i];
        const element = document.getElementById(id);
        if (element) {
          const top = element.offsetTop;
          if (scrollPosition >= top) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check

    return () => window.removeEventListener('scroll', handleScroll);
  }, [currentPath]);

  const scrollToSection = (targetId: string) => {
    setMobileMenuOpen(false);

    if (currentPath !== '/') {
      onNavigate('/');
      setTimeout(() => {
        const el = document.getElementById(targetId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 150);
      return;
    }

    if (targetId === 'hero') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

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
          onClick={() => scrollToSection('hero')}
          className="text-left group cursor-pointer focus:outline-none"
          aria-label="Falguni's Photography Home"
        >
          <span className="block font-display text-2xl lg:text-3xl text-[#362E2B] font-normal tracking-tight group-hover:text-[#6E4E53] transition-colors">
            Falguni&apos;s Photography
          </span>
          <span className="block caption-text text-[11px] text-[#9CAA8C] tracking-wider -mt-1">
            Lightsview &middot; Adelaide
          </span>
        </button>

        {/* Desktop Anchor Navigation with Active Scroll-Spy */}
        <nav className="hidden lg:flex items-center gap-6 text-[14px]">
          {navLinks.map((link) => {
            const isActive = currentPath === '/' && activeSection === link.targetId;
            return (
              <button
                key={link.targetId}
                onClick={() => scrollToSection(link.targetId)}
                className={`transition-colors py-1 cursor-pointer relative focus:outline-none ${
                  isActive 
                    ? 'text-[#6E4E53] font-medium' 
                    : 'text-[#362E2B]/80 hover:text-[#6E4E53]'
                }`}
              >
                {link.label}
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
            onClick={() => scrollToSection('contact')}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#6E4E53] text-[#FAF5EF] text-sm hover:bg-[#583D42] transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-[#9CAA8C] cursor-pointer"
          >
            <CalendarCheck size={16} weight="light" />
            <span>Book Session</span>
          </button>
        </div>

        {/* Mobile menu toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 text-[#362E2B] hover:text-[#6E4E53] focus:outline-none cursor-pointer"
          aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
        >
          {mobileMenuOpen ? <X size={26} weight="light" /> : <List size={26} weight="light" />}
        </button>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#FAF5EF] border-b border-[#EAD3CE] px-6 py-6 shadow-lg animate-in fade-in duration-200">
          <nav className="flex flex-col gap-2">
            {navLinks.map((link) => {
              const isActive = currentPath === '/' && activeSection === link.targetId;
              return (
                <button
                  key={link.targetId}
                  onClick={() => scrollToSection(link.targetId)}
                  className={`text-left py-2.5 text-base transition-colors flex items-center justify-between cursor-pointer ${
                    isActive 
                      ? 'text-[#6E4E53] font-medium pl-2 border-l-2 border-[#9CAA8C]' 
                      : 'text-[#362E2B]/80 hover:text-[#6E4E53]'
                  }`}
                >
                  <span>{link.label}</span>
                  {isActive && <span className="text-xs text-[#9CAA8C] uppercase tracking-wider">Viewing</span>}
                </button>
              );
            })}

            <div className="pt-4 mt-2 border-t border-[#EAD3CE] flex flex-col gap-3">
              <button
                onClick={() => scrollToSection('contact')}
                className="w-full py-3 text-center rounded-full bg-[#6E4E53] text-[#FAF5EF] text-sm hover:bg-[#583D42] transition-colors cursor-pointer"
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
