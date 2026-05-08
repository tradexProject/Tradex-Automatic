'use client';
import React, { useState } from 'react';
import { Mail, Phone, MessageSquare, Send, User, HelpCircle, Loader2, AlertCircle, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    reason: '',
    message: ''
  });
  
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const fadeInVariant = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6 } }
  };

  const formVariant = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.2 } }
  };

  const validateForm = () => {
    const newErrors = {};
    const htmlRegex = /<[^>]*>?/gm; // Basic injection prevention

    if (!formData.name.trim()) {
      newErrors.name = "Full name is required.";
    } else if (htmlRegex.test(formData.name)) {
      newErrors.name = "Invalid characters detected (< or > are not allowed).";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email address is required.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address.";
    }

    if (!formData.reason) {
      newErrors.reason = "Please select a reason for contact.";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message cannot be empty.";
    } else if (htmlRegex.test(formData.message)) {
      newErrors.message = "Invalid characters detected (< or > are not allowed).";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      setSubmitSuccess(true);
      // Optional: reset form after success
      setTimeout(() => {
        setSubmitSuccess(false);
        setFormData({ name: '', phone: '', email: '', reason: '', message: '' });
      }, 5000);

    } catch (error) {
      console.error('Submission error:', error);
      alert("Failed to send message. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  return (
    <section id="contact" className="relative min-h-screen flex flex-col items-center justify-center pt-24 md:pt-32 pb-12 overflow-hidden bg-transparent">
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
        className="absolute top-1/2 left-0 -translate-y-1/2 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-[#1E90FF]/10 blur-[80px] sm:blur-[120px] rounded-full pointer-events-none"
      ></motion.div>

      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          
          {/* Left Column - Text & Info */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
            className="flex flex-col justify-center text-center lg:text-left items-center lg:items-start"
          >
            <motion.div variants={fadeInVariant} className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-1.5 rounded-full bg-white/5 border border-[#1E90FF]/20 mb-6 w-fit">
              <span className="w-2 h-2 rounded-full bg-[#1E90FF] animate-pulse shrink-0"></span>
              <span className="text-gray-300 text-[10px] sm:text-xs font-medium tracking-wide">24/7 Support Available</span>
            </motion.div>
            
            <motion.h2 variants={fadeInVariant} className="text-4xl sm:text-4xl md:text-5xl md:leading-tight font-bold mb-4 sm:mb-6 tracking-tight text-white">
              Let's build something <br className="hidden sm:block" />
              <span className="block sm:inline-block font-bold text-[#2B82EE] sm:ml-1 md:ml-1 drop-shadow-[0_0_8px_rgba(43,130,238,0.4)]">incredible together.</span>
            </motion.h2>
            
            <motion.p variants={fadeInVariant} className="text-gray-400 text-base sm:text-lg mb-8 sm:mb-10 max-w-md font-light leading-relaxed">
              Have a question about our plans, experiencing an issue, or need a custom integration? Drop us a message and our team will get back to you instantly.
            </motion.p>
            
            <div className="flex flex-col gap-5 sm:gap-6 w-full max-w-sm lg:max-w-none text-left">
              {[
                { icon: <Mail size={18} className="sm:w-5 sm:h-5" />, label: "Email Us", value: "automatictradex@gmail.com" },
                { icon: <Send size={18} className="sm:w-5 sm:h-5" />, label: "Telegram Channel", value: "t.me/TradeX2024", link: "https://t.me/TradeX2024" },
              ].map((item, idx) => (
                <motion.div key={idx} variants={fadeInVariant} className="flex items-center gap-4 group cursor-default">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shrink-0 group-hover:bg-[#1E90FF]/10 group-hover:border-[#1E90FF]/30 transition-colors">
                    <span className="text-[#1E90FF]">{item.icon}</span>
                  </div>
                  <div>
                    <p className="text-gray-500 text-[10px] sm:text-xs uppercase tracking-wider mb-0.5">{item.label}</p>
                    {item.link ? (
                      <a href={item.link} target="_blank" rel="noopener noreferrer" className="text-white font-medium text-sm hover:text-[#1E90FF] transition-colors">{item.value}</a>
                    ) : (
                      <p className="text-white font-medium text-sm">{item.value}</p>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Column - The Form */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={formVariant}
            className="relative group h-full mt-6 lg:mt-0 w-full max-w-lg mx-auto lg:max-w-none"
          >
            
            <div className="relative h-full rounded-[1.5rem] sm:rounded-[2rem] p-[1px] overflow-hidden">
              
              <div className="absolute inset-[-100%] opacity-0 group-hover:opacity-100 transition-opacity duration-700 animate-[spin_4s_linear_infinite] bg-[conic-gradient(from_0deg_at_50%_50%,transparent_60%,#1E90FF_100%)]"></div>
              
              <div className="absolute inset-0 rounded-[1.5rem] sm:rounded-[2rem] border border-white/5 group-hover:border-transparent transition-colors duration-500 z-10 pointer-events-none"></div>

              <div className="relative h-full bg-[#0a0a0a] p-6 sm:p-8 md:p-10 rounded-[calc(1.5rem-1px)] sm:rounded-[calc(2rem-1px)] flex flex-col justify-center z-20 min-h-[450px] sm:min-h-[500px]">
                
                <div className="absolute inset-0 overflow-hidden rounded-[calc(1.5rem-1px)] sm:rounded-[calc(2rem-1px)] pointer-events-none">
                  <div className="absolute -top-12 -right-12 w-32 h-32 bg-[#1E90FF]/20 blur-[40px] rounded-full"></div>
                </div>

                <div className="relative z-10 w-full text-left">
                  {submitSuccess ? (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="flex flex-col items-center justify-center text-center space-y-4 py-10"
                    >
                      <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-green-500/20 flex items-center justify-center border border-green-500/30 mb-2 sm:mb-4">
                        <CheckCircle2 size={32} className="text-green-400 sm:w-10 sm:h-10" />
                      </div>
                      <h3 className="text-xl sm:text-2xl font-bold text-white">Message Sent!</h3>
                      <p className="text-gray-400 text-xs sm:text-sm max-w-sm">
                        Thank you for reaching out. Our support team will get back to you at {formData.email} as soon as possible.
                      </p>
                    </motion.div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5" noValidate>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
                        {/* Name Input */}
                        <div>
                          <label className="block text-xs font-medium text-gray-400 mb-1.5 sm:mb-2 ml-1">Full Name <span className="text-red-400">*</span></label>
                          <div className="relative group/input">
                            <div className="absolute inset-y-0 left-0 pl-3.5 sm:pl-4 flex items-center pointer-events-none text-gray-500 group-focus-within/input:text-[#1E90FF] transition-colors">
                              <User size={16} />
                            </div>
                            <input 
                              type="text" 
                              name="name"
                              value={formData.name}
                              onChange={handleChange}
                              placeholder="John Doe" 
                              disabled={isSubmitting}
                              className={`w-full bg-[#111] border rounded-xl pl-10 sm:pl-11 pr-4 py-3 sm:py-3.5 text-white text-sm focus:outline-none transition-all placeholder-gray-600 disabled:opacity-50 
                              ${errors.name ? 'border-red-500/50 focus:border-red-500' : 'border-white/10 focus:border-[#1E90FF]/50 focus:ring-1 focus:ring-[#1E90FF]/50'}`}
                            />
                          </div>
                          {errors.name && <p className="text-[10px] sm:text-[11px] text-red-400 pl-1 mt-1 flex items-center gap-1"><AlertCircle size={10} className="sm:w-3 sm:h-3" />{errors.name}</p>}
                        </div>

                        {/* Phone Input */}
                        <div>
                          <label className="block text-xs font-medium text-gray-400 mb-1.5 sm:mb-2 ml-1">Phone Number</label>
                          <div className="relative group/input">
                            <div className="absolute inset-y-0 left-0 pl-3.5 sm:pl-4 flex items-center pointer-events-none text-gray-500 group-focus-within/input:text-[#1E90FF] transition-colors">
                              <Phone size={16} />
                            </div>
                            <input 
                              type="tel" 
                              name="phone"
                              value={formData.phone}
                              onChange={(e) => {
                                const val = e.target.value.replace(/[^\d+]/g, '');
                                setFormData(prev => ({ ...prev, phone: val }));
                              }}
                              placeholder="+1 (555) 000-0000" 
                              disabled={isSubmitting}
                              className="w-full bg-[#111] border border-white/10 rounded-xl pl-10 sm:pl-11 pr-4 py-3 sm:py-3.5 text-white text-sm focus:outline-none focus:ring-1 focus:ring-[#1E90FF]/50 focus:border-[#1E90FF]/50 transition-all placeholder-gray-600 disabled:opacity-50"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Email Input */}
                      <div>
                        <label className="block text-xs font-medium text-gray-400 mb-1.5 sm:mb-2 ml-1">Email Address <span className="text-red-400">*</span></label>
                        <div className="relative group/input">
                          <div className="absolute inset-y-0 left-0 pl-3.5 sm:pl-4 flex items-center pointer-events-none text-gray-500 group-focus-within/input:text-[#1E90FF] transition-colors">
                            <Mail size={16} />
                          </div>
                          <input 
                            type="email" 
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="john@company.com" 
                            disabled={isSubmitting}
                            className={`w-full bg-[#111] border rounded-xl pl-10 sm:pl-11 pr-4 py-3 sm:py-3.5 text-white text-sm focus:outline-none transition-all placeholder-gray-600 disabled:opacity-50 
                            ${errors.email ? 'border-red-500/50 focus:border-red-500' : 'border-white/10 focus:border-[#1E90FF]/50 focus:ring-1 focus:ring-[#1E90FF]/50'}`}
                          />
                        </div>
                        {errors.email && <p className="text-[10px] sm:text-[11px] text-red-400 pl-1 mt-1 flex items-center gap-1"><AlertCircle size={10} className="sm:w-3 sm:h-3" />{errors.email}</p>}
                      </div>

                      {/* Reason Select */}
                      <div>
                        <label className="block text-xs font-medium text-gray-400 mb-1.5 sm:mb-2 ml-1">Reason for contact <span className="text-red-400">*</span></label>
                        <div className="relative group/input">
                          <div className="absolute inset-y-0 left-0 pl-3.5 sm:pl-4 flex items-center pointer-events-none text-gray-500 group-focus-within/input:text-[#1E90FF] transition-colors">
                            <HelpCircle size={16} />
                          </div>
                          <select 
                            name="reason"
                            value={formData.reason}
                            onChange={handleChange}
                            disabled={isSubmitting}
                            className={`w-full bg-[#111] border rounded-xl pl-10 sm:pl-11 pr-4 py-3 sm:py-3.5 ${formData.reason ? 'text-white' : 'text-gray-500'} text-sm focus:outline-none transition-all appearance-none cursor-pointer disabled:opacity-50 
                            ${errors.reason ? 'border-red-500/50 focus:border-red-500' : 'border-white/10 focus:border-[#1E90FF]/50 focus:ring-1 focus:ring-[#1E90FF]/50'}`}
                          >
                            <option value="" disabled>Select an issue...</option>
                            <option value="Technical Support">Technical Support</option>
                            <option value="Billing & Subscriptions">Billing & Subscriptions</option>
                            <option value="Sales Inquiry">Sales Inquiry</option>
                            <option value="Other">Other</option>
                          </select>
                        </div>
                        {errors.reason && <p className="text-[10px] sm:text-[11px] text-red-400 pl-1 mt-1 flex items-center gap-1"><AlertCircle size={10} className="sm:w-3 sm:h-3" />{errors.reason}</p>}
                      </div>

                      {/* Message Textarea */}
                      <div>
                        <label className="block text-xs font-medium text-gray-400 mb-1.5 sm:mb-2 ml-1">Message <span className="text-red-400">*</span></label>
                        <div className="relative group/input">
                          <div className="absolute top-3.5 sm:top-4 left-0 pl-3.5 sm:pl-4 pointer-events-none text-gray-500 group-focus-within/input:text-[#1E90FF] transition-colors">
                            <MessageSquare size={16} />
                          </div>
                          <textarea 
                            rows="4" 
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            placeholder="Tell us more about your issue..." 
                            disabled={isSubmitting}
                            className={`w-full bg-[#111] border rounded-xl pl-10 sm:pl-11 pr-4 py-3 sm:py-3.5 text-white text-sm focus:outline-none transition-all placeholder-gray-600 resize-none disabled:opacity-50 
                            ${errors.message ? 'border-red-500/50 focus:border-red-500' : 'border-white/10 focus:border-[#1E90FF]/50 focus:ring-1 focus:ring-[#1E90FF]/50'}`}
                          ></textarea>
                        </div>
                        {errors.message && <p className="text-[10px] sm:text-[11px] text-red-400 pl-1 mt-1 flex items-center gap-1"><AlertCircle size={10} className="sm:w-3 sm:h-3" />{errors.message}</p>}
                      </div>

                      <button 
                        type="submit" 
                        disabled={isSubmitting}
                        className="w-full py-3.5 sm:py-4 mt-2 rounded-xl bg-gradient-to-r from-[#1E90FF] to-[#60A5FA] text-white font-bold hover:shadow-[0_0_25px_rgba(30,144,255,0.4)] hover:scale-[1.02] transition-all duration-300 flex items-center justify-center gap-2 group disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100 text-sm sm:text-base"
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 size={18} className="animate-spin" />
                            <span>Sending...</span>
                          </>
                        ) : (
                          <>
                            <span>Send Message</span>
                            <Send size={18} className="group-hover:translate-x-1 transition-transform group-hover:-translate-y-1" />
                          </>
                        )}
                      </button>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
          
        </div>
      </div>
    </section>
  );
}