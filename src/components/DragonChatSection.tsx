import React, { useState, useRef, useEffect, useMemo } from 'react';
import {
  MessageSquare,
  Send,
  Sparkles,
  RotateCcw,
  Volume2,
  VolumeX,
  Dice5,
  Heart,
  Copy,
  Check,
  Search,
  BookOpen,
  ChevronRight,
  Flame,
  HelpCircle,
} from 'lucide-react';
import { sounds } from '../utils/audio';
import { MoodType } from '../types';

export interface SetQuestion {
  id: string;
  category: 'recipes' | 'lamp' | 'dragon' | 'odin' | 'marshmallow' | 'tools' | 'jokes' | 'life';
  categoryLabel: string;
  categoryIcon: string;
  question: string;
  answer: string;
  mood: MoodType;
  actionNote: string;
  keywords: string[];
  suggestedFollowUps: string[]; // ids of other set questions
}

export const SET_QUESTIONS: SetQuestion[] = [
  // 1. Secret Recipes
  {
    id: 'souffle-secret',
    category: 'recipes',
    categoryLabel: 'Secret Recipes',
    categoryIcon: '🧁',
    question: "What's your secret ingredient for the perfect magical soufflé?",
    answer:
      "Aha! The golden secret is three Madagascar vanilla beans steeped in moonlight, folded with powdered sugar, and warmed with a gentle sneeze of baby dragon embers (exactly 180°C)! Odin says mortal ovens are fine, but dragon warmth makes them rise twice as high!",
    mood: 'mischievous',
    actionNote: '*whispers conspiratorially while clutching giant wooden spoon*',
    keywords: ['souffle', 'secret', 'ingredient', 'recipe', 'bake', 'cake', 'warmth'],
    suggestedFollowUps: ['lava-cake', 'fire-cooking', 'broken-lamp'],
  },
  {
    id: 'lava-cake',
    category: 'recipes',
    categoryLabel: 'Secret Recipes',
    categoryIcon: '🧁',
    question: 'How do you make Dragonfire Molten Lava Cakes?',
    answer:
      "We bake dark Valrhona chocolate until the shell just sets, then I cup my paws around the ramekin and whisper a three-second dragon ember! The chocolate core melts instantly into liquid molten magma without burning the cake!",
    mood: 'happy',
    actionNote: '*licks chocolate speck off nose claw and grins happily*',
    keywords: ['lava', 'molten', 'chocolate', 'cake', 'magma', 'bake'],
    suggestedFollowUps: ['souffle-secret', 'dragon-fire', 'volcano-toast'],
  },
  {
    id: 'scones-recipe',
    category: 'recipes',
    categoryLabel: 'Secret Recipes',
    categoryIcon: '🧁',
    question: 'What is Master Odin’s favorite morning pastry?',
    answer:
      "Master Odin loves lavender honey scones with clotted cream! Every morning at five o'clock sharp, we knead cold salted butter into unbleached flour, fold in wild purple lavender buds, and serve them steaming hot with Earl Grey tea!",
    mood: 'happy',
    actionNote: '*inhales imaginary scent of freshly baked lavender scones*',
    keywords: ['scone', 'odin', 'favorite', 'morning', 'tea', 'lavender', 'honey'],
    suggestedFollowUps: ['odin-mustache', 'tea-time', 'souffle-secret'],
  },
  {
    id: 'fire-cooking',
    category: 'recipes',
    categoryLabel: 'Secret Recipes',
    categoryIcon: '🧁',
    question: 'Can mortals bake with dragon fire at home?',
    answer:
      "Odin says mortals must stick to conventional ovens set to 350°F (175°C)! A dragon’s flame has magical caramelizing particles that standard mortal kitchen counters are definitely not insured for! But a good kitchen blowtorch comes pretty close!",
    mood: 'happy',
    actionNote: '*giggles playfully and tucks tail safely behind apron*',
    keywords: ['mortal', 'home', 'oven', 'blowtorch', 'fire', 'kitchen'],
    suggestedFollowUps: ['dragon-fire', 'volcano-toast', 'souffle-secret'],
  },

  // 2. The Broken Lamp Story
  {
    id: 'broken-lamp',
    category: 'lamp',
    categoryLabel: 'The Broken Lamp',
    categoryIcon: '🦋',
    question: 'Tell me what REALLY happened to Odin’s heirloom porcelain lamp!',
    answer:
      "Okay, full confession! An enchanted iridescent blue butterfly fluttered through the pantry window. I tried catching it with a copper colander, hopped onto the sideboard, flapped my wings, lost my balance, and... CRASH! Odin's 1880 Meissen porcelain lamp shattered into thirty-two pieces!",
    mood: 'surprised',
    actionNote: '*covers snout with both paws in dramatic remorse*',
    keywords: ['lamp', 'broken', 'shatter', 'butterfly', 'porcelain', 'accident', 'crash'],
    suggestedFollowUps: ['odin-reaction', 'butterfly-now', 'odin-mustache'],
  },
  {
    id: 'odin-reaction',
    category: 'lamp',
    categoryLabel: 'The Broken Lamp',
    categoryIcon: '🦋',
    question: 'Was Master Odin furious when the lamp shattered?',
    answer:
      "His mustache puffed out like a bristly hedgehog and his eyes went wide! I was trembling behind the flour sacks... but then Odin knelt down, checked that my little paws weren't cut, and laughed softly. He said broken porcelain can be glued with gold lacquer, but a scorched baby dragon cannot be replaced!",
    mood: 'happy',
    actionNote: '*eyes glisten with pure sweetness and hugs spoon tightly*',
    keywords: ['angry', 'mad', 'furious', 'scold', 'reaction', 'punish', 'forgive'],
    suggestedFollowUps: ['butterfly-now', 'broken-lamp', 'odin-rules'],
  },
  {
    id: 'butterfly-now',
    category: 'lamp',
    categoryLabel: 'The Broken Lamp',
    categoryIcon: '🦋',
    question: 'Where is that mischievous blue butterfly now?',
    answer:
      "Right here in our bakery! Odin adopted it as our official kitchen mascot. It rests on top of the brass flour scale during morning prep and gently sips powdered sugar syrup from a tiny porcelain saucer!",
    mood: 'happy',
    actionNote: '*points wooden spoon toward the warm bakery pantry beam*',
    keywords: ['butterfly', 'where', 'now', 'mascot', 'blue', 'insect'],
    suggestedFollowUps: ['broken-lamp', 'odin-reaction', 'marshmallow-hint'],
  },

  // 3. Dragon Fire & Flying
  {
    id: 'dragon-fire',
    category: 'dragon',
    categoryLabel: 'Dragon Powers',
    categoryIcon: '🔥',
    question: 'Can you breathe real dragon fire?',
    answer:
      "Yes, but I'm still learning throttle control! Most of the time it's a cozy pastry ember or a lavender-scented smoke puff. Whenever I sneeze after sniffing black pepper, little sparkler showers shoot out!",
    mood: 'mischievous',
    actionNote: '*sniffs deeply and lets out a tiny harmless puff of purple sparks*',
    keywords: ['fire', 'breathe', 'flame', 'powers', 'burn', 'spark'],
    suggestedFollowUps: ['volcano-toast', 'dragon-wings', 'lava-cake'],
  },
  {
    id: 'dragon-wings',
    category: 'dragon',
    categoryLabel: 'Dragon Powers',
    categoryIcon: '🔥',
    question: 'Can you actually fly with your big purple wings?',
    answer:
      "I can flap-glide from the top shelf of the pantry down to Odin’s rolling pin! My wings are extra broad so I can fan hot lemon tarts to cool down quickly, or create a gentle breeze for drying glossy royal icing!",
    mood: 'happy',
    actionNote: '*flutters purple wings, creating a gentle puff of flour dust*',
    keywords: ['fly', 'wings', 'glide', 'flap', 'air', 'flight'],
    suggestedFollowUps: ['dragon-scales', 'dragon-fire', 'giant-spoon'],
  },
  {
    id: 'dragon-scales',
    category: 'dragon',
    categoryLabel: 'Dragon Powers',
    categoryIcon: '🔥',
    question: 'Why are your scales purple instead of green or red?',
    answer:
      "When I was a tiny hatchling, I fell into a vat of midnight blackberry compote! Odin scrubbed me with sweet buttermilk, but the violet color soaked deep into my scales forever. Now I smell permanently like wild berries and vanilla bean!",
    mood: 'happy',
    actionNote: '*proudly displays glistening lavender shoulder scales*',
    keywords: ['purple', 'scales', 'violet', 'color', 'blackberry', 'green', 'red'],
    suggestedFollowUps: ['dragon-wings', 'hatching-story', 'chef-hat'],
  },

  // 4. Master Chef Odin
  {
    id: 'odin-mustache',
    category: 'odin',
    categoryLabel: 'Master Chef Odin',
    categoryIcon: '👨‍🍳',
    question: 'Is Odin really as stern as his giant mustache makes him look?',
    answer:
      "Never judge a baker by his mustache! Odin’s handlebar mustache looks formidable, but underneath he has the softest heart in the county. Whenever a soufflé collapses, he just dusts it with extra powdered sugar and calls it 'Pudding of the Clouds'!",
    mood: 'happy',
    actionNote: '*twirls claws mimicking Odin’s majestic handlebar mustache*',
    keywords: ['odin', 'mustache', 'stern', 'strict', 'beard', 'scary', 'nice'],
    suggestedFollowUps: ['hatching-story', 'odin-rules', 'scones-recipe'],
  },
  {
    id: 'hatching-story',
    category: 'odin',
    categoryLabel: 'Master Chef Odin',
    categoryIcon: '👨‍🍳',
    question: 'How did you and Master Odin first meet?',
    answer:
      "On a snowy December evening in 1880, Odin opened his brick oven and found an iridescent purple egg nestled in the warm hearth ashes! When I hatched, I immediately ate half a cinnamon roll. Odin tied a miniature apron on me on the spot!",
    mood: 'happy',
    actionNote: '*hugs wooden spoon with nostalgic affection*',
    keywords: ['meet', 'hatch', 'egg', 'story', 'origin', 'born', 'found'],
    suggestedFollowUps: ['odin-mustache', 'odin-rules', 'dragon-scales'],
  },
  {
    id: 'odin-rules',
    category: 'odin',
    categoryLabel: 'Master Chef Odin',
    categoryIcon: '👨‍🍳',
    question: 'What is Odin’s number one kitchen rule?',
    answer:
      "Rule Number One: 'Never sneeze over the powdered sugar bin!' Rule Number Two: 'Always taste the chocolate twice to be scientifically certain!' I follow Rule Two with extreme dedication!",
    mood: 'mischievous',
    actionNote: '*grins cheekily and pats little round dragon belly*',
    keywords: ['rules', 'rule', 'clean', 'dishes', 'kitchen', 'order'],
    suggestedFollowUps: ['odin-mustache', 'volcano-toast', 'souffle-secret'],
  },

  // 5. The Active Marshmallow
  {
    id: 'marshmallow-hint',
    category: 'marshmallow',
    categoryLabel: 'Active Marshmallow',
    categoryIcon: '☁️',
    question: 'Give me a sneaky hint! Where is that Active Marshmallow hiding?',
    answer:
      "Shhh! Keep your voice down! Have you checked the Victorian Icebox / Refrigerator in the Mini-Game section? If you click the refrigerator door handle when Odin isn't looking, a cheeky marshmallow with little feet might just spring out!",
    mood: 'mischievous',
    actionNote: '*winks conspiratorially and points toward the Refrigerator*',
    keywords: ['marshmallow', 'hint', 'secret', 'easter egg', 'fridge', 'refrigerator', 'icebox'],
    suggestedFollowUps: ['marshmallow-alive', 'broken-lamp', 'lava-cake'],
  },
  {
    id: 'marshmallow-alive',
    category: 'marshmallow',
    categoryLabel: 'Active Marshmallow',
    categoryIcon: '☁️',
    question: 'Why is that marshmallow alive and bouncing around?',
    answer:
      "I may have accidentally spilled three drops of Moonlit Starlight Extract into the gelatin mixer last Thursday! Now it bounces around like a sugar-coated kitten and refuses to be toasted!",
    mood: 'mischievous',
    actionNote: '*giggles and hops on one foot*',
    keywords: ['why', 'alive', 'bounce', 'running', 'marshmallow', 'extract'],
    suggestedFollowUps: ['marshmallow-hint', 'volcano-toast', 'dragon-fire'],
  },

  // 6. Tools & Chef Hat
  {
    id: 'giant-spoon',
    category: 'tools',
    categoryLabel: 'Tools & Uniform',
    categoryIcon: '🥄',
    question: 'Why is your wooden spoon almost as big as your whole body?',
    answer:
      "Master Odin hand-carved it from an enchanted pear tree! Since I'm only three feet tall, a normal spoon would let me slip headfirst into the chocolate cauldron! With this giant spoon, I can paddle across a punch bowl if needed!",
    mood: 'happy',
    actionNote: '*proudly hoists the giant pear-wood spoon with small claws*',
    keywords: ['spoon', 'wooden', 'big', 'giant', 'tool', 'utensil'],
    suggestedFollowUps: ['chef-hat', 'dragon-wings', 'souffle-secret'],
  },
  {
    id: 'chef-hat',
    category: 'tools',
    categoryLabel: 'Tools & Uniform',
    categoryIcon: '🥄',
    question: 'How does your chef hat stay on between your dragon horns?',
    answer:
      "Odin specially tailored two neat ear-slits in the band, and we secure it with a tiny dab of sticky caramel glaze! Even during my most acrobatic wing flaps, the hat stays perfectly upright!",
    mood: 'happy',
    actionNote: '*taps the crisp white chef hat proudly sitting between horns*',
    keywords: ['hat', 'toque', 'horns', 'head', 'wear', 'uniform'],
    suggestedFollowUps: ['giant-spoon', 'dragon-scales', 'odin-mustache'],
  },

  // 7. Kitchen Jokes & Mishaps
  {
    id: 'kitchen-joke',
    category: 'jokes',
    categoryLabel: 'Jokes & Mishaps',
    categoryIcon: '😂',
    question: 'Tell me a funny kitchen joke!',
    answer:
      "Why did the baby dragon refuse to bake the spicy chili bread? Because every time he tested the crust, he accidentally toasted the ceiling! *snort-giggle* Odin had to repaint the bakery beams three times!",
    mood: 'mischievous',
    actionNote: '*slaps knee claw and laughs heartily*',
    keywords: ['joke', 'funny', 'laugh', 'humor', 'riddle', 'pun'],
    suggestedFollowUps: ['volcano-toast', 'broken-lamp', 'sleepy-time'],
  },
  {
    id: 'volcano-toast',
    category: 'jokes',
    categoryLabel: 'Jokes & Mishaps',
    categoryIcon: '😂',
    question: 'What is the story behind the Artisanal Volcano Toast?',
    answer:
      "I got startled by a kitchen mouse and let out a full sneeze on twelve slices of brioche! They turned black as coal in two seconds! Odin buttered them, sprinkled sea salt, and sold them to the local geology club!",
    mood: 'mischievous',
    actionNote: '*chuckles sheepishly and blushes lavender*',
    keywords: ['toast', 'volcano', 'burnt', 'accident', 'sneeze', 'charcoal'],
    suggestedFollowUps: ['kitchen-joke', 'dragon-fire', 'broken-lamp'],
  },

  // 8. Daily Life & Cozy Cuddles
  {
    id: 'sleepy-time',
    category: 'life',
    categoryLabel: 'Cozy Life',
    categoryIcon: '💤',
    question: 'Where do you sleep at night when the bakery closes?',
    answer:
      "Right inside the warm cooling hearth of the brick oven on a bed of dry lavender sprigs and folded linen flour towels! It stays cozy warm until morning roll prep at five AM!",
    mood: 'sleepy',
    actionNote: '*yawns widely showing tiny white teeth and rubs eyes with claw*',
    keywords: ['sleep', 'bed', 'night', 'hearth', 'oven', 'rest', 'cozy'],
    suggestedFollowUps: ['pet-cuddle', 'scones-recipe', 'hatching-story'],
  },
  {
    id: 'pet-cuddle',
    category: 'life',
    categoryLabel: 'Cozy Life',
    categoryIcon: '💤',
    question: 'Can I pet your wings and give you a chef cuddle?',
    answer:
      "Oh please do! Baby dragons love gentle scritches right behind our ear horns and along the base of our wings! If you scratch just right, I purr like a simmering tea kettle!",
    mood: 'happy',
    actionNote: '*leans forward and purrs with closed eyes and relaxed wings*',
    keywords: ['pet', 'cuddle', 'hug', 'love', 'touch', 'hold'],
    suggestedFollowUps: ['sleepy-time', 'dragon-wings', 'souffle-secret'],
  },
  {
    id: 'tea-time',
    category: 'life',
    categoryLabel: 'Cozy Life',
    categoryIcon: '💤',
    question: 'What do you drink during afternoon tea time?',
    answer:
      "Every afternoon at four o'clock, Odin brews Earl Grey with dried lavender buds, and I warm the copper kettle with a tiny puff of breath! We serve it with currant scones and clotted cream. Would you like a cup?",
    mood: 'happy',
    actionNote: '*pours an imaginary cup of aromatic steaming tea*',
    keywords: ['tea', 'drink', 'beverage', 'afternoon', 'kettle'],
    suggestedFollowUps: ['scones-recipe', 'pet-cuddle', 'odin-mustache'],
  },
];

