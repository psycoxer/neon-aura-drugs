
import React from 'react';
import Navbar from './Navbar';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-background to-background/80">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 sm:px-6 py-8">
        {children}
      </main>
      <footer className="py-6 border-t border-white/5 backdrop-blur-sm">
        <div className="container mx-auto px-4 sm:px-6">
          <p className="text-sm text-center text-muted-foreground">
            © {new Date().getFullYear()} MedDB - Advanced Drug Database System
          </p>
        </div>
      </footer>
      <Toaster />
      <Sonner />
      
      {/* Background radial gradients */}
      <div className="fixed top-1/4 -left-1/4 w-1/2 h-1/2 bg-neon-purple/5 rounded-full blur-[120px] -z-10" />
      <div className="fixed top-1/2 -right-1/4 w-1/2 h-1/2 bg-neon-blue/5 rounded-full blur-[120px] -z-10" />
      <div className="fixed -bottom-1/4 left-1/3 w-1/2 h-1/2 bg-neon-pink/5 rounded-full blur-[120px] -z-10" />
    </div>
  );
};

export default Layout;
