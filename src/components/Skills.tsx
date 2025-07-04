import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { Skill } from '../types';
import { getSkills } from '../lib/supabase';


const Skills: React.FC = () => {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState<'all' | 'frontend' | 'backend' | 'tools' | 'other'>('all');

  // Dummy data for fallback
  const dummySkills: Skill[] = [
   
  ];

  useEffect(() => {
    const loadSkills = async () => {
      try {
        setLoading(true);
        console.log('Fetching skills from Supabase...');
        const supabaseSkills = await getSkills();

        if (supabaseSkills.length > 0) {
          setSkills(supabaseSkills);
          console.log('Skills loaded from Supabase:', supabaseSkills);
        } else {
          console.log('No skills from Supabase, using dummy data');
          setSkills(dummySkills);
        }
      } catch (error) {
        console.error('Error loading skills:', error);
        setSkills(dummySkills);
      } finally {
        setLoading(false);
      }
    };

    loadSkills();
  }, []);

  const categories = [
    { key: 'all' as const, label: 'Semua', icon: '🌟' },
    { key: 'frontend' as const, label: 'Frontend', icon: '🎨' },
    { key: 'backend' as const, label: 'Backend', icon: '⚙️' },
    { key: 'tools' as const, label: 'Tools', icon: '🛠️' },
    { key: 'other' as const, label: 'Lainnya', icon: '💡' },
  ];

  const filteredSkills = activeCategory === 'all'
    ? skills
    : skills.filter((skill) => skill.category === activeCategory);

  const handleCategoryChange = (category: typeof activeCategory) => {
    setLoading(true); // Trigger loading state when category changes
    setActiveCategory(category);
    // Simulate loading delay for smoother UX (remove in production if not needed)
    setTimeout(() => setLoading(false), 500);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  const skillBarVariants = {
    hidden: { width: 0 },
    visible: (level: number) => ({
      width: `${level}%`,
      transition: {
        duration: 1.5,
        ease: 'easeOut',
        delay: 0.5,
      },
    }),
  };

  if (loading) {
    return (
      <section id="skills" className="py-20 min-h-screen flex items-center">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-muted-foreground">Memuat keahlian...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      <Helmet>
        <title>Keahlian & Teknologi - Portfolio</title>
        <meta name="description" content="Kumpulan keahlian dan teknologi yang dikuasai untuk membangun solusi digital inovatif" />
        <meta name="keywords" content="skills, teknologi, frontend, backend, tools, portfolio" />
        <link rel="canonical" content="https://yourwebsite.com/skills" />
      </Helmet>

      <section id="skills" className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={containerVariants}
            className="max-w-6xl mx-auto"
          >
            {/* Section Header */}
            <motion.div variants={itemVariants} className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 gradient-text">
                Keahlian & Teknologi
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Teknologi dan tools yang saya kuasai untuk membangun solusi digital yang inovatif dan skalabel
              </p>
            </motion.div>

            {/* Category Filter */}
            <motion.div variants={itemVariants} className="flex flex-wrap justify-center gap-4 mb-12">
              {categories.map((category) => (
                <motion.button
                  key={category.key}
                  onClick={() => handleCategoryChange(category.key)}
                  className={`flex items-center space-x-2 px-6 py-3 rounded-full font-medium transition-all ${
                    activeCategory === category.key
                      ? 'bg-primary text-primary-foreground shadow-lg scale-105'
                      : 'bg-muted text-muted-foreground hover:bg-primary/10 hover:text-primary'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={`Filter keahlian berdasarkan ${category.label}`}
                >
                  <span className="text-lg">{category.icon}</span>
                  <span>{category.label}</span>
                  <span className="text-sm opacity-70">
                    ({category.key === 'all' ? skills.length : skills.filter((s) => s.category === category.key).length})
                  </span>
                </motion.button>
              ))}
            </motion.div>

            {/* Skills Grid */}
            <motion.div
              variants={containerVariants}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              {filteredSkills.length === 0 ? (
                <motion.div variants={itemVariants} className="text-center col-span-full">
                  <p className="text-muted-foreground">Tidak ada keahlian ditemukan untuk kategori ini.</p>
                </motion.div>
              ) : (
                filteredSkills.map((skill) => (
                  <motion.div
                    key={skill.id}
                    variants={itemVariants}
                    className="bg-card rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <span className="text-2xl">{skill.icon}</span>
                        <h3 className="text-lg font-semibold">{skill.name}</h3>
                      </div>
                      <span className="text-sm font-medium text-primary">{skill.level}%</span>
                    </div>

                    {/* Progress Bar */}
                    <div className="relative">
                      <div className="w-full bg-muted rounded-full h-3 overflow-hidden">
                        <motion.div
                          className="h-full bg-gradient-to-r from-primary to-primary/80 rounded-full"
                          variants={skillBarVariants}
                          initial="hidden"
                          whileInView="visible"
                          viewport={{ once: true }}
                          custom={skill.level}
                        />
                      </div>

                      {/* Skill Level Indicator */}
                      <div className="flex justify-between text-xs text-muted-foreground mt-2">
                        <span>Beginner</span>
                        <span>Intermediate</span>
                        <span>Advanced</span>
                        <span>Expert</span>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </motion.div>

            {/* Skills Summary */}
            <motion.div variants={itemVariants} className="mt-16">
              <div className="bg-gradient-to-r from-primary/10 via-purple-500/10 to-primary/10 rounded-2xl p-8">
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold mb-4">Fokus Keahlian</h3>
                  <p className="text-muted-foreground max-w-3xl mx-auto">
                    Saya terus mengembangkan keahlian dalam teknologi modern dan best practices untuk memberikan solusi terbaik bagi setiap proyek yang dikerjakan.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="text-center">
                    <div className="text-4xl mb-4">🎯</div>
                    <h4 className="font-semibold mb-2">Frontend Excellence</h4>
                    <p className="text-sm text-muted-foreground">
                      Membangun user interface yang responsif, aksesibel, dan performan dengan ekosistem React
                    </p>
                  </div>

                  <div className="text-center">
                    <div className="text-4xl mb-4">⚡</div>
                    <h4 className="font-semibold mb-2">Full-Stack Development</h4>
                    <p className="text-sm text-muted-foreground">
                      Integrasi seamless antara frontend dan backend menggunakan modern stack seperti Supabase
                    </p>
                  </div>

                  <div className="text-center">
                    <div className="text-4xl mb-4">🚀</div>
                    <h4 className="font-semibold mb-2">Performance & SEO</h4>
                    <p className="text-sm text-muted-foreground">
                      Optimasi aplikasi untuk kecepatan dan visibilitas mesin pencari dengan praktik terbaik terkini
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Learning Path */}
            <motion.div variants={itemVariants} className="mt-16 text-center">
              <h3 className="text-xl font-bold mb-4">🎓 Sedang Belajar</h3>
              <div className="flex flex-wrap justify-center gap-3">
                {['Web3 Development', 'Machine Learning', 'Cloud Architecture', 'Mobile Development'].map((learning) => (
                  <span
                    key={learning}
                    className="px-4 py-2 bg-secondary text-secondary-foreground rounded-full text-sm font-medium border-2 border-dashed border-primary/30"
                  >
                    {learning}
                  </span>
                ))}
              </div>
              <p className="text-muted-foreground mt-4 text-sm">
                Terus belajar dan berkembang mengikuti tren teknologi terbaru
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default Skills;