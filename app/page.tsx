import type { Metadata } from 'next'
import Nav          from '../components/Nav'
import Footer       from '../components/Footer'
import WaitlistForm from '../components/WaitlistForm'

export const metadata: Metadata = {
  alternates: { canonical: 'https://postless.app' },
}

/* ─── Platform data ─────────────────────────────────────────── */
const PLATFORMS = [
  {
    key: 'li', name: 'LinkedIn',
    status: 'launch' as const,
    desc: 'Long-form posts, articles, and comment engagement for professional brand building.',
    icon: (
      <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    ),
    bg: 'bg-[#0a1628]', color: 'text-[#4a9eff]',
  },
  {
    key: 'x', name: 'X / Twitter',
    status: 'launch' as const,
    desc: 'Threads, replies, and single posts — tuned for the fast pace of X.',
    icon: (
      <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
      </svg>
    ),
    bg: 'bg-[#111]', color: 'text-ink',
  },
  {
    key: 'ig', name: 'Instagram',
    status: 'soon' as const,
    desc: 'Captions, carousels, and Reels copy — tailored for visual-first storytelling.',
    icon: (
      <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
      </svg>
    ),
    bg: 'bg-[#2a0e1a]', color: 'text-[#e1306c]',
  },
  {
    key: 'fb', name: 'Facebook',
    status: 'soon' as const,
    desc: 'Page posts and personal updates — for audiences that live in the Facebook ecosystem.',
    icon: (
      <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
      </svg>
    ),
    bg: 'bg-[#0d1829]', color: 'text-[#4267B2]',
  },
  {
    key: 'th', name: 'Threads',
    status: 'soon' as const,
    desc: 'Short-form text posts for the growing Threads audience connected to Instagram.',
    icon: (
      <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
        <path d="M12.186 24h-.007c-3.581-.024-6.334-1.205-8.184-3.509C2.35 18.44 1.5 15.586 1.472 12.01v-.017c.028-3.579.879-6.43 2.525-8.482C5.845 1.205 8.6.024 12.18 0h.014c2.746.02 5.043.725 6.826 2.098 1.677 1.29 2.858 3.13 3.509 5.467l-2.04.569c-.556-1.96-1.499-3.469-2.806-4.482-1.358-1.057-3.146-1.6-5.453-1.618-3 .02-5.294.982-6.822 2.87-1.5 1.856-2.257 4.38-2.282 7.498.025 3.117.782 5.64 2.282 7.496 1.527 1.888 3.82 2.85 6.822 2.87 1.802-.012 3.386-.309 4.711-.886 1.435-.62 2.493-1.567 3.144-2.813.67-1.276.987-2.954.946-5.001H12.14v-2.049h9.637l.012.56c.088 4.147-.59 7.28-2.053 9.3-1.63 2.248-4.228 3.415-7.55 3.44z"/>
      </svg>
    ),
    bg: 'bg-[#111]', color: 'text-ink',
  },
  {
    key: 'tt', name: 'TikTok',
    status: 'soon' as const,
    desc: 'Script and caption generation for short-form video — brand building at TikTok pace.',
    icon: (
      <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
        <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
      </svg>
    ),
    bg: 'bg-[#110a14]', color: 'text-[#ee1d52]',
  },
  {
    key: 'bs', name: 'Bluesky',
    status: 'soon' as const,
    desc: 'Decentralised social, growing fast — get ahead of it with brand-aware posts.',
    icon: (
      <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
        <path d="M12 10.8c-1.087-2.114-4.046-6.053-6.798-7.995C2.566.944 1.561 1.266.902 1.565.139 1.908 0 3.08 0 3.768c0 .69.378 5.65.624 6.479.815 2.736 3.713 3.66 6.383 3.364.136-.02.275-.039.415-.056-.138.022-.276.04-.415.056-3.912.58-7.387 2.005-2.83 7.078 5.013 5.19 6.87-1.113 7.823-4.308.953 3.195 2.05 9.271 7.733 4.308 4.267-4.308 1.172-6.498-2.74-7.078a8.741 8.741 0 01-.415-.056c.14.017.279.036.415.056 2.67.297 5.568-.628 6.383-3.364.246-.828.624-5.79.624-6.478 0-.69-.139-1.861-.902-2.204-.659-.299-1.664-.62-4.3 1.24C16.046 4.748 13.087 8.687 12 10.8z"/>
      </svg>
    ),
    bg: 'bg-[#0a1422]', color: 'text-[#0085ff]',
  },
]

