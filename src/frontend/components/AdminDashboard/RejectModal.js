import React, { useState, useEffect } from 'react';
import { Loader2 } from 'lucide-react';

export default function RejectModal({ isOpen, onClose, selectedRequest, processRequest, processingId }) {
  const [rejectReason, setRejectReason] = useState('');

  useEffect(() => {
    if (isOpen) setRejectReason('');
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-in fade-in duration-300">
      <div className="bg-[#0a0a0a] border border-white/10 p-6 md:p-8 rounded-[2rem] w-full max-w-md shadow-2xl relative">
        <h3 className="text-lg md:text-xl font-bold text-white mb-2">Reject Request</h3>
        <p className="text-[10px] md:text-xs text-gray-400 mb-6 font-mono break-all">TXN: {selectedRequest?.transactionId}</p>
        
        <label className="block text-[10px] font-black text-red-400 uppercase tracking-widest mb-2 pl-1">Reason for Rejection</label>
        <textarea 
          value={rejectReason}
          onChange={(e) => setRejectReason(e.target.value)}
          placeholder="e.g. Invalid Transaction ID, Payment not received..."
          className="w-full bg-black/40 border border-white/5 rounded-xl p-4 text-sm text-white focus:border-red-500/50 focus:bg-white/[0.02] outline-none min-h-[120px] mb-6 transition-all"
        />
        
        <div className="flex flex-col-reverse sm:flex-row gap-3 justify-end">
          <button 
            onClick={onClose} 
            className="w-full sm:w-auto px-6 py-3 text-sm font-bold text-gray-400 hover:bg-white/5 rounded-xl transition-colors"
          >
            Cancel
          </button>
          <button 
            onClick={() => processRequest(selectedRequest.id, 'reject', rejectReason)}
            disabled={!rejectReason.trim() || processingId === selectedRequest?.id}
            className="w-full sm:w-auto px-6 py-3 bg-red-500/20 text-red-400 border border-red-500/30 rounded-xl hover:bg-red-500/30 disabled:opacity-50 flex items-center justify-center gap-2 text-sm font-bold transition-all shadow-[0_0_15px_rgba(239,68,68,0.2)]"
          >
            {processingId === selectedRequest?.id && <Loader2 size={16} className="animate-spin" />}
            Confirm Rejection
          </button>
        </div>
      </div>
    </div>
  );
}