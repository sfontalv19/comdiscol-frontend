
const API_BASE = process.env.REACT_APP_API_BASE;

function getAuthHeaders() {
  const token = localStorage.getItem('authToken');
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export async function fetchLatestQuote() {
  const res = await fetch(`${API_BASE}/auth/quotes/latest`, {
    headers: {
      'Content-Type': 'application/json',
      ...getAuthHeaders()
    }
  });
  if (!res.ok) throw new Error(`Error ${res.status}`);
  return res.json();
}

// ← Añade esto:
export async function fetchQuotesList() {
  const res = await fetch(`${API_BASE}/quotes`, {
    headers: {
      'Content-Type': 'application/json',
      ...getAuthHeaders()
    }
  });
  if (!res.ok) throw new Error(`Error ${res.status}`);
  return res.json(); // asume un array de cotizaciones
}