interface ChatMessage {
  id: string;
  sender: 'dragon' | 'user';
  text: string;
  timestamp: string;
  mood?: MoodType;
  actionNote?: string;
  liked?: boolean;
  followUps?: string[]; // array of SetQuestion IDs
}

export const DragonChatSection: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome-1',
      sender: 'dragon',
      text: "Hullo! I'm Vanilla Truffle, Odin's junior pastry dragon! Ask me anything about our 1880 bakery secrets, why I broke that porcelain lamp, or how to caramelize sugar with baby dragon breath!",
      timestamp: 'Just now',
      mood: 'happy',
      actionNote: '*waves wooden spoon cheerfully*',
      followUps: ['souffle-secret', 'broken-lamp', 'marshmallow-hint'],
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [activeMood, setActiveMood] = useState<MoodType>('happy');
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const chatContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  // Categories list
  const categories = [
    { id: 'all', label: 'All Questions', icon: '🌟' },
    { id: 'recipes', label: 'Recipes', icon: '🧁' },
    { id: 'lamp', label: 'Broken Lamp', icon: '🦋' },
    { id: 'dragon', label: 'Dragon Powers', icon: '🔥' },
    { id: 'odin', label: 'Master Odin', icon: '👨‍🍳' },
    { id: 'marshmallow', label: 'Marshmallow', icon: '☁️' },
    { id: 'tools', label: 'Spoon & Hat', icon: '🥄' },
    { id: 'jokes', label: 'Jokes', icon: '😂' },
    { id: 'life', label: 'Cozy Life', icon: '💤' },
  ];

  // Filtered Set Questions for question selector/drawer
  const filteredQuestions = useMemo(() => {
    return SET_QUESTIONS.filter((sq) => {
      const matchesCategory = selectedCategory === 'all' || sq.category === selectedCategory;
      const matchesSearch =
        searchQuery === '' ||
        sq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        sq.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
        sq.keywords.some((k) => k.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  // Real-time suggested questions as user types in input box
  const inputSuggestions = useMemo(() => {
    const trimmed = inputText.trim().toLowerCase();
    if (trimmed.length < 2) return [];
    return SET_QUESTIONS.filter(
      (sq) =>
        sq.question.toLowerCase().includes(trimmed) ||
        sq.keywords.some((k) => trimmed.includes(k) || k.includes(trimmed))
    ).slice(0, 3);
  }, [inputText]);

  // Find best matching set question for freeform user text
  const findMatchingQuestion = (text: string): SetQuestion | null => {
    const clean = text.toLowerCase().trim();

    // Exact or phrase match
    for (const sq of SET_QUESTIONS) {
      if (sq.question.toLowerCase() === clean) return sq;
      if (clean.includes(sq.question.toLowerCase().replace('?', ''))) return sq;
    }

    // High score keyword matching
    let bestScore = 0;
    let bestMatch: SetQuestion | null = null;

    for (const sq of SET_QUESTIONS) {
      let score = 0;
      for (const kw of sq.keywords) {
        if (clean.includes(kw)) {
          score += kw.length > 4 ? 3 : 2;
        }
      }
      if (score > bestScore && score >= 2) {
        bestScore = score;
        bestMatch = sq;
      }
    }

    return bestMatch;
  };

  const executeSetQuestion = (sq: SetQuestion) => {
    if (isTyping) return;

    if (soundEnabled) sounds.playBubble();

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: sq.question,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputText('');
    setSearchQuery('');
    setIsTyping(true);
    setActiveMood('mischievous');

    // Dragon response delivery
    setTimeout(() => {
      setActiveMood(sq.mood);

      if (soundEnabled) {
        if (sq.mood === 'surprised') {
          sounds.playDragonOuch();
        } else {
          sounds.playSparkle();
        }
      }

      const dragonReply: ChatMessage = {
        id: `dragon-${Date.now()}`,
        sender: 'dragon',
        text: sq.answer,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        mood: sq.mood,
        actionNote: sq.actionNote,
        followUps: sq.suggestedFollowUps,
      };

      setMessages((prev) => [...prev, dragonReply]);
      setIsTyping(false);
    }, 400);
  };

  const handleSendCustomText = (textToSend?: string) => {
    const text = (textToSend || inputText).trim();
    if (!text || isTyping) return;

    // Check if it matches a set question
    const matched = findMatchingQuestion(text);
    if (matched) {
      executeSetQuestion(matched);
      return;
    }

    // If no exact set question matched, handle gracefully without random answers
    if (soundEnabled) sounds.playBubble();

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);
    setActiveMood('surprised');

    setTimeout(() => {
      setActiveMood('happy');
      if (soundEnabled) sounds.playSparkle();

      const dragonReply: ChatMessage = {
        id: `dragon-${Date.now()}`,
        sender: 'dragon',
        text: `Squeak! I'm only a baby dragon pastry chef, so I only know about our 1880 kitchen, Master Odin, sweet recipes, and my broken lamp adventure! Pick any of my questions below to hear all my secrets!`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        mood: 'happy',
        actionNote: '*taps wooden spoon playfully and points to question buttons below*',
        followUps: ['souffle-secret', 'broken-lamp', 'giant-spoon'],
      };

      setMessages((prev) => [...prev, dragonReply]);
      setIsTyping(false);
    }, 400);
  };

  const handleResetChat = () => {
    if (soundEnabled) sounds.playSparkle();
    setMessages([
      {
        id: `welcome-${Date.now()}`,
        sender: 'dragon',
        text: "The slate is wiped clean like a freshly dusted pastry marble! Pick any question to ask me, friend!",
        timestamp: 'Just now',
        mood: 'happy',
        actionNote: '*wipes marble counter with apron corner*',
        followUps: ['souffle-secret', 'broken-lamp', 'marshmallow-hint'],
      },
    ]);
    setActiveMood('happy');
  };

  const handleCopyMessage = (id: string, text: string) => {
    navigator.clipboard?.writeText(text);
    setCopiedId(id);
    if (soundEnabled) sounds.playBubble();
    setTimeout(() => setCopiedId(null), 1500);
  };

  const handleLikeMessage = (id: string) => {
    if (soundEnabled) sounds.playSparkle();
    setMessages((prev) =>
      prev.map((msg) => (msg.id === id ? { ...msg, liked: !msg.liked } : msg))
    );
  };

  const handleRandomQuestion = () => {
    const random = SET_QUESTIONS[Math.floor(Math.random() * SET_QUESTIONS.length)];
    executeSetQuestion(random);
  };

  return (
    <section
      id="dragon-chat"
      className="py-16 sm:py-20 px-4 sm:px-6 max-w-6xl mx-auto scroll-mt-20"
      aria-label="Chat with Vanilla Truffle"
    >
      {/* Section Header */}
      <div className="text-center space-y-3 mb-8 sm:mb-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-100 dark:bg-purple-900/60 border border-purple-300 dark:border-purple-700 text-purple-800 dark:text-purple-200 text-xs font-bold tracking-widest uppercase shadow-xs">
          <MessageSquare className="w-3.5 h-3.5 text-pink-500 animate-pulse" />
          <span>Questions & Answers</span>
        </div>

        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black font-display text-purple-950 dark:text-white tracking-tight">
          Talk with <span className="bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-600 bg-clip-text text-transparent">Vanilla Truffle</span> 💬
        </h2>

        <p className="text-sm sm:text-base text-purple-800/80 dark:text-purple-300/80 font-serif-story max-w-2xl mx-auto italic">
          Pick any question below or ask Vanilla directly to hear his authentic 1880 bakery secrets, broken lamp confessions, and marshmallow lore!
        </p>
      </div>

      {/* Main Grid: Set Questions Drawer on the Left/Top, Chat Stream on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* LEFT COLUMN (lg: 5 cols): Curated Set Questions Directory */}
        <div className="lg:col-span-5 rounded-3xl bg-white/80 dark:bg-[#1a0f2b]/80 backdrop-blur-xl border-2 border-purple-200/80 dark:border-purple-800/60 p-4 sm:p-5 shadow-lg flex flex-col h-[650px] overflow-hidden">
          <div className="flex items-center justify-between pb-3 border-b border-purple-100 dark:border-purple-800/50">
            <div className="flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-pink-500" />
              <h3 className="font-display font-bold text-base text-purple-950 dark:text-purple-100">
                Ask a Question
              </h3>
            </div>
            <span className="text-[11px] font-mono font-semibold px-2 py-0.5 rounded-full bg-purple-100 dark:bg-purple-900/80 text-purple-700 dark:text-purple-300">
              {SET_QUESTIONS.length} Questions
            </span>
          </div>

          {/* Search Set Questions */}
          <div className="mt-3 relative">
            <Search className="w-3.5 h-3.5 text-purple-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search questions (e.g., lamp, souffle, odin)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 text-xs rounded-xl bg-purple-50/70 dark:bg-purple-950/50 border border-purple-200 dark:border-purple-800 text-purple-900 dark:text-purple-100 placeholder-purple-400 focus:outline-hidden focus:ring-1 focus:ring-purple-400"
            />
          </div>

          {/* Category Tabs */}
          <div className="flex gap-1.5 overflow-x-auto py-2.5 scrollbar-none shrink-0">
            {categories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold shrink-0 transition-all flex items-center gap-1 ${
                  selectedCategory === cat.id
                    ? 'bg-purple-600 text-white shadow-xs scale-102'
                    : 'bg-purple-100/70 dark:bg-purple-900/40 text-purple-800 dark:text-purple-200 hover:bg-purple-200/80 dark:hover:bg-purple-800/60'
                }`}
              >
                <span>{cat.icon}</span>
                <span>{cat.label}</span>
              </button>
            ))}
          </div>

          {/* Scrollable Set Question Cards */}
          <div className="flex-1 overflow-y-auto space-y-2 pr-1 mt-1 scrollbar-thin">
            {filteredQuestions.length === 0 ? (
              <div className="text-center py-10 text-xs text-purple-400">
                No matching questions found. Try another word!
              </div>
            ) : (
              filteredQuestions.map((sq) => (
                <button
                  key={sq.id}
                  type="button"
                  onClick={() => executeSetQuestion(sq)}
                  disabled={isTyping}
                  className="w-full text-left p-3 rounded-2xl bg-gradient-to-r from-purple-50/70 to-pink-50/50 dark:from-[#231238]/80 dark:to-[#1e0e33]/80 hover:from-purple-100/80 hover:to-pink-100/70 dark:hover:from-[#2e184a] dark:hover:to-[#291342] border border-purple-200/60 dark:border-purple-800/50 transition-all hover:translate-x-1 group flex items-start gap-2.5 disabled:opacity-50"
                >
                  <span className="text-lg shrink-0 mt-0.5">{sq.categoryIcon}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-purple-950 dark:text-purple-100 group-hover:text-pink-600 dark:group-hover:text-pink-300 leading-snug">
                      {sq.question}
                    </p>
                    <span className="text-[10px] text-purple-500/80 dark:text-purple-400/80 font-mono">
                      {sq.categoryLabel}
                    </span>
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 text-purple-400 group-hover:text-pink-500 group-hover:translate-x-0.5 transition-transform shrink-0 mt-1" />
                </button>
              ))
            )}
          </div>

          {/* Random Question Dice Roller at Bottom of Directory */}
          <div className="pt-3 border-t border-purple-100 dark:border-purple-800/50 mt-2 shrink-0">
            <button
              type="button"
              onClick={handleRandomQuestion}
              disabled={isTyping}
              className="w-full py-2 px-3 rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition-transform active:scale-98 disabled:opacity-50"
            >
              <Dice5 className="w-3.5 h-3.5 animate-bounce" />
              <span>Surprise Me! (Pick Random Question)</span>
            </button>
          </div>
        </div>

        {/* RIGHT COLUMN (lg: 7 cols): Active Chat Dialogue Window */}
        <div className="lg:col-span-7 rounded-3xl bg-white/80 dark:bg-[#1a0f2b]/80 backdrop-blur-xl border-2 border-purple-200/80 dark:border-purple-800/60 shadow-lg overflow-hidden flex flex-col h-[650px]">
          {/* Top Bar with Dragon Status */}
          <div className="px-5 py-3.5 bg-gradient-to-r from-purple-100/90 via-pink-100/80 to-purple-100/90 dark:from-[#2a1745] dark:via-[#361954] dark:to-[#2a1745] border-b border-purple-200 dark:border-purple-800 flex items-center justify-between shrink-0">
            {/* Dragon Avatar & Status */}
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-purple-600 via-pink-500 to-amber-300 p-0.5 shadow-md flex items-center justify-center">
                  <div className="w-full h-full rounded-2xl bg-white dark:bg-[#1f1035] flex items-center justify-center text-xl select-none">
                    {activeMood === 'happy' && '😁'}
                    {activeMood === 'mischievous' && '🧁'}
                    {activeMood === 'surprised' && '✨'}
                    {activeMood === 'sleepy' && '💤'}
                  </div>
                </div>
                {/* Active Indicator */}
                <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-500 border-2 border-white dark:border-[#1a0f2b] animate-pulse" />
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-display font-black text-sm text-purple-950 dark:text-white">
                    Vanilla Truffle
                  </h3>
                  <span className="px-2 py-0.5 rounded-full bg-pink-100 dark:bg-pink-950/60 border border-pink-300/60 dark:border-pink-800 text-[9px] font-mono font-bold text-pink-700 dark:text-pink-300">
                    Junior Chef
                  </span>
                </div>
                <p className="text-[11px] text-purple-600 dark:text-purple-300 flex items-center gap-1">
                  <span>Mood:</span>
                  <span className="font-bold capitalize text-pink-600 dark:text-pink-300">
                    {activeMood}
                  </span>
                  <span>·</span>
                  <span className="text-[10px] text-purple-400">1880 Kitchen</span>
                </p>
              </div>
            </div>

            {/* Quick Actions (Sound toggle & Clear chat) */}
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => setSoundEnabled(!soundEnabled)}
                className="p-2 rounded-xl text-purple-600 dark:text-purple-300 hover:bg-purple-200/50 dark:hover:bg-purple-800/50 transition-colors"
                title={soundEnabled ? 'Mute Sounds' : 'Enable Sounds'}
              >
                {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4 text-purple-400" />}
              </button>

              <button
                onClick={handleResetChat}
                className="p-2 rounded-xl text-purple-600 dark:text-purple-300 hover:bg-purple-200/50 dark:hover:bg-purple-800/50 transition-colors"
                title="Clear Chat"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Chat Messages Stream */}
          <div ref={chatContainerRef} className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'} group`}
              >
                <div
                  className={`max-w-[88%] sm:max-w-[80%] rounded-2xl px-4 py-3 shadow-xs relative transition-all ${
                    msg.sender === 'user'
                      ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-tr-xs'
                      : 'bg-purple-50/90 dark:bg-[#231438]/90 border border-purple-200/80 dark:border-purple-800/80 text-purple-950 dark:text-purple-100 rounded-tl-xs'
                  }`}
                >
                  {/* Action Note for Vanilla */}
                  {msg.actionNote && (
                    <p className="text-[11px] font-serif-story italic text-pink-600 dark:text-pink-300 mb-1.5">
                      {msg.actionNote}
                    </p>
                  )}

                  {/* Body Text */}
                  <p className="text-xs sm:text-sm leading-relaxed whitespace-pre-wrap font-sans">
                    {msg.text}
                  </p>

                  {/* Message Meta & Micro-interactions */}
                  <div className="mt-2 pt-1 border-t border-purple-200/40 dark:border-purple-700/40 flex items-center justify-between text-[10px] opacity-75">
                    <span>{msg.timestamp}</span>

                    <div className="flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                      {msg.sender === 'dragon' && (
                        <button
                          onClick={() => handleLikeMessage(msg.id)}
                          className={`p-1 rounded-md hover:bg-purple-200/40 dark:hover:bg-purple-700/40 transition-colors ${
                            msg.liked ? 'text-pink-500 fill-pink-500' : 'text-purple-400'
                          }`}
                          title="Like response"
                        >
                          <Heart className={`w-3 h-3 ${msg.liked ? 'fill-current' : ''}`} />
                        </button>
                      )}

                      <button
                        onClick={() => handleCopyMessage(msg.id, msg.text)}
                        className="p-1 rounded-md hover:bg-purple-200/40 dark:hover:bg-purple-700/40 text-purple-400 transition-colors"
                        title="Copy message"
                      >
                        {copiedId === msg.id ? (
                          <Check className="w-3 h-3 text-emerald-500" />
                        ) : (
                          <Copy className="w-3 h-3" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Follow-up Set Question Chips (when available on dragon messages) */}
                {msg.sender === 'dragon' && msg.followUps && msg.followUps.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-1.5 max-w-[90%]">
                    <span className="text-[10px] font-semibold text-purple-500 dark:text-purple-400 self-center mr-1">
                      Ask next:
                    </span>
                    {msg.followUps.map((fid) => {
                      const fq = SET_QUESTIONS.find((q) => q.id === fid);
                      if (!fq) return null;
                      return (
                        <button
                          key={fq.id}
                          type="button"
                          onClick={() => executeSetQuestion(fq)}
                          disabled={isTyping}
                          className="text-[11px] px-2.5 py-1 rounded-full bg-purple-100/90 dark:bg-purple-900/60 hover:bg-pink-100 hover:text-pink-700 dark:hover:bg-purple-800 text-purple-800 dark:text-purple-200 border border-purple-200 dark:border-purple-700/60 transition-all font-medium flex items-center gap-1 disabled:opacity-50"
                        >
                          <span>{fq.categoryIcon}</span>
                          <span>{fq.question}</span>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex flex-col items-start">
                <div className="rounded-2xl rounded-tl-xs px-4 py-3 bg-purple-50 dark:bg-[#231438] border border-purple-200 dark:border-purple-800 flex items-center gap-2">
                  <span className="text-sm animate-bounce">🥄</span>
                  <div className="flex gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-pink-500 animate-ping" />
                    <span
                      className="w-1.5 h-1.5 rounded-full bg-purple-500 animate-ping"
                      style={{ animationDelay: '0.2s' }}
                    />
                    <span
                      className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-ping"
                      style={{ animationDelay: '0.4s' }}
                    />
                  </div>
                  <span className="text-xs text-purple-500 dark:text-purple-300 italic font-serif-story">
                    Vanilla is stirring up an answer...
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Real-time input suggestions popup above input bar if matching keywords */}
          {inputSuggestions.length > 0 && !isTyping && (
            <div className="px-4 py-2 bg-purple-50/95 dark:bg-[#201035]/95 border-t border-purple-200 dark:border-purple-800/80 flex items-center gap-2 overflow-x-auto shrink-0">
              <span className="text-[10px] uppercase font-bold text-pink-600 dark:text-pink-300 shrink-0">
                Did you mean:
              </span>
              {inputSuggestions.map((sq) => (
                <button
                  key={sq.id}
                  type="button"
                  onClick={() => executeSetQuestion(sq)}
                  className="px-2.5 py-1 rounded-lg bg-white dark:bg-purple-900/60 hover:bg-pink-100 dark:hover:bg-purple-800 text-xs font-semibold text-purple-900 dark:text-purple-100 border border-purple-200 dark:border-purple-700 shrink-0 flex items-center gap-1 shadow-xs transition-colors"
                >
                  <span>{sq.categoryIcon}</span>
                  <span className="truncate max-w-[200px]">{sq.question}</span>
                </button>
              ))}
            </div>
          )}

          {/* Message Input Form */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendCustomText();
            }}
            className="p-3 sm:p-4 bg-purple-100/60 dark:bg-[#180c26]/90 border-t border-purple-200 dark:border-purple-800/60 flex items-center gap-2 shrink-0"
          >
            <input
              ref={inputRef}
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Ask a question or pick one from the above..."
              disabled={isTyping}
              className="flex-1 px-4 py-2.5 text-xs sm:text-sm rounded-xl bg-white dark:bg-[#231238] border border-purple-200 dark:border-purple-800 text-purple-950 dark:text-white placeholder-purple-400 focus:outline-hidden focus:ring-2 focus:ring-pink-500/50 shadow-inner"
            />

            <button
              type="submit"
              disabled={!inputText.trim() || isTyping}
              className="p-2.5 rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white shadow-md disabled:opacity-40 transition-transform active:scale-95 shrink-0"
              aria-label="Send Question"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};
