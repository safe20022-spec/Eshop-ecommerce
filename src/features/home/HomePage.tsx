import React from 'react';
import { HeroSlider } from './components/HeroSlider';
import { CategoryServices } from './components/CategoryServices';
import { FeaturedProducts } from './components/FeaturedProducts';
import { ServicesList } from './components/ServicesList';
import { Banner } from './components/Banner';
import { RecentNews } from './components/RecentNews';


export const HomePage: React.FC = () => {
  return (
    <main className="flex flex-col gap-10 md:gap-16 pb-16 overflow-hidden">
      <HeroSlider />

      <CategoryServices />

      <FeaturedProducts />

      <ServicesList />

      <Banner />

      <RecentNews />
    </main>
  );
};

