import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Code, Briefcase, Film, ArrowUpRight } from 'lucide-react';

export default function Domains({ darkMode }) {
  const domains = [
    {
      id: 'board',
      title: 'Board',
      subtitle: 'Leadership & Vision',
      description: 'Driving strategy, culture, and growth. The executive board directs the organization’s overall mission, resource allocation, and core governance structures.',
      memberCount: 5,
      icon: Shield,
      colorClass: 'from-[#E83F7A] to-[#FF7A59]',
      glowColor: 'rgba(232, 63, 122, 0.4)',
      bgBlob: 'bg-[#E83F7A]/10',
    },
    {
      id: 'technical',
      title: 'Technical',
      subtitle: 'Builders & Innovators',
      description: 'Creating products, platforms, and solutions. We engineer production-ready web and mobile apps, optimize databases, and write robust automated QA frameworks.',
      memberCount: 8,
      icon: Code,
      colorClass: 'from-[#FF7A59] to-[#F6B547]',
      glowColor: 'rgba(255, 122, 89, 0.4)',
      bgBlob: 'bg-[#FF7A59]/10',
    },
    {
      id: 'corporate',
      title: 'Corporate',
      subtitle: 'Partnerships & Growth',
      description: 'Building opportunities and collaborations. Connecting the community with global tech firms, handling sponsorship outreach, and coordinating high-level events.',
      memberCount: 5,
      icon: Briefcase,
      colorClass: 'from-[#F6B547] to-[#F8C2B2]',
      glowColor: 'rgba(246, 181, 71, 0.4)',
      bgBlob: 'bg-[#F6B547]/10',
    },
    {
      id: 'media',
      title: 'Media',
      subtitle: 'Stories & Branding',
      description: 'Crafting content and community presence. Handling copy, storytelling, brand guides, UI/UX screens, video shoots, and motion graphic design.',
      memberCount: 5,
      icon: Film,
      colorClass: 'from-[#E83F7A] to-[#B52E4F]',
      glowColor: 'rgba(181, 46, 79, 0.4)',
      bgBlob: 'bg-[#B52E4F]/10',
    },
  ];

  const headerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: 'easeOut' },
    },
  };

  const gridVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <section
      id="domains"
      className="py-24 relative overflow-hidden"
    >
      {/* Decorative side accent blobs */}
      <div className="absolute right-0 top-1/3 w-[300px] h-[300px] bg-sqac-accent/10 rounded-full blur-[90px] pointer-events-none" />
      <div className="absolute left-0 bottom-1/4 w-[250px] h-[250px] bg-sqac-primary/10 rounded-full blur-[80px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          variants={headerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="text-center max-w-2xl mx-auto mb-20"
        >
          <h2 className={`text-xs uppercase tracking-[0.25em] font-extrabold mb-3 ${darkMode ? 'text-sqac-accent' : 'text-sqac-primary'
            }`}>
            Explore Our Domains
          </h2>
          <p className={`text-3xl sm:text-5xl font-black tracking-tight ${darkMode ? 'text-white' : 'text-gray-900'
            }`}>
            The Four Core Pillars of SQAC
          </p>
          <div className="w-12 h-1 bg-gradient-to-r from-sqac-primary to-sqac-secondary mx-auto mt-6 rounded-full" />
        </motion.div>

        {/* 2x2 Grid Container */}
        <motion.div
          variants={gridVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {domains.map((dom) => {
            const IconComponent = dom.icon;
            return (
              <motion.div
                key={dom.id}
                variants={cardVariants}
                whileHover={{
                  y: -10,
                  boxShadow: `0 20px 40px -10px ${dom.glowColor}`,
                }}
                className={`relative min-h-[380px] sm:min-h-[420px] rounded-3xl p-8 sm:p-10 flex flex-col justify-between overflow-hidden group cursor-pointer transition-all duration-300 ${darkMode ? 'glass-card-dark' : 'glass-card-light'
                  }`}
              >
                {/* Background Hover Gradient Overlay */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${dom.colorClass} opacity-0 group-hover:opacity-[0.04] dark:group-hover:opacity-[0.08] transition-opacity duration-500`}
                />

                {/* Ambient Corner Blob */}
                <div className={`absolute -right-16 -top-16 w-44 h-44 rounded-full ${dom.bgBlob} blur-2xl group-hover:scale-125 transition-transform duration-500`} />

                {/* Top Section: Icon and Explore Indicator */}
                <div className="flex justify-between items-start">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center bg-gradient-to-br ${dom.colorClass} text-white shadow-md shadow-sqac-primary/10`}>
                    <IconComponent className="w-6 h-6" />
                  </div>

                  {/* Explore Indicator */}
                  <motion.div
                    className={`w-10 h-10 rounded-full border flex items-center justify-center opacity-40 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300 ${darkMode
                        ? 'border-white/10 text-white group-hover:border-white/30'
                        : 'border-black/10 text-gray-900 group-hover:border-black/30'
                      }`}
                  >
                    <ArrowUpRight className="w-5 h-5 group-hover:rotate-45 transition-transform duration-300" />
                  </motion.div>
                </div>

                {/* Middle Content */}
                <div className="mt-12 space-y-4">
                  <div>
                    <h3 className={`text-xs uppercase tracking-widest font-bold mb-1 opacity-70 ${darkMode ? 'text-gray-400' : 'text-gray-600'
                      }`}>
                      {dom.subtitle}
                    </h3>
                    <h4 className={`text-2xl sm:text-3xl font-extrabold ${darkMode ? 'text-white' : 'text-gray-900'
                      }`}>
                      {dom.title}
                    </h4>
                  </div>

                  <p className={`text-sm sm:text-base font-normal leading-relaxed opacity-70 group-hover:opacity-90 transition-opacity duration-300 ${darkMode ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                    {dom.description}
                  </p>
                </div>

                {/* Bottom Section: Member Count & Action Label */}
                <div className="mt-8 pt-6 border-t border-black/5 dark:border-white/5 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className={`text-sm font-semibold ${darkMode ? 'text-gray-400' : 'text-gray-500'
                      }`}>
                      Members Active
                    </span>
                    <span className={`text-xs font-black px-2 py-0.5 rounded-full ${darkMode ? 'bg-white/10 text-[#FF6B8A]' : 'bg-black/5 text-sqac-primary'
                      }`}>
                      {dom.memberCount}
                    </span>
                  </div>

                  <span className="text-xs uppercase font-extrabold tracking-wider opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-sqac-primary dark:text-[#FF6B8A] flex items-center gap-1">
                    Explore Domain
                  </span>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
