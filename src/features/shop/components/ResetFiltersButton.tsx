import React from 'react';
import { RotateCcw } from 'lucide-react';

interface ResetFiltersButtonProps {
  onReset: () => void;
}

export const ResetFiltersButton: React.FC<ResetFiltersButtonProps> = ({ onReset }) => {
  return (
    <button
      onClick={onReset}
      className="w-full flex items-center justify-center gap-2 py-2 text-xs font-semibold text-gray-500 hover:text-red-600 border border-dashed border-gray-300 dark:border-zinc-700 rounded-xl transition"
    >
      <RotateCcw size={14} /> Reset All Filters
    </button>
  );
};