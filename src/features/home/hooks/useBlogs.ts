import { useQuery } from '@tanstack/react-query';
import { apiClient } from '../../../api/axios';
import type { BlogPost } from '../data/blogsData.ts';

const getBlogs = async (): Promise<BlogPost[]> => {
    const response = await apiClient.get<BlogPost[]>('/blogs');
    return response.data;
}

export const useBlogs = (enabled: boolean = true) => {
    return useQuery({
        queryKey: ['blogs'],
        queryFn: getBlogs,
        enabled: enabled, 
    });
}