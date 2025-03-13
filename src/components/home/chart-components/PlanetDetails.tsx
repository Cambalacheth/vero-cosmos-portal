
import React from 'react';
import { ChevronDown, ChevronUp, Sun, Moon, Info } from 'lucide-react';
import { PlanetaryPosition } from '@/lib/natal-chart';

interface PlanetDetailsProps {
  planets: Array<{ key: string; icon: React.ReactNode; data: PlanetaryPosition }>;
  expandedSection: string | null;
  toggleSection: (section: string) => void;
}

// Helper function to get element from sign
const getElementFromSign = (sign: string): string => {
  const fireigns = ["Aries", "Leo", "Sagitario"];
  const earthSigns = ["Tauro", "Virgo", "Capricornio"];
  const airSigns = ["Géminis", "Libra", "Acuario"];
  const waterSigns = ["Cáncer", "Escorpio", "Piscis"];
  
  if (fireigns.includes(sign)) return "Fuego";
  if (earthSigns.includes(sign)) return "Tierra";
  if (airSigns.includes(sign)) return "Aire";
  if (waterSigns.includes(sign)) return "Agua";
  return "Desconocido";
};

// Description of planetary positions
const getPlanetaryDescription = (planet: PlanetaryPosition): string => {
  const descriptions: Record<string, string> = {
    "Sol": "Representa tu esencia, identidad y propósito en la vida. Es la energía vital y la expresión creativa.",
    "Luna": "Simboliza tus emociones, intuición y mundo interior. Refleja tus respuestas instintivas y necesidades emocionales.",
    "Mercurio": "Gobierna la comunicación, el pensamiento y el aprendizaje. Indica cómo procesas información y te expresas.",
    "Venus": "Representa el amor, la belleza y los valores. Muestra cómo te relacionas y qué aprecias en la vida.",
    "Marte": "Simboliza la acción, energía y determinación. Indica cómo actúas para conseguir lo que deseas.",
    "Júpiter": "Representa la expansión, fortuna y sabiduría. Muestra dónde encuentras crecimiento y abundancia.",
    "Saturno": "Simboliza la disciplina, responsabilidad y estructura. Indica áreas donde desarrollas madurez.",
    "Urano": "Representa la originalidad, independencia y cambios repentinos. Muestra dónde expresas tu individualidad.",
    "Neptuno": "Simboliza la inspiración, espiritualidad e imaginación. Indica áreas de sensibilidad y conexión espiritual.",
    "Plutón": "Representa la transformación profunda y regeneración. Muestra dónde experimentas cambios intensos.",
    "Ascendente": "Es la máscara que presentas al mundo, tu apariencia y primera impresión que causas.",
  };
  
  return descriptions[planet.planet] || "Sin descripción disponible.";
};

const PlanetDetails: React.FC<PlanetDetailsProps> = ({ planets, expandedSection, toggleSection }) => {
  return (
    <div className="space-y-2 max-h-[400px] overflow-y-auto pr-2">
      {planets.map(({ key, icon, data }) => {
        const isExpanded = expandedSection === key;
        
        return (
          <div key={key} className="bg-white/40 rounded-lg border border-cosmos-pink/30 overflow-hidden">
            <div 
              className="flex items-center justify-between p-3 cursor-pointer"
              onClick={() => toggleSection(key)}
            >
              <div className="flex items-center gap-2">
                {icon}
                <span className="text-lg mr-1">{data.icon}</span>
                <span className="font-medium">{data.planet}</span>
              </div>
              <div className="flex items-center">
                <span className="text-sm mr-2">{data.sign} {data.degree}°</span>
                {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </div>
            </div>
            
            {isExpanded && (
              <div className="p-3 pt-0 text-sm bg-white/10">
                <div className="grid grid-cols-2 gap-2">
                  <div className="bg-white/20 p-2 rounded">
                    <p className="font-medium">Signo: {data.sign}</p>
                    <p className="text-xs opacity-80">Grados: {data.degree}°</p>
                  </div>
                  <div className="bg-white/20 p-2 rounded">
                    <p className="font-medium">Casa: {data.house}</p>
                    <p className="text-xs opacity-80">Elemento: {getElementFromSign(data.sign)}</p>
                  </div>
                </div>
                <p className="mt-2 text-xs">{getPlanetaryDescription(data)}</p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default PlanetDetails;
