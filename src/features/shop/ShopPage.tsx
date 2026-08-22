import React from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { useProducts } from './hooks/useProducts';
import { CategoryFilter } from './components/CategoryFilter';
import { ProductGrid } from './components/ProductGrid';

const CATEGORIES = ['all', 'Earphone', 'Gadget', 'Laptop', 'Console', 'Oculus', 'Speakers'];

export const ShopPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedCategory = searchParams.get('category') || 'all';

  const { data: products = [], isLoading, isError, error } = useProducts(selectedCategory);

  const handleCategoryChange = (catId: string) => {
    if (catId === 'all') {
      setSearchParams({});
    } else {
      setSearchParams({ category: catId });
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center gap-2 text-xs sm:text-sm text-gray-500 dark:text-gray-400 mb-8">
        <Link to="/" className="hover:text-red-600 transition-colors">Home</Link>
        <ChevronRight size={14} />
        <span className="text-gray-900 dark:text-white font-bold capitalize">
          Shop {selectedCategory !== 'all' && `/ ${selectedCategory}`}
        </span>
      </nav>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar Filter Component */}
        <CategoryFilter
          categories={CATEGORIES}
          selectedCategory={selectedCategory}
          onSelectCategory={handleCategoryChange}
        />

        {/* Product Grid Content Component */}
        <main className="flex-1">
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
