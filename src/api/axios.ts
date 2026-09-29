
import axios from 'axios';
import { toast } from 'react-toastify';
import { useAuthStore } from '../features/auth/store/useAuthStore';

export const apiClient = axios.create({
  baseURL: '/api',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;
    const requestUrl = error.config?.url || '';

    // المسارات التي لا تخضع لإجراء تسجيل الخروج عند خطأ 401
    const isPublicAuthRoute = 
      requestUrl.includes('/auth/login') || 
      requestUrl.includes('/auth/register');

    // 1. التعامل مع انتهاء الجلسة (401) فقط للمسارات المحمية
    if (status === 401 && !isPublicAuthRoute) {
      useAuthStore.getState().logout();
      toast.error('Session expired. Please log in again.');
    }

    // 2. Network Error / Offline (فقط إذا لم تكن المعالجة مخصصة محلياً في المكون)
    else if (!error.response) {
      toast.error('Network error. Please check your internet connection.');
    }

    // 3. Rate Limiting (429)
    else if (status === 429) {
      toast.error('Too many requests. Please try again later.');
    }

    // 4. Internal Server Errors (5xx)
    else if (status && status >= 500) {
      toast.error('Server error. We are working on resolving the issue.');
    }

    return Promise.reject(error);
  }
);