'use client';
import React from 'react';

export default function Navbar() {
  const scrollTo = (id) => {
    const element = document.getElementById(id);
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav className="fixed top-0 w-full z-50 backdrop-blur-xl border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-4 flex items-center">
        <div className="flex-1 flex justify-start">
          <div onClick={() => scrollTo('home')} className="flex items-center gap-3 cursor-pointer group">
                        <div className="relative flex items-center justify-center transition-transform duration-500 group-hover:scale-105">
              <img 
                src="/logo.png"  
                alt="Tradex Logo" 
                className="w-10 h-10 object-contain relative z-10" 
              />
            </div>

            <span className="text-white/90 font-bold tracking-tight text-2xl group-hover:text-white transition-colors duration-300">
              Trade
              <span className="bg-gradient-to-tr from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
                X
              </span>
            </span>
          </div>
        </div>
        
        {/* Links Section - Center */}
        <div className="hidden md:flex items-center justify-center gap-2">
          {[
            { name: 'Home', id: 'home' },
            { name: 'Plans', id: 'plans' },
            { name: 'About', id: 'about' },
            { name: 'Connect', id: 'contact' }
          ].map((item) => (
            <button 
              key={item.name} 
              onClick={() => scrollTo(item.id)} 
              className="relative px-5 py-2 text-sm font-medium text-gray-400 hover:text-white transition-colors duration-300 group"
            >
              <span className="relative z-10">{item.name}</span>
              <span className="absolute inset-0 bg-white/10 rounded-full opacity-0 group-hover:opacity-100 transform scale-75 group-hover:scale-100 transition-all duration-300 ease-out"></span>
            </button>
          ))}
        </div>
        
        {/* Empty Div - Right (This balances the flex layout to keep links perfectly centered) */}
        <div className="flex-1 hidden md:block"></div>

      </div>
    </nav>
  );
}
