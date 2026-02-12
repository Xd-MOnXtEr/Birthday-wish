
import React from 'react';

const newPhotos = [
  {
    url: "https://image2url.com/r2/default/images/1770917935770-63fad156-04f4-4dde-a1a9-daefed8e6b8c.jpeg",
    caption: "A Vision of Grace",
    rotation: "-rotate-2"
  },
  {
    url: "https://image2url.com/r2/default/images/1770918021976-8ebffd3d-5407-4479-9686-b3892354eba6.jpeg",
    caption: "The Light of My Life",
    rotation: "rotate-3"
  },
  {
    url: "https://image2url.com/r2/default/images/1770918066420-9f7d8235-a6f3-4ef6-a69e-7d4922f91f52.jpeg",
    caption: "Purely Perfect",
    rotation: "-rotate-1"
  }
];

const MemoryScrapbook: React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto py-32 px-6">
      <div className="text-center mb-24">
        <h2 className="text-5xl md:text-7xl font-romantic text-pink-600 mb-4">Captured Moments</h2>
        <p className="text-gray-400 text-xs font-bold tracking-[0.6em] uppercase italic">Unspoken Conversations</p>
        <div className="w-24 h-1 bg-pink-100 mx-auto mt-6 rounded-full"></div>
      </div>

      <div className="space-y-48">
        {newPhotos.map((photo, idx) => (
          <div 
            key={idx} 
            className={`flex flex-col md:flex-row items-center gap-16 ${idx % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}
          >
            <div className={`w-full md:w-1/2 relative group transition-all duration-700 ease-out hover:z-30`}>
              <div className={`relative bg-white p-4 pb-16 shadow-2xl rounded-sm border border-gray-100 ${photo.rotation} group-hover:rotate-0 group-hover:scale-105 transition-all duration-500`}>
                <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-32 h-10 bg-pink-50/70 backdrop-blur-sm -rotate-2 z-20 border border-white/50 shadow-sm flex items-center justify-center">
                   <div className="w-full h-px bg-pink-100/50"></div>
                </div>
                
                <img 
                  src={photo.url} 
                  alt={photo.caption} 
                  className="w-full h-auto block rounded-sm"
                  loading="lazy"
                />
                
                <div className="absolute bottom-6 left-0 right-0 text-center font-romantic text-3xl text-pink-500/80">
                  {photo.caption}
                </div>
              </div>
              
              <div className="absolute -bottom-10 -right-10 text-6xl opacity-20 group-hover:opacity-100 transition-opacity animate-float">🌸</div>
              <div className="absolute -top-10 -left-10 text-6xl opacity-20 group-hover:opacity-100 transition-opacity animate-float" style={{ animationDelay: '1s' }}>✨</div>
            </div>

            <div className="w-full md:w-1/2 space-y-8 animate__animated animate__fadeIn">
              <div className="space-y-4">
                <span className="text-pink-300 text-xs font-bold tracking-[0.4em] uppercase">Reflections of Soul</span>
                <h3 className="text-4xl font-serif-title font-bold text-slate-800 italic">
                  {idx === 0 && "The Whisper of Connection"}
                  {idx === 1 && "Eternal Luminance"}
                  {idx === 2 && "A Sacred Stillness"}
                </h3>
              </div>
              <p className="text-xl text-gray-600 leading-relaxed italic font-light font-serif-title">
                {idx === 0 && "In this capture, I see the quiet strength that defines you. It's the way you carry yourself with a dignity that requires no audience—a beauty that flows from within and touches everyone lucky enough to know you."}
                {idx === 1 && "There's a light in your eyes that seems to come from a place of ancient wisdom. It’s the kind of glow that makes me believe that everything in the world might just turn out alright, as long as you're by my side."}
                {idx === 2 && "This moment captures the perfect peace you bring into my life. Your heart isn't just a place I love; it's the very foundation of my happiness. I am so grateful for every silent second we share."}
              </p>
              <div className="pt-6 border-t border-pink-50 flex items-center gap-4">
                 <div className="text-pink-500 font-romantic text-2xl">Forever starts with you.</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MemoryScrapbook;
