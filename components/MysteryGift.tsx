
import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { generateGoldenWish } from '../services/geminiService';

const MysteryGift: React.FC = () => {
  const [taps, setTaps] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [wish, setWish] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleTap = async () => {
    if (isOpen) return;

    if (taps < 2) {
      setTaps(taps + 1);
    } else {
      setLoading(true);
      const text = await generateGoldenWish("Sneha");
      setWish(text);
      setIsOpen(true);
      setLoading(false);
      
      // Elegant sprinkle for the big reveal
      confetti({
        particleCount: 40,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#fbbf24', '#ffffff'],
        scalar: 0.6,
        gravity: 0.6,
        ticks: 150
      });
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-32 px-6 text-center">
      <div className="mb-12">
        <h3 className="text-3xl font-romantic text-pink-600 mb-2">A Gift from the Universe</h3>
        <p className="text-gray-400 text-xs uppercase tracking-widest">Tap to unlock the Golden Blessing</p>
      </div>

      <div className="relative h-64 flex items-center justify-center">
        {!isOpen ? (
          <div 
            onClick={handleTap}
            className={`relative w-40 h-40 cursor-pointer transition-all duration-300 transform ${taps > 0 ? 'scale-110' : ''} ${taps > 1 ? 'animate-bounce' : ''}`}
          >
            <div className={`absolute inset-0 bg-pink-500 rounded-xl shadow-2xl border-4 border-pink-400 flex items-center justify-center transition-transform ${taps === 1 ? 'rotate-3' : ''} ${taps === 2 ? '-rotate-3' : ''}`}>
               <div className="w-full h-8 bg-yellow-400 absolute top-1/2 -translate-y-1/2"></div>
               <div className="h-full w-8 bg-yellow-400 absolute left-1/2 -translate-x-1/2"></div>
               <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-4xl">🎀</div>
            </div>
            {taps > 0 && (
              <div className="absolute -top-12 left-1/2 -translate-x-1/2 text-pink-500 font-bold animate-pulse">
                {3 - taps} more taps!
              </div>
            )}
          </div>
        ) : (
          <div className="animate__animated animate__zoomIn bg-gradient-to-br from-amber-50 to-white p-10 rounded-[3rem] border-2 border-amber-200 shadow-2xl max-w-lg">
            <div className="text-4xl mb-4">✨</div>
            <p className="text-xl md:text-2xl font-serif-title italic text-amber-800 leading-relaxed">
              "{wish}"
            </p>
            <div className="mt-6 text-amber-500 font-bold text-[10px] uppercase tracking-widest">The Golden Blessing for Sneha</div>
          </div>
        )}

        {loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-white/20 backdrop-blur-sm rounded-3xl">
            <div className="w-10 h-10 border-4 border-pink-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MysteryGift;
