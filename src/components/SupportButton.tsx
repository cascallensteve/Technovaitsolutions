import { useState } from 'react'
import { sendChat, type ChatMessage } from '../services/aiChat'

const SupportButton = () => {
  const [open, setOpen] = useState(false)
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [sending, setSending] = useState(false)


  const sendMessage = async () => {
    if (!message.trim() || sending) return
    const userMsg: ChatMessage = { role: 'user', content: message.trim() }
    setMessages((prev) => [...prev, userMsg])
    setMessage('')
    setSending(true)
    try {
      const res = await sendChat({ message: userMsg.content, history: [...messages, userMsg] })
      const reply = res.success && res.data?.reply ? res.data.reply : (res.message || 'Sorry, something went wrong.')
      setMessages((prev) => [...prev, { role: 'assistant', content: reply }])
    } finally {
      setSending(false)
    }
  }

  return (
    <div className="fixed right-6 bottom-24 z-50">
      {/* Floating button */}
      <button
        onClick={() => setOpen(true)}
        className="group relative flex items-center gap-2 px-4 h-12 rounded-full bg-indigo-600 text-white shadow-lg hover:bg-indigo-700 transition-all duration-300"
        aria-label="Open Technova support"
      >
        <span className="inline-block h-2 w-2 rounded-full bg-white/90"></span>
        <span className="font-semibold text-sm">We Are Here • Technova</span>
      </button>

      {/* Assistant panel (drawer) */}
      {open && (
        <div className="fixed inset-0 z-[60]">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/30"
            onClick={() => setOpen(false)}
            aria-hidden
          />

          {/* Drawer */}
          <div className="absolute right-0 top-0 h-full w-full sm:w-[420px] bg-white shadow-2xl border-l border-neutral-200 flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-neutral-200 bg-indigo-600 text-white">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-full bg-white/20 flex items-center justify-center">
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11c1.657 0 3-1.567 3-3.5S13.657 4 12 4 9 5.567 9 7.5 10.343 11 12 11zm0 2c-2.761 0-5 2.015-5 4.5V19a1 1 0 001 1h8a1 1 0 001-1v-1.5c0-2.485-2.239-4.5-5-4.5z"/></svg>
                </div>
                <div>
                  <p className="text-sm leading-tight opacity-90">Customer Support</p>
                  <p className="text-xs opacity-80">We’re here and eager to help</p>
                </div>
              </div>
              <button onClick={() => setOpen(false)} aria-label="Close support" className="rounded-full p-1.5 hover:bg-white/10">
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/></svg>
              </button>
            </div>

            {/* Body */}
            <div className="flex-1 overflow-y-auto p-4 bg-neutral-50">
              {/* Welcome bubble */}
              <div className="max-w-[85%]">
                <div className="text-sm text-white bg-indigo-600 rounded-2xl rounded-tl-sm px-4 py-3 shadow">
                  Karibu Technova! Where simplicity meets results. We’re here and eager to help you out.
                </div>
                <div className="mt-2 flex items-center gap-2 text-[11px] text-neutral-500">
                  <div className="h-6 w-6 rounded-full bg-neutral-300" />
                  Customer Support
                </div>
              </div>

              {/* Spacer */}
              <div className="h-6" />

              {/* Placeholder for assistant (you can plug your widget/iframe here) */}
              <div className="rounded-xl border border-dashed border-neutral-300 bg-white p-3 text-sm text-neutral-700 space-y-3 max-h-[46vh] overflow-y-auto">
                {messages.length === 0 && (
                  <div className="text-neutral-500">Ask us anything to get started.</div>
                )}
                {messages.map((m, idx) => (
                  <div key={idx} className={m.role === 'assistant' ? 'max-w-[85%]' : 'max-w-[85%] ml-auto'}>
                    <div className={
                      m.role === 'assistant'
                        ? 'bg-indigo-600 text-white rounded-2xl rounded-tl-sm px-4 py-2 shadow'
                        : 'bg-neutral-100 text-neutral-800 rounded-2xl rounded-tr-sm px-4 py-2 shadow'
                    }>
                      {m.content}
                    </div>
                    <div className={
                      'mt-1 flex items-center gap-2 text-[10px] ' + (m.role === 'assistant' ? 'text-neutral-500' : 'text-neutral-400 justify-end')
                    }>
                      {m.role === 'assistant' ? 'Assistant' : 'You'}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Input */}
            <div className="border-t border-neutral-200 p-3 bg-white">
              <div className="flex items-center gap-2 rounded-full ring-1 ring-neutral-300 bg-white px-3 py-2">
                <input
                  type="text"
                  placeholder="Describe your issue..."
                  className="flex-1 bg-transparent outline-none text-sm"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault()
                      sendMessage()
                    }
                  }}
                />
                <button
                  onClick={sendMessage}
                  disabled={sending}
                  className="rounded-full bg-indigo-600 text-white px-3 py-1.5 text-xs hover:bg-indigo-700 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {sending ? 'Sending...' : 'Send'}
                </button>
              </div>
              <p className="mt-2 text-[11px] text-neutral-500">
                Messages are sent to the Technova AI assistant.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default SupportButton

