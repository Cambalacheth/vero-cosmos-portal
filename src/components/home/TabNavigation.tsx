
import React from 'react';
import { Sparkles } from 'lucide-react';

type TabType = 'natal' | 'tarot' | 'horoscope';

interface TabNavigationProps {
  selectedTab: TabType;
  onTabChange: (tab: TabType) => void;
}

const TabNavigation: React.FC<TabNavigationProps> = ({ selectedTab, onTabChange }) => {
  return (
    <div className="flex justify-center mb-6">
      <div className="glass-card p-1 rounded-full flex">
        <button 
          className={`px-4 py-1.5 rounded-full text-sm flex items-center ${selectedTab === 'natal' ? 'bg-cosmos-pink bg-opacity-30 text-cosmos-darkGold' : 'text-gray-500'}`}
          onClick={() => onTabChange('natal')}
        >
          <span className="mr-1">⭐</span> Carta Natal
        </button>
        <button 
          className={`px-4 py-1.5 rounded-full text-sm flex items-center ${selectedTab === 'tarot' ? 'bg-cosmos-pink bg-opacity-30 text-cosmos-darkGold' : 'text-gray-500'}`}
          onClick={() => onTabChange('tarot')}
        >
          <Sparkles size={14} className="mr-1" /> Tarot Diario
        </button>
        <button 
          className={`px-4 py-1.5 rounded-full text-sm flex items-center ${selectedTab === 'horoscope' ? 'bg-cosmos-pink bg-opacity-30 text-cosmos-darkGold' : 'text-gray-500'}`}
          onClick={() => onTabChange('horoscope')}
        >
          <span className="mr-1">☉</span> Horóscopo
        </button>
      </div>
    </div>
  );
};

export default TabNavigation;
