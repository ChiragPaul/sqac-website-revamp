import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ReactCardFlip from 'react-card-flip';
//import { teamMembers } from '../data/teamData';
import { ChevronLeft, ChevronRight, ChevronDown, Linkedin, Github, Instagram, Users, Mouse } from 'lucide-react';
import { useTheme } from "../../contexts/ThemeContext";
import SwipeableMenu from './SwipeableMenu';
import CircularMenu from './CircularMenu';
import "./teamtheme.css";

const DARK_CARD_GRADIENTS = [
  'from-black to-[#7A1E2C]', 
  'from-black to-[#7A1E2C]',
  'from-black to-[#7A1E2C]',
  'from-black to-[#7A1E2C]',
  'from-black to-[#7A1E2C]'
];

const LIGHT_CARD_GRADIENTS = [
  'from-[#FF5A87] to-[#FF8689]', // Soft rose to Soft coral
  'from-[#FF8689] to-[#FFAF7E]', // Soft coral to Orange peach
  'from-[#FFAF7E] to-[#FFC970]', // Orange peach to Golden orange
  'from-[#FFC970] to-[#FFD663]', // Golden orange to Yellow orange
  'from-[#FFD663] to-[#FF8547]'  // Yellow orange to Vivid orange
];

const PLACEHOLDER_MEMBERS = [];

export default function Team({ darkMode: propDarkMode }) {
  const { isDarkMode } = useTheme();
  const darkMode = propDarkMode !== undefined ? propDarkMode : isDarkMode;

  const getDisplayDomain = (member) => {
    if (member.domain === 'Board') return 'Leadership';
    if (!member.subDomain) return member.domain;
    const sub = member.subDomain.trim();
    if (sub.toLowerCase() === 'ai/ml') return 'AI/ML';
    if (sub.toLowerCase() === 'pr') return 'PR';
    return sub
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  };

  const getSocialLinks = (member) => [
    { icon: <Linkedin className="w-4 h-4" />, url: member.linkedin, label: 'LinkedIn', color: 'hover:bg-[#0A66C2] hover:text-white border-white/20' },
    { icon: <Github className="w-4 h-4" />, url: member.github, label: 'GitHub', color: 'hover:bg-[#333] hover:text-white border-white/20' },
    { icon: <Instagram className="w-4 h-4" />, url: member.portfolio, label: 'Instagram', color: 'hover:bg-gradient-to-tr hover:from-yellow-400 hover:via-pink-500 hover:to-purple-600 hover:text-white border-white/20' },
  ];


  const [teamMembers, setTeamMembers] = useState(PLACEHOLDER_MEMBERS);
  const [filter, setFilter] = useState('Board'); // Default to Board based on the reference image showing Board active
  const [subFilter, setSubFilter] = useState('All');
  const [hoveredId, setHoveredId] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const [radiusX, setRadiusX] = useState(520);
  const [radiusZ, setRadiusZ] = useState(360);
  const [cardWidth, setCardWidth] = useState(280);
  const [cardHeight, setCardHeight] = useState(420);
  const [translateYOffset, setTranslateYOffset] = useState(0);
  const [carouselHeight, setCarouselHeight] = useState(530);
  const [isPhone, setIsPhone] = useState(false);
  const [scaleFactor, setScaleFactor] = useState(1);
  const sectionRef = useRef(null);
  const isScrollingRef = useRef(false);
  const isDragging = useRef(false);
  const [isCardFlipped, setIsCardFlipped] = useState(false);

  useEffect(() => {
    const backendUrl = import.meta.env.VITE_API_BACKEND || "";
    fetch(`${backendUrl}/api/team`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch team data");
        return res.json();
      })
      .then((data) => {
        setTeamMembers(data);
      })
      .catch((err) => {
        console.error("Error fetching team members:", err);
      });
  }, []);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const isMobileDevice = width < 768;
      setIsPhone(isMobileDevice);

      if (isMobileDevice) {
        setCardWidth(210);
        setCardHeight(315);
        setRadiusX(150);
        setRadiusZ(width * 0.25);
        setCarouselHeight(height < 600 ? 300 : 360);
        
        const center = (height < 600 ? 300 : 360) / 2;
        const translateYVal = (height < 600 ? 300 : 360) - 60 - (315 / 2) - center + 50;
        setTranslateYOffset(translateYVal);
        setScaleFactor(1);
      } else {
        const calculatedScale = Math.max(0.65, Math.min(1.2, Math.min(width / 1920, height / 1080)));
        setScaleFactor(calculatedScale);

        const cardW = Math.round(290 * calculatedScale);
        const cardH = Math.round(435 * calculatedScale);
        setCardWidth(cardW);
        setCardHeight(cardH);

        const rx = Math.round(540 * calculatedScale);
        const rz = Math.round(330 * calculatedScale);
        setRadiusX(rx);
        setRadiusZ(rz);

        const carouselH = Math.round(530 * calculatedScale);
        setCarouselHeight(carouselH);

        const bottomMargin = 60;
        const center = carouselH / 2;
        const activeCardH = cardH;
        const targetBottom = carouselH - bottomMargin;
        const translateYVal = targetBottom - (activeCardH / 2) - center;
        setTranslateYOffset(translateYVal);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const filteredMembers = React.useMemo(() => {
    const filtered = teamMembers.filter(member => {
      // 1. Parent domain matching
      const matchParent = filter === 'All' ? true : member.domain === filter;
      if (!matchParent) return false;

      // 2. Sub-domain matching
      if (subFilter === 'All') return true;

      const sub = (member.subDomain || '').toLowerCase();
      const pos = (member.position || '').toLowerCase();
      const role = (member.role || '').toLowerCase();

      if (filter === 'Technical') {
        if (subFilter === 'AI/ML') return sub.includes('ai') || sub.includes('ml') || sub.includes('machine') || sub.includes('learning');
        if (subFilter === 'WEB DEV') return sub.includes('web') || sub.includes('front') || sub.includes('back') || sub.includes('full');
        if (subFilter === 'APP DEV') return sub.includes('app') || sub.includes('android') || sub.includes('ios') || sub.includes('flutter');
        if (subFilter === 'LEADS') return pos.includes('lead') || role.includes('lead');
      }
      if (filter === 'Corporate') {
        if (subFilter === 'SPONSORSHIP') return sub.includes('sponsor') || sub.includes('sponshorship');
        if (subFilter === 'EVENTS') return sub.includes('event');
      }
      if (filter === 'Media') {
        if (subFilter === 'LEADS') return pos.includes('lead') || role.includes('lead');
        if (subFilter === 'CREATIVE') return sub.includes('creative') || sub.includes('design') || sub.includes('graphic') || sub.includes('video');
        if (subFilter === 'PR') return sub.includes('pr') || sub.includes('public') || sub.includes('relations') || sub.includes('social');
      }
      return true;
    });

    // Sort logic: Lead first, then Associate Lead, then Member
    const roleWeight = (role) => {
      const r = (role || '').toLowerCase();
      if (r.includes('head') || r.includes('president') || r.includes('secretary')) return 1;
      if (r.includes('lead') && !r.includes('associate')) return 2;
      if (r.includes('associate')) return 3;
      return 4; // Member
    };

    return filtered.sort((a, b) => roleWeight(a.role) - roleWeight(b.role));
  }, [teamMembers, filter, subFilter]);

  // Duplicate members to ensure a continuous full ring with no gaps (minimum 10 cards)
  const displayMembers = React.useMemo(() => {
    let list = [...filteredMembers];
    if (list.length === 0) return [];

    const minCards = 14;
    let repeated = [...list];
    let multiplier = 1;

    while (repeated.length < minCards) {
      repeated = [
        ...repeated,
        ...list.map((member) => ({
          ...member,
          id: `${member.id}-dup-${multiplier}`,
        })),
      ];
      multiplier++;
    }
    return repeated;
  }, [filteredMembers]);

  const totalMembers = filteredMembers.length;
  const displayCount = displayMembers.length;
  const angleStep = 360 / Math.max(displayCount, 1);

  // Calculate which display card is active
  const activeDisplayIndex = displayCount > 0
    ? ((activeIndex % displayCount) + displayCount) % displayCount
    : 0;

  useEffect(() => {
    setIsCardFlipped(false);
  }, [activeIndex]);

  useEffect(() => {
    setActiveIndex(0);
    setDragOffset(0);
    setHoveredId(null);
  }, [filter, subFilter]);

  const handlePrev = () => {
    setActiveIndex((prev) => prev - 1);
    setHoveredId(null);
  };

  const handleNext = () => {
    setActiveIndex((prev) => prev + 1);
    setHoveredId(null);
  };

  const handlePan = (event, info) => {
    isDragging.current = true;
    const sensitivity = 0.2;
    const deltaAngle = info.offset.x * sensitivity;
    setDragOffset(deltaAngle);
  };

  const handlePanEnd = (event, info) => {
    isDragging.current = false;
    const sensitivity = 0.2;
    const deltaAngle = info.offset.x * sensitivity;

    const totalRotation = -activeIndex * angleStep + deltaAngle;
    const nearestIndex = Math.round(-totalRotation / angleStep);

    // Snaps infinitely to closest index on the circle
    setActiveIndex(nearestIndex);
    setDragOffset(0);
  };

  const handleCardClick = (e, index) => {
    e.stopPropagation();
    if (isDragging.current) return;
    if (index === activeDisplayIndex) {
      setIsCardFlipped(prev => !prev);
    } else {
      setActiveIndex(index);
    }
  };

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const handleWheel = (e) => {
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        e.preventDefault();
        if (!isScrollingRef.current) {
          isScrollingRef.current = true;
          if (e.deltaY > 10) {
            setActiveIndex(prev => prev + 1);
          } else if (e.deltaY < -10) {
            setActiveIndex(prev => prev - 1);
          }
          setTimeout(() => { isScrollingRef.current = false; }, 300);
        }
      }
    };

    el.addEventListener('wheel', handleWheel, { passive: false });
    return () => el.removeEventListener('wheel', handleWheel);
  }, [angleStep]);

  return (
    <section 
      ref={sectionRef} 
      id="team" 
      className={`relative overflow-hidden font-sans h-screen min-h-[600px] flex flex-col justify-end xl:justify-between pt-24 sm:pt-28 xl:pt-6 pb-6 md:pb-0 md:pl-[80px] transition-colors duration-500 ${darkMode ? 'bg-black text-white' : 'bg-gradient-to-b from-[#f3d79e] via-[#f3d8ad] to-red-300 text-gray-900'}`}
      style={{
        '--scale-factor': scaleFactor
      }}
    >



      {/* Circular dial menu for desktop — anchored to section top-right */}
      <div className="hidden lg:block circular-menu-wrapper z-[200]">
        <CircularMenu
          activeFilter={filter}
          activeSubFilter={subFilter}
          onChangeFilter={(f, sf) => {
            setFilter(f);
            setSubFilter(sf);
          }}
          darkMode={darkMode}
        />
      </div>

      {/* Top Header & Filters Section - Constrained Width */}
      <div className="max-w-[1400px] mx-auto px-6 relative z-20 w-full flex flex-col justify-start lg:pr-[clamp(1.5rem,22vw,22rem)]">
        {/* Header and Filters aligned top */}
        <div className="flex flex-col xl:flex-row xl:items-center justify-between mb-3 gap-2 xl:gap-4">
          <div className="max-w-xl">
            <h2 className="team-heading-sub text-sm uppercase tracking-[0.2em] font-extrabold mb-3 sqac-subtitle">
              THE PEOPLE BEHIND SQAC
            </h2>
            <h3 className="team-heading-main text-4xl sm:text-6xl font-black tracking-tight leading-tight sqac-heading-gradient pb-2">
              Meet The Core Innovators
            </h3>

          </div>
        </div>

        {/* Showing Text and Navigation — arrows stay LEFT, away from the circular menu on the right */}
        <div className="flex items-center gap-3 sm:gap-5 mb-3">
          <span className={`team-showing-text text-[11px] font-bold uppercase tracking-widest opacity-60 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Showing member {totalMembers > 0 ? (((activeIndex % totalMembers) + totalMembers) % totalMembers) + 1 : 0} of {totalMembers}
          </span>

          {totalMembers > 1 && (
            <div className="team-nav-buttons flex items-center gap-2">
              <button
                onClick={handlePrev}
                aria-label="Previous member"
                className={`p-2 rounded-full shadow-md transition-all ${darkMode ? 'bg-white/5 border border-white/10 text-white hover:bg-white/10' : 'bg-white/90 border border-black/5 hover:bg-white text-gray-900'}`}
              >
                <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
              <button
                onClick={handleNext}
                aria-label="Next member"
                className={`p-2 rounded-full shadow-md transition-all ${darkMode ? 'bg-white/5 border border-white/10 text-white hover:bg-white/10' : 'bg-white/90 border border-black/5 hover:bg-white text-gray-900'}`}
              >
                <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Swipeable Mode Menu (Mobile Only) */}
      <div className="w-full relative z-[60] mt-2 lg:hidden">
        <SwipeableMenu
          activeFilter={filter}
          activeSubFilter={subFilter}
          onChangeFilter={(f, sf) => {
            setFilter(f);
            setSubFilter(sf);
          }}
          darkMode={darkMode}
        />
      </div>

       {/* Bottom Section - Full Width Carousel Viewport (No rounded glass container) */}
      <div
        className="relative w-full flex items-center justify-center perspective-2000 mt-auto z-[40]"
        style={{ touchAction: 'pan-y', height: carouselHeight }}
        onMouseLeave={() => setHoveredId(null)}
        onClick={(e) => {
          if (!isPhone || isDragging.current) return;
          const rect = e.currentTarget.getBoundingClientRect();
          const clickX = e.clientX - rect.left;
          if (clickX < rect.width * 0.35) {
            handlePrev();
          } else if (clickX > rect.width * 0.65) {
            handleNext();
          }
        }}
      >
        {/* Glowing Platform Base */}
        <div className="carousel-platform" />

        {/* 3D Track */}
        <motion.div
          className="w-full h-full relative flex items-center justify-center preserve-3d cursor-grab active:cursor-grabbing"
          style={{ transformStyle: 'preserve-3d' }}
          animate={{
            transform: `translateX(${isPhone ? 0 : -30}px) translateY(${translateYOffset}px) rotateX(12deg)`
          }}
          transition={isDragging.current ? { duration: 0 } : { type: "spring", stiffness: 120, damping: 20 }}
          onPan={handlePan}
          onPanEnd={handlePanEnd}
        >
          <AnimatePresence mode="popLayout">
            {displayMembers.map((member, i) => {
              const diffAngle = (i - activeIndex) * angleStep + dragOffset;

              // Normalize diffAngle to [-180, 180]
              let normAngle = diffAngle % 360;
              if (normAngle > 180) normAngle -= 360;
              if (normAngle < -180) normAngle += 360;

              const absoluteDiff = Math.abs(normAngle);

              // For phone view, only show 3 cards (active card + 2 neighbors) and hide the rest to avoid clutter.
              // For tablet/desktop view, show all cards around the circle (no opacity = 0 clipping).
              const isVisible = !isPhone || absoluteDiff < angleStep * 1.5;
              let indexDiff = Math.abs(i - activeDisplayIndex);
              if (indexDiff > displayCount / 2) {
                indexDiff = displayCount - indexDiff;
              }
              const opacity = isPhone
                ? (isVisible ? (i === activeDisplayIndex ? 1.0 : 0.95) : 0)
                : Math.max(0.4, 1.0 - indexDiff * 0.05);

              // Continuous dynamic scaling based on relative angle (normAngle)
              // This ensures fluid scaling during dragging/scrolling
              const centerFactor = Math.pow(Math.cos(normAngle * Math.PI / 360), 6); // Cosine power peaks at 0
              let scale = 0.45 + 0.67 * centerFactor; // Ranges from 0.45 to 1.12

              // Hover boost for the active card
              if (i === activeDisplayIndex && hoveredId === member.id) {
                scale += 0.03;
              }

              const zOffset = i === activeDisplayIndex
                ? (hoveredId === member.id ? 30 : 15)
                : 0;

              const cardAngleRad = normAngle * Math.PI / 180;
              const X = (radiusX + zOffset * 0.8) * Math.sin(cardAngleRad);
              const Z = (radiusZ + zOffset) * Math.cos(cardAngleRad);

              const activeGradients = darkMode ? DARK_CARD_GRADIENTS : LIGHT_CARD_GRADIENTS;
              const gradientClass = activeGradients[i % activeGradients.length];

              return (
                <motion.div
                  key={member.id}
                  className={`team-card absolute rounded-[32px] overflow-hidden shadow-2xl select-none
                    bg-gradient-to-r ${gradientClass}
                    ${i === activeDisplayIndex
                      ? 'border-2 border-white/70 shadow-[0_0_20px_rgba(255,255,255,0.45),_0_0_5px_rgba(255,255,255,0.25)]'
                      : 'border border-white/25 shadow-[0_0_8px_rgba(255,255,255,0.08)] opacity-70'
                    }
                  `}
                  style={{
                    width: cardWidth,
                    position: 'absolute',
                    left: '50%',
                    top: '50%',
                    transformStyle: 'preserve-3d',
                    backfaceVisibility: 'hidden',
                    pointerEvents: isVisible ? 'auto' : 'none',
                    cursor: i === activeDisplayIndex ? 'default' : 'pointer',
                  }}
                  animate={{
                    transform: `translate(-50%, -50%) translateX(${X}px) translateZ(${Z}px) rotateY(0deg) scale(${scale})`,
                    opacity: opacity,
                    zIndex: Math.round(Z + 1000),
                    height: cardHeight,
                  }}
                  transition={isDragging.current ? { duration: 0 } : {
                    type: 'spring',
                    stiffness: 150,
                    damping: 22,
                    mass: 0.8
                  }}
                  onClick={(e) => handleCardClick(e, i)}
                  onMouseEnter={() => i === activeDisplayIndex && setHoveredId(member.id)}
                  onMouseLeave={() => setHoveredId(null)}
                >
                  {/* Subtle noise/mesh overlay for premium glass look */}
                  <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSIjZmZmIiAvPgo8cmVjdCB3aWR0aD0iMSIgaGVpZ2h0PSIxIiBmaWxsPSIjMDAwIiAvPgo8L3N2Zz4=')] pointer-events-none" />

                  {/* Glassmorphism subtle overlay */}
                  <div className="absolute inset-0 bg-white/10 dark:bg-black/10 backdrop-blur-[2px] pointer-events-none" />

                  <ReactCardFlip
                    isFlipped={i === activeDisplayIndex && isCardFlipped}
                    flipDirection="horizontal"
                    containerClassName="w-full h-full"
                  >
                    {/* CARD FRONT */}
                    <div className="team-card-inner w-full h-full p-5 flex flex-col justify-between items-center text-center relative z-10 select-none">
                      {/* Main Profile Content */}
                      <div className="flex flex-col items-center justify-center w-full my-auto">
                        {/* Profile Image / Avatar */}
                        <div
                          className="w-20 h-20 sm:w-22 sm:h-22 rounded-full flex items-center justify-center font-bold text-white shadow-2xl overflow-hidden border border-white/30 ring-2 ring-white/20 mb-3 transition-transform duration-300 hover:scale-105"
                          style={{
                            background: 'linear-gradient(135deg, rgba(255,255,255,0.25) 0%, rgba(255,255,255,0.05) 100%)',
                            backdropFilter: 'blur(12px)',
                          }}
                        >
                          {member.pic ? (
                            <img src={member.pic} alt={member.name} className="w-full h-full object-cover" />
                          ) : (
                            <span className="text-xl sm:text-2xl font-black tracking-wider">{member.initials}</span>
                          )}
                        </div>

                        {/* Name */}
                        <h4 className="font-extrabold text-base sm:text-lg tracking-tight leading-snug text-white max-w-[95%] truncate">
                          {member.name}
                        </h4>

                        {/* Domain Badge */}
                        <span className="inline-block px-3 py-0.5 mt-1.5 rounded-full bg-white/10 backdrop-blur-md text-[10px] font-extrabold tracking-widest uppercase text-white/90 border border-white/15 shadow-sm">
                          {getDisplayDomain(member)}
                        </span>

                        {/* Role */}
                        <p className="font-medium text-xs text-white/80 mt-1.5">
                          {member.role}
                        </p>

                        {/* Social Links */}
                        <div className={`flex items-center justify-center gap-2.5 mt-4 transition-opacity duration-300 ${i === activeDisplayIndex ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                          {getSocialLinks(member).map((social, idx) => (
                            <a
                              key={idx}
                              href={social.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className={`w-8 h-8 rounded-full bg-white/10 hover:bg-white/25 border border-white/15 flex items-center justify-center text-white/90 transition-all duration-300 ${social.color} shadow-sm`}
                              onClick={(e) => e.stopPropagation()}
                              aria-label={`${member.name} ${social.label}`}
                            >
                              {social.icon}
                            </a>
                          ))}
                        </div>
                      </div>

                      {/* Card Front Footer */}
                      <div className="w-full pt-2.5 flex items-center justify-between border-t border-white/15 text-[10px] text-white/70">
                        <div className="flex items-center gap-1.5 font-bold uppercase tracking-wider">
                          <Users className="w-3 h-3 opacity-80" />
                          <span>{getDisplayDomain(member)}</span>
                        </div>

                        {i === activeDisplayIndex && (
                          <span className="font-bold tracking-wider text-white/80 animate-pulse">
                            Click to View Bio ➔
                          </span>
                        )}
                      </div>
                    </div>

                    {/* CARD BACK */}
                    <div className="team-card-inner w-full h-full p-4 sm:p-5 flex flex-col justify-between relative z-10 text-left select-none overflow-hidden">
                      {/* Back Header */}
                      <div className="pb-2 border-b border-white/15 flex items-center justify-between gap-2">
                        <div className="min-w-0 flex-1">
                          <h4 className="font-extrabold text-sm sm:text-base text-white leading-tight truncate">
                            {member.name}
                          </h4>
                          <p className="text-[11px] font-medium text-white/75 mt-0.5 truncate">
                            {member.role}
                          </p>
                        </div>
                        <span className="shrink-0 text-[9px] font-black px-2.5 py-0.5 rounded-full bg-white/10 border border-white/15 uppercase tracking-wider text-white/90">
                          {getDisplayDomain(member)}
                        </span>
                      </div>

                      {/* Back Content - Clean, Non-Scrolling */}
                      <div className="flex-1 my-2 flex flex-col justify-center space-y-2 text-[11px] leading-relaxed overflow-hidden">
                        <div>
                          <p className="font-bold uppercase tracking-widest text-[9px] text-white/50 mb-0.5">
                            About
                          </p>
                          <p className="font-normal text-white/90 line-clamp-3">
                            {member.bio}
                          </p>
                        </div>

                        {member.contributions && member.contributions.length > 0 && (
                          <div>
                            <p className="font-bold uppercase tracking-widest text-[9px] text-white/50 mb-0.5">
                              Highlights
                            </p>
                            <ul className="space-y-0.5 font-normal text-white/85">
                              {member.contributions.slice(0, 2).map((contrib, cIdx) => (
                                <li key={cIdx} className="flex items-start gap-1.5 line-clamp-1">
                                  <span className="text-white/40">•</span>
                                  <span className="truncate">{contrib}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>

                      {/* Back Footer - Minimal (No Social Buttons) */}
                      <div className="pt-2 border-t border-white/15 flex items-center justify-between text-[10px] text-white/70">
                        <span className="font-semibold uppercase tracking-wider">
                          {getDisplayDomain(member)}
                        </span>

                        <span className="font-bold tracking-wider text-white/80 animate-pulse">
                          Click to Flip ↺
                        </span>
                      </div>
                    </div>
                  </ReactCardFlip>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
