import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../../contexts/ThemeContext';
import BorderGlow from '../ui/BorderGlow';

const Closed = () => {
  const { isDarkMode } = useTheme();

  // Set the timer to 00 everywhere
  const [timeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });



  return (
    <div
      className={`
        flex items-center justify-center min-h-screen w-full font-sans
        transition-colors duration-500 relative overflow-hidden
        ${isDarkMode 
          ? 'bg-black text-white' 
          : 'bg-gradient-to-b from-[#e6e6e6] via-[#f3d8ad] to-red-300 text-gray-900'}
      `}
    >
      {/* Background Decorative Elements */}
      <div className={`absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none ${isDarkMode ? 'bg-[radial-gradient(circle_at_center,rgba(122,30,44,0.4)_0%,transparent_70%)]' : 'bg-[radial-gradient(circle_at_center,rgba(225,155,131,0.4)_0%,transparent_70%)]'}`}></div>

      <div className="relative z-10 w-[90%] max-w-3xl flex justify-center items-center">
        <BorderGlow
          colors={isDarkMode ? ['#7A1E2C', '#e54a5c', '#F0A01F'] : ['#C37E68', '#E19B83', '#f3d8ad']}
          backgroundColor={isDarkMode ? 'rgba(17, 17, 17, 0.8)' : 'rgba(255, 255, 255, 0.4)'}
          borderRadius={32}
          glowColor={isDarkMode ? '0 100 50' : '20 80 60'}
          className="w-full"
        >
          <div
            className={`
              p-10 md:p-16 rounded-[2rem] shadow-2xl
              text-center w-full border backdrop-blur-md
              ${isDarkMode 
                ? 'border-white/10 shadow-[0_0_50px_rgba(122,30,44,0.3)]' 
                : 'border-white/40 shadow-[0_0_50px_rgba(225,155,131,0.5)]'}
            `}
          >
        <div className="mb-6">
          <span className={`px-4 py-1.5 rounded-full text-xs md:text-sm font-bold uppercase tracking-widest ${isDarkMode ? 'bg-[#7A1E2C]/30 text-red-300 border border-red-500/30' : 'bg-[#E19B83]/30 text-[#8a402c] border border-[#C37E68]/40'}`}>
            Next Intake
          </span>
        </div>

        <h1
          className={`
            text-4xl md:text-6xl font-black mb-4 tracking-tighter uppercase
            bg-clip-text text-transparent
            ${isDarkMode 
              ? 'bg-gradient-to-r from-red-400 via-[#e54a5c] to-orange-400 drop-shadow-[0_0_10px_rgba(229,74,92,0.3)]' 
              : 'bg-gradient-to-r from-[#951D13] via-[#d34c38] to-[#F0A01F] drop-shadow-sm'}
          `}
        >
          Recruitments Open Soon
        </h1>

        <p
          className={`
            text-base md:text-xl mb-12 max-w-xl mx-auto font-medium
            ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}
          `}
        >
          Our application portal is currently closed. We are preparing for our next major recruitment drive. Hang tight!
        </p>

        {/* Countdown Timer */}
        <div className="flex justify-center gap-4 md:gap-8 mb-12">
          {[
            { label: 'DAYS', value: timeLeft.days },
            { label: 'HOURS', value: timeLeft.hours },
            { label: 'MINUTES', value: timeLeft.minutes },
            { label: 'SECONDS', value: timeLeft.seconds }
          ].map((item, idx) => (
            <div key={idx} className="flex flex-col items-center">
              <div className={`
                w-16 h-16 md:w-24 md:h-24 rounded-2xl flex items-center justify-center mb-2 shadow-inner
                ${isDarkMode ? 'bg-gradient-to-b from-[#1a1a1a] to-black border border-gray-800' : 'bg-gradient-to-b from-white/80 to-white/40 border border-white'}
              `}>
                <span className={`text-3xl md:text-5xl font-black font-mono ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  {item.value.toString().padStart(2, '0')}
                </span>
              </div>
              <span className={`text-[10px] md:text-xs font-bold tracking-widest ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                {item.label}
              </span>
            </div>
          ))}
        </div>

        <Link to="/">
          <button
            className={`
              font-bold py-3 px-8 rounded-full shadow-lg hover:scale-105 transition-all duration-300 flex items-center gap-2 mx-auto
              ${isDarkMode 
                ? 'bg-gradient-to-r from-[#7A1E2C] to-[#951D13] hover:from-[#951D13] hover:to-[#B22222] text-white shadow-[0_0_20px_rgba(122,30,44,0.5)]' 
                : 'bg-gradient-to-r from-[#E19B83] to-[#d37053] hover:from-[#C37E68] hover:to-[#a85238] text-white shadow-[0_0_20px_rgba(225,155,131,0.5)]'}
            `}
          >
            Back to Home
          </button>
        </Link>
          </div>
        </BorderGlow>
      </div>
    </div>
  );
};

export default Closed;
