// src/features/checkout/OrdersPage.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchAllOrders } from './fetchAllOrders';

export const OrdersPage: React.FC = () => {
  const { data: orders, isLoading, isError } = useQuery({
    queryKey: ['orders'],
    queryFn: fetchAllOrders,
  });

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto py-16 text-center text-gray-500 dark:text-gray-400">
        Loading orders...
      </div>
    );
  }

  if (isError || !orders || orders.length === 0) {
    return (
      <div className="max-w-md mx-auto text-center py-16 space-y-4">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">No orders found</h2>
        <p className="text-gray-500 dark:text-gray-400 text-sm">You haven't placed any orders yet.</p>
        <Link to="/shop" className="inline-block px-6 py-2.5 bg-blue-600 text-white rounded-xl font-semibold">
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-10 space-y-6">
      <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">My Orders</h1>

      <div className="space-y-4">
        {orders.map((order) => (
          <div
            key={order.orderId}
            className="p-6 bg-white dark:bg-zinc-900 rounded-2xl border border-gray-200 dark:border-zinc-800 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
          >
            <div>
              <div className="flex items-center gap-3">
                <span className="font-bold text-gray-900 dark:text-white">{order.orderId}</span>
                <span className="text-xs px-2.5 py-1 bg-green-100 dark:bg-green-950/40 text-green-700 dark:text-green-300 font-medium rounded-full">
                  Completed
                </span>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                Items: {order.items.length} | Total: ${order.totalAmount.toFixed(2)}
              </p>
            </div>

            <Link
              to={`/orders/${order.orderId}`}
              className="px-4 py-2 border border-gray-300 dark:border-zinc-700 hover:bg-gray-50 dark:hover:bg-zinc-800 text-gray-800 dark:text-gray-200 text-sm font-semibold rounded-xl transition"
            >
              View Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};