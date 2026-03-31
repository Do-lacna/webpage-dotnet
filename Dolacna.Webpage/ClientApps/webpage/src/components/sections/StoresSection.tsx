import BillaLogo from '@/../public/images/stores/billa.png';
import KauflandLogo from '@/../public/images/stores/kaufland.png';
import LidlLogo from '@/../public/images/stores/lidl.png';
import TescoLogo from '@/../public/images/stores/tesco.jpg';
import { useRevealAnimation } from '@/hooks/use-reveal-animation';
import { Bot, DatabaseZap, RefreshCw } from 'lucide-react';
import React from 'react';
import { useTranslation } from 'react-i18next';

interface StoreInfo {
  id: string;
  name: string;
  logo: string;
  products: number;
  accent: string;
}

const StoresSection: React.FC = () => {
  const { t } = useTranslation();
  useRevealAnimation();

  const stores: StoreInfo[] = [
    { id: 'billa', name: t('storesSection.storeLabels.billa'), logo: BillaLogo, products: 2500, accent: 'from-yellow-500 to-red-500' },
    { id: 'kaufland', name: t('storesSection.storeLabels.kaufland'), logo: KauflandLogo, products: 3200, accent: 'from-red-600 to-rose-500' },
    { id: 'lidl', name: t('storesSection.storeLabels.lidl'), logo: LidlLogo, products: 2800, accent: 'from-blue-600 to-yellow-400' },
    { id: 'tesco', name: t('storesSection.storeLabels.tesco'), logo: TescoLogo, products: 3600, accent: 'from-blue-700 to-red-600' },
  ];

  return (
    <section className="relative py-12 bg-brand-nude overflow-hidden">
      {/* Pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.1] pointer-events-none"
        style={{ backgroundImage: 'url(/images/graphicMotives/pattern.png)', backgroundRepeat: 'repeat', backgroundSize: '280px' }}
      />
      {/* subtle top divider from dark hero */}
      <div className="absolute inset-x-0 top-0 h-px bg-brand-indigo/10" />

      <div className="section-container relative z-10">
        <div className="max-w-3xl mb-8 reveal-animation" data-anim="left">
          <h2 className="text-3xl md:text-5xl font-bold text-brand-indigo">
            {t('storesSection.heading')}{' '}
            <span className="text-brand-primary">{t('storesSection.headingAccent')}</span>
          </h2>
          <p className="mt-4 text-brand-indigo/60 text-lg md:text-xl">{t('storesSection.subheading')}</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {stores.map((store) => (
            <div
              key={store.id}
              aria-label={store.name}
              style={{ backgroundImage: `url(${store.logo})` }}
              className="group relative aspect-square rounded-2xl overflow-hidden reveal-animation shadow-soft bg-center bg-cover bg-no-repeat hover:shadow-xl hover:shadow-brand-primary/20 transition-all duration-500"
              data-anim="scale"
            >
              {/* idle dark veil */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/15 to-transparent opacity-80 group-hover:opacity-0 transition-opacity duration-500" />

              {/* Name (visible idle) */}
              <div className="absolute inset-x-0 bottom-0 z-10 flex items-end justify-center pb-4 pt-10 opacity-100 group-hover:opacity-0 transition-opacity duration-500">
                <span className="text-sm md:text-base font-medium text-white drop-shadow-sm">{store.name}</span>
              </div>

              {/* Product stats (hover reveal) */}
              <div className="absolute inset-0 z-20 flex flex-col items-center justify-center gap-3 text-center px-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-brand-primary/85 backdrop-blur-sm rounded-2xl">
                <div className="text-4xl font-black text-white drop-shadow-sm">{store.products.toLocaleString()}+</div>
                <div className="text-xs md:text-sm uppercase tracking-widest text-brand-secondary font-medium">{t('storesSection.productsTracked')}</div>
              </div>

              {/* Hover outline ring */}
              <div className="pointer-events-none absolute inset-0 rounded-2xl ring-0 group-hover:ring-2 ring-brand-lilac/70 transition-all duration-500" />
            </div>
          ))}
        </div>

        {/* Key points */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8 reveal-animation" data-anim="up">
          {[
            { icon: <RefreshCw className="w-5 h-5 text-brand-primary" />, text: t('storesSection.keyPoints.regularUpdates') },
            { icon: <Bot className="w-5 h-5 text-brand-primary" />, text: t('storesSection.keyPoints.aiAutomation') },
            { icon: <DatabaseZap className="w-5 h-5 text-brand-primary" />, text: t('storesSection.keyPoints.growingDatabase') },
          ].map((point, i) => (
            <div key={i} className="flex items-center gap-3 bg-white/60 rounded-xl px-4 py-3 border border-brand-lilac/20">
              <div className="flex-shrink-0 p-2 bg-brand-lilac/20 rounded-lg">{point.icon}</div>
              <span className="text-sm font-medium text-brand-indigo">{point.text}</span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default StoresSection;
