import React from 'react';
import { motion } from 'framer-motion';
import type { CategoryBanner } from '../data/categoryBanners';

interface CategoryCardProps {
  item: CategoryBanner;
}

export const CategoryCard: React.FC<CategoryCardProps> = ({ item }) => {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
      className={`relative overflow-hidden rounded-3xl p-6 sm:p-8 flex flex-col justify-between min-h-[300px] md:min-h-[320px] ${
        item.bgColor
      } ${item.textColor} ${
        item.isWide ? 'col-span-1 sm:col-span-2' : 'col-span-1'
      }`}
    >
      <div className="z-10 flex flex-col items-start space-y-1 max-w-[60%]">
        <span className="text-sm font-medium opacity-90">{item.subtitle}</span>
        <span className="text-xl sm:text-2xl font-bold">{item.title}</span>

        <h3 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight opacity-20 -mt-1 select-none pointer-events-none break-words">
          {item.bgTitle}
        </h3>

        {/* Browse Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`mt-4 font-semibold text-xs sm:text-sm px-6 py-2.5 rounded-full shadow-md transition-colors duration-200 cursor-pointer ${item.buttonBg} ${item.buttonTextColor}`}
        >
          {item.buttonText}
        </motion.button>
      </div>

      <div className="absolute right-2 bottom-2 sm:right-4 sm:bottom-4 w-1/2 h-full flex items-end justify-end pointer-events-none">
        <img
          src={item.imgUrl}
          alt={item.bgTitle}
          className="max-h-[180px] sm:max-h-[220px] md:max-h-[250px] w-auto object-contain drop-shadow-xl"
        />
      </div>
    </motion.div>
  );
};