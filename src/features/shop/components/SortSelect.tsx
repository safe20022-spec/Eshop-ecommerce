import React from 'react';
import { SlidersHorizontal } from 'lucide-react';

interface SortSelectProps {
  value: string;
  onChange: (val: string) => void;
}

export const SortSelect: React.FC<SortSelectProps> = ({ value, onChange }) => {
  return (
    <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
      <SlidersHorizontal size={16} className="text-gray-400" />
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="px-3 py-2 text-sm border border-gray-200 dark:border-zinc-800 rounded-xl bg-white dark:bg-zinc-900 text-gray-900 dark:text-white focus:outline-none cursor-pointer"
      >
        <option value="default">Sort by: Featured</option>
        <option value="price-low">Price: Low to High</option>
        <option value="price-high">Price: High to Low</option>
      </select>
    </div>
  );
};