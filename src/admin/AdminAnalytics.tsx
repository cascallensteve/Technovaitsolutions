const AdminAnalytics = () => {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <div className="bg-white rounded-xl border border-neutral-200 p-5 shadow-sm">
        <p className="text-sm text-neutral-500">Daily Visitors</p>
        <p className="mt-2 text-3xl font-bold text-neutral-900">5,231</p>
      </div>
      <div className="bg-white rounded-xl border border-neutral-200 p-5 shadow-sm">
        <p className="text-sm text-neutral-500">Conversion Rate</p>
        <p className="mt-2 text-3xl font-bold text-neutral-900">3.9%</p>
      </div>
      <div className="bg-white rounded-xl border border-neutral-200 p-5 shadow-sm md:col-span-2">
        <p className="text-sm font-semibold text-neutral-900 mb-3">Top Sources</p>
        <ul className="text-sm text-neutral-700 list-disc pl-5">
          <li>Google Ads — 1,932</li>
          <li>Organic — 1,201</li>
          <li>Instagram — 889</li>
        </ul>
      </div>
    </div>
  )
}

export default AdminAnalytics
