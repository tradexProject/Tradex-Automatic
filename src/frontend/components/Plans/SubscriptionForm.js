'use client';
import React from 'react';
import { Mail, Phone, Hash, ArrowRight, Loader2, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function SubscriptionForm({ 
  formData, setFormData, errors, setErrors, isSubmitting, isAgreed, setIsAgreed, handleSubmit 
}) {
  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
      <div>
        <h3 className="text-xl font-bold text-white mb-1">Complete Subscription</h3>
        <p className="text-xs text-gray-500 mb-6">Enter your details and payment reference to receive your code.</p>
      </div>

      <input 
        type="text" 
        name="website_url_honeypot" 
        style={{ display: 'none' }} 
        tabIndex={-1} 
        autoComplete="off"
        value={formData.website_url_honeypot || ''}
        onChange={(e) => setFormData({...formData, website_url_honeypot: e.target.value})}
      />

      <div className="space-y-1.5">
        <div className="flex justify-between">
          <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest pl-1">Email Address <span className="text-red-400">*</span></label>
        </div>
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Mail size={16} className={`${errors.email ? 'text-red-400' : 'text-gray-500'} group-focus-within:${errors.email ? 'text-red-400' : 'text-[#1E90FF]'} transition-colors`} />
          </div>
          <input 
            type="email" 
            value={formData.email}
            onChange={(e) => {
              setFormData({...formData, email: e.target.value});
              if (errors.email) setErrors({...errors, email: null});
            }}
            placeholder="you@example.com" 
            disabled={isSubmitting}
            className={`w-full bg-black/40 border rounded-xl pl-11 pr-4 py-3 text-sm text-white focus:outline-none transition-all placeholder-gray-600 disabled:opacity-50 
            ${errors.email ? 'border-red-500/50 focus:border-red-500 focus:bg-red-500/5' : 'border-white/5 focus:bg-white/[0.03] focus:border-[#1E90FF]/50'}`}
          />
        </div>
        <AnimatePresence>
          {errors.email && (
            <motion.p initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }} className="text-[11px] text-red-400 pl-1 flex items-center gap-1 mt-1">
              <AlertCircle size={12} /> {errors.email}
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      <div className="space-y-1.5">
        <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest pl-1">
          Phone Number <span className="text-gray-600 lowercase font-medium tracking-normal">(Optional)</span>
        </label>
        <div className="flex gap-2">
          <div className="relative group w-1/3 sm:w-1/4">
            <input 
              type="text" 
              value={formData.countryCode}
              onChange={(e) => {
                let val = e.target.value.replace(/[^\d+]/g, '');
                if (val && !val.startsWith('+')) val = '+' + val;
                setFormData({...formData, countryCode: val});
              }}
              maxLength={5}
              disabled={isSubmitting}
              placeholder="+962"
              className="w-full h-full bg-black/40 border border-white/5 rounded-xl px-2 py-3 text-xs sm:text-sm text-white text-center focus:outline-none focus:bg-white/[0.03] focus:border-[#1E90FF]/50 transition-all disabled:opacity-50"
            />
          </div>

          <div className="relative group w-2/3 sm:w-3/4">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Phone size={16} className="text-gray-500 group-focus-within:text-[#1E90FF] transition-colors" />
            </div>
            <input 
              type="tel" 
              value={formData.phone}
              onChange={(e) => setFormData({...formData, phone: e.target.value.replace(/\D/g, '')})} 
              placeholder="7X XXX XXXX" 
              disabled={isSubmitting}
              className="w-full bg-black/40 border border-white/5 rounded-xl pl-11 pr-4 py-3 text-sm text-white focus:outline-none focus:bg-white/[0.03] focus:border-[#1E90FF]/50 transition-all placeholder-gray-600 disabled:opacity-50"
            />
          </div>
        </div>
      </div>

      <div className="space-y-1.5">
        <label className="block text-[10px] font-black text-[#1E90FF] uppercase tracking-widest pl-1">Transaction ID <span className="text-red-400">*</span></label>
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Hash size={16} className={`${errors.transactionId ? 'text-red-400' : 'text-gray-500'} group-focus-within:${errors.transactionId ? 'text-red-400' : 'text-[#1E90FF]'} transition-colors`} />
          </div>
          <input 
            type="text" 
            value={formData.transactionId}
            onChange={(e) => {
              setFormData({...formData, transactionId: e.target.value});
              if (errors.transactionId) setErrors({...errors, transactionId: null});
            }}
            placeholder="e.g. 982734982374" 
            disabled={isSubmitting}
            className={`w-full border rounded-xl pl-11 pr-4 py-3 text-sm text-white focus:outline-none transition-all placeholder-gray-600 disabled:opacity-50 
            ${errors.transactionId ? 'bg-red-500/5 border-red-500/50 focus:border-red-500' : 'bg-[#1E90FF]/5 border-[#1E90FF]/20 focus:bg-[#1E90FF]/10 focus:border-[#1E90FF]'}`}
          />
        </div>
        <AnimatePresence>
          {errors.transactionId && (
            <motion.p initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }} className="text-[11px] text-red-400 pl-1 flex items-center gap-1 mt-1">
              <AlertCircle size={12} /> {errors.transactionId}
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      <div className="mt-4 mb-6">
        <div className="flex items-start gap-3">
          <div className="flex items-center h-5 mt-0.5">
            <input
              id="consent"
              type="checkbox"
              checked={isAgreed}
              onChange={(e) => {
                setIsAgreed(e.target.checked);
                if (errors.agreement) setErrors({...errors, agreement: null});
              }}
              disabled={isSubmitting}
              className={`w-4 h-4 rounded bg-black/40 text-[#1E90FF] focus:ring-[#1E90FF]/50 focus:ring-offset-gray-900 cursor-pointer transition-all 
              ${errors.agreement ? 'border-red-500 outline outline-1 outline-red-500/50' : 'border-white/20'}`}
            />
          </div>
          <label htmlFor="consent" className="text-[11px] leading-relaxed text-gray-400 cursor-pointer select-none">
            I confirm my email is correct to receive the receipt and response. I understand transaction verification takes time, and I will contact support immediately if any issues arise. <span className="text-red-400">*</span>
          </label>
        </div>
        <AnimatePresence>
          {errors.agreement && (
            <motion.p initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }} className="text-[11px] text-red-400 pl-7 flex items-center gap-1 mt-1.5">
              <AlertCircle size={12} /> {errors.agreement}
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      <button 
        type="submit" 
        disabled={isSubmitting}
        className="w-full py-4 rounded-xl bg-gradient-to-r from-[#1E90FF] to-[#60A5FA] text-white font-semibold shadow-[0_0_20px_rgba(30,144,255,0.3)] hover:shadow-[0_0_30px_rgba(30,144,255,0.5)] hover:scale-[1.02] transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100"
      >
        {isSubmitting ? (
          <>
            <Loader2 size={18} className="animate-spin" />
            <span>Processing...</span>
          </>
        ) : (
          <>
            <span>Submit Request</span>
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </>
        )}
      </button>
    </form>
  );
}