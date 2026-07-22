import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function SwipeableMenu({ activeFilter, activeSubFilter, onChangeFilter, darkMode }) {
  const scrollRef = useRef(null);
  
  const segments = [
    { id: 'board', label: 'Board', filter: 'Board', subFilter: 'All' },
    { id: 'webdev', label: 'Web Dev', filter: 'Technical', subFilter: 'WEB DEV' },
    { id: 'appdev', label: 'App Dev', filter: 'Technical', subFilter: 'APP DEV' },
    { id: 'aiml', label: 'AI / ML', filter: 'Technical', subFilter: 'AI/ML' },
    { id: 'corporate', label: 'Corporate', filter: 'Corporate', subFilter: 'All' },
    { id: 'sponsorships', label: 'Sponsorships', filter: 'Corporate', subFilter: 'SPONSORSHIP' },
    { id: 'events', label: 'Events', filter: 'Corporate', subFilter: 'EVENTS' },
    { id: 'media', label: 'Media', filter: 'Media', subFilter: 'All' },
  ];

  const activeIdx = Math.max(0, segments.findIndex(
    (s) => s.filter === activeFilter && s.subFilter === activeSubFilter
  ));

  useEffect(() => {
    if (scrollRef.current) {
      const activeEl = scrollRef.current.children[activeIdx];
      if (activeEl) {
        const containerWidth = scrollRef.current.offsetWidth;
        const elLeft = activeEl.offsetLeft;
        const elWidth = activeEl.offsetWidth;
        scrollRef.current.scrollTo({
          left: elLeft - containerWidth / 2 + elWidth / 2,
          behavior: 'smooth'
        });
      }
    }
  }, [activeIdx]);

  return (
    <div className="relative w-full overflow-hidden py-4 px-6 lg:px-8 mt-2 md:mt-4 mb-2 z-50">
      <div 
        ref={scrollRef}
        className="flex items-center gap-8 md:gap-12 overflow-x-auto no-scrollbar scroll-smooth snap-x snap-mandatory"
        style={{ 
          scrollbarWidth: 'none', 
          msOverflowStyle: 'none',
          paddingLeft: '45vw',
          paddingRight: '45vw'
        }}
      >
        {segments.map((seg, idx) => {
          const isActive = idx === activeIdx;
          return (
            <div 
              key={seg.id}
              onClick={() => onChangeFilter(seg.filter, seg.subFilter)}
              className={`snap-center shrink-0 cursor-pointer whitespace-nowrap transition-all duration-300 font-bold uppercase tracking-[0.15em] text-sm md:text-base ${
                isActive 
                  ? (darkMode ? 'text-white scale-110 drop-shadow-md' : 'text-[#7A1E2C] scale-110 drop-shadow-md')
                  : (darkMode ? 'text-white/30 hover:text-white/60' : 'text-gray-500/50 hover:text-gray-800')
              }`}
            >
              {seg.label}
              {isActive && (
                <motion.div 
                  layoutId="activeIndicator"
                  className={`h-[2px] w-full mt-1.5 rounded-full ${darkMode ? 'bg-yellow-400' : 'bg-[#7A1E2C]'}`}
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
              )}
            </div>
          );
        })}
      </div>
      
      {/* Fade Gradients for edge smooth transition */}
      <div className={`absolute top-0 bottom-0 left-0 w-16 md:w-32 bg-gradient-to-r ${darkMode ? 'from-black via-black/80 to-transparent' : 'from-[#F9E7C2] via-[#F9E7C2]/80 to-transparent'} pointer-events-none`} />
      <div className={`absolute top-0 bottom-0 right-0 w-16 md:w-32 bg-gradient-to-l ${darkMode ? 'from-black via-black/80 to-transparent' : 'from-[#F9E7C2] via-[#F9E7C2]/80 to-transparent'} pointer-events-none`} />
      
    </div>
  );
}
