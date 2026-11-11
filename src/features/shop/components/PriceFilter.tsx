import React from 'react';

interface PriceFilterProps {
  maxPrice: number;
  onChange: (price: string) => void;
}

export const PriceFilter: React.FC<PriceFilterProps> = ({ maxPrice, onChange }) => {
  return (
    <div className="bg-gray-50 dark:bg-zinc-900 p-4 rounded-2xl border border-gray-100 dark:border-zinc-800 space-y-3">
      <div className="flex justify-between items-center text-sm font-bold text-gray-900 dark:text-white">
        <span>Max Price</span>
        <span className="text-red-600">${maxPrice}</span>
      </div>
      <input
        type="range"
        min="50"
        max="2000"
        step="50"
        value={maxPrice}
        onChange={(e) => onChange(e.target.value)}
        className="w-full accent-red-600 cursor-pointer"
      />
    </div>
  );
};