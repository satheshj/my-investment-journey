# spade DESIGN.md

> Auto-generated design system — reverse-engineered via static analysis by skillui.
> Frameworks: None detected
> Colors: 20 · Fonts: 2 · Components: 7
> Icon library: not detected · State: not detected
> Primary theme: dark · Dark mode toggle: no · Motion: subtle

## Visual Reference

**Match this design exactly** — study colors, fonts, spacing, and component shapes before writing any UI code.

![spade Homepage](../screenshots/homepage.png)

---

## 1. Visual Theme & Atmosphere

This is a **dark-themed** interface with a neutral tone. Depth is expressed through layered shadows and subtle surface color variation. Typography uses **Georgia** throughout — a technical, developer-focused choice that maintains consistency. Spacing follows a **4px base grid** (compact density), with scale: 2, 4, 6, 8, 10, 12, 14, 16px. Motion is subtle — smooth transitions (150-300ms) ease state changes without drawing attention.

---

## 2. Color Palette & Roles

| Token | Hex | Role | Use |
|---|---|---|---|
| color-black | `#090f05` | background | Page background, darkest surface |
| color-moss | `#3f7308` | surface | Card and panel backgrounds |
| theme-color | `#ffffff` | text-primary | Headings and body text |
| color-sage-5 | `#4a5b38` | text-muted | Captions, placeholders, secondary info |
| color-earth | `#331b09` | danger | Error states, destructive actions |
| color-forest | `#18280e` | success | Success states, positive indicators |
| color-sun | `#ebe46a` | warning | Warning states, caution indicators |
| tw-ring-color | `#155dfc` | info | Informational highlights |
| color-sage-3 | `#d8e5ca` | unknown | Palette color |
| swiper-preloader-color | `#000000` | unknown | Palette color |
| color-lemongrass | `#b2eb76` | unknown | Palette color |
| color-sage-1 | `#f4faed` | unknown | Palette color |
| color-gray-500 | `#6a7282` | unknown | Palette color |
| color-rock | `#a0967a` | unknown | Palette color |
| color-sage-4 | `#b3c5a0` | unknown | Palette color |
| color-gray-300 | `#d1d5dc` | unknown | Palette color |
| tw-prose-quote-borders | `#e5e7eb` | unknown | Palette color |
| tw-prose-invert-quote-borders | `#364153` | unknown | Palette color |
| color-sand | `#f2dfac` | unknown | Palette color |
| color-red-500 | `#fb2c36` | unknown | Palette color |

### CSS Variable Tokens

```css
--tw-border-style: solid;
--tw-prose-quote-borders: #e5e7eb;
--tw-prose-th-borders: #d1d5dc;
--tw-prose-td-borders: #e5e7eb;
--tw-prose-invert-quote-borders: #364153;
--tw-prose-invert-th-borders: #4a5565;
--tw-prose-invert-td-borders: #364153;
--tw-prose-quote-borders: lab(91.6229% -.159115-2.26791);
--tw-prose-th-borders: lab(85.1236% -.612259-3.7138);
--tw-prose-td-borders: lab(91.6229% -.159115-2.26791);
--tw-prose-invert-quote-borders: lab(27.1134% -.956401-12.3224);
--tw-prose-invert-th-borders: lab(35.6337% -1.58697-10.8425);
--tw-prose-invert-td-borders: lab(27.1134% -.956401-12.3224);
--tw-border-style: dashed;
--tw-border-style: solid;
--tw-prose-quote-borders: #e5e7eb;
--tw-prose-th-borders: #d1d5dc;
--tw-prose-td-borders: #e5e7eb;
--tw-prose-invert-quote-borders: #364153;
--tw-prose-invert-th-borders: #4a5565;
```


---

## 3. Typography Rules

**Font Stack:**
- **Georgia** — Heading 1, Heading 2
- **SFMono-Regular** — Body, Caption, Code

**Font Sources:**

```css
@font-face {
  font-family: "naNSuperX";
  src: url("https://spade.com/_next/static/media/NaNSuperXSansDisplay_VF_TRIAL-s.p.55b41e97.woff2") format("woff2");
  font-weight: 100;
}
@font-face {
  font-family: "polar";
  src: url("https://spade.com/_next/static/media/FTPolar_Regular-s.p.61d92bfa.woff2") format("woff2");
  font-weight: 400;
}
@font-face {
  font-family: "polarMono";
  src: url("https://spade.com/_next/static/media/FTPolarMono_Regular-s.p.23bb8712.woff2") format("woff2");
  font-weight: 400;
}
```

| Role | Font | Size | Weight |
|---|---|---|---|
| Heading 1 | Georgia | 48px | 700 |
| Heading 2 | Georgia | 28px | 700 |
| Body | SFMono-Regular | clamp(min(var(--mobile-font-size),var(--desktop-font-size)),calc((var(--vi-multiplier)*100vi) + (var(--base-offset)/16*1rem)),max(var(--mobile-font-size),var(--desktop-font-size))) | 400 |
| Caption | SFMono-Regular | calc((var(--vi-multiplier)*640 + var(--base-offset))/16*1rem) | 400 |
| Code | SFMono-Regular | 14px | 400 |

