import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import SQACCore from './components/SQACCore';
import IdentityStep from './components/steps/IdentityStep';
import DeveloperStep from './components/steps/DeveloperStep';
import DomainStep from './components/steps/DomainStep';
import SpecializationStep from './components/steps/SpecializationStep';
import MissionStep from './components/steps/MissionStep';
import ReviewStep from './components/steps/ReviewStep';

const STEPS = [
  { id: 'identity', title: 'Identity', component: IdentityStep },
  { id: 'developer', title: 'Developer', component: DeveloperStep },
  { id: 'domain', title: 'Domain', component: DomainStep },
  { id: 'specialization', title: 'Specialization', component: SpecializationStep },
  { id: 'mission', title: 'Mission', component: MissionStep },
  { id: 'deploy', title: 'Deploy', component: ReviewStep },
];

// Typewriter effect component for the AI dialogue
const TypewriterText = ({ text }) => {
  const [displayedText, setDisplayedText] = useState('');
  
  useEffect(() => {
    setDisplayedText('');
    let i = 0;
    const intervalId = setInterval(() => {
      setDisplayedText(text.substring(0, i));
      i++;
      if (i > text.length) clearInterval(intervalId);
    }, 30);
    return () => clearInterval(intervalId);
  }, [text]);

  return <span>{displayedText}</span>;
};

export default function RegistrationFlow() {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isSuccess, setIsSuccess] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    rollNumber: '',
    branch: '',
    year: '',
    github: '',
    portfolio: '',
    linkedin: '',
    domain: '',
    specializations: [],
    mission: ''
  });

  const updateFormData = (data) => {
    setFormData(prev => ({ ...prev, ...data }));
  };

  const nextStep = () => {
    if (currentStepIndex < STEPS.length - 1) {
      setDirection(1);
      setCurrentStepIndex(prev => prev + 1);
    }
  };

  const prevStep = () => {
    if (currentStepIndex > 0) {
      setDirection(-1);
      setCurrentStepIndex(prev => prev - 1);
    }
  };

  const handleDeploy = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/candidates', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (res.ok) {
        setIsSuccess(true);
      } else {
        console.error('Failed to submit application');
      }
    } catch (error) {
      console.error('Error submitting:', error);
    }
  };

  const CurrentStepComponent = STEPS[currentStepIndex].component;

  // RPG Dialogue Box animation
  const dialogueVariants = {
    initial: { opacity: 0, y: 50 },
    in: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    out: { opacity: 0, y: 50, transition: { duration: 0.3 } }
  };

  if (isSuccess) {
    return (
      <div className="relative w-full h-screen bg-[#050505] text-[#00ff41] overflow-hidden flex items-center justify-center font-mono">
        <div className="absolute inset-0 z-0 opacity-40">
          <SQACCore stage={6} />
        </div>
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative z-10 p-8 border border-[#00ff41]/30 bg-black/80 shadow-[0_0_20px_rgba(0,255,65,0.2)] max-w-md w-full text-center"
        >
          <h2 className="text-2xl mb-4 tracking-widest uppercase">&gt; SYSTEM OVERRIDE SUCCESS</h2>
          <p className="text-[#00ff41]/70 mb-8 text-sm">
            <TypewriterText text="Your telemetry has been injected into the SQAC mainframe. Await further instructions." />
          </p>
          <button 
            onClick={() => window.location.href = '/'}
            className="px-6 py-2 border border-[#00ff41] text-[#00ff41] hover:bg-[#00ff41] hover:text-black transition-colors uppercase tracking-widest text-sm font-bold"
          >
            DISCONNECT
          </button>
        </motion.div>
      </div>
    );
  }

  // AI Prompts based on step
  const aiPrompts = [
    "USER DETECTED. PLEASE IDENTIFY YOURSELF TO PROCEED.",
    "IDENTITY CONFIRMED. PROVIDE REPOSITORY COORDINATES.",
    "UPLINK ESTABLISHED. SELECT YOUR PRIMARY DOMAIN VECTOR.",
    "DOMAIN LOCKED. SPECIFY YOUR TECHNICAL SUB-ROUTINES.",
    "STATE YOUR MISSION. WHY ARE YOU ACCESSING THIS SYSTEM?",
    "REVIEW TELEMETRY. CONFIRM DEPLOYMENT TO MAINFRAME."
  ];

  return (
    <div className="relative w-full h-screen bg-[#050505] text-[#00ff41] overflow-hidden font-mono selection:bg-[#00ff41] selection:text-black">
      
      {/* 3D Hero Background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <SQACCore stage={currentStepIndex} />
      </div>

      {/* Main UI Overlay - Z-index 10 */}
      <div className="relative z-10 w-full h-full flex flex-col justify-end pb-12 px-4 md:px-12 lg:px-24">
        
        <div className="w-full max-w-5xl mx-auto flex flex-col md:flex-row gap-6">
          
          {/* AI Dialogue Box */}
          <div className="w-full md:w-1/3 flex flex-col justify-end">
            <div className="border border-[#00ff41]/30 bg-black/80 backdrop-blur-md p-6 shadow-[0_0_15px_rgba(0,255,65,0.1)]">
              <div className="flex items-center gap-2 mb-4 text-xs font-bold tracking-widest uppercase text-[#00ff41]/50 border-b border-[#00ff41]/30 pb-2">
                <div className="w-2 h-2 rounded-full bg-[#00ff41] animate-pulse" />
                SQAC_CORE_AI // STATUS: LISTENING
              </div>
              <p className="text-sm leading-relaxed min-h-[60px]">
                &gt; <TypewriterText text={aiPrompts[currentStepIndex]} />
                <motion.span 
                  animate={{ opacity: [1, 0] }} 
                  transition={{ repeat: Infinity, duration: 0.8 }}
                  className="inline-block ml-1 w-2 h-4 bg-[#00ff41] align-middle"
                />
              </p>
              
              <div className="mt-6 flex gap-1 h-1">
                {STEPS.map((step, idx) => (
                  <div 
                    key={step.id} 
                    className="flex-1 transition-all duration-300"
                    style={{ backgroundColor: idx <= currentStepIndex ? '#00ff41' : 'rgba(0,255,65,0.2)' }}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* User Input Area */}
          <div className="w-full md:w-2/3">
            <AnimatePresence custom={direction} mode="wait">
              <motion.div
                key={currentStepIndex}
                custom={direction}
                variants={dialogueVariants}
                initial="initial"
                animate="in"
                exit="out"
                className="w-full border border-[#00ff41]/30 bg-black/80 backdrop-blur-md p-6 md:p-8 shadow-[0_0_15px_rgba(0,255,65,0.1)] min-h-[400px] flex flex-col"
              >
                <CurrentStepComponent 
                  data={formData} 
                  updateData={updateFormData} 
                  nextStep={nextStep}
                  prevStep={prevStep}
                  isFirst={currentStepIndex === 0}
                  isLast={currentStepIndex === STEPS.length - 1}
                  handleDeploy={handleDeploy}
                />
              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </div>
    </div>
  );
}
