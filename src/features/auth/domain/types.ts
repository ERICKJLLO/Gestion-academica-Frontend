export type User = { id: string; email: string; fullName: string; role: 'ADMIN' | 'USER' };
export type AuthResponse = { user: User; token: string };
