import React from 'react';
import { ShoppingBag, Star } from 'lucide-react';
import type { Product } from '../features/shop/data/mockProducts';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { title, price, imgUrl, isNew } = product;

  return (
    <div className="group bg-gray-50 dark:bg-gray-800/60 rounded-3xl p-4 transition-all duration-300 hover:shadow-xl border border-gray-100 dark:border-gray-800 flex flex-col justify-between">
      
      <div className="relative w-full h-52 rounded-2xl overflow-hidden bg-white dark:bg-gray-900/50 flex items-center justify-center p-4 mb-4">
        {isNew && (
          <span className="absolute top-3 left-3 bg-red-600 text-white text-[10px] font-black uppercase px-2.5 py-1 rounded-full z-10">
            New
          </span>
        )}
        
        <img
          src={imgUrl}
          alt={title}
          className="w-full h-full object-contain transform group-hover:scale-105 transition-transform duration-500"
        />
      </div>

      <div>
        <div className="flex items-center gap-1 text-amber-500 mb-1">
          <Star size={14} fill="currentColor" />
          <span className="text-xs font-bold text-gray-700 dark:text-gray-300">4.8</span>
        </div>

        <h3 className="text-base font-bold text-gray-900 dark:text-white line-clamp-1 mb-2">
          {title}
        </h3>

        <div className="flex items-center justify-between mt-auto">
          <span className="text-lg font-black text-gray-900 dark:text-white">
            ${price}
          </span>

          <button className="bg-red-600 hover:bg-red-700 text-white p-2.5 rounded-2xl shadow-md transition-all active:scale-95 cursor-pointer">
            <ShoppingBag size={18} />
          </button>
        </div>
      </div>

    </div>
  );
};