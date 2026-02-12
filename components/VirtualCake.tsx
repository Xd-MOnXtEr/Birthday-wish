
import React, { useState } from 'react';
import confetti from 'canvas-confetti';

type CakeState = 'READY' | 'BLOWN' | 'CUT';

const VirtualCake: React.FC = () => {
  const [cakeState, setCakeState] = useState<CakeState>('READY');

  const handleBlow = () => {
    setCakeState('BLOWN');
    // Subtle sprinkle for blowing out
    confetti({
      particleCount: 15,
      spread: 40,
      origin: { y: 0.7 },
      colors: ['#ffffff', '#fce7f3'],
      scalar: 0.6,
      gravity: 0.8
    });
  };

  const handleCut = () => {
    setCakeState('CUT');
    // Gentle burst for cutting
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.8 },
      colors: ['#ec4899', '#f43f5e', '#ffffff'],
      scalar: 0.5,
      gravity: 0.7,
      ticks: 100
    });
  };

  return (
    <div className="flex flex-col items-center justify-center p-12 bg-white/80 backdrop-blur-md rounded-[3rem] border border-pink-100 shadow-2xl mb-12 max-w-xl mx-auto relative overflow-hidden">
      <div className={`absolute inset-0 bg-pink-200/10 transition-opacity duration-1000 ${cakeState === 'READY' ? 'opacity-100' : 'opacity-0'}`}></div>

      <h3 className="text-3xl font-romantic text-pink-600 mb-12 relative z-10">
        {cakeState === 'READY' && "Make a wish and blow!"}
        {cakeState === 'BLOWN' && "Now, let's cut the cake!"}
        {cakeState === 'CUT' && "Happy Birthday, Sneha! ✨"}
      </h3>
      
      <div className="relative py-12 scale-110">
        {cakeState === 'BLOWN' && (
          <div className="absolute -top-16 left-1/2 -translate-x-1/2 z-50 animate-bounce">
            <div className="text-5xl rotate-45">🔪</div>
          </div>
        )}

        <div className="relative">
          <div className={`relative transition-all duration-700 ${cakeState === 'CUT' ? 'translate-x-4 rotate-2' : ''}`}>
            <div className="w-56 h-36 bg-pink-100 rounded-t-[3rem] border-b-8 border-pink-200 relative shadow-2xl overflow-hidden group">
              <div className="absolute top-0 left-0 w-full h-12 bg-pink-300/40 rounded-t-[3rem] flex justify-around items-end">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="w-8 h-10 bg-pink-300/40 rounded-b-full -mb-4"></div>
                ))}
              </div>
              
              {[...Array(20)].map((_, i) => (
                <div 
                  key={i} 
                  className="absolute w-1.5 h-1.5 rounded-full animate-pulse" 
                  style={{
                    backgroundColor: ['#f472b6', '#4ade80', '#60a5fa', '#fbbf24'][i % 4],
                    top: `${Math.random() * 80}%`,
                    left: `${Math.random() * 90}%`,
                    animationDelay: `${Math.random() * 2}s`
                  }}
                ></div>
              ))}

              {cakeState === 'CUT' && (
                <div className="absolute top-0 right-0 w-1/2 h-full bg-pink-50/50 border-l-2 border-dashed border-pink-300"></div>
              )}
            </div>
          </div>

          {cakeState === 'CUT' && (
            <div className="absolute top-0 left-0 w-56 h-36 animate__animated animate__slideOutLeft opacity-0">
               <div className="w-1/3 h-full bg-pink-100 rounded-tl-[3rem] border-r-4 border-pink-200"></div>
            </div>
          )}
        </div>

        <div className="absolute -top-12 left-1/2 -translate-x-1/2 flex gap-6 z-20">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="relative flex flex-col items-center">
              {cakeState !== 'READY' && (
                <div className="absolute -top-8 w-4 h-8 flex flex-col items-center">
                  <div className="w-1 h-4 bg-gray-300/40 rounded-full animate-[smoke_2s_ease-out_infinite]" style={{ animationDelay: `${i * 0.2}s` }}></div>
                  <div className="w-2 h-6 bg-gray-300/20 rounded-full animate-[smoke_3s_ease-out_infinite] mt-1" style={{ animationDelay: `${i * 0.4}s` }}></div>
                </div>
              )}

              {cakeState === 'READY' && (
                <div className="absolute -top-6 w-5 h-8">
                  <div className="w-full h-full bg-orange-400 rounded-full animate-candle-flicker blur-[1px] relative">
                    <div className="absolute top-1 left-1/2 -translate-x-1/2 w-2 h-4 bg-yellow-200 rounded-full"></div>
                  </div>
                </div>
              )}

              <div className={`w-3 h-14 bg-gradient-to-b from-blue-200 to-blue-400 rounded-full shadow-md border-t border-blue-100 transition-all duration-500 ${cakeState === 'CUT' ? 'opacity-50' : ''}`}>
                 <div className="w-full h-1/2 border-b border-blue-300/30"></div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="w-72 h-8 bg-neutral-100 rounded-[100%] absolute -bottom-4 left-1/2 -translate-x-1/2 -z-10 shadow-lg border-b-4 border-neutral-200"></div>
      </div>

      <div className="mt-16 space-y-4 w-full px-8 relative z-10">
        {cakeState === 'READY' && (
          <button 
            onClick={handleBlow}
            className="w-full py-5 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-full font-bold shadow-xl hover:shadow-pink-200 hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-3 group"
          >
            <span>Blow the Candles!</span>
            <span className="text-xl group-hover:animate-pulse">🌬️</span>
          </button>
        )}

        {cakeState === 'BLOWN' && (
          <button 
            onClick={handleCut}
            className="w-full py-5 bg-gradient-to-r from-rose-500 to-pink-600 text-white rounded-full font-bold shadow-xl hover:shadow-rose-200 hover:scale-105 active:scale-95 transition-all animate__animated animate__pulse animate__infinite flex items-center justify-center gap-3"
          >
            <span>Time to Cut the Cake!</span>
            <span className="text-xl">🔪</span>
          </button>
        )}

        {cakeState === 'CUT' && (
          <div className="text-center space-y-3 animate__animated animate__fadeInUp">
            <p className="text-pink-600 font-romantic text-2xl">A slice of happiness for my sweet Sneha!</p>
            <p className="text-gray-400 text-sm uppercase tracking-widest">May your year be as sweet as this moment</p>
          </div>
        )}
      </div>

      <style>{`
        @keyframes candle-flicker {
          0%, 100% { transform: scale(1) rotate(-1deg); }
          50% { transform: scale(1.1) rotate(2deg); opacity: 0.8; }
        }
        @keyframes smoke {
          0% { transform: translateY(0) scale(1); opacity: 0.5; }
          100% { transform: translateY(-40px) scale(2); opacity: 0; }
        }
        .animate-candle-flicker {
          animation: candle-flicker 0.5s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default VirtualCake;
