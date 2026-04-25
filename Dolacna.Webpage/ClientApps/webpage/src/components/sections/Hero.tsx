import { Button } from '@/components/ui/button';
import { PhoneSimulator } from '@/components/sections/PhoneSimulator';
import { useRevealAnimation } from '@/hooks/use-reveal-animation';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

const Hero = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  useRevealAnimation();

  return (
    <section className="relative min-h-screen flex items-center pt-0 overflow-hidden bg-brand-primary-dark">
      {/* Pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.1] pointer-events-none z-[1]"
        style={{ backgroundImage: 'url(/images/graphicMotives/pattern.png)', backgroundRepeat: 'repeat', backgroundSize: '250px' }}
      />
      {/* Decorative background blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-32 -right-32 w-[600px] h-[600px] rounded-full bg-brand-primary opacity-60 blur-[120px]" />
        <div className="absolute bottom-0 -left-24 w-[400px] h-[400px] rounded-full bg-brand-lilac opacity-20 blur-[100px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-brand-primary opacity-10 blur-[150px]" />
      </div>

      <div
        className="section-container relative z-10 grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-8 items-center"
        style={{ paddingTop: '7rem' }}
      >
        {/* Text Content */}
        <div className="text-left space-y-7 reveal-animation" data-anim="left">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-secondary/15 border border-brand-secondary/35 text-brand-secondary font-medium text-sm">
            <span className="w-2 h-2 rounded-full bg-brand-secondary animate-pulse-subtle" />
            {t('save_money')}
          </div>

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
          <PhoneSimulator showDescription={false} />
        </div>
      </div>
    </section>
  );
};

export default Hero;
