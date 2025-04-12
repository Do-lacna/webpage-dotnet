import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import {
  ShoppingCart,
  Search,
  RefreshCw,
  BarChart3,
  ShieldCheck,
  Tags,
} from 'lucide-react';

const Features = () => {
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
      { threshold: 0.1 },
    );

    const elements = document.querySelectorAll('.reveal-animation');
    elements.forEach((el) => observer.observe(el));

    return () => elements.forEach((el) => observer.unobserve(el));
  }, []);

  const features = [
    {
      icon: <Search className="w-8 h-8 text-brand-accent" />,
      title: t('features.searchCompare.title'),
      description: t('features.searchCompare.description'),
    },
    {
      icon: <ShoppingCart className="w-8 h-8 text-brand-accent" />,
      title: t('features.shoppingLists.title'),
      description: t('features.shoppingLists.description'),
    },
    {
      icon: <Tags className="w-8 h-8 text-brand-accent" />,
      title: t('features.dealAlerts.title'),
      description: t('features.dealAlerts.description'),
    },
    {
      icon: <RefreshCw className="w-8 h-8 text-brand-accent" />,
      title: t('features.realTimeUpdates.title'),
      description: t('features.realTimeUpdates.description'),
    },
    {
      icon: <BarChart3 className="w-8 h-8 text-brand-accent" />,
      title: t('features.priceHistory.title'),
      description: t('features.priceHistory.description'),
    },
    {
      icon: <ShieldCheck className="w-8 h-8 text-brand-accent" />,
      title: t('features.verifiedData.title'),
      description: t('features.verifiedData.description'),
    },
  ];

  return (
    <section id="features" className="py-20 bg-white">
      <div className="section-container">
        <div className="text-center max-w-3xl mx-auto mb-16 reveal-animation">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-brand-dark">
            {t('features.heading')}{' '}
            <span className="text-brand-accent">
              {t('features.headingAccent')}
            </span>
          </h2>
          <p className="text-lg text-muted-foreground">
            {t('features.subheading')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, i) => (
            <div
              key={i}
              className="glass-panel p-6 transition-all duration-300 hover:shadow-md hover:translate-y-[-5px] reveal-animation"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <div className="p-3 bg-brand-light rounded-xl inline-block mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold mb-2 text-brand-dark">
                {feature.title}
              </h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
