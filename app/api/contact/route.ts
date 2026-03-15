import { NextResponse } from 'next/server';
import { getAppCheck } from 'firebase-admin/app-check';
import { initAdmin } from '@/lib/firebase-admin';
import { Resend } from 'resend';

initAdmin();

const resend = new Resend(process.env.RESEND_API_KEY);

const TO_EMAIL = 'sandpiper.middle.parents@gmail.com';
// const FROM_EMAIL = 'onboarding@resend.dev';
const FROM_EMAIL = 'send@sandpipermiddle.org';

export async function POST(req: Request) {
  // App Check verification
  const appCheckToken = req.headers.get('X-Firebase-AppCheck');
  if (!appCheckToken) {
    if (process.env.NODE_ENV !== 'development') {
      return NextResponse.json({ error: 'X-Firebase-AppCheck header missing' }, { status: 401 });
    }
  } else {
    try {
      await getAppCheck().verifyToken(appCheckToken);
    } catch {
      return NextResponse.json({ error: 'X-Firebase-AppCheck token failed' }, { status: 401 });
    }
  }

  let body: {
    name?: string;
    email?: string;
    message?: string;
    childName?: string;
    childGrade?: string;
    childSchool?: string;
  };

  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  const { name, email, message, childName, childGrade, childSchool } = body;

  // Validate required fields
  if (!name || typeof name !== 'string' || name.trim().length === 0) {
    return NextResponse.json({ error: 'Name is required' }, { status: 400 });
  }
  if (!email || typeof email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: 'Valid email is required' }, { status: 400 });
  }
  if (!message || typeof message !== 'string' || message.trim().length === 0) {
    return NextResponse.json({ error: 'Message is required' }, { status: 400 });
  }
  if (name.length > 100 || email.length > 200 || message.length > 2000) {
    return NextResponse.json({ error: 'Input too long' }, { status: 400 });
  }

  const optionalLines = [
    childName ? `Child's Name: ${childName.trim()}` : null,
    childGrade ? `Grade: ${childGrade.trim()}` : null,
    childSchool ? `School: ${childSchool.trim()}` : null,
  ].filter(Boolean);

  const emailText = [
    `From: ${name.trim()} <${email.trim()}>`,
    ...optionalLines,
    '',
    message.trim(),
  ].join('\n');

  const emailHtml = `
    <p><strong>From:</strong> ${escHtml(name.trim())} &lt;${escHtml(email.trim())}&gt;</p>
    ${childName ? `<p><strong>Child's Name:</strong> ${escHtml(childName.trim())}</p>` : ''}
    ${childGrade ? `<p><strong>Grade:</strong> ${escHtml(childGrade.trim())}</p>` : ''}
    ${childSchool ? `<p><strong>School:</strong> ${escHtml(childSchool.trim())}</p>` : ''}
    <hr />
    <p>${escHtml(message.trim()).replace(/\n/g, '<br />')}</p>
  `;

  try {
    const { error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: TO_EMAIL,
      replyTo: email.trim(),
      subject: `Message from ${name.trim()} via Sandpiper Website`,
      text: emailText,
      html: emailHtml,
    });

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('Contact API error:', err);
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
  }
}

function escHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
