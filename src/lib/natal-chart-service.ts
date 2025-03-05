
// Este archivo ahora sólo re-exporta todo desde la carpeta natal-chart
// para mantener la compatibilidad con el código existente

import { 
  calculateNatalChart,
  generatePersonalizedHoroscope,
  searchLocations,
  LOCATIONS,
  Location
} from './natal-chart';

import type {
  NatalChartInput,
  NatalChartData,
  PlanetaryPosition
} from './natal-chart';

export {
  calculateNatalChart,
  generatePersonalizedHoroscope,
  searchLocations,
  LOCATIONS,
  Location
};

export type {
  NatalChartInput,
  NatalChartData,
  PlanetaryPosition
};
