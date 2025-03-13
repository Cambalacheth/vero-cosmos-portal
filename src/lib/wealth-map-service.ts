
import { NatalChartData } from "./natal-chart";
import { format, addDays } from "date-fns";
import { es } from "date-fns/locale";

// Basic analysis for free users
export const getWealthMapBasicAnalysis = (natalChart: NatalChartData) => {
  // Extract sun sign and house 2 sign for basic analysis
  const sunSign = natalChart.sun.sign;
  const house2Sign = findHouseSign(natalChart, 2);

  // Basic analysis based on House 2 sign
  let house2Analysis = getHouse2Analysis(house2Sign);
  
  // Basic monthly tip based on sun sign
  let monthlyTip = getMonthlyTipBySunSign(sunSign);
  
  return {
    house2Analysis,
    monthlyTip
  };
};

// Full analysis for premium users
export const getWealthMapFullAnalysis = (natalChart: NatalChartData) => {
  // Extract required data from natal chart
  const sunSign = natalChart.sun.sign;
  const moonSign = natalChart.moon.sign;
  const ascSign = natalChart.ascendant.sign;
  const house2Sign = findHouseSign(natalChart, 2);
  const house8Sign = findHouseSign(natalChart, 8);
  const house10Sign = findHouseSign(natalChart, 10);
  const house11Sign = findHouseSign(natalChart, 11);
  const jupiterSign = natalChart.jupiter.sign;
  const jupiterHouse = natalChart.jupiter.house;
  const saturnSign = natalChart.saturn.sign;
  const saturnHouse = natalChart.saturn.house;
  
  // Generate full analyses
  const house2Analysis = getHouse2Analysis(house2Sign);
  const house10Analysis = getHouse10Analysis(house10Sign, sunSign);
  const jupiterSaturnAnalysis = getJupiterSaturnAnalysis(jupiterSign, jupiterHouse, saturnSign, saturnHouse);
  const houses8And11Analysis = getHouses8And11Analysis(house8Sign, house11Sign);
  
  // Generate summary
  const summary = `Con tu Sol en ${sunSign}, Ascendente en ${ascSign} y Luna en ${moonSign}, 
    tus fortalezas financieras incluyen ${getFinancialStrengthsBySunSign(sunSign)}. 
    Tu Casa 2 en ${house2Sign} indica tu relación con el dinero, 
    mientras que Jupiter en ${jupiterSign} revela tus oportunidades de expansión financiera.`;
  
  // Generate income strategies
  const incomeStrategies = generateIncomeStrategies(natalChart);
  
  // Generate career recommendations
  const careerRecommendations = generateCareerRecommendations(natalChart);
  
  // Generate tips for attracting opportunities
  const opportunityAttractionTips = generateOpportunityAttractionTips(natalChart);
  
  // Generate financial calendar for next 3 months
  const financialCalendar = generateFinancialCalendar(natalChart);
  
  // Generate personalized action plan
  const actionPlan = generateActionPlan(natalChart);
  
  // Sample questions for the AI chat
  const sampleQuestions = [
    "¿Cómo puedo aprovechar mejor la energía de mi Casa 2?",
    "¿Qué profesiones son compatibles con mi carta natal?",
    "¿Cuándo es el mejor momento para iniciar un nuevo proyecto financiero?",
    "¿Cómo puedo mejorar mi disciplina financiera con Saturno en mi carta?",
    "¿Qué inversiones serían más compatibles con mi carta natal?"
  ];
  
  // Collect everything into full analysis
  return {
    summary,
    house2Analysis,
    house10Analysis,
    jupiterSaturnAnalysis,
    houses8And11Analysis,
    incomeStrategies,
    careerRecommendations,
    opportunityAttractionTips,
    financialCalendar,
    actionPlan,
    sampleQuestions,
    monthlyTip: getMonthlyTipBySunSign(sunSign)
  };
};

// Helper function to find which sign is in a specific house
const findHouseSign = (natalChart: NatalChartData, houseNumber: number): string => {
  const house = natalChart.houses.find(h => h.house === houseNumber);
  return house ? house.sign : "Aries"; // Default to Aries if not found
};

// Analysis generators for different chart aspects
const getHouse2Analysis = (house2Sign: string): string => {
  const analyses: { [key: string]: string } = {
    "Aries": "Tienes una actitud emprendedora hacia el dinero. Prefieres tomar la iniciativa en tus finanzas y puedes ser impulsivo con tus gastos. Tu fortaleza está en tu capacidad para generar ingresos de forma independiente y comenzar nuevos proyectos financieros.",
    "Tauro": "Tienes una relación estable y segura con el dinero. Valoras la seguridad financiera y tiendes a acumular recursos. Eres hábil para identificar inversiones de valor a largo plazo y disfrutas los placeres materiales que el dinero puede proporcionar.",
    "Géminis": "Tienes una relación versátil con el dinero. Puedes tener múltiples fuentes de ingresos simultáneamente y te adaptas rápidamente a nuevas oportunidades financieras. Tu mente curiosa te ayuda a aprender constantemente sobre finanzas y mercados.",
    "Cáncer": "Tu relación con el dinero está vinculada a tu seguridad emocional. Tiendes a ahorrar para protegerte y a tu familia. Tienes un instinto natural para los negocios relacionados con el hogar, la nutrición o el cuidado de otros.",
    "Leo": "Tienes una relación generosa con el dinero. Disfrutas ganándolo tanto como gastándolo en lujos y experiencias que reflejen tu estatus. Tu creatividad y carisma pueden abrirte puertas a oportunidades financieras únicas.",
    "Virgo": "Tu aproximación al dinero es metódica y analítica. Eres excelente administrando recursos, creando presupuestos y encontrando formas de optimizar tus finanzas. Tu atención al detalle te hace valioso en roles financieros y administrativos.",
    "Libra": "Buscas equilibrio en tus finanzas. Tienes talento para las negociaciones y asociaciones comerciales. Te atraen los entornos estéticamente agradables y puedes tener éxito en campos artísticos o relacionados con la belleza y el diseño.",
    "Escorpio": "Tienes una intensa relación con el dinero y los recursos compartidos. Puedes tener talento para las inversiones, seguros o gestión de recursos ajenos. Tu intuición financiera es profunda y puedes transformar situaciones financieras difíciles.",
    "Sagitario": "Tu visión expansiva te ayuda a encontrar oportunidades financieras en lugares inesperados. Te beneficias de conexiones internacionales y educación continua. Tu optimismo atrae abundancia, aunque debes cuidar la tendencia al gasto excesivo.",
    "Capricornio": "Tienes una relación disciplinada y responsable con el dinero. Valoras la seguridad a largo plazo y trabajas metódicamente hacia tus metas financieras. Tu paciencia y determinación te permiten construir riqueza sólida con el tiempo.",
    "Acuario": "Tu aproximación al dinero es innovadora y poco convencional. Puedes beneficiarte de tecnologías emergentes, causas humanitarias o conceptos avant-garde. Tu visión progresista te permite ver oportunidades que otros pasan por alto.",
    "Piscis": "Tu relación con el dinero fluye como las mareas – a veces abundante, a veces escasa. Tienes intuición para las inversiones y puedes beneficiarte de campos creativos, espirituales o de ayuda a otros. Debes establecer límites claros en tus finanzas."
  };
  
  return analyses[house2Sign] || "Tu relación con el dinero es única y está influenciada por múltiples factores en tu carta natal.";
};

