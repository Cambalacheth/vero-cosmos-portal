
import React from 'react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { useOnboarding } from '@/contexts/OnboardingContext';
import { Moon, Heart, Briefcase, Sparkles, Clipboard } from 'lucide-react';

const INTERESTS = [
  { id: 'moon-phases', label: 'Fases lunares y rituales', icon: <Moon className="h-5 w-5 text-cosmos-gold" /> },
  { id: 'love-astrology', label: 'Astrología del amor y relaciones', icon: <Heart className="h-5 w-5 text-cosmos-gold" /> },
  { id: 'career', label: 'Carrera y propósito de vida', icon: <Briefcase className="h-5 w-5 text-cosmos-gold" /> },
  { id: 'spirituality', label: 'Espiritualidad y bienestar', icon: <Sparkles className="h-5 w-5 text-cosmos-gold" /> },
  { id: 'tarot', label: 'Tarot y simbolismo', icon: <Clipboard className="h-5 w-5 text-cosmos-gold" /> },
];

const Step4Interests = () => {
  const { data, updateData, goToNextStep, goToPreviousStep } = useOnboarding();

  const toggleInterest = (interest: string) => {
    const updatedInterests = [...data.interests];
    
    if (updatedInterests.includes(interest)) {
      updateData({ interests: updatedInterests.filter(i => i !== interest) });
    } else {
      updateData({ interests: [...updatedInterests, interest] });
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
          Áreas de Interés
        </h2>
        <p className="text-cosmos-darkGold/80 mt-2">
          ¿En qué temas te gustaría recibir contenido y consejos?
        </p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-3">
          {INTERESTS.map((interest) => (
            <div 
              key={interest.id}
              className={`flex items-center space-x-3 rounded-md border p-3 cursor-pointer transition-all ${
                data.interests.includes(interest.id) 
                  ? 'border-cosmos-gold bg-cosmos-gold/20' 
                  : 'border-cosmos-gold/30 bg-white/20 hover:bg-white/30'
              }`}
              onClick={() => toggleInterest(interest.id)}
            >
              <div className="flex items-center h-5">
                <Checkbox 
                  id={interest.id}
                  checked={data.interests.includes(interest.id)}
                  onCheckedChange={() => toggleInterest(interest.id)}
                  className="border-cosmos-gold/50 data-[state=checked]:bg-cosmos-gold"
                />
              </div>
              <div className="flex items-center flex-1">
                <Label 
                  htmlFor={interest.id} 
                  className="text-cosmos-darkGold flex items-center cursor-pointer"
                >
                  <span className="mr-2">{interest.icon}</span>
                  {interest.label}
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
            disabled={data.interests.length === 0}
            className="flex-1 button-effect glass-card bg-cosmos-gold/20 hover:bg-cosmos-gold/40 text-cosmos-darkGold border border-cosmos-gold/30"
          >
            Continuar
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Step4Interests;
