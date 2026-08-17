# Changelog

All notable changes to Nick's Vending are documented here.
Entries are grouped by date, newest first.

---

## 2026-08-16 — neon redesign deployed to prod (merged `redesign-neon` → `main`)

### Owner login
- LoginPage rethemed to match the neon design system: ink background, neon
  violet/blue glow backdrop, circle-transparent logo, "Back to Nick's
  Vending" link back to the landing page

### Footers
- Nightlife and Cards footers gain a "Choose a different vending line" link
  so visitors can cross over between the two storefronts

### Compliance
- Added The Swamp Room Bar & Grill compliance documents (contract, operator
  permit, retail dealer permit, vending machine permit)
- Added the Responsible Vendor Card asset

This is the first production deploy of the full neon redesign (landing,
`/nightlife`, `/cards`, and the owner portal login).

---

## 2026-08-16 — round 3 (branch: `redesign-neon`)

### New transparent logo assets
- Swapped in true-transparency logo art site-wide: circle badge
  (`circle-transparent.webp`) and text logo (`text-logo.webp`), both optimized
  from the new PNGs (trimmed, resized, ~120KB/70KB)
- Landing, nightlife hero, and cards hero use the circle badge; both page
  headers use the text logo (cards keeps the COLLECTIBLES tag)
- Nightlife footer shows the circle badge above the description paragraph

### Nightlife page
- Restored prod's background-photo treatment: bar installation photo behind
  the hero, McGinty's bar photo behind What We Stock (dark overlays keep the
  neon theme readable)
- Restored the full interactive 6-machine section from prod (carousels,
  lightbox, taglines, detail links), rethemed dark; added "Machines" to the nav

### Collectibles page
- New machines section with the 4 TCG-wrapped machines (Mini TCG, Slim Wall,
  Mega Wall, Slim Tower) — Tin Lift and WeatherWall intentionally excluded
- Four new detail pages under `/cards/machines/*` with carousels, specs
  (matching nightlife hardware), and contact CTA; added to sitemap
- Background photos behind Why Sealed and FAQ sections (light overlay)
- Removed the "See Revenue-Share Terms" hero button; centered the revenue
  share card in the Terms section

### Both pages
- Header nav links are now absolute paths (`/nightlife#...`, `/cards#...`)
  so they work from About, Photos, machine detail pages, and login — verified
  by an automated click-through test

---

## 2026-08-16 — round 2 (branch: `redesign-neon`)

### Landing page
- Hero logo now displays as a true circle (cropped, neon glow) instead of a square image
- Nightlife card CTA now reads "For 21+ venue owners"
- Collectibles card copy updated to "Factory-sealed Collectible card vending for malls, convenience stores, family entertainment venues, and more"

### Nightlife page
- Header now uses a plain text wordmark instead of the small circle logo
- Enlarged the skyline logo above "We stock it. You profit."
- Removed the "Installed & serviced by Nick's Vending" caption; restored the original 5-machine photo carousel (Slim Wall, Mega Wall, Slim Tower, Mini Wall, WeatherWall) in the hero
- Replaced the age-verification compliance card with a Louisiana ATC compliance card

### Legacy pages rethemed to neon
- About, Photos, all six machine spec pages, and the Owner Portal login now use the dark neon theme (NightlifeNavbar/NightlifeFooter, ink/neon tokens) — images, specs, and AR links preserved
- Fixed stale links: old `/#contact` and `/#machines` anchors now point to `/nightlife`
- Owner/admin dashboard interior remains unchanged

### Collectibles page
- Hero heading now "Factory-sealed Pokémon and collectible vending."
- Replaced the placeholder machine mockup with a real booster-pack image carousel (Evolving Skies, Prismatic Evolutions, Destined Rivals, Mega Evolution: Phantasmal Flames, Surging Sparks)
- Removed all lease/license mentions — revenue share is the only offered structure
- Footer: "Collectibles" now stacks under the wordmark; added Company links (About, Machines, Photos, Nightlife Vending, Owner Login)

---

## 2026-08-16 (branch: `redesign-neon`)

### Site Redesign — Two Business Lines
- Restructured the public site into two audience-specific paths: `/nightlife`
  (bars, clubs, casinos — existing nicotine/vape vending line) and `/cards`
  (malls, card shops, barcades — new factory-sealed Pokémon card vending line)
- Added a new `/` landing page that routes visitors to one of the two paths
- Extracted a neon design token set (near-black background, blue→violet→magenta
  gradient accents, neon-glow borders) from the two new logo marks; `/cards` uses
  a lighter, family-friendly background variant of the same tokens
- `/cards` is fully self-contained (own components, own copy) with no nicotine
  product mentions anywhere on the page, and no cross-imports from the
  nightlife-only components — structured so it can later be split to its own
  Firebase Hosting site/domain with minimal rework
- Logo files have an opaque black background (no alpha channel) and the
  nicotine icon row is baked into the artwork, so `/cards` uses a text-based
  wordmark instead of the logo images until dedicated cards-safe art exists
- `/cards` contact form is mailto-based (no backend/paid service) to keep the
  route decoupled from the nightlife EmailJS integration
- Removed the now-orphaned root-page components (`Hero`, `Services`,
  `Locations`, `Contact`, `pages/Machines`) superseded by the new route trees;
  existing `/machines/*`, `/about`, `/photos`, and the owner/admin dashboard
  are unchanged