const getHouse10Analysis = (house10Sign: string, sunSign: string): string => {
  const analyses: { [key: string]: string } = {
    "Aries": "Tu carrera ideal requiere liderazgo, iniciativa y la capacidad de abrir nuevos caminos. Profesiones que involucren emprendimiento, deportes, ventas competitivas o roles pioneros se alinean con tu energía.",
    "Tauro": "Tu camino profesional se beneficia de la constancia y el enfoque práctico. Destacas en finanzas, banca, agricultura, arte, diseño, o cualquier campo que construya valor tangible con el tiempo.",
    "Géminis": "Tu carrera ideal involucra comunicación, versatilidad y aprendizaje continuo. Periodismo, enseñanza, comercio, tecnología o cualquier rol que requiera adaptabilidad mental se alinea con tus talentos.",
    "Cáncer": "Tu éxito profesional está vinculado a nutrición, cuidado y protección. Hostelería, bienes raíces, terapia, educación infantil o negocios familiares son áreas donde puedes prosperar.",
    "Leo": "Tu carrera ideal te coloca en el centro de atención. Artes escénicas, entretenimiento, liderazgo, educación o cualquier campo donde puedas brillar con tu creatividad y carisma son ideales para ti.",
    "Virgo": "Tu camino profesional se beneficia de tu precisión y capacidad analítica. Salud, análisis de datos, edición, contabilidad o campos que requieran meticulosidad y mejora continua se alinean con tus habilidades.",
    "Libra": "Tu carrera ideal involucra diplomacia, estética y colaboración. Derecho, mediación, diseño, relaciones públicas o cualquier rol que requiera crear armonía y belleza se alinea con tus talentos.",
    "Escorpio": "Tu éxito profesional viene de tu intensidad y capacidad transformadora. Investigación, psicología, finanzas, cirugía o campos que trabajen con recursos compartidos son áreas donde puedes destacar.",
    "Sagitario": "Tu carrera ideal expande horizontes y transmite conocimiento. Educación superior, viajes, publicaciones, derecho internacional o roles que promuevan crecimiento y exploración se alinean con tu espíritu.",
    "Capricornio": "Tu camino profesional se beneficia de tu ambición y disciplina. Administración, política, arquitectura, ingeniería o campos donde puedas construir estructuras duraderas son ideales para ti.",
    "Acuario": "Tu éxito profesional viene de tu visión innovadora y enfoque humanitario. Tecnología, ciencias, causas sociales, redes o campos que creen cambios progresistas se alinean con tus ideales.",
    "Piscis": "Tu carrera ideal conecta con la compasión y la imaginación. Artes, música, cine, psicología, espiritualidad o roles que ayuden a otros a sanar y soñar son áreas donde puedes encontrar propósito."
  };
  
  // Combine with sun sign influence
  return analyses[house10Sign] || `Tu Casa 10 indica tu potencial de éxito profesional y reputación pública.` + 
    ` Con tu Sol en ${sunSign}, brillas especialmente cuando puedes expresar tus cualidades solares en tu carrera.`;
};

const getJupiterSaturnAnalysis = (jupiterSign: string, jupiterHouse: number, saturnSign: string, saturnHouse: number): string => {
  // Jupiter analysis
  let jupiterAnalysis = `Júpiter en ${jupiterSign} en tu Casa ${jupiterHouse} representa tu zona de expansión financiera y abundancia. ` +
    `Esta posición favorece el crecimiento a través de ${getJupiterAreaBySign(jupiterSign)} y actividades relacionadas con tu Casa ${jupiterHouse}.`;
  
  // Saturn analysis
  let saturnAnalysis = ` Saturno en ${saturnSign} en tu Casa ${saturnHouse} indica dónde necesitas estructura y disciplina financiera. ` +
    `Esta posición requiere madurez en asuntos de ${getSaturnAreaBySign(saturnSign)} y responsabilidad en los temas de tu Casa ${saturnHouse}.`;
  
  return jupiterAnalysis + saturnAnalysis;
};

const getHouses8And11Analysis = (house8Sign: string, house11Sign: string): string => {
  // House 8 analysis (shared resources, investments)
  let house8Analysis = `Tu Casa 8 en ${house8Sign} revela tu relación con los recursos compartidos, inversiones y finanzas transformadoras. ` +
    `Esta posición sugiere que ${getHouse8BySign(house8Sign)}.`;
  
  // House 11 analysis (networks, group resources)
  let house11Analysis = ` Tu Casa 11 en ${house11Sign} indica cómo tus redes y conexiones influyen en tu prosperidad. ` +
    `Esta posición sugiere que ${getHouse11BySign(house11Sign)}.`;
  
  return house8Analysis + house11Analysis;
};

// Helper functions for Jupiter and Saturn areas by sign
const getJupiterAreaBySign = (sign: string): string => {
  const areas: { [key: string]: string } = {
    "Aries": "la iniciativa y nuevos comienzos",
    "Tauro": "inversiones seguras y activos tangibles",
    "Géminis": "comunicación y diversificación",
    "Cáncer": "bienes raíces y negocios familiares",
    "Leo": "inversiones creativas y especulativas",
    "Virgo": "mejoras en eficiencia y servicios",
    "Libra": "asociaciones y colaboraciones",
    "Escorpio": "transformación y recursos compartidos",
    "Sagitario": "educación, viajes e inversiones internacionales",
    "Capricornio": "negocios establecidos y planificación a largo plazo",
    "Acuario": "tecnología e innovación",
    "Piscis": "creatividad e iniciativas compasivas"
  };
  return areas[sign] || "áreas que resuenan con tu intuición";
};

