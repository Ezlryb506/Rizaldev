import { NextResponse } from 'next/server';
export const runtime = 'nodejs';
import { Resend } from 'resend';
import { z } from 'zod';
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

const contactSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  company: z.string().optional().default(''),
  budget: z.string().optional().default(''),
  timeline: z.string().optional().default(''),
  message: z.string().min(10),
});

const resend = new Resend(process.env.RESEND_API_KEY);

// Upstash Redis Ratelimit (optional, enabled when env exists)
const redis = process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN
  ? new Redis({
      url: process.env.UPSTASH_REDIS_REST_URL,
      token: process.env.UPSTASH_REDIS_REST_TOKEN,
    })
  : null;

const ratelimit = redis
  ? new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(3, '360 s'),
      analytics: true,
    })
  : null;

export async function POST(req: Request) {
  try {
    // Rate limit per IP (if Upstash configured)
    const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim()
      || req.headers.get('x-real-ip')
      || 'ip:unknown';
    if (ratelimit) {
      const { success } = await ratelimit.limit(`contact:${ip}`);
      if (!success) {
        return NextResponse.json(
          { ok: false, error: 'Too many requests', detail: 'Please wait before sending another message.' },
          { status: 429 }
        );
      }
    }

    const json = await req.json();
    const parsed = contactSchema.safeParse(json);
    if (!parsed.success) {
      return NextResponse.json({ ok: false, error: 'Invalid payload', issues: parsed.error.flatten() }, { status: 400 });
    }

    const { name, email, company, budget, timeline, message } = parsed.data;

    // Basic required env validation
    const FROM = process.env.EMAIL_FROM;
    const TO = process.env.EMAIL_TO;
    if (!process.env.RESEND_API_KEY || !FROM || !TO) {
      return NextResponse.json({ ok: false, error: 'Email service is not configured properly.' }, { status: 500 });
    }

    // Build a minimal but readable HTML email
    const subject = `[Portfolio] New message from ${name}`;
    const html = `
      <div style="font-family: Inter,Segoe UI,Roboto,Arial,sans-serif; line-height:1.6; color:#111">
        <h2 style="margin:0 0 12px 0;">New Contact Message</h2>
        <p style="margin:0 0 8px 0;"><strong>Name:</strong> ${name}</p>
        <p style="margin:0 0 8px 0;"><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
        ${company ? `<p style=\"margin:0 0 8px 0;\"><strong>Company:</strong> ${company}</p>` : ''}
        ${budget ? `<p style=\"margin:0 0 8px 0;\"><strong>Budget:</strong> ${budget}</p>` : ''}
        ${timeline ? `<p style=\"margin:0 0 8px 0;\"><strong>Timeline:</strong> ${timeline}</p>` : ''}
        <p style="margin:16px 0 8px 0;"><strong>Message:</strong></p>
        <div style="white-space:pre-wrap; border:1px solid #eee; padding:12px; border-radius:8px; background:#fafafa;">${message}</div>
      </div>
    `;

    const sendResult = await resend.emails.send({
      from: FROM,
      to: TO,
      replyTo: email,
      subject,
      html,
    });

    const errVal = (sendResult as { error?: unknown }).error;
    if (errVal) {
      let msg = 'Failed to send email';
      if (typeof errVal === 'string') {
        msg = errVal;
      } else if (typeof errVal === 'object' && errVal !== null) {
        const maybe = errVal as { message?: unknown };
        if (typeof maybe.message === 'string') msg = maybe.message;
      }
      return NextResponse.json({ ok: false, error: 'Failed to send email', detail: msg }, { status: 502 });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'Unexpected server error';
    return NextResponse.json({ ok: false, error: 'Unexpected server error', detail: msg }, { status: 500 });
  }
}
