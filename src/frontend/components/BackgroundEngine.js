'use client';
import React, { useState, useEffect } from 'react';

export default function BackgroundEngine() {
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });

  useEffect(() => {
    const handleMouse = (e) => {
      requestAnimationFrame(() => setMousePos({ x: e.clientX, y: e.clientY }));
    };
    window.addEventListener('mousemove', handleMouse);
    return () => window.removeEventListener('mousemove', handleMouse);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden bg-[#050505]">
      
      <style>{`
        @keyframes float-slow {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -30px) scale(1.05); }
          66% { transform: translate(-20px, 20px) scale(0.95); }
        }
        @keyframes float-slower {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(-30px, 30px) scale(0.95); }
          66% { transform: translate(20px, -20px) scale(1.05); }
        }
        .animate-float-slow { animation: float-slow 15s ease-in-out infinite; }
        .animate-float-slower { animation: float-slower 20s ease-in-out infinite; }
      `}</style>

      <div 
        className="absolute inset-0 transition-opacity duration-300 z-20"
        style={{ 
          background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(30, 144, 255, 0.04), transparent 40%)` 
        }}
      />

      <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:40px_40px]"></div>

      
      <div className="absolute top-[-15%] left-[10%] w-[50vw] h-[50vh] bg-[#1E90FF]/10 blur-[130px] rounded-full animate-float-slow"></div>
      
      <div className="absolute bottom-[-10%] right-[-5%] w-[45vw] h-[45vw] bg-[#60A5FA]/10 blur-[150px] rounded-full animate-float-slower"></div>

      <div className="absolute top-[40%] left-[-10%] w-[35vw] h-[35vw] bg-[#3B82F6]/10 blur-[120px] rounded-full animate-float-slow" style={{ animationDelay: '5s' }}></div>
      
    </div>
  );
}