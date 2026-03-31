import Shop1Png from '@/../public/images/valueProposition/1.png';
import Shop2Png from '@/../public/images/valueProposition/2.png';
import Shop3Png from '@/../public/images/valueProposition/3.png';
import Shop4Png from '@/../public/images/valueProposition/4.png';
import ZoznamPng from '@/../public/images/valueProposition/zoznam.png';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from '@/components/ui/carousel';
import { useRevealAnimation } from '@/hooks/use-reveal-animation';
import { cn } from '@/lib/utils';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

const shopImages = [Shop1Png, Shop2Png, Shop3Png, Shop4Png];

const ValueProposition = () => {
  const { t } = useTranslation();
  useRevealAnimation();

  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) return;
    const onSelect = () => setCurrent(api.selectedScrollSnap());
    api.on('select', onSelect);
    onSelect();
    return () => {
      api.off('select', onSelect);
    };
  }, [api]);

  const scrollTo = useCallback(
    (idx: number) => api?.scrollTo(idx),
    [api],
  );

  return (
    <section className="relative py-10 md:py-14 bg-brand-nude overflow-hidden">
      {/* Pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.1] pointer-events-none"
        style={{ backgroundImage: 'url(/images/graphicMotives/pattern.png)', backgroundRepeat: 'repeat', backgroundSize: '280px' }}
      />
      {/* Subtle top divider */}
          <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{ backgroundImage: 'url(/images/graphicMotives/pattern.png)', backgroundRepeat: 'repeat', backgroundSize: '300px' }}
      />
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 -right-40 w-[500px] h-[500px] rounded-full bg-brand-primary opacity-[0.04] blur-[120px]" />
        <div className="absolute bottom-0 -left-32 w-[350px] h-[350px] rounded-full bg-brand-lilac opacity-[0.06] blur-[100px]" />
      </div>

      <div className="max-w-[60rem] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section header */}
        <div className="text-center max-w-3xl mx-auto mb-8 md:mb-12 reveal-animation" data-anim="up">
          <h2 className="text-3xl md:text-5xl font-bold text-brand-indigo leading-tight">
            {t('valueProposition.heading')}{' '}
            <span className="text-brand-primary">{t('valueProposition.headingAccent')}</span>
          </h2>
          <p className="mt-4 text-brand-indigo/60 text-lg md:text-xl max-w-2xl mx-auto">
            {t('valueProposition.subheading')}
          </p>
        </div>

        {/* Visual flow: Grocery list → Arrow → Comparison carousel */}
        <div className="flex flex-col lg:flex-row items-center lg:items-start justify-between gap-6 md:gap-8 lg:gap-12">
          {/* ── Left: Grocery list phone ── */}
          <div className="reveal-animation flex-shrink-0" data-anim="left">
            <div className="text-center mb-4">
              <span className="inline-block px-4 py-1.5 rounded-full bg-brand-primary/10 text-brand-primary text-sm font-medium border border-brand-primary/20">
                {t('valueProposition.stepList')}
              </span>
            </div>
            <img
              src={ZoznamPng}
              alt={t('valueProposition.groceryListAlt')}
              className="w-[220px] sm:w-[240px] md:w-[260px] h-auto"
            />
          </div>

          {/* ── Arrow connector ── */}
          <div className="reveal-animation flex-shrink-0 flex flex-col items-center gap-2 lg:self-center" data-anim="scale">
            {/* Horizontal arrow on lg+, vertical on smaller */}
            <div className="hidden lg:flex items-center text-brand-primary">
              <div className="w-16 h-[2px] bg-gradient-to-r from-transparent to-brand-primary" />
              <ArrowRight className="w-8 h-8 animate-pulse-subtle" />
            </div>
            <div className="lg:hidden flex flex-col items-center text-brand-primary">
              <div className="h-10 w-[2px] bg-gradient-to-b from-transparent to-brand-primary" />
              <ArrowRight className="w-7 h-7 rotate-90 animate-pulse-subtle" />
            </div>
            <span className="text-brand-indigo/40 text-xs font-medium uppercase tracking-widest">
              {t('valueProposition.arrowLabel')}
            </span>
          </div>

          {/* ── Right: Comparison carousel ── */}
          <div className="reveal-animation flex-shrink-0" data-anim="right">
            <div className="text-center mb-4">
              <span className="inline-block px-4 py-1.5 rounded-full bg-brand-secondary/20 text-brand-orange text-sm font-medium border border-brand-secondary/40">
                {t('valueProposition.stepCompare')}
              </span>
            </div>

            <Carousel
              opts={{ loop: true }}
              setApi={setApi}
              className="w-[220px] sm:w-[240px] md:w-[260px]"
            >
              <CarouselContent>
                {shopImages.map((src, idx) => (
                  <CarouselItem key={idx} className="min-w-0">
                    <img
                      src={src}
                      alt={t('valueProposition.shopAlt', { number: idx + 1 })}
                      className="w-[220px] sm:w-[240px] md:w-[260px] h-auto"
                    />
                  </CarouselItem>
                ))}
              </CarouselContent>

              {/* Custom nav controls */}
              <div className="flex items-center justify-center gap-4 mt-5">
                <button
                  onClick={() => api?.scrollPrev()}
                  className="w-9 h-9 rounded-full border border-brand-primary/20 bg-brand-primary/5 hover:bg-brand-primary/15 flex items-center justify-center text-brand-primary transition-colors"
                  aria-label="Previous shop"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>

                {/* Dot indicators */}
                <div className="flex items-center gap-2">
                  {shopImages.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => scrollTo(idx)}
                      aria-label={`Go to shop ${idx + 1}`}
                      className={cn(
                        'w-2.5 h-2.5 rounded-full transition-all duration-300',
                        current === idx
                          ? 'bg-brand-primary w-6'
                          : 'bg-brand-primary/20 hover:bg-brand-primary/40',
                      )}
                    />
                  ))}
                </div>

                <button
                  onClick={() => api?.scrollNext()}
                  className="w-9 h-9 rounded-full border border-brand-primary/20 bg-brand-primary/5 hover:bg-brand-primary/15 flex items-center justify-center text-brand-primary transition-colors"
                  aria-label="Next shop"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </Carousel>
          </div>
        </div>

        {/* Bottom tagline */}
        <p className="text-center text-brand-indigo/40 text-sm mt-6 reveal-animation" data-anim="up">
          {t('valueProposition.footnote')}
        </p>
      </div>
    </section>
  );
};

export default ValueProposition;
