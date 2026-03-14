# Agent Instructions

You are building a freelance web developer portfolio website. Read all documents in this folder before writing any code.

## Document index

| File                        | What it covers                                            |
| --------------------------- | --------------------------------------------------------- |
| `01-project-overview.md`    | Goals, audience, tech stack, site structure, data sources |
| `02-design-system.md`       | Colours, typography, spacing, component visual rules      |
| `03-astro-structure.md`     | File/folder layout, page responsibilities, component list |
| `04-api-contract.md`        | Laravel API endpoints and exact response shapes           |
| `05-pages-content-guide.md` | Copy rules, section-by-section content for each page      |
| `06-component-specs.md`     | Props, layout, behaviour for every component              |
| `07-api-helpers.md`         | `lib/api.ts` implementation and usage patterns            |

## Key principles — never violate these

1. **Client-first copy** — No tech stack names in client-facing text. Outcomes and plain language only.

2. **Zero JS by default** — Every component is `.astro` unless it genuinely requires client-side interactivity. Only `ContactForm.jsx` uses `client:load`. Everything else is static HTML.

3. **Build-time data fetching** — All API calls go in Astro frontmatter (`---` block) or `getStaticPaths()`. Never `fetch()` in the browser unless inside the React island.

4. **Design system is law** — Use the colours, fonts, and spacing from `02-design-system.md`. Do not invent new colours or font sizes. Do not use Inter, Roboto, or system fonts.

5. **API contract is fixed** — The Laravel API returns the shapes defined in `04-api-contract.md`. Do not reshape data in the frontend — render it as received.

6. **Results metrics use plain English labels** — Never render a metric label that sounds like an analytics dashboard. Write for a non-technical reader.

7. **Types live in model files** — Never define TypeScript types or interfaces
   inline inside component files, page files, or `lib/api.ts` logic. All types
   belong in dedicated model files under `src/models/`. Import from there.

   File naming convention:
   - `src/models/project.ts` → Project, Result, TimelineItem types
   - `src/models/testimonial.ts` → Testimonial type
   - `src/models/contact.ts` → ContactFormData, ContactResponse types

   Example:
   // ✓ correct
   import type { Project } from '@/models/project'

   // ✗ wrong — type defined inline in a component
   type Project = { slug: string; title: string }

8. **Prefer native Tailwind classes over arbitrary values** — Always use
   Tailwind's built-in scale before reaching for arbitrary `[]` syntax.
   Arbitrary values are only permitted when the design system requires a
   value that genuinely has no Tailwind equivalent.

   Common cases to avoid:
   - ✗ `text-[36px]` → ✓ `text-4xl` (or nearest scale match)
   - ✗ `text-[12px]` → ✓ `text-xs`
   - ✗ `text-[13px]` → ✓ `text-sm`
   - ✗ `text-[15px]` → ✓ `text-base` or `text-sm`
   - ✗ `p-[32px]` → ✓ `p-8`
   - ✗ `gap-[16px]` → ✓ `gap-4`

   For responsive variants and pseudo-selectors, always check for a
   canonical Tailwind shorthand before writing a compound arbitrary selector:
   - ✗ `max-md:[&:nth-child(2)]:border-r-0` → ✓ `max-md:nth-2:border-r-0`
   - ✗ `[&:nth-child(odd)]:border-r` → ✓ `odd:border-r`

   If you're unsure whether a native class exists, default to the closest
   Tailwind spacing/typography scale value rather than an arbitrary one.

## Build order recommendation

1. Set up Astro project with Tailwind and Google Fonts
2. Create `src/env.d.ts` and `.env` with all variables
3. Implement `src/lib/api.ts`
4. Build `Base.astro` layout (fonts, meta, slot)
5. Build `Nav.astro` and `Footer.astro`
6. Build homepage section components (Hero, Stats, Logos, Services, Testimonial, CTA)
7. Wire up `index.astro` with API data
8. **camelCase always** — Use camelCase for all variable names, function names,
   props, and TypeScript type properties. Never use snake_case in TypeScript/
   Astro/JSX files. Note: API responses from Laravel use snake_case — map these
   to camelCase in `src/lib/api.ts` before they reach any component.
9. Build `ProjectCard.astro` and `FilterBar.astro`
10. Wire up `work/index.astro`
11. Build `ResultsBar.astro` and `CaseStudySidebar.astro`
12. Wire up `work/[slug].astro` with `getStaticPaths`
13. Build `ContactForm.jsx` (React island)
14. Create `src/pages/api/contact.ts`
15. Wire up `contact.astro`
16. Build `about.astro`
17. Final: test all pages, check Lighthouse score

## Assumptions

- Tailwind CSS is configured via `npx astro add tailwind`
- React integration is added via `npx astro add react` (for ContactForm only)
- Google Fonts are loaded in `Base.astro` via `<link>` tag in `<head>`
- All images from the API are absolute URLs — use them directly in `<img src={...} />`
- If an image URL is `null`, render a styled placeholder `<div>` with background `--accent-light`
- The Laravel API is running and accessible during `npm run build`

## What NOT to do

- Do not use `localStorage` or `sessionStorage`
- Do not add animations beyond subtle CSS transitions (hover states, translateY on cards)
- Do not use any UI component library (no shadcn, no DaisyUI) — build from CSS only
- Do not add a dark mode toggle for v1
- Do not add a blog section for v1
- Do not use `client:load` on anything except `ContactForm.jsx`
- Do not hardcode project data — it must come from the API
- Do not expose `LARAVEL_API_TOKEN` to the browser under any circumstance
- Do not use snake_case in any TypeScript, Astro, or JSX file —
  map API snake_case fields to camelCase in `lib/api.ts`
- Do not define types inside component, page, or helper files —
  always import from `src/models/`
- Do not use arbitrary Tailwind values like `text-[36px]` or `p-[32px]`
  when a native utility class exists — use the Tailwind scale
- Do not write compound arbitrary selectors like `[&:nth-child(2)]`
  when Tailwind has a canonical variant for it
