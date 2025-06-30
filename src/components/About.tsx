
import React from 'react';
import { motion } from 'framer-motion';
import { Experience, Education } from '../types';

const About: React.FC = () => {
  // Data dummy untuk pengalaman
  const experiences: Experience[] = [
  ];

  const education: Education[] = [
    {
      id: '1',
      institution: 'Universitas Advent Indonesia',
      degree: 'Sarjana Ilmu Komputer',
      field: 'Teknik Informatika',
      duration: '2022 - 2025',
      gpa: '3.98/4.0',
      description: 'Fokus pada pengembangan software dan sistem informasi. Aktif dalam organisasi mahasiswa dan berbagai kompetisi programming.'
    }
    {
      id: '2',
      institution: 'SMA Negeri 1 Samarinda',
      degree: 'SMA Sederajat',
      field: 'MIPA (Matematika Ilmu Pengetahuan Alam)',
      duration: '2019 - 2022',
      gpa: '93/100',
      description: 'Fokus pada Pengetahuan SAINTEK. Aktif dalam organisasi di sekolah dan berbagai kompetisi astronomi.'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
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

  return (
  <section id="about" className="py-20 bg-muted/30">
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
            Tentang Saya
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Perjalanan saya dalam dunia teknologi dan passion untuk menciptakan solusi digital yang bermakna
          </p>
        </motion.div>

        {/* Tentang Saya Card */}
        <motion.div variants={itemVariants} className="mb-16">
          <div className="bg-card rounded-2xl p-8 shadow-lg">
            <div className="grid md:grid-cols-3 gap-8 items-center">
              <div className="md:col-span-1">
                <div className="w-48 h-48 mx-auto bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-6xl shadow-xl">
                  👨‍💻
                </div>
              </div>
              <div className="md:col-span-2">
                <h3 className="text-2xl font-bold mb-4">Halo! Saya seorang Pengembang Web yang passionate</h3>
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  Dengan pengalaman 5+ tahun dalam pengembangan web, saya telah membantu berbagai perusahaan 
                  dan startup untuk mewujudkan visi digital mereka. Keahlian saya meliputi frontend development 
                  dengan fokus pada React ecosystem, serta pengalaman dalam full-stack development.
                </p>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  Saya percaya bahwa teknologi terbaik adalah yang dapat memecahkan masalah nyata dan 
                  memberikan nilai tambah bagi pengguna. Melalui blog ini, saya berbagi pengalaman dan 
                  pengetahuan dengan komunitas developer Indonesia.
                </p>
                <div className="flex flex-wrap gap-2">
                  {['Problem Solver', 'Team Player', 'Continuous Learner', 'Open Source Contributor'].map((trait) => (
                    <span
                      key={trait}
                      className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium"
                    >
                      {trait}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Pengalaman Kerja */}
        <motion.div variants={itemVariants} className="mb-16">
          <h3 className="text-2xl font-bold mb-8 text-center">Pengalaman Kerja</h3>
          <div className="space-y-6">
            {experiences.map((exp) => (
              <motion.div
                key={exp.id}
                variants={itemVariants}
                className="bg-card rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="flex flex-col md:flex-row md:items-start gap-4">
                  <div className="md:w-1/4">
                    <div className="text-sm text-primary font-semibold mb-1">{exp.duration}</div>
                    <div className="text-xs text-muted-foreground">{exp.location}</div>
                  </div>
                  <div className="md:w-3/4">
                    <h4 className="text-xl font-bold mb-1">{exp.position}</h4>
                    <h5 className="text-lg text-primary mb-3">{exp.company}</h5>
                    <p className="text-muted-foreground mb-4 leading-relaxed">{exp.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {exp.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-1 bg-muted text-foreground rounded text-xs font-medium"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Pendidikan */}
        <motion.div variants={itemVariants}>
          <h3 className="text-2xl font-bold mb-8 text-center">Pendidikan</h3>
          <div className="space-y-6">
            {education.map((edu) => (
              <motion.div
                key={edu.id}
                variants={itemVariants}
                className="bg-card rounded-xl p-6 shadow-lg"
              >
                <div className="flex flex-col md:flex-row md:items-start gap-4">
                  <div className="md:w-1/4">
                    <div className="text-sm text-primary font-semibold mb-1">{edu.duration}</div>
                    {edu.gpa && <div className="text-xs text-muted-foreground">GPA: {edu.gpa}</div>}
                  </div>
                  <div className="md:w-3/4">
                    <h4 className="text-xl font-bold mb-1">{edu.degree}</h4>
                    <h5 className="text-lg text-primary mb-1">{edu.field}</h5>
                    <h6 className="text-base text-muted-foreground mb-3">{edu.institution}</h6>
                    {edu.description && (
                      <p className="text-muted-foreground leading-relaxed">{edu.description}</p>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Fun Facts */}
        <motion.div variants={itemVariants} className="mt-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { number: '50+', label: 'Proyek Selesai' },
              { number: '5+', label: 'Tahun Pengalaman' },
              { number: '20+', label: 'Teknologi Dikuasai' },
              { number: '100+', label: 'Artikel Blog' }
            ].map((stat) => (
              <motion.div
                key={stat.label}
                className="text-center bg-card rounded-xl p-6 shadow-lg"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <div className="text-3xl font-bold text-primary mb-2">{stat.number}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </div>
  </section>
);
};

export default About;
