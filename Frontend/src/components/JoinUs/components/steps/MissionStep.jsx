import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function MissionStep({ data, updateData, nextStep, prevStep }) {
  const [localData, setLocalData] = useState({
    mission: data.mission || ''
  });
  
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    if (localData.mission.length > 0) {
      setIsTyping(true);
      const timer = setTimeout(() => setIsTyping(false), 1000);
      return () => clearTimeout(timer);
    } else {
      setIsTyping(false);
    }
  }, [localData.mission]);

  const handleChange = (e) => {
    setLocalData({ mission: e.target.value });
  };

  const handleContinue = () => {
    updateData(localData);
    nextStep();
  };

  const minLength = 20;
  const hasEnoughText = localData.mission.trim().length >= minLength;

  return (
    <div className="flex flex-col text-left h-full font-mono">
      <div className="mb-6">
        <h2 className="text-xl tracking-widest uppercase mb-1 text-[#00ff41]">
          <span className="opacity-50">&gt; </span>MISSION_DIRECTIVE
        </h2>
        <div className="w-full h-px bg-gradient-to-r from-[#00ff41]/50 to-transparent mb-4" />
      </div>

      <div className="flex flex-col gap-4 mb-8 flex-1">
        <div className="relative h-full flex flex-col">
          <span className="text-[10px] text-[#00ff41]/60 uppercase tracking-widest block mb-2">INPUT_STREAM_OPEN (MIN 20 CHARS)</span>
          <textarea 
            name="mission"
            value={localData.mission}
            onChange={handleChange}
            className="flex-1 w-full bg-black/40 border border-[#00ff41]/30 p-4 text-[#00ff41] placeholder-[#00ff41]/20 focus:outline-none focus:border-[#00ff41] transition-colors resize-none leading-relaxed text-sm font-mono shadow-[inset_0_0_10px_rgba(0,255,65,0.05)]"
            placeholder="> I am accessing this mainframe because..."
          />
        </div>
        
        <div className="h-6 flex items-center justify-end px-2">
          <AnimatePresence mode="wait">
            {isTyping ? (
              <motion.div 
                key="typing"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-xs tracking-widest text-[#00ff41]/60 flex items-center gap-1 uppercase"
              >
                ANALYZING_INPUT
                <span className="flex gap-0.5 ml-1">
                  <motion.span animate={{ opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 1.5, delay: 0 }}>.</motion.span>
                  <motion.span animate={{ opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 1.5, delay: 0.2 }}>.</motion.span>
                  <motion.span animate={{ opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 1.5, delay: 0.4 }}>.</motion.span>
                </span>
              </motion.div>
            ) : localData.mission.length > 0 && !hasEnoughText ? (
              <motion.div 
                key="short"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-xs tracking-widest text-red-500/80 uppercase"
              >
                INSUFFICIENT_DATA
              </motion.div>
            ) : hasEnoughText ? (
              <motion.div 
                key="ready"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-xs tracking-widest text-[#00ff41] uppercase font-bold"
              >
                DATA_ACCEPTABLE
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>
      </div>

      <div className="flex justify-between items-center mt-auto border-t border-[#00ff41]/20 pt-4">
        <button 
          onClick={prevStep}
          className="text-xs uppercase tracking-widest text-[#00ff41]/50 hover:text-[#00ff41]"
        >
          &lt; BACK
        </button>
        
        <button 
          onClick={handleContinue}
          disabled={!hasEnoughText}
          className={`px-6 py-2 border uppercase tracking-widest text-xs font-bold transition-all ${
            hasEnoughText
              ? 'border-[#00ff41] text-[#00ff41] hover:bg-[#00ff41] hover:text-black shadow-[0_0_10px_rgba(0,255,65,0.3)]' 
              : 'border-[#00ff41]/20 text-[#00ff41]/20 cursor-not-allowed'
          }`}
        >
          EXECUTE
        </button>
      </div>
    </div>
  );
}
