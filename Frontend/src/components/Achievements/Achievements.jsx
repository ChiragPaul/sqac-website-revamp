import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';

import HeroSection from './AchievementsHeroSection';
import DomeGallery from './DomeGallery';
import AchievementModal from './AchievementModal';
import { useTheme } from '../../contexts/ThemeContext';

export default function Achievements() {
  const { isDarkMode } = useTheme();
  const [selectedAchievement, setSelectedAchievement] = useState(null);

  return (
    <div
      className={`
        w-full font-[Poppins,ui-sans-serif,system-ui,sans-serif]
        antialiased overflow-x-hidden
        ${isDarkMode 
          ? 'bg-black text-gray-100' 
          : 'bg-[#fde8cc] text-gray-800'
        }
        transition-colors duration-300
        [isolation:isolate]
      `}
    >
      {/* Hero */}
      <HeroSection />

      {/* 3D Dome Achievement Showcase */}
      <DomeGallery isDark={isDarkMode} onSelectAchievement={setSelectedAchievement} />

      {/* Achievement Detail Modal */}
      <AnimatePresence>
        {selectedAchievement && (
          <AchievementModal
            achievement={selectedAchievement}
            onClose={() => setSelectedAchievement(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
