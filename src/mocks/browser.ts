import { setupWorker } from 'msw/browser';
import { shopHandlers } from '../features/shop/api/handlers';

export const worker = setupWorker(...shopHandlers);