const getSaturnAreaBySign = (sign: string): string => {
  const areas: { [key: string]: string } = {
    "Aries": "moderación de impulsos financieros",
    "Tauro": "evitar la rigidez en hábitos financieros",
    "Géminis": "estructurar la comunicación financiera",
    "Cáncer": "establecer límites emocionales en finanzas",
    "Leo": "controlar gastos ostentosos",
    "Virgo": "evitar la excesiva crítica financiera",
    "Libra": "tomar decisiones financieras independientes",
    "Escorpio": "gestionar sabiamente recursos compartidos",
    "Sagitario": "limitar riesgos financieros excesivos",
    "Capricornio": "balancear trabajo y recompensa",
    "Acuario": "dar estructura a ideas financieras innovadoras",
    "Piscis": "establecer límites claros en finanzas"
  };
  return areas[sign] || "áreas que requieren estructura y disciplina";
};

// Helper functions for Houses 8 and 11 by sign
const getHouse8BySign = (sign: string): string => {
  const descriptions: { [key: string]: string } = {
    "Aries": "puedes beneficiarte de inversiones pioneras y capital de riesgo",
    "Tauro": "las inversiones estables y a largo plazo favorecen tu crecimiento patrimonial",
    "Géminis": "diversificar tus inversiones y aprender constantemente sobre finanzas es clave",
    "Cáncer": "los negocios familiares y bienes raíces son fuentes favorables de inversión",
    "Leo": "las inversiones creativas y especulativas pueden traerte ganancias significativas",
    "Virgo": "el análisis detallado y la gestión meticulosa de inversiones te beneficia",
    "Libra": "las asociaciones financieras y decisiones equilibradas favorecen tus inversiones",
    "Escorpio": "tienes intuición natural para inversiones transformadoras y regenerativas",
    "Sagitario": "las inversiones internacionales y educativas expanden tu riqueza",
    "Capricornio": "la planificación estructurada y conservadora beneficia tus inversiones",
    "Acuario": "las inversiones en tecnología e innovación pueden ser particularmente rentables",
    "Piscis": "tu intuición te guía hacia inversiones creativas y compasivas"
  };
  return descriptions[sign] || "tus inversiones se benefician de un enfoque intuitivo y estratégico";
};

const getHouse11BySign = (sign: string): string => {
  const descriptions: { [key: string]: string } = {
    "Aries": "tus conexiones con líderes y pioneros impulsan tu prosperidad",
    "Tauro": "redes estables y confiables te proporcionan recursos valiosos",
    "Géminis": "tu red diversa de contactos te abre múltiples oportunidades",
    "Cáncer": "grupos con valores familiares compartidos apoyan tu crecimiento",
    "Leo": "comunidades creativas y organizaciones prominentes favorecen tu éxito",
    "Virgo": "asociaciones profesionales y grupos de servicio amplían tus recursos",
    "Libra": "las colaboraciones artísticas y diplomáticas enriquecen tu red",
    "Escorpio": "conexiones profundas y transformadoras potencian tu abundancia",
    "Sagitario": "redes internacionales y educativas expanden tus horizontes",
    "Capricornio": "organizaciones establecidas y estructuradas aumentan tu influencia",
    "Acuario": "comunidades innovadoras y humanitarias impulsan tu visión",
    "Piscis": "redes creativas y espirituales inspiran tu prosperidad"
  };
  return descriptions[sign] || "tus conexiones sociales diversas te abren importantes oportunidades";
};

// Monthly tips by sun sign
const getMonthlyTipBySunSign = (sunSign: string): string => {
  const tips: { [key: string]: string } = {
    "Aries": "Este mes, enfócate en establecer metas financieras claras. Tu energía pionera está en su punto máximo, ideal para iniciar nuevos proyectos que generen ingresos. Evita las decisiones impulsivas con grandes sumas de dinero.",
    "Tauro": "Es un buen momento para revisar tus inversiones a largo plazo. Considera diversificar en activos tangibles que aprecien con el tiempo. Tu paciencia será recompensada si resistes la tentación de gastos innecesarios.",
    "Géminis": "Aprovecha tu versatilidad este mes para explorar fuentes de ingreso adicionales. Es un excelente momento para educarte en nuevas habilidades financieras. Mantén un registro detallado de tus gastos para evitar sorpresas.",
    "Cáncer": "Enfócate en la seguridad financiera de tu hogar este mes. Considera establecer o reforzar tu fondo de emergencia. Las inversiones relacionadas con bienes raíces o negocios familiares son favorables ahora.",
    "Leo": "Tu creatividad está en auge – considera cómo monetizarla. Es un buen momento para inversiones que reflejen tus valores personales. Sé consciente de gastos relacionados con entretenimiento y lujos.",
    "Virgo": "Este mes favorece la organización y optimización de tus finanzas. Revisa suscripciones y gastos recurrentes para identificar ahorros. Tu capacidad analítica te ayudará a encontrar oportunidades que otros pasan por alto.",
    "Libra": "Las asociaciones financieras están favorecidas este mes. Considera colaboraciones que balanceen tus habilidades con las de otros. Es buen momento para negociar términos favorables en contratos y acuerdos.",
    "Escorpio": "Enfócate en eliminar deudas y consolidar recursos. Tu intuición financiera está especialmente aguda, úsala para identificar inversiones con potencial transformador. Mantén la confidencialidad en asuntos financieros.",
    "Sagitario": "Expande tus horizontes financieros este mes. Educación en finanzas, inversiones internacionales o negocios con alcance global son favorables. Mantén el optimismo pero establece límites claros en tus gastos.",
    "Capricornio": "La disciplina financiera rinde frutos este mes. Es buen momento para planificación a largo plazo y establecimiento de metas ambiciosas pero realistas. Considera inversiones conservadoras con crecimiento estable.",
    "Acuario": "Innovación financiera es tu clave este mes. Explora tecnologías emergentes o métodos no convencionales de inversión. Tu visión única puede identificar tendencias futuras con potencial de crecimiento.",
    "Piscis": "Confía en tu intuición financiera este mes. Conecta tus decisiones monetarias con tus valores más profundos. Establece límites claros en préstamos o ayuda financiera a otros para proteger tus propios recursos."
  };
  return tips[sunSign] || "Este mes, alinea tus decisiones financieras con tus valores personales más profundos para manifestar mayor abundancia.";
};

