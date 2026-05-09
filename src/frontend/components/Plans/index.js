'use client';
import React, { useState, useEffect } from 'react';
import { Terminal, Zap, Layers, ChevronLeft, CheckCircle2, Copy, ShieldCheck, Mail, Phone, Hash, Loader2, AlertCircle, ChevronRight, X, MessageCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import PlanCard from './PlanCard';
import { plansData, containerVariants } from './data';

function SubscriptionForm({ formData, setFormData, errors, setErrors, isSubmitting, isAgreed, setIsAgreed, handleSubmit }) {
  return (
    <form onSubmit={handleSubmit} className="space-y-4" noValidate>
      <input type="text" name="website_url_honeypot" style={{ display: 'none' }} tabIndex={-1} autoComplete="off" value={formData.website_url_honeypot || ''} onChange={(e) => setFormData({...formData, website_url_honeypot: e.target.value})} />

      <div className="flex flex-col md:flex-row gap-4">
        <div className="space-y-1 flex-1">
          <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider pl-1">Email Address <span className="text-red-400">*</span></label>
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
              <Mail size={16} className={`${errors.email ? 'text-red-400' : 'text-gray-500'} group-focus-within:text-[#1E90FF] transition-colors`} />
            </div>
            <input 
              type="email" value={formData.email}
              onChange={(e) => { setFormData({...formData, email: e.target.value}); if (errors.email) setErrors({...errors, email: null}); }}
              placeholder="you@example.com" disabled={isSubmitting}
              className={`w-full bg-[#1c1c1e] border rounded-xl pl-10 pr-4 py-3 text-sm text-white focus:outline-none transition-all placeholder-gray-500 disabled:opacity-50 ${errors.email ? 'border-red-500/50 focus:border-red-500' : 'border-white/5 focus:border-[#1E90FF]'}`}
            />
          </div>
          <AnimatePresence>
            {errors.email && (
              <motion.p key="email-err" initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }} className="text-[11px] text-red-400 pl-1 flex items-center gap-1 mt-1">
                <AlertCircle size={12} /> {errors.email}
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        <div className="space-y-1 flex-1">
          <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider pl-1">Phone Number <span className="text-gray-500 lowercase font-normal">(Optional)</span></label>
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
              <Phone size={16} className="text-gray-500 group-focus-within:text-[#1E90FF] transition-colors" />
            </div>
            <input 
              type="tel" value={formData.phone}
              onChange={(e) => setFormData({...formData, phone: e.target.value.replace(/[^\d+ ]/g, '')})} 
              placeholder="+000 7X XXX XXXX" disabled={isSubmitting}
              className="w-full bg-[#1c1c1e] border border-white/5 rounded-xl pl-10 pr-4 py-3 text-sm text-white focus:outline-none focus:border-[#1E90FF] transition-all placeholder-gray-500 disabled:opacity-50"
            />
          </div>
        </div>
      </div>

      <div className="space-y-1">
        <label className="block text-[11px] font-bold text-[#1E90FF] uppercase tracking-wider pl-1">Transaction ID / Link <span className="text-red-400">*</span></label>
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
            <Hash size={16} className={`${errors.transactionId ? 'text-red-400' : 'text-gray-500'} group-focus-within:text-[#1E90FF] transition-colors`} />
          </div>
          <input 
            type="text" value={formData.transactionId}
            onChange={(e) => { setFormData({...formData, transactionId: e.target.value}); if (errors.transactionId) setErrors({...errors, transactionId: null}); }}
            placeholder="Paste your TxID or Transfer Link here" disabled={isSubmitting}
            className={`w-full bg-[#1E90FF]/5 border rounded-xl pl-10 pr-4 py-3 text-sm text-white focus:outline-none transition-all placeholder-gray-500 disabled:opacity-50 ${errors.transactionId ? 'border-red-500/50 focus:border-red-500' : 'border-[#1E90FF]/30 focus:border-[#1E90FF]'}`}
          />
        </div>
        <AnimatePresence>
          {errors.transactionId && (
            <motion.p key="tx-err" initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }} className="text-[11px] text-red-400 pl-1 flex items-center gap-1 mt-1">
              <AlertCircle size={12} /> {errors.transactionId}
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      <div className="mt-3 mb-5">
        <div className="flex items-start gap-3">
          <input id="consent" type="checkbox" checked={isAgreed} onChange={(e) => { setIsAgreed(e.target.checked); if (errors.agreement) setErrors({...errors, agreement: null}); }} disabled={isSubmitting} className="w-4 h-4 mt-0.5 rounded bg-black/40 text-[#1E90FF] border-white/20 cursor-pointer focus:ring-[#1E90FF]" />
          <label htmlFor="consent" className="text-[11px] leading-relaxed text-gray-400 cursor-pointer select-none">I confirm I have sent the funds and entered the correct TxID or Link. I understand verification may take some time.</label>
        </div>
        <AnimatePresence>
          {errors.agreement && (
            <motion.p key="agree-err" initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }} className="text-[11px] text-red-400 pl-7 flex items-center gap-1 mt-1.5">
              <AlertCircle size={12} /> {errors.agreement}
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      <button type="submit" disabled={isSubmitting} className="w-full py-4 rounded-xl bg-gradient-to-r from-[#1E90FF] to-[#60A5FA] text-white font-bold text-lg hover:shadow-[0_0_20px_rgba(30,144,255,0.4)] transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed">
        {isSubmitting ? <><Loader2 size={18} className="animate-spin" /> Processing...</> : 'Confirm Payment'}
      </button>
    </form>
  );
}

function PaymentModal({ isOpen, onClose, plan, isAnnual }) {
  const [step, setStep] = useState(1);
  const [selectedMethod, setSelectedMethod] = useState(null);
  const [formData, setFormData] = useState({ email: '', phone: '', transactionId: '', website_url_honeypot: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [isAgreed, setIsAgreed] = useState(false);
  const [errors, setErrors] = useState({});
  const [copiedId, setCopiedId] = useState(null);

  useEffect(() => {
    if (isOpen) {
      setStep(1);
      setSelectedMethod(null);
      setFormData({ email: '', phone: '', transactionId: '', website_url_honeypot: '' });
      setSubmitSuccess(false);
      setIsAgreed(false);
      setErrors({});
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  if (!isOpen || !plan) return null;

  const price = isAnnual ? plan.priceAnnual : plan.priceMonthly;
  
  const cryptoMethods = [
    { id: 'usdt-trc20', name: "Tether", network: "TRC20", ticker: "USDT", address: "TJmvB3hhpadn4jc9vkwYmTPZp2GUzgoaUr", icon: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xdAC17F958D2ee523a2206206994597C13D831ec7/logo.png", popular: true, networkIcon: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/tron/info/logo.png" },
    { id: 'usdt-erc20', name: "Tether", network: "ERC20", ticker: "USDT", address: "0xad4a4bdd629347a6dd6a6ed34d460513058ee4fd", icon: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xdAC17F958D2ee523a2206206994597C13D831ec7/logo.png", networkIcon: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/info/logo.png" },
    { id: 'usdt-bep20', name: "Tether", network: "BEP20", ticker: "USDT", address: "0xad4a4bdd629347a6dd6a6ed34d460513058ee4fd", icon: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xdAC17F958D2ee523a2206206994597C13D831ec7/logo.png", networkIcon: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/binance/info/logo.png" },
    { id: 'btc', name: "Bitcoin", network: "Bitcoin", ticker: "BTC", address: "1H4cusB6Q5STE75PzEkULEYv7HBLEx8h6Q", icon: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/bitcoin/info/logo.png", popular: true },
    { id: 'eth', name: "Ethereum", network: "ERC20", ticker: "ETH", address: "0xad4a4bdd629347a6dd6a6ed34d460513058ee4fd", icon: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/info/logo.png" },
    { id: 'ltc', name: "Litecoin", network: "Litecoin", ticker: "LTC", address: "LeepjfhKRkjD6Au1WZMQzfP5WRjBgVFEro", icon: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/litecoin/info/logo.png" },
    { id: 'usdc', name: "USDC", network: "ERC20", ticker: "USDC", address: "0xad4a4bdd629347a6dd6a6ed34d460513058ee4fd", icon: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48/logo.png" },
    { id: 'sol', name: "Solana", network: "Solana", ticker: "SOL", address: "5rFHP15KWcYobHi4D3fsC3fyn3fqpBnzwD4ne6tFg5XU", icon: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/solana/info/logo.png" },
    { id: 'binance', name: "Binance Pay", network: "Binance ID", ticker: "PAY", address: "456263937", icon: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/binance/info/logo.png", popular: true },
  ];

  const handleCopy = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email.trim()) newErrors.email = "Required.";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Invalid email.";
    if (!formData.transactionId.trim()) newErrors.transactionId = "Required.";
    if (!isAgreed) newErrors.agreement = "Must agree to terms.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsSubmitting(true);
    try {
      const methodString = selectedMethod ? `${selectedMethod.name} (${selectedMethod.network})` : 'Unknown';
      const response = await fetch('/api/requests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, planName: plan.name, price: price , paymentMethod :methodString}),
      });
      if (response.ok) {
        setSubmitSuccess(true);
        setTimeout(() => onClose(), 3000);
      } else {
        const data = await response.json();
        alert(data.error || 'Submission failed');
      }
    } catch (error) {
      alert("Connection error. Try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          key="modal-overlay"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          className="fixed inset-0 z-[99999] flex items-center justify-center p-4 sm:p-6 pt-10 md:pt-16 pb-8"
        >
          <div onClick={onClose} className="absolute inset-0 bg-black/80 backdrop-blur-md" />
          
          <motion.div 
            key="modal-content"
            initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }} 
            className="bg-[#111111] border border-[#1E90FF]/20 w-full max-w-5xl rounded-[24px] shadow-2xl relative z-10 flex flex-col max-h-[85vh] overflow-hidden"
          >
            {/* Header + Stepper */}
            <div className="bg-[#0a0a0a] px-6 md:px-8 py-5 border-b border-white/5 flex flex-wrap items-center justify-between gap-4 shrink-0">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-[#1E90FF]/20 flex items-center justify-center"><ShieldCheck size={16} className="text-[#1E90FF]" /></div>
                <span className="text-white font-bold text-lg tracking-wide hidden sm:block">Checkout</span>
              </div>
              
              {/* Stepper */}
              <div className="flex items-center gap-2 sm:gap-4 text-[10px] sm:text-xs font-bold uppercase tracking-wider">
                <div className={`flex items-center gap-2 transition-colors ${step >= 1 ? 'text-[#1E90FF]' : 'text-gray-600'}`}>
                  <span className={`flex items-center justify-center w-5 h-5 rounded-full ${step >= 1 ? 'bg-[#1E90FF] text-white' : 'bg-gray-800 text-gray-500'}`}>1</span>
                  <span className="hidden md:block">Summary</span>
                </div>
                <div className={`w-8 sm:w-12 h-[2px] rounded-full transition-colors ${step >= 2 ? 'bg-[#1E90FF]/50' : 'bg-white/5'}`}></div>
                
                <div className={`flex items-center gap-2 transition-colors ${step >= 2 ? 'text-[#1E90FF]' : 'text-gray-600'}`}>
                  <span className={`flex items-center justify-center w-5 h-5 rounded-full ${step >= 2 ? 'bg-[#1E90FF] text-white' : 'bg-gray-800 text-gray-500'}`}>2</span>
                  <span className="hidden md:block">Method</span>
                </div>
                <div className={`w-8 sm:w-12 h-[2px] rounded-full transition-colors ${step >= 3 ? 'bg-[#1E90FF]/50' : 'bg-white/5'}`}></div>
                
                <div className={`flex items-center gap-2 transition-colors ${step >= 3 ? 'text-[#1E90FF]' : 'text-gray-600'}`}>
                  <span className={`flex items-center justify-center w-5 h-5 rounded-full ${step >= 3 ? 'bg-[#1E90FF] text-white' : 'bg-gray-800 text-gray-500'}`}>3</span>
                  <span className="hidden md:block">Confirm</span>
                </div>
              </div>

              <button onClick={onClose} className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-colors">
                <X size={16} />
              </button>
            </div>

            {/* Scrollable Body */}
            <div className="p-6 md:p-8 overflow-y-auto custom-scrollbar flex-grow">
              <AnimatePresence mode="wait">
                
                {submitSuccess ? (
                  <motion.div key="success" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="text-center py-20 space-y-4">
                    <div className="w-24 h-24 mx-auto rounded-full bg-green-500/10 flex items-center justify-center border border-green-500/20">
                      <CheckCircle2 size={48} className="text-green-500" />
                    </div>
                    <h2 className="text-3xl font-bold text-white">Payment Received</h2>
                    <p className="text-gray-400 text-base max-w-[300px] mx-auto">Your transaction is being verified. This window will close shortly.</p>
                  </motion.div>
                ) : 
                
                step === 1 ? (
                  <motion.div key="step-1" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="flex flex-col md:flex-row gap-8">
                    <div className="flex-1">
                      <h2 className="text-2xl font-bold text-white mb-4">Plan Information</h2>
                      <div className="bg-[#1c1c1e] rounded-2xl p-6 border border-white/5 mb-6">
                        <div className="flex items-center gap-4 mb-3">
                          <div className="w-12 h-12 rounded-full bg-[#1E90FF]/20 flex items-center justify-center border border-[#1E90FF]/30">
                            <CheckCircle2 size={24} className="text-[#1E90FF]" />
                          </div>
                          <div>
                            <h3 className="text-white font-bold text-xl">{plan.name}</h3>
                            <p className="text-[#1E90FF] text-sm font-medium">{plan.duration}</p>
                          </div>
                        </div>
                        <p className="text-gray-400 text-sm leading-relaxed">{plan.description}</p>
                      </div>

                      <h4 className="text-white font-semibold mb-3 px-1 text-sm">Included Features:</h4>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {plan.features?.map((f, i) => (
                          <li key={`feat-${i}`} className="flex items-start gap-2 text-sm text-gray-300">
                            <CheckCircle2 size={16} className="text-[#1E90FF] mt-0.5 shrink-0" /> 
                            <span className="leading-snug">{f}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="w-full md:w-[340px] shrink-0">
                      <div className="bg-[#1c1c1e] rounded-3xl p-6 border border-white/5">
                        <h3 className="text-lg font-bold text-white mb-6 border-b border-white/10 pb-4">Order Summary</h3>
                        
                        <div className="space-y-4 mb-6">
                          <div className="flex justify-between items-center text-sm">
                            <span className="text-gray-400">Billing Cycle</span>
                            <span className="text-white font-medium">{isAnnual ? 'Yearly' : 'Monthly'}</span>
                          </div>
                          <div className="flex justify-between items-center text-sm">
                            <span className="text-gray-400">Duration</span>
                            <span className="text-white font-medium">{plan.duration}</span>
                          </div>
                          {plan.oldPrice && (
                            <div className="flex justify-between items-center text-sm">
                              <span className="text-gray-400">Original Price</span>
                              <span className="text-gray-500 line-through">${plan.oldPrice}</span>
                            </div>
                          )}
                        </div>

                        <div className="flex justify-between items-end mb-8 pt-6 border-t border-white/10">
                          <span className="text-base text-gray-300 font-medium pb-1">Total Due</span>
                          <div className="text-right">
                            <span className="text-4xl font-black text-white">${price}</span>
                            <span className="text-gray-500 text-sm ml-1 font-medium">USD</span>
                          </div>
                        </div>

                        <button onClick={() => setStep(2)} className="w-full py-4 rounded-xl bg-[#1E90FF] text-white font-bold text-base hover:bg-[#60A5FA] transition-all flex items-center justify-center gap-2">
                          Choose Payment <ChevronRight size={18} />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ) : 
                
                step === 2 ? (
                  <motion.div key="step-2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                    <div className="flex items-center justify-between mb-8">
                      <div>
                        <h2 className="text-2xl font-bold text-white mb-1">Select Payment Method</h2>
                        <p className="text-gray-400 text-sm">Choose the cryptocurrency you want to pay with.</p>
                      </div>
                      <button onClick={() => setStep(1)} className="hidden sm:flex items-center gap-1 text-[#1E90FF] hover:text-white transition-colors text-sm font-medium">
                        <ChevronLeft size={16} /> Back
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {cryptoMethods.map((method) => (
                        <div 
                          key={method.id} 
                          onClick={() => { setSelectedMethod(method); setStep(3); }}
                          className="bg-[#1c1c1e] border border-white/5 rounded-2xl p-5 flex items-center justify-between cursor-pointer hover:border-[#1E90FF]/50 hover:bg-[#1E90FF]/5 transition-all group relative overflow-hidden"
                        >
                          <div className="flex items-center gap-4 relative z-10">
                            <div className="relative">
                              <div className="w-12 h-12 rounded-full bg-black/40 p-2.5 flex items-center justify-center border border-white/5">
                                <img src={method.icon} alt={method.name} className="w-full h-full object-contain rounded-full" />
                              </div>
                              {method.networkIcon && (
                                <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-[#1c1c1e] p-[2px]">
                                  <img src={method.networkIcon} alt="network" className="w-full h-full object-contain rounded-full bg-white/5" />
                                </div>
                              )}
                            </div>
                            <div>
                              <h4 className="text-white font-bold text-base mb-0.5 flex items-center gap-2">
                                {method.name} <span className="text-[#1E90FF] text-xs font-mono bg-[#1E90FF]/10 px-1.5 py-0.5 rounded">{method.ticker}</span>
                              </h4>
                              <p className="text-gray-500 text-xs">Network: {method.network}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-3 relative z-10">
                            {method.popular && <span className="hidden sm:block bg-[#1E90FF]/20 text-[#1E90FF] text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider">Popular</span>}
                            <ChevronRight size={20} className="text-gray-600 group-hover:text-white transition-colors" />
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    {/* Telegram Contact Option */}
                    <div className="mt-8 text-center bg-[#1c1c1e] border border-white/5 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                      <p className="text-sm text-gray-400">Have another payment method not listed here?</p>
                      <a href="https://t.me/WeWillGet" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-[#1E90FF] hover:text-white transition-colors text-sm font-semibold">
                        <MessageCircle size={16} /> Contact privately
                      </a>
                    </div>
                  </motion.div>
                ) : (
                  
                  <motion.div key="step-3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="flex flex-col md:flex-row gap-8">
                    <div className="flex-1">
                      <button onClick={() => setStep(2)} className="flex items-center gap-1 text-[#1E90FF] hover:text-white transition-colors mb-6 text-sm font-medium">
                        <ChevronLeft size={16} /> Change Payment Method
                      </button>

                      <h2 className="text-2xl font-bold text-white mb-2">Send {selectedMethod?.ticker}</h2>
                      <p className="text-gray-400 text-sm mb-6">Please send exactly <strong className="text-white bg-white/10 px-1.5 py-0.5 rounded border border-white/10">${price}.00</strong> to the address below.</p>

                      <div className="bg-[#1c1c1e] border border-[#1E90FF]/30 rounded-2xl p-6 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-[#1E90FF]/10 blur-[40px] rounded-full pointer-events-none"></div>
                        <div className="flex items-center gap-4 mb-4 pb-4 border-b border-white/5 relative z-10">
                          <div className="w-12 h-12 rounded-full bg-black/40 p-2.5 flex items-center justify-center border border-white/5">
                            <img src={selectedMethod?.icon} alt={selectedMethod?.name} className="w-full h-full object-contain rounded-full" />
                          </div>
                          <div>
                            <p className="text-white text-lg font-bold">{selectedMethod?.name} ({selectedMethod?.ticker})</p>
                            <p className="text-gray-400 text-sm">Network: <span className="text-[#1E90FF] font-medium">{selectedMethod?.network}</span></p>
                          </div>
                        </div>
                        <div className="flex items-center justify-between gap-3 bg-black/40 p-4 rounded-xl border border-white/5 relative z-10">
                          <p className="text-sm text-white font-mono truncate select-all">{selectedMethod?.address}</p>
                          <button onClick={() => handleCopy(selectedMethod?.address, 'addr')} className="shrink-0 p-2 bg-[#1E90FF]/20 rounded-lg hover:bg-[#1E90FF] text-[#1E90FF] hover:text-white transition-all flex items-center gap-2">
                            {copiedId === 'addr' ? <><CheckCircle2 size={16} /> <span className="text-xs font-bold hidden sm:block">Copied</span></> : <><Copy size={16} /> <span className="text-xs font-bold hidden sm:block">Copy</span></>}
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="w-full md:w-[45%] shrink-0 bg-[#1c1c1e] border border-white/5 p-6 rounded-3xl">
                      <h3 className="text-white font-bold mb-4 text-lg">Confirm Your Transfer</h3>
                      <SubscriptionForm 
                        formData={formData} setFormData={setFormData}
                        errors={errors} setErrors={setErrors}
                        isSubmitting={isSubmitting} isAgreed={isAgreed}
                        setIsAgreed={setIsAgreed} handleSubmit={handleSubmit}
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

          
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function Plans() {
  const [isAnnual, setIsAnnual] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);

  const handleOpenModal = (plan) => {
    setSelectedPlan(plan);
    setIsModalOpen(true);
  };

  return (
    <section id="plans" className="py-22 relative z-10 px-6 bg-transparent overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] md:w-[800px] md:h-[600px] bg-[#1E90FF]/10 md:bg-[#1E90FF]/5 blur-[60px] md:blur-[150px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-22"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight text-white">
            Choose Your 
            <span className="block sm:inline-block font-bold text-[#2B82EE] sm:ml-3 md:ml-4 drop-shadow-[0_0_8px_rgba(43,130,238,0.4)]">
              Plan
            </span>
          </h2>
          <p className="text-gray-400 text-base md:text-lg max-w-xl mx-auto font-light">
            Simple, transparent pricing built for scale. No hidden fees.
          </p>
        </motion.div>
        
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }} 
          className="grid lg:grid-cols-3 gap-6 md:gap-8 items-center max-w-6xl mx-auto mt-8"
        >
          <PlanCard plan={plansData.starter} isAnnual={isAnnual} onSelect={handleOpenModal} icon={Terminal} />
          <PlanCard plan={plansData.pro} isAnnual={isAnnual} onSelect={handleOpenModal} icon={Zap} isPro={true} />
          <PlanCard plan={plansData.institution} isAnnual={isAnnual} onSelect={handleOpenModal} icon={Layers} />
        </motion.div>
      </div>

      <PaymentModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        plan={selectedPlan}
        isAnnual={isAnnual}
      />
    </section>
  );
}