import React, { useState, useEffect } from 'react';
import { GuestbookEntry } from '../types';
import { Heart, Send, Sparkles, MessageCircle } from 'lucide-react';
import { sounds } from '../utils/audio';

const INITIAL_ENTRIES: GuestbookEntry[] = [
  {
    id: '1',
    author: 'Chef Odin',
    recipeWish: 'Remember to wipe your paws before testing the raspberry coulis! Proud of you, my little dragon.',
    date: '19th Century'
  },
  {
    id: '2',
    author: 'Pantry Mouse Pippin',
    recipeWish: 'Can you please invent a cheese-flavored truffle next? Asking for a friend! 🧀',
    date: 'Yesterday'
  },
  {
    id: '3',
    author: 'Kitchen Stardust Fairy',
    recipeWish: 'Your Bak Bak Bun was hilarious! The king couldn’t complain about the taxes for three hours!',
    date: 'Just now'
  }
];

export const GuestbookSection: React.FC = () => {
  const [entries, setEntries] = useState<GuestbookEntry[]>([]);
  const [author, setAuthor] = useState('');
  const [message, setMessage] = useState('');
  const [submittedFeedback, setSubmittedFeedback] = useState<string | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem('vanillaTruffle_guestbook');
    if (saved) {
      try {
        setEntries(JSON.parse(saved));
      } catch {
        setEntries(INITIAL_ENTRIES);
      }
    } else {
      setEntries(INITIAL_ENTRIES);
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!author.trim() || !message.trim()) return;

    sounds.playCookingSuccess();

    const newEntry: GuestbookEntry = {
      id: Date.now().toString(),
      author: author.trim(),
      recipeWish: message.trim(),
      date: 'Just now'
    };

    const updated = [newEntry, ...entries];
    setEntries(updated);
    localStorage.setItem('vanillaTruffle_guestbook', JSON.stringify(updated));

    setAuthor('');
    setMessage('');
    setSubmittedFeedback('Vanilla squeaked in delight and tucked your note into his recipe binder! ✨');

    setTimeout(() => {
      setSubmittedFeedback(null);
    }, 4500);
  };

  return (
    <section id="guestbook" className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 scroll-mt-20">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-10">
        <p className="text-xs font-bold uppercase tracking-widest text-purple-600 dark:text-purple-400">
          Chapter 06 · Cookbook Guestbook
        </p>
        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-purple-950 dark:text-white mt-1">
          Leave a Little Love in Vanilla’s Cookbook
        </h2>
        <p className="text-sm sm:text-base text-purple-800/80 dark:text-purple-200/80 mt-2">
          Leave a note, advice for the junior chef, or your dream recipe flavor for Vanilla to concoct.
        </p>
      </div>

      {/* Main Grid: Form on Left, Wall of Notes on Right */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        
        {/* Form Container (5 cols) */}
        <div className="md:col-span-5 p-6 rounded-3xl bg-white/90 dark:bg-purple-900/40 border border-purple-200 dark:border-purple-800 shadow-lg backdrop-blur-md">
          <h3 className="font-display font-bold text-lg text-purple-950 dark:text-white mb-4 flex items-center gap-2">
            <MessageCircle className="w-4 h-4 text-purple-600 dark:text-purple-400" />
            <span>Write a Kitchen Note</span>
          </h3>

          <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm">
            <div>
              <label htmlFor="guestbook-name-input" className="block text-xs font-semibold text-purple-700 dark:text-purple-300 uppercase mb-1">
                Your Chef or Visitor Name
              </label>
              <input
                id="guestbook-name-input"
                type="text"
                required
                maxLength={40}
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                placeholder="e.g. Master Baker Hazel"
                className="w-full px-3.5 py-2.5 rounded-xl border border-purple-200 dark:border-purple-700 bg-purple-50/50 dark:bg-purple-950/50 text-purple-950 dark:text-purple-100 placeholder:text-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <div>
              <label htmlFor="guestbook-note-input" className="block text-xs font-semibold text-purple-700 dark:text-purple-300 uppercase mb-1">
                Your Recipe Wish or Message
              </label>
              <textarea
                id="guestbook-note-input"
                required
                rows={3}
                maxLength={200}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="e.g. Please bake a honey lavender cloud cake that floats!"
                className="w-full px-3.5 py-2.5 rounded-xl border border-purple-200 dark:border-purple-700 bg-purple-50/50 dark:bg-purple-950/50 text-purple-950 dark:text-purple-100 placeholder:text-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
              />
              <div className="text-right text-[10px] text-purple-400 mt-0.5">
                {message.length} / 200 characters
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-semibold text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Pin to Cookbook Wall</span>
            </button>
          </form>

          {submittedFeedback && (
            <div className="mt-4 p-3 rounded-xl bg-purple-100 dark:bg-purple-950 text-purple-900 dark:text-purple-200 text-xs font-medium border border-purple-300 dark:border-purple-700 animate-float">
              {submittedFeedback}
            </div>
          )}
        </div>

        {/* Recipe Notes Wall (7 cols) */}
        <div className="md:col-span-7 space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-purple-200 dark:border-purple-800">
            <span className="text-xs font-bold uppercase tracking-wider text-purple-700 dark:text-purple-300">
              Kitchen Notes Board ({entries.length})
            </span>
            <span className="text-xs text-purple-500">Local Journal Archive</span>
          </div>

          <div className="space-y-3 max-h-[440px] overflow-y-auto pr-1">
            {entries.map((entry) => (
              <div
                key={entry.id}
                className="p-4 rounded-2xl bg-white/80 dark:bg-purple-900/30 border border-purple-200 dark:border-purple-800/60 shadow-sm relative group hover:border-purple-300 transition-colors"
              >
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="font-bold text-purple-950 dark:text-purple-100 font-display">
                    {entry.author}
                  </span>
                  <span className="text-[11px] text-purple-500 font-mono">
                    {entry.date}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-purple-900/90 dark:text-purple-200/90 font-serif-story italic">
                  “{entry.recipeWish}”
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
