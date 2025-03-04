
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

// Interfaz para los datos de entrada de la carta natal
export interface NatalChartInput {
  birthDate: Date;
  birthTime: string;
  birthplace: string;
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

// Función para calcular las posiciones planetarias (simplificada para demostración)
// En una aplicación real, esto requeriría cálculos astronómicos complejos o una API
export const calculateNatalChart = (input: NatalChartInput): NatalChartData => {
  const { birthDate, birthTime, birthplace } = input;

  // Determinar el signo solar basado en la fecha de nacimiento
  const sunSign = getZodiacSign(birthDate);
  
  // Simular otros signos basándose en el signo solar con algunos desplazamientos
  // En una app real, estos serían calculados con precisión astronómica
  const moonSign = getZodiacSign(new Date(birthDate.getFullYear(), birthDate.getMonth(), birthDate.getDate() + 2));
  
  // Simular un ascendente basado en la hora (muy simplificado)
  // En realidad, el ascendente depende de la hora y ubicación exactas
  const timeHours = parseInt(birthTime.split(':')[0]);
  let ascendantIndex = (timeHours % 12);
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
