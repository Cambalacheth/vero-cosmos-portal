
import React, { useState, useEffect } from 'react';
import BackgroundImage from '../components/BackgroundImage';
import NavBar from '../components/NavBar';
import { 
  calculateNatalChart, 
  generatePersonalizedHoroscope, 
  NatalChartData, 
  NatalChartInput 
} from '../lib/natal-chart-service';

// Import the refactored components
import TabNavigation from '../components/home/TabNavigation';
import NatalChartForm from '../components/home/NatalChartForm';
import NatalChartDisplay from '../components/home/NatalChartDisplay';
import DailyTarot from '../components/home/DailyTarot';
import DailyHoroscope from '../components/home/DailyHoroscope';
import CelestialPositionsWidget from '../components/home/CelestialPositionsWidget';

const Home = () => {
  const [loaded, setLoaded] = useState(false);
  const [selectedTab, setSelectedTab] = useState<'natal' | 'tarot' | 'horoscope'>('natal');
  const [hasNatalChart, setHasNatalChart] = useState(false);
  
  // State for calculated natal chart data
  const [natalChart, setNatalChart] = useState<NatalChartData | null>(null);
  const [personalizedHoroscope, setPersonalizedHoroscope] = useState('');

  useEffect(() => {
    setLoaded(true);
  }, []);

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

  return (
    <div className="flex flex-col min-h-screen">
      <BackgroundImage fullHeight={false} usePlainBackground={true}>
        <div className="container mx-auto px-4 py-6 pb-20">
          <div 
            className={`w-full transition-all duration-1000 delay-300 transform
                     ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
          >
            <h2 className="text-2xl text-center font-playfair font-semibold mb-6 clip-text">Tu Portal Cósmico</h2>
            
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
