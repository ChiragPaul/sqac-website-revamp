import React from 'react';
import { motion } from 'framer-motion';

export default function ReviewStep({ data, handleDeploy, prevStep }) {
  
  const getInitials = (name) => {
    if (!name) return 'SQ';
    return name.split(' ').map(n => n[0]).join('').substring(0,2).toUpperCase();
  };

  return (
    <div className="flex flex-col text-left h-full">
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-light tracking-wide mb-2 text-white">Review Profile</h2>
        <p className="text-white/50 text-sm">Verify your telemetry before deployment.</p>
      </div>

      <div className="flex flex-col mb-8 relative">
        {/* Profile Card */}
        <div className="relative w-full rounded-3xl overflow-hidden bg-gradient-to-br from-white/10 to-white/5 border border-white/10 p-1">
          <div className="absolute inset-0 bg-white/5 backdrop-blur-md" />
          
          <div className="relative z-10 bg-black/40 rounded-[22px] p-6 flex flex-col sm:flex-row gap-6 items-start">
            
            {/* Avatar */}
            <div className="shrink-0 w-20 h-20 rounded-full bg-gradient-to-br from-gray-700 to-black border-2 border-white/20 flex items-center justify-center shadow-lg">
              <span className="text-2xl font-bold tracking-widest text-white/80">{getInitials(data.name)}</span>
            </div>

            {/* Info */}
            <div className="flex-1 flex flex-col gap-4">
              <div>
                <h3 className="text-2xl font-bold text-white tracking-tight">{data.name || 'Unknown Developer'}</h3>
                <p className="text-sm text-white/50">{data.branch || 'N/A'} • {data.year ? `${data.year}${data.year === '1'?'st':data.year === '2'?'nd':data.year === '3'?'rd':'th'} Year` : 'N/A'}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] uppercase tracking-widest text-white/30">Domain</span>
                  <span className="text-sm font-medium text-white/90">{data.domain === 'aiml' ? 'AI / ML' : data.domain === 'uiux' ? 'UI / UX' : data.domain ? data.domain.charAt(0).toUpperCase() + data.domain.slice(1) : 'None'}</span>
                </div>
                
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] uppercase tracking-widest text-white/30">GitHub</span>
                  <span className="text-sm font-medium text-blue-400 truncate max-w-[150px]">{data.github ? data.github.replace('https://github.com/', '') : 'None'}</span>
                </div>
              </div>

              <div className="flex flex-col gap-1 mt-2">
                <span className="text-[10px] uppercase tracking-widest text-white/30">Specialization</span>
                <div className="flex flex-wrap gap-2">
                  {data.specializations && data.specializations.length > 0 ? (
                    data.specializations.map((spec, i) => (
                      <span key={i} className="px-2 py-1 rounded border border-white/10 bg-white/5 text-xs text-white/70">
                        {spec}
                      </span>
                    ))
                  ) : (
                    <span className="text-sm text-white/50">None selected</span>
                  )}
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center mt-auto pt-4 border-t border-white/10">
        <button 
          onClick={prevStep}
          className="px-6 py-3 rounded-full text-white/50 hover:text-white hover:bg-white/5 transition-all font-medium"
        >
          Back
        </button>
        
        <button 
          onClick={handleDeploy}
          className="px-8 py-3 rounded-full bg-white text-black font-semibold tracking-wide hover:bg-gray-200 hover:scale-105 active:scale-95 shadow-[0_0_25px_rgba(255,255,255,0.4)] transition-all duration-300"
        >
          Deploy Application
        </button>
      </div>
    </div>
  );
}
