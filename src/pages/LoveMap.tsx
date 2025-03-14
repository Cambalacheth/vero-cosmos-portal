
import React, { useState, useEffect } from 'react';
import BackgroundImage from '@/components/BackgroundImage';
import NavBar from '@/components/NavBar';
import { useAuth } from '@/contexts/AuthContext';
import ThemeToggleButton from '@/components/ThemeToggleButton';
import MapComingSoon from '@/components/maps/MapComingSoon';

const LoveMap = () => {
  const [loaded, setLoaded] = useState(false);
  const { session, loading } = useAuth();

  useEffect(() => {
    setLoaded(true);
    // Authentication check removed
  }, [loading, session]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <BackgroundImage fullHeight={false} usePlainBackground={true}>
        <ThemeToggleButton />
        <div className="container mx-auto px-4 py-6 pb-20">
          <div 
            className={`w-full transition-all duration-1000 delay-300 transform
                     ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl text-center font-playfair font-semibold glass-text px-4 py-2 rounded-lg">
                Mapa de Amor Astrológico
              </h2>
            </div>
            
            <MapComingSoon mapId="love" title="Mapa de Amor Astrológico" />
          </div>
        </div>
      </BackgroundImage>
      <NavBar />
    </div>
  );
};

export default LoveMap;
