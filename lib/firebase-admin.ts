import { initializeApp, getApps, cert, type App, type ServiceAccount } from 'firebase-admin/app';
import { readFileSync, existsSync } from 'fs';
import { join } from 'path';

export function initAdmin(): App {
  if (getApps().length > 0) {
    return getApps()[0];
  }

  // Only load the explicit service account key in development (local).
  // In production (App Hosting), we rely on automatic Application Default Credentials.
  if (process.env.NODE_ENV === 'development') {
    const serviceAccountPath = join(process.cwd(), 'firebase-admin-key.json');
    if (existsSync(serviceAccountPath)) {
      try {
        const serviceAccount = JSON.parse(
          readFileSync(serviceAccountPath, 'utf8')
        ) as ServiceAccount;
        return initializeApp({
          credential: cert(serviceAccount)
        });
      } catch (error) {
        console.error('Error reading/parsing firebase-admin-key.json:', error);
      }
    }
  }

  // Fallback for production or if no key is provided
  return initializeApp();
}
