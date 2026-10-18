import React, { useState, useEffect, useRef } from 'react';
import {
  X,
  ChevronLeft,
  ChevronRight,
  Bookmark,
  Volume2,
  CornerDownRight,
  RotateCcw,
  Sparkles,
  BookOpen,
} from 'lucide-react';
import { BUTTERFLY_STORY_SCENES } from '../data/story';
import { sounds } from '../utils/audio';

interface BonusStoryModalProps {
  onClose: () => void;
}

interface TurningState {
  fromPage: number;
  toPage: number;
  direction: 'next' | 'prev';
}

export const BonusStoryModal: React.FC<BonusStoryModalProps> = ({ onClose }) => {
  // Page 0: Cover
  // Pages 1 to BUTTERFLY_STORY_SCENES.length: Story scenes (1 to 6)
  // Last Page (7): Epilogue / The End
  const totalPages = BUTTERFLY_STORY_SCENES.length + 2;
  const [currentPage, setCurrentPage] = useState(0);
  const [turningState, setTurningState] = useState<TurningState | null>(null);

  // Touch tracking for swipe gestures
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);

  const flipToNext = () => {
    if (turningState !== null || currentPage >= totalPages - 1) return;
    sounds.playPageTurn();
    const next = currentPage + 1;
    setTurningState({ fromPage: currentPage, toPage: next, direction: 'next' });

    setTimeout(() => {
      setCurrentPage(next);
      setTurningState(null);
    }, 620);
  };

  const flipToPrev = () => {
    if (turningState !== null || currentPage <= 0) return;
    sounds.playPageTurn();
    const prev = currentPage - 1;
    setTurningState({ fromPage: currentPage, toPage: prev, direction: 'prev' });

    setTimeout(() => {
      setCurrentPage(prev);
      setTurningState(null);
    }, 620);
  };

  const goToPage = (target: number) => {
    if (turningState !== null || target === currentPage || target < 0 || target >= totalPages) return;
    sounds.playPageTurn();
    const direction = target > currentPage ? 'next' : 'prev';
    setTurningState({ fromPage: currentPage, toPage: target, direction });
    setTimeout(() => {
      setCurrentPage(target);
      setTurningState(null);
    }, 620);
  };

  // Keyboard navigation support
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ' || e.key === 'PageDown') {
        e.preventDefault();
        flipToNext();
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        e.preventDefault();
        flipToPrev();
      } else if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentPage, turningState]);

  // Touch swipe gesture handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null || touchStartY.current === null) return;
    const deltaX = e.changedTouches[0].clientX - touchStartX.current;
    const deltaY = e.changedTouches[0].clientY - touchStartY.current;

    if (Math.abs(deltaX) > 40 && Math.abs(deltaX) > Math.abs(deltaY)) {
      if (deltaX < 0) {
        flipToNext();
      } else {
        flipToPrev();
      }
    }
    touchStartX.current = null;
    touchStartY.current = null;
  };

  // Helper to render the Left Half of any given page index
  const renderLeftPage = (pageIndex: number) => {
    if (pageIndex === 0) {
      // Cover inside left flap (leather binder)
      return (
        <div className="w-full h-full p-8 flex flex-col justify-between bg-gradient-to-br from-[#200a36] to-[#120420] text-purple-200 border-r border-purple-900/60 select-none">
          <div className="flex justify-between items-center text-xs text-purple-400 font-mono">
            <span>EX LIBRIS</span>
            <span>✦ KITCHEN ARCHIVES ✦</span>
          </div>
          <div className="text-center space-y-3">
            <div className="w-16 h-16 mx-auto rounded-full bg-pink-500/10 border border-pink-400/30 flex items-center justify-center text-2xl shadow-inner">
              👑
            </div>
            <h4 className="font-display font-bold text-xl text-white">Chef Odin’s Ledger</h4>
            <p className="text-xs font-serif-story italic text-purple-300/80 max-w-xs mx-auto leading-relaxed">
              “To the young dragon whose tail knocks down heirlooms, and whose pastries melt the heart.”
            </p>
          </div>
          <div className="text-center text-[10px] text-purple-400/60 font-mono">
            Circa 1880 · Copper Pot Press
          </div>
        </div>
      );
    }

    if (pageIndex === totalPages - 1) {
      // Epilogue Left Spread: Memoir sketch
      return (
        <div className="w-full h-full p-6 sm:p-8 flex flex-col justify-between bg-[#FDFBF7] dark:bg-[#191026] text-[#3B1764] dark:text-[#E9D5FF] border-r border-[#E5DAC4] dark:border-purple-900/50 select-none">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-widest text-pink-600 dark:text-pink-400 font-mono">
              Epilogue Memoir
            </span>
            <h4 className="text-2xl font-bold font-display text-purple-950 dark:text-white mt-1">
              Sweet Remnants
            </h4>
            <p className="text-xs sm:text-sm font-serif-story text-purple-900/80 dark:text-purple-200/80 mt-3 leading-relaxed">
              The porcelain lamp could not be reassembled, but Odin glued the shards onto the hearth mantel as a mosaic. Each morning at dawn, sunlight reflects through the porcelain blue flowers, reminding Vanilla of the morning he flew inside the flour cloud.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-purple-50 dark:bg-purple-950/60 border border-purple-200 dark:border-purple-800 text-center">
            <span className="text-2xl block mb-1">☕✨</span>
            <span className="text-xs font-serif-story italic text-purple-800 dark:text-purple-300">
              “Tea is always sweeter after a forgiven accident.”
            </span>
          </div>
          <span className="text-[10px] font-mono text-stone-400">p. 13</span>
        </div>
      );
    }

    // Standard story scene (Scene 1 to 6) -> Illustration & Plate commentary
    const scene = BUTTERFLY_STORY_SCENES[pageIndex - 1];
    return (
      <div className="w-full h-full p-4 sm:p-6 flex flex-col justify-between items-center bg-[#FDFBF7] dark:bg-[#1a1126] border-r border-[#E5DAC4] dark:border-purple-900/50 select-none relative">
        <div className="w-full">
          <div className="flex items-center justify-between text-xs text-purple-700 dark:text-purple-300 font-mono mb-2">
            <span>PLATE 0{scene.step}</span>
            <span className="italic font-serif-story text-stone-400">The Butterfly Chase</span>
          </div>

          <div className="w-full h-56 sm:h-64 rounded-xl overflow-hidden border-2 border-[#E5DAC4] dark:border-purple-800 shadow-md relative group">
            <img
              src={scene.image}
              alt={scene.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute top-2 left-2 px-2.5 py-0.5 rounded-full bg-purple-950/80 text-purple-200 text-[10px] font-mono backdrop-blur-xs">
              Fig. {scene.step}
            </div>
          </div>
        </div>

        {/* Dragon Commentary */}
        <div className="my-auto py-2 text-center px-2">
          <p className="text-xs font-serif-story italic text-purple-900/80 dark:text-purple-300/80 leading-snug">
            {scene.step === 1 && '“I saw the shimmer and my whiskers twitched!” — Vanilla'}
            {scene.step === 2 && '“My wings were fluttering so fast my chef hat slipped!” — Vanilla'}
            {scene.step === 3 && '“Flour smells like sweet clouds when it explodes!” — Vanilla'}
            {scene.step === 4 && '“Oh dear... Odin’s precious porcelain heirloom!” — Vanilla'}
            {scene.step === 5 && '“Odin has the sternest mustache in the entire city!” — Vanilla'}
            {scene.step === 6 && '“And that is how peace was restored to the pantry!” — Vanilla'}
          </p>
        </div>

        <div className="w-full flex justify-between items-center text-[10px] font-mono text-stone-400">
          <span>p. {pageIndex * 2 - 1}</span>
          <span className="text-pink-500/70 font-serif-story">✦ Vanilla & Odin ✦</span>
        </div>
      </div>
    );
  };

  // Helper to render the Right Half of any given page index
  const renderRightPage = (pageIndex: number) => {
    if (pageIndex === 0) {
      // Cover Right Spread: Grand Golden Fairytale Tome Cover
      return (
        <div className="w-full h-full flex flex-col items-center justify-center p-6 sm:p-10 text-center bg-gradient-to-br from-[#3b1261] via-[#240a3d] to-[#160429] text-[#FDF8E8] relative overflow-hidden select-none">
          {/* Filigree Borders */}
          <div className="absolute inset-4 sm:inset-6 border-2 border-[#E9D5FF]/40 rounded-xl pointer-events-none flex flex-col justify-between p-3">
            <div className="flex justify-between text-xs text-[#E9D5FF]/70">
              <span>✦ 1880 ✦</span>
              <span>✦ MAGIC ✦</span>
            </div>
            <div className="flex justify-between text-xs text-[#E9D5FF]/70">
              <span>✦ KITCHEN ✦</span>
              <span>✦ TALE ✦</span>
            </div>
          </div>

          <div className="relative z-10 max-w-sm space-y-4">
            <div className="w-16 h-16 mx-auto rounded-full bg-pink-500/20 border-2 border-pink-300 flex items-center justify-center text-3xl shadow-lg animate-float">
              🦋
            </div>

            <span className="inline-block text-xs uppercase tracking-[0.25em] text-pink-300 font-bold">
              An Enchanted Kitchen Chronicle
            </span>

            <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-white tracking-tight drop-shadow-md">
              Vanilla & The Butterfly
            </h2>

            <p className="text-xs sm:text-sm text-purple-200/90 font-serif-story italic">
              The True Secret History of The Broken Porcelain Lamp
            </p>

            <div className="pt-4">
              <button
                onClick={flipToNext}
                className="px-6 py-3 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-bold text-xs tracking-wide shadow-xl transition-all hover:scale-105 flex items-center gap-2 mx-auto group"
              >
                <span>Turn to Page 1</span>
                <CornerDownRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      );
    }

    if (pageIndex === totalPages - 1) {
      // Epilogue Right Spread: The End View
      return (
        <div className="w-full h-full flex flex-col items-center justify-center p-6 sm:p-10 text-center bg-gradient-to-br from-[#FFFDF9] to-[#F7EFE0] dark:from-[#201530] dark:to-[#170D27] text-purple-950 dark:text-white select-none">
          <div className="max-w-xs space-y-4">
            <div className="text-4xl animate-bounce">✨🦋✨</div>
            <h3 className="text-2xl font-display font-bold">
              The Kitchen is Warm Again
            </h3>
            <p className="text-xs sm:text-sm font-serif-story text-purple-900/80 dark:text-purple-200/80 leading-relaxed">
              “Odin swept up the shards, but kept the glowing butterfly crowned on my head for afternoon tea. Some accidents become the sweetest memories.”
            </p>
            <p className="text-xs font-bold text-pink-600 dark:text-pink-400 uppercase tracking-widest pt-2">
              — Finis · The End —
            </p>

            <div className="pt-4 flex flex-col gap-2">
              <button
                onClick={() => goToPage(0)}
                className="px-4 py-2 rounded-full bg-purple-100 dark:bg-purple-900/60 text-purple-900 dark:text-purple-200 font-semibold text-xs hover:bg-purple-200 flex items-center justify-center gap-1.5 transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Read From Beginning</span>
              </button>
              <button
                onClick={onClose}
                className="px-5 py-2 rounded-full bg-pink-600 hover:bg-pink-700 text-white font-semibold text-xs shadow-md flex items-center justify-center gap-1.5 transition-transform hover:scale-105"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Close Storybook</span>
              </button>
            </div>
          </div>
        </div>
      );
    }

    // Standard story scene right page: Chapter heading, narrative prose, dog-ear turn button
    const scene = BUTTERFLY_STORY_SCENES[pageIndex - 1];
    return (
      <div className="w-full h-full p-5 sm:p-8 flex flex-col justify-between bg-[#FFFDF9] dark:bg-[#201530] text-[#3B1764] dark:text-[#F3E8FF] select-none relative">
        <div>
          <div className="flex items-center justify-between text-xs text-purple-600 dark:text-purple-400 font-bold uppercase tracking-wider mb-2">
            <span>Chapter 0{scene.step}</span>
            <span className="text-stone-400 font-serif-story italic">Kitchen Archives</span>
          </div>

          <h3 className="text-2xl sm:text-3xl font-bold font-display text-purple-950 dark:text-white mb-4">
            {scene.title}
          </h3>

          {/* Ornate drop cap story text */}
          <p className="text-sm sm:text-base font-serif-story leading-relaxed text-purple-900/90 dark:text-purple-100/90">
            <span className="float-left text-4xl sm:text-5xl font-serif font-bold text-pink-600 dark:text-pink-400 pr-2 pt-1 leading-none">
              {scene.text.charAt(0)}
            </span>
            {scene.text.slice(1)}
          </p>
        </div>

        {/* Bottom Turn Navigation & Dog-ear Corner */}
        <div className="pt-4 flex items-center justify-between border-t border-[#EFE7D8] dark:border-purple-900/40 mt-4">
          <span className="text-[11px] text-stone-400 dark:text-purple-400/60 font-serif-story italic">
            Swipe or tap arrow to turn
          </span>

          <button
            onClick={flipToNext}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-purple-100 dark:bg-purple-900/50 hover:bg-purple-200 dark:hover:bg-purple-800 text-purple-800 dark:text-purple-200 text-xs font-semibold shadow-xs transition-all hover:translate-x-0.5"
          >
            <span>Next Page</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Page number right */}
        <span className="absolute bottom-2 right-4 text-[10px] font-mono text-stone-400">
          p. {pageIndex * 2}
        </span>
      </div>
    );
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-purple-950/85 backdrop-blur-md select-none animate-fade-in"
      onClick={onClose}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Dynamic 3D Keyframe Style Injector for True Page Flipping */}
      <style>{`
        @keyframes flipForwardSheet {
          0% {
            transform: perspective(2200px) rotateY(0deg);
            box-shadow: 0 4px 10px rgba(0,0,0,0.1);
          }
          50% {
            box-shadow: -30px 20px 50px rgba(0,0,0,0.45);
          }
          100% {
            transform: perspective(2200px) rotateY(-180deg);
            box-shadow: 0 4px 10px rgba(0,0,0,0.1);
          }
        }

        @keyframes flipBackwardSheet {
          0% {
            transform: perspective(2200px) rotateY(0deg);
            box-shadow: 0 4px 10px rgba(0,0,0,0.1);
          }
          50% {
            box-shadow: 30px 20px 50px rgba(0,0,0,0.45);
          }
          100% {
            transform: perspective(2200px) rotateY(180deg);
            box-shadow: 0 4px 10px rgba(0,0,0,0.1);
          }
        }

        @keyframes pageShine {
          0% { opacity: 0; }
          40% { opacity: 0.35; }
          60% { opacity: 0.35; }
          100% { opacity: 0; }
        }

        .flipping-sheet-forward {
          transform-origin: left center;
          animation: flipForwardSheet 620ms cubic-bezier(0.25, 1, 0.5, 1) forwards;
          transform-style: preserve-3d;
        }

        .flipping-sheet-backward {
          transform-origin: right center;
          animation: flipBackwardSheet 620ms cubic-bezier(0.25, 1, 0.5, 1) forwards;
          transform-style: preserve-3d;
        }
      `}</style>

      {/* Outer Storybook Container */}
      <div
        className="relative w-full max-w-4xl rounded-3xl bg-[#2B1055] p-3 sm:p-5 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.75)] border-4 border-[#E9D5FF]/30 flex flex-col justify-between max-h-[96vh]"
        onClick={(e) => e.stopPropagation()}
        style={{ perspective: '2400px' }}
      >
        {/* Book Header Bar */}
        <div className="flex items-center justify-between px-3 py-2 border-b border-purple-500/30 text-purple-200">
          <div className="flex items-center gap-2">
            <Bookmark className="w-5 h-5 text-pink-400 fill-pink-400" />
            <span className="text-xs font-bold uppercase tracking-widest text-purple-300">
              {currentPage === 0
                ? 'Fairytale Cover'
                : currentPage === totalPages - 1
                ? 'Epilogue'
                : `Page ${currentPage} of ${totalPages - 2}`}
            </span>
            <span className="hidden sm:inline-block text-purple-400/60">·</span>
            <span className="hidden sm:inline-block text-xs font-serif-story text-purple-300">
              “The Broken Lamp & The Butterfly”
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => sounds.playPageTurn()}
              title="Play page turn sound"
              className="p-1.5 rounded-full hover:bg-purple-800/50 text-purple-300 transition-colors"
            >
              <Volume2 className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-full bg-purple-800/60 hover:bg-purple-700 text-purple-200 transition-colors"
              aria-label="Close storybook"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* 3D Storybook Body */}
        <div className="relative my-3 flex-1 min-h-[460px] sm:min-h-[520px] flex items-center justify-center overflow-hidden">
          {/* Main Book Shell */}
          <div
            className="w-full h-full rounded-2xl bg-[#FFFDF7] dark:bg-[#1f152d] border-2 border-[#D8C7A7] dark:border-purple-800 shadow-2xl flex flex-col md:flex-row overflow-hidden relative"
            style={{
              perspective: '2400px',
              transformStyle: 'preserve-3d',
            }}
          >
            {/* Center Gutter Shadow (Spine Crease) */}
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-8 -translate-x-1/2 pointer-events-none z-30 bg-gradient-to-r from-transparent via-stone-900/20 to-transparent dark:via-black/40" />

            {/* 1. Underlying Left Page */}
            <div className="w-full md:w-1/2 h-full relative overflow-hidden">
              {renderLeftPage(
                turningState && turningState.direction === 'prev'
                  ? turningState.toPage
                  : currentPage
              )}
            </div>

            {/* 2. Underlying Right Page */}
            <div className="w-full md:w-1/2 h-full relative overflow-hidden">
              {renderRightPage(
                turningState && turningState.direction === 'next'
                  ? turningState.toPage
                  : currentPage
              )}
            </div>

            {/* 3. DYNAMIC 3D TURNING LEAF (VISIBLE DURING FLIP ANIMATION) */}
            {turningState && turningState.direction === 'next' && (
              <div
                className="hidden md:block absolute right-0 top-0 w-1/2 h-full z-40 flipping-sheet-forward pointer-events-none"
                style={{
                  transformStyle: 'preserve-3d',
                }}
              >
                {/* Front of Turning Sheet (Current Right Page lifting up) */}
                <div
                  className="absolute inset-0 w-full h-full shadow-2xl overflow-hidden rounded-r-2xl"
                  style={{
                    backfaceVisibility: 'hidden',
                    WebkitBackfaceVisibility: 'hidden',
                  }}
                >
                  {renderRightPage(turningState.fromPage)}
                  {/* Dynamic Shading Gradient */}
                  <div
                    className="absolute inset-0 bg-gradient-to-l from-black/35 via-black/15 to-transparent pointer-events-none"
                    style={{ animation: 'pageShine 620ms ease-in-out forwards' }}
                  />
                </div>

                {/* Back of Turning Sheet (Lands onto Left Page) */}
                <div
                  className="absolute inset-0 w-full h-full shadow-2xl overflow-hidden rounded-l-2xl"
                  style={{
                    transform: 'rotateY(180deg)',
                    backfaceVisibility: 'hidden',
                    WebkitBackfaceVisibility: 'hidden',
                  }}
                >
                  {renderLeftPage(turningState.toPage)}
                  {/* Dynamic Light Landing Gradient */}
                  <div
                    className="absolute inset-0 bg-gradient-to-r from-black/35 via-black/15 to-transparent pointer-events-none"
                    style={{ animation: 'pageShine 620ms ease-in-out forwards' }}
                  />
                </div>
              </div>
            )}

            {turningState && turningState.direction === 'prev' && (
              <div
                className="hidden md:block absolute left-0 top-0 w-1/2 h-full z-40 flipping-sheet-backward pointer-events-none"
                style={{
                  transformStyle: 'preserve-3d',
                }}
              >
                {/* Front of Turning Sheet (Current Left Page lifting up) */}
                <div
                  className="absolute inset-0 w-full h-full shadow-2xl overflow-hidden rounded-l-2xl"
                  style={{
                    backfaceVisibility: 'hidden',
                    WebkitBackfaceVisibility: 'hidden',
                  }}
                >
                  {renderLeftPage(turningState.fromPage)}
                  {/* Dynamic Shadow */}
                  <div
                    className="absolute inset-0 bg-gradient-to-r from-black/35 via-black/15 to-transparent pointer-events-none"
                    style={{ animation: 'pageShine 620ms ease-in-out forwards' }}
                  />
                </div>

                {/* Back of Turning Sheet (Lands onto Right Page) */}
                <div
                  className="absolute inset-0 w-full h-full shadow-2xl overflow-hidden rounded-r-2xl"
                  style={{
                    transform: 'rotateY(180deg)',
                    backfaceVisibility: 'hidden',
                    WebkitBackfaceVisibility: 'hidden',
                  }}
                >
                  {renderRightPage(turningState.toPage)}
                  <div
                    className="absolute inset-0 bg-gradient-to-l from-black/35 via-black/15 to-transparent pointer-events-none"
                    style={{ animation: 'pageShine 620ms ease-in-out forwards' }}
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Storybook Bottom Controls & Keyboard Hints */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2 px-2 pt-2 border-t border-purple-500/30 text-purple-300 text-xs">
          {/* Navigation Buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={flipToPrev}
              disabled={currentPage === 0 || turningState !== null}
              className="px-3.5 py-1.5 rounded-xl bg-purple-900/60 hover:bg-purple-800 disabled:opacity-30 disabled:pointer-events-none text-purple-200 font-medium flex items-center gap-1 transition-all"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Turn Back</span>
            </button>

            <button
              onClick={flipToNext}
              disabled={currentPage >= totalPages - 1 || turningState !== null}
              className="px-4 py-1.5 rounded-xl bg-pink-600 hover:bg-pink-700 disabled:opacity-30 disabled:pointer-events-none text-white font-semibold flex items-center gap-1 transition-all shadow-xs"
            >
              <span>Turn Page</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Dots / Page Jumpers */}
          <div className="flex items-center gap-1.5">
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                onClick={() => goToPage(i)}
                disabled={turningState !== null}
                className={`h-2 rounded-full transition-all ${
                  i === currentPage
                    ? 'w-6 bg-pink-400'
                    : 'w-2 bg-purple-700 hover:bg-purple-500'
                }`}
                title={`Jump to page ${i}`}
              />
            ))}
          </div>

          {/* Keyboard / Touch shortcut helper */}
          <div className="text-[11px] text-purple-400/80 font-mono hidden md:block">
            <span>[← / → / Space] Flip</span> · <span>[Esc] Close</span> · <span>Swipe on Touch</span>
          </div>
        </div>
      </div>
    </div>
  );
};
