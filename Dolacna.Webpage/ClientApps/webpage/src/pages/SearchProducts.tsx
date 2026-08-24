import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery, keepPreviousData } from '@tanstack/react-query';
import {
  SlidersHorizontal,
  ChevronLeft,
  ChevronRight,
  Loader2,
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
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

const PRODUCTS_LIMIT = 20;
const VISIBLE_PRODUCTS_COUNT = 0;
const SKELETON_KEYS = Array.from(
  { length: PRODUCTS_LIMIT },
  (_, i) => `product-skeleton-${i}`,
);

const SearchProducts = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(
    null,
  );
  const [page, setPage] = useState(1);

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
    queryKey: ['products', selectedCategoryId, page],
    queryFn: () =>
      fetchProducts({
        categoryId: selectedCategoryId ?? undefined,
        limit: PRODUCTS_LIMIT,
        offset: (page - 1) * PRODUCTS_LIMIT,
      }),
    placeholderData: keepPreviousData,
  });

  const allProducts = productsQuery.data?.products ?? [];
  const visibleProducts = allProducts.slice(0, VISIBLE_PRODUCTS_COUNT);
  const hiddenProducts = allProducts.slice(VISIBLE_PRODUCTS_COUNT);

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
        <div className="mb-6 flex justify-end">
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

            {productsQuery.isFetching && !productsQuery.isLoading && (
              <div className="flex items-center justify-center gap-2 py-4 text-sm text-muted-foreground">
                <Loader2 className="h-4 w-4 animate-spin" />
                {t('searchProductsPage.loading')}
              </div>
            )}

            {productsQuery.isError && (
              <p className="text-sm text-destructive">
                {t('searchProductsPage.loadErrorProducts')}
              </p>
            )}

            {productsQuery.data && (
              <>
                {allProducts.length === 0 ? (
                  <p className="py-12 text-center text-muted-foreground">
                    {t('searchProductsPage.noResults')}
                  </p>
                ) : (
                  <>
                    {visibleProducts.length > 0 && (
                      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                        {visibleProducts.map((shopProduct) => (
                          <ProductCard
                            key={shopProduct.detail.id}
                            shopProduct={shopProduct}
                          />
                        ))}
                      </div>
                    )}

                    {hiddenProducts.length > 0 && (
                      <div className="relative mt-4">
                        <div
                          aria-hidden="true"
                          className="grid grid-cols-2 gap-4 blur-sm select-none sm:grid-cols-3 lg:grid-cols-4"
                        >
                          {hiddenProducts.map((shopProduct) => (
                            <ProductCard
                              key={shopProduct.detail.id}
                              shopProduct={shopProduct}
                            />
                          ))}
                        </div>
                        <div className="absolute inset-x-0 top-0 flex justify-center p-6">
                          <div className="flex flex-col items-center gap-3 rounded-lg border border-white/40 bg-white/20 p-6 text-center shadow-lg backdrop-blur-md">
                            <p className="font-semibold text-foreground">
                              {t('searchProductsPage.moreProductsTitle')}
                            </p>
                            <p className="max-w-xs text-sm text-muted-foreground">
                              {t('searchProductsPage.moreProductsSubtitle')}
                            </p>
                            <Button onClick={() => navigate('/Download')}>
                              {t('download_now')}
                            </Button>
                          </div>
                        </div>
                      </div>
                    )}

                    <div className="mt-8 flex items-center justify-center gap-4">
                      <Button variant="outline" size="sm" disabled>
                        <ChevronLeft className="h-4 w-4" />
                        {t('searchProductsPage.previousPage')}
                      </Button>
                      <span className="text-sm text-muted-foreground">
                        {t('searchProductsPage.pageIndicator', { page })}
                      </span>
                      <Button variant="outline" size="sm" disabled>
                        {t('searchProductsPage.nextPage')}
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </>
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
