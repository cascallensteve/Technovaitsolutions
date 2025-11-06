import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Contact from './pages/Contact'
import Services from './pages/Services'
import Portfolio from './pages/Portfolio'
import Team from './pages/Team'
import Blog from './pages/Blog'
import BlogPost from './pages/BlogPost'
import ServiceDetail from './pages/ServiceDetail'
import Profile from './pages/Profile'
import EmailVerification from './pages/EmailVerification'
import WhatsAppButton from './components/WhatsAppButton'
import SupportButton from './components/SupportButton'
import './App.css'
import AdminSignUp from './pages/AdminSignUp'
import AdminSignIn from './pages/AdminSignIn'
import AdminLayout from './admin/AdminLayout'
import AdminHome from './admin/AdminHome'
import AdminUsers from './admin/AdminUsers'
import AdminProjects from './admin/AdminProjects'
import AdminAnalytics from './admin/AdminAnalytics'
import AdminSettings from './admin/AdminSettings'
import AdminInquiries from './admin/AdminInquiries'
import AdminAppointments from './admin/AdminAppointments'
import AdminProfile from './admin/AdminProfile'
import AdminBlog from './admin/AdminBlog'
import AdminAgreements from './admin/AdminAgreements'

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
        <Route path="/profile" element={<Profile />} />
        <Route path="/verify-email" element={<EmailVerification />} />
        <Route path="/admin/signup" element={<AdminSignUp />} />
        <Route path="/admin/signin" element={<AdminSignIn />} />
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminHome />} />
          <Route path="users" element={<AdminUsers />} />
          <Route path="projects" element={<AdminProjects />} />
          <Route path="agreements" element={<AdminAgreements />} />
          <Route path="inquiries" element={<AdminInquiries />} />
          <Route path="appointments" element={<AdminAppointments />} />
          <Route path="analytics" element={<AdminAnalytics />} />
          <Route path="settings" element={<AdminSettings />} />
          <Route path="profile" element={<AdminProfile />} />
          <Route path="blog" element={<AdminBlog />} />
        </Route>
      </Routes>
      <WhatsAppButton />
      <SupportButton />
    </Router>
  )
}

export default App