// Financial strengths by sun sign
const getFinancialStrengthsBySunSign = (sunSign: string): string => {
  const strengths: { [key: string]: string } = {
    "Aries": "iniciativa y capacidad para crear nuevas oportunidades financieras",
    "Tauro": "paciencia y habilidad para construir seguridad financiera a largo plazo",
    "Géminis": "adaptabilidad y capacidad para diversificar fuentes de ingreso",
    "Cáncer": "intuición financiera y habilidad para proteger y nutrir tus recursos",
    "Leo": "generosidad estratégica y capacidad para atraer abundancia",
    "Virgo": "análisis detallado y mejora continua de tus finanzas",
    "Libra": "diplomacia en negociaciones y establecimiento de asociaciones rentables",
    "Escorpio": "intuición para inversiones y manejo estratégico de recursos compartidos",
    "Sagitario": "visión expansiva y capacidad para identificar oportunidades de crecimiento",
    "Capricornio": "disciplina y enfoque para alcanzar metas financieras a largo plazo",
    "Acuario": "pensamiento innovador y habilidad para anticipar tendencias futuras",
    "Piscis": "intuición creativa y capacidad para manifestar abundancia desde lo intangible"
  };
  return strengths[sunSign] || "tu capacidad única para manifestar abundancia en formas que resuenan con tu esencia";
};

// Generate income strategies based on natal chart
const generateIncomeStrategies = (chart: NatalChartData): string[] => {
  // Base strategies on main planetary positions
  const sunStrategies = getSunIncomeStrategies(chart.sun.sign);
  const moonStrategies = getMoonIncomeStrategies(chart.moon.sign);
  const mercuryStrategies = getMercuryIncomeStrategies(chart.mercury.sign);
  const venusStrategies = getVenusIncomeStrategies(chart.venus.sign);
  
  // Combine strategies (3-5 in total)
  const allStrategies = [...sunStrategies, ...moonStrategies, ...mercuryStrategies, ...venusStrategies];
  
  // Shuffle and select 4 unique strategies
  return shuffleArray(allStrategies).slice(0, 4);
};

// Helper functions for income strategies by planet sign
const getSunIncomeStrategies = (sign: string): string[] => {
  // Just a few examples per sign
  const strategies: { [key: string]: string[] } = {
    "Aries": ["Desarrolla un negocio propio donde puedas liderar e innovar", "Explora roles de ventas competitivas con comisiones"],
    "Tauro": ["Invierte en bienes raíces para ingreso pasivo a largo plazo", "Considera negocios relacionados con productos de calidad o artesanía"],
    "Géminis": ["Desarrolla múltiples fuentes de ingreso simultáneas", "Explora trabajos freelance que aprovechen tus habilidades comunicativas"],
    "Cáncer": ["Considera negocios basados en el hogar o relacionados con necesidades familiares", "Explora el sector inmobiliario o alojamiento"],
    "Leo": ["Monetiza tus talentos creativos y artísticos", "Busca roles donde tu carisma natural pueda destacar"],
    "Virgo": ["Ofrece servicios especializados que requieran precisión y análisis", "Considera roles de consultoría donde puedas mejorar la eficiencia de otros"],
    "Libra": ["Desarrolla asociaciones comerciales estratégicas", "Explora campos relacionados con la belleza, el arte o la diplomacia"],
    "Escorpio": ["Considera inversiones estratégicas en mercados financieros", "Explora roles que involucren investigación profunda o transformación"],
    "Sagitario": ["Busca oportunidades con alcance internacional", "Considera roles educativos o de publicación"],
    "Capricornio": ["Desarrolla un plan de carrera estructurado con metas claras", "Invierte en tu educación para roles de alto nivel"],
    "Acuario": ["Explora tecnologías emergentes o nichos innovadores", "Considera roles que involucren redes y comunidades"],
    "Piscis": ["Monetiza tus talentos artísticos o intuitivos", "Considera roles relacionados con la sanación o ayuda a otros"]
  };
  return strategies[sign] || ["Desarrolla una estrategia de ingresos que te permita expresar tus talentos naturales"];
};

const getMoonIncomeStrategies = (sign: string): string[] => {
  // Simplified for brevity
  const strategies: { [key: string]: string[] } = {
    "Aries": ["Busca roles donde puedas iniciar proyectos con entusiasmo", "Considera trabajos que ofrezcan variedad y desafíos constantes"],
    "Tauro": ["Desarrolla fuentes de ingreso estables y predecibles", "Considera roles relacionados con finanzas o recursos materiales"],
    "Géminis": ["Aprovecha tu adaptabilidad emocional en entornos cambiantes", "Explora roles que combinen comunicación y servicio al cliente"],
    "Cáncer": ["Desarrolla negocios que satisfagan necesidades emocionales o de cuidado", "Considera roles relacionados con nutrición o bienestar"],
    "Leo": ["Busca reconocimiento por tu trabajo creativo o de liderazgo", "Considera roles donde puedas inspirar a otros"],
    "Virgo": ["Ofrece servicios que requieran atención al detalle", "Desarrolla sistemas para mejorar la eficiencia de otros"],
    "Libra": ["Crea un entorno de trabajo armonioso y estéticamente agradable", "Explora mediación o resolución de conflictos"],
    "Escorpio": ["Aprovecha tu intuición emocional para transformaciones profundas", "Considera roles relacionados con recursos compartidos o crisis"],
    "Sagitario": ["Busca trabajo que te permita explorar y expandir horizontes", "Considera roles inspiradores o motivacionales"],
    "Capricornio": ["Desarrolla disciplina emocional en tus finanzas", "Busca roles donde tu responsabilidad sea valorada"],
    "Acuario": ["Innova en comunidades o grupos", "Considera roles relacionados con causas humanitarias"],
    "Piscis": ["Monetiza tus habilidades intuitivas o compasivas", "Considera roles artísticos o de sanación"]
  };
  return strategies[sign] || ["Desarrolla una estrategia de ingresos que honre tus necesidades emocionales"];
};

