
import React from 'react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { CheckCircle2 } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

type ActionStatus = {
  id: number;
  completed: boolean;
};

interface StrategyTabProps {
  fullAnalysis: any;
  actionStatuses: ActionStatus[];
  setActionStatuses: React.Dispatch<React.SetStateAction<ActionStatus[]>>;
}

const StrategyTab: React.FC<StrategyTabProps> = ({ 
  fullAnalysis, 
  actionStatuses, 
  setActionStatuses 
}) => {
  const { toast } = useToast();
  
  const markActionComplete = (index: number) => {
    setActionStatuses(prev => 
      prev.map(status => 
        status.id === index ? { ...status, completed: !status.completed } : status
      )
    );
    
    toast({
      title: actionStatuses.find(s => s.id === index)?.completed 
        ? "Acción pendiente" 
        : "Acción completada",
      description: actionStatuses.find(s => s.id === index)?.completed 
        ? "Has marcado esta acción como pendiente." 
        : "Has marcado esta acción como completada. ¡Buen trabajo!",
    });
  };
  
  return (
    <div className="space-y-4">
      <h3 className="text-sm font-medium text-cosmos-gold">Plan de Acción Personalizado</h3>
      <p className="text-xs italic mb-4">Acciones específicas para manifestar prosperidad basadas en tu carta natal</p>
      
      <ScrollArea className="max-h-[400px] pr-2">
        <div className="space-y-3">
          {fullAnalysis.actionPlan.map((action: any, index: number) => (
            <div 
              key={index} 
              className={`bg-cosmos-pink/10 p-3 rounded-lg transition-all ${
                actionStatuses[index]?.completed ? 'bg-green-50 border border-green-200' : ''
              }`}
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h4 className={`text-sm font-medium mb-1 ${
                    actionStatuses[index]?.completed ? 'text-green-700 line-through' : 'text-cosmos-darkGold'
                  }`}>
                    {action.title}
                  </h4>
                  <p className={`text-xs ${
                    actionStatuses[index]?.completed ? 'text-green-600' : ''
                  }`}>
                    {action.description}
                  </p>
                  {action.timing && (
                    <p className="text-xs mt-2 text-cosmos-darkGold">Mejor momento: {action.timing}</p>
                  )}
                </div>
                <Button 
                  variant={actionStatuses[index]?.completed ? "default" : "ghost"}
                  size="icon" 
                  className={`h-8 w-8 rounded-full ${
                    actionStatuses[index]?.completed 
                      ? 'bg-green-500 text-white hover:bg-green-600' 
                      : 'text-cosmos-darkGold hover:text-cosmos-gold'
                  }`}
                  onClick={() => markActionComplete(index)}
                >
                  <CheckCircle2 className="h-5 w-5" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default StrategyTab;
