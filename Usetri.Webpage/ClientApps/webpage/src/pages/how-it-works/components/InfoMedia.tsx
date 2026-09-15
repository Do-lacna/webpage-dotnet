import { Fragment, type ReactNode } from 'react';
import { cn } from '@/lib/utils';

const hideOnError = (e: React.SyntheticEvent<HTMLImageElement>) => {
  e.currentTarget.style.display = 'none';
};

/** Small purple "vs." badge used between comparison cards. */
export const VsBadge = () => (
  <span className="flex items-center justify-center w-12 h-12 rounded-full bg-brand-primary text-white font-bold italic shadow-md ring-4 ring-white">
    vs.
  </span>
);

interface ScreenshotMediaProps {
  /** One or more tall, portrait app screenshots. */
  srcs: string[];
  alt: string;
}

/** Tall, portrait phone screenshots with the theme border. */
export const ScreenshotMedia = ({ srcs, alt }: ScreenshotMediaProps) => {
  const multi = srcs.length > 1;
  return (
    <div className="flex-shrink-0 flex flex-wrap justify-center gap-4">
      {srcs.map((src) => (
        <img
          key={src}
          src={src}
          alt={alt}
          loading="lazy"
          className={cn(
            'w-auto object-contain rounded-4xl border-2 border-brand-primary',
            multi
              ? 'h-[24rem] sm:h-[28rem] md:h-[32rem]'
              : 'h-[29rem] sm:h-[34rem] md:h-[38rem]',
          )}
          onError={hideOnError}
        />
      ))}
    </div>
  );
};

interface CardsMediaProps {
  /** Landscape comparison cards, stacked vertically. */
  srcs: string[];
  alt: string;
  /** Element rendered between cards. Defaults to <VsBadge />. */
  separator?: ReactNode;
}

/** Stacked landscape comparison cards with a separator between them. */
export const CardsMedia = ({ srcs, alt, separator }: CardsMediaProps) => (
  <div className="flex-shrink-0 flex flex-col items-center gap-3 w-full sm:w-80 md:w-96">
    {srcs.map((src, i) => (
      <Fragment key={src}>
        {i > 0 && (separator ?? <VsBadge />)}
        <img
          src={src}
          alt={alt}
          loading="lazy"
          className="w-full h-auto object-contain rounded-2xl border-2 border-brand-primary"
          onError={hideOnError}
        />
      </Fragment>
    ))}
  </div>
);

interface IllustrationMediaProps {
  src: string;
  alt: string;
}

/** Small landscape illustration (e.g. undraw / custom SVG). */
export const IllustrationMedia = ({ src, alt }: IllustrationMediaProps) => (
  <div className="flex-shrink-0 w-full md:w-72 h-44 md:h-56">
    <img
      src={src}
      alt={alt}
      loading="lazy"
      className="w-full h-full object-contain rounded-lg bg-white"
      onError={hideOnError}
    />
  </div>
);
