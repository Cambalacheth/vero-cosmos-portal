
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { cosmicMaps, MapType } from '@/lib/map-types';
import { Lock, Calendar, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

const MapsGrid: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleMapClick = (map: MapType) => {
    if (map.available) {
      navigate(map.route);
    } else {
      toast({
        title: "Próximamente",
        description: `El ${map.title} estará disponible muy pronto. ¡Mantente atento!`,
        variant: "default",
      });
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {cosmicMaps.map((map) => (
        <div 
          key={map.id}
          className={`glass-card p-5 rounded-xl transition-all duration-300 hover:shadow-lg
                     ${map.available ? 'cursor-pointer' : 'opacity-80'}`}
          onClick={() => handleMapClick(map)}
        >
          <div className="flex items-center space-x-4 mb-3">
            <div className={`flex justify-center items-center w-12 h-12 rounded-lg bg-gradient-to-br ${map.color} text-white text-2xl`}>
              {map.icon}
            </div>
            <div>
              <h3 className="text-xl font-playfair text-cosmos-darkGold flex items-center">
                {map.title}
                {map.isPremium && <Lock className="ml-2 h-4 w-4" />}
                {!map.available && map.comingSoon && <Calendar className="ml-2 h-4 w-4" />}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">{map.description}</p>
            </div>
          </div>
          
          <div className="mt-4 flex justify-end">
            <Button
              variant={map.available ? "default" : "outline"}
              className={`px-4 py-2 rounded-lg ${map.available ? 'bg-cosmos-pink bg-opacity-20 text-cosmos-darkGold border border-cosmos-pink' : 'text-gray-500'}`}
              disabled={!map.available}
            >
              {map.available ? (
                <>Explorar <ArrowRight className="ml-2 h-4 w-4" /></>
              ) : (
                'Próximamente'
              )}
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MapsGrid;
