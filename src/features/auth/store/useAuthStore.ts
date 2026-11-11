import { create } from 'zustand';
import type { User } from '../../../types/auth';
import { apiClient } from '../../../api/axios';
import { useCartStore } from '../../cart/store/useCartStore';
import { queryClient } from '../../../queryClient';
interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;

  setAuth: (user: User) => void;
  logout: () => Promise<void>;
  clearAuth: () => void;
  setLoading: (isLoading: boolean) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: true,

  setAuth: (user: User) =>
    set({
      user,
      isAuthenticated: true,
      isLoading: false,
    }),

  logout: async () => {
    try {
      await apiClient.post('/auth/logout');
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      
      useCartStore.getState().clearCart(false);
      
      queryClient.clear(); 

      set({
        user: null,
        isAuthenticated: false,
        isLoading: false,
      });
    }
  },

  clearAuth: () => set({ user: null, isAuthenticated: false, isLoading: false }),

  setLoading: (isLoading: boolean) => set({ isLoading }),
}));
