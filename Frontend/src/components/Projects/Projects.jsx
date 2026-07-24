import React, { useRef } from 'react';
import Navbar from '../HomePage/Navbar';
import { Terminal, Folder, FileJson, FileText, ChevronRight, ChevronDown, Github } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTheme } from '../../contexts/ThemeContext';

export default function Projects() {
  const containerRef = useRef(null);
  const { isDarkMode } = useTheme();
  
  return (
    <div 
      ref={containerRef} 
      className={['w-full font-sans transition-colors duration-500 overflow-x-hidden relative min-h-screen', isDarkMode ? 'bg-black text-[#F5E1C2]' : 'bg-gradient-to-b from-[#f3d79e] via-[#f3d8ad] to-red-300 text-[#951D13]'].join(' ')}
    >
      <Navbar />

      {/* Global theme glows */}
      <div className={['absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full blur-[150px] pointer-events-none', isDarkMode ? 'bg-[#7A1E2C]/30' : 'bg-[#f34a82]/20'].join(' ')} />
      <div className={['absolute top-1/2 right-1/4 w-[500px] h-[500px] rounded-full blur-[150px] pointer-events-none', isDarkMode ? 'bg-[#A93C38]/20' : 'bg-[#F0A01F]/20'].join(' ')} />
      <div className={['absolute bottom-0 left-1/3 w-[500px] h-[500px] rounded-full blur-[150px] pointer-events-none', isDarkMode ? 'bg-[#d95d39]/20' : 'bg-[#951D13]/20'].join(' ')} />

      <div className="pt-32 pb-16 px-8 md:px-16 max-w-7xl mx-auto relative z-10 text-center">
        <h1 className={['text-5xl md:text-7xl font-bold tracking-tight mb-6 font-head bg-clip-text text-transparent bg-gradient-to-tr', isDarkMode ? 'from-[#7A1E2C] via-[#A93C38] to-[#d95d39]' : 'from-[#951D13] via-[#f34a82] to-[#F0A01F]'].join(' ')}>
          Our Projects
        </h1>
        <p className={['max-w-2xl mx-auto text-xl font-semibold', isDarkMode ? 'text-[#F5E1C2]/80' : 'text-[#bd4110]'].join(' ')}>
          Showcasing the technical initiatives and open-source contributions driven by the SQAC team.
        </p>
      </div>

      {/* PROJECT 1: Housie of Fame (Split Circular Layout) */}
      <div className={['relative min-h-[80vh] flex flex-col md:flex-row mt-12 backdrop-blur-sm transition-all duration-500', isDarkMode ? 'bg-gradient-to-b from-transparent via-black/20 to-transparent' : 'bg-gradient-to-b from-transparent via-white/20 to-transparent'].join(' ')}>
        {/* Left Side */}
        <div className={['w-full md:w-1/2 p-8 md:p-16 flex flex-col justify-center relative z-10 border-r', isDarkMode ? 'border-[#7A1E2C]/20' : 'border-[#F18B85]/30'].join(' ')}>
          <div className="max-w-xl">
            <p className={['font-mono text-xs tracking-widest uppercase mb-8', isDarkMode ? 'text-[#d95d39]' : 'text-[#bd4110]'].join(' ')}>001 / Interactive Gaming</p>
            <h2 className={['text-[3rem] md:text-[5rem] font-bold leading-[1.1] tracking-tight mb-8 font-head', isDarkMode ? 'text-[#F5E1C2]' : 'text-[#951D13]'].join(' ')}>
              Housie of Fame.
            </h2>
            <p className={['text-xl leading-relaxed mb-12 max-w-md font-semibold', isDarkMode ? 'text-[#F5E1C2]/70' : 'text-[#951D13]/80'].join(' ')}>
              A digital take on the classic game of Housie. Built for seamless multiplayer interaction, redefining how classic parlor games are played online.
            </p>
            <div className="flex items-center gap-4">
              <a href="https://github.com/SQAC-Tech/housie_of_fame" target="_blank" rel="noreferrer" className={['px-8 py-3 rounded-md font-bold transition-all flex items-center gap-2 border', isDarkMode ? 'bg-[#7A1E2C]/40 border-[#7A1E2C] text-[#F5E1C2] hover:bg-[#A93C38]/60 hover:shadow-[0_0_20px_#7A1E2C]' : 'bg-[#F18B85]/40 border-[#F18B85] text-[#951D13] hover:bg-[#F18B85]/60 hover:shadow-[0_0_20px_#F18B85]'].join(' ')}>
                <Github size={18} /> View Repo
              </a>
            </div>
          </div>
          
          <div className={['absolute bottom-8 left-8 right-8 flex justify-between font-mono text-[10px] uppercase font-bold', isDarkMode ? 'text-[#F5E1C2]/50' : 'text-[#951D13]/60'].join(' ')}>
            <div>
              <p className={isDarkMode ? 'text-[#d95d39]' : 'text-[#bd4110]'}>Stack: React</p>
              <p>Multiplayer: WebSockets</p>
            </div>
            <div>
              <p className={isDarkMode ? 'text-[#d95d39]' : 'text-[#bd4110]'}>Status: Active</p>
              <p>Open Source</p>
            </div>
          </div>
        </div>

        {/* Right Side - Rotating Text Circle */}
        <div className={['w-full md:w-1/2 relative overflow-hidden flex items-center justify-center min-h-[50vh]', isDarkMode ? 'bg-gradient-to-br from-[#7A1E2C]/10 to-transparent' : 'bg-transparent'].join(' ')}>
          <div 
            style={{ willChange: 'transform' }}
            className="w-[120%] md:w-[150%] aspect-square absolute opacity-50 animate-[spin_60s_linear_infinite]"
          >
            <svg viewBox="0 0 1000 1000" className={['w-full h-full fill-current font-mono text-[18px] font-bold tracking-[0.1em] uppercase', isDarkMode ? 'text-[#d95d39]' : 'text-[#bd4110]'].join(' ')}>
              <defs>
                {[...Array(12)].map((_, i) => {
                  const r = 480 - (i * 38);
                  return (
                    <path 
                      key={i}
                      id={"circ-" + i} 
                      d={"M 500, 500 m -" + r + ", 0 a " + r + "," + r + " 0 1,1 " + (r*2) + ",0 a " + r + "," + r + " 0 1,1 -" + (r*2) + ",0"} 
                    />
                  );
                })}
              </defs>
              {[...Array(12)].map((_, i) => (
                <text key={i}>
                  <textPath href={"#circ-" + i} startOffset={((i * 15) % 100) + "%"}>
                    {("HOUSIE OF FAME • DIGITAL BINGO • MULTIPLAYER GAMING • ").repeat(10)}
                  </textPath>
                </text>
              ))}
            </svg>
          </div>
        </div>
      </div>

      {/* PROJECT 2: SQAC Portal (Massive Typography Section) */}
      <div className={['relative py-40 overflow-hidden backdrop-blur-sm transition-all duration-500', isDarkMode ? 'bg-gradient-to-b from-transparent via-black/40 to-transparent' : 'bg-gradient-to-b from-transparent via-white/20 to-transparent'].join(' ')}>
        {/* Background Monospace Pattern */}
        <div className={['absolute inset-0 overflow-hidden pointer-events-none text-[8px] leading-tight font-mono text-justify p-4 break-all whitespace-pre-wrap', isDarkMode ? 'text-[#7A1E2C]/30' : 'text-[#f34a82]/20'].join(' ')}>
          {'SQAC PORTAL MANAGEMENT SYSTEM CENTRAL HUB OPERATIONS DATA DRIVEN DASHBOARD AUTHENTICATION ROLE BASED ACCESS CONTROL ANALYTICS '.repeat(150)}
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-8 md:px-16 flex flex-col md:flex-row gap-16 items-start">
          <div className="flex-1">
            <h2 className={['text-4xl md:text-7xl font-bold tracking-tight leading-[1.05] mb-12 font-head', isDarkMode ? 'text-[#F5E1C2]' : 'text-[#951D13]'].join(' ')}>
              The central portal. <br/><span className={isDarkMode ? 'text-[#d95d39]' : 'text-[#f34a82]'}>Operations at scale.</span>
            </h2>
            <div className={['space-y-6 text-lg md:text-xl font-semibold leading-relaxed max-w-2xl', isDarkMode ? 'text-[#F5E1C2]/70' : 'text-[#951D13]/80'].join(' ')}>
              <p>
                SQAC Portal is the beating heart of our operations. It handles management, administration, and team oversight in a centralized, secure environment.
              </p>
              <p>
                Built to handle everything from user roles to complex data visualizations, ensuring the team stays aligned without the friction of scattered tooling.
              </p>
              <div className="pt-8">
                <a href="https://github.com/SQAC-Tech/SQAC_Portal" target="_blank" rel="noreferrer" className={['inline-flex items-center gap-2 px-8 py-3 rounded-md font-bold transition-all border', isDarkMode ? 'bg-[#7A1E2C]/40 border-[#7A1E2C] text-[#F5E1C2] hover:bg-[#A93C38]/60 hover:shadow-[0_0_20px_#7A1E2C]' : 'bg-[#F18B85]/40 border-[#F18B85] text-[#951D13] hover:bg-[#F18B85]/60 hover:shadow-[0_0_20px_#F18B85]'].join(' ')}>
                  <Github size={18} /> Explore SQAC Portal
                </a>
              </div>
            </div>
          </div>
          
          <div className={['w-full md:w-80 shrink-0 border p-6 rounded-xl backdrop-blur-xl', isDarkMode ? 'border-[#7A1E2C] bg-black/60 shadow-[0_0_30px_#7A1E2C]' : 'border-[#F18B85] bg-white/60 shadow-[0_0_30px_#F18B85]'].join(' ')}>
            <div className={['font-mono text-xs font-bold uppercase mb-4 tracking-widest border-b pb-4', isDarkMode ? 'text-[#d95d39] border-[#7A1E2C]' : 'text-[#bd4110] border-[#F18B85]'].join(' ')}>
              002 / Management Hub
            </div>
            <p className={['text-sm leading-relaxed font-mono font-semibold', isDarkMode ? 'text-[#F5E1C2]/60' : 'text-[#951D13]/70'].join(' ')}>
              Designed with enterprise-grade patterns. The portal uses strictly typed endpoints, robust authentication guards, and a highly responsive dashboard interface. It is the single source of truth for SQAC members.
            </p>
          </div>
        </div>
      </div>

      {/* PROJECT 3: MOM Generator (IDE Mockup Section) */}
      <div className={['py-32 px-4 md:px-12 relative transition-all duration-500', isDarkMode ? 'bg-gradient-to-b from-transparent via-black/20 to-transparent' : 'bg-gradient-to-b from-transparent via-white/10 to-transparent'].join(' ')}>
        <div className="max-w-6xl mx-auto mb-16 text-center relative z-10">
          <p className={['font-mono text-xs font-bold tracking-widest uppercase mb-4', isDarkMode ? 'text-[#d95d39]' : 'text-[#bd4110]'].join(' ')}>003 / Productivity Tools</p>
          <h2 className={['text-4xl md:text-6xl font-bold tracking-tight mb-6 font-head', isDarkMode ? 'text-[#F5E1C2]' : 'text-[#951D13]'].join(' ')}>MOM Generator</h2>
          <p className={['text-xl font-semibold max-w-2xl mx-auto', isDarkMode ? 'text-[#F5E1C2]/70' : 'text-[#951D13]/80'].join(' ')}>
            Automating Minutes of Meeting. Generating structured markdown and PDF reports instantly from meeting notes.
          </p>
        </div>

        <div className={['max-w-5xl mx-auto border rounded-xl overflow-hidden shadow-2xl flex flex-col h-[600px] relative z-10', isDarkMode ? 'border-[#7A1E2C]/50 bg-[#1e1e1e] shadow-[0_0_40px_rgba(122,30,44,0.3)]' : 'border-[#F18B85] bg-white shadow-[0_0_40px_rgba(241,139,133,0.5)]'].join(' ')}>
          
          {/* IDE Header */}
          <div className={['flex items-center justify-between px-4 py-3 border-b font-mono text-[10px] font-bold', isDarkMode ? 'border-[#333] bg-[#252526] text-[#999]' : 'border-[#F18B85]/30 bg-[#fef5f3] text-[#bd4110]'].join(' ')}>
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
              <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
            </div>
            <div className="uppercase tracking-widest">MOM-Generator - VS Code</div>
            <div className="flex gap-4">
              <a href="https://github.com/SQAC-Tech/MOM-Generator" target="_blank" rel="noreferrer" className={['flex items-center gap-1 border px-3 py-1 rounded cursor-pointer transition-colors', isDarkMode ? 'border-[#7A1E2C] text-[#F5E1C2] bg-[#7A1E2C]/40 hover:bg-[#7A1E2C]/60' : 'border-[#F18B85] text-[#951D13] bg-[#F18B85]/20 hover:bg-[#F18B85]/40'].join(' ')}>
                <Github size={12}/> View Source
              </a>
            </div>
          </div>

          <div className="flex flex-1 overflow-hidden">
            {/* Sidebar */}
            <div className={['w-64 border-r hidden md:flex flex-col font-mono text-[11px] py-2 overflow-y-auto', isDarkMode ? 'border-[#333] bg-[#1e1e1e] text-[#ccc]' : 'border-[#F18B85]/30 bg-[#fff5f2] text-[#951D13] font-semibold'].join(' ')}>
              <div className={['px-4 py-2 cursor-pointer flex items-center gap-2', isDarkMode ? 'hover:bg-[#2d2d2d] text-white' : 'hover:bg-[#F18B85]/20 text-[#bd4110]'].join(' ')}><ChevronDown size={14}/> <span>MOM-GENERATOR</span></div>
              <div className={['px-8 py-1.5 cursor-pointer flex items-center gap-2', isDarkMode ? 'hover:bg-[#2d2d2d]' : 'hover:bg-[#F18B85]/10'].join(' ')}><ChevronRight size={12}/><Folder size={12} className={isDarkMode ? 'text-[#d95d39]' : 'text-[#f34a82]'}/> src</div>
              <div className={['px-8 py-1.5 cursor-pointer flex items-center gap-2', isDarkMode ? 'hover:bg-[#2d2d2d]' : 'hover:bg-[#F18B85]/10'].join(' ')}><ChevronRight size={12}/><Folder size={12} className={isDarkMode ? 'text-[#F5E1C2]' : 'text-[#bd4110]'}/> templates</div>
              <div className={['px-8 py-1.5 cursor-pointer flex items-center gap-2', isDarkMode ? 'hover:bg-[#2d2d2d]' : 'hover:bg-[#F18B85]/10'].join(' ')}><ChevronRight size={12}/><Folder size={12} className="text-green-500"/> utils</div>
              <div className={['px-8 py-1.5 cursor-pointer flex items-center gap-2 mt-2', isDarkMode ? 'hover:bg-[#2d2d2d]' : 'hover:bg-[#F18B85]/10'].join(' ')}><FileText size={12} className="text-gray-400"/> .gitignore</div>
              <div className={['px-8 py-1.5 cursor-pointer flex items-center gap-2 border-l-2', isDarkMode ? 'bg-[#37373d] text-white border-[#d95d39]' : 'bg-[#F18B85]/30 text-[#951D13] border-[#bd4110]'].join(' ')}><FileText size={12} className={isDarkMode ? 'text-[#d95d39]' : 'text-[#bd4110]'}/> generator.py</div>
              <div className={['px-8 py-1.5 cursor-pointer flex items-center gap-2', isDarkMode ? 'hover:bg-[#2d2d2d]' : 'hover:bg-[#F18B85]/10'].join(' ')}><FileText size={12} className={isDarkMode ? 'text-[#F5E1C2]' : 'text-[#f34a82]'}/> README.md</div>
              <div className={['px-8 py-1.5 cursor-pointer flex items-center gap-2', isDarkMode ? 'hover:bg-[#2d2d2d]' : 'hover:bg-[#F18B85]/10'].join(' ')}><FileJson size={12} className="text-yellow-500"/> requirements.txt</div>
            </div>

            {/* Main Editor */}
            <div className={['flex-1 flex flex-col', isDarkMode ? 'bg-[#1e1e1e]' : 'bg-white'].join(' ')}>
              <div className={['flex border-b', isDarkMode ? 'border-[#333] bg-[#252526]' : 'border-[#F18B85]/30 bg-[#fffcfb]'].join(' ')}>
                <div className={['px-4 py-2 border-r border-t-2 font-mono text-[11px] flex items-center gap-2', isDarkMode ? 'border-[#333] border-t-[#d95d39] bg-[#1e1e1e] text-[#ccc]' : 'border-[#F18B85]/30 border-t-[#bd4110] bg-white text-[#bd4110] font-bold'].join(' ')}>
                  <FileText size={12} className={isDarkMode ? 'text-[#d95d39]' : 'text-[#bd4110]'}/> generator.py
                </div>
              </div>
              
              <div className={['flex-1 p-6 font-mono text-[13px] leading-relaxed overflow-y-auto font-semibold', isDarkMode ? 'text-[#d4d4d4]' : 'text-[#951D13]'].join(' ')}>
                <div className="flex"><span className={['w-8 inline-block select-none', isDarkMode ? 'text-[#858585]' : 'text-[#F18B85]'].join(' ')}>1</span><span className={isDarkMode ? 'text-[#f34a82]' : 'text-[#bd4110]'}>def</span> <span className={isDarkMode ? 'text-[#F0A01F]' : 'text-[#A93C38]'}>generate_mom</span>(meeting_data):</div>
                <div className="flex"><span className={['w-8 inline-block select-none', isDarkMode ? 'text-[#858585]' : 'text-[#F18B85]'].join(' ')}>2</span><span className="text-green-600 ml-4">"""</span></div>
                <div className="flex"><span className={['w-8 inline-block select-none', isDarkMode ? 'text-[#858585]' : 'text-[#F18B85]'].join(' ')}>3</span><span className="text-green-600 ml-4">Generates a structured Minutes of Meeting document.</span></div>
                <div className="flex"><span className={['w-8 inline-block select-none', isDarkMode ? 'text-[#858585]' : 'text-[#F18B85]'].join(' ')}>4</span><span className="text-green-600 ml-4">"""</span></div>
                <div className="flex"><span className={['w-8 inline-block select-none', isDarkMode ? 'text-[#858585]' : 'text-[#F18B85]'].join(' ')}>5</span><span className="ml-4">template = load_template(</span><span className={isDarkMode ? 'text-[#d95d39]' : 'text-[#f34a82]'}>'standard_mom.md'</span><span className="ml-0">)</span></div>
                <div className="flex"><span className={['w-8 inline-block select-none', isDarkMode ? 'text-[#858585]' : 'text-[#F18B85]'].join(' ')}>6</span><span className="ml-4">parsed_content = parse_notes(meeting_data.raw_text)</span></div>
                <div className="flex"><span className={['w-8 inline-block select-none', isDarkMode ? 'text-[#858585]' : 'text-[#F18B85]'].join(' ')}>7</span><span className="ml-4"></span></div>
                <div className="flex"><span className={['w-8 inline-block select-none', isDarkMode ? 'text-[#858585]' : 'text-[#F18B85]'].join(' ')}>8</span><span className={['ml-4', isDarkMode ? 'text-[#f34a82]' : 'text-[#bd4110]'].join(' ')}>for</span> action_item <span className={isDarkMode ? 'text-[#f34a82]' : 'text-[#bd4110]'}>in</span> parsed_content.action_items:</div>
                <div className="flex"><span className={['w-8 inline-block select-none', isDarkMode ? 'text-[#858585]' : 'text-[#F18B85]'].join(' ')}>9</span><span className="ml-8">assign_task(action_item.assignee, action_item.task)</span></div>
                <div className="flex"><span className={['w-8 inline-block select-none', isDarkMode ? 'text-[#858585]' : 'text-[#F18B85]'].join(' ')}>10</span><span className="ml-4"></span></div>
                <div className="flex"><span className={['w-8 inline-block select-none', isDarkMode ? 'text-[#858585]' : 'text-[#F18B85]'].join(' ')}>11</span><span className="ml-4">final_document = format_markdown(template, parsed_content)</span></div>
                <div className="flex"><span className={['w-8 inline-block select-none', isDarkMode ? 'text-[#858585]' : 'text-[#F18B85]'].join(' ')}>12</span><span className={['ml-4', isDarkMode ? 'text-[#f34a82]' : 'text-[#bd4110]'].join(' ')}>return</span> export_to_pdf(final_document)</div>
              </div>

              {/* Terminal */}
              <div className={['h-40 border-t flex flex-col', isDarkMode ? 'border-[#333] bg-[#1e1e1e]' : 'border-[#F18B85]/30 bg-[#fff5f2]'].join(' ')}>
                <div className={['px-4 py-2 flex gap-6 font-mono text-[11px] uppercase border-b font-bold', isDarkMode ? 'text-[#ccc] border-[#333]' : 'text-[#bd4110] border-[#F18B85]/30'].join(' ')}>
                  <span className={['border-b pb-1', isDarkMode ? 'border-[#d95d39] text-white' : 'border-[#A93C38] text-[#951D13]'].join(' ')}>Terminal</span>
                  <span>Output</span>
                </div>
                <div className={['p-4 font-mono text-[12px] font-bold', isDarkMode ? 'text-[#ccc]' : 'text-[#951D13]'].join(' ')}>
                  <div><span className="text-green-500">~/sqac/MOM-Generator</span> <span className={isDarkMode ? 'text-[#F0A01F]' : 'text-[#f34a82]'}>main</span> $ python generator.py --input notes.txt</div>
                  <div className={['mt-2', isDarkMode ? 'text-gray-400' : 'text-[#bd4110]/70'].join(' ')}>[INFO] Parsing meeting notes...</div>
                  <div className={['mt-1', isDarkMode ? 'text-gray-400' : 'text-[#bd4110]/70'].join(' ')}>[INFO] Extracting action items...</div>
                  <div className={['mt-1', isDarkMode ? 'text-[#d95d39]' : 'text-[#A93C38]'].join(' ')}>✓ Successfully generated MOM_2026-07-24.pdf</div>
                  <div className={['mt-2 animate-pulse', isDarkMode ? 'text-white' : 'text-black'].join(' ')}>_</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
