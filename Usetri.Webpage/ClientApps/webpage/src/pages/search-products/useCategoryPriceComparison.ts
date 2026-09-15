import {
  type CategoryDto,
  type ShopPriceDto,
  type ShopProductDto,
  fetchProducts,
} from '@/lib/catalogApi';
import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import { SHOPS, type ShopInfo } from './shopPricing';

const CANDIDATE_LIMIT = 100;

export interface ShopCheapestProduct extends ShopInfo {
  product: ShopProductDto | null;
  price: number | null;
  // Full matched price entry (carries discount_price), so the UI can show the
  // original price + discount badge when the cheapest match is discounted.
  shopPrice: ShopPriceDto | null;
}

// Only compare products that match the category's default amount/unit (e.g. all "1 L" milks),
// so shops aren't compared on differently-sized products. category.default_amount/default_unit
// use the same scale as unit.original_amount/original_unit (e.g. 0.405 L), NOT the
// normalized_amount/normalized_unit fields (which are in base units like Ml/G).
const AMOUNT_EPSILON = 0.001;

function matchesDefaultAmount(
  product: ShopProductDto,
  category: CategoryDto,
): boolean {
  if (category.default_amount == null || !category.default_unit) return true;
  const { original_amount, original_unit } = product.detail.unit;
  return (
    Math.abs(original_amount - category.default_amount) < AMOUNT_EPSILON &&
    original_unit?.toLowerCase() === category.default_unit.toLowerCase()
  );
}

export function useCategoryPriceComparison(category: CategoryDto) {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['products-by-category', category.id],
    queryFn: () =>
      fetchProducts({ categoryId: category.id, limit: CANDIDATE_LIMIT }),
  });

  const matchingProducts: ShopProductDto[] = useMemo(() => {
    const products = data?.products ?? [];
    return products.filter((product) =>
      matchesDefaultAmount(product, category),
    );
  }, [data?.products, category]);

  // Independently for each shop, find the cheapest matching product it carries —
  // different shops may end up showing different products.
  const shopResults: ShopCheapestProduct[] = useMemo(() => {
    return SHOPS.map((shop) => {
      let cheapestProduct: ShopProductDto | null = null;
      let cheapestPrice: number | null = null;
      let cheapestShopPrice: ShopPriceDto | null = null;
      for (const product of matchingProducts) {
        const shopPrice = product.shops_prices?.find(
          (sp) => sp.shop_id === shop.id,
        );
        if (shopPrice === undefined) continue;
        if (cheapestPrice === null || shopPrice.actual_price < cheapestPrice) {
          cheapestPrice = shopPrice.actual_price;
          cheapestProduct = product;
          cheapestShopPrice = shopPrice;
        }
      }
      return {
        ...shop,
        product: cheapestProduct,
        price: cheapestPrice,
        shopPrice: cheapestShopPrice,
      };
    });
  }, [matchingProducts]);

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
            Math.abs(shop.price - minPrice) < AMOUNT_EPSILON,
        )
        .map((shop) => shop.id),
    );
  }, [shopResults]);

  return {
    shopResults,
    cheapestShopIds,
    hasMatches: matchingProducts.length > 0,
    isLoading,
    isError,
  };
}
