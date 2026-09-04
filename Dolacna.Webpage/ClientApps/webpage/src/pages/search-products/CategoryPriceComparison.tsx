import { Skeleton } from '@/components/ui/skeleton';
import { type CategoryDto } from '@/lib/catalogApi';
import { useTranslation } from 'react-i18next';
import ShopProductCard from './ShopProductCard';
import { useCategoryPriceComparison } from './useCategoryPriceComparison';

interface CategoryPriceComparisonProps {
  category: CategoryDto;
}

const CategoryPriceComparison = ({
  category,
}: CategoryPriceComparisonProps) => {
  const { t } = useTranslation();
  const { shopResults, cheapestShopIds, hasMatches, isLoading, isError } =
    useCategoryPriceComparison(category);

  if (isLoading) {
    return (
      <div className="mx-auto mt-10 grid max-w-4xl grid-cols-2 gap-4 md:grid-cols-4">
        <Skeleton className="h-48 w-full rounded-2xl" />
        <Skeleton className="h-48 w-full rounded-2xl" />
        <Skeleton className="h-48 w-full rounded-2xl" />
        <Skeleton className="h-48 w-full rounded-2xl" />
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

  if (!hasMatches) {
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

      <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-4">
        {shopResults.map((shop) => (
          <ShopProductCard
            key={shop.id}
            shop={shop}
            product={shop.product}
            price={shop.price}
            isCheapest={cheapestShopIds.has(shop.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default CategoryPriceComparison;
