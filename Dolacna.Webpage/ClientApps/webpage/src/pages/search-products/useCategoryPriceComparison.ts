import { type ShopProductDto, fetchProducts } from '@/lib/catalogApi';
import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';

const PRODUCT_LIMIT = 12;

export interface ShopInfo {
  id: number;
  name: string;
  logo: string;
}

export interface ShopCheapestPrice extends ShopInfo {
  cheapestPrice: number | null;
}

// Confirmed shop id mapping (see /shops endpoint): 1=Lidl, 2=Billa, 3=Kaufland, 4=Tesco.
export const SHOPS: ShopInfo[] = [
  { id: 1, name: 'Lidl', logo: '/images/stores/lidl.webp' },
  { id: 2, name: 'Billa', logo: '/images/stores/billa.webp' },
  { id: 3, name: 'Kaufland', logo: '/images/stores/kaufland.webp' },
  { id: 4, name: 'Tesco', logo: '/images/stores/tesco.webp' },
];

export function formatPrice(price: number): string {
  return `${price.toFixed(2)} €`;
}

export function useCategoryPriceComparison(categoryId: number) {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['products', categoryId],
    queryFn: () => fetchProducts({ categoryId, limit: PRODUCT_LIMIT }),
  });

  const products: ShopProductDto[] = useMemo(
    () => data?.products ?? [],
    [data?.products],
  );

  const shopCheapestPrices: ShopCheapestPrice[] = useMemo(() => {
    return SHOPS.map((shop) => {
      const prices = products
        .map(
          (product) =>
            product.shops_prices?.find((sp) => sp.shop_id === shop.id)
              ?.actual_price,
        )
        .filter((price): price is number => typeof price === 'number');
      const cheapestPrice = prices.length > 0 ? Math.min(...prices) : null;
      return { ...shop, cheapestPrice };
    });
  }, [products]);

  const cheapestShopId = useMemo(() => {
    const [first, ...rest] = shopCheapestPrices.filter(
      (shop) => shop.cheapestPrice !== null,
    );
    if (!first) return null;
    return rest.reduce(
      (cheapest, shop) =>
        (shop.cheapestPrice as number) < (cheapest.cheapestPrice as number)
          ? shop
          : cheapest,
      first,
    ).id;
  }, [shopCheapestPrices]);

  return {
    products,
    shopCheapestPrices,
    cheapestShopId,
    isLoading,
    isError,
  };
}
