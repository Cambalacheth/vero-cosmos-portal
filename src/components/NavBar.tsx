
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Sparkles, Calendar, User, Home, Map, DollarSign, Users } from 'lucide-react';

const NavBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div className="fixed bottom-0 left-0 w-full py-2 backdrop-blur-md bg-white/30 border-t border-cosmos-pink/20 dark:bg-gray-900/60 z-50">
      <div className="container mx-auto">
        <div className="flex justify-between items-center">
          <button 
            className={`flex flex-col items-center space-y-1 px-4 py-1 rounded-lg transition-all
                      ${isActive('/home') ? 'text-cosmos-darkGold' : 'text-gray-500'}`}
            onClick={() => navigate('/home')}
          >
            <Home className="w-5 h-5 sm:w-6 sm:h-6" />
            <span className="text-xs">Inicio</span>
          </button>
          
          <button 
            className={`flex flex-col items-center space-y-1 px-4 py-1 rounded-lg transition-all
                      ${isActive('/tarot') ? 'text-cosmos-darkGold' : 'text-gray-500'}`}
            onClick={() => navigate('/tarot')}
          >
            <Sparkles className="w-5 h-5 sm:w-6 sm:h-6" />
            <span className="text-xs">Tarot</span>
          </button>
          
          <button 
            className={`flex flex-col items-center space-y-1 px-4 py-1 rounded-lg transition-all
                      ${location.pathname.includes('/mapa') || location.pathname === '/mapas' || 
                        location.pathname === '/riqueza' || location.pathname === '/carrera' || 
                        location.pathname === '/amor' ? 'text-cosmos-darkGold' : 'text-gray-500'}`}
            onClick={() => navigate('/mapas')}
          >
            <Map className="w-5 h-5 sm:w-6 sm:h-6" />
            <span className="text-xs">Mapas</span>
          </button>
          
          <button 
            className={`flex flex-col items-center space-y-1 px-4 py-1 rounded-lg transition-all
                      ${isActive('/comunidad') ? 'text-cosmos-darkGold' : 'text-gray-500'}`}
            onClick={() => navigate('/comunidad')}
          >
            <Users className="w-5 h-5 sm:w-6 sm:h-6" />
            <span className="text-xs">Comunidad</span>
          </button>
          
          <button 
            className={`flex flex-col items-center space-y-1 px-4 py-1 rounded-lg transition-all
                      ${isActive('/perfil') ? 'text-cosmos-darkGold' : 'text-gray-500'}`}
            onClick={() => navigate('/perfil')}
          >
            <User className="w-5 h-5 sm:w-6 sm:h-6" />
            <span className="text-xs">Perfil</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
