import React from 'react';
import { ProductCard } from './ProductCard';
import { FEATURED_PRODUCTS } from '../data/productsData';

export const FeaturedProducts: React.FC = () => {
  return (
    <section className="w-full px-4 sm:px-6 md:px-12 py-12">
      <div className="max-w-7xl mx-auto">
        
        <div className="flex flex-col items-center text-center space-y-2 mb-10">
          <span className="text-red-600 font-bold text-sm tracking-wider uppercase">
            Best Products
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight">
            Featured Products
          </h2>
          <div className="w-16 h-1 bg-red-600 rounded-full mt-1" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {FEATURED_PRODUCTS.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

      </div>
    </section>
  );
};