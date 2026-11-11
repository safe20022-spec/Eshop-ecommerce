import { z } from 'zod';

export const checkoutSchema = z.object({
  fullName: z.string().min(3, 'Full name should be at least 3 chars'),
  email: z.string().email('Invalid email'),
  address: z.string().min(5, 'Address is required'),
  city: z.string().min(2, 'City name is required'),
  postalCode: z.string().min(3, 'Postal Code is required'),
  paymentMethod: z.enum(['card', 'cash']),
});

export type ShippingDetails = z.infer<typeof checkoutSchema>;

export interface OrderItem {
  id: string;
  title: string;
  price: number;
  quantity: number;
  image?: string;
}

export interface OrderDetails {
  fullName: string;
  email: string;
  address: string;
  city: string;
  postalCode: string;
}

export interface OrderConfirmation {
  orderId: string;
  items: OrderItem[];
  details: OrderDetails;
  totalAmount: number;
  createdAt: string;
  status?: 'Processing' | 'Shipped' | 'Completed' | 'Cancelled';
}