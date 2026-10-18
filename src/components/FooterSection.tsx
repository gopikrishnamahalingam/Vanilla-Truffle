import React from 'react';
import { ArrowUp, Heart, Sparkles, BookOpen } from 'lucide-react';
import { sounds } from '../utils/audio';

export const FooterSection: React.FC = () => {
  const scrollToTop = () => {
    sounds.playBubble();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="mt-20 border-t border-purple-200/80 dark:border-purple-900/80 bg-purple-100/60 dark:bg-[#120920] pt-14 pb-12 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Block */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 pb-10 border-b border-purple-200 dark:border-purple-800/80">
          
          {/* Brand & Tagline */}
          <div className="flex items-center gap-4 text-center md:text-left">
            <div className="w-16 h-16 rounded-2xl overflow-hidden shrink-0 border border-purple-300 dark:border-purple-700 shadow-sm bg-purple-200 dark:bg-purple-900">
              <img
                src="/assets/images/vanilla_chef_main_1792330588106.jpg"
                alt="Vanilla Truffle"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h3 className="font-display font-bold text-xl text-purple-950 dark:text-white">
                Vanilla Truffle’s Magical Kitchen
              </h3>
              <p className="text-xs sm:text-sm text-purple-800/80 dark:text-purple-300 font-serif-story italic mt-0.5">
                “Made with vanilla, mischief, and a pinch of dragon dust.”
              </p>
              <p className="text-[11px] text-purple-600/70 dark:text-purple-400 mt-1">
                haX.baby 48-Hour Hackathon · Track 2: Original Character Portfolio
              </p>
            </div>
          </div>

          {/* Return to top button */}
          <button
            onClick={scrollToTop}
            className="px-4 py-2.5 rounded-xl bg-white dark:bg-purple-900/70 border border-purple-200 dark:border-purple-800 text-purple-950 dark:text-purple-100 hover:bg-purple-50 dark:hover:bg-purple-800 text-xs sm:text-sm font-semibold shadow-sm transition-all flex items-center gap-2"
          >
            <span>Back to Kitchen Counter</span>
            <ArrowUp className="w-4 h-4 text-purple-600 dark:text-purple-300" />
          </button>
        </div>

        {/* Detailed Hackathon & Asset Credits */}
        <div className="pt-8 grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-purple-800/70 dark:text-purple-300/70">
          <div>
            <p className="font-bold text-purple-950 dark:text-purple-100 mb-1">
              Ideation and Implementation
            </p>
            <p>
              Khushleen and Gopikrishna
            </p>
          </div>

          <div>
            <p className="font-bold text-purple-950 dark:text-purple-100 mb-1">
              Vanilla Truffle Voice 
            </p>
            <p>
              YouTube Channel: 3D-Disco <a href="https://www.youtube.com/watch?v=UbzM2g5R390">Link</a>
            </p>
          </div>

          <div>
            <p className="font-bold text-purple-950 dark:text-purple-100 mb-1">
              Created Using
            </p>
            <p>
              Google AI Studio
            </p>
          </div>
        </div>

        {/* Final Sign-off Message */}
        <div className="mt-10 text-center text-xs sm:text-sm font-serif-story italic text-purple-900 dark:text-purple-200">
          “Baked with love, a pinch of chaos, and a whole lot of dragon dust.”
        </div>
      </div>
    </footer>
  );
};
