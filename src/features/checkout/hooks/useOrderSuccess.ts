import { useQuery } from '@tanstack/react-query';
import { fetchOrderById } from '../api/fetchOrderById';

export const useOrderSuccess = (id?: string) => {
  return useQuery({
    queryKey: ['order', id],
    queryFn: () => fetchOrderById(id!),
    enabled: Boolean(id),
  });
};