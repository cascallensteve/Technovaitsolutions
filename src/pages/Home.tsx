import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import HelpPanel from '../components/HelpPanel'
import OffersGrid from '../components/OffersGrid'
import RecentProjects from '../components/RecentProjects'
import WhyChoose from '../components/WhyChoose'
import Testimonials from '../components/Testimonials'
import Footer from '../components/Footer'
 


const Home = () => {
  return (
    <div className="min-h-screen bg-white text-neutral-900 overflow-x-hidden">
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
    </div>
  )
}

export default Home
