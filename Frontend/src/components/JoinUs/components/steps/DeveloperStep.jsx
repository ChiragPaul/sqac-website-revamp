import React, { useState } from 'react';
import { motion } from 'framer-motion';

export default function DeveloperStep({ data, updateData, nextStep, prevStep }) {
  const [localData, setLocalData] = useState({
    github: data.github || '',
    portfolio: data.portfolio || '',
    linkedin: data.linkedin || ''
  });

  const handleChange = (e) => {
    setLocalData({ ...localData, [e.target.name]: e.target.value });
  };

  const handleContinue = () => {
    updateData(localData);
    nextStep();
  };

  const hasGithub = localData.github.trim().length > 0;
  
  const inputClass = "w-full bg-transparent border-b border-[#00ff41]/30 py-2 pl-4 text-[#00ff41] placeholder-[#00ff41]/20 focus:outline-none focus:border-[#00ff41] transition-colors font-mono text-sm";
  const labelClass = "text-[10px] text-[#00ff41]/60 uppercase tracking-widest block mb-1";

  return (
    <div className="flex flex-col text-left h-full font-mono">
      <div className="mb-6">
        <h2 className="text-xl tracking-widest uppercase mb-1 text-[#00ff41]">
          <span className="opacity-50">&gt; </span>DEV_METADATA
        </h2>
        <div className="w-full h-px bg-gradient-to-r from-[#00ff41]/50 to-transparent mb-4" />
      </div>

      <div className="flex flex-col gap-6 mb-8 flex-1">
        <div className="relative">
          <label className={labelClass}>[01] GITHUB_URL <span className="text-red-500/80">*</span></label>
          <span className="absolute left-0 bottom-2 text-[#00ff41]/50">$</span>
          <input 
            type="url" 
            name="github"
            value={localData.github}
            onChange={handleChange}
            className={inputClass}
            placeholder="https://github.com/..."
          />
        </div>
        
        <div className="relative">
          <label className={labelClass}>[02] LINKEDIN_URL <span className="text-[#00ff41]/30">(OPTIONAL)</span></label>
          <span className="absolute left-0 bottom-2 text-[#00ff41]/50">$</span>
          <input 
            type="url" 
            name="linkedin"
            value={localData.linkedin}
            onChange={handleChange}
            className={inputClass}
            placeholder="https://linkedin.com/in/..."
          />
        </div>

        <div className="relative">
          <label className={labelClass}>[03] PORTFOLIO_URL <span className="text-[#00ff41]/30">(OPTIONAL)</span></label>
          <span className="absolute left-0 bottom-2 text-[#00ff41]/50">$</span>
          <input 
            type="url" 
            name="portfolio"
            value={localData.portfolio}
            onChange={handleChange}
            className={inputClass}
            placeholder="https://..."
          />
        </div>
      </div>

      <div className="flex justify-between items-center mt-auto border-t border-[#00ff41]/20 pt-4">
        <button 
          onClick={prevStep}
          className="text-xs uppercase tracking-widest text-[#00ff41]/50 hover:text-[#00ff41]"
        >
          &lt; BACK
        </button>
        
        <div className="flex items-center gap-4">
          <div className="text-xs text-[#00ff41]/70">
            {hasGithub ? (
              <motion.span initial={{opacity:0}} animate={{opacity:1}}>&gt; REPO_LINKED</motion.span>
            ) : null}
          </div>
          
          <button 
            onClick={handleContinue}
            disabled={!hasGithub}
            className={`px-6 py-2 border uppercase tracking-widest text-xs font-bold transition-all ${
              hasGithub 
                ? 'border-[#00ff41] text-[#00ff41] hover:bg-[#00ff41] hover:text-black shadow-[0_0_10px_rgba(0,255,65,0.3)]' 
                : 'border-[#00ff41]/20 text-[#00ff41]/20 cursor-not-allowed'
            }`}
          >
            EXECUTE
          </button>
        </div>
      </div>
    </div>
  );
}
