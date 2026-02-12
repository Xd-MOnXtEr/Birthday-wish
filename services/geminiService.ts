
import { WishData } from "../types";

/**
 * Static service providing heartfelt content for Sneha's Birthday
 * No API key required.
 */

const getRandomItem = <T>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];

export const generateSnehaWishes = async (name: string): Promise<WishData> => {
  // Simulate network delay for effect
  await new Promise(resolve => setTimeout(resolve, 800));
  
  return {
    poem: "Beyond the stars and quiet night,\nYou are my heart's enduring light.\nIn every breath and word I say,\nI love you more with every day.",
    reasons: [
      "The way your presence feels like a quiet sanctuary from the world.",
      "Your 'sanskari' grace—that rare, beautiful integrity you carry with such ease.",
      "How you understand the unspoken language of my heart perfectly.",
      "The way your eyes hold a universe of kindness I could get lost in forever.",
      "Your unwavering belief in us, even when the road gets steep."
    ],
    message: `${name}, you are the most beautiful poetry I have ever read. Happy Birthday!`
  };
};

const compliments = [
  "You are the peace my heart has been searching for its entire life.",
  "Your smile is the only light I need to find my way through the dark.",
  "In a world of noise, you are my favorite melody.",
  "Your kindness is a masterpiece that the world deserves to see.",
  "Being with you feels like a Sunday morning that never ends.",
  "You carry a grace that makes even the stars look dim.",
  "My favorite place in the whole world is wherever you are standing.",
  "You don't just have a beautiful face; you have a soul that glows."
];

export const generateCompliment = async (name: string): Promise<string> => {
  await new Promise(resolve => setTimeout(resolve, 500));
  return getRandomItem(compliments);
};

const goldenBlessings = [
  "May your life be a masterpiece of joy, painted with the colors of the love we share.",
  "May your path be lined with the same kindness you give so freely to the world.",
  "I wish for your soul to always dance in the light of absolute peace and purpose.",
  "May every dream you hold close to your heart find its way to reality this year.",
  "May the universe reward your pure heart with infinite moments of wonder."
];

export const generateGoldenWish = async (name: string): Promise<string> => {
  await new Promise(resolve => setTimeout(resolve, 1200));
  return getRandomItem(goldenBlessings);
};

export const generateNameMeaning = async (): Promise<string> => {
  return "Sneha translates to a profound, flowing affection. It is the kind of love that saturates the soul with warmth and pure grace.";
};

const bottleMessages = [
  "In a vast ocean of faces, I would find you again in every lifetime. You are my destiny.",
  "Our love is a message that time could never erase, floating towards a forever we build together.",
  "The stars were aligned the moment we met; everything since has been a beautiful unfolding.",
  "To the world, you are one person, but to me, you are the entire world."
];

export const generateBottleMessage = async (): Promise<string> => {
  await new Promise(resolve => setTimeout(resolve, 500));
  return getRandomItem(bottleMessages);
};

const jarNotes = [
  "Thank you for being my constant in a world of variables.",
  "You are the best thing that ever happened to me.",
  "Your love is my favorite adventure.",
  "I am so proud of the woman you are becoming.",
  "Every day with you is my new favorite day.",
  "You are my home, my heart, and my forever.",
  "Your laugh is the sound of my happiness.",
  "I love you more than words could ever capture."
];

export const generateJarNote = async (): Promise<string> => {
  await new Promise(resolve => setTimeout(resolve, 300));
  return getRandomItem(jarNotes);
};

export const generateScratchMessage = async (): Promise<string> => {
  return "You've won a future filled with my absolute devotion and infinite love.";
};
