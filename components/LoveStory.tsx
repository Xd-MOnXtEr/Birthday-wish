
import React from 'react';

const storyMilestones = [
  { 
    date: 'May 2, 2018', 
    title: 'The First Spark', 
    desc: 'The day destiny brought us together. One look, one conversation, and the world felt different.', 
    icon: '✨',
    color: 'from-pink-200 to-rose-200'
  },
  { 
    date: 'May 3, 2018', 
    title: 'A Promise of Forever', 
    desc: 'When we decided to walk this path together. The start of our "us" and the most beautiful "yes" of my life.', 
    icon: '💑',
    color: 'from-rose-300 to-pink-400'
  },
  { 
    date: '2018 - 2024', 
    title: 'Growing in Purity', 
    desc: 'Through every laugh and every challenge, your pure soul and sanskari grace have been my guiding light.', 
    icon: '📈',
    color: 'from-pink-400 to-rose-500'
  },
  { 
    date: 'February 13, 2026', 
    title: 'Today: Your Magic Day', 
    desc: 'Celebrating you, the girl who makes every day feel like May 3rd. Happy Birthday, my soulmate.', 
    icon: '🎂',
    color: 'from-rose-500 to-pink-600'
  }
];

const LoveStory: React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto py-24 px-6 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-pink-100/20 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-rose-100/20 rounded-full blur-3xl"></div>

      <div className="text-center mb-20 relative z-10">
        <h2 className="text-5xl md:text-6xl font-romantic text-pink-600 mb-4">Our Love Story</h2>
        <p className="text-pink-300 uppercase tracking-[0.5em] text-xs font-bold">Since May 2018 • Forever to go</p>
      </div>

      <div className="relative z-10">
        {/* Connection Line */}
        <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-pink-100 via-rose-300 to-pink-100 hidden md:block"></div>

        <div className="space-y-16">
          {storyMilestones.map((step, idx) => (
            <div key={idx} className={`flex flex-col md:flex-row items-center justify-center gap-8 md:gap-0 ${idx % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}>
              {/* Content Card */}
              <div className="w-full md:w-[45%]">
                <div className="glass-morphism p-8 md:p-12 rounded-[3rem] shadow-xl border border-white hover:border-pink-200 transition-all group transform hover:-translate-y-2 duration-500">
                  <div className="flex items-center gap-4 mb-4">
                    <span className="text-pink-400 font-bold text-sm tracking-widest">{step.date}</span>
                    <div className="h-px flex-1 bg-pink-50"></div>
                  </div>
                  <h4 className="text-2xl font-serif-title font-bold text-slate-800 mb-3 group-hover:text-pink-600 transition-colors">
                    {step.title}
                  </h4>
                  <p className="text-gray-600 italic leading-relaxed text-lg">
                    "{step.desc}"
                  </p>
                </div>
              </div>

              {/* Icon / Center Node */}
              <div className="relative w-20 h-20 md:w-24 md:h-24 flex-shrink-0 flex items-center justify-center z-20">
                <div className={`absolute inset-0 bg-gradient-to-br ${step.color} rounded-full blur-lg opacity-40 animate-pulse`}></div>
                <div className="relative w-full h-full bg-white rounded-full shadow-2xl border-4 border-pink-50 flex items-center justify-center text-3xl md:text-4xl group-hover:scale-125 transition-transform">
                  {step.icon}
                </div>
              </div>

              {/* Empty Spacer for Desktop */}
              <div className="hidden md:block w-[45%]"></div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="mt-20 text-center">
        <div className="inline-block glass-morphism px-8 py-4 rounded-full border border-pink-100 text-pink-400 font-romantic text-2xl animate-bounce">
          And the best is yet to come... ❤️
        </div>
      </div>
    </div>
  );
};

export default LoveStory;
