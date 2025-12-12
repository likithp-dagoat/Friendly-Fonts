# Deploying to Vercel with Google Sheets Integration

This guide will help you deploy your waitlist to Vercel and configure the Google Sheets credentials in Vercel's dashboard.

## Important Note

**You still need Google Cloud credentials** to access the Google Sheets API. Vercel is just the hosting platform - it doesn't replace Google Cloud. However, you'll configure the credentials in Vercel's dashboard instead of a local `.env.local` file.

## Step 1: Get Google Cloud Credentials (One-Time Setup)

You still need to do this once to get the credentials:

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a project and enable Google Sheets API
3. Create a Service Account
4. Download the JSON key file
5. Extract the three values: `client_email`, `private_key`, and `project_id`

See `CREDENTIALS_SETUP.md` for detailed instructions on this step.

## Step 2: Share Your Google Sheet

1. Open your Google Sheet: https://docs.google.com/spreadsheets/d/1igMOxjRn2f4erhWWivWuW6GlGLOHDCthofhvMR1PD5Y
2. Click **"Share"** and add the service account email (from the JSON file) as an **Editor**

## Step 3: Deploy to Vercel

### Option A: Deploy via Vercel Dashboard (Recommended)

1. **Push your code to GitHub** (if not already):
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin <your-github-repo-url>
   git push -u origin main
   ```

2. **Go to Vercel**: https://vercel.com
3. **Sign in** with your GitHub account
4. **Click "Add New Project"**
5. **Import your GitHub repository**
6. Vercel will auto-detect Next.js settings - just click **"Deploy"**

### Option B: Deploy via Vercel CLI

1. **Install Vercel CLI**:
   ```bash
   npm i -g vercel
   ```

2. **Deploy**:
   ```bash
   vercel
   ```
   Follow the prompts to link your project.

## Step 4: Configure Environment Variables in Vercel

After your first deployment:

1. Go to your **Vercel Dashboard**
2. Click on your project
3. Go to **Settings** > **Environment Variables**
4. Add these three variables:

   **Variable 1:**
   - **Name**: `GOOGLE_SERVICE_ACCOUNT_EMAIL`
   - **Value**: `your-service-account@project-id.iam.gserviceaccount.com`
   - **Environments**: Select all (Production, Preview, Development)

   **Variable 2:**
   - **Name**: `GOOGLE_PRIVATE_KEY`
   - **Value**: `-----BEGIN PRIVATE KEY-----\nYour entire private key here\n-----END PRIVATE KEY-----\n`
   - **Important**: Keep the quotes and `\n` characters
   - **Environments**: Select all (Production, Preview, Development)

   **Variable 3:**
   - **Name**: `GOOGLE_PROJECT_ID`
   - **Value**: `your-project-id-123456`
   - **Environments**: Select all (Production, Preview, Development)

5. **Click "Save"** for each variable

## Step 5: Redeploy

After adding environment variables:

1. Go to the **Deployments** tab
2. Click the **"..."** menu on your latest deployment
3. Click **"Redeploy"**
4. Or push a new commit to trigger a new deployment

## Step 6: Test Your Waitlist

1. Visit your Vercel deployment URL (e.g., `https://your-project.vercel.app`)
2. Try submitting an email in the waitlist form
3. Check your Google Sheet to see if the entry was added

## Benefits of Using Vercel

✅ **No local `.env.local` file needed** - credentials are stored securely in Vercel  
✅ **Automatic deployments** from GitHub  
✅ **Free SSL certificate**  
✅ **Global CDN** for fast performance  
✅ **Easy environment management** for production/preview/development  

## Troubleshooting

**"Server configuration error" after deployment:**
- Make sure you added all three environment variables in Vercel
- Make sure you selected all environments (Production, Preview, Development)
- Redeploy after adding variables

**"403 Forbidden" error:**
- Make sure you shared the Google Sheet with the service account email
- Make sure the service account has Editor permissions

**Environment variables not working:**
- Make sure you redeployed after adding the variables
- Check that variable names match exactly (case-sensitive)
- For `GOOGLE_PRIVATE_KEY`, make sure you included the quotes and `\n` characters

## Local Development

For local development, you can still use `.env.local`:

1. Create `.env.local` in your project root
2. Add the same three variables (see `env.template`)
3. Run `npm run dev` locally

The code will automatically use Vercel's environment variables when deployed, and your local `.env.local` when developing locally.






