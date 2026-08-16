// Post-build step: creates a static index.html per route with baked-in
// title/description/OG tags, so link-preview bots and non-JS crawlers see
// real per-route metadata instead of the CSR app's single generic tag block.
// Firebase Hosting rewrites each route to its own copy (see firebase.json);
// the copy still boots the same SPA bundle, so client-side routing is unaffected.
const fs = require('fs')
const path = require('path')

const DIST = path.join(__dirname, '..', 'dist')
const SITE_URL = 'https://nicks-vending.web.app'

const ROUTES = [
  {
    route: 'nightlife',
    title: "Nightlife Vending for Bars, Clubs & Casinos | Nick's Vending",
    description: "Zero-cost smart vending for bars, nightclubs, and casinos. We install, stock, and service the machine — you collect a monthly revenue share. Fully compliant, Louisiana-based.",
    image: '/og/nightlife-og.png',
  },
  {
    route: 'cards',
    title: "Factory-Sealed Pokémon Card Vending | Nick's Vending Collectibles",
    description: "Factory-sealed Pokémon card vending machines for malls, card shops, barcades, and family entertainment venues. No repacks, ever. Flexible lease/license or revenue-share terms.",
    image: '/og/cards-og.png',
  },
]

function injectMeta(html, { route, title, description, image }) {
  const url = `${SITE_URL}/${route}`
  const imageUrl = `${SITE_URL}${image}`

  return html
    .replace(/<title>.*?<\/title>/s, `<title>${title}</title>`)
    .replace(/<meta name="description" content=".*?" \/>/s, `<meta name="description" content="${description}" />`)
    .replace(/<meta property="og:title" content=".*?" \/>/s, `<meta property="og:title" content="${title}" />`)
    .replace(/<meta property="og:description" content=".*?" \/>/s, `<meta property="og:description" content="${description}" />`)
    .replace(/<meta property="og:image" content=".*?" \/>/s, `<meta property="og:image" content="${imageUrl}" />`)
    .replace(/<meta property="og:url" content=".*?" \/>/s, `<meta property="og:url" content="${url}" />`)
    .replace('</head>', `    <link rel="canonical" href="${url}" />\n  </head>`)
}

function run() {
  const baseHtml = fs.readFileSync(path.join(DIST, 'index.html'), 'utf-8')

  for (const routeConfig of ROUTES) {
    const outDir = path.join(DIST, routeConfig.route)
    fs.mkdirSync(outDir, { recursive: true })
    const html = injectMeta(baseHtml, routeConfig)
    fs.writeFileSync(path.join(outDir, 'index.html'), html)
    console.log(`wrote dist/${routeConfig.route}/index.html`)
  }
}

run()
