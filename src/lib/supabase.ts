import { createClient, SupabaseClient } from '@supabase/supabase-js';

// Valores seguros para build time
const FALLBACK_URL = 'https://placeholder.supabase.co';
const FALLBACK_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBsYWNlaG9sZGVyIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NDUxOTI4MDAsImV4cCI6MTk2MDc2ODgwMH0.placeholder';

let supabaseInstance: SupabaseClient | null = null;

export const getSupabase = () => {
  // Só cria o cliente no browser
  if (typeof window === 'undefined') {
    throw new Error('Supabase só pode ser usado no cliente');
  }

  if (!supabaseInstance) {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || FALLBACK_URL;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || FALLBACK_KEY;

    supabaseInstance = createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
      }
    });
  }

  return supabaseInstance;
};

// Export para compatibilidade - retorna null no servidor
export const supabase = typeof window !== 'undefined' ? getSupabase() : null as any;
