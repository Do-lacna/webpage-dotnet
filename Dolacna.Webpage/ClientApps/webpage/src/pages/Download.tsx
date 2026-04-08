import IPhoneMockupPng from '@/../public/images/app_mockup.png';
import Footer from '@/components/layout/Footer';
import Header from '@/components/layout/Header';
import { Apple, Smartphone } from 'lucide-react';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

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
  const releaseHeading = t('download.releaseBanner.heading');
  const releaseDate = t('download.releaseBanner.date');

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
                    <span className="text-brand-indigo">
                      {t('download.pageTitle').split(' ')[0]}{' '}
                    </span>
                    <span className="text-brand-primary">
                      {t('download.pageTitle').split(' ').slice(1).join(' ')}
                    </span>
                  </h1>
                  <p className="text-xl text-gray-600 mb-6 leading-relaxed">
                    {t('download.pageSubtitle')}
                  </p>

                  {/* Release Banner */}
                  <div className="mb-8 inline-flex items-center gap-2 bg-green-50 border border-green-200 rounded-lg px-4 py-3 text-sm text-green-800 max-w-xs mx-auto lg:mx-0">
                    <div className="w-2 h-2 rounded-full bg-green-500 shrink-0" />
                    <div className="font-semibold">
                      {releaseHeading}{' '}
                      <span className="text-green-600">{releaseDate}</span>
                    </div>
                  </div>

                  {/* Device Compatibility Info */}
                  <div className="flex items-center justify-center lg:justify-start gap-2 mb-8">
                    <span className="text-gray-500 text-sm">
                      {t('download.compatibility.title')}:
                    </span>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <Smartphone className="w-4 h-4 text-brand-primary" />
                        <span className="text-sm font-medium text-brand-indigo">
                          {t('download.compatibility.ios')}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Smartphone className="w-4 h-4 text-brand-primary" />
                        <span className="text-sm font-medium text-brand-indigo">
                          {t('download.compatibility.android')}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                    <a
                      href="https://apps.apple.com/sk/app/u%C5%A1etri/id6744099337"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-3 bg-black text-white rounded-xl px-6 py-3 hover:bg-black/80 transition-colors shadow-md hover:shadow-lg"
                    >
                      <Apple className="w-8 h-8" />
                      <div className="text-left">
                        <div className="text-[10px] leading-tight opacity-80">
                          {t('download.finalCta.downloadOn')}
                        </div>
                        <div className="text-lg font-semibold leading-tight">
                          {t('download.appStore')}
                        </div>
                      </div>
                    </a>
                    <a
                      href="https://play.google.com/store/apps/details?id=com.dutosvarc.usetri"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-3 bg-black text-white rounded-xl px-6 py-3 hover:bg-black/80 transition-colors shadow-md hover:shadow-lg"
                    >
                      <svg className="w-7 h-7" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M3.609 1.814 13.792 12 3.61 22.186a.996.996 0 0 1-.61-.92V2.734a1 1 0 0 1 .609-.92zm10.89 10.893 2.302 2.302-10.937 6.333 8.635-8.635zm3.199-1.4 2.532 1.466c.564.327.564 1.127 0 1.454l-2.532 1.466-2.534-2.46 2.534-1.926zM5.864 2.658l10.937 6.333-2.302 2.302-8.635-8.635z" />
                      </svg>
                      <div className="text-left">
                        <div className="text-[10px] leading-tight opacity-80">
                          {t('download.finalCta.downloadOn')}
                        </div>
                        <div className="text-lg font-semibold leading-tight">
                          {t('download.googlePlay')}
                        </div>
                      </div>
                    </a>
                  </div>
                </div>

                {/* Right Image */}
                <div className="relative reveal-animation">
                  <div className="relative max-w-[420px] mx-auto lg:ml-auto lg:mr-0">
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


      </main>
      <Footer />
    </div>
  );
};

export default Download;
