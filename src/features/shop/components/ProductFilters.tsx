import React from 'react';
import { CategoryFilter } from './CategoryFilter';
import { PriceFilter } from './PriceFilter';
import { ResetFiltersButton } from './ResetFiltersButton';

interface ProductFiltersProps {
  categories: string[];
  selectedCategory: string;
  maxPrice: number;
  isFiltered: boolean;
  onSelectCategory: (cat: string) => void;
  onPriceChange: (price: string) => void;
  onReset: () => void;
}

export const ProductFilters: React.FC<ProductFiltersProps> = ({
  categories,
  selectedCategory,
  maxPrice,
  isFiltered,
  onSelectCategory,
  onPriceChange,
  onReset,
}) => {
  return (
    <aside className="w-full lg:w-64 space-y-6">
      <CategoryFilter
        categories={categories}
        selectedCategory={selectedCategory}
        onSelectCategory={onSelectCategory}
      />

      <PriceFilter maxPrice={maxPrice} onChange={onPriceChange} />

      {isFiltered && <ResetFiltersButton onReset={onReset} />}
    </aside>
  );
};

