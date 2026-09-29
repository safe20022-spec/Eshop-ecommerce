
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { apiClient } from '../../../api/axios';
import { useAuthStore } from '../store/useAuthStore';
import type { RegisterFormData } from '../schemas/register.schema';
import type { User } from '../../../types/auth';

// 1. تعريف واجهة الأخطاء القادمة من الـ API
export interface ApiErrorResponse {
  message?: string;
  errors?: Record<string, string>;
}

export interface RegisterResponse {
  user: User;
}

export const useRegister = () => {
  const setAuth = useAuthStore((state) => state.setAuth);

  // 2. تمرير أنواع البيانات لـ useMutation لضمان Type Safety كاملة
  return useMutation<RegisterResponse, AxiosError<ApiErrorResponse>, RegisterFormData>({
    mutationFn: async (data: RegisterFormData) => {
      const { confirmPassword, ...payload } = data;
      const response = await apiClient.post<RegisterResponse>('/auth/register', payload);
      return response.data;
    },

    // 3. منع إعادة المحاولة لأخطاء العميل (4xx) مثل 400 و 409 و 422
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

