# Push Code to Existing GitHub Repository

Your repository: **Sharmanitan/FriendlyFonts**

## Steps to Push Your Code

Open **Git Bash**, **PowerShell**, or **Command Prompt** in your project folder:
`C:\Likith\AI Startups\Friendly-Fonts`

### Step 1: Initialize Git (if not already done)
```bash
git init
```

### Step 2: Add the Remote Repository
```bash
git remote add origin https://github.com/Sharmanitan/FriendlyFonts.git
```

If you get an error saying the remote already exists, use this instead:
```bash
git remote set-url origin https://github.com/Sharmanitan/FriendlyFonts.git
```

### Step 3: Check Current Remote (Optional)
```bash
git remote -v
```

### Step 4: Add All Files
```bash
git add .
```

### Step 5: Commit Your Changes
```bash
git commit -m "Add waitlist with Google Sheets integration"
```

### Step 6: Pull First (Important!)
If there's existing code in the repository, pull it first:
```bash
git pull origin main --allow-unrelated-histories
```

Or if the default branch is `master`:
```bash
git pull origin master --allow-unrelated-histories
```

### Step 7: Push to GitHub
```bash
git branch -M main
git push -u origin main
```

Or if the repository uses `master`:
```bash
git push -u origin master
```

## If You Get Conflicts

If there are merge conflicts after pulling:
1. Resolve the conflicts in the files
2. Stage the resolved files: `git add .`
3. Commit: `git commit -m "Resolve merge conflicts"`
4. Push: `git push origin main`

## If the Repository is Empty

If the repository is completely empty, you can skip Step 6 (the pull) and go straight to pushing.

## Quick One-Liner (If Repository is Empty)

```bash
git init && git remote add origin https://github.com/Sharmanitan/FriendlyFonts.git && git add . && git commit -m "Add waitlist with Google Sheets integration" && git branch -M main && git push -u origin main
```

## Verify Your Push

After pushing, check:
- Go to: https://github.com/Sharmanitan/FriendlyFonts
- You should see all your files there
- Make sure `.env.local` is NOT visible (it should be ignored)


