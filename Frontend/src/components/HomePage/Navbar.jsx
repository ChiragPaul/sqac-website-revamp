import React, { useEffect, useRef, useState } from "react";
import SQAC from "../../assets/LogoSQAC.png";
import { Link, useLocation } from "react-router-dom";
import GridViewOutlinedIcon from '@mui/icons-material/GridViewOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined';
import RocketLaunchOutlinedIcon from '@mui/icons-material/RocketLaunchOutlined';
import EventOutlinedIcon from '@mui/icons-material/EventOutlined';
import PersonAddOutlinedIcon from '@mui/icons-material/PersonAddOutlined';
import EmojiEventsOutlinedIcon from '@mui/icons-material/EmojiEventsOutlined';
import ToggleDarkMode from "../ToggleDarkMode";
import gsap from "gsap";

const navbarStyles = `
.sidebar-nav {
  position: fixed;
  top: 1.25rem; 
  left: 1.25rem;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 64px;
  height: 64px; /* Default collapsed height */
  overflow: visible;
  border-radius: 40px;
  transition: background-color 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease, backdrop-filter 0.3s ease;
}

.sidebar-logo-container {
  width: 64px;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  cursor: pointer;
  z-index: 10;
}

.logo-box {
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.sidebar-divider {
  width: 32px;
  height: 1px;
  background: rgba(255,255,255,0.1);
  margin: 10px 0;
  flex-shrink: 0;
  z-index: 10;
}

.nav-items-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  width: 100%;
  padding-bottom: 20px;
  z-index: 10;
}

.nav-icon-link {
  position: relative;
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 14px;
  color: #a0a0ab;
  transition: all 0.2s ease;
  text-decoration: none;
}

.nav-icon-link:hover {
  color: #ffffff;
  background: rgba(255,255,255,0.05);
}

.nav-icon-link.active {
  background: linear-gradient(135deg, #ff7eb3, #ff758c);
  color: #ffffff;
  box-shadow: 0 4px 15px rgba(255, 117, 140, 0.4);
}

/* Tooltip */
.nav-tooltip {
  position: absolute;
  left: 60px;
  background: #1f212c;
  color: #ffffff;
  padding: 6px 12px;
  border-radius: 8px;
  font-size: 0.75rem;
  font-weight: 600;
  font-family: 'Poppins', sans-serif;
  white-space: nowrap;
  pointer-events: none;
  opacity: 0;
  transform: translateX(-10px);
  transition: all 0.2s ease;
  border: 1px solid rgba(255,255,255,0.1);
  z-index: 20;
}

.nav-icon-link:hover .nav-tooltip,
.toggle-wrapper:hover .nav-tooltip {
  opacity: 1;
  transform: translateX(0);
}

.logout-icon {
  margin-top: 4px;
  color: #ff758c;
  opacity: 0.8;
}
.logout-icon:hover {
  opacity: 1;
  color: #ff4766;
  background: rgba(255, 117, 140, 0.1);
}

.toggle-wrapper {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
}
.toggle-wrapper > button {
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent !important;
  box-shadow: none !important;
  color: #a0a0ab !important;
}
.toggle-wrapper > button:hover {
  color: #ffffff !important;
}
`;

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);
  const timelineRef = useRef(null);
  const location = useLocation();

  const navItems = [
    { label: "Home", path: "/", icon: <GridViewOutlinedIcon style={{ fontSize: '22px' }} /> },
    { label: "About", path: "/about", icon: <InfoOutlinedIcon style={{ fontSize: '22px' }} /> },
    { label: "Team", path: "/team", icon: <GroupOutlinedIcon style={{ fontSize: '22px' }} /> },
    { label: "Projects", path: "/projects", icon: <RocketLaunchOutlinedIcon style={{ fontSize: '22px' }} /> },
    { label: "Events", path: "/events", icon: <EventOutlinedIcon style={{ fontSize: '22px' }} /> },
    { label: "Achievements", path: "/achievements", icon: <EmojiEventsOutlinedIcon style={{ fontSize: '22px' }} /> },
    { label: "Join Us", path: "/recruitment", icon: <PersonAddOutlinedIcon style={{ fontSize: '22px' }} /> },
  ];

  useEffect(() => {
    // Initial setup
    gsap.set('.nav-icon-link, .sidebar-divider.anim, .toggle-wrapper', { opacity: 0, y: -10, display: 'none' });

    timelineRef.current = gsap.timeline({ paused: true })
      .to('.sidebar-nav', {
        height: "auto", 
        duration: 0.4,
        ease: 'power3.out'
      })
      .set('.nav-icon-link, .sidebar-divider.anim, .toggle-wrapper', { display: 'flex' }, "-=0.2")
      .to('.nav-icon-link, .sidebar-divider.anim, .toggle-wrapper', {
        opacity: 1,
        y: 0,
        duration: 0.25,
        stagger: 0.04,
        ease: 'power2.out'
      }, "-=0.2");

    return () => {
      if (timelineRef.current) timelineRef.current.kill();
    };
  }, []);

  const toggleMenu = () => {
    if (!timelineRef.current) return;
    
    setIsOpen(prev => {
      const nextState = !prev;
      if (nextState) {
        timelineRef.current.timeScale(1).play();
      } else {
        timelineRef.current.timeScale(1.5).reverse();
      }
      return nextState;
    });
  };

  const handleDoubleClick = () => {
    if (isOpen) toggleMenu();
  };

  return (
    <div ref={containerRef}>
      <style>{navbarStyles}</style>

      <div 
        className={`sidebar-nav ${isOpen ? 'bg-white/95 dark:bg-[#0b0d17]/95 border border-gray-200/50 dark:border-white/10 shadow-2xl backdrop-blur-xl' : 'bg-transparent border-transparent shadow-none'}`}
        onDoubleClick={handleDoubleClick}
      >
        
        {/* Logo Toggle Button */}
        <div className="sidebar-logo-container" onClick={toggleMenu}>
          <div className="logo-box">
            <img src={SQAC} alt="SQAC Logo" className="w-8 h-8 object-contain drop-shadow-md hover:scale-110 transition-transform duration-200" />
          </div>
        </div>

        <div className="sidebar-divider anim"></div>

        {/* Navigation Links */}
        <div className="nav-items-container">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path || (item.path !== "/" && location.pathname.startsWith(item.path));
            // Exact match for home, startsWith for others
            const isActuallyActive = item.path === "/" ? location.pathname === "/" : location.pathname.startsWith(item.path);

            return (
              <Link 
                key={item.path} 
                to={item.path} 
                className={`nav-icon-link ${isActuallyActive ? 'active' : ''}`}
                onClick={() => setIsOpen(false)}
              >
                {item.icon}
                <div className="nav-tooltip">{item.label}</div>
              </Link>
            )
          })}
          
          <div className="sidebar-divider anim mb-0"></div>

          <div className="toggle-wrapper">
            <ToggleDarkMode />
            <div className="nav-tooltip">Toggle Theme</div>
          </div>

        </div>

      </div>
    </div>
  );
}

export default Navbar;