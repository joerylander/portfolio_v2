# Pages — Content & Copy Guide

## General copy rules

- Write for the client, not other developers
- Lead with the outcome, not the method
- No tech stack names in client-facing copy (they belong in the narrative only when they explain a benefit)
- Availability status should appear in the nav and the CTA section on every page
- All result metrics use plain language labels — e.g. "Fewer signups abandoned" not "Conversion rate improvement"

---

## Homepage (/)

### Nav

- Logo: Your name (serif font)
- Links: Work · About · Process
- Right side: Availability pill + "Let's talk" CTA button

### Hero section

Two-column layout — headline left, featured project card right.

**Copy hierarchy note:** The subheading (who you help) must appear
immediately after the H1 — before any other body copy. It is the
second thing the eye lands on, not the third.

**Eyebrow tag:** `Freelance web developer`

**Headline options (pick one, make it yours):**

- "Websites that work as hard as you do."
- "Building sites that convert and perform."
- "Fast websites. Clean code. Real results."

**Subheading:** One sentence. Who you help + what you do + implied outcome.
Example: "I help startups, agencies, and small businesses ship fast, polished web experiences — from first sketch to production deployment."

**CTAs:** Primary → "View my work" | Ghost → "How I work"

**Featured card (right column):**

- Pulls from API: project where `featured: true`
- Shows: thumbnail, tag "Featured project", title, top result metric

### Stats bar

Four stats in a grid. Hover changes background to accent-light.

Suggested values (update to match your actual experience):
| Stat | Label |
|---|---|
| 40+ | Projects delivered |
| 5yr | Experience |
| 100 | Lighthouse avg. |
| 12h | First response |

### Logo bar

Label: "Worked with"
Show 4–5 client names in muted text. No logos needed — names only.

### Selected work

Show 2–3 projects (not all of them). Pull from API, display newest/strongest first.
Each card shows: image, tags, title, one-line description, client + year, result metric.

### Pain point section

Insert between the Stats bar and the Services grid.

**Heading:** "A good-looking website that nobody acts on is just expensive decoration."

Three short pain points (icon + text layout, no numbered list):

- Your site looks professional, but enquiries aren't coming in
- You're not sure what to fix or where the problem is
- You've invested time and money, but it still doesn't convert

**Bridge line beneath:** "That's exactly the problem I solve."

No background colour change — same --bg as surrounding sections.

### Services grid (three columns)

Do not list technologies. Focus on what the client gets.

Suggested services:

1. **Web design & development** — Fast, accessible, pixel-perfect sites built to convert visitors, not just impress them.
2. **CMS & API integration** — Headless CMS setups, API integrations, and custom backends that give your team full content control.
3. **Performance & Core Web Vitals** — Lighthouse scores, image pipelines, edge caching — speed treated as a feature, not an afterthought.

### Testimonial block

(moved to appear after Services grid — before CTA bar)
Dark background (--fg). Pull first active testimonial from API.
Show: quote (serif italic), avatar circle, name, role/company.

Note: This section already existed but was not given a fixed position.
It must render AFTER ServicesGrid and BEFORE CtaBar.

### CTA bar

Background: --accent-light, border: accent at 20% opacity.

**Headline:** "Got a project in mind?" or "Let's build something together."
**Right side:** Availability note + "Start a conversation" button

---

## Work index (/work)

### Page header

**Eyebrow:** `Selected work`
**Headline:** "Projects that moved the needle." _(or your own version)_
**Subheading:** One sentence about the range of work and focus on outcomes.

### Filter bar

Tags pulled from all project tags in API. Includes "All" as default.
Client-side JS filters visible cards — no page reload.

### Project grid

- First project: featured card (full width, two-column layout)
- Remaining: standard two-column grid
- Each card: image, tags, title, description, client + year, result metric
- "View case study →" link on featured card

---

## Case study (/work/[slug])

### Back link

← All projects (links to /work)

### Header (two-column)

Left:

- Eyebrow: `Case study — {industry}`
- Headline: Project title with italic accent word
- Lead paragraph: Client problem in plain language + what you did + what changed. No tech names.

Right (meta card — client-focused):
| Label | Value |
|---|---|
| Client | Company name |
| Industry | e.g. B2B Software |
| Project type | e.g. Website redesign + CMS |
| Timeline | e.g. 8 weeks |
| Delivered | e.g. 2 weeks ahead of schedule _(green text)_ |

### Hero image

Full-width image of the project (before/after or final result).
Falls back to a styled placeholder if no image available.

### Results bar (three columns)

Pull from `project.results` array.
Each cell: large serif number (accent colour) + plain English label below.
Hover state: accent-light background.

**Important:** Labels must be written in plain English.

- ✓ "Fewer signups abandoned the onboarding flow"
- ✗ "Signup conversion rate improvement"

### Body content (two-column: content + sidebar)

**Main content — three sections:**

1. **The problem** — Describe the client's situation before you started. Focus on business pain, not technical debt. What was it costing them?

2. **What I did** — Describe your approach in terms of decisions and their rationale, not tools used. Tech can appear here only if it directly explains a client benefit. E.g. "The team got a purpose-built dashboard where updating a page takes minutes, not days" is better than "I built a headless CMS with Laravel."

3. **The outcome** — Concrete results with numbers where possible. What changed for the client after launch?

**Sidebar (three cards):**

1. Client quote (dark background card) — from `project.testimonial`
2. Timeline — phase names + durations from `project.timeline`
3. Deliverables — checklist from `project.deliverables`

### Next project block

Dark background. Shows next project title + its top result metric.
Links to `/work/{next_slug}`.

---

## About (/about)

Keep this client-focused, not CV-focused.

Structure:

1. Who you are + what you care about (1–2 paragraphs)
2. How you work — brief process overview (3 steps max, not a detailed methodology)
3. Availability status
4. Link to contact

**Avoid:** lists of technologies, job history timelines, education unless directly relevant.
**Include:** what kinds of clients you work best with, what you're like to work with, how you communicate.

---

## Contact (/contact)

Keep it minimal. The goal is zero friction.

- Short headline: "Let's talk about your project."
- One or two sentences setting expectations (response time, what to include)
- Contact form with: Name, Email, Brief project description, Budget range (optional)
- Direct email link as an alternative to the form
- Repeat availability status
