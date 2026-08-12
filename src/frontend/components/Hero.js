'use client';
import React, { useState, useEffect } from 'react';
import { ChevronRight, BarChart3 , Zap, ShieldCheck , Cpu, Activity, ShieldAlert } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Hero() {
  const [elements, setElements] = useState({ particles: [], shapes: [] });

  useEffect(() => {
    const particles = Array.from({ length: 30 }).map((_, i) => ({
      id: `p-${i}`,
      size: Math.random() * 5 + 3,
      left: `${Math.random() * 100}%`,
      duration: Math.random() * 10 + 8, 
      delay: -(Math.random() * 20), 
    }));

    const shapeTypes = ['square', 'circle', 'diamond', 'plus'];
    const shapes = Array.from({ length: 15 }).map((_, i) => ({
      id: `s-${i}`,
      type: shapeTypes[Math.floor(Math.random() * shapeTypes.length)],
      size: Math.random() * 35 + 20,
      left: `${Math.random() * 100}%`,
      duration: Math.random() * 15 + 15, 
      delay: -(Math.random() * 30), 
    }));

    setElements({ particles, shapes });
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="relative min-h-screen flex flex-col items-center justify-center pt-32 pb-16 px-4 sm:px-6 overflow-hidden bg-transparent">
      
      {/* CSS Animations */}
      <style jsx>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        @keyframes softFloat {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-4px); }
        }
        @keyframes moveOrb1 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -30px) scale(1.1); }
          66% { transform: translate(-10px, 10px) scale(0.9); }
        }
        @keyframes moveOrb2 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(-30px, 20px) scale(0.9); }
          66% { transform: translate(20px, -20px) scale(1.1); }
        }
        @keyframes pulseGlow {
          0%, 100% { opacity: 0.5; transform: scale(1) translateX(-50%); }
          50% { opacity: 0.8; transform: scale(1.05) translateX(-48%); }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .animate-shimmer { animation: shimmer 1.5s infinite; }
        .animate-float { animation: softFloat 3s ease-in-out infinite; }
        .animate-orb-1 { animation: moveOrb1 15s ease-in-out infinite; }
        .animate-orb-2 { animation: moveOrb2 18s ease-in-out infinite; }
        .animate-pulse-glow { animation: pulseGlow 8s ease-in-out infinite; }
        .animate-fade-up {
          animation: fadeUp 1s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          opacity: 0; 
        }
        .delay-100 { animation-delay: 100ms; }
        .delay-200 { animation-delay: 200ms; }
        .delay-300 { animation-delay: 300ms; }
        .delay-400 { animation-delay: 400ms; }
      `}</style>
      
      {/* Subtle Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] z-0 pointer-events-none"></div>
      
      {/* --- Static Background Orbs (Responsive Sizes) --- */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[350px] sm:w-[600px] md:w-[800px] h-[300px] sm:h-[400px] bg-[#1E90FF]/15 blur-[80px] sm:blur-[120px] rounded-full animate-pulse-glow"></div>
        <div className="absolute top-[10%] right-[-10%] sm:right-[15%] w-48 sm:w-72 h-48 sm:h-72 bg-blue-600/10 rounded-full mix-blend-screen filter blur-[60px] sm:blur-[80px] animate-orb-1"></div>
        <div className="absolute bottom-[10%] sm:bottom-[20%] left-[-10%] sm:left-[10%] w-56 sm:w-80 h-56 sm:h-80 bg-[#1E90FF]/10 rounded-full mix-blend-screen filter blur-[60px] sm:blur-[90px] animate-orb-2"></div>
      </div>

      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {elements.particles.map((p) => (
          <motion.div
            key={p.id}
            className="absolute top-0 rounded-full bg-[#1E90FF]"
            style={{ 
              width: p.size, 
              height: p.size, 
              left: p.left,
              boxShadow: `0 0 ${p.size * 2}px rgba(30,144,255,0.8)` 
            }}
            animate={{
              y: ['110vh', '-20vh'], 
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: p.duration,
              delay: p.delay,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        ))}

        {elements.shapes.map((s) => {
          let shapeClasses = "absolute top-0 border-2 border-[#1E90FF]/40 shadow-[0_0_15px_rgba(30,144,255,0.4)] backdrop-blur-sm ";
          let content = null;

          if (s.type === 'square') {
            shapeClasses += "rounded-md bg-[#1E90FF]/10";
          } else if (s.type === 'circle') {
            shapeClasses += "rounded-full bg-transparent";
          } else if (s.type === 'diamond') {
            shapeClasses += "rounded-sm bg-transparent";
            content = <div className="w-full h-full rotate-45 border-2 border-[#1E90FF]/40"></div>;
          } else if (s.type === 'plus') {
            shapeClasses = "absolute top-0 text-[#1E90FF]/50 font-medium flex items-center justify-center";
            content = "+";
          }

          return (
            <motion.div
              key={s.id}
              className={shapeClasses}
              style={{
                width: s.type === 'plus' ? 'auto' : s.size,
                height: s.type === 'plus' ? 'auto' : s.size,
                fontSize: s.type === 'plus' ? s.size * 1.5 : 'auto',
                left: s.left,
              }}
              animate={{
                y: ['110vh', '-20vh'],
                rotate: [0, 360],
                opacity: [0, 0.8, 0], 
              }}
              transition={{
                duration: s.duration,
                delay: s.delay,
                repeat: Infinity,
                ease: "linear"
              }}
            >
              {content}
            </motion.div>
          );
        })}
      </div>

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-5xl mx-auto flex flex-col items-center text-center">
        
        {/* Top Pill Badge */}
        <div className="animate-fade-up flex items-center gap-2 px-3 sm:px-4 py-1.5 rounded-full bg-white/5 border border-[#1E90FF]/20 mb-6 sm:mb-8 mt-5 transition-all duration-300 cursor-default hover:bg-white/10 hover:border-[#1E90FF]/40 hover:shadow-[0_0_20px_rgba(30,144,255,0.2)]">
                   <Zap size={14} className="text-[#1E90FF]" />
     
          <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.15em] sm:tracking-[0.2em] font-bold text-blue-400">
            Automated Trading Engine
          </span>
        </div>

        {/* Responsive Heading */}
        <h1 className="animate-fade-up delay-100 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter text-white mb-6 leading-[1.2] sm:leading-[1.1]">
          The Future of
          <span className="block sm:inline-block font-bold text-[#2B82EE] sm:ml-3 md:ml-4 drop-shadow-[0_0_8px_rgba(43,130,238,0.4)]">
            Automated
          </span>
          <br className="hidden sm:block" /> Trading
        </h1>


<p className="animate-fade-up delay-200 text-gray-400 text-base sm:text-lg md:text-xl max-w-2xl lg:max-w-3xl mx-auto mb-10 leading-relaxed font-light px-2 sm:px-0 text-center">
  TradeX is built for
  <span className="font-bold text-[#2B82EE] ml-2 md:ml-3 drop-shadow-[0_0_8px_rgba(43,130,238,0.4)]">
    Pocket Option
  </span>
  , powered by institutional-grade algorithms designed to analyze markets and
  execute precision trades 24/7 — automatically, without emotion, hesitation, or delay.
</p>

       /* {/* Description }
        <p className="animate-fade-up delay-200 text-gray-400 text-base sm:text-lg md:text-xl max-w-2xl lg:max-w-3xl mx-auto mb-10 leading-relaxed font-light px-2 sm:px-0">
          TradeX is built for 
        </p>

                    <span className="block sm:inline-block font-bold text-[#2B82EE] sm:ml-3 md:ml-4 drop-shadow-[0_0_8px_rgba(43,130,238,0.4)]">
            Pocket Option
          </span>
            
  <p className="animate-fade-up delay-200 text-gray-400 text-base sm:text-lg md:text-xl max-w-2xl lg:max-w-3xl mx-auto mb-10 leading-relaxed font-light px-2 sm:px-0">
, powered by institutional-grade algorithms designed to analyze markets and
          execute precision trades 24/7 — automatically, without emotion, hesitation, or delay.
        </p> */


        {/* Unified CTA Button Area */}
        <div className="animate-fade-up delay-300 flex flex-col items-center gap-6 mb-16 sm:mb-20 w-full px-4 sm:px-0">
          <button 
            onClick={() => scrollTo('plans')} 
            className="group relative overflow-hidden w-full sm:w-auto px-8 sm:px-10 py-4 rounded-xl bg-[#2B82EE] text-black font-bold transition-all duration-300 hover:scale-[1.02] active:scale-95 shadow-[0_0_40px_rgba(30,144,255,0.2)] hover:shadow-[0_0_60px_rgba(30,144,255,0.4)] flex justify-center items-center"
          >
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute inset-0 h-full w-full bg-gradient-to-r from-transparent via-black/5 to-transparent -translate-x-full group-hover:animate-shimmer"></div>
            </div>
            <span className="relative z-10 flex items-center gap-2">
              Explore All Plans
              <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </span>
          </button>
          
          <div className="flex items-center gap-3">
            <span className="h-[1px] w-6 sm:w-8 bg-gradient-to-r from-transparent to-[#1E90FF]/50"></span>
            <span className="text-[9px] sm:text-[10px] text-gray-500 font-mono uppercase tracking-[0.2em] sm:tracking-[0.3em] whitespace-nowrap">
              Precision Execution
            </span>
            <span className="h-[1px] w-6 sm:w-8 bg-gradient-to-l from-transparent to-[#1E90FF]/50"></span>
          </div>
        </div>

    {/* Bottom Floating Stats Strip - المحدث */}
<div className="animate-fade-up delay-400 grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-2 w-full max-w-4xl p-2 rounded-2xl bg-white/[0.02] border border-white/5 backdrop-blur-xl shadow-2xl">
   
{/* Smart AI Trading Engine */}
   <div className="flex items-center gap-4 p-3 sm:p-4 rounded-xl hover:bg-white/5 transition-colors group relative overflow-hidden">
      <div className="w-10 h-10 rounded-full bg-[#1E90FF]/10 flex items-center justify-center border border-[#1E90FF]/20 animate-float shrink-0">
        <Zap size={20} className="text-[#1E90FF] group-hover:drop-shadow-[0_0_8px_rgba(30,144,255,0.8)] transition-all" />
      </div>
      <div className="text-left">
        <p className="text-white font-medium text-sm">Smart AI</p>
        <p className="text-[10px] text-gray-400 uppercase tracking-tight font-semibold">Trading Engine</p>
      </div>
   </div>
   
   {/* Real-Time Market Scanning */}
   <div className="flex items-center gap-4 p-3 sm:p-4 rounded-xl hover:bg-white/5 transition-colors group relative overflow-hidden">
      <div className="w-10 h-10 rounded-full bg-[#1E90FF]/10 flex items-center justify-center border border-[#1E90FF]/20 animate-float shrink-0" style={{animationDelay: '0.2s'}}>
        <BarChart3 size={20} className="text-[#1E90FF] group-hover:drop-shadow-[0_0_8px_rgba(30,144,255,0.8)] transition-all" />
      </div>
      <div className="text-left">
        <p className="text-white font-medium text-sm">Real-Time</p>
        <p className="text-[10px] text-gray-400 uppercase tracking-tight font-semibold">Market Scanning</p>
      </div>
   </div>
   
   {/* Built-In Risk Management */}
   <div className="flex items-center gap-4 p-3 sm:p-4 rounded-xl hover:bg-white/5 transition-colors group relative overflow-hidden">
      <div className="w-10 h-10 rounded-full bg-[#1E90FF]/10 flex items-center justify-center border border-[#1E90FF]/20 animate-float shrink-0" style={{animationDelay: '0.4s'}}>
        <ShieldCheck size={20} className="text-[#1E90FF] group-hover:drop-shadow-[0_0_8px_rgba(30,144,255,0.8)] transition-all" />
      </div>
      <div className="text-left">
        <p className="text-white font-medium text-sm">Built-In</p>
        <p className="text-[10px] text-gray-500 uppercase tracking-tight">Risk Management</p>
      </div>
   </div>

</div>
      </div>
    </section>
  );
}
