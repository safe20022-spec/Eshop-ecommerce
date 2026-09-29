// src/features/checkout/api/orderHandlers.ts
import { http, HttpResponse } from 'msw';
import type { OrderConfirmation } from '../types';

const ordersDb: Record<string, OrderConfirmation> = {};

export const orderHandlers = [
  // إنشاء طلب جديد
  http.post('*/api/orders', async ({ request }) => {
    const body = (await request.json()) as Omit<OrderConfirmation, 'orderId' | 'createdAt'>;
    const orderId = `ORD-${Math.random().toString(36).substring(2, 7).toUpperCase()}`;

    const newOrder: OrderConfirmation = {
      orderId,
      items: body.items,
      details: body.details,
      totalAmount: body.totalAmount,
      createdAt: new Date().toISOString(),
    };

    ordersDb[orderId] = newOrder;

    return HttpResponse.json(newOrder, { status: 201 });
  }),

  // جلب كافة الطلبات الخاصّة بالمستخدم
  http.get('/api/orders', () => {
    const allOrders = Object.values(ordersDb);
    return HttpResponse.json(allOrders);
  }),

  // جلب طلب واحد برقم الـ orderId
  http.get('*/api/orders/:orderId', ({ params }) => {
    const { orderId } = params;
    const order = ordersDb[orderId as string];

    if (!order) {
      return new HttpResponse(null, { status: 404 });
    }

    return HttpResponse.json(order);
  }),
];