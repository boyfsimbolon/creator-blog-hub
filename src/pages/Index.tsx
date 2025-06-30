
import React, { useEffect } from 'react';
import SEO from '../components/SEO';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import About from '../components/About';
import Portfolio from '../components/Portfolio';
import Blog from '../components/Blog';
import Skills from '../components/Skills';
import Contact from '../components/Contact';
import { incrementPageView } from '../lib/supabase';

const Index: React.FC = () => {
  useEffect(() => {
    // Track page view
    incrementPageView('home');
  }, []);

  return (
    <>
      <SEO
        title="Portofolio & Blog Pribadi - Pengembang Web"
        description="Website portofolio dan blog pribadi pengembang web dengan keahlian React, TypeScript, dan Supabase. Menampilkan proyek-proyek terbaru dan artikel teknis."
        keywords="portofolio, blog, pengembang web, React, TypeScript, Supabase, frontend developer, fullstack developer, Jakarta"
        url="https://yoursite.com"
        type="website"
      />
      
      <div className="min-h-screen bg-background text-foreground">
        {/* Navigation */}
        <Navbar />
        
        {/* Main Content */}
        <main>
          {/* Hero Section */}
          <Hero />
          
          {/* About Section */}
          <About />
          
          {/* Portfolio Section */}
          <Portfolio />
          
          {/* Blog Section */}
          <Blog />
          
          {/* Skills Section */}
          <Skills />
          
          {/* Contact Section */}
          <Contact />
        </main>
        
        {/* Footer */}
        <footer className="bg-card border-t border-border py-12">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {/* Brand */}
              <div className="md:col-span-1">
                <h3 className="text-xl font-bold gradient-text mb-4">Nama Anda</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Pengembang web passionate yang membangun solusi digital inovatif 
                  dengan teknologi modern.
                </p>
              </div>
              
              {/* Quick Links */}
              <div className="md:col-span-1">
                <h4 className="font-semibold mb-4">Quick Links</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li><a href="#home" className="hover:text-primary transition-colors">Beranda</a></li>
                  <li><a href="#about" className="hover:text-primary transition-colors">Tentang</a></li>
                  <li><a href="#portfolio" className="hover:text-primary transition-colors">Portofolio</a></li>
                  <li><a href="#blog" className="hover:text-primary transition-colors">Blog</a></li>
                </ul>
              </div>
              
              {/* Services */}
              <div className="md:col-span-1">
                <h4 className="font-semibold mb-4">Services</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>Web Development</li>
                  <li>Frontend Development</li>
                  <li>UI/UX Design</li>
                  <li>Consulting</li>
                </ul>
              </div>
              
              {/* Contact Info */}
              <div className="md:col-span-1">
                <h4 className="font-semibold mb-4">Contact</h4>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <div>📧 your.email@example.com</div>
                  <div>📱 +62 812-3456-7890</div>
                  <div>📍 Jakarta, Indonesia</div>
                </div>
                
                {/* Social Links */}
                <div className="flex space-x-4 mt-4">
                  {[
                    { icon: '📦', url: 'https://github.com/yourusername', label: 'GitHub' },
                    { icon: '💼', url: 'https://linkedin.com/in/yourusername', label: 'LinkedIn' },
                    { icon: '🐦', url: 'https://twitter.com/yourusername', label: 'Twitter' }
                  ].map((social) => (
                    <a
                      key={social.label}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-8 h-8 flex items-center justify-center bg-muted hover:bg-primary hover:text-primary-foreground rounded-full transition-all text-lg"
                      title={social.label}
                    >
                      {social.icon}
                    </a>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Copyright */}
            <div className="border-t border-border mt-8 pt-8 text-center text-sm text-muted-foreground">
              <p>
                © {new Date().getFullYear()} Nama Anda. All rights reserved. 
                Built with ❤️ using React, TypeScript & Supabase.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default Index;
