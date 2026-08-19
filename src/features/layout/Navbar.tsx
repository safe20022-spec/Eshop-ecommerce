import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Search, ShoppingCart, ChevronDown, Sun, Moon, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useThemeStore } from '../../store/useThemeStore';
import { useCartStore } from '../../features/cart/store/useCartStore';

export const Navbar: React.FC = () => {
  const { isDarkMode, toggleTheme } = useThemeStore();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const totalItems = useCartStore((state) => state.getTotalItems());
  const toggleCart = useCartStore((state) => state.toggleCart);

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `transition-colors ${
      isActive
        ? 'text-red-600 dark:text-red-500 font-bold'
        : 'hover:text-red-600 dark:hover:text-red-500'
    }`;

  return (
    <header className="w-full bg-white dark:bg-gray-900 transition-colors duration-300 py-4 px-4 sm:px-6 md:px-12 sticky top-0 z-50 shadow-sm dark:shadow-gray-800/50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">

        {/* Mobile Menu Button & Logo */}
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-gray-700 dark:text-gray-200 hover:text-red-600 dark:hover:text-red-500 transition-colors p-1 cursor-pointer"
            aria-label="Toggle Mobile Menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          <Link to="/" className="text-xl sm:text-2xl font-black tracking-wider text-red-600">
            ESHOP
          </Link>
        </div>

        <nav className="hidden md:flex items-center space-x-6 lg:space-x-8 font-medium text-gray-700 dark:text-gray-200">
          <NavLink to="/" className={navLinkClass}>Home</NavLink>
          <NavLink to="/shop" className={navLinkClass}>Shop</NavLink>
          <Link to="#" className="hover:text-red-600 dark:hover:text-red-500 transition-colors">About</Link>
          <Link to="#" className="hover:text-red-600 dark:hover:text-red-500 transition-colors">Blogs</Link>
          <div className="relative group cursor-pointer flex items-center gap-1 hover:text-red-600 dark:hover:text-red-500 transition-colors">
            <span>Quick Links</span>
            <ChevronDown size={16} />
          </div>
        </nav>

        {/* Right Side Actions */}
        <div className="flex items-center space-x-3 sm:space-x-6">
          <button 
            aria-label="Search"
            className="text-gray-700 dark:text-gray-200 hover:text-red-600 dark:hover:text-red-500 transition-colors p-1 cursor-pointer"
          >
            <Search size={20} />
          </button>

          <button 
            onClick={toggleCart}
            aria-label="Shopping Cart"
            className="relative text-gray-700 dark:text-gray-200 hover:text-red-600 dark:hover:text-red-500 transition-colors p-1 cursor-pointer"
          >
            <ShoppingCart size={22} />
            {totalItems > 0 && (
              <motion.span 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                key={totalItems} 
                className="absolute -top-1 -right-2 bg-red-600 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center"
              >
                {totalItems > 99 ? '99+' : totalItems}
              </motion.span>
            )}
          </button>

          {/* Toggle Theme Button */}
          <button
            onClick={toggleTheme}
            aria-label="Toggle Theme"
            className={`relative w-12 sm:w-14 h-6 sm:h-7 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-300 ${
              isDarkMode ? 'bg-slate-700' : 'bg-amber-100'
            }`}
          >
            <motion.div
              className={`w-4 sm:w-5 h-4 sm:h-5 rounded-full flex items-center justify-center shadow-md ${
                isDarkMode ? 'bg-indigo-900 text-yellow-300' : 'bg-amber-400 text-white'
              }`}
              layout
              transition={{ type: 'spring', stiffness: 500, damping: 30 }}
              style={{ marginLeft: isDarkMode ? 'auto' : '0' }}
            >
              {isDarkMode ? <Moon size={10} /> : <Sun size={10} />}
            </motion.div>
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden overflow-hidden bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800 mt-3 pt-4 pb-2 px-2"
          >
            <div className="flex flex-col space-y-3 font-medium text-gray-700 dark:text-gray-200">
              <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-red-600 dark:hover:text-red-500 transition-colors py-1">Home</Link>
              <Link to="/shop" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-red-600 dark:hover:text-red-500 transition-colors py-1">Shop</Link>
              <Link to="#" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-red-600 dark:hover:text-red-500 transition-colors py-1">About</Link>
              <Link to="#" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-red-600 dark:hover:text-red-500 transition-colors py-1">Blogs</Link>
              <Link to="#" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-red-600 dark:hover:text-red-500 transition-colors py-1">Quick Links</Link>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
};