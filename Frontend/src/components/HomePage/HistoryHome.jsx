import React, { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { Compass, Rocket, Milestone, Award, Star, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import sqacLogo from "../../assets/LogoSQAC.png";
import GridMotion from "../ui/GridMotion";

export default function HistoryHome() {
  const [openBookIndex, setOpenBookIndex] = useState(null);
  const [fullscreenBookIndex, setFullscreenBookIndex] = useState(null);
  const [hoveredBookIndex, setHoveredBookIndex] = useState(null);
  const timeoutRef = useRef(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const historyMilestones = [
    {
      year: "2021",
      title: "The Inception",
      desc: "SQAC was founded by a team of forward-thinking students, aiming to foster a collaborative culture around testing and software engineering.",
      image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=500&auto=format&fit=crop&q=60",
      icon: <Compass className="text-pink-300" size={24} />,
    },
    {
      year: "2022",
      title: "First Workshops & Growth",
      desc: "We expanded our learning tracks to cover automated testing, CI/CD, and full-stack web architectures, organizing our first dev bootcamps.",
      image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=500&auto=format&fit=crop&q=60",
      icon: <Milestone className="text-purple-300" size={24} />,
    },
    {
      year: "2023",
      title: "Technological Scaling",
      desc: "Integrated modern Devops pipelines, cloud deployment, and advanced AI/ML algorithms, training over 200+ active club members.",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500&auto=format&fit=crop&q=60",
      icon: <Award className="text-cyan-300" size={24} />,
    },
    {
      year: "2024",
      title: "National Flagship: MineVerse",
      desc: "Launched MineVerse, a nationwide hackathon bringing developers from across the country to compete in building secure, tested web systems.",
      image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=500&auto=format&fit=crop&q=60",
      icon: <Rocket className="text-orange-300" size={24} />,
    },
    {
      year: "2025 & Beyond",
      title: "Future Boundaries",
      desc: "Pioneering quality assurance in decentralized systems, AI agents, and incubator labs for student-led startup products.",
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=500&auto=format&fit=crop&q=60",
      icon: <Star className="text-yellow-300" size={24} />,
    },
  ];

  const handleBookClick = (index) => {
    if (openBookIndex === index || fullscreenBookIndex !== null) return;
    setOpenBookIndex(index);
    
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    
    timeoutRef.current = setTimeout(() => {
      setFullscreenBookIndex(index);
    }, 800);
  };

  const closeFullscreen = () => {
    setFullscreenBookIndex(null);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setTimeout(() => {
      setOpenBookIndex(null);
    }, 300);
  };

  return (
    <div className="relative min-h-screen bg-transparent overflow-hidden py-24 flex flex-col items-center transition-colors duration-500">

      {/* GridMotion Parallax Background */}
      <div 
        className="absolute inset-0 overflow-hidden pointer-events-none z-0 opacity-[0.08] dark:opacity-10 mix-blend-multiply dark:mix-blend-screen"
        style={{
          maskImage: 'linear-gradient(to bottom, transparent, black 35%, black 50%, transparent)',
          WebkitMaskImage: 'linear-gradient(to bottom, transparent, black 35%, black 50%, transparent)'
        }}
      >
        <GridMotion 
          items={historyMilestones.flatMap(m => [m.year, m.image, m.title, m.image, 'SQAC', m.image]).slice(0, 28)} 
          gradientColor="transparent" 
        />
      </div>

      <div className="relative z-10 text-center mb-16">
        <h1 className="text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#951D13] via-[#f34a82] to-[#F0A01F] dark:from-[#7A1E2C] dark:via-[#9C211E] dark:to-orange-400 font-poppins">
          Our Interactive Archives
        </h1>
        <p className="mt-4 text-gray-700 dark:text-[#F5E1C2] text-lg font-poppins max-w-2xl mx-auto px-4">
          Select a volume from our bookshelf to explore the legacy and milestones of SQAC.
        </p>
      </div>

      {/* Main Layout Container */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 lg:px-8 mt-8 flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16">

        {/* Left Column: The Bookshelf */}
        <div className="w-full lg:w-[60%] relative flex items-end justify-center perspective-[1200px] h-[380px] mt-12 lg:mt-0"
          style={{ perspective: '1200px' }}>
          
          {/* Complete Bookshelf Furniture */}
          {/* Bottom Shelf Plank */}
          <div className="absolute inset-x-[-20px] bottom-[-20px] h-6 bg-gradient-to-b from-[#4E342E] to-[#3E2723] rounded-sm shadow-[0_15px_30px_rgba(0,0,0,0.7)] z-0">
             {/* Wood texture overlay */}
             <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/wood-pattern.png')]"></div>
          </div>
          {/* Back Panel */}
          <div className="absolute inset-x-[-10px] bottom-[4px] h-[360px] bg-[#3E2723] shadow-[inset_0_0_80px_rgba(0,0,0,0.9)] z-0 overflow-hidden">
             <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/wood-pattern.png')]"></div>
          </div>
          {/* Left Side Panel */}
          <div className="absolute left-[-20px] bottom-[-20px] w-5 h-[380px] bg-gradient-to-r from-[#21120f] to-[#3E2723] z-20 rounded-t shadow-[5px_0_15px_rgba(0,0,0,0.5)] pointer-events-none"></div>
          {/* Right Side Panel */}
          <div className="absolute right-[-20px] bottom-[-20px] w-5 h-[380px] bg-gradient-to-l from-[#21120f] to-[#3E2723] z-20 rounded-t shadow-[-5px_0_15px_rgba(0,0,0,0.5)] pointer-events-none"></div>
          {/* Top Shelf Lip */}
          <div className="absolute inset-x-[-20px] top-[15px] h-3 bg-[#2a1a16] z-20 shadow-[0_10px_10px_rgba(0,0,0,0.4)] pointer-events-none"></div>

          <div className="flex items-end justify-center gap-[2px] z-10 w-full px-8 scrollbar-hide pb-[4px]">

        {historyMilestones.map((milestone, index) => {
          const isOpen = openBookIndex === index;
          return (
            <div key={index}
              className="book group relative flex-shrink-0 cursor-pointer transition-all duration-[1500ms] ease-[cubic-bezier(0.23,1,0.32,1)]"
              style={{
                width: '40px', /* thinner spine */
                height: '320px',
                transformStyle: 'preserve-3d',
                transform: isOpen
                  ? 'translateZ(250px) translateX(60px) rotateY(-75deg)'
                  : 'translateZ(0) translateY(0) rotateY(0deg)',
                zIndex: isOpen ? 50 : 10 + index,
              }}
              onClick={() => handleBookClick(index)}
              onMouseEnter={() => setHoveredBookIndex(index)}
              onMouseLeave={() => setHoveredBookIndex(null)}
            >
              {/* Shadow on Shelf - subtle and flush */}
              <div className="absolute bottom-0 left-[-5px] w-[50px] h-3 bg-black/50 dark:bg-black/70 blur-md rounded-[50%] transition-opacity duration-[1500ms]"
                style={{ transform: 'rotateX(90deg) translateZ(-128px)', opacity: isOpen ? 0.1 : 0.8 }}></div>

              {/* Spine */}
              <div className="spine absolute inset-0 w-full h-full bg-gradient-to-r from-[#7A1E2C] to-[#5a1620] border-l border-r border-[#4a121c] shadow-[inset_0_0_10px_rgba(0,0,0,0.6)] flex flex-col items-center justify-between py-8 rounded-sm"
                style={{ transform: 'translateZ(128px)', backfaceVisibility: 'hidden' }}>
                <div className="opacity-70 group-hover:opacity-100 transition-opacity scale-90">
                  {milestone.icon}
                </div>
                <span className="text-yellow-400 font-serif font-bold tracking-widest text-lg opacity-80 group-hover:opacity-100 transition-opacity"
                  style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}>
                  {milestone.year}
                </span>
              </div>

              {/* Front Cover */}
              <div className="front-cover absolute top-0 w-[256px] h-full origin-left transition-transform duration-[1500ms] delay-[50ms] ease-[cubic-bezier(0.23,1,0.32,1)] z-30"
                style={{
                  left: '40px', /* hinges at thinner spine */
                  transformStyle: 'preserve-3d',
                  transform: isOpen ? 'translateZ(128px) rotateY(-25deg)' : 'translateZ(128px) rotateY(90deg)'
                }}>

                {/* Outside Front Cover */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#7A1E2C] to-[#5a1620] border-l border-[#8A4E9E]/40 rounded-r-lg shadow-2xl overflow-hidden"
                  style={{ backfaceVisibility: 'hidden', transform: 'rotateY(0deg)' }}>
                  <div className="absolute inset-0 bg-black/30 z-10 pointer-events-none group-hover:bg-transparent transition-colors duration-500"></div>
                  <img src={milestone.image} alt={milestone.title} className="w-full h-48 object-cover opacity-60 mix-blend-overlay" />
                  <div className="absolute bottom-0 w-full p-6 bg-gradient-to-t from-black/90 to-transparent">
                    <div className="w-12 h-1 mb-4 bg-gradient-to-r from-yellow-400 to-yellow-600"></div>
                    <h3 className="text-white text-3xl font-extrabold font-serif leading-tight drop-shadow-md">{milestone.title}</h3>
                  </div>
                </div>

                {/* Inside Front Cover */}
                <div className="absolute inset-0 bg-[#e6e2d3] rounded-l-lg shadow-[inset_15px_0_30px_rgba(0,0,0,0.15)]"
                  style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}>
                  <div className="w-full h-full opacity-5" style={{ backgroundImage: 'repeating-linear-gradient(45deg, #000 0, #000 2px, transparent 2px, transparent 8px)' }}></div>
                </div>
              </div>

              {/* Inner Pages Content */}
              <div className="pages absolute top-[4px] bottom-[4px] w-[250px] origin-left z-20 overflow-hidden rounded-r-md bg-[#f4ead5] shadow-[inset_-5px_0_10px_rgba(0,0,0,0.05)] border-y border-r border-[#d9d5c5]"
                style={{
                  left: '36px', /* 40px - 4px */
                  transform: 'translateZ(128px) rotateY(90deg)',
                  backgroundImage: 'url("https://www.transparenttextures.com/patterns/aged-paper.png")',
                }}>
                <div className="w-full h-full border-l-[6px] border-[#8b5a2b]/20 shadow-[inset_10px_0_20px_rgba(0,0,0,0.05)]">
                  {/* The user requested this page to be completely blank before the full-screen transition */}
                </div>
              </div>

              {/* Back Edge (Pages side) */}
              <div className="back-edge absolute top-[4px] bottom-[4px] w-[40px] bg-[#fdfbf7] flex items-center justify-center overflow-hidden z-0"
                style={{
                  left: '0px',
                  transform: 'translateZ(-124px) rotateY(180deg)',
                }}>
              </div>



              {/* Removed Bottom Edge to fix artifact at the bottom */}

              {/* Back Cover */}
              <div className="back-cover absolute top-0 w-[256px] h-full origin-left bg-[#7A1E2C] border border-[#12081f] rounded-r-lg z-10"
                style={{
                  left: '0px',
                  transform: 'translateZ(128px) rotateY(90deg)',
                }}>
              </div>

            </div>
          );
        })}

        </div>
        </div>

        {/* Right Column: Hover Preview Panel */}
        <div className="w-full lg:w-[40%] h-[380px] flex items-center z-10 mt-12 lg:mt-0">
          <AnimatePresence mode="wait">
            {hoveredBookIndex !== null ? (
              <motion.div
                key={hoveredBookIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="w-full h-full relative overflow-hidden bg-[#f4ead5]/90 dark:bg-gradient-to-br dark:from-black dark:to-[#7A1E2C]/80 backdrop-blur-xl p-8 lg:p-10 rounded-2xl shadow-2xl border border-[#8b5a2b]/30 flex flex-col justify-center"
              >
                {/* Decorative vintage background for preview */}
                <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/aged-paper.png')] pointer-events-none mix-blend-overlay"></div>
                
                <div className="relative z-10 flex flex-col h-full">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 bg-[#4A1E5C]/10 dark:bg-[#7A1E2C]/20 rounded-xl text-[#4A1E5C] dark:text-[#F5E1C2]">
                      {historyMilestones[hoveredBookIndex].icon}
                    </div>
                    <span className="px-4 py-1.5 bg-[#8b5a2b]/15 text-[#8b5a2b] dark:text-[#F5E1C2] font-bold tracking-[0.2em] text-xs rounded uppercase shadow-sm">
                      {historyMilestones[hoveredBookIndex].year}
                    </span>
                  </div>
                  
                  <h3 className="text-3xl md:text-4xl font-serif font-bold text-[#3B0A4B] dark:text-[#F5E1C2] mb-6 drop-shadow-sm leading-tight">
                    {historyMilestones[hoveredBookIndex].title}
                  </h3>
                  
                  <p className="text-[#5c4a3d] dark:text-[#F5E1C2]/90 text-lg leading-relaxed font-medium flex-grow text-justify">
                    {historyMilestones[hoveredBookIndex].desc}
                  </p>
                  
                  <div className="mt-8 flex items-center text-sm font-bold text-[#8A4E9E] dark:text-[#F5E1C2] uppercase tracking-widest animate-pulse">
                    <Compass size={18} className="mr-2" /> Click volume to dive deeper
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="w-full h-full flex flex-col items-center justify-center text-center opacity-40 border-2 border-dashed border-[#8b5a2b]/30 rounded-2xl p-8"
              >
                <div className="w-20 h-20 bg-[#8b5a2b]/10 rounded-full flex items-center justify-center mb-6">
                  <Star size={36} className="text-[#8b5a2b] dark:text-[#F5E1C2]" />
                </div>
                <p className="text-2xl font-serif text-[#8b5a2b] dark:text-[#F5E1C2] italic">
                  Hover over a volume on the shelf to catch a glimpse of the past...
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>

      {/* Fullscreen "Look Inside" Immersive Deep Dive Section */}
      {typeof document !== 'undefined' && createPortal(
        <AnimatePresence>
          {fullscreenBookIndex !== null && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, rotateX: 10 }}
              animate={{ opacity: 1, scale: 1, rotateX: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 50 }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
              className="fixed inset-0 md:inset-4 lg:inset-8 z-[100] bg-[#f4ead5] md:rounded-lg shadow-[0_0_60px_rgba(0,0,0,0.6)] flex flex-col md:flex-row overflow-hidden text-[#4a3b32]"
              style={{
                backgroundImage: 'url("https://www.transparenttextures.com/patterns/aged-paper.png")',
              }}
            >
              {/* Inner vignette shadow for vintage feel */}
              <div className="absolute inset-0 shadow-[inset_0_0_150px_rgba(139,90,43,0.15)] pointer-events-none z-0"></div>

              {/* Book Spine Crease (Leather/Old Book feel) */}
              <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-[80px] -translate-x-1/2 bg-gradient-to-r from-transparent via-[#8b5a2b]/20 to-transparent pointer-events-none z-20"></div>
              <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-[2px] bg-[#5c3a21]/20 -translate-x-1/2 pointer-events-none z-20 shadow-[0_0_5px_rgba(0,0,0,0.3)]"></div>

              {/* Close Button */}
              <button
                onClick={closeFullscreen}
                className="absolute top-6 right-6 w-12 h-12 rounded-full hover:bg-[#8b5a2b]/10 text-[#8b5a2b] transition-colors z-[120] flex items-center justify-center group"
                title="Close Journal"
              >
                <X size={28} strokeWidth={1.5} />
              </button>

              {/* LEFT PAGE - The Story */}
              <div className="w-full md:w-1/2 h-full relative p-6 md:p-12 lg:p-16 flex flex-col justify-center items-center text-center border-r border-[#8b5a2b]/10 z-10 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                
                {/* Decorative Journal Box Line */}
                <svg className="absolute top-4 left-4 md:top-6 md:left-6 w-[calc(100%-2rem)] md:w-[calc(100%-3rem)] h-[calc(100%-2rem)] md:h-[calc(100%-3rem)] pointer-events-none z-0">
                  <motion.rect x="0" y="0" width="100%" height="100%" fill="none" stroke="#8b5a2b" strokeWidth="1.5" strokeOpacity="0.2" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 2.5, delay: 0.5, ease: "easeInOut" }} />
                </svg>

                {/* Page Number */}
                <div className="absolute bottom-6 md:bottom-8 left-8 md:left-10 font-serif text-[#8b5a2b]/60 text-sm tracking-widest z-10">
                  {fullscreenBookIndex * 2 + 1}
                </div>

                {/* SQAC Logo Seal watermark */}
                <div className="absolute bottom-4 md:bottom-6 right-6 md:right-8 opacity-[0.08] pointer-events-none z-10 w-16 h-16 mix-blend-multiply flex items-center justify-center overflow-hidden rounded-full border-2 border-[#8b5a2b]">
                  <img src={sqacLogo} alt="SQAC Seal" className="w-12 h-12 object-contain sepia contrast-200 grayscale opacity-80" />
                </div>

                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.8 }} className="mb-6 relative">
                   {/* Vintage Label */}
                   <div className="inline-block px-6 py-2 border-b-2 border-t-2 border-[#8b5a2b]/30 text-[#8b5a2b] font-serif tracking-[0.2em] uppercase text-sm">
                      A Memory from {historyMilestones[fullscreenBookIndex].year}
                   </div>
                </motion.div>

                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 1.2 }}>
                  <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#3d2b1f] font-serif leading-tight mb-6 drop-shadow-sm">
                    {historyMilestones[fullscreenBookIndex].title}
                  </h2>
                </motion.div>

                <motion.div initial={{ width: 0 }} animate={{ width: "60%" }} transition={{ duration: 1.5, delay: 1.6, ease: "easeInOut" }} className="h-[2px] bg-gradient-to-r from-transparent via-[#8b5a2b]/30 to-transparent mb-10"></motion.div>

                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.2, delay: 2.2 }} className="w-full max-w-md relative">
                  <p className="text-base md:text-lg text-[#5c4a3d] leading-loose font-serif text-justify first-letter:text-6xl first-letter:font-bold first-letter:text-[#8b5a2b] first-letter:float-left first-letter:pr-3 first-letter:-mt-2">
                    {historyMilestones[fullscreenBookIndex].desc}
                  </p>
                  
                  {/* Signature */}
                  <div className="mt-8 text-right">
                    <span className="font-serif italic text-xl md:text-2xl text-[#8b5a2b]/70 transform -rotate-2 inline-block">
                      — The SQAC Archives
                    </span>
                  </div>
                </motion.div>
              </div>

              {/* RIGHT PAGE - The Photo Album */}
              <div className="w-full md:w-1/2 h-full relative p-6 md:p-12 lg:p-16 flex flex-col justify-center items-center z-10 overflow-hidden">
                
                {/* Decorative Journal Box Line */}
                <svg className="absolute top-4 left-4 md:top-6 md:left-6 w-[calc(100%-2rem)] md:w-[calc(100%-3rem)] h-[calc(100%-2rem)] md:h-[calc(100%-3rem)] pointer-events-none z-0">
                  <motion.rect x="0" y="0" width="100%" height="100%" fill="none" stroke="#8b5a2b" strokeWidth="1.5" strokeOpacity="0.2" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 2.5, delay: 0.5, ease: "easeInOut" }} />
                </svg>

                {/* Page Number */}
                <div className="absolute bottom-6 md:bottom-8 right-8 md:right-10 font-serif text-[#8b5a2b]/60 text-sm tracking-widest z-10">
                  {fullscreenBookIndex * 2 + 2}
                </div>

                {/* SQAC Logo Seal watermark */}
                <div className="absolute bottom-4 md:bottom-6 left-6 md:left-8 opacity-[0.08] pointer-events-none z-10 w-16 h-16 mix-blend-multiply flex items-center justify-center overflow-hidden rounded-full border-2 border-[#8b5a2b]">
                  <img src={sqacLogo} alt="SQAC Seal" className="w-12 h-12 object-contain sepia contrast-200 grayscale opacity-80" />
                </div>

                {/* Decorative background element */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.03] pointer-events-none">
                  {historyMilestones[fullscreenBookIndex].icon && React.cloneElement(historyMilestones[fullscreenBookIndex].icon, { size: 400 })}
                </div>

                {/* Polaroid Photo Wrapper */}
                <motion.div 
                  initial={{ opacity: 0, scale: 0.8, rotate: -10, x: 50 }} 
                  animate={{ opacity: 1, scale: 1, rotate: 3, x: 0 }} 
                  transition={{ duration: 1.5, delay: 2.8, type: "spring", stiffness: 40 }}
                  className="relative p-4 md:p-5 bg-[#fcfbf9] shadow-[5px_15px_40px_rgba(0,0,0,0.2)] rounded-sm border border-gray-200 z-10 max-w-sm w-full group cursor-pointer"
                >
                  {/* Photo tape effect */}
                  <div className="absolute -top-5 left-1/2 -translate-x-1/2 w-32 h-10 bg-white/50 backdrop-blur-sm shadow-[0_2px_5px_rgba(0,0,0,0.05)] rotate-[-4deg] z-20" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.4), rgba(255,255,255,0.1))' }}></div>
                  
                  <div className="w-full aspect-[4/3] overflow-hidden bg-[#e0d6c8] relative">
                     {/* Image with Vintage filters */}
                     <img 
                       src={historyMilestones[fullscreenBookIndex].image} 
                       alt={historyMilestones[fullscreenBookIndex].title} 
                       className="w-full h-full object-cover sepia-[0.5] contrast-[1.1] brightness-90 group-hover:sepia-0 group-hover:contrast-100 group-hover:brightness-100 transition-all duration-[2000ms]" 
                     />
                     
                     {/* Vignette on photo */}
                     <div className="absolute inset-0 shadow-[inset_0_0_30px_rgba(0,0,0,0.5)] pointer-events-none group-hover:opacity-0 transition-opacity duration-[2000ms]"></div>
                  </div>

                  <div className="mt-5 text-center">
                    <span className="font-serif italic text-xl text-[#5c4a3d]/80">
                      Circa {historyMilestones[fullscreenBookIndex].year}
                    </span>
                  </div>
                </motion.div>
                
                {/* Small scattered decorative photo (optional touch of memory lane) */}
                <motion.div 
                  initial={{ opacity: 0, scale: 0.8, rotate: 20 }} 
                  animate={{ opacity: 1, scale: 1, rotate: -8 }} 
                  transition={{ duration: 1.5, delay: 3.5, type: "spring" }}
                  className="absolute bottom-16 right-16 md:bottom-24 md:right-32 p-2 bg-white shadow-lg border border-gray-100 z-0 opacity-80"
                >
                   <div className="w-24 h-24 bg-gray-200 overflow-hidden flex items-center justify-center text-[#8b5a2b]/20">
                      {historyMilestones[fullscreenBookIndex].icon && React.cloneElement(historyMilestones[fullscreenBookIndex].icon, { size: 48 })}
                   </div>
                </motion.div>

              </div>

            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}

      <style>{`
         .scrollbar-hide::-webkit-scrollbar {
            display: none;
         }
         .scrollbar-hide {
            -ms-overflow-style: none;
            scrollbar-width: none;
         }
       `}</style>
    </div>
  );
}