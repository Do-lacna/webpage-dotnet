import Footer from '@/components/layout/Footer';
import Header from '@/components/layout/Header';
import Seo from '@/components/Seo';
import { Input } from '@/components/ui/input';
import {
  fetchCategories,
  fetchProducts,
  type ShopPriceDto,
  type ShopProductDto,
} from '@/lib/catalogApi';
import { useQuery } from '@tanstack/react-query';
import { Search } from 'lucide-react';
import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom';
import {
  buildMainCategoryGroups,
  flattenLeafCategories,
  normalizeName,
} from './categoryGroups';
import CategorySidebar from './components/CategorySidebar';
import ProductResultCard, {
  ProductResultCardSkeleton,
} from './components/ProductResultCard';

const PAGE_SIZE = 24;
const SKELETON_KEYS = Array.from(
  { length: PAGE_SIZE },
  (_, index) => `product-skeleton-${index}`,
);

// Confirmed shop id -> name mapping (see /shops endpoint).
const SHOP_NAMES: Record<number, string> = {
  1: 'Lidl',
  2: 'Billa',
  3: 'Kaufland',
  4: 'Tesco',
};
const SHOP_IDS = [1, 2, 3, 4];

interface ShopColumnEntry {
  product: ShopProductDto;
  shopPrice: ShopPriceDto;
}

const getEffectivePrice = (shopPrice: ShopPriceDto) =>
  shopPrice.discount_price?.price ?? shopPrice.actual_price;

const getSubcategoryId = (product: ShopProductDto) => {
  const path = product.detail.category?.path_from_root_numeric;
  return path?.[1] ?? path?.[0] ?? product.detail.category?.id;
};

