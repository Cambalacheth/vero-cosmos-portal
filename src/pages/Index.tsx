
import React, { useState, useEffect } from 'react';
import { Moon, Star, Sun } from 'lucide-react';
import BackgroundImage from '../components/BackgroundImage';
import Quote from '../components/Quote';
import { Link } from 'react-router-dom';

const Index = () => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <BackgroundImage>
      <div className="min-h-screen flex flex-col items-center justify-center px-4 py-10">
        <div 
          className={`w-full max-w-md mx-auto text-center transition-all duration-1000 delay-300 transform
                     ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
          <div className="flex justify-center items-center gap-2 mb-2 animate-float">
            <Star className="h-5 w-5 text-cosmos-gold" />
            <Moon className="h-5 w-5 text-cosmos-gold" />
            <Sun className="h-5 w-5 text-cosmos-gold" />
          </div>
          
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-playfair font-semibold tracking-tight mb-2 clip-text">
            Vero Cosmos
          </h1>
          
          <div className="h-px w-32 mx-auto bg-gradient-to-r from-transparent via-cosmos-gold to-transparent my-5" />
          
          <div className={`mt-6 mb-8 transition-all duration-1000 delay-700 ${loaded ? 'opacity-100' : 'opacity-0'}`}>
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
          
          <div className={`transition-all duration-1000 delay-500 ${loaded ? 'opacity-100' : 'opacity-0'}`}>
            <Quote />
          </div>
        </div>
      </div>
    </BackgroundImage>
  );
};

export default Index;
