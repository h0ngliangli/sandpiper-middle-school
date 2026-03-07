# Sandpiper Middle School Website

## Local Development Environment Setup

1. Install dependencies:
   `npm install`

2. set the following environment variables in `.env.local`:
  - GEMINI_API_KEY
  - NEXT_PUBLIC_FIREBASE_API_KEY
  - NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN
  - NEXT_PUBLIC_FIREBASE_PROJECT_ID
  - NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET
  - NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID
  - NEXT_PUBLIC_FIREBASE_APP_ID
  - NEXT_PUBLIC_RECAPTCHA_SITE_KEY
  - NEXT_PUBLIC_GOOGLE_SHEET_ID (see SHEETS_SETUP.md for instructions)

3. download the service account key from Firebase Console for the staging project
  and save it as `firebase-admin-key.json` in the root directory of the project

4. notice the output of App Check debug token in the terminal and add it to the 
  Firebase Console > App Check > Debug tokens

5. open a new terminal and run `npm run dev`

6. If this is the first time setting up, a debug reCAPTCHA v3 key will be printed in the terminal. Copy the key and add it to
   Firebase Console > App Check > Apps > Open Menu (3 dots) > Manage debug tokens.


## Cloud Setup/Checkup
1. Gemini API Key is generated/retrievable in Google AI Studio.
2. A Firebase project is created for staging and production in Firebase Console.
3. Firebase App Check is enabled for the project. reCAPTCHA v3 is selected as the provider.
4. reCAPTCHA v3 keys are generated in Google reCAPTCHA admin console. The site key is added to the environment variable "NEXT_PUBLIC_RECAPTCHA_SITE_KEY"
   and the secret key is added to Firebase Console > App Check > Apps > Your App > reCAPTCHA v3 configuration.
5. App Hosting is set up in Firebase Console. The necessary environment variables are added to App Hosting > Environment Variables for both staging and production.
   This information can be found in Firebase Console > Project Settings > General > Your Apps >  SDK setup and configuration > Config.
6. Similar to .env.local, the following environment variables are set up in App Hosting > Environment Variables in Firebase Console for both staging and production:
   - GEMINI_API_KEY
   - NEXT_PUBLIC_FIREBASE_API_KEY
   - NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN
   - NEXT_PUBLIC_FIREBASE_PROJECT_ID
   - NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET
   - NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID
   - NEXT_PUBLIC_FIREBASE_APP_ID
   - NEXT_PUBLIC_RECAPTCHA_SITE_KEY
   - NEXT_PUBLIC_GOOGLE_SHEET_ID