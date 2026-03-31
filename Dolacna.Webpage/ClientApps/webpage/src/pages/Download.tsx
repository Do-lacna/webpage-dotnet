import IPhoneMockupPng from '@/../public/images/app_mockup.png';
import Footer from '@/components/layout/Footer';
import Header from '@/components/layout/Header';
import { Button } from '@/components/ui/button';
import { Apple, ShoppingBag, Smartphone } from 'lucide-react';
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
  const releaseDesc = t('download.releaseBanner.description');
  const disabledTooltip = t('download.releaseBanner.disabledTooltip');

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
                  <div className="mb-8 inline-flex flex-col gap-1 bg-brand-primary/10 border border-brand-primary/30 rounded-lg px-4 py-3 text-sm text-brand-indigo max-w-xs mx-auto lg:mx-0">
                    <div className="font-semibold">
                      {releaseHeading}{' '}
                      <span className="text-brand-primary">{releaseDate}</span>
                    </div>
                    <div className="text-gray-600 text-xs">{releaseDesc}</div>
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
                    <div className="relative group">
                      <Button
                        className="flex items-center justify-center gap-3 bg-gray-300 text-gray-500 cursor-not-allowed text-lg py-6 px-8"
                        aria-disabled="true"
                        disabled
                      >
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
                      <span className="absolute -bottom-7 left-1/2 -translate-x-1/2 whitespace-nowrap bg-brand-indigo text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                        {disabledTooltip}
                      </span>
                    </div>
                    <div className="relative group">
                      <Button
                        className="flex items-center justify-center gap-3 bg-gray-300 text-gray-500 cursor-not-allowed text-lg py-6 px-8"
                        aria-disabled="true"
                        disabled
                      >
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
                      <span className="absolute -bottom-7 left-1/2 -translate-x-1/2 whitespace-nowrap bg-brand-indigo text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                        {disabledTooltip}
                      </span>
                    </div>
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
