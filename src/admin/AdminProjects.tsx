const AdminProjects = () => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-neutral-900">Projects</h2>
        <button className="px-4 py-2 rounded-lg bg-green-600 text-white text-sm font-medium hover:bg-green-700">New Project</button>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {[1,2,3,4].map(i => (
          <div key={i} className="bg-white border border-neutral-200 rounded-xl p-4 shadow-sm">
            <p className="text-neutral-900 font-semibold">Project {i}</p>
            <p className="text-neutral-600 text-sm mt-1">Client: Acme Inc.</p>
            <div className="mt-3 flex items-center gap-2">
              <span className="px-2 py-1 rounded bg-amber-100 text-amber-800 text-xs">In Progress</span>
              <span className="px-2 py-1 rounded bg-blue-100 text-blue-800 text-xs">Website</span>
            </div>
            <div className="mt-4 flex items-center gap-3 text-sm">
              <button className="text-green-700 hover:underline">Open</button>
              <button className="text-neutral-600 hover:underline">Edit</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default AdminProjects
