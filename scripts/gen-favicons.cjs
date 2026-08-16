// One-off asset generator. Run with: npm install --no-save sharp && node scripts/gen-favicons.cjs
const sharp = require('sharp')
const fs = require('fs')
const path = require('path')

const SRC = path.join(__dirname, '..', 'src', 'assets', 'logos', 'circle-logo.webp')
const OUT = path.join(__dirname, '..', 'public')

const SIZES = [
  { size: 16,  name: 'favicon-16x16.png' },
  { size: 32,  name: 'favicon-32x32.png' },
  { size: 48,  name: 'favicon-48x48.png' },
  { size: 180, name: 'apple-touch-icon.png' },
  { size: 192, name: 'icon-192.png' },
  { size: 512, name: 'icon-512.png' },
]

async function run() {
  for (const { size, name } of SIZES) {
    await sharp(SRC).resize(size, size).png().toFile(path.join(OUT, name))
    console.log('wrote', name)
  }
  // Also a compact general-purpose favicon.png (32px) to replace the 2MB original
  await sharp(SRC).resize(32, 32).png().toFile(path.join(OUT, 'favicon.png'))
  console.log('wrote favicon.png (replaces 2MB original)')
}

run().catch(e => { console.error(e); process.exit(1) })
