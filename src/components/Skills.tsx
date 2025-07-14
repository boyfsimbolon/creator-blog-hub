import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Skill } from '../types';
import { getSkills } from '../lib/supabase';

const Skills: React.FC = () => {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState<'all' | 'frontend' | 'backend' | 'tools' | 'other'>('all');

  const dummySkills: Skill[] = [
    {
      id: 'dummy',
      name: 'Coming Soon',
      level: 50,
      category: 'other',
      icon: '⏳',
    },
  ];

  useEffect(() => {
    const loadSkills = async () => {
      try {
        setLoading(true);
        const supabaseSkills = await getSkills();
        setSkills(supabaseSkills.length > 0 ? supabaseSkills : dummySkills);
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
    : skills.filter(skill => skill.category === activeCategory);

  const handleCategoryChange = (category: typeof activeCategory) => {
    setActiveCategory(category);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
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
      <section id="skills" className="py-20 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Memuat keahlian...</p>
        </div>
      </section>
    );
  }

  return (
    <section id="skills" className="py-20 min-h-screen">
      <div className="container mx-auto px-4">
        <motion.div
          initial="hidden"
          animate="visible"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={containerVariants}
          className="max-w-6xl mx-auto"
        >
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 gradient-text">
              Keahlian & Teknologi
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Teknologi dan tools yang saya kuasai untuk membangun solusi digital yang inovatif dan skalabel
            </p>
          </motion.div>

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
              >
                <span className="text-lg">{category.icon}</span>
                <span>{category.label}</span>
                <span className="text-sm opacity-70">
                  ({category.key === 'all' ? skills.length : skills.filter(s => s.category === category.key).length})
                </span>
              </motion.button>
            ))}
          </motion.div>

          <motion.div
            variants={containerVariants}
            className="grid grid-cols-1 sm:grid-cols-2 gap-6"
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

                  <div className="relative">
                    <div className="w-full bg-muted rounded-full h-3 overflow-hidden">
                      <motion.div
                        className="h-full bg-gradient-to-r from-primary to-primary/80 rounded-full"
                        variants={skillBarVariants}
                        initial="hidden"
                        animate="visible"
                        whileInView="visible"
                        viewport={{ once: true }}
                        custom={skill.level}
                      />
                    </div>
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

          {/* Summary section & learning path tidak berubah */}
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
