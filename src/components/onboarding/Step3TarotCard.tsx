
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useOnboarding } from '@/contexts/OnboardingContext';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

// Datos de ejemplo para las cartas de tarot, en un proyecto real se obtendrían de una API o base de datos
const TAROT_CARDS = [
  {
    id: 'magician',
    name: 'El Mago',
    image: 'https://www.trustedtarot.com/img/cards/the-magician.png',
    description: 'El Mago representa nuevos comienzos, manifestación y el poder de transformar tus sueños en realidad. Sugiere que tienes todas las herramientas que necesitas para tener éxito.'
  },
  {
    id: 'high-priestess',
    name: 'La Sacerdotisa',
    image: 'https://www.trustedtarot.com/img/cards/the-high-priestess.png',
    description: 'La Sacerdotisa simboliza intuición, sabiduría subconsciente y conocimiento espiritual. Te invita a escuchar tu voz interior y confiar en tu intuición.'
  },
  {
    id: 'star',
    name: 'La Estrella',
    image: 'https://www.trustedtarot.com/img/cards/the-star.png',
    description: 'La Estrella representa esperanza, inspiración y generosidad. Sugiere un período de renovación espiritual y la promesa de un futuro brillante.'
  },
  {
    id: 'sun',
    name: 'El Sol',
    image: 'https://www.trustedtarot.com/img/cards/the-sun.png',
    description: 'El Sol simboliza vitalidad, alegría y éxito. Indica que estás entrando en un período de claridad, optimismo y realización personal.'
  }
];

const Step3TarotCard = () => {
  const { data, updateData, goToNextStep, goToPreviousStep } = useOnboarding();
  const [showCardDialog, setShowCardDialog] = useState(false);
  const [selectedCardData, setSelectedCardData] = useState<typeof TAROT_CARDS[0] | null>(null);

  const handleCardSelection = (cardId: string) => {
    const cardData = TAROT_CARDS.find(card => card.id === cardId);
    
    if (cardData) {
      setSelectedCardData(cardData);
      updateData({ selectedCard: cardId });
      setShowCardDialog(true);
    }
  };

  const handleContinue = () => {
    goToNextStep();
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-playfair font-semibold tracking-tight text-cosmos-darkGold">
          Conexión con el Tarot
        </h2>
        <p className="text-cosmos-darkGold/80 mt-2">
          Elige una carta que te represente en este momento...
        </p>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        {TAROT_CARDS.map((card) => (
          <div 
            key={card.id}
            className={`relative rounded-lg overflow-hidden cursor-pointer transition-all transform hover:scale-105 ${
              data.selectedCard === card.id ? 'ring-2 ring-cosmos-gold scale-105' : ''
            }`}
            onClick={() => handleCardSelection(card.id)}
          >
            <div className="aspect-[2/3] bg-black/30 backdrop-blur-sm flex items-center justify-center rounded-lg">
              <img 
                src={card.image} 
                alt={card.name} 
                className="max-h-full object-contain"
              />
            </div>
          </div>
        ))}
      </div>
      
      <div className="flex gap-3 pt-4">
        <Button 
          type="button"
          onClick={goToPreviousStep}
          variant="outline"
          className="flex-1 button-effect bg-white/10 hover:bg-white/20 text-cosmos-darkGold border border-cosmos-gold/30"
        >
          Atrás
        </Button>
        
        <Button 
          type="button"
          onClick={handleContinue}
          disabled={!data.selectedCard}
          className="flex-1 button-effect glass-card bg-cosmos-gold/20 hover:bg-cosmos-gold/40 text-cosmos-darkGold border border-cosmos-gold/30"
        >
          Continuar
        </Button>
      </div>
      
      {/* Diálogo que muestra la carta seleccionada */}
      <Dialog open={showCardDialog} onOpenChange={setShowCardDialog}>
        <DialogContent className="bg-black/80 backdrop-blur-lg border-cosmos-gold/50 text-white max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl font-playfair text-cosmos-gold text-center">
              {selectedCardData?.name}
            </DialogTitle>
          </DialogHeader>
          
          <div className="flex flex-col items-center gap-4 py-4">
            <div className="w-40 mx-auto">
              <img 
                src={selectedCardData?.image}
                alt={selectedCardData?.name}
                className="w-full"
              />
            </div>
            
            <p className="text-cosmos-darkGold text-center">
              {selectedCardData?.description}
            </p>
            
            <Button 
              onClick={() => setShowCardDialog(false)}
              className="mt-2 button-effect glass-card bg-cosmos-gold/20 hover:bg-cosmos-gold/40 text-cosmos-darkGold border border-cosmos-gold/30"
            >
              Entendido
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Step3TarotCard;
