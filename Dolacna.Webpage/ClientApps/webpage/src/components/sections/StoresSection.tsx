import React from 'react';
import { useTranslation } from 'react-i18next';
import BillaLogo from '@/../public/images/stores/billa.png';
import KauflandLogo from '@/../public/images/stores/kaufland.png';
import LidlLogo from '@/../public/images/stores/lidl.png';
import TescoLogo from '@/../public/images/stores/tesco.jpg';

interface StoreInfo {
  id: string;
  name: string;
  logo: string;
  products: number;
  accent: string;
}

const StoresSection: React.FC = () => {
  const { t } = useTranslation();

  const stores: StoreInfo[] = [
    { id: 'billa', name: t('storesSection.storeLabels.billa'), logo: BillaLogo, products: 2500, accent: 'from-yellow-500 to-red-500' },
    { id: 'kaufland', name: t('storesSection.storeLabels.kaufland'), logo: KauflandLogo, products: 3200, accent: 'from-red-600 to-rose-500' },
    { id: 'lidl', name: t('storesSection.storeLabels.lidl'), logo: LidlLogo, products: 2800, accent: 'from-blue-600 to-yellow-400' },
    { id: 'tesco', name: t('storesSection.storeLabels.tesco'), logo: TescoLogo, products: 3600, accent: 'from-blue-700 to-red-600' },
  ];

  return (
    <section className="relative py-24 bg-gradient-to-b from-brand-light via-brand-light/70 to-brand-dark overflow-hidden">
      <div className="section-container relative z-10">
        <div className="max-w-3xl mb-12 reveal-animation">
          <h2 className="text-3xl md:text-5xl font-bold text-brand-dark/90">
            {t('storesSection.heading')}{' '}
            <span className="text-brand-accent">{t('storesSection.headingAccent')}</span>
          </h2>
          <p className="mt-4 text-brand-dark/90 text-lg md:text-xl">{t('storesSection.subheading')}</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {stores.map((store) => (
            <div
              key={store.id}
              aria-label={store.name}
              style={{ backgroundImage: `url(${store.logo})` }}
              className="group relative aspect-square rounded-2xl overflow-hidden reveal-animation shadow-[0_0_0_1px_rgba(255,255,255,0.08)] bg-center bg-cover bg-no-repeat hover:shadow-xl hover:shadow-brand-accent/30 transition-all duration-500"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/70 via-brand-dark/30 to-transparent opacity-80 group-hover:opacity-0 transition-opacity duration-500" />

              {/* Name (visible idle, hides on hover) */}
              <div className="absolute inset-x-0 bottom-0 z-10 flex items-end justify-center pb-4 pt-10 opacity-100 group-hover:opacity-0 transition-opacity duration-500">
                <span className="text-sm md:text-base font-medium text-white drop-shadow-sm">{store.name}</span>
              </div>

              {/* Product stats (appears on hover) */}
              <div className={`absolute inset-0 z-20 flex flex-col items-center justify-center gap-3 text-center px-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-brand-dark/70 backdrop-blur-sm`}>
                <div className="text-3xl font-semibold text-white drop-shadow-sm">{store.products.toLocaleString()}+</div>
                <div className="text-xs md:text-sm uppercase tracking-wide text-white/90">{t('storesSection.productsTracked')}</div>
              </div>

              {/* Accent gradient ring subtle */}
              <div className={`pointer-events-none absolute inset-0 rounded-2xl ring-0 group-hover:ring-4 ring-offset-0 ring-transparent group-hover:opacity-60 group-hover:bg-gradient-to-br ${store.accent} transition-all duration-500`} />
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col md:flex-row md:items-center md:justify-between gap-6 reveal-animation">
          <div className="text-white/70 text-sm md:text-base max-w-xl">{t('storesSection.footerBlurb')}</div>
        </div>
      </div>

    </section>
  );
};

export default StoresSection;