const SearchProducts = () => {
  const { t } = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();

  const categoryParam = searchParams.get('category');
  const selectedCategoryId = categoryParam ? Number(categoryParam) : undefined;

  const [searchInput, setSearchInput] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [focusCategoryId, setFocusCategoryId] = useState<number>();

  const handleSelectCategory = (categoryId: number | undefined) => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      if (categoryId !== undefined) next.set('category', String(categoryId));
      else next.delete('category');
      return next;
    });
  };

  const handlePickSearchResult = (categoryId: number) => {
    handleSelectCategory(categoryId);
    setFocusCategoryId(categoryId);
    setSearchInput('');
    setIsSearchOpen(false);
  };

  const categoriesQuery = useQuery({
    queryKey: ['categories'],
    queryFn: fetchCategories,
    staleTime: 10 * 60 * 1000,
  });

  const mainCategoryGroups = useMemo(
    () => buildMainCategoryGroups(categoriesQuery.data?.categories ?? []),
    [categoriesQuery.data],
  );

  const leafCategoryOptions = useMemo(
    () => flattenLeafCategories(mainCategoryGroups),
    [mainCategoryGroups],
  );

  const searchResults = useMemo(() => {
    const query = normalizeName(searchInput);
    if (!query) return [];
    return leafCategoryOptions
      .filter((option) => normalizeName(option.label).includes(query))
      .slice(0, 20);
  }, [leafCategoryOptions, searchInput]);

  // Query key already includes the selected category, so react-query starts
  // a fresh result set whenever the category changes.
  const productsQuery = useQuery({
    queryKey: ['products', selectedCategoryId],
    queryFn: () =>
      fetchProducts({
        categoryId: selectedCategoryId,
        limit: PAGE_SIZE,
        offset: 0,
      }),
  });

  const products = productsQuery.data?.products ?? [];

  // For each subcategory, keep only the cheapest product per shop, using
  // every shop price on the product DTO (not just its first entry), then
  // bucket the results into one column per shop.
  const productsByShopId = useMemo(() => {
    const bestByKey = new Map<string, ShopColumnEntry & { price: number }>();

    for (const product of products) {
      const subcategoryId = getSubcategoryId(product);

      for (const shopPrice of product.shops_prices ?? []) {
        const price = getEffectivePrice(shopPrice);
        const key = `${subcategoryId}-${shopPrice.shop_id}`;

        const existing = bestByKey.get(key);
        if (!existing || price < existing.price) {
          bestByKey.set(key, { product, shopPrice, price });
        }
      }
    }

    const entriesByShopId = new Map<number, ShopColumnEntry[]>();
    for (const shopId of SHOP_IDS) entriesByShopId.set(shopId, []);

    for (const { product, shopPrice } of bestByKey.values()) {
      entriesByShopId.get(shopPrice.shop_id)?.push({ product, shopPrice });
    }

    return entriesByShopId;
  }, [products]);

  const hasAnyResults = SHOP_IDS.some(
    (shopId) => (productsByShopId.get(shopId)?.length ?? 0) > 0,
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-brand-background via-slate-50 to-brand-background">
      <Seo
        title={t('seo.searchProducts.title')}
        description={t('seo.searchProducts.description')}
        path="/SearchProducts"
      />
      <Header />

      <section className="pt-28 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-brand-indigo mb-3">
              {t('searchProductsPage.title')}
            </h1>
            <p className="text-muted-foreground text-base md:text-lg">
              {t('searchProductsPage.subtitle')}
            </p>
          </div>

          <div className="max-w-2xl mx-auto mb-10 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              value={searchInput}
              onChange={(e) => {
                setSearchInput(e.target.value);
                setIsSearchOpen(e.target.value.trim().length > 0);
              }}
              onFocus={() => setIsSearchOpen(searchInput.trim().length > 0)}
              onBlur={() => setTimeout(() => setIsSearchOpen(false), 150)}
              placeholder={t('searchProductsPage.searchPlaceholder')}
              className="pl-10 h-12 text-base"
            />
            {isSearchOpen && (
              <div className="absolute z-20 mt-2 w-full max-h-80 overflow-y-auto rounded-lg border border-slate-100 bg-white shadow-lg">
                {searchResults.length === 0 ? (
                  <p className="px-4 py-3 text-sm text-muted-foreground">
                    {t('searchProductsPage.noCategoryMatches')}
                  </p>
                ) : (
                  searchResults.map((option) => (
                    <button
                      key={option.id}
                      type="button"
                      onMouseDown={(e) => e.preventDefault()}
                      onClick={() => handlePickSearchResult(option.id)}
                      className="block w-full truncate px-4 py-2 text-left text-sm text-slate-700 transition-colors hover:bg-brand-primary/10 hover:text-brand-indigo"
                    >
                      {option.label}
                    </button>
                  ))
                )}
              </div>
            )}
          </div>

          <div className="flex flex-col md:flex-row gap-8 items-start">
            <CategorySidebar
              title={t('searchProductsPage.categoriesTitle')}
              groups={mainCategoryGroups}
              selectedCategoryId={selectedCategoryId}
              onSelect={handleSelectCategory}
              isLoading={categoriesQuery.isLoading}
              focusCategoryId={focusCategoryId}
            />

            <main className="flex-1 min-w-0 w-full">
              {productsQuery.isError ? (
                <p className="text-center text-destructive py-12">
                  {t('searchProductsPage.errorLoading')}
                </p>
              ) : (
                <>
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    {SHOP_IDS.map((shopId) => (
                      <div key={shopId} className="flex flex-col gap-3">
                        <h3 className="text-sm font-bold uppercase tracking-wide text-brand-indigo text-center">
                          {SHOP_NAMES[shopId] ?? `Shop ${shopId}`}
                        </h3>
                        <div className="flex flex-col gap-4">
                          {productsQuery.isLoading
                            ? SKELETON_KEYS.slice(0, 6).map((key) => (
                                <ProductResultCardSkeleton
                                  key={`${shopId}-${key}`}
                                />
                              ))
                            : productsByShopId
                                .get(shopId)
                                ?.map(({ product, shopPrice }) => (
                                  <ProductResultCard
                                    key={`${shopId}-${product.detail.id}`}
                                    product={product}
                                    shopPrice={shopPrice}
                                  />
                                ))}
                        </div>
                      </div>
                    ))}
                  </div>

                  {!productsQuery.isLoading && !hasAnyResults && (
                    <p className="text-center text-muted-foreground py-12">
                      {t('searchProductsPage.noResults')}
                    </p>
                  )}
                </>
              )}
            </main>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default SearchProducts;
