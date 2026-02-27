# Nick's Vending — Website

Premium vending placement website built with **Vite + React + TypeScript + Tailwind CSS**, hosted on **Firebase Hosting**.

---

## Quick start

### Prerequisites

| Tool | Min version | Install |
|------|-------------|---------|
| Node.js | 18+ | https://nodejs.org |
| npm | 9+ | Bundled with Node |
| Firebase CLI | latest | `npm i -g firebase-tools` |

You also need your three brand assets in `~/Downloads` (Linux/Mac) or `%USERPROFILE%\Downloads` (Windows):

```
Nick's Vending Logo.png
Nick's Vending Business Card.png
Nick's Vending Finger Rule.png
```

---

## Run locally (one command)

**Linux / macOS:**
```bash
chmod +x run.sh deploy.sh
./run.sh
```

**Windows (PowerShell):**
```powershell
powershell -ExecutionPolicy Bypass -File .\run.ps1
```

This will:
1. `npm install` — install all dependencies
2. Copy assets from `~/Downloads` → `src/assets/`
3. `npm run build` — compile TypeScript + bundle with Vite
4. `npm run preview` — serve the built site at **http://localhost:4173**

---

## Development mode (hot reload)

After assets are copied once, you can use Vite's dev server:
```bash
npm run dev
```
Opens at **http://localhost:5173** with instant hot module replacement.

---

## Deploy to Firebase Hosting

### First-time Firebase setup (one-time only)

1. **Create a Firebase project** at https://console.firebase.google.com
2. **Authenticate:**
   ```bash
   firebase login
   ```
3. **Update `.firebaserc`** with your actual project ID:
   ```json
   {
     "projects": {
       "default": "YOUR_FIREBASE_PROJECT_ID"
     }
   }
   ```
   Or re-initialize hosting:
   ```bash
   firebase init hosting
   # Select your project, set "dist" as public directory,
   # configure as SPA (yes), do NOT overwrite dist/index.html
   ```

### Deploy

**Linux / macOS:**
```bash
./deploy.sh
```

**Windows:**
```powershell
powershell -ExecutionPolicy Bypass -File .\deploy.ps1
```

**Or via npm:**
```bash
npm run deploy
```

> First-time setup is already done. `.firebaserc` is wired to `nicks-vending`
> and Hosting is enabled on the project.

Your site is live at:
- **https://nicks-vending.web.app**
- **https://nicks-vending.firebaseapp.com**

Firebase console: https://console.firebase.google.com/project/nicks-vending/hosting

---

## Project structure

```
NicksVending/
├── src/
│   ├── assets/              ← Brand images (copied by run.sh)
│   │   ├── logo.png
│   │   ├── business-card.png
│   │   └── finger-rule.png
│   ├── components/
│   │   ├── Navbar.tsx
│   │   ├── Hero.tsx
│   │   ├── Services.tsx
│   │   ├── Locations.tsx
│   │   ├── Photos.tsx
│   │   ├── About.tsx
│   │   ├── Contact.tsx
│   │   └── Footer.tsx
│   ├── App.tsx
│   ├── index.css            ← Tailwind + global styles
│   └── main.tsx
├── index.html
├── firebase.json            ← Firebase Hosting config (public: dist)
├── .firebaserc              ← Firebase project ID
├── vite.config.ts
├── tailwind.config.ts
├── tsconfig.json
├── run.sh / run.ps1         ← One-command local setup + preview
└── deploy.sh / deploy.ps1  ← One-command deploy
```

---

## Adding real photos

Open `src/components/Photos.tsx` and:

1. Import your image at the top:
   ```tsx
   import myPhoto from '../assets/my-photo.jpg'
   ```
2. Set `src` on one of the `PHOTO_SLOTS` entries:
   ```tsx
   { id: 1, label: 'Lobby installation', src: myPhoto },
   ```

The grid automatically switches from shimmer placeholder to your photo.

---

## Customising content

| Section | File | What to edit |
|---------|------|--------------|
| Phone & email | `Contact.tsx` + `Footer.tsx` | Replace `(555) 000-0000` and `contact@nicksvending.com` |
| Services | `Services.tsx` | `SERVICES` array |
| Coverage areas | `Locations.tsx` | `AREAS` array |
| About copy | `About.tsx` | JSX paragraphs + `WHY_CHOOSE` array |
| Hero headline | `Hero.tsx` | `<h1>` block |
| Map | `Locations.tsx` | Replace the placeholder `<div>` with a `<iframe>` Maps embed |

---

## Troubleshooting

**`ERROR: Asset not found`** — Ensure the PNG files are in `~/Downloads` with the exact names shown above.

**`firebase: command not found`** — Run `npm install -g firebase-tools`.

**`firebase deploy` fails with "project not found"** — Update `.firebaserc` with your real project ID and re-run `firebase login`.

**Port 4173 already in use** — Change the port in `vite.config.ts`:
```ts
preview: { port: 5174 }
```

**TypeScript errors after editing** — Run `npx tsc --noEmit` to see the full error list.
