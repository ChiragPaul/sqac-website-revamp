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
    if(cinemaMode !== "idle") return;
    setCinemaMode("spooling");
    setTimeout(() => {
      setCinemaMode("countdown");
    }, 4000); // Wait 4s for slower spooling animation
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
          
          .metal-panel {
            background: linear-gradient(to bottom, #e0e0e0 0%, #ffffff 20%, #c0c0c0 100%);
            box-shadow: 0 4px 15px rgba(0,0,0,0.4), inset 0 2px 3px rgba(255,255,255,0.8);
            border: 1px solid #999;
          }

          .metal-button {
            background: linear-gradient(to bottom, #f8f8f8 0%, #e0e0e0 100%);
            box-shadow: inset 0 1px 2px rgba(255,255,255,0.9), 0 2px 4px rgba(0,0,0,0.3);
            border-right: 1px solid #aaa;
            border-bottom: 1px solid #999;
            transition: all 0.1s;
          }
          .metal-button:active {
            background: linear-gradient(to bottom, #d0d0d0 0%, #f0f0f0 100%);
            box-shadow: inset 0 2px 5px rgba(0,0,0,0.5);
          }

          @keyframes spool-out {
            0% { right: 50%; width: 0; }
            100% { right: 50%; width: 100vw; }
          }
          .animate-spool {
            animation: spool-out 4s linear forwards;
          }
          .cinema-line {
            animation: spin-slow 2s linear infinite;
          }
        `}
      </style>

      {/* Main Container */}
      <div className={`w-full max-w-5xl mx-auto flex flex-col items-center z-10 transition-opacity duration-500 ${(cinemaMode === 'countdown' || cinemaMode === 'slideshow') ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
        
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-black font-sans tracking-tight">Events Selection</h1>
        </div>

        {/* Spooling Tape Line (Film Strip Style) */}
        {cinemaMode === "spooling" && (
          <div className={`absolute top-[40%] right-1/2 h-8 md:h-12 z-20 animate-spool transform -translate-y-1/2 origin-right border-y-[3px] border-dashed border-gray-300 ${isDarkMode ? 'bg-[#222] shadow-[0_0_30px_rgba(255,255,255,0.2)]' : 'bg-[#111] shadow-[0_10px_20px_rgba(0,0,0,0.6)]'}`} />
        )}

        {/* The Realistic Cassette Player */}
        <motion.div 
          key={selectedEvent.id}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
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
              {/* Background arcs */}
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

          {/* Trapezoid Cutout for tape reading (Removed) */}
        </motion.div>

        {/* The Metal Control Panel */}
        <div className="mt-8 metal-panel rounded-lg flex items-center p-1 md:p-1.5 z-30">
          
          <button 
            onClick={handlePlay}
            disabled={cinemaMode !== 'idle'}
            className="metal-button w-20 md:w-28 h-10 md:h-12 flex items-center justify-center gap-1.5 rounded-l-md font-sans text-[10px] md:text-xs font-bold text-gray-700 hover:text-black focus:outline-none disabled:opacity-50"
          >
            <Play className="w-3 h-3 md:w-4 md:h-4" fill="currentColor" /> PLAY
          </button>
          
          <button 
            onClick={handlePrev}
            disabled={selectedEventId === events[0].id || cinemaMode !== 'idle'}
            className="metal-button w-20 md:w-28 h-10 md:h-12 flex items-center justify-center gap-1.5 font-sans text-[10px] md:text-xs font-bold text-gray-700 hover:text-black focus:outline-none disabled:opacity-50"
          >
            <Rewind className="w-3 h-3 md:w-4 md:h-4" fill="currentColor" /> REW
          </button>
          
          <button 
            onClick={handleNext}
            disabled={selectedEventId === events[events.length - 1].id || cinemaMode !== 'idle'}
            className="metal-button w-20 md:w-28 h-10 md:h-12 flex items-center justify-center gap-1.5 font-sans text-[10px] md:text-xs font-bold text-gray-700 hover:text-black focus:outline-none disabled:opacity-50"
          >
            <FastForward className="w-3 h-3 md:w-4 md:h-4" fill="currentColor" /> FF
          </button>

          <button 
            onClick={handleStop}
            className="metal-button w-20 md:w-28 h-10 md:h-12 flex items-center justify-center gap-1.5 rounded-r-md font-sans text-[10px] md:text-xs font-bold text-gray-700 hover:text-black focus:outline-none"
            style={{ borderRight: 'none' }}
          >
            <Square className="w-3 h-3 md:w-4 md:h-4" fill="currentColor" /> STOP
          </button>
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
                className={`snap-center shrink-0 relative w-48 h-32 rounded-[10px] shadow-xl border-[3px] flex flex-col items-center justify-center transition-all ${cinemaMode !== 'idle' ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'} ${
                  selectedEventId === evt.id 
                    ? 'ring-4 ring-orange-500 scale-105' 
                    : 'opacity-70 hover:opacity-100'
                } ${isDarkMode ? 'bg-gradient-to-br from-[#0f0f0f]/80 to-[#5a2128]/80 backdrop-blur-md border-white/10' : 'bg-[#E19B83] border-[#C37E68]'}`}
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
                
                {/* Background Slideshow */}
                <AnimatePresence mode="wait">
                  <motion.img
                    key={currentSlideIndex}
                    src={selectedEvent.slideshowImages[currentSlideIndex]}
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 3 }}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </AnimatePresence>

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
                      className="absolute top-0 right-0 w-full md:w-[400px] h-full bg-black/80 backdrop-blur-2xl border-l border-white/10 z-30 p-8 flex flex-col justify-center"
                    >
                      <button onClick={() => setIsSidebarOpen(false)} className="absolute top-8 right-8 p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors flex items-center justify-center shadow-lg">
                        <X className="w-6 h-6" />
                      </button>
                      
                      <h2 className="text-4xl md:text-5xl font-black text-white mb-6 tracking-tight drop-shadow-lg">{selectedEvent.title}</h2>
                      <p className="text-lg text-gray-300 mb-8 leading-relaxed">{selectedEvent.description}</p>
                      
                      {selectedEvent.date && selectedEvent.date !== "Coming Soon" && (
                        <div className="flex flex-col gap-4 mb-10">
                          <div className="flex items-center gap-4 bg-white/10 rounded-xl px-5 py-3">
                            <Calendar className="w-5 h-5 text-pink-400" />
                            <span className="text-base font-bold text-white">{selectedEvent.date}</span>
                          </div>
                          <div className="flex items-center gap-4 bg-white/10 rounded-xl px-5 py-3">
                            <MapPin className="w-5 h-5 text-purple-400" />
                            <span className="text-base font-bold text-white">{selectedEvent.venue}</span>
                          </div>
                        </div>
                      )}

                      {selectedEvent.link && (
                        <a 
                          href={selectedEvent.link} 
                          target="_blank" 
                          rel="noreferrer"
                          className="inline-flex items-center justify-center gap-3 w-full py-4 rounded-xl text-lg font-black shadow-[0_0_20px_rgba(168,85,247,0.4)] hover:scale-105 transition-transform bg-purple-600 text-white"
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
