import { useEffect, useState } from 'react';
import { useQuery, keepPreviousData } from '@tanstack/react-query';
import {
  Search,
  SlidersHorizontal,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import CategorySidebar from '@/components/search-products/CategorySidebar';
import ProductCard from '@/components/search-products/ProductCard';
import { fetchCategories, fetchProducts } from '@/lib/catalogApi';

const PAGE_SIZE = 20;
const SKELETON_KEYS = Array.from(
  { length: PAGE_SIZE },
  (_, i) => `product-skeleton-${i}`,
);

const SearchProducts = () => {
  const { t } = useTranslation();
  const [searchInput, setSearchInput] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(
    null,
  );
  const [page, setPage] = useState(1);

  // Debounce the free-text search so we don't spam the API on every keystroke.
  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedSearch(searchInput.trim());
      setPage(1);
    }, 400);
    return () => clearTimeout(timeout);
  }, [searchInput]);

  const handleSelectCategory = (categoryId: number | null) => {
    setSelectedCategoryId(categoryId);
    setPage(1);
  };

  const categoriesQuery = useQuery({
    queryKey: ['categories'],
    queryFn: fetchCategories,
    staleTime: 5 * 60 * 1000,
  });

  const productsQuery = useQuery({
    queryKey: ['products', debouncedSearch, selectedCategoryId, page],
    queryFn: () =>
      fetchProducts({
        search: debouncedSearch || undefined,
        categoryId: selectedCategoryId ?? undefined,
        limit: PAGE_SIZE,
        offset: (page - 1) * PAGE_SIZE,
      }),
    placeholderData: keepPreviousData,
  });

  // The API's `count` field only reflects the number of items in the current
  // page (not the total match count), so we can't compute a real page total.
  // Instead we detect a next page by checking whether this page was full.
  const hasNextPage = (productsQuery.data?.products?.length ?? 0) === PAGE_SIZE;

  const sidebarContent = (
    <CategorySidebar
      categories={categoriesQuery.data?.categories ?? undefined}
      isLoading={categoriesQuery.isLoading}
      isError={categoriesQuery.isError}
      selectedCategoryId={selectedCategoryId}
      onSelectCategory={handleSelectCategory}
    />
  );

  return (
    <div className="min-h-screen bg-brand-background flex flex-col">
      <Header />

      <main className="flex-1 container mx-auto px-4 pt-24 pb-16">
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder={t('searchProductsPage.searchPlaceholder')}
              className="pl-9"
            />
          </div>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" className="sm:hidden">
                <SlidersHorizontal className="h-4 w-4" />
                {t('searchProductsPage.categoriesLabel')}
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-80 overflow-y-auto">
              <SheetHeader>
                <SheetTitle>
                  {t('searchProductsPage.categoriesLabel')}
                </SheetTitle>
              </SheetHeader>
              <div className="mt-4">{sidebarContent}</div>
            </SheetContent>
          </Sheet>
        </div>

        <div className="flex gap-8">
          <aside className="hidden w-64 shrink-0 sm:block">
            <div className="sticky top-24 max-h-[calc(100vh-7rem)] overflow-y-auto pr-2">
              {sidebarContent}
            </div>
          </aside>

          <div className="flex-1">
            {productsQuery.isLoading && (
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                {SKELETON_KEYS.map((key) => (
                  <Skeleton key={key} className="h-64 w-full" />
                ))}
              </div>
            )}

            {productsQuery.isError && (
              <p className="text-sm text-destructive">
                {t('searchProductsPage.loadErrorProducts')}
              </p>
            )}

            {productsQuery.data && (
              <>
                {productsQuery.data.products?.length ? (
                  <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                    {productsQuery.data.products.map((shopProduct) => (
                      <ProductCard
                        key={shopProduct.detail.id}
                        shopProduct={shopProduct}
                      />
                    ))}
                  </div>
                ) : (
                  <p className="py-12 text-center text-muted-foreground">
                    {t('searchProductsPage.noResults')}
                  </p>
                )}

                {(page > 1 || hasNextPage) && (
                  <div className="mt-8 flex items-center justify-center gap-4">
                    <Button
                      variant="outline"
                      size="sm"
                      disabled={page <= 1}
                      onClick={() => setPage((p) => Math.max(1, p - 1))}
                    >
                      <ChevronLeft className="h-4 w-4" />
                      {t('searchProductsPage.previousPage')}
                    </Button>
                    <span className="text-sm text-muted-foreground">
                      {t('searchProductsPage.pageIndicator', { page })}
                    </span>
                    <Button
                      variant="outline"
                      size="sm"
                      disabled={!hasNextPage}
                      onClick={() => setPage((p) => p + 1)}
                    >
                      {t('searchProductsPage.nextPage')}
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default SearchProducts;
