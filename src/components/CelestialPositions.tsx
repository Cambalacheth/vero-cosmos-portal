
import React from 'react';
import { getCurrentCelestialPositions } from '@/lib/astrology-service';

const CelestialPositions: React.FC = () => {
  const positions = getCurrentCelestialPositions();
  
  return (
    <div className="glass-card p-4 rounded-xl">
      <h3 className="text-lg font-playfair text-cosmos-darkGold mb-3">Posiciones Celestes Actuales</h3>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
        {positions.map((position, index) => (
          <div key={index} className="flex items-center space-x-2 p-2 rounded-lg bg-white bg-opacity-30">
            <span className="text-xl">{position.icon}</span>
            <div>
              <p className="text-sm font-medium">{position.planet}</p>
              <p className="text-xs">{position.position}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CelestialPositions;
