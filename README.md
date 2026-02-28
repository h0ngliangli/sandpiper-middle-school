# Sandpiper Middle School Website

## Prerequisites

1. Install dependencies:
   `npm install`
2. Install Firebase CLI globally if you haven't:
   `npm install -g firebase-tools`
3. Create Firebase projects for staging and production (or use existing ones), then make sure your aliases in `.firebaserc` map correctly:
   - `staging` -> `sandpipermiddle-staging`
   - `production` -> `sandpipermiddle`
4. Set Gemini API keys:
   - Go to aistudio.google.com, create a Gemini API key, and add it to your Firebase project secrets:
     - `firebase functions:secrets:set GEMINI_API_KEY -P staging`
     - `firebase functions:secrets:set GEMINI_API_KEY -P production`

     - Local dev (`npm run dev`): set `GEMINI_API_KEY` in `.env.local`

## Run Locally
set  set `GEMINI_API_KEY` in `.env.local` and `functions/.env.local`
`firebase use default` (firebase will use the default project id, this will impact the API endpoint of emulated functions. See vite.config.ts for "rewrite")
`firebase emulators:start --only functions` (starts the functions emulator on localhost:5001)
open a new terminal and run
`npm run dev`

## Deploy to Firebase Hosting

- For staging: `npm run deploy:staging`
- For production: `npm run deploy:production`
