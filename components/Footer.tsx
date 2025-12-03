import React from 'react';

export const Footer = () => {
  return (
    <footer className="bg-white border-t border-slate-100 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-center md:text-left">
            <div className="text-slate-900 font-bold text-xl tracking-tight mb-2">EcomModels AI</div>
            <p className="text-slate-500 text-sm max-w-xs">AI-powered fashion photography for modern e-commerce brands.</p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-8 text-sm text-slate-600 font-medium">
             <a href="#" className="hover:text-black transition-colors">Privacy Policy</a>
             <a href="#" className="hover:text-black transition-colors">Terms of Service</a>
             <a href="#" className="hover:text-black transition-colors">Contact Support</a>
          </div>
          
          <div className="text-slate-400 text-sm">
            © {new Date().getFullYear()} EcomModels AI.
          </div>
        </div>
      </div>
    </footer>
  );
};