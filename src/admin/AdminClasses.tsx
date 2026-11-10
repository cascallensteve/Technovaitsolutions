import { useEffect, useMemo, useState } from 'react'
import {
  createClass,
  deleteClass,
  listAdminClasses,
  listAllRegistrations,
  updateClass,
  updateRegistrationStatus,
  type ClassRegistration,
  type TrainingClass,
} from '../services/classesService'
import { uploadImageToCloudinary } from '../services/cloudinaryService'

type FormState = {
  id?: number
  title: string
  slug: string
  short_description: string
  description: string
  content: string
  image: string
  banner_image: string
  badge: string
  features: string
  requirements: string
  price: string
  duration: string
  schedule: string
  location: string
  instructor: string
  capacity: string
  start_date: string
  end_date: string
  sort_order: string
  registration_open: boolean
  is_published: boolean
  is_featured: boolean
}

const emptyForm: FormState = {
  title: '',
  slug: '',
  short_description: '',
  description: '',
  content: '',
  image: '',
  banner_image: '',
  badge: 'Certified Training',
  features: '',
  requirements: '',
  price: '',
  duration: '',
  schedule: '',
  location: '',
  instructor: '',
  capacity: '',
  start_date: '',
  end_date: '',
  sort_order: '0',
  registration_open: true,
  is_published: true,
  is_featured: false,
}

