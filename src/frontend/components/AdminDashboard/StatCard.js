import React from 'react';

export default function StatCard({ title, value, icon }) {
  return (
    <div className="bg-white/[0.02] backdrop-blur-xl border border-white/10 rounded-3xl p-6 relative overflow-hidden group hover:border-white/20 transition-all duration-500">
      <div className="absolute top-0 right-0 p-6 opacity-20 group-hover:scale-110 transition-transform duration-500">
        {icon}
      </div>
      <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">{title}</p>
      <h3 className="text-4xl font-black text-white">{value}</h3>
    </div>
  );
}