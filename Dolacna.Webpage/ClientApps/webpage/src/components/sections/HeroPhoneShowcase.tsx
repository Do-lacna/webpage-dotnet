/**
 * HeroPhoneShowcase.tsx
 *
 * Lightweight phone mockup for the hero section: a single CSS phone frame
 * with screenshots stacked on top of each other, crossfaded with opacity
 * only. No animated blurs, no 3D transforms, no backdrop filters, no
 * re-mounting — smooth on low-end devices.
 *
 * Screenshots live in public/images/landing_page/.
 */

import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

type Screen = { src: string; labelKey: string; icon: string };

const SCREENS: Screen[] = [
  { src: '/images/landing_page/discounts.webp', labelKey: 'hero.screens.discounts', icon: '🏷️' },
  { src: '/images/landing_page/search_2.webp', labelKey: 'hero.screens.search', icon: '🔍' },
  { src: '/images/landing_page/product.webp', labelKey: 'hero.screens.productDetail', icon: '🧾' },
  { src: '/images/landing_page/shopping_list_1.webp', labelKey: 'hero.screens.list', icon: '🛒' },
  { src: '/images/landing_page/shopping_list_2.webp', labelKey: 'hero.screens.listCompare', icon: '⚖️' },
  { src: '/images/landing_page/profile.webp', labelKey: 'hero.screens.savings', icon: '💰' },
];

const SCREEN_DURATION = 4500; // ms per screenshot before auto-advance

const KEYFRAMES = `
@keyframes hps-float {
  0%, 100% { transform: translateY(0); }
  50%      { transform: translateY(-10px); }
}
@keyframes hps-fill {
  from { transform: scaleX(0); }
  to   { transform: scaleX(1); }
}
@media (prefers-reduced-motion: reduce) {
  .hps-float { animation: none !important; }
}
`;

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches,
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
    const io = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.2 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const playing = inView && !hovered && !reducedMotion;

  useEffect(() => {
    if (!playing) return;
    const timer = setTimeout(() => setActive(i => (i + 1) % SCREENS.length), SCREEN_DURATION);
    return () => clearTimeout(timer);
  }, [playing, active]);

  return (
    <div
      ref={containerRef}
      className="flex flex-col items-center gap-7 w-full"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <style>{KEYFRAMES}</style>

      {/* Phone */}
      <div className="relative hps-float" style={{ animation: 'hps-float 7s ease-in-out infinite' }}>
        {/* Static glow — radial gradient, no blur filter, painted once */}
        <div
          aria-hidden
          className="absolute -inset-16 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at center, rgba(123,109,224,0.28) 0%, transparent 65%)' }}
        />

        <div
          className="relative overflow-hidden bg-[#0d0b1a] border-2 border-[#3a3450]"
          style={{
            width: 'min(300px, 72vw)',
            aspectRatio: '252 / 540',
            borderRadius: 'min(54px, 13vw)',
            boxShadow: '0 30px 60px rgba(0,0,0,.6), 0 0 0 1px rgba(255,255,255,.06)',
          }}
        >
          {/* Dynamic island */}
          <div className="absolute top-[3.5%] left-1/2 -translate-x-1/2 w-[33%] h-[3.2%] bg-black rounded-full z-20" />

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

          {/* Home indicator */}
          <div className="absolute bottom-[1.8%] left-1/2 -translate-x-1/2 w-[38%] h-[3px] bg-white/25 rounded-full z-20" />
        </div>
      </div>

      {/* Screen switcher */}
      <div
        role="tablist"
        aria-label={t('hero.screens.switcherLabel')}
        className="flex flex-wrap justify-center gap-2 max-w-[540px]"
      >
        {SCREENS.map((screen, i) => {
          const isActive = i === active;
          return (
            <button
              key={screen.src}
              role="tab"
              aria-selected={isActive}
              onClick={() => setActive(i)}
              className={`relative overflow-hidden flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-colors duration-300 border ${
                isActive
                  ? 'bg-white/10 border-brand-secondary/60 text-white'
                  : 'bg-white/[0.04] border-white/10 text-white/50 hover:text-white/80 hover:border-white/25'
              }`}
            >
              <span aria-hidden>{screen.icon}</span>
              <span>{t(screen.labelKey)}</span>
              {isActive && playing && (
                <span
                  key={`progress-${active}`}
                  aria-hidden
                  className="absolute bottom-0 left-0 right-0 h-[2px] bg-brand-secondary origin-left"
                  style={{ animation: `hps-fill ${SCREEN_DURATION}ms linear both` }}
                />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default HeroPhoneShowcase;
