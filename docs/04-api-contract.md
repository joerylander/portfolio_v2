# Laravel API Contract

## Base URL
Stored in env: `LARAVEL_API_URL`

## Authentication
All requests use a read-only Bearer token:
```
Authorization: Bearer {LARAVEL_API_TOKEN}
Accept: application/json
```

---

## Endpoints

### GET /api/projects
Returns all published projects, ordered by `display_order` ascending.

**Response:**
```json
[
  {
    "slug": "analytics-dashboard-redesign",
    "title": "Analytics dashboard redesign",
    "summary": "Rebuilt the marketing site and onboarding flow for a B2B analytics SaaS.",
    "client": "Bright SaaS",
    "industry": "SaaS",
    "year": 2024,
    "featured": true,
    "tags": ["SaaS", "E-commerce", "Agency", "Small business"],
    "thumbnail_url": "https://cdn.example.com/projects/bright-saas-thumb.jpg",
    "hero_image_url": "https://cdn.example.com/projects/bright-saas-hero.jpg",
    "results": [
      { "value": "34%", "label": "Fewer signups abandoned the onboarding flow" },
      { "value": "4×",  "label": "Faster page loads than the previous site" },
      { "value": "2wk", "label": "Delivered ahead of schedule" }
    ],
    "result_preview": "↑ 34% conversion"
  }
]
```

---

### GET /api/projects/{slug}
Returns a single project with full case study content.

**Response:**
```json
{
  "slug": "analytics-dashboard-redesign",
  "title": "Analytics dashboard redesign",
  "summary": "Rebuilt the marketing site and onboarding flow for a B2B analytics SaaS.",
  "client": "Bright SaaS",
  "industry": "SaaS",
  "project_type": "Website redesign + CMS",
  "year": 2024,
  "duration_weeks": 8,
  "delivered_note": "2 weeks ahead of schedule",
  "featured": true,
  "tags": ["SaaS", "Astro", "Laravel"],
  "thumbnail_url": "https://cdn.example.com/projects/bright-saas-thumb.jpg",
  "hero_image_url": "https://cdn.example.com/projects/bright-saas-hero.jpg",
  "results": [
    { "value": "34%", "label": "Fewer signups abandoned the onboarding flow" },
    { "value": "4×",  "label": "Faster page loads than the previous site" },
    { "value": "2wk", "label": "Delivered ahead of schedule" }
  ],
  "result_preview": "↑ 34% conversion",
  "body": {
    "problem": "Bright SaaS had grown their product significantly, but their website hadn't kept up...",
    "approach": "I redesigned the marketing site from the ground up with two goals...",
    "outcome": "Within the first month after launch, signup drop-off fell from 61% to 27%..."
  },
  "images": {
    "before_url": "https://cdn.example.com/projects/bright-saas-before.jpg",
    "after_url": "https://cdn.example.com/projects/bright-saas-after.jpg"
  },
  "timeline": [
    { "phase": "Discovery & planning", "duration": "1 week" },
    { "phase": "Design",              "duration": "2 weeks" },
    { "phase": "Build",               "duration": "3 weeks" },
    { "phase": "CMS setup",           "duration": "1 week" },
    { "phase": "QA & launch",         "duration": "1 week" }
  ],
  "deliverables": [
    "Redesigned marketing site (6 pages)",
    "Simplified signup & onboarding flow",
    "Content management dashboard",
    "Mobile-optimised across all pages",
    "Team handover & documentation"
  ],
  "testimonial": {
    "quote": "Delivered ahead of schedule and the site outperformed our previous one within the first month.",
    "author": "Sarah Müller",
    "role": "CEO, Bright SaaS",
    "avatar_url": null
  },
  "next_project": {
    "slug": "retail-brand-web-presence",
    "title": "Retail brand web presence",
    "result_preview": "↓ Load time from 4s to 0.9s"
  }
}
```

---

### GET /api/testimonials
Returns active testimonials ordered by `display_order`.

**Response:**
```json
[
  {
    "quote": "Delivered two weeks ahead of schedule and the site outperformed our previous one.",
    "author": "Sarah Müller",
    "role": "CEO",
    "company": "Bright SaaS",
    "avatar_url": null
  }
]
```

---

### GET /api/about
Returns about page content.

**Response:**
```json
{
  "headline": "I build websites that work as hard as you do.",
  "bio_paragraphs": [
    "I'm a freelance web developer based in...",
    "I've spent the last 5 years working with..."
  ],
  "availability_status": true,
  "availability_note": "Currently taking on new projects from June 2025"
}
```

---

## Laravel Resource guidelines

Keep API responses intentionally shaped for the frontend. Do not expose raw Eloquent model dumps.

Key rules:
- Always return `snake_case` keys
- Always return absolute URLs for media (not relative paths)
- Use Spatie Media Library for `thumbnail_url`, `hero_image_url`, `avatar_url`
- Null is acceptable for optional image fields — frontend handles gracefully
- `featured: true` on exactly one project at a time — used for homepage hero card
- `display_order` integer on projects controls sort order

## Webhook (rebuild trigger)

Laravel fires `POST {VERCEL_DEPLOY_HOOK_URL}` with no body when:
- A project is published or updated
- A testimonial is toggled active/inactive
- About content is saved

Suggested implementation: model observer or dedicated `PublishListener` event.

```php
// In observer or listener
Http::post(config('services.vercel.deploy_hook_url'));
```