const getMercuryIncomeStrategies = (sign: string): string[] => {
  // Simplified for brevity
  const strategies: { [key: string]: string[] } = {
    "Aries": ["Comunica ideas con energía y entusiasmo", "Desarrolla contenido que inspire acción rápida"],
    "Tauro": ["Comunica valor y calidad en tus ofertas", "Desarrolla contenido práctico y confiable"],
    "Géminis": ["Aprovecha tu versatilidad comunicativa", "Explora roles que requieran adaptabilidad mental"],
    "Cáncer": ["Comunica con empatía y cuidado", "Desarrolla contenido que nutra y apoye a otros"],
    "Leo": ["Comunica con creatividad y entusiasmo", "Desarrolla presentaciones o discursos inspiradores"],
    "Virgo": ["Ofrece análisis detallado y soluciones prácticas", "Desarrolla sistemas de organización para otros"],
    "Libra": ["Comunica con diplomacia y equilibrio", "Facilita diálogos constructivos entre partes"],
    "Escorpio": ["Investiga y comunica verdades profundas", "Desarrolla contenido transformador"],
    "Sagitario": ["Expande horizontes a través de la comunicación", "Enseña o publica sobre temas que te apasionan"],
    "Capricornio": ["Comunica con autoridad y estructura", "Desarrolla sistemas de comunicación eficientes"],
    "Acuario": ["Comunica ideas innovadoras y visionarias", "Desarrolla redes y comunidades de pensamiento"],
    "Piscis": ["Comunica con imaginación y compasión", "Desarrolla narrativas que inspiren y eleven"]
  };
  return strategies[sign] || ["Aprovecha tu estilo único de comunicación para crear valor para otros"];
};

const getVenusIncomeStrategies = (sign: string): string[] => {
  // Simplified for brevity
  const strategies: { [key: string]: string[] } = {
    "Aries": ["Crea experiencias emocionantes para clientes", "Introduce novedades en tus ofertas regularmente"],
    "Tauro": ["Crea experiencias sensoriales de calidad", "Invierte en belleza y comodidad en tu entorno laboral"],
    "Géminis": ["Crea conexiones sociales diversas", "Comunica los beneficios de tus servicios claramente"],
    "Cáncer": ["Crea experiencias que generen seguridad emocional", "Ofrece servicios que cuiden y protejan a otros"],
    "Leo": ["Crea experiencias memorables y dramáticas", "Añade un toque de lujo a tus ofertas"],
    "Virgo": ["Mejora constantemente la calidad de tus servicios", "Ofrece soluciones prácticas con un toque especial"],
    "Libra": ["Crea belleza y armonía en todo lo que ofreces", "Desarrolla asociaciones equilibradas y mutuamente beneficiosas"],
    "Escorpio": ["Crea experiencias intensas y transformadoras", "Ofrece valor profundo en tus servicios"],
    "Sagitario": ["Crea experiencias que expandan horizontes", "Incorpora elementos internacionales o educativos en tus servicios"],
    "Capricornio": ["Ofrece calidad duradera y atemporal", "Construye una reputación sólida en tu campo"],
    "Acuario": ["Innova en relaciones y conexiones", "Ofrece servicios únicos y vanguardistas"],
    "Piscis": ["Crea experiencias mágicas y trascendentes", "Incorpora arte y belleza en todo lo que ofreces"]
  };
  return strategies[sign] || ["Aprovecha tu sentido innato de lo que otros valoran para crear ofertas atractivas"];
};

// Generate career recommendations based on natal chart
const generateCareerRecommendations = (chart: NatalChartData): string[] => {
  // Base career recommendations on House 10 and key planets
  const house10Sign = findHouseSign(chart, 10);
  const sunSign = chart.sun.sign;
  const marsSign = chart.mars.sign;
  
  // Get recommendations
  const house10Careers = getHouse10Careers(house10Sign);
  const sunCareers = getSunCareers(sunSign);
  const marsCareers = getMarsCareers(marsSign);
  
  // Combine and select unique recommendations
  const allCareers = [...house10Careers, ...sunCareers, ...marsCareers];
  
  // Return 4 unique careers
  return shuffleArray(allCareers).slice(0, 4);
};

// Helper functions for career recommendations
const getHouse10Careers = (sign: string): string[] => {
  const careers: { [key: string]: string[] } = {
    "Aries": ["Emprendimiento", "Deportes o entrenamiento físico", "Ventas competitivas", "Liderazgo en startups"],
    "Tauro": ["Finanzas y banca", "Agricultura o alimentación sostenible", "Artes aplicadas", "Gestión de recursos"],
    "Géminis": ["Comunicaciones", "Educación", "Ventas", "Tecnología de la información"],
    "Cáncer": ["Hostelería", "Bienes raíces", "Nutrición", "Cuidado infantil o familiar"],
    "Leo": ["Artes escénicas", "Educación", "Gestión de marca", "Relaciones públicas"],
    "Virgo": ["Salud y bienestar", "Análisis de datos", "Consultoría de mejoras", "Edición o redacción técnica"],
    "Libra": ["Derecho", "Diseño", "Diplomacia", "Gestión de relaciones"],
    "Escorpio": ["Investigación", "Psicología", "Finanzas de inversión", "Gestión de crisis"],
    "Sagitario": ["Educación superior", "Publicaciones", "Derecho internacional", "Turismo"],
    "Capricornio": ["Administración ejecutiva", "Planificación financiera", "Arquitectura", "Roles gubernamentales"],
    "Acuario": ["Tecnología", "Ciencias", "Trabajo humanitario", "Innovación social"],
    "Piscis": ["Artes", "Psicología", "Cuidado de la salud", "Espiritualidad"]
  };
  return careers[sign] || ["Carrera alineada con tus valores", "Roles que utilicen tus talentos únicos"];
};

