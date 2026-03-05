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

3. download the service account key from Firebase Console for the staging project
  and save it as `firebase-admin-key.json` in the root directory of the project

4. notice the output of App Check debug token in the terminal and add it to the 
  Firebase Console > App Check > Debug tokens

5. open a new terminal and run `npm run dev`
