export type MoodType = 'happy' | 'sleepy' | 'mischievous' | 'surprised';

export interface ProjectRecipe {
  id: string;
  name: string;
  englishMeaning?: string;
  tagline: string;
  description: string;
  magicalEffect: string;
  storySnippet: string;
  image: string;
  accentColor: string;
  funFact: string;
}

export interface StoryCardItem {
  id: number;
  chapter: string;
  title: string;
  text: string;
  image?: string;
  isInteractiveBonus?: boolean;
}

export interface Ingredient {
  id: string;
  name: string;
  icon: string;
  category: 'sweet' | 'dairy' | 'spice' | 'base';
}

export interface CookingResult {
  recipeName: string;
  outcomeType: 'success' | 'disaster' | 'mystery';
  title: string;
  description: string;
  dragonReaction: string;
  dragonDialogue: string;
  image?: string;
}

export interface GuestbookEntry {
  id: string;
  author: string;
  recipeWish: string;
  date: string;
}
