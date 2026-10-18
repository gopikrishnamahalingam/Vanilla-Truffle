import React, { useState, useEffect } from 'react';
import { sounds } from '../utils/audio';
import { Sparkles, X } from 'lucide-react';

export const NeverForgetBiscuitEgg: React.FC = () => {
  const [bites, setBites] = useState(0);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const savedBites = localStorage.getItem('vanillaTruffle_biscuitBites');
    if (savedBites) {
      setBites(parseInt(savedBites, 10));
    }
  }, []);

  const handleBiscuitClick = () => {
    if (bites < 3) {
      const nextBites = bites + 1;
      setBites(nextBites);
      localStorage.setItem('vanillaTruffle_biscuitBites', String(nextBites));
      sounds.playBite();
    } else {
      // 4th bite: biscuit fully eaten!
      const finalBites = 4;
      setBites(finalBites);
      localStorage.setItem('vanillaTruffle_biscuitBites', String(finalBites));
      sounds.playYummy();
      setShowModal(true);
    }
  };

  const handleResetBiscuit = () => {
    sounds.playSparkle();
    setBites(0);
    localStorage.setItem('vanillaTruffle_biscuitBites', '0');
    setShowModal(false);
  };

  return (
    <>
      {/* Tucked-away Secret Biscuit in the cookbook page corner */}
      <div
        className="fixed bottom-4 left-4 z-30 group"
        title="A secret little biscuit left on the kitchen counter..."
      >
        <button
          onClick={handleBiscuitClick}
          className="relative p-2 rounded-2xl bg-white/80 dark:bg-purple-950/80 border border-purple-200 dark:border-purple-800 shadow-md hover:scale-110 active:scale-95 transition-all focus:outline-none"
          aria-label="Secret kitchen biscuit"
        >
          {/* Visual stages of the bitten biscuit */}
          <div className="w-8 h-8 relative flex items-center justify-center">
            {bites === 0 && (
              <span className="text-2xl drop-shadow-sm select-none">🍪</span>
            )}
            {bites === 1 && (
              <div className="relative">
                <span className="text-2xl opacity-90 select-none">🍪</span>
                <span className="absolute -top-1 -right-1 text-xs">✨</span>
              </div>
            )}
            {bites === 2 && (
              <div className="relative scale-90">
                <span className="text-xl select-none">🥠</span>
              </div>
            )}
            {bites === 3 && (
              <div className="relative scale-75 opacity-75">
                <span className="text-sm select-none">🧁</span>
              </div>
            )}
            {bites >= 4 && (
              <div className="text-xs text-purple-400 font-mono">
                crumbs
              </div>
            )}
          </div>

          {/* Bite indicator tooltip */}
          <div className="absolute left-full ml-2 top-1/2 -translate-y-1/2 px-2 py-1 bg-purple-950 text-purple-200 text-[10px] font-medium rounded-md whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-sm">
            {bites === 0 && 'A warm stardust biscuit... (Click to take a bite!)'}
            {bites === 1 && 'Crunch! 1 bite taken...'}
            {bites === 2 && 'Delicious! 2 bites taken...'}
            {bites === 3 && 'Almost finished! Just one bite left...'}
            {bites >= 4 && 'All eaten! (Click to bake a fresh one)'}
          </div>
        </button>
      </div>

      {/* Easter Egg Reveal Modal */}
      {showModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-purple-950/80 backdrop-blur-sm"
          onClick={() => setShowModal(false)}
        >
          <div
            className="relative w-full max-w-md rounded-3xl bg-[#FFFAFF] dark:bg-[#201135] border-2 border-purple-300 dark:border-purple-700 shadow-2xl p-6 sm:p-8 text-center text-purple-950 dark:text-purple-100 animate-float"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 p-2 rounded-full bg-purple-100 dark:bg-purple-900/60 text-purple-700 dark:text-purple-300 hover:bg-purple-200"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>

            <span className="text-5xl block mb-3">🌀 🍪 ✨</span>

            <p className="text-xs font-bold uppercase tracking-widest text-purple-600 dark:text-purple-400">
              Never Forget Biscuits · Secret Effect Triggered
            </p>

            {/* The exact requested quotation */}
            <blockquote className="my-5 p-4 rounded-2xl bg-purple-100/70 dark:bg-purple-950/60 border border-purple-200 dark:border-purple-800 text-sm sm:text-base font-serif-story italic leading-relaxed text-purple-950 dark:text-purple-100">
              “The cake was yummy and I couldn't move my tummy but wait? what i'm doing here?”
            </blockquote>

            <p className="text-xs text-purple-800/80 dark:text-purple-300 leading-relaxed">
              You ate every crumb of Vanilla Truffle’s Never Forget Biscuit! The memory stardust took effect, sending you into a delightful daze of kitchen contentment.
            </p>

            <div className="mt-6 flex items-center justify-center gap-3">
              <button
                onClick={handleResetBiscuit}
                className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-semibold text-xs transition-colors shadow-sm"
              >
                Bake Another Biscuit 🍪
              </button>

              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 rounded-xl bg-purple-100 dark:bg-purple-900/60 text-purple-900 dark:text-purple-200 hover:bg-purple-200 font-semibold text-xs transition-colors"
              >
                Close & Keep Exploring
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
