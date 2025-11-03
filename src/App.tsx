import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Contact from './pages/Contact'
import Services from './pages/Services'
import Portfolio from './pages/Portfolio'
import Team from './pages/Team'
import Blog from './pages/Blog'
import BlogPost from './pages/BlogPost'
import ServiceDetail from './pages/ServiceDetail'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import Profile from './pages/Profile'
import EmailVerification from './pages/EmailVerification'
import WhatsAppButton from './components/WhatsAppButton'
import SupportButton from './components/SupportButton'
import './App.css'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/services" element={<Services />} />
        <Route path="/services/:slug" element={<ServiceDetail />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/team" element={<Team />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<BlogPost />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/verify-email" element={<EmailVerification />} />
      </Routes>
      <WhatsAppButton />
      <SupportButton />
    </Router>
  )
}

export default App
