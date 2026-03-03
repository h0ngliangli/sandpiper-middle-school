import type { NextConfig } from 'next';
import { execSync } from 'child_process';

function getCommitHash(): string {
  try {
    return execSync('git rev-parse --short HEAD').toString().trim();
  } catch {
    return 'dev';
  }
}

const isDev = process.env.NODE_ENV === 'development';

const nextConfig: NextConfig = {
  output: 'standalone',
  env: {
    BUILD_TIME: new Date().toLocaleString(),
    COMMIT_HASH: process.env.VERCEL_GITHUB_COMMIT_SHA ?? getCommitHash(),
  },
  ...(isDev && {
    async rewrites() {
      return [
        {
          source: '/api/chat',
          destination: 'http://127.0.0.1:5001/sandpipermiddle-staging/us-west1/chat',
        },
      ];
    },
  }),
};

export default nextConfig;
