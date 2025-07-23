import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Apple, ShoppingBag, Smartphone, Check } from 'lucide-react';
import IPhoneMockupPng from '@/../public/images/iMockup - iPhone 14.png';

const Download = () => {
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
      {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px',
      },
    );

    const elements = document.querySelectorAll('.reveal-animation');
    elements.forEach((el) => observer.observe(el));

    return () => {
      if (elements) {
        elements.forEach((el) => observer.unobserve(el));
      }
    };
  }, []);

  const benefits = t('download.benefits.list', {
    returnObjects: true,
  }) as string[];

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        {/* Page Header */}
        <section className="py-16 bg-white">
          <div className="section-container">
            <div className="max-w-6xl mx-auto">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                {/* Left Content */}
                <div className="text-center lg:text-left reveal-animation">
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                    <span className="text-brand-dark">
                      {t('download.pageTitle').split(' ')[0]}{' '}
                    </span>
                    <span className="text-brand-accent">
                      {t('download.pageTitle').split(' ').slice(1).join(' ')}
                    </span>
                  </h1>
                  <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                    {t('download.pageSubtitle')}
                  </p>

                  {/* Device Compatibility Info */}
                  <div className="flex items-center justify-center lg:justify-start gap-2 mb-8">
                    <span className="text-gray-500 text-sm">
                      {t('download.compatibility.title')}:
                    </span>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <Smartphone className="w-4 h-4 text-brand-accent" />
                        <span className="text-sm font-medium text-brand-dark">
                          {t('download.compatibility.ios')}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Smartphone className="w-4 h-4 text-brand-accent" />
                        <span className="text-sm font-medium text-brand-dark">
                          {t('download.compatibility.android')}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                    <Button className="flex items-center justify-center gap-3 bg-brand-accent text-brand-dark hover:bg-brand-dark hover:text-white button-hover-effect text-lg py-6 px-8">
                      <Apple className="w-6 h-6" />
                      <div className="text-left">
                        <div className="text-xs">
                          {t('download.finalCta.downloadOn')}
                        </div>
                        <div className="font-semibold">
                          {t('download.appStore')}
                        </div>
                      </div>
                    </Button>
                    <Button className="flex items-center justify-center gap-3 bg-brand-accent text-brand-dark hover:bg-brand-dark hover:text-white button-hover-effect text-lg py-6 px-8">
                      <ShoppingBag className="w-6 h-6" />
                      <div className="text-left">
                        <div className="text-xs">
                          {t('download.finalCta.getItOn')}
                        </div>
                        <div className="font-semibold">
                          {t('download.googlePlay')}
                        </div>
                      </div>
                    </Button>
                  </div>
                </div>

                {/* Right Image */}
                <div className="relative reveal-animation">
                  <div className="relative max-w-[320px] mx-auto lg:ml-auto lg:mr-0">
                    <img
                      src={IPhoneMockupPng}
                      alt="Ušetri Slovensko app preview"
                      className="w-full h-auto drop-shadow-xl"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-16 bg-gray-50">
          <div className="section-container">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12 reveal-animation">
                <h2 className="text-2xl md:text-3xl font-bold text-brand-dark mb-4">
                  {t('download.benefits.title')}
                </h2>
                <p className="text-lg text-gray-600">
                  {t('download.benefits.subtitle')}
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                {benefits.map((benefit) => (
                  <div
                    key={benefit}
                    className="flex items-center gap-3 p-4 bg-white rounded-lg shadow-sm reveal-animation"
                  >
                    <div className="flex-shrink-0 w-6 h-6 bg-brand-accent rounded-full flex items-center justify-center">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-gray-700">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Download;
