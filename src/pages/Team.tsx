import { useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import WhatsAppButton from '../components/WhatsAppButton'

const teamMembers = [
  {
    id: 1,
    name: 'Billy Josiah Illa',
    role: 'Backend Engineer',
    bio: 'Passionate backend engineer specializing in building robust, scalable server-side solutions. Expert in creating secure APIs, optimizing database performance, and implementing modern cloud infrastructure.',
    image: 'https://res.cloudinary.com/djksfayfu/image/upload/v1762518416/WhatsApp_Image_2025-11-06_at_15.55.38_cf32b20d_e0g7rj.jpg',
    skills: ['Node.js', 'Python', 'PostgreSQL', 'MongoDB', 'Docker', 'AWS/Azure'],
    techStack: {
      languages: ['JavaScript', 'TypeScript', 'Python', 'SQL'],
      frameworks: ['Express.js', 'Fastify', 'Django', 'Flask'],
      databases: ['PostgreSQL', 'MongoDB', 'Redis', 'MySQL'],
      tools: ['Docker', 'Git', 'Postman', 'VS Code'],
      cloud: ['AWS', 'Azure', 'Vercel', 'Railway']
    },
    social: {
      linkedin: 'https://linkedin.com/in/billyjosiahilla',
      github: 'https://github.com/billyjosiahilla',
      twitter: 'https://twitter.com/billyjosiahilla'
    }
  },
  {
    id: 2,
    name: 'Cascallen Steve',
    role: 'Frontend Engineer',
    bio: 'Creative frontend engineer with a passion for crafting beautiful, responsive user interfaces. Specializes in modern JavaScript frameworks and creating seamless user experiences.',
    image: 'https://res.cloudinary.com/dqvsjtkqw/image/upload/v1752050555/WhatsApp_Image_2024-06-16_at_00.57.23_a2952eba_1_pokuj5.jpg',
    skills: ['React', 'Vue.js', 'TypeScript', 'Tailwind CSS', 'Next.js', 'Mobile Development'],
    techStack: {
      languages: ['JavaScript', 'TypeScript', 'HTML5', 'CSS3'],
      frameworks: ['React', 'Vue.js', 'Next.js', 'Nuxt.js'],
      styling: ['Tailwind CSS', 'SCSS', 'Styled Components', 'Material-UI'],
      tools: ['Vite', 'Webpack', 'Figma', 'Git', 'VS Code'],
      mobile: ['React Native', 'Progressive Web Apps']
    },
    social: {
      linkedin: 'https://linkedin.com/in/cascallensteve',
      github: 'https://github.com/cascallensteve',
      portfolio: 'https://cascallensteve.dev'
    }
  }
]

const Team = () => {
  const [showNoPositions, setShowNoPositions] = useState(false)
  const [showResumeInfo, setShowResumeInfo] = useState(false)
  return (
    <div className="min-h-screen bg-white text-neutral-900">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative w-full overflow-hidden">
        <div className="relative w-full min-h-[60vh] sm:min-h-[70vh] md:min-h-[80vh]">
          {/* Background */}
          <div className="absolute inset-0">
            <div
              className="absolute inset-0 w-full h-full bg-cover bg-center"
              style={{
                backgroundImage: `url('/images/TECHNOVA3.png')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 via-blue-800/60 to-transparent" />
          </div>

          {/* Content */}
          <div className="relative z-10 w-full h-full flex items-center py-16 px-4 md:px-6 lg:px-16">
            <div className="text-white text-left max-w-4xl">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight drop-shadow-md leading-tight">
                Meet Our Expert Team
              </h1>
              <p className="mt-4 sm:mt-6 text-lg sm:text-xl md:text-2xl text-white/90 max-w-3xl drop-shadow leading-relaxed">
                Passionate professionals dedicated to bringing your digital vision to life with cutting-edge technology and innovative solutions.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <a
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-md bg-white px-6 py-3 text-base font-medium text-neutral-900 shadow-sm hover:bg-neutral-100 transition"
                >
                  Work With Us
                </a>
                <a
                  href="#team-members"
                  className="inline-flex items-center justify-center rounded-md border-2 border-white bg-transparent px-6 py-3 text-base font-medium text-white hover:bg-white hover:text-neutral-900 transition"
                >
                  Meet The Team
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Stats */}
      <section className="w-full py-16 bg-neutral-50">
        <div className="px-4 md:px-6 lg:px-16 max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2">2</div>
              <div className="text-neutral-700">Expert Engineers</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2">10+</div>
              <div className="text-neutral-700">Technologies Mastered</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2">50+</div>
              <div className="text-neutral-700">Projects Delivered</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2">100%</div>
              <div className="text-neutral-700">Dedication</div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Members */}
      <section id="team-members" className="w-full py-16 bg-white">
        <div className="px-4 md:px-6 lg:px-16 max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
              Meet Our Dynamic Duo
            </h2>
            <p className="text-lg text-neutral-700 max-w-3xl mx-auto">
              Two passionate engineers combining frontend creativity with backend expertise to deliver exceptional digital solutions. Our complementary skills create the perfect synergy for your projects.
            </p>
          </div>

          <div className="grid gap-12 lg:grid-cols-2 max-w-6xl mx-auto">
            {teamMembers.map((member) => (
              <div key={member.id} className="bg-white rounded-3xl shadow-lg border border-neutral-200 overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                {/* Profile Image */}
                <div className={`relative overflow-hidden mx-auto w-[92%] md:w-[90%] ${member.id === 1 ? 'h-64 sm:h-72 md:h-80' : 'h-72 md:h-80'}`}>
                  <img
                    src={member.image}
                    alt={member.name}
                    className="absolute inset-0 w-full h-full object-cover object-center"
                  />
                  <div className="absolute top-4 right-4 bg-white/60 backdrop-blur-sm px-3 py-1 rounded-full">
                    <span className="text-neutral-800 text-sm font-medium">{member.role.split(' ')[0]}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-neutral-900 mb-2">
                    {member.name}
                  </h3>
                  <p className="text-blue-600 font-semibold mb-4 text-lg">
                    {member.role}
                  </p>
                  <p className="text-neutral-700 leading-relaxed mb-6">
                    {member.bio}
                  </p>


                  {/* Core Skills */}
                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-neutral-900 mb-3">Core Expertise:</h4>
                    <div className="flex flex-wrap gap-2">
                      {member.skills.map((skill, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-neutral-100 text-neutral-700 text-sm rounded-lg font-medium"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="w-full py-20 bg-gradient-to-r from-blue-600 to-blue-800">
        <div className="px-4 md:px-6 lg:px-16 max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
            Ready to Work With Us?
          </h2>
          <p className="text-xl md:text-2xl text-blue-100 mb-8 leading-relaxed">
            Let's collaborate and bring your digital vision to life with our combined expertise in frontend and backend development.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              type="button"
              onClick={() => setShowNoPositions(true)}
              className="inline-flex items-center justify-center bg-white text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-50 transition-colors shadow-lg"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H8a2 2 0 01-2-2V8a2 2 0 012-2h8z" />
              </svg>
              View Open Positions
            </button>
            <button
              type="button"
              onClick={() => setShowResumeInfo(true)}
              className="inline-flex items-center justify-center border-2 border-white text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Send Your Resume
            </button>
          </div>
        </div>
      </section>
      {/* Simple Modals */}
      {showNoPositions && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4" role="dialog" aria-modal="true" onClick={() => setShowNoPositions(false)}>
          <div className="w-full max-w-md rounded-2xl bg-white shadow-xl border border-neutral-200 p-6 text-center" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-xl font-semibold text-neutral-900 mb-2">No open positions</h3>
            <p className="text-neutral-600">There are currently no open positions. Please check back later.</p>
            <button type="button" onClick={() => setShowNoPositions(false)} className="mt-5 inline-flex items-center justify-center rounded-md bg-blue-600 px-5 py-2 text-white font-medium hover:bg-blue-700">OK</button>
          </div>
        </div>
      )}
      {showResumeInfo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4" role="dialog" aria-modal="true" onClick={() => setShowResumeInfo(false)}>
          <div className="w-full max-w-md rounded-2xl bg-white shadow-xl border border-neutral-200 p-6 text-center" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-xl font-semibold text-neutral-900 mb-2">Application portal closed</h3>
            <p className="text-neutral-600">We will accept applications once the portal is opened.</p>
            <button type="button" onClick={() => setShowResumeInfo(false)} className="mt-5 inline-flex items-center justify-center rounded-md bg-blue-600 px-5 py-2 text-white font-medium hover:bg-blue-700">Got it</button>
          </div>
        </div>
      )}

      <Footer />
      <WhatsAppButton />
    </div>
  )
}

export default Team
