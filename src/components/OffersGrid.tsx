
interface Card {
  id: number
  image?: string
  title: string
  body: string
  primary: { label: string; href: string }
  secondary?: { label: string; href: string }
}

const cards: Card[] = [
  {
    id: 1,
    image: '/images/Technova1.png',
    title: 'Microsoft 365',
    body: 'Introducing Microsoft 365 Premium with our highest usage limits and exclusive Copilot features for AI power users.',
    primary: { label: 'Discover Microsoft 365 Premium', href: '#m365' },
  },
  {
    id: 2,
    image: '/images/TECHNOVA3.png',
    title: 'Save up to $600 on Surface Laptop, 13.8-inch',
    body: "Speed, style, and built-in intelligence—it's a gift for all seasons.",
    primary: { label: 'Shop now', href: '#shop-surface' },
    secondary: { label: 'Learn more about trade-ins', href: '#trade-in' },
  },
  {
    id: 3,
    image: '/images/NOVATECH.png',
    title: 'Up to $600 with eligible trade-in',
    body: 'Buy a select new Surface Pro, Copilot+ PC by 12/31 and get extra cash back to spend on gifts—or yourself, or to make someone’s holiday extra bright.',
    primary: { label: 'Shop now', href: '#shop-trade' },
    secondary: { label: 'Learn more about trade-ins', href: '#trade-more' },
  },
  {
    id: 4,
    image: '/images/NOVATECH.png',
    title: 'Wrap up a custom controller',
    body: 'Bold colors. Unique patterns. Match their vibe with Xbox Design Lab.',
    primary: { label: 'Design yours', href: '#design-controller' },
  },
]

const OffersGrid: React.FC = () => {
  return (
    <section className="w-full py-10">
      <div className="px-4 md:px-6 lg:px-16">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map((c) => (
            <article key={c.id} className="rounded-2xl border border-black/10 bg-white shadow-sm overflow-hidden">
              {c.image && (
                <div className="aspect-[16/9] w-full overflow-hidden">
                  <div
                    className="h-full w-full bg-cover bg-center"
                    style={{ backgroundImage: `url('${c.image}')` }}
                    aria-hidden="true"
                  />
                </div>
              )}
              <div className="p-5">
                <h3 className="text-lg font-semibold text-neutral-900">{c.title}</h3>
                <p className="mt-2 text-sm text-neutral-700 leading-relaxed">{c.body}</p>
                <div className="mt-5 flex flex-col gap-3">
                  <a
                    href={c.primary.href}
                    className="inline-flex items-center justify-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow hover:bg-blue-700"
                  >
                    {c.primary.label}
                  </a>
                  {c.secondary && (
                    <a
                      href={c.secondary.href}
                      className="inline-flex items-center justify-center rounded-md border border-blue-300 bg-blue-50 px-4 py-2 text-sm font-medium text-blue-700 hover:bg-blue-100"
                    >
                      {c.secondary.label}
                    </a>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default OffersGrid
