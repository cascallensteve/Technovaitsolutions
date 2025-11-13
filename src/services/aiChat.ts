const API_BASE = (import.meta as any)?.env?.VITE_API_BASE || 'https://technova-backend-drab.vercel.app/'

export type ChatMessage = {
  role: 'user' | 'assistant' | 'system'
  content: string
}

export type ChatRequest = {
  message: string
  history?: ChatMessage[]
  model?: string
  temperature?: number
  max_tokens?: number
}

export type ChatResponse = {
  success: boolean
  data?: {
    reply: string
    model?: string
  }
  message?: string
}

export async function sendChat(req: ChatRequest): Promise<ChatResponse> {
  const res = await fetch(`${API_BASE}/api/ai/chat/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      message: req.message,
      history: req.history || [],
      model: req.model || 'llama-3.3-70b-versatile',
      temperature: req.temperature ?? 0.2,
      max_tokens: req.max_tokens ?? 256,
    }),
  })

  const ct = res.headers.get('content-type') || ''
  const data = ct.includes('application/json') ? await res.json() : { message: await res.text() }

  if (!res.ok) {
    return {
      success: false,
      message: (data && (data.message || (typeof data === 'string' ? data : 'Request failed'))) || 'Request failed',
    }
  }

  return data as ChatResponse
}
