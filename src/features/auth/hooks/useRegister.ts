import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { apiClient } from '../../../api/axios';
import { useAuthStore } from '../store/useAuthStore';
import type { RegisterFormData } from '../schemas/register.schema';
import type { User } from '../../../types/auth';


export interface ApiErrorResponse {
  message?: string;
  errors?: Record<string, string>;
}

export interface RegisterResponse {
  user: User;
}

export const useRegister = () => {
  const setAuth = useAuthStore((state) => state.setAuth);

  return useMutation<RegisterResponse, AxiosError<ApiErrorResponse>, RegisterFormData>({
    mutationFn: async (data: RegisterFormData) => {
      const { confirmPassword, ...payload } = data;
      const response = await apiClient.post<RegisterResponse>('/auth/register', payload);
      return response.data;
    },

    retry: (failureCount, error) => {
      const status = error.response?.status;
      if (status && status >= 400 && status < 500) {
        return false;
      }
      return failureCount < 2;
    },

    onSuccess: (data) => {
      setAuth(data.user);
    },
  });
};

