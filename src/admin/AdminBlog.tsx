import { useEffect, useMemo, useState } from 'react'
import { createPost, deletePost, listAdminPosts, updatePost, type BlogPostApi } from '../services/blogService'
import { uploadImageToCloudinary } from '../services/cloudinaryService'
import { listTeamMembers, type TeamMember } from '../services/teamService'

type FormState = {
  id?: number
  slug?: string
  slugInput: string
  title: string
  excerpt: string
  content: string
  author_member_id?: number
  author: string
  publish_date: string
  read_time: string
  category: string
  tags: string
  image: string
  featured: boolean
  is_published: boolean
}

const emptyForm: FormState = {
  slugInput: '',
  title: '',
  excerpt: '',
  content: '',
  author_member_id: undefined,
  author: 'Technova',
  publish_date: new Date().toISOString().slice(0, 10),
  read_time: '5 min read',
  category: 'General',
  tags: '',
  image: '',
  featured: false,
  is_published: true,
}

function toForm(p?: BlogPostApi | null): FormState {
  if (!p) return { ...emptyForm }
  return {
    id: p.id,
    slug: p.slug,
    slugInput: p.slug || '',
    title: p.title || '',
    excerpt: p.excerpt || '',
    content: p.content || '',
    author_member_id: (p as any)?.author_member_id,
    author: p.author || 'Technova',
    publish_date: p.publish_date || new Date().toISOString().slice(0, 10),
    read_time: p.read_time || '—',
    category: p.category || 'General',
    tags: Array.isArray(p.tags) ? p.tags.join(', ') : '',
    image: p.image || '',
    featured: Boolean(p.featured),
    is_published: (p as any)?.is_published !== false,
  }
}

function parseTags(input: string): string[] {
  const items = input
    .split(',')
    .map(s => s.trim())
    .filter(Boolean)
  return Array.from(new Set(items))
}

