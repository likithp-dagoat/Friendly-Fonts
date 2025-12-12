# How to Push Your Code to GitHub

## Option 1: Using GitHub Desktop (Easiest)

1. **Download GitHub Desktop** (if you don't have it):
   - Go to https://desktop.github.com/
   - Download and install it

2. **Open GitHub Desktop**:
   - Click "File" > "Add Local Repository"
   - Browse to your project folder: `C:\Likith\AI Startups\Friendly-Fonts`
   - Click "Add Repository"

3. **Create a new repository on GitHub**:
   - Go to https://github.com/new
   - Name it (e.g., "Friendly-Fonts")
   - Don't initialize with README (since you already have files)
   - Click "Create repository"

4. **Publish to GitHub**:
   - In GitHub Desktop, click "Publish repository"
   - Select the repository you just created
   - Make sure "Keep this code private" is unchecked (or checked if you want it private)
   - Click "Publish repository"

5. **Commit your changes**:
   - You'll see all your files listed
   - Write a commit message like "Add waitlist with Google Sheets integration"
   - Click "Commit to main"
   - Click "Push origin" to push to GitHub

## Option 2: Using Command Line (Git Bash or PowerShell)

### Step 1: Install Git (if not installed)
- Download from: https://git-scm.com/download/win
- Install with default settings

### Step 2: Open Git Bash or PowerShell in your project folder

### Step 3: Initialize and push

```bash
# Initialize git repository
git init

# Add all files (except those in .gitignore)
git add .

# Make your first commit
git commit -m "Initial commit: Add waitlist with Google Sheets integration"

# Create a new repository on GitHub first, then:
# Replace YOUR_USERNAME and YOUR_REPO_NAME with your actual values
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git

# Push to GitHub
git branch -M main
git push -u origin main
```

## Option 3: Using VS Code

1. **Open your project in VS Code**
2. **Open the Source Control panel** (Ctrl+Shift+G)
3. **Click "Initialize Repository"** if prompted
4. **Stage all changes** (click the "+" next to "Changes")
5. **Write a commit message** and click the checkmark
6. **Click "..." menu** > "Publish to GitHub"
7. **Follow the prompts** to create the repository

## Important Notes

✅ **Your `.env.local` file is already protected** - it's in `.gitignore` and won't be pushed  
✅ **Your credentials are safe** - they stay on your local machine  
✅ **For Vercel deployment**, you'll add the environment variables in Vercel's dashboard (not in the code)

## After Pushing to GitHub

Once your code is on GitHub, you can:
1. Deploy to Vercel by connecting your GitHub repository
2. Add environment variables in Vercel's dashboard
3. Your site will auto-deploy on every push

See `VERCEL_SETUP.md` for deployment instructions.


