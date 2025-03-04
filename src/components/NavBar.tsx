
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, CalendarDays, Sparkles, BookOpen } from 'lucide-react';

const NavBar = () => {
  const location = useLocation();
  
  const navItems = [
    {
      name: 'Home',
      icon: Home,
      path: '/home'
    },
    {
      name: 'Calendario',
      icon: CalendarDays,
      path: '/calendario'
    },
    {
      name: 'Tarot',
      icon: Sparkles,
      path: '/tarot'
    },
    {
      name: 'Aprender',
      icon: BookOpen,
      path: '/aprender'
    }
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white bg-opacity-90 backdrop-blur-sm shadow-lg z-50">
      <div className="container mx-auto">
        <nav className="flex justify-around items-center h-16">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link 
                key={item.name} 
                to={item.path} 
                className={`flex flex-col items-center justify-center px-3 py-1 rounded-lg transition-colors
                          ${isActive ? 'text-cosmos-darkGold' : 'text-gray-500'}`}
              >
                <item.icon size={20} className={isActive ? 'animate-pulse-soft' : ''} />
                <span className="text-xs mt-1 font-medium">{item.name}</span>
                {isActive && (
                  <div className="h-1 w-8 bg-gradient-to-r from-cosmos-gold to-cosmos-darkGold rounded-full mt-1" />
                )}
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
};

export default NavBar;
