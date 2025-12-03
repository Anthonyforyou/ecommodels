import React from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from './Button';
import { User } from '../types';

interface NavbarProps {
  user: User | null;
  onNavigate: (page: string) => void;
  onLogout: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ user, onNavigate, onLogout }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const handleNav = (page: string) => {
    onNavigate(page);
    setIsOpen(false);
  };

  return (
    <nav className="fixed w-full z-50 bg-white/80 backdrop-blur-md border-b border-slate-100 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          {/* Logo */}
          <div className="flex items-center cursor-pointer group" onClick={() => handleNav('home')}>
            <span className="text-xl font-bold text-slate-900 tracking-tight font-sans">
              EcomModels<span className="text-brand-600">AI</span>
            </span>
          </div>

          {/* Desktop Menu - Centered */}
          <div className="hidden md:flex items-center space-x-8 absolute left-1/2 transform -translate-x-1/2">
            <button onClick={() => handleNav('home')} className="text-sm font-medium text-slate-500 hover:text-black transition-colors">Home</button>
            <button onClick={() => handleNav('how-it-works')} className="text-sm font-medium text-slate-500 hover:text-black transition-colors">How it works</button>
            <button onClick={() => handleNav('pricing')} className="text-sm font-medium text-slate-500 hover:text-black transition-colors">Pricing</button>
            <button onClick={() => handleNav('contact')} className="text-sm font-medium text-slate-500 hover:text-black transition-colors">Contact</button>
          </div>

          {/* Auth Actions */}
          <div className="hidden md:flex items-center gap-4">
            {user ? (
               <div className="flex items-center gap-4">
                  <div className="flex flex-col items-end mr-2">
                    <span className="text-[10px] uppercase tracking-wider text-brand-600 font-bold">{user.credits} Credits</span>
                  </div>
                  <Button variant="outline" size="sm" onClick={() => handleNav('dashboard')}>Dashboard</Button>
                  <Button variant="ghost" size="sm" onClick={onLogout}>Sign Out</Button>
               </div>
            ) : (
              <div className="flex items-center gap-3">
                <Button variant="ghost" onClick={() => handleNav('login')} className="text-slate-600 hover:text-black">Log in</Button>
                <Button variant="primary" onClick={() => handleNav('register')} className="bg-black text-white hover:bg-slate-800 rounded-full px-5 text-sm">
                  Get Started
                </Button>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="text-slate-900">
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-b border-slate-100 absolute w-full h-screen top-20 left-0">
          <div className="px-6 py-8 space-y-4 text-center">
            <button onClick={() => handleNav('home')} className="block w-full px-3 py-2 text-lg font-medium text-slate-900">Home</button>
            <button onClick={() => handleNav('how-it-works')} className="block w-full px-3 py-2 text-lg font-medium text-slate-900">How it works</button>
            <button onClick={() => handleNav('pricing')} className="block w-full px-3 py-2 text-lg font-medium text-slate-900">Pricing</button>
            <button onClick={() => handleNav('contact')} className="block w-full px-3 py-2 text-lg font-medium text-slate-900">Contact</button>
            
            <div className="h-px bg-slate-100 w-full my-4"></div>

            {user ? (
              <div className="space-y-4">
                <button onClick={() => handleNav('dashboard')} className="block w-full py-3 text-lg font-medium text-brand-600">My Dashboard</button>
                <button onClick={onLogout} className="block w-full py-3 text-lg font-medium text-red-500">Sign Out</button>
              </div>
            ) : (
              <div className="space-y-4 pt-4">
                <button onClick={() => handleNav('login')} className="block w-full py-3 text-lg font-medium text-slate-900">Log in</button>
                <button onClick={() => handleNav('register')} className="block w-full py-3 text-lg font-medium text-white bg-black rounded-xl">Get Started</button>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};