import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import WhatsAppButton from '../components/WhatsAppButton'
import { useDocumentTitle } from '../hooks/useDocumentTitle'

const Terms = () => {
  useDocumentTitle('Terms of Service | Technova IT Solutions')

  return (
    <div className="min-h-screen bg-white text-neutral-900">
      <Navbar />

      <section className="relative w-full overflow-hidden">
        <div className="relative w-full min-h-[32vh]">
          <div className="absolute inset-0 bg-gradient-to-r from-neutral-900 via-blue-900 to-neutral-900" />
          <div className="relative z-10 w-full h-full flex items-center py-12 px-4 md:px-6 lg:px-16">
            <div className="text-white max-w-4xl">
              <h1 className="text-4xl md:text-5xl font-bold">Terms of Service</h1>
              <p className="mt-3 text-white/90">Please read these terms carefully before using our services.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full py-12 bg-neutral-50">
        <div className="px-4 md:px-6 lg:px-16 max-w-4xl mx-auto space-y-8">
          <div className="bg-white border border-neutral-200 rounded-2xl p-6">
            <h2 className="text-xl font-semibold mb-3">Use of Service</h2>
            <p className="text-neutral-700">By engaging with our services, you agree to abide by applicable laws and respect intellectual property.</p>
          </div>
          <div className="bg-white border border-neutral-200 rounded-2xl p-6">
            <h2 className="text-xl font-semibold mb-3">Payments & Contracts</h2>
            <p className="text-neutral-700">Project milestones, payment schedules, and deliverables are defined in proposals/agreements shared with you.</p>
          </div>
          <div className="bg-white border border-neutral-200 rounded-2xl p-6">
            <h2 className="text-xl font-semibold mb-3">Support</h2>
            <p className="text-neutral-700">We provide support as outlined in the engagement plan. For assistance, contact us at <a className="text-blue-600 hover:underline" href="mailto:technova446@gmail.com">technova446@gmail.com</a>.</p>
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </div>
  )
}

export default Terms
