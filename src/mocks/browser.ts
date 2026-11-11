
import { setupWorker } from 'msw/browser';
import { shopHandlers } from '../features/shop/api/handlers';
import { authHandlers } from '../features/auth/api/handlers';
import { orderHandlers } from '../features/checkout/api/orderHandlers';
import { blogsHandlers } from '../features/home/api/handlers';
import { cartHandlers } from '../features/cart/api/handlers';

export const worker = setupWorker(
  ...shopHandlers,
  ...authHandlers,
  ...orderHandlers,
  ...blogsHandlers,
  ...cartHandlers,
);
