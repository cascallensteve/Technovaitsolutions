import { authService } from './authService'

function getApiBase(): string {
  const envBase = (import.meta as any)?.env?.VITE_API_BASE || (import.meta as any)?.env?.VITE_API_URL
  if (!envBase) return 'https://technova-backend-drab.vercel.app/api'
  const trimmed = String(envBase).replace(/\/$/, '')
  return trimmed.endsWith('/api') ? trimmed : `${trimmed}/api`
}

const API_BASE = getApiBase()
const PROJECTS_BASE = `${API_BASE}/projects`

export type ProjectStatus = 'pending' | 'ongoing' | 'completed' | 'on_hold' | 'cancelled' | string

export type Project = {
  id?: number
  title: string
  slug?: string
  client_name?: string
  client_email?: string
  client_phone?: string
  description?: string
  category?: string
  status?: ProjectStatus
  progress?: number
  currency?: string
  total_amount?: string | number
  amount_paid?: string | number
  amount_pending?: string | number
  balance?: string | number
  start_date?: string | null
  due_date?: string | null
  completed_at?: string | null
  is_published?: boolean
  created_at?: string
  updated_at?: string
}

export type ProjectPayload = Partial<Project>

async function parseJsonSafe(res: Response) {
  const ct = res.headers.get('content-type') || ''
  return ct.includes('application/json') ? res.json() : res.text()
}

async function fetchWithTimeout(url: string, options: RequestInit = {}, timeoutMs = 15000) {
  const controller = new AbortController()
  const id = setTimeout(() => controller.abort(), timeoutMs)
  try {
    return await fetch(url, { ...options, signal: controller.signal })
  } finally {
    clearTimeout(id)
  }
}

async function request(url: string, options: RequestInit = {}, { retries = 2, backoffMs = 800, timeoutMs = 15000 } = {}) {
  let lastErr: any
  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      return await fetchWithTimeout(url, options, timeoutMs)
    } catch (err: any) {
      lastErr = err
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

function extractErrorMessage(data: unknown, fallback: string) {
  if (!data) return fallback
  if (typeof data === 'string') return data || fallback
  const maybe: any = data
  const msg = maybe?.message || maybe?.error || maybe?.detail
  if (typeof msg === 'string' && msg.trim()) return msg
  if (maybe?.errors && typeof maybe.errors === 'object') {
    const errorMessages = Object.entries(maybe.errors)
      .map(([field, errors]) => {
        const fieldErrors = Array.isArray(errors) ? errors : [errors]
        return `${field}: ${fieldErrors.join(', ')}`
      })
      .join('; ')
    if (errorMessages) return errorMessages
  }
  try {
    return JSON.stringify(data)
  } catch {
    return fallback
  }
}

function normalizeListResponse(data: unknown): any[] {
  if (Array.isArray(data)) return data
  const maybe = data as any
  if (maybe?.success && Array.isArray(maybe?.data)) return maybe.data
  if (Array.isArray(maybe?.data)) return maybe.data
  if (Array.isArray(maybe?.results)) return maybe.results
  return []
}

function getAdminToken(): string | null {
  return (typeof window !== 'undefined')
    ? (localStorage.getItem('adminToken') || localStorage.getItem('authToken'))
    : authService.getToken()
}

function unwrapData(data: unknown): any {
  const maybe: any = data
  if (maybe?.success && maybe?.data !== undefined) return maybe.data
  return data
}

function adminHeaders(token: string) {
  return {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  }
}

// ---------------------------------------------------------------------------
// Public endpoints
// ---------------------------------------------------------------------------

export async function listPublicProjects(params: { status?: string; search?: string } = {}) {
  const sp = new URLSearchParams()
  if (params.status) sp.set('status', params.status)
  if (params.search) sp.set('search', params.search)

  const url = `${PROJECTS_BASE}/${sp.toString() ? `?${sp.toString()}` : ''}`
  const res = await request(url, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  })
  const data = await parseJsonSafe(res)
  if (!res.ok) {
    throw new Error(`${extractErrorMessage(data, 'Failed to load projects')} (HTTP ${res.status})`)
  }
  return normalizeListResponse(data) as Project[]
}

// ---------------------------------------------------------------------------
// Admin endpoints
// ---------------------------------------------------------------------------

export async function listAdminProjects(params: { status?: string; search?: string } = {}) {
  const token = getAdminToken()
  if (!token) throw new Error('Access denied. Admin session required.')

  const sp = new URLSearchParams()
  if (params.status) sp.set('status', params.status)
  if (params.search) sp.set('search', params.search)

  const url = `${PROJECTS_BASE}/admin/projects/${sp.toString() ? `?${sp.toString()}` : ''}`
  const res = await request(url, {
    method: 'GET',
    headers: adminHeaders(token),
    credentials: 'include',
  })
  const data = await parseJsonSafe(res)
  if (!res.ok) {
    throw new Error(`${extractErrorMessage(data, 'Failed to load projects')} (HTTP ${res.status})`)
  }
  return normalizeListResponse(data) as Project[]
}

export async function createProject(payload: ProjectPayload) {
  const token = getAdminToken()
  if (!token) throw new Error('Access denied. Admin session required.')

  const url = `${PROJECTS_BASE}/admin/projects/`
  const res = await request(url, {
    method: 'POST',
    headers: adminHeaders(token),
    body: JSON.stringify(payload),
    credentials: 'include',
  })
  const data = await parseJsonSafe(res)
  if (!res.ok) {
    throw new Error(`${extractErrorMessage(data, 'Failed to create project')} (HTTP ${res.status})`)
  }
  return unwrapData(data) as Project
}

export async function updateProject(id: number, payload: ProjectPayload) {
  const token = getAdminToken()
  if (!token) throw new Error('Access denied. Admin session required.')

  const url = `${PROJECTS_BASE}/admin/projects/${id}/`
  const res = await request(url, {
    method: 'PATCH',
    headers: adminHeaders(token),
    body: JSON.stringify(payload),
    credentials: 'include',
  })
  const data = await parseJsonSafe(res)
  if (!res.ok) {
    throw new Error(`${extractErrorMessage(data, 'Failed to update project')} (HTTP ${res.status})`)
  }
  return unwrapData(data) as Project
}

export async function updateProjectStatus(id: number, status: ProjectStatus) {
  return updateProject(id, { status })
}

export async function updateProjectPayments(
  id: number,
  payload: { total_amount?: string | number; amount_paid?: string | number }
) {
  return updateProject(id, payload)
}

export async function deleteProject(id: number) {
  const token = getAdminToken()
  if (!token) throw new Error('Access denied. Admin session required.')

  const url = `${PROJECTS_BASE}/admin/projects/${id}/`
  const res = await request(url, {
    method: 'DELETE',
    headers: adminHeaders(token),
    credentials: 'include',
  })
  const data = await parseJsonSafe(res)
  if (!res.ok) {
    throw new Error(`${extractErrorMessage(data, 'Failed to delete project')} (HTTP ${res.status})`)
  }
  return data
}
