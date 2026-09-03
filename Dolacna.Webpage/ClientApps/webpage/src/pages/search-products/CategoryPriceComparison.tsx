import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import {
  type CategoryDto,
  type ShopProductDto,
  fetchProducts,
} from '@/lib/catalogApi';
import { useQuery } from '@tanstack/react-query';
import { Trophy } from 'lucide-react';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

interface CategoryPriceComparisonProps {
  category: CategoryDto;
}

const PRODUCT_LIMIT = 12;

// Confirmed shop id mapping (see /shops endpoint): 1=Lidl, 2=Billa, 3=Kaufland, 4=Tesco.
const SHOPS = [
  { id: 1, name: 'Lidl', logo: '/images/stores/lidl.webp' },
  { id: 2, name: 'Billa', logo: '/images/stores/billa.webp' },
  { id: 3, name: 'Kaufland', logo: '/images/stores/kaufland.webp' },
  { id: 4, name: 'Tesco', logo: '/images/stores/tesco.webp' },
];

function formatPrice(price: number): string {
  return `${price.toFixed(2)} €`;
}

const CategoryPriceComparison = ({
  category,
}: CategoryPriceComparisonProps) => {
  const { t } = useTranslation();

  const { data, isLoading, isError } = useQuery({
    queryKey: ['products', category.id],
    queryFn: () =>
      fetchProducts({ categoryId: category.id, limit: PRODUCT_LIMIT }),
  });

  const products: ShopProductDto[] = data?.products ?? [];

  const shopAverages = useMemo(() => {
    return SHOPS.map((shop) => {
      const prices = products
        .map(
          (product) =>
            product.shops_prices?.find((sp) => sp.shop_id === shop.id)
              ?.actual_price,
        )
        .filter((price): price is number => typeof price === 'number');
      const average =
        prices.length > 0
          ? prices.reduce((sum, p) => sum + p, 0) / prices.length
          : null;
      return { ...shop, average, sampleSize: prices.length };
    });
  }, [products]);

  const cheapestShopId = useMemo(() => {
    const [first, ...rest] = shopAverages.filter(
      (shop) => shop.average !== null,
    );
    if (!first) return null;
    return rest.reduce(
      (cheapest, shop) =>
        (shop.average as number) < (cheapest.average as number)
          ? shop
          : cheapest,
      first,
    ).id;
  }, [shopAverages]);

  if (isLoading) {
    return (
      <div className="mx-auto mt-10 max-w-4xl space-y-4">
        <Skeleton className="h-24 w-full rounded-2xl" />
        <Skeleton className="h-64 w-full rounded-2xl" />
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
    <div className="mx-auto mt-10 max-w-4xl reveal-animation" data-anim="up">
      <h2 className="text-center text-2xl font-bold text-brand-indigo">
        {t('categorySearch.comparisonHeading', { category: category.name })}
      </h2>

      {/* Per-shop average price summary */}
      <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4">
        {shopAverages.map((shop) => (
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
              {shop.average !== null ? formatPrice(shop.average) : '—'}
            </span>
            <span className="text-xs text-brand-indigo/50">
              {t('categorySearch.avgPrice')}
            </span>
          </div>
        ))}
      </div>

      {/* Product-level comparison table */}
      <div className="mt-8 overflow-x-auto rounded-2xl border border-brand-lilac/30 bg-white shadow-sm">
        <table className="w-full min-w-[560px] border-collapse text-sm">
          <thead>
            <tr className="border-b border-brand-lilac/20 text-left text-brand-indigo/60">
              <th className="px-4 py-3 font-medium">
                {t('categorySearch.product')}
              </th>
              {SHOPS.map((shop) => (
                <th key={shop.id} className="px-4 py-3 text-center font-medium">
                  <img
                    src={shop.logo}
                    alt={shop.name}
                    className="mx-auto h-5 w-auto object-contain"
                  />
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {products.map((product) => {
              const pricesByShop = SHOPS.map((shop) => ({
                shopId: shop.id,
                price:
                  product.shops_prices?.find((sp) => sp.shop_id === shop.id)
                    ?.actual_price ?? null,
              }));
              const lowestPrice = pricesByShop.reduce<number | null>(
                (min, entry) => {
                  if (entry.price === null) return min;
                  return min === null || entry.price < min ? entry.price : min;
                },
                null,
              );

              return (
                <tr
                  key={product.detail.id}
                  className="border-b border-brand-lilac/10 last:border-0"
                >
                  <td className="px-4 py-3 text-brand-indigo">
                    {product.detail.name}
                  </td>
                  {pricesByShop.map((entry) => (
                    <td key={entry.shopId} className="px-4 py-3 text-center">
                      {entry.price === null ? (
                        <span className="text-brand-indigo/30">—</span>
                      ) : (
                        <span
                          className={
                            entry.price === lowestPrice
                              ? 'rounded-full bg-brand-secondary/30 px-2 py-1 font-semibold text-brand-indigo'
                              : 'text-brand-indigo/70'
                          }
                        >
                          {formatPrice(entry.price)}
                        </span>
                      )}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CategoryPriceComparison;
