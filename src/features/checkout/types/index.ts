import { z } from 'zod';

export const checkoutSchema = z.object({
  fullName: z.string().min(3, 'Full name should be atleast 3 chars'),
  email: z.string().email('Invalid email'),
  address: z.string().min(5, 'Address required'),
  city: z.string().min(2, 'City name is required'),
  postalCode: z.string().min(3, 'Postal Code is required'),
  paymentMethod: z.enum(['card', 'cash']),
});

export type ShippingDetails = z.infer<typeof checkoutSchema>;

export interface OrderConfirmation {
  orderId: string;
  details: ShippingDetails;
  totalAmount: number;
}