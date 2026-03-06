import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { authService } from '../services/authService'

const AdminLanding = () => {
  const navigate = useNavigate()

  useEffect(() => {
    const token = authService.getToken()
    if (token) {
      navigate('/admin/dashboard')
    }
  }, [navigate])

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-neutral-100 flex flex-col">
      <Navbar />
      <main className="flex-1 px-4 py-12">
        <div className="max-w-5xl mx-auto">
          <div className="grid gap-8 lg:grid-cols-2 items-center">
            <div>
              <p className="inline-flex items-center rounded-full bg-green-50 text-green-700 border border-green-200 px-3 py-1 text-sm font-medium">
                Admin portal
              </p>
              <h1 className="mt-4 text-4xl font-extrabold text-neutral-900 tracking-tight">
                Technova Admin
              </h1>
              <p className="mt-3 text-neutral-600 text-lg">
                Sign in to manage users, projects, inquiries, appointments, blog content, and analytics.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <button
                  onClick={() => navigate('/admin/signin')}
                  className="px-5 py-3 rounded-lg bg-green-600 text-white font-semibold hover:bg-green-700 transition"
                >
                  Go to Admin Login
                </button>
                <button
                  onClick={() => navigate('/admin/signup')}
                  className="px-5 py-3 rounded-lg border border-neutral-300 bg-white text-neutral-900 font-semibold hover:bg-neutral-50 transition"
                >
                  Create Admin Account
                </button>
              </div>

              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                <div className="bg-white rounded-xl border border-neutral-200 p-4 shadow-sm">
                  <p className="text-sm font-semibold text-neutral-900">Secure access</p>
                  <p className="mt-1 text-sm text-neutral-600">Admins only. Non-admin users are redirected to login.</p>
                </div>
                <div className="bg-white rounded-xl border border-neutral-200 p-4 shadow-sm">
                  <p className="text-sm font-semibold text-neutral-900">Fast navigation</p>
                  <p className="mt-1 text-sm text-neutral-600">After login you’ll land on the dashboard and sidebar navigation.</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-neutral-200 shadow-lg p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-neutral-500">Quick links</p>
                  <p className="mt-1 text-lg font-semibold text-neutral-900">Admin pages</p>
                </div>
                <div className="h-10 w-10 rounded-xl bg-green-600 text-white flex items-center justify-center font-bold">
                  TA
                </div>
              </div>

              <div className="mt-6 grid gap-3">
                <button onClick={() => navigate('/admin/dashboard')} className="w-full text-left rounded-lg border border-neutral-200 px-4 py-3 hover:bg-neutral-50">
                  <p className="text-sm font-semibold text-neutral-900">Dashboard</p>
                  <p className="text-sm text-neutral-600">Overview and quick actions</p>
                </button>
                <button onClick={() => navigate('/admin/users')} className="w-full text-left rounded-lg border border-neutral-200 px-4 py-3 hover:bg-neutral-50">
                  <p className="text-sm font-semibold text-neutral-900">Users</p>
                  <p className="text-sm text-neutral-600">Manage user accounts and roles</p>
                </button>
                <button onClick={() => navigate('/admin/projects')} className="w-full text-left rounded-lg border border-neutral-200 px-4 py-3 hover:bg-neutral-50">
                  <p className="text-sm font-semibold text-neutral-900">Projects</p>
                  <p className="text-sm text-neutral-600">Track and manage projects</p>
                </button>
                <button onClick={() => navigate('/admin/inquiries')} className="w-full text-left rounded-lg border border-neutral-200 px-4 py-3 hover:bg-neutral-50">
                  <p className="text-sm font-semibold text-neutral-900">Inquiries</p>
                  <p className="text-sm text-neutral-600">View new leads and messages</p>
                </button>
              </div>

              <div className="mt-6 rounded-lg bg-neutral-50 border border-neutral-200 p-4">
                <p className="text-sm font-semibold text-neutral-900">Admin login link</p>
                <p className="mt-1 text-sm text-neutral-600 break-all">
                  /admin/signin
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default AdminLanding
