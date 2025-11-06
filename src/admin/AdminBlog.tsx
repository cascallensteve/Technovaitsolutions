import { useState } from 'react'

const AdminBlog = () => {
  const [search, setSearch] = useState('')

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-neutral-900">Blog</h2>
        <a href="/blog" className="px-4 py-2 rounded-lg bg-green-600 text-white text-sm font-medium hover:bg-green-700">View Public Blog</a>
      </div>

      <div className="bg-white rounded-xl border border-neutral-200 p-4">
        <div className="flex flex-col md:flex-row md:items-center gap-3">
          <div className="flex-1">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search posts..."
              className="w-full px-3 py-2 rounded-lg border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <div className="flex items-center gap-3">
            <button className="px-4 py-2 rounded-lg border border-neutral-300 text-sm font-medium hover:bg-neutral-50">Draft</button>
            <button className="px-4 py-2 rounded-lg border border-neutral-300 text-sm font-medium hover:bg-neutral-50">Published</button>
            <button className="px-4 py-2 rounded-lg bg-green-600 text-white text-sm font-medium hover:bg-green-700">New Post</button>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-neutral-200 overflow-hidden">
        <div className="grid grid-cols-12 gap-0 text-sm font-medium bg-neutral-50 border-b border-neutral-200">
          <div className="col-span-6 px-4 py-3 text-neutral-700">Title</div>
          <div className="col-span-2 px-4 py-3 text-neutral-700">Status</div>
          <div className="col-span-2 px-4 py-3 text-neutral-700">Updated</div>
          <div className="col-span-2 px-4 py-3 text-neutral-700">Actions</div>
        </div>
        <div className="divide-y divide-neutral-200">
          <div className="grid grid-cols-12 text-sm">
            <div className="col-span-6 px-4 py-3">How we deliver quality software</div>
            <div className="col-span-2 px-4 py-3"><span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">Published</span></div>
            <div className="col-span-2 px-4 py-3 text-neutral-500">2 days ago</div>
            <div className="col-span-2 px-4 py-3">
              <div className="flex gap-2">
                <button className="px-3 py-1.5 rounded-md border border-neutral-300 hover:bg-neutral-50">Edit</button>
                <button className="px-3 py-1.5 rounded-md border border-neutral-300 hover:bg-neutral-50">More</button>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-12 text-sm">
            <div className="col-span-6 px-4 py-3">Trends in M-Pesa integration</div>
            <div className="col-span-2 px-4 py-3"><span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-700">Draft</span></div>
            <div className="col-span-2 px-4 py-3 text-neutral-500">5 hours ago</div>
            <div className="col-span-2 px-4 py-3">
              <div className="flex gap-2">
                <button className="px-3 py-1.5 rounded-md border border-neutral-300 hover:bg-neutral-50">Edit</button>
                <button className="px-3 py-1.5 rounded-md border border-neutral-300 hover:bg-neutral-50">More</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminBlog
