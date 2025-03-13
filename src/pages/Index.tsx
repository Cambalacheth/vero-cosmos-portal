
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import BackgroundImage from '../components/BackgroundImage';
import NavBar from '../components/NavBar';
import Quote from '../components/Quote';
import { useAuth } from '@/contexts/AuthContext';

const Index = () => {
  const [loaded, setLoaded] = useState(false);
  const { session } = useAuth();

  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <BackgroundImage fullHeight={true}>
        <div className="landing-overlay"></div>
        <div className="landing-content container mx-auto px-4 flex flex-col min-h-screen pb-20">
          <div 
            className={`flex-1 flex flex-col justify-center items-center text-center transition-all duration-1000 delay-300 transform
                     ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
          >
            <h1 className="landing-title font-playfair text-white mb-4">
              Descubre los Misterios de tu Destino
            </h1>
            <h2 className="landing-subtitle text-white mb-8">
              Conecta con las estrellas a través de cartas astrales, lecturas de tarot y rituales personalizados
            </h2>
            
            {!session ? (
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/auth" className="landing-button hover:bg-cosmos-darkGold/90">
                  Comenzar mi Viaje
                </Link>
                <a href="#features" className="landing-button bg-transparent hover:bg-white/20">
                  Explorar
                </a>
              </div>
            ) : (
              <Link to="/home" className="landing-button hover:bg-cosmos-darkGold/90">
                Continuar mi Viaje
              </Link>
            )}
            
            <Quote className="mt-12 max-w-xl" />
          </div>
          
          <div id="features" className="py-16">
            <h2 className="text-3xl font-playfair text-white text-center mb-12 landing-subtitle">
              Tu Portal hacia lo Místico
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="feature-card">
                <div className="text-4xl mb-4 text-center">♈</div>
                <h3 className="feature-title text-center">Carta Natal Personalizada</h3>
                <p className="feature-description">
                  Descubre lo que los astros revelan sobre tu personalidad, fortalezas y desafíos con una carta astral precisa basada en tu fecha, hora y lugar de nacimiento.
                </p>
              </div>
              
              <div className="feature-card">
                <div className="text-4xl mb-4 text-center">🔮</div>
                <h3 className="feature-title text-center">Lecturas de Tarot Diarias</h3>
                <p className="feature-description">
                  Recibe orientación diaria con lecturas de tarot personalizadas que te ayudarán a navegar los desafíos y oportunidades de cada día.
                </p>
              </div>
              
              <div className="feature-card">
                <div className="text-4xl mb-4 text-center">✨</div>
                <h3 className="feature-title text-center">Rituales para Luna Nueva</h3>
                <p className="feature-description">
                  Transforma tu energía y manifiesta tus deseos con rituales personalizados alineados con los ciclos lunares y tu carta astral.
                </p>
              </div>
            </div>
            
            <div className="text-center mt-16">
              <Link to={session ? "/home" : "/auth"} className="landing-button hover:bg-cosmos-darkGold/90">
                {session ? "Ir a Mi Portal" : "Comenzar Ahora"}
              </Link>
            </div>
          </div>
        </div>
      </BackgroundImage>
      <NavBar />
    </div>
  );
};

export default Index;
