/**
 * HeroPhoneShowcase.tsx
 *
 * Lightweight phone mockup for the hero section: a single CSS phone frame
 * with screenshots stacked on top of each other, crossfaded with opacity
 * only. No animated blurs, no 3D transforms, no backdrop filters, no
 * re-mounting — smooth on low-end devices.
 *
 * Screenshots live in public/images/landing_page/.
 *
 * Layout: the screen switcher is a numbered rail beside the phone on wide
 * screens (xl and up, where the hero column is wide enough for both) and a
 * compact underlined row below it otherwise. The active item's accent doubles
 * as the autoplay progress indicator: it fills over SCREEN_DURATION while
 * playing and sits solid while paused.
 */

import { PhoneMockup } from '@/components/ui/phone-mockup';
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

type Screen = { src: string; labelKey: string };

const SCREENS: Screen[] = [
  {
    src: '/images/landing_page/discounts.png',
    labelKey: 'hero.screens.discounts',
  },
  {
    src: '/images/landing_page/recipes.png',
    labelKey: 'hero.screens.recipes',
  },
  {
    src: '/images/landing_page/search.png',
    labelKey: 'hero.screens.search',
  },
  {
    src: '/images/landing_page/product_detail.png',
    labelKey: 'hero.screens.productDetail',
  },
  {
    src: '/images/landing_page/shopping_list.png',
    labelKey: 'hero.screens.list',
  },
  {
    src: '/images/landing_page/price_comparison.png',
    labelKey: 'hero.screens.listCompare',
  },
  {
    src: '/images/landing_page/profile.png',
    labelKey: 'hero.screens.savings',
  },
];

const SCREEN_DURATION = 4000; // ms per screenshot before auto-advance

const KEYFRAMES = `
@keyframes hps-float {
  0%, 100% { transform: translateY(0); }
  50%      { transform: translateY(-10px); }
}
@keyframes hps-fill {
  from { transform: scaleX(0); }
  to   { transform: scaleX(1); }
}
@keyframes hps-fill-y {
  from { transform: scaleY(0); }
  to   { transform: scaleY(1); }
}
@media (prefers-reduced-motion: reduce) {
  .hps-float { animation: none !important; }
}
`;

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(
    () =>
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  );
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);
  return reduced;
}

export function HeroPhoneShowcase() {
  const { t } = useTranslation();
  const [active, setActive] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [inView, setInView] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const reducedMotion = usePrefersReducedMotion();

  // Pause the slideshow while scrolled offscreen — no work when invisible.
  useEffect(() => {
    const el = containerRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') return;
    const io = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.2 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const playing = inView && !hovered && !reducedMotion;

  useEffect(() => {
    if (!playing) return;
    const timer = setTimeout(
      () => setActive((i) => (i + 1) % SCREENS.length),
      SCREEN_DURATION,
    );
    return () => clearTimeout(timer);
  }, [playing, active]);

  return (
    <div
      ref={containerRef}
      className="flex flex-col xl:flex-row items-center justify-center gap-7 xl:gap-8 w-full"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <style>{KEYFRAMES}</style>

      {/* Phone */}
      <div
        className="relative hps-float shrink-0"
        style={{ animation: 'hps-float 7s ease-in-out infinite' }}
      >
        {/* Static glow — radial gradient, no blur filter, painted once */}
        <div
          aria-hidden
          className="absolute -inset-16 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse at center, rgba(123,109,224,0.28) 0%, transparent 65%)',
          }}
        />

        <PhoneMockup size="lg">
          {/* Screenshots — stacked, opacity crossfade only */}
          {SCREENS.map((screen, i) => (
            <img
              key={screen.src}
              src={screen.src}
              alt={t(screen.labelKey)}
              draggable={false}
              decoding="async"
              loading={i === 0 ? 'eager' : 'lazy'}
              className="absolute inset-0 w-full h-full object-cover object-top select-none transition-opacity duration-700 ease-in-out"
              style={{ opacity: i === active ? 1 : 0 }}
            />
          ))}
        </PhoneMockup>
      </div>

      {/* Screen switcher — numbered rail beside the phone, compact row below */}
      <div
        role="tablist"
        aria-label={t('hero.screens.switcherLabel')}
        className="flex flex-wrap justify-center gap-x-6 gap-y-2 max-w-[520px] xl:flex-col xl:flex-nowrap xl:gap-0 xl:w-[232px] xl:max-w-none"
      >
        {SCREENS.map((screen, i) => {
          const isActive = i === active;
          // Solid while paused, filling while the slideshow runs.
          const fill = (axis: 'x' | 'y') =>
            playing
              ? {
                  animation: `hps-fill${axis === 'y' ? '-y' : ''} ${SCREEN_DURATION}ms linear both`,
                }
              : undefined;
          return (
            <button
              key={screen.src}
              role="tab"
              aria-selected={isActive}
              onClick={() => setActive(i)}
              className={`relative text-left text-sm font-semibold transition-colors duration-300 pb-2 xl:flex xl:items-baseline xl:gap-3 xl:w-full xl:pt-3.5 xl:pb-3.5 xl:pl-5 xl:text-base ${
                isActive ? 'text-white' : 'text-white/55 hover:text-white/90'
              }`}
            >
              {/* Rail track — adjacent items butt together into one hairline */}
              <span
                aria-hidden
                className="hidden xl:block absolute left-0 top-0 bottom-0 w-[2px] bg-white/12"
              />
              <span
                aria-hidden
                className={`hidden xl:block text-[11px] tabular-nums transition-colors duration-300 ${
                  isActive ? 'text-brand-secondary' : 'text-white/30'
                }`}
              >
                {String(i + 1).padStart(2, '0')}
              </span>

              <span>{t(screen.labelKey)}</span>

              {isActive && (
                <>
                  {/* Underline (compact row) */}
                  <span
                    key={`bar-x-${active}-${playing}`}
                    aria-hidden
                    className="xl:hidden absolute bottom-0 left-0 right-0 h-[2px] bg-brand-secondary origin-left"
                    style={fill('x')}
                  />
                  {/* Rail accent (wide layout) */}
                  <span
                    key={`bar-y-${active}-${playing}`}
                    aria-hidden
                    className="hidden xl:block absolute left-0 top-0 bottom-0 w-[2px] bg-brand-secondary origin-top"
                    style={fill('y')}
                  />
                </>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default HeroPhoneShowcase;
