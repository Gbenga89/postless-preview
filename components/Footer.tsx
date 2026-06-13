import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="max-w-content mx-auto px-6 py-7 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="font-mono text-[13px] text-ink-3">© {new Date().getFullYear()} postless.app</p>
        <nav className="flex gap-5" aria-label="Footer">
          {[
            { label: 'Blog',    href: '/blog' },
            { label: 'Privacy', href: '/privacy' },
            { label: 'Terms',   href: '/terms' },
            { label: 'X',       href: 'https://x.com/postlessapp' },
          ].map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-[13px] text-ink-3 hover:text-ink-2 transition-colors"
            >
              {l.label}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  )
}
