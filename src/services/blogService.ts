type BlogPostApi = {
  id: number
  title: string
  slug: string
  excerpt: string
  content: string
  author_member_id?: number
  author?: string
  author_role?: string
  author_image?: string
  publish_date?: string
  read_time?: string
  category?: string
  tags?: string[]
  image?: string
  featured?: boolean
  is_published?: boolean
}

function getAdminToken(): string | null {
  if (typeof window === 'undefined') return null
  return localStorage.getItem('adminToken') || localStorage.getItem('authToken')
}

function getApiBase(): string {
  const envBase = (import.meta as any)?.env?.VITE_API_BASE || (import.meta as any)?.env?.VITE_API_URL
  if (!envBase) return 'https://technova-backend-drab.vercel.app/api'
  const trimmed = String(envBase).replace(/\/$/, '')
  return trimmed.endsWith('/api') ? trimmed : `${trimmed}/api`
}

const API_BASE = getApiBase()
const BLOG_BASE = `${API_BASE}/blog`

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

async function request(url: string, options: RequestInit = {}, { timeoutMs = 15000 } = {}) {
  return fetchWithTimeout(url, options, timeoutMs)
}

function extractErrorMessage(data: unknown, fallback: string) {
  if (!data) return fallback
  if (typeof data === 'string') return data || fallback
  const maybe: any = data
  const msg = maybe?.message || maybe?.error || maybe?.detail
  if (typeof msg === 'string' && msg.trim()) return msg
  
  // Extract field validation errors
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

function normalizeListResponse(data: unknown): BlogPostApi[] {
  if (Array.isArray(data)) return data as BlogPostApi[]
  const maybe = data as any
  if (maybe?.success && Array.isArray(maybe?.data)) return maybe.data as BlogPostApi[]
  if (Array.isArray(maybe?.results)) return maybe.results as BlogPostApi[]
  if (Array.isArray(maybe?.data)) return maybe.data as BlogPostApi[]
  return []
}

export async function listPosts(params: {
  category?: string
  featured?: boolean
  search?: string
  tag?: string
} = {}) {
  const sp = new URLSearchParams()
  if (params.category) sp.set('category', params.category)
  if (typeof params.featured === 'boolean') sp.set('featured', params.featured ? 'true' : 'false')
  if (params.search) sp.set('search', params.search)
  if (params.tag) sp.set('tag', params.tag)

  const url = `${BLOG_BASE}/posts/${sp.toString() ? `?${sp.toString()}` : ''}`
  console.debug('[blogService] GET', url)

  const res = await request(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })

  const data = await parseJsonSafe(res)
  if (!res.ok) {
    throw new Error(`${extractErrorMessage(data, 'Failed to load blog posts')} (HTTP ${res.status})`)
  }

  return normalizeListResponse(data)
}

export async function retrievePost(slug: string) {
  if (!slug) throw new Error('Missing slug')
  
  // First try with slug (original approach)
  let url = `${BLOG_BASE}/posts/${encodeURIComponent(slug)}/`
  console.debug('[blogService] retrievePost GET (slug)', url, 'slug:', slug)

  try {
    const res = await request(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    const data = await parseJsonSafe(res)
    console.debug('[blogService] retrievePost response (slug):', {
      status: res.status,
      statusText: res.statusText,
      ok: res.ok,
      data: data
    })
    
    if (res.ok) {
      const maybe: any = data
      if (maybe?.success && maybe?.data) return maybe.data as BlogPostApi
      return data as BlogPostApi
    }
  } catch (error) {
    console.log('[blogService] Slug approach failed, trying ID approach')
  }

  // If slug approach fails, try using slug as numeric ID
  const id = parseInt(slug, 10)
  if (!isNaN(id)) {
    url = `${BLOG_BASE}/posts/${id}/`
    console.debug('[blogService] retrievePost GET (id)', url, 'id:', id)

    const res = await request(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    const data = await parseJsonSafe(res)
    console.debug('[blogService] retrievePost response (id):', {
      status: res.status,
      statusText: res.statusText,
      ok: res.ok,
      data: data
    })
    
    if (res.ok) {
      const maybe: any = data
      if (maybe?.success && maybe?.data) return maybe.data as BlogPostApi
      return data as BlogPostApi
    }
    
    const errorMsg = extractErrorMessage(data, 'Post not found')
    console.error('[blogService] retrievePost error (id):', errorMsg, 'URL:', url)
    throw new Error(`${errorMsg} (HTTP ${res.status})`)
  }

  // If neither approach works, try alternative endpoint patterns
  const alternativeUrls = [
    `${BLOG_BASE}/posts?slug=${encodeURIComponent(slug)}`,
    `${BLOG_BASE}/posts/slug/${encodeURIComponent(slug)}/`,
  ]

  for (const altUrl of alternativeUrls) {
    console.debug('[blogService] retrievePost trying alternative URL:', altUrl)
    try {
      const res = await request(altUrl, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      const data = await parseJsonSafe(res)
      console.debug('[blogService] retrievePost alternative response:', {
        status: res.status,
        url: altUrl,
        data: data
      })
      
      if (res.ok) {
        // Handle array response from filter endpoints
        if (Array.isArray(data) && data.length > 0) {
          return data[0] as BlogPostApi
        }
        const maybe: any = data
        if (maybe?.success && maybe?.data) return maybe.data as BlogPostApi
        if (maybe?.results && Array.isArray(maybe.results) && maybe.results.length > 0) {
          return maybe.results[0] as BlogPostApi
        }
        return data as BlogPostApi
      }
    } catch (error) {
      console.log('[blogService] Alternative URL failed:', altUrl, error)
    }
  }

  throw new Error(`Post not found with slug: ${slug}`)
}

export async function listFeaturedPosts() {
  const url = `${BLOG_BASE}/posts/featured/`
  console.debug('[blogService] GET', url)
  const res = await request(url, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  })
  const data = await parseJsonSafe(res)
  if (!res.ok) {
    throw new Error(`${extractErrorMessage(data, 'Failed to load featured posts')} (HTTP ${res.status})`)
  }
  return normalizeListResponse(data)
}

export async function listRecentPosts(limit = 5) {
  const url = `${BLOG_BASE}/posts/recent/?limit=${encodeURIComponent(String(limit))}`
  console.debug('[blogService] GET', url)
  const res = await request(url, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  })
  const data = await parseJsonSafe(res)
  if (!res.ok) {
    throw new Error(`${extractErrorMessage(data, 'Failed to load recent posts')} (HTTP ${res.status})`)
  }
  return normalizeListResponse(data)
}

export async function listCategories() {
  const url = `${BLOG_BASE}/posts/categories/`
  console.debug('[blogService] GET', url)
  const res = await request(url, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  })
  const data = await parseJsonSafe(res)
  if (!res.ok) {
    throw new Error(`${extractErrorMessage(data, 'Failed to load categories')} (HTTP ${res.status})`)
  }
  return Array.isArray(data) ? (data as string[]) : []
}

