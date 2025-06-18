import React, { useEffect, useState, useRef } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { useTranslation } from 'react-i18next';

const HowItWorks = () => {
  const { t } = useTranslation();
  const [openStep, setOpenStep] = useState<{ [key: string]: number | null }>({});
  const [search, setSearch] = useState('');
  const [activeSection, setActiveSection] = useState<string>('search');

  // Refs for scrolling to sections
  const sectionRefs = {
    search: useRef<HTMLDivElement>(null),
    shoppingList: useRef<HTMLDivElement>(null),
    profile: useRef<HTMLDivElement>(null),
  };

  // Get features from translations
  const features = [
    {
      key: 'search',
      name: t('howItWorksPage.features.search.name'),
      description: t('howItWorksPage.features.search.description'),
      tutorials: t('howItWorksPage.features.search.tutorials', { returnObjects: true }) as Array<{ title: string; content: string }>,
    },
    {
      key: 'shoppingList',
      name: t('howItWorksPage.features.shoppingList.name'),
      description: t('howItWorksPage.features.shoppingList.description'),
      tutorials: t('howItWorksPage.features.shoppingList.tutorials', { returnObjects: true }) as Array<{ title: string; content: string }>,
    },
    {
      key: 'profile',
      name: t('howItWorksPage.features.profile.name'),
      description: t('howItWorksPage.features.profile.description'),
      tutorials: t('howItWorksPage.features.profile.tutorials', { returnObjects: true }) as Array<{ title: string; content: string }>,
    },
  ];

  useEffect(() => {
    // Reveal animation logic (same as Cookies page)
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
      if (elements) {
        elements.forEach((el) => observer.unobserve(el));
      }
    };
  }, []);

  // Scroll to section when search result is clicked
  const handleSectionClick = (key: string) => {
    setActiveSection(key);
    const ref = sectionRefs[key as keyof typeof sectionRefs];
    if (ref && ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleToggle = (featureKey: string, idx: number) => {
    setOpenStep((prev) => ({
      ...prev,
      [featureKey]: prev[featureKey] === idx ? null : idx,
    }));
  };

  // Filter features and tutorials by search
  const filteredFeatures = search.trim() === ''
    ? features
    : features
        .map((feature) => {
          // Filter tutorials by search
          const filteredTutorials = feature.tutorials.filter(
            (tut) =>
              tut.title.toLowerCase().includes(search.toLowerCase()) ||
              tut.content.toLowerCase().includes(search.toLowerCase())
          );
          // If feature name/desc matches, show all tutorials, else only filtered
          const featureMatches =
            feature.name.toLowerCase().includes(search.toLowerCase()) ||
            feature.description.toLowerCase().includes(search.toLowerCase());
          return featureMatches || filteredTutorials.length > 0
            ? {
                ...feature,
                tutorials: featureMatches ? feature.tutorials : filteredTutorials,
              }
            : null;
        })
        .filter(Boolean);

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <section className="py-20 bg-white" id="how-it-works">
          <div className="section-container max-w-3xl mx-auto px-4">
            <div className="text-center mb-8 reveal-animation">
              <h2 className="text-3xl md:text-4xl font-bold text-brand-dark mb-4">
                {t('howItWorksPage.title').split(' ').map((word, i, arr) =>
                  i === arr.length - 2
                    ? <span key={i}>{word} </span>
                    : i === arr.length - 1
                      ? <span key={i} className="text-brand-accent">{word}</span>
                      : <span key={i}>{word} </span>
                )}
              </h2>
              <p className="text-lg text-muted-foreground mb-6">
                {t('howItWorksPage.subtitle')}
              </p>
              <div className="flex justify-center">
                <input
                  type="text"
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  placeholder={t('howItWorksPage.searchPlaceholder') || 'Search tutorials or features...'}
                  className="w-full max-w-md px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-brand-accent transition"
                />
              </div>
            </div>

            <div className="space-y-10">
              {filteredFeatures.length === 0 && (
                <div className="text-center text-muted-foreground">{t('howItWorksPage.noResults') || 'No results found.'}</div>
              )}
              {filteredFeatures.map((feature, fIdx) => (
                <div
                  key={feature.key}
                  ref={sectionRefs[feature.key as keyof typeof sectionRefs]}
                  className="glass-panel p-6 reveal-animation scroll-mt-32"
                  style={{ animationDelay: `${fIdx * 0.1}s` }}
                  id={feature.key}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <button
                      className="text-brand-accent underline text-lg font-bold focus:outline-none"
                      onClick={() => handleSectionClick(feature.key)}
                      tabIndex={-1}
                      aria-label={feature.name}
                    >
                      {feature.name}
                    </button>
                  </div>
                  <p className="text-muted-foreground mb-4">{feature.description}</p>
                  <div className="space-y-4">
                    {feature.tutorials.map((step, sIdx) => (
                      <div key={step.title} className="border rounded-lg">
                        <button
                          className="w-full flex justify-between items-center px-4 py-3 text-left font-medium text-brand-dark hover:bg-brand-accent/10 transition"
                          onClick={() => handleToggle(feature.key, sIdx)}
                          aria-expanded={openStep[feature.key] === sIdx}
                        >
                          <span>{step.title}</span>
                          <span className="ml-2">
                            {openStep[feature.key] === sIdx ? '−' : '+'}
                          </span>
                        </button>
                        {openStep[feature.key] === sIdx && (
                          <div className="px-4 pb-4 text-muted-foreground whitespace-pre-line animate-fade-in">
                            {step.content}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default HowItWorks;