import React, { useState } from 'react';
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

  const handleDeploy = () => {
    // In a real app, send API request here.
    setIsSuccess(true);
  };

  // The step components need access to the data, update function, and navigation
  const CurrentStepComponent = STEPS[currentStepIndex].component;

  // Animation variants for sliding screens
  const pageVariants = {
    initial: (direction) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.95
    }),
    in: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 30
      }
    },
    out: (direction) => ({
      x: direction > 0 ? -1000 : 1000,
      opacity: 0,
      scale: 0.95,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 30
      }
    })
  };

  if (isSuccess) {
    return (
      <div className="relative w-full h-screen bg-[#050505] text-white overflow-hidden flex items-center justify-center font-sans">
        {/* Background 3D Core - Fully Assembled */}
        <div className="absolute inset-0 z-0 opacity-40">
          <SQACCore stage={6} />
        </div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative z-10 flex flex-col items-center text-center p-8 glass-panel rounded-3xl"
        >
          <div className="w-24 h-24 mb-6 rounded-full bg-green-500/20 flex items-center justify-center border border-green-500/50 shadow-[0_0_30px_rgba(34,197,94,0.3)]">
            <motion.svg 
              className="w-12 h-12 text-green-400"
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </motion.svg>
          </div>
          <h2 className="text-3xl font-light tracking-wide mb-2 text-white">Application Successfully Deployed</h2>
          <p className="text-white/50 mb-8 max-w-md">Welcome to SQAC. We'll review your application shortly and get back to you.</p>
          <button 
            onClick={() => window.location.href = '/'}
            className="px-8 py-3 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 transition-all font-medium tracking-wide"
          >
            Return to Base
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-screen bg-[#050505] text-white overflow-hidden font-sans">
      
      {/* 3D Hero Background - Z-index 0 */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* The stage directly correlates to the step index (0 to 5) */}
        <SQACCore stage={currentStepIndex} />
      </div>

      {/* Main UI Overlay - Z-index 10 */}
      <div className="relative z-10 w-full h-full flex flex-col px-4 md:px-12 lg:px-24 pt-24 pb-12">
        
        {/* Top Progress Bar */}
        <div className="w-full max-w-4xl mx-auto flex items-center justify-between mb-8 md:mb-16">
          <div className="flex gap-2 w-full max-w-md">
            {STEPS.map((step, idx) => (
              <div 
                key={step.id} 
                className="h-1 flex-1 rounded-full transition-all duration-500"
                style={{ 
                  backgroundColor: idx <= currentStepIndex ? 'rgba(255,255,255,0.8)' : 'rgba(255,255,255,0.1)',
                  boxShadow: idx <= currentStepIndex ? '0 0 8px rgba(255,255,255,0.4)' : 'none'
                }}
              />
            ))}
          </div>
          <div className="text-xs uppercase tracking-widest font-semibold text-white/50 ml-4 hidden sm:block">
            {STEPS[currentStepIndex].title} • {Math.round(((currentStepIndex + 1) / STEPS.length) * 100)}%
          </div>
        </div>

        {/* Sliding Step Content */}
        <div className="flex-1 relative w-full max-w-4xl mx-auto flex flex-col justify-center">
          <AnimatePresence custom={direction} mode="wait">
            <motion.div
              key={currentStepIndex}
              custom={direction}
              variants={pageVariants}
              initial="initial"
              animate="in"
              exit="out"
              className="w-full absolute inset-0 flex items-center justify-center"
            >
              <div className="w-full max-w-2xl bg-black/40 backdrop-blur-2xl border border-white/5 p-8 md:p-12 rounded-[2rem] shadow-2xl">
                <CurrentStepComponent 
                  data={formData} 
                  updateData={updateFormData} 
                  nextStep={nextStep}
                  prevStep={prevStep}
                  isFirst={currentStepIndex === 0}
                  isLast={currentStepIndex === STEPS.length - 1}
                  handleDeploy={handleDeploy}
                />
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
}
