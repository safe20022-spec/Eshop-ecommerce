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

    const isSilentCheckRoute = requestUrl.includes('/auth/me');

    const isPublicAuthRoute = 
      requestUrl.includes('/auth/login') || 
      requestUrl.includes('/auth/register');

    if (status === 401 && !isPublicAuthRoute && !isSilentCheckRoute) {
      useAuthStore.getState().logout();
      toast.error('Session expired. Please log in again.');
    }

    // 2. Network Error / Offline
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
