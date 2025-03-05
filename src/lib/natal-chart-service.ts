
// Este archivo ahora sólo re-exporta todo desde la carpeta natal-chart
// para mantener la compatibilidad con el código existente

import { 
  calculateNatalChart,
  generatePersonalizedHoroscope,
  searchLocations,
  LOCATIONS
} from './natal-chart';

import type {
  NatalChartInput,
  NatalChartData,
  PlanetaryPosition,
  Location
} from './natal-chart';

export {
  calculateNatalChart,
  generatePersonalizedHoroscope,
  searchLocations,
  LOCATIONS
};

export type {
  NatalChartInput,
  NatalChartData,
  PlanetaryPosition,
  Location
};
