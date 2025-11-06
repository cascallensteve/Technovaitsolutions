import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { authService } from '../services/authService'

const AdminLayout = () => {
  const navigate = useNavigate()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [now, setNow] = useState(new Date())

  useEffect(() => {
    // Optional guard (basic): if not authenticated, go to admin signin
    const user = authService.getUser() as any
    const token = authService.getToken()
    const isAdmin = user?.is_admin || user?.is_staff || user?.user_type === 'admin'
    if (!token || !isAdmin) {
      // You can relax this if backend session will handle
      // navigate('/admin/signin')
    }
  }, [navigate])

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(id)
  }, [])

  // Force-disable dark mode on mount
  useEffect(() => {
    const root = document.documentElement
    root.classList.remove('dark')
    try { localStorage.removeItem('theme') } catch {}
  }, [])

  return (
    <div className="min-h-screen bg-neutral-50 flex">
      {/* Sidebar */}
      <aside className={`fixed z-30 inset-y-0 left-0 w-64 transform bg-white border-r border-neutral-200 transition-transform duration-200 ease-in-out ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}>
        <div className="h-16 px-4 flex items-center border-b border-neutral-200">
          <span className="text-lg font-bold text-green-700">Technova Admin</span>
        </div>
        <nav className="p-3 space-y-1">
          <NavLink to="/admin" end className={({ isActive }) => `group flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium border-l-2 ${isActive ? 'bg-green-50 text-green-700 border-green-600' : 'text-neutral-700 hover:bg-neutral-50 border-transparent'}`}>
            <svg className={`h-5 w-5 ${false ? '' : ''}`} viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h7v7H3V3zm0 11h7v7H3v-7zm11-11h7v7h-7V3zm0 11h7v7h-7v-7z"/></svg>
            <span>Dashboard</span>
          </NavLink>
          <NavLink to="/admin/users" className={({ isActive }) => `group flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium border-l-2 ${isActive ? 'bg-green-50 text-green-700 border-green-600' : 'text-neutral-700 hover:bg-neutral-50 border-transparent'}`}>
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2m14-10a4 4 0 1 0-8 0 4 4 0 0 0 8 0zm6 10v-2a4 4 0 0 0-3-3.87"/></svg>
            <span>Users</span>
          </NavLink>
          <NavLink to="/admin/projects" className={({ isActive }) => `group flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium border-l-2 ${isActive ? 'bg-green-50 text-green-700 border-green-600' : 'text-neutral-700 hover:bg-neutral-50 border-transparent'}`}>
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7l6-4 6 4v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7z"/></svg>
            <span>Projects</span>
          </NavLink>
          <NavLink to="/admin/agreements" className={({ isActive }) => `group flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium border-l-2 ${isActive ? 'bg-green-50 text-green-700 border-green-600' : 'text-neutral-700 hover:bg-neutral-50 border-transparent'}`}>
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h10M7 11h10M7 15h7M5 5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h10l4 3V7a2 2 0 0 0-2-2H5z"/></svg>
            <span>Agreements</span>
          </NavLink>
          <NavLink to="/admin/inquiries" className={({ isActive }) => `group flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium border-l-2 ${isActive ? 'bg-green-50 text-green-700 border-green-600' : 'text-neutral-700 hover:bg-neutral-50 border-transparent'}`}>
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12c0 4.418-4.03 8-9 8-1.61 0-3.117-.38-4.4-1.04L3 21l1.9-4.1A7.83 7.83 0 0 1 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/></svg>
            <span>Inquiries</span>
          </NavLink>
          <NavLink to="/admin/appointments" className={({ isActive }) => `group flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium border-l-2 ${isActive ? 'bg-green-50 text-green-700 border-green-600' : 'text-neutral-700 hover:bg-neutral-50 border-transparent'}`}>
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3M3 11h18M5 21h14a2 2 0 0 0 2-2V7H3v12a2 2 0 0 0 2 2z"/></svg>
            <span>Appointments</span>
          </NavLink>
          <NavLink to="/admin/analytics" className={({ isActive }) => `group flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium border-l-2 ${isActive ? 'bg-green-50 text-green-700 border-green-600' : 'text-neutral-700 hover:bg-neutral-50 border-transparent'}`}>
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 13h4v8H3v-8zm7-6h4v14h-4V7zm7 3h4v11h-4V10z"/></svg>
            <span>Analytics</span>
          </NavLink>
          <NavLink to="/admin/blog" className={({ isActive }) => `group flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium border-l-2 ${isActive ? 'bg-green-50 text-green-700 border-green-600' : 'text-neutral-700 hover:bg-neutral-50 border-transparent'}`}>
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5h12a2 2 0 0 1 2 2v12l-4-2-4 2-4-2-4 2V7a2 2 0 0 1 2-2z"/></svg>
            <span>Blog</span>
          </NavLink>
          <NavLink to="/admin/profile" className={({ isActive }) => `group flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium border-l-2 ${isActive ? 'bg-green-50 text-green-700 border-green-600' : 'text-neutral-700 hover:bg-neutral-50 border-transparent'}`}>
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 12a5 5 0 1 0-5-5 5 5 0 0 0 5 5zm0 2c-5 0-9 2.5-9 5v1h18v-1c0-2.5-4-5-9-5z"/></svg>
            <span>Profile</span>
          </NavLink>
          <NavLink to="/admin/settings" className={({ isActive }) => `group flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium border-l-2 ${isActive ? 'bg-green-50 text-green-700 border-green-600' : 'text-neutral-700 hover:bg-neutral-50 border-transparent'}`}>
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8a4 4 0 1 0 4 4 4 4 0 0 0-4-4zm8.94 4a7.94 7.94 0 0 0-.26-2l2.12-1.65-2-3.46-2.5 1a8.06 8.06 0 0 0-3.46-2l-.38-2.65h-4l-.38 2.65a8.06 8.06 0 0 0-3.46 2l-2.5-1-2 3.46L3.32 10a7.94 7.94 0 0 0 0 4l-2.12 1.65 2 3.46 2.5-1a8.06 8.06 0 0 0 3.46 2l.38 2.65h4l.38-2.65a8.06 8.06 0 0 0 3.46-2l2.5 1 2-3.46L20.68 14a7.94 7.94 0 0 0 .26-2z"/></svg>
            <span>Settings</span>
          </NavLink>
        </nav>
      </aside>

      {/* Main area */}
      <div className="flex-1 md:ml-64">
        {/* Topbar */}
        <header className="sticky top-0 z-20 h-16 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80 border-b border-neutral-200 flex items-center justify-between px-4">
          <div className="flex items-center gap-3">
            <button className="md:hidden inline-flex items-center justify-center h-10 w-10 rounded hover:bg-neutral-100" onClick={() => setSidebarOpen(!sidebarOpen)} aria-label="Toggle menu">
              <svg className="h-6 w-6 text-neutral-700" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16"/></svg>
            </button>
            <h1 className="text-lg font-semibold text-neutral-900">Admin</h1>
          </div>
          <div className="hidden md:flex flex-1 max-w-xl mx-4">
            <div className="relative w-full">
              <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-neutral-400">
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M10 18a8 8 0 1 1 0-16 8 8 0 0 1 0 16z"/></svg>
              </span>
              <input
                type="text"
                placeholder="Search..."
                className="w-full pl-10 pr-3 py-2 rounded-lg border border-neutral-300 bg-white text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden lg:flex items-center text-sm text-neutral-600 px-3 py-1 rounded-md border border-neutral-200">
              <svg className="h-4 w-4 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 1 1-18 0 9 9 0 0 1 18 0z"/></svg>
              <span>{now.toLocaleString(undefined, { weekday: 'short', year: 'numeric', month: 'short', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' })}</span>
            </div>
            <button onClick={() => navigate('/')} className="hidden sm:inline-flex text-sm text-neutral-600 hover:text-neutral-900">View site</button>
            <button className="inline-flex items-center justify-center h-10 w-10 rounded-full hover:bg-neutral-100" aria-label="Notifications">
              <svg className="h-5 w-5 text-neutral-600" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0 1 18 14.158V11a6.002 6.002 0 0 0-4-5.659V4a2 2 0 1 0-4 0v1.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 1 1-6 0v-1m6 0H9"/></svg>
            </button>
            <div className="hidden md:flex items-center gap-3 pl-3 ml-1 border-l border-neutral-200">
              <div className="h-8 w-8 rounded-full bg-green-600 text-white flex items-center justify-center text-sm font-semibold">AD</div>
              <span className="text-sm font-medium text-neutral-800">Admin</span>
            </div>
            <button onClick={() => { authService.signOut(); navigate('/admin/signin') }} className="inline-flex items-center px-3 py-1.5 rounded-md bg-red-600 text-white text-sm font-medium hover:bg-red-700">Sign out</button>
          </div>
        </header>

        {/* Content */}
        <main className="p-4 md:p-6 text-neutral-900">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default AdminLayout
