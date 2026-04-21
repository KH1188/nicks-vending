# Changelog

All notable changes to Nick's Vending are documented here.
Entries are grouped by date, newest first.

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
