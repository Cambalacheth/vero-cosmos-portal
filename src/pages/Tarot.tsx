
import React, { useState, useEffect } from 'react';
import { Sparkles, GalleryVertical, RotateCcw, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import BackgroundImage from '../components/BackgroundImage';
import NavBar from '../components/NavBar';
import Quote from '../components/Quote';

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
  const [loaded, setLoaded] = useState(false);
  const [selectedDeck, setSelectedDeck] = useState(tarotDecks[0]);
  const [activeTab, setActiveTab] = useState('readings');

  useEffect(() => {
    setLoaded(true);
  }, []);

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
                  onClick={() => setActiveTab('readings')}
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
            
            {/* Deck selection */}
            {activeTab === 'readings' && (
              <>
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
            
            {/* Saved readings */}
            {activeTab === 'saved' && (
              <div className="glass-card p-4 rounded-xl min-h-[300px] flex flex-col items-center justify-center">
                <Sparkles size={40} className="text-cosmos-gold opacity-50 mb-4" />
                <h3 className="text-lg font-playfair text-cosmos-darkGold mb-2">Sin Tiradas Guardadas</h3>
                <p className="text-sm text-center text-gray-600 max-w-xs">
                  Aún no tienes tiradas guardadas. Realiza una tirada y guárdala para verla aquí.
                </p>
                <Button 
                  onClick={() => setActiveTab('readings')}
                  variant="outline" 
                  className="mt-4 border-cosmos-pink text-cosmos-darkGold"
                >
                  Ir a Tiradas
                </Button>
              </div>
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
