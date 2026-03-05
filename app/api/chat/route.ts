import { NextResponse } from 'next/server';
import { getAppCheck } from 'firebase-admin/app-check';
import { initAdmin } from '@/lib/firebase-admin';
import { FAQ_ITEMS } from '@/lib/faq';

// Initialize Firebase Admin
initAdmin();

const GEMINI_URL =
  'https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent';

const REDIRECT_SIGNAL = 'REDIRECT_TO_WHATSAPP';

const SYSTEM_PROMPT = `You are a friendly and helpful assistant for Sandpiper Middle School in Redwood City, CA. You help parents find quick answers about the school.

Here is the school FAQ you should draw from:

${FAQ_ITEMS.map((item) => `Q: ${item.question}\nA: ${item.answer}`).join('\n\n')}

Rules:
1. Answer questions if the answer can be found in the FAQ.
2. If the FAQ does not cover the topic, you may use Google Search to look for information from the School District website at 
   https://www.brssd.org/ or https://sandpipermiddle.org.
3. The reply should be text only. You can use markdown for formatting.
4. If the FAQ does not cover the topic and you can't find it via search, respond with exactly the word: ${REDIRECT_SIGNAL}
5. If the parent asks to speak to a person or a parent ambassador, please softly respond with ${REDIRECT_SIGNAL}
6. Visitors can ask about anything in any language, you can reply in the same language.
7. Otherwise, keep answers concise, warm, and helpful. Do not invent information not found in the FAQ or from the Google Search results.`;

export async function GET() {
  return NextResponse.json({ ok: true });
}

export async function POST(req: Request) {
  // Verify App Check token
  const appCheckToken = req.headers.get('X-Firebase-AppCheck');
  
  if (!appCheckToken) {
    // In development mode, you might want to skip this check or use a debug token
    // For now, we enforce it as in the original function
    if (process.env.NODE_ENV !== 'development') {
        console.error('App Check token missing');
        return NextResponse.json({ error: 'X-Firebase-AppCheck header missing' }, { status: 401 });
    }
  } else {
    try {
        await getAppCheck().verifyToken(appCheckToken);
    } catch (error) {
        console.error('App Check token verification failed:', error);
        return NextResponse.json({ error: 'X-Firebase-AppCheck token failed' }, { status: 401 });
    }
  }

  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    console.error('GEMINI_API_KEY not configured');
    return NextResponse.json({ error: 'API key not configured' }, { status: 500 });
  }

  try {
    const body = await req.json();
    const { contents } = body;

    if (!Array.isArray(contents)) {
      return NextResponse.json({ error: 'Invalid request: contents must be an array' }, { status: 400 });
    }

    const geminiRes = await fetch(`${GEMINI_URL}?key=${apiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        system_instruction: { parts: [{ text: SYSTEM_PROMPT }] },
        contents: contents,
        tools: [{ googleSearch: {} }],
        generationConfig: { temperature: 0.2, maxOutputTokens: 512 },
      }),
    });

    const data = await geminiRes.json();
    
    if (!geminiRes.ok) {
      console.error('Gemini API error:', data);
      return NextResponse.json(data, { status: geminiRes.status });
    }

    const candidate = data.candidates?.[0];
    const finishReason = candidate?.finishReason;

    let responseText = '';

    // Check stop reason
    if (!candidate) {
      responseText = REDIRECT_SIGNAL;
    } else if (finishReason === 'SAFETY' || finishReason === 'RECITATION') {
      responseText = REDIRECT_SIGNAL;
    } else {
      const textContent = candidate.content?.parts?.map((p: { text?: string }) => p.text || '').join('').trim();
      responseText = textContent || REDIRECT_SIGNAL;
    }

    return NextResponse.json({ text: responseText });

  } catch (err) {
    console.error('Error processing request:', err);
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
