import React from 'react';
import { Filter } from 'lucide-react';

interface CategoryFilterProps {
  categories: string[];
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

export const CategoryFilter: React.FC<CategoryFilterProps> = ({
  categories,
  selectedCategory,
  onSelectCategory,
}) => {
  return (
    <aside className="w-full lg:w-64 shrink-0">
      <div className="bg-gray-50 dark:bg-gray-800/50 p-5 rounded-3xl border border-gray-100 dark:border-gray-800">
        <div className="flex items-center gap-2 text-base font-bold text-gray-900 dark:text-white mb-4">
          <Filter size={18} className="text-red-600" />
          <span>Categories</span>
        </div>

        <div className="flex flex-col space-y-2">
          {categories.map((catId) => {
            const isActive = selectedCategory.toLowerCase() === catId.toLowerCase();
            return (
              <button
                key={catId}
                onClick={() => onSelectCategory(catId)}
                className={`text-left px-4 py-2.5 rounded-2xl text-sm font-semibold transition-all cursor-pointer ${
                  isActive
                    ? 'bg-red-600 text-white shadow-md'
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-200/50 dark:hover:bg-gray-700/50'
                }`}
              >
                {catId === 'all' ? 'All Products' : catId}
              </button>
            );
          })}
        </div>
      </div>
    </aside>
  );
};