import React from 'react';

export const NavbarSkeleton: React.FC = () => {
  return (
    <div className="flex items-center gap-3 animate-pulse">
      {/* User Avatar Skeleton */}
      <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700" />
      
      {/* User Name Skeleton */}
      <div className="hidden sm:block w-20 h-4 bg-gray-200 dark:bg-gray-700 rounded-md" />

      {/* Action Button Skeleton */}
      <div className="w-8 h-8 rounded-lg bg-gray-200 dark:bg-gray-700" />
    </div>
  );
};
