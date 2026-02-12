
import React, { useState, useEffect } from 'react';

const HeartbeatRhythm: React.FC = () => {
  const meetingDate = new Date('2018-05-02T10:00:00');
  const [heartbeats, setHeartbeats] = useState<number>(0);

  useEffect(() => {
    const updateCounter = () => {
      const now = new Date();
      const diffMs = now.getTime() - meetingDate.getTime();
      // Average human heart rate is approx 72-80 bpm. Let's use 75.
      const totalSeconds = diffMs / 1000;
      const beatsPerSecond = 75 / 60;
      setHeartbeats(Math.floor(totalSeconds * beatsPerSecond));
    };

    updateCounter();
    const interval = setInterval(updateCounter, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="max-w-4xl mx-auto py-20 px-6">
      <div className="glass-morphism p-12 rounded-[3.5rem] border border-white text-center shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-pink-100/30 rounded-full blur-3xl -z-10 animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-rose-100/30 rounded-full blur-3xl -z-10 animate-pulse" style={{ animationDelay: '1s' }}></div>

        <div className="flex flex-col items-center space-y-6">
          <div className="text-6xl animate-[heart-pulse_1s_ease-in-out_infinite] drop-shadow-lg">💓</div>
          
          <div className="space-y-2">
            <h3 className="text-2xl font-romantic text-pink-500 uppercase tracking-widest">The Rhythm of Us</h3>
            <p className="text-slate-600 font-serif-title italic">Since May 2, 2018, my heart has beaten approximately...</p>
          </div>

          <div className="relative inline-block">
            <div className="text-5xl md:text-7xl font-bold text-slate-800 font-serif-title tracking-tight tabular-nums">
              {heartbeats.toLocaleString()}
            </div>
            <div className="text-pink-400 font-bold text-xs tracking-[0.4em] uppercase mt-2">Times for you</div>
          </div>

          <p className="text-gray-400 text-sm max-w-md italic font-light pt-4">
            "Every single pulse is a silent echo of your name. You aren't just in my heart; you are its beat."
          </p>
        </div>
      </div>

      <style>{`
        @keyframes heart-pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.15); }
        }
      `}</style>
    </div>
  );
};

export default HeartbeatRhythm;
