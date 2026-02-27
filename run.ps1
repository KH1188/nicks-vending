# ─────────────────────────────────────────────────────────────────────────────
# run.ps1 — Nick's Vending: install, copy assets, build, start local preview
# Usage:  powershell -ExecutionPolicy Bypass -File .\run.ps1
# ─────────────────────────────────────────────────────────────────────────────
$ErrorActionPreference = "Stop"
$ScriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$AssetsSrc = Join-Path $env:USERPROFILE "Downloads"
$AssetsDst = Join-Path $ScriptDir "src\assets"

function Write-Step { param($msg) Write-Host "▶  $msg" -ForegroundColor Green }
function Write-Warn { param($msg) Write-Host "⚠  $msg" -ForegroundColor Yellow }

Write-Host ""
Write-Host "  ╔═══════════════════════════════════╗" -ForegroundColor Cyan
Write-Host "  ║       Nick's Vending — run.ps1    ║" -ForegroundColor Cyan
Write-Host "  ╚═══════════════════════════════════╝" -ForegroundColor Cyan
Write-Host ""

Set-Location $ScriptDir

# ── Step 1: Install ───────────────────────────────────────────────────────────
Write-Step "Installing dependencies..."
npm install
Write-Host ""

# ── Step 2: Copy assets ───────────────────────────────────────────────────────
Write-Step "Copying assets from $AssetsSrc to $AssetsDst"
New-Item -ItemType Directory -Force -Path $AssetsDst | Out-Null

function Copy-Asset {
    param($SrcName, $DstName)
    $src = Join-Path $AssetsSrc $SrcName
    $dst = Join-Path $AssetsDst $DstName
    if (Test-Path $src) {
        Copy-Item -Path $src -Destination $dst -Force
        Write-Host "   ✓  $SrcName  →  src\assets\$DstName" -ForegroundColor DarkGreen
    } else {
        Write-Warn "Asset not found: $src"
        Write-Warn "  Add the file to $AssetsSrc and re-run."
        # Create empty placeholder to prevent build failure
        New-Item -ItemType File -Force -Path $dst | Out-Null
    }
}

Copy-Asset "Nick's Vending Logo.png"          "logo.png"
Copy-Asset "Nick's Vending Business Card.png" "business-card.png"
Copy-Asset "Nick's Vending Finger Rule.png"   "finger-rule.png"

# Also copy logo to public/ for favicon
$PublicDir = Join-Path $ScriptDir "public"
New-Item -ItemType Directory -Force -Path $PublicDir | Out-Null
$logoPath = Join-Path $AssetsDst "logo.png"
if (Test-Path $logoPath) {
    Copy-Item -Path $logoPath -Destination (Join-Path $PublicDir "favicon.png") -Force
    Write-Host "   ✓  logo.png  →  public\favicon.png  (favicon)" -ForegroundColor DarkGreen
}
Write-Host ""

# ── Step 3: Build ─────────────────────────────────────────────────────────────
Write-Step "Building production bundle..."
npm run build
Write-Host ""

# ── Step 4: Preview ───────────────────────────────────────────────────────────
Write-Step "Starting local preview at http://localhost:4173"
Write-Host ""
Write-Host "  Press Ctrl+C to stop." -ForegroundColor DarkGray
Write-Host ""
npm run preview
