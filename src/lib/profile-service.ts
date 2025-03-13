
import { supabase } from '@/integrations/supabase/client';
import { NatalChartData, NatalChartInput, calculateNatalChart } from './natal-chart';

interface UserProfile {
  id: string;
  username?: string;
  avatar_url?: string;
  natal_chart?: NatalChartData;
}

export async function saveNatalChart(natalChart: NatalChartData): Promise<boolean> {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      throw new Error('Usuario no autenticado');
    }
    
    const { error } = await supabase
      .from('profiles')
      .update({ 
        natal_chart: natalChart,
        updated_at: new Date().toISOString()
      })
      .eq('id', user.id);
    
    if (error) {
      console.error('Error al guardar la carta natal:', error);
      return false;
    }
    
    return true;
  } catch (error) {
    console.error('Error al guardar la carta natal:', error);
    return false;
  }
}

export async function getUserNatalChart(): Promise<NatalChartData | null> {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      return null;
    }
    
    const { data, error } = await supabase
      .from('profiles')
      .select('natal_chart')
      .eq('id', user.id)
      .single();
    
    if (error || !data || !data.natal_chart) {
      return null;
    }
    
    return data.natal_chart as NatalChartData;
  } catch (error) {
    console.error('Error al obtener la carta natal:', error);
    return null;
  }
}

export async function createNatalChart(input: NatalChartInput): Promise<NatalChartData | null> {
  try {
    const natalChart = calculateNatalChart(input);
    const saved = await saveNatalChart(natalChart);
    
    if (!saved) {
      throw new Error('No se pudo guardar la carta natal');
    }
    
    return natalChart;
  } catch (error) {
    console.error('Error al crear la carta natal:', error);
    return null;
  }
}

export async function getUserProfile(): Promise<UserProfile | null> {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      return null;
    }
    
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single();
    
    if (error) {
      throw error;
    }
    
    return data as UserProfile;
  } catch (error) {
    console.error('Error al obtener el perfil:', error);
    return null;
  }
}

export async function updateUserProfile(profile: Partial<UserProfile>): Promise<boolean> {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      return false;
    }
    
    const { error } = await supabase
      .from('profiles')
      .update({
        ...profile,
        updated_at: new Date().toISOString()
      })
      .eq('id', user.id);
    
    if (error) {
      throw error;
    }
    
    return true;
  } catch (error) {
    console.error('Error al actualizar el perfil:', error);
    return false;
  }
}
