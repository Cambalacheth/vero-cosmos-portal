
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Calendar } from 'lucide-react';
import { useOnboarding } from '@/contexts/OnboardingContext';

const Step1BirthInfo = () => {
  const { data, updateData, goToNextStep } = useOnboarding();
  const [birthDateError, setBirthDateError] = useState('');
  const [birthPlaceError, setBirthPlaceError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    let isValid = true;
    
    // Validaciones
    if (!data.birthDate) {
      setBirthDateError('Por favor, ingresa tu fecha de nacimiento');
      isValid = false;
    } else {
      setBirthDateError('');
    }
    
    if (!data.birthPlace) {
      setBirthPlaceError('Por favor, ingresa tu lugar de nacimiento');
      isValid = false;
    } else {
      setBirthPlaceError('');
    }
    
    if (isValid) {
      goToNextStep();
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-playfair font-semibold tracking-tight text-cosmos-darkGold">
          Datos para tu Carta Astral
        </h2>
        <p className="text-cosmos-darkGold/80 mt-2">
          Con estos datos podremos calcular tu carta natal con precisión
        </p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="birthDate" className="text-cosmos-darkGold">
            Fecha de nacimiento
          </Label>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-cosmos-darkGold opacity-70" />
            <Input
              id="birthDate"
              type="date"
              value={data.birthDate || ''}
              onChange={(e) => updateData({ birthDate: e.target.value })}
              className="pl-10 bg-white/30 border-cosmos-gold/30"
            />
          </div>
          {birthDateError && <p className="text-pink-500 text-sm mt-1">{birthDateError}</p>}
        </div>
        
        <div className="space-y-2">
          <Label className="text-cosmos-darkGold">
            ¿Conoces tu hora exacta de nacimiento?
          </Label>
          <RadioGroup 
            value={data.knowsBirthTime || ''} 
            onValueChange={(value) => updateData({ 
              knowsBirthTime: value as 'yes' | 'approximate' | 'no'
            })}
            className="grid grid-cols-1 gap-2"
          >
            <div className="flex items-center space-x-2 rounded-md border border-cosmos-gold/30 p-3 bg-white/20">
              <RadioGroupItem value="yes" id="time-yes" className="border-cosmos-gold/50" />
              <Label htmlFor="time-yes" className="text-cosmos-darkGold">Sí, la conozco</Label>
            </div>
            
            <div className="flex items-center space-x-2 rounded-md border border-cosmos-gold/30 p-3 bg-white/20">
              <RadioGroupItem value="approximate" id="time-approximate" className="border-cosmos-gold/50" />
              <Label htmlFor="time-approximate" className="text-cosmos-darkGold">Tengo un aproximado</Label>
            </div>
            
            <div className="flex items-center space-x-2 rounded-md border border-cosmos-gold/30 p-3 bg-white/20">
              <RadioGroupItem value="no" id="time-no" className="border-cosmos-gold/50" />
              <Label htmlFor="time-no" className="text-cosmos-darkGold">No la sé / Quiero calcularla después</Label>
            </div>
          </RadioGroup>
        </div>
        
        {(data.knowsBirthTime === 'yes' || data.knowsBirthTime === 'approximate') && (
          <div className="space-y-2">
            <Label htmlFor="birthTime" className="text-cosmos-darkGold">
              Hora de nacimiento
            </Label>
            <Input
              id="birthTime"
              type="time"
              value={data.birthTime || ''}
              onChange={(e) => updateData({ birthTime: e.target.value })}
              className="bg-white/30 border-cosmos-gold/30"
            />
          </div>
        )}
        
        <div className="space-y-2">
          <Label htmlFor="birthPlace" className="text-cosmos-darkGold">
            Lugar de nacimiento
          </Label>
          <Input
            id="birthPlace"
            type="text"
            placeholder="Ej: Buenos Aires, Argentina"
            value={data.birthPlace || ''}
            onChange={(e) => updateData({ birthPlace: e.target.value })}
            className="bg-white/30 border-cosmos-gold/30"
          />
          {birthPlaceError && <p className="text-pink-500 text-sm mt-1">{birthPlaceError}</p>}
        </div>
        
        <Button 
          type="submit"
          className="w-full mt-4 button-effect glass-card bg-cosmos-gold/20 hover:bg-cosmos-gold/40 text-cosmos-darkGold border border-cosmos-gold/30"
        >
          Continuar
        </Button>
      </form>
    </div>
  );
};

export default Step1BirthInfo;
