
import React from 'react';
import { NatalChartData, PlanetaryPosition } from '@/lib/natal-chart';

interface ChartVisualProps {
  natalChart: NatalChartData;
}

const ChartVisual: React.FC<ChartVisualProps> = ({ natalChart }) => {
  // Función auxiliar para colocar elementos en la rueda
  const getPositionStyle = (index: number, total: number = 10) => {
    const angle = (index * (360 / total)) * (Math.PI / 180);
    const radius = 42; // Porcentaje del radio
    const left = 50 + radius * Math.cos(angle);
    const top = 50 + radius * Math.sin(angle);
    
    return {
      left: `${left}%`,
      top: `${top}%`,
    };
  };

  return (
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
  );
};

export default ChartVisual;
