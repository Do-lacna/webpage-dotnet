import { useRevealAnimation } from '@/hooks/use-reveal-animation';
import {
    BarChart3,
    RefreshCw,
    Search,
    ShieldCheck,
    ShoppingCart,
    Tags,
} from 'lucide-react';
import { useTranslation } from 'react-i18next';

const Features = () => {
  const { t } = useTranslation();
  useRevealAnimation();

  const features = [
    {
      icon: <Search className="w-8 h-8 text-brand-primary" />,
      title: t('features.searchCompare.title'),
      description: t('features.searchCompare.description'),
    },
    {
      icon: <ShoppingCart className="w-8 h-8 text-brand-primary" />,
      title: t('features.shoppingLists.title'),
      description: t('features.shoppingLists.description'),
    },
    {
      icon: <Tags className="w-8 h-8 text-brand-primary" />,
      title: t('features.dealAlerts.title'),
      description: t('features.dealAlerts.description'),
    },
    {
      icon: <RefreshCw className="w-8 h-8 text-brand-primary" />,
      title: t('features.realTimeUpdates.title'),
      description: t('features.realTimeUpdates.description'),
    },
    {
      icon: <BarChart3 className="w-8 h-8 text-brand-primary" />,
      title: t('features.priceHistory.title'),
      description: t('features.priceHistory.description'),
    },
    {
      icon: <ShieldCheck className="w-8 h-8 text-brand-primary" />,
      title: t('features.verifiedData.title'),
      description: t('features.verifiedData.description'),
    },
  ];

  return (
    <section id="features" className="py-20 bg-white">
      <div className="section-container">
        <div className="text-center max-w-3xl mx-auto mb-16 reveal-animation" data-anim="up">
          <div className="inline-block px-3 py-1 rounded-full bg-brand-lilac/30 text-brand-primary font-medium text-sm mb-4">
            {t('features_header')}
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-brand-indigo">
            {t('features.heading')}{' '}
            <span className="text-brand-primary">
              {t('features.headingAccent')}
            </span>
          </h2>
          <p className="text-lg text-muted-foreground">
            {t('features.subheading')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <div
              key={i}
              className="bg-brand-nude rounded-2xl p-6 transition-all duration-300 hover:shadow-[0_8px_32px_rgba(86,69,204,0.12)] hover:-translate-y-1 reveal-animation border border-brand-lilac/20"
              style={{ animationDelay: `${i * 0.1}s` }}
              data-anim="scale"
            >
              <div className="p-3 bg-brand-lilac/25 rounded-xl inline-block mb-4">
                {feature.icon}
              </div>
              <h3 className="text-lg font-bold mb-2 text-brand-indigo">
                {feature.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
