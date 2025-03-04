
import React, { useState, useEffect } from 'react';
import BackgroundImage from '../components/BackgroundImage';
import NavBar from '../components/NavBar';
import { getDailyAstrologyData, getCurrentCelestialPositions } from '../lib/astrology-service';
import { drawCards } from '../lib/tarot-data';
import TarotCard from '../components/TarotCard';
import { Sparkles, MapPin, Calendar } from 'lucide-react';

const Home = () => {
  const [loaded, setLoaded] = useState(false);
  const [selectedTab, setSelectedTab] = useState<'natal' | 'tarot' | 'horoscope'>('natal');
  const [isCardRevealed, setIsCardRevealed] = useState(false);
  const [dailyCard, setDailyCard] = useState(drawCards(1)[0]);
  const [hasNatalChart, setHasNatalChart] = useState(false);

  // Sample natal chart data
  const natalData = {
    sun: 'Aries',
    moon: 'Cáncer',
    ascendant: 'Géminis',
    venus: 'Tauro',
    mars: 'Capricornio',
    mercury: 'Piscis',
  };

  const celestialPositions = getCurrentCelestialPositions();
  const todayData = getDailyAstrologyData(new Date());

  useEffect(() => {
    setLoaded(true);
  }, []);

  const handleRevealCard = () => {
    setIsCardRevealed(true);
  };

  const renderNatalChart = () => (
    <div>
      {hasNatalChart ? (
        <div className="glass-card p-4 rounded-xl">
          <h3 className="text-xl font-playfair text-cosmos-darkGold mb-4">Tu Carta Natal</h3>
          
          <div className="relative w-full aspect-square mb-6">
            <div className="absolute inset-0 rounded-full border-2 border-cosmos-pink"></div>
            <div className="absolute inset-[10%] rounded-full border-2 border-cosmos-darkGold"></div>
            
            {/* Placeholder for the natal chart wheel */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-1/3 h-1/3 bg-cosmos-gold bg-opacity-20 rounded-full flex items-center justify-center">
                <span className="text-4xl text-cosmos-darkGold">♈</span>
              </div>
            </div>
            
            {/* Planetary positions */}
            <div className="absolute top-[15%] left-[30%] bg-white bg-opacity-50 rounded-full px-2 py-1 text-xs">
              ☉ {natalData.sun}
            </div>
            <div className="absolute top-[70%] right-[30%] bg-white bg-opacity-50 rounded-full px-2 py-1 text-xs">
              ☾ {natalData.moon}
            </div>
            <div className="absolute top-[40%] right-[20%] bg-white bg-opacity-50 rounded-full px-2 py-1 text-xs">
              ☿ {natalData.mercury}
            </div>
            <div className="absolute bottom-[25%] left-[25%] bg-white bg-opacity-50 rounded-full px-2 py-1 text-xs">
              ♀ {natalData.venus}
            </div>
            <div className="absolute top-[50%] left-[10%] bg-white bg-opacity-50 rounded-full px-2 py-1 text-xs">
              ♂ {natalData.mars}
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-3 mb-4">
            <div className="p-2 bg-white bg-opacity-30 rounded-lg">
              <p className="text-xs font-medium">Sol en {natalData.sun}</p>
              <p className="text-xs opacity-70">Identidad, propósito</p>
            </div>
            <div className="p-2 bg-white bg-opacity-30 rounded-lg">
              <p className="text-xs font-medium">Luna en {natalData.moon}</p>
              <p className="text-xs opacity-70">Emociones, intuición</p>
            </div>
            <div className="p-2 bg-white bg-opacity-30 rounded-lg">
              <p className="text-xs font-medium">Ascendente {natalData.ascendant}</p>
              <p className="text-xs opacity-70">Expresión exterior</p>
            </div>
            <div className="p-2 bg-white bg-opacity-30 rounded-lg">
              <p className="text-xs font-medium">Venus en {natalData.venus}</p>
              <p className="text-xs opacity-70">Amor, belleza</p>
            </div>
          </div>
          
          <button className="w-full button-effect px-4 py-2 bg-cosmos-pink bg-opacity-20 rounded-lg text-cosmos-darkGold border border-cosmos-pink">
            Personalizar Carta Natal
          </button>
        </div>
      ) : (
        <div className="glass-card p-5 rounded-xl">
          <h3 className="text-xl font-playfair text-cosmos-darkGold mb-4">Descubre Tu Carta Natal</h3>
          <p className="text-sm mb-6">Tu carta natal es un mapa del cielo en el momento exacto de tu nacimiento. Revela tus fortalezas, desafíos y oportunidades de crecimiento personal.</p>
          
          <div className="space-y-4 mb-6">
            <div>
              <label className="block text-sm font-medium mb-1">Fecha de Nacimiento</label>
              <input type="date" className="w-full p-2 bg-white bg-opacity-30 border border-cosmos-pink rounded-lg" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Hora de Nacimiento</label>
              <input type="time" className="w-full p-2 bg-white bg-opacity-30 border border-cosmos-pink rounded-lg" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Lugar de Nacimiento</label>
              <div className="relative">
                <input type="text" className="w-full p-2 pl-8 bg-white bg-opacity-30 border border-cosmos-pink rounded-lg" placeholder="Ej. Madrid, España" />
                <MapPin size={16} className="absolute left-2 top-1/2 -translate-y-1/2 text-cosmos-darkGold" />
              </div>
            </div>
          </div>
          
          <button 
            className="w-full button-effect px-4 py-2 glass-card rounded-lg text-cosmos-darkGold border border-cosmos-pink"
            onClick={() => setHasNatalChart(true)}
          >
            Crear Mi Carta Natal
          </button>
        </div>
      )}
    </div>
  );

  const renderDailyTarot = () => (
    <div className="glass-card p-4 rounded-xl">
      <h3 className="text-xl font-playfair text-cosmos-darkGold mb-3">Tu Carta del Día</h3>
      <div className="flex justify-center mb-4">
        <div className="w-48">
          <TarotCard 
            card={dailyCard.card} 
            isReversed={dailyCard.isReversed} 
            isRevealed={isCardRevealed}
            onClick={handleRevealCard}
          />
        </div>
      </div>
      {isCardRevealed ? (
        <div className="text-center">
          <h4 className="font-medium text-cosmos-darkGold mb-2">{dailyCard.card.name} {dailyCard.isReversed ? '(Invertida)' : ''}</h4>
          <p className="text-sm italic">
            {dailyCard.isReversed ? 
              dailyCard.card.meaningReversed[0] : 
              dailyCard.card.meaningUpright[0]
            }
          </p>
        </div>
      ) : (
        <button 
          className="w-full button-effect px-4 py-2 bg-cosmos-pink bg-opacity-20 rounded-lg text-cosmos-darkGold border border-cosmos-pink"
          onClick={handleRevealCard}
        >
          Revelar Mi Carta
        </button>
      )}
    </div>
  );

  const renderDailyHoroscope = () => (
    <div className="glass-card p-4 rounded-xl">
      <h3 className="text-xl font-playfair text-cosmos-darkGold mb-3">Tu Horóscopo Personalizado</h3>
      
      <div className="flex items-center space-x-3 mb-4">
        <Calendar size={18} className="text-cosmos-darkGold" />
        <p className="text-sm font-medium">Hoy, {new Date().toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
      </div>
      
      <div className="mb-4">
        <div className="flex space-x-2 mb-2">
          <div className="w-6 h-6 flex items-center justify-center text-lg">☉</div>
          <div>
            <p className="text-sm font-medium">Sol en {natalData.sun}</p>
            <p className="text-xs">{hasNatalChart ? "La energía solar te impulsa a tomar iniciativas y liderazgo hoy." : "Registra tu carta natal para ver detalles personalizados."}</p>
          </div>
        </div>
        
        <div className="flex space-x-2 mb-2">
          <div className="w-6 h-6 flex items-center justify-center text-lg">☾</div>
          <div>
            <p className="text-sm font-medium">Luna en {natalData.moon}</p>
            <p className="text-xs">{hasNatalChart ? "Tus emociones estarán a flor de piel, aprovecha para conectar con tu intuición." : "Registra tu carta natal para ver detalles personalizados."}</p>
          </div>
        </div>
        
        <div className="flex space-x-2">
          <div className="w-6 h-6 flex items-center justify-center text-lg">⚡</div>
          <div>
            <p className="text-sm font-medium">Tránsitos Destacados</p>
            <p className="text-xs">{hasNatalChart ? "Venus está activando tu casa de relaciones, favoreciendo encuentros significativos." : "Registra tu carta natal para ver detalles personalizados."}</p>
          </div>
        </div>
      </div>
      
      <div className="p-3 bg-white bg-opacity-20 rounded-lg mb-4">
        <p className="text-sm italic">
          {hasNatalChart 
            ? "Hoy es un día ideal para conectar con tus emociones y compartir tus ideas con personas cercanas. Tu intuición está especialmente aguda y te guiará en decisiones importantes."
            : todayData.dailyMessage
          }
        </p>
      </div>
      
      {!hasNatalChart && (
        <button 
          className="w-full button-effect px-4 py-2 bg-cosmos-pink bg-opacity-20 rounded-lg text-cosmos-darkGold border border-cosmos-pink"
          onClick={() => setSelectedTab('natal')}
        >
          Personalizar Mi Horóscopo
        </button>
      )}
    </div>
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
            <div className="flex justify-center mb-6">
              <div className="glass-card p-1 rounded-full flex">
                <button 
                  className={`px-4 py-1.5 rounded-full text-sm flex items-center ${selectedTab === 'natal' ? 'bg-cosmos-pink bg-opacity-30 text-cosmos-darkGold' : 'text-gray-500'}`}
                  onClick={() => setSelectedTab('natal')}
                >
                  <span className="mr-1">⭐</span> Carta Natal
                </button>
                <button 
                  className={`px-4 py-1.5 rounded-full text-sm flex items-center ${selectedTab === 'tarot' ? 'bg-cosmos-pink bg-opacity-30 text-cosmos-darkGold' : 'text-gray-500'}`}
                  onClick={() => setSelectedTab('tarot')}
                >
                  <Sparkles size={14} className="mr-1" /> Tarot Diario
                </button>
                <button 
                  className={`px-4 py-1.5 rounded-full text-sm flex items-center ${selectedTab === 'horoscope' ? 'bg-cosmos-pink bg-opacity-30 text-cosmos-darkGold' : 'text-gray-500'}`}
                  onClick={() => setSelectedTab('horoscope')}
                >
                  <span className="mr-1">☉</span> Horóscopo
                </button>
              </div>
            </div>
            
            {/* Tab Content */}
            <div className="mb-6">
              {selectedTab === 'natal' && renderNatalChart()}
              {selectedTab === 'tarot' && renderDailyTarot()}
              {selectedTab === 'horoscope' && renderDailyHoroscope()}
            </div>
            
            {/* Current Celestial Positions */}
            <div className="glass-card p-4 mb-6 rounded-xl">
              <h3 className="text-base font-playfair text-cosmos-darkGold mb-3">Clima Astral Actual</h3>
              <div className="grid grid-cols-3 gap-2">
                {celestialPositions.slice(0, 6).map((position, index) => (
                  <div key={index} className="flex flex-col items-center p-2 bg-white bg-opacity-20 rounded-lg">
                    <span className="text-lg">{position.icon}</span>
                    <p className="text-xs font-medium">{position.planet}</p>
                    <p className="text-xs">{position.position}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </BackgroundImage>
      <NavBar />
    </div>
  );
};

export default Home;
