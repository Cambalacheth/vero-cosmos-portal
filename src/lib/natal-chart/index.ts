
import { NatalChartInput, NatalChartData, PlanetaryPosition, Location } from './types';
import { 
  convertToUTC, 
  calculateSiderealTime, 
  adjustSiderealTimeByLongitude, 
  calculateAscendant,
  calculateSunPosition,
  calculateMoonPosition,
  calculateMercuryPosition,
  calculateVenusPosition,
  calculateMarsPosition,
  calculatePlanetaryPosition 
} from './astronomical-calculations';
import { getZodiacSign, getPlanetIcon } from './zodiac-data';
import { generatePersonalizedHoroscope } from './horoscope-generator';
import { searchLocations, LOCATIONS } from './locations-data';

// Función para calcular las posiciones planetarias usando algoritmos astronómicos
export const calculateNatalChart = (input: NatalChartInput): NatalChartData => {
  const { birthDate, birthTime, birthplace } = input;

  // 1. Convertir hora local a UTC
  const longitudeHours = birthplace.longitude / 15;
  const utcTime = convertToUTC(birthDate, birthTime, longitudeHours);
  
  // 2. Calcular la Hora Sidérea en Greenwich
  const siderealTimeGreenwich = calculateSiderealTime(utcTime);
  
  // 3. Ajustar la Hora Sidérea según la longitud
  const localSiderealTime = adjustSiderealTimeByLongitude(siderealTimeGreenwich, birthplace.longitude);
  
  // 4. Calcular el Ascendente
  const ascendantSign = calculateAscendant(localSiderealTime, birthplace.latitude);
  
  // 5. Calcular posiciones planetarias usando algoritmos astronómicos
  const sunPosition = calculateSunPosition(utcTime);
  const moonPosition = calculateMoonPosition(utcTime);
  const mercuryPosition = calculateMercuryPosition(utcTime);
  const venusPosition = calculateVenusPosition(utcTime);
  const marsPosition = calculateMarsPosition(utcTime);
  
  // 6. Crear objeto de datos de la carta natal
  return {
    sun: {
      planet: "Sol",
      sign: sunPosition.sign,
      degree: sunPosition.degree,
      icon: getPlanetIcon("Sol")
    },
    moon: {
      planet: "Luna",
      sign: moonPosition.sign,
      degree: moonPosition.degree,
      icon: getPlanetIcon("Luna")
    },
    ascendant: {
      planet: "Ascendente",
      sign: ascendantSign,
      degree: Math.floor(Math.random() * 30), // Se podría mejorar con un cálculo preciso
      icon: getPlanetIcon("Ascendente")
    },
    mercury: {
      planet: "Mercurio",
      sign: mercuryPosition.sign,
      degree: mercuryPosition.degree,
      icon: getPlanetIcon("Mercurio")
    },
    venus: {
      planet: "Venus",
      sign: venusPosition.sign,
      degree: venusPosition.degree,
      icon: getPlanetIcon("Venus")
    },
    mars: {
      planet: "Marte",
      sign: marsPosition.sign,
      degree: marsPosition.degree,
      icon: getPlanetIcon("Marte")
    }
  };
};

// Re-exportar todas las funciones y tipos necesarios
export { 
  generatePersonalizedHoroscope,
  searchLocations,
  LOCATIONS
};

// Re-exportar tipos con la sintaxis correcta
export type { 
  NatalChartInput,
  NatalChartData,
  PlanetaryPosition,
  Location
};
