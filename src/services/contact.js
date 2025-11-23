import { authService } from './authService'
const API_BASE = (import.meta && import.meta.env && import.meta.env.VITE_API_BASE) || 'https://technova-backend-drab.vercel.app/api'

async function parseJsonSafe(res) {
  const ct = res.headers.get('content-type') || ''
  return ct.includes('application/json') ? res.json() : res.text()
}

// Fetch with timeout and simple retry/backoff for transient network issues
async function fetchWithTimeout(url, options = {}, timeoutMs = 15000) {
  const controller = new AbortController()
  const id = setTimeout(() => controller.abort(), timeoutMs)
  try {
    return await fetch(url, { ...options, signal: controller.signal })
  } finally {
    clearTimeout(id)
  }
}

async function request(url, options = {}, { retries = 2, backoffMs = 800, timeoutMs = 15000 } = {}) {
  let lastErr
  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      return await fetchWithTimeout(url, options, timeoutMs)
    } catch (err) {
      lastErr = err
      // Only retry on abort/network type errors
      const isAbort = err && (err.name === 'AbortError' || err.message?.toLowerCase().includes('aborted'))
      const isNetwork = err && err.message?.toLowerCase().includes('network')
      if (attempt < retries && (isAbort || isNetwork)) {
        await new Promise(r => setTimeout(r, backoffMs * Math.pow(2, attempt)))
        continue
      }
      break
    }
  }
  throw lastErr || new Error('Network request failed')
}

export async function createInquiry(payload) {
  const res = await request(`${API_BASE}/contact/`, {
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
  const token = (typeof window !== 'undefined')
    ? (localStorage.getItem('adminToken') || localStorage.getItem('authToken'))
    : null
  const res = await request(`${API_BASE}/contact/list/`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    credentials: 'include',
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

export async function deleteInquiry(id) {
  if (id == null) throw new Error('Missing inquiry id')
  const token = (typeof window !== 'undefined')
    ? (localStorage.getItem('adminToken') || localStorage.getItem('authToken'))
    : null
  const res = await request(`${API_BASE}/contact/${id}/`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    credentials: 'include',
  })
  const data = await parseJsonSafe(res)
  if (!res.ok) {
    const msg = (data && (data.message || data.error)) || 'Failed to delete inquiry'
    throw new Error(msg)
  }
  return data || { success: true }
}


export default { createInquiry, listInquiries, deleteInquiry }
