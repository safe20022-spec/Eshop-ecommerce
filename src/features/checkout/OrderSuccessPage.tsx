import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useOrderSuccess } from './hooks/useOrderSuccess';

export const OrderDetailsPage: React.FC = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const { data: order, isLoading, isError } = useOrderSuccess(orderId);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (isError || !order) {
    return (
      <div className="max-w-md mx-auto text-center py-16 px-4 space-y-4">
        <h2 className="text-2xl font-bold text-red-600 dark:text-red-400">Order Not Found</h2>
        <p className="text-gray-500 dark:text-gray-400 text-sm">
          We couldn't find an order with ID: <span className="font-mono text-gray-700 dark:text-gray-300">{orderId}</span>
        </p>
        <Link to="/shop" className="inline-block px-6 py-2.5 bg-blue-600 text-white rounded-xl font-semibold">
          Return to Shop
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-10 space-y-8">
      {/* Header */}
      <div className="bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-900 rounded-2xl p-6 text-center space-y-2">
        <div className="w-12 h-12 bg-green-500 text-white rounded-full flex items-center justify-center mx-auto text-xl font-bold">
          ✓
        </div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Order Confirmed!</h1>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Order ID: <span className="font-mono font-bold text-blue-600 dark:text-blue-400">#{order.orderId}</span>
        </p>
      </div>

      {/* Details Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Shipping info */}
        <div className="border border-gray-200 dark:border-zinc-800 rounded-2xl p-6 space-y-3 bg-white dark:bg-zinc-900">
          <h3 className="font-bold text-lg text-gray-900 dark:text-white border-b border-gray-100 dark:border-zinc-800 pb-2">
            Shipping Information
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-300"><span className="font-semibold">Name:</span> {order.details.fullName}</p>
          <p className="text-sm text-gray-600 dark:text-gray-300"><span className="font-semibold">Email:</span> {order.details.email}</p>
          <p className="text-sm text-gray-600 dark:text-gray-300"><span className="font-semibold">Address:</span> {order.details.address}, {order.details.city}</p>
        </div>

        {/* Payment & Summary */}
        <div className="border border-gray-200 dark:border-zinc-800 rounded-2xl p-6 space-y-3 bg-white dark:bg-zinc-900">
          <h3 className="font-bold text-lg text-gray-900 dark:text-white border-b border-gray-100 dark:border-zinc-800 pb-2">
            Payment Summary
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-300"><span className="font-semibold">Method:</span> {order.details.paymentMethod === 'card' ? 'Credit Card 💳' : 'Cash 💵'}</p>
          <p className="text-lg font-bold text-gray-900 dark:text-white pt-2">
            Total Paid: <span className="text-blue-600 dark:text-blue-400">${order.totalAmount.toFixed(2)}</span>
          </p>
        </div>
      </div>

      <div className="text-center">
        <Link to="/shop" className="inline-block px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold transition">
          Continue Shopping
        </Link>
      </div>
    </div>
  );
};