import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

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
    },
    plugins: [react()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
  };
});
