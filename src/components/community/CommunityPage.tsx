
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import AddInsightForm from './AddInsightForm';
import InsightsList from './InsightsList';
import { Button } from '@/components/ui/button';
import { Sparkles, Users } from 'lucide-react';

const CommunityPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [showAddForm, setShowAddForm] = useState(false);
  const [refreshCounter, setRefreshCounter] = useState(0);
  const { user } = useAuth();

  const handleInsightAdded = () => {
    setShowAddForm(false);
    setRefreshCounter(prev => prev + 1);
  };

  return (
    <Card className="glass-card">
      <CardHeader>
        <CardTitle className="text-lg font-playfair text-cosmos-darkGold flex items-center">
          <Users className="w-5 h-5 mr-2" />
          <span>Comunidad Cósmica</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center mb-4">
          <p className="text-sm text-muted-foreground">
            Comparte y descubre consejos de otros viajeros cósmicos
          </p>
          {user && !showAddForm && (
            <Button 
              size="sm" 
              className="bg-cosmos-darkGold/70 hover:bg-cosmos-darkGold"
              onClick={() => setShowAddForm(true)}
            >
              <Sparkles className="w-3 h-3 mr-1" /> 
              Compartir
            </Button>
          )}
        </div>

        {showAddForm && (
          <div className="mb-6">
            <AddInsightForm onSuccess={handleInsightAdded} />
            <Button 
              variant="outline" 
              size="sm" 
              className="w-full mt-2"
              onClick={() => setShowAddForm(false)}
            >
              Cancelar
            </Button>
          </div>
        )}

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-6 mb-4">
            <TabsTrigger value="all" className="text-xs">
              Todos
            </TabsTrigger>
            <TabsTrigger value="wealth" className="text-xs">
              Riqueza
            </TabsTrigger>
            <TabsTrigger value="career" className="text-xs">
              Carrera
            </TabsTrigger>
            <TabsTrigger value="relationship" className="text-xs">
              Relaciones
            </TabsTrigger>
            <TabsTrigger value="spiritual" className="text-xs">
              Espiritual
            </TabsTrigger>
            <TabsTrigger value="health" className="text-xs">
              Salud
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value={activeTab} className="focus-visible:outline-none focus-visible:ring-0">
            <InsightsList 
              filter={activeTab === 'all' ? undefined : activeTab} 
              refreshTrigger={refreshCounter}
            />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default CommunityPage;
