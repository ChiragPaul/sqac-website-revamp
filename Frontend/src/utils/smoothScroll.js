import Lenis from '@studio-freight/lenis';
import { useEffect } from 'react';

const useLenisScroll = () => {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.6,
      easing: (t) => t, 
      smooth: true,
      lerp: 0.1,
    });

    window.lenis = lenis;

    let rafId;
    function raf(time) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }

    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      if (window.lenis === lenis) delete window.lenis;
    };
  }, []);
};

export default useLenisScroll;
