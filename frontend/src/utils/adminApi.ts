import { API_URL } from '../services/api';

export function getAdminToken(): string | null {
  return localStorage.getItem('adminToken');
}

export function getAdminHeaders(): HeadersInit {
  const token = getAdminToken();
  return {
    'Content-Type': 'application/json',
    ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
  };
}

export async function adminFetch(endpoint: string, options: RequestInit = {}): Promise<Response> {
  const token = getAdminToken();
  
  const headers: HeadersInit = {
    ...(options.headers || {}),
    ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
  };
  
  // Only add Content-Type if not FormData
  if (!(options.body instanceof FormData)) {
    (headers as Record<string, string>)['Content-Type'] = 'application/json';
  }
  
  const baseUrl = API_URL.endsWith('/') ? API_URL.slice(0, -1) : API_URL;
  const path = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  
  // Prevent double /api prefix if API_URL already has it and endpoint also has it
  const finalUrl = (path.startsWith('/api') && baseUrl.endsWith('/api'))
    ? `${baseUrl.slice(0, -4)}${path}`
    : `${baseUrl}${path}`;

  return fetch(finalUrl, {
    ...options,
    headers,
    credentials: 'include',
  });
}