export async function listAdminPosts(params: {
  category?: string
  featured?: boolean
  search?: string
  tag?: string
} = {}) {
  const token = getAdminToken()
  if (!token) throw new Error('Access denied. Admin session required.')

  const sp = new URLSearchParams()
  if (params.category) sp.set('category', params.category)
  if (typeof params.featured === 'boolean') sp.set('featured', params.featured ? 'true' : 'false')
  if (params.search) sp.set('search', params.search)
  if (params.tag) sp.set('tag', params.tag)

  const url = `${BLOG_BASE}/posts/${sp.toString() ? `?${sp.toString()}` : ''}`
  console.debug('[blogService] GET (admin)', url)

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
    throw new Error(`${extractErrorMessage(data, 'Failed to load blog posts')} (HTTP ${res.status})`)
  }

  return normalizeListResponse(data)
}

export async function createPost(payload: {
  slug?: string
  title: string
  excerpt: string
  content: string
  author_member_id?: number
  author?: string
  author_role?: string
  author_image?: string
  publish_date?: string
  read_time?: string
  category?: string
  tags?: string[]
  image?: string
  featured?: boolean
  is_published?: boolean
}) {
  const token = getAdminToken()
  if (!token) throw new Error('Access denied. Admin session required.')

  // Backend confirmed working create endpoint alias
  const url = `${BLOG_BASE}/posts/addppost/`
  console.debug('[blogService] POST', url, payload)

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
    throw new Error(`${extractErrorMessage(data, 'Failed to create post')} (HTTP ${res.status})`)
  }

  const maybe: any = data
  if (maybe?.success && maybe?.data) return maybe.data as BlogPostApi
  return data as BlogPostApi
}

export async function updatePost(
  id: number,
  payload: Partial<{
    slug?: string
    title: string
    excerpt: string
    content: string
    author_member_id?: number
    author?: string
    author_role?: string
    author_image?: string
    publish_date?: string
    read_time?: string
    category?: string
    tags?: string[]
    image?: string
    featured?: boolean
    is_published?: boolean
  }>
) {
  if (!id) throw new Error('Missing post ID')
  const token = getAdminToken()
  if (!token) throw new Error('Access denied. Admin session required.')

  const url = `${BLOG_BASE}/posts/${id}/`
  console.debug('[blogService] PATCH', url, 'payload:', payload)
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
    const errorMsg = extractErrorMessage(data, 'Failed to update post')
    console.error('[blogService] PATCH error response:', JSON.stringify(data, null, 2))
    console.error('[blogService] PATCH error details:', {
      status: res.status,
      statusText: res.statusText,
      url: url,
      payload: payload
    })
    throw new Error(`${errorMsg} (HTTP ${res.status})`)
  }

  return data as BlogPostApi
}

export async function deletePost(slug: string) {
  if (!slug) throw new Error('Missing slug')
  const token = getAdminToken()
  if (!token) throw new Error('Access denied. Admin session required.')

  const url = `${BLOG_BASE}/posts/${encodeURIComponent(slug)}/`
  console.debug('[blogService] DELETE', url)
  const res = await request(url, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    credentials: 'include',
  })

  const data = await parseJsonSafe(res)
  if (!res.ok) {
    throw new Error(`${extractErrorMessage(data, 'Failed to delete post')} (HTTP ${res.status})`)
  }

  return data
}

export type { BlogPostApi }
