import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const DOMAINS = [
  { id: 'web', title: 'Web Development', desc: 'Build modern, responsive web applications.', color: 'from-blue-500/20 to-blue-900/20', border: 'border-blue-500/30' },
  { id: 'aiml', title: 'AI / ML', desc: 'Train models and build intelligent systems.', color: 'from-purple-500/20 to-purple-900/20', border: 'border-purple-500/30' },
  { id: 'app', title: 'App Development', desc: 'Create native and cross-platform mobile apps.', color: 'from-green-500/20 to-green-900/20', border: 'border-green-500/30' },
  { id: 'uiux', title: 'UI / UX', desc: 'Design beautiful and intuitive user experiences.', color: 'from-pink-500/20 to-pink-900/20', border: 'border-pink-500/30' },
  { id: 'media', title: 'Media & PR', desc: 'Manage social presence and public relations.', color: 'from-orange-500/20 to-orange-900/20', border: 'border-orange-500/30' },
  { id: 'corporate', title: 'Corporate', desc: 'Handle sponsorships, events, and outreach.', color: 'from-yellow-500/20 to-yellow-900/20', border: 'border-yellow-500/30' },
];

export default function DomainStep({ data, updateData, nextStep, prevStep }) {
  const [selectedDomain, setSelectedDomain] = useState(data.domain || '');

  const handleContinue = () => {
    // If they changed the domain, clear previous specializations
    if (data.domain !== selectedDomain) {
      updateData({ domain: selectedDomain, specializations: [] });
    } else {
      updateData({ domain: selectedDomain });
    }
    nextStep();
  };

  return (
    <div className="flex flex-col text-left h-full">
      <div className="mb-8">
        <h2 className="text-3xl font-light tracking-wide mb-2 text-white">Choose Your Domain</h2>
        <p className="text-white/50 text-sm">Select your primary area of expertise.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8 max-h-[50vh] overflow-y-auto no-scrollbar pr-2 pb-4">
        {DOMAINS.map((domain) => {
          const isSelected = selectedDomain === domain.id;
          const isFaded = selectedDomain !== '' && !isSelected;

          return (
            <motion.div
              key={domain.id}
              onClick={() => setSelectedDomain(domain.id)}
              layout
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className={`cursor-pointer rounded-2xl p-6 border transition-all duration-500 flex flex-col justify-between min-h-[140px]
                ${isSelected 
                  ? `bg-gradient-to-br ${domain.color} ${domain.border} shadow-[0_0_30px_rgba(255,255,255,0.1)] scale-100` 
                  : `bg-white/5 border-white/5 hover:bg-white/10 ${isFaded ? 'opacity-30 scale-95' : 'opacity-100 scale-100'} hover:border-white/20`
                }
              `}
            >
              <h3 className={`text-lg font-bold mb-2 transition-colors ${isSelected ? 'text-white' : 'text-white/70'}`}>
                {domain.title}
              </h3>
              
              <AnimatePresence>
                {isSelected && (
                  <motion.p 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="text-white/60 text-sm leading-relaxed"
                  >
                    {domain.desc}
                  </motion.p>
                )}
              </AnimatePresence>

              {!isSelected && (
                <p className="text-white/40 text-xs line-clamp-2">
                  {domain.desc}
                </p>
              )}
            </motion.div>
          );
        })}
      </div>

      <div className="flex justify-between items-center mt-auto pt-4 border-t border-white/10">
        <button 
          onClick={prevStep}
          className="px-6 py-3 rounded-full text-white/50 hover:text-white hover:bg-white/5 transition-all font-medium"
        >
          Back
        </button>
        
        <button 
          onClick={handleContinue}
          disabled={!selectedDomain}
          className={`px-8 py-3 rounded-full font-medium tracking-wide transition-all duration-300 ${
            selectedDomain 
              ? 'bg-white text-black hover:bg-gray-200 hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(255,255,255,0.3)]' 
              : 'bg-white/10 text-white/30 cursor-not-allowed'
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
}
