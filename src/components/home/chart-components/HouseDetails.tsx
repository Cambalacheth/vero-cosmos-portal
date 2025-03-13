
import React from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { HousePosition, PlanetaryPosition } from '@/lib/natal-chart';

interface HouseDetailsProps {
  houses: HousePosition[];
  planetsByHouse: Record<number, PlanetaryPosition[]>;
  expandedSection: string | null;
  toggleSection: (section: string) => void;
}

// Description of houses
const getHouseDescription = (houseNumber: number): string => {
  const descriptions: Record<number, string> = {
    1: "Representa tu personalidad, apariencia física y cómo te proyectas al mundo. Es la casa del 'yo'.",
    2: "Gobierna tus recursos, valores personales y seguridad material. Indica tu relación con el dinero y posesiones.",
    3: "Simboliza la comunicación, educación temprana y entorno cercano. Muestra cómo piensas y te expresas.",
    4: "Representa el hogar, familia y raíces. Indica tu sentido de pertenencia y seguridad emocional.",
    5: "Gobierna la creatividad, romance y autoexpresión. Muestra cómo disfrutas y te diviertes.",
    6: "Simboliza el trabajo, salud y servicio. Indica tus rutinas diarias y cómo te cuidas.",
    7: "Representa las relaciones, asociaciones y contratos. Muestra cómo te relacionas con otros en un plano de igualdad.",
    8: "Gobierna las transformaciones, recursos compartidos y lo oculto. Indica cómo manejas las crisis y el cambio.",
    9: "Simboliza la educación superior, viajes y filosofía de vida. Muestra tu búsqueda de significado y expansión.",
    10: "Representa la carrera, reputación y propósito social. Indica tus ambiciones y rol en la sociedad.",
    11: "Gobierna los amigos, grupos y metas futuras. Muestra tus ideales y conexiones sociales.",
    12: "Simboliza el subconsciente, espiritualidad y sacrificio. Indica áreas de introspección y sanación.",
  };
  
  return descriptions[houseNumber] || "Sin descripción disponible.";
};

const HouseDetails: React.FC<HouseDetailsProps> = ({ houses, planetsByHouse, expandedSection, toggleSection }) => {
  return (
    <div className="space-y-2 max-h-[400px] overflow-y-auto pr-2">
      {houses.map((house) => {
        const isExpanded = expandedSection === `house-${house.house}`;
        const planetsInHouse = planetsByHouse[house.house] || [];
        
        return (
          <div key={`house-${house.house}`} className="bg-white/40 rounded-lg border border-cosmos-pink/30 overflow-hidden">
            <div 
              className="flex items-center justify-between p-3 cursor-pointer"
              onClick={() => toggleSection(`house-${house.house}`)}
            >
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-cosmos-pink/20 flex items-center justify-center">
                  {house.house}
                </span>
                <span className="font-medium">Casa {house.house}</span>
              </div>
              <div className="flex items-center">
                <span className="text-sm mr-2">{house.sign} {house.degree}°</span>
                {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </div>
            </div>
            
            {isExpanded && (
              <div className="p-3 pt-0 text-sm bg-white/10">
                <div className="bg-white/20 p-2 rounded mb-2">
                  <p className="font-medium">Signo en cúspide: {house.sign}</p>
                  <p className="text-xs opacity-80">Grados: {house.degree}°</p>
                </div>
                
                {planetsInHouse.length > 0 ? (
                  <div>
                    <p className="font-medium mb-1">Planetas en esta casa:</p>
                    <div className="grid grid-cols-2 gap-2">
                      {planetsInHouse.map((planet) => (
                        <div key={planet.planet} className="bg-white/30 p-2 rounded flex items-center gap-1">
                          <span className="text-lg">{planet.icon}</span>
                          <div>
                            <p className="font-medium">{planet.planet}</p>
                            <p className="text-xs">{planet.sign} {planet.degree}°</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <p className="text-sm opacity-70">No hay planetas en esta casa.</p>
                )}
                
                <p className="mt-2 text-xs">{getHouseDescription(house.house)}</p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default HouseDetails;
