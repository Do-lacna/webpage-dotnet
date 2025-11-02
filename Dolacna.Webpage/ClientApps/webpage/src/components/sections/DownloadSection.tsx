import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import IPhoneMockupPng from '@/../public/images/iMockup - iPhone 15 Pro Max.png';
import { useNavigate } from 'react-router-dom';
import { useRevealAnimation } from '@/hooks/use-reveal-animation';

const DownloadSection = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  useRevealAnimation();

  return (
    <section
      id="download"
      className="py-20 bg-gradient-to-b from-brand-light via-brand-dark/10 to-brand-dark"
    >
      <div className="section-container">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="md:w-1/2 text-left reveal-animation" data-anim="left">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-brand-dark">
              {t('download.heading')}{' '}
              <span className="text-brand-accent">
                {t('download.headingAccent')}
              </span>
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              {t('download.subheading')}
            </p>
            <div className="flex items-center gap-4">
              <Button
                onClick={() => navigate('/Download')}
                className="flex items-center justify-center gap-2 bg-brand-accent text-brand-dark hover:bg-white button-hover-effect text-lg p-6">
                <span>{t('download_now')}</span>
              </Button>
            </div>
          </div>
          <div className="md:w-1/2 relative reveal-animation" data-anim="right">
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