### SEO / Performance basics
- Added per-route `<title>`/meta/OG tags via `react-helmet-async` for in-app
  navigation, plus a build-time static HTML injection step
  (`scripts/prerender-meta.cjs`) so link-preview bots and non-JS crawlers see
  real per-route metadata (the site is client-side-rendered only)
- Generated dedicated OG preview images for `/`, `/nightlife`, and `/cards`
  (`public/og/*.png`) — the `/cards` image avoids the nicotine-icon logo issue
- Replaced the 2.0 MB `favicon.png` with a proper generated favicon set
  (16/32/48/180/192/512 px) from the circle logo mark
- Added `sitemap.xml` and `robots.txt`
- Updated `firebase.json` hosting rewrites so `/nightlife` and `/cards` serve
  their own static `index.html` (with correct per-route meta) instead of
  falling through to the generic SPA shell

### Notes for Nick
- Compliance section copy on `/nightlife` (age verification, LA wholesale
  sourcing, taxes) is placeholder text — verify before this branch goes live
- `/cards` branding is a temporary text wordmark; swap in real cards-safe logo
  art (transparent background, no nicotine icons) when available

---

## 2026-04-21

### Infrastructure
- Upgraded Firebase project to Blaze (pay-as-you-go) plan to enable Storage uploads
- Set Firebase Storage security rules to allow authenticated users to read/write (required for statement PDF uploads)

---

## 2026-04-21

### Admin Portal
- Added Payment Status dropdown to Upload Statement form (Not Paid, Payment En Route, Paid)
- Added Payment Method dropdown to Upload Statement form (Zelle, ACH, Venmo, Check, Cash, Cashapp) — optional field

### Owner Portal
- Statements page now shows a color-coded payment status badge (red = Not Paid, yellow = En Route, green = Paid) and payment method for each statement

---

## 2026-04-20

### Admin Portal
- Renamed "Commission Rate" to "Venue Share (%)" across all admin forms
- Added "Share Based On" dropdown (Revenue / Profit) per venue — visible to venue owners on their dashboard
- Fixed bug where venue owner portal showed blank compliance data when the same email was used across two locations
- Fixed `AuthContext` to merge legacy `venueId` and newer `venueIds` fields so no venue is lost during owner reassignment
- Added inline code documentation explaining the `venueId` vs `venueIds` data model

---

## 2026-03-30

### Admin Portal
- Added multi-venue support — a single owner account can now be linked to multiple locations
- Replaced two-click venue deletion with a type-to-confirm dialog to prevent accidental deletions

---

## 2026-03-18

### Admin Portal
- Added editable internal notes field on venue detail page
- Added Retail Dealer Permit tracking: parish, issue date, and expiry date with status badge (Valid / Expiring Soon / Expired)

---

## 2026-03-17

### Admin Portal
- Moved Retail Dealer Permit to admin-only view (removed from owner portal)
- Added inline editing for contact name, phone, and commission rate on venue detail page
- Fixed email column always visible in admin Users table
- Removed duplicate statement history from My Machine tab in venue portal

### Owner Portal
- Added statement history table to the My Machine tab

---

## 2026-03-13

### Owner Portal
- Added Revenue performance page with full statement breakdown
- Removed compliance section from My Machine tab (moved to dedicated Compliance page)

---

## 2026-03-12

### Owner Portal
- Added Compliance section with links to all permit documents (RV license, contract, operator permit, machine permit)
- Added per-venue contract link visible to both admin and venue owner
- Switched Responsible Vendor License to a static file (`/rv-license.pdf`) instead of Firebase Storage upload

---

## 2026-03-11

### Public Site
- Updated page title and meta description for nightlife vending focus
- Removed Age Verification card from Services section
- Updated Locations section copy
- Switched Services grid to 3-column layout

---

## 2026-03-09

### Admin & Owner Portal
- Dashboard overhaul: dark mode, combined venue+owner account creation, owner linking from venue detail
- Added reCAPTCHA v3 to contact form

---

## 2026-03-08

### Admin & Owner Portal
- Added venue owner dashboard and admin panel (initial release)
- Added dark mode to dashboard

### Public Site
- Added Photos page as standalone route (`/photos`)
- Added lightbox to photo gallery with title pills
- Added 5 photos to gallery including Slim Wall in action
- Added WeatherWall machine page
- Added About page
- Added EmailJS contact form integration
- Added hero image carousel

---

## 2026-03-03

### Public Site
- Added detail pages for all 5 machine models
- Moved Machines section to homepage
- Updated machine content, AR viewer links, and section order

---

## 2026-03-02

### Public Site
- Added image carousels for all machine models (Slim Wall, Mega Wall, Mini Wall, Slim Tower, Slim Wall Tin Lift)
- Added Slim Wall detail page with specs and AR viewer link
- Fixed navbar links to route correctly back to homepage from any page
- Added Machines page with full VapeTM lineup
- Various copy updates: hero headline, Services cards, Why Choose Us section, About section, coverage area

---

## 2026-02-28

### Public Site
- Updated contact info: phone (504-252-1125), email (nicksvendingnola@gmail.com)
- Added LLC to footer copyright
- Updated product descriptions to reference Louisiana V.A.P.E. Directory and ATC compliance
- Various copy refinements across Services and hero sections

---

## 2026-02-27

### Public Site
- Initial commit — Nick's Vending website launched
