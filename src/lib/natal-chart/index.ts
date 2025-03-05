
import { NatalChartInput, NatalChartData, PlanetaryPosition, Location } from './types';
import { convertToUTC, calculateSiderealTime, adjustSiderealTimeByLongitude, calculateAscendant, calculatePlanetaryPosition } from './astronomical-calculations';
import { getZodiacSign, getPlanetIcon } from './zodiac-data';
import { generatePersonalizedHoroscope } from './horoscope-generator';
import { searchLocations, LOCATIONS } from './locations-data';

// Función para calcular las posiciones planetarias
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
  
  // 5. Calcular posiciones planetarias (simplificadas para este ejemplo)
  // En un sistema real, usaríamos cálculos astronómicos precisos o efemérides
  const sunSign = getZodiacSign(birthDate);
  const moonSign = calculatePlanetaryPosition(birthDate, 2);
  const mercurySign = calculatePlanetaryPosition(birthDate, -1);
  const venusSign = calculatePlanetaryPosition(birthDate, 3);
  const marsSign = calculatePlanetaryPosition(birthDate, -2);
  
  // 6. Crear objeto de datos de la carta natal
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

// Re-exportar todas las funciones y tipos necesarios
export { 
  generatePersonalizedHoroscope,
  searchLocations,
  LOCATIONS,
  // Tipos
  Location
};

// Re-exportar tipos con la sintaxis correcta
export type { 
  NatalChartInput,
  NatalChartData,
  PlanetaryPosition
};
