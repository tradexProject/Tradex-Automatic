import React from 'react';
import { Clock, CheckCircle2, KeySquare, XCircle } from 'lucide-react';
import StatCard from './StatCard';

export default function OverviewTab({ stats, requests, setActiveTab }) {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6">
        <StatCard title="Pending Requests" value={stats.pending} icon={<Clock size={24} className="text-orange-400" />} />
        <StatCard title="Active Subscriptions" value={stats.active} icon={<CheckCircle2 size={24} className="text-green-400" />} />
        <StatCard title="Available Licenses" value={stats.availableCodes} icon={<KeySquare size={24} className="text-[#1E90FF]" />} />
      </div>

      {/* Quick Actions Panel */}
      <div className="bg-white/[0.02] backdrop-blur-xl border border-white/10 rounded-3xl p-4 md:p-6 shadow-2xl overflow-hidden">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-sm font-black uppercase text-gray-400 tracking-widest">Recent Activity</h3>
          <button onClick={() => setActiveTab('requests')} className="text-xs text-[#1E90FF] hover:text-white transition-colors whitespace-nowrap">View All</button>
        </div>
        
        <div className="space-y-3">
          {requests.slice(0, 5).map((req) => (
            <div key={req.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border border-white/5 rounded-2xl hover:border-white/10 transition-colors gap-3">          
              <div className="flex items-center gap-3 md:gap-4 min-w-0">
                <div className={`shrink-0 w-10 h-10 rounded-full flex items-center justify-center border ${req.status === 'pending' ? 'bg-orange-500/10 border-orange-500/20 text-orange-400' : req.status === 'approved' ? 'bg-green-500/10 border-green-500/20 text-green-400' : 'bg-red-500/10 border-red-500/20 text-red-400'}`}>
                  {req.status === 'pending' ? <Clock size={16} /> : req.status === 'approved' ? <CheckCircle2 size={16} /> : <XCircle size={16} />}
                </div>               
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold truncate text-white">{req.email}</p>
                  <p className="text-xs text-gray-400 font-mono truncate">TXN: {req.transactionId}</p>
                </div>
              </div>
              <div className="flex justify-end sm:block mt-1 sm:mt-0">
                <span className={`whitespace-nowrap px-3 py-1 text-[10px] font-bold uppercase tracking-widest rounded-full border ${req.status === 'pending' ? 'bg-orange-500/10 text-orange-400 border-orange-500/20' : req.status === 'approved' ? 'bg-green-500/10 text-green-400 border-green-500/20' : 'bg-red-500/10 text-red-400 border-red-500/20'}`}>
                  {req.status}
                </span>
              </div>
            </div>
          ))}
          {requests.length === 0 && <p className="text-gray-500 text-sm text-center py-4">No recent activity found.</p>}
        </div>
      </div>
    </div>
  );
}
