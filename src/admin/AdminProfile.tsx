import { useEffect, useState } from 'react'

type Profile = {
  user_id?: number
  username?: string
  email?: string
  user_type?: string
  is_admin?: boolean
  is_staff?: boolean
}

export default function AdminProfile() {
  const [profile, setProfile] = useState<Profile | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    setLoading(true)
    setError('')
    try {
      if (typeof window === 'undefined') {
        setProfile(null)
      } else {
        const stored = localStorage.getItem('user')
        const parsed = stored ? JSON.parse(stored) : null
        setProfile(parsed)
      }
    } catch (e: any) {
      setError(e?.message || 'Failed to load profile')
    } finally {
      setLoading(false)
    }
  }, [])

  const token = (typeof window !== 'undefined') ? localStorage.getItem('adminToken') : null
  const maskedToken = token ? `${token.slice(0, 6)}…${token.slice(-6)}` : '—'

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-neutral-900">Profile</h2>
      </div>

      <div className="bg-white border border-neutral-200 rounded-xl overflow-hidden shadow-sm">
        {loading && (
          <div className="p-6 text-sm text-neutral-600">Loading profile...</div>
        )}
        {error && !loading && (
          <div className="p-6 text-sm text-red-700 bg-red-50 border-b border-red-200">{error}</div>
        )}
        {!loading && !error && (
          <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <div className="text-neutral-500">User ID</div>
              <div className="font-medium">{profile?.user_id ?? '—'}</div>
            </div>
            <div>
              <div className="text-neutral-500">Username</div>
              <div className="font-medium">{profile?.username ?? '—'}</div>
            </div>
            <div>
              <div className="text-neutral-500">Email</div>
              <div className="font-medium">{profile?.email ?? '—'}</div>
            </div>
            <div>
              <div className="text-neutral-500">User Type</div>
              <div className="font-medium">{profile?.user_type ?? '—'}</div>
            </div>
            <div>
              <div className="text-neutral-500">is_admin</div>
              <div className="font-medium">{String(profile?.is_admin ?? '—')}</div>
            </div>
            <div>
              <div className="text-neutral-500">is_staff</div>
              <div className="font-medium">{String(profile?.is_staff ?? '—')}</div>
            </div>
            <div className="md:col-span-2">
              <div className="text-neutral-500">Token</div>
              <div className="flex items-center gap-2">
                <div className="font-medium break-all">{maskedToken}</div>
                {token && (
                  <button
                    onClick={() => navigator.clipboard.writeText(token)}
                    className="px-2 py-1 rounded-md border border-neutral-300 text-xs hover:bg-neutral-50"
                  >Copy</button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
