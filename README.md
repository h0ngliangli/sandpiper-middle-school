# Sandpiper Middle School Website

## Prerequisites

1. Install dependencies:
   `npm install`
2. Install Firebase CLI globally if you haven't:
   `npm install -g firebase-tools`
3. Create Firebase projects for staging and production (or use existing ones), then make sure your aliases in `.firebaserc` map correctly:
   - `staging` -> `sandpipermiddle-staging`
   - `production` -> `sandpipermiddle`
4. Config App Check in Firebase Console.
5. Create Gemini API key in Google AI Studio.
6. Create reCAPTCHA v3 keys in Google reCAPTCHA admin console. Add domains.
7. Add the secret key to Firebase Console > App Check > Apps > Your App > reCAPTCHA v3 configuration.
8. Config the following environment variables in App Hosting > Environment Variables in Firebase Console for both staging and production:
   - GEMINI_API_KEY
   - NEXT_PUBLIC_FIREBASE_API_KEY
   - NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN
   - NEXT_PUBLIC_FIREBASE_PROJECT_ID
   - NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET
   - NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID
   - NEXT_PUBLIC_FIREBASE_APP_ID
   - NEXT_PUBLIC_RECAPTCHA_SITE_KEY

## Run Locally
- set the following environment variables in `.env.local`:
  - GEMINI_API_KEY
  - NEXT_PUBLIC_FIREBASE_API_KEY
  - NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN
  - NEXT_PUBLIC_FIREBASE_PROJECT_ID
  - NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET
  - NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID
  - NEXT_PUBLIC_FIREBASE_APP_ID
  - NEXT_PUBLIC_RECAPTCHA_SITE_KEY
- download the service account key from Firebase Console for the staging project
  and save it as `firebase-admin-key.json` in the root directory of the project
- notice the output of App Check debug token in the terminal and add it to the 
  Firebase Console > App Check > Debug tokens
- open a new terminal and run `npm run dev`
