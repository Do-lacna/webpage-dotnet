import { fetchCategories } from '@/lib/catalogApi';
import { keepPreviousData, useQuery } from '@tanstack/react-query';

// Matching is done server-side via the category_name query param.
export function useCategorySearch(query: string) {
  const term = query.trim();
  const { data, isFetching, isError } = useQuery({
    queryKey: ['categories', term],
    queryFn: () => fetchCategories(term),
    enabled: term.length > 0,
    staleTime: 5 * 60 * 1000,
    placeholderData: keepPreviousData,
  });

  return {
    suggestions: term ? (data?.categories ?? []) : [],
    isLoading: isFetching,
    isError,
  };
}
