---
title: My Investment Journey Design System
status: canonical
version: 1.0.0
updated: 2026-08-27
product_source: ../PRODUCT.md
base_reference: ../design/DESIGN.md
supporting_reference: ../design/PATTERN-stacked-bands.md
review_method: gpt-taste evaluation against PRODUCT.md
---

# My Investment Journey Design System

This document is the visual and interaction source of truth for My Investment Journey. The files in `design/` remain design candidates and provenance references; they are not implementation contracts.

The system must help tell the story of a beginner becoming a more thoughtful investor while demonstrating excellent frontend craftsmanship. When a visually impressive treatment competes with clarity, honesty, or the investment narrative, the narrative wins.

## 1. Design direction

The experience is a warm editorial investment journal with precise, restrained data graphics. It should feel like a carefully designed personal publication, not a brokerage product, trading terminal, finance SaaS dashboard, or agency template.

The visual character is:

- editorial before dashboard-like
- warm, quiet, and spacious
- personal without becoming scrapbook-like
- precise enough for real financial data
- expressive through typography and composition
- motion-aware without turning every section into a demo
- illustration-friendly without depending on artwork to function
- credible without implying professional investment authority

The signature contrast is between reflective serif storytelling and disciplined sans-serif data presentation.

## 2. Provenance and candidate decision

### Evaluation scale

Scores use a five-point scale, where five is the strongest fit for the product.

| Criterion | Maison Vox | Stacked Hero Bands | Acid Chrome |
| --- | ---: | ---: | ---: |
| Investment-journal suitability | 5 | 4 | 1 |
| Editorial quality | 5 | 4 | 2 |
| Whitespace and pacing | 5 | 5 | 3 |
| Narrative storytelling | 5 | 4 | 2 |
| Illustration compatibility | 5 | 3 | 2 |
| Financial-data compatibility | 3 | 3 | 3 |
| Scroll-experience compatibility | 4 | 5 | 3 |
| Distinctiveness | 4 | 4 | 4 |
| Accessibility foundation | 4 | 4 | 3 |
| Responsive potential | 4 | 4 | 3 |
| **Total** | **44** | **40** | **26** |

### Selected base: Maison Vox

Maison Vox provides the strongest foundation because its warm paper surfaces, oversized editorial serif, asymmetric composition, hairline rules, and minimal chrome fit a personal investment journal. It also resists the visual language of generic finance products.

The base is adapted rather than copied verbatim:

- `Geist` replaces `Inter` for body and interface text to avoid a generic default and improve consistency with modern frontend tooling.
- `Geist Mono` replaces `JetBrains Mono` for data labels, dates, and technical metadata.
- Phosphor Icons replaces the candidate's Lucide dependency.
- Data visualization is expanded from a decorative footnote into a first-class narrative system.
- Motion is expanded beyond short transitions for two carefully selected homepage sequences.
- The contradictory shadow definitions are resolved in favor of flat editorial surfaces.
- The accent is darkened so it can meet WCAG AA for normal-sized text on the primary surfaces.

### Borrowed from Stacked Hero Bands

- full-bleed horizontal chapter boundaries
- a centered content frame inside full-width sections
- generous vertical spacing
- thin horizontal dividers as page architecture
- one low-contrast diagonal texture used as a special chapter transition

The strict plain/stripe alternation is rejected. It would make an eight-chapter homepage feel mechanical and repetitive. The fixed `160px` padding is replaced by a fluid spacing range, and texture is limited to one meaningful section per page.

### Borrowed from Acid Chrome

- emphasize one meaningful point or series in a chart rather than coloring every datum
- allow a clear latest-value marker when a time-series story genuinely needs it
- maintain a strict scarcity rule for visual accents

The dark onyx canvas, chrome controls, prismatic gradients, glows, Y2K styling, spring rotation, and pill-heavy component language are rejected. They conflict directly with the product's editorial tone and its explicit finance/crypto visual anti-patterns.

## 3. Core design principles

### Story before summary

Do not open with portfolio totals or performance statistics. Establish the person, the beginner position, and the purpose before introducing data.

### Decisions before returns

