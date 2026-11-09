import type { ApiErrorPayload } from '../domain/api';

const apiHost = (process.env.NEXT_PUBLIC_API_HOST || '').replace(/\/$/, '');
export const TOKEN_KEY = 'focuslab_token';

export class ApiError extends Error {
  constructor(
    public status: number,
    message: string,
  ) {
    super(message);
  }
}

export async function http<T>(path: string, init: RequestInit = {}): Promise<T> {
  if (!apiHost)
    throw new ApiError(0, 'Falta configurar NEXT_PUBLIC_API_HOST para conectar el backend.');
  const headers = new Headers(init.headers);
  if (!(init.body instanceof FormData) && init.body)
    headers.set('Content-Type', 'application/json');
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem(TOKEN_KEY);
    if (token) headers.set('Authorization', `Bearer ${token}`);
  }
  let response: Response;
  try {
    response = await fetch(`${apiHost}${path}`, { ...init, headers, cache: 'no-store' });
  } catch {
    throw new ApiError(
      0,
      'No se pudo conectar con el servidor. Comprueba que la API esté disponible.',
    );
  }
  if (!response.ok) {
    const payload = (await response.json().catch(() => ({}))) as ApiErrorPayload;
    if (response.status === 401 && typeof window !== 'undefined' && !path.includes('/auth/login')) {
      localStorage.removeItem(TOKEN_KEY);
      localStorage.removeItem('focuslab_user');
      window.dispatchEvent(new Event('focuslab-auth-changed'));
      window.location.replace('/login');
    }
    throw new ApiError(
      response.status,
      payload.error || payload.message || `Error ${response.status}`,
    );
  }
  return response.json() as Promise<T>;
}
