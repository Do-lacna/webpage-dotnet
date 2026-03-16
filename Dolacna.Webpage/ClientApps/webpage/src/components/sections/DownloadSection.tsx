import KosikPng from '@/../public/images/featuredGraphics/kosik.png';
import { Button } from '@/components/ui/button';
import { useRevealAnimation } from '@/hooks/use-reveal-animation';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

const DownloadSection = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  useRevealAnimation();

  return (
    <section
      id="download"
      className="relative py-14 bg-brand-primary-dark overflow-hidden"
    >
      {/* Decorative blobs — mirror of hero */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -bottom-24 -left-24 w-[480px] h-[480px] rounded-full bg-brand-primary opacity-50 blur-[100px]" />
        <div className="absolute top-0 right-0 w-[320px] h-[320px] rounded-full bg-brand-lilac opacity-15 blur-[80px]" />
      </div>

      <div className="section-container relative z-10">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12">
          {/* Text */}
          <div className="md:w-1/2 text-left reveal-animation" data-anim="left">
            <div className="inline-block px-3 py-1 rounded-full bg-brand-secondary/15 border border-brand-secondary/30 text-brand-secondary font-medium text-sm mb-6">
              {t('download.pageTitle')}
            </div>
            <h2 className="text-3xl md:text-4xl font-black mb-5 text-white leading-tight">
              {t('download.heading')}{' '}
              <span className="text-brand-secondary">
                {t('download.headingAccent')}
              </span>
            </h2>
            <p className="text-lg text-white/60 mb-8 leading-relaxed">
              {t('download.subheading')}
            </p>
            <div className="flex flex-col sm:flex-row items-start gap-4">
              <Button
                onClick={() => navigate('/Download')}
                className="button-hover-effect flex items-center justify-center gap-2 bg-brand-secondary text-brand-indigo hover:bg-white hover:text-brand-primary font-bold text-base px-8 py-6 rounded-xl shadow-glow-yellow transition-all duration-300"
              >
                {t('download_now')}
              </Button>
            </div>
          </div>

          {/* Kosik graphic */}
          <div className="md:w-1/2 relative reveal-animation" data-anim="right">
            <div className="relative max-w-[360px] mx-auto">
              <img
                src={KosikPng}
                alt="Usetri kosik"
                className="relative w-full h-auto"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DownloadSection;
