
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapType, getMapById } from '@/lib/map-types';
import { NatalChartData } from '@/lib/natal-chart';
import { getUserNatalChart } from '@/lib/profile-service';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { Lock, ArrowRight, AlertTriangle } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface MapComparisonProps {
  mapId: string;
}

const MapComparison: React.FC<MapComparisonProps> = ({ mapId }) => {
  const [natalChart, setNatalChart] = useState<NatalChartData | null>(null);
  const [loading, setLoading] = useState(true);
  const [comparisonCount, setComparisonCount] = useState(0);
  const [isPremium, setIsPremium] = useState(false);
  const [canCompare, setCanCompare] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  const mapInfo = getMapById(mapId);

  useEffect(() => {
    async function loadUserData() {
      try {
        // Cargar la carta natal del usuario
        const chart = await getUserNatalChart();
        setNatalChart(chart);

        // Verificar si el usuario es premium
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
          // Aquí podrías consultar una tabla de suscripciones en Supabase
          // Por ahora, simulamos con localStorage
          const userIsPremium = localStorage.getItem('premium_user') === 'true';
          setIsPremium(userIsPremium);

          // Si no es premium, verificar el número de comparaciones en este mes
          if (!userIsPremium) {
            const currentMonth = new Date().getMonth();
            const storedMonth = localStorage.getItem('last_comparison_month');
            const count = localStorage.getItem('comparison_count') || '0';
            
            if (storedMonth && parseInt(storedMonth) === currentMonth) {
              setComparisonCount(parseInt(count));
              setCanCompare(parseInt(count) < 1); // Máximo 1 por mes para usuarios gratuitos
            } else {
              // Nuevo mes, reiniciar contador
              localStorage.setItem('last_comparison_month', currentMonth.toString());
              localStorage.setItem('comparison_count', '0');
              setComparisonCount(0);
              setCanCompare(true);
            }
          } else {
            // Los usuarios premium pueden comparar sin límites
            setCanCompare(true);
          }
        }
        
        setLoading(false);
      } catch (error) {
        console.error('Error al cargar datos:', error);
        setLoading(false);
      }
    }
    
    loadUserData();
  }, []);

  const handleCompareMap = () => {
    if (!mapInfo) {
      toast({
        title: "Mapa no encontrado",
        description: "No se pudo encontrar información sobre este mapa.",
        variant: "destructive"
      });
      return;
    }

    if (!natalChart) {
      toast({
        title: "Carta natal requerida",
        description: "Necesitas crear tu carta natal antes de comparar mapas.",
        variant: "destructive"
      });
      return;
    }

    if (!isPremium) {
      // Incrementar contador para usuarios gratuitos
      const newCount = comparisonCount + 1;
      localStorage.setItem('comparison_count', newCount.toString());
      setComparisonCount(newCount);
      setCanCompare(false); // Ya no puede hacer más comparaciones este mes
    }

    // Aquí iría la lógica de comparación real
    // Por ahora navegamos a una página ficticia
    navigate(`/mapas/comparacion/${mapId}`);
    
    toast({
      title: "Comparación iniciada",
      description: `Comparando el mapa de ${mapInfo.title}`
    });
  };

  const handleUpgradeToPremium = () => {
    navigate('/premium');
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center p-6">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <Card className="glass-card">
      <CardHeader>
        <CardTitle className="text-lg font-playfair text-cosmos-darkGold">
          Comparar {mapInfo?.title || 'Mapa'}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {!isPremium && (
          <div className="mb-4 p-3 border rounded-md bg-yellow-50 border-yellow-200 flex items-start">
            <AlertTriangle className="h-5 w-5 text-yellow-500 mr-2 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-yellow-800">Plan Gratuito</p>
              <p className="text-xs text-yellow-600">
                Puedes realizar 1 comparación por mes. 
                Has realizado {comparisonCount} este mes.
              </p>
            </div>
          </div>
        )}

        {natalChart ? (
          <>
            <p className="text-sm mb-4">
              La comparación de mapas te permite entender cómo diferentes áreas de tu vida 
              interactúan entre sí basándose en tu carta natal.
            </p>
            
            {canCompare ? (
              <Button 
                onClick={handleCompareMap}
                className="w-full button-effect px-4 py-2 bg-cosmos-pink bg-opacity-20 
                         rounded-lg text-cosmos-darkGold border border-cosmos-pink"
              >
                Iniciar Comparación <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            ) : (
              <div className="space-y-3">
                <div className="p-4 border border-dashed border-cosmos-pink/30 rounded-lg flex justify-center items-center">
                  <div className="text-center">
                    <Lock className="h-6 w-6 text-cosmos-darkGold mx-auto mb-2" />
                    <p className="text-sm mb-1 font-medium">Límite alcanzado</p>
                    <p className="text-xs">
                      Has alcanzado tu límite de comparaciones gratuitas para este mes.
                    </p>
                  </div>
                </div>
                
                <Button 
                  onClick={handleUpgradeToPremium}
                  className="w-full button-effect px-4 py-2 bg-cosmos-darkGold bg-opacity-20 
                           rounded-lg text-cosmos-darkGold border border-cosmos-darkGold"
                >
                  Actualizar a Premium para Comparaciones Ilimitadas
                </Button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center p-4 border border-dashed border-gray-300 rounded-lg">
            <p className="text-sm mb-3">
              Necesitas crear tu carta natal antes de poder comparar mapas.
            </p>
            <Button 
              onClick={() => navigate('/perfil/carta-natal')}
              variant="outline"
              size="sm"
            >
              Crear Carta Natal
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default MapComparison;
