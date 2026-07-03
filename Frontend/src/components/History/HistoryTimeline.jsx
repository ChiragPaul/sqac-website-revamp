import React, { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { Compass, Rocket, Milestone, Award, Star, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function HistoryTimeline() {
  const [activeBookIndex, setActiveBookIndex] = useState(null);
  const [fullscreenBookIndex, setFullscreenBookIndex] = useState(null);
  const timeoutRef = useRef(null);

  const historyMilestones = [
    {
      year: "2021",
      title: "The Inception",
      desc: "SQAC was founded by a team of forward-thinking students, aiming to foster a collaborative culture around testing and software engineering.",
      image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&auto=format&fit=crop&q=80",
      icon: <Compass className="text-pink-500" size={24} />,
    },
    {
      year: "2022",
      title: "First Workshops & Growth",
      desc: "We expanded our learning tracks to cover automated testing, CI/CD, and full-stack web architectures, organizing our first dev bootcamps.",
      image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&auto=format&fit=crop&q=80",
      icon: <Milestone className="text-purple-500" size={24} />,
    },
    {
      year: "2023",
      title: "Technological Scaling",
      desc: "Integrated modern Devops pipelines, cloud deployment, and advanced AI/ML algorithms, training over 200+ active club members.",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=80",
      icon: <Award className="text-cyan-500" size={24} />,
    },
    {
      year: "2024",
      title: "National Flagship: MineVerse",
      desc: "Launched MineVerse, a nationwide hackathon bringing developers from across the country to compete in building secure, tested web systems.",
      image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&auto=format&fit=crop&q=80",
      icon: <Rocket className="text-orange-500" size={24} />,
    },
    {
      year: "2025 & Beyond",
      title: "Future Boundaries",
      desc: "Pioneering quality assurance in decentralized systems, AI agents, and incubator labs for student-led startup products.",
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&auto=format&fit=crop&q=80",
      icon: <Star className="text-yellow-500" size={24} />,
    },
  ];

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const handleBookClick = (index) => {
    if (activeBookIndex === index || fullscreenBookIndex !== null) return;
    setActiveBookIndex(index);
    
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    
    timeoutRef.current = setTimeout(() => {
      setFullscreenBookIndex(index);
    }, 800);
  };

  const closeFullscreen = () => {
    setFullscreenBookIndex(null);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setTimeout(() => {
      setActiveBookIndex(null);
    }, 300);
  };

  return (
    <div className="relative min-h-screen bg-zinc-950 text-white overflow-hidden py-24 flex flex-col items-center">
      {/* background radial gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-fuchsia-900/10 via-zinc-950 to-black pointer-events-none"></div>

      <div className="relative z-10 text-center mb-24">
        <h1 className="text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-400 font-poppins">
          Our Interactive Archives
        </h1>
        <p className="mt-4 text-zinc-400 text-lg font-poppins max-w-2xl mx-auto px-4">
          Select a volume from our bookshelf to explore the legacy and milestones of SQAC.
        </p>
      </div>

      {/* Bookshelf Container */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-10 pb-20 overflow-x-auto flex items-end justify-start lg:justify-center gap-8 lg:gap-16 scrollbar-hide"
        style={{ perspective: '1500px' }}>

        {historyMilestones.map((milestone, index) => {
          const isOpen = activeBookIndex === index;
          return (
            <div key={index}
              className="book group relative flex-shrink-0 cursor-pointer transition-all duration-1000 ease-[cubic-bezier(0.23,1,0.32,1)]"
              style={{
                width: '64px',
                height: '320px',
                transformStyle: 'preserve-3d',
                transform: isOpen
                  ? 'translateZ(250px) translateX(80px) rotateY(-75deg)'
                  : 'translateZ(0) translateY(0) rotateY(0deg)',
                zIndex: isOpen ? 50 : 10,
              }}
              onClick={() => handleBookClick(index)}
            >
              {/* Shadow on Shelf */}
              <div className="absolute bottom-[-20px] left-[-20px] w-[104px] h-8 bg-black/80 blur-xl rounded-[50%] transition-opacity duration-1000"
                style={{ transform: 'rotateX(90deg) translateZ(-128px)', opacity: isOpen ? 0.2 : 0.8 }}></div>

              {/* Spine */}
              <div className="spine absolute inset-0 w-full h-full bg-gradient-to-r from-[#7A1E2C] to-[#5a1620] border-l border-r border-[#4a121b] shadow-[inset_0_0_15px_rgba(0,0,0,0.9)] flex flex-col items-center justify-between py-8 rounded-sm"
                style={{ transform: 'translateZ(128px)', backfaceVisibility: 'hidden' }}>
                <div className="opacity-70 group-hover:opacity-100 transition-opacity">
                  {milestone.icon}
                </div>
                <span className="text-zinc-300 font-serif font-bold tracking-widest text-xl opacity-80 group-hover:opacity-100 transition-opacity"
                  style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}>
                  {milestone.year}
                </span>
              </div>

              {/* Front Cover */}
              <div className="front-cover absolute top-0 w-[256px] h-full origin-left transition-transform duration-1000 delay-[50ms] ease-[cubic-bezier(0.23,1,0.32,1)] z-30"
                style={{
                  left: '64px',
                  transformStyle: 'preserve-3d',
                  transform: isOpen ? 'translateZ(128px) rotateY(-25deg)' : 'translateZ(128px) rotateY(90deg)'
                }}>

                {/* Outside Front Cover */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#7A1E2C] to-[#4a121b] border-l border-white/10 rounded-r-lg shadow-2xl overflow-hidden"
                  style={{ backfaceVisibility: 'hidden', transform: 'rotateY(0deg)' }}>
                  <div className="absolute inset-0 bg-black/30 z-10 pointer-events-none group-hover:bg-transparent transition-colors duration-500"></div>
                  <img src={milestone.image} alt={milestone.title} className="w-full h-48 object-cover opacity-70 mix-blend-overlay" />
                  <div className="absolute bottom-0 w-full p-6 bg-gradient-to-t from-black/90 to-transparent">
                    <div className="w-12 h-1 mb-4 bg-gradient-to-r from-pink-500 to-cyan-500"></div>
                    <h3 className="text-white text-3xl font-extrabold font-serif leading-tight drop-shadow-md">{milestone.title}</h3>
                  </div>
                </div>

                {/* Inside Front Cover */}
                <div className="absolute inset-0 bg-[#e3decf] rounded-l-lg shadow-[inset_15px_0_30px_rgba(0,0,0,0.15)]"
                  style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}>
                  {/* Blank inside cover pattern */}
                  <div className="w-full h-full opacity-5" style={{ backgroundImage: 'repeating-linear-gradient(45deg, #000 0, #000 2px, transparent 2px, transparent 8px)' }}></div>
                </div>
              </div>

              {/* Inner Pages Content */}
              <div className="pages absolute top-[4px] bottom-[4px] w-[250px] origin-left z-20 overflow-hidden rounded-r-md bg-[#fcf9f2] shadow-[inset_-5px_0_10px_rgba(0,0,0,0.05)] border-y border-r border-zinc-300"
                style={{
                  left: '60px',
                  transform: 'translateZ(128px) rotateY(90deg)',
                }}>
                <div className="w-full h-full p-8 flex flex-col justify-center border-l-[6px] border-red-900/30">
                  <h4 className="text-3xl font-extrabold text-[#3B0A4B] mb-6 font-poppins">{milestone.title}</h4>
                  <p className="text-zinc-800 leading-relaxed text-base font-medium">
                    {milestone.desc}
                  </p>
                  {isOpen && (
                    <div className="mt-8 px-4 py-2 bg-[#8b6f4e]/10 text-[#5a4634] text-xs uppercase tracking-widest font-bold rounded flex items-center justify-center gap-2 w-max shadow-sm border border-[#8b6f4e]/20 animate-pulse">
                      Zooming in...
                    </div>
                  )}
                </div>
              </div>

              {/* Back Edge (Pages side) */}
              <div className="back-edge absolute top-[4px] bottom-[4px] w-[64px] bg-[#f5f1e6] flex items-center justify-center overflow-hidden z-0"
                style={{
                  left: '0px',
                  transform: 'translateZ(-124px) rotateY(180deg)',
                }}>
                <div className="w-full h-full opacity-30" style={{ backgroundImage: 'repeating-linear-gradient(90deg, #000 0, #000 1.5px, transparent 1.5px, transparent 4px)' }}></div>
              </div>

              {/* Top Edge */}
              <div className="absolute left-0 top-[4px] w-[60px] h-[252px] bg-[#e6e2d3] origin-top z-0"
                style={{ transform: 'translateZ(128px) rotateX(90deg)' }}>
                <div className="w-full h-full opacity-30" style={{ backgroundImage: 'repeating-linear-gradient(0deg, #000 0, #000 1.5px, transparent 1.5px, transparent 4px)' }}></div>
              </div>

              {/* Bottom Edge */}
              <div className="absolute left-0 bottom-[4px] w-[60px] h-[252px] bg-[#d9d5c5] origin-bottom z-0"
                style={{ transform: 'translateZ(128px) rotateX(-90deg)' }}>
                <div className="w-full h-full opacity-30" style={{ backgroundImage: 'repeating-linear-gradient(0deg, #000 0, #000 1.5px, transparent 1.5px, transparent 4px)' }}></div>
              </div>

              {/* Back Cover */}
              <div className="back-cover absolute top-0 w-[256px] h-full origin-left bg-[#4a121b] border border-black/40 rounded-r-lg z-10"
                style={{
                  left: '0px',
                   transform: 'translateZ(128px) rotateY(90deg)',
                }}>
              </div>

            </div>
          );
        })}

      </div>

      {/* Shelf Base line */}
      <div className="w-full max-w-7xl h-6 bg-gradient-to-b from-zinc-800 to-zinc-950 mt-[-20px] rounded-t-lg border-t border-white/20 z-0"></div>

      {/* Fullscreen "Look Inside" Immersive Deep Dive Section */}
      {typeof document !== 'undefined' && createPortal(
        <AnimatePresence>
          {fullscreenBookIndex !== null && (
            <motion.div
              initial={{ opacity: 0, scale: 0.5, y: 100 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 50 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="fixed inset-0 md:inset-4 lg:inset-8 z-[100] bg-white md:rounded-sm shadow-[0_0_50px_rgba(0,0,0,0.5)] flex flex-col md:flex-row overflow-hidden text-[#333]"
            >
              {/* Book Spine Crease */}
              <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-[60px] -translate-x-1/2 bg-gradient-to-r from-transparent via-black/5 to-transparent pointer-events-none z-20"></div>
              <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-[1px] bg-black/10 -translate-x-1/2 pointer-events-none z-20"></div>

              {/* Close Button */}
              <button
                onClick={closeFullscreen}
                className="absolute top-6 right-6 w-10 h-10 rounded-full border border-gray-200 hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors z-[120] flex items-center justify-center group"
              >
                <X size={20} strokeWidth={1} />
              </button>

              {/* Navigation Arrows (Visual only to match the Codrops style) */}
              <div className="hidden md:flex absolute top-1/2 left-6 -translate-y-1/2 w-12 h-12 rounded-full border border-gray-200 bg-gray-50/50 items-center justify-center text-gray-300 pointer-events-none z-30">
                 <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
              </div>
              <div className="hidden md:flex absolute top-1/2 right-6 -translate-y-1/2 w-12 h-12 rounded-full border border-gray-200 bg-gray-50/50 items-center justify-center text-gray-300 pointer-events-none z-30">
                 <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
              </div>

              {/* LEFT PAGE */}
              <div className="w-full md:w-1/2 h-full relative p-12 md:p-16 lg:p-24 flex flex-col justify-center items-center text-center">
                
                <div className="relative w-full max-w-sm">
                  {/* Top Line drawing animation */}
                  <svg className="absolute -top-8 left-0 w-full h-1 pointer-events-none overflow-visible">
                    <motion.line x1="10%" y1="0" x2="90%" y2="0" stroke="#ccc" strokeWidth="1.5" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.2, delay: 0.8, ease: "easeInOut" }} />
                  </svg>

                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 1.5 }}>
                    <div className="text-4xl text-gray-500 italic mb-8" style={{ fontFamily: 'Georgia, serif' }}>
                      Chapter {fullscreenBookIndex + 1}
                    </div>
                  </motion.div>

                  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 2.0 }}>
                    <h2 className="text-6xl md:text-7xl lg:text-[5.5rem] font-bold text-gray-600 uppercase tracking-tighter leading-[0.85] font-sans pb-4" style={{ transform: 'scaleY(1.4)' }}>
                      {historyMilestones[fullscreenBookIndex].title.split(' ').map((word, i) => (
                        <span key={i} className="block">{word}</span>
                      ))}
                    </h2>
                  </motion.div>

                  {/* Bottom Line drawing animation */}
                  <svg className="absolute -bottom-8 left-0 w-full h-1 pointer-events-none overflow-visible">
                    <motion.line x1="10%" y1="0" x2="90%" y2="0" stroke="#ccc" strokeWidth="1.5" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.2, delay: 1.2, ease: "easeInOut" }} />
                  </svg>
                </div>
              </div>

              {/* RIGHT PAGE */}
              <div className="w-full md:w-1/2 h-full relative p-12 md:p-16 lg:p-32 flex flex-col justify-center items-center md:items-end text-center md:text-right">
                
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 2.8 }} className="w-full max-w-md relative z-10 flex flex-col items-center md:items-end">
                  
                  <p className="text-xl md:text-2xl text-gray-500 leading-loose italic font-serif mb-16" style={{ fontFamily: 'Georgia, serif' }}>
                    {historyMilestones[fullscreenBookIndex].desc}
                  </p>
                  
                  {/* The image appears */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95, filter: 'blur(5px)' }}
                    animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                    transition={{ duration: 1.5, delay: 3.5, ease: "easeOut" }}
                    className="w-full max-w-sm aspect-[4/3] shadow-md overflow-hidden bg-gray-100 p-2 border border-gray-200"
                  >
                     <img src={historyMilestones[fullscreenBookIndex].image} alt={historyMilestones[fullscreenBookIndex].title} className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-[2000ms]" />
                  </motion.div>

                  <p className="text-xs text-gray-400 mt-6 uppercase tracking-[0.3em] font-sans">
                    Archived in {historyMilestones[fullscreenBookIndex].year}
                  </p>
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