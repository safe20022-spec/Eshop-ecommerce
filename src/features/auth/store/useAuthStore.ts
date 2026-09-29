import { create } from 'zustand';
import type { User } from '../../../types/auth';
import { apiClient } from '../../../api/axios';
import { useCartStore } from '../../cart/store/useCartStore';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean; // لمعرفة هل جاري تفقد الكوكي عبر السيرفر أم لا

  // Actions
  setAuth: (user: User) => void;
  logout: () => Promise<void>; // تحويل الدالة لـ Promise لتستطيع استخدام await عند استدعائها
  setLoading: (isLoading: boolean) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: true, // يبدأ بـ true للتأكد عند فتح التطبيق

  // 1. عند تسجيل الدخول أو تأكيد الجلسة من /me
  setAuth: (user: User) =>
    set({
      user,
      isAuthenticated: true,
      isLoading: false,
    }),

  // 2. عند تسجيل الخروج
  logout: async () => {
    try {
      // إرسال طلب للباك إيند لإلغاء الجلسة وحذف الكوكي المشفرة
      await apiClient.post('/auth/logout');
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      useCartStore.getState().clearCart();
      // تصفير بيانات الجلسة محلياً في كل الأحوال (حتى لو حدث خطأ في الشبكة)
      set({
        user: null,
        isAuthenticated: false,
        isLoading: false,
      });
    }
  },

  setLoading: (isLoading: boolean) => set({ isLoading }),
}));