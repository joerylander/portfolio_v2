# API Helper — lib/api.ts

This file centralises all fetch calls to the Laravel API.
All functions are async, run at build time only (inside Astro frontmatter), and use the server-side env variables.

## Full implementation

```typescript
// src/lib/api.ts

const BASE_URL = import.meta.env.LARAVEL_API_URL
const TOKEN    = import.meta.env.LARAVEL_API_TOKEN

async function apiFetch<T>(path: string): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: {
      'Authorization': `Bearer ${TOKEN}`,
      'Accept': 'application/json',
    },
  })

  if (!res.ok) {
    throw new Error(`API error: ${res.status} on ${path}`)
  }

  return res.json() as Promise<T>
}

// --- Projects ---

export async function getAllProjects(): Promise<Project[]> {
  return apiFetch<Project[]>('/api/projects')
}

export async function getFeaturedProject(): Promise<Project | null> {
  const projects = await getAllProjects()
  return projects.find(p => p.featured) ?? null
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  try {
    return await apiFetch<Project>(`/api/projects/${slug}`)
  } catch {
    return null
  }
}

// --- Testimonials ---

export async function getTestimonials(): Promise<Testimonial[]> {
  return apiFetch<Testimonial[]>('/api/testimonials')
}

export async function getFirstTestimonial(): Promise<Testimonial | null> {
  const testimonials = await getTestimonials()
  return testimonials[0] ?? null
}

// --- About ---

export async function getAboutContent(): Promise<AboutContent> {
  return apiFetch<AboutContent>('/api/about')
}
```

## Usage in Astro pages

```astro
---
// src/pages/index.astro
import { getFeaturedProject, getFirstTestimonial } from '../lib/api'

const featuredProject  = await getFeaturedProject()
const testimonial      = await getFirstTestimonial()
---
```

```astro
---
// src/pages/work/[slug].astro
import { getAllProjects } from '../../lib/api'
import type { Project } from '../../lib/api'

export async function getStaticPaths() {
  const projects = await getAllProjects()
  return projects.map((project: Project) => ({
    params: { slug: project.slug },
    props: { project }
  }))
}

const { project } = Astro.props
---
```

## Contact API route

```typescript
// src/pages/api/contact.ts
import type { APIRoute } from 'astro'

export const POST: APIRoute = async ({ request }) => {
  const body = await request.json()

  const { name, email, description, budget } = body

  if (!name || !email || !description) {
    return new Response(
      JSON.stringify({ ok: false, error: 'Missing required fields' }),
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    )
  }

  // Send via Resend (or any email provider)
  // const resend = new Resend(import.meta.env.RESEND_API_KEY)
  // await resend.emails.send({ ... })

  return new Response(
    JSON.stringify({ ok: true }),
    { status: 200, headers: { 'Content-Type': 'application/json' } }
  )
}
```

## Error handling principles
- `apiFetch` throws on non-2xx responses — let build fail loudly if API is down
- `getProjectBySlug` returns `null` on 404 — page can show graceful not-found state
- All functions return typed values — no `any` types
- Never expose the API token in client-side code — all fetches happen in Astro frontmatter or API routes

## Astro env type declarations

```typescript
// src/env.d.ts
/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly LARAVEL_API_URL: string
  readonly LARAVEL_API_TOKEN: string
  readonly RESEND_API_KEY: string
  readonly VERCEL_DEPLOY_HOOK_URL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
```
