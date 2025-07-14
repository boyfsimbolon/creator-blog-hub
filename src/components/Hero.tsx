import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Hero: React.FC = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Daftar teks yang akan ditampilkan bergantian
  const roles = ["Pengembang", "Penulis"];
  const [roleIndex, setRoleIndex] = React.useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }, 3000); // Ganti teks setiap 3 detik
    return () => clearInterval(interval);
  }, []);

  return (
    <section 
      id="home" 
      className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800 animate-gradient"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%239C92AC%22%20fill-opacity%3D%220.1%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%224%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]"></div>
      </div>

      <div className="container mx-auto px-4 text-white relative z-10 pt-[70px]">
        <div className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-16">
          {/* Gambar Profil */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="order-2 lg:order-1 w-48 h-48 md:w-64 md:h-64 lg:w-80 lg:h-80 rounded-full overflow-hidden border-4 border-white/30 shadow-xl"
          >
            <img 
              src="/profile.jpg" // Ganti dengan path gambar profil Anda
              alt="Boy Full Simbolon"
              className="w-full h-full object-cover"
            />
          </motion.div>

          {/* Konten Teks */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="order-1 lg:order-2 text-center lg:text-left max-w-2xl"
          >
            {/* Greeting */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start">
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="text-lg md:text-xl mb-4 text-blue-100"
              >
                Halo, Saya Boy Full Simbolon Seorang
              </motion.p>
              
              {/* Animated Role Text */}
              <div className="ml-2 h-8 flex items-center min-w-[120px] text-left relative justify-center md:justify-start">
              <AnimatePresence mode="wait">
                <motion.span
                  key={roles[roleIndex]}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="text-lg md:text-xl text-yellow-300 font-medium absolute mb-4"
                >
                  {roles[roleIndex]}
                </motion.span>
              </AnimatePresence>
            </div>
            </div>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="text-lg md:text-xl mb-5 text-blue-100 leading-relaxed"
            >
              Saya membangun solusi digital yang inovatif dengan React, TypeScript, dan Supabase. 
              Mari berkolaborasi untuk mewujudkan ide Anda menjadi kenyataan.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center"
            >
              <motion.button
                onClick={() => scrollToSection('portfolio')}
                className="px-8 py-4 bg-white text-purple-600 font-semibold rounded-full hover:bg-opacity-90 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Lihat Proyek Saya
              </motion.button>
              
              <motion.button
                onClick={() => scrollToSection('blog')}
                className="px-8 py-4 border-2 border-white text-white font-semibold rounded-full hover:bg-white hover:text-purple-600 transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Baca Blog
              </motion.button>
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.8 }}
              className="mt-12 flex justify-center lg:justify-start space-x-6"
            >
              {[
                { name: 'GitHub', icon:'/github.svg', url: 'https://github.com/boysimbolon' },
                { name: 'LinkedIn', icon: '/linkedin.svg', url: 'https://linkedin.com/in/boyfullsimbolon' },
                { name: 'Instagram', icon: '/instagram.svg', url: 'https://instagram.com/boysmbln' },
                { name: 'Email', icon: 'email.svg', url: 'mailto:boyfullsimbolon@gmail.com' }
              ].map((social, index) => (
                <motion.a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 flex items-center justify-center rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all text-2xl"
                  whileHover={{ scale: 1.1, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.2 + index * 0.1 }}
                  title={social.name}
                >
                  <img src={social.icon} alt={social.name} />
                </motion.a>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Floating Elements - React Logo */}
      
    </section>
  );
};

export default Hero;