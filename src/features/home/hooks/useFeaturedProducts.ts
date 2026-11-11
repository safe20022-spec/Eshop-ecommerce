import { useQuery } from '@tanstack/react-query';
import { apiClient } from '../../../api/axios';
import type { Product } from '../../shop/data/mockProducts';

const getFeaturedProducts = async () => {
    const response = await apiClient.get<Product[]>('/featuredproducts');
    return response.data;
}

export const useFeaturedProducts = (enabled: boolean = true) => {
    return useQuery({
        queryKey: ['featuredproducts'],
        queryFn: getFeaturedProducts,
        enabled: enabled,
        staleTime: 1000 * 60 * 5,
    });
}