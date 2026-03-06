type BlogPostApi = {
  id: number
  title: string
  slug: string
  excerpt: string
  content: string
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

function normalizeListResponse(data: unknown): BlogPostApi[] {
  if (Array.isArray(data)) return data as BlogPostApi[]
  const maybe = data as any
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
    const msg = (data && ((data as any).message || (data as any).error)) || 'Failed to load blog posts'
    throw new Error(`${msg} (HTTP ${res.status})`)
  }

  return normalizeListResponse(data)
}

export async function retrievePost(slug: string) {
  if (!slug) throw new Error('Missing slug')
  const url = `${BLOG_BASE}/posts/${encodeURIComponent(slug)}/`
  console.debug('[blogService] GET', url)

  const res = await request(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })

  const data = await parseJsonSafe(res)
  if (!res.ok) {
    const msg = (data && ((data as any).message || (data as any).error)) || 'Failed to load blog post'
    throw new Error(`${msg} (HTTP ${res.status})`)
  }

  return data as BlogPostApi
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
    const msg = (data && ((data as any).message || (data as any).error)) || 'Failed to load featured posts'
    throw new Error(`${msg} (HTTP ${res.status})`)
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
    const msg = (data && ((data as any).message || (data as any).error)) || 'Failed to load recent posts'
    throw new Error(`${msg} (HTTP ${res.status})`)
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
    const msg = (data && ((data as any).message || (data as any).error)) || 'Failed to load categories'
    throw new Error(`${msg} (HTTP ${res.status})`)
  }
  return Array.isArray(data) ? (data as string[]) : []
}

export type { BlogPostApi }
