import React from 'react';
import { motion } from 'framer-motion';
import { MAIN_BANNER_DATA } from '../data/bannerData';

export const Banner: React.FC = () => {
  const data = MAIN_BANNER_DATA;

  return (
    <section className="w-full px-4 sm:px-6 md:px-12 py-12 md:py-20">
      <div className="max-w-7xl mx-auto relative rounded-3xl bg-red-600 text-white px-6 sm:px-12 py-10 md:py-0 min-h-[340px] md:min-h-[380px] flex items-center">
        
        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-4 items-center z-10">
          
          <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-1 sm:space-y-2 order-1">
            <span className="text-sm sm:text-base font-semibold tracking-wider uppercase opacity-90">
              {data.discount}
            </span>
            <h2 className="text-4xl sm:text-6xl lg:text-7xl font-black uppercase tracking-tight leading-none">
              {data.title}
            </h2>
            <p className="text-xs sm:text-sm font-medium opacity-80 pt-1">
              {data.date}
            </p>
          </div>

          <div className="relative flex justify-center items-center order-2 md:order-2 h-[220px] sm:h-[280px]">
            <motion.img
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              src={data.image}
              alt={data.productName}
              className="w-auto max-h-[260px] sm:max-h-[340px] md:max-h-[420px] md:absolute md:-top-20 object-contain drop-shadow-[0_25px_25px_rgba(0,0,0,0.5)] pointer-events-none"
            />
          </div>

          <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-2 sm:space-y-3 order-3">
            <span className="text-sm sm:text-base font-bold tracking-wide">
              {data.productName}
            </span>
            <h3 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
              {data.saleTitle}
            </h3>
            <p className="text-xs sm:text-sm text-red-100 max-w-xs leading-relaxed opacity-90">
              {data.description}
            </p>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="mt-2 bg-white text-red-600 hover:bg-gray-100 font-bold text-sm px-8 py-3 rounded-full shadow-lg transition-colors cursor-pointer"
            >
              {data.buttonText}
            </motion.button>
          </div>

        </div>

      </div>
    </section>
  );
};