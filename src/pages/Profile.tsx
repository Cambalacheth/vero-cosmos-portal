
import React, { useState, useEffect } from 'react';
import { UserRound } from 'lucide-react';
import { Link } from 'react-router-dom';
import BackgroundImage from '../components/BackgroundImage';
import NavBar from '../components/NavBar';

const Profile = () => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <BackgroundImage fullHeight={false}>
        <div className="container mx-auto px-4 py-6">
          <div 
            className={`w-full transition-all duration-1000 delay-300 transform
                     ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
          >
            <h2 className="text-2xl text-center font-playfair font-semibold mb-6 clip-text">Tu Perfil Cósmico</h2>
            
            {/* User Info Section */}
            <div className="glass-card p-4 mb-6 rounded-xl">
              <div className="flex items-center mb-4">
                <div className="w-16 h-16 rounded-full bg-cosmos-pink bg-opacity-30 flex items-center justify-center mr-4">
                  <UserRound size={32} className="text-cosmos-darkGold" />
                </div>
                <div>
                  <h3 className="text-xl font-playfair text-cosmos-darkGold">Usuario</h3>
                  <p className="text-sm">♈ Aries | ♋ Luna en Cáncer | ♊ Ascendente Géminis</p>
                </div>
              </div>
              <button className="w-full button-effect px-4 py-2 bg-cosmos-pink bg-opacity-20 rounded-lg text-cosmos-darkGold border border-cosmos-pink mt-2">
                Editar Datos de Nacimiento
              </button>
            </div>
            
            {/* Saved Readings Section */}
            <div className="glass-card p-4 mb-6 rounded-xl">
              <h3 className="text-xl font-playfair text-cosmos-darkGold mb-3">Tus Lecturas Guardadas</h3>
              <div className="space-y-3">
                <div className="p-3 bg-white bg-opacity-30 rounded-lg">
                  <p className="text-sm font-medium">Tirada de 3 Cartas - Amor</p>
                  <p className="text-xs opacity-70">12 de Septiembre, 2023</p>
                </div>
                <div className="p-3 bg-white bg-opacity-30 rounded-lg">
                  <p className="text-sm font-medium">Tirada Sí o No - Trabajo</p>
                  <p className="text-xs opacity-70">5 de Octubre, 2023</p>
                </div>
              </div>
              <button className="w-full button-effect px-4 py-2 bg-cosmos-pink bg-opacity-20 rounded-lg text-cosmos-darkGold border border-cosmos-pink mt-4">
                Ver Todo el Historial
              </button>
            </div>
            
            {/* Settings Section */}
            <div className="glass-card p-4 mb-6 rounded-xl">
              <h3 className="text-xl font-playfair text-cosmos-darkGold mb-3">Configuración</h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Notificaciones Diarias</span>
                  <div className="w-12 h-6 bg-cosmos-pink bg-opacity-30 rounded-full relative cursor-pointer">
                    <div className="absolute right-1 top-1 w-4 h-4 bg-cosmos-darkGold rounded-full transition-all"></div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm">Alertas de Eventos Astrológicos</span>
                  <div className="w-12 h-6 bg-cosmos-pink bg-opacity-30 rounded-full relative cursor-pointer">
                    <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-all"></div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm">Recordatorios de Rituales</span>
                  <div className="w-12 h-6 bg-cosmos-pink bg-opacity-30 rounded-full relative cursor-pointer">
                    <div className="absolute right-1 top-1 w-4 h-4 bg-cosmos-darkGold rounded-full transition-all"></div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Premium Section */}
            <div className="glass-card p-4 mb-6 rounded-xl bg-gradient-to-r from-cosmos-gold/20 to-cosmos-darkGold/20">
              <h3 className="text-xl font-playfair text-cosmos-darkGold mb-3">Vero Cosmos Premium</h3>
              <p className="text-sm mb-3">Desbloquea lecturas personalizadas, análisis de compatibilidad y más funciones exclusivas.</p>
              <Link to="/premium">
                <button className="w-full button-effect px-4 py-2 bg-cosmos-darkGold/40 rounded-lg text-white border border-cosmos-gold/50 mt-2">
                  Conocer Más
                </button>
              </Link>
            </div>
          </div>
        </div>
      </BackgroundImage>
      <NavBar />
    </div>
  );
};

export default Profile;
