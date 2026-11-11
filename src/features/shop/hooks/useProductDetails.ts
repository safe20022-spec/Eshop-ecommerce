import { useQuery } from '@tanstack/react-query';
import { fetchProductById } from '../api/getProductById';

export const useProductDetails = (id?: string) => {
  return useQuery({
    queryKey: ['product', id],
    queryFn: () => fetchProductById(id!),
    enabled: Boolean(id), 
  });
};