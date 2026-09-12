import React, { useState, useEffect } from 'react';
import { Phone } from '@phosphor-icons/react';
import { PAGES_DATA, STUDIO_INFO } from './data/siteData';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { LoadingScreen } from './components/LoadingScreen';
// import { WillowAssistant } from './components/WillowAssistant';

import { HomePage } from './pages/HomePage';
import { AdminPage } from './pages/AdminPage';

export default function App() {
  const [currentPath, setCurrentPath] = useState<string>('/');
  const [showLoading, setShowLoading] = useState<boolean>(true);

  // Initialize and handle browser back/forward navigation and URL redirection to single page sections
  useEffect(() => {
    const normalizePath = (p: string) => {
      const trimmed = p.replace(/\/$/, '');
      return trimmed === '' ? '/' : trimmed;
    };

    const path = normalizePath(window.location.pathname);

    // Map legacy multi-page URLs to single-page anchor sections
    const sectionRedirectMap: Record<string, string> = {
      '/services/newborn-photography': 'sessions',
      '/services/maternity-photography': 'sessions',
      '/services/family-photography': 'sessions',
      '/services/cake-smash-photography': 'sessions',
      '/about': 'about',
      '/gallery': 'gallery',
      '/contact': 'contact',
      '/reviews': 'reviews',
      '/pricing': 'pricing',
      '/faq': 'faq'
    };

    if (sectionRedirectMap[path]) {
      const targetAnchor = sectionRedirectMap[path];
      window.history.replaceState({}, '', `/#${targetAnchor}`);
      setCurrentPath('/');
      setTimeout(() => {
        const el = document.getElementById(targetAnchor);
        if (el) {
          const navOffset = 80;
          const elementPosition = el.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - navOffset;
          window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
        }
      }, 300);
      return;
    }

    // Check if initial load had a hash
    if (window.location.hash) {
      const hash = window.location.hash.replace('#', '');
      setTimeout(() => {
        const el = document.getElementById(hash);
        if (el) {
          const navOffset = 80;
          const elementPosition = el.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - navOffset;
          window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
        }
      }, 300);
    }

    setCurrentPath(path);

    const handlePopState = () => {
      setCurrentPath(normalizePath(window.location.pathname));
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Sync document title and meta description
  useEffect(() => {
    let title = PAGES_DATA.home.meta_title;
    let desc = PAGES_DATA.home.meta_description;

    if (currentPath === '/admin') {
      title = "Studio Inquiries & Transcripts | Falguni's Photography";
      desc = "Private admin portal for Falguni's Photography.";
    }

    document.title = title;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', desc);
    }
  }, [currentPath]);

  const navigateTo = (path: string) => {
    if (path !== currentPath) {
      window.history.pushState({}, '', path);
      setCurrentPath(path);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const renderCurrentPage = () => {
    if (currentPath === '/admin') {
      return <AdminPage onNavigate={navigateTo} />;
    }
    return <HomePage onNavigate={navigateTo} />;
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF5EF] text-[#362E2B] font-sans">
      {/* On-load blanket unfold swaddle animation (<1.5s) */}
      {showLoading && (
        <LoadingScreen onComplete={() => setShowLoading(false)} />
      )}

      {/* Boutique Navigation Bar with single-page smooth scrolling */}
      <Navbar currentPath={currentPath} onNavigate={navigateTo} />

      {/* Single-Page Landing Page Content */}
      <main className="flex-1">
        {renderCurrentPage()}
      </main>

      {/* Boutique Studio Footer with Embedded Map, NAP & Local SEO data */}
      <Footer onNavigate={navigateTo} />

      {/* AI Chatbot commented out as requested */}
      {/* <WillowAssistant /> */}

      {/* Floating Call Icon for Falguni's Direct Studio Phone Number */}
      <a
        href={`tel:${STUDIO_INFO.phone.replace(/\s+/g, '')}`}
        className="fixed bottom-6 right-6 z-40 flex items-center gap-2.5 px-4 sm:px-5 py-3.5 bg-[#6E4E53] text-[#FAF5EF] rounded-full shadow-[0_8px_24px_rgba(110,78,83,0.35)] hover:bg-[#583D42] hover:shadow-[0_12px_28px_rgba(110,78,83,0.45)] hover:scale-105 active:scale-95 transition-all duration-200 group focus:outline-none focus:ring-2 focus:ring-[#9CAA8C]"
        aria-label="Call Falguni's Photography directly"
        title={`Call Falguni directly: ${STUDIO_INFO.phoneDisplay}`}
      >
        <span className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-[#FAF5EF] group-hover:rotate-12 transition-transform duration-200">
          <Phone size={18} weight="fill" />
        </span>
        <div className="text-left">
          <span className="block text-[10px] text-[#EAD3CE] font-semibold uppercase tracking-wider leading-none">
            Direct Line
          </span>
          <span className="block text-xs sm:text-sm font-medium tracking-wide leading-tight">
            Call Falguni
          </span>
        </div>
      </a>
    </div>
  );
}
