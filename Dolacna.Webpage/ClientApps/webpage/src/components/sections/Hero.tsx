import React, { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import BlackTitaniumPng from '@/../public/images/Black-Titanium.png';

const Hero = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const phoneRef = useRef<HTMLDivElement>(null);

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
            <Button
              className="button-hover-effect text-lg px-8 py-6 bg-brand-dark text-white hover:bg-brand-accent hover:text-brand-dark"
              onClick={() => navigate('/Download')}
            >
              {t('download_app')}
            </Button>
            <Button
              variant="outline"
              className="text-lg px-8 py-6 border-brand-dark text-brand-dark hover:bg-brand-dark hover:text-white"
              onClick={() => navigate('/HowItWorks')}
            >
              {t('learn_more')}
            </Button>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-x-8 pt-6">
            <div className="flex flex-col text-center sm:text-left">
              <span className="text-3xl font-bold text-brand-dark">
                {t('supermarkets_count')}
              </span>
              <span className="text-muted-foreground">{t('supermarkets')}</span>
            </div>
            <div className="hidden sm:block w-px h-10 bg-border"></div>
            <div className="flex flex-col text-center sm:text-left">
              <span className="text-3xl font-bold text-brand-dark">
                {t('products_count')}
              </span>
              <span className="text-muted-foreground">{t('products')}</span>
            </div>
            <div className="hidden sm:block w-px h-10 bg-border"></div>
            <div className="flex flex-col text-center sm:text-left">
              <span className="text-3xl font-bold text-brand-dark">
                {t('savings_percentage')}
              </span>
              <span className="text-muted-foreground">{t('avg_savings')}</span>
            </div>
          </div>
        </div>

        <div
          ref={phoneRef}
          className="relative h-[900px] w-full max-w-[450px] mx-auto md:mx-0 md:ml-auto reveal-animation"
        >
          <img src={BlackTitaniumPng} alt={'PhoneImage'}></img>
        </div>
      </div>
    </section>
  );
};

export default Hero;
