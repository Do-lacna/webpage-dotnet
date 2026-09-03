import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { useDebouncedValue } from '@/hooks/use-debounced-value';
import { type CategoryDto, fetchCategories } from '@/lib/catalogApi';
import { useQuery } from '@tanstack/react-query';
import { Loader2, Search } from 'lucide-react';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

interface CategoryAutocompleteProps {
  onSelectCategory: (category: CategoryDto) => void;
}

const MAX_SUGGESTIONS = 8;

const CategoryAutocomplete = ({
  onSelectCategory,
}: CategoryAutocompleteProps) => {
  const { t } = useTranslation();
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const debouncedQuery = useDebouncedValue(query, 200);
  const containerRef = useRef<HTMLDivElement>(null);

  // Leaf categories only come back from the API in a single (large) page, so
  // fetch once and filter on the client as the user types.
  const { data, isLoading } = useQuery({
    queryKey: ['categories'],
    queryFn: fetchCategories,
    staleTime: 5 * 60 * 1000,
  });

  const categories = useMemo(
    () =>
      (data?.categories ?? []).filter((category) => category.is_purchasable),
    [data],
  );

  const suggestions = useMemo(() => {
    const trimmed = debouncedQuery.trim().toLowerCase();
    if (!trimmed) return [];
    return categories
      .filter((category) => category.name?.toLowerCase().includes(trimmed))
      .slice(0, MAX_SUGGESTIONS);
  }, [categories, debouncedQuery]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (category: CategoryDto) => {
    setQuery(category.name ?? '');
    setIsOpen(false);
    onSelectCategory(category);
  };

  return (
    <div ref={containerRef} className="relative mx-auto w-full max-w-xl">
      <Command shouldFilter={false} className="overflow-visible bg-transparent">
        <div className="flex items-center gap-3 rounded-full border border-brand-lilac/40 bg-white px-5 py-4 shadow-lg transition-shadow focus-within:shadow-xl">
          <Search className="h-5 w-5 shrink-0 text-brand-primary" />
          <input
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
              setIsOpen(true);
            }}
            onFocus={() => setIsOpen(true)}
            placeholder={t('categorySearch.searchPlaceholder')}
            className="w-full bg-transparent text-base text-brand-indigo outline-none placeholder:text-brand-indigo/40"
          />
          {isLoading && (
            <Loader2 className="h-4 w-4 shrink-0 animate-spin text-brand-indigo/40" />
          )}
        </div>

        {isOpen && query.trim().length > 0 && (
          <CommandList className="absolute top-full z-20 mt-2 w-full max-h-80 overflow-y-auto rounded-2xl border border-brand-lilac/40 bg-white p-2 shadow-xl">
            {suggestions.length === 0 ? (
              <p className="px-3 py-4 text-center text-sm text-brand-indigo/50">
                {t('categorySearch.noResults')}
              </p>
            ) : (
              <CommandGroup>
                {suggestions.map((category) => (
                  <CommandItem
                    key={category.id}
                    value={String(category.id)}
                    onSelect={() => handleSelect(category)}
                    className="cursor-pointer rounded-xl px-3 py-2.5 text-brand-indigo data-[selected=true]:bg-brand-nude"
                  >
                    {category.name}
                  </CommandItem>
                ))}
              </CommandGroup>
            )}
          </CommandList>
        )}
      </Command>
    </div>
  );
};

export default CategoryAutocomplete;
