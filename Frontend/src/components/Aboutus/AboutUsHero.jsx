import React from "react";
import { motion } from "framer-motion";
import { Target, Telescope } from "lucide-react";
import TeamPic from "../../assets/SQAC_Team.jpg";
import GroupPic from "../../assets/SQAC_Group_photo.jpg"; // Adjust path if needed

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
};

const BentoCard = ({ children, className = "", style = {} }) => (
  <div
    className={`rounded-3xl p-6 sm:p-8 overflow-hidden relative ${className}`}
    style={{
      background: "linear-gradient(145deg, rgba(255,255,255,0.4), rgba(255,255,255,0.1))",
      border: `1px solid rgba(255,255,255,0.2)`,
      boxShadow: `0 8px 32px 0 rgba(0,0,0,0.1), inset 0 0 0 1px rgba(255,255,255,0.1)`,
      backdropFilter: "blur(20px)",
      ...style
    }}
  >
    {children}
  </div>
);

const DarkBentoCard = ({ children, className = "", style = {} }) => (
  <div
    className={`rounded-3xl p-6 sm:p-8 overflow-hidden relative ${className}`}
    style={{
      background: "linear-gradient(145deg, rgba(20,12,30,0.8), rgba(10,5,18,0.9))",
      border: `1px solid rgba(255,255,255,0.05)`,
      boxShadow: `0 8px 32px 0 rgba(0,0,0,0.3), inset 0 0 0 1px rgba(255,255,255,0.02)`,
      backdropFilter: "blur(20px)",
      ...style
    }}
  >
    {children}
  </div>
);

const AboutUsHero = () => {
  return (
    <section className="relative w-full pt-32 pb-24 px-4 sm:px-8 lg:px-16 z-10 font-sans">
      <div className="max-w-[1400px] mx-auto flex flex-col gap-8">
        
        {/* ROW 1: Hero Bento */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 min-h-[450px]">
          
          {/* Title Area (Col 1-4) */}
          <motion.div
            variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="lg:col-span-4 flex flex-col justify-center"
          >
            <h2
              className="text-6xl sm:text-7xl lg:text-8xl font-black tracking-tight leading-[0.85] mb-6 uppercase text-[#951D13] dark:text-[#f3d8ad]"
              style={{ fontFamily: '"Poppins", sans-serif' }}
            >
              ABOUT<br/>US
            </h2>
            <p className="text-sm text-[#7A1E2C] dark:text-[#c87850] font-bold tracking-wider uppercase mb-6">
              Where Code Meets Quality
            </p>
            <p className="text-gray-800 dark:text-gray-300 text-sm leading-relaxed">
              Founded at SRMIST, SQAC is a student-led technical community. We are passionate about clean code, real-world projects, and collaborative learning.
            </p>
          </motion.div>

          {/* Large Image Area (Col 5-9) */}
          <motion.div
            variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="lg:col-span-5 rounded-3xl overflow-hidden relative group h-[300px] lg:h-auto"
          >
            <img
              src={TeamPic}
              alt="SQAC Team"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-90 dark:opacity-80"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#7A1E2C]/50 via-transparent to-transparent opacity-80" />
            <div className="absolute inset-0 border border-white/20 rounded-3xl pointer-events-none mix-blend-overlay" />
          </motion.div>

          {/* Philosophy / Mission Area (Col 10-12) */}
          <motion.div
            variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="lg:col-span-3 flex flex-col gap-4 h-full"
          >
            <div className="flex-1 rounded-3xl p-6 flex flex-col justify-end relative overflow-hidden bg-white/40 dark:bg-black/40 border border-[#7A1E2C]/10 dark:border-white/10 backdrop-blur-md shadow-lg">
              <div className="mb-4 text-[#951D13] dark:text-[#e8a87c] opacity-90">
                <Target size={28} />
              </div>
              <h3 className="text-2xl font-bold mb-2 tracking-tight text-[#7A1E2C] dark:text-white" style={{ fontFamily: '"Poppins", sans-serif' }}>Our Mission</h3>
              <p className="text-xs text-gray-700 dark:text-gray-400 leading-relaxed">
                To promote excellence in software development by fostering a culture of quality, testing, and continuous learning among students.
              </p>
            </div>
            
            <div className="flex-1 rounded-3xl p-6 flex flex-col justify-end relative overflow-hidden bg-[#7A1E2C] dark:bg-[#1a0033] border border-white/10 shadow-lg text-white">
              <div className="mb-4 text-[#f3d8ad] dark:text-purple-400 opacity-90">
                <Telescope size={28} />
              </div>
              <h3 className="text-2xl font-bold mb-2 tracking-tight text-white" style={{ fontFamily: '"Poppins", sans-serif' }}>Our Vision</h3>
              <p className="text-xs text-gray-200 dark:text-gray-400 leading-relaxed">
                To be a leading student community that inspires future technologists to build scalable, reliable, and impactful software solutions.
              </p>
            </div>
          </motion.div>
        </div>

        {/* ROW 2: Meet The Team (Principals equivalent) */}
        <motion.div
          variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
          className="w-full py-16"
        >
          <div className="max-w-5xl mx-auto rounded-[3rem] bg-white/30 dark:bg-black/30 border border-[#7A1E2C]/20 dark:border-white/10 backdrop-blur-xl p-8 lg:p-12 shadow-xl flex flex-col md:flex-row items-center gap-10">
            <div className="md:w-1/2">
                <h2
                className="text-4xl sm:text-5xl font-black mb-6 tracking-tighter uppercase text-[#951D13] dark:text-[#f3d8ad]"
                style={{ fontFamily: '"Poppins", sans-serif' }}
                >
                Meet The<br/>Community
                </h2>
                <p className="text-base text-gray-800 dark:text-gray-300 leading-relaxed mb-6">
                SQAC is driven by a passionate board of students dedicated to bridging the gap between academic learning and industry standards. 
                Our leadership guides the strategic vision and overall execution of the community's events, projects, and media presence.
                </p>
            </div>
            <div className="md:w-1/2 w-full rounded-3xl overflow-hidden relative border border-white/20 shadow-2xl">
                <img src={GroupPic} alt="SQAC Group" className="w-full h-auto object-cover" />
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default AboutUsHero;
