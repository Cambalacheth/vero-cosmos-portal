
import React from 'react';
import { Sparkles, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { formatDistanceToNow } from 'date-fns';
import { es } from 'date-fns/locale';
import { SavedReading } from '@/lib/tarot-storage';
import TarotCard from './TarotCard';

interface SavedReadingsProps {
  readings: SavedReading[];
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
      {readings.map((reading) => (
        <div key={reading.id} className="glass-card p-4 rounded-xl">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h3 className="text-lg font-playfair text-cosmos-darkGold">
                {reading.readingType === 'daily' ? 'Tirada Diaria' : 
                 reading.readingType === 'three-card' ? 'Pasado, Presente, Futuro' : 
                 reading.readingType === 'celtic-cross' ? 'Cruz Celta' : 'Tirada de Tarot'}
              </h3>
              <div className="flex items-center text-xs text-gray-600 mt-1">
                <Calendar size={12} className="mr-1" />
                {formatDistanceToNow(new Date(reading.created_at), { 
                  addSuffix: true, 
                  locale: es 
                })}
              </div>
            </div>
          </div>
          
          <div className="flex flex-wrap justify-center gap-2 mb-3">
            {reading.cards.map((cardData, index) => (
              <div key={index} className="w-20 sm:w-24 md:w-28 text-center">
                <TarotCard
                  card={cardData.card as any}
                  isReversed={cardData.isReversed}
                  isRevealed={true}
                  className="w-full mb-1"
                />
                <div className="text-xs text-cosmos-darkGold">
                  {cardData.isReversed ? '(Invertida)' : ''}
                </div>
              </div>
            ))}
          </div>
          
          {reading.notes && (
            <div className="mt-3 text-sm italic text-gray-600 border-t border-cosmos-pink pt-2">
              "{reading.notes}"
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default SavedReadings;