Whenever an investment result is shown, create a path to the reasoning, expectation, outcome, and reflection. A percentage without context is incomplete storytelling.

### Honest incompleteness

Missing data stays visibly missing. Planned purchases, research interests, current holdings, exited holdings, and historical reflections must never share a visual treatment that implies they have the same status.

### Editorial calm, selective intensity

Most sections should rely on composition, typography, and pacing. Reserve advanced visualization or motion for the current portfolio and strategy-evolution chapters.

### Accessible precision

Data must remain understandable without animation, hover, color, or a desktop viewport. Every visualization needs labels, a textual summary, and an accessible tabular route where appropriate.

## 4. Design tokens

### Color

| Token | Value | Role |
| --- | --- | --- |
| `canvas` | `#FBF8F1` | Primary warm-paper background |
| `surface` | `#F3EFE7` | Quiet section and panel differentiation |
| `surface-strong` | `#E9E2D7` | Selected rows and high-emphasis neutral fills |
| `ink` | `#101010` | Primary text and strong controls |
| `ink-soft` | `#2D2A27` | Long-form body text |
| `muted` | `#5A5A5A` | Secondary text and metadata |
| `hairline` | `rgba(16, 16, 16, 0.14)` | Rules, chart guides, and boundaries |
| `hairline-soft` | `rgba(16, 16, 16, 0.08)` | Subtle internal separators |
| `accent` | `#B13A24` | Editorial emphasis and primary highlighted datum |
| `accent-soft` | `#F0D8D0` | Accent tint for large non-text surfaces |
| `positive` | `#2F6B4F` | Positive financial state in data contexts only |
| `negative` | `#A13D35` | Negative financial state in data contexts only |
| `caution` | `#8A5A10` | Experimental or uncertain state |

Contrast on `canvas`:

- `ink`: 17.94:1
- `muted`: 6.50:1
- `accent`: 5.66:1
- `positive`: 5.93:1
- `negative`: 6.12:1
- `caution`: 5.58:1

Do not use color as the only carrier of meaning. Pair financial states and strategy buckets with text, symbols, line styles, or patterns.

### Typography

| Role | Family | Weight | Intended use |
| --- | --- | ---: | --- |
| Display | `DM Serif Display`, Georgia, serif | 400 | Hero, chapter titles, pull quotes |
| Body/UI | `Geist`, system-ui, sans-serif | 400-650 | Prose, navigation, controls, labels |
| Data/Mono | `Geist Mono`, ui-monospace, monospace | 400-600 | Dates, tickers, amounts, build metadata |

Fluid scale:

| Token | Size | Line height | Tracking |
| --- | --- | --- | --- |
| `display-hero` | `clamp(3.5rem, 8vw, 8rem)` | `0.92` | `-0.045em` |
| `display-xl` | `clamp(3rem, 6vw, 6rem)` | `0.96` | `-0.04em` |
| `display-lg` | `clamp(2.25rem, 4vw, 4.25rem)` | `1` | `-0.035em` |
| `heading-md` | `clamp(1.75rem, 2.5vw, 2.5rem)` | `1.1` | `-0.025em` |
| `heading-sm` | `clamp(1.25rem, 1.8vw, 1.625rem)` | `1.2` | `-0.015em` |
| `body-lg` | `clamp(1.0625rem, 1.2vw, 1.25rem)` | `1.65` | `-0.005em` |
| `body` | `1rem` | `1.65` | `0` |
| `small` | `0.875rem` | `1.5` | `0` |
| `meta` | `0.75rem` | `1.4` | `0.08em` |

Rules:

- Hero headings must remain within two or three lines. Use a wide measure and reduce type size before allowing a narrow six-line stack.
- Long-form prose should remain between `55ch` and `68ch`.
- Financial numerals use tabular figures.
- Mono type is functional, not a terminal aesthetic.
- Uppercase is reserved for short metadata such as tickers, currencies, and dates. Do not use generic labels such as `SECTION 01`.
- Italic display type is reserved for genuine quotations or reflective emphasis.

### Spacing

Base unit: `4px`.

Core scale: `4, 8, 12, 16, 24, 32, 48, 64, 80, 96, 128, 160, 192`.

