import React from 'react';
import { HeroSlider } from './components/HeroSlider';
import { CategoryServices } from './components/CategoryServices';
import { FeaturedProducts } from './components/FeaturedProducts';
import { ServicesList } from './components/ServicesList';
import { Banner } from './components/Banner';
import { RecentNews } from './components/RecentNews';

export const HomePage: React.FC = () => {
  return (
    <>
      <HeroSlider />
      <CategoryServices />
      <FeaturedProducts />
      <ServicesList />
      <Banner />
      <RecentNews />
    </>
  );
};