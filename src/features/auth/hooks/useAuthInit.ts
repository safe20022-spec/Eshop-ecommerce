import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { apiClient } from '../../../api/axios';
import { useAuthStore } from '../store/useAuthStore';
import type { User } from '../../../types/auth';




export const useAuthInit = () => {
  const setAuth = useAuthStore((state) => state.setAuth);
  const logout = useAuthStore((state) => state.logout);

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
    } else if (error) {
      logout();
    }
  }, [data, error, setAuth, logout]);

  return { isInitializing: isLoading };
};