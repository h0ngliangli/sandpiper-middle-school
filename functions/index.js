const { onRequest } = require('firebase-functions/v2/https');

const GEMINI_URL =
  'https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent';

exports.chat = onRequest(
  {
    region: 'us-west1',
    secrets: ['GEMINI_API_KEY'],
    cors: true,
  },
  async (req, res) => {
    if (req.method !== 'POST') {
      res.status(405).send('Method Not Allowed');
      return;
    }

    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      res.status(500).json({ error: 'API key not configured' });
      return;
    }

    try {
      const geminiRes = await fetch(GEMINI_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Goog-Api-Key': apiKey,
        },
        body: JSON.stringify(req.body),
      });

      const data = await geminiRes.json();
      if (!geminiRes.ok) {
        res.status(geminiRes.status).json(data);
        return;
      }

      const text = data.candidates?.[0]?.content?.parts?.[0]?.text ?? '';
      res.json({ text });
    } catch (err) {
      res.status(500).json({ error: String(err) });
    }
  },
);
