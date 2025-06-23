import React, { useEffect } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { useTranslation } from 'react-i18next';

const PrivacyPolicy = () => {
  const { t } = useTranslation();

  useEffect(() => {
    // Initialize intersection observer for reveal animations
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

    // Observe all elements with the reveal-animation class
    const elements = document.querySelectorAll('.reveal-animation');
    elements.forEach((el) => observer.observe(el));

    return () => {
      if (elements) {
        elements.forEach((el) => observer.unobserve(el));
      }
    };
  }, []);

  const privacySections =
    (t('privacyPolicy.sections', { returnObjects: true }) as Array<{
      title: string;
      content: string;
    }>) || [];

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <section className="py-20 bg-white" id="privacy-policy">
          <div className="section-container max-w-4xl mx-auto px-4">
            <div className="text-center mb-16 reveal-animation">
              {(() => {
                const titleWords = t('privacyPolicy.pageTitle').split(' ');
                if (titleWords.length === 3) {
                  return (
                    <h2 className="text-3xl md:text-4xl font-bold text-brand-dark mb-4">
                      {titleWords[0]}{' '}
                      <span className="text-brand-accent">{titleWords[1]}</span>{' '}
                      {titleWords[2]}
                    </h2>
                  );
                }
                return (
                  <h2 className="text-3xl md:text-4xl font-bold text-brand-dark mb-4">
                    {titleWords[0]}{' '}
                    <span className="text-brand-accent">{titleWords[1]}</span>
                  </h2>
                );
              })()}
              <p className="text-lg text-muted-foreground">
                {t('privacyPolicy.pageSubtitle')}
              </p>
            </div>

            <div className="space-y-10">
              {privacySections.map((section, index) => (
                <div
                  key={index}
                  className="glass-panel p-6 reveal-animation"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <h3 className="text-xl font-bold mb-2 text-brand-dark">
                    {section.title}
                  </h3>
                  <p className="text-muted-foreground">{section.content}</p>
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

export default PrivacyPolicy;
