import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import WhatsAppButton from '../components/WhatsAppButton'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import { listPosts, retrievePost, type BlogPostApi } from '../services/blogService'

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

function toUiPost(p: BlogPostApi): BlogPost {
  return {
    id: p.id,
    title: p.title,
    slug: p.slug,
    excerpt: p.excerpt,
    content: p.content,
    author: p.author || 'Technova',
    authorRole: p.author_role || 'Author',
    authorImage: p.author_image || 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDgiIGhlaWdodD0iNDgiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0iIzk5OTk5OSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEyIDEyYzIuMjEgMCA0LTEuNzkgNC00cy0xLjc5LTQtNC00LTQgMS43OS00IDQgMS43OSA0IDQgNHptMCAyYy0yLjY3IDAtOCAxLjM0LTggNHYyaDE2di0yYzAtMi42Ni01LjMzLTQtOC00eiIvPgo8L3N2Zz4K',
    publishDate: p.publish_date || new Date().toISOString().slice(0, 10),
    readTime: p.read_time || '—',
    category: p.category || 'General',
    tags: Array.isArray(p.tags) ? p.tags : [],
    image: p.image || '/images/NOVATECH.png',
    featured: Boolean(p.featured),
  }
}

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>()
  console.log('[BlogPost] Component loaded with slug:', slug)
  const [post, setPost] = useState<BlogPost | null>(null)
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [copySuccess, setCopySuccess] = useState(false)

  useEffect(() => {
    let cancelled = false
    const run = async () => {
      if (!slug) {
        setPost(null)
        setRelatedPosts([])
        return
      }

      setLoading(true)
      setError('')
      try {
        const apiPost = await retrievePost(slug)
        if (cancelled) return
        const uiPost = toUiPost(apiPost)
        setPost(uiPost)

        // Update meta tags for social sharing
        updateMetaTags(uiPost)

        try {
          const related = await listPosts({ category: apiPost.category || '' })
          if (cancelled) return
          const mappedRelated = related
            .filter((p: BlogPostApi) => p.slug !== apiPost.slug)
            .slice(0, 3)
            .map(toUiPost)
          setRelatedPosts(mappedRelated)
        } catch {
          if (!cancelled) setRelatedPosts([])
        }
      } catch (e: any) {
        if (cancelled) return
        setError(e instanceof Error ? e.message : 'Failed to load blog post')
        setPost(null)
        setRelatedPosts([])
      } finally {
        if (!cancelled) setLoading(false)
      }
    }
    run()
    return () => {
      cancelled = true
    }
  }, [slug])

  const updateMetaTags = (post: BlogPost) => {
    // Update title
    document.title = `${post.title} | Technova IT Solutions Blog`
    
    // Update or create meta tags
    const metaTags = [
      { name: 'description', content: post.excerpt },
      { property: 'og:title', content: post.title },
      { property: 'og:description', content: post.excerpt },
      { property: 'og:image', content: post.image },
      { property: 'og:url', content: window.location.href },
      { property: 'og:type', content: 'article' },
      { property: 'article:section', content: post.category },
      { property: 'article:published_time', content: new Date(post.publishDate).toISOString() },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: post.title },
      { name: 'twitter:description', content: post.excerpt },
      { name: 'twitter:image', content: post.image },
    ]

    metaTags.forEach(tag => {
      let element
      if (tag.property) {
        element = document.querySelector(`meta[property="${tag.property}"]`) as HTMLMetaElement
      } else if (tag.name) {
        element = document.querySelector(`meta[name="${tag.name}"]`) as HTMLMetaElement
      }
      
      if (!element) {
        element = document.createElement('meta')
        if (tag.property) {
          element.setAttribute('property', tag.property)
        } else if (tag.name) {
          element.setAttribute('name', tag.name)
        }
        document.head.appendChild(element)
      }
      element.setAttribute('content', tag.content)
    })

    // Add article:tag meta tags for each tag
    post.tags.forEach(tag => {
      let tagElement = document.querySelector(`meta[property="article:tag"][content="${tag}"]`) as HTMLMetaElement
      if (!tagElement) {
        tagElement = document.createElement('meta')
        tagElement.setAttribute('property', 'article:tag')
        tagElement.setAttribute('content', tag)
        document.head.appendChild(tagElement)
      }
    })
  }

  const shareUrl = typeof window !== 'undefined' ? window.location.href : ''
  const shareTitle = post?.title || ''
  const shareDescription = post?.excerpt || ''

  const handleShare = (platform: string) => {
    const urls = {
      twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(`${shareTitle} - ${shareDescription}`)}&via=technova_ke`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
      whatsapp: `https://wa.me/?text=${encodeURIComponent(`${shareTitle} - ${shareDescription} ${shareUrl}`)}`,
    }

    if (platform === 'copy') {
      navigator.clipboard.writeText(shareUrl).then(() => {
        setCopySuccess(true)
        setTimeout(() => setCopySuccess(false), 2000)
      })
    } else {
      window.open(urls[platform as keyof typeof urls], '_blank', 'width=600,height=400')
    }
  }

  useDocumentTitle(post ? `${post.title} | Technova IT Solutions Blog` : 'Blog Article | Technova IT Solutions')

  if (loading) {
    return (
      <div className="min-h-screen bg-white text-neutral-900">
        <Navbar />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="inline-flex items-center gap-3 text-sm text-neutral-600">
            <span className="inline-block h-4 w-4 rounded-full border-2 border-neutral-300 border-t-neutral-700 animate-spin" />
            Loading article…
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-white text-neutral-900">
        <Navbar />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-neutral-900 mb-4">Post Not Found</h1>
            <p className="text-lg text-neutral-700 mb-8">{error || "The blog post you're looking for doesn't exist."}</p>
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
    <div className="min-h-screen bg-white text-neutral-900 overflow-x-hidden">
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
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 mb-8 border border-white/20">
              <p className="text-lg md:text-xl text-neutral-100 leading-relaxed break-words overflow-wrap-anywhere" style={{ wordWrap: 'break-word', overflowWrap: 'anywhere', hyphens: 'auto' }}>
                {post.excerpt}
              </p>
            </div>
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
          {/* Main Content */}
          <div className="prose prose-lg max-w-none prose-headings:scroll-mt-20 prose-img:rounded-xl prose-img:shadow-lg">
            <div 
              className="text-neutral-700 leading-relaxed break-words overflow-wrap-anywhere"
              style={{ wordWrap: 'break-word', overflowWrap: 'anywhere', hyphens: 'auto' }}
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </div>
          
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

          {/* Sidebar moved below content for mobile */}
          <div className="mt-12 grid md:grid-cols-2 gap-8">
            {/* Share */}
            <div className="bg-white rounded-2xl p-6 border border-neutral-200">
              <h3 className="text-lg font-semibold text-neutral-900 mb-4">Share this post</h3>
              <div className="grid grid-cols-2 gap-3">
                <button 
                  onClick={() => handleShare('twitter')}
                  className="flex items-center justify-center gap-2 px-4 py-3 bg-sky-500 text-white rounded-lg hover:bg-sky-600 transition-colors text-sm font-medium"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                  </svg>
                  Twitter
                </button>
                <button 
                  onClick={() => handleShare('linkedin')}
                  className="flex items-center justify-center gap-2 px-4 py-3 bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition-colors text-sm font-medium"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                  LinkedIn
                </button>
                <button 
                  onClick={() => handleShare('facebook')}
                  className="flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                  Facebook
                </button>
                <button 
                  onClick={() => handleShare('whatsapp')}
                  className="flex items-center justify-center gap-2 px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.149-.67.149-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414-.074-.123-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                  </svg>
                  WhatsApp
                </button>
              </div>
              <div className="mt-3 pt-3 border-t border-neutral-200">
                <button 
                  onClick={() => handleShare('copy')}
                  className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-neutral-100 text-neutral-700 rounded-lg hover:bg-neutral-200 transition-colors text-sm font-medium"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  {copySuccess ? 'Copied!' : 'Copy Link'}
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
