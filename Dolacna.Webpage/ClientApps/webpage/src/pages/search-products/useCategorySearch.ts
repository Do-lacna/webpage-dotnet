import { type CategoryDto, fetchCategories } from '@/lib/catalogApi';
import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';

export const ALLOWED_ROOT_CATEGORIES = new Set([
  'maso a ryby',
  'mliecne vyrobky a vajcia',
  'ovocie a zelenina',
  'pecivo',
  'trvanlive potraviny',
  'vegan',
  'udeniny a lahodky',
]);

export const normalizeText = (text: string) =>
  text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim();

export function isAllowedCategory(category: CategoryDto): boolean {
  if (category.path_from_root && category.path_from_root.length > 0) {
    const rootName = normalizeText(category.path_from_root[0]);
    return ALLOWED_ROOT_CATEGORIES.has(rootName);
  }
  if (category.name) {
    return ALLOWED_ROOT_CATEGORIES.has(normalizeText(category.name));
  }
  return false;
}

export function useCategorySearch(query: string, maxSuggestions = 8) {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['categories'],
    queryFn: fetchCategories,
    staleTime: 5 * 60 * 1000,
  });

  const categories = useMemo(
    () =>
      (data?.categories ?? []).filter(
        (category) =>
          category.is_purchasable !== false && isAllowedCategory(category),
      ),
    [data],
  );

  const suggestions = useMemo(() => {
    const normalizedQuery = normalizeText(query);
    if (!normalizedQuery) return [];
    return categories
      .filter((category) => {
        const nameMatch =
          category.name &&
          normalizeText(category.name).includes(normalizedQuery);
        const pathMatch = category.path_from_root?.some((segment) =>
          normalizeText(segment).includes(normalizedQuery),
        );
        return Boolean(nameMatch || pathMatch);
      })
      .slice(0, maxSuggestions);
  }, [categories, query, maxSuggestions]);

  return {
    categories,
    suggestions,
    isLoading,
    isError,
  };
}
