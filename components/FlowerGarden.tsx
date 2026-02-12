
import React, { useState } from 'react';

interface Flower {
  id: number;
  x: number;
  y: number;
  emoji: string;
}

const FlowerGarden: React.FC = () => {
  const [flowers, setFlowers] = useState<Flower[]>([]);
  const emojis = ['🌸', '🌺', '🌷', '🌹', '🌻', '🌼'];

  const handleClick = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const newFlower = {
      id: Date.now(),
      x,
      y,
      emoji: emojis[Math.floor(Math.random() * emojis.length)]
    };

    setFlowers(prev => [...prev, newFlower]);
    setTimeout(() => {
      setFlowers(prev => prev.filter(f => f.id !== newFlower.id));
    }, 3000);
  };

  return (
    <div className="max-w-5xl mx-auto py-24 px-6">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-romantic text-pink-600 mb-2">Sneha's Inner Garden</h2>
        <p className="text-gray-400 text-xs uppercase tracking-widest">Click anywhere to plant a thought of love</p>
      </div>

      <div 
        onClick={handleClick}
        className="h-96 w-full glass-morphism rounded-[4rem] border border-white shadow-inner relative overflow-hidden cursor-crosshair bg-gradient-to-b from-transparent to-pink-50/20"
      >
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
          <p className="text-4xl font-romantic text-pink-300">Touch to bloom...</p>
        </div>
        
        {flowers.map(flower => (
          <div 
            key={flower.id}
            className="absolute animate__animated animate__zoomIn animate__fadeOut text-3xl md:text-5xl pointer-events-none transition-all duration-1000"
            style={{ 
              left: flower.x - 20, 
              top: flower.y - 20,
              animation: 'flowerGrow 3s forwards'
            }}
          >
            {flower.emoji}
          </div>
        ))}
      </div>

      <style>{`
        @keyframes flowerGrow {
          0% { transform: scale(0) translateY(0); opacity: 0; }
          20% { transform: scale(1.2) translateY(-10px); opacity: 1; }
          80% { transform: scale(1) translateY(-20px); opacity: 0.8; }
          100% { transform: scale(0.8) translateY(-40px); opacity: 0; }
        }
      `}</style>
    </div>
  );
};

export default FlowerGarden;
