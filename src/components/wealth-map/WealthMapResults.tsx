
import React, { useState } from 'react';
import { NatalChartData } from '@/lib/natal-chart';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Sparkles, Calendar, MessageSquare, TrendingUp } from 'lucide-react';
import { getWealthMapFullAnalysis } from '@/lib/wealth-map-service';

interface WealthMapResultsProps {
  natalChart: NatalChartData;
}

const WealthMapResults: React.FC<WealthMapResultsProps> = ({ natalChart }) => {
  const [activeTab, setActiveTab] = useState("overview");
  const fullAnalysis = getWealthMapFullAnalysis(natalChart);
  
  return (
    <Card className="glass-card">
      <CardHeader>
        <CardTitle className="text-lg font-playfair text-cosmos-darkGold flex items-center">
          <span className="mr-2">Tu Mapa de Riqueza Astrológica</span>
          <span className="text-yellow-500 text-sm">✧ Versión Premium ✧</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-4 mb-4">
            <TabsTrigger value="overview" className="text-xs">
              <Sparkles className="w-3 h-3 mr-1" /> Visión General
            </TabsTrigger>
            <TabsTrigger value="strategy" className="text-xs">
              <TrendingUp className="w-3 h-3 mr-1" /> Estrategias
            </TabsTrigger>
            <TabsTrigger value="calendar" className="text-xs">
              <Calendar className="w-3 h-3 mr-1" /> Calendario
            </TabsTrigger>
            <TabsTrigger value="chat" className="text-xs">
              <MessageSquare className="w-3 h-3 mr-1" /> Consulta
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="focus-visible:outline-none focus-visible:ring-0">
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
          </TabsContent>
          
          <TabsContent value="strategy" className="focus-visible:outline-none focus-visible:ring-0">
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-cosmos-gold">Estrategias Personalizadas</h3>
              
              <section className="mb-4">
                <h4 className="text-sm font-medium mb-1 text-cosmos-darkGold">Cómo Generar Ingresos</h4>
                <ul className="list-disc pl-5 space-y-2 text-sm">
                  {fullAnalysis.incomeStrategies.map((strategy, index) => (
                    <li key={index}>{strategy}</li>
                  ))}
                </ul>
              </section>
              
              <section className="mb-4">
                <h4 className="text-sm font-medium mb-1 text-cosmos-darkGold">Áreas Profesionales Recomendadas</h4>
                <ul className="list-disc pl-5 space-y-2 text-sm">
                  {fullAnalysis.careerRecommendations.map((career, index) => (
                    <li key={index}>{career}</li>
                  ))}
                </ul>
              </section>
              
              <section>
                <h4 className="text-sm font-medium mb-1 text-cosmos-darkGold">Cómo Atraer Oportunidades</h4>
                <ul className="list-disc pl-5 space-y-2 text-sm">
                  {fullAnalysis.opportunityAttractionTips.map((tip, index) => (
                    <li key={index}>{tip}</li>
                  ))}
                </ul>
              </section>
            </div>
          </TabsContent>
          
          <TabsContent value="calendar" className="focus-visible:outline-none focus-visible:ring-0">
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-cosmos-gold">Calendario Financiero</h3>
              <p className="text-xs italic mb-4">Fechas clave para tomar decisiones económicas en los próximos meses</p>
              
              <div className="space-y-3">
                {fullAnalysis.financialCalendar.map((entry, index) => (
                  <div key={index} className="bg-cosmos-pink/10 p-3 rounded-lg">
                    <div className="flex justify-between items-center mb-1">
                      <h4 className="text-sm font-medium text-cosmos-darkGold">{entry.date}</h4>
                      <span className="text-xs bg-yellow-500/20 px-2 py-0.5 rounded-full text-yellow-700">
                        {entry.transitType}
                      </span>
                    </div>
                    <p className="text-xs">{entry.recommendation}</p>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="chat" className="focus-visible:outline-none focus-visible:ring-0">
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-cosmos-gold">Consulta con IA Astrológica</h3>
              <p className="text-xs italic mb-4">
                Haz preguntas específicas sobre tu situación financiera y recibe consejos basados en tu carta natal
              </p>
              
              <div className="border border-cosmos-pink/30 rounded-lg p-3 mb-4 h-60 overflow-y-auto">
                <div className="space-y-2">
                  {fullAnalysis.sampleQuestions.map((question, index) => (
                    <div key={index} className="text-xs p-2 bg-cosmos-pink/5 rounded-lg">
                      {question}
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="flex gap-2">
                <input 
                  type="text" 
                  placeholder="Haz una pregunta sobre tu abundancia..." 
                  className="flex-1 px-3 py-2 text-sm bg-white bg-opacity-30 border border-cosmos-pink rounded-lg"
                />
                <button className="px-4 py-2 bg-cosmos-pink/20 rounded-lg text-cosmos-darkGold border border-cosmos-pink">
                  Preguntar
                </button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default WealthMapResults;
