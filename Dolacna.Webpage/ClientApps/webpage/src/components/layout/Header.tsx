import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTranslation } from 'react-i18next';
import { useNavigate, useLocation } from 'react-router-dom';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();

  // Track scroll position for header styling
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const [language, setLanguage] = useState<'sk' | 'en'>('sk');

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  // Helper to handle navigation and scrolling
  const handleNavClick = (e: React.MouseEvent, sectionId: string) => {
    e.preventDefault();
    if (location.pathname !== '/') {
      navigate('/', { replace: false });
      // Wait for navigation, then scroll
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100); // Adjust delay if needed
    } else {
      const el = document.getElementById(sectionId);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-4 px-4 sm:px-6',
        isScrolled
          ? 'bg-brand-dark/90 backdrop-blur-lg shadow-sm'
          : 'bg-brand-dark/80 backdrop-blur-sm',
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center">
          <a href="/" className="flex items-center space-x-3">
            <img
              src="/images/usetri-logo.svg"
              alt="Ušetri Slovensko Logo"
              className="h-8 w-auto"
            />
            <span className="text-2xl font-bold text-white">
              Ušetri<span className="text-brand-accent"> Slovensko</span>
            </span>
          </a>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <a
            href="/HowItWorks"
            className="nav-link text-white hover:text-brand-accent transition-colors"
          >
            {t('how_it_works')}
          </a>
          <a
            href="/Premium"
            className="nav-link text-white hover:text-brand-accent transition-colors"
          >
            {t('premium_header')}
          </a>
          <a
            href="/Contact"
            className="nav-link text-white hover:text-brand-accent transition-colors"
          >
            {t('footer.contact')}
          </a>

          <a
            href="/FAQ"
            className="nav-link text-white hover:text-brand-accent transition-colors"
          >
            {t('faq_header')}
          </a>
          <a
            href="/AboutUs"
            className="nav-link text-white hover:text-brand-accent transition-colors"
          >
            {t('footer.aboutUs')}
          </a>

          <Button
            className="bg-brand-accent text-brand-dark hover:bg-white hover:text-brand-dark transition-all"
            onClick={() => navigate('/Download')}
          >
            {t('download_app')}
          </Button>
          <Button
            variant="ghost"
            onClick={() => {
              setLanguage(language === 'sk' ? 'en' : 'sk');
              changeLanguage(language === 'sk' ? 'en' : 'sk');
            }}
            className="ml-4 text-white hover:text-brand-accent hover:bg-white/10"
          >
            {language.toUpperCase()}
          </Button>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label={t('toggle_menu')}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white/95 backdrop-blur-lg shadow-lg animate-slide-down">
          <div className="px-4 py-6 space-y-4">
            <a
              href="#features"
              className="nav-link block py-2 text-foreground hover:text-brand-accent transition-colors"
              onClick={(e) => {
                handleNavClick(e, 'features');
                setMobileMenuOpen(false);
              }}
            >
              {t('features_header')}
            </a>
            <a
              href="/Premium"
              className="nav-link block py-2 text-foreground hover:text-brand-accent transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              {t('premium_header')}
            </a>
            <a
              href="/Contact"
              className="nav-link block py-2 text-foreground hover:text-brand-accent transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              {t('footer.contact')}
            </a>
            <a
              href="/HowItWorks"
              className="nav-link block py-2 text-foreground hover:text-brand-accent transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              {t('how_it_works')}
            </a>
            <a
              href="/FAQ"
              className="nav-link block py-2 text-foreground hover:text-brand-accent transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              {t('faq_header')}
            </a>
            <Button
              className="w-full bg-brand-dark text-white hover:bg-brand-accent hover:text-brand-dark transition-all"
              onClick={() => {
                setMobileMenuOpen(false);
                navigate('/Download');
              }}
            >
              {t('download_app')}
            </Button>
            <Button
              variant="ghost"
              onClick={() => {
                setLanguage(language === 'sk' ? 'en' : 'sk');
                changeLanguage(language === 'sk' ? 'en' : 'sk');
              }}
              className="w-full"
            >
              {language.toUpperCase()}
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
