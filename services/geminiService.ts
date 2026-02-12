
import { GoogleGenAI, Type, GenerateContentParameters } from "@google/genai";
import { WishData } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

/**
 * Helper to handle API calls with exponential backoff and caching
 */
async function safeGenerate(
  cacheKey: string,
  config: GenerateContentParameters,
  fallback: any,
  isJson: boolean = false
): Promise<any> {
  // Check session cache first to save quota
  const cached = sessionStorage.getItem(cacheKey);
  if (cached) {
    return isJson ? JSON.parse(cached) : cached;
  }

  let retries = 0;
  const maxRetries = 3;
  const baseDelay = 2000; // 2 seconds

  while (retries <= maxRetries) {
    try {
      const response = await ai.models.generateContent(config);
      const text = response.text?.trim();

      if (!text) throw new Error("Empty response");

      const result = isJson ? JSON.parse(text) : text;
      
      // Cache the successful result
      sessionStorage.setItem(cacheKey, isJson ? JSON.stringify(result) : result);
      return result;
    } catch (error: any) {
      const isRateLimit = error?.message?.includes("429") || error?.status === 429;
      
      if (isRateLimit && retries < maxRetries) {
        const delay = baseDelay * Math.pow(2, retries);
        console.warn(`Rate limit hit. Retrying in ${delay}ms... (Attempt ${retries + 1})`);
        await new Promise(resolve => setTimeout(resolve, delay));
        retries++;
        continue;
      }

      console.error(`Gemini API Error for ${cacheKey}:`, error);
      break; 
    }
  }

  return fallback;
}

export const generateSnehaWishes = async (name: string): Promise<WishData> => {
  const fallback = {
    poem: "Phalguna winds and a heart of gold,\nA story of purity yet to be told.\nWith sanskari grace and eyes so true,\nMy world finds its meaning only in you.",
    reasons: [
      "Your quiet purity finds joy in the simplest things.",
      "Your 'sanskari' heart treats every soul with respect.",
      "There is a sacred kind of innocence in your eyes.",
      "You are so naturally cute without even trying.",
      "You are my conscience and my greatest blessing."
    ],
    message: "Sneha, you are the most beautiful reality I have ever known. Happy Birthday!"
  };

  return safeGenerate(
    `wishes_${name}`,
    {
      model: 'gemini-3-pro-preview',
      contents: `Write a birthday tribute for ${name}.`,
      config: {
        systemInstruction: `You are a deeply romantic person writing a birthday tribute for your girlfriend, ${name}, who is turning a year older on February 13th. Capture her 'sanskari' nature, pure soul, and adorable charm.`,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            poem: { type: Type.STRING },
            reasons: { type: Type.ARRAY, items: { type: Type.STRING } },
            message: { type: Type.STRING }
          },
          required: ["poem", "reasons", "message"]
        }
      }
    },
    fallback,
    true
  );
};

export const generateCompliment = async (name: string): Promise<string> => {
  return safeGenerate(
    `compliment_${Math.floor(Math.random() * 10)}`, // Randomize key slightly for varied compliments but cache per session
    {
      model: 'gemini-3-flash-preview',
      contents: `Write a single, unique, extremely soulful one-line compliment for a girl named ${name}.`,
      config: {
        systemInstruction: `Focus on her "pure soul", "sanskari nature", or "rare innocence". One sentence only.`
      }
    },
    "Your soul is a rare melody of purity in a noisy world."
  );
};

export const generateGoldenWish = async (name: string): Promise<string> => {
  return safeGenerate(
    `golden_wish_${name}`,
    {
      model: 'gemini-3-flash-preview',
      contents: `Write a "Golden Blessing" for ${name} on her birthday.`,
      config: {
        systemInstruction: `Write a deeply moving blessing (3-4 sentences) for her future. Mention her goodness returning a thousandfold.`
      }
    },
    "May the universe mirror the purity of your heart, surrounding you with a peace as infinite as your kindness. Your goodness is a seed that will bloom into a thousand joys."
  );
};

export const generateNameMeaning = async (): Promise<string> => {
  return safeGenerate(
    `name_meaning_sneha`,
    {
      model: 'gemini-3-flash-preview',
      contents: `Explain the spiritual and romantic depth of the name "Sneha".`,
      config: {
        systemInstruction: `Focus on affection, smoothness, and eternal bonding.`
      }
    },
    "Sneha means affection that flows like sacred oil, soothing the world with its pure and gentle warmth."
  );
};

export const generateBottleMessage = async (): Promise<string> => {
  return safeGenerate(
    `bottle_message_sneha`,
    {
      model: 'gemini-3-flash-preview',
      contents: `Write a secret message found in a bottle for Sneha.`,
      config: {
        systemInstruction: `A prophecy about her being a gift to humanity because of her pure 'sanskari' soul.`
      }
    },
    "Across the tides of time, you were sent to remind the world that purity still exists. You are a living prayer."
  );
};

export const generateJarNote = async (): Promise<string> => {
  // We use a timestamp-based key occasionally to allow new notes, 
  // but let's cache at least 5 variants to reduce quota hit
  const noteId = Math.floor(Math.random() * 5);
  return safeGenerate(
    `jar_note_${noteId}`,
    {
      model: 'gemini-3-flash-preview',
      contents: `Write a short, heart-melting note (max 15 words) for a "Jar of Love".`,
      config: {
        systemInstruction: `Topic: Why Sneha is irreplaceable. Tone: Soulful and intimate.`
      }
    },
    "Your innocence is the quiet rhythm that keeps my world in harmony."
  );
};

export const generateScratchMessage = async (): Promise<string> => {
  return safeGenerate(
    `scratch_message_sneha`,
    {
      model: 'gemini-3-flash-preview',
      contents: `Write a secret "Grand Prize" message for a birthday scratch card for Sneha.`,
      config: {
        systemInstruction: `A romantic promise for the future. 1-2 sentences.`
      }
    },
    "You've won a lifetime of my undivided love and a thousand more sunsets together."
  );
};
