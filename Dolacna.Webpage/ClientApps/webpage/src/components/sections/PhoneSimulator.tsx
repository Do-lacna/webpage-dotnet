/**
 * PhoneSimulator.tsx
 *
 * Drop-in animated phone mockup for the Ušetri landing page.
 *
 * Usage:
 *   import { PhoneSimulator } from '@/components/sections/PhoneSimulator';
 *   <PhoneSimulator />
 *
 * Place screenshots in:  public/images/landing_page/{search_1,search_2,discounts,shopping_list_1,shopping_list_2,profile}.png
 *
 * The component is fully self-contained — no external CSS, animation libs, or
 * UI kit deps. Inline styles + a single <style> tag for keyframes.
 *
 * If your repo already uses Tailwind / shadcn, this still works alongside it.
 *
 * To customise: edit the FEATURES array below.
 */

import React, { useCallback, useEffect, useState } from 'react';

/* ------------------------------------------------------------------ */
/* Data                                                                */
/* ------------------------------------------------------------------ */

type Screen = { src: string; label: string };
type Feature = {
  id: number;
  icon: string;
  tab: string;
  desc: string;
  screens: Screen[];
  color: string;
};

const IMG = (name: string) => `/images/landing_page/${name}`;

const FEATURES: Feature[] = [
  {
    id: 0,
    icon: '🔍',
    tab: 'Hľadať',
    desc: 'Prehľadaj tisíce produktov a okamžite zisti, kde nakúpiš najlacnejšie.',
    screens: [
      { src: IMG('search_1.png'), label: 'Prehľadaj kategórie produktov' },
      { src: IMG('search_2.png'), label: 'Porovnaj ceny naprieč obchodmi' },
    ],
    color: '#7b6de0',
  },
  {
    id: 1,
    icon: '📋',
    tab: 'Zoznam',
    desc: 'Poskladaj nákupný košík a zisti, v ktorom obchode ušetríš tento týždeň najviac.',
    screens: [
      { src: IMG('shopping_list_1.png'), label: 'Vyskladaj si nákupný zoznam' },
      { src: IMG('shopping_list_2.png'), label: 'A porovnaj ceny v jednotlivých obchodoch' },
    ],
    color: '#5645cc',
  },
  {
    id: 2,
    icon: '🏷️',
    tab: 'Zľavy',
    desc: 'Aktuálne akcie zo všetkých veľkých supermarketov na jednom mieste, každý týždeň.',
    screens: [{ src: IMG('discounts.png'), label: 'Sleduj aktuálne zľavy každý týždeň' }],
    color: '#f5d130',
  },
  {
    id: 3,
    icon: '💰',
    tab: 'Profil',
    desc: 'Prehľad všetkých tvojich nákupov a celkových úspor na jednom mieste.',
    screens: [{ src: IMG('profile.png'), label: 'Sleduj svoje úspory' }],
    color: '#cfb0ff',
  },
];

const FEATURE_DURATION = 5000; // ms before auto-advance to next feature
const FOCUS_DURATION   = 2600; // ms before swapping focus between dual screens

/* ------------------------------------------------------------------ */
/* Keyframes (single style tag, scoped class names)                    */
/* ------------------------------------------------------------------ */

const KEYFRAMES = `
@keyframes psim-fadeIn   { from { opacity:0; } to { opacity:1; } }
@keyframes psim-glow     { 0%,100%{opacity:.12} 50%{opacity:.22} }
@keyframes psim-pulse    { 0%,100%{opacity:.5} 50%{opacity:1} }
@keyframes psim-dashFlow { to { stroke-dashoffset: -20; } }

@keyframes psim-phoneEnter {
  0%   { opacity: 0; transform: scale(.97); }
  100% { opacity: 1; transform: scale(1);   }
}
@keyframes psim-phoneExit {
  0%   { opacity: 1; transform: scale(1);   }
  100% { opacity: 0; transform: scale(.98); }
}

@keyframes psim-descEnter {
  from { opacity: 0; transform: translateY(6px); }
  to   { opacity: 1; transform: translateY(0);   }
}
@keyframes psim-descExit {
  from { opacity: 1; transform: translateY(0);    }
  to   { opacity: 0; transform: translateY(-6px); }
}

.psim-phone-enter { animation: psim-phoneEnter .9s .15s cubic-bezier(.22,.72,.28,1) both; will-change: opacity, transform; }
.psim-phone-exit  { animation: psim-phoneExit  .7s      cubic-bezier(.4,0,.2,1)     both; will-change: opacity, transform; }
.psim-desc-enter  { animation: psim-descEnter  .6s .25s cubic-bezier(.22,.72,.28,1) both; }
.psim-desc-exit   { animation: psim-descExit   .4s ease-in both; }
`;

