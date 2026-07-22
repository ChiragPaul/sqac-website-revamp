import React from "react";
import { motion } from "framer-motion";
import {
  Target,
  Telescope,
  Code,
  Users,
  Lightbulb,
  ShieldCheck,
  Handshake,
  Monitor,
  Briefcase,
  Film,
  Shield
} from "lucide-react";

/* ────── Data ────── */
const clubInfo = {
  title: "ABOUT THE CLUB",
  content: "SQAC (Software Quality Assurance & Community) is a technical student community dedicated to advancing software quality, testing practices, and product reliability. We empower students to learn, build, and lead.",
};

const domains = [
  {
    id: "technical",
    title: "TECHNICAL",
    icon: Monitor,
    content: "Web Dev, App Dev, and AI/ML. We build robust, scalable applications and explore the frontiers of artificial intelligence and machine learning to solve real-world problems.",
  },
  {
    id: "corporate",
    title: "CORPORATE",
    icon: Briefcase,
    content: "Sponsorships and Events. We manage the operational lifeline of the club, securing partnerships, organizing tech events, and ensuring smooth logistical execution.",
  },
  {
    id: "media",
    title: "MEDIA",
    icon: Film,
    content: "Creative and PR. We are the voice and visual identity of SQAC, crafting compelling narratives, designing digital assets, and managing our public relations footprint.",
  },
  {
    id: "board",
    title: "BOARD",
    icon: Shield,
    content: "The core leadership encompassing the Secretary, Joint Secretary, and Tech/Corp leads, guiding the strategic vision and overall execution of the community.",
  }
];

const GLOW_COLOR = "rgba(232, 140, 100, 0.45)";
const BORDER_COL = "#c87850";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
};

const BentoCard = ({ children, className = "", style = {} }) => (
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

const AboutUsMissionVision = () => {
  return (
    <section className="relative w-full min-h-screen py-24 px-4 sm:px-8 lg:px-16 z-10 overflow-hidden text-white font-sans">
      
      {/* Background ambient glows */}
      <div className="absolute top-[20%] left-[10%] w-[40vw] h-[40vw] rounded-full bg-[#c87850] opacity-[0.03] blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[10%] w-[30vw] h-[30vw] rounded-full bg-purple-500 opacity-[0.03] blur-[100px] pointer-events-none" />

      <div className="max-w-[1400px] mx-auto flex flex-col gap-8">
        
        {/* ROW 1: Hero Bento */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 min-h-[450px]">
          
          {/* Title Area (Col 1-3) */}
          <motion.div 
            variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="lg:col-span-3 flex flex-col justify-center"
          >
            <h2 
              className="text-6xl sm:text-7xl lg:text-8xl font-black tracking-tight leading-[0.85] mb-6 uppercase"
              style={{ fontFamily: '"Poppins", sans-serif' }}
            >
              ABOUT<br/>US
            </h2>
            <p className="text-sm text-gray-400 font-light tracking-wider uppercase mb-6">
              Building Better Software. Together.
            </p>
            <p className="text-gray-300 text-sm leading-relaxed">
              Modern Elegance: Designs featuring clean lines, neutral palettes, and high-quality materials applied to software engineering.
            </p>
          </motion.div>

          {/* Large Image Area (Col 4-9) */}
          <motion.div 
            variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="lg:col-span-6 rounded-3xl overflow-hidden relative group h-[300px] lg:h-auto"
          >
            <img 
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" 
              alt="Team collaboration" 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0512] via-transparent to-transparent opacity-80" />
            <div className="absolute inset-0 border border-white/10 rounded-3xl pointer-events-none mix-blend-overlay" />
          </motion.div>

          {/* Mission/Vision Area (Col 10-12) */}
          <motion.div 
            variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="lg:col-span-3 flex flex-col gap-4 h-full"
          >
            <BentoCard className="flex-1 flex flex-col justify-end p-6">
              <div className="mb-4 text-[#e8a87c] opacity-80">
                <Target size={28} />
              </div>
              <h3 className="text-2xl font-bold mb-2 tracking-tight" style={{ fontFamily: '"Poppins", sans-serif' }}>Our Mission</h3>
              <p className="text-xs text-gray-400 leading-relaxed">
                To promote excellence in software development by fostering a culture of quality and continuous learning.
              </p>
            </BentoCard>
            <BentoCard className="flex-1 flex flex-col justify-end p-6" style={{ background: 'linear-gradient(145deg, rgba(30,18,45,0.8), rgba(15,8,25,0.9))' }}>
              <div className="mb-4 text-purple-400 opacity-80">
                <Telescope size={28} />
              </div>
              <h3 className="text-2xl font-bold mb-2 tracking-tight" style={{ fontFamily: '"Poppins", sans-serif' }}>Our Vision</h3>
              <p className="text-xs text-gray-400 leading-relaxed">
                To be a leading community that inspires future technologists to build scalable, impactful solutions.
              </p>
            </BentoCard>
          </motion.div>
        </div>

        {/* ROW 2: About The Club (Principals) */}
        <motion.div 
          variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
          className="w-full py-16 lg:py-24"
        >
          <BentoCard className="max-w-4xl mx-auto flex flex-col items-center text-center !p-12 lg:!p-16 !rounded-[3rem]">
            <Users size={40} className="text-[#c87850] mb-6 opacity-60" />
            <h2 
              className="text-4xl sm:text-5xl lg:text-6xl font-black mb-8 tracking-tighter uppercase"
              style={{ fontFamily: '"Poppins", sans-serif' }}
            >
              {clubInfo.title}
            </h2>
            <p className="text-lg sm:text-xl text-gray-300 font-light leading-relaxed max-w-2xl mx-auto">
              {clubInfo.content}
            </p>
          </BentoCard>
        </motion.div>

        {/* ROW 3: Domains (Services) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          
          <motion.div 
            variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="flex flex-col gap-6"
          >
            <h2 
              className="text-5xl font-black tracking-tight mb-2 uppercase"
              style={{ fontFamily: '"Poppins", sans-serif' }}
            >
              Our Domains
            </h2>
            <p className="text-sm text-gray-400 leading-relaxed max-w-md">
              At SQAC, we operate through specialized domains to ensure a comprehensive approach to technology, management, and community building.
            </p>

            <div className="rounded-[2.5rem] overflow-hidden mt-6 relative h-[400px] border border-white/10 group">
              <img 
                src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                alt="Workspace" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-70"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-[#0a0512] via-transparent to-transparent opacity-90" />
            </div>
          </motion.div>

          <motion.div 
            variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="flex flex-col gap-10 lg:pt-8"
          >
            {domains.map((domain, i) => {
              const Icon = domain.icon;
              return (
                <div key={domain.id} className="flex gap-6 group">
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-12 h-12 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-white/50 group-hover:text-[#c87850] group-hover:border-[#c87850]/30 transition-colors duration-300">
                      <Icon size={20} />
                    </div>
                  </div>
                  <div>
                    <h3 
                      className="text-xl font-bold mb-3 tracking-wider uppercase"
                      style={{ fontFamily: '"Poppins", sans-serif' }}
                    >
                      {domain.title}
                    </h3>
                    <p className="text-sm text-gray-400 leading-relaxed">
                      {domain.content}
                    </p>
                  </div>
                </div>
              )
            })}
          </motion.div>

        </div>

      </div>
    </section>
  );
};

export default AboutUsMissionVision;
