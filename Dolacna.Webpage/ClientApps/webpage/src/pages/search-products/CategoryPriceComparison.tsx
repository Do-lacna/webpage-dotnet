import { Skeleton } from '@/components/ui/skeleton';
import { type CategoryDto } from '@/lib/catalogApi';
import { useTranslation } from 'react-i18next';
import ProductPriceCard from './ProductPriceCard';
import { useCategoryPriceComparison } from './useCategoryPriceComparison';

interface CategoryPriceComparisonProps {
  category: CategoryDto;
}

const CategoryPriceComparison = ({
  category,
}: CategoryPriceComparisonProps) => {
  const { t } = useTranslation();
  const { products, isLoading, isError } = useCategoryPriceComparison(
    category.id,
  );

  if (isLoading) {
    return (
      <div className="mx-auto mt-10 max-w-4xl space-y-4">
        <Skeleton className="h-32 w-full rounded-2xl" />
        <Skeleton className="h-32 w-full rounded-2xl" />
        <Skeleton className="h-32 w-full rounded-2xl" />
      </div>
    );
  }

  if (isError) {
    return (
      <p className="mt-10 text-center text-brand-indigo/60">
        {t('categorySearch.loadError')}
      </p>
    );
  }

  if (products.length === 0) {
    return (
      <p className="mt-10 text-center text-brand-indigo/60">
        {t('categorySearch.noProducts')}
      </p>
    );
  }

  return (
    <div className="mx-auto mt-10 max-w-4xl animate-slide-up">
      <h2 className="text-center text-2xl font-bold text-brand-indigo">
        {t('categorySearch.comparisonHeading', { category: category.name })}
      </h2>

      <div className="mt-6 space-y-4">
        {products.map((product) => (
          <ProductPriceCard key={product.detail.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default CategoryPriceComparison;
