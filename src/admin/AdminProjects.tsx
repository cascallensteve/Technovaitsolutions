import { useEffect, useMemo, useState } from 'react'
import {
  createProject,
  deleteProject,
  listAdminProjects,
  updateProject,
  updateProjectStatus,
  type Project,
  type ProjectStatus,
} from '../services/projectsService'

type FormState = {
  id?: number
  title: string
  client_name: string
  client_email: string
  client_phone: string
  description: string
  category: string
  status: ProjectStatus
  progress: string
  currency: string
  total_amount: string
  amount_paid: string
  start_date: string
  due_date: string
  is_published: boolean
}

const emptyForm: FormState = {
  title: '',
  client_name: '',
  client_email: '',
  client_phone: '',
  description: '',
  category: '',
  status: 'pending',
  progress: '0',
  currency: 'KES',
  total_amount: '',
  amount_paid: '0',
  start_date: '',
  due_date: '',
  is_published: false,
}

const STATUS_OPTIONS: { value: ProjectStatus; label: string }[] = [
  { value: 'pending', label: 'Pending' },
  { value: 'ongoing', label: 'Ongoing' },
  { value: 'completed', label: 'Completed' },
  { value: 'on_hold', label: 'On Hold' },
  { value: 'cancelled', label: 'Cancelled' },
]

const STATUS_STYLES: Record<string, string> = {
  pending: 'bg-amber-50 text-amber-700 border-amber-200',
  ongoing: 'bg-blue-50 text-blue-700 border-blue-200',
  completed: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  on_hold: 'bg-orange-50 text-orange-700 border-orange-200',
  cancelled: 'bg-neutral-100 text-neutral-600 border-neutral-200',
}

function statusLabel(status?: string) {
  return STATUS_OPTIONS.find(o => o.value === status)?.label || status || 'Pending'
}

function toForm(p?: Project | null): FormState {
  if (!p) return { ...emptyForm }
  return {
    id: p.id,
    title: p.title || '',
    client_name: p.client_name || '',
    client_email: p.client_email || '',
    client_phone: p.client_phone || '',
    description: p.description || '',
    category: p.category || '',
    status: (p.status as ProjectStatus) || 'pending',
    progress: p.progress != null ? String(p.progress) : '0',
    currency: p.currency || 'KES',
    total_amount: p.total_amount != null ? String(p.total_amount) : '',
    amount_paid: p.amount_paid != null ? String(p.amount_paid) : '0',
    start_date: p.start_date ? String(p.start_date).slice(0, 10) : '',
    due_date: p.due_date ? String(p.due_date).slice(0, 10) : '',
    is_published: Boolean(p.is_published),
  }
}

function num(v: string | number | undefined | null): number {
  const n = Number(v)
  return Number.isFinite(n) ? n : 0
}

function money(v: string | number | undefined | null, currency?: string): string {
  const n = num(v)
  const formatted = n.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })
  return currency ? `${currency} ${formatted}` : formatted
}

