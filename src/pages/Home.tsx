
import React, { useState, useEffect } from 'react';
import BackgroundImage from '../components/BackgroundImage';
import NavBar from '../components/NavBar';
import { 
  NatalChartData, 
  NatalChartInput,
  generatePersonalizedHoroscope 
} from '../lib/natal-chart';
import { getUserNatalChart, createNatalChart } from '../lib/profile-service';
import { useAuth } from '@/contexts/AuthContext';
import TabNavigation from '../components/home/TabNavigation';
import NatalChartForm from '../components/home/NatalChartForm';
import NatalChartDisplay from '../components/home/NatalChartDisplay';
import DailyTarot from '../components/home/DailyTarot';
import DailyHoroscope from '../components/home/DailyHoroscope';
import CelestialPositionsWidget from '../components/home/CelestialPositionsWidget';
import ThemeToggleButton from '@/components/ThemeToggleButton';
import { useTheme } from '@/contexts/ThemeContext';
import { useToast } from '@/components/ui/use-toast';

const Home = () => {
  const [loaded, setLoaded] = useState(false);
  const [selectedTab, setSelectedTab] = useState<'natal' | 'tarot' | 'horoscope'>('natal');
  const [hasNatalChart, setHasNatalChart] = useState(false);
  const [isLoadingChart, setIsLoadingChart] = useState(false);
  const { session, loading } = useAuth();
  const { theme } = useTheme();
  const { toast } = useToast();
  
  // State for calculated natal chart data
  const [natalChart, setNatalChart] = useState<NatalChartData | null>(null);
  const [personalizedHoroscope, setPersonalizedHoroscope] = useState('');

  useEffect(() => {
    setLoaded(true);
    
    // Skip authentication check - removed the redirect to auth page
    
    // Attempt to load user natal chart if logged in
    const loadUserNatalChart = async () => {
      if (session) {
        setIsLoadingChart(true);
        try {
          const chart = await getUserNatalChart();
          if (chart) {
            setNatalChart(chart);
            setPersonalizedHoroscope(generatePersonalizedHoroscope(chart));
            setHasNatalChart(true);
          }
        } catch (error) {
          console.error('Error al cargar la carta natal:', error);
        } finally {
          setIsLoadingChart(false);
        }
      } else {
        // Not logged in, just stop loading
        setIsLoadingChart(false);
      }
    };
    
    loadUserNatalChart();
  }, [loading, session]);

  const handleCreateNatalChart = async (input: NatalChartInput) => {
    try {
      // Check if user is logged in to save to database
      if (session) {
        const calculatedChart = await createNatalChart(input);
        if (calculatedChart) {
          setNatalChart(calculatedChart);
          setPersonalizedHoroscope(generatePersonalizedHoroscope(calculatedChart));
          setHasNatalChart(true);
          
          toast({
            title: "Carta Natal Creada",
            description: "Tu carta natal ha sido creada y guardada correctamente.",
          });
        } else {
          throw new Error('No se pudo crear la carta natal');
        }
      } else {
        // No session, just calculate without saving
        // This is a simplified version since we're bypassing authentication
        // Create a mock chart that follows the NatalChartData interface
        const calculatedChart: NatalChartData = {
          sun: { planet: "Sol", sign: "Aries", house: 1, degree: 15, icon: "☉" },
          moon: { planet: "Luna", sign: "Libra", house: 7, degree: 10, icon: "☾" },
          ascendant: { planet: "Ascendente", sign: "Leo", house: 1, degree: 0, icon: "⬆️" },
          mercury: { planet: "Mercurio", sign: "Pisces", house: 12, degree: 5, icon: "☿️" },
          venus: { planet: "Venus", sign: "Taurus", house: 2, degree: 20, icon: "♀️" },
          mars: { planet: "Marte", sign: "Gemini", house: 3, degree: 8, icon: "♂️" },
          jupiter: { planet: "Júpiter", sign: "Cancer", house: 4, degree: 12, icon: "♃" },
          saturn: { planet: "Saturno", sign: "Leo", house: 5, degree: 25, icon: "♄" },
          uranus: { planet: "Urano", sign: "Virgo", house: 6, degree: 3, icon: "⛢" },
          neptune: { planet: "Neptuno", sign: "Scorpio", house: 8, degree: 18, icon: "♆" },
          pluto: { planet: "Plutón", sign: "Sagittarius", house: 9, degree: 22, icon: "♇" },
          houses: [
            { house: 1, sign: "Aries", degree: 0 },
            { house: 2, sign: "Taurus", degree: 30 },
            { house: 3, sign: "Gemini", degree: 60 },
            { house: 4, sign: "Cancer", degree: 90 },
            { house: 5, sign: "Leo", degree: 120 },
            { house: 6, sign: "Virgo", degree: 150 },
            { house: 7, sign: "Libra", degree: 180 },
            { house: 8, sign: "Scorpio", degree: 210 },
            { house: 9, sign: "Sagittarius", degree: 240 },
            { house: 10, sign: "Capricorn", degree: 270 },
            { house: 11, sign: "Aquarius", degree: 300 },
            { house: 12, sign: "Pisces", degree: 330 }
          ],
          birthDate: input.birthDate,
          birthTime: input.birthTime,
          birthplace: input.birthplace
        };
        
        setNatalChart(calculatedChart);
        setPersonalizedHoroscope(generatePersonalizedHoroscope(calculatedChart));
        setHasNatalChart(true);
        
        toast({
          title: "Carta Natal Creada",
          description: "Tu carta natal ha sido creada. Inicia sesión para guardarla.",
        });
      }
    } catch (error) {
      console.error('Error al crear la carta natal:', error);
      toast({
        title: "Error",
        description: "No se pudo crear la carta natal. Por favor, intenta de nuevo.",
        variant: "destructive",
      });
    }
  };

  const renderNatalChart = () => {
    if (isLoadingChart) {
      return (
        <div className="glass-card p-4 rounded-xl flex justify-center items-center h-[400px]">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cosmos-gold"></div>
        </div>
      );
    }
    
    return hasNatalChart && natalChart ? (
      <NatalChartDisplay 
        natalChart={natalChart} 
        onEdit={() => setHasNatalChart(false)} 
      />
    ) : (
      <NatalChartForm onSubmit={handleCreateNatalChart} />
    );
  };

  // We can remove the loading screen since we're not enforcing authentication
  return (
    <div className="flex flex-col min-h-screen">
      <BackgroundImage fullHeight={false} usePlainBackground={true}>
        <ThemeToggleButton />
        <div className="container mx-auto px-4 py-6 pb-20">
          <div 
            className={`w-full transition-all duration-1000 delay-300 transform
                     ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl text-center font-playfair font-semibold glass-text px-4 py-2 rounded-lg">Tu Portal Cósmico</h2>
              {theme === 'light' && (
                <div className="hidden">
                  {/* ThemeSelector solo se mostrará en modo claro pero lo mantenemos oculto */}
                </div>
              )}
            </div>
            
            {/* Tab Navigation */}
            <TabNavigation 
              selectedTab={selectedTab} 
              onTabChange={setSelectedTab} 
            />
            
            {/* Tab Content */}
            <div className="mb-6">
              {selectedTab === 'natal' && renderNatalChart()}
              {selectedTab === 'tarot' && <DailyTarot />}
              {selectedTab === 'horoscope' && (
                <DailyHoroscope 
                  natalChart={natalChart} 
                  hasNatalChart={hasNatalChart} 
                  personalizedHoroscope={personalizedHoroscope} 
                  onCreateNatalChart={() => setSelectedTab('natal')} 
                />
              )}
            </div>
            
            {/* Current Celestial Positions */}
            <CelestialPositionsWidget />
          </div>
        </div>
      </BackgroundImage>
      <NavBar />
    </div>
  );
};

export default Home;
