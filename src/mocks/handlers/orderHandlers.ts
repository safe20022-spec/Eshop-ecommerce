import { http, HttpResponse } from 'msw';

const ordersDb: Record<string, any> = {};

export const orderHandlers = [

  http.post('*/api/orders', async ({ request }) => {
    const body = (await request.json()) as any;
    const orderId = `ORD-${Math.random().toString(36).substring(2, 7).toUpperCase()}`;

    const newOrder = {
      orderId,
      items: body.items,
      details: body.details,
      totalAmount: body.totalAmount,
      createdAt: new Date().toISOString(),
    };

    ordersDb[orderId] = newOrder;

    return HttpResponse.json(newOrder, { status: 201 });
  }),

  http.get('*/api/orders/:orderId', ({ params }) => {
    const { orderId } = params;
    const order = ordersDb[orderId as string];

    if (!order) {
      return new HttpResponse(null, { status: 404 });
    }

    return HttpResponse.json(order);
  }),
];

