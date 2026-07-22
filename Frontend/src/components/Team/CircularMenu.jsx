import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain, Code, Smartphone, Briefcase, Handshake, Film, Calendar, Shield, ChevronLeft, ChevronDown } from 'lucide-react';

const polarToCartesian = (cx, cy, radius, angleInDegrees) => {
  const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;
  return {
    x: cx + radius * Math.cos(angleInRadians),
    y: cy + radius * Math.sin(angleInRadians),
  };
};

const getSegmentPath = (cx, cy, r_in, r_out, startAngle, endAngle) => {
  const p_out_start = polarToCartesian(cx, cy, r_out, startAngle);
  const p_out_end = polarToCartesian(cx, cy, r_out, endAngle);
  const p_in_end = polarToCartesian(cx, cy, r_in, endAngle);
  const p_in_start = polarToCartesian(cx, cy, r_in, startAngle);

  const largeArcFlag = Math.abs(endAngle - startAngle) > 180 ? 1 : 0;

  return [
    `M ${p_out_start.x} ${p_out_start.y}`,
    `A ${r_out} ${r_out} 0 ${largeArcFlag} 1 ${p_out_end.x} ${p_out_end.y}`,
    `L ${p_in_end.x} ${p_in_end.y}`,
    `A ${r_in} ${r_in} 0 ${largeArcFlag} 0 ${p_in_start.x} ${p_in_start.y}`,
    `Z`,
  ].join(' ');
};

