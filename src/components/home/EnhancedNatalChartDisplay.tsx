
import React from 'react';
import { NatalChartData } from '@/lib/natal-chart';

interface EnhancedNatalChartDisplayProps {
  natalChart: NatalChartData;
  className?: string;
}

const EnhancedNatalChartDisplay: React.FC<EnhancedNatalChartDisplayProps> = ({ natalChart, className }) => {
  // Lista de todos los planetas para mostrar
  const planets = [
    { key: 'sun', name: 'Sol', data: natalChart.sun },
    { key: 'moon', name: 'Luna', data: natalChart.moon },
    { key: 'ascendant', name: 'Ascendente', data: natalChart.ascendant },
    { key: 'mercury', name: 'Mercurio', data: natalChart.mercury },
    { key: 'venus', name: 'Venus', data: natalChart.venus },
    { key: 'mars', name: 'Marte', data: natalChart.mars },
    { key: 'jupiter', name: 'Júpiter', data: natalChart.jupiter },
    { key: 'saturn', name: 'Saturno', data: natalChart.saturn },
    { key: 'uranus', name: 'Urano', data: natalChart.uranus },
    { key: 'neptune', name: 'Neptuno', data: natalChart.neptune },
    { key: 'pluto', name: 'Plutón', data: natalChart.pluto }
  ];

  // Agrupar planetas por casa para un análisis más profundo
  const planetsByHouse: Record<number, Array<{ name: string; sign: string; icon: string }>> = {};
  planets.forEach(planet => {
    if (planet.data.house) {
      if (!planetsByHouse[planet.data.house]) {
        planetsByHouse[planet.data.house] = [];
      }
      planetsByHouse[planet.data.house].push({
        name: planet.name,
        sign: planet.data.sign,
        icon: planet.data.icon
      });
    }
  });

  // Formatea la fecha de nacimiento para mostrarla
  const formattedBirthDate = natalChart.birthDate 
    ? new Date(natalChart.birthDate).toLocaleDateString('es-ES', {
        day: '2-digit',
        month: 'long',
        year: 'numeric'
      })
    : '';

  return (
    <div className={`glass-card p-5 rounded-xl ${className}`}>
      <h2 className="text-xl font-playfair text-cosmos-darkGold mb-4">Mi Carta Natal</h2>
      
      {natalChart.birthDate && natalChart.birthTime && natalChart.birthplace && (
        <div className="mb-5 p-3 bg-white/20 rounded-lg">
          <p className="text-sm">
            <span className="font-medium">Fecha:</span> {formattedBirthDate}
          </p>
          <p className="text-sm">
            <span className="font-medium">Hora:</span> {natalChart.birthTime}
          </p>
          <p className="text-sm">
            <span className="font-medium">Lugar:</span> {natalChart.birthplace.name}, {natalChart.birthplace.country}
          </p>
        </div>
      )}

      <div className="mb-6">
        <h3 className="text-lg font-medium mb-2 text-cosmos-gold">Posiciones Planetarias</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {planets.map((planet) => (
            <div 
              key={planet.key} 
              className="flex items-center p-2 bg-white/20 rounded-lg"
            >
              <span className="text-xl mr-2">{planet.data.icon}</span>
              <div>
                <p className="font-medium text-sm">{planet.name}</p>
                <p className="text-xs">
                  {planet.data.sign} {planet.data.degree}° 
                  {planet.data.house && <span> (Casa {planet.data.house})</span>}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-medium mb-2 text-cosmos-gold">Casas Astrológicas</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
          {natalChart.houses.map((house) => (
            <div 
              key={`house-${house.house}`}
              className="p-2 bg-white/20 rounded-lg"
            >
              <p className="font-medium text-sm">Casa {house.house}</p>
              <p className="text-xs">{house.sign} {house.degree}°</p>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium mb-2 text-cosmos-gold">Planetas por Casa</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {Array.from({ length: 12 }, (_, i) => i + 1).map(houseNum => (
            <div 
              key={`house-group-${houseNum}`} 
              className="p-2 bg-white/20 rounded-lg"
            >
              <p className="font-medium text-sm mb-1">Casa {houseNum}</p>
              {planetsByHouse[houseNum] && planetsByHouse[houseNum].length > 0 ? (
                <div className="flex flex-wrap gap-1">
                  {planetsByHouse[houseNum].map((planet, idx) => (
                    <span key={idx} className="text-xs px-2 py-1 bg-cosmos-darkGold/30 rounded-full">
                      {planet.icon} {planet.name}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-gray-500 italic">Sin planetas</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EnhancedNatalChartDisplay;
