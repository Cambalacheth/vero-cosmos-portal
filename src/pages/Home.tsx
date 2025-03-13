
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import BackgroundImage from '../components/BackgroundImage';
import NavBar from '../components/NavBar';
import { 
  calculateNatalChart, 
  generatePersonalizedHoroscope, 
  NatalChartData, 
  NatalChartInput 
} from '../lib/natal-chart';
import { useAuth } from '@/contexts/AuthContext';
import TabNavigation from '../components/home/TabNavigation';
import NatalChartForm from '../components/home/NatalChartForm';
import NatalChartDisplay from '../components/home/NatalChartDisplay';
import DailyTarot from '../components/home/DailyTarot';
import DailyHoroscope from '../components/home/DailyHoroscope';
import CelestialPositionsWidget from '../components/home/CelestialPositionsWidget';
import ThemeToggleButton from '@/components/ThemeToggleButton';
import { useTheme } from '@/contexts/ThemeContext';

const Home = () => {
  const [loaded, setLoaded] = useState(false);
  const [selectedTab, setSelectedTab] = useState<'natal' | 'tarot' | 'horoscope'>('natal');
  const [hasNatalChart, setHasNatalChart] = useState(false);
  const { session, loading } = useAuth();
  const navigate = useNavigate();
  const { theme } = useTheme();
  
  // State for calculated natal chart data
  const [natalChart, setNatalChart] = useState<NatalChartData | null>(null);
  const [personalizedHoroscope, setPersonalizedHoroscope] = useState('');

  useEffect(() => {
    setLoaded(true);
    
    // Redirect to auth page if user is not logged in
    if (!loading && !session) {
      navigate('/auth');
    }
  }, [loading, session, navigate]);

  const handleCreateNatalChart = (input: NatalChartInput) => {
    const calculatedChart = calculateNatalChart(input);
    setNatalChart(calculatedChart);
    setPersonalizedHoroscope(generatePersonalizedHoroscope(calculatedChart));
    setHasNatalChart(true);
  };

  const renderNatalChart = () => (
    hasNatalChart && natalChart ? (
      <NatalChartDisplay 
        natalChart={natalChart} 
        onEdit={() => setHasNatalChart(false)} 
      />
    ) : (
      <NatalChartForm onSubmit={handleCreateNatalChart} />
    )
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

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
              <h2 className="text-2xl text-center font-playfair font-semibold clip-text">Tu Portal Cósmico</h2>
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
