// src/features/checkout/OrderDetailsPage.tsx
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchOrderById } from './api/fetchOrderById';
export const OrderDetailsPage: React.FC = () => {
  const { orderId } = useParams<{ orderId: string }>();

  const { data: order, isLoading, isError } = useQuery({
    queryKey: ['order', orderId],
    queryFn: () => fetchOrderById(orderId!),
    enabled: !!orderId,
  });

  if (isLoading) {
    return (
      <div className="max-w-md mx-auto text-center py-16 text-gray-500 dark:text-gray-400">
        جاري تحميل تفاصيل الطلب...
      </div>
    );
  }

  if (isError || !order) {
    return (
      <div className="max-w-md mx-auto text-center py-16 space-y-4">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">الطلب غير موجود</h2>
        <Link to="/shop" className="inline-block px-6 py-2.5 bg-blue-600 text-white rounded-xl font-semibold">
          العودة للمتجر
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-10 space-y-6">
      <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-gray-200 dark:border-zinc-800 space-y-4">
        <div className="flex justify-between items-center border-b pb-4 dark:border-zinc-800">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">تفاصيل الطلب</h1>
            <p className="text-sm text-gray-500">رقم الطلب: {order.orderId}</p>
          </div>
          <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full">
            تم الاستلام
          </span>
        </div>

        {/* عناصر الطلب */}
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

        <div className="border-t pt-4 flex justify-between font-bold text-lg dark:border-zinc-800">
          <span>الإجمالي:</span>
          <span>${order.totalAmount.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
};
