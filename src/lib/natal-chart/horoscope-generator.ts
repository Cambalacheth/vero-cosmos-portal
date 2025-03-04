
import { NatalChartData } from './types';

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
