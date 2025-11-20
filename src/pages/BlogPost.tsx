import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
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
      <p>The web development landscape is constantly evolving, and 2024 promises to bring exciting new trends that will reshape how we build and interact with websites. As technology advances, developers must stay ahead of the curve to create engaging, efficient, and user-friendly digital experiences.</p>
      
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
    author: 'Cascallen Steve Cascallen',
    authorRole: 'Frontend Engineer',
    authorImage: 'https://res.cloudinary.com/dqvsjtkqw/image/upload/v1752050555/WhatsApp_Image_2024-06-16_at_00.57.23_a2952eba_1_pokuj5.jpg',
    publishDate: '2025-11-05',
    readTime: '5 min read',
    category: 'Web Development',
    tags: ['Web Development', 'AI', 'PWA', 'Serverless', 'Security'],
    image: '/images/NOVATECH.png',
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
    authorImage: '/images/team/billy.jpg',
    publishDate: '2024-01-10',
    readTime: '4 min read',
    category: 'Fintech',
    tags: ['M-Pesa', 'Payment Integration', 'Fintech', 'ROI', 'Business Growth'],
    image: '/images/MPESA.png',
    featured: true
  },
  {
    id: 3,
    title: 'SEO Best Practices for Modern Websites in 2025',
    slug: 'seo-best-practices-modern-websites-2025',
    excerpt: 'Discover the latest SEO strategies and techniques that will help your website rank higher and attract more organic traffic.',
    content: `
      <p>Search Engine Optimization continues to evolve with changing algorithms and user behaviors. In 2024, successful SEO requires a holistic approach that combines technical excellence with user-focused content strategy.</p>
      
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
    author: 'Cascallen Steve Cascallen',
    authorRole: 'Frontend Engineer',
    authorImage: 'https://res.cloudinary.com/dqvsjtkqw/image/upload/v1752050555/WhatsApp_Image_2024-06-16_at_00.57.23_a2952eba_1_pokuj5.jpg',
    publishDate: '2025-11-10',
    readTime: '6 min read',
    category: 'SEO',
    tags: ['SEO', 'Core Web Vitals', 'Content Strategy', 'Local SEO', 'Mobile Optimization'],
    image: '/images/TECHNOVA3.png',
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
    publishDate: '2024-01-05',
    readTime: '7 min read',
    category: 'Mobile Development',
    tags: ['React Native', 'Native Development', 'Mobile Apps', 'Cross-Platform', 'Performance'],
    image: '/images/NOVATECH.png',
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
    authorImage: '/images/team/billy.jpg',
    publishDate: '2024-01-03',
    readTime: '5 min read',
    category: 'System Modernization',
    tags: ['Legacy Systems', 'Modernization', 'Migration', 'System Upgrade', 'Digital Transformation'],
    image: '/images/TECHNOVA3.png',
    featured: false
  }
]

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>()
  const [post, setPost] = useState<BlogPost | null>(null)
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([])

  useEffect(() => {
    const foundPost = blogPosts.find(p => p.slug === slug)
    setPost(foundPost || null)
    
    if (foundPost) {
      // Get related posts from the same category
      const related = blogPosts
        .filter(p => p.id !== foundPost.id && p.category === foundPost.category)
        .slice(0, 3)
      setRelatedPosts(related)
    }
  }, [slug])

  useDocumentTitle(post ? `${post.title} | Technova IT Solutions Blog` : 'Blog Article | Technova IT Solutions')

  if (!post) {
    return (
      <div className="min-h-screen bg-white text-neutral-900">
        <Navbar />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-neutral-900 mb-4">Post Not Found</h1>
            <p className="text-lg text-neutral-700 mb-8">The blog post you're looking for doesn't exist.</p>
            <a
              href="/blog"
              className="inline-flex items-center justify-center bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              Back to Blog
            </a>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white text-neutral-900">
      <Navbar />
      
      {/* Hero Section */}
      <section className="w-full py-16 bg-gradient-to-r from-neutral-900 to-neutral-800">
        <div className="px-4 md:px-6 lg:px-16 max-w-4xl mx-auto">
          <div className="text-white">
            <div className="flex items-center gap-4 mb-6">
              <span className="px-3 py-1 bg-blue-600 text-white text-sm font-medium rounded-full">
                {post.category}
              </span>
              <span className="text-neutral-300 text-sm">{post.readTime}</span>
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
              {post.title}
            </h1>
            <p className="text-lg md:text-xl text-neutral-300 mb-8 leading-relaxed">
              {post.excerpt}
            </p>
            <div className="flex items-center gap-4">
              <img
                src={post.authorImage}
                alt={post.author}
                className="w-12 h-12 rounded-full object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDgiIGhlaWdodD0iNDgiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0iIzk5OTk5OSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEyIDEyYzIuMjEgMCA0LTEuNzkgNC00cy0xLjc5LTQtNC00LTQgMS43OS00IDQgMS43OSA0IDQgNHptMCAyYy0yLjY3IDAtOCAxLjM0LTggNHYyaDE2di0yYzAtMi42Ni01LjMzLTQtOC00eiIvPgo8L3N2Zz4K';
                }}
              />
              <div>
                <div className="font-medium text-white">{post.author}</div>
                <div className="text-sm text-neutral-300">{post.authorRole}</div>
              </div>
              <div className="ml-auto text-sm text-neutral-300">
                {new Date(post.publishDate).toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Image */}
      <section className="w-full">
        <div className="px-4 md:px-6 lg:px-16 max-w-4xl mx-auto -mt-8">
          <div className="aspect-video bg-neutral-200 rounded-2xl overflow-hidden shadow-2xl">
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section className="w-full py-16">
        <div className="px-4 md:px-6 lg:px-16 max-w-4xl mx-auto">
          <div className="grid lg:grid-cols-4 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-3">
              <article className="prose prose-lg max-w-none">
                <div 
                  className="text-neutral-700 leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: post.content }}
                />
              </article>
              
              {/* Tags */}
              <div className="mt-8 pt-8 border-t border-neutral-200">
                <h3 className="text-lg font-semibold text-neutral-900 mb-4">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <span key={tag} className="px-3 py-1 bg-neutral-100 text-neutral-700 text-sm rounded-lg">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Author Bio */}
              <div className="mt-8 p-6 bg-neutral-50 rounded-2xl">
                <div className="flex items-start gap-4">
                  <img
                    src={post.authorImage}
                    alt={post.author}
                    className="w-16 h-16 rounded-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0iIzk5OTk5OSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEyIDEyYzIuMjEgMCA0LTEuNzkgNC00cy0xLjc5LTQtNC00LTQgMS43OS00IDQgMS43OSA0IDQgNHptMCAyYy0yLjY3IDAtOCAxLjM0LTggNHYyaDE2di0yYzAtMi42Ni01LjMzLTQtOC00eiIvPgo8L3N2Zz4K';
                    }}
                  />
                  <div>
                    <h4 className="text-lg font-semibold text-neutral-900">{post.author}</h4>
                    <p className="text-neutral-600 mb-2">{post.authorRole}</p>
                    <p className="text-neutral-700 text-sm">
                      {post.authorRole === 'Frontend Engineer' 
                        ? 'Passionate about creating beautiful, responsive user interfaces and seamless user experiences.'
                        : 'Experienced in building robust, scalable backend systems and integrating complex APIs.'
                      }
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-8 space-y-6">
                {/* Share */}
                <div className="bg-white rounded-2xl p-6 border border-neutral-200">
                  <h3 className="text-lg font-semibold text-neutral-900 mb-4">Share this post</h3>
                  <div className="flex gap-3">
                    <button className="flex items-center justify-center w-10 h-10 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                      </svg>
                    </button>
                    <button className="flex items-center justify-center w-10 h-10 bg-blue-800 text-white rounded-lg hover:bg-blue-900 transition-colors">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                      </svg>
                    </button>
                    <button className="flex items-center justify-center w-10 h-10 bg-neutral-600 text-white rounded-lg hover:bg-neutral-700 transition-colors">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                      </svg>
                    </button>
                  </div>
                </div>

                {/* Contact CTA */}
                <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl p-6 text-white">
                  <h3 className="text-lg font-bold mb-2">Need Help?</h3>
                  <p className="text-blue-100 text-sm mb-4">
                    Have questions about this topic? Let's discuss how we can help.
                  </p>
                  <a
                    href="/contact"
                    className="inline-flex items-center justify-center w-full bg-white text-blue-600 px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-50 transition-colors"
                  >
                    Get in Touch
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="w-full py-16 bg-neutral-50">
          <div className="px-4 md:px-6 lg:px-16 max-w-7xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-neutral-900 mb-8">Related Articles</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {relatedPosts.map((relatedPost) => (
                <article key={relatedPost.id} className="bg-white rounded-2xl shadow-sm border border-neutral-200 overflow-hidden hover:shadow-lg transition-shadow group">
                  <div className="aspect-video bg-neutral-200 overflow-hidden">
                    <img
                      src={relatedPost.image}
                      alt={relatedPost.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-4 mb-3">
                      <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
                        {relatedPost.category}
                      </span>
                      <span className="text-neutral-500 text-sm">{relatedPost.readTime}</span>
                    </div>
                    <h3 className="text-lg font-bold text-neutral-900 mb-3 group-hover:text-blue-600 transition-colors">
                      <a href={`/blog/${relatedPost.slug}`}>{relatedPost.title}</a>
                    </h3>
                    <p className="text-neutral-700 text-sm leading-relaxed">{relatedPost.excerpt}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer />
      <WhatsAppButton />
    </div>
  )
}

export default BlogPost
