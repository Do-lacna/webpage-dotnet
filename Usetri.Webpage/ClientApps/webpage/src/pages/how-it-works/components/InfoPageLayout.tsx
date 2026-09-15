import type { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { useRevealAnimation } from '@/hooks/use-reveal-animation';

interface InfoPageLayoutProps {
  /** i18n namespace that holds `title` and `subtitle`. */
  namespace: string;
  /** The page sections and any extra content. */
  children: ReactNode;
}

/**
 * Shared chrome for a how-it-works detail page: the centered title/subtitle
 * header, scroll-reveal animations and the section container. Each page
 * composes its own sections as children.
 */
const InfoPageLayout = ({ namespace, children }: InfoPageLayoutProps) => {
  const { t } = useTranslation();
  useRevealAnimation();

  return (
    <section className="py-12 md:py-16" id={namespace}>
      <div className="text-center mb-8 md:mb-12 reveal-animation">
        <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 px-2 leading-tight text-brand-indigo">
          {t(`${namespace}.title`)}
        </h2>
        <p className="text-base md:text-lg text-gray-600 mb-6 md:mb-8 px-4 max-w-3xl mx-auto leading-relaxed">
          {t(`${namespace}.subtitle`)}
        </p>
      </div>

      <div className="space-y-8 max-w-4xl mx-auto">{children}</div>
    </section>
  );
};

export default InfoPageLayout;
