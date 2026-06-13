'use client'
import Link from 'next/link'

export default function Nav() {
  const scrollToWaitlist = () => {
    document.getElementById('waitlist')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <nav className="sticky top-0 z-50 bg-bg/85 backdrop-blur-md border-b border-border">
      <div className="max-w-content mx-auto px-6 flex items-center justify-between h-14">

        <Link href="/" className="font-mono text-[15px] font-medium tracking-tight text-ink">
          post<span className="text-accent">less</span>.app
        </Link>

        <div className="hidden md:flex items-center gap-7">
          {[
            { label: 'How it works', href: '/#how-it-works' },
            { label: 'Platforms',    href: '/#platforms' },
            { label: 'Features',     href: '/#features' },
            { label: 'Blog',         href: '/blog' },
            { label: 'FAQ',          href: '/#faq' },
          ].map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-[13px] text-ink-2 hover:text-ink transition-colors"
            >
              {l.label}
            </Link>
          ))}
        </div>

        <button
          onClick={scrollToWaitlist}
          className="text-[13px] font-medium px-4 py-[7px] border border-border-l rounded text-ink hover:border-accent hover:text-accent transition-colors"
        >
          Join waitlist
        </button>
      </div>
    </nav>
  )
}
