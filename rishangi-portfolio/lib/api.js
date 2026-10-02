export const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001';

export async function fetchPortfolioData(endpoint) {
  const response = await fetch(`${API_URL}${endpoint}`, {
    cache: 'no-store',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    return null;
  }

  const payload = await response.json();
  return payload.data || null;
}
