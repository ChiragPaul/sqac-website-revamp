import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  Mail, 
  Phone, 
  GraduationCap, 
  Building2, 
  Briefcase, 
  BookOpen, 
  Sparkles, 
  Award,
  ChevronDown,
  ChevronUp
} from "lucide-react";
import { FaLinkedin, FaGraduationCap } from "react-icons/fa";
import { SiScopus, SiResearchgate } from "react-icons/si";

import suganiyaPhoto from "../../assets/faculty_suganiya.png";
import ajanthaPhoto from "../../assets/faculty_ajantha.png";

const mentors = [
  {
    id: "suganiya",
    name: "Dr. Suganiya M",
    title: "Assistant Professor",
    campus: "Department of Computing Technologies, Faculty of Engineering & Technology, Kattankulathur - Chennai",
    experience: "5.0 years of experience",
    phone: "9600092417",
    email: "suganiym@srmist.edu.in",
    photo: suganiyaPhoto,
    researchInterests: [
      "Artificial Intelligence",
      "Machine Learning",
      "Signal Processing",
      "Image Processing"
    ],
    courses: [
      "Operating System",
      "Data structures",
      "Programming for Problem Solving",
      "Machine Learning",
      "Python Programming",
      "Community connect",
      "Indian Art Form",
      "Universal Human Values",
      "Indian Traditional Knowledge",
      "Design and Analysis of Algorithm",
      "Data Mining and Analytics"
    ],
    links: {
      linkedin: "#",
      scholar: "https://scholar.google.com",
      scopus: "https://www.scopus.com"
    }
  },
  {
    id: "ajantha",
    name: "Dr. Ajantha L",
    title: "Assistant Professor",
    campus: "Department of Computing Technologies, Faculty of Engineering & Technology, Kattankulathur - Chennai",
    experience: "14+ years of experience",
    phone: null,
    email: "ajanthal@srmist.edu.in",
    photo: ajanthaPhoto,
    researchInterests: [
      "Artificial Intelligence",
      "Machine Learning",
      "Image Processing",
      "Deep Learning"
    ],
    courses: [
      "Data Structures and Algorithm",
      "Advanced Data Structures",
      "Computer Architecture and Organization",
      "Artificial Intelligence",
      "Computer Graphics and Multimedia",
      "Database Management Systems",
      "Data warehousing and Data mining",
      "Fundamental of Programming",
      "Advanced Programming Practice",
      "Design and Analysis of Algorithms"
    ],
    links: {
      linkedin: "#",
      scholar: "https://scholar.google.com",
      scopus: "https://www.scopus.com",
      researchgate: "https://www.researchgate.net"
    }
  }
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.2, ease: [0.16, 1, 0.3, 1] }
  })
};

