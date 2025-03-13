
// Constantes astronómicas
const J2000_0 = 2451545.0; // Época J2000.0 en días julianos
const DEGREES_TO_RADIANS = Math.PI / 180;
const RADIANS_TO_DEGREES = 180 / Math.PI;

// Función para convertir hora local a UTC
export const convertToUTC = (date: Date, timeStr: string, longitudeHours: number): Date => {
  const [hours, minutes] = timeStr.split(':').map(Number);
  const localDate = new Date(date);
  localDate.setHours(hours, minutes, 0, 0);
  
  // Ajuste por longitud (más preciso)
  const utcDate = new Date(localDate.getTime() - (longitudeHours * 60 * 60 * 1000));
  return utcDate;
};

// Función para calcular el día juliano a partir de una fecha
const calculateJulianDay = (date: Date): number => {
  const y = date.getFullYear();
  const m = date.getMonth() + 1;
  const d = date.getDate() + 
            (date.getHours() + 
             date.getMinutes() / 60 + 
             date.getSeconds() / 3600) / 24;
  
  let jd;
  if (m <= 2) {
    jd = Math.floor(365.25 * (y - 1)) + Math.floor(30.6001 * (m + 12 + 1)) + d + 1720981.5;
  } else {
    jd = Math.floor(365.25 * y) + Math.floor(30.6001 * (m + 1)) + d + 1720981.5;
  }
  
  return jd;
};

// Función para calcular el siglo juliano
const calculateJulianCentury = (jd: number): number => {
  return (jd - J2000_0) / 36525;
};

// Función para calcular la Hora Sidérea en Greenwich
export const calculateSiderealTime = (utcDate: Date): number => {
  // Cálculo preciso de la hora sidérea en Greenwich
  const jd = calculateJulianDay(utcDate);
  const T = calculateJulianCentury(jd);
  
  // Fórmula de la hora sidérea en Greenwich en grados
  let theta = 280.46061837 + 360.98564736629 * (jd - J2000_0) + 
              0.000387933 * T * T - T * T * T / 38710000;
  
  // Normalizar a 0-360 grados
  theta = theta % 360;
  if (theta < 0) theta += 360;
  
  // Convertir a horas (0-24)
  return theta / 15;
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
  // Conversión de la hora sidérea local a ángulo
  const RAMC = siderealTime * 15;
  
  // Cálculo del Ascendente utilizando la fórmula de Placidus
  const latRad = latitude * DEGREES_TO_RADIANS;
  const epsilon = 23.4392911 * DEGREES_TO_RADIANS; // Oblicuidad de la eclíptica
  
  // Fórmula trigonométrica para el Ascendente
  const ascendantRad = Math.atan2(
    Math.cos(RAMC * DEGREES_TO_RADIANS),
    Math.sin(RAMC * DEGREES_TO_RADIANS) * Math.cos(epsilon) + Math.tan(latRad) * Math.sin(epsilon)
  );
  
  // Convertir de radianes a grados y normalizar
  let ascendantDeg = ascendantRad * RADIANS_TO_DEGREES;
  if (ascendantDeg < 0) ascendantDeg += 360;
  
  // Determinar el signo del zodiaco basado en los grados
  const signs = ["Aries", "Tauro", "Géminis", "Cáncer", "Leo", "Virgo", "Libra", "Escorpio", "Sagitario", "Capricornio", "Acuario", "Piscis"];
  const signIndex = Math.floor(ascendantDeg / 30);
  
  return signs[signIndex];
};

// Cálculos para posiciones solares simplificadas pero más precisas
export const calculateSunPosition = (date: Date): { sign: string, degree: number } => {
  const jd = calculateJulianDay(date);
  const T = calculateJulianCentury(jd);
  
  // Longitud media del Sol
  let L0 = 280.46646 + 36000.76983 * T + 0.0003032 * T * T;
  
  // Anomalía media del Sol
  let M = 357.52911 + 35999.05029 * T - 0.0001537 * T * T;
  
  // Ecuación del centro
  let C = (1.914602 - 0.004817 * T - 0.000014 * T * T) * Math.sin(M * DEGREES_TO_RADIANS) +
          (0.019993 - 0.000101 * T) * Math.sin(2 * M * DEGREES_TO_RADIANS) +
          0.000289 * Math.sin(3 * M * DEGREES_TO_RADIANS);
  
  // Longitud verdadera del Sol
  let sunLongitude = (L0 + C) % 360;
  if (sunLongitude < 0) sunLongitude += 360;
  
  // Determinar el signo zodiacal y los grados
  const signs = ["Aries", "Tauro", "Géminis", "Cáncer", "Leo", "Virgo", "Libra", "Escorpio", "Sagitario", "Capricornio", "Acuario", "Piscis"];
  const signIndex = Math.floor(sunLongitude / 30);
  const degree = sunLongitude % 30;
  
  return { sign: signs[signIndex], degree: Math.floor(degree) };
};

