import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchOrderById } from './api/fetchOrderById';
import { AlertCircle, RefreshCw, PackageSearch, ArrowRight } from 'lucide-react';
export const OrderDetailsPage: React.FC = () => {
const { orderId } = useParams<{ orderId: string }>();

  const { data: order, isLoading, isError, error, refetch, isRefetching } = useQuery({
    queryKey: ['order', orderId],
    queryFn: () => fetchOrderById(orderId!),
    enabled: !!orderId,
  });
  const errorMessage = (error as any)?.response?.data?.message || "We couldn't load your orders right now.";


  if (isLoading) {
    return (
      <div className="max-w-md mx-auto text-center py-16 text-gray-500 dark:text-gray-400">
       Loding Orders...
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


  if (!order) {
    return (
      <div className="max-w-md mx-auto text-center py-20 px-4 space-y-4">
        <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 text-gray-400 rounded-full flex items-center justify-center mx-auto">
          <PackageSearch size={32} />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Order Is not Found</h2>
        <p className="text-gray-500 dark:text-gray-400 text-sm">
          We Couldn't Find Your Order
        </p>
        <Link
          to="/orders"
          className="inline-flex items-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-xl font-semibold transition"
        >
          Back To Orders Page <ArrowRight size={18} />
        </Link>
      </div>
    );
  }
  
  return (
    <div className="max-w-3xl mx-auto px-4 py-10 space-y-6">
      <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-gray-200 dark:border-zinc-800 space-y-4">
        <div className="flex justify-between items-center border-b pb-4 dark:border-zinc-800">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Order Details</h1>
            <p className="text-sm text-gray-500">Order No: {order.orderId}</p>
          </div>
          <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full">
           Done
          </span>
        </div>

        
        <div className="space-y-3">
          {order.items.map((item) => (
            <div key={item.id} className="flex justify-between items-center">
              <span className="text-gray-800 dark:text-gray-200">
                {item.title} (x{item.quantity})
              </span>
              <span className="font-bold text-gray-900 dark:text-white">
                ${(item.price * item.quantity).toFixed(2)}
              </span>
            </div>
          ))}
        </div>

        <div className="border-t pt-4 flex justify-between font-bold text-lg dark:text-white dark:border-zinc-800">
          <span>Total</span>
          <span>${order.totalAmount.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
};
