import React from 'react';
import { useCartStore } from '../../cart/store/useCartStore';

export const OrderSummary: React.FC = () => {
  const { items, getTotalPrice } = useCartStore();
  const subtotal = getTotalPrice();
  const shipping = subtotal > 100 || subtotal === 0 ? 0 : 15;
  const total = subtotal + shipping;

  return (
    <div className="bg-gray-50 dark:bg-zinc-900 p-6 rounded-2xl border border-gray-100 dark:border-zinc-800 space-y-6">
      <h3 className="text-xl font-bold text-gray-900 dark:text-white">Order Summary</h3>

      <div className="max-h-80 overflow-y-auto space-y-4 pr-1">
        {items.map((item) => (
          <div key={item.id} className="flex items-center gap-4">
            <img
            //   src={item.image}
              alt={item.title}
              className="w-16 h-16 object-cover rounded-xl border border-gray-200 dark:border-zinc-700"
            />
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-semibold text-gray-800 dark:text-gray-200 truncate">
                {item.title}
              </h4>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Qty: {item.quantity} × ${item.price.toFixed(2)}
              </p>
            </div>
            <span className="text-sm font-bold text-gray-900 dark:text-white">
              ${(item.price * item.quantity).toFixed(2)}
            </span>
          </div>
        ))}
      </div>

      <div className="border-t border-gray-200 dark:border-zinc-800 pt-4 space-y-2 text-sm">
        <div className="flex justify-between text-gray-600 dark:text-gray-400">
          <span>Subtotal</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-gray-600 dark:text-gray-400">
          <span>Shipping</span>
          <span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
        </div>
        <div className="flex justify-between text-base font-bold text-gray-900 dark:text-white pt-2 border-t border-gray-200 dark:border-zinc-800">
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
};
