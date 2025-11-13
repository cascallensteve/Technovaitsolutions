import { authService } from './authService'
const API_BASE = (import.meta && import.meta.env && import.meta.env.VITE_API_BASE) || 'https://technova-backend-drab.vercel.app/'

async function parseJsonSafe(res) {
  const ct = res.headers.get('content-type') || ''
  return ct.includes('application/json') ? res.json() : res.text()
}

export async function createInquiry(payload) {
  const res = await fetch(`${API_BASE}/api/contact/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
  const data = await parseJsonSafe(res)
  if (!res.ok) {
    const msg = (data && (data.message || data.error)) || 'Failed to submit inquiry'
    throw new Error(msg)
  }
  return data
}

export async function listInquiries() {
  const token = (typeof window !== 'undefined') ? localStorage.getItem('adminToken') : null
  const res = await fetch(`${API_BASE}/api/contact/list/`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  })
  const data = await parseJsonSafe(res)
  if (!res.ok) {
    if (res.status === 401 || res.status === 403) {
      throw new Error('Access denied. Admin session required to view inquiries.')
    }
    const msg = (data && (data.message || data.error)) || 'Failed to load inquiries'
    throw new Error(msg)
  }
  return Array.isArray(data) ? data : (data && data.results) || []
}

export default { createInquiry, listInquiries }
