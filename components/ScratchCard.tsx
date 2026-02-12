
import React, { useState, useRef, useEffect } from 'react';
import { generateScratchMessage } from '../services/geminiService';

const ScratchCard: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const [message, setMessage] = useState<string>("Loading your surprise...");
  const [isScratching, setIsScratching] = useState(false);

  useEffect(() => {
    const fetchMsg = async () => {
      const msg = await generateScratchMessage();
      setMessage(msg);
      // Wait a tiny bit for the message state to propagate before allowing draw logic
      setTimeout(() => initCanvas(), 100);
    };
    fetchMsg();
  }, []);

  const initCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear just in case
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Fill with gold/pink gradient
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0, '#f472b6');
    gradient.addColorStop(0.5, '#fb7185');
    gradient.addColorStop(1, '#f472b6');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Add text overlay
    ctx.fillStyle = "white";
    ctx.font = "bold 20px Quicksand";
    ctx.textAlign = "center";
    ctx.fillText("SCRATCH ME!", canvas.width / 2, canvas.height / 2 + 8);
    
    // Add sparkles
    for(let i=0; i<30; i++) {
        ctx.fillStyle = "rgba(255,255,255,0.3)";
        ctx.beginPath();
        ctx.arc(Math.random()*canvas.width, Math.random()*canvas.height, Math.random()*2, 0, Math.PI*2);
        ctx.fill();
    }
  };

  const scratch = (e: any) => {
    const canvas = canvasRef.current;
    if (!canvas || isRevealed) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX || (e.touches && e.touches[0].clientX)) - rect.left;
    const y = (e.clientY || (e.touches && e.touches[0].clientY)) - rect.top;

    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(x, y, 25, 0, Math.PI * 2);
    ctx.fill();

    checkReveal();
  };

  const checkReveal = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    let transparentPixels = 0;
    for (let i = 0; i < imageData.data.length; i += 4) {
      if (imageData.data[i + 3] < 128) transparentPixels++;
    }
    const percent = (transparentPixels / (canvas.width * canvas.height)) * 100;
    if (percent > 40) setIsRevealed(true);
  };

  return (
    <div className="max-w-md mx-auto py-24 px-6 text-center">
      <div className="mb-8">
        <h3 className="text-3xl font-romantic text-pink-600 mb-2">Sneha's Secret Luck</h3>
        <p className="text-gray-400 text-xs uppercase tracking-widest">Scratch to see what you've won today</p>
      </div>

      <div className="relative w-full h-48 bg-pink-50 rounded-3xl border-4 border-white shadow-2xl flex items-center justify-center p-6 overflow-hidden">
        {/* Hidden Content */}
        <div className="animate__animated animate__fadeIn flex flex-col items-center">
            <div className="text-4xl mb-4">🏆</div>
            <p className="text-lg font-serif-title italic text-pink-700 leading-relaxed px-4">
              "{message}"
            </p>
        </div>

        {/* Scratch Layer */}
        <canvas 
          ref={canvasRef}
          width={400}
          height={200}
          className={`absolute inset-0 w-full h-full cursor-crosshair transition-opacity duration-1000 ${isRevealed ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
          onMouseDown={() => setIsScratching(true)}
          onMouseUp={() => setIsScratching(false)}
          onMouseMove={(e) => isScratching && scratch(e)}
          onTouchStart={() => setIsScratching(true)}
          onTouchEnd={() => setIsScratching(false)}
          onTouchMove={(e) => isScratching && scratch(e)}
        />
      </div>
    </div>
  );
};

export default ScratchCard;
