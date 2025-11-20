import { useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import WhatsAppButton from '../components/WhatsAppButton'
import { useDocumentTitle } from '../hooks/useDocumentTitle'

type BlogPost = {
  id: number
  title: string
  slug: string
  excerpt: string
  content: string
  author: string
  authorRole: string
  authorImage: string
  publishDate: string
  readTime: string
  category: string
  tags: string[]
  image: string
  featured: boolean
}

const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: 'The Future of Web Development: Trends to Watch in 2025',
    slug: 'future-web-development-trends-2025',
    excerpt: 'Explore the latest trends shaping the future of web development, from AI integration to progressive web apps and beyond.',
    content: `
      <p>The web development landscape is constantly evolving, and 2025 promises to bring exciting new trends that will reshape how we build and interact with websites. As technology advances, developers must stay ahead of the curve to create engaging, efficient, and user-friendly digital experiences.</p>
      
      <h3>1. AI-Powered Development Tools</h3>
      <p>Artificial Intelligence is revolutionizing web development with tools that can generate code, optimize performance, and even design user interfaces. From GitHub Copilot to AI-powered testing frameworks, developers are becoming more productive than ever.</p>
      
      <h3>2. Progressive Web Apps (PWAs)</h3>
      <p>PWAs continue to bridge the gap between web and mobile applications, offering native app-like experiences through web browsers. With improved offline capabilities and push notifications, PWAs are becoming the preferred choice for businesses looking to reach users across all platforms.</p>
      
      <h3>3. Serverless Architecture</h3>
      <p>Serverless computing is gaining momentum as it allows developers to focus on code rather than infrastructure management. This approach reduces costs, improves scalability, and accelerates development cycles.</p>
      
      <h3>4. Enhanced Security Measures</h3>
      <p>With cyber threats becoming more sophisticated, web security is more critical than ever. Zero-trust architecture, advanced authentication methods, and automated security testing are becoming standard practices.</p>
      
      <p>At Technova, we stay at the forefront of these trends to deliver cutting-edge solutions that drive business growth and user satisfaction.</p>
    `,
    author: 'Steve Cascallen',
    authorRole: 'Frontend Engineer',
    authorImage: 'https://res.cloudinary.com/dqvsjtkqw/image/upload/v1752050555/WhatsApp_Image_2024-06-16_at_00.57.23_a2952eba_1_pokuj5.jpg',
    publishDate: '2025-11-05',
    readTime: '5 min read',
    category: 'Web Development',
    tags: ['Web Development', 'AI', 'PWA', 'Serverless', 'Security'],
    image: 'https://res.cloudinary.com/djksfayfu/image/upload/v1762521547/representations-user-experience-interface-design_yvdw9r.webp',
    featured: true
  },
  {
    id: 2,
    title: 'Maximizing ROI with M-Pesa Integration: A Business Guide',
    slug: 'maximizing-roi-mpesa-integration-guide',
    excerpt: 'Learn how integrating M-Pesa payments can significantly boost your business revenue and customer satisfaction in the East African market.',
    content: `
      <p>Mobile money has revolutionized financial transactions in East Africa, with M-Pesa leading the charge. For businesses operating in this region, integrating M-Pesa payments isn't just an option—it's essential for success.</p>
      
      <h3>Why M-Pesa Integration Matters</h3>
      <p>With over 50 million active users across multiple countries, M-Pesa represents the largest mobile money platform in Africa. By integrating M-Pesa, businesses can tap into this massive user base and provide seamless payment experiences.</p>
      
      <h3>Key Benefits for Businesses</h3>
      <ul>
        <li><strong>Increased Sales:</strong> Remove payment friction and capture more customers</li>
        <li><strong>Faster Transactions:</strong> Real-time payment processing</li>
        <li><strong>Reduced Costs:</strong> Lower transaction fees compared to traditional banking</li>
        <li><strong>Enhanced Security:</strong> Built-in fraud protection and encryption</li>
      </ul>
      
      <h3>Implementation Best Practices</h3>
      <p>Successful M-Pesa integration requires careful planning, proper API implementation, and thorough testing. Our team at Technova has helped numerous businesses achieve seamless M-Pesa integration with measurable ROI improvements.</p>
      
      <p>Ready to transform your payment system? Contact us to learn how we can help you integrate M-Pesa and boost your business revenue.</p>
    `,
    author: 'Billy Josiah Illa',
    authorRole: 'Backend Engineer',
    authorImage: 'https://res.cloudinary.com/djksfayfu/image/upload/v1762518416/WhatsApp_Image_2025-11-06_at_15.55.38_cf32b20d_e0g7rj.jpg',
    publishDate: '2025-11-08',
    readTime: '4 min read',
    category: 'Fintech',
    tags: ['M-Pesa', 'Payment Integration', 'Fintech', 'ROI', 'Business Growth'],
    image: 'https://res.cloudinary.com/djksfayfu/image/upload/v1762521943/person-office-analyzing-checking-finance-graphs_xqxnek.webp',
    featured: true
  },
  {
    id: 3,
    title: 'SEO Best Practices for Modern Websites in 2025',
    slug: 'seo-best-practices-modern-websites-2025',
    excerpt: 'Discover the latest SEO strategies and techniques that will help your website rank higher and attract more organic traffic.',
    content: `
      <p>Search Engine Optimization continues to evolve with changing algorithms and user behaviors. In 2025, successful SEO requires a holistic approach that combines technical excellence with user-focused content strategy.</p>
      
      <h3>Core Web Vitals and Page Experience</h3>
      <p>Google's emphasis on page experience signals means that technical performance is more important than ever. Focus on optimizing Largest Contentful Paint (LCP), First Input Delay (FID), and Cumulative Layout Shift (CLS).</p>
      
      <h3>Content Quality and E-A-T</h3>
      <p>Expertise, Authoritativeness, and Trustworthiness (E-A-T) remain crucial ranking factors. Create comprehensive, well-researched content that demonstrates your expertise in your field.</p>
      
      <h3>Mobile-First Optimization</h3>
      <p>With mobile traffic dominating web usage, ensure your website provides an exceptional mobile experience. This includes responsive design, fast loading times, and intuitive navigation.</p>
      
      <h3>Local SEO for Business Growth</h3>
      <p>For businesses serving local markets, optimizing for local search is essential. Claim your Google Business Profile, gather reviews, and ensure consistent NAP (Name, Address, Phone) information across all platforms.</p>
      
      <p>Our SEO services at Technova combine these best practices with data-driven strategies to help your business achieve sustainable organic growth.</p>
    `,
    author: 'Steve Cascallen',
    authorRole: 'Frontend Engineer',
    authorImage: 'https://res.cloudinary.com/dqvsjtkqw/image/upload/v1752050555/WhatsApp_Image_2024-06-16_at_00.57.23_a2952eba_1_pokuj5.jpg',
    publishDate: '2025-11-10',
    readTime: '6 min read',
    category: 'SEO',
    tags: ['SEO', 'Core Web Vitals', 'Content Strategy', 'Local SEO', 'Mobile Optimization'],
    image: 'https://res.cloudinary.com/djksfayfu/image/upload/v1762522584/seo-website-development-data-network-concept_1_kopzoa.webp',
    featured: false
  },
  {
    id: 4,
    title: 'Building Scalable Mobile Apps: React Native vs Native Development',
    slug: 'react-native-vs-native-mobile-development',
    excerpt: 'Compare React Native and native development approaches to make the best choice for your mobile app project.',
    content: `
      <p>Choosing the right development approach for your mobile app is crucial for long-term success. Both React Native and native development have their advantages, and the best choice depends on your specific requirements and goals.</p>
      
      <h3>React Native: Cross-Platform Efficiency</h3>
      <p>React Native allows developers to write code once and deploy to both iOS and Android platforms. This approach offers significant time and cost savings while maintaining near-native performance.</p>
      
      <h3>Native Development: Maximum Performance</h3>
      <p>Native development provides the highest performance and access to all platform-specific features. It's ideal for apps requiring intensive graphics, complex animations, or platform-specific functionality.</p>
      
      <h3>Making the Right Choice</h3>
      <p>Consider factors such as budget, timeline, target audience, required features, and long-term maintenance when choosing your development approach. Our team can help you evaluate these factors and make the best decision for your project.</p>
      
      <p>Whether you choose React Native or native development, Technova has the expertise to deliver high-quality mobile applications that engage users and drive business growth.</p>
    `,
    author: 'Billy Josiah Illa',
    authorRole: 'Backend Engineer',
    authorImage: '/images/team/billy.jpg',
    publishDate: '2025-11-14',
    readTime: '7 min read',
    category: 'Mobile Development',
    tags: ['React Native', 'Native Development', 'Mobile Apps', 'Cross-Platform', 'Performance'],
    image: 'https://res.cloudinary.com/djksfayfu/image/upload/v1762522162/representations-user-experience-interface-design_1_1_dxypj8.webp',
    featured: false
  },
  {
    id: 5,
    title: 'System Modernization: When and How to Upgrade Legacy Systems',
    slug: 'system-modernization-upgrade-legacy-systems',
    excerpt: 'Learn the signs that indicate it\'s time to modernize your legacy systems and discover the best approaches for successful migration.',
    content: `
      <p>Legacy systems can become a significant bottleneck for business growth. Knowing when and how to modernize these systems is crucial for maintaining competitive advantage and operational efficiency.</p>
      
      <h3>Signs It's Time to Modernize</h3>
      <ul>
        <li>Frequent system downtime and maintenance issues</li>
        <li>Difficulty integrating with modern tools and services</li>
        <li>High maintenance costs and limited vendor support</li>
        <li>Security vulnerabilities and compliance concerns</li>
        <li>Poor user experience and productivity issues</li>
      </ul>
      
      <h3>Modernization Strategies</h3>
      <p>There are several approaches to system modernization, including rehosting, refactoring, rearchitecting, and rebuilding. The best approach depends on your specific situation, budget, and timeline.</p>
      
      <h3>Planning for Success</h3>
      <p>Successful system modernization requires careful planning, stakeholder buy-in, and a phased approach to minimize business disruption. Our team specializes in smooth transitions that preserve data integrity while delivering modern functionality.</p>
      
      <p>Ready to modernize your systems? Contact Technova to discuss your modernization strategy and timeline.</p>
    `,
    author: 'Billy Josiah Illa',
    authorRole: 'Backend Engineer',
    authorImage: 'https://res.cloudinary.com/djksfayfu/image/upload/v1762518416/WhatsApp_Image_2025-11-06_at_15.55.38_cf32b20d_e0g7rj.jpg',
    publishDate: '2025-11-18',
    readTime: '5 min read',
    category: 'System Modernization',
    tags: ['Legacy Systems', 'Modernization', 'Migration', 'System Upgrade', 'Digital Transformation'],
    image: '/images/TECHNOVA3.png',
    featured: false
  }
]

