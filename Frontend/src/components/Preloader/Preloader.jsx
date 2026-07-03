import React, { useEffect, useRef } from 'react';
import './Preloader.css';
import SQACLogo from '../../assets/LogoSQAC.png';

const Preloader = ({ onComplete }) => {
  const canvasRef = useRef(null);
  const imagesRef = useRef([]);
  const frameCount = 151;
  const currentFrame = (index) => `/images/ezgif-frame-${index.toString().padStart(3, '0')}.png`;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext('2d');

    let currentScroll = 0;
    let targetScroll = window.scrollY || 0;
    let animationFrameId;
    let isFinished = false;

    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      context.imageSmoothingEnabled = true;
      context.imageSmoothingQuality = 'high';
      
      targetScroll = window.scrollY;
      currentScroll = targetScroll;
    };

    const drawFrame = (frameIndex) => {
      if (imagesRef.current[frameIndex - 1] && imagesRef.current[frameIndex - 1].complete) {
        const img = imagesRef.current[frameIndex - 1];
        const canvasRatio = canvas.width / canvas.height;
        const imgRatio = img.width / img.height;
        
        let drawWidth = canvas.width;
        let drawHeight = canvas.height;
        let offsetX = 0;
        let offsetY = 0;

        if (canvasRatio > imgRatio) {
          drawHeight = canvas.width / imgRatio;
          offsetY = (canvas.height - drawHeight) / 2;
        } else {
          drawWidth = canvas.height * imgRatio;
          offsetX = (canvas.width - drawWidth) / 2;
        }

        context.clearRect(0, 0, canvas.width, canvas.height);
        context.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
      }
    };

    // Preload all images
    for (let i = 1; i <= frameCount; i++) {
      const img = new Image();
      img.src = currentFrame(i);
      imagesRef.current.push(img);
      img.onload = () => {
        if (i === 1) {
          drawFrame(1);
        }
      };
    }

    const tick = () => {
      if (isFinished) return;
      
      currentScroll += (targetScroll - currentScroll) * 0.08;
      
      const scrollContainer = document.querySelector('.preloader-scroll-container');
      
      if (scrollContainer) {
        let totalScrollHeight = scrollContainer.offsetHeight - window.innerHeight;
        if (totalScrollHeight <= 0) totalScrollHeight = 1;
        
        let masterFraction = currentScroll / totalScrollHeight;
        
        if (masterFraction >= 0.92) {
          // Trigger the fade out when reaching the end
          isFinished = true;
          masterFraction = 1;
          drawFrame(frameCount);
          
          const fadeWrapper = document.getElementById('preloader-fade-wrapper');
          if (fadeWrapper) {
            fadeWrapper.style.transition = 'opacity 1s ease-out';
            fadeWrapper.style.opacity = '0';
          }
          
          const watermark = document.getElementById('watermark-logo');
          if (watermark) {
            const rect = watermark.getBoundingClientRect();
            
            const currentCenterX = rect.left + rect.width / 2;
            const currentCenterY = rect.top + rect.height / 2;
            
            const targetCenterX = 52; // Navbar logo center is at 20px (1.25rem) + 32px (half of 64px container)
            const targetCenterY = 52;
            
            const moveX = targetCenterX - currentCenterX;
            const moveY = targetCenterY - currentCenterY;
            const scale = 32 / (rect.width * 0.8); // target width is 32px, current img width is 80% of container
            
            watermark.style.transition = 'transform 1s cubic-bezier(0.25, 1, 0.5, 1), background-color 1s ease, box-shadow 1s ease';
            watermark.style.backgroundColor = 'transparent';
            watermark.style.boxShadow = 'none';
            watermark.style.transform = `translate(${moveX}px, ${moveY}px) scale(${scale})`;
          }

          setTimeout(() => {
            if (onComplete) onComplete();
          }, 1000); // Wait 1 second for the fade to complete
          return;
        }

        if (masterFraction < 0) masterFraction = 0;
        
        const frameIndex = Math.floor(masterFraction * (frameCount - 1));
        drawFrame(frameIndex + 1);
      }
      
      animationFrameId = requestAnimationFrame(tick);
    };

    const handleScroll = () => {
      targetScroll = window.scrollY;
    };

    window.addEventListener('resize', resizeCanvas);
    window.addEventListener('scroll', handleScroll);
    
    resizeCanvas();
    tick();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(animationFrameId);
    };
  }, [onComplete]);

  return (
    <div className="preloader-scroll-container">
      <div className="preloader-sticky-viewport">
        <div id="preloader-fade-wrapper" style={{ width: '100%', height: '100%', backgroundColor: '#000' }}>
          <canvas ref={canvasRef} id="preloader-canvas" />
        </div>
        
        {/* Overlay to hide the Gemini logo and fly to navbar */}
        <div className="watermark-overlay" id="watermark-logo">
          <img src={SQACLogo} alt="SQAC" />
        </div>
      </div>
    </div>
  );
};

export default Preloader;
