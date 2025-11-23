import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import WhatsAppButton from '../components/WhatsAppButton'
import { useDocumentTitle } from '../hooks/useDocumentTitle'

const caseStudies = [
  {
    id: 1,
    title: 'E-commerce Payment Integration Revamp',
    industry: 'Retail / E-commerce',
    challenge: 'High checkout drop-offs and fragmented payment methods across KCB, M-Pesa, and Paystack.',
    solution: 'Unified payment integration with KCB, M-Pesa STK Push, Jenga, Buni, and Paystack; added real-time reconciliation.',
    outcome: 'Checkout success rate improved by 27%, disputes reduced by 40%, and reporting time cut in half.'
  },
  {
    id: 2,
    title: 'AI Chatbot for Customer Support',
    industry: 'Services / Support',
    challenge: 'Long response times and overloaded human agents for FAQs and appointment bookings.',
    solution: 'Deployed an AI assistant integrated with CRM and calendar to answer FAQs and schedule appointments.',
    outcome: 'Deflected 60% of routine tickets and reduced average first response time from hours to seconds.'
  },
  {
    id: 3,
    title: 'Data Analytics Dashboard (Power BI)',
    industry: 'Logistics',
    challenge: 'Scattered operational data with no single source of truth for KPIs and forecasting.',
    solution: 'Built a data pipeline and Power BI dashboards for operations, finance, and sales teams.',
    outcome: 'Weekly reporting automated; leadership made faster decisions with real-time KPIs.'
  }
]

const CaseStudies = () => {
  useDocumentTitle('Case Studies | Technova IT Solutions')

  return (
    <div className="min-h-screen bg-white text-neutral-900">
      <Navbar />

      <section className="relative w-full overflow-hidden">
        <div className="relative w-full min-h-[40vh]">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 via-blue-800/70 to-transparent" />
          <div
            className="absolute inset-0 w-full h-full bg-cover bg-center"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1526403226607-9569cbb62af3?q=80&w=2070&auto=format&fit=crop')",
            }}
          />
          <div className="relative z-10 w-full h-full flex items-center py-16 px-4 md:px-6 lg:px-16">
            <div className="text-white max-w-4xl">
              <h1 className="text-4xl md:text-5xl font-bold">Case Studies</h1>
              <p className="mt-4 text-white/90 text-lg">A look at how we solve real business problems with modern technology.</p>
              <div className="mt-6">
                <a href="/contact" className="inline-flex items-center rounded-md bg-white px-6 py-3 text-base font-medium text-neutral-900 hover:bg-neutral-100 transition">Start Your Project</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full py-14 bg-neutral-50">
        <div className="px-4 md:px-6 lg:px-16 max-w-7xl mx-auto">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {caseStudies.map(cs => (
              <div key={cs.id} className="bg-white border border-neutral-200 rounded-2xl p-6 shadow-sm">
                <div className="text-xs uppercase tracking-wide text-blue-600 font-semibold">{cs.industry}</div>
                <h3 className="text-xl font-semibold text-neutral-900 mt-2">{cs.title}</h3>
                <div className="mt-3 space-y-2 text-sm text-neutral-700">
                  <p><span className="font-semibold text-neutral-900">Challenge:</span> {cs.challenge}</p>
                  <p><span className="font-semibold text-neutral-900">Solution:</span> {cs.solution}</p>
                  <p><span className="font-semibold text-neutral-900">Outcome:</span> {cs.outcome}</p>
                </div>
                <div className="mt-5 flex items-center gap-3">
                  <a href="/contact" className="inline-flex items-center rounded-md bg-blue-600 px-4 py-2 text-white text-sm font-medium hover:bg-blue-700 transition">Work With Us</a>
                  <a href="/portfolio" className="inline-flex items-center rounded-md border border-neutral-300 px-4 py-2 text-sm font-medium hover:bg-neutral-50 transition">More Work</a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </div>
  )
}

export default CaseStudies
