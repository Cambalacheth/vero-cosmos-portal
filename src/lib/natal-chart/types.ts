
// Interfaz para la ubicación
export interface Location {
  id: string;
  name: string;
  country: string;
  latitude: number;
  longitude: number;
}

// Interfaz para los datos de entrada de la carta natal
export interface NatalChartInput {
  birthDate: Date;
  birthTime: string;
  birthplace: Location;
}

// Interfaz para representar una posición planetaria
export interface PlanetaryPosition {
  planet: string;
  sign: string;
  degree: number;
  icon: string;
}

// Interfaz para los datos de la carta natal
export interface NatalChartData {
  sun: PlanetaryPosition;
  moon: PlanetaryPosition;
  ascendant: PlanetaryPosition;
  mercury: PlanetaryPosition;
  venus: PlanetaryPosition;
  mars: PlanetaryPosition;
  jupiter?: PlanetaryPosition;
  saturn?: PlanetaryPosition;
}
