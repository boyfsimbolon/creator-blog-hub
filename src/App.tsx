import React, { useEffect, useState } from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { HelmetProvider } from 'react-helmet-async';
import { ThemeProvider } from './components/ThemeToggle';

import Index from "./pages/Index";
import Admin from "./pages/Admin";
import NotFound from "./pages/NotFound";
import SvgSplashScreen from "./components/SvgSplashScreen";

const queryClient = new QueryClient();

// Buat komponen pembungkus yang cek route dan handle splash screen khusus untuk "/"
const SplashRouteWrapper: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const location = useLocation();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (location.pathname === "/") {
      setLoading(true);
      const timer = setTimeout(() => setLoading(false), 12000);
      return () => clearTimeout(timer);
    } else {
      // Untuk route selain "/", langsung set loading false
      setLoading(false);
    }
  }, [location.pathname]);

  if (loading) {
    // Tampilkan splash saat loading true
    return <SvgSplashScreen>{null}</SvgSplashScreen>;
  }

  // Setelah loading false, tampilkan children (halaman normal)
  return <>{children}</>;
};

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <HelmetProvider>
        <ThemeProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <SplashRouteWrapper>
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/admin" element={<Admin />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </SplashRouteWrapper>
            </BrowserRouter>
          </TooltipProvider>
        </ThemeProvider>
      </HelmetProvider>
    </QueryClientProvider>
  );
};

export default App;
