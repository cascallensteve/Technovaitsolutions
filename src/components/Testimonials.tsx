
const testimonials = [
  {
    id: 1,
    name: 'Alex M.',
    role: 'Content Creator',
    avatar: '/images/Technova1.png',
    quote: 'I reduced my development time from 12GB to just 85MB with minimal quality loss. Now I can easily share my projects on social media!',
    reduction: '93%',
  },
  {
    id: 2,
    name: 'Sarah J.',
    role: 'Marketing Director',
    avatar: '/images/NOVATECH.png',
    quote: 'We use Technova for all our promotional content. It\'s saved us countless hours in upload time and helped us meet tight deadlines.',
    reduction: '78%',
  },
  {
    id: 3,
    name: 'Michael T.',
    role: 'Wedding Videographer',
    avatar: '/images/TECHNOVA3.png',
    quote: 'My clients love that I can deliver their videos via email now instead of using complicated file sharing services.',
    reduction: '85%',
  },
]

const Testimonials: React.FC = () => {
  return (
    <section className="w-full py-16 bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="px-4 md:px-6 lg:px-16">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-neutral-900 mb-4">
            Recent <span className="text-blue-600">Success Stories</span>
          </h2>
          
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mt-12">
            {testimonials.map((testimonial) => (
              <article key={testimonial.id} className="bg-white rounded-2xl p-6 shadow-sm border border-black/5">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden ring-2 ring-white shadow-sm">
                    <div
                      className="w-full h-full bg-cover bg-center"
                      style={{ backgroundImage: `url('${testimonial.avatar}')` }}
                      aria-hidden="true"
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold text-neutral-900">{testimonial.name}</h3>
                    <p className="text-sm text-neutral-600">{testimonial.role}</p>
                  </div>
                </div>
                
                <blockquote className="text-neutral-700 leading-relaxed mb-4 italic">
                  "{testimonial.quote}"
                </blockquote>
                
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-neutral-600">File reduction:</span>
                  <span className="font-bold text-green-600 text-lg">{testimonial.reduction}</span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Testimonials
