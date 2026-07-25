import React from 'react';
import type { ServiceFeature } from '../data/servicesData';

interface ServiceItemProps {
  service: ServiceFeature;
}

export const ServiceItem: React.FC<ServiceItemProps> = ({ service }) => {
  const Icon = service.icon;

  return (
    <div className="flex items-center gap-4 p-2 sm:p-4 rounded-2xl transition-all duration-200 hover:translate-y-[-2px]">
      <div className="text-red-600 dark:text-red-500 shrink-0">
        <Icon size={40} className="stroke-[1.75]" />
      </div>
      <div className="flex flex-col">
        <h4 className="font-bold text-gray-900 dark:text-white text-base sm:text-lg">
          {service.title}
        </h4>
        <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 font-medium">
          {service.description}
        </p>
      </div>
    </div>
  );
};