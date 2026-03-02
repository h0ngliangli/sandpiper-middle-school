import path from 'path';
import { execSync } from 'child_process';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

function getCommitHash(): string {
  try {
    return execSync('git rev-parse --short HEAD').toString().trim();
  } catch {
    return 'dev';
  }
}

export default defineConfig(() => {
  return {
    server: {
      port: 3000,
      host: '0.0.0.0',
      proxy: {
        '/api/chat': {
          target: 'http://127.0.0.1:5001',
          rewrite: (path) => path.replace(/^\/api\/chat/, '/sandpipermiddle-staging/us-west1/chat'),
        },
      },
    },
    define: {
      'process.env.__BUILD_TIME__': JSON.stringify(new Date().toLocaleString()),
      // get the latest commit hash from env variable set by Vercel, or fallback to 'dev' for local development
      'process.env.__COMMIT_HASH__': JSON.stringify(process.env.VERCEL_GITHUB_COMMIT_SHA || getCommitHash()),
    },
    plugins: [react()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
  };
});
