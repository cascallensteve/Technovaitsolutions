const AdminUsers = () => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-neutral-900">Users</h2>
        <button className="px-4 py-2 rounded-lg bg-green-600 text-white text-sm font-medium hover:bg-green-700">Invite User</button>
      </div>
      <div className="bg-white border border-neutral-200 rounded-xl overflow-hidden shadow-sm">
        <table className="w-full text-sm">
          <thead className="bg-neutral-50 text-neutral-600">
            <tr>
              <th className="text-left py-3 px-4">Username</th>
              <th className="text-left py-3 px-4">Email</th>
              <th className="text-left py-3 px-4">Role</th>
              <th className="text-left py-3 px-4">Status</th>
              <th className="text-left py-3 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-t border-neutral-200">
              <td className="py-3 px-4">john_doe</td>
              <td className="py-3 px-4">john@example.com</td>
              <td className="py-3 px-4">User</td>
              <td className="py-3 px-4"><span className="px-2 py-1 rounded bg-emerald-100 text-emerald-700">Active</span></td>
              <td className="py-3 px-4"><button className="text-green-700 hover:underline">Manage</button></td>
            </tr>
            <tr className="border-t border-neutral-200">
              <td className="py-3 px-4">admin_technova</td>
              <td className="py-3 px-4">admin@technova.com</td>
              <td className="py-3 px-4">Admin</td>
              <td className="py-3 px-4"><span className="px-2 py-1 rounded bg-emerald-100 text-emerald-700">Active</span></td>
              <td className="py-3 px-4"><button className="text-green-700 hover:underline">Manage</button></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default AdminUsers
