import React, { useState } from 'react';
import { ORIGIN_STORY_CARDS } from '../data/story';
import { BonusStoryModal } from './BonusStoryModal';
import { Sparkles, Lamp, BookOpen } from 'lucide-react';
import { sounds } from '../utils/audio';

export const OriginStorySection: React.FC = () => {
  const [showBonus, setShowBonus] = useState(false);

  const handleOpenBonus = () => {
    sounds.playSparkle();
    setShowBonus(true);
  };

  return (
    <section id="origin-story" className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 scroll-mt-20">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-14">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-100 dark:bg-purple-950/70 border border-purple-200 dark:border-purple-800 text-xs font-bold uppercase tracking-widest text-purple-700 dark:text-purple-300 mb-2">
          <BookOpen className="w-3.5 h-3.5" />
          <span>Chapter 04 · Chronological Chronicle</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-purple-950 dark:text-white mt-1">
          Origin Story: The Sweetest Accident
        </h2>
        <p className="text-sm sm:text-base text-purple-800/80 dark:text-purple-200/80 mt-2">
          Read down through Chef Odin’s 19th-century vintage kitchen chronicles and discover how Vanilla Truffle was born from an enchanted explosion.
        </p>
      </div>

      {/* Vertical Story Cards Stack */}
      <div className="space-y-12 relative before:absolute before:inset-0 before:left-1/2 before:-translate-x-1/2 before:w-0.5 before:bg-gradient-to-b before:from-purple-300 before:via-pink-300 before:to-purple-300 dark:before:from-purple-800 dark:before:via-pink-900 dark:before:to-purple-800 before:hidden md:before:block">
        {ORIGIN_STORY_CARDS.map((card, index) => {
          const isEven = index % 2 === 0;

          return (
            <div
              key={card.id}
              className={`relative flex flex-col md:flex-row items-center gap-8 ${
                isEven ? 'md:flex-row-reverse' : ''
              }`}
            >
              {/* Timeline Center Badge (Desktop) */}
              <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-white dark:bg-purple-900 border-2 border-purple-400 dark:border-purple-600 shadow-md items-center justify-center text-xs font-bold font-mono text-purple-800 dark:text-purple-200 z-10">
                0{card.id}
              </div>

              {/* Story Visual Side (50% on desktop) */}
              <div className="w-full md:w-1/2">
                {card.image && (
                  <div className="relative rounded-3xl overflow-hidden border-2 border-purple-200/80 dark:border-purple-700/80 shadow-xl bg-purple-100 dark:bg-purple-950 group">
                    <img
                      src={card.image}
                      alt={card.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-64 sm:h-72 object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-white/90 dark:bg-purple-950/90 text-purple-900 dark:text-purple-200 text-xs font-semibold backdrop-blur-sm shadow-sm">
                      {card.chapter}
                    </div>
                  </div>
                )}
              </div>

              {/* Story Narrative Text Card (50% on desktop) */}
              <div className="w-full md:w-1/2">
                <div
                  className={`p-6 sm:p-8 rounded-3xl border shadow-lg backdrop-blur-md ${
                    card.isInteractiveBonus
                      ? 'bg-gradient-to-br from-pink-50/95 to-purple-100/95 dark:from-purple-950/90 dark:to-pink-950/60 border-pink-300 dark:border-pink-800 ring-2 ring-pink-400/20'
                      : 'bg-white/90 dark:bg-purple-900/40 border-purple-200 dark:border-purple-800/80'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400">
                      {card.chapter} · Chronicle 0{card.id}
                    </span>
                    <span className="text-xs font-mono text-purple-400">1880s</span>
                  </div>

                  <h3 className="font-display font-bold text-2xl text-purple-950 dark:text-white mb-3">
                    {card.title}
                  </h3>

                  <p className="text-sm sm:text-base text-purple-900/90 dark:text-purple-200/90 font-serif-story leading-relaxed">
                    {card.text}
                  </p>

                  {/* Special Bonus Unlock on Card 7 (The Broken Lamp) */}
                  {card.isInteractiveBonus && (
                    <div className="mt-6 pt-4 border-t border-pink-200 dark:border-pink-900/50">
                      <button
                        onClick={handleOpenBonus}
                        className="w-full py-3 px-5 rounded-2xl bg-pink-500 hover:bg-pink-600 text-white font-semibold text-sm shadow-md transition-all hover:scale-102 flex items-center justify-center gap-2 group"
                      >
                        <Lamp className="w-4 h-4 group-hover:rotate-12 transition-transform" />
                        <span>Inspect Broken Lamp (Bonus Story)</span>
                        <Sparkles className="w-4 h-4" />
                      </button>
                      <p className="text-xs text-pink-700 dark:text-pink-300 text-center mt-2 font-medium">
                        Click to view: “Vanilla and the Butterfly”
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bonus Story Modal */}
      {showBonus && <BonusStoryModal onClose={() => setShowBonus(false)} />}
    </section>
  );
};
