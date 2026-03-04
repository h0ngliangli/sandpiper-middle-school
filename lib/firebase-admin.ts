import {
  initializeApp,
  getApps,
  cert,
  type App,
  type ServiceAccount,
} from 'firebase-admin/app';
import serviceAccount from '../firebase-admin-key.json';

export function initAdmin(): App {
  if (getApps().length > 0) {
    return getApps()[0];
  }

  try {
    return initializeApp({
      credential: cert(serviceAccount as ServiceAccount),
    });
  } catch (error) {
    console.error('Error parsing FIREBASE_SERVICE_ACCOUNT_KEY:', error);
    // Fallback or let it throw if key is invalid
  }

  // Fallback for environments where Google Cloud default credentials work
  // or if FIREBASE_SERVICE_ACCOUNT_KEY is not set (e.g. dev without key)
  return initializeApp();
}
