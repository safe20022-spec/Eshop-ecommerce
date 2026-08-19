import type { Product } from "../../shop/data/mockProducts";

export interface CartItem extends Product {
  quantity: number;
}

export interface CartStore {
  items: CartItem[];
  isOpen: boolean; 
  
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, delta: number) => void;
  clearCart: () => void;
  toggleCart: () => void;
  
  // Computed getters
  getTotalPrice: () => number;
  getTotalItems: () => number;
}