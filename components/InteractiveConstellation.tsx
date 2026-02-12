
import React, { useState } from 'react';

interface Star {
  id: number;
  x: number;
  y: number;
  label: string;
  isRevealed: boolean;
}

const starTraits = [
  "Kindness", "Radiance", "Grace", "Strength", "Wisdom", 
  "Innocence", "Belonging", "Magic", "Home", "Destiny",
  "Patience", "Laughter", "Serenity", "Integrity", "Soul"
];

const InteractiveConstellation: React.FC = () => {
  const [stars, setStars] = useState<Star[]>(() => 
    starTraits.map((trait, i) => ({
      id: i,
      x: 10 + Math.random() * 80, // %
      y: 10 + Math.random() * 80, // %
      label: trait,
      isRevealed: false
    }))
  );

  const [revealedCount, setRevealedCount] = useState(0);

  const handleStarClick = (id: number) => {
    setStars(prev => prev.map(s => {
      if (s.id === id && !s.isRevealed) {
        setRevealedCount(c => c + 1);
        return { ...s, isRevealed: true };
      }
      return s;
    }));
  };

  return (
    <div className="max-w-5xl mx-auto py-24 px-6">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-romantic text-pink-600 mb-2">Constellations of You</h2>
        <p className="text-gray-400 text-xs uppercase tracking-widest">Connect the lights that define your soul</p>
      </div>

      <div className="h-[500px] w-full bg-slate-900 rounded-[4rem] relative shadow-2xl overflow-hidden group border-4 border-slate-800">
        {/* Sky gradient background */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-indigo-950 to-slate-900 opacity-80"></div>
        
        {/* Connecting Lines for revealed stars */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-40">
           {stars.filter(s => s.isRevealed).map((s, i, arr) => {
             if (i === 0) return null;
             const prev = arr[i-1];
             return (
               <line 
                 key={`line-${s.id}`} 
                 x1={`${prev.x}%`} y1={`${prev.y}%`} 
                 x2={`${s.x}%`} y2={`${s.y}%`} 
                 stroke="#f472b6" 
                 strokeWidth="1" 
                 className="animate-line-draw"
               />
             );
           })}
        </svg>

        {stars.map((star) => (
          <div 
            key={star.id}
            onClick={() => handleStarClick(star.id)}
            className={`absolute cursor-pointer transition-all duration-500 flex flex-col items-center justify-center`}
            style={{ 
              left: `${star.x}%`, 
              top: `${star.y}%`,
              transform: 'translate(-50%, -50%)'
            }}
          >
            <div className={`w-3 h-3 rounded-full ${star.isRevealed ? 'bg-pink-400 scale-150 shadow-[0_0_15px_rgba(244,114,182,0.8)]' : 'bg-white/40 hover:bg-white/80'} transition-all`}></div>
            {star.isRevealed && (
              <span className="mt-2 text-pink-300 font-romantic text-xl animate__animated animate__fadeIn">
                {star.label}
              </span>
            )}
          </div>
        ))}

        {revealedCount === 0 && (
          <div className="absolute bottom-8 left-0 right-0 text-center text-white/40 text-xs italic pointer-events-none uppercase tracking-[0.3em]">
            Click the stars to reveal our path
          </div>
        )}

        {revealedCount === stars.length && (
          <div className="absolute inset-0 flex items-center justify-center bg-pink-900/40 backdrop-blur-sm animate__animated animate__fadeIn">
             <div className="text-center p-8 glass-morphism rounded-3xl border border-white/20">
               <h3 className="text-3xl font-romantic text-white mb-2">Everything is written in the stars</h3>
               <p className="text-pink-100 italic">"I would choose you in every lifetime, in every universe."</p>
             </div>
          </div>
        )}
      </div>

      <style>{`
        @keyframes line-draw {
          from { stroke-dasharray: 1000; stroke-dashoffset: 1000; }
          to { stroke-dasharray: 1000; stroke-dashoffset: 0; }
        }
        .animate-line-draw {
          animation: line-draw 2s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default InteractiveConstellation;
