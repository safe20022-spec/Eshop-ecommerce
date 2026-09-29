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
  id: string | number;
  title: string;
  price: number;
  quantity: number;
  image?: string;
}

export interface OrderConfirmation {
  orderId: string;
  items: OrderItem[];
  details: ShippingDetails;
  totalAmount: number;
  createdAt?: string;
}