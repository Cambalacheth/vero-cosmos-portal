
import React from 'react';
import { Sparkles } from 'lucide-react';

const WealthMapHeader = () => {
  return (
    <div className="glass-card p-5 rounded-xl">
      <div className="flex items-center justify-center mb-3">
        <Sparkles className="w-6 h-6 text-yellow-500 mr-2" />
        <h3 className="text-xl font-playfair text-cosmos-darkGold">Mapa de Riqueza Astrológica</h3>
      </div>
      
      <p className="text-sm mb-4">
        Basándonos en tu carta natal, analizamos las posiciones planetarias clave
        que influyen en tu capacidad para generar abundancia y éxito financiero.
      </p>
      
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="bg-cosmos-pink/10 p-3 rounded-lg">
          <p className="text-xs font-medium text-cosmos-darkGold">Casa 2</p>
          <p className="text-xs">Cómo ganas dinero naturalmente</p>
        </div>
        <div className="bg-cosmos-pink/10 p-3 rounded-lg">
          <p className="text-xs font-medium text-cosmos-darkGold">Casa 10</p>
          <p className="text-xs">Tu éxito y carrera ideal</p>
        </div>
        <div className="bg-cosmos-pink/10 p-3 rounded-lg">
          <p className="text-xs font-medium text-cosmos-darkGold">Júpiter & Saturno</p>
          <p className="text-xs">Expansión y disciplina financiera</p>
        </div>
        <div className="bg-cosmos-pink/10 p-3 rounded-lg">
          <p className="text-xs font-medium text-cosmos-darkGold">Casas 8 y 11</p>
          <p className="text-xs">Fuentes adicionales de riqueza</p>
        </div>
      </div>
      
      <p className="text-xs italic text-center">
        Descubre cómo los astros influyen en tu capacidad para manifestar abundancia
      </p>
    </div>
  );
};

export default WealthMapHeader;
