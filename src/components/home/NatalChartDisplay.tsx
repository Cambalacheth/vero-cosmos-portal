
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { NatalChartData, PlanetaryPosition } from '@/lib/natal-chart';
import { ChevronDown, ChevronUp, Sun, Moon, Info } from 'lucide-react';

interface NatalChartDisplayProps {
  natalChart: NatalChartData;
  onEdit: () => void;
}

const NatalChartDisplay: React.FC<NatalChartDisplayProps> = ({ natalChart, onEdit }) => {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  
  // Función auxiliar para colocar elementos en la rueda
  const getPositionStyle = (index: number, total: number = Object.keys(natalChart).length - 2) => {
    const angle = (index * (360 / total)) * (Math.PI / 180);
    const radius = 42; // Porcentaje del radio
    const left = 50 + radius * Math.cos(angle);
    const top = 50 + radius * Math.sin(angle);
    
    return {
      left: `${left}%`,
      top: `${top}%`,
    };
  };

  // Ordenar los planetas por casa para la vista de casas
  const planetsByHouse = Object.entries(natalChart)
    .filter(([key, value]) => key !== 'houses' && key !== 'birthDate' && key !== 'birthTime' && key !== 'birthplace')
    .map(([key, planet]) => planet as PlanetaryPosition)
    .reduce((acc, planet) => {
      if (planet.house) {
        if (!acc[planet.house]) {
          acc[planet.house] = [];
        }
        acc[planet.house].push(planet);
      }
      return acc;
    }, {} as Record<number, PlanetaryPosition[]>);

  const toggleSection = (section: string) => {
    if (expandedSection === section) {
      setExpandedSection(null);
    } else {
      setExpandedSection(section);
    }
  };

  const formatBirthInfo = () => {
    if (!natalChart.birthDate || !natalChart.birthTime || !natalChart.birthplace) {
      return "Información de nacimiento no disponible";
    }
    
    const date = new Date(natalChart.birthDate);
    const formattedDate = date.toLocaleDateString();
    
    return `${formattedDate}, ${natalChart.birthTime} - ${natalChart.birthplace.name}, ${natalChart.birthplace.country}`;
  };

  return (
    <div className="glass-card p-4 rounded-xl">
      <h3 className="text-xl font-playfair text-cosmos-darkGold mb-4">Tu Carta Natal</h3>
      
      <p className="text-sm text-center mb-3 text-cosmos-darkGold/80">{formatBirthInfo()}</p>
      
      <Tabs defaultValue="chart" className="mb-4">
        <TabsList className="w-full grid grid-cols-3 mb-4">
          <TabsTrigger value="chart">Carta Visual</TabsTrigger>
          <TabsTrigger value="planets">Planetas</TabsTrigger>
          <TabsTrigger value="houses">Casas</TabsTrigger>
        </TabsList>
        
        <TabsContent value="chart" className="focus-visible:outline-none focus-visible:ring-0">
          <div className="relative w-full aspect-square mb-6">
            {/* Círculos principales */}
            <div className="absolute inset-0 rounded-full border-2 border-cosmos-pink"></div>
            <div className="absolute inset-[10%] rounded-full border-2 border-cosmos-darkGold"></div>
            <div className="absolute inset-[20%] rounded-full border border-cosmos-pink/50"></div>
            
            {/* Líneas de las casas */}
            {natalChart.houses.map((house, index) => {
              const angle = (index * 30) - 90; // Ajustar para que la casa 1 esté en el Ascendente
              return (
                <div key={`house-line-${index}`} 
                     className="absolute top-1/2 left-1/2 h-[1px] w-1/2 origin-left bg-cosmos-pink/40"
                     style={{ transform: `rotate(${angle}deg)` }}>
                  <span className="absolute -right-6 -top-3 text-xs bg-white/70 rounded-full w-6 h-6 flex items-center justify-center">
                    {house.house}
                  </span>
                </div>
              );
            })}
            
            {/* Centro de la carta */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-1/3 h-1/3 bg-cosmos-gold bg-opacity-20 rounded-full flex flex-col items-center justify-center">
                <span className="text-lg font-medium text-cosmos-darkGold">Ascendente</span>
                <div className="flex items-center">
                  <span className="text-2xl text-cosmos-darkGold mr-1">{natalChart.ascendant.icon}</span>
                  <span className="text-sm">{natalChart.ascendant.sign}</span>
                </div>
              </div>
            </div>
            
            {/* Posiciones planetarias */}
            {[
              { key: 'sun', index: 0 },
              { key: 'moon', index: 1 },
              { key: 'mercury', index: 2 },
              { key: 'venus', index: 3 },
              { key: 'mars', index: 4 },
              { key: 'jupiter', index: 5 },
              { key: 'saturn', index: 6 },
              { key: 'uranus', index: 7 },
              { key: 'neptune', index: 8 },
              { key: 'pluto', index: 9 }
            ].map(({ key, index }) => {
              const planet = natalChart[key as keyof NatalChartData] as PlanetaryPosition;
              return (
                <div key={key}
                     className="absolute bg-white bg-opacity-70 rounded-full px-3 py-1.5 text-xs transform -translate-x-1/2 -translate-y-1/2 border border-cosmos-pink/30"
                     style={getPositionStyle(index, 10)}>
                  <div className="flex items-center gap-1">
                    <span className="text-xl">{planet.icon}</span>
                    <div>
                      <div className="font-medium">{planet.planet}</div>
                      <div>{planet.sign} {planet.degree}° (Casa {planet.house})</div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </TabsContent>
        
        <TabsContent value="planets" className="focus-visible:outline-none focus-visible:ring-0">
          <div className="space-y-2 max-h-[400px] overflow-y-auto pr-2">
            {[
              { key: 'sun', icon: <Sun className="h-4 w-4 text-yellow-500" /> },
              { key: 'moon', icon: <Moon className="h-4 w-4 text-blue-300" /> },
              { key: 'ascendant', icon: <ChevronUp className="h-4 w-4 text-purple-500" /> },
              { key: 'mercury', icon: <Info className="h-4 w-4 text-gray-500" /> },
              { key: 'venus', icon: <Info className="h-4 w-4 text-pink-400" /> },
              { key: 'mars', icon: <Info className="h-4 w-4 text-red-500" /> },
              { key: 'jupiter', icon: <Info className="h-4 w-4 text-indigo-500" /> },
              { key: 'saturn', icon: <Info className="h-4 w-4 text-gray-700" /> },
              { key: 'uranus', icon: <Info className="h-4 w-4 text-teal-500" /> },
              { key: 'neptune', icon: <Info className="h-4 w-4 text-blue-500" /> },
              { key: 'pluto', icon: <Info className="h-4 w-4 text-violet-800" /> }
            ].map(({ key, icon }) => {
              const planet = natalChart[key as keyof NatalChartData] as PlanetaryPosition;
              const isExpanded = expandedSection === key;
              
              return (
                <div key={key} className="bg-white/40 rounded-lg border border-cosmos-pink/30 overflow-hidden">
                  <div 
                    className="flex items-center justify-between p-3 cursor-pointer"
                    onClick={() => toggleSection(key)}
                  >
                    <div className="flex items-center gap-2">
                      {icon}
                      <span className="text-lg mr-1">{planet.icon}</span>
                      <span className="font-medium">{planet.planet}</span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-sm mr-2">{planet.sign} {planet.degree}°</span>
                      {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </div>
                  </div>
                  
                  {isExpanded && (
                    <div className="p-3 pt-0 text-sm bg-white/10">
                      <div className="grid grid-cols-2 gap-2">
                        <div className="bg-white/20 p-2 rounded">
                          <p className="font-medium">Signo: {planet.sign}</p>
                          <p className="text-xs opacity-80">Grados: {planet.degree}°</p>
                        </div>
                        <div className="bg-white/20 p-2 rounded">
                          <p className="font-medium">Casa: {planet.house}</p>
                          <p className="text-xs opacity-80">Elemento: {getElementFromSign(planet.sign)}</p>
                        </div>
                      </div>
                      <p className="mt-2 text-xs">{getPlanetaryDescription(planet)}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </TabsContent>
        
        <TabsContent value="houses" className="focus-visible:outline-none focus-visible:ring-0">
          <div className="space-y-2 max-h-[400px] overflow-y-auto pr-2">
            {natalChart.houses.map((house) => {
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
        </TabsContent>
      </Tabs>
      
      <Button 
        className="w-full button-effect px-4 py-2 bg-cosmos-pink bg-opacity-20 rounded-lg text-cosmos-darkGold border border-cosmos-pink"
        onClick={onEdit}
      >
        Editar Carta Natal
      </Button>
    </div>
  );
};

// Función auxiliar para obtener el elemento de un signo
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

// Descripción simplificada de los planetas
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

// Descripción de las casas astrológicas
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

export default NatalChartDisplay;
