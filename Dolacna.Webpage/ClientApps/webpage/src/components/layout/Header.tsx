import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Menu, X } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';

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

  const isHome = location.pathname === '/';
  const isTransparent = isHome && !isScrolled;

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-5 px-4 sm:px-6',
        isTransparent
          ? 'bg-transparent'
          : 'bg-white/90 backdrop-blur-lg shadow-soft border-b border-brand-lilac/30',
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center">
          <a href="/" className="flex items-center">
            <img
              src="/images/logos/usetri-logo_claim-purple.png"
              alt="Usetri Logo"
              className={cn(
                'h-12 w-auto transition-all duration-300',
                isTransparent && 'brightness-0 invert',
              )}
            />
          </a>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <a
            href="/HowItWorks"
            className={cn(
              'nav-link transition-colors',
              isTransparent
                ? 'text-white/90 hover:text-brand-secondary'
                : 'text-brand-indigo hover:text-brand-primary',
            )}
          >
            {t('how_it_works')}
          </a>
          <a
            href="/Premium"
            className={cn(
              'nav-link transition-colors',
              isTransparent
                ? 'text-white/90 hover:text-brand-secondary'
                : 'text-brand-indigo hover:text-brand-primary',
            )}
          >
            {t('premium_header')}
          </a>
          <a
            href="/FAQ"
            className={cn(
              'nav-link transition-colors',
              isTransparent
                ? 'text-white/90 hover:text-brand-secondary'
                : 'text-brand-indigo hover:text-brand-primary',
            )}
          >
            {t('faq_header')}
          </a>
          <a
            href="/AboutUs"
            className={cn(
              'nav-link transition-colors',
              isTransparent
                ? 'text-white/90 hover:text-brand-secondary'
                : 'text-brand-indigo hover:text-brand-primary',
            )}
          >
            {t('footer.aboutUs')}
          </a>
          <a
            href="/Contact"
            className={cn(
              'nav-link transition-colors',
              isTransparent
                ? 'text-white/90 hover:text-brand-secondary'
                : 'text-brand-indigo hover:text-brand-primary',
            )}
          >
            {t('footer.contact')}
          </a>

          <Button
            className="bg-brand-secondary text-brand-indigo hover:bg-brand-primary hover:text-white transition-all font-bold shadow-sm text-base px-6 py-5"
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
            className={cn(
              'ml-2 transition-colors text-base font-semibold px-4 py-5',
              isTransparent
                ? 'text-white/80 hover:text-white hover:bg-white/10'
                : 'text-brand-primary hover:text-brand-primary-dark hover:bg-brand-nude',
            )}
          >
            {language.toUpperCase()}
          </Button>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className={cn(
            'md:hidden transition-colors',
            isTransparent ? 'text-white' : 'text-brand-primary',
          )}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label={t('toggle_menu')}
        >
          {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white/95 backdrop-blur-lg shadow-lg border-t border-brand-lilac/20 animate-slide-down">
          <div className="px-4 py-6 space-y-4">
            <a
              href="/HowItWorks"
              className="nav-link block py-2 text-brand-indigo hover:text-brand-primary transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              {t('how_it_works')}
            </a>
            <a
              href="/Premium"
              className="nav-link block py-2 text-brand-indigo hover:text-brand-primary transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              {t('premium_header')}
            </a>
            <a
              href="#features"
              className="nav-link block py-2 text-brand-indigo hover:text-brand-primary transition-colors"
              onClick={(e) => {
                handleNavClick(e, 'features');
                setMobileMenuOpen(false);
              }}
            >
              {t('features_header')}
            </a>
            <a
              href="/FAQ"
              className="nav-link block py-2 text-brand-indigo hover:text-brand-primary transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              {t('faq_header')}
            </a>
            <a
              href="/AboutUs"
              className="nav-link block py-2 text-brand-indigo hover:text-brand-primary transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              {t('footer.aboutUs')}
            </a>
            <a
              href="/Contact"
              className="nav-link block py-2 text-brand-indigo hover:text-brand-primary transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              {t('footer.contact')}
            </a>
            <Button
              className="w-full bg-brand-secondary text-brand-indigo hover:bg-brand-primary hover:text-white font-bold transition-all"
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
              className="w-full text-brand-primary hover:bg-brand-nude"
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
