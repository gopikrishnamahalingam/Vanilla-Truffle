/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { CustomCursor } from './components/CustomCursor';
import { SpotlightIntro } from './components/SpotlightIntro';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';
import { ProjectsShowcase } from './components/ProjectsShowcase';
import { OriginStorySection } from './components/OriginStorySection';
import { CookingGameSection } from './components/CookingGameSection';
import { DragonChatSection } from './components/DragonChatSection';
import { GuestbookSection } from './components/GuestbookSection';
import { FooterSection } from './components/FooterSection';
import { NeverForgetBiscuitEgg } from './components/NeverForgetBiscuitEgg';

export default function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [marshmallowFound, setMarshmallowFound] = useState(false);
  const [showIntro, setShowIntro] = useState(true);

  // Initialize theme and easter egg discovery state
  useEffect(() => {
    const savedTheme = localStorage.getItem('vanillaTruffle_theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const isDark = savedTheme ? savedTheme === 'dark' : prefersDark;
    setDarkMode(isDark);
    applyTheme(isDark);

    const savedMarshmallow = localStorage.getItem('vanillaTruffle_activeMarshmallowFound');
    if (savedMarshmallow === 'true') {
      setMarshmallowFound(true);
    }
  }, []);

  const applyTheme = (isDark: boolean) => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      document.body.classList.add('dark');
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      document.body.classList.remove('dark');
      document.documentElement.setAttribute('data-theme', 'light');
    }
  };

  const toggleTheme = () => {
    const nextDark = !darkMode;
    setDarkMode(nextDark);
    localStorage.setItem('vanillaTruffle_theme', nextDark ? 'dark' : 'light');
    applyTheme(nextDark);
  };

  const handleDiscoverMarshmallow = () => {
    setMarshmallowFound(true);
    localStorage.setItem('vanillaTruffle_activeMarshmallowFound', 'true');
  };

  return (
    <div className="min-h-screen bg-[#F3E8FF] dark:bg-[#170D27] text-[#3B1764] dark:text-[#F3E8FF] transition-colors duration-300 relative selection:bg-purple-300 selection:text-purple-950">
      {/* Cupcake & Cherry Particle Trail Cursor */}
      <CustomCursor />

      {/* Centrally Aligned 3D Dragon Spotlight Reveal Experience */}
      {showIntro && <SpotlightIntro onComplete={() => setShowIntro(false)} />}

      {/* Main Experience */}
      <div className={`transition-opacity duration-1000 ${showIntro ? 'opacity-90' : 'opacity-100'}`}>
        {/* Navigation Bar */}
        <Navbar
          darkMode={darkMode}
          onToggleTheme={toggleTheme}
          marshmallowFound={marshmallowFound}
        />

        {/* Hero Section */}
        <main>
          <HeroSection onReplayIntro={() => setShowIntro(true)} />

          {/* About, Personality, and Profession */}
          <AboutSection />

          {/* Projects: Four Magical Recipes */}
          <ProjectsShowcase />

          {/* Origin Story: Odin & The 19th Century Kitchen */}
          <OriginStorySection />

          {/* Interactive Mini-Game & Refrigerator Easter Egg */}
          <CookingGameSection
            marshmallowFound={marshmallowFound}
            onDiscoverMarshmallow={handleDiscoverMarshmallow}
          />

          {/* Character Chats Back: AI / Rule-based dialogue in character voice */}
          <DragonChatSection />

          {/* Guestbook: Leave a Little Love */}
          <GuestbookSection />
        </main>

        {/* Footer & Credits */}
        <FooterSection />

        {/* Hidden Never Forget Biscuits Easter Egg */}
        <NeverForgetBiscuitEgg />
      </div>
    </div>
  );
}
