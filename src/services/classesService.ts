import { authService } from './authService'

function getApiBase(): string {
  const envBase = (import.meta as any)?.env?.VITE_API_BASE || (import.meta as any)?.env?.VITE_API_URL
  if (!envBase) return 'https://technova-backend-drab.vercel.app/api'
  const trimmed = String(envBase).replace(/\/$/, '')
  return trimmed.endsWith('/api') ? trimmed : `${trimmed}/api`
}

const API_BASE = getApiBase()
const CLASSES_BASE = `${API_BASE}/classes`

export type TrainingClass = {
  id?: number
  title: string
  slug: string
  description?: string
  short_description?: string
  content?: string
  image?: string
  banner_image?: string
  badge?: string
  features?: string[]
  requirements?: string[]
  price?: string
  duration?: string
  schedule?: string
  location?: string
  instructor?: string
  capacity?: number | null
  start_date?: string | null
  end_date?: string | null
  registration_open?: boolean
  is_published?: boolean
  is_featured?: boolean
  sort_order?: number
  registration_count?: number
  created_at?: string
  updated_at?: string
}

export type ClassRegistration = {
  id?: number
  training_class?: number
  training_class_title?: string
  training_class_slug?: string
  full_name: string
  email: string
  whatsapp: string
  prior_knowledge: 'yes' | 'no' | string
  notes?: string
  status?: 'pending' | 'confirmed' | 'completed' | 'cancelled' | string
  created_at?: string
  updated_at?: string
}

export type ClassRegistrationPayload = {
  full_name: string
  email: string
  whatsapp: string
  prior_knowledge: 'yes' | 'no'
  notes?: string
}

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

// ---------------------------------------------------------------------------
// Public endpoints
// ---------------------------------------------------------------------------

export async function listPublicClasses(params: { featured?: boolean; search?: string } = {}) {
  const sp = new URLSearchParams()
  if (typeof params.featured === 'boolean') sp.set('featured', params.featured ? 'true' : 'false')
  if (params.search) sp.set('search', params.search)

  const url = `${CLASSES_BASE}/${sp.toString() ? `?${sp.toString()}` : ''}`
  const res = await request(url, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  })
  const data = await parseJsonSafe(res)
  if (!res.ok) {
    throw new Error(`${extractErrorMessage(data, 'Failed to load classes')} (HTTP ${res.status})`)
  }
  return normalizeListResponse(data) as TrainingClass[]
}

export async function retrievePublicClass(slug: string) {
  if (!slug) throw new Error('Missing class slug')
  const url = `${CLASSES_BASE}/${encodeURIComponent(slug)}/`
  const res = await request(url, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  })
  const data = await parseJsonSafe(res)
  if (!res.ok) {
    throw new Error(`${extractErrorMessage(data, 'Class not found')} (HTTP ${res.status})`)
  }
  return unwrapData(data) as TrainingClass
}

export async function registerForClass(slug: string, payload: ClassRegistrationPayload) {
  if (!slug) throw new Error('Missing class slug')
  const url = `${CLASSES_BASE}/${encodeURIComponent(slug)}/register/`
  const res = await request(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
  const data = await parseJsonSafe(res)
  if (!res.ok) {
    throw new Error(`${extractErrorMessage(data, 'Registration failed')} (HTTP ${res.status})`)
  }
  return unwrapData(data) as ClassRegistration
}

// ---------------------------------------------------------------------------
// Admin endpoints
// ---------------------------------------------------------------------------

export async function listAdminClasses(params: { search?: string; is_published?: boolean; registration_open?: boolean } = {}) {
  const token = getAdminToken()
  if (!token) throw new Error('Access denied. Admin session required.')

  const sp = new URLSearchParams()
  if (params.search) sp.set('search', params.search)
  if (typeof params.is_published === 'boolean') sp.set('is_published', params.is_published ? 'true' : 'false')
  if (typeof params.registration_open === 'boolean') sp.set('registration_open', params.registration_open ? 'true' : 'false')

  const url = `${CLASSES_BASE}/admin/classes/${sp.toString() ? `?${sp.toString()}` : ''}`
  const res = await request(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    credentials: 'include',
  })
  const data = await parseJsonSafe(res)
  if (!res.ok) {
    throw new Error(`${extractErrorMessage(data, 'Failed to load classes')} (HTTP ${res.status})`)
  }
  return normalizeListResponse(data) as TrainingClass[]
}

