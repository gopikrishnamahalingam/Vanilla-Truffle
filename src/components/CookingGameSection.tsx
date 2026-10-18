import React, { useState, useEffect } from 'react';
import { Ingredient, CookingResult } from '../types';
import { Sparkles, RotateCcw, Flame, Check, Utensils, Music, Volume2, VolumeX, Disc, Play, Pause } from 'lucide-react';
import { sounds } from '../utils/audio';

const AVAILABLE_INGREDIENTS: Ingredient[] = [
  { id: 'strawberry', name: 'Strawberry', icon: '🍓', category: 'sweet' },
  { id: 'cream', name: 'Sweet Cream', icon: '🥛', category: 'dairy' },
  { id: 'chocolate', name: 'Chocolate', icon: '🍫', category: 'sweet' },
  { id: 'chocochips', name: 'Chocolate Chips', icon: '🍪', category: 'sweet' },
  { id: 'vanilla', name: 'Stardust Vanilla', icon: '🌸', category: 'sweet' },
  { id: 'sugar', name: 'Powdered Sugar', icon: '🍬', category: 'sweet' },
  { id: 'marshmallow', name: 'Puffy Marshmallow', icon: '🍡', category: 'sweet' },
  { id: 'pepper', name: 'Spicy Pepper', icon: '🌶️', category: 'spice' },
];

interface CookingGameSectionProps {
  marshmallowFound: boolean;
  onDiscoverMarshmallow: () => void;
}

