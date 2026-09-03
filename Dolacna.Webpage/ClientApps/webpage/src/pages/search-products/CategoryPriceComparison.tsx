import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { type CategoryDto } from '@/lib/catalogApi';
import { Trophy } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import {
  formatPrice,
  useCategoryPriceComparison,
} from './useCategoryPriceComparison';

interface CategoryPriceComparisonProps {
  category: CategoryDto;
}

const CategoryPriceComparison = ({
  category,
}: CategoryPriceComparisonProps) => {
  const { t } = useTranslation();
  const { products, shopCheapestPrices, cheapestShopId, isLoading, isError } =
    useCategoryPriceComparison(category.id);

  if (isLoading) {
    return (
      <div className="mx-auto mt-10 max-w-4xl">
        <Skeleton className="h-24 w-full rounded-2xl" />
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

      {/* Cheapest price per shop */}
      <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4">
        {shopCheapestPrices.map((shop) => (
          <div
            key={shop.id}
            className="relative flex flex-col items-center gap-2 rounded-2xl border border-brand-lilac/30 bg-white p-4 shadow-sm"
          >
            {shop.id === cheapestShopId && (
              <Badge className="absolute -top-3 gap-1 border-transparent bg-brand-secondary text-brand-indigo">
                <Trophy className="h-3 w-3" />
                {t('categorySearch.cheapest')}
              </Badge>
            )}
            <img
              src={shop.logo}
              alt={shop.name}
              className="h-8 w-auto object-contain"
            />
            <span className="text-lg font-bold text-brand-indigo">
              {shop.cheapestPrice !== null
                ? formatPrice(shop.cheapestPrice)
                : '—'}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryPriceComparison;
