import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Check, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

const PremiumSection = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
          }
        });
      },
      { threshold: 0.1 },
    );

    const elements = document.querySelectorAll('.reveal-animation');
    elements.forEach((el) => observer.observe(el));

    return () => elements.forEach((el) => observer.unobserve(el));
  }, []);

  const plans = [
    {
      name: t('premium.plans.premium.name'),
      price: '€2.99',
      period: t('premium.plans.premium.period'),
      description: t('premium.plans.premium.description'),
      features: [
        { name: t('premium.features.unlimitedSearch'), included: true },
        { name: t('premium.features.extendedPriceHistory'), included: true },
        { name: t('premium.features.smartShoppingList'), included: true },
        { name: t('premium.features.discountNotifications'), included: true },
        { name: t('premium.features.prioritySupport'), included: true },
      ],
      cta: t('premium.plans.premium.cta'),
      highlighted: true,
    },
  ];

  return (
    <section id="premium" className="py-20 bg-brand-light">
      <div className="section-container">
        <div className="text-center max-w-3xl mx-auto mb-16 reveal-animation">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-brand-dark">
            {t('premium.heading')}{' '}
            <span className="text-brand-accent">
              {t('premium.headingAccent')}
            </span>
          </h2>
          <p className="text-lg text-muted-foreground">
            {t('premium.subheading')}
          </p>
        </div>

        <div className="flex justify-center max-w-lg mx-auto">
          {plans.map((plan, i) => (
            <div
              key={plan.name}
              className={`relative rounded-2xl overflow-hidden transition-all duration-500 reveal-animation w-full ${
                plan.highlighted
                  ? 'bg-brand-dark text-white border-2 border-brand-accent shadow-lg'
                  : 'bg-white border border-border'
              }`}
              style={{ animationDelay: `${i * 0.2}s` }}
            >
              {plan.highlighted && (
                <div className="pricing-badge mt-7">
                  {t('premium.recommended')}
                </div>
              )}
              <div className="p-8">
                <h3
                  className={`text-2xl font-bold mb-2 ${
                    plan.highlighted ? 'text-brand-accent' : 'text-brand-dark'
                  }`}
                >
                  {plan.name}
                </h3>
                <div className="flex items-end mb-4">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  {plan.period && (
                    <span
                      className={`ml-1 pb-1 ${
                        plan.highlighted
                          ? 'text-white/80'
                          : 'text-muted-foreground'
                      }`}
                    >
                      {plan.period}
                    </span>
                  )}
                </div>
                <p
                  className={`mb-6 ${
                    plan.highlighted ? 'text-white/80' : 'text-muted-foreground'
                  }`}
                >
                  {plan.description}
                </p>

                <div className="space-y-4 mb-8">
                  {plan.features.map((feature, j) => {
                    let textColor = 'text-muted-foreground';
                    if (feature.included) {
                      textColor = plan.highlighted
                        ? 'text-white'
                        : 'text-foreground';
                    }

                    return (
                      <div
                        key={`${plan.name}-${feature.name}`}
                        className="flex items-start"
                      >
                        {feature.included ? (
                          <Check className="w-5 h-5 text-brand-accent mt-0.5 flex-shrink-0" />
                        ) : (
                          <X className="w-5 h-5 text-muted-foreground mt-0.5 flex-shrink-0" />
                        )}
                        <span className={`ml-3 ${textColor}`}>
                          {feature.name}
                        </span>
                      </div>
                    );
                  })}
                </div>

                <Button
                  className={`w-full py-6 ${
                    plan.highlighted
                      ? 'bg-brand-accent text-brand-dark hover:bg-white hover:text-brand-dark button-hover-effect'
                      : 'border border-brand-dark text-white hover:bg-brand-dark hover:text-brand-accent'
                  }`}
                  onClick={() => {
                    navigate('/Premium');
                  }}
                >
                  {plan.cta}
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center text-muted-foreground reveal-animation">
          <p>{t('premium.trialNote')}</p>
        </div>
      </div>
    </section>
  );
};

export default PremiumSection;
