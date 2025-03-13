
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import BackgroundImage from '@/components/BackgroundImage';
import { ThemeToggleButton } from '@/components/ThemeToggleButton';

const Index = () => {
  const navigate = useNavigate();

  return (
    <BackgroundImage fullHeight={true}>
      <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center">
        <div className="absolute top-4 right-4">
          <ThemeToggleButton />
        </div>
        
        <div className="glass-card p-8 sm:p-12 rounded-xl max-w-lg mx-auto bg-black/40 backdrop-blur-lg">
          <div className="mb-6">
            <h1 className="text-4xl sm:text-5xl font-playfair font-bold mb-2 text-white">
              <span className="clip-text bg-gradient-to-r from-cosmos-gold to-cosmos-darkGold text-transparent bg-clip-text">Cosmos</span>
            </h1>
            <p className="text-lg sm:text-xl font-medium text-cosmos-gold">Tu guía astrológica personal</p>
          </div>
          
          <p className="mb-8 text-white text-base sm:text-lg">
            Descubre los secretos de los astros, conecta con tu energía interior 
            y encuentra tu camino a través de las estrellas.
          </p>
          
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 justify-center">
            <Button 
              onClick={() => navigate('/auth')}
              className="bg-gradient-to-r from-cosmos-gold to-cosmos-darkGold text-white px-6 py-2 hover:opacity-90"
            >
              Comenzar
            </Button>
            <Button 
              variant="outline"
              onClick={() => navigate('/auth')}
              className="border-cosmos-pink text-cosmos-gold px-6 py-2 hover:bg-cosmos-pink/10"
            >
              Iniciar Sesión
            </Button>
          </div>
        </div>
      </div>
    </BackgroundImage>
  );
};

export default Index;