| Role | Value |
| --- | --- |
| Inline control gap | `8-12px` |
| Compact content gap | `16-24px` |
| Editorial content gap | `32-64px` |
| Chapter padding | `clamp(96px, 14vw, 192px)` |
| Mobile chapter padding | `72-104px` |
| Reading paragraph gap | `1.4em` |

Whitespace is structural. Do not fill deliberate empty space with badges, decorative cards, or statistics.

### Shape and elevation

| Token | Value | Use |
| --- | --- | --- |
| `radius-none` | `0` | Buttons, major panels, images, data regions |
| `radius-subtle` | `2px` | Inputs and small interactive affordances |
| `radius-pill` | `999px` | Status labels only |
| `shadow-resting` | `none` | Default surfaces |
| `shadow-overlay` | `0 24px 72px -32px rgba(16,16,16,0.28)` | Dialogs and necessary overlays only |

Cards do not float by default. Separate content using alignment, tone, and hairlines.

## 5. Layout system

### Page frame

- Full-width page background.
- Maximum content width: `1280px`.
- Reading width: `68ch` maximum.
- Fluid page gutter: `clamp(20px, 4vw, 64px)`.
- Twelve-column desktop grid, six-column tablet grid, and four-column mobile grid.
- Prefer asymmetric `8/4`, `7/5`, and offset compositions over repeated centered blocks.
- Edge-to-edge visuals may escape the content frame only when the chapter benefits from scale.

### Chapter rhythm

Full-bleed horizontal sections are the homepage's primary architecture. Hairlines may separate major chapters, but not every internal content group.

Surface sequence should be composed, not alternated mechanically. A recommended rhythm is:

1. warm canvas
2. warm canvas with hairline transition
3. surface for data focus
4. canvas for transformation
5. surface for reflection
6. canvas for learning
7. one textured build chapter
8. quiet canvas close

The diagonal texture may appear once on the homepage, preferably in the build-process chapter. Use:

```css
repeating-linear-gradient(
  135deg,
  rgba(16, 16, 16, 0.035) 0 1px,
  transparent 1px 11px
)
```

Do not use the texture behind dense charts, long prose, or imagery.

### Responsive behavior

- Collapse asymmetric columns into a deliberate reading order, not a generic stack based only on DOM order.
- Preserve headline hierarchy while preventing orphaned words and excessive wraps.
- Replace pinned or scrubbed sequences with clear step-based layouts below `768px` unless testing proves the interaction remains comfortable.
- Never require horizontal scrolling to understand core content.
- Tables may use contained horizontal scrolling only when a stacked representation would distort the data.
- Keep primary controls at least `44px` in both dimensions.

## 6. Components

### Navigation

Use a minimal split navigation:

- wordmark or project name on the left
- primary routes on the right
- no floating glass pill
- no portfolio statistics in the navigation
- current page indicated through text weight plus a hairline or semantic current-page state
- compact menu on mobile with visible focus management and Escape support

### Buttons and links

Primary button:

- ink background, canvas text
- sharp corners
- `14px 24px` padding
- Geist 550 at `0.9375rem`
- one dominant primary action per visual region

Secondary button:

- transparent background
- ink border and ink text
- same geometry as primary

Text links:

- use a persistent underline or a clearly visible directional treatment
- accent may appear on hover, but hover must not be the only affordance

Focus:

- `2px` ink or accent outline
- `3px` minimum offset
- never remove focus visibility

### Editorial panels

Use panels for meaningful grouping, not to turn every fact into a card.

- flat surface
- one hairline boundary or tonal change
- no routine shadow
- no decorative nested cards
- padding between `24px` and `48px`
- hover motion only when the entire panel is interactive

### Status labels

Status labels may use a pill because status is categorical. Always include explicit text such as `Current holding`, `Exited`, `Planned`, or `Researching`. Do not imply status through color alone.

### Icons

- Use `@phosphor-icons/react` as the only standard icon library.
- Default weights: `regular` for navigation and utilities, `duotone` only for rare explanatory illustrations.
- Icons support labels; they do not replace unfamiliar text.
- Do not invent decorative SVG icons when a suitable Phosphor icon exists.

## 7. Data visualization

