import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface SvgSplashScreenProps {
  children: React.ReactNode;
}

const SvgSplashScreen: React.FC<SvgSplashScreenProps> = ({ children }) => {
  const [showSplash, setShowSplash] = useState(true);
  const carouselRef = useRef<HTMLDivElement>(null);

  const svgs = [
    { icon: "/icons1.svg", title: "Anu" },
    { icon: "/icons2.svg", title: "berno" },
    { icon: "/icons3.svg", title: "benar" },
    { icon: "/icons4.svg", title: "astagah" },
    { icon: "/icons5.svg", title: "sakit" },
    { icon: "/icons6.svg", title: "uhuk" },
    { icon: "/icons7.svg", title: "beneran" },
    { icon: "/icons8.svg", title: "sakit oi" },
  ];

  // Duplikat array untuk infinite scroll halus
  const duplicatedSvgs = [...svgs, ...svgs];

  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 17000);

    const scrollSpeed = 0.5; // px per tick
    const interval = setInterval(() => {
      const container = carouselRef.current;
      if (container) {
        container.scrollLeft -= scrollSpeed;

        if (container.scrollLeft <= 0) {
          container.scrollLeft = container.scrollWidth / 2;
        }
      }
    }, 16);

    // Set scrollLeft awal ke tengah supaya mulai dari ikon pertama duplikat kedua
    if (carouselRef.current) {
      carouselRef.current.scrollLeft = carouselRef.current.scrollWidth / 2;
    }

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="w-full h-screen">
      <AnimatePresence mode="wait">
        {showSplash ? (
          <motion.div
            key="splash"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="w-full h-screen flex items-center justify-center bg-white dark:bg-gray-900 px-6"
          >
            <div
              ref={carouselRef}
              className="flex gap-6 overflow-x-hidden whitespace-nowrap"
              style={{ width: 350, scrollBehavior: "auto" }}
            >
              {duplicatedSvgs.map((item, i) => (
                <motion.div
                  key={i}
                  className="flex flex-col items-center shrink-0 w-16"
                  initial={{ y: -10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: (i % svgs.length) * 0.1 }}
                  whileHover={{ scale: 1.2 }}
                >
                  <img
                    src={item.icon}
                    alt={`icon-${i}`}
                    className="w-8 h-8 object-contain"
                  />
                  <span className="mt-1 text-xs text-center text-gray-700 dark:text-gray-300">
                    {item.title}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="main"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="w-full h-full"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SvgSplashScreen;
