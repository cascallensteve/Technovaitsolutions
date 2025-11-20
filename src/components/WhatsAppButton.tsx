import { useState } from 'react'

const WhatsAppButton = () => {
  const [isHovered, setIsHovered] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  
  // WhatsApp number with Kenya country code
  const phoneNumber = "254712665257" // Kenya: +254 712 665 257
  const message = "Hello! Technova I'm interested in your services. Can we discuss my project?"
  
  const handleWhatsAppClick = () => {
    const encodedMessage = encodeURIComponent(message)
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`
    window.open(whatsappUrl, '_blank')
  }

  const handlePhoneClick = () => {
    window.location.href = `tel:+${phoneNumber}`
  }

  const handleEmailClick = () => {
    window.location.href = 'mailto:hello@technovaitsolutions.com'
  }

  return (
    <div className="fixed bottom-6 left-6 z-50 flex flex-col items-center gap-3">
      {/* Expanded contact actions */}
      {isOpen && (
        <div className="flex flex-col items-center gap-3 mb-1">
          {/* WhatsApp */}
          <button
            type="button"
            onClick={handleWhatsAppClick}
            className="flex items-center justify-center w-12 h-12 rounded-full bg-green-500 hover:bg-green-600 shadow-lg hover:shadow-xl transition-transform duration-300 hover:scale-105"
            aria-label="Chat on WhatsApp"
          >
            <svg
              className="w-6 h-6 text-white"
              fill="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893A11.821 11.821 0 0020.465 3.488"/>
            </svg>
          </button>

          {/* Phone */}
          <button
            type="button"
            onClick={handlePhoneClick}
            className="flex items-center justify-center w-12 h-12 rounded-full bg-emerald-400 hover:bg-emerald-500 shadow-lg hover:shadow-xl transition-transform duration-300 hover:scale-105"
            aria-label="Call us"
          >
            <svg
              className="w-6 h-6 text-white"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92Z"
                stroke="currentColor"
                strokeWidth="2"
              />
            </svg>
          </button>

          {/* Email */}
          <button
            type="button"
            onClick={handleEmailClick}
            className="flex items-center justify-center w-12 h-12 rounded-full bg-rose-500 hover:bg-rose-600 shadow-lg hover:shadow-xl transition-transform duration-300 hover:scale-105"
            aria-label="Email us"
          >
            <svg
              className="w-6 h-6 text-white"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="2" />
              <path d="M3 7l9 6 9-6" stroke="currentColor" strokeWidth="2" />
            </svg>
          </button>

          {/* Close */}
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="flex items-center justify-center w-12 h-12 rounded-full bg-purple-400 hover:bg-purple-500 shadow-lg hover:shadow-xl transition-transform duration-300 hover:scale-105"
            aria-label="Close contact menu"
          >
            <svg
              className="w-6 h-6 text-white"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M6 18L18 6M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      )}

      {/* Main toggle button */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="group relative flex items-center justify-center w-14 h-14 bg-purple-500 hover:bg-purple-600 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110"
        aria-label="Open contact options"
      >
        {/* Chat bubble icon (main trigger) */}
        <svg
          className="w-7 h-7 text-white"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M5 5h14a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2h-5.5L9 21v-5H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Z"
            fill="currentColor"
          />
          <path
            d="M8 10h5M8 13h3.5"
            stroke="white"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
        </svg>

        {/* Tooltip with curved arrow */}
        <div
          className={`absolute left-16 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-gray-800 to-gray-700 text-white text-sm px-4 py-2 rounded-xl whitespace-nowrap transition-all duration-300 shadow-lg ${
            isHovered ? 'opacity-100 -translate-x-1' : 'opacity-0 translate-x-2 pointer-events-none'
          }`}
        >
          Contact Technova
          {/* Curved Arrow */}
          <div className="absolute right-full top-1/2 transform -translate-y-1/2">
            <svg 
              width="20" 
              height="16" 
              viewBox="0 0 20 16" 
              fill="none" 
              className="text-gray-700"
            >
              <path 
                d="M19 8C19 8 15 1 8 8C1 15 1 8 1 8" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                fill="none"
              />
              <path 
                d="M4 6L1 8L4 10" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
                fill="none"
              />
            </svg>
          </div>
        </div>

        {/* Pulse animation */}
        <div className="absolute inset-0 rounded-full bg-purple-500 animate-ping opacity-20"></div>
      </button>
    </div>
  )
}

export default WhatsAppButton
