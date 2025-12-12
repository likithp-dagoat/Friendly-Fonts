# PowerShell script to push code to GitHub
# Repository: SharManitan/FriendlyFonts

Write-Host "Checking for Git..." -ForegroundColor Yellow

# Check if git is available
try {
    $gitVersion = git --version
    Write-Host "Git found: $gitVersion" -ForegroundColor Green
} catch {
    Write-Host "ERROR: Git is not installed or not in PATH" -ForegroundColor Red
    Write-Host "Please install Git from: https://git-scm.com/download/win" -ForegroundColor Yellow
    Write-Host "Or use GitHub Desktop: https://desktop.github.com/" -ForegroundColor Yellow
    exit 1
}

Write-Host "`nInitializing repository..." -ForegroundColor Yellow
git init

Write-Host "`nAdding remote repository..." -ForegroundColor Yellow
$remoteExists = git remote get-url origin 2>$null
if ($remoteExists) {
    Write-Host "Remote 'origin' already exists. Updating..." -ForegroundColor Yellow
    git remote set-url origin https://github.com/SharManitan/FriendlyFonts.git
} else {
    git remote add origin https://github.com/SharManitan/FriendlyFonts.git
}

Write-Host "`nChecking remote..." -ForegroundColor Yellow
git remote -v

Write-Host "`nAdding all files..." -ForegroundColor Yellow
git add .

Write-Host "`nChecking status..." -ForegroundColor Yellow
git status

Write-Host "`nCommitting changes..." -ForegroundColor Yellow
git commit -m "Add waitlist with Google Sheets integration"

Write-Host "`nChecking if repository has existing code..." -ForegroundColor Yellow
$branch = "main"
try {
    git ls-remote --heads origin main 2>$null | Out-Null
    if ($LASTEXITCODE -eq 0) {
        Write-Host "Repository has existing code. Pulling first..." -ForegroundColor Yellow
        git pull origin main --allow-unrelated-histories --no-edit
    }
} catch {
    Write-Host "Repository appears to be empty or branch doesn't exist. Proceeding with push..." -ForegroundColor Yellow
}

Write-Host "`nSetting branch to main..." -ForegroundColor Yellow
git branch -M main

Write-Host "`nPushing to GitHub..." -ForegroundColor Yellow
Write-Host "You may be prompted for your GitHub credentials." -ForegroundColor Cyan
git push -u origin main

if ($LASTEXITCODE -eq 0) {
    Write-Host "`n✅ Successfully pushed to GitHub!" -ForegroundColor Green
    Write-Host "Repository: https://github.com/SharManitan/FriendlyFonts" -ForegroundColor Cyan
} else {
    Write-Host "`n❌ Push failed. Please check the error messages above." -ForegroundColor Red
    Write-Host "Common issues:" -ForegroundColor Yellow
    Write-Host "  - Authentication required (use GitHub Desktop or set up SSH keys)" -ForegroundColor Yellow
    Write-Host "  - Merge conflicts (resolve them and try again)" -ForegroundColor Yellow
}

