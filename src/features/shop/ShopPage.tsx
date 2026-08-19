import React from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { ProductCard } from './components/ProductCard';
import { ChevronRight, Filter, AlertCircle } from 'lucide-react';
import { useProducts } from './hooks/useProducts';

const ProductSkeleton = () => (
  <div className="bg-gray-100 dark:bg-gray-800 animate-pulse rounded-3xl h-[320px] w-full" />
);

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

  const categories = ['all', 'Earphone', 'Gadget', 'Laptop', 'Console', 'Oculus', 'Speakers'];

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
        
        {/* Sidebar Filter */}
        <aside className="w-full lg:w-64 shrink-0">
          <div className="bg-gray-50 dark:bg-gray-800/50 p-5 rounded-3xl border border-gray-100 dark:border-gray-800">
            <div className="flex items-center gap-2 text-base font-bold text-gray-900 dark:text-white mb-4">
              <Filter size={18} className="text-red-600" />
              <span>Categories</span>
            </div>
            
            <div className="flex flex-col space-y-2">
              {categories.map((catId) => (
                <button
                  key={catId}
                  onClick={() => handleCategoryChange(catId)}
                  className={`text-left px-4 py-2.5 rounded-2xl text-sm font-semibold transition-all cursor-pointer ${
                    selectedCategory.toLowerCase() === catId.toLowerCase()
                      ? 'bg-red-600 text-white shadow-md'
                      : 'text-gray-600 dark:text-gray-300 hover:bg-gray-200/50 dark:hover:bg-gray-700/50'
                  }`}
                >
                  {catId === 'all' ? 'All Products' : catId}
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* Grid Content */}
        <main className="flex-1">
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, index) => (
                <ProductSkeleton key={index} />
              ))}
            </div>
          ) : isError ? (
            <div className="flex flex-col items-center justify-center py-12 text-red-500 gap-2">
              <AlertCircle size={36} />
              <p className="font-semibold">
                {(error as Error)?.message || 'Server Error'}
              </p>
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-12 text-gray-500 font-medium">
             Can Not Find Products For This Category
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </main>

      </div>
    </div>
  );
};