export const CookingGameSection: React.FC<CookingGameSectionProps> = ({
  marshmallowFound,
  onDiscoverMarshmallow,
}) => {
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);
  const [isCooking, setIsCooking] = useState(false);
  const [cookingResult, setCookingResult] = useState<CookingResult | null>(null);
  const [isFridgeOpen, setIsFridgeOpen] = useState(false);
  const [fridgeBanner, setFridgeBanner] = useState<string | null>(null);
  const [isFlameDisaster, setIsFlameDisaster] = useState(false);

  // Kitchen Lab Audio State
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [isAudioMuted, setIsAudioMuted] = useState(false);

  useEffect(() => {
    const state = sounds.getKitchenLabState();
    setIsAudioPlaying(state.isPlaying);
    setIsAudioMuted(state.isMuted);

    const unsubscribe = sounds.subscribeKitchenLab((playing, muted) => {
      setIsAudioPlaying(playing);
      setIsAudioMuted(muted);
    });

    return () => unsubscribe();
  }, []);

  const handleToggleLabAudio = () => {
    sounds.toggleKitchenLabAudio();
  };

  const handleToggleLabMute = () => {
    const nextMuted = sounds.toggleKitchenLabMute();
    setIsAudioMuted(nextMuted);
  };

  const toggleIngredient = (id: string) => {
    sounds.playBubble();
    if (selectedIngredients.includes(id)) {
      setSelectedIngredients((prev) => prev.filter((i) => i !== id));
    } else {
      if (selectedIngredients.length >= 4) {
        return; // Max 4 ingredients in bowl
      }
      setSelectedIngredients((prev) => [...prev, id]);
    }
  };

  const handleCook = () => {
    if (selectedIngredients.length === 0) return;
    setIsCooking(true);
    sounds.playBubble();

    // Auto-prompt lovely music box if not already playing
    if (!isAudioPlaying) {
      sounds.startKitchenLabAudio();
    }

    setTimeout(() => {
      evaluateRecipe();
      setIsCooking(false);
    }, 1200);
  };

  const evaluateRecipe = () => {
    const hasPepper = selectedIngredients.includes('pepper');
    const hasStrawberry = selectedIngredients.includes('strawberry');
    const hasCream = selectedIngredients.includes('cream');
    const hasVanilla = selectedIngredients.includes('vanilla');
    const hasChocochips = selectedIngredients.includes('chocochips');
    const hasChocolate = selectedIngredients.includes('chocolate');
    const hasMarshmallow = selectedIngredients.includes('marshmallow');
    const hasSugar = selectedIngredients.includes('sugar');

    // Dragon flame disaster if pepper is added
    if (hasPepper) {
      sounds.playFire();
      setIsFlameDisaster(true);
      setCookingResult({
        recipeName: 'Dragon-Flame Disaster',
        outcomeType: 'disaster',
        title: 'IT WAS HORRIBLE!! 🔥',
        description: 'Who put THAT much spicy pepper into my sweet vanilla cauldron?!',
        dragonReaction: 'Scorched wooden spoon and coughing purple smoke clouds!',
        dragonDialogue: '“Cough, wheeze! My tongue feels like a blazing campfire! Who authorized this pepper?!”',
      });
      setTimeout(() => {
        setIsFlameDisaster(false);
      }, 4000);
      return;
    }

    // Specific Recipe Outcomes
    if (hasStrawberry && hasCream && hasVanilla) {
      sounds.playCookingSuccess();
      setCookingResult({
        recipeName: 'Vanilla Strawberry Dream Cake',
        outcomeType: 'success',
        title: 'Dream Cake Perfection!',
        description: 'Sweet, fluffy, and infused with celestial dragon dust!',
        dragonReaction: 'Vanilla does a joyful little flutter with his wooden spoon!',
        dragonDialogue: '“Eeeee! The stardust vanilla elevates the sweet cream to celestial heights! 10/10!”',
      });
    } else if (hasStrawberry && hasCream) {
      sounds.playCookingSuccess();
      setCookingResult({
        recipeName: 'Strawberry Cream Cake',
        outcomeType: 'success',
        title: 'Fluffy Strawberry Delight!',
        description: 'A classic Odin specialty, topped with whipped mountain cream.',
        dragonReaction: 'Vanilla proudly balances the spoon on his nose.',
        dragonDialogue: '“A vintage classic! Chef Odin would definitely give this two thumbs up.”',
      });
    } else if (hasChocolate && hasChocochips) {
      sounds.playCookingSuccess();
      setCookingResult({
        recipeName: 'Triple Chocolate Volcano Truffle',
        outcomeType: 'success',
        title: 'Decadent Chocolate Bomb!',
        description: 'Rich, glossy chocolate with crackling sugar crystals.',
        dragonReaction: 'Vanilla licks chocolate icing straight off his claws!',
        dragonDialogue: '“Chocolate on chocolate! That is true culinary mastery right there!”',
      });
    } else if (hasMarshmallow && hasSugar) {
      sounds.playCookingSuccess();
      setCookingResult({
        recipeName: 'Sleepy Cloud Marshmallow Fondant',
        outcomeType: 'success',
        title: 'Softest Fluff on Earth!',
        description: 'So tender and sweet, everyone in the kitchen begins to yawn.',
        dragonReaction: 'Vanilla leans on his wooden spoon, rubbing sleepy eyes.',
        dragonDialogue: '“*Yawn*... One nibble and I am ready for my dragon nap...”',
      });
    } else {
      sounds.playCookingSuccess();
      setCookingResult({
        recipeName: 'Vanilla’s Mystery Confection',
        outcomeType: 'success',
        title: 'A Wild Culinary Experiment!',
        description: 'An unpredictable magical recipe with shimmering pastel sprinkles.',
        dragonReaction: 'Vanilla taps the cauldron three times with his spoon in wonder.',
        dragonDialogue: '“I have no idea what this is, but it sparkles like starlight! Let us eat it!”',
      });
    }
  };

  const handleReset = () => {
    setSelectedIngredients([]);
    setCookingResult(null);
    sounds.playBubble();
  };

  const handleFridgeClick = () => {
    sounds.playBubble();
    const nextState = !isFridgeOpen;
    setIsFridgeOpen(nextState);

    if (nextState) {
      sounds.playFridgeUnlock();
      if (!marshmallowFound) {
        onDiscoverMarshmallow();
        setFridgeBanner('You got it!! Yippeee!');
      } else {
        setFridgeBanner('Already in your collection!');
      }
    }
  };

  return (
    <section id="mini-game" className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 scroll-mt-20">
      
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-10">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-100 dark:bg-purple-950/70 border border-purple-200 dark:border-purple-800 text-xs font-bold uppercase tracking-widest text-purple-700 dark:text-purple-300 mb-2">
          <Utensils className="w-3.5 h-3.5" />
          <span>Interactive Mini-Game</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-purple-950 dark:text-white mt-1">
          ✨ Vanilla Truffle’s Magical Kitchen Lab ✨
        </h2>
        <p className="text-sm sm:text-base text-purple-800/80 dark:text-purple-200/80 mt-2">
          Add sweet ingredients into the cauldron, listen to the Kitchen Lab music box, and discover whether you brew perfection or a dragon-flame disaster!
        </p>
      </div>

      {/* --- KITCHEN LAB REAL AUDIO CONTROL BAR --- */}
      <div className="mb-8 p-4 rounded-2xl bg-gradient-to-r from-purple-100 via-pink-50 to-purple-100 dark:from-purple-950/80 dark:via-purple-900/40 dark:to-purple-950/80 border-2 border-purple-300 dark:border-purple-700/80 shadow-md flex flex-wrap items-center justify-between gap-4">
        
        {/* Left: Music Box Identity & Track Info */}
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 border-purple-400 dark:border-purple-600 bg-white dark:bg-purple-900 shadow-inner ${isAudioPlaying && !isAudioMuted ? 'animate-spin' : ''}`} style={{ animationDuration: '6s' }}>
            <Disc className="w-5 h-5 text-pink-600 dark:text-pink-400" />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-purple-700 dark:text-purple-300 flex items-center gap-1">
                <Music className="w-3.5 h-3.5 text-pink-500" />
                <span>Kitchen Lab Real Audio</span>
              </span>
              {/* <span className="text-[10px] px-2 py-0.5 rounded-full bg-purple-200 dark:bg-purple-800 font-mono text-purple-800 dark:text-purple-200">
                Kitchen_Lab_Sound.mp3
              </span> */}
            </div>
            <p className="text-xs text-purple-900/80 dark:text-purple-300/80 font-serif-story italic">
              {isAudioPlaying
                ? isAudioMuted
                  ? 'Melody paused by mute switch (sound muted)'
                  : 'Playing sweet fairytale music-box waltz & synth...'
                : 'Music Box is sleeping. Click Play to start ambient lab audio!'}
            </p>
          </div>
        </div>

        {/* Right: Audio Play/Stop & Dedicated Mute Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Play / Pause Toggle Button */}
          <button
            onClick={handleToggleLabAudio}
            className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 shadow-sm transition-all ${
              isAudioPlaying
                ? 'bg-purple-700 text-white hover:bg-purple-800 ring-2 ring-purple-400/40'
                : 'bg-pink-600 hover:bg-pink-700 text-white hover:scale-102'
            }`}
          >
            {isAudioPlaying ? (
              <>
                <Pause className="w-3.5 h-3.5" />
                <span>Stop Music Box</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Play Kitchen Melody</span>
              </>
            )}
          </button>

          {/* Dedicated Mute / Unmute Switch */}
          <button
            onClick={handleToggleLabMute}
            title={isAudioMuted ? 'Unmute Kitchen Lab Audio' : 'Mute Kitchen Lab Audio'}
            className={`p-2 rounded-xl border text-xs font-semibold flex items-center gap-1.5 transition-colors ${
              isAudioMuted
                ? 'bg-red-100 dark:bg-red-950/60 text-red-700 dark:text-red-300 border-red-300 dark:border-red-800'
                : 'bg-white dark:bg-purple-900/70 text-purple-800 dark:text-purple-200 border-purple-300 dark:border-purple-700 hover:bg-purple-50'
            }`}
          >
            {isAudioMuted ? (
              <>
                <VolumeX className="w-4 h-4 text-red-600" />
                <span className="hidden sm:inline">Muted</span>
              </>
            ) : (
              <>
                <Volume2 className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                <span className="hidden sm:inline">Mute</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Main Kitchen Playground Grid */}
      <div className="rounded-3xl bg-white/80 dark:bg-purple-900/30 border-2 border-purple-200 dark:border-purple-800/80 p-6 sm:p-8 backdrop-blur-md shadow-xl relative overflow-hidden">
        
        {/* Flame Disaster Overlay */}
        {isFlameDisaster && (
          <div className="absolute inset-0 z-20 bg-red-950/40 backdrop-blur-sm flex flex-col items-center justify-center p-6 text-center animate-fade-in pointer-events-none">
            <span className="text-6xl animate-bounce">🔥🙊🔥</span>
            <h3 className="text-2xl sm:text-3xl font-black text-amber-200 tracking-wide mt-2">
              DRAGON-FLAME DISASTER!
            </h3>
            <p className="text-white text-sm max-w-md font-serif-story mt-1">
              The spicy pepper sparked Vanilla’s dragon breath! Purple smoke fills the kitchen!
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Column 1: Cauldron & Bowl (7 cols) */}
          <div className="lg:col-span-7 flex flex-col items-center text-center space-y-6">
            
            {/* The Cauldron / Mixing Bowl Container */}
            <div className="relative w-64 h-64 sm:w-72 sm:h-72 rounded-full border-4 border-purple-400 dark:border-purple-600 bg-gradient-to-b from-purple-200 via-pink-100 to-purple-300 dark:from-purple-950 dark:via-purple-900 dark:to-purple-950 flex flex-col items-center justify-center p-4 shadow-inner group">
              
              {/* Wooden Spoon Animation */}
              <div
                className={`text-4xl absolute -top-4 -right-2 transform transition-transform duration-300 ${
                  isCooking ? 'animate-bounce rotate-45' : 'group-hover:rotate-12'
                }`}
                title="Vanilla's trusty wooden spoon"
              >
                🥄
              </div>

              {/* Steam / Bubbles Indicator */}
              {isCooking && (
                <div className="absolute top-4 flex gap-2">
                  <span className="animate-ping text-purple-500">✨</span>
                  <span className="animate-pulse text-pink-500">🫧</span>
                  <span className="animate-ping text-purple-400">✨</span>
                </div>
              )}

              {/* Inside the Cauldron */}
              <div className="flex flex-col items-center">
                <span className="text-xs uppercase tracking-widest font-mono text-purple-700 dark:text-purple-300 mb-1">
                  Enchanted Mixing Bowl
                </span>

                {selectedIngredients.length === 0 ? (
                  <p className="text-xs sm:text-sm text-purple-900/60 dark:text-purple-300/60 font-serif-story px-4">
                    The bowl is empty!<br />Tap up to 4 ingredients from the pantry shelf to begin.
                  </p>
                ) : (
                  <div className="flex flex-wrap justify-center gap-1.5 max-w-[200px] my-2">
                    {selectedIngredients.map((ingId) => {
                      const ing = AVAILABLE_INGREDIENTS.find((i) => i.id === ingId);
                      return (
                        <button
                          key={ingId}
                          onClick={() => toggleIngredient(ingId)}
                          className="px-2.5 py-1 rounded-full bg-white dark:bg-purple-800 text-purple-950 dark:text-purple-100 text-xs font-semibold shadow-sm flex items-center gap-1 hover:bg-red-50 hover:text-red-600 transition-colors"
                          title="Click to remove from bowl"
                        >
                          <span>{ing?.icon}</span>
                          <span>{ing?.name}</span>
                          <span className="text-red-500 font-bold ml-0.5">×</span>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>

            {/* Action Buttons: Cook / Reset */}
            <div className="flex items-center gap-3">
              <button
                onClick={handleCook}
                disabled={selectedIngredients.length === 0 || isCooking}
                className="px-6 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-semibold text-sm shadow-md disabled:opacity-40 disabled:pointer-events-none transition-all flex items-center gap-2"
              >
                <Sparkles className="w-4 h-4" />
                <span>{isCooking ? 'Mixing & Simmering...' : 'Cook Recipe'}</span>
              </button>

              <button
                onClick={handleReset}
                disabled={selectedIngredients.length === 0 && !cookingResult}
                className="px-4 py-2.5 rounded-xl bg-purple-100 dark:bg-purple-900/60 hover:bg-purple-200 text-purple-800 dark:text-purple-200 font-medium text-sm transition-colors flex items-center gap-1.5"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Reset Bowl</span>
              </button>
            </div>

            {/* Cooking Result Box */}
            {cookingResult && (
              <div
                className={`w-full p-5 rounded-2xl border text-left animate-float ${
                  cookingResult.outcomeType === 'disaster'
                    ? 'bg-red-50 dark:bg-red-950/50 border-red-300 text-red-950 dark:text-red-100'
                    : 'bg-purple-100/70 dark:bg-purple-950/60 border-purple-300 dark:border-purple-700 text-purple-950 dark:text-purple-100'
                }`}
              >
                <div className="flex items-center justify-between">
                  <h4 className="font-display font-bold text-lg">
                    {cookingResult.title}
                  </h4>
                  <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-white/80 dark:bg-purple-900 text-purple-800 dark:text-purple-200">
                    {cookingResult.recipeName}
                  </span>
                </div>

                <p className="text-xs sm:text-sm mt-1 leading-relaxed">
                  {cookingResult.description}
                </p>

                <div className="mt-3 p-3 rounded-xl bg-white/80 dark:bg-purple-900/50 border border-purple-200 dark:border-purple-800">
                  <p className="text-xs font-semibold text-purple-600 dark:text-purple-400">
                    Vanilla's Verdict:
                  </p>
                  <p className="text-xs sm:text-sm italic font-serif-story mt-0.5">
                    {cookingResult.dragonDialogue}
                  </p>
                </div>

                <div className="mt-3 text-right">
                  <button
                    onClick={handleReset}
                    className="text-xs font-semibold text-purple-700 dark:text-purple-300 hover:underline"
                  >
                    Cook Another Dish &rarr;
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Column 2: Pantry & Interactive Fridge Easter Egg (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* The Pantry Shelf */}
            <div className="p-5 rounded-2xl bg-purple-50/70 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-800">
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-purple-700 dark:text-purple-300">
                  Kitchen Pantry (Select Ingredients)
                </h4>
                <span className="text-xs font-mono text-purple-600 dark:text-purple-400">
                  {selectedIngredients.length} / 4 Selected
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                {AVAILABLE_INGREDIENTS.map((ing) => {
                  const isSelected = selectedIngredients.includes(ing.id);
                  return (
                    <button
                      key={ing.id}
                      onClick={() => toggleIngredient(ing.id)}
                      className={`p-2.5 rounded-xl border text-left text-xs font-medium transition-all flex items-center justify-between ${
                        isSelected
                          ? 'bg-purple-600 text-white border-purple-600 shadow-sm scale-[1.02]'
                          : 'bg-white dark:bg-purple-900/60 text-purple-900 dark:text-purple-100 border-purple-200 dark:border-purple-800 hover:bg-purple-100 dark:hover:bg-purple-800'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-lg">{ing.icon}</span>
                        <span>{ing.name}</span>
                      </div>
                      {isSelected && <Check className="w-3.5 h-3.5 shrink-0" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Interactive Fridge / Freezer Easter Egg */}
            <div className="p-5 rounded-2xl bg-gradient-to-br from-indigo-50/90 to-purple-100/90 dark:from-indigo-950/40 dark:to-purple-900/40 border border-indigo-200 dark:border-indigo-800/80">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-700 dark:text-indigo-300 flex items-center gap-1.5">
                  <span>Pantry Refrigerator</span>
                  <Sparkles className="w-3 h-3 text-indigo-500" />
                </span>
                {marshmallowFound && (
                  <span className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
                    ✓ Discovered
                  </span>
                )}
              </div>

              <p className="text-xs text-indigo-900/80 dark:text-indigo-200/80 mb-3">
                A chilly vintage icebox where Vanilla stashes his most secret confections.
              </p>

              {/* Fridge Door Interactive Button */}
              <button
                onClick={handleFridgeClick}
                className={`w-full py-3 px-4 rounded-xl border font-semibold text-xs transition-all flex items-center justify-center gap-2 shadow-sm ${
                  isFridgeOpen
                    ? 'bg-indigo-600 text-white border-indigo-600'
                    : 'bg-white dark:bg-indigo-950/80 text-indigo-950 dark:text-indigo-100 border-indigo-300 dark:border-indigo-700 hover:bg-indigo-50'
                }`}
              >
                <span>{isFridgeOpen ? '🚪 Close Icebox Door' : '❄️ Open Freezer Compartment'}</span>
              </button>

              {/* Inside the fridge content */}
              {isFridgeOpen && (
                <div className="mt-3 p-4 rounded-xl bg-white/95 dark:bg-purple-950 border border-indigo-200 dark:border-indigo-700 shadow-md animate-float">
                  <div className="flex items-center gap-3">
                    <div className="w-14 h-14 rounded-xl overflow-hidden shrink-0 border border-indigo-200">
                      <img
                        src="/assets/images/recipe_marshmallow_1792330608865.jpg"
                        alt="Active Marshmallow"
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-pink-600 dark:text-pink-400">
                        {fridgeBanner || 'You got it!! Yippeee!'}
                      </p>
                      <p className="text-xs font-display font-bold text-purple-950 dark:text-white">
                        The Active Marshmallow
                      </p>
                      <p className="text-[11px] text-purple-800/80 dark:text-purple-300">
                        Unlocked permanent trophy in the top navigation bar!
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
