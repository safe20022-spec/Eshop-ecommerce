import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { apiClient } from '../../../api/axios';
import { useAuthStore } from '../store/useAuthStore';
import { useCartStore } from '../../cart/store/useCartStore';
import type { User } from '../../../types/auth';

export const useAuthInit = () => {
  const setAuth = useAuthStore((state) => state.setAuth);
  const clearAuth = useAuthStore((state) => state.clearAuth);

  const { data, error, isLoading } = useQuery({
    queryKey: ['auth-me'],
    queryFn: async () => {
      const response = await apiClient.get<{ user: User }>('/auth/me');
      return response.data;
    },
    retry: false,
    staleTime: Infinity,
  });

  useEffect(() => {
    if (data?.user) {
      setAuth(data.user);
      useCartStore.getState().fetchServerCart();
    } else if (error) {
      useAuthStore.getState().setLoading(false);
      clearAuth();
    }
  }, [data, error, setAuth, clearAuth]);

  return { isInitializing: isLoading };
};
