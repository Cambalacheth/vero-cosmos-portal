
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

  // Obtener planetas específicos para el mapa de riqueza
  const getWealthPlanets = () => {
    const wealthPlanets = [
      { key: 'jupiter', data: natalChart.jupiter, name: 'Júpiter', importance: 'high' },
      { key: 'saturn', data: natalChart.saturn, name: 'Saturno', importance: 'high' },
      { key: 'venus', data: natalChart.venus, name: 'Venus', importance: 'medium' },
      { key: 'sun', data: natalChart.sun, name: 'Sol', importance: 'medium' },
      { key: 'moon', data: natalChart.moon, name: 'Luna', importance: 'medium' },
      { key: 'mercury', data: natalChart.mercury, name: 'Mercurio', importance: 'low' },
      { key: 'mars', data: natalChart.mars, name: 'Marte', importance: 'low' },
      { key: 'uranus', data: natalChart.uranus, name: 'Urano', importance: 'low' },
      { key: 'neptune', data: natalChart.neptune, name: 'Neptuno', importance: 'low' },
      { key: 'pluto', data: natalChart.pluto, name: 'Plutón', importance: 'low' }
    ];
    
    return wealthPlanets;
  };

  // Destacar casas importantes para la riqueza
  const getHouseImportance = (houseNumber: number) => {
    const wealthHouses = {
      2: 'high', // Casa de recursos y valores
      6: 'medium', // Casa de trabajo y servicio
      8: 'high', // Casa de recursos compartidos
      10: 'high', // Casa de carrera y estatus
      11: 'medium' // Casa de beneficios y objetivos
    };
    
    return wealthHouses[houseNumber as keyof typeof wealthHouses] || 'low';
  };

  // Obtener color para las casas según su importancia para la riqueza
  const getHouseColor = (houseNumber: number) => {
    const importance = getHouseImportance(houseNumber);
    
    switch (importance) {
      case 'high':
        return 'border-yellow-400 bg-yellow-400/20';
      case 'medium':
        return 'border-yellow-200 bg-yellow-200/10';
      default:
        return 'border-cosmos-pink/40 bg-transparent';
    }
  };

  // Obtener color para los planetas según su importancia para la riqueza
  const getPlanetColor = (importance: string) => {
    switch (importance) {
      case 'high':
        return 'bg-yellow-400/30 border-yellow-400';
      case 'medium':
        return 'bg-cosmos-gold/30 border-cosmos-gold';
      default:
        return 'bg-white bg-opacity-70 border-cosmos-pink/30';
    }
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
        const houseColor = getHouseColor(house.house);
        
        return (
          <div key={`house-line-${index}`} 
               className={`absolute top-1/2 left-1/2 h-[1px] w-1/2 origin-left ${house.house === 2 || house.house === 10 || house.house === 8 ? 'bg-yellow-400/60' : 'bg-cosmos-pink/40'}`}
               style={{ transform: `rotate(${angle}deg)` }}>
            <span className={`absolute -right-6 -top-3 text-xs rounded-full w-6 h-6 flex items-center justify-center border ${houseColor}`}>
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
      {getWealthPlanets().map(({ key, data, name, importance }, index) => {
        const planetColor = getPlanetColor(importance);
        return (
          <div key={key}
               className={`absolute rounded-full px-3 py-1.5 text-xs transform -translate-x-1/2 -translate-y-1/2 border ${planetColor} ${importance === 'high' ? 'font-medium shadow-md' : ''}`}
               style={getPositionStyle(index, 10)}>
            <div className="flex items-center gap-1">
              <span className="text-xl">{data.icon}</span>
              <div>
                <div className="font-medium">{name}</div>
                <div>{data.sign} {data.degree}° (Casa {data.house})</div>
              </div>
            </div>
          </div>
        );
      })}
      
      {/* Leyenda para casas de riqueza */}
      <div className="absolute -bottom-10 left-0 right-0 flex justify-center gap-4 text-xs">
        <div className="flex items-center">
          <span className="w-3 h-3 bg-yellow-400/20 border border-yellow-400 rounded-full mr-1"></span>
          <span>Casas financieras</span>
        </div>
        <div className="flex items-center">
          <span className="w-3 h-3 bg-cosmos-gold/30 border border-cosmos-gold rounded-full mr-1"></span>
          <span>Planetas de abundancia</span>
        </div>
      </div>
    </div>
  );
};

export default ChartVisual;
