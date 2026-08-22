import { apiClient } from '../../../api/axios';
import type { Product } from '../data/mockProducts';


const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
export const fetchProducts = async (category: string): Promise<Product[]> => {
  await delay(1000);
  const response = await apiClient.get<Product[]>('/products', {
    params: { category },
  });
  return response.data;
};

