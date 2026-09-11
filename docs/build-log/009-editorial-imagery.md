---
title: Editorial imagery
date: 2026-08-31
status: complete
---

# Editorial imagery

## Outcome

The homepage now includes two large editorial illustrations: one for the small,
scattered starting point and one for the strategy's movement toward core exposure
with a smaller thematic layer. The images add narrative texture without turning the
site into a gallery or a finance dashboard.

## Art direction

- Used warm uncoated paper, charcoal, kraft neutrals, graphite, and a single tomato
  accent to stay within the canonical design system.
- Kept the compositions text-free so generated artwork cannot imply real dates,
  balances, returns, holdings, or recommendations.
- Repeated cut-paper circles and a thin red thread across both images so they read as
  one illustration family.
- Rejected literal rockets, upward stock charts, currency imagery, fintech UI, and
  generic wealth photography.

## Implementation

- Stored responsive WebP assets as static imports with explicit intrinsic dimensions
  so the media frames render without layout shift.
- Used one fixed media-frame system with square corners, restrained borders, useful
  alternative text, and visible captions.
- Added the image figures to the existing motion system while preserving a fully
  visible static and reduced-motion experience.

## Verification

- Component coverage confirms that both figures render with meaningful accessible
  names and captions.
- Generated source PNGs were converted to production WebP files without changing
  their 1536 × 1024 dimensions.
- All 26 unit and component tests passed.
- All 9 browser scenarios passed, including 320 px and 640 px image loading and
  horizontal-overflow checks.
- Formatting, linting, TypeScript, and the Next.js static production build passed.

## Next

Publish the first genuine decision or learning entry. That content can establish the
repeatable journal-detail template and give the Learnings route its first evidence-led
story.
