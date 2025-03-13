
import { NatalChartInput, NatalChartData, PlanetaryPosition, Location, HousePosition } from './types';
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
  calculateJupiterPosition,
  calculateSaturnPosition,
  calculateUranusPosition,
  calculateNeptunePosition,
  calculatePlutoPosition,
  calculateHouseCusps
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
  
  // 5. Calcular las cusps de las casas (sistema Placidus)
  const houses = calculateHouseCusps(localSiderealTime, birthplace.latitude);
  
  // 6. Calcular posiciones planetarias usando algoritmos astronómicos
  const sunPosition = calculateSunPosition(utcTime);
  const moonPosition = calculateMoonPosition(utcTime);
  const mercuryPosition = calculateMercuryPosition(utcTime);
  const venusPosition = calculateVenusPosition(utcTime);
  const marsPosition = calculateMarsPosition(utcTime);
  const jupiterPosition = calculateJupiterPosition(utcTime);
  const saturnPosition = calculateSaturnPosition(utcTime);
  const uranusPosition = calculateUranusPosition(utcTime);
  const neptunePosition = calculateNeptunePosition(utcTime);
  const plutoPosition = calculatePlutoPosition(utcTime);
  
  // 7. Asignar casas a planetas
  const assignHouseToPosition = (position: { sign: string, degree: number }): number => {
    // Convertir signo y grado a grados absolutos (0-360)
    const zodiacSigns = ["Aries", "Tauro", "Géminis", "Cáncer", "Leo", "Virgo", "Libra", "Escorpio", "Sagitario", "Capricornio", "Acuario", "Piscis"];
    const absPosition = zodiacSigns.indexOf(position.sign) * 30 + position.degree;
    
    // Determinar la casa basada en las cúspides
    for (let i = 0; i < houses.length; i++) {
      const nextHouse = (i + 1) % houses.length;
      const houseStart = zodiacSigns.indexOf(houses[i].sign) * 30 + houses[i].degree;
      let houseEnd = zodiacSigns.indexOf(houses[nextHouse].sign) * 30 + houses[nextHouse].degree;
      
      if (houseEnd < houseStart) houseEnd += 360; // Si cruza 0°Aries
      
      if ((absPosition >= houseStart && absPosition < houseEnd) || 
          (absPosition + 360 >= houseStart && absPosition + 360 < houseEnd)) {
        return houses[i].house;
      }
    }
    
    return 1; // Default a la primera casa si algo sale mal
  };
  
  // 8. Crear objeto de datos de la carta natal con casas asignadas
  return {
    sun: {
      planet: "Sol",
      sign: sunPosition.sign,
      degree: sunPosition.degree,
      icon: getPlanetIcon("Sol"),
      house: assignHouseToPosition(sunPosition)
    },
    moon: {
      planet: "Luna",
      sign: moonPosition.sign,
      degree: moonPosition.degree,
      icon: getPlanetIcon("Luna"),
      house: assignHouseToPosition(moonPosition)
    },
    ascendant: {
      planet: "Ascendente",
      sign: ascendantSign,
      degree: houses[0].degree,
      icon: getPlanetIcon("Ascendente"),
      house: 1
    },
    mercury: {
      planet: "Mercurio",
      sign: mercuryPosition.sign,
      degree: mercuryPosition.degree,
      icon: getPlanetIcon("Mercurio"),
      house: assignHouseToPosition(mercuryPosition)
    },
    venus: {
      planet: "Venus",
      sign: venusPosition.sign,
      degree: venusPosition.degree,
      icon: getPlanetIcon("Venus"),
      house: assignHouseToPosition(venusPosition)
    },
    mars: {
      planet: "Marte",
      sign: marsPosition.sign,
      degree: marsPosition.degree,
      icon: getPlanetIcon("Marte"),
      house: assignHouseToPosition(marsPosition)
    },
    jupiter: {
      planet: "Júpiter",
      sign: jupiterPosition.sign,
      degree: jupiterPosition.degree,
      icon: getPlanetIcon("Júpiter"),
      house: assignHouseToPosition(jupiterPosition)
    },
    saturn: {
      planet: "Saturno",
      sign: saturnPosition.sign,
      degree: saturnPosition.degree,
      icon: getPlanetIcon("Saturno"),
      house: assignHouseToPosition(saturnPosition)
    },
    uranus: {
      planet: "Urano",
      sign: uranusPosition.sign,
      degree: uranusPosition.degree,
      icon: getPlanetIcon("Urano"),
      house: assignHouseToPosition(uranusPosition)
    },
    neptune: {
      planet: "Neptuno",
      sign: neptunePosition.sign,
      degree: neptunePosition.degree,
      icon: getPlanetIcon("Neptuno"),
      house: assignHouseToPosition(neptunePosition)
    },
    pluto: {
      planet: "Plutón",
      sign: plutoPosition.sign,
      degree: plutoPosition.degree,
      icon: getPlanetIcon("Plutón"),
      house: assignHouseToPosition(plutoPosition)
    },
    houses: houses,
    birthDate: birthDate,
    birthTime: birthTime,
    birthplace: birthplace
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
  Location,
  HousePosition
};
