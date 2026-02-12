
import React, { useState, useEffect } from 'react';

const AgeClock: React.FC = () => {
  const birthDate = new Date('2004-02-13T12:45:00');
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const calculateAge = () => {
    let diff = now.getTime() - birthDate.getTime();

    const seconds = Math.floor((diff / 1000) % 60);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    
    // For years, months, days, we use calendar logic
    let years = now.getFullYear() - birthDate.getFullYear();
    let months = now.getMonth() - birthDate.getMonth();
    let days = now.getDate() - birthDate.getDate();

    if (days < 0) {
      months--;
      const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0);
      days += prevMonth.getDate();
    }
    if (months < 0) {
      years--;
      months += 12;
    }

    return { years, months, days, hours, minutes, seconds };
  };

  const age = calculateAge();

  return (
    <div className="max-w-4xl mx-auto mb-20 px-6">
      <div className="glass-morphism p-10 md:p-14 rounded-[3rem] shadow-2xl border border-white text-center space-y-8 animate__animated animate__fadeInUp">
        <div className="space-y-2">
          <h2 className="text-3xl md:text-4xl font-romantic text-pink-600">Sneha's Journey in Time</h2>
          <p className="text-pink-300 text-xs font-bold tracking-[0.3em] uppercase">Born on: 13th Feb 2004, 12:45 PM</p>
        </div>

        {/* Panchang Info */}
        <div className="bg-pink-50/50 py-3 px-6 rounded-full inline-block border border-pink-100">
          <p className="text-rose-500 font-serif-title italic text-sm md:text-base">
            Panchang: Phalguna Krishna Ashtami, Vikrama Samvat 2060
          </p>
        </div>

        <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
          {[
            { label: 'Years', value: age.years },
            { label: 'Months', value: age.months },
            { label: 'Days', value: age.days },
            { label: 'Hrs', value: age.hours },
            { label: 'Mins', value: age.minutes },
            { label: 'Secs', value: age.seconds, highlight: true }
          ].map((item, idx) => (
            <div key={idx} className="flex flex-col items-center group">
              <div className={`text-3xl md:text-5xl font-serif-title font-bold ${item.highlight ? 'text-pink-600 animate-pulse' : 'text-slate-700'} transition-colors group-hover:text-pink-400`}>
                {String(item.value).padStart(2, '0')}
              </div>
              <div className="text-[10px] uppercase tracking-widest text-pink-300 font-bold mt-2">
                {item.label}
              </div>
            </div>
          ))}
        </div>

        <div className="pt-4 border-t border-pink-50">
          <p className="text-gray-400 text-xs italic">Every second with you is a gift of pure grace.</p>
        </div>
      </div>
    </div>
  );
};

export default AgeClock;
