import React, { useEffect } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { useTranslation } from 'react-i18next';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const Faq = () => {
  const { t } = useTranslation();

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

    // Observe all elements with the reveal-animation class
    const elements = document.querySelectorAll('.reveal-animation');
    elements.forEach((el) => observer.observe(el));

    return () => {
      if (elements) {
        elements.forEach((el) => observer.unobserve(el));
      }
      observer.disconnect();
    };
  }, []);

  const faqCategories = [
    {
      title: t('faq.general.title'),
      questions: [
        {
          question: t('faq.general.q1.question'),
          answer: t('faq.general.q1.answer'),
        },
        {
          question: t('faq.general.q2.question'),
          answer: t('faq.general.q2.answer'),
        },
        {
          question: t('faq.general.q3.question'),
          answer: t('faq.general.q3.answer'),
        },
        {
          question: t('faq.general.q4.question'),
          answer: t('faq.general.q4.answer'),
        },
      ],
    },
    {
      title: t('faq.app.title'),
      questions: [
        {
          question: t('faq.app.q1.question'),
          answer: t('faq.app.q1.answer'),
        },
        {
          question: t('faq.app.q2.question'),
          answer: t('faq.app.q2.answer'),
        },
        {
          question: t('faq.app.q3.question'),
          answer: t('faq.app.q3.answer'),
        },
        {
          question: t('faq.app.q4.question'),
          answer: t('faq.app.q4.answer'),
        },
      ],
    },
    {
      title: t('faq.pricing.title'),
      questions: [
        {
          question: t('faq.pricing.q1.question'),
          answer: t('faq.pricing.q1.answer'),
        },
        {
          question: t('faq.pricing.q2.question'),
          answer: t('faq.pricing.q2.answer'),
        },
        {
          question: t('faq.pricing.q3.question'),
          answer: t('faq.pricing.q3.answer'),
        },
      ],
    },
    {
      title: t('faq.technical.title'),
      questions: [
        {
          question: t('faq.technical.q1.question'),
          answer: t('faq.technical.q1.answer'),
        },
        {
          question: t('faq.technical.q2.question'),
          answer: t('faq.technical.q2.answer'),
        },
        {
          question: t('faq.technical.q3.question'),
          answer: t('faq.technical.q3.answer'),
        },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-brand-background via-slate-50 to-brand-background">
      <Header />

      {/* Hero Section */}
      <section className="pt-20 pb-12 bg-gradient-to-br from-brand-primary/5 via-brand-accent/5 to-transparent">
        <div className="container mx-auto px-4">
          <div className="text-center reveal-animation opacity-0 translate-y-8 transition-all duration-700">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              <span className="text-brand-dark">
                {t('faq.title').split(' ')[0]}{' '}
              </span>
              <span className="text-brand-accent">
                {t('faq.title').split(' ').slice(1).join(' ')}
              </span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              {t('faq.subtitle')}
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          {faqCategories.map((category, categoryIndex) => (
            <div
              key={categoryIndex}
              className="reveal-animation opacity-0 translate-y-8 transition-all duration-700 mb-12"
              style={{ transitionDelay: `${categoryIndex * 200}ms` }}
            >
              <h2 className="text-2xl md:text-3xl font-bold text-brand-text mb-6 border-b border-brand-primary/20 pb-3">
                {category.title}
              </h2>

              <Accordion type="single" collapsible className="space-y-4">
                {category.questions.map((faq, questionIndex) => (
                  <AccordionItem
                    key={questionIndex}
                    value={`${categoryIndex}-${questionIndex}`}
                    className="border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 bg-white"
                  >
                    <AccordionTrigger className="px-6 py-4 text-left hover:no-underline hover:bg-gray-50/50 transition-colors duration-200">
                      <span className="text-lg font-medium text-brand-text pr-4">
                        {faq.question}
                      </span>
                    </AccordionTrigger>
                    <AccordionContent className="px-6 pb-4 pt-2">
                      <div
                        className="text-brand-text/80 leading-relaxed"
                        dangerouslySetInnerHTML={{ __html: faq.answer }}
                      />
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          ))}

          {/* Contact Section */}
          <div className="reveal-animation opacity-0 translate-y-8 transition-all duration-700 mt-16 text-center bg-gradient-to-r from-brand-primary/5 to-brand-accent/5 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-brand-text mb-4">
              {t('faq.contactTitle')}
            </h3>
            <p className="text-brand-text/80 mb-6 max-w-2xl mx-auto">
              {t('faq.contactDescription')}
            </p>
            <a
              href="/Contact"
              className="inline-flex items-center justify-center px-8 py-3 text-lg font-semibold text-white bg-gradient-to-r from-brand-primary to-brand-accent rounded-full hover:shadow-lg hover:scale-105 transition-all duration-300"
            >
              {t('faq.contactButton')}
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Faq;
