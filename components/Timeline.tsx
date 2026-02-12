
import React from 'react';

const milestones = [
  { date: 'Feb 13, 2004', title: 'The World Was Blessed', desc: 'A soul as pure as a prayer was born into this world.', icon: '✨' },
  { date: 'The First Hello', title: 'When Paths Crossed', desc: 'The moment my world suddenly made sense through your eyes.', icon: '🤝' },
  // Fixed syntax error: escaped the single quote in "weren't" which was causing the string to break and TypeScript to parse following words as identifiers.
  { date: 'Endless Chats', title: 'Discovering Your Depth', desc: 'Realizing that your "sanskari" values weren\'t just a trait, but your soul.', icon: '💬' },
  { date: 'Shared Dreams', title: 'Building Our Story', desc: 'Every promise we made became a brick in the home of my heart.', icon: '🏡' },
  { date: 'Today', title: 'Your Special Day', desc: 'Celebrating the innocence and purity that makes you, you.', icon: '🎈' }
];

const Timeline: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto py-24 px-6">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-romantic text-pink-600 mb-4">Our Beautiful Timeline</h2>
        <p className="text-gray-400 text-xs font-bold tracking-[0.5em] uppercase">Growing together, piece by piece</p>
      </div>

      <div className="relative">
        {/* Central Line */}
        <div className="absolute left-1/2 -translate-x-1/2 w-0.5 h-full bg-gradient-to-b from-pink-100 via-pink-300 to-pink-100"></div>

        <div className="space-y-24">
          {milestones.map((m, idx) => (
            <div key={idx} className={`relative flex items-center justify-between w-full ${idx % 2 === 0 ? 'flex-row-reverse' : ''}`}>
              <div className="w-5/12 hidden md:block"></div>
              
              {/* Node */}
              <div className="absolute left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-white border-4 border-pink-200 shadow-xl flex items-center justify-center z-10 hover:scale-125 transition-transform">
                <span className="text-xl">{m.icon}</span>
              </div>

              {/* Content Card */}
              <div className="w-full md:w-5/12 glass-morphism p-8 rounded-[2rem] shadow-lg border border-white hover:border-pink-200 transition-all group animate__animated animate__fadeInUp">
                <span className="text-pink-400 font-bold text-xs tracking-widest block mb-2">{m.date}</span>
                <h4 className="text-xl font-serif-title font-bold text-slate-800 mb-2 group-hover:text-pink-600 transition-colors">{m.title}</h4>
                <p className="text-gray-600 italic text-sm leading-relaxed">{m.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Timeline;
