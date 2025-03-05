
import React from 'react';
import { cn } from '@/lib/utils';

interface AnimatedCelestialPositionProps {
  planet: string;
  position: string;
  icon: React.ReactNode;
}

const AnimatedCelestialPosition: React.FC<AnimatedCelestialPositionProps> = ({ 
  planet, 
  position, 
  icon 
}) => {
  return (
    <div className="flex items-center space-x-2 p-2 rounded-lg bg-white bg-opacity-30 hover:bg-opacity-40 transition-all transform hover:scale-105 hover:shadow-md">
      <span className="text-xl relative animate-float">
        {icon}
        <span className="absolute -top-1 -right-1 w-2 h-2 bg-primary rounded-full opacity-75 animate-pulse" />
      </span>
      <div>
        <p className="text-sm font-medium">{planet}</p>
        <p className="text-xs">{position}</p>
      </div>
    </div>
  );
};

export function AnimatedCelestialPositionsGrid({ positions }: { positions: any[] }) {
  return (
    <div className="glass-card p-4 rounded-xl">
      <h3 className="text-lg font-playfair text-cosmos-darkGold mb-3">Posiciones Celestes Actuales</h3>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
        {positions.map((position, index) => (
          <AnimatedCelestialPosition
            key={index}
            planet={position.planet}
            position={position.position}
            icon={position.icon}
          />
        ))}
      </div>
    </div>
  );
}

export default AnimatedCelestialPosition;
