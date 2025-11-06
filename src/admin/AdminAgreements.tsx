import { useEffect, useState } from 'react'
import { agreementsService, type Agreement } from '../services/agreements'

const AdminAgreements = () => {
  const [filter, setFilter] = useState<'all'|'active'|'expired'>('all')
  const [items, setItems] = useState<Agreement[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [showNew, setShowNew] = useState(false)
  const [saving, setSaving] = useState(false)
  const [formError, setFormError] = useState('')
  const [title, setTitle] = useState('')
  const [client, setClient] = useState('')
  const [statusVal, setStatusVal] = useState<'active'|'draft'|'archived'|'expired'>('active')
  const [fileUrl, setFileUrl] = useState('')
  const [fileMime, setFileMime] = useState('application/pdf')
  const [filePublicId, setFilePublicId] = useState('')
  const [fileObj, setFileObj] = useState<File|undefined>(undefined)

  useEffect(() => {
    const load = async () => {
      setLoading(true)
      setError('')
      try {
        const data = await agreementsService.list()
        setItems(Array.isArray(data) ? data : [])
      } catch (e: unknown) {
        setError(e instanceof Error ? e.message : 'Failed to load agreements')
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  const filtered = items.filter((it) =>
    filter === 'all' ? true : filter === 'active' ? String(it.status).toLowerCase() === 'active' : String(it.status).toLowerCase() === 'expired'
  )

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">Agreements</h2>
        <div className="flex items-center gap-3">
          <select value={filter} onChange={(e) => setFilter(e.target.value as any)} className="px-3 py-2 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-sm text-neutral-800 dark:text-neutral-100">
            <option value="all">All</option>
            <option value="active">Active</option>
            <option value="expired">Expired</option>
          </select>
          <button onClick={() => setShowNew(true)} className="px-4 py-2 rounded-lg bg-green-600 text-white text-sm font-medium hover:bg-green-700">New Agreement</button>
        </div>
      </div>

      {error && (
        <div className="px-4 py-3 rounded-lg border border-red-200 text-red-700 bg-red-50">{error}</div>
      )}

      <div className="bg-white dark:bg-neutral-900 rounded-xl border border-neutral-200 dark:border-neutral-800 overflow-hidden">
        <div className="grid grid-cols-12 gap-0 text-sm font-medium bg-neutral-50 dark:bg-neutral-800/40 border-b border-neutral-200 dark:border-neutral-800">
          <div className="col-span-5 px-4 py-3 text-neutral-700 dark:text-neutral-200">Title</div>
          <div className="col-span-3 px-4 py-3 text-neutral-700 dark:text-neutral-200">Client</div>
          <div className="col-span-2 px-4 py-3 text-neutral-700 dark:text-neutral-200">Status</div>
          <div className="col-span-2 px-4 py-3 text-neutral-700 dark:text-neutral-200">Actions</div>
        </div>
        <div className="divide-y divide-neutral-200 dark:divide-neutral-800">
          {loading ? (
            <div className="px-4 py-6 text-sm text-neutral-600 dark:text-neutral-300">Loading...</div>
          ) : filtered.length === 0 ? (
            <div className="px-4 py-6 text-sm text-neutral-600 dark:text-neutral-300">No agreements found</div>
          ) : (
            filtered.map((ag) => (
              <div className="grid grid-cols-12 text-sm" key={ag.id}>
                <div className="col-span-5 px-4 py-3 text-neutral-900 dark:text-neutral-100">{ag.title}</div>
                <div className="col-span-3 px-4 py-3 text-neutral-700 dark:text-neutral-200">{ag.client}</div>
                <div className="col-span-2 px-4 py-3">
                  {String(ag.status).toLowerCase() === 'active' ? (
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300">Active</span>
                  ) : String(ag.status).toLowerCase() === 'expired' ? (
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-neutral-200 text-neutral-800 dark:bg-neutral-700 dark:text-neutral-200">Expired</span>
                  ) : (
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300">{String(ag.status)}</span>
                  )}
                </div>
                <div className="col-span-2 px-4 py-3">
                  <div className="flex gap-2">
                    {ag.file_url ? (
                      <a href={ag.file_url} target="_blank" rel="noreferrer" className="px-3 py-1.5 rounded-md border border-neutral-300 dark:border-neutral-700 text-neutral-800 dark:text-neutral-100 hover:bg-neutral-50 dark:hover:bg-neutral-800">View</a>
                    ) : (
                      <button disabled className="px-3 py-1.5 rounded-md border border-neutral-200 text-neutral-400">View</button>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {showNew && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/40" onClick={() => !saving && setShowNew(false)} />
          <div className="relative w-full max-w-lg mx-auto bg-white dark:bg-neutral-900 rounded-xl border border-neutral-200 dark:border-neutral-800 p-6 shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">New Agreement</h3>
              <button onClick={() => !saving && setShowNew(false)} className="text-neutral-500 hover:text-neutral-800" aria-label="Close">✕</button>
            </div>

            {formError && (
              <div className="mb-3 px-3 py-2 rounded-lg border border-red-200 text-red-700 bg-red-50 text-sm">{formError}</div>
            )}

            <form
              onSubmit={async (e) => {
                e.preventDefault()
                setFormError('')
                if (!title.trim() || !client.trim()) {
                  setFormError('Title and Client are required')
                  return
                }
                try {
                  setSaving(true)
                  await agreementsService.create({
                    title: title.trim(),
                    client: client.trim(),
                    status: statusVal,
                    file: fileObj,
                    file_url: fileObj ? undefined : (fileUrl || undefined),
                    file_mime: fileObj ? (fileObj.type || fileMime) : (fileMime || undefined),
                    file_public_id: filePublicId || undefined,
                  })
                  // Refresh list
                  setLoading(true)
                  const data = await agreementsService.list()
                  setItems(Array.isArray(data) ? data : [])
                  setLoading(false)
                  // Reset and close
                  setTitle('')
                  setClient('')
                  setStatusVal('active')
                  setFileUrl('')
                  setFileMime('application/pdf')
                  setFilePublicId('')
                  setFileObj(undefined)
                  setShowNew(false)
                } catch (err: unknown) {
                  setFormError(err instanceof Error ? err.message : 'Failed to create agreement')
                } finally {
                  setSaving(false)
                }
              }}
              className="space-y-4"
            >
              <div className="grid grid-cols-1 gap-4">
                <label className="block">
                  <span className="block text-sm font-medium text-neutral-800 dark:text-neutral-200">Title</span>
                  <input value={title} onChange={(e) => setTitle(e.target.value)} className="mt-1 w-full px-3 py-2 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-950 text-sm" placeholder="Service Agreement v1" />
                </label>
                <label className="block">
                  <span className="block text-sm font-medium text-neutral-800 dark:text-neutral-200">Client</span>
                  <input value={client} onChange={(e) => setClient(e.target.value)} className="mt-1 w-full px-3 py-2 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-950 text-sm" placeholder="ACME Corp" />
                </label>
                <label className="block">
                  <span className="block text-sm font-medium text-neutral-800 dark:text-neutral-200">Status</span>
                  <select value={statusVal} onChange={(e) => setStatusVal(e.target.value as any)} className="mt-1 w-full px-3 py-2 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-950 text-sm">
                    <option value="active">Active</option>
                    <option value="draft">Draft</option>
                    <option value="expired">Expired</option>
                    <option value="archived">Archived</option>
                  </select>
                </label>

                <div className="grid grid-cols-1 gap-3">
                  <div className="text-sm text-neutral-600 dark:text-neutral-300">Attach a file OR provide a hosted URL</div>
                  <label className="block">
                    <span className="block text-sm font-medium text-neutral-800 dark:text-neutral-200">File</span>
                    <input type="file" accept="application/pdf,.pdf" onChange={(e) => setFileObj(e.target.files?.[0])} className="mt-1 block w-full text-sm" />
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <label className="block col-span-2">
                      <span className="block text-sm font-medium text-neutral-800 dark:text-neutral-200">File URL</span>
                      <input value={fileUrl} onChange={(e) => setFileUrl(e.target.value)} className="mt-1 w-full px-3 py-2 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-950 text-sm" placeholder="https://.../agreements/contract.pdf" />
                    </label>
                    <label className="block">
                      <span className="block text-sm font-medium text-neutral-800 dark:text-neutral-200">MIME</span>
                      <input value={fileMime} onChange={(e) => setFileMime(e.target.value)} className="mt-1 w-full px-3 py-2 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-950 text-sm" placeholder="application/pdf" />
                    </label>
                    <label className="block">
                      <span className="block text-sm font-medium text-neutral-800 dark:text-neutral-200">Public ID (optional)</span>
                      <input value={filePublicId} onChange={(e) => setFilePublicId(e.target.value)} className="mt-1 w-full px-3 py-2 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-950 text-sm" placeholder="agreements/contract_abc123" />
                    </label>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button type="button" disabled={saving} onClick={() => setShowNew(false)} className="px-4 py-2 rounded-lg border border-neutral-300 dark:border-neutral-700 text-sm hover:bg-neutral-50 dark:hover:bg-neutral-800">Cancel</button>
                <button type="submit" disabled={saving} className="px-4 py-2 rounded-lg bg-green-600 text-white text-sm font-medium hover:bg-green-700 disabled:opacity-60">{saving ? 'Saving...' : 'Create'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default AdminAgreements
