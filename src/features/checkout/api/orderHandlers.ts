import { http, HttpResponse } from 'msw';
import { mockOrdersDB } from '../mocks/db';
import type { OrderConfirmation } from '../types';

const TOKEN_PREFIX = 'mock-jwt-token-';

const getCurrentUserId = (cookies: Record<string, string>): string => {
  const authToken = cookies.authToken;

  if (authToken?.startsWith(TOKEN_PREFIX)) {
    const userId = authToken.slice(TOKEN_PREFIX.length).trim();
    if (userId) return userId;
  }

  return 'guest_user';
};

const generateOrderId = (): string => {
  const randomPart = Math.random().toString(36).substring(2, 7).toUpperCase();
  return `ORD-${randomPart}`;
};

export const orderHandlers = [
  http.post('*/api/orders', async ({ request, cookies }) => {
    let body: Omit<OrderConfirmation, 'orderId' | 'createdAt' | 'status'>;

    try {
      body = (await request.json()) as Omit<OrderConfirmation, 'orderId' | 'createdAt' | 'status'>;
    } catch {
      return HttpResponse.json({ message: 'Invalid request body' }, { status: 400 });
    }

    const currentUserId = getCurrentUserId(cookies);

    const newOrder: OrderConfirmation = {
      orderId: generateOrderId(),
      items: body.items,
      details: body.details,
      totalAmount: body.totalAmount,
      createdAt: new Date().toISOString(),
      status: 'Processing',
    };

    mockOrdersDB.addOrder(newOrder, currentUserId);

    return HttpResponse.json(newOrder, { status: 201 });
  }),

  http.get('*/api/orders', ({ cookies }) => {
    const currentUserId = getCurrentUserId(cookies);
    const orders = mockOrdersDB.getOrders(currentUserId);

    const sortedOrders = [...orders].sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

    return HttpResponse.json(sortedOrders);
  }),

  http.get('*/api/orders/:orderId', ({ params, cookies }) => {
    const currentUserId = getCurrentUserId(cookies);
    const orderId = String(params.orderId ?? '');
    const order = mockOrdersDB.findOrderById(orderId, currentUserId);

    if (!order) {
      return HttpResponse.json({ message: 'Order not found' }, { status: 404 });
    }

    return HttpResponse.json(order);
  }),
];