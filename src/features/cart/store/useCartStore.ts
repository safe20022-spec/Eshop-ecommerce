import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { toast } from 'react-toastify';
import type { CartStore, CartItem } from '../types';

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,

      toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),

      addItem: (product, quantity = 1) => {
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
      },

      removeItem: (id) => {
        const itemToRemove = get().items.find((item) => item.id === id);
        
        set((state) => ({
          items: state.items.filter((item) => item.id !== id),
        }));

        if (itemToRemove) {
          toast.info(`${itemToRemove.title} Removed From The Cart`);
        }
      },

      
      clearCart: () => {
        set({ items: [] });
        toast.warn(`Cart Is Empty Now`);
      },

      updateQuantity: (id, delta) => {
        set((state) => {
          const updatedItems = state.items
            .map((item) => {
              if (item.id === id) {
                const newQuantity = item.quantity + delta;
                return newQuantity > 0 ? { ...item, quantity: newQuantity } : null;
              }
              return item;
            })
            .filter((item): item is CartItem => item !== null);

          return { items: updatedItems };
        });
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