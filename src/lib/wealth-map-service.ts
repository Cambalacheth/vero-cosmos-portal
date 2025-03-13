
import { NatalChartData } from '@/lib/natal-chart';

// Basic analysis for free users
export const getWealthMapBasicAnalysis = (natalChart: NatalChartData) => {
  const house2SignName = getHouseSign(natalChart, 2);
  const house10SignName = getHouseSign(natalChart, 10);
  
  return {
    summary: generateFinancialSummary(natalChart),
    house2Analysis: generateHouse2Analysis(natalChart, house2SignName),
    house10Analysis: generateHouse10Analysis(natalChart, house10SignName),
    monthlyTip: generateMonthlyTip(natalChart)
  };
};

// Full analysis for premium users
export const getWealthMapFullAnalysis = (natalChart: NatalChartData) => {
  const house2SignName = getHouseSign(natalChart, 2);
  const house8SignName = getHouseSign(natalChart, 8);
  const house10SignName = getHouseSign(natalChart, 10);
  const house11SignName = getHouseSign(natalChart, 11);
  
  const basicAnalysis = getWealthMapBasicAnalysis(natalChart);
  
  return {
    ...basicAnalysis,
    jupiterSaturnAnalysis: generateJupiterSaturnAnalysis(natalChart),
    houses8And11Analysis: generateHouses8And11Analysis(natalChart, house8SignName, house11SignName),
    incomeStrategies: generateIncomeStrategies(natalChart, house2SignName),
    careerRecommendations: generateCareerRecommendations(natalChart, house10SignName),
    opportunityAttractionTips: generateOpportunityAttractionTips(natalChart),
    financialCalendar: generateFinancialCalendar(),
    sampleQuestions: [
      "¿Cómo puedo aprovechar mejor la posición de Júpiter en mi carta para atraer abundancia?",
      "¿Cuál es el mejor momento para iniciar un emprendimiento según mi carta natal?",
      "¿Qué bloqueos financieros tengo según mi carta y cómo superarlos?",
      "¿Qué tipo de inversiones son más favorables para mí según mi astrología?",
      "¿Cómo puedo mejorar mi relación con el dinero según mi Casa 2?"
    ]
  };
};

// Helper functions to generate the analysis

const getHouseSign = (natalChart: NatalChartData, houseNumber: number): string => {
  const house = natalChart.houses.find(h => h.house === houseNumber);
  return house?.sign || "Desconocido";
};

const getPlanetsInHouse = (natalChart: NatalChartData, houseNumber: number) => {
  const planets = [];
  
  // Check each planet to see if it's in the specified house
  if (natalChart.sun.house === houseNumber) planets.push({name: "Sol", data: natalChart.sun});
  if (natalChart.moon.house === houseNumber) planets.push({name: "Luna", data: natalChart.moon});
  if (natalChart.mercury.house === houseNumber) planets.push({name: "Mercurio", data: natalChart.mercury});
  if (natalChart.venus.house === houseNumber) planets.push({name: "Venus", data: natalChart.venus});
  if (natalChart.mars.house === houseNumber) planets.push({name: "Marte", data: natalChart.mars});
  if (natalChart.jupiter.house === houseNumber) planets.push({name: "Júpiter", data: natalChart.jupiter});
  if (natalChart.saturn.house === houseNumber) planets.push({name: "Saturno", data: natalChart.saturn});
  if (natalChart.uranus.house === houseNumber) planets.push({name: "Urano", data: natalChart.uranus});
  if (natalChart.neptune.house === houseNumber) planets.push({name: "Neptuno", data: natalChart.neptune});
  if (natalChart.pluto.house === houseNumber) planets.push({name: "Plutón", data: natalChart.pluto});
  
  return planets;
};

const generateFinancialSummary = (natalChart: NatalChartData): string => {
  const house2Sign = getHouseSign(natalChart, 2);
  const house10Sign = getHouseSign(natalChart, 10);
  const jupiterSign = natalChart.jupiter.sign;
  
  return `Con ${house2Sign} en tu Casa 2, tu relación con el dinero tiende a ser ${getSignMoneyAttribute(house2Sign)}. 
  Tu carrera ideal, indicada por ${house10Sign} en la Casa 10, sugiere que debes buscar profesiones que te permitan 
  ${getCareerAttributeBySign(house10Sign)}. La posición de Júpiter en ${jupiterSign} indica que 
  tu mayor expansión financiera vendrá cuando ${getJupiterExpansionBySign(jupiterSign)}.`;
};

