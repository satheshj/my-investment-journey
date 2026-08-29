---
name: "Maison Vox"
description: "Design-agency editorial in print mode. Oversized DM Serif Display headlines that nearly touch the gutter, asymmetric two-column body in Inter, a single tomato accent that lives only in the first letter of the H1 and the period of the CTA. Built for studio sites and case studies."
tags: [editorial, agency, minimal, premium, modern]
colors:
  primary:   "#101010"
  secondary: "#5a5a5a"
  tertiary:  "#101010"
  neutral:   "#f3efe7"
  surface:   "#fbf8f1"
typography:
  display: "DM Serif Display"
  body:    Inter
  mono:    "JetBrains Mono"
  scale:
    hero: "7rem / 0.94 / 400 / -0.045em"
    h1:   "4rem / 1 / 400 / -0.035em"
    h2:   "2rem / 1.15 / 400 / -0.02em"
    body: "1.0625rem / 1.65 / 400 / -0.005em"
radius:
  sm: 0px
  md: 0px
  lg: 0px
  pill: 9999px
shadows:
  card:   none
  button: none
borders:
  card:    "1px solid rgba(16,16,16,0.10)"
  divider: rgba(16,16,16,0.14)
buttons:
  primary:
    background: #101010
    color: #fbf8f1
    border: none
    shape: sharp
    padding: 14px 26px
    font: 500 / 0.875rem
  secondary:
    background: transparent
    color: #101010
    border: 1px solid #101010
    shape: sharp
    padding: 14px 26px
    font: 500 / 0.875rem
  outline:
    background: transparent
    color: #101010
    border: 1px solid rgba(16,16,16,0.18)
    shape: sharp
    padding: 14px 26px
    font: 500 / 0.875rem
  ghost:
    background: transparent
    color: #5a5a5a
    border: none
    shape: sharp
    padding: 14px 18px
    font: 500 / 0.875rem
charts:
  variant: "thin-bars"
  stroke_width: 1
  fill_opacity: 0
  gridlines: false
  bar_gap: 16px
  highlight: single
  dot_marker: false
fonts_url: "https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap"
dependencies: ["lucide-react"]
---

# Maison Vox

## AI Build Instructions

> **Read this section before writing any code.** The rules below
> are non-negotiable. Every value used in the UI must come from this
> file's frontmatter — never substitute, approximate, or invent new
> colors, fonts, radii, or shadows. If a value is missing, ask the
> user before adding one.

### 1 · Your role

You are building UI for a project that has adopted **Maison Vox** as its
design system. Treat `DESIGN.md` as the single source of truth.
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

### 3 · Component recipes

Use these recipes verbatim when building the corresponding component.

#### Buttons

Four variants are defined. Pick one — never blend variants or invent a fifth.

- **Primary** — sharp shape, bg `#101010`, text `#fbf8f1`, padding `14px 26px`, weight `500`.
- **Secondary** — sharp shape, text `#101010`, border `1px solid #101010`, padding `14px 26px`, weight `500`.
- **Outline** — sharp shape, text `#101010`, border `1px solid rgba(16,16,16,0.18)`, padding `14px 26px`, weight `500`.
- **Ghost** — sharp shape, text `#5a5a5a`, padding `14px 18px`, weight `500`.

Reach for **primary** as the single dominant CTA per screen.
**Secondary** for the supporting action. **Outline** for tertiary
actions in toolbars. **Ghost** for inline links and table actions.

#### Cards

- Background: `#fbf8f1`
- Border: `1px solid rgba(16,16,16,0.10)`
- Shadow: `none`
- Radius: `radius.lg` (`0px`)
- Internal padding: `20px` for compact cards, `24–28px` for content cards.

#### Tabs

Variant: `underline`. Flat row of labels. Active tab gets a 2px underline in the accent color — no fill.

#### Charts

- Bar/line variant: `thin-bars`
- No gridlines — let the bars/lines carry the data.
- Highlight strategy: `single` — emphasize a single bar/point per chart.

#### Typography pairings

