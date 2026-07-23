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

  const isValid = Object.values(localData).every(val => val.trim().length > 0);

  const inputClass = "w-full bg-transparent border-b border-[#00ff41]/30 py-2 text-[#00ff41] placeholder-[#00ff41]/20 focus:outline-none focus:border-[#00ff41] transition-colors font-mono text-sm uppercase";
  const labelClass = "text-[10px] text-[#00ff41]/60 uppercase tracking-widest block mb-1";

  return (
    <div className="flex flex-col text-left h-full font-mono">
      <div className="mb-6">
        <h2 className="text-xl tracking-widest uppercase mb-1 text-[#00ff41]">
          <span className="opacity-50">&gt; </span>USER_IDENTITY_FORM
        </h2>
        <div className="w-full h-px bg-gradient-to-r from-[#00ff41]/50 to-transparent mb-4" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 mb-8 flex-1">
        <div>
          <label className={labelClass}>[01] FULL_NAME</label>
          <input type="text" name="name" value={localData.name} onChange={handleChange} className={inputClass} placeholder="_ENTER_NAME" />
        </div>
        
        <div>
          <label className={labelClass}>[02] EMAIL_ADDR</label>
          <input type="email" name="email" value={localData.email} onChange={handleChange} className={inputClass} placeholder="_ENTER_EMAIL" />
        </div>

        <div>
          <label className={labelClass}>[03] COMM_LINK_ID</label>
          <input type="tel" name="phone" value={localData.phone} onChange={handleChange} className={inputClass} placeholder="_ENTER_PHONE" />
        </div>

        <div>
          <label className={labelClass}>[04] ROLL_NUMBER</label>
          <input type="text" name="rollNumber" value={localData.rollNumber} onChange={handleChange} className={inputClass} placeholder="_ENTER_REG_ID" />
        </div>

        <div>
          <label className={labelClass}>[05] BRANCH_CODE</label>
          <select name="branch" value={localData.branch} onChange={handleChange} className={`${inputClass} appearance-none cursor-pointer`}>
            <option value="" disabled className="bg-black">_SELECT_BRANCH</option>
            <option value="CSE" className="bg-black text-[#00ff41]">CSE Core</option>
            <option value="CSE-AIML" className="bg-black text-[#00ff41]">CSE AIML</option>
            <option value="CSE-DS" className="bg-black text-[#00ff41]">CSE Data Science</option>
            <option value="SWE" className="bg-black text-[#00ff41]">Software Engineering</option>
            <option value="IT" className="bg-black text-[#00ff41]">Information Technology</option>
            <option value="ECE" className="bg-black text-[#00ff41]">ECE</option>
            <option value="Other" className="bg-black text-[#00ff41]">Other</option>
          </select>
        </div>

        <div>
          <label className={labelClass}>[06] ACTIVE_YEAR</label>
          <select name="year" value={localData.year} onChange={handleChange} className={`${inputClass} appearance-none cursor-pointer`}>
            <option value="" disabled className="bg-black">_SELECT_YEAR</option>
            <option value="1" className="bg-black text-[#00ff41]">1st Year</option>
            <option value="2" className="bg-black text-[#00ff41]">2nd Year</option>
            <option value="3" className="bg-black text-[#00ff41]">3rd Year</option>
            <option value="4" className="bg-black text-[#00ff41]">4th Year</option>
          </select>
        </div>
      </div>

      <div className="flex justify-between items-center mt-auto border-t border-[#00ff41]/20 pt-4">
        <div className="text-xs text-[#00ff41]/70">
          {isValid ? (
            <motion.span initial={{opacity:0}} animate={{opacity:1}}>&gt; STATUS: VALIDATED</motion.span>
          ) : (
            <span className="text-red-500/70">&gt; STATUS: AWAITING_INPUT</span>
          )}
        </div>
        
        <button 
          onClick={handleContinue}
          disabled={!isValid}
          className={`px-6 py-2 border uppercase tracking-widest text-xs font-bold transition-all ${
            isValid 
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
