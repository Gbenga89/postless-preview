'use client'
import { useState } from 'react'

export default function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border-b border-border">
      <button
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        className="flex w-full items-center justify-between py-5 text-left text-[15px] font-medium text-ink bg-transparent border-0 cursor-pointer"
      >
        {q}
        <svg
          className={`w-4 h-4 text-ink-3 shrink-0 transition-transform ${open ? 'rotate-45' : ''}`}
          viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"
          aria-hidden="true"
        >
          <line x1="12" y1="5" x2="12" y2="19" />
          <line x1="5"  y1="12" x2="19" y2="12" />
        </svg>
      </button>
      {open && (
        <p className="text-[14px] text-ink-2 leading-relaxed pb-5 max-w-[600px]">{a}</p>
      )}
    </div>
  )
}
