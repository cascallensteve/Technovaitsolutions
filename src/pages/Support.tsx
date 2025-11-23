import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import WhatsAppButton from '../components/WhatsAppButton'
import { useDocumentTitle } from '../hooks/useDocumentTitle'

const Support = () => {
  useDocumentTitle('Support | Technova IT Solutions')

  return (
    <div className="min-h-screen bg-white text-neutral-900">
      <Navbar />

      <section className="relative w-full overflow-hidden">
        <div className="relative w-full min-h-[40vh]">
          <div
            className="absolute inset-0 w-full h-full bg-cover bg-center"
            style={{
              backgroundImage:
                "url('https://res.cloudinary.com/djksfayfu/image/upload/v1762517470/modern-brick-wall-textured-background_gsjaqw.webp')",
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 via-blue-800/60 to-transparent" />
          <div className="relative z-10 w-full h-full flex items-center py-16 px-4 md:px-6 lg:px-16">
            <div className="text-white max-w-3xl">
              <h1 className="text-4xl md:text-5xl font-bold">Support</h1>
              <p className="mt-4 text-white/90 text-lg">
                Need help? Reach us via WhatsApp, phone, or email. We strive to respond within 24 hours.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full py-12 bg-neutral-50">
        <div className="px-4 md:px-6 lg:px-16 max-w-5xl mx-auto grid gap-8 md:grid-cols-2">
          <div className="bg-white border border-neutral-200 rounded-2xl p-6">
            <h2 className="text-xl font-semibold mb-3">Contact</h2>
            <ul className="space-y-2 text-neutral-700">
              <li>WhatsApp / Phone: 0793515066</li>
              <li>Email: technova446@gmail.com</li>
              <li>Hours: Mon–Fri, 8:00AM–5:00PM EAT</li>
            </ul>
          </div>
          <div className="bg-white border border-neutral-200 rounded-2xl p-6">
            <h2 className="text-xl font-semibold mb-3">Helpful Links</h2>
            <ul className="list-disc ml-5 space-y-2 text-neutral-700">
              <li><a className="text-blue-600 hover:underline" href="/privacy">Privacy Policy</a></li>
              <li><a className="text-blue-600 hover:underline" href="/terms">Terms of Service</a></li>
              <li><a className="text-blue-600 hover:underline" href="/contact">Contact Form</a></li>
            </ul>
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </div>
  )
}

export default Support
