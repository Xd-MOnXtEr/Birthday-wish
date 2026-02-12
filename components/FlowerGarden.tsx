
import React, { useState } from 'react';

interface Flower {
  id: number;
  x: number;
  y: number;
  emoji: string;
  word: string;
}

const FlowerGarden: React.FC = () => {
  const [flowers, setFlowers] = useState<Flower[]>([]);
  const emojis = ['🌸', '🌺', '🌷', '🌹', '🌻', '🌼'];
  
  // Local static list of deep love words - No AI/API needed
  const romanticWords = [
    "Soulbound", "Eternal", "My Home", "Destiny", "Infinite", 
    "Beloved", "Always", "Pure", "Together", "Magic", 
    "Serenity", "Deeply", "Yours", "Breathless", "True"
  ];

  const handleClick = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const newFlower = {
      id: Date.now(),
      x,
      y,
      emoji: emojis[Math.floor(Math.random() * emojis.length)],
      word: romanticWords[Math.floor(Math.random() * romanticWords.length)]
    };

    setFlowers(prev => [...prev, newFlower]);
    
    // Remove after animation completes
    setTimeout(() => {
      setFlowers(prev => prev.filter(f => f.id !== newFlower.id));
    }, 3000);
  };

  return (
    <div className="max-w-5xl mx-auto py-24 px-6">
      <div className="text-center mb-12 animate__animated animate__fadeIn">
        <h2 className="text-4xl font-romantic text-pink-600 mb-2">Sneha's Inner Garden</h2>
        <p className="text-gray-400 text-xs uppercase tracking-widest">Tap the ground to bloom a thought of love</p>
      </div>

      <div 
        onClick={handleClick}
        className="h-[450px] w-full glass-morphism rounded-[4rem] border border-white shadow-2xl relative overflow-hidden cursor-crosshair bg-gradient-to-b from-transparent via-pink-50/10 to-pink-50/30 group"
      >
        {/* Subtle helper text */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-10 group-hover:opacity-20 transition-opacity">
          <p className="text-5xl font-romantic text-pink-400 text-center px-10">
            Every click is a promise <br/> planted in my heart...
          </p>
        </div>
        
        {flowers.map(flower => (
          <div 
            key={flower.id}
            className="absolute pointer-events-none"
            style={{ 
              left: flower.x, 
              top: flower.y,
            }}
          >
            {/* The Flower */}
            <div 
              className="text-4xl md:text-6xl animate-flower-grow"
              style={{ transform: 'translate(-50%, -50%)' }}
            >
              {flower.emoji}
            </div>
            
            {/* The Floating Romantic Word */}
            <div 
              className="absolute whitespace-nowrap text-pink-500 font-romantic text-xl md:text-2xl animate-word-float opacity-0"
              style={{ left: '10px', top: '-20px' }}
            >
              {flower.word}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 text-center text-pink-300 italic text-sm font-light">
        "Your love grows in places I never knew existed."
      </div>

      <style>{`
        @keyframes flowerGrow {
          0% { transform: translate(-50%, -50%) scale(0) rotate(-20deg); opacity: 0; }
          30% { transform: translate(-50%, -60%) scale(1.2) rotate(10deg); opacity: 1; }
          100% { transform: translate(-50%, -80%) scale(0.8) rotate(0deg); opacity: 0; }
        }
        
        @keyframes wordFloat {
          0% { transform: translateY(0); opacity: 0; }
          20% { transform: translateY(-20px); opacity: 0.8; }
          80% { transform: translateY(-60px); opacity: 0.6; }
          100% { transform: translateY(-100px); opacity: 0; }
        }

        .animate-flower-grow {
          animation: flowerGrow 3s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
        }

        .animate-word-float {
          animation: wordFloat 3s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default FlowerGarden;
