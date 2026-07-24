import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Target, Telescope, ChevronLeft, ChevronRight, Pause, Play, Users } from "lucide-react";
import TeamPic from "../../assets/SQAC_Team.jpg";
import GroupPic from "../../assets/SQAC_Group_photo.jpg";
import EventsPic from "../../assets/Events-photo.png";
import TeamPhoto from "../../assets/TeamPhoto.png";
import Tenure1 from "../../assets/tenure1.jpg";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
};

const communitySlides = [
  {
    id: 1,
    image: "/About Us/1.jpeg",
    title: "SQAC Community Family",
    subtitle: "Over 200+ active student members united by a passion for quality software, testing, and continuous innovation.",
    tag: "Community Board & Members"
  },
  {
    id: 2,
    image: "/About Us/2.jpeg",
    title: "Core Executive Board",
    subtitle: "Student leaders driving strategic vision, organizing technical workshops, and mentoring project teams.",
    tag: "Leadership & Leads"
  },
  {
    id: 3,
    image: "/About Us/3.jpg",
    title: "Interactive Workshops & Hackathons",
    subtitle: "Hands-on sessions on modern web tech, industrial testing tools, continuous deployment, and open-source.",
    tag: "Events & Workshops"
  },
  {
    id: 4,
    image: "/About Us/4.jpg",
    title: "Collaborative Project Builds",
    subtitle: "Creating production-grade software applications and solving real-world challenges through teamwork.",
    tag: "Technical Domain"
  },
  {
    id: 5,
    image: "/About Us/5.jpeg",
    title: "Annual Community Gathering",
    subtitle: "Fostering lifelong networking, peer mentorship, and celebrating major team achievements.",
    tag: "Networking & Gatherings"
  }
];

