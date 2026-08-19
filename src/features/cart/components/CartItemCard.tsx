import React from 'react';
import { Plus, Minus, Trash2 } from 'lucide-react';
import { useCartStore } from '../store/useCartStore';
import type { CartItem } from '../types';

interface CartItemCardProps {
  item: CartItem;
}

export const CartItemCard: React.FC<CartItemCardProps> = ({ item }) => {
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const removeItem = useCartStore((state) => state.removeItem);

  return (
    <div className="flex items-center gap-4 py-4 border-b border-gray-100 dark:border-gray-800">
      {/* صورة المنتج */}
      <div className="w-16 h-16 bg-gray-50 dark:bg-gray-800 rounded-xl p-2 flex items-center justify-center flex-shrink-0">
        {/* <img src={item.image} alt={item.title} className="max-h-full object-contain" /> */}
      </div>

      {/* تفاصيل المنتج والسعر */}
      <div className="flex-1 min-w-0">
        <h4 className="text-sm font-bold text-gray-900 dark:text-white truncate">{item.title}</h4>
        <p className="text-sm font-semibold text-red-600 dark:text-red-400 mt-1">
          ${(item.price * item.quantity).toFixed(2)}
        </p>

        {/* التحكم في الكميات (+ / -) */}
        <div className="flex items-center gap-2 mt-2">
          <div className="flex items-center border border-gray-200 dark:border-gray-700 rounded-lg">
            <button
              onClick={() => updateQuantity(item.id, -1)}
              className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-300 transition-colors cursor-pointer"
              aria-label="تقليل الكمية"
            >
              <Minus size={14} />
            </button>
            <span className="px-3 text-xs font-bold text-gray-900 dark:text-white">
              {item.quantity}
            </span>
            <button
              onClick={() => updateQuantity(item.id, 1)}
              className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-300 transition-colors cursor-pointer"
              aria-label="زيادة الكمية"
            >
              <Plus size={14} />
            </button>
          </div>
        </div>
      </div>

      {/* زر الحذف */}
      <button
        onClick={() => removeItem(item.id)}
        className="p-2 text-gray-400 hover:text-red-500 transition-colors cursor-pointer"
        aria-label="حذف المنتج"
      >
        <Trash2 size={18} />
      </button>
    </div>
  );
};