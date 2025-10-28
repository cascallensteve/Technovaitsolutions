
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
    title: 'Complete Web Solutions',
    body: 'Transform your digital presence with our comprehensive web development services, from responsive websites to complex web applications.',
    primary: { label: 'Start Your Project', href: '/services/web-development' },
  },
  {
    id: 2,
    image: '/images/TECHNOVA3.png',
    title: 'System Modernization Package',
    body: "Upgrade your legacy systems with cutting-edge technology. Boost performance, security, and scalability for the digital age.",
    primary: { label: 'Get Quote', href: '/services/system-revamp' },
    secondary: { label: 'Learn more about modernization', href: '/blog/system-modernization-upgrade-legacy-systems' },
  },
  {
    id: 3,
    image: '/images/NOVATECH.png',
    title: 'Mobile App Development Special',
    body: 'Launch your mobile app on iOS and Android with our expert development team. From concept to app store, we handle it all.',
    primary: { label: 'Build Your App', href: '/services/mobile-app-development' },
    secondary: { label: 'View our portfolio', href: '/portfolio' },
  },
  {
    id: 4,
    image: '/images/MPESA.png',
    title: 'M-Pesa Integration Made Easy',
    body: 'Seamlessly integrate M-Pesa payments into your business. Increase sales with secure, fast mobile money solutions.',
    primary: { label: 'Integrate Now', href: '/services/mpesa-integration' },
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
