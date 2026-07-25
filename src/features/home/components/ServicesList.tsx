import React from 'react';
import { ServiceItem } from './ServiceItem';
import { SERVICES_DATA } from '../data/servicesData';

export const ServicesList: React.FC = () => {
  return (
    <section className="w-full px-4 sm:px-6 md:px-12 py-10 my-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
        {SERVICES_DATA.map((service) => (
          <ServiceItem key={service.id} service={service} />
        ))}
      </div>
    </section>
  );
};