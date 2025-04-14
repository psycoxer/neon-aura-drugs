
import React, { useState } from 'react';
import { Menu, X, Database, Search, User, Settings, Moon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const navItems = [
    { name: 'Dashboard', path: '/', icon: Database },
    { name: 'Search', path: '/search', icon: Search },
    { name: 'Account', path: '/account', icon: User },
    { name: 'Settings', path: '/settings', icon: Settings },
  ];

  return (
    <nav className="backdrop-blur-md bg-black/10 border-b border-white/5 sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
            <Database className="h-6 w-6 text-neon-blue" />
            <span className="text-xl font-semibold tracking-tight text-white">MedDB</span>
          </div>

          {/* Desktop menu */}
          <div className="hidden md:flex space-x-6">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className="flex items-center space-x-1 text-gray-300 hover:text-white hover:text-neon-purple transition-colors"
              >
                <item.icon className="h-4 w-4" />
                <span>{item.name}</span>
              </Link>
            ))}
          </div>

          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" className="text-neon-blue hover:text-neon-pink hover:bg-white/5">
              <Moon className="h-5 w-5" />
            </Button>

            {/* Mobile menu button */}
            <Button 
              variant="ghost" 
              size="icon" 
              className="md:hidden text-gray-300 hover:text-white hover:bg-white/5" 
              onClick={toggleMenu}
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={cn(
        "md:hidden bg-black/80 backdrop-blur-lg transition-all duration-300 ease-in-out",
        isMenuOpen ? "max-h-96 border-b border-white/5" : "max-h-0 overflow-hidden"
      )}>
        <div className="container mx-auto px-4 sm:px-6 py-4 space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className="flex items-center space-x-3 p-3 rounded-lg text-gray-300 hover:text-white hover:bg-white/5"
              onClick={() => setIsMenuOpen(false)}
            >
              <item.icon className="h-5 w-5" />
              <span>{item.name}</span>
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
