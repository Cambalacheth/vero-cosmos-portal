
import React from 'react';
import { Button } from '@/components/ui/button';
import { NatalChartData } from '@/lib/natal-chart';

interface NatalChartDisplayProps {
  natalChart: NatalChartData;
  onEdit: () => void;
}

const NatalChartDisplay: React.FC<NatalChartDisplayProps> = ({ natalChart, onEdit }) => {
  // Función auxiliar para colocar elementos en la rueda
  const getPositionStyle = (index: number, total: number = 6) => {
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
    <div className="glass-card p-4 rounded-xl">
      <h3 className="text-xl font-playfair text-cosmos-darkGold mb-4">Tu Carta Natal</h3>
      
      <div className="relative w-full aspect-square mb-6">
        {/* Círculos principales */}
        <div className="absolute inset-0 rounded-full border-2 border-cosmos-pink"></div>
        <div className="absolute inset-[10%] rounded-full border-2 border-cosmos-darkGold"></div>
        
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
        <div className="absolute bg-white bg-opacity-70 rounded-full px-3 py-1.5 text-xs transform -translate-x-1/2 -translate-y-1/2"
             style={getPositionStyle(0)}>
          <div className="flex items-center">
            <span className="text-xl mr-1">{natalChart.sun.icon}</span>
            <div>
              <div className="font-medium">Sol</div>
              <div>{natalChart.sun.sign} {natalChart.sun.degree}°</div>
            </div>
          </div>
        </div>
        
        <div className="absolute bg-white bg-opacity-70 rounded-full px-3 py-1.5 text-xs transform -translate-x-1/2 -translate-y-1/2"
             style={getPositionStyle(1)}>
          <div className="flex items-center">
            <span className="text-xl mr-1">{natalChart.moon.icon}</span>
            <div>
              <div className="font-medium">Luna</div>
              <div>{natalChart.moon.sign} {natalChart.moon.degree}°</div>
            </div>
          </div>
        </div>
        
        <div className="absolute bg-white bg-opacity-70 rounded-full px-3 py-1.5 text-xs transform -translate-x-1/2 -translate-y-1/2"
             style={getPositionStyle(2)}>
          <div className="flex items-center">
            <span className="text-xl mr-1">{natalChart.mercury.icon}</span>
            <div>
              <div className="font-medium">Mercurio</div>
              <div>{natalChart.mercury.sign} {natalChart.mercury.degree}°</div>
            </div>
          </div>
        </div>
        
        <div className="absolute bg-white bg-opacity-70 rounded-full px-3 py-1.5 text-xs transform -translate-x-1/2 -translate-y-1/2"
             style={getPositionStyle(3)}>
          <div className="flex items-center">
            <span className="text-xl mr-1">{natalChart.venus.icon}</span>
            <div>
              <div className="font-medium">Venus</div>
              <div>{natalChart.venus.sign} {natalChart.venus.degree}°</div>
            </div>
          </div>
        </div>
        
        <div className="absolute bg-white bg-opacity-70 rounded-full px-3 py-1.5 text-xs transform -translate-x-1/2 -translate-y-1/2"
             style={getPositionStyle(4)}>
          <div className="flex items-center">
            <span className="text-xl mr-1">{natalChart.mars.icon}</span>
            <div>
              <div className="font-medium">Marte</div>
              <div>{natalChart.mars.sign} {natalChart.mars.degree}°</div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="p-2 bg-white bg-opacity-30 rounded-lg">
          <p className="text-xs font-medium">Sol en {natalChart.sun.sign} {natalChart.sun.degree}°</p>
          <p className="text-xs opacity-70">Identidad, propósito</p>
        </div>
        <div className="p-2 bg-white bg-opacity-30 rounded-lg">
          <p className="text-xs font-medium">Luna en {natalChart.moon.sign} {natalChart.moon.degree}°</p>
          <p className="text-xs opacity-70">Emociones, intuición</p>
        </div>
        <div className="p-2 bg-white bg-opacity-30 rounded-lg">
          <p className="text-xs font-medium">Ascendente {natalChart.ascendant.sign}</p>
          <p className="text-xs opacity-70">Expresión exterior</p>
        </div>
        <div className="p-2 bg-white bg-opacity-30 rounded-lg">
          <p className="text-xs font-medium">Venus en {natalChart.venus.sign} {natalChart.venus.degree}°</p>
          <p className="text-xs opacity-70">Amor, belleza</p>
        </div>
      </div>
      
      <Button 
        className="w-full button-effect px-4 py-2 bg-cosmos-pink bg-opacity-20 rounded-lg text-cosmos-darkGold border border-cosmos-pink"
        onClick={onEdit}
      >
        Editar Carta Natal
      </Button>
    </div>
  );
};

export default NatalChartDisplay;
