import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import {
  Check,
  X,
  Star,
  Zap,
  Crown,
  Users,
  Sparkles,
  Calendar,
  Rocket,
} from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';

const Premium = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

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
      elements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  const plans = [
    {
      name: t('premium.plans.freeBeta.name'),
      price: '€0',
      description: t('premium.plans.freeBeta.description'),
      features: [
        { name: t('premium.features.limitedProductSearch'), included: true },
        { name: t('premium.features.basicPriceHistory'), included: true },
        { name: t('premium.features.betaTestingAccess'), included: true },
        { name: t('premium.features.communityFeedback'), included: true },
        { name: t('premium.features.unlimitedSearch'), included: false },
        { name: t('premium.features.shoppingList'), included: false },
        { name: t('premium.features.discountNotifications'), included: false },
        { name: t('premium.features.extendedPriceHistory'), included: false },
      ],
      cta: t('premium.plans.freeBeta.cta'),
      highlighted: true,
      icon: Rocket,
      badge: t('premium.plans.freeBeta.badge'),
    },
    {
      name: t('premium.plans.premium.name'),
      price: '€2.99',
      period: t('premium.plans.premium.period'),
      description: t('premium.plans.premium.description'),
      features: [
        { name: t('premium.features.unlimitedSearch'), included: true },
        { name: t('premium.features.smartShoppingList'), included: true },
        { name: t('premium.features.discountNotifications'), included: true },
        { name: t('premium.features.extendedPriceHistory'), included: true },
        { name: t('premium.features.prioritySupport'), included: true },
      ],
      cta: t('premium.plans.premium.cta'),
      highlighted: false,
      icon: Crown,
      badge: t('premium.plans.premium.badge'),
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="pt-32 bg-gradient-to-b from-brand-light to-white">
        <div className="section-container">
          <div className="text-center max-w-4xl mx-auto reveal-animation">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              <span className="text-brand-dark">{t('premium.heading')} </span>
              <span className="text-brand-accent">
                {t('premium.headingAccent')}
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              {t('premium.betaSubheading')}
            </p>
            <div className="inline-flex items-center px-4 py-2 bg-brand-accent/10 rounded-full text-brand-dark font-medium">
              <Star className="w-5 h-5 mr-2 text-brand-accent" />
              {t('premium.freePhaseBadge')} • {t('premium.contactForTesting')}
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Plans */}
      <section className=" bg-white">
        <div className="section-container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {plans.map((plan, i) => (
              <div
                key={plan.name}
                className={`relative rounded-2xl overflow-hidden transition-all duration-500 reveal-animation hover:scale-105 ${
                  plan.highlighted
                    ? 'bg-brand-accent text-brand-dark border-2 border-brand-accent shadow-2xl'
                    : 'bg-white border border-border shadow-lg'
                }`}
                style={{ animationDelay: `${i * 0.2}s` }}
              >
                <div className="pricing-badge mt-5">{plan.badge}</div>
                <div className="p-8">
                  <div className="flex items-center mb-4">
                    <plan.icon className="w-8 h-8 mr-3 text-brand-dark" />
                    <h3 className="text-2xl font-bold text-brand-dark">
                      {plan.name}
                    </h3>
                  </div>

                  <div className="flex items-end mb-4">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    {plan.period && (
                      <span className="ml-1 pb-1 text-muted-foreground">
                        {plan.period}
                      </span>
                    )}
                  </div>

                  <p className="mb-6 text-muted-foreground">
                    {plan.description}
                  </p>

                  <div className="space-y-4 mb-8">
                    {plan.features.map((feature, j) => {
                      let textColor = 'text-muted-foreground line-through';
                      if (feature.included) {
                        textColor = 'text-foreground';
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
                    className={`w-full py-6 text-lg font-semibold transition-all duration-300 ${
                      plan.highlighted
                        ? 'bg-brand-dark text-white hover:bg-brand-dark/90 button-hover-effect transform hover:scale-105'
                        : 'bg-brand-dark text-white hover:bg-brand-accent hover:text-brand-dark border border-brand-dark'
                    }`}
                    disabled={!plan.highlighted}
                    onClick={() => plan.highlighted && navigate('/Contact')}
                  >
                    {plan.cta}
                  </Button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center text-muted-foreground reveal-animation">
            <p className="text-lg">{t('premium.trialNote')}</p>
          </div>
        </div>
      </section>

      {/* Roadmap Section */}
      <section className="py-20 bg-gradient-to-b from-white to-brand-light">
        <div className="section-container">
          <div className="text-center mb-16 reveal-animation">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              <span className="text-brand-dark">
                {t('premium.roadmap.heading').split(' ')[0]}{' '}
              </span>
              <span className="text-brand-accent">
                {t('premium.roadmap.heading').split(' ').slice(1).join(' ')}
              </span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {t('premium.roadmap.subheading')}
            </p>
          </div>

          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Phase 1 - Current */}
              <div className="reveal-animation">
                <div className="relative bg-white rounded-2xl p-8 border-2 border-brand-accent shadow-lg">
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="bg-brand-accent text-brand-dark px-4 py-2 rounded-full text-sm font-bold">
                      {t('premium.roadmap.phase1.badge')}
                    </div>
                  </div>
                  <div className="text-center mb-6">
                    <div className="w-16 h-16 bg-brand-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Rocket className="w-8 h-8 text-brand-accent" />
                    </div>
                    <h3 className="text-2xl font-bold text-brand-dark mb-2">
                      {t('premium.roadmap.phase1.title')}
                    </h3>
                    <p className="text-lg font-semibold text-brand-accent">
                      {t('premium.roadmap.phase1.subtitle')}
                    </p>
                  </div>
                  <ul className="space-y-3 text-left">
                    <li className="flex items-start">
                      <Check className="w-5 h-5 text-brand-accent mt-0.5 flex-shrink-0" />
                      <span className="ml-3 text-foreground">
                        {t('premium.roadmap.phase1.features.productSearch')}
                      </span>
                    </li>
                    <li className="flex items-start">
                      <Check className="w-5 h-5 text-brand-accent mt-0.5 flex-shrink-0" />
                      <span className="ml-3 text-foreground">
                        {t(
                          'premium.roadmap.phase1.features.shoppingListTesting',
                        )}
                      </span>
                    </li>
                    <li className="flex items-start">
                      <Check className="w-5 h-5 text-brand-accent mt-0.5 flex-shrink-0" />
                      <span className="ml-3 text-foreground">
                        {t('premium.roadmap.phase1.features.basicPriceHistory')}
                      </span>
                    </li>
                    <li className="flex items-start">
                      <Check className="w-5 h-5 text-brand-accent mt-0.5 flex-shrink-0" />
                      <span className="ml-3 text-foreground">
                        {t('premium.roadmap.phase1.features.contactForTesting')}
                      </span>
                    </li>
                  </ul>
                  <div className="mt-6 text-center">
                    <div className="text-sm text-muted-foreground">
                      {t('premium.roadmap.phase1.availableNow')}
                    </div>
                  </div>
                </div>
              </div>

              {/* Phase 2 - Premium Launch */}
              <div
                className="reveal-animation"
                style={{ animationDelay: '0.2s' }}
              >
                <div className="relative bg-white rounded-2xl p-8 border border-border shadow-lg">
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="bg-brand-dark text-white px-4 py-2 rounded-full text-sm font-bold">
                      {t('premium.roadmap.phase2.badge')}
                    </div>
                  </div>
                  <div className="text-center mb-6">
                    <div className="w-16 h-16 bg-brand-dark/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Crown className="w-8 h-8 text-brand-dark" />
                    </div>
                    <h3 className="text-2xl font-bold text-brand-dark mb-2">
                      {t('premium.roadmap.phase2.title')}
                    </h3>
                    <p className="text-lg font-semibold text-brand-dark">
                      {t('premium.roadmap.phase2.subtitle')}
                    </p>
                  </div>
                  <ul className="space-y-3 text-left">
                    <li className="flex items-start">
                      <Star className="w-5 h-5 text-brand-accent mt-0.5 flex-shrink-0" />
                      <span className="ml-3 text-foreground">
                        {t('premium.roadmap.phase2.features.unlimitedSearch')}
                      </span>
                    </li>
                    <li className="flex items-start">
                      <Star className="w-5 h-5 text-brand-accent mt-0.5 flex-shrink-0" />
                      <span className="ml-3 text-foreground">
                        {t('premium.roadmap.phase2.features.smartShoppingList')}
                      </span>
                    </li>
                    <li className="flex items-start">
                      <Star className="w-5 h-5 text-brand-accent mt-0.5 flex-shrink-0" />
                      <span className="ml-3 text-foreground">
                        {t(
                          'premium.roadmap.phase2.features.discountNotifications',
                        )}
                      </span>
                    </li>
                    <li className="flex items-start">
                      <Star className="w-5 h-5 text-brand-accent mt-0.5 flex-shrink-0" />
                      <span className="ml-3 text-foreground">
                        {t(
                          'premium.roadmap.phase2.features.extendedPriceHistory',
                        )}
                      </span>
                    </li>
                  </ul>
                  <div className="mt-6 text-center">
                    <div className="text-sm text-muted-foreground">
                      {t('premium.roadmap.phase2.timeline')}
                    </div>
                  </div>
                </div>
              </div>

              {/* Phase 3 - Future */}
              <div
                className="reveal-animation"
                style={{ animationDelay: '0.4s' }}
              >
                <div className="relative bg-white rounded-2xl p-8 border border-border shadow-lg">
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-full text-sm font-bold">
                      {t('premium.roadmap.phase3.badge')}
                    </div>
                  </div>
                  <div className="text-center mb-6">
                    <div className="w-16 h-16 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Sparkles className="w-8 h-8 text-purple-500" />
                    </div>
                    <h3 className="text-2xl font-bold text-brand-dark mb-2">
                      {t('premium.roadmap.phase3.title')}
                    </h3>
                    <p className="text-lg font-semibold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
                      {t('premium.roadmap.phase3.subtitle')}
                    </p>
                  </div>
                  <ul className="space-y-3 text-left">
                    <li className="flex items-start">
                      <Sparkles className="w-5 h-5 text-purple-500 mt-0.5 flex-shrink-0" />
                      <span className="ml-3 text-foreground">
                        {t('premium.roadmap.phase3.features.moreSupermarkets')}
                      </span>
                    </li>
                    <li className="flex items-start">
                      <Users className="w-5 h-5 text-purple-500 mt-0.5 flex-shrink-0" />
                      <span className="ml-3 text-foreground">
                        {t('premium.roadmap.phase3.features.moreProducts')}
                      </span>
                    </li>
                    <li className="flex items-start">
                      <Calendar className="w-5 h-5 text-purple-500 mt-0.5 flex-shrink-0" />
                      <span className="ml-3 text-foreground">
                        {t('premium.roadmap.phase3.features.newFeatures')}
                      </span>
                    </li>
                    <li className="flex items-start">
                      <Zap className="w-5 h-5 text-purple-500 mt-0.5 flex-shrink-0" />
                      <span className="ml-3 text-foreground">
                        {t('premium.roadmap.phase3.features.customerFeedback')}
                      </span>
                    </li>
                  </ul>
                  <div className="mt-6 text-center">
                    <div className="text-sm text-muted-foreground">
                      {t('premium.roadmap.phase3.timeline')}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Comparison Table */}
      <section className="py-20 bg-white">
        <div className="section-container">
          <div className="text-center mb-12 reveal-animation">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              <span className="text-brand-dark">
                {t('premium.featureComparison.heading').split(' ')[0]}{' '}
              </span>
              <span className="text-brand-accent">
                {t('premium.featureComparison.heading')
                  .split(' ')
                  .slice(1)
                  .join(' ')}
              </span>
            </h2>
            <p className="text-lg text-gray-600">
              {t('premium.featureComparison.subheading')}
            </p>
          </div>

          <div className="max-w-4xl mx-auto reveal-animation">
            <div className="bg-white rounded-2xl border border-border shadow-lg overflow-hidden">
              <div className="grid grid-cols-3 bg-brand-light">
                <div className="p-6">
                  <h3 className="text-xl font-bold text-brand-dark">
                    {t('premium.featureComparison.features')}
                  </h3>
                </div>
                <div className="p-6 text-center">
                  <h3 className="text-xl font-bold text-brand-dark">
                    {t('premium.featureComparison.free')}
                  </h3>
                </div>
                <div className="p-6 text-center bg-brand-dark text-white">
                  <h3 className="text-xl font-bold">
                    {t('premium.featureComparison.premium')}
                  </h3>
                </div>
              </div>

              {[
                {
                  name: t('premium.features.unlimitedSearch'),
                  free: false,
                  premium: true,
                },
                {
                  name: t('premium.features.extendedPriceHistory'),
                  free: false,
                  premium: true,
                },
                {
                  name: t('premium.features.betaTestingAccess'),
                  free: true,
                  premium: true,
                },
                {
                  name: t('premium.features.smartShoppingList'),
                  free: false,
                  premium: true,
                },
                {
                  name: t('premium.features.discountNotifications'),
                  free: false,
                  premium: true,
                },
                {
                  name: t('premium.features.prioritySupport'),
                  free: false,
                  premium: true,
                },
                {
                  name: t('premium.features.communityFeedback'),
                  free: true,
                  premium: true,
                },
              ].map((feature, i) => (
                <div
                  key={feature.name}
                  className={`grid grid-cols-3 border-b border-border last:border-b-0 ${i % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}
                >
                  <div className="p-4">
                    <span className="text-foreground font-medium">
                      {feature.name}
                    </span>
                  </div>
                  <div className="p-4 text-center">
                    {feature.free ? (
                      <Check className="w-5 h-5 text-brand-accent mx-auto" />
                    ) : (
                      <X className="w-5 h-5 text-muted-foreground mx-auto" />
                    )}
                  </div>
                  <div className="p-4 text-center">
                    {feature.premium ? (
                      <Check className="w-5 h-5 text-brand-accent mx-auto" />
                    ) : (
                      <X className="w-5 h-5 text-muted-foreground mx-auto" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-brand-dark">
        <div className="section-container">
          <div className="text-center max-w-3xl mx-auto reveal-animation">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white">
              {t('premium.callToAction.heading')}
            </h2>
            <p className="text-lg text-gray-300 mb-8">
              {t('premium.callToAction.description')}
            </p>
            <div className="flex justify-center">
              <Button
                className="bg-brand-accent text-brand-dark hover:bg-white hover:text-brand-dark px-8 py-6 text-lg font-semibold button-hover-effect"
                onClick={() => navigate('/Contact')}
              >
                {t('premium.callToAction.contactUs')}
              </Button>
            </div>
            <div className="mt-6 text-sm text-gray-400">
              {t('premium.callToAction.footer')}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Premium;
