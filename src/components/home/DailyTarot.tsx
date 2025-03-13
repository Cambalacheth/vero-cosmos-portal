
import React, { useState, useEffect } from 'react';
import { Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import TarotCard from '@/components/TarotCard';
import { drawCards } from '@/lib/tarot-data';
import { saveTarotReading, getTodaysTarotReading, DrawnCard } from '@/lib/tarot-storage';
import { useToast } from '@/components/ui/use-toast';

const DailyTarot: React.FC = () => {
  const { toast } = useToast();
  const [isCardRevealed, setIsCardRevealed] = useState(false);
  const [dailyCard, setDailyCard] = useState<DrawnCard | null>(null);
  const [hasDrawnToday, setHasDrawnToday] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user has already drawn a card today
    const checkTodaysReading = async () => {
      setIsLoading(true);
      try {
        const savedReading = await getTodaysTarotReading();
        if (savedReading) {
          setDailyCard(savedReading);
          setHasDrawnToday(true);
          setIsCardRevealed(true);
        } else {
          // No reading yet today, prepare a new card
          setDailyCard(drawCards(1)[0] as unknown as DrawnCard);
          setIsCardRevealed(false);
        }
      } catch (error) {
        console.error('Error checking today\'s reading:', error);
        // Fall back to a new card
        setDailyCard(drawCards(1)[0] as unknown as DrawnCard);
        setIsCardRevealed(false);
      } finally {
        setIsLoading(false);
      }
    };
    
    checkTodaysReading();
  }, []);

  const handleRevealCard = async () => {
    if (!dailyCard) return;
    
    setIsCardRevealed(true);
    
    // Save today's reading if not already saved
    if (!hasDrawnToday) {
      try {
        const success = await saveTarotReading(dailyCard);
        if (success) {
          setHasDrawnToday(true);
          toast({
            title: "Carta guardada",
            description: "Tu carta del día ha sido guardada.",
            duration: 3000,
          });
        } else {
          toast({
            title: "Error",
            description: "No se pudo guardar la carta. Inténtalo de nuevo más tarde.",
            variant: "destructive",
            duration: 5000,
          });
        }
      } catch (error) {
        console.error('Error saving card:', error);
        toast({
          title: "Error",
          description: "Ocurrió un error al guardar tu carta.",
          variant: "destructive",
          duration: 5000,
        });
      }
    }
  };

  if (isLoading) {
    return (
      <div className="glass-card p-4 rounded-xl">
        <h3 className="text-xl font-playfair text-cosmos-darkGold mb-3">Tu Carta del Día</h3>
        <div className="flex justify-center items-center h-48">
          <p className="text-cosmos-darkGold">Cargando tu carta...</p>
        </div>
      </div>
    );
  }

  if (!dailyCard) {
    return (
      <div className="glass-card p-4 rounded-xl">
        <h3 className="text-xl font-playfair text-cosmos-darkGold mb-3">Tu Carta del Día</h3>
        <div className="flex justify-center items-center h-48">
          <p className="text-cosmos-darkGold">No se pudo cargar tu carta. Inténtalo más tarde.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="glass-card p-4 rounded-xl">
      <h3 className="text-xl font-playfair text-cosmos-darkGold mb-3">Tu Carta del Día</h3>
      <div className="flex justify-center mb-4">
        <div className="w-48">
          <TarotCard 
            card={{
              ...dailyCard.card,
              imageUrl: dailyCard.card.imageUrl // Make sure imageUrl is used
            }}
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
          disabled={hasDrawnToday && !isCardRevealed}
        >
          {hasDrawnToday && !isCardRevealed ? "Ya has tirado el tarot hoy" : "Revelar Mi Carta"}
        </Button>
      )}
    </div>
  );
};

export default DailyTarot;
