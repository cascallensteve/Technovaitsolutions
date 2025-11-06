import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { authService } from '../services/authService'

interface UserData {
  user_id: number
  username: string
  email: string
}

const Profile = () => {
  const navigate = useNavigate()
  const [user, setUser] = useState<UserData | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check if user is authenticated
    const userData = authService.getUser()
    if (!userData) {
      // Redirect to admin signin if not authenticated
      navigate('/admin/signin')
      return
    }
    setUser(userData as UserData)
    setIsLoading(false)
  }, [navigate])

  const handleSignOut = () => {
    authService.signOut()
    navigate('/admin/signin')
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-neutral-100 flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-green-100 mb-4">
              <div className="w-8 h-8 border-4 border-green-200 border-t-green-600 rounded-full animate-spin"></div>
            </div>
            <p className="text-neutral-600">Loading profile...</p>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen bg-neutral-50 flex flex-col">
      <Navbar />

      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          {/* Profile Card */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-green-600 to-green-700 px-6 py-8 text-center">
              <div className="w-20 h-20 rounded-full bg-white bg-opacity-20 flex items-center justify-center mx-auto mb-4 border-2 border-white">
                <span className="text-4xl font-bold text-white">
                  {user.username.charAt(0).toUpperCase()}
                </span>
              </div>
              <h1 className="text-2xl font-bold text-white mb-1">{user.username}</h1>
              <p className="text-green-100 text-sm">Account verified</p>
            </div>

            {/* Content */}
            <div className="px-6 py-8 space-y-6">
              {/* Email */}
              <div>
                <p className="text-xs font-semibold text-neutral-500 uppercase tracking-wide mb-2">Email</p>
                <p className="text-neutral-900 font-medium">{user.email}</p>
              </div>

              {/* Divider */}
              <div className="border-t border-neutral-200"></div>

              {/* Quick Links */}
              <div className="space-y-2">
                <p className="text-xs font-semibold text-neutral-500 uppercase tracking-wide mb-3">Quick Links</p>
                <button
                  onClick={() => navigate('/services')}
                  className="w-full text-left px-4 py-2 text-green-600 hover:bg-green-50 rounded-lg transition font-medium text-sm"
                >
                  → Explore Services
                </button>
                <button
                  onClick={() => navigate('/blog')}
                  className="w-full text-left px-4 py-2 text-green-600 hover:bg-green-50 rounded-lg transition font-medium text-sm"
                >
                  → Read Our Blog
                </button>
                <button
                  onClick={() => navigate('/contact')}
                  className="w-full text-left px-4 py-2 text-green-600 hover:bg-green-50 rounded-lg transition font-medium text-sm"
                >
                  → Contact Us
                </button>
                <button
                  onClick={() => navigate('/portfolio')}
                  className="w-full text-left px-4 py-2 text-green-600 hover:bg-green-50 rounded-lg transition font-medium text-sm"
                >
                  → View Portfolio
                </button>
              </div>

              {/* Divider */}
              <div className="border-t border-neutral-200"></div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <button
                  onClick={() => navigate('/')}
                  className="w-full px-4 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition"
                >
                  Back to Home
                </button>
                <button
                  onClick={handleSignOut}
                  className="w-full px-4 py-3 border-2 border-red-600 text-red-600 font-semibold rounded-lg hover:bg-red-50 transition"
                >
                  Sign Out
                </button>
              </div>
            </div>
          </div>

          {/* Info Box */}
          <div className="mt-6 bg-white rounded-lg shadow-sm p-4 border-l-4 border-green-600">
            <p className="text-sm text-neutral-600">
              Welcome to your Technova account! Your profile is active and verified. You can now access all services.
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default Profile
