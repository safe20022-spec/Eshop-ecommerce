import React from 'react';

export const ProductsSkeletonLoader: React.FC = () => {
  const skeletonItems = Array.from({ length: 4 });

  return (
    <section className="w-full px-4 sm:px-6 md:px-12 py-12">
      <div className="max-w-7xl mx-auto animate-pulse">
        
        {/* Section Header Skeleton */}
        <div className="flex flex-col items-center text-center space-y-2 mb-10">
          <div className="h-4 w-28 bg-gray-200 dark:bg-gray-700 rounded-full" />
          <div className="h-8 w-64 bg-gray-200 dark:bg-gray-700 rounded-lg" />
          <div className="w-16 h-1 bg-gray-200 dark:bg-gray-700 rounded-full mt-1" />
        </div>

        {/* Products Grid Skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {skeletonItems.map((_, index) => (
            <div 
              key={index} 
              className="bg-gray-50 dark:bg-gray-800/50 rounded-3xl p-4 sm:p-5 border border-gray-100 dark:border-gray-800 flex flex-col justify-between h-[360px]"
            >
              {/* Top Bar (Badge & Wishlist Icon) */}
              <div className="flex items-center justify-between w-full">
                <div className="h-6 w-12 bg-gray-200 dark:bg-gray-700 rounded-full" />
                <div className="w-9 h-9 bg-gray-200 dark:bg-gray-700 rounded-full" />
              </div>

              {/* Image Skeleton */}
              <div className="my-4 h-48 w-full bg-gray-200 dark:bg-gray-700 rounded-2xl" />

              {/* Details Skeleton */}
              <div className="flex flex-col space-y-2 mt-2">
                <div className="h-3 w-16 bg-gray-200 dark:bg-gray-700 rounded" />
                <div className="h-5 w-3/4 bg-gray-200 dark:bg-gray-700 rounded" />
                
                <div className="flex items-center justify-between pt-2">
                  <div className="h-6 w-16 bg-gray-200 dark:bg-gray-700 rounded" />
                  <div className="w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-2xl" />
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};