Portfolio graphics are narrative evidence, not dashboard decoration.

### Required data context

Every financial visualization must expose:

- what is being measured
- valuation or snapshot date
- currency or conversion basis
- whether values are current, historical, estimated, or unavailable
- source or import context where relevant

### Visual grammar

- Prefer direct labels over legends.
- Use thin rules and restrained fills.
- Remove gridlines unless they materially improve value reading.
- Highlight one series, point, or transition at a time.
- Use tabular figures for all amounts and percentages.
- Avoid giant pie or donut charts.
- Avoid green-as-decoration; `positive` is reserved for actual positive state.
- Show negative values with a minus sign and label, not red alone.
- Strategy buckets use text and shape/pattern in addition to color.
- Tooltips must be keyboard reachable when they contain unique information.
- Provide a textual summary and accessible table for complex charts.

### Strategy encoding

| Bucket | Primary visual treatment |
| --- | --- |
| Core | Solid ink or dense neutral fill |
| Thematic | Accent rule or accent fill |
| Experimental | Caution tone plus diagonal hatch |

Planned and researching items use dashed outlines and explicit status text. They must never appear in totals for current holdings.

### Signature visualization candidates

Only two homepage sequences may use Level 3 motion:

1. **Portfolio Today:** holdings reorganize by geography, asset type, or strategy bucket while the accompanying explanation advances.
2. **Strategy Evolution:** experimental holdings transition into a clearer core/thematic framework without rewriting historical decisions.

The same data must remain understandable in a static representation.

## 8. Motion system

Motion should clarify progression, hierarchy, or causality. It should not exist merely to make the page feel expensive.

### Motion levels

| Level | Use | Typical duration |
| --- | --- | --- |
| 0: Static | Most prose and data | none |
| 1: Micro | Hover, focus, pressed state | `120-220ms` |
| 2: Reveal | Timeline steps, images, chapter entrances | `420-700ms` |
| 3: Transformation | Portfolio and strategy sequences only | scroll-progress driven |

Easing:

- standard: `cubic-bezier(0.25, 0.46, 0.45, 0.94)`
- decelerate: `cubic-bezier(0, 0, 0.2, 1)`
- accelerate: `cubic-bezier(0.4, 0, 1, 1)`

Rules:

- Never intercept wheel, touch, keyboard, or browser scroll behavior.
- Use GSAP and ScrollTrigger only for sequences that benefit from pinning, scrubbing, or coordinated transformation.
- Pin at most one viewport-height scene at a time.
- Avoid simultaneous scale, rotation, blur, and opacity effects on the same element.
- Animate transform and opacity where possible.
- Clickable images may scale subtly within an overflow-hidden frame; the movement should remain below roughly three percent.
- A reveal must not delay access to content.
- Clean up scroll triggers and restore state when components unmount.

### Reduced motion

When `prefers-reduced-motion: reduce` is active:

- remove pinning and scrubbed timelines
- render content in its final visible state
- replace spatial transformations with immediate state changes or short fades
- preserve the complete narrative order
- keep focus and validation feedback visible

## 9. Homepage chapter specification

### Introduction

- Calm editorial hero.
- Wide two-to-three-line serif statement.
- Short supporting paragraph identifying the author as a beginner investor and frontend developer.
- No stats, badges, stock tickers, floating stamps, or finance charts.
- One primary route into the journey and one quiet secondary route to the portfolio.

### Where I Started

- Vertical journal timeline with dated entries when real dates exist.
- Combine short reflections with modest numerical context.
- Missing dates remain undated; never invent chronology.
- Use restrained reveal motion that mirrors reading progression.

### My Portfolio Today

- First visual-intensity peak.
- Use a large narrative visualization rather than KPI cards.
- Allow views by geography, asset type, and strategy bucket.
- Display an `as of` date and currency basis.
- Provide a textual and tabular alternative.

### How My Strategy Is Evolving

- Second and final visual-intensity peak.
- Show movement from experimentation toward core plus thematic exposure.
- Planned ideas such as UFO or Indian defence exposure remain visually distinct from current holdings.
- A scroll-driven reorganization is allowed on desktop; mobile receives a clear sequence of static states.

