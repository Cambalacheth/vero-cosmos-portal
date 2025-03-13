
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MapType } from '@/lib/map-types';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Calendar } from 'lucide-react';

interface MapComingSoonProps {
  mapId: string;
  title?: string;
}

const MapComingSoon: React.FC<MapComingSoonProps> = ({ mapId, title }) => {
  const navigate = useNavigate();
  
  return (
    <div className="space-y-6">
      <div className="glass-card p-5 rounded-xl">
        <h3 className="text-xl font-playfair text-cosmos-darkGold mb-2 flex items-center">
          <Calendar className="mr-2 h-5 w-5" />
          Próximamente
        </h3>
        <p className="text-sm mb-4">
          Estamos trabajando en el {title || `mapa de ${mapId}`}. Muy pronto podrás explorarlo y descubrir 
          nuevas dimensiones de tu potencial cósmico.
        </p>
        
        <div className="mt-8 space-y-4">
          <div className="relative p-6 border border-dashed border-cosmos-pink/30 rounded-lg bg-cosmos-pink/5 flex justify-center items-center">
            <div className="text-center">
              <p className="text-lg font-playfair text-cosmos-darkGold mb-2">
                ¡Mantente atento!
              </p>
              <p className="text-sm max-w-md mx-auto">
                Estamos perfeccionando este mapa para brindarte la mejor experiencia.
                Mientras tanto, explora los otros mapas disponibles.
              </p>
            </div>
          </div>
          
          <Button
            className="w-full button-effect px-4 py-2 bg-cosmos-pink bg-opacity-20 rounded-lg text-cosmos-darkGold border border-cosmos-pink"
            onClick={() => navigate('/mapas')}
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> Ver todos los mapas
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MapComingSoon;
