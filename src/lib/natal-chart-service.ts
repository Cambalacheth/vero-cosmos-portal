import { format } from 'date-fns';
import { es } from 'date-fns/locale';

// Interfaz para la ubicación
export interface Location {
  id: string;
  name: string;
  country: string;
  latitude: number;
  longitude: number;
}

// Interfaz para los datos de entrada de la carta natal
export interface NatalChartInput {
  birthDate: Date;
  birthTime: string;
  birthplace: Location;
}

// Interfaz para representar una posición planetaria
export interface PlanetaryPosition {
  planet: string;
  sign: string;
  degree: number;
  icon: string;
}

// Interfaz para los datos de la carta natal
export interface NatalChartData {
  sun: PlanetaryPosition;
  moon: PlanetaryPosition;
  ascendant: PlanetaryPosition;
  mercury: PlanetaryPosition;
  venus: PlanetaryPosition;
  mars: PlanetaryPosition;
  jupiter?: PlanetaryPosition;
  saturn?: PlanetaryPosition;
}

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

// Función para obtener el signo zodiacal basado en la fecha
const getZodiacSign = (date: Date): string => {
  const month = date.getMonth() + 1;
  const day = date.getDate();

  if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) return "Aries";
  if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) return "Tauro";
  if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) return "Géminis";
  if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) return "Cáncer";
  if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) return "Leo";
  if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) return "Virgo";
  if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) return "Libra";
  if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) return "Escorpio";
  if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) return "Sagitario";
  if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) return "Capricornio";
  if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) return "Acuario";
  return "Piscis";
};

// Función para obtener el icono zodiacal basado en el signo
const getZodiacIcon = (sign: string): string => {
  const zodiacIcons: Record<string, string> = {
    "Aries": "♈",
    "Tauro": "♉",
    "Géminis": "♊",
    "Cáncer": "♋",
    "Leo": "♌",
    "Virgo": "♍",
    "Libra": "♎",
    "Escorpio": "♏",
    "Sagitario": "♐",
    "Capricornio": "♑",
    "Acuario": "♒",
    "Piscis": "♓"
  };
  return zodiacIcons[sign] || "⭐";
};

// Función para obtener el icono planetario
const getPlanetIcon = (planet: string): string => {
  const planetIcons: Record<string, string> = {
    "Sol": "☉",
    "Luna": "☾",
    "Mercurio": "☿",
    "Venus": "♀",
    "Marte": "♂",
    "Júpiter": "♃",
    "Saturno": "♄",
    "Ascendente": "⬆️"
  };
  return planetIcons[planet] || "🪐";
};

// Función para calcular las posiciones planetarias
export const calculateNatalChart = (input: NatalChartInput): NatalChartData => {
  const { birthDate, birthTime, birthplace } = input;

  // En una implementación real, usaríamos la latitud y longitud para cálculos más precisos
  // Por ahora, solo modificamos la lógica existente para usar el nuevo tipo Location
  
  // Determinar el signo solar basado en la fecha de nacimiento
  const sunSign = getZodiacSign(birthDate);
  
  // Simular otros signos basándose en el signo solar con algunos desplazamientos
  // En una app real, estos serían calculados con precisión astronómica
  const moonSign = getZodiacSign(new Date(birthDate.getFullYear(), birthDate.getMonth(), birthDate.getDate() + 2));
  
  // Simular un ascendente basado en la hora y ubicación (muy simplificado)
  // En realidad, el ascendente depende de la hora y ubicación exactas
  const timeHours = parseInt(birthTime.split(':')[0]);
  // Usar la longitud para añadir un pequeño factor a la hora (simulado)
  const longitudeFactor = Math.floor((birthplace.longitude + 180) / 30);
  let ascendantIndex = (timeHours + longitudeFactor) % 12;
  const signs = ["Aries", "Tauro", "Géminis", "Cáncer", "Leo", "Virgo", "Libra", "Escorpio", "Sagitario", "Capricornio", "Acuario", "Piscis"];
  const ascendantSign = signs[ascendantIndex];
  
  // Simular posiciones de mercurio, venus y marte
  const mercurySign = getZodiacSign(new Date(birthDate.getFullYear(), birthDate.getMonth(), birthDate.getDate() - 1));
  const venusSign = getZodiacSign(new Date(birthDate.getFullYear(), birthDate.getMonth(), birthDate.getDate() + 3));
  const marsSign = getZodiacSign(new Date(birthDate.getFullYear(), birthDate.getMonth(), birthDate.getDate() - 2));
  
  // Crear objeto de datos de la carta natal
  return {
    sun: {
      planet: "Sol",
      sign: sunSign,
      degree: Math.floor(Math.random() * 30),
      icon: getPlanetIcon("Sol")
    },
    moon: {
      planet: "Luna",
      sign: moonSign,
      degree: Math.floor(Math.random() * 30),
      icon: getPlanetIcon("Luna")
    },
    ascendant: {
      planet: "Ascendente",
      sign: ascendantSign,
      degree: Math.floor(Math.random() * 30),
      icon: getPlanetIcon("Ascendente")
    },
    mercury: {
      planet: "Mercurio",
      sign: mercurySign,
      degree: Math.floor(Math.random() * 30),
      icon: getPlanetIcon("Mercurio")
    },
    venus: {
      planet: "Venus",
      sign: venusSign,
      degree: Math.floor(Math.random() * 30),
      icon: getPlanetIcon("Venus")
    },
    mars: {
      planet: "Marte",
      sign: marsSign,
      degree: Math.floor(Math.random() * 30),
      icon: getPlanetIcon("Marte")
    }
  };
};

// Genera un mensaje personalizado basado en la carta natal
export const generatePersonalizedHoroscope = (chartData: NatalChartData): string => {
  const messages = [
    `Con el Sol en ${chartData.sun.sign} y la Luna en ${chartData.moon.sign}, hoy es un día para equilibrar tu fuerza interior con tu sensibilidad.`,
    `Tu Ascendente en ${chartData.ascendant.sign} te ayudará a navegar las interacciones sociales del día con facilidad.`,
    `Mercurio en ${chartData.mercury.sign} agudiza tu comunicación. Aprovecha para expresar ideas complejas.`,
    `Venus en ${chartData.venus.sign} trae armonía a tus relaciones personales. Es un buen momento para el romance y la creatividad.`,
    `Marte en ${chartData.mars.sign} potencia tu energía y determinación. Canaliza esta fuerza en proyectos importantes.`
  ];
  
  return messages.join(' ');
};
