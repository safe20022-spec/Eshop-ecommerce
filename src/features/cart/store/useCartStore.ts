import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { toast } from 'react-toastify';
import { apiClient } from '../../../api/axios';
import type { CartStore, CartItem } from '../types';

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,

      toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),

      addItem: async (product, quantity = 1) => {
        
        set((state) => {
          const existingItem = state.items.find((item) => item.id === product.id);

          if (existingItem) {
            const updatedItems = state.items.map((item) =>
              item.id === product.id
                ? { ...item, quantity: item.quantity + quantity }
                : item
            );
            return { items: updatedItems, isOpen: true };
          }

          return {
            items: [...state.items, { ...product, quantity }],
            isOpen: true,
          };
        });

        toast.success(`${product.title} Added To The Cart`);

        
        try {
          await apiClient.post('/cart/items', { 
            productId: product.id, 
            quantity 
          });
        } catch (error) {
          console.error('Failed to sync added item with server', error);
        }
      },

      
      removeItem: async (id) => {
        const itemToRemove = get().items.find((item) => item.id === id);
        
        
        set((state) => ({
          items: state.items.filter((item) => item.id !== id),
        }));

        if (itemToRemove) {
          toast.info(`${itemToRemove.title} Removed From The Cart`);
        }

        
        try {
          await apiClient.delete(`/cart/items/${id}`);
        } catch (error) {
          console.error('Failed to sync item removal with server', error);
        }
      },

      
      clearCart: async (showToast = true) => {
        
        set({ items: [] });
        
        if (showToast) {
          toast.warn(`Cart Is Empty Now`);

          try {
          await apiClient.delete('/cart');
        } catch (error) {
          console.error('Failed to clear cart on server', error);
        }
        }
        
      },

      
      updateQuantity: async (id, delta) => {
        const currentItem = get().items.find((item) => item.id === id);
        if (!currentItem) return;

        const newQuantity = currentItem.quantity + delta;

        
        set((state) => {
          const updatedItems = state.items
            .map((item) => {
              if (item.id === id) {
                return newQuantity > 0 ? { ...item, quantity: newQuantity } : null;
              }
              return item;
            })
            .filter((item): item is CartItem => item !== null);

          return { items: updatedItems };
        });

      
        try {
          if (newQuantity <= 0) {
            await apiClient.delete(`/cart/items/${id}`);
          } else {
            await apiClient.patch(`/cart/items/${id}`, { quantity: newQuantity });
          }
        } catch (error) {
          console.error('Failed to sync quantity update with server', error);
        }
      },

      
      fetchServerCart: async () => {
        try {
          const response = await apiClient.get<{ items: CartItem[] }>('/cart');
          if (response.data?.items) {
            set({ items: response.data.items });
          }
        } catch {
          console.error('Failed to fetch server cart');
        }
      },

      
      mergeCartOnLogin: async () => {
        const localItems = get().items;
        
        if (localItems.length === 0) return;
        
        try {
          const response = await apiClient.post<{ items: CartItem[] }>('/cart/merge', {
            items: localItems.map(item => ({ productId: item.id, quantity: item.quantity }))
          });
          
          if (response.data?.items) {
            set({ items: response.data.items });
          }
        } catch {
          console.error('Failed to merge cart on login');
        }
      },

      getTotalPrice: () => {
        return get().items.reduce((sum, item) => sum + item.price * item.quantity, 0);
      },

      getTotalItems: () => {
        return get().items.reduce((sum, item) => sum + item.quantity, 0);
      },
    }),
    {
      name: 'shopping-cart-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ items: state.items }),
    }
  )
);
