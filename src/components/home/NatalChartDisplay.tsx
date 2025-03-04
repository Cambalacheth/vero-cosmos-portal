import React from 'react';
import { Button } from '@/components/ui/button';
import { NatalChartData } from '@/lib/natal-chart';

interface NatalChartDisplayProps {
  natalChart: NatalChartData;
  onEdit: () => void;
}

const NatalChartDisplay: React.FC<NatalChartDisplayProps> = ({ natalChart, onEdit }) => {
  return (
    <div className="glass-card p-4 rounded-xl">
      <h3 className="text-xl font-playfair text-cosmos-darkGold mb-4">Tu Carta Natal</h3>
      
      <div className="relative w-full aspect-square mb-6">
        <div className="absolute inset-0 rounded-full border-2 border-cosmos-pink"></div>
        <div className="absolute inset-[10%] rounded-full border-2 border-cosmos-darkGold"></div>
        
        {/* Rueda de la carta natal */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-1/3 h-1/3 bg-cosmos-gold bg-opacity-20 rounded-full flex items-center justify-center">
            <span className="text-4xl text-cosmos-darkGold">{natalChart.sun.icon}</span>
          </div>
        </div>
        
        {/* Posiciones planetarias */}
        <div className="absolute top-[15%] left-[30%] bg-white bg-opacity-50 rounded-full px-2 py-1 text-xs">
          {natalChart.sun.icon} {natalChart.sun.sign}
        </div>
        <div className="absolute top-[70%] right-[30%] bg-white bg-opacity-50 rounded-full px-2 py-1 text-xs">
          {natalChart.moon.icon} {natalChart.moon.sign}
        </div>
        <div className="absolute top-[40%] right-[20%] bg-white bg-opacity-50 rounded-full px-2 py-1 text-xs">
          {natalChart.mercury.icon} {natalChart.mercury.sign}
        </div>
        <div className="absolute bottom-[25%] left-[25%] bg-white bg-opacity-50 rounded-full px-2 py-1 text-xs">
          {natalChart.venus.icon} {natalChart.venus.sign}
        </div>
        <div className="absolute top-[50%] left-[10%] bg-white bg-opacity-50 rounded-full px-2 py-1 text-xs">
          {natalChart.mars.icon} {natalChart.mars.sign}
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="p-2 bg-white bg-opacity-30 rounded-lg">
          <p className="text-xs font-medium">Sol en {natalChart.sun.sign}</p>
          <p className="text-xs opacity-70">Identidad, propósito</p>
        </div>
        <div className="p-2 bg-white bg-opacity-30 rounded-lg">
          <p className="text-xs font-medium">Luna en {natalChart.moon.sign}</p>
          <p className="text-xs opacity-70">Emociones, intuición</p>
        </div>
        <div className="p-2 bg-white bg-opacity-30 rounded-lg">
          <p className="text-xs font-medium">Ascendente {natalChart.ascendant.sign}</p>
          <p className="text-xs opacity-70">Expresión exterior</p>
        </div>
        <div className="p-2 bg-white bg-opacity-30 rounded-lg">
          <p className="text-xs font-medium">Venus en {natalChart.venus.sign}</p>
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
