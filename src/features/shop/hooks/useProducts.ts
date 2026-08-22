import { useQuery } from '@tanstack/react-query';
import { fetchProducts } from '../api/getProducts';

export const useProducts = (category: string) => {
  return useQuery({
    queryKey: ['products', category],
    queryFn: () => fetchProducts(category),
  });
};
