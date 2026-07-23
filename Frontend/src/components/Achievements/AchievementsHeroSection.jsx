import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] } },
};

// Per-letter animation for the heading (Codrops-style)
const letterAnim = {
  hidden: { opacity: 0, y: 48, rotateX: -25 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: { duration: 0.65, delay: i * 0.038, ease: [0.4, 0, 0.2, 1] },
  }),
};

function SplitWord({ text }) {
  return (
    <span className="inline-block" style={{ perspective: '800px' }}>
      {text.split('').map((char, i) => (
        <motion.span
          key={i}
          custom={i}
          variants={letterAnim}
          className="inline-block"
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </span>
  );
}

export default function HeroSection() {
  const { isDarkMode } = useTheme();

  return (
    <section
      id="hero-section"
      className="relative flex flex-col items-center justify-center text-center px-6 pt-32 pb-4 overflow-hidden"
    >
      {/* Subtle dot-grid overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: isDarkMode 
            ? 'radial-gradient(rgba(255,255,255,0.022) 1px, transparent 1px)' 
            : 'radial-gradient(rgba(59,10,75,0.06) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
      />

      {/* ── Content ── */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="visible"
        className="relative z-10 max-w-4xl mx-auto"
      >
        {/* Label removed as per user request */}

        {/* Heading */}
        <h1
          className="leading-[1.05] tracking-[-0.03em] mb-6 sqac-heading-gradient pb-2 font-black"
          style={{ fontSize: 'clamp(2.6rem,8vw,5.5rem)' }}
          id="hero-heading"
        >
          Our Gallery
        </h1>

      
      </motion.div>


    </section>
  );
}
