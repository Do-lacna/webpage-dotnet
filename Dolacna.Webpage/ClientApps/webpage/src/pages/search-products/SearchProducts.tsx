import Footer from '@/components/layout/Footer';
import Header from '@/components/layout/Header';
import Seo from '@/components/Seo';
import { useRevealAnimation } from '@/hooks/use-reveal-animation';
import { type CategoryDto } from '@/lib/catalogApi';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import CategoryAutocomplete from './CategoryAutocomplete';
import CategoryPriceComparison from './CategoryPriceComparison';

const SearchProducts = () => {
  const { t } = useTranslation();
  useRevealAnimation();
  const [selectedCategory, setSelectedCategory] = useState<CategoryDto | null>(
    null,
  );

  return (
    <div className="min-h-screen bg-brand-nude">
      <Seo
        title={t('seo.searchProducts.title')}
        description={t('seo.searchProducts.description')}
        path="/SearchProducts"
      />
      <Header />
      <main className="section-container pt-36 pb-20">
        <div
          className="mx-auto max-w-2xl text-center reveal-animation"
          data-anim="up"
        >
          <h1 className="text-3xl font-bold text-brand-indigo md:text-5xl">
            {t('categorySearch.heading')}
          </h1>
          <p className="mt-4 text-lg text-brand-indigo/60">
            {t('categorySearch.subheading')}
          </p>
        </div>

        <div className="mt-10">
          <CategoryAutocomplete onSelectCategory={setSelectedCategory} />
        </div>

        {selectedCategory && (
          <CategoryPriceComparison category={selectedCategory} />
        )}
      </main>
      <Footer />
    </div>
  );
};

export default SearchProducts;
