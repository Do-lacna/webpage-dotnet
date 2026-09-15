import { useCallback, useState } from 'react';

const STORAGE_KEY = 'usetriCategorySearchCount';
export const SEARCH_LIMIT = 3;

function readStoredCount(): number {
  if (typeof window === 'undefined') return 0;
  const raw = window.localStorage.getItem(STORAGE_KEY);
  const parsed = raw ? Number(raw) : 0;
  return Number.isFinite(parsed) && parsed > 0 ? parsed : 0;
}

// Tracks how many category searches the visitor has used (persisted in
// localStorage so the limit survives page reloads), and gates further
// searches once SEARCH_LIMIT is reached.
export function useSearchLimit() {
  const [searchCount, setSearchCount] = useState(readStoredCount);

  const isLimitReached = searchCount >= SEARCH_LIMIT;
  const remainingSearches = Math.max(SEARCH_LIMIT - searchCount, 0);

  const registerSearch = useCallback(() => {
    setSearchCount((prev) => {
      const next = prev + 1;
      window.localStorage.setItem(STORAGE_KEY, String(next));
      return next;
    });
  }, []);

  return { searchCount, remainingSearches, isLimitReached, registerSearch };
}
