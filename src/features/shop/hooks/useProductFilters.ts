import { useSearchParams } from 'react-router-dom';
import { useCallback } from 'react';

export function useProductFilters() {
  const [searchParams, setSearchParams] = useSearchParams();

  const filters = {
    search: searchParams.get('q') || '',
    category: searchParams.get('category') || 'all',
    minPrice: searchParams.get('minPrice') ? Number(searchParams.get('minPrice')) : 0,
    maxPrice: searchParams.get('maxPrice') ? Number(searchParams.get('maxPrice')) : 2000,
    inStock: searchParams.get('inStock') === 'true',
    sortBy: searchParams.get('sortBy') || 'featured',
  };

  const updateFilter = useCallback((key: string, value: string | number | boolean | null) => {
    setSearchParams((prev) => {
      const newParams = new URLSearchParams(prev);
      if (value === null || value === '' || value === 'all' || value === false) {
        newParams.delete(key);
      } else {
        newParams.set(key, String(value));
      }
      return newParams;
    }, { replace: true });
  }, [setSearchParams]);

  const clearFilters = useCallback(() => {
    setSearchParams(new URLSearchParams(), { replace: true });
  }, [setSearchParams]);

  return { filters, updateFilter, clearFilters };
}