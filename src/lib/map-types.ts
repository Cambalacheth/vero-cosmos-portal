
// Definición de tipos para los mapas cósmicos
export interface MapType {
  id: string;
  title: string;
  description: string;
  icon: string;
  route: string;
  color: string;
  available: boolean;
  comingSoon?: boolean;
  requiresNatalChart?: boolean;
  isPremium?: boolean;
}

// Lista de mapas cósmicos disponibles y futuros
export const cosmicMaps: MapType[] = [
  {
    id: 'wealth',
    title: 'Mapa de Riqueza',
    description: 'Descubre tu potencial de prosperidad y abundancia a través de tu carta natal.',
    icon: '💰',
    route: '/riqueza',
    color: 'from-amber-400 to-yellow-600',
    available: true,
    requiresNatalChart: true
  },
  {
    id: 'career',
    title: 'Mapa de Carrera',
    description: 'Explora tu camino profesional ideal y descubre tus talentos naturales.',
    icon: '🚀',
    route: '/carrera',
    color: 'from-blue-400 to-indigo-600',
    available: false,
    comingSoon: true,
    requiresNatalChart: true
  },
  {
    id: 'love',
    title: 'Mapa de Amor',
    description: 'Conecta con tu destino romántico y comprende tus patrones relacionales.',
    icon: '❤️',
    route: '/amor',
    color: 'from-pink-400 to-rose-600',
    available: false,
    comingSoon: true,
    requiresNatalChart: true
  },
  {
    id: 'health',
    title: 'Mapa de Salud',
    description: 'Optimiza tu bienestar físico y emocional según tu configuración astral.',
    icon: '✨',
    route: '/salud',
    color: 'from-green-400 to-emerald-600',
    available: false,
    comingSoon: true,
    requiresNatalChart: true
  },
  {
    id: 'purpose',
    title: 'Mapa de Propósito',
    description: 'Descifra tu misión de vida y propósito espiritual en esta encarnación.',
    icon: '🔮',
    route: '/proposito',
    color: 'from-purple-400 to-violet-600',
    available: false,
    comingSoon: true,
    requiresNatalChart: true,
    isPremium: true
  }
];

// Función auxiliar para obtener un mapa por su ID
export const getMapById = (id: string): MapType | undefined => {
  return cosmicMaps.find(map => map.id === id);
};

// Función auxiliar para obtener todos los mapas disponibles
export const getAvailableMaps = (): MapType[] => {
  return cosmicMaps.filter(map => map.available);
};

// Función auxiliar para obtener todos los mapas próximamente disponibles
export const getComingSoonMaps = (): MapType[] => {
  return cosmicMaps.filter(map => map.comingSoon);
};
