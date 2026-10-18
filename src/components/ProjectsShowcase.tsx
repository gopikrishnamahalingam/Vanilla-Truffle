import React, { useState } from 'react';
import { RECIPES_DATA } from '../data/recipes';
import { ProjectRecipe } from '../types';
import { Sparkles, X, Wand2, ChefHat, Info } from 'lucide-react';
import { sounds } from '../utils/audio';

export const ProjectsShowcase: React.FC = () => {
  const [selectedRecipe, setSelectedRecipe] = useState<ProjectRecipe | null>(null);
  const [tastedEffect, setTastedEffect] = useState<string | null>(null);

  const openRecipe = (recipe: ProjectRecipe) => {
    sounds.playSparkle();
    setSelectedRecipe(recipe);
    setTastedEffect(null);
  };

  const closeRecipe = () => {
    setSelectedRecipe(null);
    setTastedEffect(null);
  };

  const simulateTaste = (recipe: ProjectRecipe) => {
    sounds.playBite();
    if (recipe.id === 'bak-bak-bun') {
      setTastedEffect('🤐 *Mmmph!* You chewed a bite and your mouth snapped shut! You try to say "delicious" but only squeaks come out until the bun is finished!');
    } else if (recipe.id === 'never-forget-biscuits') {
      setTastedEffect('🌀 *Whoosh!* You gaze at the ceiling with sparkling eyes... "Wait... why am I standing in this kitchen again?"');
    } else if (recipe.id === 'crazy-cracking-cookies') {
      setTastedEffect('💥 *Crunch!* "Flapjack teacup bumblebee sparkle moon!" Your words came out in pure delightful gibberish!');
    } else if (recipe.id === 'active-marshmallow') {
      setTastedEffect('😴 *Yaaawn...* Your eyelids grow deliciously heavy as cozy purple dream clouds wrap around you. Zzzz...');
    }
  };

  return (
    <section id="projects" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 scroll-mt-20">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-12">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-100 dark:bg-purple-950/70 border border-purple-200 dark:border-purple-800 text-xs font-bold uppercase tracking-widest text-purple-700 dark:text-purple-300 mb-2">
        <p className="text-xs font-bold uppercase tracking-widest text-purple-600 dark:text-purple-400">
          Chapter 03 · Enchanted Creations
        </p>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-purple-950 dark:text-white mt-1">
          Four Magical Masterpieces
        </h2>
        <p className="text-sm sm:text-base text-purple-800/80 dark:text-purple-200/80 mt-2">
          Hand-crafted pastries with bizarre and hilarious magical side effects. Click any recipe card to read the lore and take a test bite!
        </p>
      </div>

      {/* 4 Recipe Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {RECIPES_DATA.map((recipe) => (
          <div
            key={recipe.id}
            onClick={() => openRecipe(recipe)}
            className="group relative rounded-3xl bg-white/90 dark:bg-purple-900/40 border border-purple-200 dark:border-purple-800/80 overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5 cursor-pointer flex flex-col justify-between"
          >
            {/* Top Image Showcase */}
            <div className="relative w-full h-48 overflow-hidden bg-purple-100 dark:bg-purple-950">
              <img
                src={recipe.image}
                alt={recipe.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-108"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />
              
              {/* Badge */}
              <div className="absolute top-3 left-3 px-2.5 py-1 rounded-lg bg-white/90 dark:bg-purple-950/90 text-purple-950 dark:text-purple-200 text-[11px] font-semibold backdrop-blur-sm shadow-sm flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-purple-500" />
                <span>Magical Confection</span>
              </div>

              {/* Title overlay */}
              <div className="absolute bottom-3 left-3 right-3 text-white">
                <h3 className="font-display font-bold text-lg leading-snug">
                  {recipe.name}
                </h3>
                {recipe.englishMeaning && (
                  <p className="text-xs text-purple-200/90 italic font-serif-story">
                    "{recipe.englishMeaning}"
                  </p>
                )}
              </div>
            </div>

            {/* Content body */}
            <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
              <p className="text-xs text-purple-800/90 dark:text-purple-200/90 line-clamp-3 leading-relaxed">
                {recipe.description}
              </p>

              <div className="pt-3 border-t border-purple-100 dark:border-purple-800 flex items-center justify-between text-xs font-semibold text-purple-700 dark:text-purple-300 group-hover:text-purple-900 dark:group-hover:text-purple-100">
                <span>Inspect Recipe &rarr;</span>
                <span className="text-base" role="img" aria-label="sparkle">✨</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recipe Detail Modal */}
      {selectedRecipe && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-purple-950/70 backdrop-blur-sm transition-opacity"
          onClick={closeRecipe}
        >
          <div
            className="relative w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-3xl bg-[#FFFAFF] dark:bg-[#201135] border border-purple-200 dark:border-purple-800 p-6 sm:p-8 shadow-2xl text-purple-950 dark:text-purple-100 animate-float-delayed"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={closeRecipe}
              className="absolute top-4 right-4 p-2 rounded-full bg-purple-100 dark:bg-purple-900/60 text-purple-700 dark:text-purple-300 hover:bg-purple-200 dark:hover:bg-purple-800 transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>


            {/* Modal Header */}
            <div className="flex items-start gap-4 mb-4">
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden shrink-0 border border-purple-200 dark:border-purple-700 shadow-md">
                <img
                  src={selectedRecipe.image}
                  alt={selectedRecipe.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>

              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-purple-600 dark:text-purple-400">
                  {selectedRecipe.tagline}
                </span>
                <h3 className="text-2xl font-bold font-display text-purple-950 dark:text-white">
                  {selectedRecipe.name}
                </h3>
                {selectedRecipe.englishMeaning && (
                  <p className="text-xs sm:text-sm text-purple-700/80 dark:text-purple-300 font-serif-story italic">
                    Known as: {selectedRecipe.englishMeaning}
                  </p>
                )}
              </div>
            </div>

            {/* Body */}
            <div className="space-y-4 text-sm">
              <div className="p-4 rounded-2xl bg-purple-100/70 dark:bg-purple-950/60 border border-purple-200 dark:border-purple-800/60">
                <h4 className="text-xs font-bold uppercase tracking-wider text-purple-700 dark:text-purple-300 flex items-center gap-1.5 mb-1">
                  <Wand2 className="w-4 h-4 text-purple-500" />
                  <span>Magical Effect</span>
                </h4>
                <p className="text-xs sm:text-sm text-purple-900 dark:text-purple-200 leading-relaxed">
                  {selectedRecipe.magicalEffect}
                </p>
              </div>

              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400 mb-1 flex items-center gap-1.5">
                  <ChefHat className="w-4 h-4 text-purple-500" />
                  <span>The Origin Incident</span>
                </h4>
                <p className="text-xs sm:text-sm text-purple-900/90 dark:text-purple-200/90 leading-relaxed font-serif-story">
                  {selectedRecipe.storySnippet}
                </p>
              </div>

              <div className="p-3 rounded-xl bg-pink-50/70 dark:bg-purple-900/30 border border-pink-200 dark:border-purple-800 text-xs text-pink-900 dark:text-pink-200 flex items-start gap-2">
                <Info className="w-4 h-4 shrink-0 text-pink-500 mt-0.5" />
                <span>
                  <strong>Kitchen Note:</strong> {selectedRecipe.funFact}
                </span>
              </div>

              {/* Interactive Taste Simulator */}
              <div className="pt-2">
                <button
                  onClick={() => simulateTaste(selectedRecipe)}
                  className="w-full py-3 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-semibold text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2"
                >
                  <span>Take a Test Bite 🍴</span>
                </button>

                {tastedEffect && (
                  <div className="mt-3 p-3 rounded-xl bg-purple-200/60 dark:bg-purple-900/60 border border-purple-300 dark:border-purple-700 text-xs text-purple-950 dark:text-purple-100 font-medium animate-bounce">
                    {tastedEffect}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

    </section>
  );
};
