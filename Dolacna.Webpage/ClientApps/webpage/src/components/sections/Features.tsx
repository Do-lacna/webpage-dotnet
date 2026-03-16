import { useRevealAnimation } from '@/hooks/use-reveal-animation';
import {
  BarChart3,
  ChefHat,
  PiggyBank,
  Search,
  ShoppingCart,
  Tags,
} from 'lucide-react';
import { useTranslation } from 'react-i18next';

const Features = () => {
  const { t } = useTranslation();
  useRevealAnimation();

  const features = [
    {
      icon: <Search className="w-8 h-8 text-brand-secondary" />,
      title: t('features.searchCompare.title'),
      description: t('features.searchCompare.description'),
    },
    {
      icon: <ShoppingCart className="w-8 h-8 text-brand-secondary" />,
      title: t('features.shoppingLists.title'),
      description: t('features.shoppingLists.description'),
    },
    {
      icon: <Tags className="w-8 h-8 text-brand-secondary" />,
      title: t('features.dealAlerts.title'),
      description: t('features.dealAlerts.description'),
    },
    {
      icon: <PiggyBank className="w-8 h-8 text-brand-secondary" />,
      title: t('features.savingsTracking.title'),
      description: t('features.savingsTracking.description'),
    },
    {
      icon: <BarChart3 className="w-8 h-8 text-brand-secondary" />,
      title: t('features.priceHistory.title'),
      description: t('features.priceHistory.description'),
    },
    {
      icon: <ChefHat className="w-8 h-8 text-brand-secondary" />,
      title: t('features.discountRecipes.title'),
      description: t('features.discountRecipes.description'),
      badge: t('features.discountRecipes.badge'),
    },
  ];

  return (
    <section id="features" className="py-12 bg-brand-primary-dark relative overflow-hidden">
      {/* Pattern background */}
      <div
        className="absolute inset-0 opacity-[0.08] pointer-events-none z-[1]"
        style={{ backgroundImage: 'url(/images/graphicMotives/pattern.png)', backgroundRepeat: 'repeat', backgroundSize: '300px' }}
      />

      <div className="section-container relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20 mb-16">
          {/* Section heading */}
          <div className="text-center lg:text-left max-w-2xl reveal-animation" data-anim="left">
          <div className="inline-block px-3 py-1 rounded-full bg-brand-secondary/15 border border-brand-secondary/30 text-brand-secondary font-medium text-sm mb-4">
              {t('features_header')}
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
              {t('features.heading')}{' '}
    
            </h2>
            <p className="text-lg text-white/60">
              {t('features.subheading')}
            </p>
          </div>

          {/* Kosik graphic */}
          <div className="flex-shrink-0 reveal-animation" data-anim="right">
            <img
              src="/images/featuredGraphics/vozik.png"
              alt=""
              className="w-48 h-48 md:w-64 md:h-64 lg:w-72 lg:h-72 object-contain drop-shadow-[0_20px_40px_rgba(86,69,204,0.15)]"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <div
              key={i}
              className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 transition-all duration-300 hover:bg-white/15 hover:-translate-y-1 reveal-animation border border-white/10 relative"
              style={{ animationDelay: `${i * 0.1}s` }}
              data-anim="scale"
            >
              {'badge' in feature && feature.badge && (
                <span className="absolute top-4 right-4 px-2.5 py-0.5 rounded-full bg-brand-secondary/20 text-brand-secondary text-xs font-semibold border border-brand-secondary/30">
                  {feature.badge}
                </span>
              )}
              <div className="p-3 bg-white/10 rounded-xl inline-block mb-4">
                {feature.icon}
              </div>
              <h3 className="text-lg font-bold mb-2 text-white">
                {feature.title}
              </h3>
              <p className="text-white/60 text-sm leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