const getSunCareers = (sign: string): string[] => {
  // Similar structure to above, but focused on sun sign qualities
  const careers: { [key: string]: string[] } = {
    "Aries": ["Emprendimiento independiente", "Asesoría en liderazgo", "Desarrollo de productos innovadores"],
    "Tauro": ["Inversiones a largo plazo", "Artes culinarias", "Gestión de recursos naturales"],
    "Géminis": ["Periodismo", "Marketing digital", "Enseñanza de idiomas"],
    "Cáncer": ["Terapia familiar", "Desarrollo comunitario", "Industria alimentaria"],
    "Leo": ["Dirección creativa", "Desarrollo de talento", "Entretenimiento"],
    "Virgo": ["Análisis y mejora de sistemas", "Salud preventiva", "Gestión de calidad"],
    "Libra": ["Mediación", "Relaciones públicas", "Diseño de interiores"],
    "Escorpio": ["Investigación estratégica", "Transformación empresarial", "Psicología profunda"],
    "Sagitario": ["Publicaciones", "Desarrollo internacional", "Filosofía aplicada"],
    "Capricornio": ["Planificación estratégica", "Inversiones conservadoras", "Consultoría de negocios"],
    "Acuario": ["Innovación tecnológica", "Reformas sociales", "Desarrollo de comunidades"],
    "Piscis": ["Artes visuales", "Música", "Counseling espiritual"]
  };
  return careers[sign] || ["Roles que destaquen tu autenticidad", "Carreras alineadas con tu propósito vital"];
};

const getMarsCareers = (sign: string): string[] => {
  // Mars influences how we take action and assert ourselves
  const careers: { [key: string]: string[] } = {
    "Aries": ["Emprendimiento independiente", "Deportes competitivos", "Ventas agresivas"],
    "Tauro": ["Construcción", "Agricultura", "Seguridad financiera"],
    "Géminis": ["Debate", "Periodismo de investigación", "Ventas técnicas"],
    "Cáncer": ["Protección familiar o comunitaria", "Seguridad alimentaria", "Bienes raíces"],
    "Leo": ["Liderazgo creativo", "Desarrollo de talentos", "Coaching"],
    "Virgo": ["Optimización de procesos", "Análisis crítico", "Medicina preventiva"],
    "Libra": ["Negociación estratégica", "Defensa legal", "Relaciones internacionales"],
    "Escorpio": ["Investigación profunda", "Gestión de crisis", "Transformación corporativa"],
    "Sagitario": ["Aventura y exploración", "Expansión internacional", "Educación superior"],
    "Capricornio": ["Logro estructurado", "Escalada corporativa", "Administración disciplinada"],
    "Acuario": ["Activismo", "Innovación tecnológica", "Reforma social"],
    "Piscis": ["Acción inspirada", "Servicio compasivo", "Artes performativas"]
  };
  return careers[sign] || ["Roles que canalicen tu energía natural", "Carreras donde puedas liderar a tu manera"];
};

// Generate tips for attracting opportunities
const generateOpportunityAttractionTips = (chart: NatalChartData): string[] => {
  // Base tips on Venus, Jupiter and North Node
  const venusSign = chart.venus.sign;
  const jupiterSign = chart.jupiter.sign;
  const moonSign = chart.moon.sign;
  
  // Get tips
  const venusTips = getVenusAttractionTips(venusSign);
  const jupiterTips = getJupiterAttractionTips(jupiterSign);
  const moonTips = getMoonAttractionTips(moonSign);
  
  // Combine and select unique tips
  const allTips = [...venusTips, ...jupiterTips, ...moonTips];
  
  // Return 4 unique tips
  return shuffleArray(allTips).slice(0, 4);
};

// Helper functions for opportunity attraction tips
const getVenusAttractionTips = (sign: string): string[] => {
  const tips: { [key: string]: string[] } = {
    "Aries": ["Muestra entusiasmo y energía en tus propuestas", "Destaca tu capacidad para tomar iniciativa rápidamente"],
    "Tauro": ["Demuestra confiabilidad y consistencia", "Crea un entorno de trabajo estéticamente agradable"],
    "Géminis": ["Comunica claramente los beneficios de tus servicios", "Cultiva una red diversa de contactos profesionales"],
    "Cáncer": ["Crea conexiones emocionales genuinas con clientes/colegas", "Ofrece un entorno que genere sensación de seguridad"],
    "Leo": ["Presenta tus ofertas con creatividad y dramatismo", "Cultiva una presencia personal magnética y generosa"],
    "Virgo": ["Destaca la calidad y atención al detalle en tu trabajo", "Ofrece soluciones prácticas que mejoren la vida de otros"],
    "Libra": ["Cultiva asociaciones estratégicas equilibradas", "Crea belleza y armonía en tus ofertas"],
    "Escorpio": ["Ofrece valor transformador en tus servicios", "Cultiva lealtad profunda en tus relaciones profesionales"],
    "Sagitario": ["Amplía tus horizontes y conexiones internacionales", "Comparte conocimiento valioso generosamente"],
    "Capricornio": ["Proyecta profesionalismo y confiabilidad", "Construye una reputación sólida a largo plazo"],
    "Acuario": ["Destaca lo único e innovador de tus ofertas", "Conecta con comunidades que compartan tus valores"],
    "Piscis": ["Infunde tus servicios con belleza y compasión", "Cultiva tu intuición para identificar oportunidades invisibles"]
  };
  return tips[sign] || ["Cultiva relaciones de valor mutuo", "Ofrece siempre más valor del que recibes"];
};

const getJupiterAttractionTips = (sign: string): string[] => {
  const tips: { [key: string]: string[] } = {
    "Aries": ["Expande tu alcance con iniciativas audaces", "Lidera el camino en territorios inexplorados"],
    "Tauro": ["Cultiva una mentalidad de abundancia práctica", "Invierte en crecimiento sostenible a largo plazo"],
    "Géminis": ["Expande tu educación continuamente", "Comunica tus ideas en diversos formatos y plataformas"],
    "Cáncer": ["Nutre tu red de contactos como una familia extendida", "Expande tu seguridad emocional y financiera simultáneamente"],
    "Leo": ["Comparte tus talentos con generosidad", "Cultiva conexiones con personas influyentes y creativas"],
    "Virgo": ["Mejora continuamente tus habilidades y servicios", "Expande tu capacidad para ayudar y servir a otros"],
    "Libra": ["Cultiva asociaciones que expandan tu alcance", "Busca el equilibrio entre dar y recibir"],
    "Escorpio": ["Transforma limitaciones en oportunidades", "Invierte estratégicamente en recursos compartidos"],
    "Sagitario": ["Adopta una visión global en tus emprendimientos", "Busca oportunidades que expandan tus horizontes"],
    "Capricornio": ["Construye estructuras que permitan crecimiento sostenible", "Cultiva paciencia para logros significativos"],
    "Acuario": ["Conecta con redes y comunidades visionarias", "Adopta innovaciones que expandan tu alcance"],
    "Piscis": ["Confía en tu intuición para guiar tu expansión", "Cultiva compasión como vía hacia la abundancia"]
  };
  return tips[sign] || ["Mantén una mentalidad de abundancia", "Busca oportunidades de crecimiento continuo"];
};