const generateHouse2Analysis = (natalChart: NatalChartData, house2Sign: string): string => {
  const planetsInHouse2 = getPlanetsInHouse(natalChart, 2);
  const planetaryInfluence = planetsInHouse2.length > 0 
    ? `Además, tienes ${planetsInHouse2.map(p => p.name).join(', ')} en esta casa, lo que ${getPlanetaryInfluenceOnMoney(planetsInHouse2)}.` 
    : '';
  
  return `Tu Casa 2 en ${house2Sign} revela que tu forma natural de generar ingresos está relacionada con 
  ${getHouse2IncomeSourceBySign(house2Sign)}. ${planetaryInfluence} Esto significa que tu mayor potencial 
  para generar dinero está en actividades donde puedas utilizar estas cualidades.`;
};

const generateHouse10Analysis = (natalChart: NatalChartData, house10Sign: string): string => {
  const planetsInHouse10 = getPlanetsInHouse(natalChart, 10);
  const planetaryInfluence = planetsInHouse10.length > 0 
    ? `La presencia de ${planetsInHouse10.map(p => p.name).join(', ')} en esta casa indica que ${getPlanetaryInfluenceOnCareer(planetsInHouse10)}.` 
    : '';
  
  return `Con ${house10Sign} en tu Casa 10, tu camino profesional más favorable se orienta hacia 
  ${getHouse10CareerPathBySign(house10Sign)}. ${planetaryInfluence} Para maximizar tu éxito profesional, 
  busca roles que te permitan expresar estas cualidades.`;
};

const generateJupiterSaturnAnalysis = (natalChart: NatalChartData): string => {
  const jupiterSign = natalChart.jupiter.sign;
  const jupiterHouse = natalChart.jupiter.house;
  const saturnSign = natalChart.saturn.sign;
  const saturnHouse = natalChart.saturn.house;
  
  return `Júpiter, el planeta de la expansión y abundancia, se encuentra en ${jupiterSign} en tu Casa ${jupiterHouse}, 
  lo que significa que tu mayor crecimiento financiero vendrá a través de ${getJupiterFinancialGrowthBySign(jupiterSign)}. 
  Por otro lado, Saturno en ${saturnSign} en tu Casa ${saturnHouse} indica que debes ser disciplinado con 
  ${getSaturnFinancialDisciplineBySign(saturnSign)} para evitar limitaciones económicas.`;
};

const generateHouses8And11Analysis = (natalChart: NatalChartData, house8Sign: string, house11Sign: string): string => {
  return `Tu Casa 8 en ${house8Sign} sugiere que puedes beneficiarte financieramente a través de 
  ${getHouse8WealthSourceBySign(house8Sign)}. Mientras tanto, tu Casa 11 en ${house11Sign} indica que 
  tus redes sociales y contactos pueden favorecer tu economía cuando te enfocas en 
  ${getHouse11NetworkBySign(house11Sign)}.`;
};

const generateIncomeStrategies = (natalChart: NatalChartData, house2Sign: string): string[] => {
  const signSpecificStrategies = getIncomeStrategiesBySign(house2Sign);
  const jupiterStrategies = getJupiterIncomeStrategies(natalChart.jupiter.sign);
  
  return [
    ...signSpecificStrategies,
    ...jupiterStrategies
  ];
};

const generateCareerRecommendations = (natalChart: NatalChartData, house10Sign: string): string[] => {
  return getCareerRecommendationsBySign(house10Sign);
};

const generateOpportunityAttractionTips = (natalChart: NatalChartData): string[] => {
  const venusSign = natalChart.venus.sign;
  const jupiterSign = natalChart.jupiter.sign;
  
  return [
    `Utiliza los colores asociados a ${venusSign} en tu espacio de trabajo para atraer abundancia.`,
    `Realiza afirmaciones de prosperidad durante las fases de luna creciente para potenciar tus intenciones.`,
    `Conecta con personas del signo ${jupiterSign} que pueden traer oportunidades a tu vida.`,
    `Realiza rituales de gratitud cada vez que recibas dinero para abrir el canal de abundancia.`,
    `Visualiza tus metas financieras especialmente durante tránsitos favorables de Júpiter.`
  ];
};

