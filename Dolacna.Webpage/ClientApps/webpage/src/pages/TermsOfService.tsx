import React, { useEffect } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { useTranslation } from 'react-i18next';

const TermsOfService = () => {
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

  const sections =
    (t('termsOfService.sections', { returnObjects: true }) as Array<{
      title: string;
      content: string;
    }>) || [];

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <section className="py-20 bg-white" id="terms-of-service">
          <div className="section-container max-w-4xl mx-auto px-4">
            <div className="text-center mb-16 reveal-animation">
              <h2 className="text-3xl md:text-4xl font-bold text-brand-dark mb-4">
                {t('termsOfService.pageTitle')}
              </h2>
              <p className="text-lg text-muted-foreground">
                {t('termsOfService.pageSubtitle')}
              </p>
            </div>

            <div className="space-y-10">
              {sections.map((section, index) => (
                <div
                  key={index}
                  className="glass-panel p-6 reveal-animation"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <h3 className="text-xl font-bold mb-2 text-brand-dark">
                    {section.title}
                  </h3>
                  <p className="text-muted-foreground whitespace-pre-line">
                    {section.content}
                  </p>
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



export default TermsOfService;
