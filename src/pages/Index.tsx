
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
        url="https://boyfsimbolon.netlify.app"
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
                <h3 className="text-xl font-bold gradient-text mb-4">Boy Full Simbolon</h3>
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
                  <div><svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24"><!-- Icon from Material Line Icons by Vjacheslav Trushkin - https://github.com/cyberalien/line-md/blob/master/license.txt --><path fill="currentColor" fill-opacity="0" d="M12 11l-8 -5h16l-8 5Z"><animate fill="freeze" attributeName="fill-opacity" begin="0.8s" dur="0.15s" values="0;0.3"/></path><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path stroke-dasharray="64" stroke-dashoffset="64" d="M4 5h16c0.55 0 1 0.45 1 1v12c0 0.55 -0.45 1 -1 1h-16c-0.55 0 -1 -0.45 -1 -1v-12c0 -0.55 0.45 -1 1 -1Z"><animate fill="freeze" attributeName="stroke-dashoffset" dur="0.6s" values="64;0"/></path><path stroke-dasharray="24" stroke-dashoffset="24" d="M3 6.5l9 5.5l9 -5.5"><animate fill="freeze" attributeName="stroke-dashoffset" begin="0.6s" dur="0.2s" values="24;0"/></path></g></svg>
     boyfullsimbolon@gmail.com</div>
                  <div><svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24"><!-- Icon from Google Material Icons by Material Design Authors - https://github.com/material-icons/material-icons/blob/master/LICENSE --><path fill="currentColor" d="M19.05 4.91A9.82 9.82 0 0 0 12.04 2c-5.46 0-9.91 4.45-9.91 9.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21c5.46 0 9.91-4.45 9.91-9.91c0-2.65-1.03-5.14-2.9-7.01m-7.01 15.24c-1.48 0-2.93-.4-4.2-1.15l-.3-.18l-3.12.82l.83-3.04l-.2-.31a8.26 8.26 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24c2.2 0 4.27.86 5.82 2.42a8.18 8.18 0 0 1 2.41 5.83c.02 4.54-3.68 8.23-8.22 8.23m4.52-6.16c-.25-.12-1.47-.72-1.69-.81c-.23-.08-.39-.12-.56.12c-.17.25-.64.81-.78.97c-.14.17-.29.19-.54.06c-.25-.12-1.05-.39-1.99-1.23c-.74-.66-1.23-1.47-1.38-1.72c-.14-.25-.02-.38.11-.51c.11-.11.25-.29.37-.43s.17-.25.25-.41c.08-.17.04-.31-.02-.43s-.56-1.34-.76-1.84c-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.43.06-.66.31c-.22.25-.86.85-.86 2.07s.89 2.4 1.01 2.56c.12.17 1.75 2.67 4.23 3.74c.59.26 1.05.41 1.41.52c.59.19 1.13.16 1.56.1c.48-.07 1.47-.6 1.67-1.18c.21-.58.21-1.07.14-1.18s-.22-.16-.47-.28"/></svg>
     +62 851-7953-0711</div>
                  <div>📍 Jakarta, Indonesia</div>
                </div>
                
                {/* Social Links */}
                <div className="flex space-x-4 mt-4">
                  {[
                    { icon: '📦', url: 'https://github.com/boysimbolon', label: 'GitHub' },
                    { icon: '💼', url: 'https://linkedin.com/in/boyfullsimbolon', label: 'LinkedIn' },
                    { icon: '🐦', url: 'https://instagram.com/boysmbln', label: 'Twitter' }
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
                © {new Date().getFullYear()} Boy Full Simbolon. All rights reserved. 
                Built using React, TypeScript & Supabase.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default Index;
