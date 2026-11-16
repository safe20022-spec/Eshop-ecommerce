import type { OrderConfirmation } from '../types';

const getOrdersStorageKey = (userId: string) => `eshop_orders_user_${userId}`;

const readOrders = (userId: string): OrderConfirmation[] => {
  try {
    const raw = localStorage.getItem(getOrdersStorageKey(userId));
    if (!raw) return [];

    const parsed: unknown = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as OrderConfirmation[]) : [];
  } catch {
    return [];
  }
};

const writeOrders = (userId: string, orders: OrderConfirmation[]): void => {
  localStorage.setItem(getOrdersStorageKey(userId), JSON.stringify(orders));
};

export const mockOrdersDB = {
  getOrders: (userId: string): OrderConfirmation[] => {
    return readOrders(userId);
  },

  findOrderById: (orderId: string, userId: string): OrderConfirmation | undefined => {
    return readOrders(userId).find((order) => order.orderId === orderId);
  },

  addOrder: (newOrder: OrderConfirmation, userId: string): void => {
    const currentOrders = readOrders(userId);
    writeOrders(userId, [newOrder, ...currentOrders]);
  },
};