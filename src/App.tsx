import React, { useState, useEffect } from 'react';
import { PAGES_DATA } from './data/siteData';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { LoadingScreen } from './components/LoadingScreen';
import { WillowAssistant } from './components/WillowAssistant';

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

      {/* Boutique Studio Footer with NAP & Local SEO data */}
      <Footer onNavigate={navigateTo} />

      {/* Functional Willow AI Assistant widget */}
      <WillowAssistant />
    </div>
  );
}
