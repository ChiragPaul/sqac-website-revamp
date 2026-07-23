import React, { useState } from 'react';
import { motion } from 'framer-motion';

export default function ReviewStep({ data, prevStep, handleDeploy }) {
  const [isDeploying, setIsDeploying] = useState(false);

  const onSubmit = () => {
    setIsDeploying(true);
    handleDeploy();
  };

  const DataRow = ({ label, value }) => (
    <div className="flex border-b border-[#00ff41]/10 py-1.5">
      <span className="w-1/3 text-[#00ff41]/50 text-xs uppercase tracking-widest">{label}</span>
      <span className="w-2/3 text-[#00ff41] text-xs font-bold uppercase truncate">{value || 'N/A'}</span>
    </div>
  );

  return (
    <div className="flex flex-col text-left h-full font-mono">
      <div className="mb-6">
        <h2 className="text-xl tracking-widest uppercase mb-1 text-[#00ff41]">
          <span className="opacity-50">&gt; </span>SYS_TELEMETRY_REVIEW
        </h2>
        <div className="w-full h-px bg-gradient-to-r from-[#00ff41]/50 to-transparent mb-4" />
      </div>

      <div className="flex-1 overflow-y-auto no-scrollbar mb-8 pr-2">
        <div className="p-4 bg-[#00ff41]/5 border border-[#00ff41]/20">
          <h3 className="text-sm font-bold text-[#00ff41] uppercase tracking-widest mb-3 border-b border-[#00ff41]/30 pb-2">
            [01] CORE_IDENTITY
          </h3>
          <DataRow label="ID" value={data.name} />
          <DataRow label="COMMS" value={data.email} />
          <DataRow label="NODE" value={data.phone} />
          <DataRow label="REG_NO" value={data.rollNumber} />
          <DataRow label="SECTOR" value={`${data.branch} - YR${data.year}`} />
        </div>

        <div className="p-4 bg-[#00ff41]/5 border border-[#00ff41]/20 mt-4">
          <h3 className="text-sm font-bold text-[#00ff41] uppercase tracking-widest mb-3 border-b border-[#00ff41]/30 pb-2">
            [02] DEV_METRICS
          </h3>
          <DataRow label="GITHUB" value={data.github} />
          <DataRow label="LINKEDIN" value={data.linkedin} />
          <DataRow label="PORTFOLIO" value={data.portfolio} />
        </div>

        <div className="p-4 bg-[#00ff41]/5 border border-[#00ff41]/20 mt-4">
          <h3 className="text-sm font-bold text-[#00ff41] uppercase tracking-widest mb-3 border-b border-[#00ff41]/30 pb-2">
            [03] ASSIGNMENT
          </h3>
          <DataRow label="VECTOR" value={data.domain} />
          <DataRow label="SUB_ROUTINES" value={data.specializations?.join(', ')} />
        </div>

        <div className="p-4 bg-[#00ff41]/5 border border-[#00ff41]/20 mt-4">
          <h3 className="text-sm font-bold text-[#00ff41] uppercase tracking-widest mb-3 border-b border-[#00ff41]/30 pb-2">
            [04] MISSION_DIRECTIVE
          </h3>
          <p className="text-[#00ff41]/70 text-xs leading-relaxed break-words whitespace-pre-wrap">
            {data.mission}
          </p>
        </div>
      </div>

      <div className="flex justify-between items-center mt-auto border-t border-[#00ff41]/20 pt-4">
        <button 
          onClick={prevStep}
          disabled={isDeploying}
          className="text-xs uppercase tracking-widest text-[#00ff41]/50 hover:text-[#00ff41] disabled:opacity-50"
        >
          &lt; ABORT
        </button>
        
        <button 
          onClick={onSubmit}
          disabled={isDeploying}
          className={`px-8 py-3 border uppercase tracking-widest text-sm font-bold transition-all
            ${isDeploying 
              ? 'bg-[#00ff41] text-black border-[#00ff41] animate-pulse cursor-wait'
              : 'border-[#00ff41] text-[#00ff41] hover:bg-[#00ff41] hover:text-black shadow-[0_0_15px_rgba(0,255,65,0.4)]'
            }
          `}
        >
          {isDeploying ? 'INJECTING...' : 'INITIATE_DEPLOY'}
        </button>
      </div>
    </div>
  );
}
