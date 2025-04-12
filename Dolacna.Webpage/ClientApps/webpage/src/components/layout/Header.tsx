import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTranslation } from 'react-i18next';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { t, i18n } = useTranslation();

  // Track scroll position for header styling
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-4 px-4 sm:px-6',
        isScrolled
          ? 'bg-white/80 backdrop-blur-lg shadow-sm'
          : 'bg-transparent',
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center">
          <span className="text-2xl font-bold text-brand-dark">
            usetri<span className="text-brand-accent">.sk</span>
          </span>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <a
            href="#features_header"
            className="text-foreground hover:text-brand-accent transition-colors"
          >
            {t('features_header')}
          </a>
          <a
            href="#how-it-works"
            className="text-foreground hover:text-brand-accent transition-colors"
          >
            {t('how_it_works')}
          </a>
          <a
            href="#premium_header"
            className="text-foreground hover:text-brand-accent transition-colors"
          >
            {t('premium_header')}
          </a>
          <Button className="bg-brand-dark text-white hover:bg-brand-accent hover:text-brand-dark transition-all">
            {t('download_app')}
          </Button>

          {/* Language Selector */}
          <div className="text-foreground hover:text-brand-accent transition-colors">
            <select
              onChange={(e) => changeLanguage(e.target.value)}
              value={i18n.language}
              className="px-4 py-2 border rounded-md bg-white shadow-sm text-gray-800"
            >
              <option value="en">{t('language.english')}</option>
              <option value="sk">{t('language.slovak')}</option>
            </select>
          </div>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-foreground"
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
              href="#features_header"
              className="block py-2 text-foreground hover:text-brand-accent transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              {t('features_header')}
            </a>
            <a
              href="#how-it-works"
              className="block py-2 text-foreground hover:text-brand-accent transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              {t('how_it_works')}
            </a>
            <a
              href="#premium_header"
              className="block py-2 text-foreground hover:text-brand-accent transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              {t('premium_header')}
            </a>
            <Button
              className="w-full bg-brand-dark text-white hover:bg-brand-accent hover:text-brand-dark transition-all"
              onClick={() => setMobileMenuOpen(false)}
            >
              {t('download_app')}
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
