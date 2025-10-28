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
      // Redirect to signin if not authenticated
      navigate('/signin')
      return
    }
    setUser(userData)
    setIsLoading(false)
  }, [navigate])

  const handleSignOut = () => {
    authService.signOut()
    navigate('/signin')
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
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-neutral-100 flex flex-col">
      <Navbar />

      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-2xl">
          {/* Main Profile Card */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            {/* Header Background */}
            <div className="h-32 bg-gradient-to-r from-green-500 to-green-600"></div>

            {/* Profile Content */}
            <div className="px-6 md:px-8 pb-8">
              {/* Avatar and Basic Info */}
              <div className="flex flex-col md:flex-row md:items-end md:gap-6 -mt-16 mb-8">
                {/* Avatar */}
                <div className="flex-shrink-0 mb-4 md:mb-0">
                  <div className="w-32 h-32 rounded-full bg-gradient-to-br from-green-400 to-green-600 border-4 border-white shadow-lg flex items-center justify-center">
                    <span className="text-5xl font-bold text-white">
                      {user.username.charAt(0).toUpperCase()}
                    </span>
                  </div>
                </div>

                {/* User Info */}
                <div className="flex-1">
                  <h1 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-2">
                    {user.username}
                  </h1>
                  <p className="text-neutral-600 text-lg mb-4">
                    Welcome to your Technova profile
                  </p>
                  <div className="flex gap-3">
                    <button
                      onClick={handleSignOut}
                      className="px-6 py-2 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition"
                    >
                      Sign Out
                    </button>
                    <button
                      onClick={() => navigate('/')}
                      className="px-6 py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition"
                    >
                      Back to Home
                    </button>
                  </div>
                </div>
              </div>

              {/* Account Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {/* User ID Card */}
                <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6 border border-green-200">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-full bg-green-600 flex items-center justify-center">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <h3 className="text-sm font-semibold text-neutral-700">User ID</h3>
                  </div>
                  <p className="text-2xl font-bold text-green-600">{user.user_id}</p>
                </div>

                {/* Username Card */}
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 border border-blue-200">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    <h3 className="text-sm font-semibold text-neutral-700">Username</h3>
                  </div>
                  <p className="text-2xl font-bold text-blue-600">@{user.username}</p>
                </div>

                {/* Email Card */}
                <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6 border border-purple-200 md:col-span-2">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <h3 className="text-sm font-semibold text-neutral-700">Email Address</h3>
                  </div>
                  <p className="text-lg font-semibold text-purple-600">{user.email}</p>
                </div>
              </div>

              {/* Account Status */}
              <div className="bg-green-50 border border-green-200 rounded-xl p-6">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-12 w-12 rounded-md bg-green-600">
                      <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-neutral-900">Account Active</h3>
                    <p className="mt-2 text-sm text-neutral-600">
                      Your account is active and ready to use. You have full access to all Technova services and features.
                    </p>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
                <button className="p-4 border-2 border-neutral-200 rounded-lg hover:border-green-600 hover:bg-green-50 transition text-center">
                  <svg className="w-8 h-8 mx-auto mb-2 text-neutral-600 group-hover:text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <p className="font-semibold text-neutral-900">Settings</p>
                  <p className="text-xs text-neutral-600 mt-1">Manage your account</p>
                </button>

                <button className="p-4 border-2 border-neutral-200 rounded-lg hover:border-green-600 hover:bg-green-50 transition text-center">
                  <svg className="w-8 h-8 mx-auto mb-2 text-neutral-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                  </svg>
                  <p className="font-semibold text-neutral-900">Preferences</p>
                  <p className="text-xs text-neutral-600 mt-1">Customize experience</p>
                </button>

                <button className="p-4 border-2 border-neutral-200 rounded-lg hover:border-green-600 hover:bg-green-50 transition text-center">
                  <svg className="w-8 h-8 mx-auto mb-2 text-neutral-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                  <p className="font-semibold text-neutral-900">Support</p>
                  <p className="text-xs text-neutral-600 mt-1">Get help & support</p>
                </button>
              </div>
            </div>
          </div>

          {/* Additional Info */}
          <div className="mt-6 bg-white rounded-xl shadow-md p-6 border-l-4 border-green-600">
            <h3 className="text-lg font-semibold text-neutral-900 mb-3">Welcome to Technova!</h3>
            <p className="text-neutral-600 mb-4">
              You're now logged in and can access all of our services. Explore our platform to discover amazing features and opportunities.
            </p>
            <div className="flex gap-3">
              <a href="/services" className="text-green-600 font-semibold hover:underline">
                Explore Services →
              </a>
              <a href="/portfolio" className="text-green-600 font-semibold hover:underline">
                View Portfolio →
              </a>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default Profile
