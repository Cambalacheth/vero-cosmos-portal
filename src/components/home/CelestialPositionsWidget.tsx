
import React from 'react';
import { getCurrentCelestialPositions } from '@/lib/astrology-service';
import { AnimatedCelestialPositionsGrid } from '@/components/AnimatedCelestialPosition';

const CelestialPositionsWidget: React.FC = () => {
  const positions = getCurrentCelestialPositions();
  
  return <AnimatedCelestialPositionsGrid positions={positions} />;
};

export default CelestialPositionsWidget;
