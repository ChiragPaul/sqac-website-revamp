import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const DOMAINS = [
  { id: 'web', title: 'WEB_DEV', desc: 'Build modern, responsive web applications.' },
  { id: 'aiml', title: 'AI_ML', desc: 'Train models and build intelligent systems.' },
  { id: 'app', title: 'APP_DEV', desc: 'Create native and cross-platform mobile apps.' },
  { id: 'uiux', title: 'UI_UX', desc: 'Design beautiful and intuitive user experiences.' },
  { id: 'media', title: 'MEDIA_PR', desc: 'Manage social presence and public relations.' },
  { id: 'corporate', title: 'CORPORATE', desc: 'Handle sponsorships, events, and outreach.' },
];

export default function DomainStep({ data, updateData, nextStep, prevStep }) {
  const [selectedDomain, setSelectedDomain] = useState(data.domain || '');

  const handleContinue = () => {
    if (data.domain !== selectedDomain) {
      updateData({ domain: selectedDomain, specializations: [] });
    } else {
      updateData({ domain: selectedDomain });
    }
    nextStep();
  };

  return (
    <div className="flex flex-col text-left h-full font-mono">
      <div className="mb-6">
        <h2 className="text-xl tracking-widest uppercase mb-1 text-[#00ff41]">
          <span className="opacity-50">&gt; </span>DOMAIN_SELECTION
        </h2>
        <div className="w-full h-px bg-gradient-to-r from-[#00ff41]/50 to-transparent mb-4" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-8 max-h-[50vh] overflow-y-auto no-scrollbar flex-1">
        {DOMAINS.map((domain) => {
          const isSelected = selectedDomain === domain.id;

          return (
            <motion.div
              key={domain.id}
              onClick={() => setSelectedDomain(domain.id)}
              className={`cursor-pointer p-3 border transition-all duration-300 flex flex-col justify-start
                ${isSelected 
                  ? `bg-[#00ff41]/10 border-[#00ff41] shadow-[0_0_15px_rgba(0,255,65,0.2)]` 
                  : `bg-transparent border-[#00ff41]/20 hover:bg-[#00ff41]/5 hover:border-[#00ff41]/50`
                }
              `}
            >
              <div className="flex items-center gap-2 mb-2">
                <div className={`w-2 h-2 ${isSelected ? 'bg-[#00ff41] shadow-[0_0_5px_#00ff41]' : 'bg-[#00ff41]/20'}`} />
                <h3 className={`text-sm font-bold tracking-widest ${isSelected ? 'text-[#00ff41]' : 'text-[#00ff41]/70'}`}>
                  {domain.title}
                </h3>
              </div>
              
              <AnimatePresence>
                {isSelected && (
                  <motion.p 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="text-[#00ff41]/60 text-xs leading-relaxed"
                  >
                    {domain.desc}
                  </motion.p>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
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
          disabled={!selectedDomain}
          className={`px-6 py-2 border uppercase tracking-widest text-xs font-bold transition-all ${
            selectedDomain 
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
