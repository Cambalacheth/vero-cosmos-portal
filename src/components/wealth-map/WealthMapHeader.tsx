
import React from 'react';
import { Sparkles } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';

const WealthMapHeader = () => {
  return (
    <div className="glass-card p-4 sm:p-5 rounded-xl overflow-hidden">
      <div className="flex items-center justify-center mb-3">
        <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-500 mr-2 flex-shrink-0" />
        <h3 className="text-lg sm:text-xl font-playfair text-cosmos-darkGold">Mapa de Riqueza Astrológica</h3>
      </div>
      
      <ScrollArea className="max-h-[calc(100vh-15rem)] overflow-auto pr-2">
        <div className="space-y-4">
          <p className="text-xs sm:text-sm mb-4">
            Basándonos en tu carta natal, analizamos las posiciones planetarias clave
            que influyen en tu capacidad para generar abundancia y éxito financiero.
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
            <div className="bg-cosmos-pink/10 p-3 rounded-lg">
              <p className="text-xs font-medium text-cosmos-darkGold">Casa 2</p>
              <p className="text-xs">Cómo ganas dinero naturalmente</p>
              <p className="text-xs text-green-600 mt-1">Disponible gratis</p>
            </div>
            <div className="bg-cosmos-pink/10 p-3 rounded-lg relative">
              <p className="text-xs font-medium text-cosmos-darkGold">Casa 10</p>
              <p className="text-xs">Tu éxito y carrera ideal</p>
              <p className="text-xs text-yellow-600 mt-1">Premium</p>
            </div>
            <div className="bg-cosmos-pink/10 p-3 rounded-lg relative">
              <p className="text-xs font-medium text-cosmos-darkGold">Júpiter & Saturno</p>
              <p className="text-xs">Expansión y disciplina financiera</p>
              <p className="text-xs text-yellow-600 mt-1">Premium</p>
            </div>
            <div className="bg-cosmos-pink/10 p-3 rounded-lg relative">
              <p className="text-xs font-medium text-cosmos-darkGold">Casas 8 y 11</p>
              <p className="text-xs">Fuentes adicionales de riqueza</p>
              <p className="text-xs text-yellow-600 mt-1">Premium</p>
            </div>
          </div>
          
          <p className="text-xs italic text-center">
            Descubre cómo los astros influyen en tu capacidad para manifestar abundancia
          </p>
        </div>
      </ScrollArea>
    </div>
  );
};

export default WealthMapHeader;
