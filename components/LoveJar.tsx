
import React, { useState } from 'react';
import { generateJarNote } from '../services/geminiService';

const LoveJar: React.FC = () => {
  const [note, setNote] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [isJiggling, setIsJiggling] = useState(false);

  const pullNote = async () => {
    if (loading) return;
    setIsJiggling(true);
    setLoading(true);
    const newNote = await generateJarNote();
    setNote(newNote);
    setLoading(false);
    setTimeout(() => setIsJiggling(false), 500);
  };

  return (
    <div className="max-w-2xl mx-auto py-24 px-6 text-center">
      <div className="mb-12">
        <h2 className="text-4xl font-romantic text-pink-600 mb-2">Jar of Infinite Affection</h2>
        <p className="text-gray-400 text-xs uppercase tracking-widest">Pick a glowing note from my heart</p>
      </div>

      <div className="relative flex flex-col items-center">
        <div 
          onClick={pullNote}
          className={`relative cursor-pointer transition-transform duration-300 ${isJiggling ? 'animate-bounce' : 'hover:scale-110'}`}
        >
          {/* 3D Glass Jar effect */}
          <div className="w-48 h-64 bg-white/20 backdrop-blur-sm border-2 border-white/50 rounded-b-[4rem] rounded-t-xl relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 left-0 w-full h-8 bg-pink-100/40 border-b border-white/30"></div>
            {/* Glowing orbs inside */}
            <div className="absolute inset-0 flex flex-wrap justify-center content-center gap-2 p-6">
              {[...Array(12)].map((_, i) => (
                <div 
                  key={i} 
                  className="w-3 h-3 bg-pink-300 rounded-full blur-[2px] animate-pulse"
                  style={{ animationDelay: `${i * 0.3}s` }}
                ></div>
              ))}
            </div>
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-4xl">🍯</div>
          </div>
          {loading && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-10 h-10 border-4 border-pink-400 border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}
        </div>

        {note && !loading && (
          <div className="mt-12 animate__animated animate__zoomIn bg-white p-8 rounded-2xl shadow-xl border-l-8 border-pink-400 max-w-sm transform -rotate-1">
            <p className="text-xl font-serif-title italic text-slate-700 leading-relaxed">
              "{note}"
            </p>
            <div className="mt-4 text-[10px] text-pink-300 uppercase tracking-widest font-bold">A whisper for Sneha</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoveJar;
