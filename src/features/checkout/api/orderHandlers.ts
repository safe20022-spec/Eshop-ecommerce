import { http, HttpResponse } from 'msw';
import { mockOrdersDB } from '../mocks/db';
import type { OrderConfirmation } from '../types';

export const orderHandlers = [
  http.post('*/api/orders', async ({ request }) => {
    const body = (await request.json()) as Omit<OrderConfirmation, 'orderId' | 'createdAt'>;
    const orderId = `ORD-${Math.random().toString(36).substring(2, 7).toUpperCase()}`;

    const newOrder: OrderConfirmation = {
      orderId,
      items: body.items,
      details: body.details,
      totalAmount: body.totalAmount,
      createdAt: new Date().toISOString(),
      status: 'Processing',
    };


    mockOrdersDB.addOrder(newOrder);

    return HttpResponse.json(newOrder, { status: 201 });
  }),

  http.get('*/api/orders', () => {
    const orders = mockOrdersDB.getOrders();
    const sortedOrders = [...orders].sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

    return HttpResponse.json(sortedOrders);
  }),

  http.get('*/api/orders/:orderId', ({ params }) => {
    const { orderId } = params;
    const order = mockOrdersDB.findOrderById(orderId as string);

    if (!order) {
      return new HttpResponse(
        JSON.stringify({ message: 'Order not found' }),
        { status: 404, headers: { 'Content-Type': 'application/json' } }
      );
    }
    return HttpResponse.json(order);
  }),
];
