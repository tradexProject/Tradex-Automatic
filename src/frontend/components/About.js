'use client';
import React, { useState, useEffect } from 'react';
import { Zap, Cpu } from 'lucide-react'; 
import { motion } from 'framer-motion';

export default function About() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [particles, setParticles] = useState([]);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    
    checkMobile();
    
    window.addEventListener('resize', checkMobile);

    const handleMouseMove = (e) => {
      if (window.innerWidth < 1024) return;
      const x = (e.clientX - window.innerWidth / 2) / 20;
      const y = (e.clientY - window.innerHeight / 2) / 20;
      setMousePos({ x, y });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  useEffect(() => {
    const particleCount = typeof window !== 'undefined' && window.innerWidth < 1024 ? 8 : 30;
    
    const generatedParticles = Array.from({ length: particleCount }).map((_, i) => ({
      id: i,
      size: Math.random() * 4 + 2,
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      moveX: (Math.random() - 0.5) * (isMobile ? 50 : 150), 
      moveY: (Math.random() - 0.5) * (isMobile ? 50 : 150),
      duration: Math.random() * 15 + 15,
    }));
    setParticles(generatedParticles);
  }, [isMobile]);

  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  return (
    <section id="about" className="relative min-h-screen flex flex-col items-center justify-center pt-24 md:pt-32 pb-16 px-4 sm:px-6 overflow-hidden bg-transparent">      
      <style jsx>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .perspective-view { perspective: 2000px; }
        @media (min-width: 1024px) {
          .preserve-3d { transform-style: preserve-3d; }
        }
      `}</style>

      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {particles.map((p) => (
          <motion.div
            key={p.id}
            className="absolute rounded-full bg-[#1E90FF]/60"
            style={{
              width: p.size,
              height: p.size,
              top: p.top,
              left: p.left,
              boxShadow: isMobile ? 'none' : `0 0 ${p.size * 2}px rgba(30,144,255,0.8)` // إيقاف الـ shadow على الموبايل
            }}
            animate={{
              x: [0, p.moveX, 0],
              y: [0, p.moveY, 0],
              opacity: [0.1, 0.5, 0.1],
            }}
            transition={{
              duration: p.duration,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        ))}
      </div>

      <div className="w-full max-w-6xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative h-[300px] sm:h-[400px] lg:h-[450px] flex justify-center items-center perspective-view order-first lg:order-none"
          >
            <div className="absolute w-48 h-48 sm:w-72 sm:h-72 bg-[#1E90FF]/15 rounded-full blur-[40px] lg:blur-[100px]"></div>
            
            <div 
              className="relative w-64 h-64 lg:w-72 lg:h-72 preserve-3d transition-transform duration-300 ease-out"
              style={{ transform: isMobile ? 'none' : `rotateY(${mousePos.x}deg) rotateX(${-mousePos.y}deg)` }}
            >
              <div className="hidden lg:block absolute inset-0 preserve-3d animate-[spin-slow_40s_linear_infinite]">
                {[0, 30, 60, 90, 120, 150].map((angle) => (
                  <div key={`y-${angle}`} className="absolute inset-0 border-2 border-[#1E90FF]/70 rounded-full drop-shadow-[0_0_5px_rgba(30,144,255,0.6)]" style={{ transform: `rotateY(${angle}deg)` }}></div>
                ))}
                {[0, 30, 60, 90, 120, 150].map((angle) => (
                  <div key={`x-${angle}`} className="absolute inset-0 border-2 border-[#1E90FF]/70 rounded-full drop-shadow-[0_0_5px_rgba(30,144,255,0.6)]" style={{ transform: `rotateX(${angle}deg)` }}></div>
                ))}
              </div>

              <div className="absolute inset-[-40px] lg:inset-[-80px] preserve-3d pointer-events-none" style={{ transform: isMobile ? 'none' : `rotateX(75deg) rotateY(-15deg)` }}>
                <div className="absolute inset-[30px] border-[2px] lg:border-[3px] border-[#1E90FF]/60 rounded-full lg:drop-shadow-[0_0_15px_rgba(30,144,255,0.8)] animate-[pulse_3s_ease-in-out_infinite]"></div>
                <div className="absolute inset-[10px] border-[8px] lg:border-[18px] border-[#1E90FF]/15 rounded-full"></div>
                <div className="absolute inset-0 border-[1px] border-[#1E90FF]/40 rounded-full"></div>
                <div className="absolute inset-[-20px] border border-[#1E90FF]/50 rounded-full border-dashed animate-[spin_20s_linear_infinite]"></div>
              </div>

              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div 
                  animate={isMobile ? { y: [-10, 10, -10] } : {}} 
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="relative lg:transform lg:translate-z-[50px]"
                >
                  <div className="absolute inset-0 bg-[#1E90FF] blur-xl lg:blur-2xl opacity-30 animate-pulse"></div>
                  <Cpu size={isMobile ? 40 : 48} className="text-[#1E90FF] relative z-10 opacity-90 drop-shadow-[0_0_10px_rgba(30,144,255,0.5)]" />
                </motion.div>
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={{
              visible: { transition: { staggerChildren: 0.15 } }
            }}
            className="text-center lg:text-left flex flex-col items-center lg:items-start"
          >
            <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full border border-[#1E90FF]/30 bg-[#1E90FF]/10 mb-6">
                   <span className="relative flex h-2 w-2">
            <span className=" absolute inline-flex h-full w-full rounded-full bg-[#1E90FF] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#1E90FF]"></span>
          </span>
              <span className="text-[#1E90FF] text-[10px] sm:text-xs font-bold uppercase tracking-wider">About TradeX Automatic</span>
            </motion.div>
            
            <motion.h2 variants={fadeInUp} className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-black mb-6 sm:mb-8 tracking-tighter leading-tight text-white">
              Trading Excellence 
              <span className="block sm:inline-block font-bold text-[#2B82EE]  md:ml-1 drop-shadow-[0_0_8px_rgba(43,130,238,0.4)]">
              Simplified
              </span>
            </motion.h2>
            
            <motion.p variants={fadeInUp} className="text-sm sm:text-base lg:text-lg text-gray-400 mb-8 sm:mb-10 font-medium leading-relaxed max-w-2xl mx-auto lg:mx-0">
              <span className="text-white/90 font-semibold tracking-wide text-lg inline-flex items-center">
                Trade<span className="bg-gradient-to-tr from-indigo-400 to-cyan-400 bg-clip-text text-transparent mr-1">X</span>
              </span>
              Automatic is a next-generation **automated trading solution built primarily for Pocket Option**, designed to simplify and enhance your trading experience.
              Powered by advanced algorithms, intelligent market analysis, and precision-focused execution, TradeX Automatic helps streamline your trading workflow with speed, consistency, and automation.
            </motion.p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 w-full text-left">
              {[
                { title: 'Consistent Growth', desc: 'Focusing on reliable systems that support smart decision-making and long-term growth.' },
                { title: 'Precision Execution', desc: 'Disciplined execution powered by innovation and modern technology.' }
              ].map((item, idx) => (
                <motion.div 
                  key={idx} 
                  variants={fadeInUp}
                  className="bg-white/5 border border-white/5 p-4 sm:p-5 lg:p-6 rounded-2xl hover:bg-[#1E90FF]/5 hover:border-[#1E90FF]/30 transition-all duration-500 group"
                >
                  <h4 className="text-white font-bold mb-2 flex items-center gap-2 text-sm sm:text-base">
                    <div className="w-2 h-2 rounded-full bg-[#1E90FF] group-hover:animate-ping shrink-0"></div> {item.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-gray-500 group-hover:text-gray-300 transition-colors leading-relaxed">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="mt-20 sm:mt-24 lg:mt-32 pt-10 sm:pt-12 lg:pt-16 border-t border-white/5 grid lg:grid-cols-12 gap-8 lg:gap-12"
        >
          <div className="lg:col-span-4 text-center lg:text-left">
            <div className="inline-flex items-center justify-center lg:justify-start gap-2 mb-4 sm:mb-6 w-full">
              <span className="h-[1px] w-6 sm:w-8 bg-[#1E90FF]"></span>
              <span className="text-[#1E90FF] text-[10px] sm:text-xs lg:text-sm font-bold tracking-widest uppercase">Why Choose Us?</span>
            </div>
            <h3 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tighter mb-4 leading-tight text-white">
              OUR <br className="hidden lg:block"/>
              <span className="block sm:inline-block font-bold text-[#2B82EE]  md:ml-1 drop-shadow-[0_0_8px_rgba(43,130,238,0.4)]">Mission</span>
            </h3>
          </div>
          
          <div className="lg:col-span-8 text-gray-400 font-medium">
            <div className="grid sm:grid-cols-2 gap-5 sm:gap-6 lg:gap-8">
              <div className="p-2">
                <h4 className="text-white font-bold mb-2 flex items-center gap-2 text-sm sm:text-base">
                  <div className="w-1.5 h-1.5 bg-[#1E90FF] rounded-full shrink-0"></div> Precision & Control
                </h4>
                <h5 className="text-xs sm:text-sm mb-2 text-gray-300">Built for those who value consistency.</h5>
                <p className="text-[11px] sm:text-xs lg:text-sm text-gray-500 leading-relaxed">TradeX focuses on delivering consistent performance while maintaining a clean, user-friendly approach for maximum control.</p>
              </div>
              <div className="p-2">
                <h4 className="text-white font-bold mb-2 flex items-center gap-2 text-sm sm:text-base">
                  <div className="w-1.5 h-1.5 bg-[#1E90FF] rounded-full shrink-0"></div> Modern Technology
                </h4>
                <h5 className="text-xs sm:text-sm mb-2 text-gray-300">Continuous updates & support.</h5>
                <p className="text-[11px] sm:text-xs lg:text-sm text-gray-500 leading-relaxed">A powerful tool for traders who value efficiency, utilizing advanced automation to work with you, not against you.</p>
              </div>  
              <div className="sm:col-span-2 bg-[#1E90FF]/5 border border-[#1E90FF]/10 p-4 sm:p-5 lg:p-6 rounded-2xl mt-2">
                <h4 className="text-[#1E90FF] font-bold mb-2 text-sm sm:text-base">The TradeX Promise</h4>
                <p className="text-xs sm:text-sm text-gray-400 italic leading-relaxed">"No false promises, no unrealistic profits. Just a powerful, reliable system designed to help you trade with confidence, clarity, and disciplined execution."</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
