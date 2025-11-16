export async function getUser() {
  const { supabase } = await import('./supabase');
  const { data: { user } } = await supabase.auth.getUser();
  return user;
}

export async function isAuthenticated() {
  const user = await getUser();
  return !!user;
}

export function setAuthCookie(token: string) {
  if (typeof window !== 'undefined') {
    document.cookie = `auth-token=${token}; path=/; max-age=604800; SameSite=Lax`;
  }
}

export function getAuthCookie() {
  if (typeof window !== 'undefined') {
    const cookies = document.cookie.split(';');
    const authCookie = cookies.find(cookie => cookie.trim().startsWith('auth-token='));
    return authCookie ? authCookie.split('=')[1] : null;
  }
  return null;
}

export function clearAuthCookie() {
  if (typeof window !== 'undefined') {
    document.cookie = 'auth-token=; path=/; max-age=0';
  }
}
