/**
 * Resolves API endpoints against optional VITE_API_URL or VITE_APP_URL.
 * If not set, defaults to relative paths (e.g. '/api/assistant/chat'),
 * which works natively on both the local/container server and Vercel.
 */
export const API_BASE_URL = (
  (import.meta.env.VITE_API_URL as string | undefined) ||
  (import.meta.env.VITE_APP_URL as string | undefined) ||
  ''
).replace(/\/$/, '');

export function getApiUrl(endpoint: string): string {
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  return `${API_BASE_URL}${cleanEndpoint}`;
}
