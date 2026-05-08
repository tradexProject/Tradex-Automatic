'use client';
import React, { useEffect, useState, useCallback, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Sidebar from './Sidebar';
import OverviewTab from './OverviewTab';
import RequestsTab from './RequestsTab';
import RejectModal from './RejectModal';
import InventoryTab from './InventoryTab';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertCircle, CheckCircle2, BellRing, X, LayoutDashboard, Users, KeySquare } from 'lucide-react';

export default function AdminDashboard() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  const [requests, setRequests] = useState([]);
  const [stats, setStats] = useState({ pending: 0, active: 0, availableCodes: 0 });
  const [processingId, setProcessingId] = useState(null);
  const [inventoryCodes, setInventoryCodes] = useState([]);
  
  const [rejectModalOpen, setRejectModalOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);

  const [notification, setNotification] = useState({ show: false, message: '', type: 'success' });
  const [newRequestAlert, setNewRequestAlert] = useState(false);
  
  const prevRequestsCount = useRef(0);

  const showToast = (message, type = 'success') => {
    setNotification({ show: true, message, type });
    setTimeout(() => {
      setNotification({ show: false, message: '', type: 'success' });
    }, 4000);
  };

  const fetchDashboardData = useCallback(async () => {
    const token = localStorage.getItem('admin_token');
    if (!token) {
      router.replace('/'); 
      return;
    }

    try {
      const res = await fetch('/api/dashboard', { 
        headers: { 'Authorization': `Bearer ${token}` } 
      });
      
      if (res.status === 401 || res.status === 403) {
        localStorage.removeItem('admin_token'); 
        router.replace('/404'); 
        return;
      }

      if (!res.ok) {
         const errorData = await res.json().catch(() => ({}));
         throw new Error(errorData.error || 'Failed to fetch data');
      }
      
      const data = await res.json();

      if (data.requests && data.requests.length > prevRequestsCount.current) {
        if (prevRequestsCount.current !== 0) {
          const audio = new Audio('/notification.mp3');
          audio.play().catch(err => console.log("Audio blocked:", err));
          setNewRequestAlert(true);
        }
        prevRequestsCount.current = data.requests.length;
      }

      setRequests(data.requests); 
      setStats(data.stats);
      setInventoryCodes(data.codes || []);
    } catch (error) {
      console.error("Fetch Error:", error);
    } finally {
      setIsLoading(false);
    }
  }, [router]);

  useEffect(() => {
    fetchDashboardData();
    const intervalId = setInterval(fetchDashboardData, 15000); 
    return () => clearInterval(intervalId);
  }, [fetchDashboardData]);

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    router.replace('/');
  };

  const processRequest = async (id, action, reason = '') => {
    setProcessingId(id);
    const token = localStorage.getItem('admin_token');

    try {
      const res = await fetch(`/api/requests/${id}/process`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ action, rejectReason: reason })
      });

      if (res.status === 401 || res.status === 403) {
        handleLogout();
        return;
      }

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Action failed');

      setRequests(requests.map(req => 
        req.id === id ? { ...req, status: action === 'approve' ? 'approved' : 'rejected' } : req
      ));
      
      setStats(prev => ({
        ...prev,
        pending: prev.pending - 1,
        active: action === 'approve' ? prev.active + 1 : prev.active,
        availableCodes: action === 'approve' ? prev.availableCodes - 1 : prev.availableCodes
      }));

      showToast(`Request has been successfully ${action}d!`, 'success');
      setRejectModalOpen(false);
      fetchDashboardData();
    } catch (error) {
      showToast(error.message, 'error');
    } finally {
      setProcessingId(null);
    }
  };

  const handleOpenReject = (req) => {
    setSelectedRequest(req);
    setRejectModalOpen(true);
  };

  const handleAddCodes = async (codesArray, planName) => {
    const token = localStorage.getItem('admin_token');
    try {
      const res = await fetch('/api/codes/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ codes: codesArray, planName })
      });

      if (res.status === 401 || res.status === 403) {
        handleLogout();
        return;
      }

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || 'Failed to add codes');
      }
      
      showToast("Codes added to inventory successfully!", 'success');
      fetchDashboardData(); 
      
    } catch (error) {
      showToast(error.message, 'error');
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-[#1E90FF]/20 border-t-[#1E90FF] rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen text-white font-sans flex overflow-hidden  selection:text-white relative">
      
      <AnimatePresence>
        {newRequestAlert && (
          <motion.div 
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            className="fixed top-0 left-0 right-0 z-[150] p-4 flex justify-center pointer-events-none"
          >
            <div className="text-white px-4 md:px-6 py-3 rounded-2xl shadow-[0_0_30px_rgba(30,144,255,0.4)] flex flex-col sm:flex-row items-center gap-4 pointer-events-auto border border-white/20 bg-[#0a0a0a]/95 backdrop-blur-md">
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <div className="bg-white/20 p-2 rounded-full animate-bounce shrink-0">
                  <BellRing size={20} />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-black uppercase tracking-tighter">Notification</span>
                  <p className="text-sm font-bold">New request received!</p>
                </div>
              </div>
              <div className="flex items-center gap-3 w-full sm:w-auto justify-end mt-2 sm:mt-0">
                <button 
                  onClick={() => {
                    setNewRequestAlert(false);
                    setActiveTab('requests');
                  }}
                  className="px-4 py-1.5 bg-white/10 hover:bg-white/20 rounded-xl text-xs font-black transition-all"
                >
                  VIEW NOW
                </button>
                <button onClick={() => setNewRequestAlert(false)} className="p-1 hover:bg-white/10 rounded-lg transition-colors">
                  <X size={18} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {notification.show && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.95 }}
            className={`fixed bottom-20 md:bottom-8 right-4 md:right-8 z-[100] flex items-center gap-3 px-4 md:px-6 py-3 md:py-4 rounded-2xl shadow-2xl border backdrop-blur-md ${
              notification.type === 'error'
                ? 'bg-red-500/10 border-red-500/20 text-red-400'
                : 'bg-green-500/10 border-green-500/20 text-green-400'
            }`}
          >
            {notification.type === 'error' ? <AlertCircle size={20} /> : <CheckCircle2 size={20} />}
            <p className="text-xs md:text-sm font-bold tracking-wide">{notification.message}</p>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="fixed inset-0 pointer-events-none z-0 flex items-center justify-center">
        <div className="absolute top-[-10%] left-[-10%] w-[40vw] h-[40vw] bg-[#1E90FF]/5 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[30vw] h-[30vw] bg-blue-700/5 blur-[100px]"></div>
      </div>
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:64px_64px] pointer-events-none opacity-20"></div>

      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        pendingCount={stats.pending} 
        onLogout={handleLogout} 
      />

      <main className="flex-1 min-w-0 w-full relative z-10 p-4 md:p-8 overflow-y-auto overflow-x-hidden pb-24 md:pb-8">
        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 md:mb-10 w-full">
          <div>
            <h2 className="text-xl md:text-2xl font-black uppercase tracking-wider">Dashboard</h2>
            <p className="text-gray-400 text-xs md:text-sm">Welcome back, System Administrator.</p>
          </div>
          <div className="px-3 py-1.5 md:px-4 md:py-2 bg-white/5 border border-white/10 rounded-xl text-[10px] md:text-xs font-mono text-[#1E90FF]">
            Status: <span className="text-green-400">Encrypted & Online</span>
          </div>
        </header>

        {activeTab === 'overview' && (
          <OverviewTab stats={stats} requests={requests} setActiveTab={setActiveTab} />
        )}

        {activeTab === 'requests' && (
          <RequestsTab 
            requests={requests} 
            processRequest={processRequest} 
            processingId={processingId} 
            handleOpenReject={handleOpenReject} 
          />
        )}

        {activeTab === 'inventory' && (
          <InventoryTab codes={inventoryCodes} onAddCodes={handleAddCodes} />
        )}
      </main>
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-[#0a0a0a]/95 backdrop-blur-xl border-t border-white/10 flex justify-around items-center p-2 z-[90] pb-safe">
        <button onClick={() => setActiveTab('overview')} className={`flex flex-col items-center gap-1 p-2 w-full ${activeTab === 'overview' ? 'text-[#1E90FF]' : 'text-gray-500'}`}>
          <LayoutDashboard size={20} />
          <span className="text-[10px] font-bold">Overview</span>
        </button>
        <button onClick={() => setActiveTab('requests')} className={`relative flex flex-col items-center gap-1 p-2 w-full ${activeTab === 'requests' ? 'text-[#1E90FF]' : 'text-gray-500'}`}>
          <Users size={20} />
          <span className="text-[10px] font-bold">Requests</span>
          {stats.pending > 0 && (
            <span className="absolute top-1 right-1/4 w-2.5 h-2.5 bg-red-500 rounded-full border border-[#0a0a0a]"></span>
          )}
        </button>
        <button onClick={() => setActiveTab('inventory')} className={`flex flex-col items-center gap-1 p-2 w-full ${activeTab === 'inventory' ? 'text-[#1E90FF]' : 'text-gray-500'}`}>
          <KeySquare size={20} />
          <span className="text-[10px] font-bold">Inventory</span>
        </button>
      </div>

      <RejectModal 
        isOpen={rejectModalOpen} 
        onClose={() => setRejectModalOpen(false)} 
        selectedRequest={selectedRequest} 
        processRequest={processRequest} 
        processingId={processingId} 
      />
    </div>
  );
}