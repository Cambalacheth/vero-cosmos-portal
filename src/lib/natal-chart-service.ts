
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

// Signos zodiacales con sus fechas aproximadas
const zodiacSigns = [
  { sign: "Aries", startMonth: 3, startDay: 21, endMonth: 4, endDay: 19 },
  { sign: "Tauro", startMonth: 4, startDay: 20, endMonth: 5, endDay: 20 },
  { sign: "Géminis", startMonth: 5, startDay: 21, endMonth: 6, endDay: 20 },
  { sign: "Cáncer", startMonth: 6, startDay: 21, endMonth: 7, endDay: 22 },
  { sign: "Leo", startMonth: 7, startDay: 23, endMonth: 8, endDay: 22 },
  { sign: "Virgo", startMonth: 8, startDay: 23, endMonth: 9, endDay: 22 },
  { sign: "Libra", startMonth: 9, startDay: 23, endMonth: 10, endDay: 22 },
  { sign: "Escorpio", startMonth: 10, startDay: 23, endMonth: 11, endDay: 21 },
  { sign: "Sagitario", startMonth: 11, startDay: 22, endMonth: 12, endDay: 21 },
  { sign: "Capricornio", startMonth: 12, startDay: 22, endMonth: 1, endDay: 19 },
  { sign: "Acuario", startMonth: 1, startDay: 20, endMonth: 2, endDay: 18 },
  { sign: "Piscis", startMonth: 2, startDay: 19, endMonth: 3, endDay: 20 }
];

// Función para convertir hora local a UTC
const convertToUTC = (date: Date, timeStr: string, longitudeHours: number): Date => {
  const [hours, minutes] = timeStr.split(':').map(Number);
  const localDate = new Date(date);
  localDate.setHours(hours, minutes, 0, 0);
  
  // Ajuste por longitud (aproximado)
  const utcDate = new Date(localDate.getTime() - (longitudeHours * 60 * 60 * 1000));
  return utcDate;
};

// Función para calcular la Hora Sidérea (simplificado)
const calculateSiderealTime = (utcDate: Date): number => {
  // Fórmula simplificada para la hora sidérea
  const year = utcDate.getFullYear();
  const month = utcDate.getMonth() + 1;
  const day = utcDate.getDate();
  const hour = utcDate.getHours() + utcDate.getMinutes() / 60;
  
  // Días transcurridos desde J2000.0 (1 de enero de 2000, 12:00 UTC)
  const j2000 = new Date(Date.UTC(2000, 0, 1, 12, 0, 0));
  const daysSinceJ2000 = (utcDate.getTime() - j2000.getTime()) / (24 * 60 * 60 * 1000);
  
  // Cálculo aproximado de hora sidérea en Greenwich
  const T = daysSinceJ2000 / 36525; // Siglos julianos
  let siderealTimeGreenwich = 280.46061837 + 360.98564736629 * daysSinceJ2000;
  siderealTimeGreenwich = siderealTimeGreenwich % 360; // Normalizar a 0-360 grados
  
  // Convertir a horas (0-24)
  return siderealTimeGreenwich / 15;
};

// Función para ajustar la hora sidérea por longitud
const adjustSiderealTimeByLongitude = (siderealTime: number, longitude: number): number => {
  // Convertir longitud de grados a horas
  const longitudeHours = longitude / 15;
  let adjustedSiderealTime = siderealTime + longitudeHours;
  
  // Normalizar a 0-24 horas
  while (adjustedSiderealTime < 0) adjustedSiderealTime += 24;
  while (adjustedSiderealTime >= 24) adjustedSiderealTime -= 24;
  
  return adjustedSiderealTime;
};

// Función para calcular el Ascendente
const calculateAscendant = (siderealTime: number, latitude: number): string => {
  // Fórmula simplificada para el cálculo del Ascendente
  // RAMC = Ascensión Recta del Mediocielo = Hora Sidérea Local * 15
  const RAMC = siderealTime * 15;
  
  // Simulación del cálculo real del Ascendente
  // En una implementación real, esto requeriría cálculos trigonométricos complejos
  // Usamos una aproximación basada en la hora sidérea y la latitud
  const ascIndex = Math.floor((RAMC + latitude / 2) / 30) % 12;
  const signs = ["Aries", "Tauro", "Géminis", "Cáncer", "Leo", "Virgo", "Libra", "Escorpio", "Sagitario", "Capricornio", "Acuario", "Piscis"];
  
  return signs[ascIndex];
};

// Función para determinar el signo zodiacal basado en la fecha
const getZodiacSign = (date: Date): string => {
  const month = date.getMonth() + 1;
  const day = date.getDate();
  
  for (const zodiac of zodiacSigns) {
    // Manejo especial para Capricornio (cruza el año)
    if (zodiac.sign === "Capricornio") {
      if ((month === 12 && day >= zodiac.startDay) || (month === 1 && day <= zodiac.endDay)) {
        return zodiac.sign;
      }
    } else {
      if ((month === zodiac.startMonth && day >= zodiac.startDay) || 
          (month === zodiac.endMonth && day <= zodiac.endDay)) {
        return zodiac.sign;
      }
    }
  }
  
  return "Aries"; // Default, aunque no deberíamos llegar aquí
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

// Función para calcular posición planetaria basada en la fecha y desplazamiento (simplificado)
const calculatePlanetaryPosition = (birthDate: Date, offsetDays: number): string => {
  const adjustedDate = new Date(birthDate);
  adjustedDate.setDate(adjustedDate.getDate() + offsetDays);
  return getZodiacSign(adjustedDate);
};

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
