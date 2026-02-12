
import React, { useState } from 'react';
import { generateBottleMessage, generateNameMeaning } from '../services/geminiService';

const MessageBottle: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState<{ meaning: string; message: string } | null>(null);

  const openBottle = async () => {
    if (isOpen) return;
    setLoading(true);
    const [meaning, message] = await Promise.all([
      generateNameMeaning(),
      generateBottleMessage()
    ]);
    setContent({ meaning, message });
    setIsOpen(true);
    setLoading(false);
  };

  return (
    <div className="max-w-4xl mx-auto py-24 px-6 relative">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-romantic text-pink-600">The Ocean of Affection</h2>
        <p className="text-gray-400 text-xs uppercase tracking-widest mt-2">A secret floated across time for you</p>
      </div>

      <div className="flex flex-col items-center justify-center">
        {!isOpen ? (
          <div 
            onClick={openBottle}
            className="cursor-pointer group relative"
          >
            <div className="text-8xl md:text-9xl animate-[float_4s_ease-in-out_infinite] hover:scale-110 transition-transform">
              {loading ? '⏳' : '🍾'}
            </div>
            <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap bg-pink-500 text-white text-[10px] px-3 py-1 rounded-full uppercase font-bold tracking-tighter opacity-0 group-hover:opacity-100 transition-opacity">
              Tap to uncork
            </div>
            {/* Water Ripple Effect */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-blue-100/30 rounded-full blur-xl -z-10 animate-ping"></div>
          </div>
        ) : (
          <div className="animate__animated animate__fadeInUp bg-[#fffaf0] p-10 md:p-16 rounded-[1rem] shadow-2xl border-x-8 border-y-2 border-[#f3e5ab] relative max-w-2xl transform rotate-1">
            <div className="absolute top-4 right-4 text-4xl opacity-20">📜</div>
            <div className="space-y-8 font-serif-title italic text-slate-700 leading-loose">
              <div className="border-b border-pink-100 pb-6">
                 <h4 className="text-pink-600 font-romantic text-3xl mb-4">The Meaning of Sneha</h4>
                 <p className="text-lg md:text-xl">"{content?.meaning}"</p>
              </div>
              <div>
                 <h4 className="text-pink-600 font-romantic text-3xl mb-4">A Secret Prophecy</h4>
                 <p className="text-lg md:text-xl">"{content?.message}"</p>
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="mt-10 text-pink-400 text-xs uppercase tracking-widest font-bold hover:text-pink-600"
            >
              × Close Scroll
            </button>
          </div>
        )}
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
      `}</style>
    </div>
  );
};

export default MessageBottle;
