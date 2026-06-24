import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface InfoSectionProps {
  heading: string;
  body?: string;
  bullets?: string[];
  /** Media rendered next to the text (e.g. <ScreenshotMedia /> or <CardsMedia />). */
  media?: ReactNode;
  /** Place the media on the right (used for alternating layout). */
  reverse?: boolean;
  /** Vertically center the media against the text (good for tall screenshots). */
  centerMedia?: boolean;
  /** Stagger index for the reveal animation delay. */
  index?: number;
  /** Extra content appended below the text (e.g. <RelatedTopics />). */
  children?: ReactNode;
}

/**
 * A single how-it-works content card: optional media beside a column with a
 * heading, body and bullet list. Layout-only — callers decide which media to
 * pass in.
 */
const InfoSection = ({
  heading,
  body,
  bullets,
  media,
  reverse,
  centerMedia,
  index = 0,
  children,
}: InfoSectionProps) => (
  <div
    className="glass-panel p-6 md:p-8 reveal-animation"
    style={{ animationDelay: `${index * 0.1}s` }}
  >
    <div
      className={cn(
        'flex flex-col gap-5 md:gap-8',
        media && (reverse ? 'md:flex-row-reverse' : 'md:flex-row'),
        centerMedia && 'md:items-center',
      )}
    >
      {media}

      <div className="flex-1 min-w-0">
        <h3 className="text-xl md:text-2xl font-bold text-brand-indigo text-left mb-3">
          {heading}
        </h3>
        {body && (
          <p className="text-muted-foreground text-base md:text-lg text-left leading-relaxed">
            {body}
          </p>
        )}
        {Array.isArray(bullets) && bullets.length > 0 && (
          <ul className="mt-4 space-y-3">
            {bullets.map((bullet, bulletIdx) => (
              <li
                key={`${heading}-bullet-${bulletIdx}`}
                className="flex items-start gap-3"
              >
                <span className="w-2 h-2 bg-brand-primary rounded-full mt-2 flex-shrink-0"></span>
                <span className="text-muted-foreground text-left">
                  {bullet}
                </span>
              </li>
            ))}
          </ul>
        )}
        {children}
      </div>
    </div>
  </div>
);

export default InfoSection;
