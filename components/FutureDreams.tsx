
import React from 'react';

const FutureDreams: React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto py-32 px-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        <div className="space-y-8 order-2 md:order-1">
          <h2 className="text-5xl font-romantic text-pink-600 leading-tight">The Chapters Yet Unwritten</h2>
          <div className="space-y-6 text-lg text-slate-600 font-serif-title italic leading-relaxed">
            <p className="p-6 bg-white/40 rounded-3xl border-l-4 border-pink-400">
              "I see a future where our love continues to be our lighthouse. Where we grow together, navigating every tide with our hands locked in an eternal promise."
            </p>
            <p className="p-6 bg-white/40 rounded-3xl border-l-4 border-rose-400">
              "A future where we build a sanctuary filled with the same kindness you carry today. A place where every silence is comfortable and every laugh is shared."
            </p>
            <p className="p-6 bg-white/40 rounded-3xl border-l-4 border-pink-300">
              "Whatever the world throws at us, I promise to cherish the soul that chose me. You are my forever, and forever is just the threshold of what we will become."
            </p>
          </div>
        </div>
        
        <div className="relative order-1 md:order-2">
           <div className="absolute -inset-4 bg-pink-100/50 rounded-[4rem] blur-2xl animate-pulse"></div>
           <div className="relative rounded-[4rem] overflow-hidden border-8 border-white shadow-2xl group bg-white/30">
             <img 
               src="https://image2url.com/r2/default/images/1770917597662-6a4c3c25-39a7-4740-95f5-a4d5d20f26ca.jpeg" 
               alt="Sneha Future" 
               className="w-full h-auto block transition-transform duration-1000 group-hover:scale-105"
               loading="lazy"
             />
             <div className="absolute inset-0 bg-gradient-to-t from-pink-900/20 to-transparent pointer-events-none"></div>
             <div className="absolute bottom-8 left-8 right-8 text-white drop-shadow-lg pointer-events-none">
                <p className="text-2xl font-romantic italic">"To our next 50 birthdays..."</p>
             </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default FutureDreams;
