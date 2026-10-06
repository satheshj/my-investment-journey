# Homepage narrative

## Goal

Turn the approved product brief and editorial design system into the complete public homepage without implying that unpublished portfolio or journal data already exists.

## Decisions

- Structured the page as eight narrative chapters: introduction, starting context, portfolio, strategy, reflection, learning, build process, and closing navigation.
- Derived the public portfolio state from the validated repository dataset rather than from display-only constants.
- Presented Nifty 50 and VOO as strategy direction, and UFO plus Indian defence and aerospace exposure as research interests. None are presented as current holdings.
- Kept dates, values, returns, and mistake entries absent where the repository has no verified source material.
- Used the existing warm editorial system, asymmetric chapter layouts, sharp controls, and restrained progressive motion.
- Added the learning-only disclaimer to the persistent site footer.

## Why

The product depends on trust. A polished empty state is more truthful than invented figures or reflections, and it establishes the publishing contract for later snapshots.

## Rejected directions

- Placeholder portfolio totals or sample returns, because they could be mistaken for real performance.
- Invented mistake stories, because reflections must remain tied to dated evidence.
- Generic dashboard cards, because the homepage is a reading journey rather than an analytics screen.
- Generated artwork, because the product brief keeps illustration authorship outside this implementation phase.

## Implementation

- Added a validated public dataset boundary for portfolio content.
- Added a repository-backed homepage content model.
- Rebuilt the homepage around semantic sections and accessible navigation.
- Added responsive editorial layouts and reduced-motion fallbacks.
- Added component, data-state, navigation, and landmark coverage.

## Verification

- Formatting and linting pass with zero warnings.
- TypeScript passes in strict no-emit mode.
- All 19 unit and component tests pass.
- Next.js produces all six application routes as static pages.
- Desktop and mobile production screenshots confirm responsive layout, readable hierarchy, and honest empty states.
- All three browser checks pass, covering desktop routes, mobile navigation, semantic landmarks, and skip-link focus behavior.
- The local Windows runner required its static server to be stopped manually after all browser assertions completed.

## Learned

An empty public dataset can still support a useful product state when the interface clearly explains what evidence is missing and what will unlock publication.

## Next

Build the first data-backed portfolio view once a verified dated snapshot and its publication context are available.