const STEPS = [
  { num: '01', title: 'Set your brand goal',   desc: 'Tell us who you\'re building toward — thought leader, founder, domain expert. Takes 3 minutes.' },
  { num: '02', title: 'Get your schedule',      desc: 'AI builds a weekly posting cadence tuned to your goal, audience, and platforms.' },
  { num: '03', title: 'Fill your Brand Memory', desc: 'Add a link, article, idea, or screenshot to your inbox. Postless drafts a post from it instantly.' },
  { num: '04', title: 'Review & approve',       desc: 'Add your voice, approve with one click. Nothing goes live without your sign-off.' },
]

const FEATURES = [
  { icon: '◎', title: 'Brand-aware AI',       desc: 'Every draft is written toward your specific brand goal — not generic content that could have come from anyone.' },
  { icon: '▦', title: 'Smart scheduling',     desc: 'Weekly plan auto-generated. You only see what needs your attention, when it needs it.' },
  { icon: '↗', title: 'Brand Memory',         desc: 'Drop in links, articles, ideas, or screenshots — your inbox captures everything. Postless turns it into on-brand posts so nothing is ever wasted.' },
  { icon: '◈', title: 'Human-in-the-loop',    desc: 'You stay in control. Edit, approve, or regenerate before anything is posted. Your name, your sign-off.' },
  { icon: '⊕', title: 'All major platforms',  desc: 'LinkedIn, X, Instagram, Facebook, Threads, TikTok, and Bluesky — one queue for every channel.' },
  { icon: '◐', title: 'Brand progress',       desc: 'Track posting consistency, engagement trends, and momentum toward your brand goal over time.' },
  { icon: '⊞', title: 'Multiple brands',      desc: 'Create and manage separate brands — each with its own content pillars, inbox, and plan. Built for founders, agencies, and creators juggling more than one project.' },
]

const COMPARE_ROWS = [
  { feature: 'Goal-driven content',           pl: '✓', buf: '✗', ai: '✗', diy: '✗' },
  { feature: 'AI drafting',                   pl: '✓', buf: '✗', ai: '✓', diy: '✗' },
  { feature: 'Human review step',             pl: '✓', buf: '✓', ai: '✗', diy: '✓' },
  { feature: 'Keeps your voice',              pl: '✓', buf: '✓', ai: '✗', diy: '✓' },
  { feature: 'Brand Memory inbox',             pl: '✓', buf: '✗', ai: 'Varies', diy: '✗' },
  { feature: 'LinkedIn & X',                  pl: '✓', buf: '✓', ai: '✓',    diy: 'Manual' },
  { feature: 'Instagram & Facebook',          pl: 'Soon', buf: '✓', ai: '✓', diy: 'Manual' },
  { feature: 'Threads, TikTok & Bluesky',     pl: 'Soon', buf: 'Partial', ai: 'Varies', diy: 'Manual' },
  { feature: 'Time cost per week',            pl: '~15 min', buf: 'Still need to write', ai: 'Zero (too automated)', diy: '3–5 hours' },
]

const FAQS = [
  {
    q: 'Does it actually sound like me?',
    a: 'We ask about your tone, audience, and brand goal during onboarding — every draft is written against those settings. You can edit before approving, and the system learns your preferences over time. Nothing posts without your sign-off.',
  },
  {
    q: 'Which platforms does Postless support?',
    a: 'LinkedIn and X at launch. Instagram, Facebook, Threads, TikTok, and Bluesky are actively being built and roll out shortly after. All platforms share the same review-and-approve flow.',
  },
  {
    q: 'How much time does it actually take per week?',
    a: 'Most users spend 10–20 minutes a week reviewing and approving drafts. Onboarding takes about 3 minutes. Dropping in a new article takes under a minute.',
  },
  {
    q: 'How does pricing work?',
    a: 'Postless is subscription-based — no free plan. You start with a ~2-week free trial, then move to a paid plan (Base or Pro). Higher plans unlock more powerful AI models and higher usage limits. Real pricing is announced at launch.',
  },
  {
    q: 'When does Postless launch?',
    a: 'We\'re in active development. Join the waitlist to be among the first in and to lock in the early access deal before we open to the public.',
  },
]

