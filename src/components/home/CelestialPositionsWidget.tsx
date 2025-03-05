
import React, { useEffect, useState } from 'react';
import { getCurrentCelestialPositions } from '@/lib/astrology-service';
import { AnimatedCelestialPositionsGrid } from '@/components/AnimatedCelestialPosition';

const CelestialPositionsWidget: React.FC = () => {
  const [positions, setPositions] = useState(getCurrentCelestialPositions());
  
  // Simulating a real-time update of positions every 5 minutes (in a real app, 
  // you might connect to an astronomy API for accurate positions)
  useEffect(() => {
    const timer = setInterval(() => {
      const currentPositions = getCurrentCelestialPositions();
      // Simulate slight movement of planets (in a real app, this would come from an API)
      const updatedPositions = currentPositions.map(pos => {
        const newDegree = parseInt(pos.position.split('°')[0]) + (Math.random() * 0.01);
        const sign = pos.position.split('°')[1]?.trim() || '';
        return {
          ...pos,
          position: `${newDegree.toFixed(2)}° ${sign}`
        };
      });
      setPositions(updatedPositions);
    }, 300000); // 5 minutes
    
    return () => clearInterval(timer);
  }, []);
  
  return <AnimatedCelestialPositionsGrid positions={positions} />;
};

export default CelestialPositionsWidget;
