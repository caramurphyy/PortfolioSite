import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase credentials not found. Drawing save feature will be disabled.');
}

export const supabase = supabaseUrl && supabaseAnonKey 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

// Rate limiting - max 3 saves per minute per session
const saveTimestamps: number[] = [];
const MAX_SAVES_PER_MINUTE = 3;
const MAX_SVG_SIZE = 500000; // 500KB max

// Save a drawing to Supabase
export async function saveDrawing(svgData: string, artistName: string) {
  if (!supabase) {
    console.warn('Supabase not configured');
    return null;
  }
  
  // Check SVG size
  if (svgData.length > MAX_SVG_SIZE) {
    console.error('Drawing too large to save');
    return { error: 'Drawing is too large. Try a simpler drawing.' };
  }
  
  // Rate limiting check
  const now = Date.now();
  const recentSaves = saveTimestamps.filter(t => now - t < 60000);
  if (recentSaves.length >= MAX_SAVES_PER_MINUTE) {
    console.error('Rate limit exceeded');
    return { error: 'Too many saves. Please wait a minute.' };
  }
  
  const { data, error } = await supabase
    .from('drawings')
    .insert([{ svg_data: svgData, artist_name: artistName.slice(0, 50) }]) // Limit name length
    .select()
    .single();
    
  if (error) {
    console.error('Error saving drawing:', error);
    return null;
  }
  
  // Track successful save
  saveTimestamps.push(now);
  
  return data;
}

// Get all drawings from Supabase
export async function getDrawings() {
  if (!supabase) {
    return [];
  }
  
  const { data, error } = await supabase
    .from('drawings')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(50);
    
  if (error) {
    console.error('Error fetching drawings:', error);
    return [];
  }
  
  return data || [];
}

