# Google Sheets Setup Guide

This guide will help you set up Google Sheets integration for the waitlist.

## Prerequisites
- A Google account (lpetnikota@gmail.com)
- Access to Google Cloud Console

## Step 1: Create a Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Note your Project ID

## Step 2: Enable Google Sheets API

1. In the Google Cloud Console, go to **APIs & Services** > **Library**
2. Search for "Google Sheets API"
3. Click on it and press **Enable**

## Step 3: Create a Service Account

1. Go to **APIs & Services** > **Credentials**
2. Click **Create Credentials** > **Service Account**
3. Give it a name (e.g., "waitlist-service")
4. Click **Create and Continue**
5. Skip the optional steps and click **Done**

## Step 4: Create and Download Service Account Key

1. Click on the service account you just created
2. Go to the **Keys** tab
3. Click **Add Key** > **Create new key**
4. Choose **JSON** format
5. Download the JSON file

## Step 5: Extract Credentials from JSON

Open the downloaded JSON file. You'll need these values:

- `client_email` → `GOOGLE_SERVICE_ACCOUNT_EMAIL`
- `private_key` → `GOOGLE_PRIVATE_KEY` (keep the quotes and newlines)
- `project_id` → `GOOGLE_PROJECT_ID`

## Step 6: Share the Google Sheet

1. Open your Google Sheet: https://docs.google.com/spreadsheets/d/1P1RqLdPCHU6Pf3b9KnXH4eECbAelZ9208Ximp7E3Tz0
2. Click **Share** (top right)
3. Add the service account email (from Step 5) as an editor
4. Make sure to give it **Editor** permissions

## Step 7: Set Up Environment Variables

1. Copy `.env.example` to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```

2. Fill in the values from Step 5:
   ```env
   GOOGLE_SERVICE_ACCOUNT_EMAIL=your-service-account@project-id.iam.gserviceaccount.com
   GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYour private key here\n-----END PRIVATE KEY-----\n"
   GOOGLE_PROJECT_ID=your-project-id
   ```

3. **Important**: Keep the quotes around `GOOGLE_PRIVATE_KEY` and preserve the `\n` characters

## Step 8: Prepare Your Google Sheet

Make sure your Google Sheet has headers in the first row:
- Column A: Email
- Column B: Timestamp

The API will automatically append new entries below the headers.

## Testing

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Go to your website and try submitting the waitlist form
3. Check your Google Sheet to see if the entry was added

## Troubleshooting

- **403 Forbidden**: Make sure you've shared the sheet with the service account email
- **401 Unauthorized**: Check that your credentials are correct in `.env.local`
- **Sheet not found**: Verify the spreadsheet ID is correct in `src/app/api/waitlist/route.ts`

