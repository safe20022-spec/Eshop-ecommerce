import { apiClient } from "../../../api/axios";
import type { OrderConfirmation } from "../types";

export const fetchAllOrders = async (): Promise<OrderConfirmation[]> => {
  const response = await apiClient.get<OrderConfirmation[]>('/orders');
  return response.data;
};
