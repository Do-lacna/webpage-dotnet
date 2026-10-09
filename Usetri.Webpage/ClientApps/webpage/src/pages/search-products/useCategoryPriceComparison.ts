import {
  type ProductDto,
  type ShopPriceDto,
  fetchCategoryPrices,
} from '@/lib/catalogApi';
import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import { SHOPS, type ShopInfo } from './shopPricing';

const PRICE_EPSILON = 0.001;

export interface ShopCheapestProduct extends ShopInfo {
  product: ProductDto | null;
  price: number | null;
  // Full matched price entry (carries discount_price), so the UI can show the
  // original price + discount badge when the cheapest match is discounted.
  shopPrice: ShopPriceDto | null;
}

export function useCategoryPriceComparison(categoryId: number) {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['category-prices', categoryId],
    queryFn: () => fetchCategoryPrices(categoryId),
  });

  const shopPrices = useMemo(() => data?.shop_prices ?? [], [data]);

  // The backend already resolves each shop's best-matching product/price for the
  // category, so we just slot them into the known SHOPS list here.
  const shopResults: ShopCheapestProduct[] = useMemo(() => {
    return SHOPS.map((shop) => {
      const entry = shopPrices.find((sp) => sp.shop_id === shop.id);
      return {
        ...shop,
        product: entry?.product ?? null,
        price: entry?.price.actual_price ?? null,
        shopPrice: entry?.price ?? null,
      };
    });
  }, [shopPrices]);

  // All shops tied for the lowest matching price are considered cheapest (not just
  // whichever one happens to come first in SHOPS order).
  const cheapestShopIds = useMemo(() => {
    const prices = shopResults
      .map((shop) => shop.price)
      .filter((price): price is number => price !== null);
    if (prices.length === 0) return new Set<number>();
    const minPrice = Math.min(...prices);
    return new Set(
      shopResults
        .filter(
          (shop) =>
            shop.price !== null &&
            Math.abs(shop.price - minPrice) < PRICE_EPSILON,
        )
        .map((shop) => shop.id),
    );
  }, [shopResults]);

  return {
    shopResults,
    cheapestShopIds,
    hasMatches: shopPrices.length > 0,
    isLoading,
    isError,
  };
}
