import React, { useEffect, useState } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { useTranslation } from 'react-i18next';

const HowItWorks = () => {
  const { t } = useTranslation();
  const [openStep, setOpenStep] = useState<number | null>(null);

  const steps = t('howItWorksPage.steps', { returnObjects: true }) as Array<{
    number: number;
    title: string;
    subtitle: string;
    description: string;
    details: string[];
  }>;

  useEffect(() => {
    // Reveal animation logic
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

  const handleToggle = (stepNumber: number) => {
    setOpenStep(openStep === stepNumber ? null : stepNumber);
  };

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <section className="py-20 bg-white" id="how-it-works">
          <div className="section-container max-w-4xl mx-auto px-4">
            <div className="text-center mb-12 reveal-animation">
              <h2 className="text-3xl md:text-4xl font-bold text-brand-dark mb-4">
                {t('howItWorksPage.title')
                  .split(' ')
                  .map((word, i, arr) =>
                    i === arr.length - 2 ? (
                      <span key={i}>{word} </span>
                    ) : i === arr.length - 1 ? (
                      <span key={i} className="text-brand-accent">
                        {word}
                      </span>
                    ) : (
                      <span key={i}>{word} </span>
                    ),
                  )}
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                {t('howItWorksPage.subtitle')}
              </p>
            </div>

            <div className="space-y-8">
              {steps.map((step, idx) => (
                <div key={step.number}>
                  <div
                    className={`glass-panel p-8 reveal-animation max-w-2xl ${
                      idx % 2 === 0 ? 'ml-0 mr-auto' : 'ml-auto mr-0'
                    }`}
                    style={{ animationDelay: `${idx * 0.1}s` }}
                  >
                    <div
                      className={`flex items-start gap-6 ${
                        idx % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
                      }`}
                    >
                      <div className="flex-shrink-0 relative z-10">
                        <div className="w-12 h-12 bg-brand-accent text-white rounded-full flex items-center justify-center font-bold text-lg shadow-lg">
                          {step.number}
                        </div>
                      </div>
                      <div className="flex-1">
                        <h3
                          className={`text-2xl font-bold text-brand-dark mb-2 ${
                            idx % 2 === 0 ? 'text-left' : 'text-right'
                          }`}
                        >
                          {step.title}
                        </h3>
                        <p
                          className={`text-brand-accent font-medium mb-4 ${
                            idx % 2 === 0 ? 'text-left' : 'text-right'
                          }`}
                        >
                          {step.subtitle}
                        </p>
                        <p
                          className={`text-muted-foreground mb-6 text-lg ${
                            idx % 2 === 0 ? 'text-left' : 'text-right'
                          }`}
                        >
                          {step.description}
                        </p>

                        <div
                          className={`flex ${
                            idx % 2 === 0 ? 'justify-start' : 'justify-end'
                          }`}
                        >
                          <button
                            className="flex items-center gap-2 text-brand-accent hover:text-brand-accent/80 font-medium transition"
                            onClick={() => handleToggle(step.number)}
                            aria-expanded={openStep === step.number}
                          >
                            <span>Learn more details</span>
                            <span className="transform transition-transform duration-200">
                              {openStep === step.number ? '−' : '+'}
                            </span>
                          </button>
                        </div>

                        {openStep === step.number && (
                          <div className="mt-6 p-6 bg-gray-50 rounded-lg animate-fade-in">
                            <ul className="space-y-3">
                              {step.details.map((detail, detailIdx) => (
                                <li
                                  key={detailIdx}
                                  className={`flex items-start gap-3 ${
                                    idx % 2 === 0
                                      ? 'flex-row'
                                      : 'flex-row-reverse'
                                  }`}
                                >
                                  <span className="w-2 h-2 bg-brand-accent rounded-full mt-2 flex-shrink-0"></span>
                                  <span
                                    className={`text-muted-foreground ${
                                      idx % 2 === 0 ? 'text-left' : 'text-right'
                                    }`}
                                  >
                                    {detail}
                                  </span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Vertical arrow between cards - positioned on alternating sides */}
                  {idx < steps.length - 1 && (
                    <div
                      className={`flex my-8 ${
                        idx % 2 === 0
                          ? 'justify-center pl-40'
                          : 'justify-center pr-40'
                      }`}
                    >
                      <svg
                        width="40"
                        height="60"
                        viewBox="0 0 40 60"
                        className="text-brand-accent/70"
                      >
                        {/* Vertical line */}
                        <line
                          x1="20"
                          y1="10"
                          x2="20"
                          y2="40"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                        />
                        {/* Arrow head */}
                        <polygon
                          points="20,50 15,40 25,40"
                          fill="currentColor"
                        />
                      </svg>
                    </div>
                  )}
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
