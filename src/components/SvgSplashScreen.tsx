import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface SvgSplashScreenProps {
  children: React.ReactNode;
}

const SvgSplashScreen: React.FC<SvgSplashScreenProps> = ({ children }) => {
  const [showSplash, setShowSplash] = useState(true);
  const carouselRef = useRef<HTMLDivElement>(null);

  // Auto scroll + hide after 7s
  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 7000);

    const scrollInterval = setInterval(() => {
      const container = carouselRef.current;
      if (container) {
        container.scrollLeft += 0.5;
        if (container.scrollLeft + container.offsetWidth >= container.scrollWidth) {
          container.scrollLeft = 0;
        }
      }
    }, 16);

    return () => {
      clearTimeout(timer);
      clearInterval(scrollInterval);
    };
  }, []);

  const svgs = [
    "icons1.svg",
    "icons2.svg",
    "icons3.svg",
    "icons4.svg",
    "icons5.svg",
    "icons6.svg",
    "icons7.svg",
    "icons8.svg",
  ];

  return (
    <div className="w-full h-screen">
      <AnimatePresence>
        {showSplash ? (
          <motion.div
            key="splash"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="w-full h-screen flex items-center px-[30px] justify-center bg-white dark:bg-gray-900"
          >
            <div
              ref={carouselRef}
              className="flex gap-6 overflow-hidden px-6 py-4"
              style={{ scrollBehavior: 'smooth' }}
            >
              {svgs.map((src, i) => (
                <motion.img
                  key={i}
                  src={src}
                  alt={`icon-${i}`}
                  className="w-8 h-8 object-contain shrink-0"
                  whileHover={{ scale: 1.2 }}
                  initial={{ y: -10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                />
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="main"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SvgSplashScreen;