/* ------------------------------------------------------------------ */
/* Phone shell                                                         */
/* ------------------------------------------------------------------ */

function PhoneShell({
  src, w, h, color, active,
}: { src: string; w: number; h: number; color: string; active: boolean }) {
  return (
    <div style={{
      position: 'relative', width: w, height: h,
      background: '#0d0b1a', borderRadius: w * 0.18,
      border: active ? `2px solid ${color}66` : '2px solid #2a2636',
      boxShadow: active
        ? `0 40px 80px rgba(0,0,0,.75), 0 0 0 1px rgba(255,255,255,.06), 0 0 60px ${color}44`
        : '0 22px 40px rgba(0,0,0,.55)',
      overflow: 'hidden', flexShrink: 0,
      transition: 'border-color .6s, box-shadow .6s',
    }}>
      {/* Dynamic Island */}
      <div style={{
        position: 'absolute', top: w * 0.04, left: '50%',
        transform: 'translateX(-50%)',
        width: w * 0.33, height: w * 0.095,
        background: '#000', borderRadius: w * 0.05, zIndex: 30,
      }} />
      {/* Screen */}
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', borderRadius: w * 0.18 - 2 }}>
        <img
          src={src}
          alt=""
          draggable={false}
          style={{
            position: 'absolute', inset: 0,
            width: '100%', height: '100%',
            objectFit: 'cover', objectPosition: 'top',
            userSelect: 'none',
          }}
        />
        <div style={{
          position: 'absolute', inset: 0,
          background: active ? 'transparent' : 'linear-gradient(180deg, rgba(13,11,26,.35), rgba(13,11,26,.55))',
          transition: 'background .6s', pointerEvents: 'none',
        }} />
      </div>
      {/* Home indicator */}
      <div style={{
        position: 'absolute', bottom: w * 0.02, left: '50%',
        transform: 'translateX(-50%)',
        width: w * 0.38, height: 3,
        background: 'rgba(255,255,255,.2)', borderRadius: 2, zIndex: 40,
      }} />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Flow connector + caption pill (dual mode)                           */
/* ------------------------------------------------------------------ */

function FlowConnector({ color, reverse }: { color: string; reverse: boolean }) {
  return (
    <svg
      viewBox="0 0 140 240"
      style={{
        position: 'absolute', top: '50%', left: '50%',
        width: 140, height: 240,
        transform: `translate(-50%,-50%) ${reverse ? 'scaleX(-1)' : ''}`,
        pointerEvents: 'none', zIndex: 4,
        transition: 'transform .6s ease',
      }}
    >
      <defs>
        <linearGradient id="psim-flowGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%"   stopColor={color} stopOpacity="0" />
          <stop offset="40%"  stopColor={color} stopOpacity=".7" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path
        d="M 8 120 C 40 70, 100 170, 132 120"
        fill="none" stroke="url(#psim-flowGrad)" strokeWidth="1.5"
        strokeDasharray="4 6"
        style={{ animation: 'psim-dashFlow 1.2s linear infinite' }}
      />
      <g transform="translate(132 120)">
        <circle r="4" fill={color} opacity=".9" />
        <circle r="10" fill="none" stroke={color} strokeOpacity=".4" strokeWidth="1">
          <animate attributeName="r" values="4;14;4" dur="2s" repeatCount="indefinite" />
          <animate attributeName="stroke-opacity" values=".5;0;.5" dur="2s" repeatCount="indefinite" />
        </circle>
      </g>
    </svg>
  );
}

function CaptionPill({
  text, color, visible, side,
}: { text: string; color: string; visible: boolean; side: 'left' | 'right' }) {
  return (
    <div style={{
      position: 'absolute',
      [side]: -18,
      top: '18%',
      transform: `translateX(${side === 'left' ? '-100%' : '100%'}) translateY(${visible ? '0' : '8px'})`,
      background: 'rgba(18,15,36,0.95)',
      backdropFilter: 'blur(14px)',
      border: `1px solid ${color}55`,
      borderRadius: 14,
      padding: '10px 14px',
      fontSize: 12, fontWeight: 600, lineHeight: 1.35,
      color: '#f0eeff',
      maxWidth: 170,
      opacity: visible ? 1 : 0,
      transition: 'opacity .5s ease, transform .5s ease',
      boxShadow: '0 14px 40px rgba(0,0,0,.55)',
      zIndex: 20, whiteSpace: 'normal',
    } as React.CSSProperties}>
      <div style={{
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        width: 18, height: 18, borderRadius: 9,
        background: color, color: '#0d0b1a',
        fontSize: 10, fontWeight: 700, marginRight: 8,
      }}>
        {side === 'left' ? '1' : '2'}
      </div>
      {text}
      <div style={{
        position: 'absolute',
        [side === 'left' ? 'right' : 'left']: -12,
        top: '50%', transform: 'translateY(-50%)',
        width: 12, height: 1.5,
        background: `linear-gradient(${side === 'left' ? '90deg' : '270deg'}, ${color}, transparent)`,
      } as React.CSSProperties} />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Single + dual phone stages                                          */
/* ------------------------------------------------------------------ */

function SinglePhone({ src, label, color }: { src: string; label: string; color: string }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 18 }}>
      <PhoneShell src={src} w={252} h={540} color={color} active={true} />
      <div key={label} style={{
        background: 'rgba(18,15,36,0.95)',
        backdropFilter: 'blur(14px)',
        border: `1px solid ${color}55`,
        borderRadius: 14,
        padding: '10px 14px',
        fontSize: 12, fontWeight: 600, lineHeight: 1.35,
        color: '#f0eeff',
        maxWidth: 280, textAlign: 'center',
        boxShadow: '0 14px 40px rgba(0,0,0,.55)',
        animation: 'psim-fadeIn .5s ease both',
      }}>
        {label}
      </div>
    </div>
  );
}

function DualPhoneStage({ feat, focusIdx }: { feat: Feature; focusIdx: number }) {
  const aActive = focusIdx === 0;
  const bActive = focusIdx === 1;
  const W = 200, H = 425;

  const aTransform = aActive
    ? 'translateX(-18%) translateZ(40px) rotateY(8deg) scale(1.05)'
    : 'translateX(-34%) translateZ(-20px) rotateY(18deg) scale(0.88)';
  const bTransform = bActive
    ? 'translateX(18%) translateZ(40px) rotateY(-8deg) scale(1.05)'
    : 'translateX(34%) translateZ(-20px) rotateY(-18deg) scale(0.88)';

  return (
    <div style={{
      position: 'relative',
      width: 520, height: 520,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      perspective: 1400,
    }}>
      <div style={{
        position: 'absolute', bottom: 22, left: '50%',
        transform: 'translateX(-50%)',
        width: 420, height: 50,
        background: `radial-gradient(ellipse at center, ${feat.color}22 0%, transparent 65%)`,
        filter: 'blur(20px)', pointerEvents: 'none',
      }} />

      <FlowConnector color={feat.color} reverse={bActive} />

      {/* Phone A */}
      <div style={{
        position: 'absolute', left: '50%', top: '50%',
        transform: `translate(-50%,-50%) ${aTransform}`,
        transformStyle: 'preserve-3d',
        transition: 'transform .7s cubic-bezier(.4,0,.2,1), z-index 0s linear .35s',
        zIndex: aActive ? 10 : 2,
        filter: aActive ? 'none' : 'saturate(.7)',
      }}>
        <PhoneShell src={feat.screens[0].src} w={W} h={H} color={feat.color} active={aActive} />
        <CaptionPill text={feat.screens[0].label} color={feat.color} visible={aActive} side="left" />
      </div>

      {/* Phone B */}
      <div style={{
        position: 'absolute', left: '50%', top: '50%',
        transform: `translate(-50%,-50%) ${bTransform}`,
        transformStyle: 'preserve-3d',
        transition: 'transform .7s cubic-bezier(.4,0,.2,1), z-index 0s linear .35s',
        zIndex: bActive ? 10 : 2,
        filter: bActive ? 'none' : 'saturate(.7)',
      }}>
        <PhoneShell src={feat.screens[1].src} w={W} h={H} color={feat.color} active={bActive} />
        <CaptionPill text={feat.screens[1].label} color={feat.color} visible={bActive} side="right" />
      </div>

      {/* Step dots */}
      <div style={{
        position: 'absolute', bottom: -8, left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex', gap: 6, alignItems: 'center',
        background: 'rgba(18,15,36,.7)', backdropFilter: 'blur(10px)',
        border: '1px solid rgba(86,69,204,.3)',
        borderRadius: 100, padding: '6px 12px', zIndex: 20,
      }}>
        {feat.screens.map((_, i) => (
          <div key={i} style={{
            width: i === focusIdx ? 22 : 6, height: 6, borderRadius: 3,
            background: i === focusIdx ? feat.color : 'rgba(255,255,255,.25)',
            transition: 'all .4s',
          }} />
        ))}
        <div style={{
          fontSize: 10, fontWeight: 600, color: 'rgba(240,238,255,.45)',
          marginLeft: 4, letterSpacing: '.05em', textTransform: 'uppercase',
        }}>
          Krok {focusIdx + 1} z {feat.screens.length}
        </div>
      </div>
    </div>
  );
}

function PhoneMockup({ featureIdx, focusIdx }: { featureIdx: number; focusIdx: number }) {
  const feat = FEATURES[featureIdx];
  const dual = feat.screens.length > 1;

  return (
    <div style={{ position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '10px 20px' }}>
      <div style={{
        position: 'absolute', width: 440, height: 440,
        background: `radial-gradient(circle, ${feat.color}33 0%, transparent 70%)`,
        borderRadius: '50%', filter: 'blur(70px)',
        animation: 'psim-glow 3s ease-in-out infinite',
        transition: 'background .6s ease', pointerEvents: 'none',
      }} />
      {dual
        ? <DualPhoneStage feat={feat} focusIdx={focusIdx} />
        : <SinglePhone src={feat.screens[0].src} label={feat.screens[0].label} color={feat.color} />}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Crossfade wrappers                                                  */
/* ------------------------------------------------------------------ */

function FeatureCrossfade({ featIdx, focusIdx }: { featIdx: number; focusIdx: number }) {
  const [current, setCurrent] = useState(featIdx);
  const [outgoing, setOutgoing] = useState<number | null>(null);
  const [enterKey, setEnterKey] = useState(0);

  useEffect(() => {
    if (featIdx === current) return;
    setOutgoing(current);
    setCurrent(featIdx);
    setEnterKey(k => k + 1);
    const t = setTimeout(() => setOutgoing(null), 1050);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [featIdx]);

  return (
    <div style={{
      position: 'relative',
      width: 540, height: 580,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      perspective: 1200,
    }}>
      {outgoing !== null && (
        <div key={`out-${outgoing}`} className="psim-phone-exit" style={{
          position: 'absolute', inset: 0,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <PhoneMockup featureIdx={outgoing} focusIdx={0} />
        </div>
      )}
      <div key={`in-${current}-${enterKey}`} className="psim-phone-enter" style={{
        position: 'absolute', inset: 0,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <PhoneMockup featureIdx={current} focusIdx={focusIdx} />
      </div>
    </div>
  );
}

function DescriptionCrossfade({ featIdx }: { featIdx: number }) {
  const [current, setCurrent] = useState(featIdx);
  const [outgoing, setOutgoing] = useState<number | null>(null);

  useEffect(() => {
    if (featIdx === current) return;
    setOutgoing(current);
    setCurrent(featIdx);
    const t = setTimeout(() => setOutgoing(null), 800);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [featIdx]);

  return (
    <div style={{ position: 'relative', minHeight: 56 }}>
      {outgoing !== null && (
        <p key={`dout-${outgoing}`} className="psim-desc-exit" style={{
          position: 'absolute', inset: 0,
          fontSize: 15, lineHeight: 1.65, color: 'rgba(240,238,255,.55)', maxWidth: 380,
        }}>
          {FEATURES[outgoing].desc}
        </p>
      )}
      <p key={`din-${current}`} className="psim-desc-enter" style={{
        fontSize: 15, lineHeight: 1.65, color: 'rgba(240,238,255,.55)', maxWidth: 380,
      }}>
        {FEATURES[current].desc}
      </p>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Progress bar                                                        */
/* ------------------------------------------------------------------ */

function ProgressBar({
  duration, active, onComplete,
}: { duration: number; active: boolean; onComplete: () => void }) {
  const [w, setW] = useState(0);

  useEffect(() => {
    if (!active) { setW(0); return; }
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      setW(p * 100);
      if (p < 1) raf = requestAnimationFrame(tick);
      else onComplete();
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, duration]);

  return (
    <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 2, background: 'rgba(255,255,255,.08)' }}>
      <div style={{ width: `${w}%`, height: '100%', background: '#f5d130' }} />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Main component                                                      */
/* ------------------------------------------------------------------ */

export type PhoneSimulatorProps = {
  /** Auto-advance through features. Default: true. */
  autoplay?: boolean;
  /** Optional override for feature labels / icons / etc. Defaults to built-in Slovak copy. */
  features?: Feature[];
  /** Show the description text under the headline area. Default: true. */
  showDescription?: boolean;
  /** Show the bottom feature tab bar. Default: true. */
  showTabs?: boolean;
};

export function PhoneSimulator({
  autoplay: autoplayProp = true,
  features = FEATURES,
  showDescription = true,
  showTabs = false,
}: PhoneSimulatorProps) {
  const [featIdx, setFeatIdx]   = useState(0);
  const [focusIdx, setFocusIdx] = useState(0);
  const [autoplay, setAutoplay] = useState(autoplayProp);
  const [progKey, setProgKey]   = useState(0);

  const goToFeature = useCallback((idx: number) => {
    if (idx === featIdx) return;
    setFeatIdx(idx);
    setFocusIdx(0);
    setProgKey(k => k + 1);
    setAutoplay(false);
    setTimeout(() => setAutoplay(autoplayProp), 50);
  }, [featIdx, autoplayProp]);

  const advanceFeature = useCallback(() => {
    setFeatIdx(i => (i + 1) % features.length);
    setFocusIdx(0);
    setProgKey(k => k + 1);
  }, [features.length]);

  // Focus cycling for dual-screen features
  useEffect(() => {
    const feat = features[featIdx];
    if (feat.screens.length < 2) return;
    const t = setTimeout(() => {
      setFocusIdx(f => (f + 1) % feat.screens.length);
    }, FOCUS_DURATION);
    return () => clearTimeout(t);
  }, [featIdx, focusIdx, features]);

  // Auto-advance to the next feature. Lives at the top level so it runs
  // even when the tab bar (which also renders a ProgressBar) is hidden.
  useEffect(() => {
    if (!autoplay) return;
    const t = setTimeout(() => {
      setFeatIdx(i => (i + 1) % features.length);
      setFocusIdx(0);
      setProgKey(k => k + 1);
    }, FEATURE_DURATION);
    return () => clearTimeout(t);
  }, [autoplay, featIdx, progKey, features.length]);

  return (
    <div style={{
      position: 'relative',
      display: 'flex', flexDirection: 'column', alignItems: 'center',
      width: '100%',
      fontFamily: 'inherit',
    }}>
      <style>{KEYFRAMES}</style>

      {showDescription && (
        <div style={{ marginBottom: 12, textAlign: 'center' }}>
          <DescriptionCrossfade featIdx={featIdx} />
        </div>
      )}

      <FeatureCrossfade featIdx={featIdx} focusIdx={focusIdx} />

      {showTabs && (
        <div style={{
          display: 'flex',
          background: 'rgba(13,11,26,.92)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(86,69,204,.2)',
          borderRadius: 14,
          overflow: 'hidden',
          marginTop: 16,
          maxWidth: 540, width: '100%',
        }}>
          {features.map((f, i) => {
            const isActive = i === featIdx;
            return (
              <button
                key={i}
                onClick={() => goToFeature(i)}
                style={{
                  flex: 1, padding: '12px 8px',
                  background: 'transparent', border: 'none',
                  borderRight: i < features.length - 1 ? '1px solid rgba(86,69,204,.12)' : 'none',
                  cursor: 'pointer',
                  display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
                  position: 'relative', overflow: 'hidden',
                  transition: 'background .2s',
                  color: isActive ? '#fff' : 'rgba(240,238,255,.45)',
                }}
              >
                {isActive && <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: '#f5d130' }} />}
                <span style={{ fontSize: 18 }}>{f.icon}</span>
                <span style={{ fontSize: 11, fontWeight: 600 }}>{f.tab}</span>
                {f.screens.length > 1 && (
                  <div style={{ display: 'flex', gap: 3, marginTop: 1 }}>
                    {f.screens.map((_, si) => (
                      <div key={si} style={{
                        width: si === focusIdx && isActive ? 10 : 4,
                        height: 3, borderRadius: 2,
                        background: si === focusIdx && isActive ? '#f5d130' : 'rgba(255,255,255,.2)',
                        transition: 'all .3s',
                      }} />
                    ))}
                  </div>
                )}
                {isActive && autoplay && (
                  <ProgressBar
                    key={progKey}
                    duration={FEATURE_DURATION}
                    active={true}
                    onComplete={() => {}}
                  />
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default PhoneSimulator;
