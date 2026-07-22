import React, { useState } from 'react';

const SPECIALIZATIONS = {
  web: ['Frontend (React/Vue)', 'Backend (Node/Python)', 'Fullstack', 'Web3 / Smart Contracts'],
  aiml: ['Computer Vision', 'Natural Language Processing', 'Data Science', 'Generative AI'],
  app: ['Android (Kotlin/Java)', 'iOS (Swift)', 'Flutter', 'React Native'],
  uiux: ['User Research', 'Wireframing', 'Prototyping', 'Interaction Design'],
  media: ['Video Editing', 'Graphic Design', 'Social Media Management', 'Content Writing'],
  corporate: ['Sponsorships', 'Event Management', 'Public Relations', 'Logistics']
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
    <div className="flex flex-col text-left h-full">
      <div className="mb-8">
        <h2 className="text-3xl font-light tracking-wide mb-2 text-white">Specialization</h2>
        <p className="text-white/50 text-sm">Select up to two areas of focus.</p>
      </div>

      <div className="flex flex-col gap-3 mb-8">
        {specs.map((spec, idx) => {
          const isSelected = selectedSpecs.includes(spec);
          const isDisabled = !isSelected && selectedSpecs.length >= 2;

          return (
            <button
              key={idx}
              onClick={() => toggleSpec(spec)}
              disabled={isDisabled}
              className={`w-full text-left px-6 py-4 rounded-xl border transition-all duration-300 flex items-center justify-between
                ${isSelected 
                  ? 'bg-white/10 border-white/40 shadow-[0_0_15px_rgba(255,255,255,0.1)]' 
                  : isDisabled 
                    ? 'bg-black/20 border-white/5 opacity-40 cursor-not-allowed' 
                    : 'bg-black/20 border-white/10 hover:bg-white/5 hover:border-white/20'
                }
              `}
            >
              <span className={`font-medium ${isSelected ? 'text-white' : 'text-white/70'}`}>
                {spec}
              </span>
              
              <div className={`w-5 h-5 rounded-full border flex items-center justify-center transition-colors
                ${isSelected ? 'border-white bg-white' : 'border-white/20'}
              `}>
                {isSelected && (
                  <svg className="w-3 h-3 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </div>
            </button>
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
          disabled={selectedSpecs.length === 0}
          className={`px-8 py-3 rounded-full font-medium tracking-wide transition-all duration-300 ${
            selectedSpecs.length > 0
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