const getMoonAttractionTips = (sign: string): string[] => {
  const tips: { [key: string]: string[] } = {
    "Aries": ["Cultiva confianza en tus instintos financieros", "Manifiesta tus deseos con intención clara"],
    "Tauro": ["Crea rituales de abundancia que nutran tu seguridad", "Visualiza crecimiento constante y estable"],
    "Géminis": ["Comunica tus necesidades con claridad", "Adapta tus estrategias según la retroalimentación emocional"],
    "Cáncer": ["Cuida tu bienestar como fundamento de tu prosperidad", "Crea un hogar que apoye tus metas financieras"],
    "Leo": ["Celebra cada logro con genuino aprecio", "Reconoce tu valor inherente más allá de tus logros"],
    "Virgo": ["Purifica tus emociones negativas sobre el dinero", "Establece sistemas que apoyen tu bienestar financiero"],
    "Libra": ["Cultiva relaciones que apoyen tu crecimiento", "Busca el equilibrio entre dar y recibir"],
    "Escorpio": ["Transforma patrones emocionales limitantes", "Profundiza en tu relación con la abundancia"],
    "Sagitario": ["Expande tus creencias sobre lo que mereces", "Mantén optimismo mientras tomas acciones concretas"],
    "Capricornio": ["Construye seguridad emocional junto con seguridad material", "Establece estructuras que apoyen tu bienestar"],
    "Acuario": ["Conecta con comunidades que compartan tus valores", "Innova en tu aproximación al bienestar integral"],
    "Piscis": ["Confía en tu intuición financiera", "Visualiza la abundancia fluyendo hacia ti naturalmente"]
  };
  return tips[sign] || ["Alinea tus finanzas con tus necesidades emocionales", "Cultiva autocompasión en tu viaje hacia la abundancia"];
};

// Generate financial calendar
const generateFinancialCalendar = (chart: NatalChartData): any[] => {
  // In a real implementation, this would calculate actual planetary transits
  // For now, we'll create a simplified version with made-up but plausible dates
  
  const calendar = [];
  const currentDate = new Date();
  
  // Generate 6 entries for the next 3 months
  for (let i = 0; i < 6; i++) {
    // Calculate a date between now and 3 months from now
    const futureDate = addDays(currentDate, 10 + (i * 15)); // Spread events roughly every 15 days
    
    // Format the date
    const formattedDate = format(futureDate, 'd MMMM yyyy', { locale: es });
    
    // Determine transit type based on index
    let transitType;
    let recommendation;
    
    if (i % 3 === 0) {
      // Jupiter transit (expansion)
      transitType = "Tránsito de Júpiter";
      recommendation = generateJupiterTransitRecommendation(chart);
    } else if (i % 3 === 1) {
      // Mercury retrograde or direct
      transitType = i < 3 ? "Mercurio Retrógrado" : "Mercurio Directo";
      recommendation = generateMercuryTransitRecommendation(chart, i < 3);
    } else {
      // Venus transit (values, relationships)
      transitType = "Tránsito de Venus";
      recommendation = generateVenusTransitRecommendation(chart);
    }
    
    calendar.push({
      date: formattedDate,
      transitType,
      recommendation
    });
  }
  
  return calendar;
};

// Helper functions for transit recommendations
const generateJupiterTransitRecommendation = (chart: NatalChartData): string => {
  const recommendations = [
    "Excelente momento para expandir tus inversiones. Considera nuevas oportunidades en áreas relacionadas con tu Casa 2.",
    "Período favorable para educación financiera o buscar mentores. Tu comprensión de oportunidades se expande significativamente.",
    "Momento ideal para lanzar un nuevo proyecto o negocio. La energía expansiva apoya nuevos comienzos financieros.",
    "Oportunidad para conexiones profesionales significativas. Networking activo puede abrir puertas importantes.",
    "Favorable para revisar tu filosofía financiera y alinearla con tu visión a largo plazo."
  ];
  
  return recommendations[Math.floor(Math.random() * recommendations.length)];
};

const generateMercuryTransitRecommendation = (chart: NatalChartData, isRetrograde: boolean): string => {
  if (isRetrograde) {
    const recommendations = [
      "Período para revisar contratos y acuerdos financieros. No firmes documentos importantes hasta después del retrógrado.",
      "Momento ideal para reevaluar presupuestos y planificación financiera. Corrige errores en registros o cuentas.",
      "Reconsideración de decisiones financieras recientes recomendada. Puede revelarse información anteriormente oculta.",
      "Favorable para reconectar con contactos profesionales del pasado que podrían ofrecer nuevas oportunidades.",
      "Tiempo de introspección sobre patrones de gasto. Identifica áreas de mejora en tu gestión financiera."
    ];
    return recommendations[Math.floor(Math.random() * recommendations.length)];
  } else {
    const recommendations = [
      "Comunicaciones financieras fluyen libremente. Excelente momento para negociaciones y acuerdos.",
      "Favorable para implementar nuevos sistemas de organización financiera o herramientas de gestión.",
      "Momento propicio para aprendizaje financiero y adquisición de nuevas habilidades monetarias.",
      "Claridad mental para tomar decisiones financieras. Considera opciones que has estado evaluando.",
      "Excelente período para networking profesional y conexiones que beneficien tu carrera."
    ];
    return recommendations[Math.floor(Math.random() * recommendations.length)];
  }
};

const generateVenusTransitRecommendation = (chart: NatalChartData): string => {
  const recommendations = [
    "Favorable para atraer recursos y oportunidades. Tu magnetismo personal está aumentado para manifestar abundancia.",
    "Excelente momento para mejorar la presentación de tus servicios o productos. La estética impacta positivamente tus ganancias.",
    "Período para cultivar relaciones profesionales armoniosas. Asociaciones beneficiosas pueden formarse ahora.",
    "Momento para evaluar qué realmente valoras en tu carrera y finanzas. Alinea tus acciones con tus valores.",
    "Propicio para inversiones en arte, belleza o experiencias que nutran tu bienestar mientras aprecian en valor."
  ];
  
  return recommendations[Math.floor(Math.random() * recommendations.length)];
};

