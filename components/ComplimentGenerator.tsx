
import React, { useState } from 'react';
import { generateCompliment } from '../services/geminiService';
import confetti from 'canvas-confetti';

const ComplimentGenerator: React.FC = () => {
  const [compliment, setCompliment] = useState<string>("Click the flower to hear my heart...");
  const [loading, setLoading] = useState(false);

  const getNewCompliment = async () => {
    setLoading(true);
    const text = await generateCompliment("Sneha");
    setCompliment(text);
    setLoading(false);
    
    // Very subtle sprinkle
    confetti({
      particleCount: 8,
      spread: 20,
      origin: { y: 0.8 },
      colors: ['#fbcfe8', '#ffffff'],
      scalar: 0.4,
      gravity: 0.5
    });
  };

  return (
    <div className="max-w-2xl mx-auto py-20 px-6">
      <div className="glass-morphism p-12 rounded-[3rem] text-center space-y-8 border border-white shadow-xl relative overflow-hidden group">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-pink-200 to-transparent"></div>
        
        <h3 className="text-2xl font-romantic text-pink-500 uppercase tracking-widest">A Daily Petal of Praise</h3>
        
        <div className="relative inline-block cursor-pointer" onClick={getNewCompliment}>
          <div className={`text-7xl transition-transform duration-500 ${loading ? 'animate-spin' : 'hover:rotate-12 hover:scale-110'}`}>
            🌸
          </div>
          {loading && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-12 h-12 border-4 border-pink-200 border-t-pink-500 rounded-full animate-spin"></div>
            </div>
          )}
        </div>

        <div className="min-h-[80px] flex items-center justify-center">
          <p className={`text-xl md:text-2xl text-slate-700 italic font-serif-title transition-all duration-500 ${loading ? 'opacity-30 blur-sm' : 'opacity-100 blur-0'}`}>
            "{compliment}"
          </p>
        </div>

        <button 
          onClick={getNewCompliment}
          disabled={loading}
          className="px-8 py-3 bg-pink-50 text-pink-500 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-pink-500 hover:text-white transition-all border border-pink-100"
        >
          Get Another Compliment
        </button>
      </div>
    </div>
  );
};

export default ComplimentGenerator;
