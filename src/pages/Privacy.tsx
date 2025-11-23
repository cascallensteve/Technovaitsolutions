import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import WhatsAppButton from '../components/WhatsAppButton'
import { useDocumentTitle } from '../hooks/useDocumentTitle'

const Privacy = () => {
  useDocumentTitle('Privacy Policy | Technova IT Solutions')

  return (
    <div className="min-h-screen bg-white text-neutral-900">
      <Navbar />

      <section className="relative w-full overflow-hidden">
        <div className="relative w-full min-h-[32vh]">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900 via-blue-800 to-blue-700" />
          <div className="relative z-10 w-full h-full flex items-center py-12 px-4 md:px-6 lg:px-16">
            <div className="text-white max-w-4xl">
              <h1 className="text-4xl md:text-5xl font-bold">Privacy Policy</h1>
              <p className="mt-3 text-white/90">Your privacy is important to us. This policy explains what data we collect and how we use it.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full py-12 bg-neutral-50">
        <div className="px-4 md:px-6 lg:px-16 max-w-4xl mx-auto space-y-8">
          <div className="bg-white border border-neutral-200 rounded-2xl p-6">
            <h2 className="text-xl font-semibold mb-3">Information We Collect</h2>
            <p className="text-neutral-700">We may collect contact details you provide (e.g., name, email, phone), and project information you submit via our forms.</p>
          </div>
          <div className="bg-white border border-neutral-200 rounded-2xl p-6">
            <h2 className="text-xl font-semibold mb-3">How We Use Your Information</h2>
            <ul className="list-disc ml-5 space-y-2 text-neutral-700">
              <li>Respond to your inquiries and provide services.</li>
              <li>Improve our website and offerings.</li>
              <li>Communicate important updates about your project.</li>
            </ul>
          </div>
          <div className="bg-white border border-neutral-200 rounded-2xl p-6">
            <h2 className="text-xl font-semibold mb-3">Contact Us</h2>
            <p className="text-neutral-700">If you have questions, contact us at <a className="text-blue-600 hover:underline" href="mailto:technova446@gmail.com">technova446@gmail.com</a> or WhatsApp <a className="text-blue-600 hover:underline" href="tel:+254793515066">0793515066</a>.</p>
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </div>
  )
}

export default Privacy
