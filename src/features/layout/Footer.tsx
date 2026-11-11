import React from 'react';
import { Send, Phone,} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const IMPORTANT_LINKS = [
  { title: 'Home', href: '#' },
  { title: 'About', href: '#' },
  { title: 'Contact', href: '#' },
  { title: 'Blog', href: '#' },
];

const LINKS = [
  { title: 'Home', href: '#' },
  { title: 'About', href: '#' },
  { title: 'Contact', href: '#' },
  { title: 'Blog', href: '#' },
];

export const Footer: React.FC = () => {
  const navigate = useNavigate();
  return (
    <footer className="w-full bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 pt-12 pb-8 border-t border-gray-100 dark:border-gray-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-12">
          
          <div className="flex flex-col space-y-4">
            <a href="#" className="text-2xl font-black tracking-widest text-red-600 uppercase">
              ESHOP
            </a>
            <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 leading-relaxed max-w-sm">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
            </p>
            
            <div>
              <button
                onClick={() => navigate('/shop')}
                className="inline-block bg-red-600 hover:bg-red-700 text-white font-medium text-xs sm:text-sm px-5 py-2.5 rounded-full shadow-md transition-all duration-200 cursor-pointer"
              >
                Start Shoping
              </button>
            </div>
          </div>

          <div className="flex flex-col space-y-3">
            <h3 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white">
              Important Links
            </h3>
            <ul className="space-y-2 text-xs sm:text-sm">
              {IMPORTANT_LINKS.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-gray-500 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-500 transition-colors"
                  >
                    {link.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col space-y-3">
            <h3 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white">
              Links
            </h3>
            <ul className="space-y-2 text-xs sm:text-sm">
              {LINKS.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-gray-500 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-500 transition-colors"
                  >
                    {link.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col space-y-4">
            <div className="space-y-3 text-xs sm:text-sm text-gray-600 dark:text-gray-300 font-medium">
              <div className="flex items-center gap-3">
                <Send size={18} className="text-gray-800 dark:text-gray-200 shrink-0" />
                <span>Noida, Uttar Pradesh</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone size={18} className="text-gray-800 dark:text-gray-200 shrink-0" />
                <span>+91 123456789</span>
              </div>
            </div>

            <div className="flex items-center gap-4 pt-2">
              <a
                href="#"
                className="text-gray-800 dark:text-gray-200 hover:text-red-600 dark:hover:text-red-500 transition-colors"
                aria-label="Instagram"
              >
                Instagram
              </a>
              <a
                href="#"
                className="text-gray-800 dark:text-gray-200 hover:text-red-600 dark:hover:text-red-500 transition-colors"
                aria-label="Facebook"
              >
                Facebook
              </a>
              <a
                href="#"
                className="text-gray-800 dark:text-gray-200 hover:text-red-600 dark:hover:text-red-500 transition-colors"
                aria-label="LinkedIn"
              >
                Linkedin
              </a>
            </div>
          </div>

        </div>
      </div>
    </footer>
  );
};