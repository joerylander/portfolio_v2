# Design System

## Design philosophy
- Minimal and typographic — refined, not cold
- Outcome-focused copy throughout
- No tech jargon visible to clients
- Warm accent colour to add personality without being loud
- Fast load, high Lighthouse score — the site itself is a demonstration of skills

## Colour palette

```css
--bg:           #f7f5f0;   /* warm off-white page background */
--card:         #ffffff;   /* card / surface background */
--fg:           #1c1b18;   /* primary text, buttons */
--muted:        #8a8880;   /* secondary text, labels */
--faint:        #c5c3bc;   /* tertiary text, dividers */
--accent:       #c17b3f;   /* warm amber — CTAs, highlights, numbers */
--accent-light: #f5ede3;   /* amber tint — backgrounds, hover states */
--border:       rgba(28,27,24,0.08); /* subtle borders */
```

Dark mode is not required for v1.

## Typography

| Role | Font | Weight | Size |
|---|---|---|---|
| Headlines / display | Fraunces (serif) | 300–400 | 48–64px |
| Body text | Geist (sans) | 400 | 14–16px |
| Subtitles / UI labels | Geist (sans) | 500 | 13–15px |
| Monospace labels, tags, meta | Geist Mono | 400 | 11–13px |

Load via Google Fonts:
```
https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,400;1,9..144,300;1,9..144,400&family=Geist:wght@300;400;500&family=Geist+Mono:wght@400&display=swap
```

## Spacing scale
Use Tailwind's default spacing scale. Key values:
- Page horizontal padding: `px-[52px]` (custom) or `px-12` on mobile → `px-16` on desktop
- Section vertical padding: `py-16` to `py-20`
- Card padding: `p-7` to `p-10`
- Gap between cards: `gap-4`

## Border radius
- Cards: `rounded-xl` (12px)
- Buttons: `rounded-md` (6px)
- Tags/pills: `rounded-md` (6px)
- Availability pill: `rounded-full`

## Shadows
None. Use `border` for card separation instead.

## Cards
```
background: var(--card)
border: 1px solid var(--border)
border-radius: rounded-xl
transition: border-color 0.2s, transform 0.2s
hover: border darkened slightly + translateY(-2px) or (-3px)
```

## Tags / pills
```
font: Geist Mono, 11px
color: --muted
background: --bg
border: 1px solid --border
padding: 3px 8px
border-radius: rounded-md
```

Accent variant (e.g. "Featured"):
```
color: --accent
background: --accent-light
border: 1px solid rgba(193,123,63,0.2)
```

## Buttons

Primary:
```
background: --fg
color: --card
padding: 13px 28px
border-radius: rounded-md
font-size: 13px
font-weight: 500
hover: opacity-85
```

Ghost / text link:
```
color: --muted
font-size: 13px
trailing arrow: →
hover: color --fg, arrow shifts right 3px
```

## Result / metric colours
- Positive outcomes (↑ conversion, ↓ load time): `#5cb85c` (green)
- Availability dot: `#5cb85c`

## Section eyebrow labels
```
font: Geist Mono
size: 11px
color: --accent
text-transform: uppercase
letter-spacing: 0.1em
preceded by: short horizontal rule (20–28px, colour --accent)
```

## Dividers
`1px solid var(--border)` — horizontal only, no vertical dividers between text columns.

## Availability pill (nav)
```
font: Geist Mono, 11px
color: --muted
background: --card
border: 1px solid --border
padding: 5px 12px
border-radius: rounded-full
left element: 6px circle, background #5cb85c
```
