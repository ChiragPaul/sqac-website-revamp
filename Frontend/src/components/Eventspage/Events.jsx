import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../../contexts/ThemeContext";
import {
  Play,
  Square,
  Rewind,
  FastForward,
  Calendar,
  MapPin,
  ArrowRight,
  Star,
  X,
} from "lucide-react";

import mineverse from "../../assets/image.png";
import stadium from "../../assets/stadium.jpg";
import EventsPhoto from "../../assets/Events-photo.png";
import LogoSQAC from "../../assets/LogoSQAC.png";
import projPhoto from "../../assets/projectsPhoto.png";
import groupPhoto from "../../assets/SQAC_Group_photo.jpg";

const Events = () => {
  const { isDarkMode } = useTheme();

  const events = [
    {
      id: 1,
      title: "MineVerse",
      description: "Compete in coding challenges, trade resources, and build your empire in this thrilling strategy-based event.",
      date: "23rd August 2025",
      venue: "Turing Hall",
      image: mineverse,
      link: "https://mineverse-sqac.vercel.app/",
      labelColor: "rgba(168, 85, 247, 0.8)", // Increased opacity
      slideshowImages: [mineverse, projPhoto, groupPhoto],
    },
    {
      id: 2,
      title: "Hack and Hit",
      description: "Think and code",
      date: "13 & 14 th February 2026",
      venue: "TP -401/402",
      image: stadium,
      link: "https://hack-and-hit-webiste.vercel.app/",
      labelColor: "rgba(107, 114, 128, 0.4)",
      slideshowImages: [stadium, EventsPhoto, projPhoto],
    }
  ];

  const [selectedEventId, setSelectedEventId] = useState(events[0].id);
  const [cinemaMode, setCinemaMode] = useState("idle"); // 'idle' | 'spooling' | 'countdown' | 'slideshow'
  const [countdownValue, setCountdownValue] = useState(3);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const selectedEvent = events.find((e) => e.id === selectedEventId) || events[0];

  const handlePlay = () => {
    if (cinemaMode !== "idle") return;
    setCinemaMode("closing_lid");
    setTimeout(() => {
      setCinemaMode("spooling");
      setTimeout(() => {
        setCinemaMode("countdown");
      }, 6000); // Wait 6s for slower spooling animation
    }, 1500); // Wait 1.5s for lid to close
  };

  const handleStop = () => {
    setCinemaMode("idle");
    setIsSidebarOpen(false);
  };

  const handleNext = () => {
    const currentIndex = events.findIndex(e => e.id === selectedEventId);
    if (currentIndex < events.length - 1) {
      setSelectedEventId(events[currentIndex + 1].id);
      setCinemaMode("idle");
    }
  };

  const handlePrev = () => {
    const currentIndex = events.findIndex(e => e.id === selectedEventId);
    if (currentIndex > 0) {
      setSelectedEventId(events[currentIndex - 1].id);
      setCinemaMode("idle");
    }
  };

  // Handle countdown
  useEffect(() => {
    if (cinemaMode === "countdown") {
      setCountdownValue(3);
      let count = 3;
      const interval = setInterval(() => {
        count -= 1;
        if (count > 0) {
          setCountdownValue(count);
        } else {
          clearInterval(interval);
          setCinemaMode("slideshow");
        }
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [cinemaMode]);

  // Handle slideshow
  useEffect(() => {
    if (cinemaMode === "slideshow") {
      const interval = setInterval(() => {
        setCurrentSlideIndex((prev) => (prev + 1) % 3);
      }, 5000); // Change image every 5 seconds
      return () => clearInterval(interval);
    }
  }, [cinemaMode]);

  return (
    <div className={`min-h-screen flex flex-col items-center py-12 px-4 transition-colors duration-500 overflow-hidden relative ${isDarkMode ? 'bg-black text-white' : 'bg-gradient-to-b from-[#e6e6e6] via-[#f3d8ad] to-red-300 text-gray-900'}`}>

      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Caveat:wght@700&display=swap');

          @keyframes spin-slow {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
          .animate-spin-slow {
            animation: spin-slow 4s linear infinite;
          }
          
          .cassette-texture {
            background-color: #2a2a2a;
            background-image: repeating-linear-gradient(45deg, #222 25%, transparent 25%, transparent 75%, #222 75%, #222), repeating-linear-gradient(45deg, #222 25%, #2a2a2a 25%, #2a2a2a 75%, #222 75%, #222);
            background-position: 0 0, 2px 2px;
            background-size: 4px 4px;
          }

          @keyframes spool-out {
            0% { right: 50%; width: 0; }
            100% { right: 50%; width: 100vw; }
          }
          .animate-spool {
            animation: spool-out 6s linear forwards;
          }
          .cinema-line {
            animation: spin-slow 2s linear infinite;
          }
          
          /* Skeuomorphic Control Panel Styles */
          .wood-panel {
            background-color: #3b2b20;
            background-image: url('https://www.transparenttextures.com/patterns/wood-pattern.png');
            box-shadow: inset 0 0 20px rgba(0,0,0,0.8), 0 15px 25px rgba(0,0,0,0.4);
            border: 2px solid #241912;
          }
          .copper-face {
            background: ${isDarkMode
            ? 'linear-gradient(135deg, #000000 0%, #2b1316 40%, #5C2D33 100%)'
            : 'linear-gradient(135deg, #f3d4c8 0%, #e2a996 25%, #c8816c 50%, #b86751 75%, #a7503b 100%)'};
            box-shadow: ${isDarkMode
            ? 'inset 0 2px 4px rgba(255,255,255,0.1), inset 0 -2px 5px rgba(0,0,0,0.8), 0 5px 15px rgba(0,0,0,0.8)'
            : 'inset 0 2px 4px rgba(255,255,255,0.7), inset 0 -2px 5px rgba(0,0,0,0.4), 0 5px 15px rgba(0,0,0,0.6)'};
            border: 1px solid ${isDarkMode ? '#3A151B' : '#7a3a29'};
          }
          .mech-button {
            background: ${isDarkMode ? 'linear-gradient(to bottom, #000000, #5C2D33)' : 'linear-gradient(to bottom, #5a2618, #c8816c)'};
            box-shadow: 
              inset 0 4px 6px rgba(255,255,255,0.3),
              inset 0 -4px 6px rgba(0,0,0,0.8),
              0 6px 8px rgba(0,0,0,0.5),
              0 1px 2px rgba(0,0,0,0.8);
            transition: all 0.1s;
          }
          .mech-button:active, .mech-button:disabled {
            transform: translateY(4px);
            box-shadow: 
              inset 0 2px 4px rgba(255,255,255,0.2),
              inset 0 -2px 4px rgba(0,0,0,0.6),
              0 2px 3px rgba(0,0,0,0.5),
              0 0px 1px rgba(0,0,0,0.8);
          }
          .mech-button-dimple {
            background: ${isDarkMode
            ? 'radial-gradient(circle at 30% 30%, #5C2D33 0%, #3A1B20 40%, #1a0508 80%, #000000 100%)'
            : 'radial-gradient(circle at 30% 30%, #e2a996 0%, #c8816c 40%, #8a402c 80%, #3a1a11 100%)'};
            box-shadow: inset 0 8px 10px rgba(0,0,0,0.8), inset 0 -4px 6px rgba(255,255,255,0.2), 0 2px 3px rgba(255,255,255,0.2);
            border-radius: 50%;
          }
          .led-light {
            background: #4a1f14;
            box-shadow: inset 0 1px 3px rgba(0,0,0,0.8), 0 1px 1px rgba(255,255,255,0.2);
            border: 1px solid #2a110a;
          }
          .led-on {
            background: #ffaa55;
            box-shadow: 0 0 10px #ffaa55, 0 0 20px #ff7700, inset 0 0 5px #fff;
            border: 1px solid #ffaa55;
          }
        `}
      </style>

      {/* Main Container */}
      <div className={`w-full max-w-5xl mx-auto flex flex-col items-center z-10 transition-opacity duration-500 ${(cinemaMode === 'countdown' || cinemaMode === 'slideshow') ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>

        <div className="mb-12 text-center relative">
          <h1 className={`text-4xl sm:text-5xl md:text-6xl font-black font-sans tracking-tighter uppercase relative z-10 transition-colors duration-500 ${isDarkMode
            ? 'bg-gradient-to-br from-gray-100 to-gray-500 bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(255,255,255,0.15)]'
            : 'bg-gradient-to-br from-red-700 via-[#C37E68] to-gray-800 bg-clip-text text-transparent drop-shadow-sm'
            }`}>
            Events
          </h1>
          {/* Decorative underline */}
          <div className={`mx-auto mt-4 w-32 h-1.5 rounded-full shadow-inner transition-colors duration-500 ${isDarkMode
            ? 'bg-gradient-to-r from-transparent via-white/40 to-transparent'
            : 'bg-gradient-to-r from-transparent via-[#C37E68]/60 to-transparent'
            }`} />
        </div>

        {/* Cassette Player Area Wrapper for accurate absolute positioning */}
        <div className="relative w-full flex justify-center items-center my-4">

          {/* Spooling Tape Line (Film Strip Style) */}
          {cinemaMode === "spooling" && (
            <>
              <div className={`absolute top-1/2 right-1/2 h-8 md:h-12 z-0 animate-spool transform -translate-y-1/2 origin-right border-y-[3px] border-dashed border-gray-300 flex items-center justify-center overflow-hidden ${isDarkMode ? 'bg-[#222] shadow-[0_0_30px_rgba(255,255,255,0.2)]' : 'bg-[#111] shadow-[0_10px_20px_rgba(0,0,0,0.6)]'}`}>
                <span className="text-white/80 font-mono font-bold tracking-[0.3em] text-[10px] md:text-xs whitespace-nowrap animate-pulse">
                  SIT DOWN, RELAX AND ENJOY
                </span>
              </div>

              {/* Projector / Receiver on the left */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5, duration: 1 }}
                className="absolute top-1/2 -translate-y-1/2 z-10 flex items-center"
                style={{ left: 'calc(50% - 50vw)' }}
              >
                <div className="w-12 h-24 md:w-24 md:h-48 bg-gradient-to-r from-gray-900 to-gray-700 rounded-r-2xl border-r-4 border-y-4 border-gray-800 shadow-2xl flex flex-col items-center justify-center relative overflow-hidden">
                  {/* Lens / Slot where tape goes */}
                  <div className="w-3 h-12 md:w-4 md:h-16 bg-black rounded-full absolute right-1 md:right-2 shadow-inner border border-gray-600"></div>
                  {/* Spinning reel inside receiver */}
                  <div className="w-8 h-8 md:w-16 md:h-16 border-2 md:border-4 border-gray-800 rounded-full animate-spin-slow mt-6 md:mt-8 flex items-center justify-center">
                    <div className="w-full h-1 bg-gray-800 absolute rotate-0"></div>
                    <div className="w-full h-1 bg-gray-800 absolute rotate-90"></div>
                    <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-gray-500 rounded-full z-10"></div>
                  </div>
                </div>
              </motion.div>
            </>
          )}

          {/* The Realistic Cassette Deck (Housing) - Wood Frame */}
          <div className="relative z-30 wood-panel p-3 md:p-5 lg:p-8 rounded-[3.5rem] shadow-[0_25px_50px_rgba(0,0,0,0.9)]">
            <div
              style={{ perspective: '1500px' }}
              className={`relative flex items-center justify-center p-4 md:p-8 rounded-[2.5rem] transition-colors duration-500 border-4 border-[#1a110c] backdrop-blur-xl ${isDarkMode ? 'bg-[#111]/90 shadow-[inset_0_10px_30px_rgba(0,0,0,0.9)]' : 'bg-white/40 shadow-[inset_0_10px_30px_rgba(195,126,104,0.4)]'
                }`}
            >
              {/* Deck inner styling: retro ridges */}
              <div className={`absolute inset-y-12 left-4 md:left-6 w-4 md:w-8 border-y-[6px] border-dashed opacity-10 rounded-sm ${isDarkMode ? 'border-white' : 'border-black'}`} />
              <div className={`absolute inset-y-12 right-4 md:right-6 w-4 md:w-8 border-y-[6px] border-dashed opacity-10 rounded-sm ${isDarkMode ? 'border-white' : 'border-black'}`} />

              {/* The Realistic Cassette Player */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedEvent.id}
                  initial={{ y: -150, opacity: 0, rotateX: -45 }}
                  animate={{ y: 0, opacity: 1, rotateX: 0 }}
                  exit={{ y: 150, opacity: 0, rotateX: 45 }}
                  transition={{ type: "spring", stiffness: 250, damping: 25 }}
                  className={`relative w-[340px] h-[220px] sm:w-[500px] sm:h-[320px] md:w-[600px] md:h-[380px] rounded-[1.5rem] shadow-[0_25px_50px_rgba(0,0,0,0.8),inset_0_2px_4px_rgba(255,255,255,0.2)] border-[3px] flex flex-col items-center justify-center p-3 z-30 ${isDarkMode ? 'bg-gradient-to-br from-[#0f0f0f]/80 to-[#5a2128]/80 backdrop-blur-md border-white/10' : 'bg-[#E19B83] border-[#C37E68]'}`}
                >
                  {/* 4 Screws */}
                  <div className="absolute top-4 left-4 w-5 h-5 rounded-full bg-gray-500 shadow-[inset_0_2px_5px_rgba(0,0,0,0.9),0_1px_1px_rgba(255,255,255,0.1)] flex items-center justify-center"><div className="w-full h-[2px] bg-gray-800 rotate-45" /></div>
                  <div className="absolute top-4 right-4 w-5 h-5 rounded-full bg-gray-500 shadow-[inset_0_2px_5px_rgba(0,0,0,0.9),0_1px_1px_rgba(255,255,255,0.1)] flex items-center justify-center"><div className="w-full h-[2px] bg-gray-800 -rotate-12" /></div>
                  <div className="absolute bottom-4 left-4 w-5 h-5 rounded-full bg-gray-500 shadow-[inset_0_2px_5px_rgba(0,0,0,0.9),0_1px_1px_rgba(255,255,255,0.1)] flex items-center justify-center"><div className="w-full h-[2px] bg-gray-800 rotate-90" /></div>
                  <div className="absolute bottom-4 right-4 w-5 h-5 rounded-full bg-gray-500 shadow-[inset_0_2px_5px_rgba(0,0,0,0.9),0_1px_1px_rgba(255,255,255,0.1)] flex items-center justify-center"><div className="w-full h-[2px] bg-gray-800 rotate-180" /></div>

                  {/* The Large Label (Cover) */}
                  <div
                    className="relative w-[92%] h-[75%] rounded-xl shadow-[0_2px_10px_rgba(0,0,0,0.7)] border-[2px] border-white/20 overflow-hidden flex flex-col items-center pt-3 md:pt-4"
                    style={{
                      backgroundImage: `linear-gradient(${selectedEvent.labelColor}, ${selectedEvent.labelColor}), url(${selectedEvent.image})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                    }}
                  >
                    {/* Title Section */}
                    <div className="w-full flex items-center px-4 md:px-8">
                      <div className={`text-[8px] md:text-xs font-sans font-bold tracking-wider ${isDarkMode ? 'text-white drop-shadow-md' : 'text-gray-900'}`}>TITLE / SUBJECT:</div>
                      <div className={`ml-2 md:ml-4 flex-1 border-b pb-1 ${isDarkMode ? 'border-white/60' : 'border-gray-900/60'}`}>
                        <h3 className={`text-3xl md:text-5xl font-bold tracking-tight pl-2 leading-none ${isDarkMode ? 'text-white drop-shadow-lg' : 'text-gray-900'}`} style={{ fontFamily: "'Caveat', cursive" }}>
                          {selectedEvent.title}
                        </h3>
                      </div>
                    </div>

                    {/* Side A & Noise Reduction */}
                    <div className={`absolute left-2 md:left-6 top-12 md:top-16 border p-1 flex flex-col items-center backdrop-blur-sm rounded-sm ${isDarkMode ? 'bg-black/30 border-white/50 text-white' : 'bg-white/40 border-gray-900 text-gray-900'}`}>
                      <span className="text-[8px] md:text-[10px] font-bold">SIDE</span>
                      <span className="text-lg md:text-2xl font-black leading-none">A</span>
                    </div>

                    <div className={`absolute right-2 md:right-6 top-12 md:top-16 border p-1 flex flex-col items-center text-[6px] md:text-[8px] leading-tight font-bold backdrop-blur-sm rounded-sm ${isDarkMode ? 'bg-black/30 border-white/50 text-white' : 'bg-white/40 border-gray-900 text-gray-900'}`}>
                      <span>NOISE</span>
                      <span>REDUCTION</span>
                      <div className="flex gap-1 mt-1">
                        <div className={`w-2 h-2 border ${isDarkMode ? 'border-white' : 'border-gray-900'}`}></div>
                        <div className={`w-2 h-2 border ${isDarkMode ? 'border-white bg-white' : 'border-gray-900 bg-gray-900'}`}></div>
                      </div>
                      <div className="flex gap-2 w-full justify-between mt-1">
                        <span>ON</span><span>OFF</span>
                      </div>
                    </div>

                    {/* Tape Reels Cutout Window */}
                    <div className="relative w-[75%] h-20 md:h-32 bg-[#111] rounded-[2rem] md:rounded-[3rem] mt-3 md:mt-6 flex items-center justify-between px-6 md:px-10 border-[3px] border-gray-800/80 shadow-[inset_0_5px_15px_rgba(0,0,0,1)] z-10 overflow-hidden">
                      <div className="absolute -left-10 top-1/2 -translate-y-1/2 w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-red-900/40"></div>
                      <div className="absolute -right-10 top-1/2 -translate-y-1/2 w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-red-900/40"></div>

                      {/* Left Spool */}
                      <div className={`relative w-14 h-14 md:w-24 md:h-24 rounded-full flex items-center justify-center ${cinemaMode !== 'idle' ? 'animate-spin-slow' : ''}`}>
                        <div className="absolute inset-0 rounded-full border-[8px] md:border-[16px] border-[#2a2a2a] shadow-lg" />
                        <div className="relative w-8 h-8 md:w-14 md:h-14 bg-gray-200 rounded-full flex items-center justify-center border-2 border-gray-400 shadow-[0_2px_5px_rgba(0,0,0,0.5)]">
                          <div className="w-2 h-2 md:w-3 md:h-3 bg-gray-800 rounded-full shadow-inner z-10" />
                          <div className="absolute w-full h-1 bg-gray-800/80 rotate-0"></div>
                          <div className="absolute w-full h-1 bg-gray-800/80 rotate-60"></div>
                          <div className="absolute w-full h-1 bg-gray-800/80 rotate-120"></div>
                        </div>
                      </div>

                      {/* Right Spool */}
                      <div className={`relative w-14 h-14 md:w-24 md:h-24 rounded-full flex items-center justify-center ${cinemaMode !== 'idle' ? 'animate-spin-slow' : ''}`}>
                        <div className="absolute inset-0 rounded-full border-[8px] md:border-[16px] border-[#2a2a2a] shadow-lg" />
                        <div className="relative w-8 h-8 md:w-14 md:h-14 bg-gray-200 rounded-full flex items-center justify-center border-2 border-gray-400 shadow-[0_2px_5px_rgba(0,0,0,0.5)]">
                          <div className="w-2 h-2 md:w-3 md:h-3 bg-gray-800 rounded-full shadow-inner z-10" />
                          <div className="absolute w-full h-1 bg-gray-800/80 rotate-0"></div>
                          <div className="absolute w-full h-1 bg-gray-800/80 rotate-60"></div>
                          <div className="absolute w-full h-1 bg-gray-800/80 rotate-120"></div>
                        </div>
                      </div>
                    </div>

                    {/* Bottom Label Text */}
                    <div className={`absolute bottom-2 md:bottom-3 w-full px-4 md:px-8 flex justify-between items-end ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      <div className="font-bold tracking-tighter drop-shadow-md" style={{ fontFamily: "'Caveat', cursive", fontSize: '2rem', lineHeight: '0.8' }}>SQAC</div>
                      <div className="text-[6px] md:text-[9px] font-sans font-bold leading-tight text-center drop-shadow-sm">
                        Quality Audio Tape Cassette<br />
                        <span className="font-normal opacity-90">High Output / Low Noise / Normal Position</span>
                      </div>
                      <div className="text-xl md:text-3xl font-black font-sans tracking-tighter drop-shadow-md">C-90</div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* The Glass Lid */}
              <motion.div
                initial={{ rotateX: 60 }}
                animate={{ rotateX: cinemaMode === 'idle' ? 60 : 0 }}
                transition={{ duration: 1.2, type: 'spring', bounce: 0.3 }}
                style={{ transformOrigin: "bottom" }}
                className={`absolute inset-3 md:inset-6 z-40 rounded-[2rem] border-[3px] flex items-end justify-center pb-4 pointer-events-none transition-all duration-500 shadow-[inset_0_20px_50px_rgba(255,255,255,0.1)] ${cinemaMode === 'idle'
                  ? (isDarkMode ? 'bg-white/5 border-white/20 backdrop-blur-[1px]' : 'bg-white/10 border-white/40 backdrop-blur-[1px]')
                  : (isDarkMode ? 'bg-black/30 border-white/30 backdrop-blur-sm shadow-[inset_0_2px_15px_rgba(0,0,0,0.8)]' : 'bg-white/30 border-white/60 backdrop-blur-sm shadow-[inset_0_2px_15px_rgba(0,0,0,0.2)]')
                  }`}
              >
                {/* Glass reflection line */}
                <div className={`absolute top-2 left-4 right-4 h-8 rounded-t-[1.5rem] bg-gradient-to-b from-white/20 to-transparent pointer-events-none transition-opacity ${cinemaMode === 'idle' ? 'opacity-100' : 'opacity-40'}`} />

                {/* Lid latch/handle */}
                <div className={`w-24 h-3 rounded-full shadow-inner z-10 transition-colors ${cinemaMode === 'idle' ? (isDarkMode ? 'bg-white/20' : 'bg-black/10') : (isDarkMode ? 'bg-gray-800' : 'bg-gray-300')}`} />
              </motion.div>
            </div>
          </div>
        </div>

        {/* Skeuomorphic Control Panel */}
        <div className="mt-8 z-30 wood-panel rounded-[2rem] p-1.5 md:p-2 lg:p-3 relative shadow-[0_20px_40px_rgba(0,0,0,0.8)]">

          <div className="copper-face rounded-xl p-3 md:p-4 lg:p-5 flex flex-col relative">
            {/* Screws */}
            <div className="absolute top-2 left-2 w-2 h-2 md:w-3 md:h-3 rounded-full bg-[#3a1a11] shadow-[inset_0_1px_2px_rgba(0,0,0,0.8),0_1px_1px_rgba(255,255,255,0.4)] flex items-center justify-center"><div className="w-full h-[1px] bg-black rotate-45" /></div>
            <div className="absolute top-2 right-2 w-2 h-2 md:w-3 md:h-3 rounded-full bg-[#3a1a11] shadow-[inset_0_1px_2px_rgba(0,0,0,0.8),0_1px_1px_rgba(255,255,255,0.4)] flex items-center justify-center"><div className="w-full h-[1px] bg-black -rotate-12" /></div>
            <div className="absolute bottom-2 left-2 w-2 h-2 md:w-3 md:h-3 rounded-full bg-[#3a1a11] shadow-[inset_0_1px_2px_rgba(0,0,0,0.8),0_1px_1px_rgba(255,255,255,0.4)] flex items-center justify-center"><div className="w-full h-[1px] bg-black rotate-90" /></div>
            <div className="absolute bottom-2 right-2 w-2 h-2 md:w-3 md:h-3 rounded-full bg-[#3a1a11] shadow-[inset_0_1px_2px_rgba(0,0,0,0.8),0_1px_1px_rgba(255,255,255,0.4)] flex items-center justify-center"><div className="w-full h-[1px] bg-black rotate-180" /></div>

            {/* Button Array */}
            <div className="flex items-center justify-center gap-2 md:gap-4 lg:gap-6">

              {/* PLAY Button */}
              <div className="flex flex-col items-center gap-2 md:gap-3">
                <div className="flex flex-col items-center gap-1">
                  <span className="text-[8px] md:text-[10px] text-[#4a1f14] font-bold">1</span>
                  <div className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-all duration-300 ${cinemaMode !== 'idle' ? 'led-on' : 'led-light'}`} />
                </div>
                <button
                  onClick={handlePlay}
                  disabled={cinemaMode !== 'idle'}
                  className={`w-20 h-12 md:w-28 md:h-16 lg:w-32 lg:h-20 mech-button flex items-center justify-center p-1 md:p-1.5 focus:outline-none ${cinemaMode !== 'idle' ? 'active-pressed' : ''}`}
                >
                  <div className={`w-[80%] h-full rounded-full mech-button-dimple flex items-center justify-center transition-all duration-300 ${cinemaMode !== 'idle' ? 'text-[#ffaa55] drop-shadow-[0_0_8px_rgba(255,170,85,0.8)]' : 'text-white/50'}`}>
                    <Play className="w-5 h-5 md:w-7 md:h-7 opacity-90 drop-shadow-md" fill="currentColor" />
                  </div>
                </button>
                <span className="text-[9px] md:text-[11px] text-[#4a1f14] font-bold tracking-widest mt-1">PLAY</span>
              </div>

              {/* REW Button */}
              <div className="flex flex-col items-center gap-2 md:gap-3">
                <div className="flex flex-col items-center gap-1">
                  <span className="text-[8px] md:text-[10px] text-[#4a1f14] font-bold">2</span>
                  <div className="w-2 h-2 md:w-3 md:h-3 rounded-full led-light" />
                </div>
                <button
                  onClick={handlePrev}
                  disabled={selectedEventId === events[0].id || cinemaMode !== 'idle'}
                  className="w-20 h-12 md:w-28 md:h-16 lg:w-32 lg:h-20 mech-button flex items-center justify-center p-1 md:p-1.5 focus:outline-none"
                >
                  <div className="w-[80%] h-full rounded-full mech-button-dimple flex items-center justify-center text-white/50 hover:text-[#ffaa55] transition-all duration-300">
                    <Rewind className="w-5 h-5 md:w-7 md:h-7 opacity-90 drop-shadow-md" fill="currentColor" />
                  </div>
                </button>
                <span className="text-[9px] md:text-[11px] text-[#4a1f14] font-bold tracking-widest mt-1">REW</span>
              </div>

              {/* FF Button */}
              <div className="flex flex-col items-center gap-2 md:gap-3">
                <div className="flex flex-col items-center gap-1">
                  <span className="text-[8px] md:text-[10px] text-[#4a1f14] font-bold">3</span>
                  <div className="w-2 h-2 md:w-3 md:h-3 rounded-full led-light" />
                </div>
                <button
                  onClick={handleNext}
                  disabled={selectedEventId === events[events.length - 1].id || cinemaMode !== 'idle'}
                  className="w-20 h-12 md:w-28 md:h-16 lg:w-32 lg:h-20 mech-button flex items-center justify-center p-1 md:p-1.5 focus:outline-none"
                >
                  <div className="w-[80%] h-full rounded-full mech-button-dimple flex items-center justify-center text-white/50 hover:text-[#ffaa55] transition-all duration-300">
                    <FastForward className="w-5 h-5 md:w-7 md:h-7 opacity-90 drop-shadow-md" fill="currentColor" />
                  </div>
                </button>
                <span className="text-[9px] md:text-[11px] text-[#4a1f14] font-bold tracking-widest mt-1">FF</span>
              </div>

              {/* STOP Button */}
              <div className="flex flex-col items-center gap-2 md:gap-3">
                <div className="flex flex-col items-center gap-1">
                  <span className="text-[8px] md:text-[10px] text-[#4a1f14] font-bold">4</span>
                  <div className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-all duration-300 ${cinemaMode === 'idle' ? 'led-on' : 'led-light'}`} />
                </div>
                <button
                  onClick={handleStop}
                  className="w-20 h-12 md:w-28 md:h-16 lg:w-32 lg:h-20 mech-button flex items-center justify-center p-1 md:p-1.5 focus:outline-none"
                >
                  <div className={`w-[80%] h-full rounded-full mech-button-dimple flex items-center justify-center transition-all duration-300 ${cinemaMode === 'idle' ? 'text-[#ffaa55] drop-shadow-[0_0_8px_rgba(255,170,85,0.8)]' : 'text-white/50'}`}>
                    <Square className="w-5 h-5 md:w-7 md:h-7 opacity-90 drop-shadow-md" fill="currentColor" />
                  </div>
                </button>
                <span className="text-[9px] md:text-[11px] text-[#4a1f14] font-bold tracking-widest mt-1">STOP</span>
              </div>

            </div>
          </div>
        </div>

        {/* Cassette Tray / Rack */}
        <div className="w-full mt-16 max-w-4xl z-30">
          <div className="flex items-center gap-4 mb-4 px-4">
            <h3 className="text-xl font-bold opacity-80 uppercase tracking-widest">Cassette Collection</h3>
            <div className="h-[2px] flex-1 bg-gray-500/30 rounded-full" />
          </div>

          <div className="flex overflow-x-auto pb-8 pt-4 px-4 gap-6 snap-x snap-mandatory hide-scrollbar">
            {events.map((evt) => (
              <motion.div
                key={evt.id}
                whileHover={cinemaMode === 'idle' ? { y: -10 } : {}}
                whileTap={cinemaMode === 'idle' ? { scale: 0.95 } : {}}
                onClick={() => {
                  if (cinemaMode === 'idle') {
                    setSelectedEventId(evt.id);
                  }
                }}
                className={`snap-center shrink-0 relative w-48 h-32 rounded-[10px] shadow-xl border-[3px] flex flex-col items-center justify-center transition-all ${cinemaMode !== 'idle' ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'} ${selectedEventId === evt.id
                  ? 'ring-4 ring-orange-500 scale-105'
                  : 'opacity-70 hover:opacity-100'
                  } ${isDarkMode ? 'bg-gradient-to-br from-black to-[#7A1E2C]/80 backdrop-blur-md border-[#8b5a2b]/30' : 'bg-[#E19B83] border-[#C37E68]'}`}
              >
                {/* Mini Label */}
                <div
                  className={`relative w-[90%] h-[70%] rounded-md shadow-sm border border-white/20 flex flex-col items-center p-1 mt-1`}
                  style={{
                    backgroundImage: `linear-gradient(${evt.labelColor}, ${evt.labelColor}), url(${evt.image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                >
                  <span className={`text-[10px] font-bold drop-shadow-md line-clamp-1 leading-tight text-center ${isDarkMode ? 'text-white' : 'text-gray-900'}`} style={{ fontFamily: "'Caveat', cursive" }}>{evt.title}</span>

                  {/* Mini Spools */}
                  <div className="w-3/4 h-8 bg-[#111] rounded-full mt-1.5 flex justify-between items-center px-3 border-[2px] border-gray-800 shadow-inner">
                    <div className="w-2.5 h-2.5 rounded-full bg-gray-200 flex items-center justify-center">
                      <div className="w-1 h-1 bg-gray-800 rounded-full" />
                    </div>
                    <div className="w-2.5 h-2.5 rounded-full bg-gray-200 flex items-center justify-center">
                      <div className="w-1 h-1 bg-gray-800 rounded-full" />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          <style>{`
            .hide-scrollbar::-webkit-scrollbar {
              display: none;
            }
            .hide-scrollbar {
              -ms-overflow-style: none;
              scrollbar-width: none;
            }
          `}</style>
        </div>
      </div>

      {/* Fullscreen Cinema Overlay */}
      <AnimatePresence>
        {(cinemaMode === 'countdown' || cinemaMode === 'slideshow') && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-50 bg-black flex items-center justify-center"
          >

            {/* Countdown State */}
            {cinemaMode === 'countdown' && (
              <div className="relative flex items-center justify-center w-full h-full">
                {/* Film grain effect */}
                <div className="absolute inset-0 opacity-20 mix-blend-screen pointer-events-none" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/stardust.png")' }}></div>

                {/* Countdown circle */}
                <div className="relative w-64 h-64 border-4 border-white/50 rounded-full flex items-center justify-center">
                  {/* Rotating lines */}
                  <div className="absolute inset-0 border-t-4 border-white rounded-full cinema-line" />
                  <div className="absolute w-full h-[2px] bg-white/30 rotate-0" />
                  <div className="absolute w-full h-[2px] bg-white/30 rotate-90" />

                  {/* Number */}
                  <motion.span
                    key={countdownValue}
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 1.5, opacity: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-8xl font-black text-white font-mono drop-shadow-[0_0_15px_rgba(255,255,255,0.8)]"
                  >
                    {countdownValue}
                  </motion.span>
                </div>
              </div>
            )}

            {/* Slideshow State */}
            {cinemaMode === 'slideshow' && (
              <div className="relative w-full h-full flex items-center justify-center overflow-hidden">

                {/* Background Slideshow (Ken Burns Effect) */}
                <AnimatePresence mode="wait">
                  <motion.img
                    key={currentSlideIndex}
                    src={selectedEvent.slideshowImages[currentSlideIndex]}
                    initial={{ opacity: 0, scale: 1.2, x: '2%', y: '2%' }}
                    animate={{ opacity: 1, scale: 1, x: '0%', y: '0%' }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 5, ease: "linear" }}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </AnimatePresence>

                {/* Cinematic Overlays */}
                <div className="absolute inset-0 z-10 pointer-events-none">
                  {/* Top & Bottom Cinematic Black Bars */}
                  <div className="absolute top-0 w-full h-[10vh] bg-black shadow-[0_10px_30px_rgba(0,0,0,0.8)]"></div>
                  <div className="absolute bottom-0 w-full h-[10vh] bg-black shadow-[0_-10px_30px_rgba(0,0,0,0.8)]"></div>

                  {/* Vignette */}
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.7)_100%)]"></div>

                  {/* Film Grain */}
                  <div className="absolute inset-0 opacity-30 mix-blend-screen" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/stardust.png")' }}></div>

                  {/* Flickering Light Effect */}
                  <style>
                    {`
                      @keyframes flicker {
                        0% { opacity: 0; }
                        5% { opacity: 0.05; }
                        10% { opacity: 0; }
                        15% { opacity: 0.08; }
                        20% { opacity: 0; }
                        50% { opacity: 0; }
                        55% { opacity: 0.04; }
                        100% { opacity: 0; }
                      }
                      .animate-flicker {
                        animation: flicker 4s infinite;
                      }
                    `}
                  </style>
                  <div className="absolute inset-0 bg-white animate-flicker mix-blend-overlay"></div>
                </div>

                {/* CC Button */}
                <button
                  onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                  className="absolute bottom-8 right-8 px-6 py-3 bg-black/50 hover:bg-black/80 backdrop-blur-md rounded-full text-white font-bold tracking-widest border border-white/20 transition-all z-20 flex items-center gap-2 hover:scale-105"
                >
                  CC <span className="text-xs font-normal opacity-70">INFO</span>
                </button>

                {/* Sidebar Overlay */}
                <AnimatePresence>
                  {isSidebarOpen && (
                    <motion.div
                      initial={{ x: '100%' }}
                      animate={{ x: 0 }}
                      exit={{ x: '100%' }}
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      className="absolute top-0 right-0 w-full md:w-[400px] h-full bg-[#09090b] border-l border-white/5 z-30 p-8 flex flex-col justify-center shadow-2xl"
                    >
                      <button onClick={() => setIsSidebarOpen(false)} className="absolute top-6 right-6 p-2 bg-[#1f1f22] hover:bg-[#27272a] rounded-full text-gray-400 hover:text-white transition-colors flex items-center justify-center">
                        <X className="w-5 h-5" />
                      </button>

                      <h2 className="text-4xl md:text-[42px] font-black text-white mb-2 tracking-tight leading-none">{selectedEvent.title}</h2>
                      <p className="text-[15px] text-gray-400 mb-10 font-medium">{selectedEvent.description}</p>

                      {selectedEvent.date && selectedEvent.date !== "Coming Soon" && (
                        <div className="flex flex-col gap-3 mb-10">
                          <div className="flex items-center gap-4 bg-[#18181b] border border-white/5 rounded-xl px-5 py-4">
                            <Calendar className="w-5 h-5 text-pink-500" />
                            <span className="text-[14px] font-bold text-gray-100 tracking-wide">{selectedEvent.date}</span>
                          </div>
                          <div className="flex items-center gap-4 bg-[#18181b] border border-white/5 rounded-xl px-5 py-4">
                            <MapPin className="w-5 h-5 text-purple-500" />
                            <span className="text-[14px] font-bold text-gray-100 tracking-wide">{selectedEvent.venue}</span>
                          </div>
                        </div>
                      )}

                      {selectedEvent.link && (
                        <a
                          href={selectedEvent.link}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center justify-center gap-2 w-full py-4 rounded-xl text-[16px] font-bold shadow-[0_0_40px_rgba(168,85,247,0.3)] hover:scale-[1.02] transition-transform bg-[#9d00ff] hover:bg-[#8b00e6] text-white"
                        >
                          Explore Event <ArrowRight className="w-5 h-5" />
                        </a>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Close Button (Exits Cinema) */}
                <button
                  onClick={() => {
                    setCinemaMode('idle');
                    setIsSidebarOpen(false);
                  }}
                  className="absolute top-8 right-8 p-4 bg-white/10 hover:bg-white/30 backdrop-blur-md rounded-full text-white transition-all hover:rotate-90 z-20"
                >
                  <X className="w-8 h-8" />
                </button>
              </div>
            )}

          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Events;
