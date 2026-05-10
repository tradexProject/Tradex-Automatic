'use client';

import { useState, useEffect } from 'react';

export default function FloatingWidgets() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <div className="fixed bottom-8 right-8 flex flex-col items-center gap-4 z-[9999]">
      
      <button
        onClick={scrollToTop}
        className={`p-3 bg-[#0a0a0a] border border-blue-500/40 text-blue-500 rounded-full shadow-[0_0_15px_rgba(59,130,246,0.3)] backdrop-blur-md transition-all duration-500 hover:scale-110 hover:bg-blue-900/30 flex items-center justify-center ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'
        }`}
        title="Scroll to Top"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="m18 15-6-6-6 6"/>
        </svg>
      </button>

      <a
        href="https://t.me/WeWillGet"
        target="_blank"
        rel="noopener noreferrer"
        className="p-4 bg-[#2B82EE] hover:bg-blue-500 text-white rounded-full shadow-[0_0_20px_rgba(37,99,235,0.6)] transition-all duration-300 hover:scale-110 flex items-center justify-center animate-pulse-slow"
        title="Telegram Support"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="22" y1="2" x2="11" y2="13"></line>
          <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
        </svg>
      </a>

    </div>
  );
}
