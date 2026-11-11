
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { checkoutSchema, type ShippingDetails } from '../types';

interface CheckoutFormProps {
  onSubmit: (details: ShippingDetails) => void;
  isSubmitting: boolean;
}

export const CheckoutForm: React.FC<CheckoutFormProps> = ({ onSubmit, isSubmitting }) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ShippingDetails>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      paymentMethod: 'card',
    },
  });

  const selectedPayment = watch('paymentMethod');

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white">Shipping Information</h3>

        {/* Full Name */}
        <div>
          <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Full Name</label>
          <input
            {...register('fullName')}
            type="text"
            className={`w-full px-4 py-2.5 rounded-xl border bg-white dark:bg-zinc-800 text-gray-900 dark:text-white outline-none transition ${
              errors.fullName ? 'border-red-500 focus:ring-2 focus:ring-red-500' : 'border-gray-300 dark:border-zinc-700 focus:ring-2 focus:ring-blue-500'
            }`}
            placeholder="John Doe"
          />
          {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName.message}</p>}
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Email Address</label>
          <input
            {...register('email')}
            type="email"
            className={`w-full px-4 py-2.5 rounded-xl border bg-white dark:bg-zinc-800 text-gray-900 dark:text-white outline-none transition ${
              errors.email ? 'border-red-500 focus:ring-2 focus:ring-red-500' : 'border-gray-300 dark:border-zinc-700 focus:ring-2 focus:ring-blue-500'
            }`}
            placeholder="john@example.com"
          />
          {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
        </div>

        {/* Address & City */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Address</label>
            <input
              {...register('address')}
              type="text"
              className={`w-full px-4 py-2.5 rounded-xl border bg-white dark:bg-zinc-800 text-gray-900 dark:text-white outline-none transition ${
                errors.address ? 'border-red-500 focus:ring-2 focus:ring-red-500' : 'border-gray-300 dark:border-zinc-700 focus:ring-2 focus:ring-blue-500'
              }`}
              placeholder="123 Main St"
            />
            {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">City</label>
            <input
              {...register('city')}
              type="text"
              className={`w-full px-4 py-2.5 rounded-xl border bg-white dark:bg-zinc-800 text-gray-900 dark:text-white outline-none transition ${
                errors.city ? 'border-red-500 focus:ring-2 focus:ring-red-500' : 'border-gray-300 dark:border-zinc-700 focus:ring-2 focus:ring-blue-500'
              }`}
              placeholder="New York"
            />
            {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city.message}</p>}
          </div>
        </div>

        {/* Postal Code */}
        <div>
          <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Postal Code</label>
          <input
            {...register('postalCode')}
            type="text"
            className={`w-full px-4 py-2.5 rounded-xl border bg-white dark:bg-zinc-800 text-gray-900 dark:text-white outline-none transition ${
              errors.postalCode ? 'border-red-500 focus:ring-2 focus:ring-red-500' : 'border-gray-300 dark:border-zinc-700 focus:ring-2 focus:ring-blue-500'
            }`}
            placeholder="10001"
          />
          {errors.postalCode && <p className="text-red-500 text-xs mt-1">{errors.postalCode.message}</p>}
        </div>
      </div>

      {/* Payment Method Selector */}
      <div className="space-y-4 pt-4 border-t border-gray-200 dark:border-zinc-800">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white">Payment Method</h3>
        <div className="grid grid-cols-2 gap-4">
          <label className={`p-4 border rounded-xl flex items-center justify-center cursor-pointer transition ${
            selectedPayment === 'card' ? 'border-blue-500 bg-blue-50/50 dark:bg-blue-950/20' : 'border-gray-200 dark:border-zinc-800'
          }`}>
            <input {...register('paymentMethod')} type="radio" value="card" className="hidden" />
            <span className="font-semibold text-sm text-gray-800 dark:text-gray-200">Credit Card 💳</span>
          </label>

          <label className={`p-4 border rounded-xl flex items-center justify-center cursor-pointer transition ${
            selectedPayment === 'cash' ? 'border-blue-500 bg-blue-50/50 dark:bg-blue-950/20' : 'border-gray-200 dark:border-zinc-800'
          }`}>
            <input {...register('paymentMethod')} type="radio" value="cash" className="hidden" />
            <span className="font-semibold text-sm text-gray-800 dark:text-gray-200">Cash on Delivery 💵</span>
          </label>
        </div>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition duration-200 disabled:opacity-50 flex items-center justify-center gap-2"
      >
        {isSubmitting ? (
          <>
            <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
            Processing order...
          </>
        ) : (
          'Confirm & Pay'
        )}
      </button>
    </form>
  );
};