const categories = ['All', 'Web Development', 'Mobile Development', 'SEO', 'Fintech', 'System Modernization']

const Blog = () => {
  useDocumentTitle('Blog | Technova IT Solutions Insights & Tutorials')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')

  const filteredPosts = blogPosts.filter(post => {
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    return matchesCategory && matchesSearch
  })

  const featuredPosts = blogPosts.filter(post => post.featured)
  const recentPosts = blogPosts.slice(0, 3)

  return (
    <div className="min-h-screen bg-white text-neutral-900">
      <Navbar />
      
      {/* Editor's Picks (now top section, with compact hero header) */}
      {featuredPosts.length > 0 && (
        <section className="w-full py-12 bg-gradient-to-b from-neutral-50 to-white">
          <div className="px-4 md:px-6 lg:px-16 max-w-7xl mx-auto">
            <div className="text-center mb-10">
              <div className="inline-flex items-center gap-2 bg-blue-100 rounded-full px-4 py-2 mb-4">
                <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                </svg>
                <span className="text-blue-700 font-medium text-sm">Latest Insights & Tutorials</span>
              </div>

              <h1 className="text-3xl md:text-4xl font-bold mb-3 text-neutral-900">
                Technova Blog
              </h1>

              <p className="text-base md:text-lg text-neutral-600 mb-5 max-w-3xl mx-auto">
                Discover insights, tutorials, and industry trends from our technology experts.
              </p>

              <div className="flex flex-wrap items-center justify-center gap-6 text-xs md:text-sm text-neutral-500 mb-4">
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                  <span>{blogPosts.length}+ Articles</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  <span>Expert Authors</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  <span>Weekly Updates</span>
                </div>
              </div>

              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full px-4 py-2 mt-2">
                <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                </svg>
                <span className="text-blue-800 font-semibold text-sm">Editor&apos;s Picks</span>
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
              {featuredPosts.map((post, idx) => (
                <article
                  key={post.id}
                  className={`group relative ${
                    idx === 0 ? 'animate-slide-in-left-soft' : 'animate-slide-in-right-soft'
                  }`}
                >
                  <div className="bg-white rounded-3xl shadow-lg border border-neutral-200/50 overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
                    {/* Featured Badge */}
                    <div className="absolute top-6 left-6 z-10">
                      <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                        ⭐ FEATURED
                      </div>
                    </div>
                    
                    {/* Image */}
                    <div className="relative aspect-video bg-gradient-to-br from-blue-100 to-purple-100 overflow-hidden">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                    
                    {/* Content */}
                    <div className="p-8">
                      <div className="flex items-center gap-4 mb-6">
                        <span className={`px-4 py-2 rounded-full text-sm font-semibold ${
                          post.category === 'Web Development' ? 'bg-blue-100 text-blue-800' :
                          post.category === 'Fintech' ? 'bg-green-100 text-green-800' :
                          post.category === 'SEO' ? 'bg-purple-100 text-purple-800' :
                          post.category === 'Mobile Development' ? 'bg-orange-100 text-orange-800' :
                          'bg-neutral-100 text-neutral-800'
                        }`}>
                          {post.category}
                        </span>
                        <div className="flex items-center gap-2 text-neutral-500 text-sm">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          {post.readTime}
                        </div>
                      </div>
                      
                      <h3 className="text-2xl font-bold text-neutral-900 mb-4 group-hover:text-blue-600 transition-colors leading-tight">
                        <a href={`/blog/${post.slug}`} className="hover:underline decoration-2 underline-offset-4">
                          {post.title}
                        </a>
                      </h3>
                      
                      <p className="text-neutral-700 mb-6 leading-relaxed text-lg">
                        {post.excerpt}
                      </p>
                      
                      {/* Author & Date */}
                      <div className="flex items-center justify-between pt-6 border-t border-neutral-100">
                        <div className="flex items-center gap-3">
                          <div className="relative">
                            <img
                              src={post.authorImage}
                              alt={post.author}
                              className="w-12 h-12 rounded-full object-cover ring-2 ring-white shadow-md"
                              onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDgiIGhlaWdodD0iNDgiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0iIzk5OTk5OSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEyIDEyYzIuMjEgMCA0LTEuNzkgNC00cy0xLjc5LTQtNC00LTQgMS43OS00IDQgMS43OSA0IDQgNHptMCAyYy0yLjY3IDAtOCAxLjM0LTggNHYyaDE2di0yYzAtMi42Ni01LjMzLTQtOC00eiIvPgo8L3N2Zz4K';
                              }}
                            />
                            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                          </div>
                          <div>
                            <div className="font-semibold text-neutral-900">{post.author}</div>
                            <div className="text-sm text-neutral-500">{post.authorRole}</div>
                          </div>
                        </div>
                        
                        <div className="text-right">
                          <div className="text-sm text-neutral-500">
                            {new Date(post.publishDate).toLocaleDateString('en-US', { 
                              year: 'numeric', 
                              month: 'short', 
                              day: 'numeric' 
                            })}
                          </div>
                          <div className="flex items-center gap-1 text-xs text-neutral-400 mt-1">
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                            <span>{Math.floor(Math.random() * 500) + 200} views</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Search and Filter */}
      <section className="w-full py-12 bg-gradient-to-r from-neutral-50 via-white to-neutral-50">
        <div className="px-4 md:px-6 lg:px-16 max-w-7xl mx-auto">
          <div className="bg-white rounded-3xl shadow-lg border border-neutral-200/50 p-8">
            <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
              {/* Search */}
              <div className="relative flex-1 max-w-lg">
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                  <svg className="h-5 w-5 text-neutral-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <input
                  type="text"
                  placeholder="Search articles, topics, or authors..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-neutral-50 border border-neutral-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white transition-all duration-200 text-neutral-900 placeholder-neutral-500"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-neutral-400 hover:text-neutral-600 transition-colors"
                  >
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                )}
              </div>
              
              {/* Category Filters */}
              <div className="flex flex-wrap gap-3">
                <span className="text-sm font-semibold text-neutral-600 flex items-center">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.707A1 1 0 013 7V4z" />
                  </svg>
                  Filter:
                </span>
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                      selectedCategory === category
                        ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg transform scale-105'
                        : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200 hover:scale-105'
                    }`}
                  >
                    {category}
                    {selectedCategory === category && (
                      <span className="ml-2 inline-flex items-center justify-center w-5 h-5 bg-white/20 rounded-full text-xs">
                        ✓
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Results Counter */}
            <div className="mt-6 pt-6 border-t border-neutral-100">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2 text-neutral-600">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <span>
                    Showing <span className="font-semibold text-neutral-900">{filteredPosts.length}</span> of <span className="font-semibold text-neutral-900">{blogPosts.length}</span> articles
                  </span>
                </div>
                {(searchQuery || selectedCategory !== 'All') && (
                  <button
                    onClick={() => {
                      setSearchQuery('')
                      setSelectedCategory('All')
                    }}
                    className="flex items-center gap-1 text-blue-600 hover:text-blue-700 font-medium transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    Clear filters
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="w-full py-16 bg-white">
        <div className="px-4 md:px-6 lg:px-16 max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-bold text-neutral-900 mb-8">
                {selectedCategory === 'All' ? 'All Articles' : selectedCategory}
                <span className="text-neutral-500 font-normal ml-2">({filteredPosts.length})</span>
              </h2>
              
              {filteredPosts.length === 0 ? (
                <div className="text-center py-12">
                  <svg className="mx-auto h-12 w-12 text-neutral-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <h3 className="text-lg font-medium text-neutral-900 mb-2">No articles found</h3>
                  <p className="text-neutral-500">Try adjusting your search or filter criteria.</p>
                </div>
              ) : (
                <div className="space-y-10">
                  {filteredPosts.map((post) => (
                    <article key={post.id} className="group relative">
                      <div className="bg-white rounded-3xl shadow-lg border border-neutral-200/50 overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-1">
                        <div className="lg:flex">
                          {/* Image */}
                          <div className="lg:w-2/5">
                            <div className="relative aspect-video lg:aspect-square bg-gradient-to-br from-blue-100 to-purple-100 overflow-hidden">
                              <img
                                src={post.image}
                                alt={post.title}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                              
                              {/* Category Badge */}
                              <div className="absolute top-4 left-4">
                                <span className={`px-3 py-1 rounded-full text-xs font-bold shadow-lg ${
                                  post.category === 'Web Development' ? 'bg-blue-500 text-white' :
                                  post.category === 'Fintech' ? 'bg-green-500 text-white' :
                                  post.category === 'SEO' ? 'bg-purple-500 text-white' :
                                  post.category === 'Mobile Development' ? 'bg-orange-500 text-white' :
                                  post.category === 'System Modernization' ? 'bg-red-500 text-white' :
                                  'bg-neutral-500 text-white'
                                }`}>
                                  {post.category}
                                </span>
                              </div>
                            </div>
                          </div>
                          
                          {/* Content */}
                          <div className="lg:w-3/5 p-8 lg:p-10">
                            <div className="flex items-center gap-4 mb-4">
                              <div className="flex items-center gap-2 text-neutral-500 text-sm">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                {post.readTime}
                              </div>
                              <div className="flex items-center gap-1 text-neutral-400 text-sm">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                </svg>
                                <span>{Math.floor(Math.random() * 400) + 150} views</span>
                              </div>
                            </div>
                            
                            <h3 className="text-2xl lg:text-3xl font-bold text-neutral-900 mb-4 group-hover:text-blue-600 transition-colors leading-tight">
                              <a href={`/blog/${post.slug}`} className="hover:underline decoration-2 underline-offset-4">
                                {post.title}
                              </a>
                            </h3>
                            
                            <p className="text-neutral-700 mb-6 leading-relaxed text-lg">
                              {post.excerpt}
                            </p>
                            
                            {/* Tags */}
                            <div className="flex flex-wrap gap-2 mb-6">
                              {post.tags.slice(0, 4).map((tag) => (
                                <span key={tag} className="px-3 py-1 bg-neutral-100 text-neutral-600 text-sm rounded-lg hover:bg-neutral-200 transition-colors cursor-pointer">
                                  #{tag}
                                </span>
                              ))}
                            </div>
                            
                            {/* Author & Date */}
                            <div className="flex items-center justify-between pt-6 border-t border-neutral-100">
                              <div className="flex items-center gap-4">
                                <div className="relative">
                                  <img
                                    src={post.authorImage}
                                    alt={post.author}
                                    className="w-12 h-12 rounded-full object-cover ring-2 ring-white shadow-md"
                                    onError={(e) => {
                                      const target = e.target as HTMLImageElement;
                                      target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDgiIGhlaWdodD0iNDgiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0iIzk5OTk5OSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEyIDEyYzIuMjEgMCA0LTEuNzkgNC00cy0xLjc5LTQtNC00LTQgMS43OS00IDQgMS43OSA0IDQgNHptMCAyYy0yLjY3IDAtOCAxLjM0LTggNHYyaDE2di0yYzAtMi42Ni01LjMzLTQtOC00eiIvPgo8L3N2Zz4K';
                                    }}
                                  />
                                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                                </div>
                                <div>
                                  <div className="font-semibold text-neutral-900">{post.author}</div>
                                  <div className="text-sm text-neutral-500">{post.authorRole}</div>
                                </div>
                              </div>
                              
                              <div className="text-right">
                                <div className="text-sm text-neutral-500">
                                  {new Date(post.publishDate).toLocaleDateString('en-US', { 
                                    year: 'numeric', 
                                    month: 'short', 
                                    day: 'numeric' 
                                  })}
                                </div>
                                <a 
                                  href={`/blog/${post.slug}`}
                                  className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-700 font-medium text-sm mt-1 group-hover:underline transition-colors"
                                >
                                  Read more
                                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                  </svg>
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-8 space-y-8">
                {/* Recent Posts */}
                <div className="bg-gradient-to-br from-white to-neutral-50 rounded-3xl p-8 border border-neutral-200/50 shadow-lg">
                  <div className="flex items-center gap-2 mb-6">
                    <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <h3 className="text-xl font-bold text-neutral-900">Recent Posts</h3>
                  </div>
                  <div className="space-y-6">
                    {recentPosts.map((post, index) => (
                      <div key={post.id} className="group relative">
                        <div className="flex gap-4">
                          <div className="flex-shrink-0">
                            <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-purple-100 rounded-xl overflow-hidden">
                              <img
                                src={post.image}
                                alt={post.title}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                              />
                            </div>
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-semibold text-neutral-900 group-hover:text-blue-600 transition-colors mb-2 leading-tight">
                              <a href={`/blog/${post.slug}`} className="hover:underline">
                                {post.title.length > 50 ? post.title.substring(0, 50) + '...' : post.title}
                              </a>
                            </h4>
                            <div className="flex items-center gap-2 text-xs text-neutral-500">
                              <span>{post.category}</span>
                              <span>•</span>
                              <span>
                                {new Date(post.publishDate).toLocaleDateString('en-US', { 
                                  month: 'short', 
                                  day: 'numeric' 
                                })}
                              </span>
                            </div>
                          </div>
                        </div>
                        {index < recentPosts.length - 1 && (
                          <div className="mt-6 border-b border-neutral-100"></div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Newsletter Signup */}
                <div className="bg-gradient-to-br from-blue-600 via-blue-700 to-purple-700 rounded-3xl p-8 text-white relative overflow-hidden">
                  {/* Background Pattern */}
                  <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-4 right-4 w-32 h-32 bg-white rounded-full"></div>
                    <div className="absolute bottom-4 left-4 w-20 h-20 bg-white rounded-full"></div>
                  </div>
                  
                  <div className="relative z-10">
                    <div className="flex items-center gap-2 mb-4">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      <h3 className="text-xl font-bold">Stay in the Loop</h3>
                    </div>
                    <p className="text-blue-100 mb-6 leading-relaxed">
                      Get weekly insights, tutorials, and industry updates delivered straight to your inbox.
                    </p>
                    <div className="space-y-4">
                      <input
                        type="email"
                        placeholder="your@email.com"
                        className="w-full px-4 py-3 rounded-xl text-neutral-900 placeholder-neutral-500 border-0 focus:ring-2 focus:ring-white/50 transition-all"
                      />
                      <button className="w-full bg-white text-blue-600 px-6 py-3 rounded-xl font-semibold hover:bg-blue-50 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200">
                        Subscribe Now
                      </button>
                    </div>
                    <p className="text-xs text-blue-200 mt-4 text-center">
                      No spam, unsubscribe anytime
                    </p>
                  </div>
                </div>

                {/* Popular Categories */}
                <div className="bg-white rounded-3xl p-8 border border-neutral-200/50 shadow-lg">
                  <div className="flex items-center gap-2 mb-6">
                    <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                    </svg>
                    <h3 className="text-xl font-bold text-neutral-900">Popular Topics</h3>
                  </div>
                  <div className="space-y-3">
                    {categories.slice(1).map((category) => {
                      const postCount = blogPosts.filter(post => post.category === category).length;
                      return (
                        <button
                          key={category}
                          onClick={() => setSelectedCategory(category)}
                          className={`w-full flex items-center justify-between p-3 rounded-xl transition-all duration-200 ${
                            selectedCategory === category
                              ? 'bg-blue-50 text-blue-700 border border-blue-200'
                              : 'hover:bg-neutral-50 text-neutral-700 border border-transparent'
                          }`}
                        >
                          <span className="font-medium">{category}</span>
                          <span className="text-sm bg-neutral-100 text-neutral-600 px-2 py-1 rounded-full">
                            {postCount}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Contact CTA */}
                <div className="bg-gradient-to-br from-neutral-900 to-neutral-800 rounded-3xl p-8 text-white relative overflow-hidden">
                  {/* Background Elements */}
                  <div className="absolute inset-0 opacity-5">
                    <div className="absolute top-0 right-0 w-40 h-40 bg-white rounded-full transform translate-x-20 -translate-y-20"></div>
                    <div className="absolute bottom-0 left-0 w-32 h-32 bg-white rounded-full transform -translate-x-16 translate-y-16"></div>
                  </div>
                  
                  <div className="relative z-10">
                    <div className="flex items-center gap-2 mb-4">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-3.582 8-8 8a8.013 8.013 0 01-7-4L3 20l4-4a8.014 8.014 0 01-4-7c0-4.418 3.582-8 8-8s8 3.582 8 8z" />
                      </svg>
                      <h3 className="text-xl font-bold">Ready to Start?</h3>
                    </div>
                    <p className="text-neutral-300 mb-6 leading-relaxed">
                      Have a project in mind? Let's turn your ideas into reality with our expert development team.
                    </p>
                    <a
                      href="/contact"
                      className="inline-flex items-center justify-center w-full bg-white text-neutral-900 px-6 py-3 rounded-xl font-semibold hover:bg-neutral-100 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
                    >
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                      Get in Touch
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </div>
  )
}

export default Blog
