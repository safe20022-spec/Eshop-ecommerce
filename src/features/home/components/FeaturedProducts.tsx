import React from 'react';
import { useInView } from 'react-intersection-observer';
import { FeaturedProductCard } from './FeaturedProductCard';
import { ProductsSkeletonLoader } from './ProductsSkeletonLoader';
import { useFeaturedProducts } from '../hooks/useFeaturedProducts';

export const FeaturedProducts: React.FC = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  

  const { data: featuredProducts, isLoading, isError } = useFeaturedProducts(inView);

  if (!inView) {
    return <div ref={ref} className="min-h-[400px]" />;
  }

  if (isLoading) {
    return (
      <div ref={ref}>
        <ProductsSkeletonLoader />
      </div>
    );
  }

  if (isError || !featuredProducts || featuredProducts.length === 0) {
    return null;
  }

  return (
    <section ref={ref} className="w-full px-4 sm:px-6 md:px-12 py-12" aria-labelledby="featured-products-heading">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center space-y-2 mb-10">
          <span className="text-red-600 font-bold text-sm tracking-wider uppercase">
            Best Products
          </span>
          <h2 
            id="featured-products-heading" 
            className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight"
          >
            Featured Products
          </h2>
          <div className="w-16 h-1 bg-red-600 rounded-full mt-1" aria-hidden="true" />
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <FeaturedProductCard key={product.id} product={product} />
          ))}
        </div>

      </div>
    </section>
  );
};