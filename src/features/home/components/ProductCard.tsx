import React from 'react';
import { ShoppingCart, Heart, Star } from 'lucide-react';
import { motion } from 'framer-motion';
import type { Product } from '../data/productsData';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <motion.div
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3 }}
      className="group cursor-pointer bg-gray-50 dark:bg-gray-800/50 rounded-3xl p-4 sm:p-5 relative border border-gray-100 dark:border-gray-800 flex flex-col justify-between transition-all duration-300 hover:shadow-xl dark:hover:shadow-gray-900/40"
    >
      <div className="flex items-center justify-between w-full z-10">
        <div>
          {product.badge && (
            <span className="bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
              {product.badge}
            </span>
          )}
          {product.isNew && (
            <span className="bg-emerald-500 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
              New
            </span>
          )}
        </div>

        <button 
          aria-label="Add to Wishlist"
          className="w-9 h-9 bg-white dark:bg-gray-700 rounded-full flex items-center justify-center text-gray-500 dark:text-gray-300 hover:text-red-500 dark:hover:text-red-400 shadow-sm transition-colors cursor-pointer"
        >
          <Heart size={18} />
        </button>
      </div>

      <div className="relative my-4 h-48 sm:h-56 w-full flex items-center justify-center overflow-hidden rounded-2xl">
        <img
          src={product.image}
          alt={product.name}
          className="max-h-full w-auto object-contain transition-transform duration-500 group-hover:scale-110 drop-shadow-md"
        />
      </div>

      <div className="flex flex-col space-y-2 mt-2">
        <div className="flex items-center gap-1 text-amber-400">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              size={14}
              className={i < product.rating ? 'fill-amber-400' : 'text-gray-300 dark:text-gray-600'}
            />
          ))}
          <span className="text-xs text-gray-400 dark:text-gray-500 font-medium ml-1">
            ({product.rating}.0)
          </span>
        </div>

        <h3 className="font-bold text-gray-900 dark:text-white text-base sm:text-lg line-clamp-1 group-hover:text-red-600 transition-colors">
          {product.name}
        </h3>

        <div className="flex items-center justify-between pt-2">
          <div className="flex items-baseline gap-2">
            <span className="text-xl font-extrabold text-gray-900 dark:text-white">
              ${product.price}
            </span>
            {product.originalPrice && (
              <span className="text-sm font-medium text-gray-400 line-through">
                ${product.originalPrice}
              </span>
            )}
          </div>

          <motion.button
            whileTap={{ scale: 0.9 }}
            aria-label="Add to Cart"
            className="bg-red-600 hover:bg-red-700 text-white p-3 rounded-2xl shadow-md hover:shadow-red-500/30 transition-all cursor-pointer"
          >
            <ShoppingCart size={18} />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};