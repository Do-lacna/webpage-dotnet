import {
  type CategoryDto,
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
}

// Only compare products that match the category's default amount/unit (e.g. all "1 L" milks),
// so shops aren't compared on differently-sized products.
function matchesDefaultAmount(
  product: ShopProductDto,
  category: CategoryDto,
): boolean {
  if (category.default_amount == null || !category.default_unit) return true;
  const { normalized_amount, normalized_unit } = product.detail.unit;
  return (
    normalized_amount === category.default_amount &&
    normalized_unit?.toLowerCase() === category.default_unit.toLowerCase()
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
      for (const product of matchingProducts) {
        const shopPrice = product.shops_prices?.find(
          (sp) => sp.shop_id === shop.id,
        )?.actual_price;
        if (shopPrice === undefined) continue;
        if (cheapestPrice === null || shopPrice < cheapestPrice) {
          cheapestPrice = shopPrice;
          cheapestProduct = product;
        }
      }
      return { ...shop, product: cheapestProduct, price: cheapestPrice };
    });
  }, [matchingProducts]);

  const cheapestShopId = useMemo(() => {
    return shopResults.reduce<number | null>((cheapestId, shop) => {
      if (shop.price === null) return cheapestId;
      const cheapest = shopResults.find((s) => s.id === cheapestId);
      if (cheapest?.price == null) return shop.id;
      return shop.price < cheapest.price ? shop.id : cheapestId;
    }, null);
  }, [shopResults]);

  return {
    shopResults,
    cheapestShopId,
    hasMatches: matchingProducts.length > 0,
    isLoading,
    isError,
  };
}
