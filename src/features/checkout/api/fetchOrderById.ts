import { apiClient } from "../../../api/axios";
import type { OrderConfirmation } from "../types";


export const fetchOrderById = async (id: string): Promise<OrderConfirmation> => {
  const response = await apiClient.get<OrderConfirmation>(`/orders/${id}`);
  return response.data;
};
