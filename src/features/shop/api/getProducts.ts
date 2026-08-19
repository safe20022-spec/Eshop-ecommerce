import { apiClient } from '../../../api/axios';
import type { Product } from '../data/mockProducts';

export const fetchProducts = async (category: string): Promise<Product[]> => {
  const response = await apiClient.get<Product[]>('/products', {
    params: { category },
  });
  return response.data;
};

