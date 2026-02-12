
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { AppState, Photo, WishData } from './types';
import { generateSnehaWishes } from './services/geminiService';
import FloatingHearts from './components/FloatingHearts';
import PhotoGallery from './components/PhotoGallery';
import VirtualCake from './components/VirtualCake';
import AgeClock from './components/AgeClock';
import Timeline from './components/Timeline';
import LoveStory from './components/LoveStory';
import ComplimentGenerator from './components/ComplimentGenerator';
import SoulmateStats from './components/SoulmateStats';
import MysteryGift from './components/MysteryGift';
import FlowerGarden from './components/FlowerGarden';
import FutureDreams from './components/FutureDreams';
import MemoryScrapbook from './components/MemoryScrapbook';
import MessageBottle from './components/MessageBottle';
import LoveJar from './components/LoveJar';
import ScratchCard from './components/ScratchCard';
import HeartbeatRhythm from './components/HeartbeatRhythm';
import InteractiveConstellation from './components/InteractiveConstellation';
import confetti from 'canvas-confetti';

const STORAGE_KEY = 'sneha_birthday_photos_v2';
const AUDIO_URL = 'https://image2url.com/r2/default/audio/1770921950890-76bea475-91d7-4270-bde1-4c32fdd69705.mp3';

const ExpandableReason: React.FC<{ reason: string }> = ({ reason }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  const firstSentenceMatch = reason.match(/^[^.!?]+[.!?]/);
  const firstSentence = firstSentenceMatch ? firstSentenceMatch[0] : reason;
  const restOfText = firstSentenceMatch ? reason.slice(firstSentenceMatch[0].length).trim() : "";

  return (
    <div className="glass-morphism p-10 rounded-[2.5rem] border border-white hover:border-pink-100 transition-all flex flex-col h-full">
      <div className="flex-1">
        <p className="text-gray-700 text-xl italic leading-relaxed">
          "{isExpanded ? reason : firstSentence}"
        </p>
      </div>
      {restOfText && (
        <button 
          onClick={() => setIsExpanded(!isExpanded)}
          className="mt-6 text-pink-500 font-bold text-xs uppercase tracking-widest hover:text-pink-700 transition-colors flex items-center gap-2 group w-fit"
        >
          {isExpanded ? "Show Less" : "Read More"}
          <span className={`transition-transform duration-300 ${isExpanded ? 'rotate-180' : 'group-hover:translate-y-1'}`}>
            {isExpanded ? '↑' : '↓'}
          </span>
        </button>
      )}
    </div>
  );
};

