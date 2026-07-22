import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Globe } from 'lucide-react';

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

  // Only Github is strictly required, or maybe they just need to enter at least one.
  // The spec says "When GitHub is entered Display: Repository Link Established"
  const hasGithub = localData.github.trim().length > 0;
  
  return (
    <div className="flex flex-col text-left">
      <div className="mb-10">
        <h2 className="text-3xl font-light tracking-wide mb-2 text-white">Developer Profile</h2>
        <p className="text-white/50 text-sm">Connect your professional identities.</p>
      </div>

      <div className="flex flex-col gap-6 mb-10">
        {/* GitHub */}
        <div className="flex flex-col gap-1.5 relative group">
          <label className="text-xs uppercase tracking-widest text-white/40 font-semibold pl-1 flex items-center gap-2">
            <Github className="w-3.5 h-3.5" /> GitHub Profile <span className="text-red-400/60">*</span>
          </label>
          <input 
            type="url" 
            name="github"
            value={localData.github}
            onChange={handleChange}
            className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 pl-10 text-white placeholder-white/20 focus:outline-none focus:border-white/30 focus:bg-white/5 transition-all"
            placeholder="https://github.com/username"
          />
          <Github className="w-5 h-5 absolute left-3 top-8 text-white/30 group-focus-within:text-white/70 transition-colors" />
        </div>
        
        {/* LinkedIn */}
        <div className="flex flex-col gap-1.5 relative group">
          <label className="text-xs uppercase tracking-widest text-white/40 font-semibold pl-1 flex items-center gap-2">
            <Linkedin className="w-3.5 h-3.5" /> LinkedIn <span className="text-white/20 lowercase text-[10px] ml-1">(Optional)</span>
          </label>
          <input 
            type="url" 
            name="linkedin"
            value={localData.linkedin}
            onChange={handleChange}
            className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 pl-10 text-white placeholder-white/20 focus:outline-none focus:border-white/30 focus:bg-white/5 transition-all"
            placeholder="https://linkedin.com/in/username"
          />
          <Linkedin className="w-5 h-5 absolute left-3 top-8 text-white/30 group-focus-within:text-white/70 transition-colors" />
        </div>

        {/* Portfolio */}
        <div className="flex flex-col gap-1.5 relative group">
          <label className="text-xs uppercase tracking-widest text-white/40 font-semibold pl-1 flex items-center gap-2">
            <Globe className="w-3.5 h-3.5" /> Portfolio <span className="text-white/20 lowercase text-[10px] ml-1">(Optional)</span>
          </label>
          <input 
            type="url" 
            name="portfolio"
            value={localData.portfolio}
            onChange={handleChange}
            className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 pl-10 text-white placeholder-white/20 focus:outline-none focus:border-white/30 focus:bg-white/5 transition-all"
            placeholder="https://yourwebsite.com"
          />
          <Globe className="w-5 h-5 absolute left-3 top-8 text-white/30 group-focus-within:text-white/70 transition-colors" />
        </div>
      </div>

      <div className="flex justify-between items-center mt-auto">
        <button 
          onClick={prevStep}
          className="px-6 py-3 rounded-full text-white/50 hover:text-white hover:bg-white/5 transition-all font-medium"
        >
          Back
        </button>
        
        <div className="flex items-center gap-6">
          <div className="text-sm font-medium text-blue-400/80 tracking-wide">
            {hasGithub ? (
              <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}>
                Repository Link Established
              </motion.div>
            ) : null}
          </div>
          
          <button 
            onClick={handleContinue}
            disabled={!hasGithub}
            className={`px-8 py-3 rounded-full font-medium tracking-wide transition-all duration-300 ${
              hasGithub 
                ? 'bg-white text-black hover:bg-gray-200 hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(255,255,255,0.3)]' 
                : 'bg-white/10 text-white/30 cursor-not-allowed'
            }`}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
