import type { OrderConfirmation } from "../features/checkout/types";

export interface User {
  id: string;
  name: string;
  email: string;
  orders: OrderConfirmation[],
}

export interface AuthResponse {
  user: User;
  token: string;
}