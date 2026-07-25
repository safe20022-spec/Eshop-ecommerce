// src/features/home/components/BlogCard.tsx
import React from 'react';
import { motion } from 'framer-motion';
import type { BlogPost } from '../data/blogsData';

interface BlogCardProps {
  post: BlogPost;
}

export const BlogCard: React.FC<BlogCardProps> = ({ post }) => {
  return (
    <motion.div
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3 }}
      className="group flex flex-col space-y-3 cursor-pointer"
    >
      <div className="relative h-56 sm:h-60 md:h-64 w-full overflow-hidden rounded-2xl bg-gray-100 dark:bg-gray-800">
        <img
          src={post.image}
          alt={post.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      <div className="flex flex-col space-y-1.5 px-1">
        <span className="text-xs text-gray-400 dark:text-gray-500 font-medium">
          {post.publishedAt} by {post.author}
        </span>

        <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white line-clamp-1 group-hover:text-red-600 transition-colors">
          {post.title}
        </h3>

        <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 line-clamp-2 leading-relaxed font-normal">
          {post.subtitle}
        </p>
      </div>
    </motion.div>
  );
};