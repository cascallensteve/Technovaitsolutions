const AdminHome = () => {
  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
      <div className="bg-white rounded-xl border border-neutral-200 p-5 shadow-sm">
        <p className="text-sm text-neutral-500">Total Users</p>
        <p className="mt-2 text-3xl font-bold text-neutral-900">1,248</p>
      </div>
      <div className="bg-white rounded-xl border border-neutral-200 p-5 shadow-sm">
        <p className="text-sm text-neutral-500">Active Projects</p>
        <p className="mt-2 text-3xl font-bold text-neutral-900">24</p>
      </div>
      <div className="bg-white rounded-xl border border-neutral-200 p-5 shadow-sm">
        <p className="text-sm text-neutral-500">Monthly Revenue</p>
        <p className="mt-2 text-3xl font-bold text-neutral-900">$12,430</p>
      </div>
      <div className="bg-white rounded-xl border border-neutral-200 p-5 shadow-sm">
        <p className="text-sm text-neutral-500">New Leads</p>
        <p className="mt-2 text-3xl font-bold text-neutral-900">39</p>
      </div>

      <div className="bg-white rounded-xl border border-neutral-200 p-5 shadow-sm md:col-span-2">
        <p className="text-sm font-semibold text-neutral-900 mb-4">Recent Activity</p>
        <ul className="space-y-3 text-sm text-neutral-700">
          <li>• New user registered: john_doe</li>
          <li>• Project "E-Commerce Revamp" moved to In Progress</li>
          <li>• Payment received: $1,120 from Acme Inc.</li>
        </ul>
      </div>

      <div className="bg-white rounded-xl border border-neutral-200 p-5 shadow-sm md:col-span-2">
        <p className="text-sm font-semibold text-neutral-900 mb-4">Quick Actions</p>
        <div className="flex flex-wrap gap-3">
          <button className="px-4 py-2 rounded-lg bg-green-600 text-white text-sm font-medium hover:bg-green-700">New Project</button>
          <button className="px-4 py-2 rounded-lg border border-neutral-300 text-sm font-medium hover:bg-neutral-50">Invite User</button>
          <button className="px-4 py-2 rounded-lg border border-neutral-300 text-sm font-medium hover:bg-neutral-50">Create Invoice</button>
        </div>
      </div>
    </div>
  )
}

export default AdminHome
