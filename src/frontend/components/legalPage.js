'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, FileText, AlertTriangle, ArrowLeft, Lock, Scale, Info } from 'lucide-react';
import Link from 'next/link';

export default function PoliciesPage() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
    }
  };

  return (
    <div className="min-h-screen  text-gray-300 font-sans ">
      {/* Dynamic Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-5%] w-[500px] h-[500px] bg-[#1E90FF]/10 blur-[150px] rounded-full animate-pulse" />
        <div className="absolute bottom-[5%] right-[-5%] w-[400px] h-[400px] bg-blue-600/5 blur-[130px] rounded-full" />
        <div className="absolute top-[40%] left-[30%] w-[300px] h-[300px] bg-indigo-500/5 blur-[120px] rounded-full" />
      </div>

      <div className="relative max-w-4xl mx-auto px-6 py-16">
        
        {/* Navigation */}
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
          <Link 
            href="/" 
            className="inline-flex mt-10 items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-gray-500 hover:text-white transition-all mb-16 group"
          >
            <div className="p-2 rounded-full border border-white/5 bg-white/5 group-hover:border-[#1E90FF]/40 transition-all">
              <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
            </div>
            Back to Dashboard
          </Link>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-12"
        >
          {/* Hero Header */}
          <section className="text-left space-y-6">
            <motion.div variants={itemVariants} className="inline-block px-4 py-1.5 rounded-full border border-[#1E90FF]/20 bg-[#1E90FF]/5 text-[#1E90FF] text-[10px] font-black uppercase tracking-widest">
              Compliance & Safety
            </motion.div>
            <motion.h1 
              variants={itemVariants}
              className="text-5xl md:text-6xl font-black text-white tracking-tighter leading-none"
            >
              Legal <span className="block sm:inline-block text-[#3B82F6] sm:ml-3 md:ml-4 drop-shadow-[0_0_25px_rgba(59,130,246,0.8)] [text-shadow:0_0_20px_rgba(59,130,246,0.5)] mt-1 sm:mt-0">Framework.</span>
            </motion.h1>
            <motion.p variants={itemVariants} className="text-gray-500 text-lg max-w-2xl leading-relaxed">
              Transparent, secure, and built on trust. Our policies ensure your data is protected while you navigate the markets with  
                  <span className="text-white/90 ml-1 font-semibold tracking-wide text-lg group-hover:text-white transition-colors duration-300">
  Trade
  <span className="bg-gradient-to-tr from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
    X
  </span>
</span>
              .
            </motion.p>
          </section>

          {/* Privacy Policy Card */}
          <motion.section 
            variants={itemVariants} 
            className="group bg-gradient-to-b from-white/[0.04] to-transparent border border-white/[0.08] rounded-[2.5rem] p-10 relative overflow-hidden hover:border-[#1E90FF]/30 transition-all duration-500"
          >
            <div className="absolute top-0 right-0 p-10 opacity-[0.03] group-hover:opacity-[0.07] transition-opacity pointer-events-none">
              <Lock size={180} />
            </div>
            
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 flex items-center justify-center bg-gradient-to-br from-[#1E90FF] to-blue-700 rounded-2xl shadow-[0_0_20px_rgba(30,144,255,0.3)]">
                <ShieldCheck size={24} className="text-white" />
              </div>
              <h2 className="text-3xl font-bold text-white tracking-tight">Privacy Policy</h2>
            </div>

            <div className="grid gap-6 text-gray-400 leading-relaxed text-lg">
              <p>
                At 
                      <span className="text-white/90 m-1 font-semibold tracking-wide text-lg group-hover:text-white transition-colors duration-300">
  Trade
  <span className="bg-gradient-to-tr from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
    X
  </span>
</span>
                   Automatic , we treat your data with the same precision as our algorithms. We only collect essential metrics: account synchronization, secure contact points, and operational usage data to refine your experience.
              </p>
              <p>
                Your identity is <span className="text-[#1E90FF] font-medium">sovereign.</span> We never monetize your information. Security protocols are active 24/7, employing enterprise-grade encryption to shield your legacy from unauthorized access.
              </p>
              <div className="p-6 rounded-2xl bg-[#1E90FF]/5 border border-[#1E90FF]/10 flex gap-4 items-start">
                <Info className="text-[#1E90FF] shrink-0 mt-1" size={18} />
                <p className="text-sm text-blue-200/70 italic leading-snug">
                  By utilizing the 
                      <span className="text-white/90 m-1 font-semibold tracking-wide text-lg group-hover:text-white transition-colors duration-300">
  Trade
  <span className="bg-gradient-to-tr from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
    X
  </span>
</span>
                   ecosystem, you acknowledge our specialized data handling procedures designed for optimal security and performance.
                </p>
              </div>
            </div>
          </motion.section>

          {/* Terms of Service Grid */}
          <motion.section 
            variants={itemVariants} 
            className="bg-white/[0.01] border border-white/[0.05] rounded-[2.5rem] p-10"
          >
            <div className="flex items-center gap-4 mb-10">
              <div className="w-12 h-12 flex items-center justify-center bg-white/5 border border-white/10 rounded-2xl">
                <Scale size={24} className="text-purple-400" />
              </div>
              <h2 className="text-3xl font-bold text-white tracking-tight">Terms of Service</h2>
            </div>

            <div className="grid md:grid-cols-2 gap-x-10 gap-y-8">
              {[
                { title: "Non-Custodial Role", text: "TradeX is a technical interface. We do not act as a broker or financial advisor." },
                { title: "Market Volatility", text: "Trading carries inherent risks. Success is determined by market conditions, not guarantees." },
                { title: "Sovereign Execution", text: "You maintain full authority over every trade, account action, and risk parameter." },
                { title: "No Financial Liability", text: "Technical tools are aids; users assume all responsibility for fiscal outcomes." },
                { title: "Integrity Clause", text: "Unauthorized duplication or reverse engineering of TradeX core is strictly prohibited." },
                { title: "Protocol Evolution", text: "We reserve the right to upgrade system architectures to maintain peak security." }
              ].map((item, idx) => (
                <div key={idx} className="space-y-2 group">
                  <h4 className="text-white font-bold flex items-center gap-2 group-hover:text-[#1E90FF] transition-colors">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#1E90FF]" />
                    {item.title}
                  </h4>
                  <p className="text-sm text-gray-500 leading-relaxed pl-3.5 group-hover:text-gray-400 transition-colors">{item.text}</p>
                </div>
              ))}
            </div>
          </motion.section>

          {/* Risk Disclaimer - High Visibility */}
          <motion.section 
            variants={itemVariants}
            className="bg-gradient-to-r from-red-500/10 via-red-500/[0.02] to-transparent border border-red-500/20 rounded-[2.5rem] p-10 relative group"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 flex items-center justify-center bg-red-500/10 rounded-2xl border border-red-500/20">
                <AlertTriangle size={24} className="text-red-500 animate-pulse" />
              </div>
              <h2 className="text-2xl font-black text-white uppercase tracking-tighter italic">Critical Risk Warning</h2>
            </div>

            <div className="space-y-4 text-gray-400">
              <p className="text-red-100 font-bold leading-relaxed">
                Trading in financial markets involves substantial risk of loss and is not suitable for everyone.
              </p>
              <p className="text-sm leading-relaxed">
                TradeX Automatic provides high-frequency tools, but performance is never guaranteed. Past results do not predict future success. Leverage carries risk; only trade capital you are prepared to lose.
              </p>
            </div>
          </motion.section>

          {/* Footer */}
          <motion.footer 
            variants={itemVariants} 
            className="text-center pt-20 border-t border-white/5"
          >
            <div className="text-[10px] text-gray-600 font-black uppercase tracking-[0.5em] mb-4">
              Authorized Digital Document
            </div>
        
          </motion.footer>
        </motion.div>
      </div>
    </div>
  );
}