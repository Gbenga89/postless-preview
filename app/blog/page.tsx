import type { Metadata } from 'next'
import Link          from 'next/link'
import Nav           from '../../components/Nav'
import Footer        from '../../components/Footer'
import { getAllPosts, getAllTags } from '../../lib/blog'

export const metadata: Metadata = {
  title:       'Blog — Postless',
  description: 'Guides, comparisons, and strategies for building your professional brand on social media.',
  alternates:  { canonical: 'https://postless.app/blog' },
  openGraph: {
    title:       'Blog — Postless',
    description: 'Guides, comparisons, and strategies for building your professional brand.',
    url:         'https://postless.app/blog',
  },
}

const TAG_LABELS: Record<string, string> = {
  'how-to':     'How-to',
  'comparison': 'Comparison',
  'strategy':   'Strategy',
  'case-study': 'Case study',
}

export default function BlogIndex() {
  const posts = getAllPosts()
  const tags  = getAllTags()

  return (
    <>
      <Nav />
      <main className="max-w-content mx-auto px-6 py-20">

        {/* Header */}
        <div className="mb-14 border-b border-border pb-14">
          <p className="font-mono text-[11px] uppercase tracking-widest text-accent mb-3">Blog</p>
          <h1 className="text-[clamp(28px,4vw,44px)] font-medium leading-[1.1] tracking-[-0.03em] text-ink max-w-[560px] mb-4">
            Guides, strategies &amp; brand-building playbooks.
          </h1>
          <p className="text-[16px] text-ink-2 max-w-[440px] leading-relaxed">
            Practical articles on building a professional brand on LinkedIn, X, and beyond — without the burnout.
          </p>
        </div>

        {/* Tag filter */}
        {tags.length > 0 && (
          <div className="flex gap-2 flex-wrap mb-12">
            <span className="font-mono text-[11px] text-ink-3 self-center mr-1">Filter:</span>
            {tags.map((tag) => (
              <span
                key={tag}
                className="font-mono text-[11px] px-2.5 py-1 rounded-sm border border-border text-ink-2 uppercase tracking-wider"
              >
                {TAG_LABELS[tag] ?? tag}
              </span>
            ))}
          </div>
        )}

        {/* Post list */}
        {posts.length === 0 ? (
          <div className="border border-border rounded-[10px] p-14 text-center">
            <p className="font-mono text-[13px] text-ink-3">Articles coming soon — check back after launch.</p>
          </div>
        ) : (
          <div className="divide-y divide-border">
            {posts.map((post) => (
              <article key={post.slug} className="py-8 group">
                <Link href={`/blog/${post.slug}`} className="block">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="font-mono text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-sm bg-bg-1 border border-border text-ink-3">
                      {TAG_LABELS[post.tag] ?? post.tag}
                    </span>
                    <span className="font-mono text-[11px] text-ink-3">{post.date}</span>
                    <span className="font-mono text-[11px] text-ink-3">{post.readingTime}</span>
                  </div>
                  <h2 className="text-[20px] font-medium text-ink leading-snug mb-2 group-hover:text-accent transition-colors">
                    {post.title}
                  </h2>
                  <p className="text-[14px] text-ink-2 leading-relaxed max-w-[600px]">
                    {post.description}
                  </p>
                  <p className="mt-3 text-[13px] text-accent font-mono">Read →</p>
                </Link>
              </article>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </>
  )
}
