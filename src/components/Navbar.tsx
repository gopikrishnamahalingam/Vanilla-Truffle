import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Sun, Moon, Menu, X } from 'lucide-react';
import { sounds } from '../utils/audio';

interface NavbarProps {
  darkMode: boolean;
  onToggleTheme: () => void;
  marshmallowFound: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  darkMode,
  onToggleTheme,
  marshmallowFound,
}) => {
  const [isMuted, setIsMuted] = useState(sounds.getMuted());
  const [activeSection, setActiveSection] = useState('hero');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const unsub = sounds.subscribe((muted) => setIsMuted(muted));
    return unsub;
  }, []);

  useEffect(() => {
    const sections = ['about', 'personality', 'profession', 'projects', 'origin-story', 'mini-game', 'dragon-chat'];
    const handleScroll = () => {
      const scrollPos = window.scrollY + 200;
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (id: string) => {
    sounds.playBubble();
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const toggleSound = () => {
    const nextMuted = sounds.toggleMute();
    setIsMuted(nextMuted);
    if (!nextMuted) {
      sounds.playSparkle();
    }
  };

  return (
    <header className="sticky top-0 z-40 backdrop-blur-md bg-[#F3E8FF]/90 dark:bg-[#170D27]/90 border-b border-purple-200/60 dark:border-purple-900/60 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        
        {/* Zone 1: Single text element wordmark */}
        <a
          href="#hero"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="flex items-center gap-2 text-base sm:text-lg font-bold tracking-tight text-purple-950 dark:text-purple-100 whitespace-nowrap shrink-0 hover:text-purple-700 dark:hover:text-purple-300 transition-colors"
        >
          <span className="text-xl" role="img" aria-label="dragon pastry"><img
                  src="assets/images/Vanilla-Truffle-withoutbg.png"
                  alt="Vanilla-Truffle"
                  className="w-5 h-5 object-cover"
                /></span>
          <span className="font-display">Vanilla Truffle</span>
        </a>

        {/* Zone 2: Clean single-line text navigation links */}
        <nav aria-label="Primary navigation" className="hidden lg:flex items-center gap-6 text-sm font-medium text-purple-800 dark:text-purple-200">
          {[
            { id: 'about', label: 'About' },
            { id: 'personality', label: 'Personality' },
            { id: 'profession', label: 'Profession' },
            { id: 'projects', label: 'Projects' },
            { id: 'origin-story', label: 'Origin Story' },
            { id: 'mini-game', label: 'Mini Game' },
            { id: 'dragon-chat', label: 'Chat 💬' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`whitespace-nowrap shrink-0 transition-colors py-1 relative ${
                activeSection === item.id
                  ? 'text-purple-950 dark:text-white font-semibold'
                  : 'text-purple-700 dark:text-purple-300 hover:text-purple-950 dark:hover:text-white'
              }`}
            >
              {item.label}
              {activeSection === item.id && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-purple-600 dark:bg-purple-400 rounded-full" />
              )}
            </button>
          ))}
        </nav>

        {/* Zone 3: Primary Action & Status Controls */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          
          {/* Active Marshmallow Trophy Icon with Hover Tooltip */}
          {marshmallowFound && (
            <div className="relative group">
              <button
                onClick={() => {
                  sounds.playSparkle();
                  document.getElementById('mini-game')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="w-8 h-8 sm:w-9 sm:h-9 rounded-full overflow-hidden border-2 border-pink-400 dark:border-pink-500 shadow-md hover:scale-110 active:scale-95 transition-transform focus:outline-none focus:ring-2 focus:ring-pink-400 animate-float shrink-0 bg-pink-100 dark:bg-pink-950"
                aria-label="Active Marshmallow Trophy"
              >
                <img
                  src="/assets/images/recipe_marshmallow_1792330608865.jpg"
                  alt="Active Marshmallow"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </button>

              {/* Hover Tooltip */}
              <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 px-2.5 py-1 rounded-lg bg-purple-950/95 text-pink-200 text-xs font-semibold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-xl border border-pink-500/40 backdrop-blur-md z-50">
                Active Marshmallow
                <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-purple-950 border-t border-l border-pink-500/40 transform rotate-45" />
              </div>
            </div>
          )}

          {/* Sound Mute / Unmute Button */}
          <button
            onClick={toggleSound}
            aria-label={isMuted ? 'Unmute kitchen sounds' : 'Mute kitchen sounds'}
            title={isMuted ? 'Unmute sounds' : 'Mute sounds'}
            className="p-2 rounded-lg text-purple-700 dark:text-purple-200 hover:bg-purple-200/50 dark:hover:bg-purple-800/50 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-400"
          >
            {isMuted ? <VolumeX className="w-5 h-5 text-purple-400" /> : <Volume2 className="w-5 h-5 text-purple-600 dark:text-purple-300" />}
          </button>

          {/* Theme Day / Night Toggle */}
          <button
            onClick={onToggleTheme}
            aria-label={darkMode ? 'Switch to light theme' : 'Switch to dark theme'}
            title={darkMode ? 'Light magical morning' : 'Dark starry kitchen'}
            className="p-2 rounded-lg text-purple-700 dark:text-purple-200 hover:bg-purple-200/50 dark:hover:bg-purple-800/50 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-400"
          >
            {darkMode ? <Sun className="w-5 h-5 text-amber-300" /> : <Moon className="w-5 h-5 text-purple-700" />}
          </button>

          {/* Mobile Menu Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
            className="lg:hidden p-2 rounded-lg text-purple-800 dark:text-purple-200 hover:bg-purple-200/50 dark:hover:bg-purple-800/50 focus:outline-none focus:ring-2 focus:ring-purple-400"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden px-4 pt-2 pb-4 bg-[#F3E8FF] dark:bg-[#170D27] border-b border-purple-200 dark:border-purple-800/80 shadow-lg">
          <nav aria-label="Mobile navigation" className="flex flex-col gap-2 pt-1">
            {[
              { id: 'about', label: 'About' },
              { id: 'personality', label: 'Personality' },
              { id: 'profession', label: 'Profession' },
              { id: 'projects', label: 'Projects' },
              { id: 'origin-story', label: 'Origin Story' },
              { id: 'mini-game', label: 'Kitchen Lab' },
              { id: 'dragon-chat', label: 'Chat 💬' },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`text-left px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  activeSection === item.id
                    ? 'bg-purple-200 dark:bg-purple-900/60 text-purple-950 dark:text-white font-semibold'
                    : 'text-purple-800 dark:text-purple-200 hover:bg-purple-100 dark:hover:bg-purple-900/40'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};
