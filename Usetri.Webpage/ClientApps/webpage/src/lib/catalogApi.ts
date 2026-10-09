// Thin client for the Ušetri backend public "Query" endpoints used by the
// SearchProducts prototype. Calls go through this app's own /api proxy so the
// upstream catalog API host is never exposed to the browser.
const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ?? window.location.origin;

export interface UnitDto {
  original_amount: number;
  original_unit: string | null;
  normalized_amount: number;
  normalized_unit: string | null;
}

export interface CategoryDto {
  id: number;
  name: string | null;
  image_url: string | null;
}

// Full category shape as nested inside a ProductDto (richer than the
// search-list CategoryDto above, which the backend already curates/filters).
export interface ProductCategoryDto extends CategoryDto {
  parent_id: number | null;
  is_purchasable: boolean;
  popularity: number;
  default_amount: number | null;
  default_unit: string | null;
  is_general: boolean;
  path_from_root: string[] | null;
  path_from_root_numeric: number[] | null;
}

export interface DiscountPriceDto {
  price: number;
  percentage_discount: number;
  valid_from: string;
  valid_to: string;
  discount_type: 'Regular' | 'Bargain';
}

export interface ShopPriceDto {
  shop_id: number;
  price: number;
  normalized_price: number;
  actual_price: number;
  normalized_actual_price: number;
  discount_price: DiscountPriceDto | null;
  valid_from: string | null;
  valid_to: string | null;
  price_updated_at: string;
}

export interface ProductDto {
  id: number;
  barcodes: string[] | null;
  name: string | null;
  brand: string | null;
  unit: UnitDto;
  image_url: string | null;
  category: ProductCategoryDto;
  is_category_checked: boolean;
  is_free_weight_product: boolean;
  created_at: string;
  external_shop_ids: Record<string, string> | null;
}

// One shop's best-matching product + price for a category, already resolved server-side.
export interface ShopCategoryPriceDto {
  shop_id: number;
  product: ProductDto;
  price: ShopPriceDto;
  product_id: number;
}

export interface GetCategoriesResponse {
  categories: CategoryDto[] | null;
}

export interface GetCategoryPricesResponse {
  shop_prices: ShopCategoryPriceDto[] | null;
}

async function catalogFetch<T>(
  path: string,
  params: Record<string, string | number | undefined> = {},
): Promise<T> {
  const url = new URL(path, API_BASE_URL);
  Object.entries(params).forEach(([key, value]) => {
    if (value === undefined || value === '') return;
    url.searchParams.set(key, String(value));
  });

  const response = await fetch(url.toString(), {
    headers: { Accept: 'application/json' },
  });
  if (!response.ok) {
    throw new Error(
      `Request to ${url.pathname} failed with status ${response.status}`,
    );
  }
  return response.json() as Promise<T>;
}

export function fetchCategories(
  categoryName: string,
): Promise<GetCategoriesResponse> {
  return catalogFetch<GetCategoriesResponse>('/api/categories', {
    category_name: categoryName,
  });
}

export function fetchCategoryPrices(
  categoryId: number,
): Promise<GetCategoryPricesResponse> {
  return catalogFetch<GetCategoryPricesResponse>(
    `/api/categories/${categoryId}/prices`,
  );
}
