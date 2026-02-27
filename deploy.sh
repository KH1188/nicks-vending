#!/usr/bin/env bash
# ─────────────────────────────────────────────────────────────────────────────
# deploy.sh — Nick's Vending: build and deploy to Firebase Hosting
# Usage: ./deploy.sh
# Prerequisites:
#   - npm install already run (or run.sh already executed once)
#   - firebase login  (run once to authenticate)
#   - Firebase project set up (see README.md §First-time Firebase setup)
# ─────────────────────────────────────────────────────────────────────────────
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

GREEN='\033[0;32m'; YELLOW='\033[0;33m'; RED='\033[0;31m'; NC='\033[0m'
info()  { echo -e "${GREEN}▶${NC}  $*"; }
warn()  { echo -e "${YELLOW}⚠${NC}  $*"; }

echo ""
echo "  ╔══════════════════════════════════════╗"
echo "  ║      Nick's Vending — deploy.sh      ║"
echo "  ╚══════════════════════════════════════╝"
echo ""

cd "$SCRIPT_DIR"

# ── Check firebase CLI ────────────────────────────────────────────────────────
if ! command -v firebase &>/dev/null; then
  warn "Firebase CLI not found. Installing globally..."
  npm install -g firebase-tools
fi

# ── Build ─────────────────────────────────────────────────────────────────────
info "Building production bundle..."
npm run build
echo ""

# ── Deploy ────────────────────────────────────────────────────────────────────
info "Deploying to Firebase Hosting..."
firebase deploy --only hosting
echo ""
info "Done! Your site is live."
