import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Users, Sparkles } from 'lucide-react';

export default function Hero({ darkMode }) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 40, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
    },
  };

  const handleScrollTo = (id) => {
    const element = document.querySelector(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center pt-24 overflow-hidden"
    >
      {/* Immersive background ambient blobs */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-1/4 w-[350px] h-[350px] bg-sqac-primary/20 rounded-full blur-[80px] animate-blob-1" />
        <div className="absolute bottom-1/3 right-1/4 w-[400px] h-[400px] bg-sqac-secondary/25 rounded-full blur-[90px] animate-blob-2" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-sqac-accent/20 rounded-full blur-[70px] animate-blob-3" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10 text-center flex flex-col items-center">
        {/* Floating badge */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className={`mb-6 flex items-center space-x-2 px-4 py-1.5 rounded-full border text-xs font-semibold uppercase tracking-widest ${darkMode
              ? 'bg-[#17171C]/80 border-white/10 text-[#FF6B8A]'
              : 'bg-white/80 border-sqac-primary/10 text-sqac-primary'
            } shadow-sm backdrop-blur-md`}
        >
          <Sparkles className="w-3.5 h-3.5 animate-pulse" />
          <span>Shaping The Digital Frontier</span>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-6"
        >
          {/* Main Title Heading */}
          <motion.h1
            variants={itemVariants}
            className={`text-5xl sm:text-7xl md:text-8xl font-black tracking-tight leading-[0.95] ${darkMode ? 'text-white' : 'text-gray-900'
              }`}
          >
            <span className={darkMode ? 'text-gradient-dark' : 'text-gradient-sqac'}>SQAC</span>
            <br />
            <span className="block mt-4 text-4xl sm:text-5xl md:text-7xl font-extrabold tracking-tight">
              Building Communities.
            </span>
            <span className="block text-4xl sm:text-5xl md:text-7xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-sqac-primary to-sqac-secondary">
              Creating Opportunities.
            </span>
            <span className="block text-4xl sm:text-5xl md:text-7xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-sqac-secondary to-sqac-accent">
              Driving Innovation.
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={itemVariants}
            className={`max-w-2xl mx-auto text-base sm:text-lg md:text-xl font-normal leading-relaxed ${darkMode ? 'text-gray-300' : 'text-gray-700'
              }`}
          >
            A community of builders, leaders, creators, and innovators shaping the future together. We empower students to construct production-ready ecosystems.
          </motion.p>

          {/* Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6"
          >
            <motion.button
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleScrollTo('#domains')}
              className="w-full sm:w-auto px-8 py-4 rounded-full font-bold btn-gradient-primary shadow-lg shadow-sqac-primary/20 flex items-center justify-center gap-2 group cursor-pointer"
            >
              Explore Domains
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1 duration-300" />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleScrollTo('#team')}
              className={`w-full sm:w-auto px-8 py-4 rounded-full font-bold border transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer ${darkMode
                  ? 'bg-transparent border-white/10 text-white hover:bg-white/5 hover:border-white/20'
                  : 'bg-transparent border-gray-900/10 text-gray-900 hover:bg-black/5 hover:border-gray-900/20'
                }`}
            >
              <Users className="w-5 h-5" />
              Meet The Team
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer"
          onClick={() => handleScrollTo('#domains')}
        >
          <span className={`text-xs uppercase tracking-widest font-semibold ${darkMode ? 'text-gray-500' : 'text-gray-600'
            }`}>
            Scroll Down
          </span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className={`w-1.5 h-6 rounded-full ${darkMode ? 'bg-white/20' : 'bg-black/20'
              } relative overflow-hidden`}
          >
            <div className="absolute top-0 left-0 right-0 h-2 bg-sqac-primary rounded-full" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
