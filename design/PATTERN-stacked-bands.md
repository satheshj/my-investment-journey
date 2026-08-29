---
name: "Stacked Hero Bands"
description: "Full-bleed horizontal sections stacked floor-to-ceiling, alternating between plain surface and a diagonal-stripe band. No vertical grid — the rhythm comes from the section heights and the hard hairline between them."
tags: [layout, hero, "full-bleed", rhythm]
type: pattern
container: "full-bleed"
content_max_width: 1200px
page_padding: 0px
grid:
  columns:     0
  max_columns: 0
  line_color:  transparent
  line_width:  0px
  line_style:  solid
  edge_lines:  false
sections:
  padding_y:      160px
  divider_color:  "rgba(15, 15, 15, 0.12)"
  divider_width:  1px
  divider_style:  solid
  band_fill:      "repeating-linear-gradient(135deg, rgba(15,15,15,0.045) 0 1px, transparent 1px 10px)"
intersections:
  style: none
  color: transparent
  size:  0px
design:
  colors:
    ink:      "#1a1817"
    surface:  "#ede9e3"
    accent:   "#d94a2b"
    muted:    "#7a746e"
    hairline: "#cfc8be"
  fonts:
    display: Archivo
    body:    Archivo
    mono:    "JetBrains Mono"
  radius: 4px
  google_fonts_url: "https://fonts.googleapis.com/css2?family=Archivo:wght@400;500;600;800;900&family=JetBrains+Mono:wght@400;500&display=swap"
---

# Stacked Hero Bands

## AI Build Instructions

> **Read this section before writing any code.** The rules below
> are non-negotiable. Every value used in the UI must come from this
> file's frontmatter — never substitute, approximate, or invent new
> colors, fonts, radii, or shadows. If a value is missing, ask the
> user before adding one.

### 1 · Your role

You are building UI for a project that has adopted **Stacked Hero Bands** as its
design system. Treat `PATTERN.md` as the single source of truth.
Your job is to translate the user's product requirements into
components and pages that look like they were designed by the same
person who authored this file.

### 2 · Token compliance

- Pull every color, font family, radius, shadow, and spacing value
  from the frontmatter at the top of this file.
- Use semantic roles (e.g. `primary`, `accent`, `muted`) — never
  hard-code hex values that bypass the system.
- When a token can be expressed as a CSS variable, declare it once
  in your global stylesheet and reference it everywhere downstream.
- The Google Fonts `<link>` is provided in the Typography section.
  Add it to `<head>` before any component renders.

### 3 · Build recipes

#### Page skeleton (the layout contract)

- Container: `full-bleed`
- Content max-width: `1200px` (typography respects this even when the page is full-bleed).
- Vertical grid: **0 column hairlines**, drawn with `0px solid transparent`.
- Section padding: `160px` top + bottom inside every section.
- Section divider: `1px solid rgba(15, 15, 15, 0.12)` between sections.
- Use the diagonal-stripe band fill **at most once per page** as a section opener.

#### Primary CTA

Exactly **one** primary CTA per page or section. The pattern's discipline depends on this.

- Background: `#1a1817` · Color: `#ede9e3`
- Padding: `13px 24px` · Weight: `700`
- Shape: `sharp` (radius: `0px`)
- Uppercase, tracking: `0.06em`

#### Headlines

- Family: `Archivo` · Size: `clamp(2.75rem, 5vw, 4.25rem)` · Leading: `0.95` · Weight: `800`
- Tracking: `-0.04em`

#### Body copy

- Family: `Archivo` · Size: `1rem` · Leading: `1.55` · Color: `#7a746e`
- Max line length: 60–66 characters. Never let prose stretch the full content width.

#### Eyebrows / metadata

- Family: `JetBrains Mono` · Size: `0.6875rem` · Letter-spacing: `0.18em`
- Uppercased. Color: `#d94a2b`.

### 4 · Hard constraints

Never do any of the following without explicit instruction from the user:

