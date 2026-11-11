import { useQuery } from '@tanstack/react-query';
import { apiClient } from '../../../api/axios';
import type { OrderConfirmation } from '../types';

export const fetchAllOrders = async (): Promise<OrderConfirmation[]> => {
  const response = await apiClient.get<OrderConfirmation[]>('/orders');
  return response.data;
};



export const useOrders = () => {
  return useQuery({
    queryKey: ['orders'],
    queryFn: fetchAllOrders,
    staleTime: 1000 * 60 * 5, 
    retry: 2, 
  });
};
