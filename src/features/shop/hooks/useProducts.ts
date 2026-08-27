import { useQuery } from '@tanstack/react-query';
import { fetchProducts, type ProductFilters } from '../api/getProducts';

export const useProducts = (filters: ProductFilters) => {
  return useQuery({
    queryKey: ['products', filters],
    queryFn: () => fetchProducts(filters),
  });
};