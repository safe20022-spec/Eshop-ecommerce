// src/mocks/browser.ts
import { setupWorker } from 'msw/browser';
import { shopHandlers } from '../features/shop/api/handlers';
import { authHandlers } from '../features/auth/api/handlers';
import { orderHandlers } from '../features/checkout/api/orderHandlers';           // أو المسار الصحيح لملف orderHandlers

export const worker = setupWorker(
  ...shopHandlers,
  ...authHandlers,
  ...orderHandlers
);