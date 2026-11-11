import React from 'react';
import { useInView } from 'react-intersection-observer';
import { BlogCard } from './BlogCard';
import { RecentNewsSkeleton } from './RecentNewsSkeleton';
import { useBlogs } from '../hooks/useBlogs.ts';
import { AlertCircle, RotateCcw } from 'lucide-react';

export const RecentNews: React.FC = () => {
  const { ref, inView } = useInView({
    triggerOnce: true, 
    threshold: 0.1,
  });

  const { data: blogs, isLoading, isError, refetch, isRefetching } = useBlogs(inView);

  return (
    <div ref={ref} className="w-full">
      {!inView ? (
        <div className="py-16" /> 
      ) : isLoading || isRefetching ? (
        <RecentNewsSkeleton />
      ) : isError ? (
        <section className="w-full px-4 sm:px-6 md:px-12 py-12 md:py-16">
          <div className="max-w-md mx-auto text-center bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900/30 rounded-3xl p-8">
            <div className="w-12 h-12 bg-red-100 dark:bg-red-900/40 text-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertCircle size={24} />
            </div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">
              Failed to load news
            </h3>
            <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mb-6">
              Something went wrong while fetching the latest articles. Please try again.
            </p>
            <button
              onClick={() => refetch()}
              className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white text-sm font-semibold px-6 py-2.5 rounded-full shadow-md transition-all cursor-pointer"
            >
              <RotateCcw size={16} />
              Try Again
            </button>
          </div>
        </section>
      ) : (
        <section className="w-full px-4 sm:px-6 md:px-12 py-12 md:py-16" aria-labelledby="recent-news-heading">
          <div className="max-w-7xl mx-auto">
            
            {/* Section Header */}
            <div className="flex flex-col items-center text-center space-y-2 mb-10 md:mb-12">
              <h2 
                id="recent-news-heading" 
                className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight"
              >
                Recent News
              </h2>
              <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 max-w-md">
                Catch up on our latest insights, product trends, and store announcements.
              </p>
            </div>

            {/* News/Blog Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
              {(Array.isArray(blogs) ? blogs : []).map((post) => (
                <BlogCard key={post.id} post={post} />
              ))}
            </div>

          </div>
        </section>
      )}
    </div>
  );
};