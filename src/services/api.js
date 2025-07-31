// src/services/api.js
const API_BASE = process.env.REACT_APP_API_BASE;

function getAuthHeaders() {
  const token = localStorage.getItem('authToken');
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export function getClients() {
  return fetch(`${API_BASE}/client`, {
    headers: {
      'Content-Type': 'application/json',
      ...getAuthHeaders()
    }
  })
    .then(res => {
      if (!res.ok) throw new Error(`Error ${res.status}`);
      return res.json();
    });
}

export function createClient(payload) {
  return fetch(`${API_BASE}/client`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...getAuthHeaders() },
    body: JSON.stringify(payload)
  })
    .then(res => {
      if (!res.ok) throw new Error(`Error ${res.status}`);
      return res.json();
    });
}

export function createQuote(payload) {
  return fetch(`${API_BASE}/quotes`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...getAuthHeaders() },
    body: JSON.stringify(payload)
  })
    .then(res => {
      if (!res.ok) throw new Error(`Error ${res.status}`);
      return res.json();
    });
}
