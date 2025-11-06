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
    image: 'https://res.cloudinary.com/djksfayfu/image/upload/v1762434173/WhatsApp_Image_2025-11-06_at_15.55.38_cf32b20d_fzma3d.jpg',
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
    name: 'Cascallen Steve Cascallen',
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

                  {/* Tech Stack */}
                  <div className="mb-6">
                    <h4 className="text-lg font-bold text-neutral-900 mb-4 flex items-center">
                      <svg className="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                      </svg>
                      Tech Stack
                    </h4>
                    <div className="space-y-3">
                      {Object.entries(member.techStack).map(([category, technologies]) => (
                        <div key={category}>
                          <h5 className="text-sm font-semibold text-neutral-800 mb-2 capitalize">
                            {category.replace(/([A-Z])/g, ' $1').trim()}:
                          </h5>
                          <div className="flex flex-wrap gap-2">
                            {(technologies as string[]).map((tech: string, index: number) => (
                              <span
                                key={index}
                                className="px-3 py-1 bg-gradient-to-r from-blue-50 to-blue-100 text-blue-800 text-xs font-medium rounded-full border border-blue-200 hover:from-blue-100 hover:to-blue-200 transition-colors"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

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

                  {/* Social Links */}
                  <div className="flex gap-4 pt-4 border-t border-neutral-200">
                    {member.social.linkedin && (
                      <a
                        href={member.social.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                      >
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                        </svg>
                        LinkedIn
                      </a>
                    )}
                    {member.social.github && (
                      <a
                        href={member.social.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2 bg-neutral-800 text-white rounded-lg hover:bg-neutral-900 transition-colors text-sm font-medium"
                      >
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                        </svg>
                        GitHub
                      </a>
                    )}
                    {member.social.twitter && (
                      <a
                        href={member.social.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2 bg-blue-400 text-white rounded-lg hover:bg-blue-500 transition-colors text-sm font-medium"
                      >
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                        </svg>
                        Twitter
                      </a>
                    )}
                    {member.social.portfolio && (
                      <a
                        href={member.social.portfolio}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 transition-colors text-sm font-medium"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                        </svg>
                        Portfolio
                      </a>
                    )}
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
