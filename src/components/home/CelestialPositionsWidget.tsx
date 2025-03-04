
import React from 'react';
import { getCurrentCelestialPositions } from '@/lib/astrology-service';

const CelestialPositionsWidget: React.FC = () => {
  const celestialPositions = getCurrentCelestialPositions();
  
  return (
    <div className="glass-card p-4 mb-6 rounded-xl">
      <h3 className="text-base font-playfair text-cosmos-darkGold mb-3">Clima Astral Actual</h3>
      <div className="grid grid-cols-3 gap-2">
        {celestialPositions.slice(0, 6).map((position, index) => (
          <div key={index} className="flex flex-col items-center p-2 bg-white bg-opacity-20 rounded-lg">
            <span className="text-lg">{position.icon}</span>
            <p className="text-xs font-medium">{position.planet}</p>
            <p className="text-xs">{position.position}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CelestialPositionsWidget;
