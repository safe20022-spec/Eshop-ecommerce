import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { apiClient } from '../../../api/axios';
import { useAuthStore } from '../store/useAuthStore';
import type { LoginFormData } from '../schemas/login.schema';
import type { User } from '../../../types/auth';
import type { ApiErrorResponse } from '../utils/handleFormErrors';

export interface LoginResponse {
  user: User;
}

export const useLogin = () => {
  const setAuth = useAuthStore((state) => state.setAuth);

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

    onSuccess: (data) => {
      setAuth(data.user);
    },
  });
};