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
   - Local dev (`npm run dev`): set `GEMINI_API_KEY` in `.env.local`
   - Functions deploy (recommended per environment):
     - `functions/.env.staging` for `-P staging`
     - `functions/.env.production` for `-P production`
   - You can also use a shared `functions/.env` for all environments.

## Run Locally

`npm run dev`

## Deploy to Firebase Hosting

- For staging: `npm run deploy:staging`
- For production: `npm run deploy:production`
