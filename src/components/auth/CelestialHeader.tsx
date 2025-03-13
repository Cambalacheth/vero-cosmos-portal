
import React from 'react';
import { Star, Moon } from 'lucide-react';

const CelestialHeader: React.FC = () => {
  return (
    <>
      <div className="celestial-icons flex justify-center items-center gap-3 mb-4">
        <Star className="h-6 w-6 text-cosmos-gold animate-twinkle" />
        <Moon className="h-8 w-8 text-cosmos-gold animate-float" />
        <Star className="h-6 w-6 text-cosmos-gold animate-twinkle" />
      </div>
      
      <div className="bg-black/30 backdrop-blur-sm py-4 px-2 rounded-lg mb-5">
        <h1 className="text-4xl sm:text-5xl font-playfair font-semibold tracking-tight mb-2 text-white text-shadow-lg">
          Vero Cosmos
        </h1>
      </div>
      
      <div className="h-px w-32 mx-auto bg-gradient-to-r from-transparent via-cosmos-gold to-transparent my-5" />
    </>
  );
};

export default CelestialHeader;
