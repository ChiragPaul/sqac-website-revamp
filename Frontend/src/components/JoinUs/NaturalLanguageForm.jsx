import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";
import "./naturalLanguageForm.css";
import Navbar from "../HomePage/Navbar";

const NaturalLanguageForm = () => {
  const [formData, setFormData] = useState({
    cardholderName: "",
    year: "",
    department: "",
    raNumber: "",
    srmMailId: "",
    coreDomain: "",
    subDomain: "",
    githubId: "",
    linkedinId: "",
    mobileNumber: "",
  });

  const subdomainOptions = {
    Technical: ["Web Development", "AI/ML", "App Development"],
    Corporate: ["Sponsorship", "Events"],
    Media: ["Creatives", "Public Relations"]
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Reset subdomain if core domain changes
    if (name === "coreDomain") {
      setFormData({ ...formData, [name]: value, subDomain: "" });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // Helper for auto-resizing text inputs based on content
  const getInputWidth = (value, placeholder) => {
    const minWidth = 150;
    const charWidth = 12; // approximate pixel width per character
    const textLength = value.length || placeholder.length;
    return Math.max(minWidth, textLength * charWidth) + "px";
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validation
    const isFormValid =
      Object.values(formData).every((val) => val.trim() !== "") &&
      /^[0-9]{10}$/.test(formData.mobileNumber) &&
      /^RA\d{13}$/i.test(formData.raNumber);

    if (!isFormValid) {
      toast.error("Please fill all fields correctly. Ensure Mobile is 10 digits and RA number is valid.");
      return;
    }

    toast.success("Application submitted successfully!");
    console.log("Form submitted:", formData);
    // Add API submission logic here later
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-pink-100 to-orange-100 dark:from-[#0a0014] dark:to-[#1a0033] transition-colors duration-500 overflow-x-hidden">
      
      {/* Background Orbs */}
      <div className="absolute top-20 left-10 w-96 h-96 bg-pink-300 dark:bg-[#7A1E2C] rounded-full opacity-30 dark:opacity-20 blur-3xl animate-pulse pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[500px] h-[500px] bg-orange-300 dark:bg-[#951D13] rounded-full opacity-30 dark:opacity-20 blur-3xl animate-pulse pointer-events-none delay-1000" />
      
      <Navbar />

      <div className="relative z-10 container mx-auto px-4 pt-32 pb-24 nl-form-container">
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto bg-white/40 dark:bg-black/40 backdrop-blur-xl p-8 md:p-12 rounded-[3rem] shadow-2xl border border-white/30 dark:border-white/10"
        >
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tight text-[#951D13] dark:text-[#f3d8ad] font-poppins mb-4">
              Join The Club
            </h1>
            <p className="text-gray-700 dark:text-gray-300 font-medium">
              Fill in the blanks to complete your application.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="nl-form">
            Hi, my name is 
            <span className="nl-field">
              <input 
                type="text" 
                name="cardholderName" 
                value={formData.cardholderName} 
                onChange={handleChange} 
                placeholder="your full name"
                style={{ width: getInputWidth(formData.cardholderName, "your full name") }}
              />
            </span> 
            and I'm a 
            <span className="nl-field nl-select-wrapper">
              <select name="year" value={formData.year} onChange={handleChange}>
                <option value="" disabled>Year</option>
                <option value="1st">1st</option>
                <option value="2nd">2nd</option>
                <option value="3rd">3rd</option>
                <option value="4th">4th</option>
              </select>
            </span> 
            year student from the 
            <span className="nl-field nl-select-wrapper">
              <select name="department" value={formData.department} onChange={handleChange}>
                <option value="" disabled>Department</option>
                <option value="CSE">CSE</option>
                <option value="ECE">ECE</option>
                <option value="EEE">EEE</option>
                <option value="MECH">MECH</option>
                <option value="Other">Other</option>
              </select>
            </span> 
            department. My registration number is 
            <span className="nl-field">
              <input 
                type="text" 
                name="raNumber" 
                value={formData.raNumber} 
                onChange={handleChange} 
                placeholder="RA1234567890123"
                style={{ width: getInputWidth(formData.raNumber, "RA1234567890123") }}
              />
            </span> 
            and you can reach me at 
            <span className="nl-field">
              <input 
                type="email" 
                name="srmMailId" 
                value={formData.srmMailId} 
                onChange={handleChange} 
                placeholder="srm email ID"
                style={{ width: getInputWidth(formData.srmMailId, "srm email ID") }}
              />
            </span>. 
            I'm interested in joining the 
            <span className="nl-field nl-select-wrapper">
              <select name="coreDomain" value={formData.coreDomain} onChange={handleChange}>
                <option value="" disabled>Domain</option>
                <option value="Technical">Technical</option>
                <option value="Corporate">Corporate</option>
                <option value="Media">Media</option>
              </select>
            </span> 
            domain, specifically 
            <span className="nl-field nl-select-wrapper">
              <select name="subDomain" value={formData.subDomain} onChange={handleChange} disabled={!formData.coreDomain}>
                <option value="" disabled>Subdomain</option>
                {formData.coreDomain && subdomainOptions[formData.coreDomain]?.map(opt => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            </span>. 
            You can find my work on GitHub at 
            <span className="nl-field">
              <input 
                type="text" 
                name="githubId" 
                value={formData.githubId} 
                onChange={handleChange} 
                placeholder="username"
                style={{ width: getInputWidth(formData.githubId, "username") }}
              />
            </span> 
            and my professional profile on LinkedIn at 
            <span className="nl-field">
              <input 
                type="text" 
                name="linkedinId" 
                value={formData.linkedinId} 
                onChange={handleChange} 
                placeholder="username"
                style={{ width: getInputWidth(formData.linkedinId, "username") }}
              />
            </span>. 
            My phone number is 
            <span className="nl-field">
              <input 
                type="tel" 
                name="mobileNumber" 
                value={formData.mobileNumber} 
                onChange={handleChange} 
                placeholder="10-digit number"
                style={{ width: getInputWidth(formData.mobileNumber, "10-digit number") }}
              />
            </span>.

            <div className="nl-submit">
              <button type="submit">Submit Application</button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default NaturalLanguageForm;
