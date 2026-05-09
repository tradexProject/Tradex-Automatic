import React, { useState, useMemo, useRef } from 'react';
import { KeySquare, Plus, X, Loader2, CheckCircle2, Lock, Search, Calendar, Filter, Upload } from 'lucide-react';

const AVAILABLE_PLANS = [
  'Starter Plan',
  'Professional Plan',
  'Ultimate Plan'
];

export default function InventoryTab({ codes, onAddCodes }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false); 
  const [bulkCodes, setBulkCodes] = useState(''); 
  const fileInputRef = useRef(null); 
  
  const [searchQuery, setSearchQuery] = useState('');
  const [planFilter, setPlanFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredCodes = useMemo(() => {
    return (codes || [])
      .filter(item => {
        const matchesSearch = 
          item.code.toLowerCase().includes(searchQuery.toLowerCase()) || 
          (item.usedBy && item.usedBy.toLowerCase().includes(searchQuery.toLowerCase()));
        
        const matchesPlan = planFilter === 'all' || item.planName === planFilter;
        const matchesStatus = statusFilter === 'all' || 
          (statusFilter === 'used' ? item.isUsed : !item.isUsed);

        return matchesSearch && matchesPlan && matchesStatus;
      })
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }, [codes, searchQuery, planFilter, statusFilter]);

  const stats = useMemo(() => ({
    total: codes?.length || 0,
    available: codes?.filter(c => !c.isUsed).length || 0,
    used: codes?.filter(c => c.isUsed).length || 0
  }), [codes]);

  const parsedCodesCount = useMemo(() => {
    return bulkCodes.split(/[,\n]+/).filter(c => c.trim() !== '').length;
  }, [bulkCodes]);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target.result;
      setBulkCodes(prev => prev.trim() ? prev + '\n' + content : content);
    };
    reader.readAsText(file);
    
    event.target.value = null; 
  };

  const handleSubmit = async () => {
    const finalCodes = bulkCodes
      .split(/[,\n]+/)
      .map(c => c.trim())
      .filter(c => c !== '');

    if (finalCodes.length === 0 || !selectedPlan) return;
    
    setIsSubmitting(true);
    try {
      if (onAddCodes) await onAddCodes(finalCodes, selectedPlan);
      setBulkCodes('');
      setSelectedPlan('');
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 relative w-full p-1">
      
      {/* Header & Quick Stats */}
      <div className="flex flex-col lg:flex-row justify-between lg:items-center gap-6">
        <div>
          <h3 className="text-xl font-bold mb-3 text-white">Inventory Assets</h3>
          <div className="flex flex-wrap gap-2 md:gap-3">
            <StatPill label="Total" value={stats.total} color="bg-white/5 text-gray-400" />
            <StatPill label="Available" value={stats.available} color="bg-green-500/10 text-green-400" />
            <StatPill label="Used" value={stats.used} color="bg-[#1E90FF]/10 text-[#1E90FF]" />
          </div>
        </div>
        <button onClick={() => setIsModalOpen(true)} className="flex items-center justify-center gap-2 px-6 py-3 bg-[#1E90FF] text-white rounded-2xl font-bold hover:bg-[#1E90FF]/90 transition-all shadow-lg shadow-[#1E90FF]/20 w-full lg:w-auto">
          <Plus size={20} /> Add New Assets
        </button>
      </div>

      {/* Filters Toolbar */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4 bg-white/[0.02] p-4 rounded-3xl border border-white/5">
        <div className="relative group sm:col-span-2 lg:col-span-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-[#1E90FF] transition-colors" size={16} />
          <input 
            type="text" 
            placeholder="Search Licenses or User..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-black border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#1E90FF]/50 transition-all placeholder-gray-600"
          />
        </div>

        <div className="relative">
          <select 
            value={planFilter} 
            onChange={(e) => setPlanFilter(e.target.value)}
            className="w-full bg-black border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#1E90FF]/50 transition-all appearance-none cursor-pointer"
          >
            <option value="all">All Plan Categories</option>
            {AVAILABLE_PLANS.map(p => <option key={p} value={p}>{p}</option>)}
          </select>
          <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
            <Filter size={14} />
          </div>
        </div>

        <div className="relative">
          <select 
            value={statusFilter} 
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full bg-black border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#1E90FF]/50 transition-all appearance-none cursor-pointer"
          >
            <option value="all">Any Status</option>
            <option value="available">Available</option>
            <option value="used">Used</option>
          </select>
          <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
            <Lock size={14} />
          </div>
        </div>
      </div>

      {/* Fully Responsive Inventory Table */}
      <div className="w-full bg-transparent md:bg-white/[0.01] md:border border-white/5 rounded-3xl md:overflow-hidden md:shadow-2xl">
        <div className="w-full overflow-x-hidden">
          <table className="w-full text-left border-collapse">
            <thead className="hidden md:table-header-group">
              <tr className="bg-white/[0.03] border-b border-white/5 text-[10px] uppercase tracking-widest text-gray-500 font-black">
                <th className="p-4 md:p-5 whitespace-nowrap">Activation Asset</th>
                <th className="p-4 md:p-5 whitespace-nowrap">Plan</th>
                <th className="p-4 md:p-5 whitespace-nowrap">Status</th>
                <th className="p-4 md:p-5 whitespace-nowrap">Assigned User</th>
              </tr>
            </thead>
            <tbody className="block md:table-row-group text-sm space-y-4 md:space-y-0">
              {filteredCodes.map((item) => (
                <tr key={item.id} className="block md:table-row bg-white/[0.04] md:bg-transparent border border-white/10 md:border-white/5 md:border-t-0 md:border-b hover:bg-white/[0.01] transition-colors group rounded-2xl md:rounded-none overflow-hidden shadow-lg md:shadow-none">
                  
                  <td className="flex md:table-cell justify-between items-center p-4 md:p-5 border-b border-white/5 md:border-0">
                    <span className="md:hidden text-[10px] font-black uppercase tracking-widest text-gray-500">Asset</span>
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg shrink-0 ${item.isUsed ? 'bg-gray-500/10 text-gray-500' : 'bg-green-500/10 text-green-400'}`}>
                        {item.isUsed ? <Lock size={14} /> : <KeySquare size={14} />}
                      </div>
                      <span className={`font-mono font-bold tracking-widest ${item.isUsed ? 'text-gray-500' : 'text-white'} break-all`}>{item.code}</span>
                    </div>
                  </td>

                  <td className="flex md:table-cell justify-between items-center p-4 md:p-5 border-b border-white/5 md:border-0 text-gray-400 font-medium md:whitespace-nowrap">
                    <span className="md:hidden text-[10px] font-black uppercase tracking-widest text-gray-500">Plan</span>
                    <span className="text-right md:text-left">{item.planName}</span>
                  </td>

                  <td className="flex md:table-cell justify-between items-center p-4 md:p-5 border-b border-white/5 md:border-0">
                    <span className="md:hidden text-[10px] font-black uppercase tracking-widest text-gray-500">Status</span>
                    <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase border ${item.isUsed ? 'bg-gray-500/5 border-gray-500/20 text-gray-500' : 'bg-green-500/5 border-green-500/20 text-green-400'}`}>
                      {item.isUsed ? 'Used' : 'Available'}
                    </span>
                  </td>

                  <td className="flex md:table-cell justify-between items-center p-4 md:p-5">
                    <span className="md:hidden text-[10px] font-black uppercase tracking-widest text-gray-500">Assigned User</span>
                    {item.isUsed ? (
                      <span className="text-xs font-mono text-[#1E90FF] bg-[#1E90FF]/5 px-2 py-1 rounded-md border border-[#1E90FF]/10 truncate max-w-[150px] md:max-w-xs">{item.usedBy}</span>
                    ) : (
                      <span className="text-gray-600 text-xs italic opacity-40">Unassigned</span>
                    )}
                  </td>
                </tr>
              ))}
              
              {filteredCodes.length === 0 && (
                 <tr className="block md:table-row">
                    <td colSpan="5" className="p-8 text-center text-gray-500 text-sm italic block md:table-cell border border-white/10 md:border-0 rounded-2xl md:rounded-none bg-white/[0.04] md:bg-transparent">
                      No activation assets found in inventory.
                    </td>
                 </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Dynamic Import Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/95 backdrop-blur-md p-4 animate-in fade-in duration-300">
          <div className="bg-[#0a0a0a] border border-white/10 p-6 md:p-8 rounded-[2rem] w-full max-w-lg shadow-2xl relative max-h-[90vh] flex flex-col">
            <button onClick={() => setIsModalOpen(false)} className="absolute top-5 right-5 text-gray-500 hover:text-white transition-colors"><X size={24} /></button>
            
            <div className="mb-6 mt-2">
              <h3 className="text-xl md:text-2xl font-bold text-white">Add Bulk Assets</h3>
              <p className="text-xs text-gray-500 mt-1">Assign activation licenses manually or upload a .txt file.</p>
            </div>
            
            <div className="space-y-5 overflow-y-auto pr-2 custom-scrollbar">
              {/* Plan Selection */}
              <div>
                <label className="text-[10px] font-black text-[#1E90FF] uppercase tracking-widest block mb-2 px-1">Target Plan</label>
                <select value={selectedPlan} onChange={(e) => setSelectedPlan(e.target.value)} className="w-full bg-black border border-white/10 rounded-2xl p-3.5 text-sm text-white focus:border-[#1E90FF] outline-none transition-all cursor-pointer">
                  <option value="" disabled>-- Choose Plan Category --</option>
                  {AVAILABLE_PLANS.map(p => <option key={p} value={p} className="bg-black text-white">{p}</option>)}
                </select>
              </div>

              {/* Bulk Input & File Upload */}
              <div className="space-y-3">
                <div className="flex justify-between items-center px-1">
                  <label className="text-[10px] font-black text-[#1E90FF] uppercase tracking-widest block">Activation Licenses</label>
                  
                  <div className="flex items-center gap-3">
                    <button 
                      onClick={() => fileInputRef.current.click()}
                      className="text-[10px] font-bold text-white bg-white/5 border border-white/10 hover:bg-white/10 px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all"
                    >
                      <Upload size={12} /> Upload .txt
                    </button>
                    <input 
                      type="file" 
                      accept=".txt" 
                      ref={fileInputRef} 
                      onChange={handleFileUpload} 
                      className="hidden" 
                    />
                    
                    <span className="text-[10px] font-bold text-gray-500 bg-black px-2 py-1 rounded-md border border-white/5">{parsedCodesCount} Validated</span>
                  </div>
                </div>
                
                <textarea 
                  value={bulkCodes}
                  onChange={(e) => setBulkCodes(e.target.value)}
                  placeholder="Paste codes here or upload a .txt file..."
                  rows={6}
                  className="w-full bg-white/[0.03] border border-white/10 rounded-xl p-4 text-sm text-white font-mono focus:border-[#1E90FF] focus:bg-white/[0.05] outline-none transition-all resize-none"
                />
              </div>
            </div>

            {/* Actions */}
            <div className="mt-6 pt-5 border-t border-white/5">
              <button 
                onClick={handleSubmit} 
                disabled={!selectedPlan || parsedCodesCount === 0 || isSubmitting}
                className="w-full py-3.5 bg-[#1E90FF] text-white rounded-xl font-black uppercase tracking-widest disabled:opacity-20 transition-all flex items-center justify-center gap-2 shadow-lg shadow-[#1E90FF]/20"
              >
                {isSubmitting ? <Loader2 size={18} className="animate-spin" /> : <CheckCircle2 size={18} />}
                Add {parsedCodesCount > 0 ? parsedCodesCount : ''} to Inventory
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function StatPill({ label, value, color }) {
  return (
    <div className={`${color} px-3 py-1 rounded-xl flex items-center gap-2 border border-white/10`}>
      <span className="text-[9px] md:text-[10px] font-black uppercase tracking-tighter">{label}:</span>
      <span className="text-xs md:text-sm font-black">{value}</span>
    </div>
  );
}