### What I Got Wrong

- Use a repeated three-part editorial structure: `What I thought`, `What happened`, `What I learned`.
- Avoid gimmicky warning graphics and self-deprecating copy.
- Outcome color must not overwhelm the reasoning.

### What I Am Learning

- Editorial index or annotated reading trail rather than a uniform card grid.
- Only publish genuine topics and reflections.
- Use strong typography and small, meaningful supporting visuals.

### How I Built This

- Use the single diagonal-texture chapter treatment.
- Present real phases, decisions, rejections, and verification evidence.
- Link to curated build logs rather than raw AI transcripts.
- A pinned title with vertically advancing build milestones is allowed if reduced-motion and mobile fallbacks are complete.

### Closing

- Return to the primary canvas and quieter scale.
- Reinforce that the journey is ongoing.
- Offer routes to Portfolio, Learnings, Build Log, and About without a giant marketing CTA.

## 10. Imagery and illustration

- Illustration is preferred to generic stock photography.
- Approved visual assets must conform to this system before implementation.
- Maintain warm-paper integration, restrained color, and sufficient quiet space for typography.
- Do not independently invent a new illustration language during implementation.
- Do not use tiny decorative images merely to satisfy an image quota.
- Always provide useful alternative text; decorative assets use empty alt text.

## 11. Accessibility contract

- Target WCAG 2.2 AA.
- Use semantic landmarks and heading order.
- Ensure full keyboard operation for navigation, filters, charts, disclosures, and dialogs.
- Maintain visible focus on every interactive element.
- Do not hide unique information behind hover.
- Announce meaningful filter or visualization state changes without making every scroll frame live.
- Respect reduced motion, increased text size, zoom, and forced-colors modes.
- Preserve reading order when layouts become asymmetric.
- Use `aria-current` for active navigation and meaningful status text for holding state.
- Test at 320px width, 200% zoom, keyboard-only operation, and reduced-motion mode.

## 12. Content integrity contract

Visually and semantically distinguish:

- real portfolio data
- historical reflection
- personal opinion
- research interest
- planned strategy

Required language should remain personal: `I thought`, `I learned`, `I am researching`, and `My current approach`. Avoid recommendation language such as `You should buy`, `Best stock`, or `Guaranteed`.

A tasteful site-level disclaimer should state that this is a personal learning journey and not individualized financial advice. Do not repeat legalistic disclaimers in every section.

## 13. Explicit anti-patterns

Do not use:

- dark navy fintech shells
- black trading-terminal layouts
- neon green performance styling
- chrome, holographic, or oil-slick controls
- gradient-heavy surfaces
- glassmorphism
- giant pie charts
- repeated KPI-card rows
- cards nested inside cards
- generic centered feature grids
- arbitrary pill tags
- floating hero badges or stamps
- generic meta labels such as `SECTION 04`
- excessive scroll pinning
- bounce or rotational hover motion
- mixed icon libraries
- fabricated investment content

## 14. Implementation pre-flight

Before a screen is considered compliant, verify:

- [ ] The screen advances the beginner-investor narrative.
- [ ] It uses tokens from this document rather than candidate files.
- [ ] The hero or primary heading stays within two or three lines at target widths.
- [ ] Data status, date, and currency context are visible where required.
- [ ] Current, planned, exited, and researching states cannot be confused.
- [ ] No chart relies on color alone.
- [ ] No generic dashboard grid has replaced the narrative layout.
- [ ] Motion has a clear communication purpose.
- [ ] Reduced-motion and mobile fallbacks preserve all information.
- [ ] Buttons and links have clear labels, contrast, hover, focus, and pressed states.
- [ ] Phosphor is the only standard icon family.
- [ ] Real content remains real and missing content remains missing.
- [ ] Keyboard, zoom, and responsive checks have been performed.

## 15. Source-of-truth rule

Implementation must follow this order:

1. `PRODUCT.md` for product intent and content truth
2. `docs/design.md` for visual and interaction decisions
3. documented external references for targeted inspiration
4. component references for implementation ideas
5. code

If a candidate file under `design/`, an external reference, or a visually impressive component conflicts with this document, this document wins unless the product intent itself requires a revision.
