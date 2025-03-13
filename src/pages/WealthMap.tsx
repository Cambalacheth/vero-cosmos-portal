
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BackgroundImage from '@/components/BackgroundImage';
import NavBar from '@/components/NavBar';
import { useAuth } from '@/contexts/AuthContext';
import { getUserNatalChart } from '@/lib/profile-service';
import { NatalChartData } from '@/lib/natal-chart';
import WealthMapHeader from '@/components/wealth-map/WealthMapHeader';
import WealthMapResults from '@/components/wealth-map/WealthMapResults';
import WealthMapPreview from '@/components/wealth-map/WealthMapPreview';
import NatalChartForm from '@/components/home/NatalChartForm';
import { useToast } from '@/components/ui/use-toast';

const WealthMap = () => {
  const [loaded, setLoaded] = useState(false);
  const [hasNatalChart, setHasNatalChart] = useState(false);
  const [isLoadingChart, setIsLoadingChart] = useState(true);
  const [natalChart, setNatalChart] = useState<NatalChartData | null>(null);
  const [isPremium, setIsPremium] = useState(false);
  const { session, loading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    setLoaded(true);
    
    // Redirect to auth page if user is not logged in
    if (!loading && !session) {
      navigate('/auth');
      return;
    }
    
    // Cargar la carta natal del usuario si está autenticado
    const loadUserNatalChart = async () => {
      if (session) {
        setIsLoadingChart(true);
        try {
          const chart = await getUserNatalChart();
          if (chart) {
            setNatalChart(chart);
            setHasNatalChart(true);
          }
        } catch (error) {
          console.error('Error al cargar la carta natal:', error);
        } finally {
          setIsLoadingChart(false);
        }
      }
    };
    
    loadUserNatalChart();
  }, [loading, session, navigate]);

  const renderContent = () => {
    if (isLoadingChart) {
      return (
        <div className="glass-card p-4 rounded-xl flex justify-center items-center h-[400px]">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cosmos-gold"></div>
        </div>
      );
    }
    
    if (!hasNatalChart) {
      return (
        <div className="space-y-6">
          <div className="glass-card p-5 rounded-xl">
            <h3 className="text-xl font-playfair text-cosmos-darkGold mb-2">Necesitamos tu Carta Natal</h3>
            <p className="text-sm mb-4">Para crear tu Mapa de Riqueza Astrológica personalizado, primero necesitamos tu carta natal completa.</p>
          </div>
          <NatalChartForm onSubmit={(input) => {
            // This uses the existing NatalChartForm from the home page
            // The form will call createNatalChart from profile-service
            toast({
              title: "Calculando tu carta natal",
              description: "Por favor espera mientras calculamos tu carta natal...",
            });
          }} />
        </div>
      );
    }
    
    // User has a natal chart, show the wealth map
    return (
      <div className="space-y-6">
        <WealthMapHeader />
        {isPremium ? (
          <WealthMapResults natalChart={natalChart!} />
        ) : (
          <WealthMapPreview natalChart={natalChart!} onUpgrade={() => setIsPremium(true)} />
        )}
      </div>
    );
  };

  return (
    <div className="flex flex-col min-h-screen">
      <BackgroundImage fullHeight={false} usePlainBackground={true}>
        <div className="container mx-auto px-4 py-6 pb-20">
          <div 
            className={`w-full transition-all duration-1000 delay-300 transform
                     ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl text-center font-playfair font-semibold glass-text px-4 py-2 rounded-lg">
                Mapa de Riqueza Astrológica
              </h2>
            </div>
            
            {renderContent()}
          </div>
        </div>
      </BackgroundImage>
      <NavBar />
    </div>
  );
};

export default WealthMap;