const AdminProjects = () => {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [deletingId, setDeletingId] = useState<number | null>(null)
  const [updatingId, setUpdatingId] = useState<number | null>(null)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editing, setEditing] = useState<FormState>(() => ({ ...emptyForm }))
  const [statusFilter, setStatusFilter] = useState('')
  const [search, setSearch] = useState('')
  const [paymentEdit, setPaymentEdit] = useState<{ id: number; total: string; paid: string } | null>(null)

  const fetchProjects = async () => {
    setLoading(true)
    setError('')
    try {
      const data = await listAdminProjects({
        status: statusFilter || undefined,
        search: search.trim() || undefined,
      })
      setProjects(Array.isArray(data) ? data : [])
    } catch (e: any) {
      setError(e instanceof Error ? e.message : 'Failed to load projects')
      setProjects([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProjects()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    fetchProjects()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [statusFilter])

  const stats = useMemo(() => {
    const all = projects
    const totalValue = all.reduce((s, p) => s + num(p.total_amount), 0)
    const totalPaid = all.reduce((s, p) => s + num(p.amount_paid), 0)
    const outstanding = all.reduce((s, p) => s + num(p.balance ?? p.amount_pending), 0)
    return {
      total: all.length,
      ongoing: all.filter(p => p.status === 'ongoing').length,
      completed: all.filter(p => p.status === 'completed').length,
      pending: all.filter(p => p.status === 'pending').length,
      totalValue,
      totalPaid,
      outstanding,
    }
  }, [projects])

  const openCreate = () => {
    setError('')
    setSuccess('')
    setEditing({ ...emptyForm })
    setIsFormOpen(true)
  }

  const openEdit = (p: Project) => {
    setError('')
    setSuccess('')
    setEditing(toForm(p))
    setIsFormOpen(true)
  }

  const closeForm = () => {
    if (saving) return
    setIsFormOpen(false)
  }

  const handleSave = async () => {
    setError('')
    setSuccess('')

    const title = editing.title.trim()
    if (!title) {
      setError('Please fill in the project title')
      return
    }

    const total = Number(editing.total_amount)
    const paid = Number(editing.amount_paid || '0')
    if (editing.total_amount.trim() !== '' && (!Number.isFinite(total) || total < 0)) {
      setError('Total amount must be a positive number')
      return
    }
    if (!Number.isFinite(paid) || paid < 0) {
      setError('Amount paid must be a positive number')
      return
    }
    if (paid > (Number.isFinite(total) ? total : 0) && editing.total_amount.trim() !== '') {
      setError('Amount paid cannot exceed the total amount')
      return
    }

    const progressNum = Number(editing.progress)
    const payload = {
      title,
      client_name: editing.client_name.trim(),
      client_email: editing.client_email.trim(),
      client_phone: editing.client_phone.trim(),
      description: editing.description.trim(),
      category: editing.category.trim(),
      status: editing.status,
      progress: Number.isFinite(progressNum) ? progressNum : 0,
      currency: editing.currency.trim() || 'KES',
      total_amount: editing.total_amount.trim() === '' ? 0 : total,
      amount_paid: paid,
      start_date: editing.start_date || null,
      due_date: editing.due_date || null,
      is_published: Boolean(editing.is_published),
    }

    setSaving(true)
    try {
      if (editing.id) {
        await updateProject(editing.id, payload)
        setSuccess('Project updated')
      } else {
        await createProject(payload)
        setSuccess('Project created')
      }
      setIsFormOpen(false)
      await fetchProjects()
    } catch (e: any) {
      setError(e instanceof Error ? e.message : 'Save failed')
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (p: Project) => {
    if (!p.id) return
    const ok = window.confirm(`Delete "${p.title}"? This cannot be undone.`)
    if (!ok) return
    setError('')
    setSuccess('')
    setDeletingId(p.id)
    try {
      await deleteProject(p.id)
      setProjects(prev => prev.filter(x => x.id !== p.id))
      setSuccess('Project deleted')
    } catch (e: any) {
      setError(e instanceof Error ? e.message : 'Delete failed')
    } finally {
      setDeletingId(null)
    }
  }

  const handleStatusChange = async (p: Project, statusValue: ProjectStatus) => {
    if (!p.id || p.status === statusValue) return
    setError('')
    setUpdatingId(p.id)
    try {
      const updated = await updateProjectStatus(p.id, statusValue)
      setProjects(prev => prev.map(x => (x.id === p.id ? { ...x, ...updated } : x)))
      setSuccess(`"${p.title}" marked as ${statusLabel(statusValue)}`)
    } catch (e: any) {
      setError(e instanceof Error ? e.message : 'Failed to update status')
    } finally {
      setUpdatingId(null)
    }
  }

  const openPaymentEdit = (p: Project) => {
    setError('')
    setSuccess('')
    setPaymentEdit({
      id: p.id!,
      total: p.total_amount != null ? String(p.total_amount) : '',
      paid: p.amount_paid != null ? String(p.amount_paid) : '0',
    })
  }

  const handlePaymentSave = async () => {
    if (!paymentEdit) return
    const total = Number(paymentEdit.total)
    const paid = Number(paymentEdit.paid || '0')
    if (!Number.isFinite(total) || total < 0) {
      setError('Total amount must be a positive number')
      return
    }
    if (!Number.isFinite(paid) || paid < 0) {
      setError('Amount paid must be a positive number')
      return
    }
    if (paid > total) {
      setError('Amount paid cannot exceed the total amount')
      return
    }
    setSaving(true)
    try {
      const updated = await updateProject(paymentEdit.id, {
        total_amount: total,
        amount_paid: paid,
      })
      setProjects(prev => prev.map(x => (x.id === paymentEdit.id ? { ...x, ...updated } : x)))
      setPaymentEdit(null)
      setSuccess('Payment details updated')
    } catch (e: any) {
      setError(e instanceof Error ? e.message : 'Failed to update payments')
    } finally {
      setSaving(false)
    }
  }

  const inputClass = 'w-full rounded-lg border border-neutral-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-600'
  const labelClass = 'block text-sm font-medium text-neutral-700 mb-1'

  return (
    <div>
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h2 className="text-xl font-semibold text-neutral-900">Projects</h2>
          <p className="text-sm text-neutral-600 mt-1">Create and manage client projects, statuses and payments.</p>
        </div>
        {!isFormOpen && (
          <button
            onClick={openCreate}
            className="inline-flex items-center px-4 py-2 rounded-lg bg-green-600 text-white text-sm font-semibold hover:bg-green-700"
          >
            Add project
          </button>
        )}
      </div>

      {/* Summary cards */}
      <div className="mt-5 grid gap-4 grid-cols-2 lg:grid-cols-4">
        <div className="bg-white rounded-xl border border-neutral-200 p-4 shadow-sm">
          <p className="text-xs font-medium text-neutral-500 uppercase tracking-wide">Total projects</p>
          <p className="mt-1 text-2xl font-bold text-neutral-900">{stats.total}</p>
          <p className="text-xs text-neutral-500 mt-1">{stats.ongoing} ongoing · {stats.pending} pending · {stats.completed} completed</p>
        </div>
        <div className="bg-white rounded-xl border border-neutral-200 p-4 shadow-sm">
          <p className="text-xs font-medium text-neutral-500 uppercase tracking-wide">Total value</p>
          <p className="mt-1 text-2xl font-bold text-neutral-900">{money(stats.totalValue)}</p>
        </div>
        <div className="bg-white rounded-xl border border-neutral-200 p-4 shadow-sm">
          <p className="text-xs font-medium text-neutral-500 uppercase tracking-wide">Amount paid</p>
          <p className="mt-1 text-2xl font-bold text-emerald-700">{money(stats.totalPaid)}</p>
        </div>
        <div className="bg-white rounded-xl border border-neutral-200 p-4 shadow-sm">
          <p className="text-xs font-medium text-neutral-500 uppercase tracking-wide">Outstanding balance</p>
          <p className="mt-1 text-2xl font-bold text-amber-700">{money(stats.outstanding)}</p>
        </div>
      </div>

      {error && (
        <div className="mt-4 rounded-md bg-red-50 border border-red-200 p-3 text-red-700 text-sm">{error}</div>
      )}
      {success && (
        <div className="mt-4 rounded-md bg-emerald-50 border border-emerald-200 p-3 text-emerald-700 text-sm">{success}</div>
      )}

      {!isFormOpen && (
        <div className="mt-6 bg-white rounded-xl border border-neutral-200 shadow-sm overflow-hidden">
          <div className="px-4 py-3 border-b border-neutral-200 flex items-center justify-between flex-wrap gap-3">
            <p className="text-sm font-semibold text-neutral-900">All projects</p>
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                onKeyDown={e => { if (e.key === 'Enter') fetchProjects() }}
                placeholder="Search projects or clients..."
                className="rounded-lg border border-neutral-300 px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-600"
              />
              <select
                value={statusFilter}
                onChange={e => setStatusFilter(e.target.value)}
                className="rounded-lg border border-neutral-300 px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-600"
              >
                <option value="">All statuses</option>
                {STATUS_OPTIONS.map(o => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </select>
              <button
                onClick={fetchProjects}
                disabled={loading || saving}
                className="text-sm px-3 py-1.5 rounded-md border border-neutral-300 hover:bg-neutral-50 disabled:opacity-50"
              >
                {loading ? 'Loading…' : 'Search'}
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="bg-neutral-50 text-neutral-700">
                <tr>
                  <th className="text-left font-semibold px-4 py-3">Project</th>
                  <th className="text-left font-semibold px-4 py-3">Status</th>
                  <th className="text-left font-semibold px-4 py-3">Progress</th>
                  <th className="text-right font-semibold px-4 py-3">Total</th>
                  <th className="text-right font-semibold px-4 py-3">Paid</th>
                  <th className="text-right font-semibold px-4 py-3">Balance</th>
                  <th className="text-right font-semibold px-4 py-3">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-200">
                {projects.map(p => {
                  const total = num(p.total_amount)
                  const paid = num(p.amount_paid)
                  const balance = num(p.balance ?? p.amount_pending)
                  const progress = Math.max(0, Math.min(100, num(p.progress)))
                  return (
                    <tr key={p.id} className="hover:bg-neutral-50 align-top">
                      <td className="px-4 py-3">
                        <p className="font-semibold text-neutral-900">{p.title}</p>
                        <p className="text-neutral-600 text-xs mt-0.5">
                          {p.client_name || 'No client'}{p.category ? ` · ${p.category}` : ''}
                        </p>
                        {p.due_date && (
                          <p className="text-neutral-500 text-xs mt-0.5">Due {p.due_date}</p>
                        )}
                      </td>
                      <td className="px-4 py-3">
                        <select
                          value={p.status || 'pending'}
                          disabled={updatingId === p.id}
                          onChange={e => handleStatusChange(p, e.target.value as ProjectStatus)}
                          className={`rounded-md border px-2 py-1 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-green-600 disabled:opacity-50 ${STATUS_STYLES[p.status || 'pending'] || 'bg-neutral-100 text-neutral-600 border-neutral-200'}`}
                        >
                          {STATUS_OPTIONS.map(o => (
                            <option key={o.value} value={o.value}>{o.label}</option>
                          ))}
                        </select>
                      </td>
                      <td className="px-4 py-3 min-w-[120px]">
                        <div className="flex items-center gap-2">
                          <div className="h-2 w-20 rounded-full bg-neutral-200 overflow-hidden">
                            <div
                              className={`h-full rounded-full ${progress >= 100 ? 'bg-emerald-500' : progress > 0 ? 'bg-blue-500' : 'bg-neutral-300'}`}
                              style={{ width: `${progress}%` }}
                            />
                          </div>
                          <span className="text-xs text-neutral-600">{progress}%</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-right text-neutral-800 whitespace-nowrap">
                        {total ? money(total, p.currency) : '-'}
                      </td>
                      <td className="px-4 py-3 text-right text-emerald-700 whitespace-nowrap">
                        {paid ? money(paid, p.currency) : '-'}
                      </td>
                      <td className="px-4 py-3 text-right whitespace-nowrap">
                        <span className={balance > 0 ? 'text-amber-700 font-medium' : 'text-emerald-700'}>
                          {total ? money(balance, p.currency) : '-'}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex justify-end gap-2 flex-wrap">
                          <button
                            onClick={() => openPaymentEdit(p)}
                            disabled={saving || updatingId != null}
                            className="px-3 py-1.5 rounded-md border border-blue-200 text-blue-700 hover:bg-blue-50 text-xs font-medium disabled:opacity-50"
                          >
                            Payments
                          </button>
                          <button
                            onClick={() => openEdit(p)}
                            disabled={saving || updatingId != null}
                            className="px-3 py-1.5 rounded-md border border-neutral-300 hover:bg-neutral-50 text-xs font-medium disabled:opacity-50"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(p)}
                            disabled={saving || updatingId != null || deletingId === p.id}
                            className="px-3 py-1.5 rounded-md border border-red-200 text-red-700 hover:bg-red-50 text-xs font-medium disabled:opacity-50"
                          >
                            {deletingId === p.id ? 'Deleting…' : 'Delete'}
                          </button>
                        </div>
                      </td>
                    </tr>
                  )
                })}
                {!loading && projects.length === 0 && (
                  <tr>
                    <td colSpan={7} className="px-4 py-8 text-center text-neutral-600">
                      No projects found. Click "Add project" to create one.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Add / Edit form */}
      {isFormOpen && (
        <div className="mt-6">
          <div className="bg-white rounded-2xl border border-neutral-200 shadow-sm overflow-hidden">
            <div className="px-5 py-4 border-b border-neutral-200 flex items-center justify-between">
              <button
                onClick={closeForm}
                disabled={saving}
                className="inline-flex items-center gap-2 text-sm font-semibold text-neutral-800 hover:text-neutral-900 disabled:opacity-50"
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 18l-6-6 6-6"/></svg>
                Back to projects
              </button>
              <p className="text-base font-semibold text-neutral-900">{editing.id ? 'Edit project' : 'Add project'}</p>
              <div className="w-[110px]" />
            </div>

            <div className="p-5 grid gap-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className={labelClass}>Project title *</label>
                  <input value={editing.title} onChange={e => setEditing(prev => ({ ...prev, title: e.target.value }))} className={inputClass} placeholder="E-commerce Website" />
                </div>
                <div>
                  <label className={labelClass}>Category</label>
                  <input value={editing.category} onChange={e => setEditing(prev => ({ ...prev, category: e.target.value }))} className={inputClass} placeholder="Website, Mobile App, System..." />
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-3">
                <div>
                  <label className={labelClass}>Client name</label>
                  <input value={editing.client_name} onChange={e => setEditing(prev => ({ ...prev, client_name: e.target.value }))} className={inputClass} placeholder="Acme Inc." />
                </div>
                <div>
                  <label className={labelClass}>Client email</label>
                  <input type="email" value={editing.client_email} onChange={e => setEditing(prev => ({ ...prev, client_email: e.target.value }))} className={inputClass} placeholder="client@example.com" />
                </div>
                <div>
                  <label className={labelClass}>Client phone</label>
                  <input value={editing.client_phone} onChange={e => setEditing(prev => ({ ...prev, client_phone: e.target.value }))} className={inputClass} placeholder="+254 7xx xxx xxx" />
                </div>
              </div>

              <div>
                <label className={labelClass}>Description</label>
                <textarea value={editing.description} onChange={e => setEditing(prev => ({ ...prev, description: e.target.value }))} className={`${inputClass} min-h-[90px]`} placeholder="Project scope and details" />
              </div>

              <div className="grid gap-4 md:grid-cols-3">
                <div>
                  <label className={labelClass}>Status</label>
                  <select value={editing.status} onChange={e => setEditing(prev => ({ ...prev, status: e.target.value as ProjectStatus }))} className={inputClass}>
                    {STATUS_OPTIONS.map(o => (
                      <option key={o.value} value={o.value}>{o.label}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className={labelClass}>Progress (%)</label>
                  <input type="number" min={0} max={100} value={editing.progress} onChange={e => setEditing(prev => ({ ...prev, progress: e.target.value }))} className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>Currency</label>
                  <input value={editing.currency} onChange={e => setEditing(prev => ({ ...prev, currency: e.target.value }))} className={inputClass} placeholder="KES" maxLength={10} />
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-3">
                <div>
                  <label className={labelClass}>Total amount</label>
                  <input type="number" min={0} step="0.01" value={editing.total_amount} onChange={e => setEditing(prev => ({ ...prev, total_amount: e.target.value }))} className={inputClass} placeholder="0.00" />
                </div>
                <div>
                  <label className={labelClass}>Amount paid</label>
                  <input type="number" min={0} step="0.01" value={editing.amount_paid} onChange={e => setEditing(prev => ({ ...prev, amount_paid: e.target.value }))} className={inputClass} placeholder="0.00" />
                </div>
                <div className="flex items-end">
                  <div className="w-full rounded-lg bg-neutral-50 border border-neutral-200 px-3 py-2 text-sm">
                    <span className="text-neutral-500">Balance: </span>
                    <span className="font-semibold text-amber-700">
                      {money(Math.max(num(editing.total_amount) - num(editing.amount_paid), 0), editing.currency)}
                    </span>
                  </div>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className={labelClass}>Start date</label>
                  <input type="date" value={editing.start_date} onChange={e => setEditing(prev => ({ ...prev, start_date: e.target.value }))} className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>Due date</label>
                  <input type="date" value={editing.due_date} onChange={e => setEditing(prev => ({ ...prev, due_date: e.target.value }))} className={inputClass} />
                </div>
              </div>

              <label className="inline-flex items-center gap-2 text-sm text-neutral-700">
                <input
                  type="checkbox"
                  checked={editing.is_published}
                  onChange={e => setEditing(prev => ({ ...prev, is_published: e.target.checked }))}
                  className="rounded border-neutral-300"
                />
                Show on public portfolio
              </label>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  onClick={closeForm}
                  disabled={saving}
                  className="px-4 py-2 rounded-lg border border-neutral-300 text-sm font-medium text-neutral-700 hover:bg-neutral-50 disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="px-4 py-2 rounded-lg bg-green-600 text-white text-sm font-semibold hover:bg-green-700 disabled:opacity-50"
                >
                  {saving ? 'Saving…' : editing.id ? 'Save changes' : 'Create project'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Quick payment edit modal */}
      {paymentEdit && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6">
            <h3 className="text-lg font-semibold text-neutral-900">Update payments</h3>
            <p className="text-sm text-neutral-600 mt-1">Set the total contract value and amount paid so far.</p>
            <div className="mt-4 grid gap-4">
              <div>
                <label className={labelClass}>Total amount</label>
                <input
                  type="number"
                  min={0}
                  step="0.01"
                  value={paymentEdit.total}
                  onChange={e => setPaymentEdit(prev => prev ? { ...prev, total: e.target.value } : prev)}
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>Amount paid</label>
                <input
                  type="number"
                  min={0}
                  step="0.01"
                  value={paymentEdit.paid}
                  onChange={e => setPaymentEdit(prev => prev ? { ...prev, paid: e.target.value } : prev)}
                  className={inputClass}
                />
              </div>
              <div className="rounded-lg bg-neutral-50 border border-neutral-200 px-3 py-2 text-sm">
                <span className="text-neutral-500">Balance due: </span>
                <span className="font-semibold text-amber-700">
                  {money(Math.max(num(paymentEdit.total) - num(paymentEdit.paid), 0))}
                </span>
              </div>
            </div>
            <div className="mt-6 flex justify-end gap-2">
              <button
                onClick={() => setPaymentEdit(null)}
                disabled={saving}
                className="px-4 py-2 rounded-lg border border-neutral-300 text-sm font-medium text-neutral-700 hover:bg-neutral-50 disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={handlePaymentSave}
                disabled={saving}
                className="px-4 py-2 rounded-lg bg-green-600 text-white text-sm font-semibold hover:bg-green-700 disabled:opacity-50"
              >
                {saving ? 'Saving…' : 'Save payments'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default AdminProjects
