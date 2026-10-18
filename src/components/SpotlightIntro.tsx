import React, { useEffect, useState, useRef } from 'react';
import { Dragon3D } from './Dragon3D';
import { sounds } from '../utils/audio';
import { MoodType } from '../types';
import { FastForward, Sparkles } from 'lucide-react';

interface SpotlightIntroProps {
  onComplete: () => void;
}

export const SpotlightIntro: React.FC<SpotlightIntroProps> = ({ onComplete }) => {
  const [isActive, setIsActive] = useState(true);
  const [isUnfolding, setIsUnfolding] = useState(false);
  const [dragonMood, setDragonMood] = useState<MoodType>('happy');
  const [isOuch, setIsOuch] = useState(false);
  const [countdown, setCountdown] = useState(5);
  const finishedRef = useRef(false);

  useEffect(() => {
    // Lock scrolling while under spotlight
    document.body.style.overflow = 'hidden';

    // Soft magical sparkle as spotlight turns on
    const chimeTimer = setTimeout(() => {
      sounds.playSparkle();
    }, 600);

    // Countdown ticker
    const interval = setInterval(() => {
      setCountdown((prev) => (prev > 1 ? prev - 1 : 1));
    }, 1000);

    // Spotlight duration: 5.2 seconds (within 4-6 seconds)
    const spotlightTimer = setTimeout(() => {
      triggerUnfold();
    }, 5200);

    return () => {
      clearTimeout(chimeTimer);
      clearTimeout(spotlightTimer);
      clearInterval(interval);
      document.body.style.overflow = '';
    };
  }, []);

  const triggerUnfold = () => {
    if (finishedRef.current) return;
    finishedRef.current = true;

    // Gradual unfolding of light
    setIsUnfolding(true);
    sounds.playSparkle();

    // Smoothly scroll to the very top as the light unfolds
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Allow the light expansion transition (1.2s) to smoothly unveil the kitchen
    setTimeout(() => {
      setIsActive(false);
      document.body.style.overflow = '';
      onComplete();
    }, 1100);
  };

  const handleSkip = () => {
    triggerUnfold();
  };

  const handleDragonClick = () => {
    setIsOuch(true);
    setDragonMood('surprised');
    sounds.playDragonOuch();
    setTimeout(() => {
      setIsOuch(false);
      setDragonMood('happy');
    }, 700);
  };

  if (!isActive) return null;

  return (
    <aside
      aria-label="Welcome Spotlight"
      className={`fixed inset-0 z-[100] flex items-center justify-center bg-[#07030e] text-purple-100 transition-all duration-1000 select-none overflow-hidden ${
        isUnfolding
          ? 'opacity-0 scale-110 pointer-events-none'
          : 'opacity-100 scale-100'
      }`}
      style={{
        // Radial light unfolding effect
        background: isUnfolding
          ? 'radial-gradient(circle at center, rgba(255, 250, 255, 0.95) 0%, rgba(243, 232, 255, 0.8) 50%, rgba(16, 7, 28, 0) 100%)'
          : '#07030e',
      }}
    >
      {/* Overhead Spotlight Beam Focused on Right Center where Dragon is positioned */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(circle at 65% 50%, rgba(192, 132, 252, 0.35) 0%, rgba(139, 92, 246, 0.18) 32%, rgba(11, 4, 20, 0.95) 70%, #07030e 100%)',
        }}
      />

      {/* Floating Stardust Particles */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <span className="absolute top-[20%] left-[15%] text-xs text-purple-300 animate-pulse">✦</span>
        <span className="absolute top-[35%] right-[22%] text-sm text-pink-300 animate-float">✨</span>
        <span className="absolute bottom-[28%] left-[25%] text-xs text-amber-200 animate-pulse">✦</span>
        <span className="absolute top-[15%] right-[35%] text-xs text-purple-200">✨</span>
      </div>

      {/* DESKTOP LAYOUT (lg: and up): Strict Two-Column, Zero Overlap */}
      <div className="hidden lg:flex relative z-20 w-full max-w-6xl mx-auto px-10 xl:px-14 items-center justify-between gap-12">
        {/* LEFT COLUMN: Text Content (Dedicated left half, no overlap with dragon) */}
        <div className="w-1/2 max-w-lg text-left flex flex-col items-start space-y-4 relative z-30">
          {/* Junior Chef Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-900/80 border-2 border-pink-400/60 shadow-[0_0_20px_rgba(244,114,182,0.35)] backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-pink-300 animate-pulse" />
            <span className="text-xs uppercase tracking-[0.22em] font-extrabold text-pink-200">
              Baby Purple Dragon · Junior Chef
            </span>
            <Sparkles className="w-3.5 h-3.5 text-pink-300 animate-pulse" />
          </div>

          {/* Main Character Name: VANILLA TRUFFLE */}
          <h1 className="text-5xl xl:text-7xl font-display font-black tracking-tight text-white drop-shadow-[0_4px_30px_rgba(192,132,252,0.9)] leading-none">
            <span className="bg-gradient-to-r from-amber-200 via-pink-200 to-purple-100 bg-clip-text text-transparent">
              Vanilla Truffle
            </span>
          </h1>

          {/* Welcome Tagline */}
          <p className="text-xl xl:text-2xl text-purple-200 font-serif-story font-bold tracking-wide drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
            “Welcome to my Magical 19th-Century Kitchen!”
          </p>

          {/* Story Snippet */}
          <p className="text-sm xl:text-base text-purple-300/90 font-serif-story italic max-w-md leading-relaxed">
            Baked with fragrant vanilla beans, playful mischief, and a gentle puff of dragon flame.
          </p>

          {/* Unfolding Countdown Pill */}
          <div className="pt-2 flex items-center gap-2.5 text-xs text-purple-300/90 font-mono">
            <span className="inline-block w-2.5 h-2.5 rounded-full bg-pink-400 animate-ping" />
            <span>Unfolding magical kitchen in {countdown}s...</span>
          </div>
        </div>

        {/* RIGHT COLUMN: 3D Dragon Under Spotlight (Dedicated right half, 0 overlap) */}
        <div className="w-1/2 flex flex-col items-center justify-center relative">
          {/* Spotlight Floor Ellipse / Glow Ring */}
          <div
            className="w-96 xl:w-[440px] h-96 xl:h-[440px] rounded-full absolute -top-6 left-1/2 -translate-x-1/2 pointer-events-none"
            style={{
              background:
                'radial-gradient(circle, rgba(244, 114, 182, 0.42) 0%, rgba(168, 85, 247, 0.25) 38%, rgba(139, 92, 246, 0.08) 65%, transparent 75%)',
            }}
          />

          {/* 3D Dragon Canvas Container */}
          <div className="w-[380px] xl:w-[440px] h-[380px] xl:h-[440px] relative cursor-pointer group">
            <Dragon3D
              mood={dragonMood}
              isOuch={isOuch}
              onClick={handleDragonClick}
            />
          </div>

          {/* Glowing Shadow Plate under Dragon */}
          <div
            className="w-64 h-8 rounded-[100%] bg-purple-950/90 blur-md -mt-4 shadow-[0_0_50px_rgba(216,180,254,0.7)]"
          />

          {/* Playful prompt under dragon */}
          <span className="mt-2 text-xs text-purple-300/80 font-mono">
            (Tap Vanilla to hear him squeak!)
          </span>
        </div>
      </div>

      {/* TABLET & MOBILE PHONE LAYOUT (< lg): Dragon Completely Visible with Text Above / Overlapping */}
      <div className="lg:hidden relative z-20 w-full h-full flex flex-col items-center justify-center px-4 py-6">
        {/* Floating Text Overlay Positioned Right Above / Upper Portion of Dragon */}
        <div className="w-full max-w-sm text-center flex flex-col items-center space-y-2 pointer-events-none mb-1 sm:mb-2 z-30">
          {/* Junior Chef Badge */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-950/85 border border-pink-400/50 shadow-[0_0_15px_rgba(244,114,182,0.3)] backdrop-blur-md pointer-events-auto">
            <Sparkles className="w-3 h-3 text-pink-300 animate-pulse" />
            <span className="text-[10px] sm:text-xs uppercase tracking-widest font-extrabold text-pink-200">
              Baby Dragon · Junior Chef
            </span>
            <Sparkles className="w-3 h-3 text-pink-300 animate-pulse" />
          </div>

          {/* Title: Vanilla Truffle */}
          <h1 className="text-3xl sm:text-4xl font-display font-black text-white drop-shadow-[0_4px_25px_rgba(192,132,252,0.95)] leading-tight">
            <span className="bg-gradient-to-r from-amber-200 via-pink-200 to-purple-100 bg-clip-text text-transparent">
              Vanilla Truffle
            </span>
          </h1>

          {/* Tagline */}
          <p className="text-xs sm:text-sm text-purple-200 font-serif-story font-semibold drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)] max-w-xs">
            “Welcome to my Magical 19th-Century Kitchen!”
          </p>

          {/* Countdown Pill */}
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-purple-950/70 border border-purple-500/30 text-[10px] sm:text-xs text-purple-300 font-mono shadow-xs">
            <span className="inline-block w-2 h-2 rounded-full bg-pink-400 animate-ping" />
            <span>Unfolding kitchen in {countdown}s...</span>
          </div>
        </div>

        {/* 3D Dragon Container: Centered, Sized to Be COMPLETELY Visible on Mobile & Tablet */}
        <div className="relative flex flex-col items-center justify-center shrink-0">
          {/* Spotlight Glow Ring */}
          <div
            className="w-64 sm:w-80 h-64 sm:h-80 rounded-full absolute -top-4 left-1/2 -translate-x-1/2 pointer-events-none"
            style={{
              background:
                'radial-gradient(circle, rgba(244, 114, 182, 0.4) 0%, rgba(168, 85, 247, 0.22) 40%, transparent 70%)',
            }}
          />

          {/* Completely visible 3D Dragon */}
          <div className="w-[280px] sm:w-[350px] h-[280px] sm:h-[350px] relative cursor-pointer group">
            <Dragon3D
              mood={dragonMood}
              isOuch={isOuch}
              onClick={handleDragonClick}
            />
          </div>

          {/* Shadow Plate */}
          <div
            className="w-48 sm:w-56 h-6 rounded-[100%] bg-purple-950/90 blur-md -mt-3 shadow-[0_0_35px_rgba(216,180,254,0.6)]"
          />

          {/* Tap Prompt */}
          <span className="mt-1 text-[10px] sm:text-xs text-purple-300/80 font-mono">
            (Tap Vanilla to hear him squeak!)
          </span>
        </div>
      </div>

      {/* SKIP INTRO BUTTON IN BOTTOM RIGHT CORNER (As explicitly requested) */}
      <button
        onClick={handleSkip}
        className="fixed bottom-6 right-6 z-[110] px-4 py-2.5 rounded-full bg-purple-900/80 hover:bg-purple-800 text-purple-200 hover:text-white border-2 border-purple-400/50 shadow-xl backdrop-blur-md font-bold text-xs tracking-wider uppercase flex items-center gap-2 transition-all hover:scale-105 active:scale-95 group"
        aria-label="Skip introduction and enter kitchen"
      >
        <span>Skip Intro</span>
        <FastForward className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
      </button>
    </aside>
  );
};
