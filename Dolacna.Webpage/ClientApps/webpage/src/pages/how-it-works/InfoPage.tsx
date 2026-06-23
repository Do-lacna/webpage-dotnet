import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';
import { cn } from '@/lib/utils';

export interface InfoSection {
  heading: string;
  body?: string;
  bullets?: string[];
}

export interface RelatedLink {
  to: string;
  labelKey: string;
  descriptionKey?: string;
}

interface InfoPageProps {
  /** i18n namespace that holds `title`, `subtitle` and `sections`. */
  namespace: string;
  /** Optional map of section index (0-based) to an image path in /public. */
  sectionImages?: Record<number, string>;
  /** Optional related links rendered at the bottom of the page. */
  related?: RelatedLink[];
  /** Anchor id for the wrapping section. */
  id?: string;
}

const InfoPage = ({ namespace, sectionImages, related, id }: InfoPageProps) => {
  const { t } = useTranslation();

  const sections = t(`${namespace}.sections`, {
    returnObjects: true,
  }) as InfoSection[];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px',
      },
    );

    const elements = document.querySelectorAll('.reveal-animation');
    elements.forEach((el) => observer.observe(el));

    return () => {
      elements.forEach((el) => observer.unobserve(el));
    };
  }, [namespace]);

  return (
    <section className="py-12 md:py-16" id={id ?? namespace}>
      <div className="text-center mb-8 md:mb-12 reveal-animation">
        <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 px-2 leading-tight text-brand-indigo">
          {t(`${namespace}.title`)}
        </h2>
        <p className="text-base md:text-lg text-gray-600 mb-6 md:mb-8 px-4 max-w-3xl mx-auto leading-relaxed">
          {t(`${namespace}.subtitle`)}
        </p>
      </div>

      <div className="space-y-8 max-w-4xl mx-auto">
        {Array.isArray(sections) &&
          sections.map((section, idx) => {
            const image = sectionImages?.[idx];
            return (
              <div
                key={`${namespace}-section-${idx}`}
                className="glass-panel p-6 md:p-8 reveal-animation"
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                <div
                  className={cn(
                    'flex flex-col gap-5 md:gap-8',
                    image &&
                      (idx % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'),
                  )}
                >
                  {image && (
                    <div className="flex-shrink-0 w-full md:w-72 h-44 md:h-56">
                      <img
                        src={image}
                        alt={section.heading}
                        className="w-full h-full object-contain rounded-lg bg-white"
                        loading="lazy"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                        }}
                      />
                    </div>
                  )}

                  <div className="flex-1 min-w-0">
                    <h3 className="text-xl md:text-2xl font-bold text-brand-indigo text-left mb-3">
                      {section.heading}
                    </h3>
                    {section.body && (
                      <p className="text-muted-foreground text-base md:text-lg text-left leading-relaxed">
                        {section.body}
                      </p>
                    )}
                    {Array.isArray(section.bullets) &&
                      section.bullets.length > 0 && (
                        <ul className="mt-4 space-y-3">
                          {section.bullets.map((bullet, bulletIdx) => (
                            <li
                              key={`${namespace}-section-${idx}-bullet-${bulletIdx}`}
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
                  </div>
                </div>
              </div>
            );
          })}
      </div>

      {Array.isArray(related) && related.length > 0 && (
        <div className="max-w-4xl mx-auto mt-10 md:mt-12 reveal-animation">
          <p className="text-sm font-medium text-gray-500 mb-3 text-left">
            {t('howItWorksPage.relatedTitle')}
          </p>
          <div className="grid gap-4 sm:grid-cols-2">
            {related.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className="glass-panel p-5 transition-colors hover:bg-white group"
              >
                <span className="flex items-center justify-between gap-3">
                  <span className="font-semibold text-brand-indigo group-hover:text-brand-primary transition-colors">
                    {t(link.labelKey)}
                  </span>
                  <span className="text-brand-primary transition-transform group-hover:translate-x-1">
                    →
                  </span>
                </span>
                {link.descriptionKey && (
                  <span className="mt-2 block text-sm text-muted-foreground text-left">
                    {t(link.descriptionKey)}
                  </span>
                )}
              </NavLink>
            ))}
          </div>
        </div>
      )}
    </section>
  );
};

export default InfoPage;