const App: React.FC = () => {
  const [state, setState] = useState<AppState>('LOCKED');
  const [wishes, setWishes] = useState<WishData | null>(null);
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const name = "Sneha";
  
  const handleSparkleHover = useCallback((e: React.MouseEvent) => {
    for (let i = 0; i < 3; i++) {
      const sparkle = document.createElement('div');
      sparkle.className = 'sparkle-particle';
      const size = Math.random() * 8 + 4;
      sparkle.style.width = `${size}px`;
      sparkle.style.height = `${size}px`;
      const offsetX = (Math.random() - 0.5) * 40;
      const offsetY = (Math.random() - 0.5) * 40;
      sparkle.style.left = `${e.clientX + offsetX}px`;
      sparkle.style.top = `${e.clientY + offsetY}px`;
      document.body.appendChild(sparkle);
      setTimeout(() => sparkle.remove(), 600);
    }
  }, []);

  const scrollToId = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const fetchWishes = async () => {
      setLoading(true);
      const data = await generateSnehaWishes(name);
      setWishes(data);
      setLoading(false);
    };
    fetchWishes();
    loadDefaultPhotos();

    // Setup background audio
    const audio = new Audio(AUDIO_URL);
    audio.loop = true;
    audioRef.current = audio;

    // Subtle initial hint of magic
    confetti({
      particleCount: 20,
      spread: 40,
      origin: { y: 0.8 },
      colors: ['#fbcfe8', '#ffffff'],
      scalar: 0.5,
      gravity: 0.7
    });

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const loadDefaultPhotos = () => {
    const defaults = [
      { id: '1', url: 'https://image2url.com/r2/default/images/1770913108995-e99a5087-afda-421b-99cc-ed06b7c74c92.jpeg', caption: 'Your Radiant Smile' },
      { id: '2', url: 'https://image2url.com/r2/default/images/1770912872266-6e34b0d6-adc5-4b58-bb27-375a1cc3c7b4.jpeg', caption: 'Elegance and Grace' },
      { id: '3', url: 'https://image2url.com/r2/default/images/1770913002992-4c287a90-21e3-4b57-af71-f612d6f5e90d.jpeg', caption: 'Pure Innocence' },
      { id: '4', url: 'https://image2url.com/r2/default/images/1770913049620-f5af29d9-9777-4d0e-86ec-2a94b7318dd4.jpeg', caption: 'My Perfect Partner' },
    ];
    setPhotos(defaults);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(defaults));
  };

  const handleEnter = () => {
    setState('CELEBRATION');
    
    // Play the audio
    if (audioRef.current) {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(error => {
        console.error("Audio playback failed:", error);
      });
    }
    
    const duration = 4 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 25, spread: 360, ticks: 120, zIndex: 0, scalar: 0.5, gravity: 0.6 };
    const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

    const interval: any = setInterval(function() {
      const timeLeft = animationEnd - Date.now();
      if (timeLeft <= 0) return clearInterval(interval);
      confetti({ ...defaults, particleCount: 15, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
      confetti({ ...defaults, particleCount: 15, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
    }, 500);
    
    setTimeout(() => {
      scrollToId('wishes-section');
    }, 1200);
  };

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <div className="min-h-screen relative overflow-x-hidden selection:bg-pink-100 text-slate-800">
      <FloatingHearts />

      {state !== 'LOCKED' && (
        <>
          <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-[60] glass-morphism px-8 py-3 rounded-full border border-pink-100 shadow-2xl flex items-center gap-6 animate__animated animate__fadeInDown">
            {[
              { id: 'reasons-section', label: 'Reasons' },
              { id: 'story-section', label: 'Story' },
              { id: 'pulse-section', label: 'Pulse' },
              { id: 'gallery-section', label: 'Memories' },
              { id: 'cake-section', label: 'Cake' }
            ].map((link) => (
              <button 
                key={link.id}
                onClick={() => scrollToId(link.id)}
                className="text-[10px] uppercase tracking-widest font-bold text-pink-400 hover:text-pink-600 transition-colors"
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Floating Audio Controls */}
          <div className="fixed bottom-6 right-6 z-[60] flex items-center gap-2 animate__animated animate__fadeInUp">
            <button 
              onClick={toggleMute}
              className="w-10 h-10 glass-morphism rounded-full flex items-center justify-center text-pink-500 border border-pink-100 shadow-lg hover:scale-110 transition-transform"
            >
              {isMuted ? '🔇' : '🔊'}
            </button>
            <button 
              onClick={togglePlay}
              className="w-12 h-12 glass-morphism rounded-full flex items-center justify-center text-pink-500 border border-pink-100 shadow-lg hover:scale-110 transition-transform"
            >
              {isPlaying ? '⏸' : '▶️'}
            </button>
          </div>
        </>
      )}
      
      <section id="top" className={`h-screen flex flex-col items-center justify-center px-4 transition-all duration-1000 ${state !== 'LOCKED' ? 'opacity-0 scale-110 pointer-events-none absolute' : 'opacity-100 scale-100'}`}>
        <div className="text-center space-y-10 max-w-2xl animate__animated animate__fadeIn">
          <div className="space-y-4">
            <h2 className="text-pink-400 text-xs font-bold tracking-[0.5em] uppercase animate__animated animate__fadeInDown">A Lifetime in a Moment</h2>
            <h1 className="text-8xl md:text-9xl font-elegant text-pink-600 drop-shadow-2xl hover:scale-105 transition-transform cursor-default">Sneha</h1>
          </div>
          <div className="glass-morphism p-8 rounded-3xl border border-white/40 shadow-2xl relative group">
            <p className="text-gray-700 italic text-xl leading-relaxed font-light">
              "Meeting you was like finding a song I had known the words to all my life, but had never heard the music."
            </p>
          </div>
          <button 
            onClick={handleEnter}
            onMouseMove={handleSparkleHover}
            className="group relative mt-12 px-14 py-6 bg-gradient-to-br from-pink-500 via-rose-500 to-pink-600 text-white rounded-full font-bold shadow-2xl hover:shadow-pink-300 hover:scale-105 transition-all"
          >
            Unlock the Birthday Magic <span className="animate-pulse">🌸</span>
          </button>
        </div>
      </section>

      {state !== 'LOCKED' && (
        <main className="relative z-10">
          <section id="wishes-section" className="min-h-screen flex flex-col items-center justify-center p-6 text-center">
            <h1 onMouseMove={handleSparkleHover} className="text-6xl md:text-8xl font-romantic text-pink-600 leading-tight mb-8">
              Happy Birthday, <br/><span className="italic text-rose-400">Sneha!</span>
            </h1>
            {loading ? <p className="animate-pulse">Weaving magic...</p> : wishes && (
              <div className="glass-morphism p-12 rounded-[40px] shadow-2xl border border-white max-w-3xl mx-auto space-y-8">
                <p className="text-3xl font-romantic text-pink-700 italic">"{wishes.poem}"</p>
                <p className="text-gray-600 text-xl font-light">{wishes.message}</p>
              </div>
            )}
          </section>

          <AgeClock />
          <SoulmateStats />
          <ComplimentGenerator />
          <LoveJar />

          <section id="reasons-section" className="py-24 px-6 bg-pink-50/20 scroll-mt-24">
            <div className="max-w-5xl mx-auto text-center mb-16">
               <h2 className="text-5xl font-romantic text-pink-600">Why You Are My One</h2>
               <div className="h-1 w-16 bg-pink-200 mx-auto mt-4 rounded-full"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-6xl mx-auto">
              {wishes?.reasons.map((reason, idx) => (
                <ExpandableReason key={idx} reason={reason} />
              ))}
            </div>
          </section>

          <section id="story-section" className="scroll-mt-24">
            <LoveStory />
          </section>

          <FlowerGarden />
          <MemoryScrapbook />

          <section id="pulse-section" className="scroll-mt-24 py-12">
            <HeartbeatRhythm />
            <InteractiveConstellation />
          </section>

          <section id="gallery-section" className="scroll-mt-24">
            <PhotoGallery photos={photos} />
          </section>

          <FutureDreams />
          {/* Fix: use correct casing for ScratchCard component */}
          <ScratchCard />
          <MessageBottle />
          <MysteryGift />

          <section className="py-24 px-6 bg-pink-50/10">
            <div className="glass-morphism p-12 md:p-20 rounded-[4rem] shadow-2xl max-w-4xl mx-auto text-center relative border border-white">
              <h2 className="text-4xl font-romantic text-pink-600 mb-8">A Letter of Love</h2>
              <div className="space-y-6 text-xl text-slate-700 italic leading-loose">
                <p>"In a world of temporary things, you are a feeling that lasts forever. You aren't just the love of my life; you are the life of my love. Happy Birthday to the girl who makes my soul feel like it finally found its way home."</p>
              </div>
            </div>
          </section>

          <section id="cake-section" className="scroll-mt-24">
            <VirtualCake />
          </section>

          <footer className="py-40 text-center relative">
            <div className="max-w-2xl mx-auto space-y-8">
              <div className="text-7xl animate-float inline-block">💝</div>
              <h3 className="text-5xl font-romantic text-pink-600">Always Yours.</h3>
              <p className="text-gray-400 text-xs font-bold tracking-[0.6em] uppercase">Sneha • 13.02.2026</p>
              <button 
                onClick={() => scrollToId('top')} 
                className="mt-8 px-8 py-3 rounded-full border border-pink-200 text-pink-400 hover:bg-pink-500 hover:text-white transition-all text-xs uppercase font-bold tracking-widest"
              >
                Relive the Magic
              </button>
            </div>
          </footer>
        </main>
      )}
    </div>
  );
};

export default App;
