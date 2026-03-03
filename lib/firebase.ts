import { initializeApp } from 'firebase/app';
import { AppCheck, ReCaptchaV3Provider, initializeAppCheck } from 'firebase/app-check';

// Initialize Firebase App with your config.
// You can find this in your Firebase project settings.
// With app, you can use any Firebase service, e.g. Firestore, Auth, etc.
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);

// Initialize App Check with reCAPTCHA v3.
// reCAPTCHA v3 does not require user interaction and provides a score to
// determine if the request is legitimate.
// NEXT_PUBLIC_RECAPTCHA_SITE_KEY should be set in your .env file.
// You can get this key from the Google reCAPTCHA admin console.
let appCheck: AppCheck | null = null;
if (typeof window !== 'undefined') {
  // To use App Check in development environments, create a debug token
  // and add it to the App Check. This code will display in the console.
  // See
  // https://firebase.google.com/docs/app-check/web/debug-provider for more details.
  if (location.hostname === 'localhost') {
    (self as any).FIREBASE_APPCHECK_DEBUG_TOKEN = true;
  }
  const recaptchaSiteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
  if (recaptchaSiteKey) {
    appCheck = initializeAppCheck(app, {
      provider: new ReCaptchaV3Provider(recaptchaSiteKey),
      isTokenAutoRefreshEnabled: true,
    });
  }
}
export default app;
export { appCheck };
