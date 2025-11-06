import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const AdminDashboard = () => {
  return (
    <div className="min-h-screen bg-neutral-50 flex flex-col">
      <Navbar />
      <main className="flex-1 px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-2xl shadow-sm border border-neutral-200 p-6">
            <h1 className="text-2xl font-bold text-neutral-900 mb-2">Admin Dashboard</h1>
            <p className="text-neutral-600">Welcome to Technova admin. This is a placeholder dashboard. Tell me what widgets you want here (users, projects, stats, etc.).</p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default AdminDashboard