- **Display (`DM Serif Display`)** — h1, h2, hero headlines, brand wordmarks.
- **Body (`Inter`)** — paragraphs, labels, button text, form inputs.
- **Mono (`JetBrains Mono`)** — code, eyebrows, metadata, numerals in tables.

### 4 · Hard constraints

Never do any of the following without explicit instruction from the user:

- Introduce a new color, font, radius, or shadow that isn't declared above.
- Mix this system with another (e.g. don't paste in Material or Bootstrap defaults).
- Use generic gradient defaults (purple→blue, peach→pink) — they break the system's voice.
- Reach for emoji icons. Use a consistent icon library and size icons in line with body type.
- Add motion that exceeds the system's restraint — keep transitions short (≤200ms) and subtle.

### 5 · Before you finish — verify

Run through this checklist for every screen you produce:

- [ ] Every color used appears in the Colors table above.
- [ ] Headlines use the display font; body copy uses the body font.
- [ ] Buttons match one of the declared variants exactly (shape, padding, weight).
- [ ] Border-radius values come from `radius.sm` / `radius.md` / `radius.lg` / `radius.pill`.
- [ ] Cards and dividers use the declared border + shadow tokens.
- [ ] No values were invented; if you needed something missing, you stopped and asked.

---

## 1. Atmosphere

Maison Vox is the visual language of a small design studio that publishes a print quarterly on the side. Headlines run in DM Serif Display at 112px — nearly touching the gutter — with negative tracking that compresses them into editorial bricks. Body sits in Inter at 17px on a 1.65 leading, set in two asymmetric columns. The page is warm bone `#fbf8f1`, never white, and the only color in the entire system is a single tomato `#e0432a` that appears as the first letter of the H1 and as the period after the CTA label. That's it.

The discipline is in the gestures: oversized type as the only ornament, sharp 0px radius everywhere, and a single colored character as the brand mark.

**Signature moves**
- DM Serif Display at 112px hero, 400 weight, -0.045em tracking — print-quarterly scale
- Tomato `#e0432a` used only on the first letter of the headline AND the period after the CTA — never as a fill
- Sharp 0px radius on every surface — buttons, cards, inputs
- Asymmetric two-column body (8/4 split) — the column rhythm IS the layout
- Italic display variant for pull quotes, never for emphasis in body

## 2. Palette

### Core
- **Ink** `#101010` — text, headings, button fill
- **Bone** `#fbf8f1` — page background (warm, not white)
- **Bone Lift** `#f3efe7` — secondary surfaces
- **Hairline** `rgba(16,16,16,0.10)` — section dividers

### Accent
- **Tomato** `#e0432a` — first letter of H1, period after CTA, marginalia number
- That is the entire color system. There is no second accent.

## 3. Typography

| Role | Font | Size | Weight | Leading | Tracking |
|------|------|------|--------|---------|----------|
| Hero | DM Serif Display | 112px | 400 | 0.94 | -0.045em |
| H1 | DM Serif Display | 64px | 400 | 1.0 | -0.035em |
| H2 | DM Serif Display | 32px | 400 | 1.15 | -0.02em |
| H3 | Inter | 20px | 600 | 1.3 | -0.015em |
| Body | Inter | 17px | 400 | 1.65 | -0.005em |
| Caption | Inter | 13px | 500 | 1.4 | 0 |
| Marginalia | JetBrains Mono | 11px | 500 | 1.0 | 0.12em uppercase |

DM Serif Display only at 400 — there is no other weight. Inter carries weight (400/500/600) for body and UI. Mono is reserved for marginalia (page numbers, footnotes, dateline).

## 4. Buttons

### Primary (Ink Slab)
```css
background: #101010;
color: #fbf8f1;
padding: 14px 26px;
border-radius: 0;
font-family: "Inter";
font-weight: 500;
```

The button label always ends with a tomato period: `View case study` followed by a `#e0432a` colored `.`

### Secondary (Ink Outline)
- Transparent, 1px solid ink, ink text
- Same sharp shape, same padding

### Ghost
- Inter 500, ink-secondary, no border. Hover: underline.

## 5. Cards

- Background `#fbf8f1` (or `#f3efe7` for elevated)
- 1px hairline at 10% ink, NO shadow, NO radius
- Internal padding 32px / 48px
- Featured cards add a single 1px ink top border — that is the only chrome

## 6. Charts

Thin precise bars (3px wide, 16px gap). One bar in tomato, others in 18% ink. NO gridlines, NO axis lines — labels float in mono uppercase along the baseline. Line charts run at 1px ink with no fill. The chart is a footnote, not a feature.

## 7. Tabs

Underline 1px in ink for the active state. Inactive tabs are Inter 500 ink-secondary. The active label is set in DM Serif Display italic — that's the rhythm change, not a color shift.

## 8. Spacing

- Base 8px
- Scale: `8, 16, 24, 32, 48, 64, 96, 128`
- Section padding: 128px desktop, 64px mobile — editorial needs the air

## 9. Do's & don'ts

✅ **Do**
- Use DM Serif Display only at 400 weight — anything heavier reads as decorative, not editorial
- Reserve the tomato for the first letter and the period — those two gestures are the brand
- Hold the asymmetric 8/4 column split for body — symmetric two-column reads as a blog
- Use sharp 0px radius on everything — print rules

❌ **Don't**
- Use a second accent color — tomato alone, on two specific characters
- Use any radius — pills are reserved for status badges only
- Use serif body — Inter carries the body, DM Serif Display carries the display
- Use weight on DM Serif — there is only 400

---

## Tokens

> Generated from the same source the live preview renders from.
> Treat the values below as the contract — never substitute approximations.

### Colors

| Role      | Value |
|-----------|-------|
| primary   | `#101010` |
| secondary | `#5a5a5a` |
| tertiary  | `#101010` |
| neutral   | `#f3efe7` |
| surface   | `#fbf8f1` |

### Typography

- **Display:** DM Serif Display
- **Body:** Inter
- **Mono:** JetBrains Mono

| Role | size / leading / weight / tracking |
|------|------------------------------------|
| Hero | 7rem / 0.94 / 400 / -0.045em |
| H1   | 4rem / 1 / 400 / -0.035em |
| H2   | 2rem / 1.15 / 400 / -0.02em |
| Body | 1.0625rem / 1.65 / 400 / -0.005em |

### Radius

- sm: `0px`
- md: `0px`
- lg: `0px`
- pill: `9999px`

### Shadows

- **card:** `none`
- **button:** `none`

### Borders

- **card:** `1px solid rgba(16,16,16,0.10)`
- **divider:** `rgba(16,16,16,0.14)`

### Buttons

Four variants, each fully tokenized. The preview renders from these exact values.

#### Primary

| Property | Value |
|----------|-------|
| shape | `sharp` |
| background | `#101010` |
| color | `#fbf8f1` |
| border | `none` |
| padding | `14px 26px` |
| fontWeight | `500` |
| fontSize | `0.875rem` |

#### Secondary

| Property | Value |
|----------|-------|
| shape | `sharp` |
| background | `transparent` |
| color | `#101010` |
| border | `1px solid #101010` |
| padding | `14px 26px` |
| fontWeight | `500` |
| fontSize | `0.875rem` |

#### Outline

| Property | Value |
|----------|-------|
| shape | `sharp` |
| background | `transparent` |
| color | `#101010` |
| border | `1px solid rgba(16,16,16,0.18)` |
| padding | `14px 26px` |
| fontWeight | `500` |
| fontSize | `0.875rem` |

#### Ghost

| Property | Value |
|----------|-------|
| shape | `sharp` |
| background | `transparent` |
| color | `#5a5a5a` |
| border | `none` |
| padding | `14px 18px` |
| fontWeight | `500` |
| fontSize | `0.875rem` |

### Charts

| Property | Value |
|----------|-------|
| variant | `thin-bars` |
| strokeWidth | `1` |
| fillOpacity | `0` |
| gridlines | `false` |
| barGap | `16px` |
| highlight | `single` |
| dotMarker | `false` |

---

## Pro tokens

> Production-fidelity tokens. States, density, motion, elevation,
> content rules and a measured WCAG contract — derived from the
> resting tokens unless explicitly authored.

### States

#### Button

- **hover** — bg: `rgba(16, 16, 16, 0.92)`, shadow: `0 4px 20px -8px rgba(16, 16, 16, 0.4)`
- **focus** — outline: `1.5px solid #101010`, outline-offset: `4px`
- **active** — transform: `translateY(1px)`, filter: `brightness(0.95)`
- **disabled** — opacity: `0.45`
- **loading** — opacity: `0.7`
- **selected** — bg: `#101010`, color: `#fbf8f1`

#### Input

- **hover** — border: `1px solid #101010`
- **focus** — border: `1px solid #101010`, shadow: `0 1px 0 0 #101010`
- **disabled** — opacity: `0.45`
- **error** — border: `1px solid #991B1B`, shadow: `0 1px 0 0 #991B1B`

#### Card

- **hover** — shadow: `0 8px 24px -12px rgba(15,23,42,0.14)`, transform: `translateY(-1px)`
- **selected** — border: `1px solid #101010`

#### Tab

- **hover** — color: `#101010`
- **focus** — outline: `1.5px solid #101010`, outline-offset: `3px`
- **selected** — color: `#101010`, border: `0 0 2px 0 solid #101010`

### Density

| Mode | padding × | row × | body | radius × | Use for |
|------|-----------|-------|------|----------|---------|
| compact | 0.72 | 0.78 | 0.8125rem | 0.85 | Information-dense — tables, IDEs, dashboards |
| comfortable | 1 | 1 | 0.9375rem | — | Default — most product UI |
| spacious | 1.35 | 1.3 | 1rem | 1.15 | Editorial — marketing, long-form, settings |

### Motion

**Signature — Page turn.** Deliberate, measured motion — like turning a magazine page. Never jerky, never overdone.

```css
transition: all 320ms cubic-bezier(0.25, 0.46, 0.45, 0.94);
```

| Token | Value |
|-------|-------|
| duration.instant | `80ms` |
| duration.fast | `180ms` |
| duration.base | `320ms` |
| duration.slow | `500ms` |
| easing.standard | `cubic-bezier(0.25, 0.46, 0.45, 0.94)` |
| easing.decelerate | `cubic-bezier(0.0, 0, 0.2, 1)` |
| easing.accelerate | `cubic-bezier(0.4, 0, 1, 1)` |
| easing.spring | `cubic-bezier(0.5, 1.2, 0.6, 1)` |

### Elevation

Five-level scale, system-specific recipe.

| Level | Shadow | Recipe |
|-------|--------|--------|
| level0 | `none` | Hairline only — typical editorial resting state. |
| level1 | `0 1px 2px rgba(15,23,42,0.04)` | Barely visible — list rows, dividers. |
| level2 | `0 8px 24px -12px rgba(15,23,42,0.12)` | Pull-quote, sidebar — soft lift. |
| level3 | `0 16px 40px -16px rgba(15,23,42,0.18)` | Cover story card — clear lift. |
| level4 | `0 32px 80px -24px rgba(15,23,42,0.28)` | Modal — overlays the layout, with scrim. |

### Content

- **measure:** `60ch` (max line length for body prose)
- **paragraph spacing:** `1.5em`
- **list indent:** `1.75em`
- **list gap:** `0.55em`
- **link:** color `#101010`, underline `always`
- **blockquote:** border `4px solid #101010`, padding `0.4em 0 0.4em 1.5em`
- **code:** background `rgba(16, 16, 16, 0.06)`, color `#101010`

### Accessibility (WCAG 2.1)

**Overall:** AA

| Pair | Ratio | Required | Grade | Suggested fix |
|------|-------|----------|-------|---------------|
| Body text on surface | 17.94:1 | AA | AAA | — |
| Body text on canvas | 16.59:1 | AA | AAA | — |
| Muted text on surface | 6.5:1 | AA | AA | — |
| Accent on surface | 17.94:1 | AA-Large | AAA | — |
| Accent on canvas | 16.59:1 | AA-Large | AAA | — |
