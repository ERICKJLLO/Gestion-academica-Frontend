import { http } from '@/src/features/common/services/http';
import type { AuthResponse } from '../domain/types';
export const authService = {
  login: (email: string, password: string) =>
    http<AuthResponse>('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    }),
  register: (fullName: string, email: string, password: string) =>
    http<AuthResponse | { id: string; email: string; fullName: string; role: 'USER' }>(
      '/api/auth/register',
      { method: 'POST', body: JSON.stringify({ fullName, email, password }) },
    ),
};
