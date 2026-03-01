import { onRequest } from 'firebase-functions/v2/https';
import { FAQ_ITEMS } from './faq';


const GEMINI_URL =
  'https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent';

const REDIRECT_SIGNAL = 'REDIRECT_TO_WHATSAPP';


const SYSTEM_PROMPT = `You are a friendly and helpful assistant for Sandpiper Middle School in Redwood City, CA. You help parents find quick answers about the school.

Here is the school FAQ you should draw from:

${FAQ_ITEMS.map((item) => `Q: ${item.question}\nA: ${item.answer}`).join('\n\n')}

Rules:
1. Answer questions using the FAQ above, well-known facts about the school (address, phone), or information from the Belmont-Redwood Shores School District website at https://www.brssd.org/. You may use Google Search to look up current information from brssd.org when the FAQ does not cover the topic.
2. If you cannot find a relevant answer even after considering brssd.org, respond with exactly the word: ${REDIRECT_SIGNAL}
3. If the parent asks to speak to a person, a parent ambassador, or a human, please softly respond with ${REDIRECT_SIGNAL}
4. Visitors can ask about anything in any language, you can reply in the same language.
5. Otherwise, keep answers concise, warm, and helpful. Do not invent information not found in the FAQ, https://sandpipermiddle.org, or https://www.brssd.org/`;

export const chat = onRequest(
  {
    region: 'us-west1',
    secrets: ['GEMINI_API_KEY'],
    cors: true,
  },
  async (req, res) => {
    if (req.method === 'GET') {
      res.json({ ok: true });
      return;
    }

    if (req.method !== 'POST') {
      res.status(405).send('Method Not Allowed');
      return;
    }

    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      res.status(500).json({ error: 'API key not configured' });
      return;
    }

    // Only accept conversation history from the client.
    // All other parameters (system prompt, tools, config) are server-controlled
    // to prevent API key abuse.
    const { contents } = req.body as { contents: unknown };
    if (!Array.isArray(contents)) {
      res.status(400).json({ error: 'Invalid request: contents must be an array' });
      return;
    }

    try {
      const geminiRes = await fetch(GEMINI_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Goog-Api-Key': apiKey,
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
        res.status(geminiRes.status).json(data);
        return;
      }

      const candidate = data.candidates?.[0];
      const finishReason = candidate?.finishReason;

      let responseText = '';

      // 检查停止原因
      if (!candidate) {
        // 如果根本没有候选答案（极少数情况，通常与安全过滤有关）
        responseText = REDIRECT_SIGNAL;
      } else if (finishReason === 'SAFETY' || finishReason === 'RECITATION') {
        // 如果是因为安全或版权原因被拦截，返回重定向信号
        responseText = REDIRECT_SIGNAL;
      } else {
        // 正常尝试提取文本：拼接所有 part，并去除首尾空白
        const textContent = candidate.content?.parts?.map((p: { text?: string }) => p.text || '').join('').trim();
        responseText = textContent || REDIRECT_SIGNAL;
      }

      res.json({ text: responseText });
    } catch (err) {
      res.status(500).json({ error: String(err) });
    }
  },
);
