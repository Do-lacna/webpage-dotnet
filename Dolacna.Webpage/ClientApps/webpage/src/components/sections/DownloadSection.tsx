import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Apple, ShoppingBag } from 'lucide-react';
import IPhoneMockupPng from '@/../public/images/iMockup - iPhone 15 Pro Max.png';

const DownloadSection = () => {
  const { t } = useTranslation();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
          }
        });
      },
      { threshold: 0.1 },
    );

    const elements = document.querySelectorAll('.reveal-animation');
    elements.forEach((el) => observer.observe(el));

    return () => elements.forEach((el) => observer.unobserve(el));
  }, []);

  return (
    <section
      id="download"
      className="py-20 bg-gradient-to-b from-brand-light via-brand-dark/10 to-brand-dark"
    >
      <div className="section-container">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="md:w-1/2 text-left reveal-animation">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-brand-dark">
              {t('download.heading')}{' '}
              <span className="text-brand-accent">
                {t('download.headingAccent')}
              </span>
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              {t('download.subheading')}
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button className="flex items-center justify-center gap-2 bg-brand-accent text-brand-dark hover:bg-white button-hover-effect text-lg py-6">
                <Apple className="w-6 h-6" />
                <span>{t('download.appStore')}</span>
              </Button>
              <Button className="flex items-center justify-center gap-2 bg-brand-accent text-brand-dark hover:bg-white button-hover-effect text-lg py-6">
                <ShoppingBag className="w-6 h-6" />
                <span>{t('download.googlePlay')}</span>
              </Button>
            </div>

            <div className="mt-8 flex items-center gap-4">
              <div className="flex -space-x-2">
                <div className="w-10 h-10 rounded-full bg-brand-light flex items-center justify-center text-brand-dark font-medium">
                  JD
                </div>
                <div className="w-10 h-10 rounded-full bg-brand-accent flex items-center justify-center text-brand-dark font-medium">
                  KL
                </div>
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-brand-dark font-medium">
                  MN
                </div>
                <div className="w-10 h-10 rounded-full border border-gray-400 flex items-center justify-center text-gray-600 font-medium">
                  +
                </div>
              </div>
              <div className="text-sm text-gray-600">
                {t('download.joinedBy')}{' '}
                <span className="font-bold text-brand-dark">10,000+</span>{' '}
                {t('download.smartShoppers')}
              </div>
            </div>
          </div>

          <div className="md:w-1/2 relative reveal-animation">
            <div className="relative max-w-[280px] mx-auto">
              <img
                src={IPhoneMockupPng}
                alt="usetri.sk app preview"
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DownloadSection;
