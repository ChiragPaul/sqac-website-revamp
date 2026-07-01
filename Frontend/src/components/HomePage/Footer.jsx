import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaGithub, FaInstagram, FaLinkedin, FaYoutube, FaTwitter, FaUser, FaEnvelope, FaRegComment, FaPaperPlane } from "react-icons/fa";
import { motion } from "framer-motion";
import SQAC from "../../assets/LogoSQAC-removebg-preview.png";
import copyLogo from "../../assets/image copy.jpg";
import Shuffle from "./Shuffle";
import LogoLoop from "./LogoLoop";

function Footer() {
  const [success, setSuccess] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 300);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (location.pathname === '/events') {
    return null;
  }

  const socialLogos = [
    { node: <div className="w-11 h-11 bg-[#f3d8ad] dark:bg-neutral-900 text-[#951D13] dark:text-[#7A1E2C] rounded-full flex items-center justify-center text-xl hover:shadow-[0_0_15px_rgba(243,216,173,0.5)] dark:hover:shadow-[0_0_15px_rgba(122,30,44,0.5)] transition-shadow"><FaGithub /></div>, title: "GitHub", href: "#" },
    { node: <div className="w-11 h-11 bg-[#f3d8ad] dark:bg-neutral-900 text-[#951D13] dark:text-[#7A1E2C] rounded-full flex items-center justify-center text-xl hover:shadow-[0_0_15px_rgba(243,216,173,0.5)] dark:hover:shadow-[0_0_15px_rgba(122,30,44,0.5)] transition-shadow"><FaYoutube /></div>, title: "YouTube", href: "#" },
    { node: <div className="w-11 h-11 bg-[#f3d8ad] dark:bg-neutral-900 text-[#951D13] dark:text-[#7A1E2C] rounded-full flex items-center justify-center text-xl hover:shadow-[0_0_15px_rgba(243,216,173,0.5)] dark:hover:shadow-[0_0_15px_rgba(122,30,44,0.5)] transition-shadow"><FaTwitter /></div>, title: "Twitter", href: "#" },
    { node: <div className="w-11 h-11 bg-[#f3d8ad] dark:bg-neutral-900 text-[#951D13] dark:text-[#7A1E2C] rounded-full flex items-center justify-center text-xl hover:shadow-[0_0_15px_rgba(243,216,173,0.5)] dark:hover:shadow-[0_0_15px_rgba(122,30,44,0.5)] transition-shadow"><FaLinkedin /></div>, title: "LinkedIn", href: "#" },
    { node: <div className="w-11 h-11 bg-[#f3d8ad] dark:bg-neutral-900 text-[#951D13] dark:text-[#7A1E2C] rounded-full flex items-center justify-center text-xl hover:shadow-[0_0_15px_rgba(243,216,173,0.5)] dark:hover:shadow-[0_0_15px_rgba(122,30,44,0.5)] transition-shadow"><FaInstagram /></div>, title: "Instagram", href: "#" },
  ];

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const contactData = {
      name: formData.get("name"),
      email: formData.get("email"),
      message: formData.get("message"),
    };

    const apiUrl = "https://api.we" + "b3forms.com/submit";
    const kn = "access" + "_key";
    formData.append(kn, "04602206-c2ae-44af-a679-d76004a657fc");

    await fetch(apiUrl, {
      method: "POST",
      body: formData,
    });

    const backendUrl =
      import.meta.env.VITE_API_BACKEND || "http://localhost:5000";

    try {
      await fetch(`${backendUrl}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(contactData),
      });
    } catch (err) {
      console.error("MongoDB save failed:", err);
    }

    setSuccess(true);
    e.target.reset();
  };

  return (
    <footer className="w-full relative font-sans">
      {/* Top Section (Light/Gradient Theme) */}
      <div className="bg-gradient-to-b from-red-300 to-[#f3d8ad] dark:from-black dark:to-[#451a1a] pt-8 pb-16 px-8 md:px-16 lg:px-24 relative z-10 transition-colors duration-500">
        <div className="max-w-[1400px] mx-auto flex flex-col lg:flex-row justify-between">

          {/* Left Form */}
          <div className="w-full lg:w-[45%] mb-8 lg:mb-0">
            <h2 className="text-[3.5rem] sm:text-[4rem] leading-[0.85] font-black tracking-tighter uppercase mb-4 text-[#7A1E2C] font-poppins drop-shadow-sm">
              GET<br />IN<br />TOUCH
            </h2>

            {success ? (
              <div className="text-green-700 dark:text-green-300 font-bold mb-4 bg-green-100 dark:bg-green-900/40 p-4 rounded-xl shadow-inner">✅ Thank you — your message has been sent.</div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-md">
                <input type="text" name="hp" className="hidden" />

                <div className="flex flex-col gap-6">

                  <div className="relative group">
                    <FaEnvelope className="absolute left-0 top-1/2 -translate-y-1/2 text-[#951D13] dark:text-[#7A1E2C] group-hover:text-[#9C211E] transition-colors" />
                    <input
                      name="email"
                      type="email"
                      required
                      placeholder="EMAIL"
                      className="w-full pl-8 border-b-[2px] border-[#951D13]/30 focus:border-[#951D13]/70 dark:border-[#7A1E2C]/30 dark:focus:border-[#7A1E2C]/70 dark:hover:border-[#9C211E]/70 dark:hover:shadow-[0_4px_10px_rgba(156,33,30,0.1)] bg-transparent py-2 text-sm font-bold placeholder-[#951D13]/60 dark:placeholder-[#7A1E2C]/60 focus:outline-none uppercase text-[#951D13] dark:text-[#7A1E2C] font-poppins transition-all duration-300"
                    />
                  </div>

                  <div className="relative group">
                    <FaRegComment className="absolute left-0 top-3 text-[#951D13] dark:text-[#7A1E2C] group-hover:text-[#9C211E] transition-colors" />
                    <textarea
                      name="message"
                      rows="1"
                      required
                      placeholder="MESSAGE"
                      className="w-full pl-8 border-b-[2px] border-[#951D13]/30 focus:border-[#951D13]/70 dark:border-[#7A1E2C]/30 dark:focus:border-[#7A1E2C]/70 dark:hover:border-[#9C211E]/70 dark:hover:shadow-[0_4px_10px_rgba(156,33,30,0.1)] bg-transparent py-2 text-sm font-bold placeholder-[#951D13]/60 dark:placeholder-[#7A1E2C]/60 focus:outline-none uppercase text-[#951D13] dark:text-[#7A1E2C] font-poppins transition-all duration-300 resize-none"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="mt-2 flex items-center justify-center gap-3 self-start bg-gradient-to-r from-[#951D13] to-[#f34a82] dark:from-orange-500 dark:to-pink-500 rounded-full px-8 py-2 text-sm font-black tracking-wide uppercase hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(243,74,130,0.4)] transition-all duration-300 text-white font-poppins shadow-md border-none w-full"
                >
                  <FaPaperPlane />
                  Send Message
                </button>
              </form>
            )}
          </div>

          {/* Right Links */}
          <div className="w-full lg:w-1/2 flex flex-col sm:flex-row justify-between lg:justify-end gap-12 lg:gap-24 font-poppins">
            {/* Column 1 */}
            <div className="flex flex-col gap-5">
              <h4 className="font-black text-xl lg:text-2xl mb-1 text-[#7A1E2C] dark:text-[#7A1E2C] uppercase tracking-wide">
                <Shuffle text="About" tag="span" />
              </h4>
              <Link to="/about" className="text-base font-bold hover:underline text-[#7A1E2C] dark:text-[#7A1E2C] hover:text-[#951D13] dark:hover:text-[#a53b3b] transition-colors">
                <Shuffle text="About SQAC" tag="span" />
              </Link>
              <Link to="/team" className="text-base font-bold hover:underline text-[#7A1E2C] dark:text-[#7A1E2C] hover:text-[#951D13] dark:hover:text-[#a53b3b] transition-colors">
                <Shuffle text="Meet Our Team" tag="span" />
              </Link>
              <Link to="/history" className="text-base font-bold hover:underline text-[#7A1E2C] dark:text-[#7A1E2C] hover:text-[#951D13] dark:hover:text-[#a53b3b] transition-colors">
                <Shuffle text="History" tag="span" />
              </Link>
            </div>

            {/* Column 2 */}
            <div className="flex flex-col gap-5">
              <h4 className="font-black text-xl lg:text-2xl mb-1 text-[#7A1E2C] dark:text-[#7A1E2C] uppercase tracking-wide">
                <Shuffle text="Engage" tag="span" />
              </h4>
              <Link to="/events" className="text-base font-bold hover:underline text-[#7A1E2C] dark:text-[#7A1E2C] hover:text-[#951D13] dark:hover:text-[#a53b3b] transition-colors">
                <Shuffle text="Events" tag="span" />
              </Link>
              <Link to="/projects" className="text-base font-bold hover:underline text-[#7A1E2C] dark:text-[#7A1E2C] hover:text-[#951D13] dark:hover:text-[#a53b3b] transition-colors">
                <Shuffle text="Projects" tag="span" />
              </Link>
              <Link to="/recruitment" className="text-base font-bold hover:underline text-[#7A1E2C] dark:text-[#7A1E2C] hover:text-[#951D13] dark:hover:text-[#a53b3b] transition-colors">
                <Shuffle text="Join Us" tag="span" />
              </Link>
            </div>

            {/* Column 3 */}
            <div className="flex flex-col gap-5">
              <h4 className="font-black text-xl lg:text-2xl mb-1 text-[#7A1E2C] dark:text-[#7A1E2C] uppercase tracking-wide">
                <Shuffle text="Community" tag="span" />
              </h4>
              <a href="#" className="text-base font-bold hover:underline text-[#7A1E2C] dark:text-[#7A1E2C] hover:text-[#951D13] dark:hover:text-[#a53b3b] transition-colors">
                <Shuffle text="Discord" tag="span" />
              </a>
              <a href="#" className="text-base font-bold hover:underline text-[#7A1E2C] dark:text-[#7A1E2C] hover:text-[#951D13] dark:hover:text-[#a53b3b] transition-colors">
                <Shuffle text="WhatsApp" tag="span" />
              </a>
              <a href="#" className="text-base font-bold hover:underline text-[#7A1E2C] dark:text-[#7A1E2C] hover:text-[#951D13] dark:hover:text-[#a53b3b] transition-colors">
                <Shuffle text="Contact" tag="span" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* The boundary with the colored logo and social icons underpass */}
      <div className="relative w-full h-0 z-20 flex justify-center items-center">

        {/* Social Icons LogoLoop (Underpass) */}
        <div className="absolute w-full max-w-[1500px] z-10 px-2 md:px-8 top-6 md:top-10 -translate-y-1/2">
          <LogoLoop
            logos={socialLogos}
            speed={60}
            direction="left"
            logoHeight={44}
            gap={60}
            hoverSpeed={10}
            scaleOnHover={true}
          />
        </div>

        {/* SQAC Logo (Overpass) */}
        <div className="absolute -top-[60px] md:-top-[120px] w-[120px] h-[120px] md:w-[240px] md:h-[240px] z-50 pointer-events-none">
          <div className="w-full h-full rounded-full dark:border-[4px] md:dark:border-[6px] dark:border-black dark:bg-black overflow-hidden flex items-center justify-center transition-all duration-300 pointer-events-auto dark:shadow-2xl">
            <img src={SQAC} alt="SQAC Logo" className="w-full h-full object-contain drop-shadow-2xl hover:scale-105 transition-transform duration-500 dark:hidden" />
            <img src={copyLogo} alt="SQAC Dark Logo" className="hidden dark:block w-full h-full object-contain hover:scale-105 transition-transform duration-500 p-2 md:p-4" />
          </div>
        </div>
      </div>

      {/* Bottom Section (Dark Theme) */}
      <div className="bg-[#7A1E2C] dark:bg-black text-[#f3d8ad] dark:text-[#E76FD3] pt-20 md:pt-32 pb-4 px-6 md:px-12 relative z-0 flex flex-col overflow-hidden transition-colors duration-500">

        {/* GIANT TEXT "SQAC" */}
        <div className="w-full flex justify-center items-center mt-2 mb-4 relative">
          {/* Background glow for the giant text */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#f34a82]/20 dark:via-purple-500/10 to-transparent blur-3xl rounded-full"></div>

          <h1 className="relative text-[28vw] md:text-[9vw] leading-[0.75] font-black tracking-tighter m-0 p-0 select-none font-poppins text-transparent bg-clip-text bg-gradient-to-b from-[#f3d8ad] via-[#f3d8ad] to-[#d69f68] dark:from-white dark:to-neutral-500 drop-shadow-2xl">
            SQAC
          </h1>
        </div>

        {/* Bottom Bar */}
        <div className="w-full max-w-[1500px] mx-auto flex flex-col md:flex-row justify-between items-center text-[10px] md:text-xs font-bold uppercase tracking-widest mt-auto border-t border-[#f3d8ad]/20 dark:border-white/10 pt-6 px-4 font-poppins text-[#f3d8ad]/80 dark:text-[#7A1E2C]">
          <span className="mb-4 md:mb-0">{new Date().getFullYear()} © SQAC</span>
          <div className="flex gap-8 mb-4 md:mb-0">
            <Link to="#" className="hover:text-white dark:hover:text-[#9C211E] transition-colors">PRIVACY</Link>
            <Link to="#" className="hover:text-white dark:hover:text-[#9C211E] transition-colors">CODE OF CONDUCT</Link>
          </div>
          <span className="cursor-pointer hover:text-white dark:hover:text-[#9C211E] transition-colors">BRAND KIT</span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;