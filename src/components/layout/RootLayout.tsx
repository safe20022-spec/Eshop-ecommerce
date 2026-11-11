import { Outlet } from 'react-router-dom';
import { Navbar } from '../../features/layout/Navbar';
import { Footer } from '../../features/layout/Footer';

export const RootLayout: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-gray-900 transition-colors duration-300 overflow-x-hidden">
      <Navbar />
      
      <main className="container mx-auto flex-1">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};