const generateMonthlyTip = (natalChart: NatalChartData): string => {
  const tips = [
    "Este mes, presta especial atención a las oportunidades que surjan a través de colaboraciones con personas que comparten tus valores.",
    "El momento es favorable para revisar tu presupuesto y establecer nuevas metas financieras que resuenen con tus pasiones.",
    "Es un buen periodo para aprender nuevas habilidades que puedan diversificar tus fuentes de ingresos.",
    "Las inversiones relacionadas con tecnología o innovación podrían ser particularmente favorables este mes.",
    "Considera establecer una práctica diaria de visualización de abundancia para alinear tu energía con tus metas financieras."
  ];
  
  // Select a random tip for now - in a real app this would be based on current transits
  const randomIndex = Math.floor(Math.random() * tips.length);
  return tips[randomIndex];
};

const generateFinancialCalendar = () => {
  // In a real app, this would calculate actual astrological transits
  // For demo purposes, we'll return sample dates
  return [
    {
      date: "15-20 Noviembre 2023",
      transitType: "Luna Nueva en Escorpio",
      recommendation: "Excelente momento para iniciar un proyecto financiero o hacer una inversión importante."
    },
    {
      date: "5-10 Diciembre 2023",
      transitType: "Mercurio directo",
      recommendation: "Ideal para firmar contratos, negociar acuerdos o lanzar productos/servicios."
    },
    {
      date: "22-28 Diciembre 2023",
      transitType: "Júpiter en Tauro",
      recommendation: "Período favorable para inversiones inmobiliarias o empresas relacionadas con bienes materiales."
    },
    {
      date: "3-10 Enero 2024",
      transitType: "Venus en Capricornio",
      recommendation: "Buen momento para establecer asociaciones comerciales duraderas o solicitar financiamiento."
    },
    {
      date: "20-25 Enero 2024",
      transitType: "Luna Llena en Leo",
      recommendation: "Óptimo para presentaciones públicas, lanzamientos o para promover tu marca personal."
    }
  ];
};

// Helper functions to generate sign-specific advice

const getSignMoneyAttribute = (sign: string): string => {
  const attributes: {[key: string]: string} = {
    "Aries": "impulsiva y valiente, buscando oportunidades de rápido crecimiento",
    "Tauro": "estable y persistente, valorando la seguridad a largo plazo",
    "Géminis": "diversificada y adaptable, con múltiples fuentes de ingresos",
    "Cáncer": "protectora y cíclica, enfocada en la seguridad familiar",
    "Leo": "generosa y ambiciosa, atraída por inversiones que reflejan tu estatus",
    "Virgo": "analítica y detallista, con excelente capacidad de ahorro y organización",
    "Libra": "equilibrada y estética, buscando armonía en tus finanzas",
    "Escorpio": "intensa y estratégica, con talento para transformar recursos",
    "Sagitario": "expansiva y optimista, atrayendo oportunidades de crecimiento",
    "Capricornio": "disciplinada y paciente, construyendo riqueza a largo plazo",
    "Acuario": "innovadora e independiente, abierta a fuentes de ingresos no convencionales",
    "Piscis": "intuitiva y receptiva, con capacidad para atraer recursos de forma inesperada"
  };
  
  return attributes[sign] || "equilibrada y en desarrollo";
};

const getCareerAttributeBySign = (sign: string): string => {
  const attributes: {[key: string]: string} = {
    "Aries": "liderar, innovar y tomar iniciativas",
    "Tauro": "crear valor tangible y construir con solidez",
    "Géminis": "comunicar, enseñar y conectar ideas",
    "Cáncer": "nutrir, proteger y crear ambientes seguros",
    "Leo": "brillar, inspirar y estar en el centro de atención",
    "Virgo": "analizar, optimizar y perfeccionar procesos",
    "Libra": "mediar, armonizar y crear belleza",
    "Escorpio": "investigar, transformar y profundizar",
    "Sagitario": "expandir horizontes, enseñar y explorar",
    "Capricornio": "estructurar, liderar y construir legados",
    "Acuario": "innovar, reformar y crear comunidad",
    "Piscis": "inspirar, sanar y conectar con lo intangible"
  };
  
  return attributes[sign] || "expresar tus talentos únicos";
};

