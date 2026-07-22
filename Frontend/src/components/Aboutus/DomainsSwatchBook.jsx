import React, { useState } from "react";
import { Monitor, Briefcase, Film, Shield, Cpu, Users } from "lucide-react";

const domains = [
  {
    id: "technical",
    title: "TECHNICAL",
    icon: Monitor,
    content: "Web Dev, App Dev, and AI/ML. We build robust, scalable applications and explore the frontiers of artificial intelligence and machine learning to solve real-world problems.",
    subdomains: ["Web Dev", "App Dev", "AI/ML"],
    className: "swatch-1"
  },
  {
    id: "corporate",
    title: "CORPORATE",
    icon: Briefcase,
    content: "Sponsorships and Events. We manage the operational lifeline of the club, securing partnerships, organizing tech events, and ensuring smooth logistical execution.",
    subdomains: ["Sponsorship", "Events"],
    className: "swatch-2"
  },
  {
    id: "media",
    title: "MEDIA",
    icon: Film,
    content: "Creative and PR. We are the voice and visual identity of SQAC, crafting compelling narratives, designing digital assets, and managing our public relations footprint.",
    subdomains: ["Creatives", "PR"],
    className: "swatch-3"
  },
  {
    id: "board",
    title: "BOARD",
    icon: Shield,
    content: "The core leadership encompassing the Secretary, Joint Secretary, and Tech/Corp leads, guiding the strategic vision and overall execution of the community.",
    subdomains: ["Leadership", "Strategy"],
    className: "swatch-4"
  },
  {
    id: "research",
    title: "R&D",
    icon: Cpu,
    content: "Research and Development. Exploring new technologies, innovating for the future, and pushing the boundaries of what our technical teams can achieve.",
    subdomains: ["Research", "Innovation"],
    className: "swatch-5"
  },
  {
    id: "community",
    title: "COMMUNITY",
    icon: Users,
    content: "Community Management. Building and maintaining relationships within our tech community, supporting our members, and fostering a collaborative environment.",
    subdomains: ["Outreach", "Support"],
    className: "swatch-6"
  }
];

const DomainsSwatchBook = () => {


  return (
    <section className="relative w-full py-16 px-4 lg:py-24 z-10 font-sans overflow-hidden">
      <div className="max-w-[1400px] mx-auto flex flex-col lg:flex-row items-center gap-12 lg:gap-24">
        
        {/* Left Side: Text */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center items-center lg:items-start text-center lg:text-left">
          <h2
            className="text-5xl lg:text-7xl font-black tracking-tight mb-6 uppercase text-[#951D13] dark:text-[#f3d8ad]"
            style={{ fontFamily: '"Poppins", sans-serif' }}
          >
            Our Domains
          </h2>
          <p className="text-base text-gray-800 dark:text-gray-300 leading-relaxed max-w-lg mb-8">
            At SQAC, we operate through specialized domains to ensure a comprehensive approach to technology, management, and community building.
          </p>
        </div>

        {/* Right Side: SwatchBook */}
        <div className="w-full lg:w-1/2 flex justify-center">
          <div className="swatch-book opened">
            {domains.map((domain, index) => {
              const Icon = domain.icon;
              return (
                <div key={domain.id} className={`swatch-item ${domain.className}`}>
                  <Icon className="swatch-icon" />
                  <h3 style={{ fontFamily: '"Poppins", sans-serif' }}>{domain.title}</h3>
                  <p>{domain.content}</p>
                  
                  <div className="subdomains">
                    {domain.subdomains.map((sub, i) => (
                      <span key={i}>{sub}</span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};

export default DomainsSwatchBook;
