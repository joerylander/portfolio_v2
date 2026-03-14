# Component Specifications

All components are `.astro` files unless marked as React islands.
No component should ship JavaScript to the browser unless explicitly marked `client:*`.

---

## Nav.astro

**Props:** none (reads availability from API or hardcoded env var)

**Layout:** `sticky top-0`, flex row, space-between

- Left: logo (Fraunces, 19px)
- Center: three nav links (Work, About, Process)
- Right: availability pill + "Let's talk" button

**Availability pill:**

```html
<div class="avail-pill">
  <span class="avail-dot"></span>
  Available
</div>
```

**Active state:** Current page link gets `color: --fg` instead of `--muted`. Use `Astro.url.pathname` to determine active link.

**Mobile:** Hamburger menu at `md` breakpoint. Simple show/hide — no animation required for v1.

---

## Footer.astro

**Props:** none

**Layout:** flex row, space-between, `border-top`

- Left: "YourName — Web Developer" (Fraunces, muted)
- Right: links → GitHub, LinkedIn, CV, email

---

## HeroSection.astro

**Props:**

- `featuredProject: Project` — the project where `featured: true`

**Layout:** Two-column grid (`1fr 380px`), aligned to top

- Left: eyebrow tag, h1, subheading, two CTAs
- Right: `<FeaturedProject />` card

**Eyebrow tag:** horizontal rule (28px, accent colour) + mono label

**Headline:** Fraunces, 64px, weight 300, italic accent word in `--accent`

---

## FeaturedProject.astro

**Props:**

- `project: Project`

**Layout:** Card with image top, body bottom

- Image: `aspect-ratio: 16/10`, background `--accent-light`
- Body: "Featured project" tag (mono), title (15px 500), top result metric (green, ↑ prefix)

Entire card is a link to `/work/{project.slug}`.

---

## StatsBar.astro

**Props:**

- `stats: Array<{ value: string, label: string }>`

**Layout:** Four-column grid, single border wrapping all, `overflow: hidden`

- Each stat: `border-right` except last
- Hover: `background: --accent-light`
- Value: Fraunces, 36px, weight 300. Suffix (+ / yr / h) in accent colour, smaller size.
- Label: Geist, 12px, muted

Each stat cell now includes a third line below the label:

- `context`: string — a plain-English "why this matters" phrase

Example contexts:

- 40+ Projects → context: "across startups, agencies & small businesses"
- 100 Lighthouse avg. → context: "your site loads fast and ranks better"
- 12h First response → context: "you'll never be left waiting"
- 5yr Experience → context: "in web design and development"

Context line: Geist, 11px, `--muted`, `margin-top: 2px`

```
---

## LogoBar.astro

**Props:**

- `clients: string[]` — array of client name strings

**Layout:** Flex row, `gap-10`, `border-bottom`

- Label: Geist Mono, 11px, faint, uppercase
- Names: Geist, 13px, faint, weight 500

---

## ProjectCard.astro

**Props:**

- `project: Project`
- `featured?: boolean` — if true, renders wide two-column layout

**Standard layout:**

- Image block: `aspect-ratio: 16/9`, background `--bg`, border-bottom
- Body: tags, title (16px 500), description (13px muted), footer row (client+year left, result right in green)

**Featured layout (on /work index):**

- Two columns: image left (auto height), body right (centered vertically)
- Title: Fraunces, 26px, weight 300
- Adds "View case study →" link at bottom of body

Entire card is a link to `/work/{project.slug}`.
Hover: `border-color` darkened + `translateY(-3px)`

---

## ServicesGrid.astro

**Props:**

- `services: Array<{ number: string, title: string, description: string }>`

**Layout:** Three-column grid, gap-4

- Each card: `--card` bg, border, `rounded-xl`, `p-8`
- Number: Geist Mono, 11px, accent
- Title: 15px, weight 500
- Description: 13px, muted, `leading-relaxed`
- Hover: border-color transitions to `--accent`

---

## TestimonialBlock.astro

**Props:**

- `testimonial: Testimonial`

**Layout:** Dark background (`--fg`), `rounded-xl`, two-column grid (quote left, attribution right)

- Quote: Fraunces, 26px, weight 300, italic, white
- Right col: avatar circle, name (white, 13px 500), role (Geist Mono, 11px, white 40% opacity), five diamond decorations

---

## CtaBar.astro

**Props:**

- `available: boolean`
- `availabilityNote?: string`

**Layout:** `--accent-light` background, border accent 20% opacity, `rounded-xl`

- Left: headline (Fraunces, 42px, italic accent word)
- Right: availability note (Geist Mono, green dot) + primary button

---

## ResultsBar.astro

**Props:**

- `results: Array<{ value: string, label: string }>`

**Layout:** Three-column grid, `1px` gap, `--border` background, `rounded-xl overflow-hidden`

- Each cell: `--card` bg, centered text
- Value: Fraunces, 44px, weight 300, `--accent`
- Label: 12px, muted, `leading-snug`
- Hover: `--accent-light` background

---

## CaseStudySidebar.astro

**Props:**

- `testimonial: Testimonial`
- `timeline: Array<{ phase: string, duration: string }>`
- `deliverables: string[]`

**Layout:** Three stacked cards

**Card 1 — testimonial:**

- Dark background (`--fg`), `rounded-xl`
- Quote mark `"` in accent, Geist Mono, 32px
- Quote: Fraunces, 16px, italic, white
- Attribution: avatar circle + name + role

**Card 2 — timeline:**

- Standard card with header
- Each row: phase name left, duration right (Geist Mono, muted)
- Rows separated by `border-bottom`

**Card 3 — deliverables:**

- Standard card with header
- Each item: check circle (accent) + text
- Check circle: small circle, `--accent-light` bg, accent border, accent dot inside

---

## FilterBar.astro

**Props:**

- `tags: string[]` — all unique tags from all projects

**Behaviour:**

- Renders tag buttons including "All"
- On click, toggles `data-active` state on button and filters `.project-card` elements by `data-tags` attribute
- Minimal vanilla JS in a `<script>` tag inside the component
- No framework needed

**Active state:** `background: --fg, color: --card, border-color: --fg`
**Inactive state:** `border: 1px solid --border, color: --muted`

---

## PainPointSection.astro

**Props:** none (static copy)

**Layout:** Single column, centered, max-width 680px, `padding: 80px 0`

- Heading: Fraunces, 36px, weight 300, centered. Italic accent word on key phrase.
- Pain points: flex column, gap-4. Each item: flex row, gap-3.
  - Icon: small circle, `--accent-light` bg, accent border, `×` or `!` glyph in accent colour
  - Text: Geist, 14px, `--muted`
- Bridge line: Geist, 15px, weight 500, `--fg`, centered, `margin-top: 32px`

No hover states. No border. No card background.

---

## ContactForm.jsx _(React island)_

**Hydration:** `client:load`

**Fields:**

- Name (required)
- Email (required)
- Project description (textarea, required)
- Budget range (select, optional): Under €1k / €1k–5k / €5k–15k / €15k+

**Behaviour:**

- On submit: POST to `/api/contact` with JSON body
- Loading state: button shows "Sending…"
- Success state: replace form with thank-you message
- Error state: show inline error, re-enable form

**Styling:** Matches design system. Uses CSS variables. No Tailwind inside JSX — use inline styles or a CSS module to avoid purge issues with dynamic class names.

---

```
