import React from 'react';
import { Navbar } from './features/layout/Navbar';
import { Footer } from './features/layout/Footer';
import { HeroSlider } from './features/home/components/HeroSlider';
import { CategoryServices } from './features/home/components/CategoryServices';
import { FeaturedProducts } from './features/home/components/FeaturedProducts';
import { ServicesList } from './features/home/components/ServicesList';
import { Banner } from './features/home/components/Banner';
import { RecentNews } from './features/home/components/RecentNews';

export const App: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-gray-900 transition-colors duration-300 overflow-x-hidden">
      <Navbar />
      <main className="container mx-auto flex-1">
        <HeroSlider />
        <CategoryServices />
        <FeaturedProducts />
        <ServicesList />
        <Banner />
        <RecentNews />
      </main>
      <Footer />
    </div>
  );
};

export default App;