import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HERO_SLIDES } from '../data/heroSlides';

export const HeroSlider: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const currentSlide = HERO_SLIDES[currentIndex];

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % HERO_SLIDES.length);
  }, []);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNext, handlePrev]);

  const handleDragEnd = (_: any, info: { offset: { x: number } }) => {
    if (info.offset.x < -50) {
      handleNext();
    } else if (info.offset.x > 50) {
      handlePrev();
    }
  };

  const handleScrollToCategories = () => {
    const element = document.getElementById('categories');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="w-full px-2 sm:px-6 md:px-12 py-2 sm:py-4" aria-label="main-slider">
      <div className="max-w-7xl mx-auto relative overflow-hidden rounded-2xl sm:rounded-3xl bg-gray-200/70 dark:bg-gray-800/60 min-h-[500px] sm:min-h-[520px] lg:min-h-[550px] flex items-center select-none shadow-sm">

        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide.id}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.15}
            onDragEnd={handleDragEnd}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="w-full h-full flex flex-col-reverse md:flex-row items-center justify-between px-6 sm:px-10 md:px-16 py-8 sm:py-12 cursor-grab active:cursor-grabbing relative gap-6 md:gap-0"
          >
            {/* Text Side */}
            <div className="z-10 flex flex-col items-center md:items-start text-center md:text-left space-y-2 sm:space-y-3 max-w-lg w-full">
              <motion.span 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-base sm:text-lg md:text-xl font-bold text-red-600 dark:text-red-400"
              >
                {currentSlide.subtitle}
              </motion.span>

              <motion.h1 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 dark:text-white tracking-tight leading-tight"
              >
                {currentSlide.title}
              </motion.h1>

              <div className="relative w-full overflow-hidden select-none">
                <span className="text-4xl sm:text-5xl md:text-7xl font-black text-gray-900/5 dark:text-gray-100/5 block pointer-events-none">
                  {currentSlide.bgTitle}
                </span>
              </div>

              <motion.button
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleScrollToCategories}
                className="mt-2 sm:mt-4 bg-red-600 hover:bg-red-700 text-white text-sm sm:text-base font-medium px-6 sm:px-8 py-2.5 sm:py-3 rounded-full shadow-lg hover:shadow-red-500/30 transition-all duration-200 cursor-pointer"
              >
                {currentSlide.buttonText}
              </motion.button>
            </div>

            {/* Image Side */}
            <div className="relative z-10 flex justify-center items-center w-full md:w-1/2 min-h-[200px] sm:min-h-[280px]">
              <motion.img
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, type: 'spring', stiffness: 120 }}
                src={currentSlide.imgUrl}
                alt={currentSlide.title}
                loading={currentIndex === 0 ? "eager" : "lazy"}
                fetchPriority={currentIndex === 0 ? "high" : "auto"}
                className="max-h-[220px] sm:max-h-[320px] md:max-h-[380px] w-auto object-contain drop-shadow-2xl pointer-events-none"
              />
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Dots Navigation Buttons */}
        <div className="absolute bottom-3 sm:bottom-4 left-1/2 -translate-x-1/2 z-20 flex items-center space-x-2">
          {HERO_SLIDES.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              aria-label={`Go To Slide Number${idx + 1}`}
              className={`h-2 sm:h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                currentIndex === idx 
                  ? 'w-5 bg-red-600' 
                  : 'w-2 sm:w-2.5 bg-gray-400 dark:bg-gray-600 hover:bg-gray-500'
              }`}
            />
          ))}
        </div>

      </div>
    </section>
  );
};