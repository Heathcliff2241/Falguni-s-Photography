import React, { useState, useEffect } from 'react';
import { PAGES_DATA } from './data/siteData';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { LoadingScreen } from './components/LoadingScreen';
import { WillowAssistant } from './components/WillowAssistant';

import { HomePage } from './pages/HomePage';
import { NewbornPage } from './pages/NewbornPage';
import { MaternityPage } from './pages/MaternityPage';
import { FamilyPage } from './pages/FamilyPage';
import { CakeSmashPage } from './pages/CakeSmashPage';
import { AboutPage } from './pages/AboutPage';
import { GalleryPage } from './pages/GalleryPage';
import { ContactPage } from './pages/ContactPage';
import { AdminPage } from './pages/AdminPage';

export default function App() {
  const [currentPath, setCurrentPath] = useState<string>('/');
  const [showLoading, setShowLoading] = useState<boolean>(true);

  // Initialize and handle browser back/forward navigation
  useEffect(() => {
    const normalizePath = (p: string) => {
      const trimmed = p.replace(/\/$/, '');
      return trimmed === '' ? '/' : trimmed;
    };

    setCurrentPath(normalizePath(window.location.pathname));

    const handlePopState = () => {
      setCurrentPath(normalizePath(window.location.pathname));
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Sync document title and meta description to exact route
  useEffect(() => {
    let title = "Newborn Photographer in Lightsview, Adelaide | Falguni's";
    let desc = "Unhurried newborn, maternity, family and cake smash photography from a home studio in Lightsview, Adelaide. Sessions from $300. Book your date today.";

    switch (currentPath) {
      case '/services/newborn-photography':
        title = PAGES_DATA.newborn.meta_title;
        desc = PAGES_DATA.newborn.meta_description;
        break;
      case '/services/maternity-photography':
        title = PAGES_DATA.maternity.meta_title;
        desc = PAGES_DATA.maternity.meta_description;
        break;
      case '/services/family-photography':
        title = PAGES_DATA.family.meta_title;
        desc = PAGES_DATA.family.meta_description;
        break;
      case '/services/cake-smash-photography':
        title = PAGES_DATA.cakeSmash.meta_title;
        desc = PAGES_DATA.cakeSmash.meta_description;
        break;
      case '/about':
        title = PAGES_DATA.about.meta_title;
        desc = PAGES_DATA.about.meta_description;
        break;
      case '/gallery':
        title = PAGES_DATA.gallery.meta_title;
        desc = PAGES_DATA.gallery.meta_description;
        break;
      case '/contact':
        title = PAGES_DATA.contact.meta_title;
        desc = PAGES_DATA.contact.meta_description;
        break;
      case '/admin':
        title = "Studio Inquiries & Transcripts | Falguni's Photography";
        desc = "Private admin portal for Falguni's Photography.";
        break;
      default:
        title = PAGES_DATA.home.meta_title;
        desc = PAGES_DATA.home.meta_description;
        break;
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
    switch (currentPath) {
      case '/services/newborn-photography':
        return <NewbornPage onNavigate={navigateTo} />;
      case '/services/maternity-photography':
        return <MaternityPage onNavigate={navigateTo} />;
      case '/services/family-photography':
        return <FamilyPage onNavigate={navigateTo} />;
      case '/services/cake-smash-photography':
        return <CakeSmashPage onNavigate={navigateTo} />;
      case '/about':
        return <AboutPage onNavigate={navigateTo} />;
      case '/gallery':
        return <GalleryPage onNavigate={navigateTo} />;
      case '/contact':
        return <ContactPage onNavigate={navigateTo} />;
      case '/admin':
        return <AdminPage onNavigate={navigateTo} />;
      case '/':
      default:
        return <HomePage onNavigate={navigateTo} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF5EF] text-[#362E2B] font-sans">
      {/* On-load blanket unfold swaddle animation (<1.5s) */}
      {showLoading && (
        <LoadingScreen onComplete={() => setShowLoading(false)} />
      )}

      {/* Boutique Navigation Bar */}
      <Navbar currentPath={currentPath} onNavigate={navigateTo} />

      {/* Main Siloed Page Content */}
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
