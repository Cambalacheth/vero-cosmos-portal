
import React, { useState } from 'react';
import { NatalChartData } from '@/lib/natal-chart';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Sparkles, Calendar, MessageSquare, TrendingUp } from 'lucide-react';
import { getWealthMapFullAnalysis } from '@/lib/wealth-map-service';

// Import tab components
import OverviewTab from './tabs/OverviewTab';
import StrategyTab from './tabs/StrategyTab';
import CalendarTab from './tabs/CalendarTab';
import ChatTab from './tabs/ChatTab';

interface WealthMapResultsProps {
  natalChart: NatalChartData;
}

type ActionStatus = {
  id: number;
  completed: boolean;
};

const WealthMapResults: React.FC<WealthMapResultsProps> = ({ natalChart }) => {
  const [activeTab, setActiveTab] = useState("overview");
  const fullAnalysis = getWealthMapFullAnalysis(natalChart);
  const [actionStatuses, setActionStatuses] = useState<ActionStatus[]>(
    fullAnalysis.actionPlan.map((_, index) => ({ id: index, completed: false }))
  );
  
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
              <TrendingUp className="w-3 h-3 mr-1" /> Plan de Acción
            </TabsTrigger>
            <TabsTrigger value="calendar" className="text-xs">
              <Calendar className="w-3 h-3 mr-1" /> Calendario
            </TabsTrigger>
            <TabsTrigger value="chat" className="text-xs">
              <MessageSquare className="w-3 h-3 mr-1" /> Consulta
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="focus-visible:outline-none focus-visible:ring-0">
            <OverviewTab fullAnalysis={fullAnalysis} />
          </TabsContent>
          
          <TabsContent value="strategy" className="focus-visible:outline-none focus-visible:ring-0">
            <StrategyTab 
              fullAnalysis={fullAnalysis} 
              actionStatuses={actionStatuses} 
              setActionStatuses={setActionStatuses} 
            />
          </TabsContent>
          
          <TabsContent value="calendar" className="focus-visible:outline-none focus-visible:ring-0">
            <CalendarTab fullAnalysis={fullAnalysis} />
          </TabsContent>
          
          <TabsContent value="chat" className="focus-visible:outline-none focus-visible:ring-0">
            <ChatTab natalChart={natalChart} fullAnalysis={fullAnalysis} />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default WealthMapResults;
