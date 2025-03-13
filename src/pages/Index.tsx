
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
        backgroundImageUrl="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
        usePlainBackground={false}
      >
        <div className="min-h-screen flex flex-col items-center justify-center px-4 py-10 relative z-10">
          <div 
            className={`w-full max-w-md mx-auto text-center transition-all duration-1000 delay-300 transform
                       ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
          >
            <div className="celestial-icons flex justify-center items-center gap-3 mb-4">
              <Star className="h-6 w-6 text-cosmos-darkGold animate-twinkle" />
              <Moon className="h-8 w-8 text-cosmos-darkGold animate-float" />
              <Sun className="h-10 w-10 text-cosmos-darkGold animate-pulse" />
              <Star className="h-6 w-6 text-cosmos-darkGold animate-twinkle" />
            </div>
            
            <div className="bg-black/30 backdrop-blur-sm py-4 px-2 rounded-lg">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-playfair font-semibold tracking-tight mb-2 text-white text-shadow-lg">
                Vero Cosmos
              </h1>
              
              <p className="text-white text-lg mb-4 font-nunito">
                Tu portal al universo astrológico
              </p>
            </div>
            
            <div className="h-px w-32 mx-auto bg-gradient-to-r from-transparent via-cosmos-gold to-transparent my-5" />
            
            <div className="flex gap-4 justify-center mb-6">
              <div className="feature-badge glass-card px-3 py-2 flex flex-col items-center bg-black/40">
                <Sparkles className="h-5 w-5 text-cosmos-gold mb-1" />
                <span className="text-xs text-white">Horóscopo</span>
              </div>
              <div className="feature-badge glass-card px-3 py-2 flex flex-col items-center bg-black/40">
                <Moon className="h-5 w-5 text-cosmos-gold mb-1" />
                <span className="text-xs text-white">Tarot</span>
              </div>
              <div className="feature-badge glass-card px-3 py-2 flex flex-col items-center bg-black/40">
                <Sun className="h-5 w-5 text-cosmos-gold mb-1" />
                <span className="text-xs text-white">Carta Natal</span>
              </div>
            </div>
            
            <div className={`mb-3 transition-all duration-1000 delay-700 ${loaded ? 'opacity-100' : 'opacity-0'}`}>
              <Link to="/auth?mode=login">
                <button 
                  className="button-effect group relative px-8 py-3 glass-card border-cosmos-pink border overflow-hidden rounded-full w-full mb-3 bg-black/50"
                >
                  <span className="relative z-10 font-medium text-white group-hover:text-white transition-colors duration-300">
                    Ingresar
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-cosmos-gold to-cosmos-darkGold opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full"></div>
                </button>
              </Link>
              
              <Link to="/auth?mode=register">
                <button 
                  className="button-effect group relative px-8 py-3 glass-card border-cosmos-gold border overflow-hidden rounded-full w-full bg-black/50"
                >
                  <span className="relative z-10 font-medium text-white group-hover:text-white transition-colors duration-300">
                    Regístrate aquí
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-cosmos-gold to-cosmos-darkGold opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full"></div>
                </button>
              </Link>
            </div>
            
            <div className={`transition-all duration-1000 delay-500 ${loaded ? 'opacity-100' : 'opacity-0'}`}>
              <div className="bg-black/40 p-3 rounded-lg">
                <Quote />
              </div>
            </div>
          </div>
        </div>
      </BackgroundImage>
    </div>
  );
};

export default Index;
