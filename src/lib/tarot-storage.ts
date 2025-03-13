
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
    image: string;
  };
  position?: number;
  isReversed: boolean;
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
    const { data: existingReading } = await supabase
      .from('tarot_readings')
      .select('*')
      .eq('user_id', user.id)
      .gte('created_at', today.toISOString())
      .lt('created_at', new Date(today.getTime() + 86400000).toISOString())
      .single();

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

    if (error || !data) {
      // No reading found for today, which is expected behavior
      return null;
    }

    return data.cards[0] as DrawnCard;
  } catch (error) {
    console.error('Error getting today\'s tarot reading:', error);
    return null;
  }
};

// Function to get all saved readings
export const getSavedReadings = async (): Promise<any[]> => {
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

    return data || [];
  } catch (error) {
    console.error('Error getting saved readings:', error);
    return [];
  }
};
