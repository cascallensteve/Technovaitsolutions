const AdminAppointments = () => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-neutral-900">Appointments</h2>
        <div className="flex items-center gap-2">
          <input className="border border-neutral-300 rounded-lg px-3 py-2 text-sm" placeholder="Search appointments..." />
          <button className="px-4 py-2 rounded-lg border border-neutral-300 text-sm font-medium hover:bg-neutral-50">Export</button>
        </div>
      </div>

      <div className="bg-white border border-neutral-200 rounded-xl overflow-hidden shadow-sm">
        <table className="w-full text-sm">
          <thead className="bg-neutral-50 text-neutral-600">
            <tr>
              <th className="text-left py-3 px-4">Client</th>
              <th className="text-left py-3 px-4">Email</th>
              <th className="text-left py-3 px-4">Date</th>
              <th className="text-left py-3 px-4">Time</th>
              <th className="text-left py-3 px-4">Type</th>
              <th className="text-left py-3 px-4">Status</th>
              <th className="text-left py-3 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {[1,2,3].map(i => (
              <tr key={i} className="border-t border-neutral-200">
                <td className="py-3 px-4">Alex Kim</td>
                <td className="py-3 px-4">alex@example.com</td>
                <td className="py-3 px-4">Nov 10, 2025</td>
                <td className="py-3 px-4">2:30 PM</td>
                <td className="py-3 px-4">Project Call</td>
                <td className="py-3 px-4"><span className="px-2 py-1 rounded bg-emerald-100 text-emerald-700">Scheduled</span></td>
                <td className="py-3 px-4 flex items-center gap-3">
                  <button className="text-green-700 hover:underline">View</button>
                  <button className="text-neutral-600 hover:underline">Reschedule</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default AdminAppointments
