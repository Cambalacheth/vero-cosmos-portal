
import React, { useState, useEffect } from 'react';
import BackgroundImage from '../components/BackgroundImage';
import NavBar from '../components/NavBar';

const Home = () => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <BackgroundImage fullHeight={false}>
        <div className="container mx-auto px-4 py-6">
          <div 
            className={`w-full transition-all duration-1000 delay-300 transform
                     ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
          >
            <h2 className="text-2xl text-center font-playfair font-semibold mb-6 clip-text">Tu Portal Cósmico</h2>
            
            {/* Daily card section */}
            <div className="glass-card p-4 mb-6 rounded-xl">
              <h3 className="text-xl font-playfair text-cosmos-darkGold mb-3">Tu Carta del Día</h3>
              <div className="h-52 bg-cosmos-pink bg-opacity-20 rounded-lg flex items-center justify-center">
                <p className="text-cosmos-darkGold font-medium">Toca para revelar</p>
              </div>
            </div>
            
            {/* Daily horoscope section */}
            <div className="glass-card p-4 mb-6 rounded-xl">
              <h3 className="text-xl font-playfair text-cosmos-darkGold mb-3">Clima Astral</h3>
              <p className="text-sm mb-3">Luna en Escorpio · Venus en Libra</p>
              <p className="italic text-sm">
                "Hoy es un día ideal para conectar con tus emociones profundas y compartirlas con personas cercanas."
              </p>
            </div>
            
            {/* Quick tarot reading button */}
            <div className="flex justify-center mt-6">
              <button className="button-effect px-6 py-2 glass-card rounded-full text-cosmos-darkGold border border-cosmos-pink">
                Tirada Rápida de Tarot
              </button>
            </div>
          </div>
        </div>
      </BackgroundImage>
      <NavBar />
    </div>
  );
};

export default Home;
