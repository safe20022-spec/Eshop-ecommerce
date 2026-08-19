import React from 'react';
import { ShoppingCart, Star } from 'lucide-react';
import { motion } from 'framer-motion';
import type { Product } from '../data/mockProducts';
import { useNavigate } from 'react-router-dom';
import { useCartStore } from '../../cart/store/useCartStore';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const navigate = useNavigate();
  const addItem = useCartStore((state) => state.addItem);
  return (
    <motion.div 
      layout
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 15 }}
      transition={{ duration: 0.3 }}
      className="bg-white cursor-pointer dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-3xl p-4 sm:p-5 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
    >
      <div onClick={() => navigate(`/shop/${product.id}`)}>
        <div className="relative bg-gray-50 dark:bg-gray-800/60 rounded-2xl p-4 mb-4 flex items-center justify-center h-48 sm:h-56 overflow-hidden">
          {product.isNew && (
            <span className="absolute top-3 left-3 bg-red-600 text-white text-[10px] font-black uppercase px-2.5 py-1 rounded-full z-10">
              New
            </span>
          )}
          <img 
            src={product.imgUrl} 
            alt={product.title} 
            className="h-36 sm:h-44 object-contain transform group-hover:scale-110 transition-transform duration-500" 
          />
        </div>

        <div className="flex items-center gap-1 text-amber-400 mb-2">
          <Star size={14} className="fill-amber-400" />
          {/* <span className="text-xs font-bold text-gray-700 dark:text-gray-300">{product.rating}</span> */}
        </div>

        <h3 className="font-bold text-gray-900 dark:text-white text-base sm:text-lg mb-1 line-clamp-1 group-hover:text-red-600 transition-colors">
          {product.title}
        </h3>
        <p className="text-red-600 font-extrabold text-lg sm:text-xl">${product.price}</p>
      </div>

      <button 
        className="mt-5 w-full bg-gray-900 dark:bg-white text-white dark:text-gray-900 hover:bg-red-600 dark:hover:bg-red-600 dark:hover:text-white py-3 rounded-2xl text-xs sm:text-sm font-bold transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-sm active:scale-98"
        onClick={() => addItem(product)}
      >
        <ShoppingCart size={16} />
        <span>Add to Cart</span>
      </button>
    </motion.div>
  );
};