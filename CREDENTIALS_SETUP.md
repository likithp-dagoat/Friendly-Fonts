# Quick Guide: Setting Up Google Sheets Credentials

Follow these steps to configure your Google Sheets integration:

## Step 1: Go to Google Cloud Console

1. Visit: https://console.cloud.google.com/
2. Sign in with your Google account (lpetnikota@gmail.com)

## Step 2: Create a New Project

1. Click the project dropdown at the top (next to "Google Cloud")
2. Click **"New Project"**
3. Name it something like "FriendlyFonts" or "Waitlist"
4. Click **"Create"**
5. Wait for it to be created, then select it from the dropdown

## Step 3: Enable Google Sheets API

1. In the left sidebar, go to **"APIs & Services"** > **"Library"**
2. In the search bar, type: **"Google Sheets API"**
3. Click on **"Google Sheets API"** from the results
4. Click the blue **"Enable"** button
5. Wait a few seconds for it to enable

## Step 4: Create a Service Account

1. Go to **"APIs & Services"** > **"Credentials"** (in the left sidebar)
2. Click **"+ CREATE CREDENTIALS"** at the top
3. Select **"Service account"**
4. Fill in:
   - **Service account name**: `waitlist-service` (or any name you like)
   - **Service account ID**: Will auto-fill (leave as is)
5. Click **"CREATE AND CONTINUE"**
6. Skip the optional steps (click **"CONTINUE"** then **"DONE"**)

## Step 5: Create and Download the Key

1. You should now see your service account in the list. **Click on it** (the email address)
2. Go to the **"Keys"** tab at the top
3. Click **"ADD KEY"** > **"Create new key"**
4. Select **"JSON"** format
5. Click **"CREATE"**
6. A JSON file will automatically download to your computer

## Step 6: Extract Information from the JSON File

1. Open the downloaded JSON file (it will have a name like `project-name-xxxxx.json`)
2. You'll see something like this:
   ```json
   {
     "type": "service_account",
     "project_id": "your-project-id-123456",
     "private_key_id": "...",
     "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC...\n-----END PRIVATE KEY-----\n",
     "client_email": "waitlist-service@your-project-id-123456.iam.gserviceaccount.com",
     ...
   }
   ```

3. Copy these three values:
   - **`project_id`** - This is your `GOOGLE_PROJECT_ID`
   - **`client_email`** - This is your `GOOGLE_SERVICE_ACCOUNT_EMAIL`
   - **`private_key`** - This is your `GOOGLE_PRIVATE_KEY` (copy the ENTIRE thing including the BEGIN/END lines)

## Step 7: Share Your Google Sheet

1. Open your Google Sheet: https://docs.google.com/spreadsheets/d/1igMOxjRn2f4erhWWivWuW6GlGLOHDCthofhvMR1PD5Y
2. Click the **"Share"** button (top right, blue button)
3. In the "Add people and groups" field, paste the **`client_email`** from Step 6
4. Make sure the permission is set to **"Editor"** (not Viewer)
5. **Uncheck** "Notify people" (optional, to avoid sending an email)
6. Click **"Share"**

## Step 8: Create Your .env.local File

1. In your project folder, create a new file called `.env.local`
2. Copy and paste this template, then fill in your values:

```env
GOOGLE_SERVICE_ACCOUNT_EMAIL=waitlist-service@your-project-id-123456.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYour entire private key here\n-----END PRIVATE KEY-----\n"
GOOGLE_PROJECT_ID=your-project-id-123456
```

**Important Notes:**
- Replace the values with your actual values from Step 6
- Keep the quotes (`"`) around `GOOGLE_PRIVATE_KEY`
- Keep all the `\n` characters in the private key (they represent newlines)
- The private key should be on ONE line with `\n` characters, not actual line breaks

## Step 9: Prepare Your Google Sheet

1. Open your Google Sheet
2. In the first row, add headers:
   - **Cell A1**: `Email`
   - **Cell B1**: `Timestamp`
3. The API will automatically add new entries below these headers

## Step 10: Test It!

1. Make sure your `.env.local` file is saved
2. Restart your development server:
   ```bash
   npm run dev
   ```
3. Go to your website and try submitting an email in the waitlist form
4. Check your Google Sheet - you should see the email and timestamp appear!

## Troubleshooting

**Error: "Server configuration error"**
- Make sure all three environment variables are set in `.env.local`
- Make sure you restarted the dev server after creating `.env.local`

**Error: "403 Forbidden" or "The caller does not have permission"**
- Make sure you shared the Google Sheet with the service account email
- Make sure you gave it "Editor" permissions (not Viewer)

**Error: "401 Unauthorized"**
- Check that your `GOOGLE_PRIVATE_KEY` has quotes around it
- Make sure the private key includes the `-----BEGIN PRIVATE KEY-----` and `-----END PRIVATE KEY-----` lines
- Make sure you're using `\n` (backslash-n) not actual line breaks

**Nothing appears in the sheet**
- Check the browser console for errors
- Check your terminal/command prompt for server errors
- Make sure the sheet name is "Sheet1" (or update the range in `src/app/api/waitlist/route.ts`)

