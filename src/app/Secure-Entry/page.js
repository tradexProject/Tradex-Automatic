'use client';
import React, { useState } from 'react';
import { Activity, Mail, Lock, ArrowRight, ShieldCheck, Loader2, AlertCircle } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg('');

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setErrorMsg(data.error || 'Invalid credentials. Please try again.');
        setIsLoading(false);
        return;
      }

      localStorage.setItem('admin_token', data.token);
      router.push('/X-Panel-Secure'); 

    } catch (error) {
      console.error('Login Error:', error);
      setErrorMsg('Server connection failed. Please try again later.');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#020202] text-white font-sans flex items-center justify-center relative overflow-hidden p-6 selection:bg-[#1E90FF] selection:text-white">
      
      <div className="fixed inset-0 pointer-events-none z-0 flex items-center justify-center">
        <div className="absolute w-[80vw] h-[80vw] md:w-[40vw] md:h-[40vw] bg-[#1E90FF]/10 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#1E90FF]/5 blur-[100px]"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-700/10 blur-[120px]"></div>
      </div>

      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px] pointer-events-none opacity-20 [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_70%)]"></div>

      <div className="w-full max-w-md relative z-10 perspective-[1000px]">
        <div className="bg-white/[0.02] backdrop-blur-3xl border border-white/10 p-8 sm:p-10 rounded-[2.5rem] shadow-[0_30px_80px_rgba(0,0,0,0.8),inset_0_0_20px_rgba(30,144,255,0.05)] transition-transform duration-500 hover:border-white/20 hover:shadow-[0_40px_100px_rgba(0,0,0,0.9),inset_0_0_30px_rgba(30,144,255,0.1)] group/card">
          
          <div className="flex flex-col items-center mb-8">
            <Link href="/" className="flex items-center gap-3 mb-6 group cursor-pointer">
              <div className="relative w-10 h-10 flex items-center justify-center transform-style-3d group-hover:rotate-y-180 transition-transform duration-700">
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-700 to-[#1E90FF] rounded-xl transform rotate-45 shadow-[0_0_20px_rgba(30,144,255,0.5)] group-hover:shadow-[0_0_40px_rgba(30,144,255,0.8)] transition-all duration-500"></div>
                <Activity size={22} className="text-white relative z-10" />
              </div>
            </Link>
            
            <h1 className="text-3xl font-black tracking-tighter uppercase mb-2">
              System <span className="text-[#1E90FF] drop-shadow-[0_0_15px_rgba(30,144,255,0.3)]">Access</span>
            </h1>
            <div className="flex items-center gap-2 text-[#1E90FF]/80 bg-[#1E90FF]/10 px-3 py-1 rounded-full border border-[#1E90FF]/20">
              <ShieldCheck size={12} />
              <span className="text-[10px] font-bold uppercase tracking-widest">Encrypted Portal</span>
            </div>
          </div>

          {errorMsg && (
            <div className="mb-6 flex items-center gap-3 bg-red-500/10 border border-red-500/30 p-4 rounded-xl text-red-400 text-xs font-medium animate-pulse">
              <AlertCircle size={16} className="shrink-0" />
              <p>{errorMsg}</p>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest pl-2">Email Address</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail size={18} className="text-gray-500 group-focus-within:text-[#1E90FF] transition-colors" />
                </div>
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@tradex.com" 
                  disabled={isLoading}
                  className="w-full bg-black/40 border border-white/5 rounded-2xl pl-12 pr-6 py-4 text-white font-medium focus:outline-none focus:bg-white/[0.03] focus:border-[#1E90FF]/50 transition-all cursor-text placeholder-gray-600 shadow-[inset_0_0_10px_rgba(0,0,0,0.5)] disabled:opacity-50"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center pr-2">
                <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest pl-2">Password</label>
              </div>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock size={18} className="text-gray-500 group-focus-within:text-[#1E90FF] transition-colors" />
                </div>
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••" 
                  disabled={isLoading}
                  className="w-full bg-black/40 border border-white/5 rounded-2xl pl-12 pr-6 py-4 text-white font-medium focus:outline-none focus:bg-white/[0.03] focus:border-[#1E90FF]/50 transition-all cursor-text placeholder-gray-600 shadow-[inset_0_0_10px_rgba(0,0,0,0.5)] tracking-widest disabled:opacity-50"
                  required
                />
              </div>
            </div>

            <button 
              type="submit" 
              disabled={isLoading}
              className="w-full relative overflow-hidden rounded-2xl p-[1px] mt-8 group/btn shadow-[0_10px_30px_rgba(30,144,255,0.2)] hover:shadow-[0_15px_40px_rgba(30,144,255,0.4)] transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-[#1E90FF] via-blue-400 to-[#1E90FF] opacity-70 group-hover/btn:opacity-100 transition-opacity duration-500 bg-[length:200%_200%] animate-[gradient-xy_3s_linear_infinite]"></span>
              
              <div className="relative bg-[#050505] px-8 py-4 rounded-2xl flex items-center justify-center gap-3 transition-all duration-300 group-hover/btn:bg-transparent">
                {isLoading ? (
                  <>
                    <Loader2 size={18} className="text-[#1E90FF] animate-spin" />
                    <span className="text-white font-black text-sm uppercase tracking-widest">Authenticating...</span>
                  </>
                ) : (
                  <>
                    <span className="text-white font-black text-sm uppercase tracking-widest group-hover/btn:text-white transition-colors">Authenticate</span>
                    <ArrowRight size={18} className="text-[#1E90FF] group-hover/btn:text-white transition-colors group-hover/btn:translate-x-1 duration-300" />
                  </>
                )}
              </div>
            </button>
          </form>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes gradient-xy {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .transform-style-3d { transform-style: preserve-3d; }
        
        input:-webkit-autofill,
        input:-webkit-autofill:hover, 
        input:-webkit-autofill:focus, 
        input:-webkit-autofill:active{
            -webkit-box-shadow: 0 0 0 30px #0a0a0a inset !important;
            -webkit-text-fill-color: white !important;
            transition: background-color 5000s ease-in-out 0s;
        }
      `}} />
    </div>
  );
}