const getJupiterExpansionBySign = (sign: string): string => {
  const expansions: {[key: string]: string} = {
    "Aries": "tomas iniciativa y lideras nuevos proyectos",
    "Tauro": "inviertes en activos tangibles y construyes seguridad",
    "Géminis": "diversificas tus conocimientos y redes de contacto",
    "Cáncer": "nutres tus relaciones y bases emocionales",
    "Leo": "expresas tu creatividad y liderazgo auténtico",
    "Virgo": "perfeccionas tus habilidades y optimizas sistemas",
    "Libra": "estableces alianzas estratégicas y colaboraciones",
    "Escorpio": "transformas recursos compartidos y profundizas inversiones",
    "Sagitario": "amplías tus horizontes y tomas riesgos calculados",
    "Capricornio": "asumes responsabilidades y construyes estructuras sólidas",
    "Acuario": "innovas y te conectas con comunidades afines",
    "Piscis": "confías en tu intuición y te conectas con tu propósito espiritual"
  };
  
  return expansions[sign] || "sigues tu verdadera pasión";
};

const getHouse2IncomeSourceBySign = (sign: string): string => {
  const sources: {[key: string]: string} = {
    "Aries": "emprendimientos propios, liderazgo y actividades que requieren iniciativa y coraje",
    "Tauro": "inversiones estables, bienes raíces y actividades relacionadas con recursos materiales o belleza",
    "Géminis": "comunicación, escritura, enseñanza y actividades que requieren versatilidad mental",
    "Cáncer": "negocios familiares, bienes raíces y actividades relacionadas con nutrición o cuidado",
    "Leo": "expresión creativa, entretenimiento y roles de liderazgo donde puedas brillar",
    "Virgo": "análisis, organización, optimización de sistemas y atención al detalle",
    "Libra": "asociaciones, diplomacia, diseño y actividades relacionadas con la estética o la armonía",
    "Escorpio": "investigación, transformación de recursos y manejo de fondos compartidos o inversiones",
    "Sagitario": "educación, viajes, publicaciones y expansión de conocimientos",
    "Capricornio": "administración, estructura, estrategia a largo plazo y posiciones de autoridad",
    "Acuario": "innovación, tecnología, trabajo en equipo y causas humanitarias",
    "Piscis": "creatividad, sanación, espiritualidad y actividades que requieren intuición"
  };
  
  return sources[sign] || "actividades que resonan con tus valores personales";
};

const getPlanetaryInfluenceOnMoney = (planets: Array<{name: string, data: any}>): string => {
  if (planets.length === 0) return "";
  
  const influences: {[key: string]: string} = {
    "Sol": "aumenta tu confianza para generar ingresos a través de tu identidad y propósito",
    "Luna": "conecta tus ingresos con tus necesidades emocionales y fluctuaciones cíclicas",
    "Mercurio": "potencia tu capacidad de generar dinero a través de la comunicación e ideas",
    "Venus": "favorece la atracción de recursos a través de relaciones y apreciación de valor",
    "Marte": "impulsa tu capacidad para tomar acción directa para generar ingresos",
    "Júpiter": "expande significativamente tus oportunidades para generar abundancia",
    "Saturno": "aporta estructura y disciplina a tus finanzas, aunque puede requerir esfuerzo",
    "Urano": "indica potencial para ingresos inesperados o a través de métodos innovadores",
    "Neptuno": "sugiere ingresos a través de creatividad o actividades espirituales, aunque con posible confusión",
    "Plutón": "potencia la capacidad de transformar recursos y generar riqueza profunda"
  };
  
  if (planets.length === 1) {
    return influences[planets[0].name] || "";
  }
  
  return "crea una dinámica compleja en tu relación con el dinero, combinando diversas energías planetarias";
};

