import path from 'path';
import type { IncomingMessage, ServerResponse } from 'http';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

const GEMINI_URL =
  'https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '');
  return {
    server: {
      port: 3000,
      host: '0.0.0.0',
    },
    define: {
      'process.env.__BUILD_TIME__': JSON.stringify(new Date().toLocaleString()),

    },
    plugins: [
      react(),
      {
        name: 'chat-proxy',
        configureServer(server) {
          server.middlewares.use(
            '/api/chat',
            (req: IncomingMessage, res: ServerResponse) => {
              const chunks: Buffer[] = [];
              req.on('data', (c: Buffer) => chunks.push(c));
              req.on('end', async () => {
                try {
                  const body = JSON.parse(Buffer.concat(chunks).toString());
                  const geminiRes = await fetch(GEMINI_URL, {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                      'X-Goog-Api-Key': env.GEMINI_API_KEY,
                    },
                    body: JSON.stringify(body),
                  });
                  const data = await geminiRes.json() as Record<string, unknown>;
                  res.statusCode = geminiRes.status;
                  res.setHeader('Content-Type', 'application/json');
                  if (!geminiRes.ok) {
                    res.end(JSON.stringify(data));
                    return;
                  }
                  const candidates = data.candidates as Array<{ content: { parts: Array<{ text: string }> } }> | undefined;
                  const text = candidates?.[0]?.content?.parts?.[0]?.text ?? '';
                  res.end(JSON.stringify({ text }));
                } catch (err) {
                  res.statusCode = 500;
                  res.end(JSON.stringify({ error: String(err) }));
                }
              });
            }
          );
        },
      },
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
  };
});
