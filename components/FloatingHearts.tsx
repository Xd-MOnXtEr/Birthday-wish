
import React, { useEffect, useState } from 'react';

const FloatingHearts: React.FC = () => {
  const [hearts, setHearts] = useState<{ id: number; left: number; size: number; duration: number }[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setHearts(prev => [
        ...prev.slice(-15),
        {
          id: Date.now(),
          left: Math.random() * 100,
          size: Math.random() * (30 - 10) + 10,
          duration: Math.random() * (10 - 5) + 5
        }
      ]);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {hearts.map(heart => (
        <div
          key={heart.id}
          className="absolute text-pink-300 opacity-40 animate-bounce"
          style={{
            left: `${heart.left}%`,
            bottom: '-50px',
            fontSize: `${heart.size}px`,
            animation: `floatUp ${heart.duration}s linear infinite`
          }}
        >
          ❤️
        </div>
      ))}
      <style>{`
        @keyframes floatUp {
          0% { transform: translateY(0); opacity: 0; }
          10% { opacity: 0.4; }
          90% { opacity: 0.4; }
          100% { transform: translateY(-110vh); opacity: 0; }
        }
      `}</style>
    </div>
  );
};

export default FloatingHearts;
