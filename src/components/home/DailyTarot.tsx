
import React, { useState } from 'react';
import { Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import TarotCard from '@/components/TarotCard';
import { drawCards } from '@/lib/tarot-data';

const DailyTarot: React.FC = () => {
  const [isCardRevealed, setIsCardRevealed] = useState(false);
  const [dailyCard] = useState(drawCards(1)[0]);

  const handleRevealCard = () => {
    setIsCardRevealed(true);
  };

  return (
    <div className="glass-card p-4 rounded-xl">
      <h3 className="text-xl font-playfair text-cosmos-darkGold mb-3">Tu Carta del Día</h3>
      <div className="flex justify-center mb-4">
        <div className="w-48">
          <TarotCard 
            card={dailyCard.card} 
            isReversed={dailyCard.isReversed} 
            isRevealed={isCardRevealed}
            onClick={handleRevealCard}
          />
        </div>
      </div>
      {isCardRevealed ? (
        <div className="text-center">
          <h4 className="font-medium text-cosmos-darkGold mb-2">{dailyCard.card.name} {dailyCard.isReversed ? '(Invertida)' : ''}</h4>
          <p className="text-sm italic">
            {dailyCard.isReversed ? 
              dailyCard.card.meaningReversed[0] : 
              dailyCard.card.meaningUpright[0]
            }
          </p>
        </div>
      ) : (
        <Button 
          className="w-full button-effect px-4 py-2 bg-cosmos-pink bg-opacity-20 rounded-lg text-cosmos-darkGold border border-cosmos-pink"
          onClick={handleRevealCard}
        >
          Revelar Mi Carta
        </Button>
      )}
    </div>
  );
};

export default DailyTarot;
