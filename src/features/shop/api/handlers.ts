import { http, HttpResponse } from 'msw';
import { mockProducts } from '../data/mockProducts';

const ordersDb: Record<string, any> = {};

export const shopHandlers = [
  http.get('*/api/products', ({ request }) => {
    const url = new URL(request.url);
    const category = url.searchParams.get('category');

    if (category && category !== 'all') {
      const filtered = mockProducts.filter(
        (p) => p.category.toLowerCase() === category.toLowerCase()
      );
      return HttpResponse.json(filtered);
    }
    return HttpResponse.json(mockProducts);
  }),

  http.get('*/api/products/:id', ({ params }) => {
    const { id } = params;
    const product = mockProducts.find((p) => p.id === id);

    if (!product) {
      return new HttpResponse(null, { status: 404, statusText: 'Product Not Found' });
    }

    return HttpResponse.json(product);
  }),

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