const getHouse10CareerPathBySign = (sign: string): string => {
  const paths: {[key: string]: string} = {
    "Aries": "roles de liderazgo, emprendimiento, deportes o carreras que requieren iniciativa y competitividad",
    "Tauro": "finanzas, arte, gastronomía o carreras estables que involucran recursos tangibles",
    "Géminis": "comunicación, periodismo, ventas o carreras que requieren versatilidad intelectual",
    "Cáncer": "cuidado, nutrición, bienes raíces o carreras relacionadas con la familia o la seguridad",
    "Leo": "entretenimiento, liderazgo creativo, educación o roles donde puedas brillar y ser reconocido",
    "Virgo": "análisis, salud, optimización o carreras que requieren precisión y servicio",
    "Libra": "derecho, mediación, diseño o carreras que involucran equilibrio y relaciones",
    "Escorpio": "investigación, psicología, finanzas o carreras que implican transformación y profundidad",
    "Sagitario": "educación superior, viajes, filosofía o carreras que expanden horizontes",
    "Capricornio": "administración, política, negocios o carreras con estructuras jerárquicas claras",
    "Acuario": "tecnología, causas sociales, innovación o carreras orientadas al futuro",
    "Piscis": "artes, sanación, espiritualidad o carreras que requieren compasión e intuición"
  };
  
  return paths[sign] || "profesiones que resuenan con tu autenticidad";
};

const getPlanetaryInfluenceOnCareer = (planets: Array<{name: string, data: any}>): string => {
  if (planets.length === 0) return "";
  
  const influences: {[key: string]: string} = {
    "Sol": "tu carrera está fuertemente ligada a tu identidad y propósito de vida",
    "Luna": "tu profesión ideal debe satisfacer tus necesidades emocionales y puede fluctuar con el tiempo",
    "Mercurio": "la comunicación y el intelecto son centrales en tu camino profesional",
    "Venus": "las relaciones y la estética juegan un papel importante en tu carrera",
    "Marte": "la competitividad y la capacidad de acción directa impulsan tu éxito profesional",
    "Júpiter": "tienes potencial para gran expansión y reconocimiento en tu carrera",
    "Saturno": "tu camino profesional requiere disciplina y estructuras sólidas para alcanzar logros duraderos",
    "Urano": "tu carrera puede tomar giros inesperados y beneficiarse de enfoques innovadores",
    "Neptuno": "tu profesión ideal involucra inspiración, creatividad o dimensiones espirituales",
    "Plutón": "tu carrera implica transformación, poder y potencial para impacto profundo"
  };
  
  if (planets.length === 1) {
    return influences[planets[0].name] || "";
  }
  
  return "tu camino profesional está influenciado por múltiples energías planetarias, creando una vocación compleja y multifacética";
};

const getJupiterFinancialGrowthBySign = (sign: string): string => {
  const growth: {[key: string]: string} = {
    "Aries": "proyectos pioneros donde puedas liderar e innovar",
    "Tauro": "inversiones estables y creación de valor tangible",
    "Géminis": "comunicación, networking y aprendizaje constante",
    "Cáncer": "negocios familiares y creación de seguridad emocional",
    "Leo": "expresión creativa y desarrollo de tu marca personal",
    "Virgo": "mejora continua de habilidades y optimización de recursos",
    "Libra": "asociaciones estratégicas y colaboraciones equilibradas",
    "Escorpio": "inversiones conjuntas y transformación de recursos",
    "Sagitario": "expansión internacional y educación superior",
    "Capricornio": "estructuras sólidas y planificación a largo plazo",
    "Acuario": "innovación tecnológica y proyectos orientados al futuro",
    "Piscis": "actividades creativas o espirituales que sirvan a un propósito mayor"
  };
  
  return growth[sign] || "actividades que resuenan con tu visión personal";
};

const getSaturnFinancialDisciplineBySign = (sign: string): string => {
  const discipline: {[key: string]: string} = {
    "Aries": "el control de impulsos y gastos impulsivos",
    "Tauro": "el apego a posesiones materiales y la resistencia al cambio",
    "Géminis": "la dispersión de energía en demasiados proyectos simultáneos",
    "Cáncer": "los gastos emocionales y la tendencia a acumular por seguridad",
    "Leo": "los gastos excesivos para impresionar a los demás",
    "Virgo": "la excesiva preocupación por detalles que pueden paralizar la acción",
    "Libra": "la indecisión y la búsqueda de perfección que retrasa oportunidades",
    "Escorpio": "el control y la desconfianza en transacciones financieras",
    "Sagitario": "los riesgos excesivos y la falta de planificación detallada",
    "Capricornio": "el miedo a la escasez y la excesiva austeridad",
    "Acuario": "la resistencia a métodos convencionales que podrían ser beneficiosos",
    "Piscis": "la falta de límites claros y la evasión de realidades financieras"
  };
  
  return discipline[sign] || "tus tendencias limitantes";
};

