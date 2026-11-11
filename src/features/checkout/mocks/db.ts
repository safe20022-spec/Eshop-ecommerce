import type { OrderConfirmation } from '../types';

const STORAGE_KEY = 'eshop_mock_orders';
const DEFAULT_ORDERS: OrderConfirmation[] = [

];

export const mockOrdersDB = {
  getOrders: (): OrderConfirmation[] => {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      if (!data) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_ORDERS));
        return DEFAULT_ORDERS;
      }
      return JSON.parse(data);
    } catch {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_ORDERS));
      return DEFAULT_ORDERS;
    }
  },

  findOrderById: (id: string): OrderConfirmation | undefined => {
    const orders = mockOrdersDB.getOrders();
    return orders.find((o) => o.orderId === id);
  },

  addOrder: (newOrder: OrderConfirmation): void => {
    const orders = mockOrdersDB.getOrders();
    orders.unshift(newOrder);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(orders));
  },
};