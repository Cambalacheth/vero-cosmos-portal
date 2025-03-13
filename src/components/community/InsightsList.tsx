
import React, { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ThumbsUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';

interface Insight {
  id: string;
  title: string;
  content: string;
  type: string;
  created_at: string;
  likes: number;
  user_id: string;
}

const typeLabels: Record<string, string> = {
  wealth: 'Riqueza',
  career: 'Carrera',
  relationship: 'Relaciones',
  spiritual: 'Espiritualidad',
  health: 'Salud',
};

const typeColors: Record<string, string> = {
  wealth: 'bg-yellow-500/20 text-yellow-700',
  career: 'bg-blue-500/20 text-blue-700',
  relationship: 'bg-pink-500/20 text-pink-700',
  spiritual: 'bg-purple-500/20 text-purple-700',
  health: 'bg-green-500/20 text-green-700',
};

interface InsightsListProps {
  filter?: string;
  refreshTrigger?: number;
}

const InsightsList: React.FC<InsightsListProps> = ({ filter, refreshTrigger = 0 }) => {
  const [insights, setInsights] = useState<Insight[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const { user } = useAuth();

  useEffect(() => {
    const fetchInsights = async () => {
      setLoading(true);
      try {
        let query = supabase
          .from('community_insights')
          .select('*')
          .order('created_at', { ascending: false });
        
        if (filter && filter !== 'all') {
          query = query.eq('type', filter);
        }
        
        const { data, error } = await query;
        
        if (error) throw error;
        setInsights(data as Insight[]);
      } catch (error) {
        console.error('Error fetching insights:', error);
        toast({
          title: 'Error',
          description: 'No se pudieron cargar los consejos de la comunidad.',
          variant: 'destructive',
        });
      } finally {
        setLoading(false);
      }
    };

    fetchInsights();
  }, [filter, refreshTrigger, toast]);

  const handleLike = async (id: string) => {
    if (!user) {
      toast({
        title: 'Inicia sesión',
        description: 'Debes iniciar sesión para dar me gusta a un consejo.',
      });
      return;
    }
    
    try {
      // Get the current insight
      const { data: currentInsight, error: fetchError } = await supabase
        .from('community_insights')
        .select('likes')
        .eq('id', id)
        .single();
      
      if (fetchError) throw fetchError;
      
      // Update the likes count
      const newLikesCount = (currentInsight?.likes || 0) + 1;
      
      const { error: updateError } = await supabase
        .from('community_insights')
        .update({ likes: newLikesCount })
        .eq('id', id);
      
      if (updateError) throw updateError;
      
      // Update the local state
      setInsights(insights.map(insight => 
        insight.id === id ? { ...insight, likes: newLikesCount } : insight
      ));
      
      toast({
        title: 'Me gusta',
        description: 'Has dado me gusta a este consejo.',
      });
    } catch (error) {
      console.error('Error liking insight:', error);
      toast({
        title: 'Error',
        description: 'No se pudo registrar tu me gusta.',
        variant: 'destructive',
      });
    }
  };

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      day: 'numeric', 
      month: 'long',
      year: 'numeric'
    };
    
    try {
      return new Date(dateString).toLocaleDateString('es-ES', options);
    } catch (e) {
      return dateString;
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center p-8">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cosmos-gold"></div>
      </div>
    );
  }

  if (insights.length === 0) {
    return (
      <div className="text-center p-8">
        <p className="text-sm text-muted-foreground">
          No hay consejos compartidos en esta categoría aún.
        </p>
        <p className="text-sm mt-2">
          ¡Sé el primero en compartir tu sabiduría cósmica!
        </p>
      </div>
    );
  }

  return (
    <ScrollArea className="max-h-[500px] pr-2">
      <div className="space-y-4">
        {insights.map((insight) => (
          <div key={insight.id} className="bg-cosmos-pink/10 p-4 rounded-lg">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h4 className="text-sm font-medium text-cosmos-darkGold">{insight.title}</h4>
                <div className="flex gap-2 mt-1">
                  <Badge className={typeColors[insight.type] || 'bg-gray-500/20 text-gray-700'}>
                    {typeLabels[insight.type] || insight.type}
                  </Badge>
                  <span className="text-xs text-muted-foreground">
                    {formatDate(insight.created_at)}
                  </span>
                </div>
              </div>
              <Button 
                variant="ghost" 
                size="sm" 
                className="flex items-center gap-1 text-xs"
                onClick={() => handleLike(insight.id)}
              >
                <ThumbsUp className="h-3 w-3" /> 
                <span>{insight.likes || 0}</span>
              </Button>
            </div>
            <p className="text-sm mt-2 whitespace-pre-wrap">{insight.content}</p>
          </div>
        ))}
      </div>
    </ScrollArea>
  );
};

export default InsightsList;
