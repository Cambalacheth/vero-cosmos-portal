
import React from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useOnboarding } from '@/contexts/OnboardingContext';
import { Moon, Sun } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';

const THEMES = [
  { id: 'cosmic-blue', label: 'Azul Cósmico', color: 'bg-blue-900' },
  { id: 'mystic-violet', label: 'Místico Violeta', color: 'bg-purple-900' },
  { id: 'golden-solar', label: 'Dorado Solar', color: 'bg-yellow-700' },
  { id: 'emerald-wisdom', label: 'Esmeralda Sabiduría', color: 'bg-emerald-800' },
];

const Step5Theme = () => {
  const { data, updateData, goToPreviousStep } = useOnboarding();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleThemeChange = (themeId: string) => {
    updateData({ theme: themeId });
  };

  const handleModeChange = (mode: string) => {
    updateData({ darkMode: mode === 'dark' });
  };

  const handleComplete = async () => {
    try {
      // Obtener el usuario actual
      const { data: sessionData } = await supabase.auth.getSession();
      
      if (sessionData.session?.user?.id) {
        // Aquí guardaríamos los datos del onboarding en una tabla de Supabase
        // Por ahora, simplemente mostramos un toast de éxito y redirigimos
        
        toast({
          title: "¡Onboarding completado!",
          description: "Tu portal cósmico está listo para ser explorado.",
        });
        
        // Redirigir al usuario a la página principal
        navigate('/home');
      } else {
        throw new Error('No se encontró una sesión de usuario');
      }
    } catch (error) {
      console.error('Error al completar el onboarding:', error);
      toast({
        title: "Error al completar el proceso",
        description: "Hubo un problema al guardar tus preferencias. Por favor intenta de nuevo.",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-playfair font-semibold tracking-tight text-cosmos-darkGold">
          Personalización Estética
        </h2>
        <p className="text-cosmos-darkGold/80 mt-2">
          ¿Cómo te gustaría que se vea tu espacio en la app?
        </p>
      </div>
      
      <div className="space-y-6">
        <div className="space-y-3">
          <Label className="text-cosmos-darkGold block mb-3">
            Elige un tema de color:
          </Label>
          
          <RadioGroup 
            value={data.theme} 
            onValueChange={handleThemeChange}
            className="grid grid-cols-2 gap-3"
          >
            {THEMES.map((theme) => (
              <div 
                key={theme.id}
                className={`flex items-center space-x-2 rounded-md border p-3 cursor-pointer transition-all ${
                  data.theme === theme.id 
                    ? 'border-cosmos-gold bg-cosmos-gold/20' 
                    : 'border-cosmos-gold/30 bg-white/20 hover:bg-white/30'
                }`}
              >
                <RadioGroupItem value={theme.id} id={theme.id} className="border-cosmos-gold/50" />
                <div className="flex items-center">
                  <div className={`w-4 h-4 rounded-full mr-2 ${theme.color}`}></div>
                  <Label htmlFor={theme.id} className="text-cosmos-darkGold cursor-pointer">
                    {theme.label}
                  </Label>
                </div>
              </div>
            ))}
          </RadioGroup>
        </div>
        
        <div className="space-y-3">
          <Label className="text-cosmos-darkGold block mb-3">
            Preferencia de apariencia:
          </Label>
          
          <RadioGroup 
            value={data.darkMode ? 'dark' : 'light'} 
            onValueChange={handleModeChange}
            className="grid grid-cols-2 gap-3"
          >
            <div 
              className={`flex items-center space-x-2 rounded-md border p-3 cursor-pointer transition-all ${
                !data.darkMode 
                  ? 'border-cosmos-gold bg-cosmos-gold/20' 
                  : 'border-cosmos-gold/30 bg-white/20 hover:bg-white/30'
              }`}
            >
              <RadioGroupItem value="light" id="light-mode" className="border-cosmos-gold/50" />
              <div className="flex items-center">
                <Sun className="w-4 h-4 mr-2 text-cosmos-gold" />
                <Label htmlFor="light-mode" className="text-cosmos-darkGold cursor-pointer">
                  Modo claro
                </Label>
              </div>
            </div>
            
            <div 
              className={`flex items-center space-x-2 rounded-md border p-3 cursor-pointer transition-all ${
                data.darkMode 
                  ? 'border-cosmos-gold bg-cosmos-gold/20' 
                  : 'border-cosmos-gold/30 bg-white/20 hover:bg-white/30'
              }`}
            >
              <RadioGroupItem value="dark" id="dark-mode" className="border-cosmos-gold/50" />
              <div className="flex items-center">
                <Moon className="w-4 h-4 mr-2 text-cosmos-gold" />
                <Label htmlFor="dark-mode" className="text-cosmos-darkGold cursor-pointer">
                  Modo oscuro
                </Label>
              </div>
            </div>
          </RadioGroup>
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
            onClick={handleComplete}
            className="flex-1 button-effect glass-card bg-cosmos-gold/20 hover:bg-cosmos-gold/40 text-cosmos-darkGold border border-cosmos-gold/30"
          >
            Finalizar
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Step5Theme;
