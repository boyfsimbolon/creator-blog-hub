
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
                    { icon: '<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24"><!-- Icon from Material Line Icons by Vjacheslav Trushkin - https://github.com/cyberalien/line-md/blob/master/license.txt --><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path stroke-dasharray="32" stroke-dashoffset="32" d="M12 4c1.67 0 2.61 0.4 3 0.5c0.53 -0.43 1.94 -1.5 3.5 -1.5c0.34 1 0.29 2.22 0 3c0.75 1 1 2 1 3.5c0 2.19 -0.48 3.58 -1.5 4.5c-1.02 0.92 -2.11 1.37 -3.5 1.5c0.65 0.54 0.5 1.87 0.5 2.5c0 0.73 0 3 0 3M12 4c-1.67 0 -2.61 0.4 -3 0.5c-0.53 -0.43 -1.94 -1.5 -3.5 -1.5c-0.34 1 -0.29 2.22 0 3c-0.75 1 -1 2 -1 3.5c0 2.19 0.48 3.58 1.5 4.5c1.02 0.92 2.11 1.37 3.5 1.5c-0.65 0.54 -0.5 1.87 -0.5 2.5c0 0.73 0 3 0 3"><animate fill="freeze" attributeName="stroke-dashoffset" dur="0.7s" values="32;0"/></path><path stroke-dasharray="10" stroke-dashoffset="10" d="M9 19c-1.41 0 -2.84 -0.56 -3.69 -1.19c-0.84 -0.63 -1.09 -1.66 -2.31 -2.31"><animate fill="freeze" attributeName="stroke-dashoffset" begin="0.8s" dur="0.2s" values="10;0"/></path></g></svg>'
    , url: 'https://github.com/boysimbolon', label: 'GitHub' },
                    { icon: '<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24"><!-- Icon from Material Line Icons by Vjacheslav Trushkin - https://github.com/cyberalien/line-md/blob/master/license.txt --><circle cx="4" cy="4" r="2" fill="currentColor" fill-opacity="0"><animate fill="freeze" attributeName="fill-opacity" dur="0.15s" values="0;1"/></circle><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="4"><path stroke-dasharray="12" stroke-dashoffset="12" d="M4 10v10"><animate fill="freeze" attributeName="stroke-dashoffset" begin="0.15s" dur="0.2s" values="12;0"/></path><path stroke-dasharray="12" stroke-dashoffset="12" d="M10 10v10"><animate fill="freeze" attributeName="stroke-dashoffset" begin="0.45s" dur="0.2s" values="12;0"/></path><path stroke-dasharray="24" stroke-dashoffset="24" d="M10 15c0 -2.76 2.24 -5 5 -5c2.76 0 5 2.24 5 5v5"><animate fill="freeze" attributeName="stroke-dashoffset" begin="0.65s" dur="0.2s" values="24;0"/></path></g></svg>'
    , url: 'https://linkedin.com/in/boyfullsimbolon', label: 'LinkedIn' },
                    { icon: '<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24"><!-- Icon from Material Line Icons by Vjacheslav Trushkin - https://github.com/cyberalien/line-md/blob/master/license.txt --><circle cx="17" cy="7" r="1.5" fill="currentColor" fill-opacity="0"><animate fill="freeze" attributeName="fill-opacity" begin="1.3s" dur="0.15s" values="0;1"/></circle><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path stroke-dasharray="72" stroke-dashoffset="72" d="M16 3c2.76 0 5 2.24 5 5v8c0 2.76 -2.24 5 -5 5h-8c-2.76 0 -5 -2.24 -5 -5v-8c0 -2.76 2.24 -5 5 -5h4Z"><animate fill="freeze" attributeName="stroke-dashoffset" dur="0.6s" values="72;0"/></path><path stroke-dasharray="28" stroke-dashoffset="28" d="M12 8c2.21 0 4 1.79 4 4c0 2.21 -1.79 4 -4 4c-2.21 0 -4 -1.79 -4 -4c0 -2.21 1.79 -4 4 -4"><animate fill="freeze" attributeName="stroke-dashoffset" begin="0.7s" dur="0.6s" values="28;0"/></path></g></svg>'
    , url: 'https://instagram.com/boysmbln', label: 'Instagram' }
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