const getHouse8WealthSourceBySign = (sign: string): string => {
  const sources: {[key: string]: string} = {
    "Aries": "inversiones valientes en startups o proyectos pioneros",
    "Tauro": "inversiones a largo plazo en bienes tangibles y recursos naturales",
    "Géminis": "negocios relacionados con publicaciones, educación o comunicación",
    "Cáncer": "bienes raíces o negocios vinculados a la familia",
    "Leo": "inversiones creativas, entretenimiento o educación",
    "Virgo": "trabajos de consultoría o servicios especializados",
    "Libra": "asociaciones de negocios y contratos favorables",
    "Escorpio": "inversiones profundas en áreas de investigación o transformación",
    "Sagitario": "inversiones internacionales o educativas",
    "Capricornio": "gestión de recursos compartidos con disciplina y estructura",
    "Acuario": "proyectos grupales innovadores o tecnológicos",
    "Piscis": "trabajos creativos o espirituales que involucran recursos compartidos"
  };
  
  return sources[sign] || "inversiones que resuenan con tus intereses profundos";
};

const getHouse11NetworkBySign = (sign: string): string => {
  const networks: {[key: string]: string} = {
    "Aries": "líderes y emprendedores con energía pionera",
    "Tauro": "personas con recursos y valores estables",
    "Géminis": "comunicadores e intelectuales con ideas diversas",
    "Cáncer": "grupos familiares o comunidades con fuerte sentido de pertenencia",
    "Leo": "personas creativas, influyentes o en posiciones de liderazgo",
    "Virgo": "profesionales especializados y orientados al servicio",
    "Libra": "personas diplomáticas y con conexiones sociales estratégicas",
    "Escorpio": "individuos con recursos compartidos o influencia transformadora",
    "Sagitario": "contactos internacionales o en ámbitos educativos superiores",
    "Capricornio": "personas con autoridad, experiencia o posiciones de poder",
    "Acuario": "grupos innovadores orientados al futuro o causas humanitarias",
    "Piscis": "comunidades creativas o espirituales con visión compasiva"
  };
  
  return networks[sign] || "grupos que comparten tus ideales";
};

