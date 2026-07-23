import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { CSS3DRenderer, CSS3DObject } from "three/examples/jsm/renderers/CSS3DRenderer.js";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTheme } from "../../contexts/ThemeContext";
import BorderGlow from "./BorderGlow";

// Import all assets representing key moments
import imgEvents from "../../assets/Events-photo.png";
import imgSQACTeam from "../../assets/SQAC_Team.jpg";
import imgGroupPhoto from "../../assets/SQAC_Group_photo.jpg";
import imgTeamPhoto from "../../assets/TeamPhoto.png";
import imgProjects from "../../assets/projectsPhoto.png";
import imgStadium from "../../assets/stadium.jpg";
import imgMineverse from "../../assets/image.png";
import imgDemoTeam from "../../assets/Demo_SQAC_Team.jpg";
import imgTeam1 from "../../assets/teamImg1.png";
import imgTeam2 from "../../assets/teamImg2.png";
import imgTechnical from "../../assets/technical.png";
import imgCorp from "../../assets/Corp.png";
import imgMedia from "../../assets/Media.png";
import clubLogo from "../../assets/LogoSQAC-removebg-preview.png";
import clubLogoDark from "../../assets/LogoSQAC.png";

// Setup GSAP scroll trigger plugin
gsap.registerPlugin(ScrollTrigger);

const galleryData = [
  { img: imgEvents, title: "Vibrant Community Events", desc: "Bringing students together to learn, share, and grow as software engineers." },
  { img: imgSQACTeam, title: "SQAC Core Team", desc: "The passionate core driving the community's vision and workshops." },
  { img: imgGroupPhoto, title: "Our Growing Community", desc: "A welcoming ecosystem for developers, testers, and creative thinkers." },
  { img: imgTeamPhoto, title: "Team Collaboration", desc: "Working hand-in-hand to build high-quality web applications." },
  { img: imgProjects, title: "Project Showcase & Hackathons", desc: "Transforming ambitious ideas into fully functional code solutions." },
  { img: imgStadium, title: "Tech Summit at Stadium", desc: "Attending external tech summits and engaging with industry experts." },
  { img: imgMineverse, title: "Mineverse Virtual Event", desc: "An immersive virtual experience built and organized by our members." },
  { img: imgDemoTeam, title: "Team Workshop Session", desc: "Regular bootcamps and peer mentorship to polish dev skills." },
  { img: imgTeam1, title: "Coding Sprint", desc: "Intense coding sessions focusing on scalability and performance." },
  { img: imgTeam2, title: "Design Review", desc: "Perfecting user experiences and crafting stunning visual flows." },
  { img: imgTechnical, title: "Technical Workshop", desc: "Exploring debugging, automated testing, and CI/CD pipelines." },
  { img: imgCorp, title: "Corporate Networking", desc: "Industry interaction sessions preparing members for their careers." },
  { img: imgMedia, title: "Media & Communications", desc: "Capturing and sharing the community's milestones and stories." }
];

// Double the items to make the 3D layout rich, dense, and full-looking (total of 26 items)
const items = [...galleryData, ...galleryData];

