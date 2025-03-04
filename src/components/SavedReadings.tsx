
import React from 'react';
import { Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface SavedReadingsProps {
  readings: any[];
  onStartNewReading: () => void;
}

const SavedReadings: React.FC<SavedReadingsProps> = ({ readings, onStartNewReading }) => {
  if (readings.length === 0) {
    return (
      <div className="glass-card p-4 rounded-xl min-h-[300px] flex flex-col items-center justify-center">
        <Sparkles size={40} className="text-cosmos-gold opacity-50 mb-4" />
        <h3 className="text-lg font-playfair text-cosmos-darkGold mb-2">Sin Tiradas Guardadas</h3>
        <p className="text-sm text-center text-gray-600 max-w-xs">
          Aún no tienes tiradas guardadas. Realiza una tirada y guárdala para verla aquí.
        </p>
        <Button 
          onClick={onStartNewReading}
          variant="outline" 
          className="mt-4 border-cosmos-pink text-cosmos-darkGold"
        >
          Ir a Tiradas
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {readings.map((reading, index) => (
        <div key={index} className="glass-card p-4 rounded-xl">
          {/* Reading details would go here */}
          <p>Saved reading {index + 1}</p>
        </div>
      ))}
    </div>
  );
};

export default SavedReadings;
