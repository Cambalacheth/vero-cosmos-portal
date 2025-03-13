
import { NatalChartData } from '@/lib/natal-chart';

export const generateAIResponse = (message: string, chart: NatalChartData, analysis: any): string => {
  const lowerMessage = message.toLowerCase();
  
  // Detect what the question is about and provide a relevant response
  if (lowerMessage.includes('casa 2') || lowerMessage.includes('dinero') || lowerMessage.includes('finanzas')) {
    return `Según tu carta natal, tu Casa 2 en ${chart.houses[1].sign} indica que ${analysis.house2Analysis}`;
  } else if (lowerMessage.includes('casa 10') || lowerMessage.includes('carrera') || lowerMessage.includes('profesión')) {
    return `Tu Casa 10 en ${chart.houses[9].sign} sugiere que ${analysis.house10Analysis}`;
  } else if (lowerMessage.includes('júpiter') || lowerMessage.includes('jupiter') || lowerMessage.includes('expansión')) {
    return `Júpiter en tu carta se encuentra en ${chart.jupiter.sign} en la casa ${chart.jupiter.house}. Esto indica que ${analysis.jupiterSaturnAnalysis.split('.')[0]}.`;
  } else if (lowerMessage.includes('saturno') || lowerMessage.includes('disciplina') || lowerMessage.includes('limitaciones')) {
    return `Saturno en tu carta se encuentra en ${chart.saturn.sign} en la casa ${chart.saturn.house}. ${analysis.jupiterSaturnAnalysis.split('.')[1] || 'Esto sugiere áreas donde necesitas desarrollar disciplina financiera.'}`;
  } else if (lowerMessage.includes('inversiones') || lowerMessage.includes('casa 8')) {
    return `Tu Casa 8 en ${chart.houses[7].sign} indica que ${analysis.houses8And11Analysis.split('.')[0]}.`;
  } else if (lowerMessage.includes('redes') || lowerMessage.includes('amigos') || lowerMessage.includes('casa 11')) {
    return `Tu Casa 11 en ${chart.houses[10].sign} sugiere que ${analysis.houses8And11Analysis.split('.')[1] || 'las redes y conexiones sociales pueden ser importantes para tu riqueza.'}`;
  } else if (lowerMessage.includes('fecha') || lowerMessage.includes('cuando') || lowerMessage.includes('momento')) {
    // Return information about upcoming dates from the financial calendar
    const nextDate = analysis.financialCalendar[0];
    return `Según tu calendario astrológico financiero, el próximo evento importante es el ${nextDate.date}: un ${nextDate.transitType} que sugiere: ${nextDate.recommendation}`;
  } else if (lowerMessage.includes('acción') || lowerMessage.includes('hacer') || lowerMessage.includes('pasos')) {
    // Return a suggestion from the action plan
    const randomAction = analysis.actionPlan[Math.floor(Math.random() * analysis.actionPlan.length)];
    return `Te recomendaría esta acción de tu plan personalizado: ${randomAction.title} - ${randomAction.description}`;
  } else if (lowerMessage.includes('consejo') || lowerMessage.includes('recomendación') || lowerMessage.includes('qué debo hacer')) {
    // Return a random action from the action plan
    const randomAction = analysis.actionPlan[Math.floor(Math.random() * analysis.actionPlan.length)];
    return `Te recomendaría: ${randomAction.title} - ${randomAction.description}`;
  } else {
    return 'Basándome en tu carta natal, puedo ver que tienes potencial para la prosperidad financiera. ¿Te gustaría saber más sobre algún aspecto específico como tu Casa 2 (dinero), Casa 10 (carrera), o la influencia de Júpiter y Saturno en tus finanzas?';
  }
};
