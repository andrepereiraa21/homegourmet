'use client';

import { useState, useEffect } from 'react';
import type { User } from '@supabase/supabase-js';

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Importação dinâmica do Supabase apenas no cliente
    const initAuth = async () => {
      const { getSupabase } = await import('@/lib/supabase');
      const supabase = getSupabase();

      // Verificar sessão atual
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user ?? null);
      setLoading(false);

      // Escutar mudanças de autenticação
      const {
        data: { subscription },
      } = supabase.auth.onAuthStateChange((_event, session) => {
        setUser(session?.user ?? null);
        setLoading(false);
      });

      return () => subscription.unsubscribe();
    };

    initAuth();
  }, []);

  return { user, loading };
}
