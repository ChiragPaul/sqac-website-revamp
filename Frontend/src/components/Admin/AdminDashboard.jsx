import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, 
  Activity, 
  Target, 
  ShieldAlert, 
  Lock,
  Search,
  ChevronDown,
  LogOut,
  FolderDot
} from 'lucide-react';
import { Link } from 'react-router-dom';

// MOCK DATA for demonstration
const MOCK_RECRUITS = [
  { id: '1', name: 'Chinmay Mishra', domain: 'Technical', role: 'Web Dev', date: '2026-07-22', status: 'Reviewed' },
  { id: '2', name: 'Aarav Kumar', domain: 'Media', role: 'Creatives', date: '2026-07-21', status: 'Pending' },
  { id: '3', name: 'Riya Singh', domain: 'Corporate', role: 'Sponsorship', date: '2026-07-21', status: 'Pending' },
  { id: '4', name: 'Siddharth V', domain: 'Technical', role: 'AI/ML', date: '2026-07-20', status: 'Rejected' },
  { id: '5', name: 'Ananya Sharma', domain: 'Corporate', role: 'Events', date: '2026-07-20', status: 'Reviewed' },
  { id: '6', name: 'Kunal Patel', domain: 'Technical', role: 'App Dev', date: '2026-07-19', status: 'Pending' },
  { id: '7', name: 'Neha Gupta', domain: 'Media', role: 'PR', date: '2026-07-18', status: 'Reviewed' },
];

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passcode, setPasscode] = useState('');
  const [error, setError] = useState('');

  const [activeTab, setActiveTab] = useState('Overview');
  const [searchQuery, setSearchQuery] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    if (passcode === 'sqac-admin') {
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('Invalid telemetry override code.');
      setPasscode('');
    }
  };

  const filteredRecruits = MOCK_RECRUITS.filter(r => 
    r.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    r.domain.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // --- LOGIN SCREEN ---
  if (!isAuthenticated) {
    return (
      <div className="w-full h-screen bg-[#050505] flex items-center justify-center font-sans text-white relative overflow-hidden">
        {/* Background Grid Pattern */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative z-10 w-full max-w-md bg-black/60 backdrop-blur-2xl border border-white/10 p-10 rounded-[2rem] shadow-2xl"
        >
          <div className="flex justify-center mb-8">
            <div className="w-16 h-16 rounded-full bg-red-900/20 border border-red-500/30 flex items-center justify-center text-red-500">
              <Lock className="w-8 h-8" />
            </div>
          </div>
          
          <h1 className="text-2xl font-light text-center mb-2 tracking-wide">Restricted Area</h1>
          <p className="text-white/40 text-center text-sm mb-8">Enter administrative passcode to continue.</p>
          
          <form onSubmit={handleLogin} className="flex flex-col gap-6">
            <div>
              <input 
                type="password"
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-center tracking-[0.5em] text-white focus:outline-none focus:border-red-500/50 transition-colors"
                placeholder="••••••••"
                autoFocus
              />
              {error && <p className="text-red-400 text-xs text-center mt-3">{error}</p>}
            </div>
            
            <button 
              type="submit"
              className="w-full py-3 rounded-xl bg-white text-black font-semibold tracking-wide hover:bg-gray-200 transition-colors"
            >
              Access Terminal
            </button>
            <Link to="/" className="text-white/30 text-xs text-center hover:text-white/70 transition-colors mt-2">
              Return to public site
            </Link>
          </form>
        </motion.div>
      </div>
    );
  }

  // --- DASHBOARD SCREEN ---
  return (
    <div className="flex h-screen bg-[#050505] text-white font-sans overflow-hidden">
      
      {/* SIDEBAR */}
      <div className="w-64 border-r border-white/5 bg-black/50 backdrop-blur-xl flex flex-col hidden md:flex">
        <div className="h-20 flex items-center px-8 border-b border-white/5">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-red-500 rounded-lg flex items-center justify-center shadow-[0_0_15px_rgba(239,68,68,0.4)]">
              <ShieldAlert className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold tracking-widest uppercase text-sm">SQAC Admin</span>
          </div>
        </div>

        <div className="flex-1 py-8 px-4 flex flex-col gap-2">
          {['Overview', 'Registrations', 'Analytics', 'Settings'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 text-sm font-medium ${
                activeTab === tab 
                  ? 'bg-white/10 text-white' 
                  : 'text-white/50 hover:bg-white/5 hover:text-white/80'
              }`}
            >
              {tab === 'Overview' && <Activity className="w-4 h-4" />}
              {tab === 'Registrations' && <Users className="w-4 h-4" />}
              {tab === 'Analytics' && <Target className="w-4 h-4" />}
              {tab === 'Settings' && <FolderDot className="w-4 h-4" />}
              {tab}
            </button>
          ))}
        </div>

        <div className="p-4 border-t border-white/5">
          <button 
            onClick={() => setIsAuthenticated(false)}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-400/70 hover:bg-red-500/10 hover:text-red-400 transition-colors text-sm font-medium"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Header */}
        <header className="h-20 border-b border-white/5 bg-black/20 backdrop-blur-md flex items-center justify-between px-8 shrink-0">
          <h2 className="text-xl font-light tracking-wide">{activeTab}</h2>
          
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="w-4 h-4 text-white/30 absolute left-3 top-1/2 -translate-y-1/2" />
              <input 
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-white/5 border border-white/10 rounded-full pl-10 pr-4 py-2 text-sm text-white placeholder-white/30 focus:outline-none focus:border-white/30 w-64 transition-all"
              />
            </div>
            <div className="w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center cursor-pointer hover:bg-white/20 transition-colors">
              <span className="text-sm font-bold">AD</span>
            </div>
          </div>
        </header>

        {/* Scrollable Area */}
        <main className="flex-1 overflow-y-auto p-8 no-scrollbar">
          
          {/* Metrics Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {[
              { label: 'Total Recruits', value: '142', change: '+12% this week', color: 'text-green-400' },
              { label: 'Technical Domain', value: '68', change: '48% of total', color: 'text-blue-400' },
              { label: 'Pending Review', value: '24', change: 'Needs action', color: 'text-orange-400' },
            ].map((metric, i) => (
              <div key={i} className="bg-white/5 border border-white/5 rounded-2xl p-6 hover:bg-white/10 transition-colors cursor-default">
                <p className="text-white/40 text-xs uppercase tracking-widest font-semibold mb-2">{metric.label}</p>
                <div className="text-4xl font-light tracking-tight mb-2">{metric.value}</div>
                <div className={`text-xs font-medium ${metric.color}`}>{metric.change}</div>
              </div>
            ))}
          </div>

          {/* Data Table */}
          <div className="bg-white/5 border border-white/5 rounded-2xl overflow-hidden flex flex-col">
            <div className="px-6 py-4 border-b border-white/5 flex justify-between items-center bg-black/20">
              <h3 className="font-medium tracking-wide">Recent Registrations</h3>
              <button className="flex items-center gap-1 text-xs text-white/50 hover:text-white transition-colors">
                Filter <ChevronDown className="w-3 h-3" />
              </button>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-white/5 bg-black/40">
                    <th className="px-6 py-4 text-xs font-semibold text-white/40 uppercase tracking-widest">Candidate</th>
                    <th className="px-6 py-4 text-xs font-semibold text-white/40 uppercase tracking-widest">Domain</th>
                    <th className="px-6 py-4 text-xs font-semibold text-white/40 uppercase tracking-widest">Specialization</th>
                    <th className="px-6 py-4 text-xs font-semibold text-white/40 uppercase tracking-widest">Status</th>
                    <th className="px-6 py-4 text-xs font-semibold text-white/40 uppercase tracking-widest">Date</th>
                    <th className="px-6 py-4 text-xs font-semibold text-white/40 uppercase tracking-widest text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  <AnimatePresence>
                    {filteredRecruits.map((recruit) => (
                      <motion.tr 
                        key={recruit.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="hover:bg-white/[0.02] transition-colors group"
                      >
                        <td className="px-6 py-4 font-medium">{recruit.name}</td>
                        <td className="px-6 py-4 text-white/70">{recruit.domain}</td>
                        <td className="px-6 py-4 text-white/70">{recruit.role}</td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border
                            ${recruit.status === 'Reviewed' ? 'bg-green-500/10 text-green-400 border-green-500/20' : 
                              recruit.status === 'Rejected' ? 'bg-red-500/10 text-red-400 border-red-500/20' : 
                              'bg-orange-500/10 text-orange-400 border-orange-500/20'}
                          `}>
                            {recruit.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-white/40 text-sm">{recruit.date}</td>
                        <td className="px-6 py-4 text-right">
                          <button className="text-white/30 hover:text-white transition-colors text-sm font-medium opacity-0 group-hover:opacity-100">
                            View
                          </button>
                        </td>
                      </motion.tr>
                    ))}
                  </AnimatePresence>
                </tbody>
              </table>
              {filteredRecruits.length === 0 && (
                <div className="px-6 py-12 text-center text-white/30 text-sm">
                  No records found matching "{searchQuery}"
                </div>
              )}
            </div>
          </div>

        </main>
      </div>
    </div>
  );
}
