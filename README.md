# Cradle — Portfolio Site

The marketing & portfolio site for **Cradle (Pty) Ltd**, a South African
technology studio (web, cloud, infrastructure, mobile). Built with **Angular 21**
(standalone components) as a static single-page site. This is the first,
front-end-only version — a fuller site with a backend will replace it later.

## Stack
- Angular 21 (standalone, signals)
- SCSS with a small design-token system (`src/styles.scss`)
- No backend yet — the contact form opens the visitor's email client

## Run locally
```bash
npm install
npm start          # ng serve -> http://localhost:4200
```

## Build
```bash
npm run build      # outputs to dist/cradle-portfolio/browser
```

## Deploy to Render (static site)

**Option A — Blueprint (recommended)**
1. Push this folder to a GitHub repo.
2. In Render: **New +** → **Blueprint** → select the repo. It reads `render.yaml`.
3. Deploy. Render runs `npm install && npm run build` and publishes
   `dist/cradle-portfolio/browser`.

**Option B — Manual static site**
1. Render: **New +** → **Static Site** → connect the repo.
2. Build command: `npm install && npm run build`
3. Publish directory: `dist/cradle-portfolio/browser`
4. Add a rewrite rule: Source `/*` → Destination `/index.html` (Action: Rewrite).
5. (Optional) Environment variable `NODE_VERSION = 22.12.0`.

## Before you go live — edit these
- **Contact email**: `contactEmail` in `src/app/app.ts` (currently a placeholder
  `hello@cradle.co.za`).
- **Selected work**: the `projects` array in `src/app/app.ts`. Add links, swap in
  your real projects, or remove the placeholder card.
- **Logo / favicon**: `public/cradle-logo.svg`.

## What's next (the comprehensive version)
- Split sections into feature components and add routing.
- Real contact endpoint (Spring Boot API) instead of `mailto:`.
- A CMS-backed work/blog section.
