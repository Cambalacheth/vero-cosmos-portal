
import { Location } from './types';

// Lista de ciudades para el autocompletado (muestra reducida)
export const LOCATIONS: Location[] = [
  { id: "1", name: "Madrid", country: "España", latitude: 40.4168, longitude: -3.7038 },
  { id: "2", name: "Barcelona", country: "España", latitude: 41.3851, longitude: 2.1734 },
  { id: "3", name: "Valencia", country: "España", latitude: 39.4699, longitude: -0.3763 },
  { id: "4", name: "Sevilla", country: "España", latitude: 37.3891, longitude: -5.9845 },
  { id: "5", name: "Zaragoza", country: "España", latitude: 41.6488, longitude: -0.8891 },
  { id: "6", name: "Málaga", country: "España", latitude: 36.7213, longitude: -4.4214 },
  { id: "7", name: "Murcia", country: "España", latitude: 37.9922, longitude: -1.1307 },
  { id: "8", name: "Palma", country: "España", latitude: 39.5696, longitude: 2.6502 },
  { id: "9", name: "Las Palmas", country: "España", latitude: 28.1235, longitude: -15.4365 },
  { id: "10", name: "Bilbao", country: "España", latitude: 43.2630, longitude: -2.9350 },
  { id: "11", name: "Alicante", country: "España", latitude: 38.3452, longitude: -0.4815 },
  { id: "12", name: "Córdoba", country: "España", latitude: 37.8882, longitude: -4.7794 },
  { id: "13", name: "Valladolid", country: "España", latitude: 41.6523, longitude: -4.7245 },
  { id: "14", name: "Ciudad de México", country: "México", latitude: 19.4326, longitude: -99.1332 },
  { id: "15", name: "Buenos Aires", country: "Argentina", latitude: -34.6037, longitude: -58.3816 },
  { id: "16", name: "Bogotá", country: "Colombia", latitude: 4.7110, longitude: -74.0721 },
  { id: "17", name: "Lima", country: "Perú", latitude: -12.0464, longitude: -77.0428 },
  { id: "18", name: "Santiago", country: "Chile", latitude: -33.4489, longitude: -70.6693 },
  { id: "19", name: "Caracas", country: "Venezuela", latitude: 10.4806, longitude: -66.9036 },
  { id: "20", name: "La Habana", country: "Cuba", latitude: 23.1136, longitude: -82.3666 },
  // Añadir más ciudades según sea necesario
];

// Función para buscar ciudades basada en un término de búsqueda
export const searchLocations = (searchTerm: string): Location[] => {
  if (!searchTerm || searchTerm.trim() === '' || searchTerm.length < 2) return [];
  
  const normalizedSearch = searchTerm.toLowerCase().trim();
  
  try {
    return LOCATIONS.filter(location => {
      const cityMatch = location.name.toLowerCase().includes(normalizedSearch);
      const countryMatch = location.country.toLowerCase().includes(normalizedSearch);
      return cityMatch || countryMatch;
    }).slice(0, 5); // Limitar a 5 resultados para no saturar la UI
  } catch (error) {
    console.error("Error filtering locations:", error);
    return [];
  }
};