const AboutUsHero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  // Auto advance carousel slides
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % communitySlides.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [isPlaying]);

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % communitySlides.length);
  };

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev - 1 + communitySlides.length) % communitySlides.length);
  };

  return (
    <section className="relative w-full pt-32 pb-16 px-4 sm:px-8 lg:px-16 z-10 font-sans">
      <div className="max-w-[1400px] mx-auto flex flex-col gap-12">
        
        {/* ROW 1: Hero Bento */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 min-h-[450px]">
          
          {/* Title Area (Col 1-4) */}
          <motion.div
            variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="lg:col-span-4 flex flex-col justify-center"
          >
            <h2
              className="text-6xl sm:text-7xl lg:text-8xl font-black tracking-wider leading-[0.85] mb-2 uppercase bg-clip-text text-transparent bg-gradient-to-r from-[#951D13] via-[#f34a82] to-[#F0A01F] dark:from-[#7A1E2C] dark:via-[#A93C38] dark:to-[#d95d39]"
              style={{ fontFamily: '"Poppins", sans-serif' }}
            >
              ABOUT<br/>US
            </h2>
            <div className="h-[2px] w-36 bg-gradient-to-r from-[#951D13] via-[#f34a82] to-transparent dark:via-[#7A1E2C] my-3"></div>
            <p className="text-sm font-bold tracking-[0.25em] uppercase text-[#951D13] dark:text-transparent dark:bg-clip-text dark:bg-gradient-to-r dark:from-[#7A1E2C] dark:via-[#A93C38] dark:to-[#d95d39] mb-6">
              SQAC COMMUNITY
            </p>
            <p className="text-gray-800 dark:text-gray-300 text-sm leading-relaxed">
              Founded at SRMIST, SQAC is a student-led technical community. We are passionate about clean code, real-world projects, and collaborative learning.
            </p>
          </motion.div>

          {/* Large Image Area (Col 5-9) */}
          <motion.div
            variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="lg:col-span-5 rounded-3xl overflow-hidden relative group h-[300px] lg:h-auto border border-[#7A1E2C]/20 dark:border-[#7A1E2C]/40 shadow-xl"
          >
            <img
              src="/About Us/1.jpeg"
              alt="SQAC Team"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-90 dark:opacity-85"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#7A1E2C]/60 via-transparent to-transparent opacity-80" />
            <div className="absolute inset-0 border border-white/20 rounded-3xl pointer-events-none mix-blend-overlay" />
          </motion.div>

          {/* Philosophy / Mission Area (Col 10-12) */}
          <motion.div
            variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="lg:col-span-3 flex flex-col gap-4 h-full"
          >
            <div className="flex-1 rounded-3xl p-6 flex flex-col justify-end relative overflow-hidden bg-white/40 dark:bg-black/60 border border-[#7A1E2C]/20 dark:border-[#7A1E2C]/40 shadow-lg">
              <div className="mb-4 text-[#951D13] dark:text-[#d95d39]">
                <Target size={28} />
              </div>
              <h3 className="text-2xl font-bold mb-2 tracking-tight text-[#7A1E2C] dark:text-white" style={{ fontFamily: '"Poppins", sans-serif' }}>Our Mission</h3>
              <p className="text-xs text-gray-700 dark:text-gray-300 leading-relaxed">
                To promote excellence in software development by fostering a culture of quality, testing, and continuous learning among students.
              </p>
            </div>
            
            <div className="flex-1 rounded-3xl p-6 flex flex-col justify-end relative overflow-hidden bg-[#7A1E2C] dark:bg-gradient-to-br dark:from-[#2e0911] dark:to-[#0f0306] border border-white/10 dark:border-[#7A1E2C]/50 shadow-lg text-white">
              <div className="mb-4 text-[#f3d8ad] dark:text-[#d95d39]">
                <Telescope size={28} />
              </div>
              <h3 className="text-2xl font-bold mb-2 tracking-tight text-white" style={{ fontFamily: '"Poppins", sans-serif' }}>Our Vision</h3>
              <p className="text-xs text-gray-200 dark:text-gray-300 leading-relaxed">
                To be a leading student community that inspires future technologists to build scalable, reliable, and impactful software solutions.
              </p>
            </div>
          </motion.div>
        </div>

        {/* ROW 2: Meet The Community Interactive Carousel */}
        <motion.div
          variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
          className="w-full pt-8"
        >
          <div className="max-w-6xl mx-auto rounded-[3rem] bg-white/40 dark:bg-black/80 border border-[#7A1E2C]/20 dark:border-[#7A1E2C]/40 p-6 sm:p-10 lg:p-12 shadow-2xl">
            
            <div className="flex flex-col lg:flex-row items-center gap-10">
              
              {/* Left Column: Text & Controls */}
              <div className="lg:w-5/12 flex flex-col justify-between h-full">
                <div>
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#951D13]/10 dark:bg-[#7A1E2C]/30 text-[#951D13] dark:text-[#d95d39] text-xs font-bold uppercase tracking-wider mb-4 border border-[#951D13]/20 dark:border-[#7A1E2C]/50">
                    <Users size={14} />
                    SQAC Network
                  </div>

                  <h2
                    className="text-4xl sm:text-5xl font-black mb-2 tracking-wider uppercase bg-clip-text text-transparent bg-gradient-to-r from-[#951D13] via-[#f34a82] to-[#F0A01F] dark:from-[#7A1E2C] dark:via-[#A93C38] dark:to-[#d95d39]"
                    style={{ fontFamily: '"Poppins", sans-serif' }}
                  >
                    Meet The<br/>Community
                  </h2>

                  <div className="h-[2px] w-36 bg-gradient-to-r from-[#951D13] via-[#f34a82] to-transparent dark:via-[#7A1E2C] my-3"></div>

                  <p className="text-sm sm:text-base text-gray-800 dark:text-gray-300 leading-relaxed mb-6">
                    SQAC is driven by a passionate board of students dedicated to bridging the gap between academic learning and industry standards. 
                    Our leadership guides the strategic vision and overall execution of the community's events, projects, and media presence.
                  </p>
                </div>

                {/* Animated Slide Caption & Progress */}
                <div className="p-5 rounded-2xl bg-white/60 dark:bg-white/5 border border-gray-200 dark:border-white/10 mb-6">
                  <div className="flex items-center justify-between text-xs font-bold text-[#951D13] dark:text-[#d95d39] mb-2 uppercase tracking-wider">
                    <span>{communitySlides[currentSlide].tag}</span>
                    <span className="opacity-70">0{currentSlide + 1} / 0{communitySlides.length}</span>
                  </div>
                  <h4 className="text-lg font-bold text-[#7A1E2C] dark:text-white mb-1">
                    {communitySlides[currentSlide].title}
                  </h4>
                  <p className="text-xs text-gray-700 dark:text-gray-300 leading-relaxed">
                    {communitySlides[currentSlide].subtitle}
                  </p>
                </div>

                {/* Carousel Controls */}
                <div className="flex items-center justify-between gap-4">
                  {/* Indicators */}
                  <div className="flex items-center gap-2">
                    {communitySlides.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setCurrentSlide(idx)}
                        className={`h-2.5 rounded-full transition-all duration-300 ${
                          currentSlide === idx 
                            ? "w-8 bg-[#951D13] dark:bg-[#d95d39]" 
                            : "w-2.5 bg-gray-300 dark:bg-white/20 hover:bg-[#951D13]/50"
                        }`}
                        aria-label={`Go to slide ${idx + 1}`}
                      />
                    ))}
                  </div>

                  {/* Nav Buttons */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setIsPlaying(!isPlaying)}
                      className="p-3 rounded-2xl bg-white/80 dark:bg-white/10 text-gray-800 dark:text-white hover:bg-[#951D13] hover:text-white dark:hover:bg-[#7A1E2C] transition-all shadow-md cursor-pointer"
                      title={isPlaying ? "Pause Autoplay" : "Play Autoplay"}
                    >
                      {isPlaying ? <Pause size={16} /> : <Play size={16} />}
                    </button>

                    <button
                      onClick={handlePrev}
                      className="p-3 rounded-2xl bg-white/80 dark:bg-white/10 text-gray-800 dark:text-white hover:bg-[#951D13] hover:text-white dark:hover:bg-[#7A1E2C] transition-all shadow-md cursor-pointer"
                      aria-label="Previous Slide"
                    >
                      <ChevronLeft size={18} />
                    </button>

                    <button
                      onClick={handleNext}
                      className="p-3 rounded-2xl bg-white/80 dark:bg-white/10 text-gray-800 dark:text-white hover:bg-[#951D13] hover:text-white dark:hover:bg-[#7A1E2C] transition-all shadow-md cursor-pointer"
                      aria-label="Next Slide"
                    >
                      <ChevronRight size={18} />
                    </button>
                  </div>
                </div>

              </div>

              {/* Right Column: Carousel Photo Showcase */}
              <div className="lg:w-7/12 w-full">
                <div 
                  className="relative rounded-3xl overflow-hidden shadow-2xl border-2 border-white/20 dark:border-[#7A1E2C]/40 aspect-[4/3] sm:aspect-[16/10] bg-black/40 group cursor-pointer"
                  onMouseEnter={() => setIsPlaying(false)}
                  onMouseLeave={() => setIsPlaying(true)}
                >
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={currentSlide}
                      src={communitySlides[currentSlide].image}
                      alt={communitySlides[currentSlide].title}
                      initial={{ opacity: 0, scale: 1.05 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.98 }}
                      transition={{ duration: 0.6, ease: "easeInOut" }}
                      className="w-full h-full object-cover object-center"
                    />
                  </AnimatePresence>

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

                  {/* Badge */}
                  <div className="absolute top-4 right-4 bg-black/70 text-white text-xs font-bold px-3.5 py-1.5 rounded-full border border-white/20 flex items-center gap-1.5 shadow-lg">
                    <span className="w-2 h-2 rounded-full bg-[#d95d39] animate-pulse" />
                    {communitySlides[currentSlide].tag}
                  </div>
                </div>
              </div>

            </div>

          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default AboutUsHero;
