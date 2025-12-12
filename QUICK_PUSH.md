# Quick Push to GitHub - Sharmanitan/FriendlyFonts

## Option 1: Run the PowerShell Script (Easiest)

1. **Right-click** on `push-code.ps1` in your project folder
2. Select **"Run with PowerShell"**
3. Follow the prompts

Or open PowerShell in your project folder and run:
```powershell
.\push-code.ps1
```

## Option 2: Manual Commands (If Script Doesn't Work)

Open **Git Bash** or **PowerShell** in your project folder and run these commands one by one:

```bash
git init
git remote add origin https://github.com/Sharmanitan/FriendlyFonts.git
git add .
git commit -m "Add waitlist with Google Sheets integration"
git branch -M main
git push -u origin main
```

**If the repository already has code**, pull first:
```bash
git pull origin main --allow-unrelated-histories
```
Then resolve any conflicts and push.

## Option 3: Use GitHub Desktop

1. Open **GitHub Desktop**
2. File → Add Local Repository
3. Select: `C:\Likith\AI Startups\Friendly-Fonts`
4. Click "Publish repository" or "Push origin"

## Authentication

If you're asked for credentials:
- **Username**: Your GitHub username
- **Password**: Use a **Personal Access Token** (not your GitHub password)
  - Get one at: https://github.com/settings/tokens
  - Or use GitHub Desktop which handles this automatically

## Verify

After pushing, check: https://github.com/Sharmanitan/FriendlyFonts

Your `.env.local` file is protected and won't be pushed (it's in `.gitignore`).





