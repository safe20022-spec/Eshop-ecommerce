import { http, HttpResponse } from 'msw';
import { mockProducts } from '../../shop/data/mockProducts';


const getCurrentUserId = (cookies: Record<string, string>): string => {
  try {
    const authToken = cookies.authToken;

    if (authToken && authToken.startsWith('mock-jwt-token-')) {
      const userId = authToken.replace('mock-jwt-token-', '');
      if (userId) return userId;
    }
  } catch (error) {
    console.error('Error extracting user ID:', error);
  }

  return 'guest_user';
};


const getUserCart = (cookies: Record<string, string>): any[] => {
  try {
    const userId = getCurrentUserId(cookies);
    const stored = localStorage.getItem(`cart_user_${userId}`);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};


const saveUserCart = (cookies: Record<string, string>, items: any[]) => {
  try {
    const userId = getCurrentUserId(cookies);
    localStorage.setItem(`cart_user_${userId}`, JSON.stringify(items));
  } catch {
    // none
  }
};

export const cartHandlers = [
  http.get('*/api/cart', ({ cookies }) => {
    const userCartItems = getUserCart(cookies);
    return HttpResponse.json({ items: userCartItems }, { status: 200 });
  }),

  
  http.post('*/api/cart/items', async ({ request, cookies }) => {
    const userCartItems = getUserCart(cookies);
    const body = (await request.json()) as { productId: string; quantity: number };
    const { productId, quantity } = body;

    
    const productInfo = mockProducts.find(p => p.id === productId);
    if (!productInfo) {
      return HttpResponse.json({ message: 'Product not found' }, { status: 404 });
    }

    const existingIndex = userCartItems.findIndex(item => item.id === productId || item.productId === productId);

    if (existingIndex > -1) {
      userCartItems[existingIndex].quantity += quantity;
    } else {
      userCartItems.push({
        id: productInfo.id,
        productId: productInfo.id,
        title: productInfo.title,
        price: productInfo.price,
        image: productInfo.imgUrl,
        quantity,
      });
    }

    saveUserCart(cookies, userCartItems);
    return HttpResponse.json({ items: userCartItems }, { status: 200 });
  }),

  
  http.delete('*/api/cart/items/:id', ({ params, cookies }) => {
    const { id } = params;
    let userCartItems = getUserCart(cookies);

    userCartItems = userCartItems.filter(item => item.id !== id && item.productId !== id);

    saveUserCart(cookies, userCartItems);
    return HttpResponse.json({ items: userCartItems }, { status: 200 });
  }),

  
  http.patch('*/api/cart/items/:id', async ({ params, request, cookies }) => {
    const { id } = params;
    const body = (await request.json()) as { quantity: number };
    let userCartItems = getUserCart(cookies);

    userCartItems = userCartItems.map(item => {
      if (item.id === id || item.productId === id) {
        return { ...item, quantity: body.quantity };
      }
      return item;
    });

    saveUserCart(cookies, userCartItems);
    return HttpResponse.json({ items: userCartItems }, { status: 200 });
  }),

  
  http.delete('*/api/cart', ({ cookies }) => {
    saveUserCart(cookies, []);
    return HttpResponse.json({ items: [] }, { status: 200 });
  }),

  
  http.post('*/api/cart/merge', async ({ request, cookies }) => {
    const userCartItems = getUserCart(cookies);
    const body = (await request.json()) as { items: { productId: string; quantity: number }[] };
    const localItems = body.items || [];

    localItems.forEach(localItem => {
      const productInfo = mockProducts.find(p => p.id === localItem.productId);
      if (!productInfo) return;

      const existing = userCartItems.find(item => item.id === localItem.productId || item.productId === localItem.productId);
      
      if (existing) {
        existing.quantity += localItem.quantity;
      } else {
        userCartItems.push({
          id: productInfo.id,
          productId: productInfo.id,
          title: productInfo.title,
          price: productInfo.price,
          image: productInfo.imgUrl,
          quantity: localItem.quantity,
        });
      }
    });

    saveUserCart(cookies, userCartItems);
    return HttpResponse.json({ items: userCartItems }, { status: 200 });
  }),
];