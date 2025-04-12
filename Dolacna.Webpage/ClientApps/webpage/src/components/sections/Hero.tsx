import React, { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Hero = () => {
  const { t } = useTranslation();
  const phoneRef = useRef<HTMLDivElement>(null);

  const supermarketsCount = 5;
  const productsCount = 1000;
  const avgSavings = 20;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
        }
      },
      { threshold: 0.1 },
    );

    const elements = document.querySelectorAll('.reveal-animation');
    elements.forEach((el) => observer.observe(el));

    return () => elements.forEach((el) => observer.unobserve(el));
  }, []);

  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-brand-light">
      <div className="absolute inset-0 z-0 opacity-40">
        <div className="absolute top-0 left-0 right-0 h-60 bg-gradient-to-b from-brand-dark/10 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-brand-dark/10 to-transparent"></div>
      </div>

      <div className="section-container relative z-10 grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-6 items-center">
        {/* Text Content */}
        <div className="text-left space-y-6 reveal-animation">
          <div className="inline-block px-3 py-1 rounded-full bg-brand-accent/20 text-brand-dark font-medium text-sm mb-4">
            {t('save_money')}
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight md:leading-tight text-balance">
            {t('compare_prices')}{' '}
            <span className="text-brand-accent">{t('across_slovakia')}</span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-lg">
            {t('description')}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Button className="button-hover-effect text-lg px-8 py-6 bg-brand-dark text-white hover:bg-brand-accent hover:text-brand-dark">
              {t('download_now')}
            </Button>
            <Button
              variant="outline"
              className="text-lg px-8 py-6 border-brand-dark text-brand-dark hover:bg-brand-dark hover:text-white"
            >
              {t('learn_more')}
            </Button>
          </div>

          <div className="flex items-center gap-x-8 pt-6">
            <div className="flex flex-col">
              <span className="text-3xl font-bold text-brand-dark">
                {supermarketsCount}+
              </span>
              <span className="text-muted-foreground">{t('supermarkets')}</span>
            </div>
            <div className="w-px h-10 bg-border"></div>
            <div className="flex flex-col">
              <span className="text-3xl font-bold text-brand-dark">
                {productsCount}
              </span>
              <span className="text-muted-foreground">{t('products')}</span>
            </div>
            <div className="w-px h-10 bg-border"></div>
            <div className="flex flex-col">
              <span className="text-3xl font-bold text-brand-dark">
                {avgSavings}%
              </span>
              <span className="text-muted-foreground">{t('avg_savings')}</span>
            </div>
          </div>
        </div>

        <div
          ref={phoneRef}
          className="relative h-[900px] w-full max-w-[450px] mx-auto md:mx-0 md:ml-auto reveal-animation"
        >
          <img src="public\images\Black-Titanium.png"></img>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-40 left-1/2 transform -translate-x-1/2 flex flex-col items-center animate-bounce">
          <span className="text-sm font-medium mb-2 text-brand-dark">
            {t('scroll_to_explore')}
          </span>
          <ChevronDown className="w-6 h-6 text-brand-dark" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
