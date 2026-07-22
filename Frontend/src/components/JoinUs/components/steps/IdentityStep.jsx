import React, { useState } from 'react';
import { motion } from 'framer-motion';

export default function IdentityStep({ data, updateData, nextStep, isFirst }) {
  const [localData, setLocalData] = useState({
    name: data.name || '',
    email: data.email || '',
    phone: data.phone || '',
    rollNumber: data.rollNumber || '',
    branch: data.branch || '',
    year: data.year || ''
  });

  const handleChange = (e) => {
    setLocalData({ ...localData, [e.target.name]: e.target.value });
  };

  const handleContinue = () => {
    updateData(localData);
    nextStep();
  };

  // Simple validation: check if all fields have some value
  const isValid = Object.values(localData).every(val => val.trim().length > 0);

  return (
    <div className="flex flex-col text-left">
      <div className="mb-8">
        <h2 className="text-3xl font-light tracking-wide mb-2 text-white">Identify Yourself</h2>
        <p className="text-white/50 text-sm">Let's build your developer profile.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="flex flex-col gap-1.5">
          <label className="text-xs uppercase tracking-widest text-white/40 font-semibold pl-1">Full Name</label>
          <input 
            type="text" 
            name="name"
            value={localData.name}
            onChange={handleChange}
            className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/20 focus:outline-none focus:border-white/30 focus:bg-white/5 transition-all"
            placeholder="John Doe"
          />
        </div>
        
        <div className="flex flex-col gap-1.5">
          <label className="text-xs uppercase tracking-widest text-white/40 font-semibold pl-1">Email Address</label>
          <input 
            type="email" 
            name="email"
            value={localData.email}
            onChange={handleChange}
            className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/20 focus:outline-none focus:border-white/30 focus:bg-white/5 transition-all"
            placeholder="john@srmist.edu.in"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-xs uppercase tracking-widest text-white/40 font-semibold pl-1">Phone Number</label>
          <input 
            type="tel" 
            name="phone"
            value={localData.phone}
            onChange={handleChange}
            className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/20 focus:outline-none focus:border-white/30 focus:bg-white/5 transition-all"
            placeholder="9876543210"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-xs uppercase tracking-widest text-white/40 font-semibold pl-1">Roll Number (RA)</label>
          <input 
            type="text" 
            name="rollNumber"
            value={localData.rollNumber}
            onChange={handleChange}
            className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/20 focus:outline-none focus:border-white/30 focus:bg-white/5 transition-all"
            placeholder="RA2211003010000"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-xs uppercase tracking-widest text-white/40 font-semibold pl-1">Branch</label>
          <select 
            name="branch"
            value={localData.branch}
            onChange={handleChange}
            className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-white/30 focus:bg-white/10 transition-all appearance-none"
          >
            <option value="" disabled>Select Branch</option>
            <option value="CSE">CSE Core</option>
            <option value="CSE-AIML">CSE AIML</option>
            <option value="CSE-DS">CSE Data Science</option>
            <option value="SWE">Software Engineering</option>
            <option value="IT">Information Technology</option>
            <option value="ECE">ECE</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-xs uppercase tracking-widest text-white/40 font-semibold pl-1">Year</label>
          <select 
            name="year"
            value={localData.year}
            onChange={handleChange}
            className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-white/30 focus:bg-white/10 transition-all appearance-none"
          >
            <option value="" disabled>Select Year</option>
            <option value="1">1st Year</option>
            <option value="2">2nd Year</option>
            <option value="3">3rd Year</option>
            <option value="4">4th Year</option>
          </select>
        </div>
      </div>

      <div className="flex justify-between items-center mt-4">
        <div className="text-sm font-medium text-green-400/80 tracking-wide h-6">
          {isValid ? (
            <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}>
              +25 XP • Identity Verified
            </motion.div>
          ) : null}
        </div>
        
        <button 
          onClick={handleContinue}
          disabled={!isValid}
          className={`px-8 py-3 rounded-full font-medium tracking-wide transition-all duration-300 ${
            isValid 
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
