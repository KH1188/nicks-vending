# ─────────────────────────────────────────────────────────────────────────────
# deploy.ps1 — Nick's Vending: build and deploy to Firebase Hosting
# Usage:  powershell -ExecutionPolicy Bypass -File .\deploy.ps1
# Prerequisites:
#   - npm install already run
#   - firebase login  (run once to authenticate)
#   - Firebase project configured (see README.md)
# ─────────────────────────────────────────────────────────────────────────────
$ErrorActionPreference = "Stop"
$ScriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path

function Write-Step { param($msg) Write-Host "▶  $msg" -ForegroundColor Green }
function Write-Warn { param($msg) Write-Host "⚠  $msg" -ForegroundColor Yellow }

Write-Host ""
Write-Host "  ╔══════════════════════════════════════╗" -ForegroundColor Cyan
Write-Host "  ║     Nick's Vending — deploy.ps1      ║" -ForegroundColor Cyan
Write-Host "  ╚══════════════════════════════════════╝" -ForegroundColor Cyan
Write-Host ""

Set-Location $ScriptDir

# ── Check firebase CLI ────────────────────────────────────────────────────────
if (-not (Get-Command firebase -ErrorAction SilentlyContinue)) {
    Write-Warn "Firebase CLI not found. Installing globally..."
    npm install -g firebase-tools
}

# ── Build ─────────────────────────────────────────────────────────────────────
Write-Step "Building production bundle..."
npm run build
Write-Host ""

# ── Deploy ────────────────────────────────────────────────────────────────────
Write-Step "Deploying to Firebase Hosting..."
firebase deploy --only hosting
Write-Host ""
Write-Step "Done! Your site is live."
