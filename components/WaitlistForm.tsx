'use client'
import { useState, useRef } from 'react'

interface Props {
  source?: string
  center?: boolean
}

export default function WaitlistForm({ source = 'landing_hero', center = false }: Props) {
  const [status,  setStatus]  = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const email = inputRef.current?.value.trim()
    if (!email) return

    setStatus('loading')
    setMessage('')

    try {
      const res  = await fetch('/api/waitlist', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ email, source }),
      })
      const data = await res.json()

      if (!res.ok) {
        setStatus('error')
        setMessage(data.error ?? 'Something went wrong. Please try again.')
        return
      }

      setStatus('success')
      setMessage(
        data.already
          ? "You're already on the list — we'll be in touch before launch."
          : "You're on the list. You'll get early access + an extended trial when we launch."
      )
    } catch {
      setStatus('error')
      setMessage('Something went wrong. Please try again.')
    }
  }

  if (status === 'success') {
    return (
      <p
        role="status"
        className={`font-mono text-[13px] text-accent ${center ? 'text-center' : ''}`}
      >
        ✓ {message}
      </p>
    )
  }

  return (
    <div className={center ? 'flex flex-col items-center' : ''}>
      <form
        onSubmit={handleSubmit}
        className={`flex gap-2 max-w-[420px] ${center ? 'w-full' : ''}`}
      >
        <input
          ref={inputRef}
          type="email"
          name="email"
          placeholder="your@email.com"
          required
          autoComplete="email"
          aria-label="Email address"
          className="
            flex-1 h-11 px-3.5
            bg-bg-1 border border-border-l rounded
            text-ink text-[14px] placeholder:text-ink-3
            outline-none focus:border-accent
            transition-colors
          "
        />
        <button
          type="submit"
          disabled={status === 'loading'}
          className="
            h-11 px-5
            bg-accent text-bg font-medium text-[14px] rounded
            hover:bg-[#bfeb5a] active:scale-[.98]
            disabled:opacity-60 disabled:cursor-not-allowed
            transition-all whitespace-nowrap
          "
        >
          {status === 'loading' ? 'Joining…' : 'Join the waitlist'}
        </button>
      </form>

      {status === 'error' && (
        <p role="alert" className="mt-2 text-[12px] text-red-400">{message}</p>
      )}

      <p className={`mt-3 text-[12px] text-ink-3 ${center ? 'text-center' : ''}`}>
        No credit card. Early access + extended trial at launch.
      </p>
    </div>
  )
}
