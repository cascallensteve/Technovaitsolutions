import { useEffect, useMemo, useState } from 'react'
import { createTeamMember, deleteTeamMember, listTeamMembers, updateTeamMember } from '../services/teamService'
import type { TeamMember } from '../services/teamService'
import { uploadImageToCloudinary } from '../services/cloudinaryService'

type FormState = {
  id?: number
  name: string
  title: string
  headline: string
  bio: string
  core_expertise: string
  image_url: string
  sort_order: number
  is_active: boolean
}

const emptyForm: FormState = {
  name: '',
  title: '',
  headline: '',
  bio: '',
  core_expertise: '',
  image_url: '',
  sort_order: 1,
  is_active: true,
}

function toForm(member?: TeamMember | null): FormState {
  if (!member) return { ...emptyForm }
  return {
    id: member.id,
    name: member.name || '',
    title: member.title || '',
    headline: member.headline || '',
    bio: member.bio || '',
    core_expertise: Array.isArray(member.core_expertise) ? member.core_expertise.join(', ') : '',
    image_url: member.image_url || '',
    sort_order: typeof member.sort_order === 'number' ? member.sort_order : 1,
    is_active: typeof member.is_active === 'boolean' ? member.is_active : true,
  }
}

function parseExpertise(input: string): string[] {
  const items = input
    .split(',')
    .map(s => s.trim())
    .filter(Boolean)

  const dedup = Array.from(new Set(items))
  return dedup
}

