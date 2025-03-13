
import React from 'react';
import { NatalChartData } from '@/lib/natal-chart';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Lock, MessageSquare, Calendar, CheckSquare } from 'lucide-react';
import { getWealthMapBasicAnalysis } from '@/lib/wealth-map-service';

interface WealthMapPreviewProps {
  natalChart: NatalChartData;
  onUpgrade: () => void;
}

const WealthMapPreview: React.FC<WealthMapPreviewProps> = ({ natalChart, onUpgrade }) => {
  const basicAnalysis = getWealthMapBasicAnalysis(natalChart);
  
  return (
    <div className="space-y-6">
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="text-lg font-playfair text-cosmos-darkGold flex items-center">
            <span className="mr-2">Tu Perfil Financiero Astrológico</span>
            <span className="text-yellow-500 text-sm">✧ Versión Gratuita ✧</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-6">
            <h4 className="font-medium mb-2 text-cosmos-gold">Casa 2: Tu Relación con el Dinero</h4>
            <p className="text-sm">{basicAnalysis.house2Analysis}</p>
          </div>
          
          <div className="mb-4 glass-card p-3 rounded-lg flex items-center space-x-2">
            <Lock className="w-4 h-4 text-cosmos-darkGold" />
            <div>
              <h4 className="font-medium text-sm text-cosmos-darkGold">Casa 10: Tu Carrera Ideal</h4>
              <p className="text-xs text-gray-500">Contenido premium</p>
            </div>
          </div>
          
          <div className="mb-4 glass-card p-3 rounded-lg flex items-center space-x-2">
            <Lock className="w-4 h-4 text-cosmos-darkGold" />
            <div>
              <h4 className="font-medium text-sm text-cosmos-darkGold">Júpiter & Saturno</h4>
              <p className="text-xs text-gray-500">Contenido premium</p>
            </div>
          </div>
          
          <div className="mb-4 glass-card p-3 rounded-lg flex items-center space-x-2">
            <Lock className="w-4 h-4 text-cosmos-darkGold" />
            <div>
              <h4 className="font-medium text-sm text-cosmos-darkGold">Casas 8 y 11</h4>
              <p className="text-xs text-gray-500">Contenido premium</p>
            </div>
          </div>
          
          <div className="space-y-3 mb-4">
            <div className="flex items-center space-x-2 text-xs text-gray-500">
              <Lock className="w-3 h-3 text-cosmos-darkGold" />
              <div className="flex items-center">
                <MessageSquare className="w-3 h-3 mr-1 text-cosmos-darkGold" />
                <span>Consulta IA Astrológica Personalizada</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-2 text-xs text-gray-500">
              <Lock className="w-3 h-3 text-cosmos-darkGold" />
              <div className="flex items-center">
                <Calendar className="w-3 h-3 mr-1 text-cosmos-darkGold" />
                <span>Calendario Financiero Personalizado</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-2 text-xs text-gray-500">
              <Lock className="w-3 h-3 text-cosmos-darkGold" />
              <div className="flex items-center">
                <CheckSquare className="w-3 h-3 mr-1 text-cosmos-darkGold" />
                <span>Plan de Acción Personalizado</span>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col">
          <div className="w-full glass-card p-3 rounded-lg mb-4">
            <p className="text-xs text-center">
              Desbloquea el análisis completo con consejos específicos para manifestar abundancia, 
              calendario financiero personalizado y mucho más.
            </p>
          </div>
          <Button 
            className="w-full button-effect px-4 py-2 bg-cosmos-pink bg-opacity-20 
                     rounded-lg text-cosmos-darkGold border border-cosmos-pink"
            onClick={onUpgrade}
          >
            Desbloquear Versión Premium
          </Button>
        </CardFooter>
      </Card>
      
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="text-lg font-playfair text-cosmos-darkGold">Consejo Financiero del Mes</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm">{basicAnalysis.monthlyTip}</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default WealthMapPreview;
