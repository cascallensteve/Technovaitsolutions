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
      } else {
        element = document.querySelector(`meta[name="${tag.name}"]`) as HTMLMetaElement
      }
      
      if (!element) {
        element = document.createElement('meta')
        if (tag.property) {
          element.setAttribute('property', tag.property)
        } else {
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
