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

function SplitWord({ text, gradient }) {
  return (
    <span className="inline-block" style={{ perspective: '800px' }}>
      {text.split('').map((char, i) => (
        <motion.span
          key={i}
          custom={i}
          variants={letterAnim}
          className={`inline-block ${
            gradient && char !== ' '
              ? 'bg-gradient-to-r from-pink-600 via-pink-500 to-orange-500 bg-clip-text text-transparent'
              : ''
          }`}
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
        {/* Label */}
        <motion.div variants={fadeUp} className="flex justify-center mb-6">
          <span className="
            inline-flex items-center gap-2 px-4 py-1.5 rounded-full
            text-[11px] font-semibold tracking-[0.1em] uppercase
            bg-white/50 dark:bg-zinc-900/70
            border border-white/60 dark:border-orange-500/20
            text-orange-700 dark:text-orange-400
            backdrop-blur-md shadow-sm
          " id="hero-label">
            <Sparkles size={11} />
            SQAC — Software Quality Assurance Community
          </span>
        </motion.div>

        {/* Heading — letter-by-letter like Codrops */}
        <motion.h1
          variants={container}
          className="leading-[1.05] tracking-[-0.03em] mb-6 text-[#3B0A4B] dark:text-white"
          style={{ fontSize: 'clamp(2.6rem,8vw,5.5rem)', fontFamily: "'Stardom', serif" }}
          id="hero-heading"
        >
          <SplitWord text="Our " />
          <SplitWord text="Achievements" gradient />
        </motion.h1>

      
      </motion.div>


    </section>
  );
}