function slugify(input: string) {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

const AdminBlog = () => {
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [items, setItems] = useState<BlogPostApi[]>([])
  const [authors, setAuthors] = useState<TeamMember[]>([])
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editing, setEditing] = useState<FormState>(() => ({ ...emptyForm }))

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase()
    if (!q) return items
    return items.filter(p => (p.title || '').toLowerCase().includes(q) || (p.excerpt || '').toLowerCase().includes(q))
  }, [items, search])

  const fetchData = async () => {
    setLoading(true)
    setError('')
    setSuccess('')
    try {
      const [posts, team] = await Promise.all([
        listAdminPosts({ search: search.trim() || undefined }),
        listTeamMembers(),
      ])
      setItems(Array.isArray(posts) ? posts : [])
      setAuthors(Array.isArray(team) ? team : [])
    } catch (e: any) {
      setError(e instanceof Error ? e.message : 'Failed to load posts')
      setItems([])
      setAuthors([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const openCreate = () => {
    setError('')
    setSuccess('')
    setEditing({ ...emptyForm })
    setIsFormOpen(true)
  }

  const openEdit = (p: BlogPostApi) => {
    setError('')
    setSuccess('')
    setEditing(toForm(p))
    setIsFormOpen(true)
  }

  const closeForm = () => {
    if (saving || uploading) return
    setIsFormOpen(false)
  }

  const handleUpload = async (file?: File | null) => {
    if (!file) return
    if (!file.type.startsWith('image/')) {
      setError('Please select an image file')
      return
    }
    if (file.size > 6 * 1024 * 1024) {
      setError('Image must be 6MB or smaller')
      return
    }
    setError('')
    setSuccess('')
    setUploading(true)
    try {
      const { imageUrl } = await uploadImageToCloudinary(file)
      setEditing(prev => ({ ...prev, image: imageUrl }))
      setSuccess('Image uploaded')
    } catch (e: any) {
      setError(e instanceof Error ? e.message : 'Upload failed')
    } finally {
      setUploading(false)
    }
  }

  const handleSave = async () => {
    setError('')
    setSuccess('')
    setSaving(true)
    try {
      const title = editing.title.trim()
      const excerpt = editing.excerpt.trim()
      const content = editing.content.trim()
      if (!title || !excerpt || !content) {
        setError('Please fill in Title, Excerpt and Content')
        setSaving(false)
        return
      }

      if (excerpt.length > 500) {
        setError('Excerpt must be 500 characters or less')
        setSaving(false)
        return
      }

      const author_member_id = editing.author_member_id || undefined
      const author = (editing.author || '').trim()
      if (!author_member_id && !author) {
        setError('Please select an Author (team member) or type an Author name')
        setSaving(false)
        return
      }

      const payload = {
        slug: (((editing as any)?.slugInput || '').trim() || slugify(title)),
        title,
        excerpt,
        content,
        author_member_id,
        author: author_member_id ? undefined : author,
        publish_date: editing.publish_date || undefined,
        read_time: editing.read_time || undefined,
        category: editing.category || undefined,
        tags: parseTags((editing as any)?.tags || ''),
        image: editing.image || undefined,
        featured: Boolean(editing.featured),
        is_published: Boolean(editing.is_published),
      }

      if (editing.id) {
        await updatePost(editing.id, payload)
        setSuccess('Post updated')
      } else {
        await createPost(payload)
        setSuccess('Post created')
      }

      setIsFormOpen(false)
      await fetchData()
    } catch (e: any) {
      setError(e instanceof Error ? e.message : 'Save failed')
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (p: BlogPostApi) => {
    const ok = window.confirm(`Delete "${p.title}"? This cannot be undone.`)
    if (!ok) return
    setError('')
    setSuccess('')
    try {
      await deletePost(p.slug)
      setItems(prev => prev.filter(x => x.slug !== p.slug))
      setSuccess('Post deleted')
    } catch (e: any) {
      setError(e instanceof Error ? e.message : 'Delete failed')
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-neutral-900">Blog</h2>
        <a href="/blog" className="px-4 py-2 rounded-lg bg-green-600 text-white text-sm font-medium hover:bg-green-700">View Public Blog</a>
      </div>

      {error && (
        <div className="rounded-md bg-red-50 border border-red-200 p-3 text-red-700 text-sm">{error}</div>
      )}

      {success && (
        <div className="rounded-md bg-emerald-50 border border-emerald-200 p-3 text-emerald-700 text-sm">{success}</div>
      )}

      <div className="bg-white rounded-xl border border-neutral-200 p-4">
        <div className="flex flex-col md:flex-row md:items-center gap-3">
          <div className="flex-1">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search posts..."
              className="w-full px-3 py-2 rounded-lg border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={fetchData}
              disabled={loading || saving || uploading}
              className="px-4 py-2 rounded-lg border border-neutral-300 text-sm font-medium hover:bg-neutral-50 disabled:opacity-50"
            >
              {loading ? 'Refreshing…' : 'Refresh'}
            </button>
            {!isFormOpen && (
              <button
                onClick={openCreate}
                className="px-4 py-2 rounded-lg bg-green-600 text-white text-sm font-medium hover:bg-green-700"
              >
                New Post
              </button>
            )}
          </div>
        </div>
      </div>

      {!isFormOpen && (
        <div className="bg-white rounded-xl border border-neutral-200 overflow-hidden">
          <div className="grid grid-cols-12 gap-0 text-sm md:text-base font-semibold bg-neutral-50 border-b border-neutral-200">
            <div className="col-span-8 px-5 py-4 text-neutral-700">Post</div>
            <div className="col-span-2 px-5 py-4 text-neutral-700">Status</div>
            <div className="col-span-2 px-5 py-4 text-neutral-700 text-right">Actions</div>
          </div>
          <div className="divide-y divide-neutral-200">
            {filtered.map(p => (
              <div key={p.slug} className="grid grid-cols-12 text-sm md:text-[15px]">
                <div className="col-span-8 px-5 py-5">
                  <div className="flex gap-4">
                    <div className="h-20 w-20 rounded-2xl bg-neutral-100 border border-neutral-200 overflow-hidden flex items-center justify-center shrink-0">
                      {(p as any)?.image ? (
                        <img src={(p as any).image} alt={p.title} className="h-full w-full object-cover" />
                      ) : (
                        <svg className="h-6 w-6 text-neutral-400" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5h16v14H4V5zm3 10l2.5-3 2 2.5L15 10l5 7H4l3-2z"/></svg>
                      )}
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-4">
                        <div className="min-w-0">
                          <div className="text-base md:text-lg font-semibold text-neutral-900 truncate">{p.title}</div>
                          <div className="text-xs text-neutral-500 truncate">/{p.slug}</div>
                        </div>
                        <div className="hidden lg:flex items-center gap-2 text-xs text-neutral-600 shrink-0">
                          <span className="inline-flex items-center px-2 py-1 rounded-full bg-neutral-100 text-neutral-700 border border-neutral-200">
                            {(p as any)?.category || 'General'}
                          </span>
                          {(p as any)?.publish_date && (
                            <span className="text-neutral-500">{(p as any).publish_date}</span>
                          )}
                        </div>
                      </div>

                      <div className="mt-3 flex flex-wrap items-center gap-3">
                        <div className="inline-flex items-center gap-2">
                          <div className="h-9 w-9 rounded-full bg-neutral-100 border border-neutral-200 overflow-hidden flex items-center justify-center">
                            {(p as any)?.author_image ? (
                              <img src={(p as any).author_image} alt={(p as any)?.author || 'Author'} className="h-full w-full object-cover" />
                            ) : (
                              <span className="text-[10px] font-semibold text-neutral-600">AU</span>
                            )}
                          </div>
                          <span className="text-sm text-neutral-800 font-semibold truncate max-w-[240px]">
                            {(p as any)?.author || 'Technova'}
                          </span>
                        </div>

                        {Array.isArray((p as any)?.tags) && (p as any).tags.length > 0 && (
                          <div className="flex flex-wrap gap-1">
                            {(p as any).tags.slice(0, 3).map((t: string) => (
                              <span key={t} className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] bg-blue-50 text-blue-700 border border-blue-100">
                                {t}
                              </span>
                            ))}
                            {(p as any).tags.length > 3 && (
                              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] bg-neutral-100 text-neutral-600 border border-neutral-200">
                                +{(p as any).tags.length - 3}
                              </span>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-span-2 px-5 py-5">
                  <div className="flex flex-col gap-2">
                    {(p as any)?.is_published ? (
                      <span className="inline-flex w-fit items-center px-3 py-1.5 rounded-full text-sm font-semibold bg-green-100 text-green-700">Published</span>
                    ) : (
                      <span className="inline-flex w-fit items-center px-3 py-1.5 rounded-full text-sm font-semibold bg-yellow-100 text-yellow-700">Draft</span>
                    )}
                    {(p as any)?.featured && (
                      <span className="inline-flex w-fit items-center px-3 py-1.5 rounded-full text-sm font-semibold bg-purple-100 text-purple-700">Featured</span>
                    )}
                  </div>
                </div>

                <div className="col-span-2 px-5 py-5">
                  <div className="flex gap-2 justify-end">
                    <button
                      onClick={() => openEdit(p)}
                      disabled={saving || uploading}
                      className="px-4 py-2 rounded-lg border border-neutral-300 hover:bg-neutral-50 disabled:opacity-50"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(p)}
                      disabled={saving || uploading}
                      className="px-4 py-2 rounded-lg border border-red-200 text-red-700 hover:bg-red-50 disabled:opacity-50"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
            {!loading && filtered.length === 0 && (
              <div className="px-4 py-8 text-center text-neutral-600 text-sm">No posts found.</div>
            )}
          </div>
        </div>
      )}

      {isFormOpen && (
        <div className="bg-white rounded-2xl border border-neutral-200 shadow-sm overflow-hidden">
          <div className="px-5 py-4 border-b border-neutral-200 flex items-center justify-between">
            <button
              onClick={closeForm}
              disabled={saving || uploading}
              className="inline-flex items-center gap-2 text-sm font-semibold text-neutral-800 hover:text-neutral-900 disabled:opacity-50"
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 18l-6-6 6-6"/></svg>
              Back to posts
            </button>
            <p className="text-base font-semibold text-neutral-900">{editing.slug ? 'Edit post' : 'New post'}</p>
            <div className="w-[110px]" />
          </div>

          <div className="p-5 grid gap-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">Title</label>
                <input
                  value={editing.title}
                  onChange={e => {
                    const nextTitle = e.target.value
                    setEditing(prev => {
                      const next: FormState = { ...prev, title: nextTitle }
                      if (!prev.slug && !(((prev as any)?.slugInput || '').trim())) {
                        next.slugInput = slugify(nextTitle)
                      }
                      return next
                    })
                  }}
                  className="w-full rounded-lg border border-neutral-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-600"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">Slug</label>
                <input
                  value={editing.slugInput}
                  onChange={e => setEditing(prev => ({ ...prev, slugInput: e.target.value }))}
                  className="w-full rounded-lg border border-neutral-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-600"
                  placeholder="my-first-post"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">Category</label>
              <input
                value={editing.category}
                onChange={e => setEditing(prev => ({ ...prev, category: e.target.value }))}
                className="w-full rounded-lg border border-neutral-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-600"
                placeholder="AI"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">
                Excerpt 
                <span className={`ml-2 text-xs ${editing.excerpt.length > 500 ? 'text-red-600' : 'text-neutral-500'}`}>
                  {editing.excerpt.length}/500 characters
                </span>
              </label>
              <textarea
                value={editing.excerpt}
                onChange={e => setEditing(prev => ({ ...prev, excerpt: e.target.value }))}
                className={`w-full rounded-lg border px-3 py-2 min-h-[90px] focus:outline-none focus:ring-2 focus:ring-green-600 ${
                  editing.excerpt.length > 500 ? 'border-red-300 bg-red-50' : 'border-neutral-300'
                }`}
                maxLength={500}
              />
              {editing.excerpt.length > 500 && (
                <p className="mt-1 text-xs text-red-600">Excerpt must be 500 characters or less</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">Content (HTML)</label>
              <textarea
                value={editing.content}
                onChange={e => setEditing(prev => ({ ...prev, content: e.target.value }))}
                className="w-full rounded-lg border border-neutral-300 px-3 py-2 min-h-[220px] font-mono text-sm focus:outline-none focus:ring-2 focus:ring-green-600"
                placeholder="<p>...</p>"
              />
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">Publish date</label>
                <input
                  type="date"
                  value={editing.publish_date}
                  onChange={e => setEditing(prev => ({ ...prev, publish_date: e.target.value }))}
                  className="w-full rounded-lg border border-neutral-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-600"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">Read time</label>
                <input
                  value={editing.read_time}
                  onChange={e => setEditing(prev => ({ ...prev, read_time: e.target.value }))}
                  className="w-full rounded-lg border border-neutral-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-600"
                  placeholder="5 min read"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">Author (Team member)</label>
                <select
                  value={editing.author_member_id ?? ''}
                  onChange={e => setEditing(prev => ({ ...prev, author_member_id: e.target.value ? Number(e.target.value) : undefined }))}
                  className="w-full rounded-lg border border-neutral-300 px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-green-600"
                >
                  <option value="">(Optional) Select author</option>
                  {authors
                    .filter(a => (a as any)?.is_active !== false)
                    .map(a => (
                      <option key={a.id || a.name} value={a.id}>{a.name}</option>
                    ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">Author name (if not using team member)</label>
              <input
                value={editing.author}
                onChange={e => setEditing(prev => ({ ...prev, author: e.target.value }))}
                disabled={Boolean(editing.author_member_id)}
                className="w-full rounded-lg border border-neutral-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-600 disabled:bg-neutral-50 disabled:text-neutral-500"
                placeholder="Technova"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">Tags (comma separated)</label>
              <input
                value={editing.tags}
                onChange={e => setEditing(prev => ({ ...prev, tags: e.target.value }))}
                className="w-full rounded-lg border border-neutral-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-600"
                placeholder="python, django"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">Cover image</label>
              <div className="grid gap-3 md:grid-cols-2">
                <div className="rounded-xl border border-neutral-200 bg-neutral-50 p-3">
                  <div className="flex items-start gap-3">
                    <div className="h-16 w-16 rounded-xl bg-white border border-neutral-200 overflow-hidden flex items-center justify-center">
                      {editing.image ? (
                        <img src={editing.image} alt="cover" className="h-full w-full object-cover" />
                      ) : (
                        <span className="text-xs text-neutral-500">No image</span>
                      )}
                    </div>
                    <div className="flex-1">
                      <label className="block text-xs font-semibold text-neutral-700">Image URL</label>
                      <input
                        value={editing.image}
                        onChange={e => setEditing(prev => ({ ...prev, image: e.target.value }))}
                        className="mt-1 w-full rounded-lg border border-neutral-300 px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-green-600"
                        placeholder="https://..."
                      />
                      {editing.image && (
                        <button
                          type="button"
                          onClick={() => setEditing(prev => ({ ...prev, image: '' }))}
                          disabled={uploading || saving}
                          className="mt-2 text-xs font-semibold text-red-700 hover:text-red-800 disabled:opacity-50"
                        >
                          Remove image
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                <div className="rounded-xl border border-neutral-200 bg-white p-3">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="text-sm font-semibold text-neutral-900">Upload to Cloudinary</p>
                      <p className="text-xs text-neutral-600">PNG/JPG/WebP, up to 6MB</p>
                    </div>
                    <label className={`inline-flex items-center justify-center px-4 py-2 rounded-lg text-sm font-semibold border ${uploading ? 'bg-neutral-100 text-neutral-500 border-neutral-200' : 'bg-green-600 text-white border-green-600 hover:bg-green-700'}`}>
                      {uploading ? 'Uploading…' : 'Choose image'}
                      <input
                        type="file"
                        accept="image/*"
                        onChange={e => handleUpload(e.target.files?.[0] || null)}
                        className="hidden"
                        disabled={uploading}
                      />
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-4">
              <label className="inline-flex items-center gap-2 text-sm text-neutral-700">
                <input
                  type="checkbox"
                  checked={editing.featured}
                  onChange={e => setEditing(prev => ({ ...prev, featured: e.target.checked }))}
                  className="h-4 w-4 rounded border-neutral-300"
                />
                Featured
              </label>
              <label className="inline-flex items-center gap-2 text-sm text-neutral-700">
                <input
                  type="checkbox"
                  checked={editing.is_published}
                  onChange={e => setEditing(prev => ({ ...prev, is_published: e.target.checked }))}
                  className="h-4 w-4 rounded border-neutral-300"
                />
                Published
              </label>
            </div>
          </div>

          <div className="px-5 py-4 border-t border-neutral-200 flex items-center justify-end gap-3">
            <button
              onClick={closeForm}
              disabled={saving || uploading}
              className="px-4 py-2 rounded-lg border border-neutral-300 hover:bg-neutral-50 disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={saving || uploading}
              className="px-4 py-2 rounded-lg bg-green-600 text-white font-semibold hover:bg-green-700 disabled:opacity-50"
            >
              {saving ? 'Saving…' : 'Save'}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AdminBlog
