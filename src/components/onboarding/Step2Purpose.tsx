
import React from 'react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { useOnboarding } from '@/contexts/OnboardingContext';
import { Star, Moon, Heart, Coins, Rocket, Sparkles } from 'lucide-react';

const REASONS = [
  { id: 'natal-chart', label: 'Conocer mejor mi carta natal', icon: <Star className="h-5 w-5 text-cosmos-gold" /> },
  { id: 'learn-astrology', label: 'Aprender sobre astrología/tarot', icon: <Moon className="h-5 w-5 text-cosmos-gold" /> },
  { id: 'spiritual-guidance', label: 'Obtener guía espiritual diaria', icon: <Sparkles className="h-5 w-5 text-cosmos-gold" /> },
  { id: 'improve-relationships', label: 'Mejorar mis relaciones', icon: <Heart className="h-5 w-5 text-cosmos-gold" /> },
  { id: 'financial-destiny', label: 'Entender mi destino financiero', icon: <Coins className="h-5 w-5 text-cosmos-gold" /> },
  { id: 'personal-growth', label: 'Crecimiento personal', icon: <Rocket className="h-5 w-5 text-cosmos-gold" /> },
];

const Step2Purpose = () => {
  const { data, updateData, goToNextStep, goToPreviousStep } = useOnboarding();

  const toggleReason = (reason: string) => {
    const updatedReasons = [...data.reasons];
    
    if (updatedReasons.includes(reason)) {
      updateData({ reasons: updatedReasons.filter(r => r !== reason) });
    } else {
      updateData({ reasons: [...updatedReasons, reason] });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    goToNextStep();
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-playfair font-semibold tracking-tight text-cosmos-darkGold">
          Propósito y Expectativas
        </h2>
        <p className="text-cosmos-darkGold/80 mt-2">
          ¿Qué te trajo hasta aquí? Selecciona todas las opciones que apliquen
        </p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-3">
          {REASONS.map((reason) => (
            <div 
              key={reason.id}
              className={`flex items-center space-x-3 rounded-md border p-3 cursor-pointer transition-all ${
                data.reasons.includes(reason.id) 
                  ? 'border-cosmos-gold bg-cosmos-gold/20' 
                  : 'border-cosmos-gold/30 bg-white/20 hover:bg-white/30'
              }`}
              onClick={() => toggleReason(reason.id)}
            >
              <div className="flex items-center h-5">
                <Checkbox 
                  id={reason.id}
                  checked={data.reasons.includes(reason.id)}
                  onCheckedChange={() => toggleReason(reason.id)}
                  className="border-cosmos-gold/50 data-[state=checked]:bg-cosmos-gold"
                />
              </div>
              <div className="flex items-center flex-1">
                <Label 
                  htmlFor={reason.id} 
                  className="text-cosmos-darkGold flex items-center cursor-pointer"
                >
                  <span className="mr-2">{reason.icon}</span>
                  {reason.label}
                </Label>
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
            type="submit"
            className="flex-1 button-effect glass-card bg-cosmos-gold/20 hover:bg-cosmos-gold/40 text-cosmos-darkGold border border-cosmos-gold/30"
          >
            Continuar
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Step2Purpose;
