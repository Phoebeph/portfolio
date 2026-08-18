# Portfolio

A personal portfolio site built with Astro, React, TypeScript, Tailwind CSS, and Sanity.

## Stack

- **[Astro](https://astro.build)** — static site generation, islands architecture
- **React** — used for exactly one interactive component (mobile nav); everything else ships zero JS
- **TypeScript** — strict mode
- **Tailwind CSS v4** — CSS-first config, see `src/styles/global.css`
- **[Sanity](https://sanity.io)** — headless CMS for Profile, Projects, Experience, Articles (`studio/`)
- **Playwright** — structural, interaction, and accessibility (axe) tests

## Project structure

```
.
├── src/                  # Astro site
│   ├── components/       # .astro components + the one React island (react/)
│   ├── data/skills.ts    # local, typed content (not in Sanity — see below)
│   ├── lib/sanity/       # Sanity client, GROQ queries, types
│   ├── layouts/
│   └── pages/index.astro
├── e2e/                  # Playwright tests
└── studio/               # Sanity Studio — separate app, own package.json
    └── schemaTypes/
```

Two independent apps in one repo: the Astro site (root) and Sanity Studio (`studio/`). They share no code — only a Sanity project ID/dataset connects them.

### What lives in Sanity vs. in code

Profile, Projects, Experience, and Articles are Sanity documents — editable without a code change or redeploy. Technical Skills is a local TypeScript file (`src/data/skills.ts`) — a fixed taxonomy that benefits more from type-checking and version control than editorial flexibility.

## Local development

Requires two dev servers running in parallel, in separate terminals.

**Site:**
```sh
npm install
cp .env.example .env   # fill in SANITY_PROJECT_ID
npm run dev             # http://localhost:4321
```

**Studio:**
```sh
cd studio
npm install
cp .env.example .env    # fill in SANITY_STUDIO_PROJECT_ID
npm run dev              # http://localhost:3333
```

## Other commands

| Command | Runs |
|---|---|
| `npm run build` | Production build to `dist/` |
| `npm run preview` | Serve the production build locally |
| `npm run check` | TypeScript diagnostics (Astro + React files) |
| `npm run test:e2e` | Playwright suite against a production build |

## Deployment

The site builds to static HTML (`output: 'static'` in `astro.config.mjs`) — no server runtime or adapter required. On Vercel/Netlify/similar: build command `npm run build`, output directory `dist`, with `SANITY_PROJECT_ID` and `SANITY_DATASET` set as environment variables.

Sanity Studio (`studio/`) is not part of this deployment — it runs locally, or can be deployed separately later with `npx sanity deploy`.
