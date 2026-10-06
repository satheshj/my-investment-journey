# Narrative motion and publication privacy

## Goal

Add purposeful homepage motion while formalizing the decision to publish portfolio allocation percentages without exposing account-scale monetary information.

## Decisions

- Kept the homepage and its content model server-rendered.
- Added one focused Client Component that receives the server-rendered page as children and scopes all GSAP behavior to that subtree.
- Used motion to communicate hierarchy, chronology, strategy progression, and build progression.
- Kept mobile motion linear and removed scrubbed transformations below the desktop breakpoint.
- Disabled the complete motion layer when reduced motion or `matchMedia` support is unavailable.
- Defined the public portfolio as allocation-only.
- Kept quantities, prices, cost basis, market values, invested totals, and profit and loss amounts outside public view models.

## Why

The previous CSS applied one generic reveal to every chapter. Chapter-specific hooks make the motion correspond to the content instead of treating the whole story as interchangeable blocks.

Allocation percentages can explain diversification and concentration without revealing portfolio size. The calculation still depends on verified private monetary facts and dated FX context.

## Rejected directions

- Perpetual animation, because this is a reading experience rather than a live trading interface.
- Scroll listeners stored in React state, because they would add render work on every frame.
- Route-wide client rendering, because most of the page remains static and should not enter the client module graph.
- Publishing rounded monetary values, because even approximate amounts violate the selected privacy boundary.
- Animating missing portfolio data, because motion must not disguise an unpublished state as a populated visualization.

## Implementation

- Added explicit motion hooks to the hero, timeline, publication state, strategy progression, reflection contract, learning index, build milestones, and closing navigation.
- Added scrubbed desktop sequences for chronology and strategy evolution.
- Added one-time transform and opacity reveals for supporting content.
- Added a pure allocation-only public portfolio selector with a test that checks private field names never appear in serialized output.
- Added allocation-only copy to the homepage and portfolio route.
- Added an architecture decision record for the public disclosure boundary.

## Verification

- Formatting and linting pass with zero warnings.
- Strict TypeScript passes without emitting files.
- All 21 unit and component tests pass.
- Next.js produces all six routes as static content.
- All six browser checks pass, including chapter-specific motion completion and the fully visible reduced-motion state.
- The homepage has no horizontal overflow at 320px or at a 640px zoom-equivalent viewport.
- Desktop motion and mobile reduced-motion production screenshots preserve the intended hierarchy and reading order.
- The local Windows runner required its static server to be stopped manually after all browser assertions completed.

## Next

Add the first verified dated snapshot, then replace the honest portfolio empty state with allocation visualizations derived through the public selector.
