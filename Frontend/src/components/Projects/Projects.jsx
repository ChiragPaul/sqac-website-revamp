import React, { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Navbar from '../HomePage/Navbar';
import './projects.css';
import { ExternalLink, Github, PlayCircle } from 'lucide-react';

const DUMMY_IMG = "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1200&auto=format&fit=crop"; // Space theme image
const DUMMY_VIDEO = "https://www.w3schools.com/html/mov_bbb.mp4"; 

const PROJECTS_DATA = [
  { id: 1, title: 'ROAST MY LP', link: 'https://roastmylpage.vercel.app', src: DUMMY_IMG, type: 'image', desc: 'AI-powered landing page roasting system.' },
  { id: 2, title: 'AURA SHOT AI', link: 'https://aurashot.vercel.app', src: DUMMY_IMG, type: 'image', desc: 'Next-gen generative photography platform.' },
  { id: 3, title: 'AI FAST PRO', link: 'https://aifastweb.vercel.app', src: DUMMY_IMG, type: 'image', desc: 'Rapid prototyping and deployment ecosystem.' },
  { id: 4, title: 'VIGILX', link: 'https://github.com/nightfury12901/VigilX', src: DUMMY_IMG, type: 'image', desc: 'Autonomous threat detection protocol.' },
  { id: 5, title: 'MEDISCAN AI', link: 'https://github.com/nightfury12901/mediscan-ai', src: DUMMY_VIDEO, type: 'video', desc: 'Neural network for medical imaging.' },
  { id: 6, title: 'TOURIST SAFETY APP', link: 'https://github.com/nightfury12901/TouristSafetyAppExpo', src: DUMMY_VIDEO, type: 'video', desc: 'Real-time global safety tracking.' },
  { id: 7, title: 'CREATOROS', link: 'https://github.com/nightfury12901/ALLURA', src: DUMMY_VIDEO, type: 'video', desc: 'Operating system for the creator economy.' },
];

export default function Projects() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Parallax effects
  const yBackground = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  
  return (
    <div ref={containerRef} className="relative min-h-screen bg-[#020205] text-white overflow-hidden font-sans pb-32">
      <Navbar />

      {/* Astro Background */}
      <motion.div 
        style={{ y: yBackground }}
        className="absolute inset-0 pointer-events-none opacity-60 mix-blend-screen"
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-[#020205] to-[#020205]" />
        <div className="stars" />
        <div className="twinkling" />
        <div className="clouds" />
      </motion.div>

      <div className="relative z-10 container mx-auto px-6 pt-32">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-center mb-24"
        >
          <div className="inline-block mb-4 px-4 py-1.5 rounded-full border border-blue-500/30 bg-blue-500/10 backdrop-blur-md">
            <span className="text-xs font-bold uppercase tracking-widest text-blue-400">Classified Archives</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter bg-clip-text text-transparent bg-gradient-to-b from-white to-white/40 leading-tight">
            Mission Logs
          </h1>
          <p className="mt-4 text-white/50 max-w-2xl mx-auto font-medium text-lg">
            Explore the celestial bodies of work our squads have deployed into the digital universe.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {PROJECTS_DATA.map((project, idx) => (
            <motion.a
              href={project.link}
              target="_blank"
              rel="noreferrer"
              key={project.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="group relative block rounded-3xl overflow-hidden bg-white/[0.02] border border-white/10 hover:border-blue-500/50 transition-colors duration-500"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/50 to-black z-10" />
              
              {/* Media */}
              <div className="relative h-64 w-full overflow-hidden">
                {project.type === 'image' ? (
                  <img 
                    src={project.src} 
                    alt={project.title}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-out opacity-80 group-hover:opacity-100"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-900 flex items-center justify-center transform group-hover:scale-110 transition-transform duration-700">
                    <PlayCircle className="w-12 h-12 text-white/30" />
                  </div>
                )}
                <div className="absolute inset-0 bg-blue-500/10 mix-blend-overlay group-hover:opacity-0 transition-opacity duration-500" />
              </div>

              {/* Content */}
              <div className="absolute bottom-0 left-0 w-full p-6 z-20 translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_10px_#3b82f6]" />
                  <span className="text-[10px] font-bold uppercase tracking-widest text-blue-400">Deployed</span>
                </div>
                <h3 className="text-2xl font-bold text-white mb-2 tracking-tight group-hover:text-blue-200 transition-colors">
                  {project.title}
                </h3>
                <p className="text-white/60 text-sm mb-4 line-clamp-2">
                  {project.desc}
                </p>
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-white/40 group-hover:text-white transition-colors">
                  {project.link.includes('github') ? (
                    <><Github className="w-4 h-4" /> View Repository</>
                  ) : (
                    <><ExternalLink className="w-4 h-4" /> Launch Orbit</>
                  )}
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </div>
  );
}