export async function createClass(payload: Partial<TrainingClass>) {
  const token = getAdminToken()
  if (!token) throw new Error('Access denied. Admin session required.')

  const url = `${CLASSES_BASE}/admin/classes/`
  const res = await request(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
    credentials: 'include',
  })
  const data = await parseJsonSafe(res)
  if (!res.ok) {
    throw new Error(`${extractErrorMessage(data, 'Failed to create class')} (HTTP ${res.status})`)
  }
  return unwrapData(data) as TrainingClass
}

export async function updateClass(id: number, payload: Partial<TrainingClass>) {
  const token = getAdminToken()
  if (!token) throw new Error('Access denied. Admin session required.')

  const url = `${CLASSES_BASE}/admin/classes/${id}/`
  const res = await request(url, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
    credentials: 'include',
  })
  const data = await parseJsonSafe(res)
  if (!res.ok) {
    throw new Error(`${extractErrorMessage(data, 'Failed to update class')} (HTTP ${res.status})`)
  }
  return unwrapData(data) as TrainingClass
}

export async function deleteClass(id: number) {
  const token = getAdminToken()
  if (!token) throw new Error('Access denied. Admin session required.')

  const url = `${CLASSES_BASE}/admin/classes/${id}/`
  const res = await request(url, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    credentials: 'include',
  })
  const data = await parseJsonSafe(res)
  if (!res.ok) {
    throw new Error(`${extractErrorMessage(data, 'Failed to delete class')} (HTTP ${res.status})`)
  }
  return data
}

export async function listAllRegistrations(params: { training_class?: number; status?: string; search?: string } = {}) {
  const token = getAdminToken()
  if (!token) throw new Error('Access denied. Admin session required.')

  const sp = new URLSearchParams()
  if (params.training_class) sp.set('training_class', String(params.training_class))
  if (params.status) sp.set('status', params.status)
  if (params.search) sp.set('search', params.search)

  const url = `${CLASSES_BASE}/admin/registrations/${sp.toString() ? `?${sp.toString()}` : ''}`
  const res = await request(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    credentials: 'include',
  })
  const data = await parseJsonSafe(res)
  if (!res.ok) {
    throw new Error(`${extractErrorMessage(data, 'Failed to load registrations')} (HTTP ${res.status})`)
  }
  return normalizeListResponse(data) as ClassRegistration[]
}

export async function listClassRegistrations(classId: number) {
  const token = getAdminToken()
  if (!token) throw new Error('Access denied. Admin session required.')

  const url = `${CLASSES_BASE}/admin/classes/${classId}/registrations/`
  const res = await request(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    credentials: 'include',
  })
  const data = await parseJsonSafe(res)
  if (!res.ok) {
    throw new Error(`${extractErrorMessage(data, 'Failed to load registrations')} (HTTP ${res.status})`)
  }
  return normalizeListResponse(data) as ClassRegistration[]
}

export async function updateRegistrationStatus(id: number, payload: { status?: string; notes?: string }) {
  const token = getAdminToken()
  if (!token) throw new Error('Access denied. Admin session required.')

  const url = `${CLASSES_BASE}/admin/registrations/${id}/`
  const res = await request(url, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
    credentials: 'include',
  })
  const data = await parseJsonSafe(res)
  if (!res.ok) {
    throw new Error(`${extractErrorMessage(data, 'Failed to update registration')} (HTTP ${res.status})`)
  }
  return unwrapData(data) as ClassRegistration
}
