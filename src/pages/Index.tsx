
import React, { useState, useEffect } from 'react';
import { Moon, Star, Sun, Sparkles } from 'lucide-react';
import BackgroundImage from '../components/BackgroundImage';
import Quote from '../components/Quote';
import { Link } from 'react-router-dom';
import StarryBackground from '../components/StarryBackground';

const Index = () => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <div className="relative w-full overflow-hidden">
      <StarryBackground />
      <BackgroundImage 
        backgroundImageUrl="https://images.unsplash.com/photo-1492321936769-b49830bc1d1e?auto=format&fit=crop&q=80"
        usePlainBackground={false}
      >
        <div className="min-h-screen flex flex-col items-center justify-center px-4 py-10 relative z-10">
          <div 
            className={`w-full max-w-md mx-auto text-center transition-all duration-1000 delay-300 transform
                       ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
          >
            <div className="celestial-icons flex justify-center items-center gap-3 mb-4">
              <Star className="h-6 w-6 text-cosmos-gold animate-twinkle" />
              <Moon className="h-8 w-8 text-cosmos-gold animate-float" />
              <Sun className="h-10 w-10 text-cosmos-gold animate-pulse" />
              <Star className="h-6 w-6 text-cosmos-gold animate-twinkle" />
            </div>
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-playfair font-semibold tracking-tight mb-2 text-cosmos-darkGold text-shadow-lg">
              Vero Cosmos
            </h1>
            
            <p className="text-cosmos-darkGold text-lg mb-4 font-nunito">
              Tu portal al universo astrológico
            </p>
            
            <div className="h-px w-32 mx-auto bg-gradient-to-r from-transparent via-cosmos-gold to-transparent my-5" />
            
            <div className="flex gap-4 justify-center mb-6">
              <div className="feature-badge glass-card px-3 py-2 flex flex-col items-center">
                <Sparkles className="h-5 w-5 text-cosmos-gold mb-1" />
                <span className="text-xs text-cosmos-darkGold">Horóscopo</span>
              </div>
              <div className="feature-badge glass-card px-3 py-2 flex flex-col items-center">
                <Moon className="h-5 w-5 text-cosmos-gold mb-1" />
                <span className="text-xs text-cosmos-darkGold">Tarot</span>
              </div>
              <div className="feature-badge glass-card px-3 py-2 flex flex-col items-center">
                <Sun className="h-5 w-5 text-cosmos-gold mb-1" />
                <span className="text-xs text-cosmos-darkGold">Carta Natal</span>
              </div>
            </div>
            
            <div className={`mb-6 transition-all duration-1000 delay-700 ${loaded ? 'opacity-100' : 'opacity-0'}`}>
              <Link to="/home">
                <button 
                  className="button-effect group relative px-8 py-3 glass-card border-cosmos-pink border overflow-hidden rounded-full"
                >
                  <span className="relative z-10 font-medium text-cosmos-darkGold group-hover:text-white transition-colors duration-300">
                    Conoce tu Destino
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-cosmos-gold to-cosmos-darkGold opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full"></div>
                </button>
              </Link>
            </div>
            
            <div className="users-counter text-sm text-cosmos-darkGold mb-4">
              <span className="font-semibold">+5,000</span> personas ya descubrieron su camino
            </div>
            
            <div className={`transition-all duration-1000 delay-500 ${loaded ? 'opacity-100' : 'opacity-0'}`}>
              <Quote />
            </div>
          </div>
        </div>
      </BackgroundImage>
    </div>
  );
};

export default Index;
