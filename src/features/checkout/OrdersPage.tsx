import React from 'react';
import { Link } from 'react-router-dom';
import { PackageSearch, ArrowRight, Clock, CheckCircle2, AlertCircle, RefreshCw } from 'lucide-react';
import { useOrders } from './hooks/useOrders';

export const OrdersPage: React.FC = () => {
  const { data: orders, isLoading, isError, error, refetch, isRefetching } = useOrders();
  const errorMessage = (error as any)?.response?.data?.message || "We couldn't load your orders right now.";

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto py-20 px-4 text-center space-y-3">
        <div className="w-8 h-8 border-4 border-red-600 border-t-transparent rounded-full animate-spin mx-auto" />
        <p className="text-gray-500 dark:text-gray-400 text-sm">Loading your orders...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="max-w-md mx-auto text-center py-20 px-4 space-y-4">
        <div className="w-16 h-16 bg-red-50 dark:bg-red-950/40 text-red-500 rounded-full flex items-center justify-center mx-auto">
          <AlertCircle size={32} />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Something went wrong</h2>
        <p className="text-gray-500 dark:text-gray-400 text-sm">
          {errorMessage}
        </p>
        <button
          onClick={() => refetch()}
          disabled={isRefetching}
          className="inline-flex items-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white rounded-xl font-semibold transition cursor-pointer"
        >
          <RefreshCw size={18} className={isRefetching ? 'animate-spin' : ''} />
          Try Again
        </button>
      </div>
    );
  }

  if (!orders || orders.length === 0) {
    return (
      <div className="max-w-md mx-auto text-center py-20 px-4 space-y-4">
        <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 text-gray-400 rounded-full flex items-center justify-center mx-auto">
          <PackageSearch size={32} />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">No orders found</h2>
        <p className="text-gray-500 dark:text-gray-400 text-sm">
          You haven't placed any orders yet. Explore our products and place your first order.
        </p>
        <Link
          to="/shop"
          className="inline-flex items-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-xl font-semibold transition"
        >
          Start Shopping <ArrowRight size={18} />
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-10 space-y-6">
      <div>
        <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">My Orders</h1>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
          Showing {orders.length} {orders.length === 1 ? 'order' : 'orders'}
        </p>
      </div>

      <div className="space-y-4">
        {orders.map((order) => {
          const formattedDate = new Date(order.createdAt).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
          });

          return (
            <div
              key={order.orderId}
              className="p-6 bg-white dark:bg-gray-800/60 rounded-3xl border border-gray-100 dark:border-gray-700/60 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 transition hover:border-gray-300 dark:hover:border-gray-600"
            >
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <span className="font-bold text-gray-900 dark:text-white tracking-wide">
                    {order.orderId}
                  </span>
                  <span className="inline-flex items-center gap-1 text-xs px-2.5 py-1 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 font-medium rounded-full border border-emerald-200 dark:border-emerald-900/50">
                    <CheckCircle2 size={12} />
                    {order.status || 'Completed'}
                  </span>
                </div>

                <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                  <Clock size={14} />
                  <span>Placed on {formattedDate}</span>
                </div>

                <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {order.items.length} {order.items.length === 1 ? 'item' : 'items'} •{' '}
                  <span className="text-red-600 dark:text-red-400 font-bold">
                    ${order.totalAmount.toFixed(2)}
                  </span>
                </p>
              </div>

              <Link
                to={`/orders/${order.orderId}`}
                className="w-full sm:w-auto text-center px-5 py-2.5 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-100 text-xs font-semibold rounded-xl transition"
              >
                View Details
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};
