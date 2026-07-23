import React, { useState } from 'react';

const SPECIALIZATIONS = {
  web: ['FRONTEND_REACT', 'BACKEND_NODE', 'FULLSTACK', 'WEB3_CONTRACTS'],
  aiml: ['COMPUTER_VISION', 'NLP', 'DATA_SCIENCE', 'GENERATIVE_AI'],
  app: ['ANDROID_KOTLIN', 'IOS_SWIFT', 'FLUTTER', 'REACT_NATIVE'],
  uiux: ['USER_RESEARCH', 'WIREFRAMING', 'PROTOTYPING', 'INTERACTION_DESIGN'],
  media: ['VIDEO_EDITING', 'GRAPHIC_DESIGN', 'SOCIAL_MEDIA', 'CONTENT_WRITING'],
  corporate: ['SPONSORSHIPS', 'EVENT_MGMT', 'PUBLIC_RELATIONS', 'LOGISTICS']
};

export default function SpecializationStep({ data, updateData, nextStep, prevStep }) {
  const [selectedSpecs, setSelectedSpecs] = useState(data.specializations || []);

  const specs = SPECIALIZATIONS[data.domain] || [];

  const toggleSpec = (spec) => {
    if (selectedSpecs.includes(spec)) {
      setSelectedSpecs(selectedSpecs.filter(s => s !== spec));
    } else {
      if (selectedSpecs.length < 2) {
        setSelectedSpecs([...selectedSpecs, spec]);
      }
    }
  };

  const handleContinue = () => {
    updateData({ specializations: selectedSpecs });
    nextStep();
  };

  return (
    <div className="flex flex-col text-left h-full font-mono">
      <div className="mb-6">
        <h2 className="text-xl tracking-widest uppercase mb-1 text-[#00ff41]">
          <span className="opacity-50">&gt; </span>SUB_ROUTINES <span className="text-[10px] text-[#00ff41]/50 ml-2">(MAX 2)</span>
        </h2>
        <div className="w-full h-px bg-gradient-to-r from-[#00ff41]/50 to-transparent mb-4" />
      </div>

      <div className="flex flex-col gap-2 mb-8 flex-1 overflow-y-auto no-scrollbar">
        {specs.map((spec, idx) => {
          const isSelected = selectedSpecs.includes(spec);
          const isDisabled = !isSelected && selectedSpecs.length >= 2;

          return (
            <button
              key={idx}
              onClick={() => toggleSpec(spec)}
              disabled={isDisabled}
              className={`w-full text-left px-4 py-3 border transition-all duration-300 flex items-center justify-between
                ${isSelected 
                  ? 'bg-[#00ff41]/10 border-[#00ff41] shadow-[0_0_15px_rgba(0,255,65,0.2)]' 
                  : isDisabled 
                    ? 'bg-transparent border-[#00ff41]/5 opacity-30 cursor-not-allowed' 
                    : 'bg-transparent border-[#00ff41]/20 hover:bg-[#00ff41]/5 hover:border-[#00ff41]/50'
                }
              `}
            >
              <span className={`text-sm tracking-widest ${isSelected ? 'text-[#00ff41] font-bold' : 'text-[#00ff41]/70'}`}>
                {spec}
              </span>
              
              <div className="text-xs">
                {isSelected ? '[ X ]' : '[   ]'}
              </div>
            </button>
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
          disabled={selectedSpecs.length === 0}
          className={`px-6 py-2 border uppercase tracking-widest text-xs font-bold transition-all ${
            selectedSpecs.length > 0
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
