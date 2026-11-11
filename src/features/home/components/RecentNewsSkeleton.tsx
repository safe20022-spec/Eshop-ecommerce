import React from 'react';

export const RecentNewsSkeleton: React.FC = () => {
  return (
    <section className="w-full px-4 sm:px-6 md:px-12 py-12 md:py-16">
      <div className="max-w-7xl mx-auto animate-pulse">
        
        {/* Header Skeleton */}
        <div className="flex flex-col items-center text-center space-y-3 mb-10 md:mb-12">
          <div className="h-8 w-48 bg-gray-200 dark:bg-gray-800 rounded-lg" />
          <div className="h-4 w-72 bg-gray-200 dark:bg-gray-800 rounded-md" />
        </div>

        {/* Grid Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {[1, 2, 3].map((item) => (
            <div 
              key={item} 
              className="bg-gray-100 dark:bg-gray-800/40 rounded-3xl p-4 sm:p-5 flex flex-col space-y-4 h-96 border border-gray-200/50 dark:border-gray-800"
            >
              {/* Image Skeleton */}
              <div className="w-full h-48 bg-gray-200 dark:bg-gray-700/50 rounded-2xl" />
              
              {/* Content Skeletons */}
              <div className="space-y-2 flex-1">
                <div className="h-4 w-1/3 bg-gray-200 dark:bg-gray-700/50 rounded" />
                <div className="h-6 w-full bg-gray-200 dark:bg-gray-700/50 rounded" />
                <div className="h-4 w-5/6 bg-gray-200 dark:bg-gray-700/50 rounded" />
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};