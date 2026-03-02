/// <reference types="vite/client" />
import { initializeApp } from 'firebase/app';
import { AppCheck, ReCaptchaV3Provider, initializeAppCheck } from 'firebase/app-check';

// Initialize Firebase App with your config. 
// You can find this in your Firebase project settings.
// With app, you can use any Firebase service, e.g. Firestore, Auth, etc.
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);

// Initialize App Check with reCAPTCHA v3.
// reCAPTCHA v3 does not require user interaction and provides a score to 
// determine if the request is legitimate.
// VITE_RECAPTCHA_SITE_KEY should be set in your .env file. 
// You can get this key from the Google reCAPTCHA admin console.
const recaptchaSiteKey = import.meta.env.VITE_RECAPTCHA_SITE_KEY;
let appCheck: AppCheck | null = null;
if (location.hostname === 'localhost') {
  // To use App Check in development environments, create a debug token
  // and add it to the App Check. This code will display in the console.
  // See 
  // https://firebase.google.com/docs/app-check/web/debug-provider for more details.
  (self as any).FIREBASE_APPCHECK_DEBUG_TOKEN = true;
}
if (recaptchaSiteKey) {
  appCheck = initializeAppCheck(app, {
    provider: new ReCaptchaV3Provider(recaptchaSiteKey),
    isTokenAutoRefreshEnabled: true,
  });
}
export default app;
export { appCheck };