function slugify(input: string) {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

function parseList(input: string): string[] {
  const items = input
    .split(',')
    .map(s => s.trim())
    .filter(Boolean)
  return Array.from(new Set(items))
}

function toForm(cls?: TrainingClass | null): FormState {
  if (!cls) return { ...emptyForm }
  return {
    id: cls.id,
    title: cls.title || '',
    slug: cls.slug || '',
    short_description: cls.short_description || '',
    description: cls.description || '',
    content: cls.content || '',
    image: cls.image || '',
    banner_image: cls.banner_image || '',
    badge: cls.badge || 'Certified Training',
    features: Array.isArray(cls.features) ? cls.features.join(', ') : '',
    requirements: Array.isArray(cls.requirements) ? cls.requirements.join(', ') : '',
    price: cls.price || '',
    duration: cls.duration || '',
    schedule: cls.schedule || '',
    location: cls.location || '',
    instructor: cls.instructor || '',
    capacity: cls.capacity != null ? String(cls.capacity) : '',
    start_date: cls.start_date ? String(cls.start_date).slice(0, 10) : '',
    end_date: cls.end_date ? String(cls.end_date).slice(0, 10) : '',
    sort_order: cls.sort_order != null ? String(cls.sort_order) : '0',
    registration_open: cls.registration_open !== false,
    is_published: cls.is_published !== false,
    is_featured: Boolean(cls.is_featured),
  }
}

const STATUS_OPTIONS = ['pending', 'confirmed', 'completed', 'cancelled'] as const

const AdminClasses = () => {
  const [activeTab, setActiveTab] = useState<'classes' | 'registrations'>('classes')
  const [classes, setClasses] = useState<TrainingClass[]>([])
  const [registrations, setRegistrations] = useState<ClassRegistration[]>([])
  const [loadingClasses, setLoadingClasses] = useState(false)
  const [loadingRegistrations, setLoadingRegistrations] = useState(false)
  const [saving, setSaving] = useState(false)
  const [uploading, setUploading] = useState<'' | 'image' | 'banner_image'>('')
  const [deletingId, setDeletingId] = useState<number | null>(null)
  const [updatingStatusId, setUpdatingStatusId] = useState<number | null>(null)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editing, setEditing] = useState<FormState>(() => ({ ...emptyForm }))
  const [regStatusFilter, setRegStatusFilter] = useState('')
  const [regSearch, setRegSearch] = useState('')

  const sortedClasses = useMemo(() => {
    const arr = [...classes]
    arr.sort((a, b) => (Number(a.sort_order || 0) - Number(b.sort_order || 0)) || String(a.title || '').localeCompare(String(b.title || '')))
    return arr
  }, [classes])

  const fetchClasses = async () => {
    setLoadingClasses(true)
    setError('')
    try {
      const data = await listAdminClasses()
      setClasses(Array.isArray(data) ? data : [])
    } catch (e: any) {
      setError(e instanceof Error ? e.message : 'Failed to load classes')
      setClasses([])
    } finally {
      setLoadingClasses(false)
    }
  }

  const fetchRegistrations = async () => {
    setLoadingRegistrations(true)
    setError('')
    try {
      const data = await listAllRegistrations({
        status: regStatusFilter || undefined,
        search: regSearch.trim() || undefined,
      })
      setRegistrations(Array.isArray(data) ? data : [])
    } catch (e: any) {
      setError(e instanceof Error ? e.message : 'Failed to load registrations')
      setRegistrations([])
    } finally {
      setLoadingRegistrations(false)
    }
  }

  useEffect(() => {
    fetchClasses()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (activeTab === 'registrations') {
      fetchRegistrations()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab, regStatusFilter])

  const openCreate = () => {
    setError('')
    setSuccess('')
    setEditing({ ...emptyForm })
    setIsFormOpen(true)
  }

  const openEdit = (cls: TrainingClass) => {
    setError('')
    setSuccess('')
    setEditing(toForm(cls))
    setIsFormOpen(true)
  }

  const closeForm = () => {
    if (saving || uploading) return
    setIsFormOpen(false)
  }

  const handleUpload = async (file: File | null | undefined, field: 'image' | 'banner_image') => {
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
    setUploading(field)
    try {
      const { imageUrl } = await uploadImageToCloudinary(file)
      setEditing(prev => ({ ...prev, [field]: imageUrl }))
      setSuccess('Image uploaded')
    } catch (e: any) {
      setError(e instanceof Error ? e.message : 'Upload failed')
    } finally {
      setUploading('')
    }
  }

  const handleSave = async () => {
    setError('')
    setSuccess('')

    const title = editing.title.trim()
    if (!title) {
      setError('Please fill in the class title')
      return
    }

    const capacityNum = editing.capacity.trim() === '' ? null : Number(editing.capacity)
    if (capacityNum !== null && (!Number.isFinite(capacityNum) || capacityNum < 0)) {
      setError('Capacity must be a positive number or empty')
      return
    }

    const sortOrder = Number(editing.sort_order)
    const payload: Partial<TrainingClass> = {
      title,
      slug: slugify(editing.slug.trim() || title),
      short_description: editing.short_description.trim(),
      description: editing.description.trim(),
      content: editing.content.trim(),
      image: editing.image.trim(),
      banner_image: editing.banner_image.trim(),
      badge: editing.badge.trim() || 'Certified Training',
      features: parseList(editing.features),
      requirements: parseList(editing.requirements),
      price: editing.price.trim(),
      duration: editing.duration.trim(),
      schedule: editing.schedule.trim(),
      location: editing.location.trim(),
      instructor: editing.instructor.trim(),
      capacity: capacityNum,
      start_date: editing.start_date || null,
      end_date: editing.end_date || null,
      sort_order: Number.isFinite(sortOrder) ? sortOrder : 0,
      registration_open: Boolean(editing.registration_open),
      is_published: Boolean(editing.is_published),
      is_featured: Boolean(editing.is_featured),
    }

    setSaving(true)
    try {
      if (editing.id) {
        await updateClass(editing.id, payload)
        setSuccess('Class updated')
      } else {
        await createClass(payload)
        setSuccess('Class created')
      }
      setIsFormOpen(false)
      await fetchClasses()
    } catch (e: any) {
      setError(e instanceof Error ? e.message : 'Save failed')
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (cls: TrainingClass) => {
    if (!cls.id) return
    const ok = window.confirm(`Delete "${cls.title}"? This will also delete its registrations.`)
    if (!ok) return
    setError('')
    setSuccess('')
    setDeletingId(cls.id)
    try {
      await deleteClass(cls.id)
      setClasses(prev => prev.filter(c => c.id !== cls.id))
      setSuccess('Class deleted')
    } catch (e: any) {
      setError(e instanceof Error ? e.message : 'Delete failed')
    } finally {
      setDeletingId(null)
    }
  }

  const handleStatusChange = async (reg: ClassRegistration, statusValue: string) => {
    if (!reg.id) return
    setError('')
    setUpdatingStatusId(reg.id)
    try {
      const updated = await updateRegistrationStatus(reg.id, { status: statusValue })
      setRegistrations(prev => prev.map(r => (r.id === reg.id ? { ...r, ...updated } : r)))
      setSuccess('Registration updated')
    } catch (e: any) {
      setError(e instanceof Error ? e.message : 'Failed to update registration')
    } finally {
      setUpdatingStatusId(null)
    }
  }

  const inputClass = 'w-full rounded-lg border border-neutral-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-600'
  const labelClass = 'block text-sm font-medium text-neutral-700 mb-1'

  return (
    <div>
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h2 className="text-xl font-semibold text-neutral-900">Classes</h2>
          <p className="text-sm text-neutral-600 mt-1">Create, edit, and manage training classes and registrations.</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('classes')}
            className={`px-4 py-2 rounded-lg text-sm font-medium border ${activeTab === 'classes' ? 'bg-green-600 text-white border-green-600' : 'border-neutral-300 text-neutral-700 hover:bg-neutral-50'}`}
          >
            Classes
          </button>
          <button
            onClick={() => setActiveTab('registrations')}
            className={`px-4 py-2 rounded-lg text-sm font-medium border ${activeTab === 'registrations' ? 'bg-green-600 text-white border-green-600' : 'border-neutral-300 text-neutral-700 hover:bg-neutral-50'}`}
          >
            Registrations
          </button>
          {activeTab === 'classes' && !isFormOpen && (
            <button
              onClick={openCreate}
              className="inline-flex items-center px-4 py-2 rounded-lg bg-green-600 text-white text-sm font-semibold hover:bg-green-700"
            >
              Add class
            </button>
          )}
        </div>
      </div>

      {error && (
        <div className="mt-4 rounded-md bg-red-50 border border-red-200 p-3 text-red-700 text-sm">{error}</div>
      )}
      {success && (
        <div className="mt-4 rounded-md bg-emerald-50 border border-emerald-200 p-3 text-emerald-700 text-sm">{success}</div>
      )}

      {activeTab === 'classes' && !isFormOpen && (
        <div className="mt-6 bg-white rounded-xl border border-neutral-200 shadow-sm overflow-hidden">
          <div className="px-4 py-3 border-b border-neutral-200 flex items-center justify-between">
            <p className="text-sm font-semibold text-neutral-900">Training classes</p>
            <button
              onClick={fetchClasses}
              disabled={loadingClasses || saving || Boolean(uploading)}
              className="text-sm px-3 py-1.5 rounded-md border border-neutral-300 hover:bg-neutral-50 disabled:opacity-50"
            >
              {loadingClasses ? 'Refreshing…' : 'Refresh'}
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="bg-neutral-50 text-neutral-700">
                <tr>
                  <th className="text-left font-semibold px-4 py-3">Class</th>
                  <th className="text-left font-semibold px-4 py-3">Slug</th>
                  <th className="text-left font-semibold px-4 py-3">Price</th>
                  <th className="text-left font-semibold px-4 py-3">Registrations</th>
                  <th className="text-left font-semibold px-4 py-3">Status</th>
                  <th className="text-right font-semibold px-4 py-3">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-200">
                {sortedClasses.map(cls => (
                  <tr key={cls.id ?? cls.slug} className="hover:bg-neutral-50">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="h-12 w-12 rounded-lg bg-neutral-100 border border-neutral-200 overflow-hidden flex items-center justify-center">
                          {cls.image ? (
                            <img src={cls.image} alt={cls.title} className="h-full w-full object-cover" />
                          ) : (
                            <span className="text-xs text-neutral-500">IMG</span>
                          )}
                        </div>
                        <div>
                          <p className="font-semibold text-neutral-900">{cls.title}</p>
                          <p className="text-neutral-600 text-xs">ID: {cls.id ?? '-'}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-neutral-800">{cls.slug}</td>
                    <td className="px-4 py-3 text-neutral-800">{cls.price || '-'}</td>
                    <td className="px-4 py-3 text-neutral-800">{cls.registration_count ?? 0}</td>
                    <td className="px-4 py-3">
                      <div className="flex flex-wrap gap-2">
                        <span className={`inline-flex items-center px-2 py-1 rounded-md border text-xs font-semibold ${cls.is_published ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-neutral-100 text-neutral-600 border-neutral-200'}`}>
                          {cls.is_published ? 'Published' : 'Draft'}
                        </span>
                        <span className={`inline-flex items-center px-2 py-1 rounded-md border text-xs font-semibold ${cls.registration_open ? 'bg-blue-50 text-blue-700 border-blue-200' : 'bg-neutral-100 text-neutral-600 border-neutral-200'}`}>
                          {cls.registration_open ? 'Open' : 'Closed'}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => openEdit(cls)}
                          disabled={saving || Boolean(uploading) || deletingId != null}
                          className="px-3 py-1.5 rounded-md border border-neutral-300 hover:bg-neutral-50 disabled:opacity-50"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(cls)}
                          disabled={saving || Boolean(uploading) || deletingId === cls.id}
                          className="px-3 py-1.5 rounded-md border border-red-200 text-red-700 hover:bg-red-50 disabled:opacity-50"
                        >
                          {deletingId === cls.id ? 'Deleting…' : 'Delete'}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {!loadingClasses && sortedClasses.length === 0 && (
                  <tr>
                    <td colSpan={6} className="px-4 py-8 text-center text-neutral-600">No classes found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'classes' && isFormOpen && (
        <div className="mt-6">
          <div className="bg-white rounded-2xl border border-neutral-200 shadow-sm overflow-hidden">
            <div className="px-5 py-4 border-b border-neutral-200 flex items-center justify-between">
              <button
                onClick={closeForm}
                disabled={saving || Boolean(uploading)}
                className="inline-flex items-center gap-2 text-sm font-semibold text-neutral-800 hover:text-neutral-900 disabled:opacity-50"
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 18l-6-6 6-6"/></svg>
                Back to classes
              </button>
              <p className="text-base font-semibold text-neutral-900">{editing.id ? 'Edit class' : 'Add class'}</p>
              <div className="w-[110px]" />
            </div>

            <div className="p-5 grid gap-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className={labelClass}>Title</label>
                  <input value={editing.title} onChange={e => setEditing(prev => ({ ...prev, title: e.target.value }))} className={inputClass} placeholder="React Training Class" />
                </div>
                <div>
                  <label className={labelClass}>Slug</label>
                  <input value={editing.slug} onChange={e => setEditing(prev => ({ ...prev, slug: e.target.value }))} className={inputClass} placeholder="react-training" />
                  <p className="text-xs text-neutral-500 mt-1">Auto-generated from title if left blank.</p>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className={labelClass}>Short description</label>
                  <input value={editing.short_description} onChange={e => setEditing(prev => ({ ...prev, short_description: e.target.value }))} className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>Badge</label>
                  <input value={editing.badge} onChange={e => setEditing(prev => ({ ...prev, badge: e.target.value }))} className={inputClass} placeholder="Certified Training" />
                </div>
              </div>

              <div>
                <label className={labelClass}>Description</label>
                <textarea value={editing.description} onChange={e => setEditing(prev => ({ ...prev, description: e.target.value }))} className={`${inputClass} min-h-[90px]`} />
              </div>

              <div>
                <label className={labelClass}>Content</label>
                <textarea value={editing.content} onChange={e => setEditing(prev => ({ ...prev, content: e.target.value }))} className={`${inputClass} min-h-[110px]`} placeholder="Longer class details shown on the class page" />
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className={labelClass}>Features (comma separated)</label>
                  <input value={editing.features} onChange={e => setEditing(prev => ({ ...prev, features: e.target.value }))} className={inputClass} placeholder="Hands-on Projects, Expert Instructors" />
                </div>
                <div>
                  <label className={labelClass}>Requirements (comma separated)</label>
                  <input value={editing.requirements} onChange={e => setEditing(prev => ({ ...prev, requirements: e.target.value }))} className={inputClass} placeholder="A laptop, Basic computer skills" />
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-3">
                <div>
                  <label className={labelClass}>Price</label>
                  <input value={editing.price} onChange={e => setEditing(prev => ({ ...prev, price: e.target.value }))} className={inputClass} placeholder="KSh 4,000" />
                </div>
                <div>
                  <label className={labelClass}>Duration</label>
                  <input value={editing.duration} onChange={e => setEditing(prev => ({ ...prev, duration: e.target.value }))} className={inputClass} placeholder="2 Months" />
                </div>
                <div>
                  <label className={labelClass}>Schedule</label>
                  <input value={editing.schedule} onChange={e => setEditing(prev => ({ ...prev, schedule: e.target.value }))} className={inputClass} placeholder="Weekends" />
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-3">
                <div>
                  <label className={labelClass}>Location</label>
                  <input value={editing.location} onChange={e => setEditing(prev => ({ ...prev, location: e.target.value }))} className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>Instructor</label>
                  <input value={editing.instructor} onChange={e => setEditing(prev => ({ ...prev, instructor: e.target.value }))} className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>Capacity</label>
                  <input type="number" min="0" value={editing.capacity} onChange={e => setEditing(prev => ({ ...prev, capacity: e.target.value }))} className={inputClass} placeholder="Unlimited" />
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-4">
                <div>
                  <label className={labelClass}>Start date</label>
                  <input type="date" value={editing.start_date} onChange={e => setEditing(prev => ({ ...prev, start_date: e.target.value }))} className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>End date</label>
                  <input type="date" value={editing.end_date} onChange={e => setEditing(prev => ({ ...prev, end_date: e.target.value }))} className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>Sort order</label>
                  <input type="number" value={editing.sort_order} onChange={e => setEditing(prev => ({ ...prev, sort_order: e.target.value }))} className={inputClass} />
                </div>
                <div className="flex flex-col justify-end gap-2">
                  <label className="inline-flex items-center gap-2 text-sm text-neutral-700">
                    <input type="checkbox" checked={editing.is_published} onChange={e => setEditing(prev => ({ ...prev, is_published: e.target.checked }))} className="h-4 w-4 rounded border-neutral-300" />
                    Published
                  </label>
                  <label className="inline-flex items-center gap-2 text-sm text-neutral-700">
                    <input type="checkbox" checked={editing.registration_open} onChange={e => setEditing(prev => ({ ...prev, registration_open: e.target.checked }))} className="h-4 w-4 rounded border-neutral-300" />
                    Registration open
                  </label>
                  <label className="inline-flex items-center gap-2 text-sm text-neutral-700">
                    <input type="checkbox" checked={editing.is_featured} onChange={e => setEditing(prev => ({ ...prev, is_featured: e.target.checked }))} className="h-4 w-4 rounded border-neutral-300" />
                    Featured
                  </label>
                </div>
              </div>

              {(['image', 'banner_image'] as const).map(field => (
                <div key={field}>
                  <label className={labelClass}>{field === 'image' ? 'Class image' : 'Banner image'}</label>
                  <div className="grid gap-3 md:grid-cols-2">
                    <div className="rounded-xl border border-neutral-200 bg-neutral-50 p-3">
                      <div className="flex items-start gap-3">
                        <div className="h-16 w-16 rounded-xl bg-white border border-neutral-200 overflow-hidden flex items-center justify-center">
                          {editing[field] ? (
                            <img src={editing[field]} alt="preview" className="h-full w-full object-cover" />
                          ) : (
                            <span className="text-xs text-neutral-500">No image</span>
                          )}
                        </div>
                        <div className="flex-1">
                          <label className="block text-xs font-semibold text-neutral-700">Image URL</label>
                          <input
                            value={editing[field]}
                            onChange={e => setEditing(prev => ({ ...prev, [field]: e.target.value }))}
                            className="mt-1 w-full rounded-lg border border-neutral-300 px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-green-600"
                            placeholder="https://..."
                          />
                          {editing[field] && (
                            <button
                              type="button"
                              onClick={() => setEditing(prev => ({ ...prev, [field]: '' }))}
                              disabled={Boolean(uploading) || saving}
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
                        <label className={`inline-flex items-center justify-center px-4 py-2 rounded-lg text-sm font-semibold border ${uploading === field ? 'bg-neutral-100 text-neutral-500 border-neutral-200' : 'bg-green-600 text-white border-green-600 hover:bg-green-700'}`}>
                          {uploading === field ? 'Uploading…' : 'Choose image'}
                          <input
                            type="file"
                            accept="image/*"
                            onChange={e => handleUpload(e.target.files?.[0] || null, field)}
                            className="hidden"
                            disabled={Boolean(uploading)}
                          />
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="px-5 py-4 border-t border-neutral-200 flex items-center justify-end gap-3">
              <button
                onClick={closeForm}
                disabled={saving || Boolean(uploading)}
                className="px-4 py-2 rounded-lg border border-neutral-300 hover:bg-neutral-50 disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={saving || Boolean(uploading)}
                className="px-4 py-2 rounded-lg bg-green-600 text-white font-semibold hover:bg-green-700 disabled:opacity-50"
              >
                {saving ? 'Saving…' : 'Save'}
              </button>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'registrations' && (
        <div className="mt-6 bg-white rounded-xl border border-neutral-200 shadow-sm overflow-hidden">
          <div className="px-4 py-3 border-b border-neutral-200 flex flex-wrap items-center gap-3">
            <p className="text-sm font-semibold text-neutral-900">Class registrations</p>
            <div className="flex-1" />
            <input
              value={regSearch}
              onChange={e => setRegSearch(e.target.value)}
              onKeyDown={e => {
                if (e.key === 'Enter') fetchRegistrations()
              }}
              className="rounded-lg border border-neutral-300 px-3 py-1.5 text-sm"
              placeholder="Search name, email, WhatsApp..."
            />
            <select
              value={regStatusFilter}
              onChange={e => setRegStatusFilter(e.target.value)}
              className="rounded-lg border border-neutral-300 px-3 py-1.5 text-sm"
            >
              <option value="">All statuses</option>
              {STATUS_OPTIONS.map(s => (
                <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>
              ))}
            </select>
            <button
              onClick={fetchRegistrations}
              disabled={loadingRegistrations}
              className="text-sm px-3 py-1.5 rounded-md border border-neutral-300 hover:bg-neutral-50 disabled:opacity-50"
            >
              {loadingRegistrations ? 'Refreshing…' : 'Refresh'}
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="bg-neutral-50 text-neutral-700">
                <tr>
                  <th className="text-left font-semibold px-4 py-3">Class</th>
                  <th className="text-left font-semibold px-4 py-3">Name</th>
                  <th className="text-left font-semibold px-4 py-3">Contact</th>
                  <th className="text-left font-semibold px-4 py-3">Prior knowledge</th>
                  <th className="text-left font-semibold px-4 py-3">Status</th>
                  <th className="text-left font-semibold px-4 py-3">Registered</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-200">
                {registrations.map(reg => (
                  <tr key={reg.id ?? `${reg.email}-${reg.training_class}`} className="hover:bg-neutral-50 align-top">
                    <td className="px-4 py-3 text-neutral-800">{reg.training_class_title || `Class #${reg.training_class ?? '-'}`}</td>
                    <td className="px-4 py-3">
                      <p className="font-semibold text-neutral-900">{reg.full_name}</p>
                      {reg.notes && <p className="text-xs text-neutral-500 mt-1 max-w-[16rem] truncate" title={reg.notes}>{reg.notes}</p>}
                    </td>
                    <td className="px-4 py-3 text-neutral-700">
                      <p>{reg.email}</p>
                      <p className="text-xs text-neutral-500">{reg.whatsapp}</p>
                    </td>
                    <td className="px-4 py-3 text-neutral-700">{reg.prior_knowledge === 'yes' ? 'Yes' : reg.prior_knowledge === 'no' ? 'No' : reg.prior_knowledge}</td>
                    <td className="px-4 py-3">
                      <select
                        value={reg.status || 'pending'}
                        onChange={e => handleStatusChange(reg, e.target.value)}
                        disabled={!reg.id || updatingStatusId === reg.id}
                        className="rounded-lg border border-neutral-300 px-2 py-1 text-sm disabled:opacity-50"
                      >
                        {STATUS_OPTIONS.map(s => (
                          <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>
                        ))}
                      </select>
                    </td>
                    <td className="px-4 py-3 text-neutral-600">{reg.created_at ? new Date(reg.created_at).toLocaleString() : '-'}</td>
                  </tr>
                ))}
                {!loadingRegistrations && registrations.length === 0 && (
                  <tr>
                    <td colSpan={6} className="px-4 py-8 text-center text-neutral-600">No registrations found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}

export default AdminClasses
