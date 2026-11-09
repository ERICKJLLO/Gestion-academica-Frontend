'use client';
import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import type { User, AuthResponse } from '../domain/types';
import { TOKEN_KEY } from '@/src/features/common/services/http';

const USER_KEY = 'focuslab_user';
type AuthContextType = { user: User | null; ready: boolean; save: (auth: AuthResponse) => void; logout: () => void };
const AuthContext = createContext<AuthContextType | undefined>(undefined);

function tokenExpired(token: string): boolean {
  try {
    const payload = JSON.parse(atob(token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/'))) as { exp?: number };
    return typeof payload.exp !== 'number' || payload.exp * 1000 <= Date.now();
  } catch {
    return true;
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user,setUser] = useState<User|null>(null);
  const [ready,setReady] = useState(false);
  useEffect(() => {
    const restore = () => {
      const token = localStorage.getItem(TOKEN_KEY);
      const raw = localStorage.getItem(USER_KEY);
      if (!token || !raw || tokenExpired(token)) {
        localStorage.removeItem(TOKEN_KEY);
        localStorage.removeItem(USER_KEY);
        setUser(null);
      } else {
        try { setUser(JSON.parse(raw) as User); }
        catch { localStorage.removeItem(USER_KEY); setUser(null); }
      }
      setReady(true);
    };
    restore(); window.addEventListener('focuslab-auth-changed',restore);
    window.addEventListener('storage', restore);
    return () => {
      window.removeEventListener('focuslab-auth-changed',restore);
      window.removeEventListener('storage', restore);
    };
  }, []);
  const save = (auth: AuthResponse) => { localStorage.setItem(TOKEN_KEY,auth.token); localStorage.setItem(USER_KEY,JSON.stringify(auth.user)); setUser(auth.user); };
  const logout = () => { localStorage.removeItem(TOKEN_KEY); localStorage.removeItem(USER_KEY); setUser(null); };
  return <AuthContext.Provider value={{user,ready,save,logout}}>{children}</AuthContext.Provider>;
}
export function useAuth() { const value = useContext(AuthContext); if (!value) throw new Error('AuthProvider no encontrado'); return value; }
