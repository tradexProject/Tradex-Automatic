'use client';
import React from 'react';
import { CheckCircle2, Sparkles } from 'lucide-react'; 
import { motion } from 'framer-motion';
import { cardVariants } from './data';

export default function PlanCard({ plan, isAnnual, onSelect, icon: Icon, isPro }) {
  const price = plan.priceMonthly;
  const oldPrice = plan.oldPrice; 

  if (isPro) {
    return (
      <motion.div variants={cardVariants} className="relative z-20 lg:-mt-12 lg:mb-[-3rem] lg:scale-110 group">
        <div className="absolute -inset-[2px] rounded-[2.2rem] bg-gradient-to-br from-[#1E90FF] via-[#60A5FA] to-[#1E90FF] opacity-50 group-hover:opacity-100 blur-[2px] group-hover:blur-md transition-all duration-500"></div>
        
        <div className="relative h-full bg-[#0a0a0a] px-10 py-16 lg:py-20 rounded-[2rem] flex flex-col border border-white/5 overflow-visible">
          <div className="absolute inset-0 overflow-hidden rounded-[2rem] pointer-events-none">
            <div className="absolute -top-12 -right-12 w-32 h-32 bg-[#1E90FF]/20 blur-[40px] rounded-full"></div>
          </div>

          <motion.div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 flex items-center justify-center whitespace-nowrap">
            <div className="relative flex items-center gap-2 px-5 py-2 rounded-full bg-gradient-to-b from-[#60A5FA] to-[#1E90FF] border border-white/40">
              <Sparkles size={14} className="text-white animate-pulse" />
              <span className="text-white text-[11px] font-black uppercase tracking-[0.2em] drop-shadow-md">
                {plan.highlight || "Most Popular"}
              </span>
              <Sparkles size={14} className="text-white animate-pulse" />
            </div>
          </motion.div>

          <div className="relative z-10 h-full flex flex-col">
            <div className="w-12 h-12 rounded-full bg-[#1E90FF]/20 flex items-center justify-center mb-6 border border-[#1E90FF]/30 group-hover:scale-110 transition-transform shadow-[0_0_15px_rgba(30,144,255,0.2)]">
              <Icon size={20} className="text-[#1E90FF]" />
            </div>
            <h3 className="text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-[#1E90FF] to-[#60A5FA] mb-1">{plan.name}</h3>
            <p className="text-gray-500 text-xs mb-4">{plan.description}</p>
            
            <div className="mb-8 flex items-end gap-2">
              {oldPrice && (
                <span className="text-xl text-gray-600 line-through mb-1 font-light">
                  ${oldPrice}
                </span>
              )}
              <span className="text-5xl font-bold text-white transition-all duration-500">${price}</span>
              <span className="text-gray-500 font-light mb-1 italic text-sm">/ {plan.duration}</span>
            </div>

            <ul className="space-y-4 mb-10 flex-grow">
              {plan.features.map((f, i) => (
                <li key={i} className="flex items-center gap-3 text-sm text-gray-200 font-medium">
                  <CheckCircle2 size={18} className="text-[#1E90FF] drop-shadow-[0_0_8px_rgba(30,144,255,0.5)]" /> {f}
                </li>
              ))}
            </ul>
            <button 
              onClick={() => !plan.isDisabled && onSelect(plan)} 
              disabled={plan.isDisabled}
              className={`w-full py-4 rounded-xl font-semibold transition-all duration-300 ${
                plan.isDisabled 
                  ? 'bg-white/5 text-gray-500 cursor-not-allowed border border-white/5' 
                  : 'bg-gradient-to-r from-[#1E90FF] to-[#60A5FA] text-white shadow-[0_0_20px_rgba(30,144,255,0.3)] hover:shadow-[0_0_30px_rgba(30,144,255,0.5)] hover:scale-[1.02]'
              }`}
            >
              {plan.isDisabled ? 'Currently Unavailable' : 'Get Started Now'}
            </button>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div variants={cardVariants} className="group h-full bg-white/[0.02] border border-white/5 p-10 rounded-[2rem] backdrop-blur-sm relative flex flex-col transition-all duration-500 hover:-translate-y-2 hover:bg-white/[0.04] hover:border-white/10">
      <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center mb-6 border border-white/10 group-hover:scale-110 transition-transform">
        <Icon size={18} className="text-gray-400 group-hover:text-[#1E90FF] transition-colors" />
      </div>
      <h3 className="text-lg font-medium text-white mb-1">{plan.name}</h3>
      <p className="text-gray-500 text-xs mb-6">{plan.description}</p>
      
      <div className="mb-8 flex items-end gap-1 overflow-hidden">
        <span className="text-4xl font-bold text-white transition-all duration-500">${price}</span>
        <span className="text-gray-500 font-light pb-1 italic text-sm">/ {plan.duration}</span>
      </div>
      <ul className="space-y-4 mb-10 flex-grow">
        {plan.features.map((f, i) => (
          <li key={i} className="flex items-center gap-3 text-sm text-gray-400 font-light group-hover:text-gray-300 transition-colors">
            <CheckCircle2 size={16} className="text-gray-600 group-hover:text-[#1E90FF]" /> {f}
          </li>
        ))}
      </ul>
      
      <button 
        onClick={() => !plan.isDisabled && onSelect(plan)} 
        disabled={plan.isDisabled}
        className={`w-full py-3.5 rounded-xl border font-medium transition-all duration-300 ${
          plan.isDisabled 
            ? 'border-white/5 text-gray-500 bg-white/5 cursor-not-allowed' 
            : 'border-white/10 text-white hover:bg-[#1E90FF] hover:border-[#1E90FF]'
        }`}
      >
        {plan.isDisabled ? 'Sold Out' : 'Select Plan'}
      </button>
    </motion.div>
  );
}