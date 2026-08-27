import { apiClient } from '../../../api/axios';
import type { Product } from '../data/mockProducts';

export interface ProductFilters {
  category: string;
  q: string;
  maxPrice: number;
  sortBy: string;
}

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const fetchProducts = async (filters: ProductFilters): Promise<Product[]> => {
  await delay(1000);
  const response = await apiClient.get<Product[]>('/products', {
    params: {
      category: filters.category !== 'all' ? filters.category : undefined,
      q: filters.q || undefined,
      maxPrice: filters.maxPrice < 2000 ? filters.maxPrice : undefined,
      sortBy: filters.sortBy !== 'default' ? filters.sortBy : undefined,
    },
  });
  return response.data;
};