/* ─── Page ──────────────────────────────────────────────────── */
export default function HomePage() {
  return (
    <>
      <Nav />

      <main>
        {/* ── Hero ── */}
        <section id="hero" className="pt-20 pb-24 max-w-content mx-auto px-6">
          <p className="font-mono text-[11px] uppercase tracking-widest text-accent mb-7">
            AI-powered brand building
          </p>
          <h1 className="text-[clamp(32px,5vw,58px)] font-medium leading-[1.08] tracking-[-0.03em] text-ink max-w-[680px] mb-5">
            Your brand grows.<br />
            <em className="not-italic text-accent">Without the posting&nbsp;grind.</em>
          </h1>
          <p className="text-[17px] text-ink-2 leading-[1.65] max-w-[480px] mb-10">
            Set your brand goal once. Postless plans your content, drafts every post,
            and only asks for your sign-off before anything goes&nbsp;live.
            Sign up with Google — up and running in&nbsp;minutes.
          </p>

          {/* Platform icons */}
          <div className="flex flex-wrap items-center gap-4 mb-10" aria-label="Supported platforms">
            {[
              { name: 'LinkedIn',  color: '#4a9eff', bg: '#0a1628', icon: <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg> },
              { name: 'X',         color: '#e8e6e0', bg: '#111111', icon: <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg> },
              { name: 'Instagram', color: '#e1306c', bg: '#2a0e1a', icon: <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg> },
              { name: 'TikTok',    color: '#ee1d52', bg: '#110a14', icon: <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/></svg> },
              { name: 'Facebook',  color: '#4267B2', bg: '#0d1829', icon: <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg> },
              { name: 'Threads',   color: '#e8e6e0', bg: '#111111', icon: <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M12.186 24h-.007c-3.581-.024-6.334-1.205-8.184-3.509C2.35 18.44 1.5 15.586 1.472 12.01v-.017c.028-3.579.879-6.43 2.525-8.482C5.845 1.205 8.6.024 12.18 0h.014c2.746.02 5.043.725 6.826 2.098 1.677 1.29 2.858 3.13 3.509 5.467l-2.04.569c-.556-1.96-1.499-3.469-2.806-4.482-1.358-1.057-3.146-1.6-5.453-1.618-3 .02-5.294.982-6.822 2.87-1.5 1.856-2.257 4.38-2.282 7.498.025 3.117.782 5.64 2.282 7.496 1.527 1.888 3.82 2.85 6.822 2.87 1.802-.012 3.386-.309 4.711-.886 1.435-.62 2.493-1.567 3.144-2.813.67-1.276.987-2.954.946-5.001H12.14v-2.049h9.637l.012.56c.088 4.147-.59 7.28-2.053 9.3-1.63 2.248-4.228 3.415-7.55 3.44z"/></svg> },
              { name: 'Bluesky',   color: '#0085ff', bg: '#0a1422', icon: <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor"><path d="M12 10.8c-1.087-2.114-4.046-6.053-6.798-7.995C2.566.944 1.561 1.266.902 1.565.139 1.908 0 3.08 0 3.768c0 .69.378 5.65.624 6.479.815 2.736 3.713 3.66 6.383 3.364.136-.02.275-.039.415-.056-.138.022-.276.04-.415.056-3.912.58-7.387 2.005-2.83 7.078 5.013 5.19 6.87-1.113 7.823-4.308.953 3.195 2.05 9.271 7.733 4.308 4.267-4.308 1.172-6.498-2.74-7.078a8.741 8.741 0 01-.415-.056c.14.017.279.036.415.056 2.67.297 5.568-.628 6.383-3.364.246-.828.624-5.79.624-6.478 0-.69-.139-1.861-.902-2.204-.659-.299-1.664-.62-4.3 1.24C16.046 4.748 13.087 8.687 12 10.8z"/></svg> },
            ].map((p) => (
              <div
                key={p.name}
                title={p.name}
                className="w-12 h-12 rounded-xl flex items-center justify-center"
                style={{ backgroundColor: p.bg, color: p.color }}
                aria-label={p.name}
              >
                {p.icon}
              </div>
            ))}
          </div>

          <WaitlistForm source="landing_hero" />

          {/* Social proof */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 mt-10 pt-10 border-t border-border">
            <div className="flex" aria-hidden="true">
              {[
                { bg: 'bg-[#1a1f0e]', color: 'text-[#a8cc4a]', label: 'JK' },
                { bg: 'bg-[#0f1a28]', color: 'text-[#4a9eff]', label: 'SR' },
                { bg: 'bg-[#1f1010]', color: 'text-[#cc6a4a]', label: 'ML' },
                { bg: 'bg-[#1a1028]', color: 'text-[#9a6adb]', label: 'TN' },
              ].map((av, i) => (
                <span
                  key={i}
                  className={`w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-medium border-2 border-bg ${av.bg} ${av.color} ${i > 0 ? '-ml-[7px]' : ''}`}
                >
                  {av.label}
                </span>
              ))}
            </div>
            <p className="text-[13px] text-ink-2">
              <strong className="font-medium text-ink">240+ founders</strong> on the early access list
            </p>
          </div>
        </section>

        {/* ── Problem ── */}
        <section id="problem" className="border-t border-border py-24">
          <div className="max-w-content mx-auto px-6">
            <p className="font-mono text-[11px] uppercase tracking-widest text-accent mb-3">The problem</p>
            <h2 className="text-[clamp(24px,3.5vw,38px)] font-medium leading-[1.15] tracking-[-0.025em] text-ink max-w-[600px] mb-4">
              Building a brand on social shouldn't feel like a second job.
            </h2>
            <p className="text-[16px] text-ink-2 max-w-[480px] leading-relaxed mb-14">
              Most professionals know they should be posting consistently. Almost none actually do.
            </p>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-20 gap-y-12" role="list">
              {[
                'You spend 2 hours writing a post and still aren\'t happy with it',
                'You post inconsistently and your audience forgets you exist',
                'Fully automated tools strip out your voice and sound robotic',
                'Scheduling tools just move the problem — you still need to write everything',
                'You have no idea if your posting is actually building toward anything',
                'Interesting articles pile up in your bookmarks, never turned into posts',
              ].map((text, i) => (
                <li key={i} className="flex gap-3.5 items-start">
                  <span className="font-mono text-[13px] text-ink-3 mt-0.5 shrink-0" aria-hidden="true">—</span>
                  <p className="text-[15px] text-ink-2 leading-snug">{text}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ── How it works ── */}
        <section id="how-it-works" className="border-t border-border py-24">
          <div className="max-w-content mx-auto px-6">
            <p className="font-mono text-[11px] uppercase tracking-widest text-accent mb-3">How it works</p>
            <h2 className="text-[clamp(24px,3.5vw,38px)] font-medium leading-[1.15] tracking-[-0.025em] text-ink max-w-[600px] mb-4">
              From brand goal to published post in minutes.
            </h2>
            <p className="text-[16px] text-ink-2 max-w-[480px] leading-relaxed mb-14">
              A four-step loop that keeps your brand growing without monopolising your calendar.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border border-border rounded-[10px] overflow-hidden">
              {STEPS.map((s, i) => (
                <div
                  key={s.num}
                  className={`p-7 ${i < STEPS.length - 1 ? 'border-b lg:border-b-0 lg:border-r border-border' : ''} ${i % 2 === 0 && i < STEPS.length - 1 ? 'sm:border-r border-border' : ''}`}
                >
                  <p className="font-mono text-[11px] text-ink-3 mb-4">{s.num}</p>
                  <p className="text-[15px] font-medium text-ink mb-2">{s.title}</p>
                  <p className="text-[13px] text-ink-2 leading-snug">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── App preview ── */}
        <section id="preview" className="border-t border-border py-24" aria-label="Product preview">
          <div className="max-w-content mx-auto px-6">
            <p className="font-mono text-[11px] uppercase tracking-widest text-accent mb-3">The product</p>
            <h2 className="text-[clamp(24px,3.5vw,38px)] font-medium leading-[1.15] tracking-[-0.025em] text-ink max-w-[600px] mb-4">
              Your review queue. Not a blank page.
            </h2>
            <p className="text-[16px] text-ink-2 max-w-[480px] leading-relaxed mb-14">
              Every morning you open Postless and see drafts ready for your sign-off — not a cursor blinking at you.
            </p>

            <div
              className="border border-border rounded-[10px] overflow-hidden bg-bg-1"
              role="img"
              aria-label="Postless app interface showing a review queue with two AI-drafted posts"
            >
              {/* Chrome bar */}
              <div className="flex items-center gap-2 px-4 py-3 bg-bg-2 border-b border-border">
                <span className="w-2.5 h-2.5 rounded-full bg-border-l" />
                <span className="w-2.5 h-2.5 rounded-full bg-border-l" />
                <span className="w-2.5 h-2.5 rounded-full bg-border-l" />
                <span className="flex-1 font-mono text-[11px] text-ink-3 bg-bg-1 border border-border rounded px-2.5 py-1 text-center max-w-[200px] mx-auto">
                  app.postless.app/review
                </span>
              </div>
              {/* App body */}
              <div className="flex flex-col sm:flex-row min-h-[260px]">
                {/* Sidebar */}
                <div className="sm:w-44 shrink-0 border-b sm:border-b-0 sm:border-r border-border p-4">
                  <p className="font-mono text-[10px] text-ink-3 uppercase tracking-wider mb-2">Workspace</p>
                  {['Review queue', 'Schedule', 'Analytics'].map((item, i) => (
                    <div key={item} className={`flex items-center gap-2 px-2 py-1.5 rounded text-[12px] mb-0.5 ${i === 0 ? 'bg-[#1a1f0e] text-accent' : 'text-ink-2'}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${i === 0 ? 'bg-accent' : 'bg-ink-3'}`} />
                      {item}
                    </div>
                  ))}
                  <p className="font-mono text-[10px] text-ink-3 uppercase tracking-wider mb-2 mt-4">Brand</p>
                  {['Brand goal', 'Connections'].map((item) => (
                    <div key={item} className="flex items-center gap-2 px-2 py-1.5 rounded text-[12px] text-ink-2 mb-0.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-ink-3" />
                      {item}
                    </div>
                  ))}
                </div>
                {/* Main */}
                <div className="flex-1 p-5">
                  <p className="font-mono text-[10px] text-ink-3 uppercase tracking-wider mb-4">3 posts awaiting approval</p>
                  {[
                    { tag: 'LinkedIn', tagClass: 'bg-[#0a1628] text-[#4a9eff] border border-[#1a3050]', time: '2 min ago', body: "Most founders I know are obsessed with their product. The best ones are equally obsessed with how the world perceives them. Here's what I've learned about building in public…" },
                    { tag: 'X / Twitter', tagClass: 'bg-[#111] text-ink-2 border border-border', time: '8 min ago', body: 'Consistency beats virality. 3 posts a week for 6 months will do more for your brand than one viral tweet.' },
                  ].map((card) => (
                    <div key={card.tag} className="border border-border rounded p-4 mb-2.5 bg-bg-2">
                      <div className="flex items-center justify-between mb-2.5">
                        <span className={`font-mono text-[10px] font-medium px-2 py-0.5 rounded-sm ${card.tagClass}`}>{card.tag}</span>
                        <span className="font-mono text-[10px] text-ink-3">AI drafted · {card.time}</span>
                      </div>
                      <p className="text-[13px] text-ink-2 leading-snug mb-3">{card.body}</p>
                      <div className="flex gap-1.5">
                        <button className="text-[11px] px-3 py-1 rounded bg-accent text-bg font-medium border-0">Approve</button>
                        <button className="text-[11px] px-3 py-1 rounded border border-border text-ink-2 bg-transparent">Edit</button>
                        <button className="text-[11px] px-3 py-1 rounded border border-border text-ink-2 bg-transparent">Regenerate</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Platforms ── */}
        <section id="platforms" className="border-t border-border py-24">
          <div className="max-w-content mx-auto px-6">
            <p className="font-mono text-[11px] uppercase tracking-widest text-accent mb-3">Platforms</p>
            <h2 className="text-[clamp(24px,3.5vw,38px)] font-medium leading-[1.15] tracking-[-0.025em] text-ink max-w-[600px] mb-4">
              Every platform. One review queue.
            </h2>
            <p className="text-[16px] text-ink-2 max-w-[480px] leading-relaxed mb-14">
              Postless publishes to all the major networks — you manage everything from one place, with a single sign-off flow.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-px bg-border border border-border rounded-[10px] overflow-hidden">
              {PLATFORMS.map((p) => (
                <div key={p.key} className="bg-bg p-6">
                  <div className={`w-10 h-10 rounded flex items-center justify-center mb-3 ${p.bg} ${p.color}`}>
                    {p.icon}
                  </div>
                  <p className="text-[14px] font-medium text-ink mb-1.5">{p.name}</p>
                  <span className={`inline-block font-mono text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-sm mb-2.5 ${
                    p.status === 'launch'
                      ? 'bg-[#1a1f0e] text-accent border border-[#2a3a10]'
                      : 'bg-bg-2 text-ink-3 border border-border'
                  }`}>
                    {p.status === 'launch' ? 'At launch' : 'Coming soon'}
                  </span>
                  <p className="text-[12px] text-ink-2 leading-snug">{p.desc}</p>
                </div>
              ))}
            </div>

            <p className="mt-6 text-[13px] text-ink-3 text-center font-mono">
              All platforms follow the same flow — AI drafts, you review, you approve.
            </p>
          </div>
        </section>

        {/* ── Features ── */}
        <section id="features" className="border-t border-border py-24">
          <div className="max-w-content mx-auto px-6">
            <p className="font-mono text-[11px] uppercase tracking-widest text-accent mb-3">Features</p>
            <h2 className="text-[clamp(24px,3.5vw,38px)] font-medium leading-[1.15] tracking-[-0.025em] text-ink max-w-[600px] mb-4">
              Everything you need. Nothing you don't.
            </h2>
            <p className="text-[16px] text-ink-2 max-w-[480px] leading-relaxed mb-14">
              Built for professionals who want brand growth without the content treadmill.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-border border border-border rounded-[10px] overflow-hidden">
              {FEATURES.map((f) => (
                <div key={f.title} className="bg-bg p-7">
                  <p className="text-[18px] text-ink-3 mb-3.5" aria-hidden="true">{f.icon}</p>
                  <p className="text-[15px] font-medium text-ink mb-1.5">{f.title}</p>
                  <p className="text-[13px] text-ink-2 leading-snug">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Compare ── */}
        <section id="compare" className="border-t border-border py-24">
          <div className="max-w-content mx-auto px-6">
            <p className="font-mono text-[11px] uppercase tracking-widest text-accent mb-3">Compare</p>
            <h2 className="text-[clamp(24px,3.5vw,38px)] font-medium leading-[1.15] tracking-[-0.025em] text-ink max-w-[600px] mb-4">
              A simpler alternative to doing it manually.
            </h2>
            <p className="text-[16px] text-ink-2 max-w-[480px] leading-relaxed mb-14">
              Postless sits between "write everything yourself" and "fully automate and lose your voice."
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-[14px] border-collapse">
                <thead>
                  <tr>
                    {['Feature', 'Postless', 'Buffer / Hootsuite', 'Full AI automation', 'DIY'].map((h, i) => (
                      <th
                        key={h}
                        className={`px-5 py-3 text-left text-[13px] font-medium border-b border-border ${i === 1 ? 'text-accent' : 'text-ink-2'}`}
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {COMPARE_ROWS.map((row) => (
                    <tr key={row.feature}>
                      <td className="px-5 py-3 border-b border-border text-ink text-[14px]">{row.feature}</td>
                      <td className={`px-5 py-3 border-b border-border font-medium text-[13px] ${row.pl === '✓' ? 'text-accent' : 'text-accent'}`}>{row.pl}</td>
                      <td className={`px-5 py-3 border-b border-border text-[13px] ${row.buf === '✓' ? 'text-accent' : 'text-ink-3'}`}>{row.buf}</td>
                      <td className={`px-5 py-3 border-b border-border text-[13px] ${row.ai === '✓' ? 'text-accent' : 'text-ink-3'}`}>{row.ai}</td>
                      <td className={`px-5 py-3 border-b border-border text-[13px] ${row.diy === '✓' ? 'text-accent' : 'text-ink-3'}`}>{row.diy}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section id="faq" className="border-t border-border py-24">
          <div className="max-w-content mx-auto px-6">
            <p className="font-mono text-[11px] uppercase tracking-widest text-accent mb-3">FAQ</p>
            <h2 className="text-[clamp(24px,3.5vw,38px)] font-medium leading-[1.15] tracking-[-0.025em] text-ink max-w-[600px] mb-14">
              Frequently asked questions.
            </h2>
            <div className="border-t border-border">
              {FAQS.map((faq) => (
                <FaqItem key={faq.q} q={faq.q} a={faq.a} />
              ))}
            </div>
          </div>
        </section>

        {/* ── Bottom CTA / Waitlist ── */}
        <section id="waitlist" className="border-t border-border py-24 text-center">
          <div className="max-w-content mx-auto px-6">
            <p className="font-mono text-[11px] uppercase tracking-widest text-accent mb-3">Early access</p>
            <h2 className="text-[clamp(24px,3.5vw,38px)] font-medium leading-[1.15] tracking-[-0.025em] text-ink mb-4 max-w-none">
              Ready to stop staring at a blank page?
            </h2>
            <p className="text-[16px] text-ink-2 max-w-[400px] mx-auto leading-relaxed mb-8">
              Join the waitlist for early access. When we launch, waitlist members
              get first in — and an extended free trial before any card is needed.
            </p>
            <WaitlistForm source="landing_cta" center />
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}

/* ── FAQ accordion (client island) ── */
import FaqItem from '../components/FaqItem'
