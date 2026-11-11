import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import { apiClient } from '../../../api/axios';
import { useCartStore } from '../../cart/store/useCartStore';
import type { ShippingDetails, OrderConfirmation } from '../types';

interface CreateOrderPayload {
  items: ReturnType<typeof useCartStore.getState>['items'];
  details: ShippingDetails;
  totalAmount: number;
}

interface ApiErrorResponse {
  message?: string;
  errors?: Record<string, string>;
}

export const useCreateOrder = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { items, clearCart, getTotalPrice } = useCartStore();

  return useMutation<OrderConfirmation, AxiosError<ApiErrorResponse>, ShippingDetails>({
    mutationFn: async (details: ShippingDetails) => {
      const payload: CreateOrderPayload = {
        items,
        details,
        totalAmount: getTotalPrice(),
      };

      const response = await apiClient.post<OrderConfirmation>('/orders', payload);
      return response.data;
    },

    onSuccess: (data) => {
      clearCart(true);

      
      queryClient.invalidateQueries({ queryKey: ['orders'] });

      
      navigate(`/orders/${data.orderId}`, { replace: true });
      
      toast.success('Order placed successfully!');
    },
    

    onError: (error) => {
      
      const serverMessage = error.response?.data?.message;

      if (error.response?.status === 400) {
        toast.error(serverMessage || 'Invalid order data. Please check your input.');
      } else if (error.response?.status === 409) {
        toast.error(serverMessage || 'Some items in your cart are out of stock.');
      } else {
        toast.error(serverMessage || 'Failed to process your order. Please try again.');
      }
    },
  });
};