import React from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { useProducts } from './hooks/useProducts';
import { ProductGrid } from './components/ProductGrid';
import { ProductFilters } from './components/ProductFilters';
import { SearchInput } from './components/SearchInput';
import { SortSelect } from './components/SortSelect';

const CATEGORIES = ['all', 'Earphone', 'Gadget', 'Laptop', 'Console', 'Oculus', 'Speakers'];

export const ShopPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const filters = {
    category: searchParams.get('category') || 'all',
    q: searchParams.get('q') || '',
    maxPrice: Number(searchParams.get('maxPrice')) || 2000,
    sortBy: searchParams.get('sortBy') || 'default',
  };

  const { data: products = [], isLoading, isError, error } = useProducts(filters);

  const updateParam = (key: string, value: string | null) => {
    setSearchParams((prev) => {
      const newParams = new URLSearchParams(prev);
      if (!value || value === 'all' || value === '') {
        newParams.delete(key);
      } else {
        newParams.set(key, value);
      }
      return newParams;
    });
  };

  const isFiltered =
    filters.category !== 'all' ||
    filters.q !== '' ||
    filters.maxPrice < 2000 ||
    filters.sortBy !== 'default';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <nav className="flex items-center gap-2 text-xs sm:text-sm text-gray-500 dark:text-gray-400 mb-8">
        <Link to="/" className="hover:text-red-600 transition-colors">Home</Link>
        <ChevronRight size={14} />
        <span className="text-gray-900 dark:text-white font-bold capitalize">
          Shop {filters.category !== 'all' && `/ ${filters.category}`}
        </span>
      </nav>

      <div className="flex flex-col lg:flex-row gap-8">
        <ProductFilters
          categories={CATEGORIES}
          selectedCategory={filters.category}
          maxPrice={filters.maxPrice}
          isFiltered={isFiltered}
          onSelectCategory={(cat) => updateParam('category', cat)}
          onPriceChange={(price) => updateParam('maxPrice', price)}
          onReset={() => setSearchParams({})}
        />

        <main className="flex-1 space-y-6">
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            <SearchInput
              value={filters.q}
              onChange={(val) => updateParam('q', val)}
            />
            <SortSelect
              value={filters.sortBy}
              onChange={(val) => updateParam('sortBy', val)}
            />
          </div>

          <ProductGrid
            products={products}
            isLoading={isLoading}
            isError={isError}
            error={error as Error | null}
          />
        </main>
      </div>
    </div>
  );
};
