const API_BASE = process.env.REACT_APP_API_BASE || 'http://localhost:5000/api';

export async function fetchTickets(params = {}){
  const qs = new URLSearchParams(params).toString();
  const res = await fetch(`${API_BASE}/tickets${qs ? `?${qs}` : ''}`);
  if (!res.ok) throw new Error('Failed to fetch tickets');
  return res.json();
}

export async function createTicket(payload){
  const res = await fetch(`${API_BASE}/tickets`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  if (!res.ok) throw new Error('Failed to create ticket');
  return res.json();
}

export async function updateTicketStatus(id, status){
  const res = await fetch(`${API_BASE}/tickets/${id}/status`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ status })
  });
  if (!res.ok) throw new Error('Failed to update status');
  return res.json();
}