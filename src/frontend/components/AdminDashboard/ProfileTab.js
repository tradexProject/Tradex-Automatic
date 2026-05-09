import React, { useState } from 'react';
import { Lock, Save, Loader2, KeyRound, ShieldAlert } from 'lucide-react';

export default function ProfileTab({ showToast }) {
  const [passwords, setPasswords] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setPasswords({ ...passwords, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (passwords.newPassword !== passwords.confirmPassword) {
      showToast("New passwords do not match!", 'error');
      return;
    }
    
    if (passwords.newPassword.length < 6) {
      showToast("Password must be at least 6 characters.", 'error');
      return;
    }

    setIsSubmitting(true);
    const token = localStorage.getItem('admin_token');

    try {
      const res = await fetch('/api/auth/change-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          currentPassword: passwords.currentPassword,
          newPassword: passwords.newPassword
        })
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to change password');
      }

      showToast("Password updated successfully!", 'success');
      setPasswords({ currentPassword: '', newPassword: '', confirmPassword: '' });
    } catch (error) {
      showToast(error.message, 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-2xl">
      <div>
        <h3 className="text-xl font-bold mb-2 text-white">Administrator Profile</h3>
        <p className="text-sm text-gray-400">Update your account credentials to keep the system secure.</p>
      </div>

      <div className="bg-white/[0.02] border border-white/5 p-6 md:p-8 rounded-3xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none">
          <ShieldAlert size={120} />
        </div>

        <form onSubmit={handleSubmit} className="space-y-5 relative z-10">
          <div>
            <label className="text-[10px] font-black text-[#1E90FF] uppercase tracking-widest block mb-2 px-1">
              Current Password
            </label>
            <div className="relative group">
              <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-[#1E90FF] transition-colors" size={16} />
              <input 
                type="password"
                name="currentPassword"
                value={passwords.currentPassword}
                onChange={handleChange}
                required
                placeholder="Enter current password"
                className="w-full bg-black border border-white/10 rounded-xl pl-10 pr-4 py-3 text-sm text-white focus:outline-none focus:border-[#1E90FF]/50 transition-all placeholder-gray-600"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="text-[10px] font-black text-[#1E90FF] uppercase tracking-widest block mb-2 px-1">
                New Password
              </label>
              <div className="relative group">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-[#1E90FF] transition-colors" size={16} />
                <input 
                  type="password"
                  name="newPassword"
                  value={passwords.newPassword}
                  onChange={handleChange}
                  required
                  placeholder="Enter new password"
                  className="w-full bg-black border border-white/10 rounded-xl pl-10 pr-4 py-3 text-sm text-white focus:outline-none focus:border-[#1E90FF]/50 transition-all placeholder-gray-600"
                />
              </div>
            </div>

            <div>
              <label className="text-[10px] font-black text-[#1E90FF] uppercase tracking-widest block mb-2 px-1">
                Confirm New Password
              </label>
              <div className="relative group">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-[#1E90FF] transition-colors" size={16} />
                <input 
                  type="password"
                  name="confirmPassword"
                  value={passwords.confirmPassword}
                  onChange={handleChange}
                  required
                  placeholder="Confirm new password"
                  className="w-full bg-black border border-white/10 rounded-xl pl-10 pr-4 py-3 text-sm text-white focus:outline-none focus:border-[#1E90FF]/50 transition-all placeholder-gray-600"
                />
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-white/5 mt-6">
            <button 
              type="submit"
              disabled={isSubmitting}
              className="w-full md:w-auto px-8 py-3.5 bg-[#1E90FF] text-white rounded-xl font-black uppercase tracking-widest disabled:opacity-50 transition-all flex items-center justify-center gap-2 shadow-lg shadow-[#1E90FF]/20 hover:bg-[#1E90FF]/90"
            >
              {isSubmitting ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
              Update Password
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}