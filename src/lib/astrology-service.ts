
import { format, isSameDay } from 'date-fns';
import { es } from 'date-fns/locale';

// Define types for our astrology data
export interface LunarPhase {
  date: Date;
  phase: 'Nueva' | 'Creciente' | 'Llena' | 'Menguante';
  icon: string;
  description: string;
}

export interface AstrologicalEvent {
  date: Date;
  event: string;
  icon: string;
  description: string;
  type: 'planetary' | 'zodiac' | 'retrograde';
}

export interface DailyAstrologyData {
  date: Date;
  lunarPhase?: LunarPhase;
  astroEvents: AstrologicalEvent[];
  dailyMessage: string;
}

// Get lunar phase for a specific date
export const getLunarPhaseForDate = (date: Date): LunarPhase | undefined => {
  // This is simplified - in a real app, you would calculate this based on astronomical formulas
  // or fetch from an API
  
  // Current month's lunar phases (simplified example for demo)
  const currentMonth = date.getMonth();
  const currentYear = date.getFullYear();
  
  const lunarPhases: LunarPhase[] = [
    { 
      date: new Date(currentYear, currentMonth, 5), 
      phase: 'Nueva', 
      icon: '🌑',
      description: 'Tiempo de nuevos comienzos, plantear intenciones y sembrar semillas para el futuro.'
    },
    { 
      date: new Date(currentYear, currentMonth, 12), 
      phase: 'Creciente', 
      icon: '🌓',
      description: 'Momento para tomar acción, enfocarse en el crecimiento y mantener el impulso.' 
    },
    { 
      date: new Date(currentYear, currentMonth, 19), 
      phase: 'Llena', 
      icon: '🌕',
      description: 'Culminación de energías, momento para celebrar logros y liberar lo que ya no te sirve.' 
    },
    { 
      date: new Date(currentYear, currentMonth, 26), 
      phase: 'Menguante', 
      icon: '🌗',
      description: 'Etapa de reflexión, soltar, perdonar y prepararte para un nuevo ciclo.' 
    },
  ];

  return lunarPhases.find(phase => isSameDay(phase.date, date));
};

// Get astrological events for a specific date
export const getAstroEventsForDate = (date: Date): AstrologicalEvent[] => {
  // This is simplified - in a real app, you would calculate this based on astronomical data
  // or fetch from an API
  
  // Current month's astrological events (simplified example for demo)
  const currentMonth = date.getMonth();
  const currentYear = date.getFullYear();
  
  const astroEvents: AstrologicalEvent[] = [
    { 
      date: new Date(currentYear, currentMonth, 8), 
      event: 'Venus entra en Libra', 
      icon: '♀️',
      description: 'Favorece las relaciones armoniosas, la estética y el equilibrio en tu vida.',
      type: 'planetary'
    },
    { 
      date: new Date(currentYear, currentMonth, 14), 
      event: 'Mercurio Retrógrado termina', 
      icon: '☿️',
      description: 'Fin de los retrasos en comunicación y tecnología. Buen momento para avanzar en proyectos.',
      type: 'retrograde'
    },
    { 
      date: new Date(currentYear, currentMonth, 22), 
      event: 'Sol entra en Escorpio', 
      icon: '☉',
      description: 'Época para profundizar en tus emociones, buscar transformación y regeneración.',
      type: 'zodiac'
    },
    { 
      date: new Date(currentYear, currentMonth, 10), 
      event: 'Marte en cuadratura con Saturno', 
      icon: '♂️',
      description: 'Día de posible frustración y obstáculos. Practica la paciencia y la perseverancia.',
      type: 'planetary'
    },
    { 
      date: new Date(currentYear, currentMonth, 17), 
      event: 'Luna en conjunción con Júpiter', 
      icon: '♃',
      description: 'Excelente día para la expansión emocional y la abundancia. Aprovecha las oportunidades.',
      type: 'planetary'
    },
  ];

  return astroEvents.filter(event => isSameDay(event.date, date));
};

// Get daily astrology recommendation
export const getDailyMessage = (date: Date): string => {
  // In a real app, this would be calculated based on many factors or fetched from an API
  const messages = [
    "Buen día para la meditación y conectar con tu intuición.",
    "Favorable para iniciar nuevos proyectos y relaciones.",
    "Momento ideal para la introspección y el crecimiento personal.",
    "Excelente energía para actividades creativas y artísticas.",
    "Día para resolver conflictos y buscar armonía en tus relaciones.",
    "Propicio para tomar decisiones importantes sobre tu futuro.",
    "Día de descanso y recarga de energías.",
  ];
  
  // Use the day of the month as a seed for selecting a message
  const messageIndex = date.getDate() % messages.length;
  return messages[messageIndex];
};

// Get complete daily astrology data for a specific date
export const getDailyAstrologyData = (date: Date): DailyAstrologyData => {
  return {
    date,
    lunarPhase: getLunarPhaseForDate(date),
    astroEvents: getAstroEventsForDate(date),
    dailyMessage: getDailyMessage(date)
  };
};

// Get the current celestial position (simplified for demo purposes)
export const getCurrentCelestialPositions = (): {planet: string, position: string, icon: string}[] => {
  return [
    { planet: 'Sol', position: 'Libra 28°', icon: '☉' },
    { planet: 'Luna', position: 'Piscis 14°', icon: '☾' },
    { planet: 'Mercurio', position: 'Escorpio 3°', icon: '☿️' },
    { planet: 'Venus', position: 'Libra 12°', icon: '♀️' },
    { planet: 'Marte', position: 'Capricornio 19°', icon: '♂️' },
    { planet: 'Júpiter', position: 'Tauro 15° R', icon: '♃' },
    { planet: 'Saturno', position: 'Piscis 2°', icon: '♄' },
  ];
};
