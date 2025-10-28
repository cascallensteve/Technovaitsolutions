import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import HelpPanel from '../components/HelpPanel'
import OffersGrid from '../components/OffersGrid'
import RecentProjects from '../components/RecentProjects'
import WhyChoose from '../components/WhyChoose'
import Testimonials from '../components/Testimonials'
import Footer from '../components/Footer'
import WhatsAppButton from '../components/WhatsAppButton'

const Home = () => {
  return (
    <div className="min-h-screen bg-white text-neutral-900">
      <Navbar />
      <main>
        <Hero />
        <HelpPanel />
        <OffersGrid />
        <RecentProjects />
        <WhyChoose />
        <Testimonials />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  )
}

export default Home
