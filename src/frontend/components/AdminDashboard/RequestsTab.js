import React, { useState, useMemo } from 'react';
import { Loader2, CheckCircle2, XCircle, Eye, Clock, X, Phone, Mail, Hash, Calendar, Search, Filter, ArrowUpDown, Wallet } from 'lucide-react';

export default function RequestsTab({ requests, processRequest, processingId, handleOpenReject }) {
  const [detailsModalOpen, setDetailsModalOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  
  const [activeTab, setActiveTab] = useState('pending'); 
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOrder, setSortOrder] = useState('newest'); 

  const stats = useMemo(() => ({
    total: requests.length,
    pending: requests.filter(r => r.status === 'pending').length,
    approved: requests.filter(r => r.status === 'approved').length,
    rejected: requests.filter(r => r.status === 'rejected').length,
  }), [requests]);

  const filteredRequests = useMemo(() => {
    return requests
      .filter(req => {
        const matchesTab = activeTab === 'pending' ? req.status === 'pending' : req.status !== 'pending';
        const searchLower = searchQuery.toLowerCase();
        const matchesSearch = 
          req.email.toLowerCase().includes(searchLower) || 
          req.transactionId.toLowerCase().includes(searchLower);
        return matchesTab && matchesSearch;
      })
      .sort((a, b) => {
        const dateA = new Date(a.createdAt);
        const dateB = new Date(b.createdAt);
        return sortOrder === 'newest' ? dateB - dateA : dateA - dateB;
      });
  }, [requests, activeTab, searchQuery, sortOrder]);

  const handleViewDetails = (req) => {
    setSelectedRequest(req);
    setDetailsModalOpen(true);
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', month: 'short', day: 'numeric', 
      hour: '2-digit', minute: '2-digit'
    });
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-6">
        <div className="bg-white/[0.02] border border-white/5 p-3 md:p-4 rounded-2xl">
          <p className="text-[9px] md:text-[10px] text-gray-400 font-bold uppercase tracking-widest">Total</p>
          <p className="text-lg md:text-xl font-black text-white">{stats.total}</p>
        </div>
        <div className="bg-orange-500/10 border border-orange-500/20 p-3 md:p-4 rounded-2xl">
          <p className="text-[9px] md:text-[10px] text-orange-400/80 font-bold uppercase tracking-widest">Pending</p>
          <p className="text-lg md:text-xl font-black text-orange-400">{stats.pending}</p>
        </div>
        <div className="bg-green-500/10 border border-green-500/20 p-3 md:p-4 rounded-2xl">
          <p className="text-[9px] md:text-[10px] text-green-400/80 font-bold uppercase tracking-widest">Approved</p>
          <p className="text-lg md:text-xl font-black text-green-400">{stats.approved}</p>
        </div>
        <div className="bg-red-500/10 border border-red-500/20 p-3 md:p-4 rounded-2xl">
          <p className="text-[9px] md:text-[10px] text-red-400/80 font-bold uppercase tracking-widest">Rejected</p>
          <p className="text-lg md:text-xl font-black text-red-400">{stats.rejected}</p>
        </div>
      </div>

      {/* Control Bar: Tabs, Search, Sort */}
      <div className="flex flex-col lg:flex-row gap-4 justify-between items-start lg:items-center bg-white/[0.02] p-4 rounded-3xl border border-white/5">
        
        {/* Navigation Tabs - Scrollable on mobile */}
        <div className="flex w-full sm:w-auto p-1 bg-black/40 rounded-xl border border-white/5 overflow-x-auto custom-scrollbar">
          <button 
            onClick={() => setActiveTab('pending')}
            className={`flex-1 sm:flex-none px-4 md:px-6 py-2 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-2 whitespace-nowrap ${activeTab === 'pending' ? 'bg-[#1E90FF] text-white shadow-lg shadow-[#1E90FF]/20' : 'text-gray-400 hover:text-white'}`}
          >
            <Clock size={14} /> Pending Review
          </button>
          <button 
            onClick={() => setActiveTab('history')}
            className={`flex-1 sm:flex-none px-4 md:px-6 py-2 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-2 whitespace-nowrap ${activeTab === 'history' ? 'bg-[#1E90FF] text-white shadow-lg shadow-[#1E90FF]/20' : 'text-gray-400 hover:text-white'}`}
          >
            <Calendar size={14} /> Request History
          </button>
        </div>

        {/* Search and Sort Inputs */}
        <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
          <div className="relative group flex-1 lg:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-[#1E90FF] transition-colors" size={16} />
            <input 
              type="text"
              placeholder="Search ID or Email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-black/40 border border-white/5 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#1E90FF]/50 transition-all"
            />
          </div>

          <button 
            onClick={() => setSortOrder(sortOrder === 'newest' ? 'oldest' : 'newest')}
            className="flex items-center justify-center gap-2 px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-xs font-bold text-gray-300 hover:text-white hover:bg-white/10 transition-all whitespace-nowrap w-full sm:w-auto"
          >
            <ArrowUpDown size={14} className="text-[#1E90FF]" />
            {sortOrder === 'newest' ? 'Sort: Newest' : 'Sort: Oldest'}
          </button>
        </div>
      </div>

      {/* Requests List */}
      <div className="space-y-4">
        {filteredRequests.map((req) => (
          <div key={req.id} className="flex flex-col md:flex-row md:items-center justify-between p-4 md:p-5 bg-white/[0.02] backdrop-blur-md border border-white/10 rounded-2xl shadow-lg gap-4 hover:border-white/20 transition-all group">
            <div className="flex items-start md:items-center gap-4">
              <div className={`hidden sm:flex shrink-0 w-10 h-10 rounded-full items-center justify-center border ${req.status === 'pending' ? 'bg-orange-500/10 border-orange-500/20 text-orange-400' : req.status === 'approved' ? 'bg-green-500/10 border-green-500/20 text-green-400' : 'bg-red-500/10 border-red-500/20 text-red-400'}`}>
                {req.status === 'pending' ? <Clock size={18} /> : req.status === 'approved' ? <CheckCircle2 size={18} /> : <XCircle size={18} />}
              </div>
              <div className="w-full">
                <p className="text-sm md:text-base font-bold text-white mb-1 flex items-center gap-2 truncate">
                  {req.email}
                  {activeTab === 'history' && (
                    <span className={`text-[8px] px-1.5 py-0.5 rounded border ${req.status === 'approved' ? 'border-green-500/30 text-green-400' : 'border-red-500/30 text-red-400'}`}>
                      {req.status.toUpperCase()}
                    </span>
                  )}
                </p>
                <div className="text-[11px] md:text-xs text-gray-400 font-mono flex flex-col sm:flex-row gap-1 sm:gap-3">
                  <span>TXN: <span className="text-[#1E90FF] break-all">{req.transactionId}</span></span>
                  <span className="hidden sm:inline">|</span>
                  <span>Plan: <span className="text-white">{req.planName}</span></span>
                </div>
              </div>
            </div>
            
            <div className="flex flex-wrap md:flex-nowrap items-center gap-2 mt-2 md:mt-0">
              <button 
                onClick={() => handleViewDetails(req)}
                className="flex-1 sm:flex-none justify-center px-3 py-2 bg-gray-500/10 hover:bg-gray-500/20 text-gray-300 rounded-xl border border-gray-500/20 transition-colors flex items-center gap-2 text-xs font-bold"
              >
                <Eye size={14} /> Details
              </button>

              {req.status === 'pending' ? (
                <>
                  <button 
                    onClick={() => processRequest(req.id, 'approve')}
                    disabled={processingId === req.id}
                    className="flex-1 sm:flex-none justify-center px-4 py-2 bg-green-500/10 hover:bg-green-500/20 text-green-400 rounded-xl border border-green-500/20 transition-colors disabled:opacity-50 flex items-center gap-2 text-xs md:text-sm font-bold"
                  >
                    {processingId === req.id ? <Loader2 size={16} className="animate-spin" /> : <CheckCircle2 size={16} />}
                    Approve
                  </button>
                  <button 
                    onClick={() => handleOpenReject(req)}
                    disabled={processingId === req.id}
                    className="flex-1 sm:flex-none justify-center px-4 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-xl border border-red-500/20 transition-colors disabled:opacity-50 flex items-center gap-2 text-xs md:text-sm font-bold"
                  >
                    <XCircle size={16} />
                    Reject
                  </button>
                </>
              ) : (
                <div className="hidden sm:flex text-right flex-col items-end w-full sm:w-auto">
                  <p className="text-[9px] text-gray-500 uppercase tracking-tighter mb-1">Processed on</p>
                  <p className="text-[10px] font-mono text-gray-400">{formatDate(req.updatedAt)}</p>
                </div>
              )}
            </div>
          </div>
        ))}

        {filteredRequests.length === 0 && (
          <div className="text-center py-16 md:py-24 bg-white/[0.01] border border-dashed border-white/5 rounded-3xl">
            <Filter size={40} className="mx-auto text-gray-600 mb-4 opacity-20" />
            <p className="text-gray-500 text-sm px-4">No requests found matching your current filters.</p>
            {searchQuery && (
              <button onClick={() => setSearchQuery('')} className="mt-2 text-xs text-[#1E90FF] hover:underline">Clear Search</button>
            )}
          </div>
        )}
      </div>

      {/* Details Modal */}
      {detailsModalOpen && selectedRequest && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-in fade-in duration-300">
          <div className="bg-[#0a0a0a] border border-white/10 p-6 md:p-8 rounded-[2rem] w-full max-w-lg shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button 
              onClick={() => setDetailsModalOpen(false)}
              className="absolute top-5 right-5 text-gray-500 hover:text-white transition-colors"
            >
              <X size={20} />
            </button>

            <h3 className="text-lg md:text-xl font-bold text-white mb-6 flex items-center gap-2">
              <Eye className="text-[#1E90FF]" /> Request Details
            </h3>

            <div className="space-y-3 md:space-y-4">
              <div className="flex items-start gap-3 p-3 bg-white/[0.02] rounded-xl border border-white/5">
                <Mail className="text-gray-400 mt-0.5 shrink-0" size={16} />
                <div className="min-w-0">
                  <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Email Address</p>
                  <p className="text-sm font-medium text-white break-words">{selectedRequest.email}</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3 p-3 bg-white/[0.02] rounded-xl border border-white/5">
                <Phone className="text-gray-400 mt-0.5 shrink-0" size={16} />
                <div>
                  <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Phone Number</p>
                  <p className="text-sm font-medium text-white">{selectedRequest.phone || 'Not Provided'}</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 bg-white/[0.02] rounded-xl border border-white/5">
                <Wallet className="text-gray-400 mt-0.5 shrink-0" size={16} />
                <div className="min-w-0">
                  <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Payment Method</p>
                  <p className="text-sm font-medium text-white break-words">{selectedRequest.paymentMethod || 'N/A'}</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 bg-[#1E90FF]/5 rounded-xl border border-[#1E90FF]/20">
                <Hash className="text-[#1E90FF] mt-0.5 shrink-0" size={16} />
                <div className="min-w-0">
                  <p className="text-[10px] text-[#1E90FF] font-bold uppercase tracking-widest">Transaction ID</p>
                  <p className="text-xs md:text-sm font-mono font-bold text-white tracking-widest break-words">{selectedRequest.transactionId}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                <div className="flex items-start gap-3 p-3 bg-white/[0.02] rounded-xl border border-white/5">
                  <Calendar className="text-gray-400 mt-0.5 shrink-0" size={16} />
                  <div>
                    <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Submitted On</p>
                    <p className="text-xs font-medium text-white">{formatDate(selectedRequest.createdAt)}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-white/[0.02] rounded-xl border border-white/5">
                  <Clock className="text-gray-400 mt-0.5 shrink-0" size={16} />
                  <div>
                    <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Current Status</p>
                    <p className={`text-xs font-bold uppercase ${selectedRequest.status === 'pending' ? 'text-orange-400' : selectedRequest.status === 'approved' ? 'text-green-400' : 'text-red-400'}`}>
                      {selectedRequest.status}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 flex justify-end">
              <button 
                onClick={() => setDetailsModalOpen(false)} 
                className="w-full sm:w-auto px-6 py-3 md:py-2 bg-white/10 hover:bg-white/20 text-white rounded-xl transition-all font-bold text-sm"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}