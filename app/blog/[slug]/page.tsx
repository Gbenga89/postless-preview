import type { Metadata } from 'next'
import { notFound }         from 'next/navigation'
import Link                 from 'next/link'
import { MDXRemote }        from 'next-mdx-remote/rsc'
import Nav                  from '../../../components/Nav'
import Footer               from '../../../components/Footer'
import WaitlistForm         from '../../../components/WaitlistForm'
import { getPostBySlug, getAllPosts } from '../../../lib/blog'

interface Props { params: { slug: string } }

export async function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = getPostBySlug(params.slug)
  if (!post) return {}

  const url = `https://postless.app/blog/${post.slug}`
  return {
    title:       `${post.title} | Postless`,
    description: post.description,
    alternates:  { canonical: url },
    openGraph: {
      title:       post.title,
      description: post.description,
      type:        'article',
      url,
      publishedTime: post.date,
      authors:       [post.author],
      tags:          post.tags,
    },
    twitter: {
      card:        'summary_large_image',
      title:       post.title,
      description: post.description,
    },
  }
}

const TAG_LABELS: Record<string, string> = {
  'how-to':     'How-to',
  'comparison': 'Comparison',
  'strategy':   'Strategy',
  'case-study': 'Case study',
}

export default function BlogPost({ params }: Props) {
  const post = getPostBySlug(params.slug)
  if (!post) notFound()

  // JSON-LD structured data for Google
  const jsonLd = {
    '@context':         'https://schema.org',
    '@type':            'BlogPosting',
    headline:           post.title,
    description:        post.description,
    datePublished:      post.date,
    author: { '@type': 'Organization', name: 'Postless', url: 'https://postless.app' },
    publisher: {
      '@type': 'Organization',
      name:    'Postless',
      url:     'https://postless.app',
    },
    mainEntityOfPage:   `https://postless.app/blog/${post.slug}`,
  }

  return (
    <>
      <Nav />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main className="max-w-[720px] mx-auto px-6 py-20">

        {/* Back */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 font-mono text-[12px] text-ink-3 hover:text-ink-2 mb-10 transition-colors"
        >
          ← All articles
        </Link>

        {/* Header */}
        <header className="mb-12 pb-12 border-b border-border">
          <div className="flex items-center gap-3 mb-4">
            <span className="font-mono text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-sm bg-bg-1 border border-border text-ink-3">
              {TAG_LABELS[post.tag] ?? post.tag}
            </span>
            <span className="font-mono text-[11px] text-ink-3">{post.date}</span>
            <span className="font-mono text-[11px] text-ink-3">{post.readingTime}</span>
          </div>
          <h1 className="text-[clamp(26px,4vw,42px)] font-medium leading-[1.1] tracking-[-0.03em] text-ink mb-4">
            {post.title}
          </h1>
          <p className="text-[17px] text-ink-2 leading-relaxed">{post.description}</p>
        </header>

        {/* MDX content */}
        <div className="prose prose-invert max-w-none">
          <MDXRemote source={post.content} />
        </div>

        {/* CTA at bottom of every post */}
        <div className="mt-16 pt-12 border-t border-border">
          <p className="font-mono text-[11px] uppercase tracking-widest text-accent mb-3">Try Postless</p>
          <h2 className="text-[24px] font-medium text-ink leading-snug mb-3">
            Stop writing posts from scratch.
          </h2>
          <p className="text-[15px] text-ink-2 mb-6 max-w-[440px]">
            Join the waitlist and get 3 months of Pro free at launch.
          </p>
          <WaitlistForm source={`blog_${post.slug}`} />
        </div>
      </main>

      <Footer />
    </>
  )
}
