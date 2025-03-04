
import { getZodiacSign } from './zodiac-data';

// Función para convertir hora local a UTC
export const convertToUTC = (date: Date, timeStr: string, longitudeHours: number): Date => {
  const [hours, minutes] = timeStr.split(':').map(Number);
  const localDate = new Date(date);
  localDate.setHours(hours, minutes, 0, 0);
  
  // Ajuste por longitud (aproximado)
  const utcDate = new Date(localDate.getTime() - (longitudeHours * 60 * 60 * 1000));
  return utcDate;
};

// Función para calcular la Hora Sidérea (simplificado)
export const calculateSiderealTime = (utcDate: Date): number => {
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
export const adjustSiderealTimeByLongitude = (siderealTime: number, longitude: number): number => {
  // Convertir longitud de grados a horas
  const longitudeHours = longitude / 15;
  let adjustedSiderealTime = siderealTime + longitudeHours;
  
  // Normalizar a 0-24 horas
  while (adjustedSiderealTime < 0) adjustedSiderealTime += 24;
  while (adjustedSiderealTime >= 24) adjustedSiderealTime -= 24;
  
  return adjustedSiderealTime;
};

// Función para calcular el Ascendente
export const calculateAscendant = (siderealTime: number, latitude: number): string => {
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

// Función para calcular posición planetaria basada en la fecha y desplazamiento (simplificado)
export const calculatePlanetaryPosition = (birthDate: Date, offsetDays: number): string => {
  const adjustedDate = new Date(birthDate);
  adjustedDate.setDate(adjustedDate.getDate() + offsetDays);
  return getZodiacSign(adjustedDate);
};