export default function CircularMenu({ activeFilter, activeSubFilter, onChangeFilter, darkMode }) {
  const [hoveredId, setHoveredId] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [dragRotation, setDragRotation] = useState(0);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    setIsExpanded(false);
  }, [activeFilter, activeSubFilter]);

  const lightGradients = [
    { from: '#C4325F', to: '#D9566E' },
    { from: '#C94970', to: '#D97070' },
    { from: '#C75E74', to: '#D98E6B' },
    { from: '#C96E73', to: '#D9947A' },
    { from: '#C56B82', to: '#D9A66A' }
  ];

  const darkGradients = [
    { from: '#A82855', to: '#C4325F' },
    { from: '#C46282', to: '#C97880' },
    { from: '#C97880', to: '#D9947A' },
    { from: '#D9947A', to: '#D9A66A' },
    { from: '#D9A66A', to: '#D98D5A' }
  ];

  const gradients = darkMode ? darkGradients : lightGradients;

  const segments = [
    { id: 'webdev', label: 'Web Dev', filter: 'Technical', subFilter: 'WEB DEV', icon: Code, gradientIndex: 0 },
    { id: 'appdev', label: 'App Dev', filter: 'Technical', subFilter: 'APP DEV', icon: Smartphone, gradientIndex: 1 },
    { id: 'corporate', label: 'Corporate', filter: 'Corporate', subFilter: 'All', icon: Briefcase, gradientIndex: 2 },
    { id: 'sponsorships', label: 'Sponsorships', filter: 'Corporate', subFilter: 'SPONSORSHIP', icon: Handshake, gradientIndex: 3 },
    { id: 'media', label: 'Media', filter: 'Media', subFilter: 'All', icon: Film, gradientIndex: 4 },
    { id: 'events', label: 'Events', filter: 'Corporate', subFilter: 'EVENTS', icon: Calendar, gradientIndex: 1 },
    { id: 'board', label: 'Board', filter: 'Board', subFilter: 'All', icon: Shield, gradientIndex: 0 },
    { id: 'aiml', label: 'AI / ML', filter: 'Technical', subFilter: 'AI/ML', icon: Brain, gradientIndex: 3 },
  ];

  const cx = 200;
  const cy = 200;
  const r_out = 190;
  const r_in = 110;
  const N = segments.length;
  const degPerSegment = 360 / N;
  const gapDeg = 2.5;

  const activeSegmentIndex = segments.findIndex(
    (s) => s.filter === activeFilter && s.subFilter === activeSubFilter
  );
  const activeIdx = activeSegmentIndex >= 0 ? activeSegmentIndex : 0;
  const rotationAngle = isMobile ? 180 - (activeIdx * degPerSegment + degPerSegment / 2) : 0;

  const handlePan = (e, info) => {
    if (!isMobile) return;
    const dy = info.delta.y;
    setDragRotation((prev) => prev - dy * 0.45);
  };

  const handlePanEnd = (e, info) => {
    if (!isMobile) return;
    const finalRotation = rotationAngle + dragRotation;
    const targetAngle = (180 - finalRotation + 360 * 10) % 360;
    const nearestIdx = Math.round((targetAngle - 22.5) / degPerSegment);
    const normalizedIdx = ((nearestIdx % N) + N) % N;

    const newSeg = segments[normalizedIdx];
    if (newSeg) {
      onChangeFilter(newSeg.filter, newSeg.subFilter);
    }
    setDragRotation(0);
  };

  const displayRotation = rotationAngle + dragRotation;

  const activeSegment = segments.find(
    (s) => s.filter === activeFilter && s.subFilter === activeSubFilter
  ) || segments.find((s) => s.filter === activeFilter) || segments[0];

  const hoveredSegment = hoveredId ? segments.find((s) => s.id === hoveredId) : null;
  const getSegmentColor = (seg) => gradients[seg.gradientIndex].from;
  const activeColor = getSegmentColor(activeSegment);
  const hoveredColor = hoveredSegment ? getSegmentColor(hoveredSegment) : null;

  const centerValue = hoveredSegment ? hoveredSegment.label : activeSegment.label;
  const centerColor = hoveredSegment ? hoveredColor : activeColor;
  const centerGlowColor = `${centerColor}aa`;

  const ActiveIcon = activeSegment.icon;

  // Mobile layout styles
  const mobileContainerStyle = {
    top: '70px',
    left: '50%',
    transform: 'translateX(-50%)',
    width: 'auto',
  };

  // Desktop layout styles
  const desktopContainerStyle = {
    top: 'clamp(8rem, 38vh, 18rem)',
    right: 0,
  };

  return (
    <>
      <AnimatePresence mode="wait">
        {!isExpanded ? (
          <motion.button
            key="collapsed-tab"
            initial={{ opacity: 0, ...(isMobile ? { y: -20 } : { x: 60 }) }}
            animate={{ opacity: 1, ...(isMobile ? { y: 0 } : { x: 0 }) }}
            exit={{ opacity: 0, ...(isMobile ? { y: -20 } : { x: 60 }) }}
            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
            onClick={() => setIsExpanded(true)}
            className={`fixed z-[200] flex ${isMobile ? 'flex-row items-center justify-between rounded-b-3xl border-b border-x w-[180px] h-[50px] px-4' : 'flex-col items-center justify-center rounded-l-full border-l border-y w-[60px] h-[160px] pl-1.5 pr-1 py-4'} shadow-2xl border-white/20 backdrop-blur-lg cursor-pointer transition-all duration-300 group`}
            style={{
              ...(isMobile ? mobileContainerStyle : desktopContainerStyle),
              background: `linear-gradient(135deg, ${activeColor}e0, ${activeColor}a0)`,
              boxShadow: `0 8px 32px 0 rgba(0, 0, 0, 0.3), inset 0 1px 0 0 rgba(255, 255, 255, 0.2)`
            }}
          >
            {isMobile ? (
              <>
                <ActiveIcon size={20} className="text-white drop-shadow-[0_0_6px_rgba(255,255,255,0.4)]" />
                <span className="text-[11px] font-black uppercase tracking-widest text-white select-none leading-none">
                  {activeSegment.label}
                </span>
                <ChevronDown className="w-4 h-4 text-white/80 animate-pulse group-hover:translate-y-0.5 transition-transform" />
              </>
            ) : (
              <>
                <ChevronLeft className="w-4 h-4 text-white/80 animate-pulse group-hover:-translate-x-0.5 transition-transform" />
                <ActiveIcon size={20} className="text-white drop-shadow-[0_0_6px_rgba(255,255,255,0.4)]" />
                <span
                  className="text-[9px] font-black uppercase tracking-widest text-white select-none text-center leading-none mt-1"
                  style={{ writingMode: 'vertical-rl', textOrientation: 'mixed', letterSpacing: '0.1em' }}
                >
                  {activeSegment.label}
                </span>
              </>
            )}
          </motion.button>
        ) : (
          <motion.div
            key="expanded-dial"
            initial={{ opacity: 0, scale: 0.8, ...(isMobile ? { y: -20 } : { x: 50 }) }}
            animate={{ opacity: 1, scale: 1, ...(isMobile ? { y: 0 } : { x: 0 }) }}
            exit={{ opacity: 0, scale: 0.8, ...(isMobile ? { y: -20 } : { x: 50 }) }}
            transition={{ type: 'spring', stiffness: 180, damping: 18 }}
            className={`fixed z-[250] ${isMobile ? 'left-1/2 -translate-x-1/2' : 'right-4 lg:right-10 top-1/2 -translate-y-1/2'}`}
            style={isMobile ? { top: '80px' } : {}}
          >
            <div className={`relative flex items-center justify-center select-none ${isMobile ? 'w-[280px] h-[280px]' : 'w-[200px] h-[200px] sm:w-[220px] sm:h-[220px] md:w-[240px] md:h-[240px] lg:w-[260px] lg:h-[260px] xl:w-[340px] xl:h-[340px]'} mx-auto filter drop-shadow-2xl`}>
              
              <div
                className="absolute inset-0 rounded-full transition-all duration-500 blur-[50px] opacity-20 pointer-events-none"
                style={{ background: `radial-gradient(circle, ${centerColor} 0%, transparent 70%)` }}
              />

              {isMobile && (
                <div
                  className="fixed inset-0 w-screen h-screen bg-black/40 backdrop-blur-sm -z-10"
                  style={{ transform: 'translate(-50%, -50px)' }} // roughly centers background block
                  onClick={() => setIsExpanded(false)}
                />
              )}

              <motion.svg
                width="100%"
                height="100%"
                viewBox="0 0 400 400"
                className="overflow-visible relative z-10 cursor-grab active:cursor-grabbing"
                onPan={handlePan}
                onPanEnd={handlePanEnd}
              >
                <defs>
                  {gradients.map((grad, idx) => (
                    <linearGradient id={`seg-grad-${idx}`} key={idx} x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor={grad.from} />
                      <stop offset="100%" stopColor={grad.to} />
                    </linearGradient>
                  ))}
                </defs>

                <motion.g
                  animate={{ rotate: displayRotation }}
                  transition={{ type: 'spring', stiffness: 120, damping: 20 }}
                  style={{ transformOrigin: `${cx}px ${cy}px` }}
                >
                  {segments.map((seg, i) => {
                    const Icon = seg.icon;
                    const startAngle = i * degPerSegment + gapDeg / 2;
                    const endAngle = (i + 1) * degPerSegment - gapDeg / 2;
                    const midAngle = i * degPerSegment + degPerSegment / 2;
                    const midAngleRad = ((midAngle - 90) * Math.PI) / 180;

                    const isHovered = hoveredId === seg.id;
                    const isActive = activeSegment?.id === seg.id;
                    const segColor = getSegmentColor(seg);

                    const offsetDist = isHovered ? 8 : (isActive ? 4 : 0);
                    const tx = Math.cos(midAngleRad) * offsetDist;
                    const ty = Math.sin(midAngleRad) * offsetDist;

                    const textRadius = (r_in + r_out) / 2;
                    const pt = polarToCartesian(cx, cy, textRadius, midAngle);
                    const pathData = getSegmentPath(cx, cy, r_in, r_out, startAngle, endAngle);

                    return (
                      <motion.g
                        key={seg.id}
                        animate={{ x: tx, y: ty }}
                        transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                        className="cursor-pointer"
                        onMouseEnter={() => setHoveredId(seg.id)}
                        onMouseLeave={() => setHoveredId(null)}
                        onClick={() => {
                          onChangeFilter(seg.filter, seg.subFilter);
                          if(isMobile) setIsExpanded(false);
                        }}
                      >
                        <path
                          d={pathData}
                          style={{
                            fill: darkMode ? 'rgba(23, 23, 28, 0.7)' : 'rgba(255, 255, 255, 0.75)',
                            stroke: darkMode ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.08)',
                            strokeWidth: 1,
                          }}
                        />

                        <motion.path
                          d={pathData}
                          animate={{
                            fillOpacity: isActive ? 1.0 : (isHovered ? 0.25 : 0.0),
                            stroke: isActive || isHovered ? segColor : (darkMode ? 'rgba(255, 255, 255, 0.0)' : 'rgba(0, 0, 0, 0.0)'),
                            strokeWidth: isActive || isHovered ? 2.5 : 0,
                            filter: isActive || isHovered ? `drop-shadow(0 0 8px ${segColor}88)` : 'none',
                          }}
                          transition={{ duration: 0.35, ease: 'easeInOut' }}
                          style={{ fill: `url(#seg-grad-${seg.gradientIndex})` }}
                        />

                        <g transform={`translate(${pt.x}, ${pt.y})`}>
                          <motion.g
                            animate={{ rotate: -displayRotation }}
                            transition={{ type: 'spring', stiffness: 120, damping: 20 }}
                            style={{ transformOrigin: '0px 0px' }}
                          >
                            <g transform="translate(-12, -26)">
                              <Icon
                                size={24}
                                className="transition-colors duration-300"
                                style={{
                                  color: isActive ? '#ffffff' : (isHovered ? segColor : (darkMode ? 'rgba(255, 255, 255, 0.5)' : 'rgba(0, 0, 0, 0.5)')),
                                  filter: isActive ? 'drop-shadow(0 0 4px rgba(255, 255, 255, 0.6))' : 'none'
                                }}
                              />
                            </g>

                            <text
                              textAnchor="middle"
                              y="18"
                              className="font-bold text-[10px] tracking-wide select-none transition-colors duration-300"
                              style={{
                                fill: isActive ? '#ffffff' : (isHovered ? (darkMode ? '#ffffff' : '#000000') : (darkMode ? 'rgba(255, 255, 255, 0.6)' : 'rgba(0, 0, 0, 0.6)')),
                                filter: isActive ? 'drop-shadow(0 0 3px rgba(255, 255, 255, 0.5))' : 'none'
                              }}
                            >
                              {seg.label}
                            </text>
                          </motion.g>
                        </g>
                      </motion.g>
                    );
                  })}
                </motion.g>

                <g
                  className="cursor-pointer relative z-20"
                  onClick={() => setIsExpanded(false)}
                >
                  <motion.circle
                    cx={cx}
                    cy={cy}
                    r={r_in - 2}
                    fill="none"
                    animate={{ stroke: centerColor, filter: `drop-shadow(0 0 8px ${centerGlowColor})` }}
                    transition={{ duration: 0.35, ease: 'easeInOut' }}
                    style={{ strokeWidth: 2.5 }}
                  />
                  <circle
                    cx={cx}
                    cy={cy}
                    r={r_in - 5}
                    className="transition-colors duration-300"
                    style={{
                      fill: darkMode ? '#0e0e11' : '#ffffff',
                      stroke: darkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)',
                      strokeWidth: 1,
                    }}
                  />
                  <path
                    d={`M ${cx - 50} ${cy} L ${cx + 50} ${cy} M ${cx} ${cy - 50} L ${cx} ${cy + 50}`}
                    stroke={darkMode ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.03)'}
                    strokeWidth={1}
                  />
                </g>
              </motion.svg>

              <div
                className={`absolute inset-0 flex flex-col items-center justify-center text-center p-3 transition-transform duration-300 z-20 cursor-pointer`}
                onClick={() => setIsExpanded(false)}
              >
                <h4
                  className="text-[14px] sm:text-xs md:text-sm lg:text-base font-black tracking-tight leading-tight transition-all duration-300 capitalize text-center uppercase"
                  style={{
                    color: centerColor,
                    textShadow: `0 0 10px ${centerColor}44`,
                  }}
                >
                  {centerValue}
                </h4>
                <motion.div
                  className="w-8 h-[2px] mt-2 rounded-full pointer-events-none hidden sm:block"
                  animate={{ backgroundColor: centerColor, boxShadow: `0 0 8px ${centerColor}` }}
                  transition={{ duration: 0.35, ease: 'easeInOut' }}
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
