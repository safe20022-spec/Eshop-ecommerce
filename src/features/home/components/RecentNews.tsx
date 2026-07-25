import React from 'react';
import { BlogCard } from './BlogCard';
import { RECENT_NEWS_DATA } from '../data/blogsData';

export const RecentNews: React.FC = () => {
  return (
    <section className="w-full px-4 sm:px-6 md:px-12 py-12 md:py-16">
      <div className="max-w-7xl mx-auto">
        
        <div className="flex flex-col items-center text-center space-y-1 mb-10 md:mb-12">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight">
            Recent News
          </h2>
          <p className="text-xs sm:text-sm text-gray-400 dark:text-gray-500">
            Lorem ipsum dolor sit amet.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {RECENT_NEWS_DATA.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>

      </div>
    </section>
  );
};