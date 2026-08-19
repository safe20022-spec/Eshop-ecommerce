import { http, HttpResponse } from 'msw';
import { mockProducts } from '../data/mockProducts';

export const shopHandlers = [
  http.get('/api/products', ({ request }) => {
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

  http.get('/api/products/:id', ({ params }) => {
    const { id } = params;
    const product = mockProducts.find((p) => p.id === id);

    if (!product) {
      return new HttpResponse(null, { status: 404, statusText: 'Product Not Found' });
    }

    return HttpResponse.json(product);
  }),
];