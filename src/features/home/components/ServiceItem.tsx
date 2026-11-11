import React from 'react';
import type { ServiceFeature } from '../data/servicesData';

interface ServiceItemProps {
  service: ServiceFeature;
}

export const ServiceItem: React.FC<ServiceItemProps> = ({ service }) => {
  const Icon = service.icon;

  return (
    <div className="flex items-center gap-4 p-3 sm:p-4 rounded-2xl bg-white dark:bg-gray-800/40 border border-gray-100 dark:border-gray-800/60 shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-0.5">
      {/* Service Icon */}
      {Icon && (
        <div className="text-red-600 dark:text-red-500 shrink-0 bg-red-50 dark:bg-red-900/10 p-3 rounded-xl">
          <Icon size={28} className="stroke-[1.75]" />
        </div>
      )}

      {/* Service Info */}
      <div className="flex flex-col">
        <h4 className="font-bold text-gray-900 dark:text-white text-base sm:text-lg">
          {service.title}
        </h4>
        <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 font-medium mt-0.5">
          {service.description}
        </p>
      </div>
    </div>
  );
};