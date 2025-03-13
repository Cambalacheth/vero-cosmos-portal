
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import BackgroundImage from '@/components/BackgroundImage';
import NavBar from '@/components/NavBar';
import { useAuth } from '@/contexts/AuthContext';
import ThemeToggleButton from '@/components/ThemeToggleButton';
import { getMapById } from '@/lib/map-types';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import MapComparison from '@/components/maps/MapComparison';

const MapComparisonPage = () => {
  const [loaded, setLoaded] = useState(false);
  const { mapId } = useParams<{ mapId: string }>();
  const { session, loading } = useAuth();
  const navigate = useNavigate();
  const mapInfo = mapId ? getMapById(mapId) : null;

  useEffect(() => {
    setLoaded(true);
    
    // Redirect to auth page if user is not logged in
    if (!loading && !session) {
      navigate('/auth');
      return;
    }
  }, [loading, session, navigate]);

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
              <Button 
                variant="ghost" 
                className="text-cosmos-darkGold" 
                onClick={() => navigate('/mapas')}
              >
                <ArrowLeft className="mr-2 h-4 w-4" /> Volver a Mapas
              </Button>
              <h2 className="text-2xl text-center font-playfair font-semibold glass-text px-4 py-2 rounded-lg">
                Comparación de {mapInfo?.title || 'Mapa'}
              </h2>
            </div>
            
            {mapId ? (
              <MapComparison mapId={mapId} />
            ) : (
              <div className="glass-card p-5 rounded-xl text-center">
                <p>Selecciona un mapa para comparar</p>
                <Button 
                  className="mt-4" 
                  onClick={() => navigate('/mapas')}
                >
                  Ver Mapas Disponibles
                </Button>
              </div>
            )}
          </div>
        </div>
      </BackgroundImage>
      <NavBar />
    </div>
  );
};

export default MapComparisonPage;
