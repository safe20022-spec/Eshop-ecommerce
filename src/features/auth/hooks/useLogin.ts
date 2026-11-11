import { useMutation, useQueryClient } from '@tanstack/react-query'; // 👈 1. استيراد useQueryClient
import { AxiosError } from 'axios';
import { apiClient } from '../../../api/axios';
import { useAuthStore } from '../store/useAuthStore';
import { useCartStore } from '../../cart/store/useCartStore';
import type { LoginFormData } from '../schemas/login.schema';
import type { User } from '../../../types/auth';
import type { ApiErrorResponse } from '../utils/handleFormErrors';

export interface LoginResponse {
  user: User;
}

export const useLogin = () => {
  const setAuth = useAuthStore((state) => state.setAuth);
  const queryClient = useQueryClient();

  return useMutation<LoginResponse, AxiosError<ApiErrorResponse>, LoginFormData>({
    mutationFn: async (data: LoginFormData) => {
      const response = await apiClient.post<LoginResponse>('/auth/login', data);
      return response.data;
    },

    retry: (failureCount, error) => {
      const status = error.response?.status;
      if (status && status >= 400 && status < 500) {
        return false;
      }
      return failureCount < 2;
    },

    onSuccess: async (data) => {
      setAuth(data.user);

      await queryClient.invalidateQueries({ queryKey: ['auth-me'] });
      
      await useCartStore.getState().mergeCartOnLogin();
    },
  });
};