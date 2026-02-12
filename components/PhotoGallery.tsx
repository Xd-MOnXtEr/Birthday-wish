
import React from 'react';
import { Photo } from '../types';
import confetti from 'canvas-confetti';

interface PhotoGalleryProps {
  photos: Photo[];
}

const PhotoGallery: React.FC<PhotoGalleryProps> = ({ photos }) => {
  const handlePhotoHover = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (rect.left + rect.width / 2) / window.innerWidth;
    const y = (rect.top + rect.height / 2) / window.innerHeight;

    confetti({
      particleCount: 12,
      spread: 45,
      origin: { x, y },
      colors: ['#f472b6', '#fb7185', '#fda4af', '#ffffff'],
      ticks: 60,
      gravity: 1.5,
      scalar: 0.6, // Smaller, more delicate particles
      shapes: ['circle']
    });
  };

  return (
    <div className="max-w-6xl mx-auto mb-20 px-4">
      <div className="text-center mb-12 animate__animated animate__fadeIn">
        <h2 className="text-4xl md:text-5xl font-romantic text-pink-600 mb-2">Our Beautiful Memories</h2>
        <div className="h-1 w-20 bg-pink-200 mx-auto rounded-full"></div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {photos.length > 0 ? (
          photos.map((photo, index) => (
            <div 
              key={photo.id} 
              onMouseEnter={handlePhotoHover}
              className={`photo-frame glass-morphism p-4 rounded-lg animate__animated animate__fadeInUp cursor-pointer`}
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="relative bg-neutral-50 rounded overflow-hidden aspect-[4/5] flex items-center justify-center border border-pink-50">
                <img 
                  src={photo.url} 
                  alt={photo.caption} 
                  className="max-w-full max-h-full object-contain transition-transform duration-700 hover:scale-110" 
                />
              </div>
              <div className="pt-6 pb-2 px-2 text-center">
                <p className="font-romantic text-2xl text-pink-600 mb-1">{photo.caption}</p>
                <div className="text-[10px] uppercase tracking-widest text-pink-300">Sneha • Forever</div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full py-20 text-center text-pink-300 italic animate-pulse">
            Curating your beautiful journey...
          </div>
        )}
      </div>
    </div>
  );
};

export default PhotoGallery;
