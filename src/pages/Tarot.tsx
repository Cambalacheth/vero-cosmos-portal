import React, { useState, useEffect } from 'react';
import { Sparkles, GalleryVertical, RotateCcw, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import BackgroundImage from '../components/BackgroundImage';
import NavBar from '../components/NavBar';
import Quote from '../components/Quote';
import TarotCard from '../components/TarotCard';
import TarotReading from '../components/TarotReading';
import SavedReadings from '../components/SavedReadings';
import { drawCards } from '../lib/tarot-data';
import { getSavedReadings, SavedReading, saveTarotReading } from '../lib/tarot-storage';

const tarotDecks = [
  { id: 'rider-waite', name: 'Rider-Waite', description: 'El tarot tradicional con simbolismo clásico' },
  { id: 'marseille', name: 'Marseille', description: 'Un mazo histórico con diseños medievales' },
  { id: 'thoth', name: 'Thoth', description: 'Diseñado por Aleister Crowley con simbolismo esotérico' },
];

const readingTypes = [
  { 
    id: 'daily', 
    name: 'Tirada Diaria', 
    description: 'Una carta para guiarte hoy',
    cardCount: 1,
    icon: Sparkles,
  },
  { 
    id: 'three-card', 
    name: 'Pasado, Presente, Futuro', 
    description: 'Tres cartas para entender tu situación',
    cardCount: 3,
    icon: RotateCcw,
  },
  { 
    id: 'celtic-cross', 
    name: 'Cruz Celta', 
    description: 'Lectura profunda de diez cartas',
    cardCount: 10,
    icon: GalleryVertical,
  },
];

const Tarot = () => {
  const { toast } = useToast();
  const [loaded, setLoaded] = useState(false);
  const [selectedDeck, setSelectedDeck] = useState(tarotDecks[0]);
  const [activeTab, setActiveTab] = useState('readings');
  const [readingInProgress, setReadingInProgress] = useState(false);
  const [selectedReadingType, setSelectedReadingType] = useState<typeof readingTypes[0] | null>(null);
  const [drawnCards, setDrawnCards] = useState<ReturnType<typeof drawCards>>([]);
  const [savedReadings, setSavedReadings] = useState<SavedReading[]>([]);

  // Load saved readings on mount
  useEffect(() => {
    const loadSavedReadings = async () => {
      const readings = await getSavedReadings();
      setSavedReadings(readings);
      setLoaded(true);
    };
    
    loadSavedReadings();
  }, []);

  // Start a new reading
  const handleStartReading = (readingType: typeof readingTypes[0]) => {
    setSelectedReadingType(readingType);
    const cards = drawCards(readingType.cardCount);
    setDrawnCards(cards);
    setReadingInProgress(true);
  };

  // Save the current reading
  const handleSaveReading = async () => {
    if (!selectedReadingType) return;
    
    try {
      // For simplicity, we'll just save the first card as a daily reading
      // In a real app, we would save all cards and their positions
      if (drawnCards.length > 0) {
        const success = await saveTarotReading(drawnCards[0] as any);
        
        if (success) {
          // Refresh the saved readings
          const readings = await getSavedReadings();
          setSavedReadings(readings);
          
          toast({
            title: "Tirada guardada",
            description: "Tu tirada ha sido guardada correctamente.",
          });
        } else {
          toast({
            title: "Error",
            description: "No se pudo guardar la tirada. Inténtalo de nuevo.",
            variant: "destructive",
          });
        }
      }
    } catch (error) {
      console.error('Error saving reading:', error);
      toast({
        title: "Error",
        description: "Ocurrió un error al guardar la tirada.",
        variant: "destructive",
      });
    }
  };

  // Reset to selection screen
  const handleNewReading = () => {
    setReadingInProgress(false);
    setSelectedReadingType(null);
    setDrawnCards([]);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <BackgroundImage fullHeight={false} usePlainBackground={true}>
        <div className="container mx-auto px-4 py-6">
          <div 
            className={`w-full transition-all duration-1000 delay-300 transform
                     ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
          >
            <h2 className="text-2xl text-center font-playfair font-semibold mb-4 clip-text">Tarot Místico</h2>
            <Quote />
            
            {/* Tabs */}
            <div className="flex justify-center mb-6">
              <div className="glass-card p-1 rounded-full flex">
                <button 
                  onClick={() => {
                    setActiveTab('readings');
                    if (readingInProgress) {
                      handleNewReading();
                    }
                  }}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    activeTab === 'readings' 
                      ? 'bg-cosmos-pink bg-opacity-30 text-cosmos-darkGold' 
                      : 'text-gray-600 hover:text-cosmos-darkGold'
                  }`}
                >
                  Tiradas
                </button>
                <button 
                  onClick={() => setActiveTab('saved')}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    activeTab === 'saved' 
                      ? 'bg-cosmos-pink bg-opacity-30 text-cosmos-darkGold' 
                      : 'text-gray-600 hover:text-cosmos-darkGold'
                  }`}
                >
                  Guardadas
                </button>
                <button 
                  onClick={() => setActiveTab('learn')}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    activeTab === 'learn' 
                      ? 'bg-cosmos-pink bg-opacity-30 text-cosmos-darkGold' 
                      : 'text-gray-600 hover:text-cosmos-darkGold'
                  }`}
                >
                  Aprender
                </button>
              </div>
            </div>
            
            {/* Readings Tab */}
            {activeTab === 'readings' && !readingInProgress && (
              <>
                {/* Deck selection */}
                <div className="glass-card p-4 mb-6 rounded-xl">
                  <h3 className="text-lg font-playfair text-cosmos-darkGold mb-3">Escoge tu Mazo</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {tarotDecks.map((deck) => (
                      <button
                        key={deck.id}
                        onClick={() => setSelectedDeck(deck)}
                        className={`p-3 rounded-lg text-left transition-all ${
                          selectedDeck.id === deck.id 
                            ? 'bg-cosmos-pink bg-opacity-20 border border-cosmos-gold' 
                            : 'glass-card hover:bg-cosmos-pink hover:bg-opacity-10'
                        }`}
                      >
                        <h4 className="font-medium">{deck.name}</h4>
                        <p className="text-xs text-gray-600">{deck.description}</p>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Reading types */}
                <div className="glass-card p-4 mb-6 rounded-xl">
                  <h3 className="text-lg font-playfair text-cosmos-darkGold mb-3">Tipo de Tirada</h3>
                  <div className="space-y-3">
                    {readingTypes.map((reading) => (
                      <div 
                        key={reading.id}
                        className="glass-card p-4 rounded-lg hover:bg-cosmos-pink hover:bg-opacity-10 transition-colors cursor-pointer"
                      >
                        <div className="flex items-start">
                          <div className="bg-cosmos-pink bg-opacity-20 p-2 rounded-full mr-3">
                            <reading.icon size={18} className="text-cosmos-darkGold" />
                          </div>
                          <div>
                            <h4 className="font-medium">{reading.name}</h4>
                            <p className="text-xs text-gray-600 mb-2">{reading.description}</p>
                            <Button 
                              size="sm" 
                              className="bg-gradient-to-r from-cosmos-gold to-cosmos-darkGold text-white"
                              onClick={() => handleStartReading(reading)}
                            >
                              Comenzar Tirada
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}
            
            {/* Active Reading */}
            {activeTab === 'readings' && readingInProgress && selectedReadingType && (
              <div className="glass-card p-4 mb-6 rounded-xl">
                <TarotReading
                  readingType={selectedReadingType}
                  cards={drawnCards}
                  onSaveReading={handleSaveReading}
                  onNewReading={handleNewReading}
                />
              </div>
            )}
            
            {/* Saved readings */}
            {activeTab === 'saved' && (
              <SavedReadings 
                readings={savedReadings} 
                onStartNewReading={() => {
                  setActiveTab('readings');
                  handleNewReading();
                }}
              />
            )}
            
            {/* Learn section */}
            {activeTab === 'learn' && (
              <div className="space-y-4">
                <div className="glass-card p-4 rounded-xl">
                  <div className="flex items-start">
                    <div className="bg-cosmos-pink bg-opacity-20 p-2 rounded-full mr-3">
                      <BookOpen size={18} className="text-cosmos-darkGold" />
                    </div>
                    <div>
                      <h3 className="text-lg font-playfair text-cosmos-darkGold mb-1">Significados de las Cartas</h3>
                      <p className="text-sm text-gray-600 mb-3">
                        Explora el significado de cada carta del Tarot y sus interpretaciones.
                      </p>
                      <Button 
                        variant="outline" 
                        className="border-cosmos-pink text-cosmos-darkGold"
                      >
                        Ver Biblioteca
                      </Button>
                    </div>
                  </div>
                </div>
                
                <div className="glass-card p-4 rounded-xl">
                  <div className="flex items-start">
                    <div className="bg-cosmos-pink bg-opacity-20 p-2 rounded-full mr-3">
                      <Sparkles size={18} className="text-cosmos-darkGold" />
                    </div>
                    <div>
                      <h3 className="text-lg font-playfair text-cosmos-darkGold mb-1">Mini Curso de Tarot</h3>
                      <p className="text-sm text-gray-600 mb-3">
                        Aprende los fundamentos del Tarot con nuestro curso para principiantes.
                      </p>
                      <Button 
                        variant="outline" 
                        className="border-cosmos-pink text-cosmos-darkGold"
                      >
                        Comenzar Curso
                      </Button>
                    </div>
                  </div>
                </div>
                
                <div className="glass-card p-4 rounded-xl">
                  <h3 className="text-lg font-playfair text-cosmos-darkGold mb-3">Artículos Populares</h3>
                  <ul className="space-y-2">
                    {[
                      "Cómo limpiar tu mazo de Tarot",
                      "Rituales para conectar con tus cartas",
                      "Historia del Tarot y su evolución",
                      "Combinaciones de cartas más poderosas"
                    ].map((article, index) => (
                      <li key={index} className="text-sm hover:text-cosmos-darkGold cursor-pointer transition-colors">
                        • {article}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
      </BackgroundImage>
      <NavBar />
    </div>
  );
};

export default Tarot;
