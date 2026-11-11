import React from 'react';
import { CategoryCard } from './CategoryCard';
import { CATEGORY_BANNERS } from '../data/categoryBanners';

export const CategoryServices: React.FC = () => {
  return (
    <section 
      id="categories" 
      className="w-full px-4 sm:px-6 md:px-12 py-8 md:py-12"
      aria-label="Shop by Categories"
    >
      <div className="max-w-7xl mx-auto">
        {/* Optional Section Header for better UX/SEO */}
        <div className="mb-6 md:mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white tracking-tight">
            Explore Categories
          </h2>
          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mt-1">
            Browse our wide range of collections tailored just for you.
          </p>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {CATEGORY_BANNERS.map((item) => (
            <div
              key={item.id}
              className={`transition-all duration-300 ${
                item.isWide ? 'col-span-1 sm:col-span-2' : 'col-span-1'
              }`}
            >
              <CategoryCard item={item} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};