const getIncomeStrategiesBySign = (sign: string): string[] => {
  const strategies: {[key: string]: string[]} = {
    "Aries": [
      "Inicia un emprendimiento que te permita liderar y tomar decisiones rápidas.",
      "Busca roles donde puedas destacar por tu capacidad de acción e iniciativa.",
      "Desarrolla habilidades en áreas que requieran valentía y capacidad de ser pionero."
    ],
    "Tauro": [
      "Invierte en activos tangibles como bienes raíces que generen ingresos estables.",
      "Desarrolla negocios relacionados con alimentos, arte o bienes de lujo.",
      "Crea sistemas de ingresos pasivos que crezcan lentamente pero con solidez."
    ],
    "Géminis": [
      "Diversifica tus fuentes de ingresos con múltiples proyectos simultáneos.",
      "Desarrolla habilidades de comunicación que puedas monetizar (escritura, enseñanza, ventas).",
      "Busca trabajos que te permitan variedad y aprendizaje constante."
    ],
    "Cáncer": [
      "Considera negocios relacionados con el hogar, alimentación o cuidado.",
      "Invierte en propiedades o negocios familiares con potencial de crecimiento.",
      "Desarrolla productos o servicios que generen sensación de seguridad y bienestar."
    ],
    "Leo": [
      "Monetiza tus talentos creativos y capacidad de liderazgo.",
      "Desarrolla tu marca personal para destacar en tu industria.",
      "Busca roles donde puedas brillar y ser reconocido por tu contribución única."
    ],
    "Virgo": [
      "Ofrece servicios de análisis, organización o mejora de procesos.",
      "Especialízate en áreas donde la precisión y atención al detalle sean valoradas.",
      "Desarrolla sistemas eficientes que optimicen recursos y aumenten productividad."
    ],
    "Libra": [
      "Establece asociaciones estratégicas que equilibren fortalezas y debilidades.",
      "Trabaja en campos relacionados con la belleza, armonía o justicia.",
      "Desarrolla habilidades de negociación y mediación que puedas monetizar."
    ],
    "Escorpio": [
      "Investiga oportunidades de inversión con potencial de transformación profunda.",
      "Considera trabajos en finanzas, investigación o psicología.",
      "Busca formas de monetizar tu intuición y capacidad de ver más allá de lo evidente."
    ],
    "Sagitario": [
      "Expande tu alcance a mercados internacionales o diversas culturas.",
      "Desarrolla ofertas educativas o de conocimiento que puedas compartir ampliamente.",
      "Busca oportunidades que combinen viajes, educación o expansión personal."
    ],
    "Capricornio": [
      "Construye una carrera con objetivos claros de avance a largo plazo.",
      "Invierte en tu educación y credenciales para aumentar tu valor en el mercado.",
      "Desarrolla autoridad en tu campo para acceder a posiciones mejor remuneradas."
    ],
    "Acuario": [
      "Explora tecnologías emergentes o métodos innovadores en tu campo.",
      "Considera proyectos colaborativos o plataformas comunitarias.",
      "Busca nichos no convencionales donde puedas destacar por tu originalidad."
    ],
    "Piscis": [
      "Monetiza tus dones intuitivos, creativos o espirituales.",
      "Desarrolla servicios que ayuden a otros a conectar con su interior.",
      "Busca formas de combinar inspiración artística con practicidad comercial."
    ]
  };
  
  return strategies[sign] || [
    "Identifica tus talentos naturales y busca formas de monetizarlos.",
    "Desarrolla habilidades que sean valoradas en el mercado actual.",
    "Crea múltiples fuentes de ingresos para mayor estabilidad financiera."
  ];
};

const getJupiterIncomeStrategies = (jupiterSign: string): string[] => {
  const strategies: {[key: string]: string[]} = {
    "Aries": [
      "Aprovecha oportunidades que requieran iniciativa y liderazgo.",
      "Expande tu presencia en áreas donde puedas ser pionero."
    ],
    "Tauro": [
      "Expande tus inversiones en activos tangibles y estables.",
      "Desarrolla ofertas que proporcionen valor duradero y calidad."
    ],
    "Géminis": [
      "Amplía tu red de contactos y canales de comunicación.",
      "Diversifica tu oferta para llegar a diferentes audiencias."
    ],
    "Cáncer": [
      "Expande negocios relacionados con bienestar emocional o familiar.",
      "Cultiva relaciones a largo plazo con clientes que valoren la confianza."
    ],
    "Leo": [
      "Aumenta tu visibilidad y reconocimiento en tu campo.",
      "Desarrolla ofertas premium que reflejen calidad excepcional."
    ],
    "Virgo": [
      "Expande servicios que solucionen problemas específicos.",
      "Optimiza sistemas para aumentar eficiencia y rentabilidad."
    ],
    "Libra": [
      "Establece alianzas estratégicas con socios complementarios.",
      "Expande hacia mercados que valoren la estética y armonía."
    ],
    "Escorpio": [
      "Profundiza en inversiones o áreas de especialización.",
      "Transforma recursos existentes para crear mayor valor."
    ],
    "Sagitario": [
      "Expande a mercados internacionales o culturalmente diversos.",
      "Desarrolla ofertas educativas o filosóficas con amplio alcance."
    ],
    "Capricornio": [
      "Construye autoridad y credibilidad en tu industria.",
      "Establece metas financieras ambiciosas pero realistas."
    ],
    "Acuario": [
      "Innova con tecnologías o enfoques progresistas.",
      "Conecta con comunidades que compartan tus valores."
    ],
    "Piscis": [
      "Expande en áreas creativas, espirituales o artísticas.",
      "Confía en tu intuición para identificar oportunidades invisibles para otros."
    ]
  };
  
  return strategies[jupiterSign] || [
    "Identifica áreas donde puedas expandirte naturalmente sin forzar.",
    "Mantén una actitud optimista pero realista hacia las oportunidades."
  ];
};

