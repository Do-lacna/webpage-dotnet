import { Button } from '@/components/ui/button';
import { lazy, Suspense } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

const PhoneSimulator = lazy(() =>
  import('@/components/sections/PhoneSimulator').then((m) => ({
    default: m.PhoneSimulator,
  })),
);

const Hero = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <section className="relative min-h-screen flex items-center pt-0 overflow-hidden bg-brand-primary-dark">
      {/* Pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.1] pointer-events-none z-[1]"
        style={{
          backgroundImage: 'url(/images/graphicMotives/pattern.png)',
          backgroundRepeat: 'repeat',
          backgroundSize: '250px',
        }}
      />
      {/* Decorative background glows — radial-gradients instead of blur() for WebKit/iOS perf */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute -top-40 -right-40 w-[700px] h-[700px] rounded-full"
          style={{
            background:
              'radial-gradient(circle, rgba(86,69,204,0.55) 0%, rgba(86,69,204,0) 70%)',
          }}
        />
        <div
          className="absolute -bottom-20 -left-32 w-[520px] h-[520px] rounded-full"
          style={{
            background:
              'radial-gradient(circle, rgba(207,176,255,0.18) 0%, rgba(207,176,255,0) 70%)',
          }}
        />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full"
          style={{
            background:
              'radial-gradient(circle, rgba(86,69,204,0.10) 0%, rgba(86,69,204,0) 70%)',
          }}
        />
      </div>

      <div
        className="section-container relative z-10 grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-8 items-center"
        style={{ paddingTop: '7rem' }}
      >
        {/* Text Content */}
        <div className="text-left space-y-7 reveal-animation" data-anim="left">
          {/* Headline */}
          <h1 className="text-5xl sm:text-6xl md:text-[4.25rem] font-black leading-[1.08] tracking-tight text-white">
            {t('compare_prices')}{' '}
            <span className="text-brand-secondary">{t('across_slovakia')}</span>
          </h1>

          {/* Description */}
          <p className="text-lg md:text-xl text-white/65 max-w-[460px] leading-relaxed">
            {t('description')}
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 pt-2">
            <Button
              className="button-hover-effect text-base px-8 py-6 bg-brand-secondary text-brand-indigo hover:bg-white hover:text-brand-primary font-bold transition-all duration-300 shadow-glow-yellow rounded-xl"
              onClick={() => navigate('/Download')}
            >
              {t('download_app')}
            </Button>
            <Button
              variant="outline"
              className="text-base px-8 py-6 border-white/25 text-white bg-white/5 hover:bg-white/12 hover:border-white/50 transition-all duration-300 rounded-xl"
              onClick={() => navigate('/HowItWorks')}
            >
              {t('learn_more')}
            </Button>
          </div>
        </div>

        {/* Phone simulator */}
        <div
          className="relative w-full md:ml-auto md:mr-0 reveal-animation flex items-center justify-center"
          data-anim="right"
        >
          <Suspense
            fallback={
              <div
                className="w-[540px] max-w-full h-[580px]"
                aria-hidden="true"
              />
            }
          >
            <PhoneSimulator showDescription={false} />
          </Suspense>
        </div>
      </div>
    </section>
  );
};

export default Hero;
