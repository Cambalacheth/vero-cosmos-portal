
import React from 'react';
import { Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { NatalChartData } from '@/lib/natal-chart';
import { getDailyAstrologyData } from '@/lib/astrology-service';

interface DailyHoroscopeProps {
  natalChart: NatalChartData | null;
  hasNatalChart: boolean;
  personalizedHoroscope: string;
  onCreateNatalChart: () => void;
}

const DailyHoroscope: React.FC<DailyHoroscopeProps> = ({ 
  natalChart, 
  hasNatalChart, 
  personalizedHoroscope,
  onCreateNatalChart 
}) => {
  const todayData = getDailyAstrologyData(new Date());

  return (
    <div className="glass-card p-4 rounded-xl">
      <h3 className="text-xl font-playfair text-cosmos-darkGold mb-3">Tu Horóscopo Personalizado</h3>
      
      <div className="flex items-center space-x-3 mb-4">
        <Calendar size={18} className="text-cosmos-darkGold" />
        <p className="text-sm font-medium">Hoy, {new Date().toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
      </div>
      
      {natalChart && hasNatalChart ? (
        <>
          <div className="mb-4">
            <div className="flex space-x-2 mb-2">
              <div className="w-6 h-6 flex items-center justify-center text-lg">{natalChart.sun.icon}</div>
              <div>
                <p className="text-sm font-medium">Sol en {natalChart.sun.sign}</p>
                <p className="text-xs">La energía solar te impulsa a tomar iniciativas y liderazgo hoy.</p>
              </div>
            </div>
            
            <div className="flex space-x-2 mb-2">
              <div className="w-6 h-6 flex items-center justify-center text-lg">{natalChart.moon.icon}</div>
              <div>
                <p className="text-sm font-medium">Luna en {natalChart.moon.sign}</p>
                <p className="text-xs">Tus emociones estarán a flor de piel, aprovecha para conectar con tu intuición.</p>
              </div>
            </div>
            
            <div className="flex space-x-2">
              <div className="w-6 h-6 flex items-center justify-center text-lg">⚡</div>
              <div>
                <p className="text-sm font-medium">Tránsitos Destacados</p>
                <p className="text-xs">Venus está activando tu casa de relaciones, favoreciendo encuentros significativos.</p>
              </div>
            </div>
          </div>
          
          <div className="p-3 bg-white bg-opacity-20 rounded-lg mb-4">
            <p className="text-sm italic">{personalizedHoroscope}</p>
          </div>
        </>
      ) : (
        <>
          <div className="mb-4">
            <div className="flex space-x-2 mb-2">
              <div className="w-6 h-6 flex items-center justify-center text-lg">☉</div>
              <div>
                <p className="text-sm font-medium">Sol en Libra</p>
                <p className="text-xs">Registra tu carta natal para ver detalles personalizados.</p>
              </div>
            </div>
            
            <div className="flex space-x-2 mb-2">
              <div className="w-6 h-6 flex items-center justify-center text-lg">☾</div>
              <div>
                <p className="text-sm font-medium">Luna en Piscis</p>
                <p className="text-xs">Registra tu carta natal para ver detalles personalizados.</p>
              </div>
            </div>
            
            <div className="flex space-x-2">
              <div className="w-6 h-6 flex items-center justify-center text-lg">⚡</div>
              <div>
                <p className="text-sm font-medium">Tránsitos Destacados</p>
                <p className="text-xs">Registra tu carta natal para ver detalles personalizados.</p>
              </div>
            </div>
          </div>
          
          <div className="p-3 bg-white bg-opacity-20 rounded-lg mb-4">
            <p className="text-sm italic">{todayData.dailyMessage}</p>
          </div>
          
          <Button 
            className="w-full button-effect px-4 py-2 bg-cosmos-pink bg-opacity-20 rounded-lg text-cosmos-darkGold border border-cosmos-pink"
            onClick={onCreateNatalChart}
          >
            Personalizar Mi Horóscopo
          </Button>
        </>
      )}
    </div>
  );
};

export default DailyHoroscope;
