import { Button } from '@/components/ui/button';
import { useRevealAnimation } from '@/hooks/use-reveal-animation';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

const VIDEOS = [
  { src: '/videos/search.MP4', labelKey: 'hero.videoLabels.search', accentKey: 'hero.videoLabels.searchAccent' },
  { src: '/videos/shopping_listr.MP4', labelKey: 'hero.videoLabels.shoppingList', accentKey: 'hero.videoLabels.shoppingListAccent' },
  { src: '/videos/sales.MP4', labelKey: 'hero.videoLabels.sales', accentKey: 'hero.videoLabels.salesAccent' },
];

const VIDEO_CROSSFADE_MS = 600;

const Hero = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [nextIndex, setNextIndex] = useState<number | null>(null);
  const [isFading, setIsFading] = useState(false);
  useRevealAnimation();

  const advanceVideo = useCallback(() => {
    const next = (activeIndex + 1) % VIDEOS.length;
    setNextIndex(next);
    setIsFading(true);

    // Start playing the next video
    const nextVideo = videoRefs.current[next];
    if (nextVideo) {
      nextVideo.currentTime = 0;
      nextVideo.play().catch(() => {});
    }

    setTimeout(() => {
      setActiveIndex(next);
      setNextIndex(null);
      setIsFading(false);
    }, VIDEO_CROSSFADE_MS);
  }, [activeIndex]);

  // When the active video ends, crossfade to next
  useEffect(() => {
    const video = videoRefs.current[activeIndex];
    if (!video) return;

    video.play().catch(() => {});

    const handleEnded = () => advanceVideo();
    video.addEventListener('ended', handleEnded);
    return () => video.removeEventListener('ended', handleEnded);
  }, [activeIndex, advanceVideo]);

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

        {/* Phone mockup with video carousel */}
        <div
          className="relative w-full md:ml-auto md:mr-0 reveal-animation flex items-center justify-center gap-6"
          data-anim="right"
        >
          {/* iPhone 16 Pro frame + dots */}
          <div className="flex flex-col items-center shrink-0">
            <div className="relative w-[260px] aspect-[9/19.5] rounded-[2.5rem] border-[5px] border-[#2a2a2e] bg-black shadow-[0_30px_60px_rgba(0,0,0,0.5)] overflow-hidden">
              {/* Dynamic Island */}
              <div className="absolute top-2 left-1/2 -translate-x-1/2 w-[75px] h-[22px] bg-black rounded-full z-30" />

              {/* Side button accents */}
              <div className="absolute -right-[7px] top-[90px] w-[3px] h-[30px] bg-[#2a2a2e] rounded-r-sm" />
              <div className="absolute -left-[7px] top-[75px] w-[3px] h-[22px] bg-[#2a2a2e] rounded-l-sm" />
              <div className="absolute -left-[7px] top-[112px] w-[3px] h-[38px] bg-[#2a2a2e] rounded-l-sm" />
              <div className="absolute -left-[7px] top-[158px] w-[3px] h-[38px] bg-[#2a2a2e] rounded-l-sm" />

              {/* Video layers */}
              <div className="absolute inset-0 z-10">
                {VIDEOS.map((video, idx) => {
                  const isActive = idx === activeIndex;
                  const isNext = idx === nextIndex;
                  const isVisible = isActive || isNext;

                  return (
                    <video
                      key={video.src}
                      ref={(el) => { videoRefs.current[idx] = el; }}
                      src={video.src}
                      muted
                      playsInline
                      preload="auto"
                      className="absolute inset-0 w-full h-full object-cover transition-opacity duration-[600ms] ease-in-out"
                      style={{
                        opacity: isActive && !isFading ? 1 : isNext && isFading ? 1 : isActive && isFading ? 0 : 0,
                        zIndex: isNext ? 2 : isActive ? 1 : 0,
                        display: isVisible ? 'block' : 'none',
                        willChange: 'transform',
                      }}
                    />
                  );
                })}
              </div>

              {/* Bottom home indicator */}
              <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-[90px] h-[3px] bg-white/30 rounded-full z-30" />
            </div>

            {/* Progress dots */}
            <div className="flex justify-center gap-2.5 mt-5">
              {VIDEOS.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    if (idx !== activeIndex && !isFading) {
                      setNextIndex(idx);
                      setIsFading(true);
                      const nextVideo = videoRefs.current[idx];
                      if (nextVideo) {
                        nextVideo.currentTime = 0;
                        nextVideo.play().catch(() => {});
                      }
                      setTimeout(() => {
                        setActiveIndex(idx);
                        setNextIndex(null);
                        setIsFading(false);
                      }, VIDEO_CROSSFADE_MS);
                    }
                  }}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    idx === activeIndex
                      ? 'w-8 bg-brand-secondary'
                      : 'w-2 bg-white/30 hover:bg-white/50'
                  }`}
                  aria-label={`Show video ${idx + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Feature label - right of phone, large stacked text */}
          <div key={activeIndex} className="hidden md:block animate-fade-in w-[200px] lg:w-[260px] shrink-0">
            <p className="text-4xl lg:text-5xl font-black leading-[1.1] tracking-tight text-white">
              {t(VIDEOS[activeIndex].labelKey)}
            </p>
            <p className="text-4xl lg:text-5xl font-black leading-[1.1] tracking-tight text-brand-secondary mt-1">
              {t(VIDEOS[activeIndex].accentKey)}
            </p>
          </div>

          {/* Mobile label - below dots */}
          <div
            key={`mobile-${activeIndex}`}
            className="md:hidden absolute -bottom-14 left-0 right-0 text-center animate-fade-in"
          >
            <span className="text-xl font-bold text-white">{t(VIDEOS[activeIndex].labelKey)}{' '}</span>
            <span className="text-xl font-bold text-brand-secondary">{t(VIDEOS[activeIndex].accentKey)}</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
