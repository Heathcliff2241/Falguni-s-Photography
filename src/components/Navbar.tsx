import React, { useState, useRef, useEffect } from 'react';
import { List, X, Phone, CalendarCheck, CaretDown } from '@phosphor-icons/react';
import { STUDIO_INFO } from '../data/siteData';

interface NavbarProps {
  currentPath: string;
  onNavigate: (path: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentPath, onNavigate }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [desktopServicesOpen, setDesktopServicesOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(
    currentPath.startsWith('/services/')
  );

  const servicesDropdownRef = useRef<HTMLDivElement>(null);

  const servicesList = [
    {
      label: 'Newborn Photography',
      sublabel: '5 to 20 days · 2 hours unhurried',
      path: '/services/newborn-photography',
    },
    {
      label: 'Maternity Photography',
      sublabel: '28 to 34 weeks · Studio light',
      path: '/services/maternity-photography',
    },
    {
      label: 'Family Photography',
      sublabel: 'Studio or outdoor · Up to 5 people',
      path: '/services/family-photography',
    },
    {
      label: 'Cake Smash Photography',
      sublabel: 'First birthday milestone · Full cleanup',
      path: '/services/cake-smash-photography',
    },
  ];

  // Close desktop dropdown on outside click or Escape
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        servicesDropdownRef.current &&
        !servicesDropdownRef.current.contains(e.target as Node)
      ) {
        setDesktopServicesOpen(false);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setDesktopServicesOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleNavClick = (path: string) => {
    onNavigate(path);
    setMobileMenuOpen(false);
    setDesktopServicesOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const isServicesActive = currentPath.startsWith('/services/');

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

        {/* Desktop Navigation with Collapsible Services Dropdown */}
        <nav className="hidden lg:flex items-center gap-7 text-[14px]">
          <button
            onClick={() => handleNavClick('/')}
            className={`transition-colors py-1 cursor-pointer relative focus:outline-none ${
              currentPath === '/' 
                ? 'text-[#6E4E53] font-medium' 
                : 'text-[#362E2B]/80 hover:text-[#6E4E53]'
            }`}
          >
            Home
            {currentPath === '/' && (
              <span className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-[#9CAA8C]" />
            )}
          </button>

          {/* Collapsible Services Menu */}
          <div
            ref={servicesDropdownRef}
            className="relative"
            onMouseEnter={() => setDesktopServicesOpen(true)}
            onMouseLeave={() => setDesktopServicesOpen(false)}
          >
            <button
              onClick={() => setDesktopServicesOpen((prev) => !prev)}
              aria-expanded={desktopServicesOpen}
              className={`flex items-center gap-1.5 py-1 cursor-pointer transition-colors focus:outline-none ${
                isServicesActive || desktopServicesOpen
                  ? 'text-[#6E4E53] font-medium'
                  : 'text-[#362E2B]/80 hover:text-[#6E4E53]'
              }`}
            >
              <span>Services</span>
              <CaretDown
                size={14}
                weight="bold"
                className={`transition-transform duration-200 ${
                  desktopServicesOpen ? 'rotate-180 text-[#6E4E53]' : 'text-[#9CAA8C]'
                }`}
              />
              {isServicesActive && (
                <span className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-[#9CAA8C]" />
              )}
            </button>

            {/* Desktop Dropdown Panel */}
            {desktopServicesOpen && (
              <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 z-50 w-72">
                <div className="bg-[#FAF5EF] border border-[#EAD3CE] rounded-[16px] shadow-[0_12px_32px_-6px_rgba(54,46,43,0.16)] p-2 backdrop-blur-md">
                  <div className="px-3 py-2 border-b border-[#EAD3CE]/40 mb-1">
                    <span className="text-[10px] uppercase tracking-wider font-semibold text-[#9CAA8C]">
                      Studio Sessions
                    </span>
                  </div>

                  {servicesList.map((service) => {
                    const isSelected = currentPath === service.path;
                    return (
                      <button
                        key={service.path}
                        onClick={() => handleNavClick(service.path)}
                        className={`w-full text-left p-2.5 rounded-xl transition-colors group flex flex-col ${
                          isSelected
                            ? 'bg-[#EAD3CE]/40 text-[#6E4E53]'
                            : 'hover:bg-[#EAD3CE]/20 text-[#362E2B]'
                        }`}
                      >
                        <span className="font-display text-base group-hover:text-[#6E4E53] font-medium leading-snug">
                          {service.label}
                        </span>
                        <span className="text-[11px] text-[#362E2B]/60 group-hover:text-[#362E2B]/80">
                          {service.sublabel}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          <button
            onClick={() => handleNavClick('/about')}
            className={`transition-colors py-1 cursor-pointer relative focus:outline-none ${
              currentPath === '/about' 
                ? 'text-[#6E4E53] font-medium' 
                : 'text-[#362E2B]/80 hover:text-[#6E4E53]'
            }`}
          >
            About
            {currentPath === '/about' && (
              <span className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-[#9CAA8C]" />
            )}
          </button>

          <button
            onClick={() => handleNavClick('/gallery')}
            className={`transition-colors py-1 cursor-pointer relative focus:outline-none ${
              currentPath === '/gallery' 
                ? 'text-[#6E4E53] font-medium' 
                : 'text-[#362E2B]/80 hover:text-[#6E4E53]'
            }`}
          >
            Gallery
            {currentPath === '/gallery' && (
              <span className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-[#9CAA8C]" />
            )}
          </button>

          <button
            onClick={() => handleNavClick('/contact')}
            className={`transition-colors py-1 cursor-pointer relative focus:outline-none ${
              currentPath === '/contact' 
                ? 'text-[#6E4E53] font-medium' 
                : 'text-[#362E2B]/80 hover:text-[#6E4E53]'
            }`}
          >
            Contact
            {currentPath === '/contact' && (
              <span className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-[#9CAA8C]" />
            )}
          </button>
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
          className="lg:hidden p-2 text-[#362E2B] hover:text-[#6E4E53] focus:outline-none"
          aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
        >
          {mobileMenuOpen ? <X size={26} weight="light" /> : <List size={26} weight="light" />}
        </button>
      </div>

      {/* Mobile Drawer with Collapsible Services Accordion */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#FAF5EF] border-b border-[#EAD3CE] px-6 py-6 shadow-lg">
          <nav className="flex flex-col gap-3">
            <button
              onClick={() => handleNavClick('/')}
              className={`text-left py-2 text-base transition-colors flex items-center justify-between ${
                currentPath === '/' 
                  ? 'text-[#6E4E53] font-medium pl-2 border-l-2 border-[#9CAA8C]' 
                  : 'text-[#362E2B]/80 hover:text-[#6E4E53]'
              }`}
            >
              <span>Home</span>
              {currentPath === '/' && <span className="text-xs text-[#9CAA8C] uppercase tracking-wider">Current</span>}
            </button>

            {/* Collapsible Services Accordion in Mobile */}
            <div className="border-y border-[#EAD3CE]/50 py-1">
              <button
                onClick={() => setMobileServicesOpen((prev) => !prev)}
                className={`w-full py-2.5 text-left text-base font-medium flex items-center justify-between transition-colors ${
                  isServicesActive ? 'text-[#6E4E53]' : 'text-[#362E2B]/90'
                }`}
              >
                <span>Services</span>
                <CaretDown
                  size={16}
                  weight="bold"
                  className={`text-[#9CAA8C] transition-transform duration-200 ${
                    mobileServicesOpen ? 'rotate-180 text-[#6E4E53]' : ''
                  }`}
                />
              </button>

              {mobileServicesOpen && (
                <div className="pl-3 py-1 space-y-2 border-l-2 border-[#9CAA8C]/50 my-1 ml-1">
                  {servicesList.map((service) => {
                    const isSelected = currentPath === service.path;
                    return (
                      <button
                        key={service.path}
                        onClick={() => handleNavClick(service.path)}
                        className={`w-full text-left py-1.5 px-2 rounded-lg text-sm transition-colors block ${
                          isSelected
                            ? 'text-[#6E4E53] font-medium bg-[#EAD3CE]/30'
                            : 'text-[#362E2B]/80 hover:text-[#6E4E53]'
                        }`}
                      >
                        <span className="block font-medium">{service.label}</span>
                        <span className="block text-[11px] text-[#362E2B]/60">{service.sublabel}</span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            <button
              onClick={() => handleNavClick('/about')}
              className={`text-left py-2 text-base transition-colors flex items-center justify-between ${
                currentPath === '/about' 
                  ? 'text-[#6E4E53] font-medium pl-2 border-l-2 border-[#9CAA8C]' 
                  : 'text-[#362E2B]/80 hover:text-[#6E4E53]'
              }`}
            >
              <span>About</span>
              {currentPath === '/about' && <span className="text-xs text-[#9CAA8C] uppercase tracking-wider">Current</span>}
            </button>

            <button
              onClick={() => handleNavClick('/gallery')}
              className={`text-left py-2 text-base transition-colors flex items-center justify-between ${
                currentPath === '/gallery' 
                  ? 'text-[#6E4E53] font-medium pl-2 border-l-2 border-[#9CAA8C]' 
                  : 'text-[#362E2B]/80 hover:text-[#6E4E53]'
              }`}
            >
              <span>Gallery</span>
              {currentPath === '/gallery' && <span className="text-xs text-[#9CAA8C] uppercase tracking-wider">Current</span>}
            </button>

            <button
              onClick={() => handleNavClick('/contact')}
              className={`text-left py-2 text-base transition-colors flex items-center justify-between ${
                currentPath === '/contact' 
                  ? 'text-[#6E4E53] font-medium pl-2 border-l-2 border-[#9CAA8C]' 
                  : 'text-[#362E2B]/80 hover:text-[#6E4E53]'
              }`}
            >
              <span>Contact</span>
              {currentPath === '/contact' && <span className="text-xs text-[#9CAA8C] uppercase tracking-wider">Current</span>}
            </button>

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
