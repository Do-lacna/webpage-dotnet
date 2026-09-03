import { useDebouncedValue } from '@/hooks/use-debounced-value';
import { type CategoryDto } from '@/lib/catalogApi';
import { Loader2, Search } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useCategorySearch } from './useCategorySearch';

interface CategoryAutocompleteProps {
  onSelectCategory: (category: CategoryDto) => void;
}

const CategoryAutocomplete = ({
  onSelectCategory,
}: CategoryAutocompleteProps) => {
  const { t } = useTranslation();
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const debouncedQuery = useDebouncedValue(query, 150);
  const containerRef = useRef<HTMLDivElement>(null);

  const { suggestions, isLoading } = useCategorySearch(debouncedQuery);

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
        <div className="absolute top-full z-20 mt-2 max-h-80 w-full overflow-y-auto rounded-2xl border border-brand-lilac/40 bg-white p-2 shadow-xl animate-fade-in">
          {suggestions.length === 0 ? (
            <p className="px-3 py-4 text-center text-sm text-brand-indigo/50">
              {t('categorySearch.noResults')}
            </p>
          ) : (
            <ul className="space-y-1">
              {suggestions.map((category) => {
                const breadcrumb =
                  category.path_from_root && category.path_from_root.length > 1
                    ? category.path_from_root.slice(0, -1).join(' > ')
                    : null;

                return (
                  <li key={category.id}>
                    <button
                      type="button"
                      onClick={() => handleSelect(category)}
                      className="flex w-full flex-col items-start rounded-xl px-3 py-2 text-left text-brand-indigo transition-colors hover:bg-brand-nude focus:bg-brand-nude focus:outline-none"
                    >
                      <span className="font-medium">{category.name}</span>
                      {breadcrumb && (
                        <span className="text-xs text-brand-indigo/50">
                          {breadcrumb}
                        </span>
                      )}
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default CategoryAutocomplete;
