import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { listInquiries as fetchInquiriesApi } from '../services/contact'

const AdminInquiries = () => {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState<'inquiries' | 'company'>('inquiries')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [items, setItems] = useState<Array<{
    id?: number
    first_name: string
    last_name: string
    email: string
    company?: string
    message?: string
    created_at?: string
    status?: string
  }>>([])

  useEffect(() => {
    const fetchInquiries = async () => {
      setLoading(true)
      setError('')
      try {
        const data = await fetchInquiriesApi()
        const list = Array.isArray(data) ? data : (data?.results || [])
        setItems(list)
      } catch (e: unknown) {
        setError(e instanceof Error ? e.message : 'Failed to load inquiries')
      } finally {
        setLoading(false)
      }
    }
    fetchInquiries()
  }, [navigate])

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-neutral-900">Inquiries</h2>
        <div className="flex items-center gap-2">
          <input className="border border-neutral-300 rounded-lg px-3 py-2 text-sm" placeholder="Search inquiries..." />
          <button className="px-4 py-2 rounded-lg border border-neutral-300 text-sm font-medium hover:bg-neutral-50">Export</button>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button onClick={() => setActiveTab('inquiries')} className={`px-4 py-2 rounded-lg text-sm font-medium border ${activeTab === 'inquiries' ? 'bg-green-600 text-white border-green-600' : 'border-neutral-300 text-neutral-700 hover:bg-neutral-50'}`}>Inquiries</button>
        <button onClick={() => setActiveTab('company')} className={`px-4 py-2 rounded-lg text-sm font-medium border ${activeTab === 'company' ? 'bg-green-600 text-white border-green-600' : 'border-neutral-300 text-neutral-700 hover:bg-neutral-50'}`}>Company</button>
      </div>

      {activeTab === 'inquiries' && (
        <div className="bg-white border border-neutral-200 rounded-xl overflow-hidden shadow-sm">
          {loading && (
            <div className="p-6 text-sm text-neutral-600">Loading inquiries...</div>
          )}
          {error && !loading && (
            <div className="p-6 text-sm text-red-700 bg-red-50 border-b border-red-200 flex items-center justify-between gap-3">
              <span>{error}</span>
              <button onClick={() => navigate('/admin/signin')} className="px-3 py-1.5 rounded-md bg-green-600 text-white text-xs font-medium hover:bg-green-700">Go to Admin Sign In</button>
            </div>
          )}
          {!loading && !error && (
            <table className="w-full text-sm">
              <thead className="bg-neutral-50 text-neutral-600">
                <tr>
                  <th className="text-left py-3 px-4">Name</th>
                  <th className="text-left py-3 px-4">Email</th>
                  <th className="text-left py-3 px-4">Company</th>
                  <th className="text-left py-3 px-4">Message</th>
                  <th className="text-left py-3 px-4">Received</th>
                </tr>
              </thead>
              <tbody>
                {items.length === 0 && (
                  <tr>
                    <td colSpan={5} className="py-6 px-4 text-neutral-500 text-center">No inquiries yet.</td>
                  </tr>
                )}
                {items.map((item, idx) => (
                  <tr key={item.id ?? idx} className="border-t border-neutral-200 align-top">
                    <td className="py-3 px-4 font-medium text-neutral-900">{item.first_name} {item.last_name}</td>
                    <td className="py-3 px-4 text-neutral-700">{item.email}</td>
                    <td className="py-3 px-4 text-neutral-700">{item.company || '-'}</td>
                    <td className="py-3 px-4 text-neutral-700 max-w-[22rem] truncate" title={item.message}>{item.message}</td>
                    <td className="py-3 px-4 text-neutral-600">{item.created_at ? new Date(item.created_at).toLocaleString() : '-'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}

      {activeTab === 'company' && (
        <div className="bg-white border border-neutral-200 rounded-xl p-5 shadow-sm">
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">First name</label>
              <input className="w-full border border-neutral-300 rounded-lg px-3 py-2" placeholder="First name" />
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">Last name</label>
              <input className="w-full border border-neutral-300 rounded-lg px-3 py-2" placeholder="Last name" />
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">Email address</label>
              <input type="email" className="w-full border border-neutral-300 rounded-lg px-3 py-2" placeholder="name@company.com" />
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">Company (optional)</label>
              <input className="w-full border border-neutral-300 rounded-lg px-3 py-2" placeholder="Company" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-neutral-700 mb-1">Message</label>
              <textarea rows={5} className="w-full border border-neutral-300 rounded-lg px-3 py-2" placeholder="Write your message..."></textarea>
            </div>
          </div>
          <div className="mt-4 flex items-center gap-3">
            <button className="px-4 py-2 rounded-lg bg-green-600 text-white text-sm font-medium hover:bg-green-700">Save</button>
            <button className="px-4 py-2 rounded-lg border border-neutral-300 text-sm font-medium hover:bg-neutral-50">Cancel</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AdminInquiries
