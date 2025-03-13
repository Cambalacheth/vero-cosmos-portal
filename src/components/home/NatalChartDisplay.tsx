
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { NatalChartData, PlanetaryPosition } from '@/lib/natal-chart';
import { Sun, Moon, ChevronUp, Info } from 'lucide-react';
import ChartVisual from './chart-components/ChartVisual';
import PlanetDetails from './chart-components/PlanetDetails';
import HouseDetails from './chart-components/HouseDetails';

interface NatalChartDisplayProps {
  natalChart: NatalChartData;
  onEdit: () => void;
}

const NatalChartDisplay: React.FC<NatalChartDisplayProps> = ({ natalChart, onEdit }) => {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  
  // Ordenar los planetas por casa para la vista de casas
  const planetsByHouse = Object.entries(natalChart)
    .filter(([key, value]) => key !== 'houses' && key !== 'birthDate' && key !== 'birthTime' && key !== 'birthplace')
    .map(([key, planet]) => planet as PlanetaryPosition)
    .reduce((acc, planet) => {
      if (planet.house) {
        if (!acc[planet.house]) {
          acc[planet.house] = [];
        }
        acc[planet.house].push(planet);
      }
      return acc;
    }, {} as Record<number, PlanetaryPosition[]>);

  const toggleSection = (section: string) => {
    if (expandedSection === section) {
      setExpandedSection(null);
    } else {
      setExpandedSection(section);
    }
  };

  const formatBirthInfo = () => {
    if (!natalChart.birthDate || !natalChart.birthTime || !natalChart.birthplace) {
      return "Información de nacimiento no disponible";
    }
    
    const date = new Date(natalChart.birthDate);
    const formattedDate = date.toLocaleDateString();
    
    return `${formattedDate}, ${natalChart.birthTime} - ${natalChart.birthplace.name}, ${natalChart.birthplace.country}`;
  };

  // List of planets with their icons for the planets tab
  const planetsList = [
    { key: 'sun', icon: <Sun className="h-4 w-4 text-yellow-500" />, data: natalChart.sun },
    { key: 'moon', icon: <Moon className="h-4 w-4 text-blue-300" />, data: natalChart.moon },
    { key: 'ascendant', icon: <ChevronUp className="h-4 w-4 text-purple-500" />, data: natalChart.ascendant },
    { key: 'mercury', icon: <Info className="h-4 w-4 text-gray-500" />, data: natalChart.mercury },
    { key: 'venus', icon: <Info className="h-4 w-4 text-pink-400" />, data: natalChart.venus },
    { key: 'mars', icon: <Info className="h-4 w-4 text-red-500" />, data: natalChart.mars },
    { key: 'jupiter', icon: <Info className="h-4 w-4 text-indigo-500" />, data: natalChart.jupiter },
    { key: 'saturn', icon: <Info className="h-4 w-4 text-gray-700" />, data: natalChart.saturn },
    { key: 'uranus', icon: <Info className="h-4 w-4 text-teal-500" />, data: natalChart.uranus },
    { key: 'neptune', icon: <Info className="h-4 w-4 text-blue-500" />, data: natalChart.neptune },
    { key: 'pluto', icon: <Info className="h-4 w-4 text-violet-800" />, data: natalChart.pluto }
  ];

  return (
    <div className="glass-card p-4 rounded-xl">
      <h3 className="text-xl font-playfair text-cosmos-darkGold mb-4">Tu Carta Natal</h3>
      
      <p className="text-sm text-center mb-3 text-cosmos-darkGold/80">{formatBirthInfo()}</p>
      
      <Tabs defaultValue="chart" className="mb-4">
        <TabsList className="w-full grid grid-cols-3 mb-4">
          <TabsTrigger value="chart">Carta Visual</TabsTrigger>
          <TabsTrigger value="planets">Planetas</TabsTrigger>
          <TabsTrigger value="houses">Casas</TabsTrigger>
        </TabsList>
        
        <TabsContent value="chart" className="focus-visible:outline-none focus-visible:ring-0">
          <ChartVisual natalChart={natalChart} />
        </TabsContent>
        
        <TabsContent value="planets" className="focus-visible:outline-none focus-visible:ring-0">
          <PlanetDetails 
            planets={planetsList} 
            expandedSection={expandedSection} 
            toggleSection={toggleSection} 
          />
        </TabsContent>
        
        <TabsContent value="houses" className="focus-visible:outline-none focus-visible:ring-0">
          <HouseDetails 
            houses={natalChart.houses}
            planetsByHouse={planetsByHouse}
            expandedSection={expandedSection}
            toggleSection={toggleSection}
          />
        </TabsContent>
      </Tabs>
      
      <Button 
        className="w-full button-effect px-4 py-2 bg-cosmos-pink bg-opacity-20 rounded-lg text-cosmos-darkGold border border-cosmos-pink"
        onClick={onEdit}
      >
        Editar Carta Natal
      </Button>
    </div>
  );
};

export default NatalChartDisplay;
