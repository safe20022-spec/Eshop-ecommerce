import { apiClient } from "../../../api/axios";
import type { Product } from '../data/mockProducts';

export const fetchProductById = async (id: string): Promise<Product> => {
  const response = await apiClient.get<Product>(`/products/${id}`);
  return response.data;
};