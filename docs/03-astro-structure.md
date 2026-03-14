# Astro Project Structure

## Directory layout

```
src/
├── layouts/
│   └── Base.astro          # HTML shell, fonts, meta tags, nav, footer
│
├── pages/
│   ├── index.astro         # Homepage
│   ├── work/
│   │   ├── index.astro     # /work — project index
│   │   └── [slug].astro    # /work/[slug] — case study
│   ├── about.astro         # /about
│   └── contact.astro       # /contact
│
├── components/
│   ├── Nav.astro            # Sticky nav with availability pill + CTA
│   ├── Footer.astro         # Footer with name, links
│   ├── HeroSection.astro    # Homepage hero (two-col: headline + featured card)
│   ├── StatsBar.astro       # Four-stat grid (projects, years, lighthouse, response)
│   ├── LogoBar.astro        # "Worked with" client logos/names
│   ├── ProjectCard.astro    # Reusable card for /work index
│   ├── FeaturedProject.astro # Wide two-col featured card (homepage)
│   ├── ServicesGrid.astro   # Three-col services section
│   ├── TestimonialBlock.astro # Dark bg quote block
│   ├── CtaBar.astro         # Bottom CTA section (accent-light bg)
│   ├── ResultsBar.astro     # Three-col outcome metrics (case study)
│   ├── CaseStudySidebar.astro # Timeline + deliverables (case study)
│   ├── FilterBar.astro      # Tag filter buttons (/work index)
│   └── ContactForm.jsx      # React island — contact form with fetch
│
├── lib/
│   └── api.ts              # All fetch calls to Laravel API
│
└── env.d.ts                # Astro env type declarations
```

## Base layout (Base.astro)

Wraps every page. Accepts:
- `title: string` — page title
- `description: string` — meta description

Includes:
- Google Fonts link tag
- Tailwind CSS
- `<Nav />` component
- `<slot />` for page content
- `<Footer />` component

## Page responsibilities

### index.astro (Homepage)
Fetches at build time:
- Featured project (first/pinned from API)
- Testimonial (first active)
- Stats (hardcoded or from API)

Sections in order:
1. `<HeroSection />` — headline + featured project card
2. `<StatsBar />` — four metrics
3. `<LogoBar />` — client names
4. Selected work (2–3 `<ProjectCard />` components)
5. `<ServicesGrid />`
6. `<TestimonialBlock />`
7. `<CtaBar />`

### work/index.astro
Fetches all projects at build time.
Renders `<FilterBar />` + grid of `<ProjectCard />` components.
Filter interaction handled client-side with minimal JS (no framework needed).

### work/[slug].astro
Uses `getStaticPaths()` to pre-render one page per project.
Fetches all projects once, passes correct one as prop.

Sections in order:
1. Back link
2. Case study header (headline + lead + meta card)
3. Hero image placeholder / actual image
4. `<ResultsBar />` — three outcome metrics
5. Body content (problem → what I did → outcome)
6. `<CaseStudySidebar />` — quote, timeline, deliverables
7. Next project block

### contact.astro
Static page. Contains `<ContactForm client:load />` as the only React island.
Form posts to `/api/contact` Astro API route.

## API route

```
src/pages/api/contact.ts   →  POST /api/contact
```

Receives form data, sends email via Resend (or similar).
Returns `{ ok: true }` or `{ ok: false, error: string }`.

## React island

`ContactForm.jsx` is the only client-side React component.
Hydrated with `client:load`.
All other components are `.astro` — zero JS shipped to browser.

## getStaticPaths pattern

```astro
---
// src/pages/work/[slug].astro
import { getAllProjects } from '../../lib/api'

export async function getStaticPaths() {
  const projects = await getAllProjects()
  return projects.map(project => ({
    params: { slug: project.slug },
    props: { project }
  }))
}

const { project } = Astro.props
---
```

## Environment variables

```
LARAVEL_API_URL=https://your-laravel-api.com
LARAVEL_API_TOKEN=your-read-only-token
RESEND_API_KEY=your-resend-key
VERCEL_DEPLOY_HOOK_URL=https://api.vercel.com/v1/integrations/deploy/...
```

All server-only. None exposed to the browser.
