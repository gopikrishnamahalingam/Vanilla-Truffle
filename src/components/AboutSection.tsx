import React, { useState } from 'react';
import { BookOpen, Sparkles, Flame, Compass, Brain, Smile, AlertCircle, ChefHat } from 'lucide-react';
import { sounds } from '../utils/audio';


export const AboutSection: React.FC = () => {
  const [selectedPillar, setSelectedPillar] = useState<'smart' | 'playful' | 'mischievous' | 'curious'>('smart');

  const dragonFacts = [
    "Vanilla Truffle is a baby dragon with a passion for cooking and a flair for mischief.",
    "He was born from a magical mishap in Chef Odin's kitchen, which infused him with culinary magic.",
    "Vanilla has a unique ability to breathe gentle flames that can cook food without burning it.",
    "He loves experimenting with flavors and often creates unexpected culinary delights.",
    "Despite his small size, Vanilla has a big personality and a love for adventure in the kitchen."
  ]

  const [factIndex, setFactIndex] = useState(0);

  const handleNextFact = () => {
    sounds.playBubble();
    setFactIndex((prevIndex) => (prevIndex + 1) % dragonFacts.length);
  };

  const personalityPillars = {
    smart: {
      title: 'Smart & Inventive',
      icon: <Brain className="w-5 h-5 text-indigo-500" />,
      detail: 'Designs complex flavor alchemies on parchment napkins. Can calculate the exact boiling point of enchanted sugar in his head!'
    },
    playful: {
      title: 'Passionate & Playful',
      icon: <Smile className="w-5 h-5 text-pink-500" />,
      detail: 'Treats mixing bowls like mini trampolines and loves balancing strawberries on his nose during rising time.'
    },
    mischievous: {
      title: 'Lovably Mischievous',
      icon: <AlertCircle className="w-5 h-5 text-purple-500" />,
      detail: 'Regularly slips a pinch of shimmering dragon dust into Odin’s secret pantry jars while nobody is watching.'
    },
    curious: {
      title: 'Endlessly Curious',
      icon: <Compass className="w-5 h-5 text-amber-500" />,
      detail: 'Inspects every unfamiliar herb, spice drawer, and whistling kettle with wide, fascinated blue eyes.'
    }
  };

  return (
    <div className="space-y-20 py-12">
      
      {/* SECTION 1: ABOUT & FIVE-POINT CHARACTER SHEET */}
      <section id="about" className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-20">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-100 dark:bg-purple-950/70 border border-purple-200 dark:border-purple-800 text-xs font-bold uppercase tracking-widest text-purple-700 dark:text-purple-300 mb-2">
            <p className="text-xs font-bold uppercase tracking-widest text-purple-600 dark:text-purple-400">
              Chapter 01 · Origin & Identity
            </p>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-purple-950 dark:text-white mt-1">
            Meet the Chef Behind the Magic
          </h2>
          <p className="text-sm sm:text-base text-purple-800/80 dark:text-purple-200/80 mt-2">
            Born from an unexpected baking accident in Chef Odin’s 19th-century kitchen, Vanilla Truffle isn't your average dragon.
          </p>
        </div>

        {/* Vintage Recipe-Book 5-Point Character Sheet Card */}
        <div className="relative rounded-3xl bg-white/90 dark:bg-purple-900/40 border border-purple-200 dark:border-purple-800 shadow-xl overflow-hidden p-6 sm:p-8 lg:p-10 backdrop-blur-md">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center">
            
            {/* Left: Character Portrait Badge */}
            <div className="w-full lg:w-5/12 flex flex-col items-center">
              <div className="relative w-56 h-56 sm:w-64 sm:h-64 rounded-2xl overflow-hidden border-2 border-purple-300 dark:border-purple-700 shadow-lg bg-purple-50 dark:bg-purple-950">
                <img
                  src="/assets/images/vanilla_chef_main_1792330588106.jpg"
                  alt="Vanilla Truffle sitting by his teacup"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="mt-4 text-center">
                <span className="font-handwriting text-2xl text-purple-700 dark:text-purple-300">
                  Vanilla Truffle
                </span>
                <p className="text-xs text-purple-600/80 dark:text-purple-400">
                  Official Apprentice No. 01 · Certified Sweet Tooth
                </p>
              </div>
            </div>

            {/* Right: The 5-Point Character Sheet */}
            <div className="w-full lg:w-7/12 space-y-4">
              {/* <div className="flex items-center gap-2 pb-2 border-b border-purple-100 dark:border-purple-800">
                <BookOpen className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                <h3 className="text-lg font-bold text-purple-950 dark:text-white font-display">
                  Official 5-Point Character Sheet
                </h3>
              </div> */}

              <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                <div className="p-3 rounded-xl bg-purple-50/80 dark:bg-purple-950/40 border border-purple-100 dark:border-purple-800/60">
                  <dt className="text-xs font-semibold text-purple-600 dark:text-purple-400 uppercase">1. Species & Age</dt>
                  <dd className="font-medium text-purple-950 dark:text-purple-100 mt-0.5">
                    Baby Dragon · 2 Years Old
                  </dd>
                </div>

                <div className="p-3 rounded-xl bg-purple-50/80 dark:bg-purple-950/40 border border-purple-100 dark:border-purple-800/60">
                  <dt className="text-xs font-semibold text-purple-600 dark:text-purple-400 uppercase">2. Profession</dt>
                  <dd className="font-medium text-purple-950 dark:text-purple-100 mt-0.5">
                    Junior Chef & Master Chef in Progress
                  </dd>
                </div>

                <div className="sm:col-span-2 p-3 rounded-xl bg-purple-50/80 dark:bg-purple-950/40 border border-purple-100 dark:border-purple-800/60">
                  <dt className="text-xs font-semibold text-purple-600 dark:text-purple-400 uppercase">3. Appearance</dt>
                  <dd className="text-xs sm:text-sm text-purple-900 dark:text-purple-200 mt-0.5 leading-relaxed">
                    Tiny, soft pastel-purple scales with an oversized head, glossy blue eyes, small horns, a signature pink-and-lavender hair tuft, delicate wings, rounded belly, curling tail, and a puffy white chef hat tilted with swagger.
                  </dd>
                </div>

                <div className="sm:col-span-2 p-3 rounded-xl bg-purple-50/80 dark:bg-purple-950/40 border border-purple-100 dark:border-purple-800/60">
                  <dt className="text-xs font-semibold text-purple-600 dark:text-purple-400 uppercase">4. Core Quirk</dt>
                  <dd className="text-xs sm:text-sm text-purple-900 dark:text-purple-200 mt-0.5 leading-relaxed">
                    Unshakably convinced he is the greatest culinary artist in the world, even when his soufflés hover three feet in the air or turn into musical puffs.
                  </dd>
                </div>

                <div className="sm:col-span-2 p-3 rounded-xl bg-purple-50/80 dark:bg-purple-950/40 border border-purple-100 dark:border-purple-800/60">
                  <dt className="text-xs font-semibold text-purple-600 dark:text-purple-400 uppercase">5. Tagline & Motive</dt>
                  <dd className="text-xs sm:text-sm text-purple-900 dark:text-purple-200 mt-0.5 font-serif-story italic">
                    “Made with vanilla, mischief, and a pinch of dragon dust.” To turn every boring breakfast into an unforgettable adventure.
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </div>

        <div className="mt-6 rounded-2xl border border-purple-200 bg-white/80 p-5 text-center dark:border-purple-800 dark:bg-purple-900/40">
          <h3 className="font-bold text-purple-950 dark:text-white">
            A Little Dragon Fact
          </h3>
          <p
            aria-live="polite"
            className="mt-2 text-sm text-purple-800 dark:text-purple-200"
          >
            {dragonFacts[factIndex]}
          </p>
          <button
            type="button"
            onClick={handleNextFact}
            className="mt-4 rounded-lg bg-purple-700 px-4 py-2 text-sm font-semibold text-white hover:bg-purple-800"
          >
            Next fact
          </button>
        </div>
      </section>

      {/* SECTION 2: PERSONALITY */}
      <section id="personality" className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-20">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-100 dark:bg-purple-950/70 border border-purple-200 dark:border-purple-800 text-xs font-bold uppercase tracking-widest text-purple-700 dark:text-purple-300 mb-2">
            <p className="text-xs font-bold uppercase tracking-widest text-purple-600 dark:text-purple-400">
              Chapter 02 · Temperament
            </p>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-purple-950 dark:text-white mt-1">
            Vanilla’s 4 Quirky Personalities
          </h2>
          {/* <p className="text-sm sm:text-base text-purple-800/80 dark:text-purple-200/80 mt-2">
            Click each personality pillar to discover how it impacts life in the kitchen.
          </p> */}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {(Object.keys(personalityPillars) as Array<keyof typeof personalityPillars>).map((key) => {
            const pillar = personalityPillars[key];
            const isSelected = selectedPillar === key;
            return (
              <div
                key={key}
                onClick={() => {
                  sounds.playBubble();
                  setSelectedPillar(key);
                }}
                className={`p-5 rounded-2xl cursor-pointer transition-all border ${
                  isSelected
                    ? 'bg-white dark:bg-purple-900/70 border-purple-500 shadow-md scale-102 ring-2 ring-purple-400/20'
                    : 'bg-white/60 dark:bg-purple-950/40 border-purple-200 dark:border-purple-800/60 hover:bg-white dark:hover:bg-purple-900/50'
                }`}
              >
                <div className="w-10 h-10 rounded-xl bg-purple-100 dark:bg-purple-900/60 flex items-center justify-center mb-3">
                  {pillar.icon}
                </div>
                <h4 className="font-bold text-base text-purple-950 dark:text-purple-100 font-display">
                  {pillar.title}
                </h4>
                <p className="text-xs text-purple-800/80 dark:text-purple-300 mt-2 leading-relaxed">
                  {pillar.detail}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* SECTION 3: PROFESSION & CULINARY SKILL PROGRESS */}
      <section id="profession" className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-20">
        <div className="rounded-3xl bg-gradient-to-br from-purple-100/80 to-pink-50/50 dark:from-purple-950/60 dark:to-purple-900/40 border border-purple-200 dark:border-purple-800/80 p-6 sm:p-10">
          <div className="max-w-2xl mb-8">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-purple-700 dark:text-purple-300 mb-2">
              <ChefHat className="w-4 h-4 text-purple-500" />
              <span>Culinary Apprenticeship Status</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-purple-950 dark:text-white font-display">
              Professional Junior Chef
            </h3>
            <p className="text-sm text-purple-800/80 dark:text-purple-300/80 mt-1">
              Currently studying under Chef Odin while conducting experimental dessert alchemy in his enchanted kitchen corner.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                title: 'Magical Recipe Inventing',
                score: 98,
                note: 'Constantly creates unexpected treats like sound-stealing buns.'
              },
              {
                title: 'Flavor Experimentation',
                score: 95,
                note: 'Fearless with sweet stardust and honey, slightly chaotic with spices.'
              },
              {
                title: 'Dragon-Flame Temperature Control',
                score: 82,
                note: 'Needs supervision around pepper—often creates dramatic fireworks!'
              },
              {
                title: 'Kitchen Organization & Cleanup',
                score: 42,
                note: 'Flour on the ceiling, spoons in the chandelier, but 100% happy.'
              }
            ].map((stat, i) => (
              <div key={i} className="p-4 rounded-xl bg-white/80 dark:bg-purple-900/50 border border-purple-200/80 dark:border-purple-800/60">
                <div className="flex justify-between items-center mb-1.5">
                  <span className="font-semibold text-xs sm:text-sm text-purple-950 dark:text-purple-100">
                    {stat.title}
                  </span>
                  <span className="font-mono text-xs font-bold text-purple-700 dark:text-purple-300">
                    {stat.score}%
                  </span>
                </div>
                <div className="w-full h-2 rounded-full bg-purple-200 dark:bg-purple-950 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-1000"
                    style={{ width: `${stat.score}%` }}
                  />
                </div>
                <p className="text-[11px] text-purple-700/70 dark:text-purple-300/70 mt-1.5 italic">
                  {stat.note}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};
