import { createClient } from '@supabase/supabase-js';

// These will be replaced with actual values
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'your-project-url';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'your-anon-key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);