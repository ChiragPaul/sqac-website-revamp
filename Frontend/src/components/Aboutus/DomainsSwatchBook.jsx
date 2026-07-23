import React from "react";
import { Globe, Smartphone, Cpu, Calendar, Handshake, Film } from "lucide-react";

const subdomains = [
  {
    id: "webdev",
    title: "WEB DEV",
    icon: Globe,
    content: "Crafting performant, high-impact web applications using modern frontend frameworks, robust backend architecture, scalable APIs, and intuitive user experiences.",
    highlights: ["Frontend", "Backend", "UI/UX", "Cloud"],
    className: "swatch-1"
  },
  {
    id: "appdev",
    title: "APP DEV",
    icon: Smartphone,
    content: "Building seamless cross-platform and native mobile solutions using Flutter, React Native, and Android SDKs to deliver smooth on-device performance.",
    highlights: ["Flutter", "React Native", "iOS / Android"],
    className: "swatch-2"
  },
  {
    id: "aiml",
    title: "AI / ML",
    icon: Cpu,
    content: "Exploring deep learning, neural networks, computer vision, and LLM integrations to create intelligent systems and predictive software models.",
    highlights: ["Deep Learning", "NLP", "Computer Vision"],
    className: "swatch-3"
  },
  {
    id: "events",
    title: "EVENTS",
    icon: Calendar,
    content: "Organizing and executing technical workshops, flagship hackathons, interactive webinars, and student engagement sessions across campus.",
    highlights: ["Hackathons", "Workshops", "Tech Talks"],
    className: "swatch-4"
  },
  {
    id: "sponsorship",
    title: "SPONSORSHIP",
    icon: Handshake,
    content: "Connecting SQAC with industry sponsors, corporate leaders, and tech partners to secure resource funding, prizes, and professional opportunities.",
    highlights: ["Corporate Links", "Funding", "Outreach"],
    className: "swatch-5"
  },
  {
    id: "media",
    title: "MEDIA",
    icon: Film,
    content: "Driving the digital identity of SQAC through creative graphic design, promotional video creation, photography, and active social media management.",
    highlights: ["Creatives", "PR", "Video Production"],
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
            className="text-5xl lg:text-7xl font-black tracking-wider mb-2 uppercase bg-clip-text text-transparent bg-gradient-to-r from-[#951D13] via-[#f34a82] to-[#F0A01F] dark:from-[#7A1E2C] dark:via-[#A93C38] dark:to-[#d95d39]"
            style={{ fontFamily: '"Poppins", sans-serif' }}
          >
            Our Subdomains
          </h2>
          <div className="h-[2px] w-48 bg-gradient-to-r from-[#951D13] via-[#f34a82] to-transparent dark:via-[#7A1E2C] my-3"></div>
          <p className="text-base text-gray-800 dark:text-gray-300 leading-relaxed max-w-lg mb-8 mt-2">
            Discover the core technical, operational, and creative subdomains that power SQAC's initiatives, projects, and community events.
          </p>
        </div>

        {/* Right Side: SwatchBook */}
        <div className="w-full lg:w-1/2 flex justify-center">
          <div className="swatch-book opened">
            {subdomains.map((subdomain) => {
              const Icon = subdomain.icon;
              return (
                <div key={subdomain.id} className={`swatch-item ${subdomain.className}`}>
                  <Icon className="swatch-icon" />
                  <h3 style={{ fontFamily: '"Poppins", sans-serif' }}>{subdomain.title}</h3>
                  <p>{subdomain.content}</p>
                  
                  <div className="subdomains">
                    {subdomain.highlights.map((item, i) => (
                      <span key={i}>{item}</span>
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
