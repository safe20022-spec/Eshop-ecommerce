import React from 'react';
import { AlertCircle } from 'lucide-react';
import { ProductCard } from './ProductCard';
import type { Product } from '../data/mockProducts';

const ProductSkeleton = () => (
  <div className="bg-gray-100 dark:bg-gray-800 animate-pulse rounded-3xl h-[320px] w-full" />
);

interface ProductGridProps {
  products: Product[];
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
}

export const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  isLoading,
  isError,
  error,
}) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, index) => (
          <ProductSkeleton key={index} />
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-red-500 gap-2">
        <AlertCircle size={36} />
        <p className="font-semibold">{error?.message || 'Server Error'}</p>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500 font-medium">
        Can Not Find Products For This Category
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};