const FacultyMentorCard = ({ mentor, index }) => {
  const [showAllCourses, setShowAllCourses] = useState(false);
  const displayedCourses = showAllCourses ? mentor.courses : mentor.courses.slice(0, 6);

  return (
    <motion.div
      custom={index}
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="group relative rounded-[2.5rem] bg-white/40 dark:bg-black/80 border border-[#7A1E2C]/20 dark:border-[#7A1E2C]/40 p-6 sm:p-8 lg:p-10 shadow-2xl transition-all duration-500 flex flex-col justify-between"
    >
      <div>
        {/* Header Section: Photo + Main Info */}
        <div className="flex flex-col sm:flex-row gap-6 items-center sm:items-start mb-8 relative z-10">
          
          {/* Photo Frame */}
          <div className="relative flex-shrink-0">
            <div className="w-32 h-32 sm:w-36 sm:h-36 rounded-2xl overflow-hidden border-2 border-[#951D13]/40 dark:border-[#7A1E2C]/60 shadow-xl relative group-hover:scale-105 transition-transform duration-500">
              <img 
                src={mentor.photo} 
                alt={mentor.name} 
                className="w-full h-full object-cover object-top"
              />
            </div>
            {/* Experience Badge */}
            <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#951D13] to-[#7A1E2C] dark:from-[#7A1E2C] dark:to-[#d95d39] text-white text-[11px] font-bold px-3 py-1 rounded-full shadow-lg whitespace-nowrap flex items-center gap-1 border border-white/20">
              <Briefcase size={12} />
              {mentor.experience}
            </div>
          </div>

          {/* Details */}
          <div className="flex-1 text-center sm:text-left">
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full bg-[#951D13]/10 dark:bg-[#7A1E2C]/30 text-[#951D13] dark:text-[#d95d39] mb-2 border border-[#951D13]/20 dark:border-[#7A1E2C]/50">
              <GraduationCap size={14} />
              {mentor.title}
            </div>

            <h3 
              className="text-2xl sm:text-3xl font-black text-[#7A1E2C] dark:text-white tracking-tight mb-2"
              style={{ fontFamily: '"Poppins", sans-serif' }}
            >
              {mentor.name}
            </h3>

            <p className="text-xs text-gray-700 dark:text-gray-300 leading-relaxed mb-4 flex items-start gap-1.5 justify-center sm:justify-start">
              <Building2 size={15} className="text-[#951D13] dark:text-[#d95d39] flex-shrink-0 mt-0.5" />
              <span>{mentor.campus}</span>
            </p>

            {/* Quick Contact Links */}
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 text-xs">
              <a 
                href={`mailto:${mentor.email}`}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/60 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-800 dark:text-gray-200 hover:text-[#951D13] dark:hover:text-[#d95d39] hover:border-[#951D13]/40 transition-all font-medium"
              >
                <Mail size={13} className="text-[#951D13] dark:text-[#d95d39]" />
                {mentor.email}
              </a>

              {mentor.phone && (
                <a 
                  href={`tel:${mentor.phone}`}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/60 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-800 dark:text-gray-200 hover:text-[#951D13] dark:hover:text-[#d95d39] hover:border-[#951D13]/40 transition-all font-medium"
                >
                  <Phone size={13} className="text-[#951D13] dark:text-[#d95d39]" />
                  {mentor.phone}
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-[#7A1E2C]/20 dark:via-[#7A1E2C]/40 to-transparent my-6" />

        {/* Research Interests Section */}
        <div className="mb-6 relative z-10">
          <h4 className="text-xs uppercase font-bold tracking-wider text-[#951D13] dark:text-[#d95d39] mb-3 flex items-center gap-1.5">
            <Sparkles size={14} />
            Research Interests
          </h4>
          <div className="flex flex-wrap gap-2">
            {mentor.researchInterests.map((interest, idx) => (
              <span
                key={idx}
                className="px-3 py-1 rounded-xl text-xs font-semibold bg-[#951D13]/10 dark:bg-[#7A1E2C]/30 border border-[#951D13]/20 dark:border-[#7A1E2C]/40 text-[#7A1E2C] dark:text-red-200 shadow-sm"
              >
                {interest}
              </span>
            ))}
          </div>
        </div>

        {/* Courses Section */}
        <div className="relative z-10">
          <h4 className="text-xs uppercase font-bold tracking-wider text-[#951D13] dark:text-[#d95d39] mb-3 flex items-center gap-1.5">
            <BookOpen size={14} />
            Courses Taught ({mentor.courses.length})
          </h4>
          <div className="flex flex-wrap gap-2">
            {displayedCourses.map((course, idx) => (
              <span
                key={idx}
                className="px-2.5 py-1 rounded-lg text-[11px] font-medium bg-white/70 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-800 dark:text-gray-300"
              >
                {course}
              </span>
            ))}
          </div>

          {mentor.courses.length > 6 && (
            <button
              onClick={() => setShowAllCourses(!showAllCourses)}
              className="mt-3 inline-flex items-center gap-1 text-xs font-bold text-[#951D13] dark:text-[#d95d39] hover:underline cursor-pointer"
            >
              {showAllCourses ? (
                <>Show Less <ChevronUp size={14} /></>
              ) : (
                <>+ {mentor.courses.length - 6} More Courses <ChevronDown size={14} /></>
              )}
            </button>
          )}
        </div>
      </div>

      {/* Footer Social / Academic Links */}
      <div className="mt-8 pt-4 border-t border-gray-200/50 dark:border-white/10 flex items-center justify-between relative z-10">
        <span className="text-xs font-semibold text-gray-500 dark:text-gray-400">
          Academic Profiles
        </span>
        <div className="flex items-center gap-3">
          <a
            href={mentor.links.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            title="LinkedIn Profile"
            className="p-2 rounded-xl bg-white/80 dark:bg-white/10 text-[#0A66C2] hover:scale-110 transition-transform shadow"
          >
            <FaLinkedin size={16} />
          </a>
          <a
            href={mentor.links.scholar}
            target="_blank"
            rel="noopener noreferrer"
            title="Google Scholar Profile"
            className="p-2 rounded-xl bg-white/80 dark:bg-white/10 text-[#4285F4] hover:scale-110 transition-transform shadow"
          >
            <FaGraduationCap size={16} />
          </a>
          <a
            href={mentor.links.scopus}
            target="_blank"
            rel="noopener noreferrer"
            title="Scopus Profile"
            className="p-2 rounded-xl bg-white/80 dark:bg-white/10 text-[#FF6F00] hover:scale-110 transition-transform shadow"
          >
            <SiScopus size={16} />
          </a>
          {mentor.links.researchgate && (
            <a
              href={mentor.links.researchgate}
              target="_blank"
              rel="noopener noreferrer"
              title="ResearchGate Profile"
              className="p-2 rounded-xl bg-white/80 dark:bg-white/10 text-[#00CCBB] hover:scale-110 transition-transform shadow"
            >
              <SiResearchgate size={16} />
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
};

const FacultyMentors = () => {
  return (
    <section className="relative w-full py-20 px-4 sm:px-8 lg:px-16 z-10 font-sans">
      <div className="max-w-[1400px] mx-auto">
        
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#951D13]/10 dark:bg-[#7A1E2C]/30 border border-[#951D13]/20 dark:border-[#7A1E2C]/50 text-[#951D13] dark:text-[#d95d39] text-xs uppercase font-bold tracking-widest mb-4">
            <Award size={14} />
            Academic Guidance
          </div>

          <h2
            className="text-4xl sm:text-5xl lg:text-6xl font-black uppercase tracking-wider mb-2 bg-clip-text text-transparent bg-gradient-to-r from-[#951D13] via-[#f34a82] to-[#F0A01F] dark:from-[#7A1E2C] dark:via-[#A93C38] dark:to-[#d95d39]"
            style={{ fontFamily: '"Poppins", sans-serif' }}
          >
            OUR FACULTY MENTORS
          </h2>

          <div className="h-[2px] w-48 mx-auto bg-gradient-to-r from-transparent via-[#f34a82] dark:via-[#7A1E2C] to-transparent my-3"></div>

          <p className="text-gray-700 dark:text-gray-300 text-sm sm:text-base leading-relaxed mt-4">
            Our community thrives under the guidance of experienced academia leaders who support our technical endeavors, foster student innovation, and connect us with industry standards.
          </p>
        </motion.div>

        {/* Mentors Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {mentors.map((mentor, idx) => (
            <FacultyMentorCard key={mentor.id} mentor={mentor} index={idx} />
          ))}
        </div>

      </div>
    </section>
  );
};

export default FacultyMentors;
