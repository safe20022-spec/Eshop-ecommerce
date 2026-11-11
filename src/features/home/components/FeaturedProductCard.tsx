import React, { useState } from 'react';
import { ShoppingCart, Heart } from 'lucide-react';
import { motion } from 'framer-motion';
import type { Product } from '../../shop/data/mockProducts';
import { useCartStore } from '../../cart/store/useCartStore';
import { useNavigate } from 'react-router-dom';

interface ProductCardProps {
  product: Product;
  onToggleWishlist?: (productId: string) => void;
}


export const FeaturedProductCard: React.FC<ProductCardProps> = ({ 
  product, 
  onToggleWishlist 
}) => {
  const navigate = useNavigate();
  const [isWishlisted, setIsWishlisted] = useState(false);
  const addToCart = useCartStore((state) => state.addItem);

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.stopPropagation(); 
    setIsWishlisted(!isWishlisted);
    onToggleWishlist?.(product.id);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      onClick={() => navigate(`/shop/${product.id}`)}
      className="group cursor-pointer bg-gray-50 dark:bg-gray-800/50 rounded-3xl p-4 sm:p-5 relative border border-gray-100 dark:border-gray-800 flex flex-col justify-between transition-all duration-300 hover:shadow-xl dark:hover:shadow-gray-900/40"
    >
      {/* Badges & Wishlist */}
      <div className="flex items-center justify-between w-full z-10">
        <div>
          {product.isNew && (
            <span className="bg-emerald-500 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
              New yyyy
            </span>
          )}
        </div>

        <button 
          onClick={handleWishlistClick}
          aria-label="Add to Wishlist"
          className={`w-9 h-9 rounded-full flex items-center justify-center shadow-sm transition-colors cursor-pointer ${
            isWishlisted 
              ? 'bg-red-50 dark:bg-red-900/20 text-red-500' 
              : 'bg-white dark:bg-gray-700 text-gray-500 dark:text-gray-300 hover:text-red-500 dark:hover:text-red-400'
          }`}
        >
          <Heart size={18} className={isWishlisted ? 'fill-red-500' : ''} />
        </button>
      </div>

      {/* Product Image */}
      <div className="relative my-4 h-48 sm:h-56 w-full flex items-center justify-center overflow-hidden rounded-2xl">
        <img
          src={product.imgUrl}
          alt={product.title}
          loading="lazy"
          className="max-h-full w-auto object-contain transition-transform duration-500 group-hover:scale-110 drop-shadow-md"
        />
      </div>

      {/* Product Details */}
      <div className="flex flex-col space-y-2 mt-2">
        {/* Category Tag */}
        <span className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider">
          {product.category}
        </span>

        {/* Product Title */}
        <h3 className="font-bold text-gray-900 dark:text-white text-base sm:text-lg line-clamp-1 group-hover:text-red-600 transition-colors">
          {product.title}
        </h3>

        {/* Price & Add to Cart */}
        <div className="flex items-center justify-between pt-2">
          <div className="flex items-baseline gap-2">
            <span className="text-xl font-extrabold text-gray-900 dark:text-white">
              ${product.price}
            </span>
          </div>

          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={(e) => {
              e.stopPropagation();
              addToCart(product);
            }}
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