import React, { useState, useEffect } from 'react';
import { MapPin, Clock, X, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { 
  NatalChartInput, 
  Location, 
  searchLocations 
} from '@/lib/natal-chart';

interface NatalChartFormProps {
  onSubmit: (data: NatalChartInput) => void;
}

const NatalChartForm: React.FC<NatalChartFormProps> = ({ onSubmit }) => {
  const [birthDate, setBirthDate] = useState<Date | null>(null);
  const [birthTime, setBirthTime] = useState('');
  const [birthplaceOpen, setBirthplaceOpen] = useState(false);
  const [birthplaceSearch, setBirthplaceSearch] = useState('');
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
  const [locationResults, setLocationResults] = useState<Location[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    if (!birthplaceOpen || !birthplaceSearch || birthplaceSearch.length < 2) {
      setLocationResults([]);
      return;
    }

    setIsSearching(true);
    const timer = setTimeout(() => {
      try {
        const results = searchLocations(birthplaceSearch);
        setLocationResults(results || []);
        setIsSearching(false);
      } catch (error) {
        console.error("Error searching locations:", error);
        setLocationResults([]);
        setIsSearching(false);
      }
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [birthplaceSearch, birthplaceOpen]);

  const handleSubmit = () => {
    if (!birthDate || !birthTime || !selectedLocation) {
      return;
    }
    
    const input: NatalChartInput = {
      birthDate,
      birthTime,
      birthplace: selectedLocation
    };
    
    onSubmit(input);
  };

  const handleLocationSelect = (location: Location) => {
    setSelectedLocation(location);
    setBirthplaceOpen(false);
    setBirthplaceSearch('');
  };

  const clearSelection = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedLocation(null);
  };

  return (
    <div className="glass-card p-5 rounded-xl">
      <h3 className="text-xl font-playfair text-cosmos-darkGold mb-4">Descubre Tu Carta Natal</h3>
      <p className="text-sm mb-6">Tu carta natal es un mapa del cielo en el momento exacto de tu nacimiento. Revela tus fortalezas, desafíos y oportunidades de crecimiento personal.</p>
      
      <div className="space-y-4 mb-6">
        <div>
          <label className="block text-sm font-medium mb-1">Fecha de Nacimiento</label>
          <input 
            type="date" 
            className="w-full p-2 bg-white bg-opacity-30 border border-cosmos-pink rounded-lg" 
            onChange={(e) => setBirthDate(e.target.value ? new Date(e.target.value) : null)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Hora de Nacimiento</label>
          <div className="relative">
            <Clock size={16} className="absolute left-2 top-1/2 -translate-y-1/2 text-cosmos-darkGold" />
            <input 
              type="time" 
              className="w-full p-2 pl-8 bg-white bg-opacity-30 border border-cosmos-pink rounded-lg" 
              onChange={(e) => setBirthTime(e.target.value)}
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Lugar de Nacimiento</label>
          <Popover open={birthplaceOpen} onOpenChange={setBirthplaceOpen}>
            <PopoverTrigger asChild>
              <Button 
                variant="outline" 
                role="combobox" 
                aria-expanded={birthplaceOpen}
                className="w-full justify-between bg-white bg-opacity-30 border border-cosmos-pink text-left font-normal"
              >
                <div className="flex items-center">
                  <MapPin size={16} className="mr-2 text-cosmos-darkGold" />
                  {selectedLocation ? 
                    `${selectedLocation.name}, ${selectedLocation.country}` : 
                    "Selecciona una ciudad..."}
                </div>
                {selectedLocation && (
                  <X
                    className="ml-2 h-4 w-4 shrink-0 opacity-50 hover:opacity-100"
                    onClick={clearSelection}
                  />
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[--radix-popover-trigger-width] p-0 max-h-[300px] overflow-auto bg-white">
              <div className="p-2">
                <div className="flex items-center border-b mb-2">
                  <MapPin className="h-4 w-4 mr-2 text-cosmos-darkGold" />
                  <Input 
                    placeholder="Escribe al menos 2 letras..." 
                    value={birthplaceSearch}
                    onChange={(e) => setBirthplaceSearch(e.target.value)}
                    className="border-0 focus-visible:ring-0 p-2 text-sm"
                  />
                </div>
                
                <div className="mt-2">
                  {isSearching ? (
                    <div className="text-center py-2 text-sm text-muted-foreground">
                      Buscando...
                    </div>
                  ) : locationResults.length > 0 ? (
                    <div className="space-y-1">
                      {locationResults.map((location) => (
                        <div
                          key={location.id}
                          className={`flex items-center p-2 text-sm rounded-md cursor-pointer 
                                    ${selectedLocation?.id === location.id ? 'bg-accent text-accent-foreground' : 'hover:bg-muted'}`}
                          onClick={() => handleLocationSelect(location)}
                        >
                          <MapPin className="mr-2 h-4 w-4 text-cosmos-darkGold" />
                          <span>{location.name}, {location.country}</span>
                          {selectedLocation?.id === location.id && (
                            <Check className="ml-auto h-4 w-4 text-cosmos-darkGold" />
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="py-2 px-1 text-xs text-muted-foreground">
                      {birthplaceSearch.length > 0 && birthplaceSearch.length < 2
                        ? "Escribe al menos 2 caracteres para buscar"
                        : birthplaceSearch.length >= 2
                          ? "No se encontraron resultados."
                          : "Comienza a escribir para buscar ciudades."}
                    </div>
                  )}
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>
      
      <Button 
        className="w-full button-effect px-4 py-2 glass-card rounded-lg text-cosmos-darkGold border border-cosmos-pink"
        onClick={handleSubmit}
        disabled={!birthDate || !birthTime || !selectedLocation}
      >
        Crear Mi Carta Natal
      </Button>
    </div>
  );
};

export default NatalChartForm;