// Cálculos lunares simplificados pero más precisos
export const calculateMoonPosition = (date: Date): { sign: string, degree: number } => {
  const jd = calculateJulianDay(date);
  const T = calculateJulianCentury(jd);
  
  // Elementos orbitales de la Luna (simplificados)
  let L0 = 218.316 + 481267.8813 * T;
  let M = 134.963 + 477198.8676 * T;
  let F = 93.272 + 483202.0175 * T;
  
  // Simplificación de la longitud lunar
  let moonLongitude = L0 + 6.289 * Math.sin(M * DEGREES_TO_RADIANS);
  moonLongitude = moonLongitude % 360;
  if (moonLongitude < 0) moonLongitude += 360;
  
  // Determinar el signo zodiacal y los grados
  const signs = ["Aries", "Tauro", "Géminis", "Cáncer", "Leo", "Virgo", "Libra", "Escorpio", "Sagitario", "Capricornio", "Acuario", "Piscis"];
  const signIndex = Math.floor(moonLongitude / 30);
  const degree = moonLongitude % 30;
  
  return { sign: signs[signIndex], degree: Math.floor(degree) };
};

// Función para calcular la posición de Mercurio (simplificada)
export const calculateMercuryPosition = (date: Date): { sign: string, degree: number } => {
  const jd = calculateJulianDay(date);
  const T = calculateJulianCentury(jd);
  
  // Simplificación basada en el movimiento medio de Mercurio
  // En relación con el Sol más un offset
  const { sign: sunSign, degree: sunDegree } = calculateSunPosition(date);
  
  // Mercurio nunca está muy lejos del Sol (máximo 28 grados)
  const mercuryOffset = (Math.sin(jd * 0.11) * 20) % 60; // Simulación del movimiento relativo
  
  let mercuryLongitude = (sunDegree + mercuryOffset) % 360;
  if (mercuryLongitude < 0) mercuryLongitude += 360;
  
  // Ajustar el signo si necesario
  const signs = ["Aries", "Tauro", "Géminis", "Cáncer", "Leo", "Virgo", "Libra", "Escorpio", "Sagitario", "Capricornio", "Acuario", "Piscis"];
  let signIndex = signs.indexOf(sunSign);
  
  // Ajustar el signo basado en el offset
  if (mercuryLongitude >= 30) {
    signIndex = (signIndex + 1) % 12;
    mercuryLongitude -= 30;
  } else if (mercuryLongitude < 0) {
    signIndex = (signIndex + 11) % 12;
    mercuryLongitude += 30;
  }
  
  return { sign: signs[signIndex], degree: Math.floor(mercuryLongitude) };
};

// Función para calcular la posición de Venus (simplificada)
export const calculateVenusPosition = (date: Date): { sign: string, degree: number } => {
  const jd = calculateJulianDay(date);
  const T = calculateJulianCentury(jd);
  
  // Simplificación basada en el movimiento medio de Venus
  // En relación con el Sol más un offset
  const { sign: sunSign, degree: sunDegree } = calculateSunPosition(date);
  
  // Venus nunca está muy lejos del Sol (máximo 47 grados)
  const venusOffset = (Math.sin(jd * 0.08) * 40) % 90; // Simulación del movimiento relativo
  
  let venusLongitude = (sunDegree + venusOffset) % 360;
  if (venusLongitude < 0) venusLongitude += 360;
  
  // Ajustar el signo si necesario
  const signs = ["Aries", "Tauro", "Géminis", "Cáncer", "Leo", "Virgo", "Libra", "Escorpio", "Sagitario", "Capricornio", "Acuario", "Piscis"];
  let signIndex = signs.indexOf(sunSign);
  
  // Ajustar el signo basado en el offset
  if (venusLongitude >= 30) {
    signIndex = (signIndex + 1) % 12;
    venusLongitude -= 30;
  } else if (venusLongitude < 0) {
    signIndex = (signIndex + 11) % 12;
    venusLongitude += 30;
  }
  
  return { sign: signs[signIndex], degree: Math.floor(venusLongitude) };
};

// Función para calcular la posición de Marte (simplificada)
export const calculateMarsPosition = (date: Date): { sign: string, degree: number } => {
  const jd = calculateJulianDay(date);
  const T = calculateJulianCentury(jd);
  
  // Parámetros orbitales simplificados de Marte
  let L = 355.45332 + 19140.30268 * T;
  L = L % 360;
  if (L < 0) L += 360;
  
  // Determinar el signo zodiacal y los grados
  const signs = ["Aries", "Tauro", "Géminis", "Cáncer", "Leo", "Virgo", "Libra", "Escorpio", "Sagitario", "Capricornio", "Acuario", "Piscis"];
  const signIndex = Math.floor(L / 30);
  const degree = L % 30;
  
  return { sign: signs[signIndex], degree: Math.floor(degree) };
};

// Función para calcular posición planetaria (compatibilidad con código existente)
export const calculatePlanetaryPosition = (birthDate: Date, offsetDays: number): string => {
  const adjustedDate = new Date(birthDate);
  adjustedDate.setDate(adjustedDate.getDate() + offsetDays);
  
  // Usamos la posición solar como aproximación para mantener compatibilidad
  const { sign } = calculateSunPosition(adjustedDate);
  return sign;
};
