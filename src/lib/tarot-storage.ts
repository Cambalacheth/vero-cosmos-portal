
import { TarotCard } from './tarot-data';

export interface SavedReading {
  id: string;
  date: string;
  readingType: {
    id: string;
    name: string;
    description: string;
    cardCount: number;
  };
  deck: {
    id: string;
    name: string;
  };
  cards: {
    card: TarotCard;
    isReversed: boolean;
    position: number;
  }[];
  notes?: string;
}

// Helper functions to save and retrieve readings from localStorage
export const saveReading = (reading: Omit<SavedReading, 'id' | 'date'>) => {
  try {
    // Get existing readings
    const existingReadings = getReadings();
    
    // Create a new reading with ID and date
    const newReading: SavedReading = {
      ...reading,
      id: `reading-${Date.now()}`,
      date: new Date().toISOString(),
    };
    
    // Add the new reading to the list
    const updatedReadings = [...existingReadings, newReading];
    
    // Save to localStorage
    localStorage.setItem('tarot-readings', JSON.stringify(updatedReadings));
    
    return newReading;
  } catch (error) {
    console.error('Error saving tarot reading:', error);
    return null;
  }
};

export const getReadings = (): SavedReading[] => {
  try {
    const readings = localStorage.getItem('tarot-readings');
    return readings ? JSON.parse(readings) : [];
  } catch (error) {
    console.error('Error retrieving tarot readings:', error);
    return [];
  }
};

export const deleteReading = (id: string) => {
  try {
    const readings = getReadings();
    const updatedReadings = readings.filter(reading => reading.id !== id);
    localStorage.setItem('tarot-readings', JSON.stringify(updatedReadings));
    return true;
  } catch (error) {
    console.error('Error deleting tarot reading:', error);
    return false;
  }
};
