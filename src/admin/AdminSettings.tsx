const AdminSettings = () => {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <div className="bg-white dark:bg-neutral-900 rounded-xl border border-neutral-200 dark:border-neutral-800 p-5 shadow-sm">
        <p className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">Organization</p>
        <div className="mt-3 space-y-3 text-sm">
          <div>
            <label className="block text-neutral-700 dark:text-neutral-300 mb-1">Name</label>
            <input className="w-full border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 rounded-lg px-3 py-2" defaultValue="Technova" />
          </div>
          <div>
            <label className="block text-neutral-700 dark:text-neutral-300 mb-1">Support Email</label>
            <input className="w-full border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 rounded-lg px-3 py-2" defaultValue="support@technova.com" />
          </div>
        </div>
      </div>
      <div className="bg-white dark:bg-neutral-900 rounded-xl border border-neutral-200 dark:border-neutral-800 p-5 shadow-sm">
        <p className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">Security</p>
        <div className="mt-3 space-y-3 text-sm text-neutral-800 dark:text-neutral-200">
          <label className="inline-flex items-center gap-2"><input type="checkbox" defaultChecked className="h-4 w-4"/> Require 2FA for admins</label>
          <label className="inline-flex items-center gap-2"><input type="checkbox" className="h-4 w-4"/> Notify on new device login</label>
        </div>
      </div>
    </div>
  )
}

export default AdminSettings
