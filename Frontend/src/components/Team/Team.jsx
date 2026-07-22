import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ReactCardFlip from 'react-card-flip';
//import { teamMembers } from '../data/teamData';
import { ChevronLeft, ChevronRight, ChevronDown, Linkedin, Github, Globe, Users, Mouse } from 'lucide-react';
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

const PLACEHOLDER_MEMBERS = [
  // Board
  {
    id: 'placeholder-1',
    name: 'Yash Gupta',
    initials: 'YG',
    role: 'Secretary',
    bio: 'Yash Gupta is a dedicated secretary at SQAC, focusing on driving quality, collaboration, and excellence across projects.',
    contributions: [
      'Shaped the strategic vision and direction of SQAC.',
      'Mentored members and oversaw operations across all domains.'
    ],
    domain: 'Board',
    pic: '',
    linkedin: 'https://linkedin.com',
    github: 'https://github.com',
    portfolio: 'https://instagram.com'
  },
  {
    id: 'placeholder-2',
    name: 'Tanmay Bansal',
    initials: 'TB',
    role: 'Joint Secretary',
    bio: 'Tanmay Bansal is a dedicated joint secretary at SQAC, focusing on driving quality, collaboration, and excellence across projects.',
    contributions: [
      'Shaped the strategic vision and direction of SQAC.',
      'Mentored members and oversaw operations across all domains.'
    ],
    domain: 'Board',
    pic: '',
    linkedin: 'https://linkedin.com',
    github: 'https://github.com',
    portfolio: 'https://instagram.com'
  },
  {
    id: 'placeholder-3',
    name: 'Nityam Sharma',
    initials: 'NS',
    role: 'Joint Secretary',
    bio: 'Nityam Sharma is a dedicated joint secretary at SQAC, focusing on driving quality, collaboration, and excellence across projects.',
    contributions: [
      'Shaped the strategic vision and direction of SQAC.',
      'Mentored members and oversaw operations across all domains.'
    ],
    domain: 'Board',
    pic: '',
    linkedin: 'https://linkedin.com',
    github: 'https://github.com',
    portfolio: 'https://instagram.com'
  },
  {
    id: 'placeholder-4',
    name: 'Priyanshu Vasudev',
    initials: 'PV',
    role: 'Technical Lead',
    bio: 'Priyanshu Vasudev is a dedicated technical lead at SQAC, focusing on driving quality, collaboration, and excellence across projects.',
    contributions: [
      'Shaped the strategic vision and direction of SQAC.',
      'Mentored members and oversaw operations across all domains.'
    ],
    domain: 'Board',
    pic: '',
    linkedin: 'https://linkedin.com',
    github: 'https://github.com',
    portfolio: 'https://instagram.com'
  },
  {
    id: 'placeholder-5',
    name: 'Vedant Modi',
    initials: 'VM',
    role: 'Corporate Lead',
    bio: 'Vedant Modi is a dedicated corporate lead at SQAC, focusing on driving quality, collaboration, and excellence across projects.',
    contributions: [
      'Shaped the strategic vision and direction of SQAC.',
      'Mentored members and oversaw operations across all domains.'
    ],
    domain: 'Board',
    pic: '',
    linkedin: 'https://linkedin.com',
    github: 'https://github.com',
    portfolio: 'https://instagram.com'
  },
  // Technical
  {
    id: 'placeholder-6',
    name: 'Akshaj Bansal',
    initials: 'AB',
    role: 'Domain Lead',
    bio: 'Akshaj Bansal is a dedicated domain lead at SQAC, focusing on driving quality, collaboration, and excellence across projects.',
    contributions: [
      'Developed and optimized core software modules.',
      'Ensured code quality through rigorous testing and code reviews.'
    ],
    domain: 'Technical',
    subDomain: 'Web Dev',
    position: 'Lead',
    pic: '',
    linkedin: 'https://linkedin.com',
    github: 'https://github.com',
    portfolio: 'https://instagram.com'
  },
  {
    id: 'placeholder-7',
    name: 'Christin Kurian',
    initials: 'CK',
    role: 'Member',
    bio: 'Christin Kurian is a dedicated member at SQAC, focusing on driving quality, collaboration, and excellence across projects.',
    contributions: [
      'Developed and optimized core software modules.',
      'Ensured code quality through rigorous testing and code reviews.'
    ],
    domain: 'Technical',
    subDomain: 'AI/ML',
    position: 'Member',
    pic: '',
    linkedin: 'https://linkedin.com',
    github: 'https://github.com',
    portfolio: 'https://instagram.com'
  },
  {
    id: 'placeholder-8',
    name: 'Vaibhav Dev',
    initials: 'VD',
    role: 'Associate',
    bio: 'Vaibhav Dev is a dedicated associate at SQAC, focusing on driving quality, collaboration, and excellence across projects.',
    contributions: [
      'Developed and optimized core software modules.',
      'Ensured code quality through rigorous testing and code reviews.'
    ],
    domain: 'Technical',
    subDomain: 'App Dev',
    position: 'Associate',
    pic: '',
    linkedin: 'https://linkedin.com',
    github: 'https://github.com',
    portfolio: 'https://instagram.com'
  },
  // Corporate
  {
    id: 'placeholder-9',
    name: 'Vansh Jain',
    initials: 'VJ',
    role: 'Domain Lead',
    bio: 'Vansh Jain is a dedicated domain lead at SQAC, focusing on driving quality, collaboration, and excellence across projects.',
    contributions: [
      'Managed corporate partnerships and sponsor outreach.',
      'Organized and coordinated logistics for major events.'
    ],
    domain: 'Corporate',
    subDomain: 'Sponsorship',
    position: 'Lead',
    pic: '',
    linkedin: 'https://linkedin.com',
    github: 'https://github.com',
    portfolio: 'https://instagram.com'
  },
  {
    id: 'placeholder-10',
    name: 'Javin Trivedi',
    initials: 'JT',
    role: 'Domain Lead',
    bio: 'Javin Trivedi is a dedicated domain lead at SQAC, focusing on driving quality, collaboration, and excellence across projects.',
    contributions: [
      'Managed corporate partnerships and sponsor outreach.',
      'Organized and coordinated logistics for major events.'
    ],
    domain: 'Corporate',
    subDomain: 'Events',
    position: 'Lead',
    pic: '',
    linkedin: 'https://linkedin.com',
    github: 'https://github.com',
    portfolio: 'https://instagram.com'
  },
  // Media
  {
    id: 'placeholder-11',
    name: 'Simran Nayak',
    initials: 'SN',
    role: 'Domain Lead',
    bio: 'Simran Nayak is a dedicated domain lead at SQAC, focusing on driving quality, collaboration, and excellence across projects.',
    contributions: [
      'Designed high-fidelity UI/UX mockups and graphic assets.',
      'Led public relations campaigns and social media presence.'
    ],
    domain: 'Media',
    subDomain: 'Creative',
    position: 'Lead',
    pic: '',
    linkedin: 'https://linkedin.com',
    github: 'https://github.com',
    portfolio: 'https://instagram.com'
  },
  {
    id: 'placeholder-12',
    name: 'Roopa K',
    initials: 'RK',
    role: 'Associate',
    bio: 'Roopa K is a dedicated associate at SQAC, focusing on driving quality, collaboration, and excellence across projects.',
    contributions: [
      'Designed high-fidelity UI/UX mockups and graphic assets.',
      'Led public relations campaigns and social media presence.'
    ],
    domain: 'Media',
    subDomain: 'PR',
    position: 'Associate',
    pic: '',
    linkedin: 'https://linkedin.com',
    github: 'https://github.com',
    portfolio: 'https://instagram.com'
  }
];

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
    const backendUrl = import.meta.env.VITE_API_BACKEND || "http://localhost:5000";
    fetch(`${backendUrl}/api/data`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch team data");
        return res.json();
      })
      .then((data) => {
        const mapped = data.map((db) => {
          const name = db.Name || '';
          const initials = name
            .split(' ')
            .filter(Boolean)
            .map(n => n[0])
            .join('')
            .toUpperCase()
            .slice(0, 2);

          const coreDomain = (db['Your Core Domain'] || '').trim().toLowerCase();
          const subDomain = (db['Sub Domain'] || '').trim().toLowerCase();
          const position = (db['Position in SQAC'] || '').trim();

          let domain = 'Technical';
          let role = position;

          if (position.toLowerCase() === 'board member' || position.toLowerCase() === 'board-member') {
            domain = 'Board';
            role = db['Sub Domain'] || 'Board Member';
          } else if (subDomain.includes('creative') || subDomain.includes('pr') || subDomain.includes('media') || subDomain.includes('design')) {
            domain = 'Media';
          } else if (coreDomain === 'technical') {
            domain = 'Technical';
          } else if (coreDomain === 'corporate') {
            domain = 'Corporate';
          } else if (coreDomain === 'both') {
            if (subDomain.includes('web') || subDomain.includes('app') || subDomain.includes('ai') || subDomain.includes('ml')) {
              domain = 'Technical';
            } else {
              domain = 'Corporate';
            }
          }

          const extractDriveImage = (url) => {
            if (!url) return '';
            if (url.includes('cloudinary.com')) return url;
            const match = url.match(/[-\w]{25,}/);
            return match ? `https://drive.google.com/uc?export=view&id=${match[0]}` : url;
          };

          const image = db.image || extractDriveImage(db['Your Image For Website ']) || '';

          const roleName = role || 'Core Member';
          const bio = `${name} is a dedicated ${roleName.toLowerCase()} at SQAC, focusing on driving quality, collaboration, and excellence across projects.`;

          let contributions = [
            'Contributed to core team initiatives and deliverables.',
            'Collaborated across domains to support SQAC activities.'
          ];
          if (domain === 'Technical') {
            contributions = [
              'Developed and optimized core software modules.',
              'Ensured code quality through rigorous testing and code reviews.'
            ];
          } else if (domain === 'Corporate') {
            contributions = [
              'Managed corporate partnerships and sponsor outreach.',
              'Organized and coordinated logistics for major events.'
            ];
          } else if (domain === 'Media') {
            contributions = [
              'Designed high-fidelity UI/UX mockups and graphic assets.',
              'Led public relations campaigns and social media presence.'
            ];
          } else if (domain === 'Board') {
            contributions = [
              'Shaped the strategic vision and direction of SQAC.',
              'Mentored members and oversaw operations across all domains.'
            ];
          }

          return {
            id: db._id || Math.random().toString(),
            name,
            initials,
            role,
            bio,
            contributions,
            domain,
            subDomain,
            position,
            pic: image,
            linkedin: db['LinkedIn Profile Link'] || '#',
            github: db['GitHub Profile Link'] || '#',
            portfolio: db['Instagram Profile Link'] || '#',
          };
        });
        setTeamMembers(mapped);
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
    return teamMembers.filter(member => {
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
                    <div className="team-card-inner w-full h-full p-4 flex flex-col justify-between relative z-10">
                      <div className="flex flex-col gap-2.5">
                        {/* Initials Circle (Larger Profile Pic) */}
                        <div
                          className="team-card-avatar w-14 h-14 rounded-full flex items-center justify-center font-bold text-white shadow-sm overflow-hidden"
                          style={{
                            background: 'linear-gradient(135deg, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0.1) 100%)',
                            backdropFilter: 'blur(10px)',
                            border: '1px solid rgba(255,255,255,0.3)'
                          }}
                        >
                          {member.pic ? (
                            <img src={member.pic} alt={member.name} className="w-full h-full object-cover" />
                          ) : (
                            member.initials
                          )}
                        </div>

                        {/* Header info (Name, Domain, Position) */}
                        <div className="space-y-1">
                          <h4 className="team-card-name font-black tracking-tight leading-tight text-[#1C1C1E] dark:text-white whitespace-normal break-words">
                            {member.name}
                          </h4>
                          <p className="team-card-domain uppercase font-extrabold tracking-widest text-[#1C1C1E]/70 dark:text-gray-300">
                            {getDisplayDomain(member)}
                          </p>
                          <p className="team-card-role font-semibold opacity-85 text-[#1C1C1E] dark:text-gray-200">
                            {member.role}
                          </p>
                        </div>

                        {/* Social Logos */}
                        <div className={`flex items-center gap-1.5 transition-opacity duration-300 ${i === activeDisplayIndex ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                          {[
                            { icon: <Linkedin />, url: member.linkedin, label: 'LinkedIn' },
                            { icon: <Github />, url: member.github, label: 'GitHub' },
                            { icon: <Globe />, url: member.portfolio, label: 'Portfolio' },
                          ].map((social, idx) => (
                            <a
                              key={idx}
                              href={social.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="team-card-social-link rounded-full bg-white/20 hover:bg-white/40 flex items-center justify-center text-[#1C1C1E] dark:text-white transition-colors"
                              onClick={(e) => e.stopPropagation()}
                              aria-label={`${member.name} ${social.label}`}
                            >
                              {social.icon}
                            </a>
                          ))}
                        </div>
                      </div>

                      {/* Bottom Area (Domain Badge / Flip Action) */}
                      <div className="team-card-footer mt-auto pt-2 flex items-center justify-between border-t border-white/20">
                        {/* Domain Badge */}
                        <div className="team-card-badge-container flex items-center gap-1 text-[#1C1C1E] dark:text-white">
                          <Users className="opacity-80" />
                          <span className="team-card-badge font-bold">
                            {getDisplayDomain(member)}
                          </span>
                        </div>

                        {/* Flip Indicator */}
                        {i === activeDisplayIndex && (
                          <span className="team-card-flip-hint font-extrabold text-[#1C1C1E]/60 dark:text-white/60 animate-pulse">
                            Click to View Bio
                          </span>
                        )}
                      </div>
                    </div>

                    {/* CARD BACK */}
                    <div className="team-card-inner w-full h-full p-4 flex flex-col justify-between relative z-10">
                      {/* Bio content only */}
                      <div className="flex-1 flex flex-col justify-center overflow-y-auto pr-1">
                        <p className="team-card-bio font-medium text-[#1C1C1E]/95 dark:text-white/95 leading-relaxed">
                          {member.bio}
                        </p>
                      </div>

                      {/* Bottom Area (Socials / Flip Back) */}
                      <div className="team-card-footer mt-auto pt-3 flex items-center justify-between border-t border-white/20">
                        {/* Social Links */}
                        <div className="flex items-center gap-1.5">
                          {[
                            { icon: <Linkedin />, url: member.linkedin, label: 'LinkedIn' },
                            { icon: <Github />, url: member.github, label: 'GitHub' },
                            { icon: <Globe />, url: member.portfolio, label: 'Portfolio' },
                          ].map((social, idx) => (
                            <a
                              key={idx}
                              href={social.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="team-card-social-link rounded-full bg-white/20 hover:bg-white/40 flex items-center justify-center text-[#1C1C1E] dark:text-white transition-colors"
                              onClick={(e) => e.stopPropagation()}
                              aria-label={`${member.name} ${social.label}`}
                            >
                              {social.icon}
                            </a>
                          ))}
                        </div>

                        <span className="team-card-flip-hint font-extrabold text-[#1C1C1E]/60 dark:text-white/60 animate-pulse">
                          Click to Flip Back
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
