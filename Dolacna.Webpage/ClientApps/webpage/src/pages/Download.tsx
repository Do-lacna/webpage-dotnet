import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Apple,
  ShoppingBag,
  Smartphone,
  Shield,
  Zap,
  Download as DownloadIcon,
  Check,
  Users,
  TrendingUp,
  MapPin,
} from 'lucide-react';
import IPhoneMockupPng from '@/../public/images/iMockup - iPhone 14.png';

const Download = () => {
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

    const elements = document.querySelectorAll('.reveal-animation');
    elements.forEach((el) => observer.observe(el));

    return () => {
      if (elements) {
        elements.forEach((el) => observer.unobserve(el));
      }
    };
  }, []);

  const features = [
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: 'Real-time Price Comparison',
      description: 'Compare prices across all major Slovak retailers instantly',
    },
    {
      icon: <MapPin className="w-8 h-8" />,
      title: 'Store Locator',
      description: 'Find the nearest stores with the best deals in your area',
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: 'Trusted & Secure',
      description: 'Your data is protected with enterprise-grade security',
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: 'Lightning Fast',
      description: 'Get instant results with our optimized search engine',
    },
  ];

  const benefits = [
    'Save up to 30% on your grocery bills',
    'Track price history and trends',
    'Create and share shopping lists',
    'Get notifications for price drops',
    'Discover weekly deals and promotions',
    'Compare nutritional information',
  ];

  const stats = [
    { number: '10,000+', label: 'Active Users' },
    { number: '500+', label: 'Partner Stores' },
    { number: '€2M+', label: 'Total Savings' },
    { number: '4.8★', label: 'App Rating' },
  ];

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-brand-dark via-brand-dark to-brand-accent/10 text-white">
          <div className="section-container">
            <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-12">
              <div className="lg:w-1/2 text-center lg:text-left reveal-animation">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white">
                  {t('download.heading')}{' '}
                  <span className="text-brand-accent">
                    {t('download.headingAccent')}
                  </span>
                </h1>
                <p className="text-xl text-white/90 mb-8 leading-relaxed">
                  {t('download.subheading')}
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8">
                  <Button className="flex items-center justify-center gap-3 bg-brand-accent text-brand-dark hover:bg-white button-hover-effect text-lg py-6 px-8">
                    <Apple className="w-6 h-6" />
                    <span>{t('download.appStore')}</span>
                  </Button>
                  <Button className="flex items-center justify-center gap-3 bg-brand-accent text-brand-dark hover:bg-white button-hover-effect text-lg py-6 px-8">
                    <ShoppingBag className="w-6 h-6" />
                    <span>{t('download.googlePlay')}</span>
                  </Button>
                </div>

                <div className="flex items-center justify-center lg:justify-start gap-4">
                  <div className="flex -space-x-2">
                    <div className="w-12 h-12 rounded-full bg-brand-light flex items-center justify-center text-brand-dark font-medium">
                      JD
                    </div>
                    <div className="w-12 h-12 rounded-full bg-brand-accent flex items-center justify-center text-brand-dark font-medium">
                      KL
                    </div>
                    <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-brand-dark font-medium">
                      MN
                    </div>
                    <div className="w-12 h-12 rounded-full border-2 border-white flex items-center justify-center text-white font-medium">
                      +
                    </div>
                  </div>
                  <div className="text-sm text-white/80">
                    {t('download.joinedBy')}{' '}
                    <span className="font-bold text-white">10,000+</span>{' '}
                    {t('download.smartShoppers')}
                  </div>
                </div>
              </div>

              <div className="lg:w-1/2 relative reveal-animation">
                <div className="relative max-w-[320px] mx-auto">
                  <img
                    src={IPhoneMockupPng}
                    alt="usetri.sk app preview"
                    className="w-full h-auto drop-shadow-2xl"
                  />
                  <div className="absolute -top-4 -right-4 bg-brand-accent text-brand-dark px-4 py-2 rounded-full font-bold text-sm">
                    FREE
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-white">
          <div className="section-container">
            <div className="max-w-4xl mx-auto reveal-animation">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {stats.map((stat) => (
                  <div key={stat.label} className="text-center">
                    <div className="text-3xl md:text-4xl font-bold text-brand-dark mb-2">
                      {stat.number}
                    </div>
                    <div className="text-gray-600">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-gray-50">
          <div className="section-container">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16 reveal-animation">
                <h2 className="text-3xl md:text-4xl font-bold text-brand-dark mb-4">
                  Why Choose usetri.sk?
                </h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  Join thousands of smart shoppers who are already saving money
                  with our powerful grocery comparison app.
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {features.map((feature) => (
                  <Card
                    key={feature.title}
                    className="reveal-animation border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                  >
                    <CardContent className="p-6 text-center">
                      <div className="inline-flex items-center justify-center w-16 h-16 bg-brand-accent/10 rounded-full mb-4">
                        <div className="text-brand-accent">{feature.icon}</div>
                      </div>
                      <h3 className="text-lg font-semibold text-brand-dark mb-2">
                        {feature.title}
                      </h3>
                      <p className="text-gray-600 text-sm">
                        {feature.description}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-20 bg-white">
          <div className="section-container">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-16 reveal-animation">
                <h2 className="text-3xl md:text-4xl font-bold text-brand-dark mb-4">
                  Everything You Need to Save
                </h2>
                <p className="text-xl text-gray-600">
                  Our app comes packed with features designed to maximize your
                  savings.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {benefits.map((benefit) => (
                  <div
                    key={benefit}
                    className="flex items-center gap-4 p-4 rounded-lg hover:bg-gray-50 transition-colors reveal-animation"
                  >
                    <div className="flex-shrink-0 w-8 h-8 bg-brand-accent rounded-full flex items-center justify-center">
                      <Check className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-gray-700 font-medium">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Device Compatibility */}
        <section className="py-20 bg-brand-light">
          <div className="section-container">
            <div className="max-w-4xl mx-auto text-center reveal-animation">
              <h2 className="text-3xl md:text-4xl font-bold text-brand-dark mb-8">
                Available on All Devices
              </h2>
              <p className="text-xl text-gray-600 mb-12">
                Download usetri.sk on your preferred platform and start saving
                today.
              </p>

              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                <div className="flex items-center gap-3 bg-white p-4 rounded-xl shadow-lg">
                  <Smartphone className="w-8 h-8 text-brand-accent" />
                  <div className="text-left">
                    <div className="font-semibold text-brand-dark">iOS</div>
                    <div className="text-sm text-gray-600">iPhone & iPad</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 bg-white p-4 rounded-xl shadow-lg">
                  <Smartphone className="w-8 h-8 text-brand-accent" />
                  <div className="text-left">
                    <div className="font-semibold text-brand-dark">Android</div>
                    <div className="text-sm text-gray-600">Phone & Tablet</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="py-20 bg-brand-dark text-white">
          <div className="section-container">
            <div className="max-w-4xl mx-auto text-center reveal-animation">
              <DownloadIcon className="w-16 h-16 text-brand-accent mx-auto mb-6" />
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Ready to Start Saving?
              </h2>
              <p className="text-xl text-white/90 mb-8">
                Join the usetri.sk community and discover how much you can save
                on your next grocery trip.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                <Button className="flex items-center justify-center gap-3 bg-brand-accent text-brand-dark hover:bg-white button-hover-effect text-lg py-6 px-8">
                  <Apple className="w-6 h-6" />
                  <div className="text-left">
                    <div className="text-xs">Download on the</div>
                    <div className="font-semibold">App Store</div>
                  </div>
                </Button>
                <Button className="flex items-center justify-center gap-3 bg-brand-accent text-brand-dark hover:bg-white button-hover-effect text-lg py-6 px-8">
                  <ShoppingBag className="w-6 h-6" />
                  <div className="text-left">
                    <div className="text-xs">Get it on</div>
                    <div className="font-semibold">Google Play</div>
                  </div>
                </Button>
              </div>

              <div className="flex items-center justify-center gap-2 text-white/80">
                <Users className="w-5 h-5" />
                <span>Trusted by 10,000+ users across Slovakia</span>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Download;
