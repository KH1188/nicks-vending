// One-off asset generator. Run with: npm install --no-save sharp && node scripts/gen-og-images.cjs
const sharp = require('sharp')
const path = require('path')

const OUT = path.join(__dirname, '..', 'public', 'og')
require('fs').mkdirSync(OUT, { recursive: true })

const W = 1200
const H = 630

function svgCard({ bg, textColor, subColor, title, subtitle, tagColor, tagBg, tag }) {
  return `
  <svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#3E8EFF" />
        <stop offset="50%" stop-color="#8B5CF6" />
        <stop offset="100%" stop-color="#E93FE0" />
      </linearGradient>
      <radialGradient id="glow" cx="50%" cy="0%" r="75%">
        <stop offset="0%" stop-color="#8B5CF6" stop-opacity="0.35" />
        <stop offset="100%" stop-color="#8B5CF6" stop-opacity="0" />
      </radialGradient>
    </defs>
    <rect width="${W}" height="${H}" fill="${bg}" />
    <rect width="${W}" height="${H}" fill="url(#glow)" />
    <rect x="60" y="60" width="140" height="6" rx="3" fill="url(#grad)" />
    <text x="60" y="290" font-family="Arial, sans-serif" font-weight="900" font-size="72" fill="${textColor}">Nick's Vending</text>
    <text x="60" y="360" font-family="Arial, sans-serif" font-weight="800" font-size="44" fill="url(#grad)">${title}</text>
    <text x="60" y="410" font-family="Arial, sans-serif" font-weight="400" font-size="26" fill="${subColor}">${subtitle}</text>
    <rect x="60" y="460" width="${tag.length * 11 + 40}" height="42" rx="21" fill="${tagBg}" />
    <text x="80" y="488" font-family="Arial, sans-serif" font-weight="700" font-size="18" fill="${tagColor}" letter-spacing="1">${tag}</text>
  </svg>`
}

const CARDS = [
  {
    name: 'nightlife-og.png',
    svg: svgCard({
      bg: '#060608', textColor: '#FFFFFF', subColor: 'rgba(255,255,255,0.6)',
      title: 'Nightlife Vending', subtitle: 'Revenue-share vending for bars, clubs &amp; casinos',
      tagColor: '#FFFFFF', tagBg: 'rgba(255,255,255,0.08)', tag: 'WE STOCK IT, YOU PROFIT',
    }),
  },
  {
    name: 'cards-og.png',
    svg: svgCard({
      bg: '#FBFAFD', textColor: '#17141F', subColor: 'rgba(23,20,31,0.6)',
      title: 'Collectibles Vending', subtitle: 'Factory-sealed Pokémon card vending — no repacks',
      tagColor: '#17141F', tagBg: 'rgba(23,20,31,0.06)', tag: 'FACTORY SEALED ONLY',
    }),
  },
  {
    name: 'default-og.png',
    svg: svgCard({
      bg: '#060608', textColor: '#FFFFFF', subColor: 'rgba(255,255,255,0.6)',
      title: 'Two Vending Lines', subtitle: 'Nightlife vending and collectibles vending, one operator',
      tagColor: '#FFFFFF', tagBg: 'rgba(255,255,255,0.08)', tag: 'LOUISIANA',
    }),
  },
]

async function run() {
  for (const { name, svg } of CARDS) {
    await sharp(Buffer.from(svg)).png().toFile(path.join(OUT, name))
    console.log('wrote', name)
  }
}

run().catch(e => { console.error(e); process.exit(1) })