const AdminTeam = () => {
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [items, setItems] = useState<TeamMember[]>([])
  const [editing, setEditing] = useState<FormState>(() => ({ ...emptyForm }))
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [deletingId, setDeletingId] = useState<number | null>(null)

  const sorted = useMemo(() => {
    const arr = [...items]
    arr.sort((a, b) => (Number(a.sort_order || 0) - Number(b.sort_order || 0)) || String(a.name || '').localeCompare(String(b.name || '')))
    return arr
  }, [items])

  const fetchData = async () => {
    setLoading(true)
    setError('')
    setSuccess('')
    try {
      const data = await listTeamMembers()
      setItems(Array.isArray(data) ? data : [])
    } catch (e: any) {
      setError(e instanceof Error ? e.message : 'Failed to load team members')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const openCreate = () => {
    setError('')
    setSuccess('')
    setEditing({ ...emptyForm })
    setIsFormOpen(true)
  }

  const openEdit = (m: TeamMember) => {
    setError('')
    setSuccess('')
    setEditing(toForm(m))
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
      setEditing(prev => ({ ...prev, image_url: imageUrl }))
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
      const name = editing.name.trim()
      const title = editing.title.trim()
      if (!name || !title) {
        setError('Please fill in Name and Title')
        setSaving(false)
        return
      }

      const order = Number.isFinite(Number(editing.sort_order)) ? Number(editing.sort_order) : 0
      if (order < 0) {
        setError('Sort order must be 0 or greater')
        setSaving(false)
        return
      }

      const payload: TeamMember = {
        name,
        title,
        headline: editing.headline.trim(),
        bio: editing.bio.trim(),
        core_expertise: parseExpertise(editing.core_expertise),
        image_url: editing.image_url.trim() || undefined,
        sort_order: order,
        is_active: Boolean(editing.is_active),
      }

      if (editing.id) {
        await updateTeamMember(editing.id, payload)
        setSuccess('Team member updated')
      } else {
        await createTeamMember(payload)
        setSuccess('Team member created')
      }

      setIsFormOpen(false)
      await fetchData()
    } catch (e: any) {
      setError(e instanceof Error ? e.message : 'Save failed')
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (m: TeamMember) => {
    if (!m.id) return
    const ok = window.confirm(`Delete ${m.name}? This cannot be undone.`)
    if (!ok) return

    setError('')
    setSuccess('')
    setDeletingId(m.id)
    try {
      await deleteTeamMember(m.id)
      setItems(prev => prev.filter(x => x.id !== m.id))
      setSuccess('Team member deleted')
    } catch (e: any) {
      setError(e instanceof Error ? e.message : 'Delete failed')
    } finally {
      setDeletingId(null)
    }
  }

  return (
    <div>
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h2 className="text-xl font-semibold text-neutral-900">Team</h2>
          <p className="text-sm text-neutral-600 mt-1">Create, update, and manage team members shown on the public Team page.</p>
        </div>
        {!isFormOpen && (
          <div className="flex items-center gap-3">
            <button
              onClick={openCreate}
              className="inline-flex items-center px-4 py-2 rounded-lg bg-green-600 text-white text-sm font-semibold hover:bg-green-700"
            >
              Add member
            </button>
          </div>
        )}
      </div>

      {error && (
        <div className="mt-4 rounded-md bg-red-50 border border-red-200 p-3 text-red-700 text-sm">{error}</div>
      )}

      {success && (
        <div className="mt-4 rounded-md bg-emerald-50 border border-emerald-200 p-3 text-emerald-700 text-sm">{success}</div>
      )}

      {!isFormOpen && (
        <div className="mt-6 bg-white rounded-xl border border-neutral-200 shadow-sm overflow-hidden">
          <div className="px-4 py-3 border-b border-neutral-200 flex items-center justify-between">
            <p className="text-sm font-semibold text-neutral-900">Members</p>
            <button
              onClick={fetchData}
              disabled={loading || saving || uploading}
              className="text-sm px-3 py-1.5 rounded-md border border-neutral-300 hover:bg-neutral-50 disabled:opacity-50"
            >
              {loading ? 'Refreshing…' : 'Refresh'}
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="bg-neutral-50 text-neutral-700">
                <tr>
                  <th className="text-left font-semibold px-4 py-3">Name</th>
                  <th className="text-left font-semibold px-4 py-3">Title</th>
                  <th className="text-left font-semibold px-4 py-3">Order</th>
                  <th className="text-left font-semibold px-4 py-3">Status</th>
                  <th className="text-right font-semibold px-4 py-3">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-200">
                {sorted.map(m => (
                  <tr key={m.id || m.name} className="hover:bg-neutral-50">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-lg bg-neutral-100 border border-neutral-200 overflow-hidden flex items-center justify-center">
                          {m.image_url ? (
                            <img src={m.image_url} alt={m.name} className="h-full w-full object-cover" />
                          ) : (
                            <span className="text-xs text-neutral-500">IMG</span>
                          )}
                        </div>
                        <div>
                          <p className="font-semibold text-neutral-900">{m.name}</p>
                          <p className="text-neutral-600 text-xs">ID: {m.id ?? '-'}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-neutral-800">{m.title}</td>
                    <td className="px-4 py-3 text-neutral-800">{m.sort_order ?? '-'}</td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex items-center px-2 py-1 rounded-md border text-xs font-semibold ${m.is_active ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-neutral-100 text-neutral-600 border-neutral-200'}`}>
                        {m.is_active ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => openEdit(m)}
                          disabled={saving || uploading || deletingId != null}
                          className="px-3 py-1.5 rounded-md border border-neutral-300 hover:bg-neutral-50 disabled:opacity-50"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(m)}
                          disabled={saving || uploading || deletingId === m.id}
                          className="px-3 py-1.5 rounded-md border border-red-200 text-red-700 hover:bg-red-50 disabled:opacity-50"
                        >
                          {deletingId === m.id ? 'Deleting…' : 'Delete'}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {!loading && sorted.length === 0 && (
                  <tr>
                    <td colSpan={5} className="px-4 py-8 text-center text-neutral-600">No team members found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {isFormOpen && (
        <div className="mt-6">
          <div className="bg-white rounded-2xl border border-neutral-200 shadow-sm overflow-hidden">
            <div className="px-5 py-4 border-b border-neutral-200 flex items-center justify-between">
              <button
                onClick={closeForm}
                disabled={saving || uploading}
                className="inline-flex items-center gap-2 text-sm font-semibold text-neutral-800 hover:text-neutral-900 disabled:opacity-50"
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 18l-6-6 6-6"/></svg>
                Back to team
              </button>
              <p className="text-base font-semibold text-neutral-900">{editing.id ? 'Edit member' : 'Add member'}</p>
              <div className="w-[110px]" />
            </div>

            <div className="p-5 grid gap-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1">Name</label>
                  <input
                    value={editing.name}
                    onChange={e => setEditing(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full rounded-lg border border-neutral-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-600"
                    placeholder="Billy Josiah Illa"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1">Title</label>
                  <input
                    value={editing.title}
                    onChange={e => setEditing(prev => ({ ...prev, title: e.target.value }))}
                    className="w-full rounded-lg border border-neutral-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-600"
                    placeholder="Backend Engineer"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">Headline</label>
                <textarea
                  value={editing.headline}
                  onChange={e => setEditing(prev => ({ ...prev, headline: e.target.value }))}
                  className="w-full rounded-lg border border-neutral-300 px-3 py-2 min-h-[90px] focus:outline-none focus:ring-2 focus:ring-green-600"
                  placeholder="Short public summary"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">Bio</label>
                <textarea
                  value={editing.bio}
                  onChange={e => setEditing(prev => ({ ...prev, bio: e.target.value }))}
                  className="w-full rounded-lg border border-neutral-300 px-3 py-2 min-h-[90px] focus:outline-none focus:ring-2 focus:ring-green-600"
                  placeholder="Optional"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">Core expertise (comma separated)</label>
                <input
                  value={editing.core_expertise}
                  onChange={e => setEditing(prev => ({ ...prev, core_expertise: e.target.value }))}
                  className="w-full rounded-lg border border-neutral-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-600"
                  placeholder="Node.js, Python, PostgreSQL"
                />
              </div>

              <div className="grid gap-4 md:grid-cols-3">
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1">Sort order</label>
                  <input
                    type="number"
                    value={editing.sort_order}
                    onChange={e => setEditing(prev => ({ ...prev, sort_order: Number(e.target.value) }))}
                    className="w-full rounded-lg border border-neutral-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-600"
                  />
                </div>

                <div className="flex items-end">
                  <label className="inline-flex items-center gap-2 text-sm text-neutral-700">
                    <input
                      type="checkbox"
                      checked={editing.is_active}
                      onChange={e => setEditing(prev => ({ ...prev, is_active: e.target.checked }))}
                      className="h-4 w-4 rounded border-neutral-300"
                    />
                    Active
                  </label>
                </div>

                <div className="flex items-end justify-end">
                  <div className="h-12 w-12 rounded-xl bg-neutral-100 border border-neutral-200 overflow-hidden flex items-center justify-center">
                    {editing.image_url ? (
                      <img src={editing.image_url} alt="preview" className="h-full w-full object-cover" />
                    ) : (
                      <span className="text-xs text-neutral-500">IMG</span>
                    )}
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">Image</label>
                <div className="grid gap-3 md:grid-cols-2">
                  <div className="rounded-xl border border-neutral-200 bg-neutral-50 p-3">
                    <div className="flex items-start gap-3">
                      <div className="h-16 w-16 rounded-xl bg-white border border-neutral-200 overflow-hidden flex items-center justify-center">
                        {editing.image_url ? (
                          <img src={editing.image_url} alt="preview" className="h-full w-full object-cover" />
                        ) : (
                          <span className="text-xs text-neutral-500">No image</span>
                        )}
                      </div>
                      <div className="flex-1">
                        <label className="block text-xs font-semibold text-neutral-700">Image URL</label>
                        <input
                          value={editing.image_url}
                          onChange={e => setEditing(prev => ({ ...prev, image_url: e.target.value }))}
                          className="mt-1 w-full rounded-lg border border-neutral-300 px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-green-600"
                          placeholder="https://..."
                        />
                        {editing.image_url && (
                          <button
                            type="button"
                            onClick={() => setEditing(prev => ({ ...prev, image_url: '' }))}
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
        </div>
      )}
    </div>
  )
}

export default AdminTeam
