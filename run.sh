#!/usr/bin/env bash
# ─────────────────────────────────────────────────────────────────────────────
# run.sh — Nick's Vending: install, copy assets, build, and start local preview
# Usage: ./run.sh
# ─────────────────────────────────────────────────────────────────────────────
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ASSETS_SRC="$HOME/Downloads"
ASSETS_DST="$SCRIPT_DIR/src/assets"

# ── Colour helpers ────────────────────────────────────────────────────────────
GREEN='\033[0;32m'; YELLOW='\033[0;33m'; RED='\033[0;31m'; NC='\033[0m'
info()    { echo -e "${GREEN}▶${NC}  $*"; }
warn()    { echo -e "${YELLOW}⚠${NC}  $*"; }
error()   { echo -e "${RED}✖${NC}  $*" >&2; }

echo ""
echo "  ╔═══════════════════════════════════╗"
echo "  ║       Nick's Vending — run.sh     ║"
echo "  ╚═══════════════════════════════════╝"
echo ""

# ── Step 1: Install dependencies ─────────────────────────────────────────────
info "Installing dependencies..."
cd "$SCRIPT_DIR"
npm install
echo ""

# ── Step 2: Copy assets ───────────────────────────────────────────────────────
info "Copying assets from $ASSETS_SRC to $ASSETS_DST"
mkdir -p "$ASSETS_DST"

copy_asset() {
  local src_name="$1"
  local dst_name="$2"
  local src_path="$ASSETS_SRC/$src_name"
  local dst_path="$ASSETS_DST/$dst_name"
  if [ -f "$src_path" ]; then
    cp "$src_path" "$dst_path"
    echo "   ✓  $src_name  →  src/assets/$dst_name"
  else
    warn "Asset not found: $src_path"
    warn "    Create a placeholder or add the file to ~/Downloads"
    # Create a 1×1 transparent PNG fallback so the build doesn't fail
    if command -v convert &>/dev/null; then
      convert -size 1x1 xc:transparent PNG32:"$dst_path" 2>/dev/null || \
        touch "$dst_path"
    else
      touch "$dst_path"
    fi
  fi
}

copy_asset "Nick's Vending Logo.png"          "logo.png"
copy_asset "Nick's Vending Business Card.png" "business-card.png"
copy_asset "Nick's Vending Finger Rule.png"   "finger-rule.png"

# Also copy logo to public/ for favicon (Vite serves public/ at root as-is)
mkdir -p "$SCRIPT_DIR/public"
if [ -f "$ASSETS_DST/logo.png" ]; then
  cp "$ASSETS_DST/logo.png" "$SCRIPT_DIR/public/favicon.png"
  echo "   ✓  logo.png  →  public/favicon.png  (favicon)"
fi
echo ""

# ── Step 3: Build ─────────────────────────────────────────────────────────────
info "Building production bundle..."
npm run build
echo ""

# ── Step 4: Start local preview ───────────────────────────────────────────────
info "Starting local preview on http://localhost:4173"
echo ""
echo "  Press Ctrl+C to stop."
echo ""
npm run preview
