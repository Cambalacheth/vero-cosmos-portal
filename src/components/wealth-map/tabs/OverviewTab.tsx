
import React from 'react';
import { Card } from '@/components/ui/card';

interface OverviewTabProps {
  fullAnalysis: any;
}

const OverviewTab: React.FC<OverviewTabProps> = ({ fullAnalysis }) => {
  return (
    <div className="space-y-4">
      <section className="mb-4">
        <h3 className="text-sm font-medium mb-2 text-cosmos-gold">Tu Perfil Financiero</h3>
        <p className="text-sm">{fullAnalysis.summary}</p>
      </section>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <section className="bg-cosmos-pink/10 p-3 rounded-lg">
          <h4 className="text-sm font-medium mb-1 text-cosmos-darkGold">Casa 2: Tu Relación con el Dinero</h4>
          <p className="text-xs">{fullAnalysis.house2Analysis}</p>
        </section>
        
        <section className="bg-cosmos-pink/10 p-3 rounded-lg">
          <h4 className="text-sm font-medium mb-1 text-cosmos-darkGold">Casa 10: Tu Carrera Ideal</h4>
          <p className="text-xs">{fullAnalysis.house10Analysis}</p>
        </section>
        
        <section className="bg-cosmos-pink/10 p-3 rounded-lg">
          <h4 className="text-sm font-medium mb-1 text-cosmos-darkGold">Júpiter & Saturno</h4>
          <p className="text-xs">{fullAnalysis.jupiterSaturnAnalysis}</p>
        </section>
        
        <section className="bg-cosmos-pink/10 p-3 rounded-lg">
          <h4 className="text-sm font-medium mb-1 text-cosmos-darkGold">Casas 8 y 11</h4>
          <p className="text-xs">{fullAnalysis.houses8And11Analysis}</p>
        </section>
      </div>
    </div>
  );
};

export default OverviewTab;
