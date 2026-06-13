import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

export const runtime = 'edge'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export async function POST(req: NextRequest) {
  try {
    const body  = await req.json()
    const email = (body.email ?? '').trim().toLowerCase()

    if (!email || !EMAIL_RE.test(email) || email.length > 254) {
      return NextResponse.json(
        { error: 'Please enter a valid email address.' },
        { status: 400 }
      )
    }

    const resend = new Resend(process.env.RESEND_API_KEY)

    await resend.contacts.create({
      email,
      audienceId:   process.env.RESEND_AUDIENCE_ID!,
      unsubscribed: false,
    })

    await resend.emails.send({
      from:    'Postless <hello@postless.app>',
      to:      email,
      subject: "You're on the Postless waitlist 🎉",
      html: `
        <div style="font-family:sans-serif;max-width:520px;margin:0 auto;padding:40px 24px;background:#0a0a0a;color:#e8e6e0;">
          <p style="font-family:monospace;font-size:13px;color:#d4ff70;letter-spacing:0.08em;text-transform:uppercase;margin-bottom:24px;">postless.app</p>
          <h1 style="font-size:24px;font-weight:500;color:#e8e6e0;line-height:1.2;margin-bottom:16px;">You're on the list.</h1>
          <p style="font-size:15px;color:#888882;line-height:1.6;margin-bottom:16px;">
            Thanks for joining the Postless waitlist. When we launch you'll be first in,
            with an extended free trial before any card is needed.
          </p>
          <p style="font-size:13px;color:#555550;">— The Postless team</p>
          <hr style="border:none;border-top:1px solid #252525;margin:32px 0;" />
          <p style="font-size:11px;color:#555550;">
            You signed up at postless.app.
            <a href="{{unsubscribe_url}}" style="color:#555550;">Unsubscribe</a>
          </p>
        </div>
      `,
    })

    return NextResponse.json({ ok: true })

  } catch (err: unknown) {
    if (
      err instanceof Error &&
      (err.message.includes('already exists') || err.message.includes('duplicate'))
    ) {
      return NextResponse.json({ ok: true, already: true })
    }
    console.error('[waitlist]', err)
    return NextResponse.json(
      { error: 'Something went wrong. Please try again.' },
      { status: 500 }
    )
  }
}

export function GET() {
  return NextResponse.json({ error: 'Method not allowed' }, { status: 405 })
}
