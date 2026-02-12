
import React from 'react';

const stats = [
  { label: 'Innocence', value: 100, color: 'bg-pink-400', icon: '👼' },
  { label: 'Sanskari Vibes', value: 100, color: 'bg-rose-400', icon: '📿' },
  { label: 'Cuteness Quotient', value: 100, color: 'bg-pink-500', icon: '🐰' },
  { label: 'Pure Heartedness', value: 100, color: 'bg-rose-300', icon: '💎' },
];

const SoulmateStats: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto py-20 px-6">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-romantic text-pink-600 mb-2">The Soulmate Spectrum</h2>
        <p className="text-gray-400 text-[10px] uppercase tracking-[0.4em]">Attributes of a Legendary Soul</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {stats.map((stat, idx) => (
          <div key={idx} className="glass-morphism p-6 rounded-3xl border border-white group hover:scale-105 transition-all duration-500 shadow-sm hover:shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <span className="text-2xl">{stat.icon}</span>
                <span className="font-bold text-slate-700">{stat.label}</span>
              </div>
              <span className="text-pink-500 font-bold">MAX</span>
            </div>
            <div className="w-full h-3 bg-pink-50 rounded-full overflow-hidden">
              <div 
                className={`h-full ${stat.color} transition-all duration-1000 delay-300`}
                style={{ width: '100%', animation: 'slideRight 2s ease-out' }}
              ></div>
            </div>
          </div>
        ))}
      </div>

      <style>{`
        @keyframes slideRight {
          from { width: 0%; }
          to { width: 100%; }
        }
      `}</style>
    </div>
  );
};

export default SoulmateStats;
