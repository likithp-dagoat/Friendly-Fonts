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
   - **Value**: `friendlyfontswaitlist@friendlyfonts.iam.gserviceaccount.com`
   - **Environments**: Select all (Production, Preview, Development)
   - Click **Save**

   **Variable 2:**
   - **Name**: `GOOGLE_PRIVATE_KEY`
   - **Value**: (Copy the entire value below, including quotes and \n)
   ```
   "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDobYRdhIs8z4lf\n8jgK/tfMTi9e92f+gxzgaMIXCnG4Drzl7nLvE9+/uPfdLOEX0k5BWfdpYxsqa79h\nwTiyn/OgY5XvOsk0B/6jQ5cfUU/z7xQpj8vA1tlke9resw8e+ABEZVFikOsUhMuL\nboYt66xOMm5+A2sdmucfAmBY2REpegxGND2EbnA/pqiHXoSAdrs9KH1+mFOYm2bU\nlYfmcqD1jpL26A1BFQRU3dl3TLujQjD8bYC9JXz31ckKZwtFF8212nnr+Pdc7KIb\nOCeG/SH25AKxR9DMIfQL3VKJG3OuVcxfOM4lEUV4o93S+OQHQ69JrOR3KK+hQWMO\nZh4SQQQBAgMBAAECggEAENcL1cFqW9qRknu4kcYLGUi6PUA3BFq4NzjVLy7Y3xlk\n7afheJmmXCa+Vq5kv1bDyA+zpwAWPMmXu9vFtt4d8bX6wV2ErG9pL1JmBaUyN3NQ\nBlQz0rdTrZMdCtugXIG4IJHSsWMx6nJV/mE1+ZJvZoRYOxXA/LZ3c74MAFlMhAZU\nsc7XNWhrFNRJUpAPM8vgwpC0hrD3kksaIhwJFGHTzG03emSqEmKLsTHjjW5ePvIr\nDaTDYaoNtjArHcp1YYvU1sNOve5CYYfHKLZ+aj6OCJu0z/HM+SAWPTdVqYBU7Iel\naQooMdiRQTF597zbhcUuFsbeBfHR891IH/ltzktWDQKBgQD+0ozejktD7NZhg0Oe\nRUSOihsLPG4yaIr4h1T0g88olrKp0Da4k2jvgqrK9NGVjpE9XjFiR+DresbKGtAA\ndMImhowdxPeTNwZt725D1UqQ2yIoKh1doF4rGdIXuhJR0wX6owRyqifW13wps7ee\nq+qxCvH87yIAdo0nBIHiy7RGiwKBgQDpgHlvhH1TipOP/MCSGQdD6Y1XsY89UQ8Y\nkVFwxKiZqFMVQW0a3MJqV5Ygrede8Vr+zmzyBzTlJkOZYftUkUManimiscwNxZCf\npf5gX+ToPfhyC0+jA6rycVIvyIMwFFJbP/mPlBozWvlY3uQ4Szm7FsO0AAKqC0cY\njLXJrSz9IwKBgQCzvKtkJ5XrGVi1ezLspgsPR1Z//GX15EtxtXM07OvnwzPOF3Eh\ni8hOeCoj8b8K8H59fLz0h6KcNgOVdogUakavieO288F08zDzxhhOfFmWBxr2nY4N\nBhql6BaKadKWKHRlLyrp/h8PqPqJJ5xyrOxjaEb7k2i2TuiNBt7eq7RCtQKBgCsD\n0NsbVB8UszReQndnhvAa0T/rZNDN4vMKqi8U+147JPsQb3H4YxRGCFEC2FGkMrgn\n/OflLfhcwS07YJpmnC8GHfNrv4R19buDT8YfREMIT4Fq1gPYxCAfgh1tWcV8qONI\neMfbZ6w4QSD/BpncOcleWzUIn3UF2NYL7d02OshzAoGANXJjTXu2VMfstsC0TAJT\n8Xoiixn1dmnxJ0uwv1smp+OLTbAauBPGWQsJZFjfBTCP0E2OT3iaFBa3z3IfhpNQ\ni8k0fgOpuZVi2ncXrZ28c6yryis1N7RSvPy+rtjEthccnAx1L2tB6e4Y56cYtA+7\nHvZlN1v6wpuB4DBTbZ+xbuM=\n-----END PRIVATE KEY-----\n"
   ```
   - **Important**: 
     - Copy the ENTIRE value above (including the quotes at the start and end)
     - Make sure the `\n` characters are preserved (they represent newlines)
     - In Vercel, paste it exactly as shown above
   - **Environments**: Select all (Production, Preview, Development)
   - Click **Save**

   **Variable 3:**
   - **Name**: `GOOGLE_PROJECT_ID`
   - **Value**: `friendlyfonts`
   - **Environments**: Select all (Production, Preview, Development)
   - Click **Save**

5. After adding all three variables, **Redeploy** your application (see Step 5)

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






