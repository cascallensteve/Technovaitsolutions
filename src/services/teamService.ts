import { authService } from './authService'

function getApiBase(): string {
  const envBase = (import.meta as any)?.env?.VITE_API_BASE || (import.meta as any)?.env?.VITE_API_URL
  if (!envBase) return 'https://technova-backend-drab.vercel.app/api'
  const trimmed = String(envBase).replace(/\/$/, '')
  return trimmed.endsWith('/api') ? trimmed : `${trimmed}/api`
}

const API_BASE = getApiBase()

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

export type TeamMember = {
  id?: number
  name: string
  title: string
  headline?: string
  bio?: string
  core_expertise?: string[]
  image_url?: string
  sort_order?: number
  is_active?: boolean
}

function normalizeListResponse(data: unknown): any[] {
  if (Array.isArray(data)) return data
  const maybe = data as any
  if (Array.isArray(maybe?.data)) return maybe.data
  if (Array.isArray(maybe?.results)) return maybe.results
  return []
}

function getAdminToken(): string | null {
  return (typeof window !== 'undefined')
    ? (localStorage.getItem('adminToken') || localStorage.getItem('authToken'))
    : authService.getToken()
}

export async function listTeamMembers() {
  const token = getAdminToken()
  if (!token) throw new Error('Access denied. Admin session required.')
  const url = `${API_BASE}/team/members/`
  console.debug('[teamService] GET', url)
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
    const msg = (data && (data.message || (data as any).error)) || 'Failed to load team members'
    throw new Error(`${msg} (HTTP ${res.status})`)
  }
  return normalizeListResponse(data)
}

export async function listPublicActiveTeamMembers() {
  const url = `${API_BASE}/team/public/members/`
  console.debug('[teamService] GET (public-active)', url)
  const res = await request(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })

  const data = await parseJsonSafe(res)
  if (!res.ok) {
    const msg = (data && (data.message || (data as any).error)) || 'Failed to load team members'
    throw new Error(`${msg} (HTTP ${res.status})`)
  }
  return normalizeListResponse(data)
}

export async function retrievePublicActiveTeamMember(id: number) {
  if (id == null) throw new Error('Missing team member id')
  const url = `${API_BASE}/team/public/members/${id}/`
  console.debug('[teamService] GET (public-active)', url)
  const res = await request(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })

  const data = await parseJsonSafe(res)
  if (!res.ok) {
    const msg = (data && (data.message || (data as any).error)) || 'Failed to retrieve team member'
    throw new Error(`${msg} (HTTP ${res.status})`)
  }
  return data
}

export async function listPublicTeamMembers() {
  const url = `${API_BASE}/team/members/`
  console.debug('[teamService] GET (public)', url)
  const res = await request(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })

  const data = await parseJsonSafe(res)
  if (!res.ok) {
    const msg = (data && (data.message || (data as any).error)) || 'Failed to load team members'
    throw new Error(`${msg} (HTTP ${res.status})`)
  }
  return normalizeListResponse(data)
}

export async function retrieveTeamMember(id: number) {
  if (id == null) throw new Error('Missing team member id')
  const token = getAdminToken()
  if (!token) throw new Error('Access denied. Admin session required.')
  const res = await request(`${API_BASE}/team/members/${id}/`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    credentials: 'include',
  })

  const data = await parseJsonSafe(res)
  if (!res.ok) {
    const msg = (data && (data.message || (data as any).error)) || 'Failed to retrieve team member'
    throw new Error(msg)
  }
  return data
}

export async function createTeamMember(payload: TeamMember) {
  const token = getAdminToken()
  if (!token) throw new Error('Access denied. Admin session required.')
  const res = await request(`${API_BASE}/team/members/`, {
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
    const msg = (data && (data.message || (data as any).error)) || 'Failed to create team member'
    throw new Error(msg)
  }
  return data
}

export async function updateTeamMember(id: number, payload: Partial<TeamMember>) {
  const token = getAdminToken()
  if (!token) throw new Error('Access denied. Admin session required.')
  const res = await request(`${API_BASE}/team/members/${id}/`, {
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
    const msg = (data && (data.message || (data as any).error)) || 'Failed to update team member'
    throw new Error(msg)
  }
  return data
}

export async function deleteTeamMember(id: number) {
  const token = getAdminToken()
  if (!token) throw new Error('Access denied. Admin session required.')
  const res = await request(`${API_BASE}/team/members/${id}/`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    credentials: 'include',
  })

  const data = await parseJsonSafe(res)
  if (!res.ok) {
    const msg = (data && (data.message || (data as any).error)) || 'Failed to delete team member'
    throw new Error(msg)
  }
  return data
}
