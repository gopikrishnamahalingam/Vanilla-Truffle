import React, { useState, useRef } from 'react';
import { Sparkles, Utensils } from 'lucide-react';
import { sounds } from '../utils/audio';
import { MoodType } from '../types';
import { Dragon3D } from './Dragon3D';

interface HeroSectionProps {
  onReplayIntro?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onReplayIntro }) => {
  const [mood, setMood] = useState<MoodType>('happy');
  const [isOuch, setIsOuch] = useState(false);
  const [headTilt, setHeadTilt] = useState({ x: 0, y: 0, rotate: 0 });
  const heroCardRef = useRef<HTMLDivElement>(null);

  const moodDialogues: Record<MoodType, { quote: string; badge: string; emoji: string }> = {
    happy: {
      quote: '“Let’s bake something magical!”',
      badge: 'Baking High Spirits',
      emoji: '✨'
    },
    sleepy: {
      quote: '“Five more minutes... then more cookies.”',
      badge: 'Cozy Nap Craving',
      emoji: '💤'
    },
    mischievous: {
      quote: '“I definitely didn’t add extra dragon dust!”',
      badge: 'Secret Recipe Scheme',
      emoji: '😼'
    },
    surprised: {
      quote: '“WAIT... WHY IS THE BATTER GLOWING?!”',
      badge: 'Magic Overload',
      emoji: '😲'
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!heroCardRef.current) return;
    const rect = heroCardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const normalizedX = (e.clientX - centerX) / (rect.width / 2);
    const normalizedY = (e.clientY - centerY) / (rect.height / 2);

    // Clamped head tilt & eye offset
    setHeadTilt({
      x: Math.max(-12, Math.min(12, normalizedX * 12)),
      y: Math.max(-10, Math.min(10, normalizedY * 10)),
      rotate: Math.max(-4, Math.min(4, normalizedX * 4))
    });
  };

  const handleMouseLeave = () => {
    setHeadTilt({ x: 0, y: 0, rotate: 0 });
  };

  const handleDragonClick = () => {
    sounds.playDragonOuch();
    setIsOuch(true);
    setTimeout(() => {
      setIsOuch(false);
    }, 2800);
  };

  return (
    <section
      id="hero"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative pt-8 pb-16 md:pt-14 md:pb-24 overflow-hidden"
    >
      {/* Whimsical Floating Culinary Ornaments */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden select-none opacity-40 dark:opacity-30">
        <span className="absolute top-12 left-10 text-2xl animate-float">🧁</span>
        <span className="absolute top-24 right-16 text-xl animate-float-delayed">⭐</span>
        <span className="absolute bottom-20 left-16 text-3xl animate-bubble">🫧</span>
        <span className="absolute top-1/2 right-8 text-2xl animate-float">🍓</span>
        <span className="absolute bottom-12 right-1/4 text-xl animate-sparkle">✨</span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Header Text */}
        <div className="text-center max-w-3xl mx-auto mb-8 md:mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-purple-700 dark:text-purple-300 bg-purple-200/50 dark:bg-purple-900/40 rounded-full mb-3 border border-purple-300/40 dark:border-purple-800/40">
            <span>Junior Chef & Magic Apprentice</span>
            <span aria-hidden="true">·</span>
            <span>Est. 19th Century</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-purple-950 dark:text-white leading-[1.1] mb-4">
            Vanilla Truffle’s <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-purple-600 via-pink-500 to-purple-500 bg-clip-text text-transparent">
              Magical Kitchen
            </span>
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-purple-900/80 dark:text-purple-200/90 font-serif-story italic max-w-xl mx-auto">
            “Made with vanilla, mischief, and a pinch of dragon dust.”
          </p>

          <p className="mt-2 text-xs sm:text-sm text-purple-700/70 dark:text-purple-300/70">
            Welcome, curious wanderer! Step inside, smell the stardust vanilla, and meet the tiny dragon who burns the soup with pure passion.
          </p>
        </div>

        {/* Central Character Stage & Arrow Diagram Container */}
        <div className="relative max-w-4xl mx-auto my-4 flex flex-col items-center">
          
          {/* Main 3D Interactive Baby Dragon (No image box/background) */}
          <div className="relative">
            <Dragon3D mood={mood} isOuch={isOuch} onClick={handleDragonClick} />

            {/* Click prompt overlay hint */}
            {/* <div className="text-center mt-[-10px] mb-2">
              <span className="inline-block px-3 py-1 bg-purple-900/40 dark:bg-purple-900/70 border border-purple-300/40 dark:border-purple-700/60 rounded-full text-xs font-semibold text-purple-900 dark:text-purple-200 backdrop-blur-sm shadow-sm animate-pulse">
                Interactive 3D Baby Dragon · Tap me to say hi! 
              </span>
            </div> */}

            {/* Reactive Speech Bubble when Clicked */}
            {isOuch && (
              <div className="absolute top-2 left-1/2 -translate-x-1/2 z-30 animate-bounce">
                <div className="relative bg-white dark:bg-purple-900 text-purple-950 dark:text-purple-100 px-4 py-2.5 rounded-2xl shadow-xl border-2 border-purple-400 font-display font-bold text-sm sm:text-base whitespace-nowrap">
                  “Ouchy, that hurts!” 🥺
                  <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-3 h-3 bg-white dark:bg-purple-900 border-b-2 border-r-2 border-purple-400 transform rotate-45" />
                </div>
              </div>
            )}
          </div>

          {/* Desktop Arrow-Style Hand-Annotated Notes Diagram */}
          <div className="hidden md:block">
            {/* Note 1: Top-Left (Name & Species) */}
            <div className="absolute -top-4 left-4 max-w-[200px] p-3 bg-white/90 dark:bg-purple-900/80 rounded-xl shadow-md border border-purple-200 dark:border-purple-700/60 font-handwriting text-lg leading-tight text-purple-950 dark:text-purple-100 transform -rotate-3 hover:rotate-0 transition-transform">
              <span className="font-bold text-purple-700 dark:text-purple-300">Name:</span> Vanilla Truffle
              <br />
              <span className="text-sm font-sans text-purple-800/80 dark:text-purple-200">Species: Baby Dragon</span>
              <div className="text-right text-xs text-purple-400 font-sans mt-1">⟶</div>
            </div>

            {/* Note 2: Top-Right (Age & Quirk) */}
            <div className="absolute -top-4 right-4 max-w-[220px] p-3 bg-white/90 dark:bg-purple-900/80 rounded-xl shadow-md border border-purple-200 dark:border-purple-700/60 font-handwriting text-lg leading-tight text-purple-950 dark:text-purple-100 transform rotate-2 hover:rotate-0 transition-transform">
              <span className="font-bold text-purple-700 dark:text-purple-300">Age:</span> 2 Years Old
              <br />
              <span className="text-sm font-sans text-purple-800/80 dark:text-purple-200">
                Self-proclaimed greatest cook in the universe!
              </span>
              <div className="text-left text-xs text-purple-400 font-sans mt-1">⟵</div>
            </div>

            {/* Note 3: Bottom-Left (Personality) */}
            <div className="absolute bottom-6 left-2 max-w-[210px] p-3 bg-white/90 dark:bg-purple-900/80 rounded-xl shadow-md border border-purple-200 dark:border-purple-700/60 font-handwriting text-lg leading-tight text-purple-950 dark:text-purple-100 transform rotate-2 hover:rotate-0 transition-transform">
              <span className="font-bold text-purple-700 dark:text-purple-300">Personality:</span>
              <br />
              <span className="text-sm font-sans text-purple-800/80 dark:text-purple-200">
                Smart, mischievous, playful & deeply curious about stove knobs!
              </span>
              <div className="text-right text-xs text-purple-400 font-sans mt-1">↗</div>
            </div>

            {/* Note 4: Bottom-Right (Profession) */}
            <div className="absolute bottom-6 right-2 max-w-[210px] p-3 bg-white/90 dark:bg-purple-900/80 rounded-xl shadow-md border border-purple-200 dark:border-purple-700/60 font-handwriting text-lg leading-tight text-purple-950 dark:text-purple-100 transform -rotate-2 hover:rotate-0 transition-transform">
              <span className="font-bold text-purple-700 dark:text-purple-300">Profession:</span>
              <br />
              <span className="text-sm font-sans text-purple-800/80 dark:text-purple-200">
                Professional Junior Chef & Master in Progress
              </span>
              <div className="text-left text-xs text-purple-400 font-sans mt-1">↖</div>
            </div>
          </div>

          {/* Mobile Character Info Diagram Cards (Clean grid below on phone) */}
          <div className="md:hidden grid grid-cols-2 gap-3 mt-6">
            <div className="p-3 bg-white/80 dark:bg-purple-900/60 rounded-xl border border-purple-200 dark:border-purple-800/80 text-xs">
              <p className="font-bold text-purple-950 dark:text-purple-100">Vanilla Truffle</p>
              <p className="text-purple-700 dark:text-purple-300">2 yrs · Baby Dragon</p>
            </div>
            <div className="p-3 bg-white/80 dark:bg-purple-900/60 rounded-xl border border-purple-200 dark:border-purple-800/80 text-xs">
              <p className="font-bold text-purple-950 dark:text-purple-100">Junior Chef</p>
              <p className="text-purple-700 dark:text-purple-300">Master in Progress</p>
            </div>
            <div className="p-3 bg-white/80 dark:bg-purple-900/60 rounded-xl border border-purple-200 dark:border-purple-800/80 text-xs">
              <p className="font-bold text-purple-950 dark:text-purple-100">Key Quirk</p>
              <p className="text-purple-700 dark:text-purple-300">Believes he is #1 chef</p>
            </div>
            <div className="p-3 bg-white/80 dark:bg-purple-900/60 rounded-xl border border-purple-200 dark:border-purple-800/80 text-xs">
              <p className="font-bold text-purple-950 dark:text-purple-100">Personality</p>
              <p className="text-purple-700 dark:text-purple-300">Smart, curious, playful</p>
            </div>
          </div>
        </div>

        {/* Interactive Mood Selector Bar */}
        <div className="max-w-md mx-auto mt-8 p-3 rounded-2xl bg-white/70 dark:bg-purple-900/40 border border-purple-200 dark:border-purple-800/60 backdrop-blur-sm shadow-sm text-center">
          <p className="text-xs font-semibold text-purple-700 dark:text-purple-300 uppercase tracking-wider mb-2">
            Vanilla’s Current Kitchen Mood
          </p>

          <div className="flex items-center justify-center gap-1.5 sm:gap-2">
            {(['happy', 'sleepy', 'mischievous', 'surprised'] as MoodType[]).map((m) => (
              <button
                key={m}
                onClick={() => {
                  sounds.playBubble();
                  setMood(m);
                }}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all capitalize ${
                  mood === m
                    ? 'bg-purple-600 text-white shadow-sm scale-105'
                    : 'bg-purple-100/80 dark:bg-purple-800/40 text-purple-800 dark:text-purple-200 hover:bg-purple-200'
                }`}
              >
                {m}
              </button>
            ))}
          </div>

          <div className="mt-3 text-xs sm:text-sm font-medium text-purple-900 dark:text-purple-100 transition-all">
            {moodDialogues[mood].quote}
          </div>
        </div>

        {/* Primary Call To Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 mt-8">
          <button
            onClick={() => {
              sounds.playSparkle();
              document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="px-6 py-3 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-semibold text-sm sm:text-base shadow-lg shadow-purple-500/25 transition-all hover:scale-105 flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4" />
            <span>Explore Magical Recipes</span>
          </button>

          <button
            onClick={() => {
              sounds.playBubble();
              document.getElementById('mini-game')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="px-6 py-3 rounded-xl bg-white dark:bg-purple-900/60 hover:bg-purple-50 dark:hover:bg-purple-800/70 text-purple-950 dark:text-purple-100 font-semibold text-sm sm:text-base border border-purple-300 dark:border-purple-700 shadow-sm transition-all hover:scale-105 flex items-center gap-2"
          >
            <Utensils className="w-4 h-4 text-purple-600 dark:text-purple-300" />
            <span>Kitchen Lab Mini-Game</span>
          </button>

          {onReplayIntro && (
            <button
              onClick={() => {
                sounds.playSparkle();
                onReplayIntro();
              }}
              className="px-4 py-3 rounded-xl bg-purple-100/80 dark:bg-purple-900/40 hover:bg-purple-200 dark:hover:bg-purple-800/60 text-purple-800 dark:text-purple-200 font-semibold text-xs sm:text-sm border border-purple-300/50 dark:border-purple-700/50 transition-all hover:scale-105 flex items-center gap-1.5"
              title="Replay 3D Dragon Spotlight Introduction"
            >
              <span>✨ Replay Spotlight</span>
            </button>
          )}
        </div>
      </div>
    </section>
  );
};
