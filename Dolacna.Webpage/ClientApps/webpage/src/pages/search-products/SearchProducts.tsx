import Footer from '@/components/layout/Footer';
import Header from '@/components/layout/Header';
import Seo from '@/components/Seo';
import { useRevealAnimation } from '@/hooks/use-reveal-animation';
import { type CategoryDto } from '@/lib/catalogApi';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import CategoryAutocomplete from './CategoryAutocomplete';
import CategoryPriceComparison from './CategoryPriceComparison';
import SearchLimitDialog from './SearchLimitDialog';
import { useSearchLimit } from './useSearchLimit';

const SearchProducts = () => {
  const { t } = useTranslation();
  useRevealAnimation();
  const [selectedCategory, setSelectedCategory] = useState<CategoryDto | null>(
    null,
  );
  const [isLimitDialogOpen, setIsLimitDialogOpen] = useState(false);
  const { remainingSearches, isLimitReached, registerSearch } =
    useSearchLimit();

  const handleSelectCategory = (category: CategoryDto) => {
    if (isLimitReached) {
      setIsLimitDialogOpen(true);
      return;
    }
    registerSearch();
    setSelectedCategory(category);
  };

  return (
    <div className="min-h-screen bg-brand-nude">
      <Seo
        title={t('seo.searchProducts.title')}
        description={t('seo.searchProducts.description')}
        path="/SearchProducts"
      />
      <Header />
      <main className="section-container pt-40 pb-50">
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
          <CategoryAutocomplete onSelectCategory={handleSelectCategory} />
        </div>

        {selectedCategory && (
          <CategoryPriceComparison category={selectedCategory} />
        )}
      </main>
      <Footer />
      <SearchLimitDialog
        open={isLimitDialogOpen}
        onOpenChange={setIsLimitDialogOpen}
      />
    </div>
  );
};

export default SearchProducts;
