
import { supabase } from '@/integrations/supabase/client';

export type DrawnCard = {
  card: {
    id: string;
    name: string;
    arcana: 'major' | 'minor';
    suit?: string;
    element?: string;
    meaningUpright: string[];
    meaningReversed: string[];
    description: string;
    imageUrl: string; // Changed from image to imageUrl to match tarot-data.ts
  };
  position?: number;
  isReversed: boolean;
};

export type SavedReading = {
  id: string;
  readingType: string;
  cards: DrawnCard[];
  created_at: string;
  notes?: string;
};

// Function to save a tarot reading for today
export const saveTarotReading = async (drawnCard: DrawnCard): Promise<boolean> => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      return false;
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Check if there's already a reading for today
    const { data: existingReading, error: checkError } = await supabase
      .from('tarot_readings')
      .select('*')
      .eq('user_id', user.id)
      .eq('reading_type', 'daily')
      .gte('created_at', today.toISOString())
      .lt('created_at', new Date(today.getTime() + 86400000).toISOString())
      .single();

    if (checkError && checkError.code !== 'PGRST116') {
      console.error('Error checking existing reading:', checkError);
      return false;
    }

    if (existingReading) {
      // Already have a reading for today, just return
      return true;
    }

    // Save the new reading
    const { error } = await supabase
      .from('tarot_readings')
      .insert({
        user_id: user.id,
        reading_type: 'daily',
        cards: [drawnCard]
      });

    if (error) {
      console.error('Error saving tarot reading:', error);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Error saving tarot reading:', error);
    return false;
  }
};

// Function to get today's tarot reading
export const getTodaysTarotReading = async (): Promise<DrawnCard | null> => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      return null;
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const { data, error } = await supabase
      .from('tarot_readings')
      .select('*')
      .eq('user_id', user.id)
      .eq('reading_type', 'daily')
      .gte('created_at', today.toISOString())
      .lt('created_at', new Date(today.getTime() + 86400000).toISOString())
      .order('created_at', { ascending: false })
      .limit(1)
      .single();

    if (error) {
      // No reading found for today, which is expected behavior
      return null;
    }

    if (data && data.cards && Array.isArray(data.cards) && data.cards.length > 0) {
      return data.cards[0] as DrawnCard;
    }

    return null;
  } catch (error) {
    console.error('Error getting today\'s tarot reading:', error);
    return null;
  }
};

// Function to save a full reading (multiple cards)
export const saveReading = (reading: {
  readingType: { id: string; name: string; description: string; cardCount: number };
  deck: { id: string; name: string; description: string };
  cards: DrawnCard[];
}): SavedReading | null => {
  try {
    const id = crypto.randomUUID();
    const savedReading: SavedReading = {
      id,
      readingType: reading.readingType.id,
      cards: reading.cards,
      created_at: new Date().toISOString(),
    };
    
    // Store in local storage for now
    // In a real app, this would be stored in the database
    const savedReadings = getReadings();
    savedReadings.push(savedReading);
    localStorage.setItem('tarotReadings', JSON.stringify(savedReadings));
    
    return savedReading;
  } catch (error) {
    console.error('Error saving reading:', error);
    return null;
  }
};

// Function to get all saved readings
export const getReadings = (): SavedReading[] => {
  try {
    const savedReadings = localStorage.getItem('tarotReadings');
    return savedReadings ? JSON.parse(savedReadings) : [];
  } catch (error) {
    console.error('Error getting readings:', error);
    return [];
  }
};

// Function to get all saved readings from the database
export const getSavedReadings = async (): Promise<SavedReading[]> => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      return [];
    }

    const { data, error } = await supabase
      .from('tarot_readings')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error getting saved readings:', error);
      return [];
    }

    return (data || []).map(item => ({
      id: item.id,
      readingType: item.reading_type,
      cards: item.cards as DrawnCard[],
      created_at: item.created_at,
      notes: item.notes
    }));
  } catch (error) {
    console.error('Error getting saved readings:', error);
    return [];
  }
};
