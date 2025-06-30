
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Project } from '../types';
import { getProjects } from '../lib/supabase';

const Portfolio: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'featured'>('all');

  // Data dummy untuk demo
  const dummyProjects: Project[] = [
    {
      id: '1',
      title: 'E-Commerce Dashboard',
      description: 'Dashboard admin untuk platform e-commerce dengan fitur analytics, manajemen produk, dan monitoring real-time. Dibangun dengan React, TypeScript, dan Chart.js.',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop',
      demo_url: 'https://demo-ecommerce.example.com',
      github_url: 'https://github.com/yourusername/ecommerce-dashboard',
      technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Chart.js', 'Supabase'],
      featured: true,
      created_at: '2024-01-15'
    },
    {
      id: '2',
      title: 'Task Management App',
      description: 'Aplikasi manajemen tugas dengan fitur drag-and-drop, kolaborasi tim, dan notifikasi real-time. UI/UX yang modern dan responsive.',
      image: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&h=600&fit=crop',
      demo_url: 'https://taskapp.example.com',
      github_url: 'https://github.com/yourusername/task-management',
      technologies: ['React', 'Redux', 'Material-UI', 'Node.js', 'Socket.io'],
      featured: true,
      created_at: '2024-02-10'
    },
    {
      id: '3',
      title: 'Weather App',
      description: 'Aplikasi cuaca dengan interface yang clean dan informasi detail. Menggunakan API eksternal untuk data cuaca real-time.',
      image: 'https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?w=800&h=600&fit=crop',
      demo_url: 'https://weather-app.example.com',
      github_url: 'https://github.com/yourusername/weather-app',
      technologies: ['React', 'CSS3', 'Weather API', 'Responsive Design'],
      featured: false,
      created_at: '2024-03-05'
    },
    {
      id: '4',
      title: 'Blog Platform',
      description: 'Platform blog dengan CMS, SEO optimization, dan comment system. Mendukung markdown dan syntax highlighting untuk kode.',
      image: 'https://images.unsplash.com/photo-1486312338219-ce68e2c4c6bf?w=800&h=600&fit=crop',
      demo_url: 'https://blog-platform.example.com',
      github_url: 'https://github.com/yourusername/blog-platform',
      technologies: ['Next.js', 'Markdown', 'Prisma', 'PostgreSQL', 'Vercel'],
      featured: false,
      created_at: '2024-04-12'
    },
    {
      id: '5',
      title: 'Portfolio Website',
      description: 'Website portfolio responsive dengan animasi smooth dan optimasi SEO. Terintegrasi dengan CMS untuk mudah update konten.',
      image: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&h=600&fit=crop',
      demo_url: 'https://portfolio.example.com',
      github_url: 'https://github.com/yourusername/portfolio',
      technologies: ['React', 'Framer Motion', 'Tailwind CSS', 'Contentful'],
      featured: true,
      created_at: '2024-05-18'
    },
    {
      id: '6',
      title: 'Chat Application',
      description: 'Aplikasi chat real-time dengan fitur grup chat, file sharing, dan emoji reactions. Menggunakan WebSocket untuk komunikasi real-time.',
      image: 'https://images.unsplash.com/photo-1577563908411-5077b6dc7624?w=800&h=600&fit=crop',
      demo_url: 'https://chat-app.example.com',
      github_url: 'https://github.com/yourusername/chat-app',
      technologies: ['React', 'Socket.io', 'Express.js', 'MongoDB', 'JWT'],
      featured: false,
      created_at: '2024-06-22'
    }
  ];

  useEffect(() => {
    const loadProjects = async () => {
      try {
        setLoading(true);
        // Coba ambil dari Supabase, jika gagal gunakan dummy data
        const supabaseProjects = await getProjects();
        
        if (supabaseProjects.length > 0) {
          setProjects(supabaseProjects);
        } else {
          // Gunakan dummy data jika Supabase belum dikonfigurasi
          setProjects(dummyProjects);
        }
      } catch (error) {
        console.error('Error loading projects:', error);
        setProjects(dummyProjects);
      } finally {
        setLoading(false);
      }
    };

    loadProjects();
  }, []);

  const filteredProjects = filter === 'all' 
    ? projects 
    : projects.filter(project => project.featured);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6
      }
    }
  };

  if (loading) {
    return (
      <section id="portfolio" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-muted-foreground">Memuat proyek...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="portfolio" className="py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={containerVariants}
          className="max-w-7xl mx-auto"
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 gradient-text">
              Portofolio Saya
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
              Kumpulan proyek yang telah saya kerjakan, mulai dari aplikasi web sederhana hingga sistem kompleks
            </p>
            
            {/* Filter Buttons */}
            <div className="flex justify-center space-x-4">
              <motion.button
                onClick={() => setFilter('all')}
                className={`px-6 py-2 rounded-full font-medium transition-all ${
                  filter === 'all'
                    ? 'bg-primary text-primary-foreground shadow-lg'
                    : 'bg-muted text-muted-foreground hover:bg-primary/10'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Semua Proyek
              </motion.button>
              <motion.button
                onClick={() => setFilter('featured')}
                className={`px-6 py-2 rounded-full font-medium transition-all ${
                  filter === 'featured'
                    ? 'bg-primary text-primary-foreground shadow-lg'
                    : 'bg-muted text-muted-foreground hover:bg-primary/10'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Proyek Unggulan
              </motion.button>
            </div>
          </motion.div>

          {/* Projects Grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={filter}
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {filteredProjects.map((project) => (
                <motion.div
                  key={project.id}
                  variants={itemVariants}
                  className="group bg-card rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
                  whileHover={{ y: -5 }}
                >
                  {/* Project Image */}
                  <div className="relative overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    
                    {/* Featured Badge */}
                    {project.featured && (
                      <div className="absolute top-4 left-4 bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-medium">
                        Unggulan
                      </div>
                    )}
                    
                    {/* Hover Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="flex space-x-3">
                        {project.demo_url && (
                          <motion.a
                            href={project.demo_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 bg-white rounded-full text-primary hover:bg-primary hover:text-white transition-colors"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            title="Live Demo"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                          </motion.a>
                        )}
                        {project.github_url && (
                          <motion.a
                            href={project.github_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 bg-white rounded-full text-primary hover:bg-primary hover:text-white transition-colors"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            title="Source Code"
                          >
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                            </svg>
                          </motion.a>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Project Content */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
                      {project.description}
                    </p>
                    
                    {/* Technologies */}
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-1 bg-muted text-foreground rounded text-xs font-medium"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          {/* Call to Action */}
          <motion.div
            variants={itemVariants}
            className="text-center mt-16"
          >
            <p className="text-muted-foreground mb-6">
              Tertarik dengan proyek saya? Mari diskusikan proyek Anda!
            </p>
            <motion.button
              onClick={() => {
                const element = document.getElementById('contact');
                element?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-8 py-3 bg-primary text-primary-foreground rounded-full font-medium hover:bg-primary/90 transition-colors shadow-lg hover:shadow-xl"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Hubungi Saya
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Portfolio;
