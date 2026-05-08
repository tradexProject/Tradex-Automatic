'use client';
import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function Footer({ sectionVariants }) {
  return (
    <motion.footer 
      variants={sectionVariants} 
      className="text-center pt-10 pb-8 border-t border-white/5"
    >
      <div className="flex justify-center gap-6 mb-4">
        <Link 
          href="/Legal" 
          className="text-[10px] text-gray-500 hover:text-[#1E90FF] uppercase tracking-widest transition-colors font-medium"
        >
          Privacy Policy
        </Link>
        <Link 
          href="/Legal" 
          className="text-[10px] text-gray-500 hover:text-[#1E90FF] uppercase tracking-widest transition-colors font-medium"
        >
          Terms of Service
        </Link>
      </div>

      <p className="text-[10px] text-gray-600 uppercase tracking-widest">
        © {new Date().getFullYear()} TradeX Automatic • All Rights Reserved
      </p>
    </motion.footer>
  );
}