const getCareerRecommendationsBySign = (sign: string): string[] => {
  const careers: {[key: string]: string[]} = {
    "Aries": [
      "Emprendimiento o startups en sectores emergentes.",
      "Deportes, fitness o industrias competitivas.",
      "Posiciones de liderazgo en empresas dinámicas.",
      "Consultoría estratégica o coaching ejecutivo.",
      "Carreras militares, de seguridad o primeros auxilios."
    ],
    "Tauro": [
      "Finanzas, banca o gestión de inversiones.",
      "Agricultura, alimentación o gastronomía.",
      "Arte, diseño o industrias de lujo.",
      "Bienes raíces o gestión de propiedades.",
      "Arquitectura o construcción sostenible."
    ],
    "Géminis": [
      "Periodismo, comunicación o relaciones públicas.",
      "Ventas, marketing digital o comercio.",
      "Educación, enseñanza o formación.",
      "Tecnología de la información o creación de contenidos.",
      "Transporte, logística o coordinación de proyectos."
    ],
    "Cáncer": [
      "Cuidado de la salud, enfermería o terapia.",
      "Hospitalidad, alimentación o nutrición.",
      "Bienes raíces residenciales o diseño de interiores.",
      "Servicio social, cuidado infantil o geriátrico.",
      "Negocios familiares o patrimonio cultural."
    ],
    "Leo": [
      "Entretenimiento, artes escénicas o dirección creativa.",
      "Gestión ejecutiva o liderazgo organizacional.",
      "Educación, formación o motivación.",
      "Política, diplomacia o relaciones públicas.",
      "Industrias de lujo, moda o belleza."
    ],
    "Virgo": [
      "Salud, medicina o bienestar.",
      "Análisis de datos, estadística o investigación.",
      "Edición, corrección o documentación técnica.",
      "Gestión de proyectos, organización o logística.",
      "Tecnología, programación o control de calidad."
    ],
    "Libra": [
      "Derecho, mediación o justicia.",
      "Diplomacia, relaciones internacionales o política.",
      "Diseño, decoración o artes visuales.",
      "Planificación de eventos, bodas o negociaciones.",
      "Servicios de consultoría en equilibrio trabajo-vida."
    ],
    "Escorpio": [
      "Investigación, desarrollo o ciencias.",
      "Psicología, terapia o consejería.",
      "Finanzas, inversiones o gestión de crisis.",
      "Medicina, cirugía o forense.",
      "Transformación empresarial o consultoría estratégica."
    ],
    "Sagitario": [
      "Educación superior, filosofía o religión.",
      "Turismo, viajes o relaciones internacionales.",
      "Publicaciones, editorial o comunicación.",
      "Derecho, ética o sistemas de creencias.",
      "Deportes, aventura o exploración."
    ],
    "Capricornio": [
      "Administración empresarial o gestión corporativa.",
      "Finanzas, contabilidad o planificación estratégica.",
      "Política, gobierno o administración pública.",
      "Ingeniería, arquitectura o construcción.",
      "Consultoría de negocios, estrategia o reestructuración."
    ],
    "Acuario": [
      "Tecnología, innovación o startups.",
      "Ciencias, investigación o desarrollos futuristas.",
      "Activismo social, ONGs o política progresista.",
      "Psicología social, antropología o estudios culturales.",
      "Redes sociales, comunidades online o desarrollo web."
    ],
    "Piscis": [
      "Artes visuales, música o escritura creativa.",
      "Espiritualidad, coaching o sanación holística.",
      "Trabajo social, terapia o consejería.",
      "Fotografía, cine o industrias creativas.",
      "Oceanografía, biología marina o trabajo con agua."
    ]
  };
  
  return careers[sign] || [
    "Carreras que permitan expresar tu creatividad y talentos únicos.",
    "Roles que combinen tus habilidades técnicas con tus intereses personales.",
    "Posiciones que ofrezcan crecimiento personal y profesional.",
    "Trabajos que contribuyan positivamente a la sociedad o el medio ambiente.",
    "Emprendimientos basados en tus pasiones y valores fundamentales."
  ];
};

