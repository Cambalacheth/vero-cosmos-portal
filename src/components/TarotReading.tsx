
import React from 'react';
import { TarotCard } from '@/lib/tarot-data';
import TarotCardComponent from './TarotCard';
import { Button } from '@/components/ui/button';
import { Sparkles } from 'lucide-react';

interface TarotReadingProps {
  readingType: {
    id: string;
    name: string;
    description: string;
    cardCount: number;
  };
  cards: { card: TarotCard; isReversed: boolean }[];
  onSaveReading?: () => void;
  onNewReading?: () => void;
}

const TarotReading: React.FC<TarotReadingProps> = ({
  readingType,
  cards,
  onSaveReading,
  onNewReading,
}) => {
  // Card positions and meanings based on reading type
  const getPositionMeaning = (index: number) => {
    if (readingType.id === 'daily') {
      return 'Tu guía para hoy';
    } else if (readingType.id === 'three-card') {
      return ['Pasado', 'Presente', 'Futuro'][index];
    } else if (readingType.id === 'celtic-cross') {
      return [
        'Situación actual',
        'Desafío o influencia',
        'Pasado reciente',
        'Futuro cercano',
        'Aspiraciones/Metas',
        'Influencias inconscientes',
        'Tu influencia',
        'Influencia externa',
        'Esperanzas o temores',
        'Resultado final',
      ][index];
    }
    return `Posición ${index + 1}`;
  };

  // Determine layout based on reading type
  const getReadingLayout = () => {
    switch (readingType.id) {
      case 'daily':
        return 'flex justify-center items-center';
      case 'three-card':
        return 'flex flex-col md:flex-row justify-center items-center gap-4 md:gap-8';
      case 'celtic-cross':
        return 'grid grid-cols-1 md:grid-cols-4 gap-4';
      default:
        return 'flex flex-wrap justify-center gap-4';
    }
  };

  // Handle special layout for Celtic Cross
  const getCelticCrossClassname = (index: number) => {
    if (readingType.id !== 'celtic-cross') return '';
    
    // Special positioning for Celtic Cross
    switch (index) {
      case 0: return 'md:col-start-2 md:col-end-3 md:row-start-2';
      case 1: return 'md:col-start-2 md:col-end-3 md:row-start-2 rotate-90';
      case 2: return 'md:col-start-2 md:col-end-3 md:row-start-1';
      case 3: return 'md:col-start-2 md:col-end-3 md:row-start-3';
      case 4: return 'md:col-start-1 md:col-end-2 md:row-start-2';
      case 5: return 'md:col-start-3 md:col-end-4 md:row-start-2';
      case 6: return 'md:col-start-4 md:col-end-5 md:row-start-1';
      case 7: return 'md:col-start-4 md:col-end-5 md:row-start-2';
      case 8: return 'md:col-start-4 md:col-end-5 md:row-start-3';
      case 9: return 'md:col-start-4 md:col-end-5 md:row-start-4';
      default: return '';
    }
  };

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-2xl font-playfair font-semibold mb-2 text-cosmos-darkGold">
        {readingType.name}
      </h2>
      <p className="text-sm text-gray-600 mb-6">{readingType.description}</p>

      <div className={getReadingLayout()}>
        {cards.map((cardData, index) => (
          <div 
            key={`${cardData.card.id}-${index}`} 
            className={`flex flex-col items-center ${getCelticCrossClassname(index)}`}
          >
            <TarotCardComponent
              card={cardData.card}
              isReversed={cardData.isReversed}
              isRevealed={true}
              className="w-36 md:w-48 lg:w-56 mb-2"
            />
            <div className="text-center">
              <div className="text-sm font-medium text-cosmos-gold">
                {getPositionMeaning(index)}
              </div>
              <div className="text-xs text-gray-600 mt-1 max-w-44">
                {cardData.isReversed ? 
                  cardData.card.meaningReversed[0] : 
                  cardData.card.meaningUpright[0]
                }
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex gap-4 mt-8">
        <Button 
          onClick={onSaveReading} 
          variant="outline" 
          className="border-cosmos-pink text-cosmos-darkGold"
        >
          Guardar Tirada
        </Button>
        <Button 
          onClick={onNewReading} 
          className="bg-gradient-to-r from-cosmos-gold to-cosmos-darkGold text-white"
        >
          <Sparkles size={16} />
          Nueva Tirada
        </Button>
      </div>
    </div>
  );
};

export default TarotReading;