// Generate action plan
const generateActionPlan = (chart: NatalChartData): any[] => {
  // In a real implementation, this would analyze the chart in depth
  // For now, we'll create a simplified version with actionable recommendations
  
  // Extract key positions for personalization
  const sunSign = chart.sun.sign;
  const house2Sign = findHouseSign(chart, 2);
  const jupiterSign = chart.jupiter.sign;
  const jupiterHouse = chart.jupiter.house;
  
  // Create action plan with 5 steps
  return [
    {
      title: "Clarifica tu Relación con el Dinero",
      description: `Dedica tiempo a reflexionar sobre tus creencias acerca del dinero. Con tu Casa 2 en ${house2Sign}, beneficiarte de ${getHouse2Action(house2Sign)}.`,
      timing: "Próximos 7 días"
    },
    {
      title: "Aprovecha tu Zona de Expansión",
      description: `Con Júpiter en ${jupiterSign} en tu Casa ${jupiterHouse}, enfoca tu energía en actividades relacionadas con ${getJupiterAction(jupiterSign, jupiterHouse)}.`,
      timing: "Este mes"
    },
    {
      title: "Alinea tus Talentos con Ingresos",
      description: `Como ${sunSign}, tienes talentos naturales en ${getSunTalents(sunSign)}. Identifica cómo estos pueden traducirse en fuentes de ingreso alineadas con tu esencia.`,
      timing: "Próximas 2-3 semanas"
    },
    {
      title: "Establece Sistema de Gestión Financiera",
      description: "Crea un sistema para seguimiento de ingresos, gastos, ahorros e inversiones. La claridad financiera es el primer paso hacia mayor abundancia.",
      timing: "Inmediatamente"
    },
    {
      title: "Desarrolla Red de Prosperidad",
      description: "Conecta intencionalmente con personas que inspiren tu crecimiento financiero. Busca mentores o grupos que compartan tus valores y aspiraciones.",
      timing: "Continuamente"
    }
  ];
};

// Helper functions for action plan
const getHouse2Action = (sign: string): string => {
  const actions: { [key: string]: string } = {
    "Aries": "adoptar un enfoque más proactivo en la generación de ingresos",
    "Tauro": "establecer sistemas financieros sólidos y confiables",
    "Géminis": "diversificar tus fuentes de ingreso y adaptarte a nuevas oportunidades",
    "Cáncer": "nutrir tu seguridad financiera con atención continua",
    "Leo": "reconocer el valor de tu creatividad y generosidad estratégica",
    "Virgo": "analizar y perfeccionar constantemente tus sistemas financieros",
    "Libra": "establecer asociaciones financieras equilibradas y justas",
    "Escorpio": "transformar tu relación con recursos compartidos y deuda",
    "Sagitario": "expandir tu comprensión y filosofía sobre el dinero",
    "Capricornio": "establecer metas financieras estructuradas a largo plazo",
    "Acuario": "adoptar enfoques innovadores y no convencionales hacia las finanzas",
    "Piscis": "confiar en tu intuición financiera mientras estableces límites claros"
  };
  return actions[sign] || "desarrollar una comprensión profunda de tu relación única con el dinero";
};

const getJupiterAction = (sign: string, house: number): string => {
  const signActions: { [key: string]: string } = {
    "Aries": "iniciar nuevos proyectos con entusiasmo y liderazgo",
    "Tauro": "construir valor tangible y seguridad a largo plazo",
    "Géminis": "expandir tu conocimiento y comunicación en diversos campos",
    "Cáncer": "nutrir conexiones significativas y seguridad emocional",
    "Leo": "expresar tu creatividad y generosidad de manera expansiva",
    "Virgo": "mejorar sistemas y ofrecer servicio valioso a otros",
    "Libra": "crear asociaciones armoniosas y colaboraciones estratégicas",
    "Escorpio": "transformar profundamente recursos compartidos e inversiones",
    "Sagitario": "expandir horizontes a través de viajes, educación o publicaciones",
    "Capricornio": "construir estructuras sólidas para crecimiento a largo plazo",
    "Acuario": "innovar y conectar con comunidades visionarias",
    "Piscis": "expandir tu comprensión espiritual e intuición creativa"
  };
  
  // Combine sign influence with house area for more specific guidance
  const signAction = signActions[sign] || "expandir con optimismo en áreas resonantes";
  const houseArea = getHouseArea(house);
  
  return `${signAction} en el área de ${houseArea}`;
};

const getHouseArea = (house: number): string => {
  const areas: { [key: number]: string } = {
    1: "tu identidad y proyección personal",
    2: "tus recursos y valores personales",
    3: "comunicación y aprendizaje",
    4: "hogar y fundaciones",
    5: "creatividad y autoexpresión",
    6: "trabajo diario y salud",
    7: "relaciones y asociaciones",
    8: "transformación y recursos compartidos",
    9: "expansión y visión de vida",
    10: "carrera y reconocimiento público",
    11: "redes y visiones futuras",
    12: "intuición y conexión espiritual"
  };
  return areas[house] || "tu vida";
};

const getSunTalents = (sign: string): string => {
  const talents: { [key: string]: string } = {
    "Aries": "liderazgo, iniciativa y capacidad pionera",
    "Tauro": "persistencia, practicidad y creación de valor tangible",
    "Géminis": "comunicación, adaptabilidad y curiosidad intelectual",
    "Cáncer": "intuición emocional, nutrición y creación de seguridad",
    "Leo": "creatividad, carisma y capacidad de inspirar",
    "Virgo": "análisis, perfeccionamiento y mejora de sistemas",
    "Libra": "diplomacia, sentido estético y creación de armonía",
    "Escorpio": "percepción profunda, investigación y transformación",
    "Sagitario": "visión expansiva, optimismo y exploración",
    "Capricornio": "estructuración, responsabilidad y visión a largo plazo",
    "Acuario": "innovación, pensamiento progresista y creación de comunidad",
    "Piscis": "imaginación, compasión y conexión intuitiva"
  };
  return talents[sign] || "tus dones y talentos únicos";
};

// Utility function to shuffle an array (Fisher-Yates algorithm)
const shuffleArray = <T>(array: T[]): T[] => {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
};
