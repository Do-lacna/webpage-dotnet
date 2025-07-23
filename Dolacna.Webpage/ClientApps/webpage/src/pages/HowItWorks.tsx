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

  // Map images to step numbers - using public folder paths
  const stepImages = {
    1: '/images/howItWorks/undraw_groceries_4via.png',
    2: '/images/howItWorks/undraw_data-analysis_b7cp.png',
    3: '/images/howItWorks/undraw_discount_igfl.png',
    4: '/images/howItWorks/undraw_empty-cart_574u.png',
    5: '/images/howItWorks/undraw_savings_uwjn.png',
    // Add more mappings as needed
  };

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
        <section className="py-12 md:py-20 bg-white" id="how-it-works">
          <div className="section-container max-w-4xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-8 md:mb-12 reveal-animation">
              <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 px-2 leading-tight">
                {t('howItWorksPage.title')
                  .split(' ')
                  .map((word, i, arr) =>
                    i === arr.length - 2 ? (
                      <span key={i} className="text-brand-dark">
                        {word}{' '}
                      </span>
                    ) : i === arr.length - 1 ? (
                      <span key={i} className="text-brand-accent">
                        {word}
                      </span>
                    ) : (
                      <span key={i} className="text-brand-dark">
                        {word}{' '}
                      </span>
                    ),
                  )}
              </h2>
              <p className="text-base md:text-lg text-gray-600 mb-6 md:mb-8 px-4 max-w-3xl mx-auto leading-relaxed">
                {t('howItWorksPage.subtitle')}
              </p>
            </div>

            <div className="space-y-8">
              {steps.map((step, idx) => (
                <div key={step.number}>
                  <div
                    className={`glass-panel p-4 md:p-8 reveal-animation max-w-4xl ${
                      idx % 2 === 0 ? 'ml-0 mr-auto' : 'ml-auto mr-0'
                    }`}
                    style={{ animationDelay: `${idx * 0.1}s` }}
                  >
                    <div
                      className={`flex flex-col md:flex-row items-start gap-4 md:gap-8 ${
                        idx % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                      }`}
                    >
                      {/* Image section */}
                      <div className="flex-shrink-0 w-full md:w-80 h-48 md:h-60">
                        <img
                          src={stepImages[step.number]}
                          alt={`${step.title} - Step ${step.number}`}
                          className="w-full h-full object-cover rounded-lg bg-gray-100"
                          loading="lazy"
                          onError={(e) => {
                            e.currentTarget.style.display = 'none';
                          }}
                        />
                      </div>

                      {/* Content section */}
                      <div className="flex-1 flex flex-col">
                        <div className="flex items-center gap-4 mb-4">
                          <div className="w-12 h-12 bg-brand-accent text-white rounded-full flex items-center justify-center font-bold text-lg shadow-lg flex-shrink-0">
                            {step.number}
                          </div>
                          <h3
                            className={`text-xl md:text-2xl font-bold text-brand-dark text-left ${
                              idx % 2 === 0 ? 'md:text-left' : 'md:text-right'
                            }`}
                          >
                            {step.title}
                          </h3>
                        </div>

                        <p
                          className={`text-brand-accent font-medium mb-4 text-left ${
                            idx % 2 === 0 ? 'md:text-left' : 'md:text-right'
                          }`}
                        >
                          {step.subtitle}
                        </p>
                        <p
                          className={`text-muted-foreground mb-6 text-base md:text-lg text-left ${
                            idx % 2 === 0 ? 'md:text-left' : 'md:text-right'
                          }`}
                        >
                          {step.description}
                        </p>

                        <div
                          className={`flex justify-start ${
                            idx % 2 === 0
                              ? 'md:justify-start'
                              : 'md:justify-end'
                          }`}
                        >
                          <button
                            className="flex items-center gap-2 text-brand-accent hover:text-brand-accent/80 font-medium transition py-2 px-3 -ml-3 rounded-md hover:bg-gray-50 min-h-[44px]"
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
                          <div className="mt-6 p-4 md:p-6 bg-gray-50 rounded-lg animate-fade-in">
                            <ul className="space-y-3">
                              {step.details.map((detail, detailIdx) => (
                                <li
                                  key={`${step.number}-detail-${detailIdx}`}
                                  className={`flex items-start gap-3 flex-row ${
                                    idx % 2 === 0
                                      ? 'md:flex-row'
                                      : 'md:flex-row-reverse'
                                  }`}
                                >
                                  <span className="w-2 h-2 bg-brand-accent rounded-full mt-2 flex-shrink-0"></span>
                                  <span
                                    className={`text-muted-foreground text-left ${
                                      idx % 2 === 0
                                        ? 'md:text-left'
                                        : 'md:text-right'
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
                      className={`flex my-8 justify-center ${
                        idx % 2 === 0
                          ? 'md:justify-center md:pl-40'
                          : 'md:justify-center md:pr-40'
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
