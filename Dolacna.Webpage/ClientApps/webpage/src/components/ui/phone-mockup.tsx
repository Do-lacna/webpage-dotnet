/**
 * phone-mockup.tsx
 *
 * Pure-CSS iPhone frame: rounded case with side buttons, dynamic island and
 * home indicator. Children are rendered inside the screen area (absolutely
 * positioned, so screenshots should use `absolute inset-0 object-cover`).
 *
 * No blurs, filters or 3D transforms — cheap to paint on low-end devices.
 */

import { cn } from '@/lib/utils';
import type { CSSProperties, ReactNode } from 'react';

export type PhoneMockupSize = 'sm' | 'md' | 'lg';

/** Exported so surrounding layout (e.g. a carousel track) can match the frame width. */
export const PHONE_MOCKUP_WIDTHS: Record<PhoneMockupSize, string> = {
  sm: 'min(220px, 62vw)',
  md: 'min(260px, 68vw)',
  lg: 'min(300px, 72vw)',
};

const SCREEN_ASPECT_RATIO = '252 / 540';

type PhoneMockupProps = {
  children?: ReactNode;
  size?: PhoneMockupSize;
  /** Overrides `size` with any CSS length, e.g. `'clamp(200px, 30vw, 320px)'`. */
  width?: string;
  className?: string;
  /** Wrapper around the screen content, useful for a background behind children. */
  screenClassName?: string;
};

export function PhoneMockup({
  children,
  size = 'md',
  width,
  className,
  screenClassName,
}: PhoneMockupProps) {
  return (
    <div
      className={cn(
        'relative w-[var(--phone-w)] flex justify-center',
        className,
      )}
      style={
        {
          '--phone-w': width ?? PHONE_MOCKUP_WIDTHS[size],
          filter: 'drop-shadow(0 16px 26px rgba(15, 12, 23, 0.38))',
        } as CSSProperties
      }
    >
      {/* Buttons protrude from the case but stay inside --phone-w, so the whole
          mockup survives being clipped (e.g. inside a carousel). */}
      <div className="absolute left-0 top-[16%] w-[3px] h-[3.5%] rounded-l-sm bg-gradient-to-r from-[#514a6b] to-[#252032]" />
      <div className="absolute left-0 top-[24%] w-[3px] h-[6.5%] rounded-l-sm bg-gradient-to-r from-[#514a6b] to-[#252032]" />
      <div className="absolute left-0 top-[33%] w-[3px] h-[6.5%] rounded-l-sm bg-gradient-to-r from-[#514a6b] to-[#252032]" />
      <div className="absolute right-0 top-[22%] w-[3px] h-[11%] rounded-r-sm bg-gradient-to-l from-[#514a6b] to-[#252032]" />

      <div
        className={cn(
          'relative overflow-hidden bg-[#0d0b1a] border-[3px] border-[#413b57]',
          screenClassName,
        )}
        style={{
          width: 'calc(var(--phone-w) - 6px)',
          aspectRatio: SCREEN_ASPECT_RATIO,
          borderRadius: 'calc((var(--phone-w) - 6px) * 0.18)',
          boxShadow:
            'inset 0 0 0 2px rgba(255,255,255,.05), 0 0 0 1px rgba(255,255,255,0.04)',
        }}
      >
        {children}

        {/* Dynamic island — pill near the top edge, camera lens on the right */}
        <div className="absolute top-[2.2%] left-1/2 -translate-x-1/2 w-[30%] h-[3.6%] bg-black rounded-full z-20 flex items-center justify-end pr-[8%]">
          <div className="w-[20%] aspect-square rounded-full bg-[#0a0a0a] ring-1 ring-white/10" />
        </div>

        <div className="absolute bottom-[1.8%] left-1/2 -translate-x-1/2 w-[38%] h-[3px] bg-white/25 rounded-full z-20" />
      </div>
    </div>
  );
}

export default PhoneMockup;
