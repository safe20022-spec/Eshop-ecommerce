import { apiClient } from "../../../api/axios";
import type { OrderConfirmation } from "../types";
import { useQuery } from '@tanstack/react-query';



export const fetchOrderById = async (id: string): Promise<OrderConfirmation> => {
  const response = await apiClient.get<OrderConfirmation>(`/orders/${id}`);
  return response.data;
};


export const useOrderById = () => {
  return useQuery({
    queryKey: ['order', orderId],
    queryFn: fetchOrderById,
    staleTime: 5 * 60 * 1000,
    retry: 2,
  })
}


