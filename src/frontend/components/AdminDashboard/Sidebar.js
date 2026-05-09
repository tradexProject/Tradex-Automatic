import React from 'react';
import { LayoutDashboard, Users, KeySquare, LogOut, UserCog, ShieldCheck } from 'lucide-react';

function SidebarItem({ icon, label, isActive, badge, onClick }) {
  return (
    <button 
      onClick={onClick}
      className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-300 ${
        isActive 
        ? 'bg-gradient-to-r from-[#1E90FF]/20 to-transparent border-l-2 border-[#1E90FF] text-white' 
        : 'text-gray-400 hover:bg-white/5 hover:text-white'
      }`}
    >
      <div className="flex items-center gap-3">
        <span className={isActive ? 'text-[#1E90FF]' : ''}>{icon}</span>
        <span className="text-sm font-bold tracking-wider">{label}</span>
      </div>
      {badge > 0 && (
        <span className=" text-white text-[10px] font-black px-2 py-0.5 rounded-full shadow-[0_0_10px_rgba(30,144,255,0.5)]">
          {badge}
        </span>
      )}
    </button>
  );
}

export default function Sidebar({ activeTab, setActiveTab, pendingCount, onLogout }) {
  return (
    <aside className="w-72  backdrop-blur-3xl border-r border-white/5 relative z-10 flex flex-col justify-between hidden md:flex">
      <div>
        <div className="p-8 flex items-center border-b border-white/5">
          <div>
  <div className="relative flex items-center justify-center w-10 h-10 transition-transform duration-500 group-hover:scale-105">
      
      <div className="absolute inset-0 from-indigo-500 to-cyan-400 rounded-xl opacity-70 blur-md group-hover:opacity-100  duration-500"></div>
      
      <div className="absolute inset-0  from-indigo-500 to-cyan-400 rounded-xl shadow-inner "></div>
      
      <img 
        src="/logo.png"  
        alt="Tradex Logo" 
        className="w-7 h-7 object-contain relative z-10" 
      />
    </div>          </div>
        <div className="flex-1 flex justify-start">
  <div onClick={() => scrollTo('home')} className="flex items-center cursor-pointer group">
  

    <span className="text-white/90 font-semibold tracking-wide text-lg group-hover:text-white transition-colors duration-300">
  Trade
  <span className="bg-gradient-to-tr from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
    X
  </span>
</span>
  </div>
</div>
        </div>

        <nav className="p-4 space-y-2 mt-4">
          <SidebarItem icon={<LayoutDashboard size={18} />} label="Overview" isActive={activeTab === 'overview'} onClick={() => setActiveTab('overview')} />
          <SidebarItem icon={<Users size={18} />} label="Requests" isActive={activeTab === 'requests'} badge={pendingCount} onClick={() => setActiveTab('requests')} />
          <SidebarItem icon={<KeySquare size={18} />} label="Inventory" isActive={activeTab === 'inventory'} onClick={() => setActiveTab('inventory')} />
            <SidebarItem icon={<UserCog size={18} />} label="Profile" isActive={activeTab === 'profile'} onClick={() => setActiveTab('profile')} />

        </nav>
        
      </div>

      <div className="p-4 border-t border-white/5">
        <button 
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:bg-red-500/10 hover:border-red-500/20 border border-transparent transition-all text-sm font-bold tracking-wider"
        >
          <LogOut size={18} />
          LOGOUT
        </button>
      </div>
    </aside>
  );
}