export default function Gallery3D() {
  const scrollContainerRef = useRef(null);
  const containerRef = useRef(null);
  const [activeCard, setActiveCard] = useState(null);
  const { isDarkMode } = useTheme();

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Cache dimensions to avoid layout thrashing (forced synchronous layout reads)
    let cachedWidth = container.clientWidth;
    let cachedHeight = container.clientHeight;

    let hasFormedCircle = false;
    const scrollState = { progress: 0 };

    // 1. Setup Scene and Camera
    const scene = new THREE.Scene();

    const getCameraZ = () => {
      if (cachedWidth < 640) return 950;
      if (cachedWidth < 1024) return 1300;
      return 1450;
    };

    const camera = new THREE.PerspectiveCamera(40, cachedWidth / cachedHeight, 1, 10000);
    camera.position.z = getCameraZ();

    // 2. Setup CSS3DRenderer
    const renderer = new CSS3DRenderer();
    renderer.setSize(cachedWidth, cachedHeight);
    container.appendChild(renderer.domElement);

    // Allow scrolling through canvas while capturing clicks on cards
    renderer.domElement.style.pointerEvents = "none";
    renderer.domElement.style.position = "absolute";
    renderer.domElement.style.top = "0";
    renderer.domElement.style.left = "0";
    renderer.domElement.style.width = "100%";
    renderer.domElement.style.height = "100%";

    const objects = [];
    const targets = { ring: [] };
    const total = items.length;

    // 3. Create Card Elements and CSS3DObjects
    items.forEach((item, i) => {
      const element = document.createElement("div");
      // ZERO LAYOUT THRASHING OPTIMIZATION: 
      // - Explicitly added absolute, top-0, left-0 to avoid document reflow refitting.
      // - Replaced transition-all with transition-[border-color,box-shadow] so that changing 3D matrix inline transforms never triggers CSS layout transition fights.
      // - Removed scale-105 on card hover to avoid fighting matrix3d scales.
      element.className = "gallery-item absolute top-0 left-0 group w-[90px] h-[130px] sm:w-[140px] sm:h-[200px] md:w-[160px] md:h-[235px] rounded-2xl overflow-hidden cursor-pointer border border-white/10 dark:border-white/5 bg-zinc-950/85 shadow-xl md:shadow-2xl transition-[border-color,box-shadow] duration-300 hover:border-purple-500/50 hover:shadow-[0_0_35px_rgba(168,85,247,0.45)] dark:hover:border-[#7A1E2C]/50 dark:hover:shadow-[0_0_35px_rgba(122,30,44,0.45)] pointer-events-auto select-none sm:backdrop-blur-sm";
      element.style.willChange = "transform";
      element.style.touchAction = "pan-y";

      const img = document.createElement("img");
      img.src = item.img;
      // Hover scaling is moved solely to the internal image which has no 3D transform matrices applied, ensuring zero stutter
      img.className = "w-full h-full object-cover transition-transform duration-500 group-hover:scale-110";
      img.loading = "lazy";
      img.draggable = false;
      element.appendChild(img);

      // Dark gradient overlay
      const overlay = document.createElement("div");
      overlay.className = "absolute inset-0 bg-gradient-to-t from-black/95 via-black/35 to-transparent flex flex-col justify-end p-2.5 md:p-4 opacity-90 group-hover:opacity-100 transition-opacity duration-300";

      const title = document.createElement("h4");
      title.className = "text-white font-bold text-[10px] sm:text-xs md:text-sm font-poppins tracking-wide mb-1 leading-tight text-left";
      title.innerText = item.title;

      const desc = document.createElement("p");
      desc.className = "text-white/75 text-[8px] md:text-[11px] font-medium font-poppins leading-normal text-left opacity-0 group-hover:opacity-100 transition-all duration-300 max-h-0 group-hover:max-h-16 overflow-hidden mt-0 group-hover:mt-1";
      desc.innerText = item.desc;

      overlay.appendChild(title);
      overlay.appendChild(desc);
      element.appendChild(overlay);

      // Set up click modal launch with index details for thought bubble alternation
      element.addEventListener("click", (e) => {
        e.stopPropagation();
        setActiveCard({ ...item, index: i });
      });

      const objectCSS = new CSS3DObject(element);

      // Initialize falling state parameters
      const randomOffsetY = Math.random() * 200;
      const randomTiltZ = (Math.random() - 0.5) * 0.3;

      objectCSS.position.set(0, 1300 + randomOffsetY, 0);
      objectCSS.rotation.set(Math.PI / 2, 0, randomTiltZ);

      // Cache layout states in userData
      objectCSS.userData = {
        randomOffsetY,
        randomTiltZ
      };

      scene.add(objectCSS);
      objects.push(objectCSS);
    });

    // 4. Calculate responsive circular film strip targets
    let ringRadius = 500;
    const updateRingConfig = () => {
      let cardWidth = 160;
      let gap = 16;
      const w = cachedWidth;
      if (w < 640) {
        cardWidth = 90;
        gap = 25; // Space between cards to prevent overlapping
      } else if (w < 1024) {
        cardWidth = 140;
        gap = 12;
      }
      ringRadius = (total * (cardWidth + gap)) / (2 * Math.PI);
    };

    // Instantiate target objects
    for (let i = 0; i < total; i++) {
      targets.ring.push(new THREE.Object3D());
    }

    const updateRingTargets = () => {
      updateRingConfig();

      for (let i = 0; i < total; i++) {
        const theta = (i / total) * Math.PI * 2;
        const y = cachedWidth < 640 ? -40 : 0; // Flat circular film strip, slightly lower on mobile

        const dummy = targets.ring[i];
        dummy.position.set(
          ringRadius * Math.sin(theta),
          y,
          ringRadius * Math.cos(theta)
        );

        // Face cards outward from center
        const targetVector = new THREE.Vector3(dummy.position.x * 2, dummy.position.y, dummy.position.z * 2);
        dummy.lookAt(targetVector);

        // Update the start positions/rotations stored in the corresponding CSS3DObject
        const obj = objects[i];
        if (obj) {
          const startX = dummy.position.x * 0.25;
          const startY = 1300 + obj.userData.randomOffsetY;
          const startZ = dummy.position.z * 0.25;

          obj.userData.initialPos = new THREE.Vector3(startX, startY, startZ);
          obj.userData.initialRot = new THREE.Euler(
            Math.PI / 2,
            theta,
            obj.userData.randomTiltZ
          );

          // Force initial position on mount/resize if not scrolling or not formed
          if (scrollState.progress === 0) {
            if (cachedWidth < 640) {
              obj.position.copy(dummy.position);
              obj.rotation.copy(dummy.rotation);
            } else if (!hasFormedCircle) {
              obj.position.copy(obj.userData.initialPos);
              obj.rotation.copy(obj.userData.initialRot);
            }
          }
        }
      }
    };

    updateRingTargets();

    // 5. Create Central "KEY MOMENTS" 3D Billboard text
    const centerEl = document.createElement("div");
    centerEl.className = "flex flex-col items-center justify-center pointer-events-none select-none text-center px-4 w-[280px] sm:w-[500px] md:w-[800px]";
    centerEl.innerHTML = `
      <!-- Mobile: Text -->
      <div class="md:hidden flex flex-col items-center justify-center">
        <h2 class="text-3xl sm:text-5xl font-black font-poppins tracking-wider bg-clip-text text-transparent bg-gradient-to-r from-[#951D13] via-[#f34a82] to-[#F0A01F] dark:from-[#7A1E2C] dark:via-[#A93C38] dark:to-[#d95d39] filter drop-shadow-[0_0_25px_rgba(243,74,130,0.25)] select-none">
          KEY MOMENTS
        </h2>
        <div class="h-[2px] w-20 bg-gradient-to-r from-transparent via-[#f34a82] dark:via-[#7A1E2C] to-transparent my-2.5"></div>
        <p class="text-[9px] sm:text-xs text-rose-500 dark:text-transparent dark:bg-clip-text dark:bg-gradient-to-r dark:from-[#7A1E2C] dark:via-[#A93C38] dark:to-[#d95d39] font-bold tracking-[0.25em] uppercase font-poppins opacity-95">
          SQAC Community
        </p>
      </div>
      <!-- Laptop: Logo -->
      <div class="hidden md:flex flex-col items-center justify-center filter drop-shadow-[0_0_40px_rgba(255,255,255,0.4)] dark:drop-shadow-[0_0_40px_rgba(122,30,44,0.6)]">
        <img src="${clubLogo}" alt="SQAC Logo" class="w-[200px] md:w-[360px] object-contain opacity-95 drop-shadow-2xl dark:hidden block" />
        <div class="w-[180px] md:w-[300px] h-[180px] md:h-[300px] rounded-full overflow-hidden flex items-center justify-center dark:flex hidden bg-black p-4 md:p-6 border border-zinc-800">
           <img src="${clubLogoDark}" alt="SQAC Logo Dark" class="w-full h-full object-contain opacity-95" />
        </div>
      </div>
    `;
    centerEl.style.pointerEvents = "none";
    centerEl.style.opacity = "0"; // Starts hidden
    centerEl.style.willChange = "opacity";

    const centerObj = new CSS3DObject(centerEl);
    centerObj.position.set(0, 0, 0);
    scene.add(centerObj);

    // 7. Mouse Parallax Handler
    let mouseX = 0, mouseY = 0;
    const handleMouseMove = (e) => {
      mouseX = (e.clientX - cachedWidth / 2) * 0.35;
      mouseY = (e.clientY - cachedHeight / 2) * 0.35;
    };
    window.addEventListener("mousemove", handleMouseMove);

    // 7.5 Drag to Navigate Handler
    let dragRotationY = 0;
    let isDragging = false;
    let previousX = 0;

    const handlePointerDown = (e) => {
      isDragging = true;
      previousX = e.type.includes('touch') ? e.touches[0].clientX : e.clientX;
    };

    const handlePointerMoveDrag = (e) => {
      if (!isDragging) return;
      const clientX = e.type.includes('touch') ? e.touches[0].clientX : e.clientX;
      const deltaX = clientX - previousX;
      dragRotationY += deltaX * 0.008; 
      previousX = clientX;
    };

    const handlePointerUp = () => {
      isDragging = false;
    };

    const scrollContainer = scrollContainerRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener("mousedown", handlePointerDown);
      scrollContainer.addEventListener("mousemove", handlePointerMoveDrag);
      window.addEventListener("mouseup", handlePointerUp);
      
      scrollContainer.addEventListener("touchstart", handlePointerDown, { passive: true });
      scrollContainer.addEventListener("touchmove", handlePointerMoveDrag, { passive: true });
      window.addEventListener("touchend", handlePointerUp);
      window.addEventListener("touchcancel", handlePointerUp);
    }

    // 8. Scroll Trigger integration
    let inViewport = false;
    const observer = new IntersectionObserver((entries) => {
      inViewport = entries[0].isIntersecting;
    }, { threshold: 0 });
    if (scrollContainer) observer.observe(scrollContainer);

    const trigger = ScrollTrigger.create({
      trigger: scrollContainerRef.current,
      start: "top 30%", // Start early to decrease top space before text appears
      end: "bottom bottom",
      scrub: 1.8, // Slower, more fluid damping
      onUpdate: (self) => {
        // Tween the progress state variable smoothly using GSAP
        gsap.to(scrollState, {
          progress: self.progress,
          duration: 0.5, // Slower catch-up for smoother scroll tracking
          ease: "power2.out",
          overwrite: "auto"
        });
      }
    });

    let autoRotationY = 0;

    // 9. Synchronized Animation loop (Driven by GSAP ticker for frame-rate synchronization)
    const animate = () => {
      const isTweening = trigger ? Math.abs(scrollState.progress - trigger.progress) > 0.001 : false;

      // Perform rendering and calculations only when the section is in view, catching up, or dragging
      if (inViewport || isTweening || isDragging) {
        const scrollProgress = scrollState.progress;

        // Lock the circle format once scroll progress reaches 0.95 (fully formed)
        if (scrollProgress >= 0.95) {
          hasFormedCircle = true;
        }

        // Billboard text fade-in over 0.0 -> 0.2 scroll progress
        let textOpacity;
        if (hasFormedCircle || cachedWidth < 640) {
          textOpacity = 1.0;
        } else {
          textOpacity = Math.max(0, Math.min(1.0, scrollProgress / 0.2));
        }
        centerEl.style.opacity = textOpacity.toString();

        // Subtle ambient Y rotation + scroll-driven Y rotation
        if (cachedWidth >= 640) {
          autoRotationY += 0.002; // Slightly faster ambient to show off the auto movement
        }
        const scrollRotationY = cachedWidth < 640 ? 0 : scrollProgress * Math.PI * 0.75; 
        const currentTotalRotation = autoRotationY + scrollRotationY + dragRotationY;
        scene.rotation.y = currentTotalRotation;

        // Staggered cards transition from falling coordinates to circular strip targets
        objects.forEach((obj, idx) => {
          const ringTarget = targets.ring[idx];

          // Cards fall slowly between 0.2 and 0.85 progress, staggered (wider range makes it slower)
          const start_p = 0.2 + (idx / total) * 0.35;
          const duration_p = 0.3; // Slower individual card flight duration

          let t;
          if (hasFormedCircle || cachedWidth < 640) {
            t = 1.0;
          } else {
            t = Math.max(0, Math.min(1.0, (scrollProgress - start_p) / duration_p));
          }

          const t_ease = t * t * (3 - 2 * t); // Smooth easing

          // Interpolating from initial falling positions to target ring positions
          const startPos = obj.userData.initialPos || new THREE.Vector3(0, 1300, 0);
          const startRot = obj.userData.initialRot || new THREE.Euler(Math.PI / 2, 0, 0);

          const targetX = THREE.MathUtils.lerp(startPos.x, ringTarget.position.x, t_ease);
          const targetY = THREE.MathUtils.lerp(startPos.y, ringTarget.position.y, t_ease);
          const targetZ = THREE.MathUtils.lerp(startPos.z, ringTarget.position.z, t_ease);

          let targetRotX, targetRotY, targetRotZ;

          // Standard Ring orientation for both desktop and mobile
          targetRotX = THREE.MathUtils.lerp(startRot.x, ringTarget.rotation.x, t_ease);
          targetRotY = THREE.MathUtils.lerp(startRot.y, ringTarget.rotation.y, t_ease);
          targetRotZ = THREE.MathUtils.lerp(startRot.z, ringTarget.rotation.z, t_ease);

          // Calculate Dynamic Scale for Center Highlight
          const theta = (idx / total) * Math.PI * 2;
          const currentAngle = theta + currentTotalRotation;
          const cosVal = Math.cos(currentAngle); // 1 is center front, -1 is back
          
          const intensity = Math.pow(Math.max(0, cosVal), 14); // Sharp peak at the center
          const baseScale = cachedWidth < 640 ? 0.85 : 0.95;
          const peakBoost = cachedWidth < 640 ? 0.35 : 0.25; // Center card goes up to 1.2
          const cardScale = baseScale + (intensity * peakBoost);

          if (cachedWidth < 640) {
            // Mobile: fade out cards that aren't near the front
            let opacity = 0;
            if (cosVal > 0.75) {
               opacity = 1;
            } else if (cosVal > 0.25) {
               opacity = (cosVal - 0.25) / 0.50; 
            }
            obj.element.style.opacity = opacity.toString();
            obj.element.style.pointerEvents = opacity > 0.6 ? 'auto' : 'none';
          } else {
            // Desktop: Normal Ring opacity
            obj.element.style.opacity = "1";
            obj.element.style.pointerEvents = 'auto';
          }

          obj.scale.set(cardScale, cardScale, cardScale);

          obj.position.set(targetX, targetY, targetZ);
          obj.rotation.set(targetRotX, targetRotY, targetRotZ);
        });

        // Slight forward tilt on X for circular strip 3D depth perspective
        scene.rotation.x = cachedWidth < 640 ? 0 : 0.12;

        // Billboard counter-rotation (using scene quaternion inverse) for center text
        const sceneQuatInverse = scene.quaternion.clone().invert();
        centerObj.quaternion.copy(sceneQuatInverse);
        if (cachedWidth < 640) {
           centerObj.position.y = 200; // Move text to maintain gap with cards while staying visible
        } else {
           centerObj.position.y = 0;
        }

        // Camera lag matching mouse position
        camera.position.x += (mouseX - camera.position.x) * 0.045;
        camera.position.y += (-mouseY - camera.position.y) * 0.045;
        camera.lookAt(scene.position);

        renderer.render(scene, camera);
      }
    };

    // Synchronize render updates with GSAP ticker loop
    gsap.ticker.add(animate);

    // 10. Responsive Resize handler
    const handleResize = () => {
      if (!container) return;
      cachedWidth = container.clientWidth;
      cachedHeight = container.clientHeight;
      camera.aspect = cachedWidth / cachedHeight;
      camera.position.z = getCameraZ();
      camera.updateProjectionMatrix();
      renderer.setSize(cachedWidth, cachedHeight);
      updateRingTargets();
    };
    window.addEventListener("resize", handleResize);

    // Cleanup on unmount
    return () => {
      gsap.ticker.remove(animate);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      if (scrollContainer) {
        scrollContainer.removeEventListener("mousedown", handlePointerDown);
        scrollContainer.removeEventListener("mousemove", handlePointerMoveDrag);
        scrollContainer.removeEventListener("touchstart", handlePointerDown);
        scrollContainer.removeEventListener("touchmove", handlePointerMoveDrag);
      }
      window.removeEventListener("mouseup", handlePointerUp);
      window.removeEventListener("touchend", handlePointerUp);
      window.removeEventListener("touchcancel", handlePointerUp);
      observer.disconnect();
      trigger.kill();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  const isBubbleLeft = activeCard && activeCard.index % 2 === 0;

  return (
    <div
      ref={scrollContainerRef}
      className="relative h-[100vh] md:h-[110vh] w-full mt-12 md:mt-24 bg-transparent transition-colors duration-500 overflow-hidden cursor-grab active:cursor-grabbing"
      style={{ touchAction: 'pan-y' }}
    >
      {/* Sticky viewport wrapper */}
      <div className="gallery-sticky-wrapper sticky top-0 h-screen w-full overflow-hidden flex flex-col items-center justify-center">
        
        {/* Gesture arrows for laptop view */}
        {!activeCard && (
          <>
            <div className="hidden md:flex absolute top-[55%] left-4 lg:left-8 -translate-y-1/2 z-[100] pointer-events-none opacity-40 animate-pulse text-zinc-600 dark:text-zinc-400">
              <svg className="w-8 h-8 lg:w-12 lg:h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" />
              </svg>
            </div>
            <div className="hidden md:flex absolute top-[55%] right-4 lg:right-8 -translate-y-1/2 z-[100] pointer-events-none opacity-40 animate-pulse text-zinc-600 dark:text-zinc-400">
              <svg className="w-8 h-8 lg:w-12 lg:h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </>
        )}
        
        {/* Laptop Header inside sticky wrapper */}
        <div className="hidden md:flex flex-col items-center justify-center absolute top-[12vh] left-0 right-0 z-[100] pointer-events-none">
           <h2 className="text-4xl lg:text-[4rem] font-black font-poppins tracking-wider bg-clip-text text-transparent bg-gradient-to-r from-[#951D13] via-[#f34a82] to-[#F0A01F] dark:from-[#7A1E2C] dark:via-[#A93C38] dark:to-[#d95d39] filter drop-shadow-[0_0_25px_rgba(243,74,130,0.25)] select-none">
             KEY MOMENTS
           </h2>
           <div className="h-[3px] w-48 bg-gradient-to-r from-transparent via-[#f34a82] dark:via-[#7A1E2C] to-transparent my-3"></div>
           <p className="text-sm text-rose-500 dark:text-transparent dark:bg-clip-text dark:bg-gradient-to-r dark:from-[#7A1E2C] dark:via-[#A93C38] dark:to-[#d95d39] font-bold tracking-[0.25em] uppercase font-poppins opacity-95">
             SQAC Community
           </p>
        </div>

        {/* Three.js DOM container */}
        <div ref={containerRef} className="absolute inset-0 w-full h-full z-10" />

        {/* CSS styles for transitions */}
        <style>{`
          @keyframes imagePop {
            from { transform: scale(0.82) rotate(-4deg); opacity: 0; }
            to { transform: scale(1) rotate(0deg); opacity: 1; }
          }
          .animate-image-pop {
            animation: imagePop 0.45s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
          }
          @keyframes cloudPopRight {
            from { transform: translateX(40px) scale(0.85); opacity: 0; }
            to { transform: translateX(0) scale(1); opacity: 1; }
          }
          @keyframes cloudPopLeft {
            from { transform: translateX(-40px) scale(0.85); opacity: 0; }
            to { transform: translateX(0) scale(1); opacity: 1; }
          }
          .animate-cloud-pop-right {
            animation: cloudPopRight 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) 0.12s forwards;
          }
          .animate-cloud-pop-left {
            animation: cloudPopLeft 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) 0.12s forwards;
          }
          @keyframes fadeOverlay {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          .animate-fade-overlay {
            animation: fadeOverlay 0.28s ease-out forwards;
          }
        `}</style>
      </div>

      {/* Swipe Hint for Mobile */}
      {!activeCard && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center justify-center md:hidden pointer-events-none z-[100]">
          <div className="flex items-center gap-3 px-6 py-2.5 rounded-full border border-white/15 bg-black/20 backdrop-blur-lg shadow-2xl animate-pulse">
            <svg className="w-4 h-4 text-white/90" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
            </svg>
            <span className="text-[10px] font-semibold tracking-[0.2em] text-white/90 uppercase whitespace-nowrap">
              Swipe to Explore
            </span>
          </div>
        </div>
      )}
      
      {/* Drag Hint for Desktop */}
      {!activeCard && (
        <div className="hidden md:flex absolute bottom-12 left-1/2 -translate-x-1/2 items-center justify-center pointer-events-none z-[100]">
          <div className="flex items-center gap-3 px-6 py-2 rounded-full border border-zinc-500/20 bg-zinc-800/10 dark:bg-white/5 backdrop-blur-md shadow-xl animate-pulse">
            <svg className="w-4 h-4 text-zinc-600 dark:text-zinc-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
            </svg>
            <span className="text-[11px] font-medium tracking-[0.15em] text-zinc-700 dark:text-zinc-300 uppercase whitespace-nowrap">
              Drag to Explore
            </span>
          </div>
        </div>
      )}

      {/* Pop details view with centering and alternating thought bubbles */}
      {activeCard && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-fade-overlay"
          onClick={() => setActiveCard(null)}
        >
          {/* Alternating layout wrapper */}
          <div
            className={`relative max-w-5xl w-full flex flex-col items-center justify-center gap-6 md:gap-14 pointer-events-auto ${isBubbleLeft ? "md:flex-row-reverse" : "md:flex-row"
              }`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Center Image view */}
            <div className="w-[285px] h-[385px] sm:w-[350px] sm:h-[480px] rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.6)] border-4 border-white/10 dark:border-zinc-800/80 bg-zinc-950/80 animate-image-pop relative group">
              <img
                src={activeCard.img}
                alt={activeCard.title}
                className="w-full h-full object-cover"
              />
              {/* Close Button overlayed on the image */}
              <button
                onClick={() => setActiveCard(null)}
                className="absolute top-4 right-4 p-2 bg-black/60 hover:bg-black/85 border border-white/10 rounded-full text-white hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer"
                aria-label="Close"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Alternating thought bubble details replaced by BorderGlow */}
            <BorderGlow
              className={`w-[285px] h-[385px] sm:w-[350px] sm:h-[480px] font-poppins ${isBubbleLeft ? "animate-cloud-pop-left" : "animate-cloud-pop-right"}`}
              edgeSensitivity={30}
              glowColor={isDarkMode ? "350 60 50" : "330 80 60"} 
              backgroundColor={isDarkMode ? "rgba(24, 24, 27, 0.95)" : "rgba(255, 255, 255, 0.95)"}
              borderRadius={32}
              glowRadius={30}
              glowIntensity={1.0}
              coneSpread={30}
              animated={true}
              colors={
                isDarkMode 
                  ? ['#7A1E2C', '#A93C38', '#d95d39'] 
                  : ['#951D13', '#f34a82', '#F0A01F']
              }
            >
              {/* Card content */}
              <div className="relative z-10 text-left flex flex-col justify-center h-full p-6 sm:p-8 md:p-10">
                <div>
                  <span className="inline-block text-[10px] md:text-xs font-bold px-3 py-1 rounded-full bg-purple-500/10 text-purple-600 dark:text-purple-400 mb-3 select-none">
                    Key Moment
                  </span>
                </div>
                <h3 className="text-xl md:text-2xl font-extrabold text-zinc-900 dark:text-purple-300 mb-4 leading-tight">
                  {activeCard.title}
                </h3>
                <p className="text-zinc-700 dark:text-zinc-300 text-sm md:text-base leading-relaxed overflow-y-auto">
                  {activeCard.desc}
                </p>
              </div>
            </BorderGlow>
          </div>
        </div>
      )}
    </div>
  );
}