- Introduce a new color, font, radius, or shadow that isn't declared above.
- Mix this system with another (e.g. don't paste in Material or Bootstrap defaults).
- Use generic gradient defaults (purple→blue, peach→pink) — they break the system's voice.
- Reach for emoji icons. Use a consistent icon library and size icons in line with body type.
- Add motion that exceeds the system's restraint — keep transitions short (≤200ms) and subtle.
- Break the layout contract: the column count, divider rhythm, and content max-width are part of the pattern.

### 5 · Before you finish — verify

Run through this checklist for every screen you produce:

- [ ] Every color used appears in the Colors table above.
- [ ] Headlines use the display font; body copy uses the body font.
- [ ] Buttons match one of the declared variants exactly (shape, padding, weight).
- [ ] Border-radius values come from `radius.sm` / `radius.md` / `radius.lg` / `radius.pill`.
- [ ] Cards and dividers use the declared border + shadow tokens.
- [ ] The page respects the pattern's grid (column count + content max-width).
- [ ] Section dividers use the declared color, width, and style.
- [ ] Exactly one primary CTA per section — never duplicate.
- [ ] No values were invented; if you needed something missing, you stopped and asked.

---

## Overview

Stacked Hero Bands is the inverse of a vertical-grid layout. There is no
column hairline anywhere on the page. Instead the entire visual rhythm comes
from full-bleed horizontal sections stacked floor-to-ceiling, alternating
between a plain surface and a band filled with a diagonal stripe pattern. A
single hairline divides each band from the next.

Each band is tall — 160px+ vertical padding — so it reads as a "floor" of the
page rather than a section. Content lives inside a centered max-width column
within each band, but the band itself bleeds to the viewport edges. The
diagonal-stripe fill on alternating bands gives the page a steady "ledger" or
"engineered surface" texture without ever crowding the content.

## When to use it

- Marketing homepages where each section is a discrete idea.
- Product pages where features stack as parallel arguments.
- Brand pages and case studies that benefit from a strong horizontal rhythm.
- Anywhere "calibrated instrument" is the desired feel but the system already
  has a complex column structure that would clash with vertical hairlines.

## When to avoid it

- Long documentation or article pages — the tall bands waste vertical space
  and break reading rhythm.
- Dashboards and app surfaces — the alternating fills compete with data.
- Pages with full-bleed photography, since the photo wants to be the band.

## Do

- Hold the diagonal-stripe alpha at 4–5% foreground. Past that the texture
  becomes graph paper and overpowers the content.
- Use the same diagonal angle (135°) throughout. Mixing angles destroys the
  rhythm.
- Keep the divider hairline at 10–14% foreground alpha so the band-to-band
  transition reads as architecture.
- Alternate strictly: plain → band → plain → band. Two plain bands in a row
  read as a layout mistake.

## Don't

- Don't introduce a vertical column hairline — the whole point of this pattern
  is horizontal-only rhythm.
- Don't change the stripe angle, spacing, or alpha between bands. Consistency
  is the entire device.
- Don't shrink the section padding below 96px. The bands need height to read
  as floors rather than rows.
- Don't stack three or more bands in a row without a plain surface between
  them. The texture loses meaning.

## Notes

- The diagonal-stripe band can be replaced with any subtle texture (cross-hatch,
  dot grid, halftone) as long as it stays at 4–5% foreground alpha and uses a
  single repeating angle.
- The pattern composes with any color system. The hairline divider and stripe
  fill should be derived from the system foreground so the rhythm carries the
  system tone.
- Pair with bold display type — the bands give large headlines room to breathe.

---

## Tokens

> Generated from the same source the live preview renders from.
> Treat the values below as the contract — never substitute approximations.

### Container

| Property | Value |
|----------|-------|
| container | `full-bleed` |
| contentMaxWidth | `1200px` |
| pagePadding | `0px` |

### Vertical Grid

| Property | Value |
|----------|-------|
| columns | `0` |
| maxColumns | `0` |
| lineColor | `transparent` |
| lineWidth | `0px` |
| lineStyle | `solid` |
| edgeLines | `false` |

### Section Dividers

| Property | Value |
|----------|-------|
| paddingY | `160px` |
| dividerColor | `rgba(15, 15, 15, 0.12)` |
| dividerWidth | `1px` |
| dividerStyle | `solid` |
| bandFill | `repeating-linear-gradient(135deg, rgba(15,15,15,0.045) 0 1px, transparent 1px 10px)` |

### Intersections

| Property | Value |
|----------|-------|
| style | `none` |
| color | `transparent` |
| size | `0px` |

## Design Identity

> This pattern ships with its own typography, color, and CTA tokens.
> Use the values below verbatim — they are the system, not a starting point.

### Colors

| Token | Value |
|-------|-------|
| ink (primary text) | `#1a1817` |
| surface (page background) | `#ede9e3` |
| accent (single moment per page) | `#d94a2b` |
| muted (metadata, captions) | `#7a746e` |
| hairline (rules and dividers) | `#cfc8be` |

### Typography

Load via Google Fonts:

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Archivo:wght@400;500;600;800;900&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
```

| Role | Family |
|------|--------|
| display (headlines) | `Archivo` |
| body (prose) | `Archivo` |
| mono (metadata, numerals) | `JetBrains Mono` |

### Type Scale

| Role | Size | Leading | Weight | Tracking |
|------|------|---------|--------|----------|
| Hero / H1 | `clamp(2.75rem, 5vw, 4.25rem)` | `0.95` | `800` | `-0.04em` |
| Body | `1rem` | `1.55` | `400` | — |
| Eyebrow | `0.6875rem` | — | `600` | `0.18em` |

### Primary CTA

| Property | Value |
|----------|-------|
| shape | `sharp` |
| background | `#1a1817` |
| color | `#ede9e3` |
| padding | `13px 24px` |
| fontWeight | `700` |
| uppercase | `true` |
| tracking | `0.06em` |
| radius | `0px` |

> One CTA per page. The pattern's discipline depends on this — never duplicate.

---

## Reference Implementation

Copy-paste-ready HTML + CSS that renders this pattern with the exact token
values declared above. Theme the colors against your system's hairline tone.

### HTML

```html
<div class="page">
  <section class="band band--plain">
    <div class="content">
      <h1>Hero headline lives here.</h1>
      <p>The first band is plain — bleed-to-bleed surface with no texture.</p>
    </div>
  </section>

  <section class="band band--stripe">
    <div class="content">
      <h2>Second band carries the diagonal texture.</h2>
      <p>Alternating bands give the page its rhythm.</p>
    </div>
  </section>

  <section class="band band--plain">
    <div class="content">
      <h2>Third band returns to plain surface.</h2>
    </div>
  </section>

  <section class="band band--stripe">
    <div class="content">
      <h2>Fourth band carries the texture again.</h2>
    </div>
  </section>
</div>
```

### CSS

```css
:root {
  --content-max:  1200px;
  --section-y:    160px;
  --divider:      rgba(15, 15, 15, 0.12);
  --stripe-fill:  repeating-linear-gradient(
    135deg,
    rgba(15, 15, 15, 0.045) 0 1px,
    transparent 1px 10px
  );
}

.page { position: relative; }

/* Each band is full-bleed and tall. Hairline divider on the bottom. */
.band {
  width: 100%;
  padding: var(--section-y) 0;
  border-bottom: 1px solid var(--divider);
}

/* Alternating fill — plain surface vs diagonal-stripe texture. */
.band--plain  { background: transparent; }
.band--stripe { background-image: var(--stripe-fill); }

/* Content stays inside a centered max-width column. */
.content {
  max-width: var(--content-max);
  margin: 0 auto;
  padding: 0 32px;
}

.content h1 { font-size: clamp(2.5rem, 5vw, 4.5rem); line-height: 1.05; }
.content h2 { font-size: clamp(1.75rem, 3vw, 2.5rem); line-height: 1.15; }
.content p  { max-width: 60ch; line-height: 1.65; margin-top: 16px; }

/* Mobile: shorter bands, narrower padding. The alternation still reads. */
@media (max-width: 768px) {
  .band { padding: 96px 0; }
  .content { padding: 0 24px; }
}
```
