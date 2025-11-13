// Agreements service: list, get, create, update status, delete
// Mirrors patterns from authService.ts and contact.js

const API_BASE = (import.meta as any)?.env?.VITE_API_BASE || 'https://technova-backend-drab.vercel.app/'

export interface Agreement {
  id: number
  title: string
  client: string
  status: 'active' | 'draft' | 'archived' | string
  file_url?: string
  file_public_id?: string
  file_mime?: string
  uploaded_by?: number
  created_at?: string
  updated_at?: string
}

export interface AgreementCreate {
  title: string
  client: string
  // Either attach a File/Blob or pass a pre-hosted file_url + file_mime + file_public_id
  file?: File | Blob
  file_url?: string
  file_mime?: string
  file_public_id?: string
  status?: Agreement['status']
}

export interface AgreementUpdateStatus {
  status: Agreement['status']
}

async function parseJsonSafe(res: Response): Promise<any> {
  const ct = res.headers.get('content-type') || ''
  if (ct.includes('application/json')) return res.json()
  const text = await res.text()
  try { return JSON.parse(text) } catch { return { message: text } }
}

function getAuthHeader(): Record<string, string> {
  if (typeof window === 'undefined') return {}
  const token = localStorage.getItem('authToken') || localStorage.getItem('adminToken')
  return token ? { Authorization: `Bearer ${token}` } : {}
}

export const agreementsService = {
  async list(): Promise<Agreement[]> {
    const res = await fetch(`${API_BASE}/api/agreements/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeader(),
      },
      credentials: 'include',
    })
    const data = await parseJsonSafe(res)
    if (!res.ok) {
      const msg = (data && (data.message || data.error)) || 'Failed to load agreements'
      throw new Error(msg)
    }
    return Array.isArray(data) ? data : (data && data.results) || []
  },

  async getById(id: number): Promise<Agreement> {
    const res = await fetch(`${API_BASE}/api/agreements/${id}/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeader(),
      },
      credentials: 'include',
    })
    const data = await parseJsonSafe(res)
    if (!res.ok) {
      const msg = (data && (data.message || data.error)) || 'Failed to load agreement'
      throw new Error(msg)
    }
    return data as Agreement
  },

  async create(payload: AgreementCreate): Promise<Agreement> {
    // If a file is provided, send multipart/form-data; otherwise JSON
    let body: BodyInit
    let headers: Record<string, string> = { ...getAuthHeader() }

    if (payload.file) {
      const form = new FormData()
      form.append('title', payload.title)
      form.append('client', payload.client)
      if (payload.status) form.append('status', String(payload.status))
      form.append('file', payload.file)
      if (payload.file_mime) form.append('file_mime', payload.file_mime)
      if (payload.file_public_id) form.append('file_public_id', payload.file_public_id)
      body = form
      // Do NOT set Content-Type manually for multipart; browser sets boundary
    } else {
      headers['Content-Type'] = 'application/json'
      body = JSON.stringify({
        title: payload.title,
        client: payload.client,
        status: payload.status,
        file_url: payload.file_url,
        file_mime: payload.file_mime,
        file_public_id: payload.file_public_id,
      })
    }

    const res = await fetch(`${API_BASE}/api/agreements/`, {
      method: 'POST',
      headers,
      body,
      credentials: 'include',
    })

    const data = await parseJsonSafe(res)
    if (!res.ok) {
      const msg = (data && (data.message || data.error)) || 'Failed to create agreement'
      throw new Error(msg)
    }
    return data as Agreement
  },

  async updateStatus(id: number, update: AgreementUpdateStatus): Promise<Agreement> {
    const res = await fetch(`${API_BASE}/api/agreements/${id}/`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeader(),
      },
      body: JSON.stringify(update),
      credentials: 'include',
    })
    const data = await parseJsonSafe(res)
    if (!res.ok) {
      const msg = (data && (data.message || data.error)) || 'Failed to update agreement'
      throw new Error(msg)
    }
    return data as Agreement
  },

  async remove(id: number): Promise<{ success: boolean; message?: string }> {
    const res = await fetch(`${API_BASE}/api/agreements/${id}/`, {
      method: 'DELETE',
      headers: {
        ...getAuthHeader(),
      },
      credentials: 'include',
    })
    if (res.status === 204) return { success: true }
    const data = await parseJsonSafe(res)
    if (!res.ok) {
      const msg = (data && (data.message || data.error)) || 'Failed to delete agreement'
      throw new Error(msg)
    }
    return { success: true, message: data?.message }
  },
}

export default agreementsService
