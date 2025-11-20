import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import HelpPanel from '../components/HelpPanel'
import RecentProjects from '../components/RecentProjects'
import WhyChoose from '../components/WhyChoose'
import Testimonials from '../components/Testimonials'
import Footer from '../components/Footer'
import BookingSection from '../components/BookingSection'
import { useDocumentTitle } from '../hooks/useDocumentTitle'


const Home = () => {
  useDocumentTitle('Technova IT Solutions | Web & Mobile Development, Payments & Branding')
  return (
    <div className="min-h-screen bg-white text-neutral-900 overflow-x-hidden">
      <Navbar />
      <main>
        <Hero />
        <HelpPanel />
        <RecentProjects />
        <WhyChoose />
        <Testimonials />
        <BookingSection />
      </main>
      <Footer />
    </div>
  )
}

export default Home
