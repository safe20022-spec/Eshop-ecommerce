import React from 'react';
import { CategoryCard } from './CategoryCard';
import { CATEGORY_BANNERS } from '../data/categoryBanners';

export const CategoryServices: React.FC = () => {
  return (
    <section id="categories" className="w-full px-4 sm:px-6 md:px-12 py-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        {CATEGORY_BANNERS.map((item) => (
          <div
            key={item.id}
            className={item.isWide ? 'col-span-1 sm:col-span-2' : 'col-span-1'}
          >
            <CategoryCard item={item} />
          </div>
        ))}
      </div>
    </section>
  );
};