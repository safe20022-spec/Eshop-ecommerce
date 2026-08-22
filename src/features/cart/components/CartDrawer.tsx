import React from 'react';
import { X, ShoppingBag, ArrowRight, Trash2 } from 'lucide-react';
import { useCartStore } from '../store/useCartStore';
import { CartItemCard } from './CartItemCard';
import { useNavigate } from 'react-router-dom';

export const CartDrawer: React.FC = () => {
  const { items, isOpen, toggleCart, clearCart, getTotalPrice, getTotalItems } = useCartStore();
  const navigate = useNavigate();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
        onClick={toggleCart}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white dark:bg-gray-900 shadow-2xl flex flex-col">
          
          {/* Header */}
          <div className="p-6 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="text-red-600" size={22} />
              <h3 className="text-lg font-extrabold text-gray-900 dark:text-white">
               Shoping Cart ({getTotalItems()})
              </h3>
            </div>
            
            <button
              onClick={toggleCart}
              className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 rounded-full cursor-pointer"
            >
              <X size={20} />
            </button>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto p-6">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center">
                <div className="w-20 h-20 bg-gray-50 dark:bg-gray-800 rounded-full flex items-center justify-center text-gray-300 mb-4">
                  <ShoppingBag size={40} />
                </div>
                <h4 className="text-base font-bold text-gray-900 dark:text-white mb-1">
                  The Cart Is Empty
                </h4>
                <p className="text-xs text-gray-500 mb-6">
                  Start Shoping And Add Items To Your Cart
                </p>
                <button
                  onClick={() => {navigate(`/shop`); toggleCart()}}
                  className="bg-red-600 hover:bg-red-700 text-white text-sm font-bold py-2.5 px-6 rounded-xl transition-all cursor-pointer"
                >
                  Discover Products
                </button>
              </div>
            ) : (
              <div className="space-y-1">
                <div className="flex justify-end mb-2">
                  <button
                    onClick={clearCart}
                    className="text-xs font-semibold text-gray-400 hover:text-red-500 flex items-center gap-1 transition-colors cursor-pointer"
                  >
                    <Trash2 size={12} /> Clear
                  </button>
                </div>
                {items.map((item) => (
                  <CartItemCard key={item.id} item={item} />
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {items.length > 0 && (
            <div className="p-6 border-t border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/30 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-gray-500">Total Price</span>
                <span className="text-2xl font-black text-gray-900 dark:text-white">
                  ${getTotalPrice().toFixed(2)}
                </span>
              </div>

              <button 
                className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3.5 px-4 rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-red-600/20 transition-all cursor-pointer"
                onClick={() => {navigate('/checkout'); toggleCart()}}
              >
                Checkout
                <ArrowRight size={18} />
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};