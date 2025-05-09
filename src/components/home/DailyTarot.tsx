
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Sparkles } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import TarotCard from '@/components/TarotCard';
import { drawCards } from '@/lib/tarot-data';
import { getTodaysTarotReading, saveTarotReading } from '@/lib/tarot-storage';
import { supabase } from '@/integrations/supabase/client';
import { TarotCard as TarotCardType } from '@/lib/tarot-data';

const DailyTarot = () => {
  const [isCardDrawn, setIsCardDrawn] = useState(false);
  const [isCardRevealed, setIsCardRevealed] = useState(false);
  const [drawnCard, setDrawnCard] = useState<{ card: TarotCardType, isReversed: boolean } | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  // Check if user has already drawn a card today
  useEffect(() => {
    const checkTodaysReading = async () => {
      try {
        // Check if user is logged in
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
          setIsLoading(false);
          return;
        }
        
        const todaysReading = await getTodaysTarotReading();
        
        if (todaysReading) {
          // Make sure we have a properly typed card before updating state
          const typedCardReading = {
            card: getTypedCard(todaysReading.card),
            isReversed: todaysReading.isReversed
          };
          
          setDrawnCard(typedCardReading);
          setIsCardDrawn(true);
          setIsCardRevealed(true);
        }
        
        setIsLoading(false);
      } catch (error) {
        console.error('Error checking today\'s reading:', error);
        setIsLoading(false);
      }
    };
    
    checkTodaysReading();
  }, []);
  
  const handleDrawCard = () => {
    // Draw a random card
    const drawn = drawCards(1)[0];
    setDrawnCard(drawn);
    setIsCardDrawn(true);
  };
  
  const handleRevealCard = async () => {
    if (!drawnCard) return;
    
    setIsCardRevealed(true);
    
    try {
      // Check if user is logged in
      const { data: { user } } = await supabase.auth.getUser();
      
      if (user) {
        // Save the reading for today
        await saveTarotReading(drawnCard);
      }
      
      toast({
        title: "Carta revelada",
        description: `Has obtenido la carta ${drawnCard.card.name}${drawnCard.isReversed ? ' invertida' : ''}.`,
      });
    } catch (error) {
      console.error('Error saving tarot reading:', error);
    }
  };

  // Ensure the card suit is properly typed
  const getTypedCard = (card: any): TarotCardType => {
    // Copy all properties
    const typedCard: TarotCardType = {
      id: card.id,
      name: card.name,
      arcana: card.arcana,
      meaningUpright: card.meaningUpright,
      meaningReversed: card.meaningReversed,
      description: card.description,
      imageUrl: card.imageUrl
    };
    
    // Add optional properties if they exist
    if (card.suit) {
      // Ensure suit is one of the allowed values
      if (['wands', 'cups', 'swords', 'pentacles'].includes(card.suit)) {
        typedCard.suit = card.suit as "wands" | "cups" | "swords" | "pentacles";
      }
    }
    
    if (card.element) {
      typedCard.element = card.element;
    }
    
    if (card.number !== undefined) {
      typedCard.number = card.number;
    }
    
    return typedCard;
  };
  
  if (isLoading) {
    return (
      <div className="glass-card p-4 rounded-xl min-h-[300px] flex flex-col items-center justify-center">
        <div className="animate-pulse">Cargando...</div>
      </div>
    );
  }
  
  return (
    <div className="glass-card p-4 rounded-xl">
      <h3 className="text-lg font-playfair text-cosmos-darkGold mb-2">
        Carta del Día
      </h3>
      
      {!isCardDrawn ? (
        <div className="flex flex-col items-center justify-center py-6">
          <p className="text-sm text-center text-gray-600 mb-4">
            Descubre qué energía te acompaña hoy con una tirada de tarot diaria
          </p>
          <Button 
            onClick={handleDrawCard}
            className="button-effect glass-card bg-cosmos-gold/20 hover:bg-cosmos-gold/40 text-cosmos-darkGold border border-cosmos-gold/30"
          >
            <Sparkles className="mr-2 h-4 w-4" />
            Tirar Carta
          </Button>
        </div>
      ) : (
        <div className="flex flex-col items-center">
          <div className="w-40 mx-auto">
            <TarotCard 
              card={drawnCard?.card}
              isRevealed={isCardRevealed} 
              isReversed={drawnCard?.isReversed || false}
            />
          </div>
          
          {!isCardRevealed && (
            <>
              <p className="text-sm text-center my-4 text-gray-600">
                ¿Lista para descubrir tu carta de hoy?
              </p>
              <Button 
                onClick={handleRevealCard}
                className="button-effect glass-card bg-cosmos-gold/20 hover:bg-cosmos-gold/40 text-cosmos-darkGold border border-cosmos-gold/30"
              >
                Revelar Carta
              </Button>
            </>
          )}
          
          {isCardRevealed && drawnCard && (
            <div className="mt-4 text-center">
              <h4 className="font-playfair text-cosmos-darkGold">
                {drawnCard.card.name} {drawnCard.isReversed ? '(Invertida)' : ''}
              </h4>
              <p className="text-sm my-2 text-gray-600">
                {drawnCard.isReversed 
                  ? drawnCard.card.meaningReversed[0]
                  : drawnCard.card.meaningUpright[0]}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default DailyTarot;
