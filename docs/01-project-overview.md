# Portfolio Website — Project Overview

## What this is
A freelance web developer portfolio website. The goal is to convert visitors into paying clients — not to impress other developers. Every design and copy decision should be evaluated against that goal.

## Target audience
- Small businesses (primary)
- Creative and digital agencies (primary)
- SaaS startups (secondary)

These are non-technical or semi-technical clients. They understand outcomes, timelines, and business results. They do not care about tech stacks.

## Core conversion principle
Every page should answer one question fast: **"Can this person solve my problem?"**

- Lead with outcomes, not process
- Lead with results, not technologies
- Use plain language — no jargon
- Make contact as frictionless as possible

## Tech stack
- **Frontend**: Astro (static site generator, near-zero JS by default)
- **Backend/CMS**: Laravel (custom-built, exposes REST API)
- **Styling**: Tailwind CSS
- **Deployment**: Vercel (frontend), separate server (Laravel API)
- **Fonts**: Fraunces (serif, headlines) + Geist (sans, body) + Geist Mono (labels/code)

## Site structure
```
/ ..................... Homepage
/work ................. Project index
/work/[slug] .......... Individual case study
/about ................ About page
/contact .............. Contact page
```

## Data sources
All content is fetched from the Laravel CMS API at build time unless noted otherwise.
- Projects → `GET /api/projects`
- Single project → `GET /api/projects/{slug}`
- Testimonials → `GET /api/testimonials`
- About content → `GET /api/about`

API requires a Bearer token stored in `.env` as `LARAVEL_API_TOKEN`.
API base URL stored in `.env` as `LARAVEL_API_URL`.

## Rebuild trigger
Laravel fires a POST webhook to `VERCEL_DEPLOY_HOOK_URL` on content publish/update.
This triggers a fresh Astro build on Vercel, keeping static content up to date.
