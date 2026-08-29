# Design system selection

## Goal

Choose a visual foundation for My Investment Journey and turn the strongest ideas from the existing candidates into one product-specific design system.

## Decisions

- Selected Maison Vox as the base direction.
- Adopted a warm editorial canvas, serif-led storytelling, asymmetric layouts, sharp controls, and hairline structure.
- Borrowed selective full-bleed chapter pacing and one textured band from Stacked Hero Bands.
- Rejected Acid Chrome as a visual direction while retaining its useful rule of highlighting one meaningful chart point at a time.
- Made `docs/design.md` the canonical design and interaction source of truth.
- Replaced Inter with Geist, JetBrains Mono with Geist Mono, and Lucide with Phosphor Icons.
- Added product-specific rules for financial-data integrity, visualization, scroll motion, responsive fallbacks, and accessibility.

## Why

Maison Vox best supports a transparent beginner-investor narrative without looking like a trading product or generic finance dashboard. Stacked Hero Bands improves long-form chapter pacing, but its strict alternation would become repetitive. Acid Chrome is visually distinctive, but its dark, prismatic, Y2K styling conflicts with the product definition.

## Rejected

- dark onyx and chrome surfaces
- prismatic gradients and colored glows
- strict alternating textured bands
- fixed large padding on every section
- decorative KPI grids
- short-only motion rules that cannot support the two planned narrative transformations

## Implementation

Created `docs/design.md` with canonical tokens, typography, layout, components, data-visualization rules, motion levels, homepage chapter direction, accessibility requirements, content-integrity constraints, and a pre-flight checklist.

The original candidate files remain unchanged under `design/` as provenance references.

## Verification

- Compared all candidates against the product's ten stated evaluation criteria.
- Checked normal-text contrast for primary semantic colors on the warm canvas.
- Resolved candidate conflicts around fonts, icon libraries, texture frequency, elevation, motion, and charts.
- Confirmed that the canonical system distinguishes current holdings, planned strategy, research interests, and historical reflection.

## Learned

The strongest direction was not the most visually dramatic candidate. The product needs enough restraint for honest reflection and enough precision for real financial data. The design system therefore treats motion and accent color as scarce narrative tools.

## Next

Define the frontend architecture and data contracts before implementing the homepage. The asset-versus-holding distinction and historical portfolio model should be resolved at that stage.
