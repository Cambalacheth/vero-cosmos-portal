
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
  house?: number; // Nueva propiedad para la casa astrológica
}

// Interfaz para representar una casa astrológica
export interface HousePosition {
  house: number;
  sign: string;
  degree: number;
}

// Interfaz para los datos de la carta natal
export interface NatalChartData {
  sun: PlanetaryPosition;
  moon: PlanetaryPosition;
  ascendant: PlanetaryPosition;
  mercury: PlanetaryPosition;
  venus: PlanetaryPosition;
  mars: PlanetaryPosition;
  jupiter: PlanetaryPosition;
  saturn: PlanetaryPosition;
  uranus: PlanetaryPosition;
  neptune: PlanetaryPosition;
  pluto: PlanetaryPosition;
  houses: HousePosition[];
  birthDate?: Date;
  birthTime?: string;
  birthplace?: Location;
}
