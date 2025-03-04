
// Signos zodiacales con sus fechas aproximadas
export const zodiacSigns = [
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

// Mapa de iconos zodiacales
export const zodiacIcons: Record<string, string> = {
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

// Mapa de iconos planetarios
export const planetIcons: Record<string, string> = {
  "Sol": "☉",
  "Luna": "☾",
  "Mercurio": "☿",
  "Venus": "♀",
  "Marte": "♂",
  "Júpiter": "♃",
  "Saturno": "♄",
  "Ascendente": "⬆️"
};

// Función para determinar el signo zodiacal basado en la fecha
export const getZodiacSign = (date: Date): string => {
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
export const getZodiacIcon = (sign: string): string => {
  return zodiacIcons[sign] || "⭐";
};

// Función para obtener el icono planetario
export const getPlanetIcon = (planet: string): string => {
  return planetIcons[planet] || "🪐";
};
