import React, { useState, useEffect } from 'react';
import { useDebounce } from '../hooks/useDebounce';

interface ProductSearchProps {
  value: string;
  onChange: (search: string) => void;
}

export const ProductSearch: React.FC<ProductSearchProps> = ({ value, onChange }) => {
  const [searchTerm, setSearchTerm] = useState(value);
  const debouncedSearch = useDebounce(searchTerm, 350);

  useEffect(() => {
    if (debouncedSearch !== value) {
      onChange(debouncedSearch);
    }
  }, [debouncedSearch, onChange, value]);

  return (
    <div className="relative w-full">
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search products by name, description..."
        className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition"
      />
      <span className="absolute left-3.5 top-3 text-gray-400">🔍</span>
      {searchTerm && (
        <button
          onClick={() => { setSearchTerm(''); onChange(''); }}
          className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600 text-sm"
        >
          ✕
        </button>
      )}
    </div>
  );
};