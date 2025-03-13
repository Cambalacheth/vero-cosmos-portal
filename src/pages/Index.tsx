
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import StarryBackground from '../components/StarryBackground';
import { useAuth } from '../contexts/AuthContext';
import CelestialHeader from '../components/auth/CelestialHeader';
import { Button } from '@/components/ui/button';

const Index = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoaded(true);
    }, 200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen flex flex-col text-white">
      <StarryBackground>
        <div className="container mx-auto px-4 py-16 flex-1 flex flex-col items-center justify-center text-center">
          <div
            className={`transition-opacity duration-1000 ${
              loaded ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <CelestialHeader />
            
            <h1 className="text-4xl md:text-5xl font-playfair mt-8 font-bold tracking-tight clip-text">
              Vero Cosmos
            </h1>
            
            <p className="mt-6 text-lg md:text-xl max-w-2xl mx-auto">
              Descubre los secretos del universo y tu conexión con las estrellas
            </p>
            
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              {user ? (
                <Button
                  onClick={() => navigate('/home')}
                  className="button-effect px-6 py-3 bg-cosmos-darkGold/60 rounded-lg text-white border border-cosmos-gold/50 hover:bg-cosmos-darkGold/80"
                >
                  Ir a mi Perfil
                </Button>
              ) : (
                <>
                  <Button
                    onClick={() => navigate('/auth?mode=login')}
                    className="button-effect px-6 py-3 bg-cosmos-darkGold/60 rounded-lg text-white border border-cosmos-gold/50 hover:bg-cosmos-darkGold/80"
                  >
                    Iniciar Sesión
                  </Button>
                  <Button
                    onClick={() => navigate('/auth?mode=register')}
                    className="button-effect px-6 py-3 bg-white/20 rounded-lg backdrop-blur-sm border border-white/30 hover:bg-white/30 text-white"
                  >
                    Registrarse
                  </Button>
                </>
              )}
            </div>
            
            <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="glass-card p-6 rounded-xl backdrop-blur-sm bg-white/10 border border-white/20">
                <h3 className="text-xl font-playfair mb-3 text-cosmos-gold">Carta Natal Personalizada</h3>
                <p className="text-sm opacity-80">
                  Descubre cómo los planetas influenciaron tu vida desde el momento de tu nacimiento con nuestra detallada carta natal.
                </p>
              </div>
              
              <div className="glass-card p-6 rounded-xl backdrop-blur-sm bg-white/10 border border-white/20">
                <h3 className="text-xl font-playfair mb-3 text-cosmos-gold">Predicciones Diarias</h3>
                <p className="text-sm opacity-80">
                  Recibe orientación diaria basada en los movimientos celestes y cómo estos afectan específicamente a tu signo y ascendente.
                </p>
              </div>
              
              <div className="glass-card p-6 rounded-xl backdrop-blur-sm bg-white/10 border border-white/20">
                <h3 className="text-xl font-playfair mb-3 text-cosmos-gold">Lecturas de Tarot</h3>
                <p className="text-sm opacity-80">
                  Accede a tiradas de tarot personalizadas que te ayudarán a reflexionar sobre tu presente y visualizar posibles futuros.
                </p>
              </div>
            </div>
          </div>
        </div>
      </StarryBackground>
    </div>
  );
};

export default Index;
