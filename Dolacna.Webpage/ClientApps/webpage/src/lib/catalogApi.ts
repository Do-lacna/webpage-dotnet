// Thin client for the Ušetri backend public "Query" endpoints used by the
// SearchProducts prototype. Docs: https://api.usetrislovensko.sk/swagger/v1/swagger.json
//
// Note: the backend also exposes /admin/products and /admin/categories with
// richer data (available shops, cheapest price per category, etc.), but those
// require a Bearer JWT and return 401 without one. Since this is a public,
// unauthenticated page, we use the public /products and /categories endpoints
// instead, which return the same product/category shapes.
const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ?? 'https://api.usetrislovensko.sk';

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
  parent_id: number | null;
  is_purchasable: boolean;
  popularity: number;
  default_amount: number | null;
  default_unit: string | null;
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
}

export interface ProductDto {
  id: number;
  barcodes: string[] | null;
  name: string | null;
  brand: string | null;
  unit: UnitDto;
  image_url: string | null;
  category: CategoryDto;
  is_category_checked: boolean;
  is_free_weight_product: boolean;
  created_at: string;
  external_shop_ids: Record<string, string> | null;
}

export interface ShopProductDto {
  detail: ProductDto;
  shops_prices: ShopPriceDto[] | null;
}

export interface GetCategoriesResponse {
  count: number;
  categories: CategoryDto[] | null;
}

export interface GetProductsResponse {
  count: number;
  products: ShopProductDto[] | null;
}

export interface GetProductsParams {
  search?: string;
  categoryId?: number;
  limit?: number;
  offset?: number;
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

export function fetchCategories(): Promise<GetCategoriesResponse> {
  // Fetch a large page so the full category tree can be built client-side.
  return catalogFetch<GetCategoriesResponse>('/categories', {
    Limit: 1000,
    Offset: 0,
  });
}

export function fetchProducts(
  params: GetProductsParams,
): Promise<GetProductsResponse> {
  return catalogFetch<GetProductsResponse>('/products', {
    search: params.search,
    category_id: params.categoryId,
    Limit: params.limit,
    Offset: params.offset,
  });
}

// Root/intermediate categories aren't returned by /categories (only leaf
// categories are), but their images still live on the CDN at this path.
export function getCategoryImageUrl(categoryId: number): string {
  return `https://usetristorage.blob.core.windows.net/images/categories/${categoryId}.jpg`;
}
