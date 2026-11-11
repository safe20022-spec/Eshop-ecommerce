import React from 'react';
import { Link } from 'react-router-dom';
import { useCartStore } from '../cart/store/useCartStore';
import { CheckoutForm } from './components/CheckoutForm';
import { OrderSummary } from './components/OrderSummary';
import { useCreateOrder } from './hooks/useCreateOrder';

export const CheckoutPage: React.FC = () => {
  const items = useCartStore((state) => state.items);
  const { mutate: createOrder, isPending, error } = useCreateOrder();

  if (items.length === 0) {
    return (
      <div className="max-w-md mx-auto text-center py-16 px-4 space-y-4">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Cart is empty</h2>
        <p className="text-gray-500 dark:text-gray-400 text-sm">There are no items to checkout.</p>
        <Link 
          to="/shop" 
          className="inline-block px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold transition"
        >
          Browse Products
        </Link>
      </div>
    );
  }

  const errorMessage = error?.response?.data?.message || 'An unexpected error occurred.';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-8">Checkout</h1>

      {error && (
        <div 
          role="alert" 
          className="mb-6 p-4 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900 text-red-600 dark:text-red-400 rounded-xl text-sm font-medium"
        >
          {errorMessage}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-7">
          <CheckoutForm
            onSubmit={(details) => createOrder(details)}
            isSubmitting={isPending}
          />
        </div>
        <div className="lg:col-span-5">
          <OrderSummary />
        </div>
      </div>
    </div>
  );
};
