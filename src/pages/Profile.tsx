
import React, { useState, useEffect } from 'react';
import { UserRound, LogOut } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import BackgroundImage from '../components/BackgroundImage';
import NavBar from '../components/NavBar';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';
import { getUserNatalChart } from '@/lib/profile-service';
import { NatalChartData } from '@/lib/natal-chart';

const Profile = () => {
  const [loaded, setLoaded] = useState(false);
  const [natalChart, setNatalChart] = useState<NatalChartData | null>(null);
  const [isLoadingChart, setIsLoadingChart] = useState(true);
  const { user, session } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    setLoaded(true);
    
    // Redirect to auth page if user is not logged in
    if (!session) {
      navigate('/auth');
      return;
    }
    
    // Cargar la carta natal del usuario
    const loadUserNatalChart = async () => {
      if (session) {
        setIsLoadingChart(true);
        try {
          const chart = await getUserNatalChart();
          if (chart) {
            setNatalChart(chart);
          }
        } catch (error) {
          console.error('Error al cargar la carta natal:', error);
        } finally {
          setIsLoadingChart(false);
        }
      }
    };
    
    loadUserNatalChart();
  }, [session, navigate]);

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      toast({
        title: "Sesión cerrada",
        description: "Has cerrado sesión exitosamente",
      });
      navigate('/');
    } catch (error) {
      console.error('Error signing out:', error);
      toast({
        title: "Error",
        description: "No se pudo cerrar la sesión",
        variant: "destructive",
      });
    }
  };

  // Función para mostrar un resumen de la carta natal
  const renderNatalChartSummary = () => {
    if (isLoadingChart) {
      return <p className="text-sm">Cargando información astrológica...</p>;
    }
    
    if (!natalChart) {
      return (
        <div>
          <p className="text-sm mb-2">No has creado tu carta natal aún</p>
          <Link to="/home">
            <button className="w-full button-effect px-4 py-2 bg-cosmos-pink bg-opacity-20 rounded-lg text-cosmos-darkGold border border-cosmos-pink">
              Crear Carta Natal
            </button>
          </Link>
        </div>
      );
    }
    
    return (
      <p className="text-sm">
        {natalChart.sun.icon} Sol en {natalChart.sun.sign} | 
        {natalChart.moon.icon} Luna en {natalChart.moon.sign} | 
        {natalChart.ascendant.icon} Ascendente {natalChart.ascendant.sign}
      </p>
    );
  };

  return (
    <div className="flex flex-col min-h-screen">
      <BackgroundImage fullHeight={false}>
        <div className="container mx-auto px-4 py-6">
          <div 
            className={`w-full transition-all duration-1000 delay-300 transform
                     ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
          >
            <h2 className="text-2xl text-center font-playfair font-semibold mb-6 glass-text px-4 py-2 rounded-lg">Tu Perfil Cósmico</h2>
            
            {/* User Info Section */}
            <div className="glass-card p-4 mb-6 rounded-xl">
              <div className="flex items-center mb-4">
                <div className="w-16 h-16 rounded-full bg-cosmos-pink bg-opacity-30 flex items-center justify-center mr-4">
                  <UserRound size={32} className="text-cosmos-darkGold" />
                </div>
                <div>
                  <h3 className="text-xl font-playfair text-cosmos-darkGold">
                    {user?.email || 'Usuario'}
                  </h3>
                  {renderNatalChartSummary()}
                </div>
              </div>
              <button 
                className="w-full button-effect px-4 py-2 bg-cosmos-pink bg-opacity-20 rounded-lg text-cosmos-darkGold border border-cosmos-pink mt-2"
                onClick={handleLogout}
              >
                <LogOut size={16} className="inline mr-2" />
                Cerrar Sesión
              </button>
              {natalChart && (
                <Link to="/home">
                  <button className="w-full button-effect px-4 py-2 bg-cosmos-pink bg-opacity-20 rounded-lg text-cosmos-darkGold border border-cosmos-pink mt-2">
                    Editar Datos de Nacimiento
                  </button>
                </Link>
              )}
            </div>
            
            {/* Natal Chart Information Section */}
            {natalChart && (
              <div className="glass-card p-4 mb-6 rounded-xl">
                <h3 className="text-xl font-playfair text-cosmos-darkGold mb-3">Tu Carta Natal</h3>
                
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="p-2 bg-white bg-opacity-30 rounded-lg">
                    <p className="text-xs font-medium">Sol en {natalChart.sun.sign} {natalChart.sun.degree}°</p>
                    <p className="text-xs opacity-70">Casa {natalChart.sun.house}</p>
                  </div>
                  <div className="p-2 bg-white bg-opacity-30 rounded-lg">
                    <p className="text-xs font-medium">Luna en {natalChart.moon.sign} {natalChart.moon.degree}°</p>
                    <p className="text-xs opacity-70">Casa {natalChart.moon.house}</p>
                  </div>
                  <div className="p-2 bg-white bg-opacity-30 rounded-lg">
                    <p className="text-xs font-medium">Mercurio en {natalChart.mercury.sign} {natalChart.mercury.degree}°</p>
                    <p className="text-xs opacity-70">Casa {natalChart.mercury.house}</p>
                  </div>
                  <div className="p-2 bg-white bg-opacity-30 rounded-lg">
                    <p className="text-xs font-medium">Venus en {natalChart.venus.sign} {natalChart.venus.degree}°</p>
                    <p className="text-xs opacity-70">Casa {natalChart.venus.house}</p>
                  </div>
                </div>
                
                <Link to="/home">
                  <button className="w-full button-effect px-4 py-2 bg-cosmos-pink bg-opacity-20 rounded-lg text-cosmos-darkGold border border-cosmos-pink">
                    Ver Carta Natal Completa
                  </button>
                </Link>
              </div>
            )}
            
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
