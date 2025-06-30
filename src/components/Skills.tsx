import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Skill } from '../types';
import { getSkills } from '../lib/supabase';

const Skills: React.FC = () => {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState<'all' | 'frontend' | 'backend' | 'tools' | 'other'>('all');

  // Data dummy untuk demo
  const dummySkills: Skill[] = [
    // Frontend Skills
    { id: '1', name: 'HTML5', level: 95, category: 'frontend', icon: '🌐' },
    { id: '2', name: 'CSS3', level: 90, category: 'frontend', icon: '🎨' },
    { id: '3', name: 'JavaScript', level: 90, category: 'frontend', icon: '⚡' },
    { id: '4', name: 'TypeScript', level: 85, category: 'frontend', icon: '📘' },
    { id: '5', name: 'React', level: 92, category: 'frontend', icon: '⚛️' },
    { id: '6', name: 'Next.js', level: 80, category: 'frontend', icon: '🚀' },
    { id: '7', name: 'Vue.js', level: 75, category: 'frontend', icon: '💚' },
    { id: '8', name: 'Tailwind CSS', level: 88, category: 'frontend', icon: '💨' },
    
    // Backend Skills
    { id: '9', name: 'Node.js', level: 80, category: 'backend', icon: '🟢' },
    { id: '10', name: 'Express.js', level: 78, category: 'backend', icon: '🚂' },
    { id: '11', name: 'Supabase', level: 85, category: 'backend', icon: '🔋' },
    { id: '12', name: 'PostgreSQL', level: 75, category: 'backend', icon: '🐘' },
    { id: '13', name: 'MongoDB', level: 70, category: 'backend', icon: '🍃' },
    { id: '14', name: 'GraphQL', level: 65, category: 'backend', icon: '📊' },
    
    // Tools & Others
    { id: '15', name: 'Git', level: 88, category: 'tools', icon: '📦' },
    { id: '16', name: 'Docker', level: 70, category: 'tools', icon: '🐳' },
    { id: '17', name: 'VS Code', level: 95, category: 'tools', icon: '💻' },
    { id: '18', name: 'Figma', level: 75, category: 'tools', icon: '🎯' },
    { id: '19', name: 'Vercel', level: 82, category: 'tools', icon: '▲' },
    { id: '20', name: 'AWS', level: 60, category: 'tools', icon: '☁️' },
    
    // Other Skills
    { id: '21', name: 'UI/UX Design', level: 80, category: 'other', icon: '🎨' },
    { id: '22', name: 'SEO', level: 75, category: 'other', icon: '📈' },
    { id: '23', name: 'Performance Optimization', level: 82, category: 'other', icon: '⚡' },
    { id: '24', name: 'Responsive Design', level: 90, category: 'other', icon: '📱' }
  ];

  useEffect(() => {
    const loadSkills = async () => {
      try {
        setLoading(true);
        // Coba ambil dari Supabase, jika gagal gunakan dummy data
        const supabaseSkills = await getSkills();
        
        if (supabaseSkills.length > 0) {
          setSkills(supabaseSkills);
        } else {
          // Gunakan dummy data jika Supabase belum dikonfigurasi
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
    { key: 'other' as const, label: 'Lainnya', icon: '💡' }
  ];

  const filteredSkills = activeCategory === 'all' 
    ? skills 
    : skills.filter(skill => skill.category === activeCategory);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  const skillBarVariants = {
    hidden: { width: 0 },
    visible: (level: number) => ({
      width: `${level}%`,
      transition: {
        duration: 1.5,
        ease: "easeOut",
        delay: 0.5
      }
    })
  };

  if (loading) {
    return (
      <section id="skills" className="py-20">
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
              Technologies dan tools yang saya kuasai untuk membangun solusi digital yang inovatif dan scalable
            </p>
          </motion.div>

          {/* Category Filter */}
          <motion.div variants={itemVariants} className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((category) => (
              <motion.button
                key={category.key}
                onClick={() => setActiveCategory(category.key)}
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

          {/* Skills Grid */}
          <motion.div
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {filteredSkills.map((skill) => (
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
            ))}
          </motion.div>

          {/* Skills Summary */}
          <motion.div variants={itemVariants} className="mt-16">
            <div className="bg-gradient-to-r from-primary/10 via-purple-500/10 to-primary/10 rounded-2xl p-8">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold mb-4">Fokus Keahlian</h3>
                <p className="text-muted-foreground max-w-3xl mx-auto">
                  Saya terus mengembangkan keahlian dalam teknologi modern dan best practices untuk memberikan 
                  solusi terbaik bagi setiap proyek yang dikerjakan.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="text-4xl mb-4">🎯</div>
                  <h4 className="font-semibold mb-2">Frontend Excellence</h4>
                  <p className="text-sm text-muted-foreground">
                    Membangun user interface yang responsive, accessible, dan performant dengan React ecosystem
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
                    Optimasi aplikasi untuk speed dan search engine visibility dengan best practices terkini
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Learning Path */}
          <motion.div variants={itemVariants} className="mt-16 text-center">
            <h3 className="text-xl font-bold mb-4">🎓 Currently Learning</h3>
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
  );
};

export default Skills;