**Typographic Rules:**
- Use **Georgia** for all text — do not mix font families
- Maintain consistent hierarchy: no more than 3-4 font sizes per screen
- Headings use bold (600-700), body uses regular (400)
- Line height: 1.5 for body text, 1.2 for headings
- Use color and opacity for secondary hierarchy, not additional font sizes


---

## 4. Component Stylings

### Layout (1)

**Footer** — `html`

### Navigation (1)

**Navigation** — `html`

### Data Display (1)

**Card** — `html`
- Variants: `asset`

### Data Input (2)

**Button** — `html`
- Animation: 

**Input** — `html`
- State: :focus, :placeholder

### Media (2)

**Image** — `html`

**Icon** — `html`



---

## 5. Layout Principles

- **Base spacing unit:** 4px
- **Spacing scale:** 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24
- **Border radius:** .25rem, .3125rem, .375rem, 4px, 6px, 20px, 100%
- **Max content width:** 68.5rem

**Spacing as Meaning:**
| Spacing | Use |
|---|---|
| 4-8px | Tight: related items within a group |
| 12-16px | Medium: between groups |
| 24-32px | Wide: between sections |
| 48px+ | Vast: major section breaks |


---

## 6. Depth & Elevation

### Flat — subtle depth hints

- `rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px`

### Raised — cards, buttons, interactive elements

- `0 0 0 1px var(--tw-prose-kbd-shadows),0 3px 0 var(--tw-prose-kbd-shadows)`

### Z-Index Scale

`0, 1, 2, 3, 5, 10, 40, 50, 52, 60, 70, 100, 9999`



---

## 7. Animation & Motion

This project uses **subtle motion**. Transitions smooth state changes without demanding attention.

### CSS Animations

- `@keyframes marquee`
- `@keyframes swiper-preloader-spin`

### Animated Components

- **Button**: 

### Motion Guidelines

- Duration: 150-300ms for micro-interactions, 300-500ms for page transitions
- Easing: `ease-out` for enters, `ease-in` for exits
- Always respect `prefers-reduced-motion`


---

## 8. Do's and Don'ts

### Do's

- Use `#090f05` as the primary page background
- Use **Georgia** for all UI text
- Follow the **4px** spacing grid for all margins, padding, and gaps
- Use the defined shadow tokens for elevation — see Section 6
- Use border-radius from the scale: .25rem, .3125rem, .375rem, 4px, 6px
- Reuse existing components from Section 4 before creating new ones

### Don'ts

- Don't introduce colors outside this palette — extend the design tokens first
- Don't mix font families — use Georgia consistently
- Don't use arbitrary spacing values — stick to multiples of 4px
- Don't create custom box-shadow values outside the system tokens
- Don't use arbitrary border-radius values — pick from the defined scale
- Don't duplicate component patterns — check Section 4 first
- Don't use backdrop-blur or blur effects

### Anti-Patterns (detected from codebase)

- No blur or backdrop-blur effects
- No zebra striping on tables/lists


---

## 9. Responsive Behavior

| Name | Value | Source |
|---|---|---|
| sm | 40rem | css |
| md | 48rem | css |
| lg | 64rem | css |
| xl | 80rem | css |
| 2xl | 96rem | css |
| xs | 390px | css |
| sm | 640px | css |
| md | 768px | css |
| lg | 1000px | css |
| lg | 1024px | css |
| xl | 1280px | css |
| 2xl | 1300px | css |
| 2xl | 1440px | css |
| 2xl | 1520px | css |
| 2xl | 1680px | css |
| 2xl | 1920px | css |
| 2xl | 2240px | css |
| 2xl | 2560px | css |

**Approach:** Use `@media (min-width: ...)` queries matching the breakpoints above.


---

## 10. Agent Prompt Guide

Use these as starting points when building new UI:

### Build a Card

```
Background: #3f7308
Border: 1px solid var(--border)
Radius: 4px
Padding: 16px
Font: Georgia
Use shadow tokens from Section 6.
```

### Build a Button

```
Primary: bg var(--accent), text white
Ghost: bg transparent, border var(--border)
Padding: 8px 16px
Radius: 4px
Hover: opacity 0.9 or lighter shade
Focus: ring with var(--accent)
```

### Build a Page Layout

```
Background: #090f05
Max-width: 68.5rem, centered
Grid: 4px base
Responsive: mobile-first, breakpoints from Section 9
```

### Build a Stats Card

```
Surface: #3f7308
Label: #4a5b38 (muted, 12px, uppercase)
Value: #ffffff (primary, 24-32px, bold)
Status: use success/warning/danger from Section 2
```

### Build a Form

```
Input bg: #090f05
Input border: 1px solid var(--border)
Focus: border-color var(--accent)
Label: #4a5b38 12px
Spacing: 16px between fields
Radius: 4px
```

### General Component

```
1. Read DESIGN.md Sections 2-6 for tokens
2. Colors: only from palette
3. Font: Georgia, type scale from Section 3
4. Spacing: 4px grid
5. Components: match patterns from Section 4
6. Elevation: shadow tokens
```
