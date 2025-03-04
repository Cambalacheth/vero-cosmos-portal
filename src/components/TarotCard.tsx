
import React from 'react';
import { type TarotCard as TarotCardType } from '@/lib/tarot-data';
import { cn } from '@/lib/utils';

interface TarotCardProps {
  card: TarotCardType;
  isReversed?: boolean;
  isRevealed?: boolean;
  onClick?: () => void;
  className?: string;
}

const TarotCard: React.FC<TarotCardProps> = ({
  card,
  isReversed = false,
  isRevealed = true,
  onClick,
  className,
}) => {
  // Card back design for unrevealed cards
  const cardBackUrl = "https://via.placeholder.com/300x500/5f4b8b/e0d8c0?text=Tarot";
  
  return (
    <div 
      className={cn(
        "group relative cursor-pointer perspective-1000",
        className
      )}
      onClick={onClick}
    >
      <div 
        className={cn(
          "relative rounded-xl overflow-hidden shadow-md transition-all duration-700 transform-style-3d w-full h-full",
          isRevealed ? "rotate-y-0" : "rotate-y-180",
        )}
        style={{ 
          aspectRatio: '2/3',
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Front of card */}
        <div 
          className={cn(
            "absolute inset-0 backface-hidden w-full h-full transition-transform duration-500",
            isReversed ? "rotate-180" : ""
          )}
          style={{ 
            backfaceVisibility: 'hidden',
            transform: isRevealed ? 'rotateY(0deg)' : 'rotateY(180deg)',
          }}
        >
          <img 
            src={card.imageUrl} 
            alt={`${card.name}${isReversed ? ' (Invertida)' : ''}`}
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-60 text-white p-2 text-sm text-center">
            {card.name}{isReversed ? ' (Invertida)' : ''}
          </div>
        </div>
        
        {/* Back of card */}
        <div 
          className="absolute inset-0 backface-hidden w-full h-full"
          style={{ 
            backfaceVisibility: 'hidden',
            transform: isRevealed ? 'rotateY(-180deg)' : 'rotateY(0deg)',
          }}
        >
          <img 
            src={cardBackUrl} 
            alt="Tarot card back"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default TarotCard;
