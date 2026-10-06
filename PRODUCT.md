# Product Definition — My Investment Journey

## 1. Product Summary

This project is a **hybrid personal investment journal and frontend engineering portfolio**.

It should document a real beginner investor's journey while simultaneously demonstrating strong frontend engineering, UI/UX judgment, interaction design, data visualization, accessibility, responsive design, and product thinking.

The website should not present the author as an investment expert.

The central idea is:

> A beginner investor documenting what they invest in, why they made those decisions, what happened afterward, what they got wrong, what they learned, and how their investment framework evolves over time.

At the same time, the website itself should demonstrate how the author approaches frontend product development.

This is not primarily:

* a trading dashboard
* a stock recommendation website
* a financial news website
* a stock screener
* a brokerage interface
* a course about investing
* a generic developer portfolio
* a fake professional investor portfolio

It is a **real learning journey presented through a carefully designed frontend experience**.

---

# 2. Core Positioning

The product combines two identities.

## Investment Journal

Document:

* investments
* portfolio evolution
* investment reasoning
* mistakes
* gains
* losses
* experiments
* lessons
* changes in strategy
* changes in understanding

## Frontend Portfolio

Demonstrate:

* frontend engineering
* visual storytelling
* data visualization
* interaction design
* scroll-based experiences
* responsive interfaces
* animation restraint
* component design
* accessibility
* product thinking
* engineering decisions
* AI-assisted development workflow

These two identities should **not feel like two separate websites**.

The investment journey is the content.

The frontend experience is how that content is communicated.

---

# 3. Author Positioning

The author is an **absolute beginner in investing**.

This is a deliberate part of the product identity.

Do not artificially make the author appear to be:

* an analyst
* a professional investor
* a financial advisor
* an investing guru
* someone with decades of historical portfolio data

The website should embrace the beginning of the journey.

Small investments are acceptable.

Incomplete knowledge is acceptable.

Changing opinions are acceptable.

Mistakes are valuable content.

The strength of the project comes from transparency and evolution.

A useful underlying idea is:

> I did not start with a huge portfolio or perfect investment knowledge. I started small, experimented, learned, and gradually developed a framework.

---

# 4. Primary Audiences

There are three important audiences.

## 4.1 Recruiters / Frontend Engineers / Engineering Managers

They should be able to understand:

* how the author thinks about frontend products
* ability to build non-generic interfaces
* ability to work with real data
* attention to interaction details
* frontend architecture quality
* accessibility awareness
* responsiveness
* design-system discipline
* ability to explain technical decisions
* ability to use AI coding agents responsibly

The website itself should be the evidence.

Avoid explicitly screaming:

> Look at my frontend skills.

Demonstrate them through the product.

---

## 4.2 Beginner Investors

They should relate to:

* confusion
* early mistakes
* learning terminology
* experimenting with investments
* discovering index funds
* learning risk
* learning diversification
* changing strategies

The site should communicate:

> You do not need to pretend you know everything before beginning to learn.

However, the site must never imply that the author's portfolio should be copied.

---

## 4.3 Investors Curious About the Journey

More experienced investors may inspect:

* reasoning
* allocation
* portfolio evolution
* thematic ideas
* mistakes
* lessons
* current strategy

The tone should welcome scrutiny rather than pretend authority.

---

# 5. Product Philosophy

## 5.1 Learning in Public

The portfolio is not just presented as a result.

The decision process matters.

Where useful, investments should answer questions such as:

* Why did I buy this?
* What did I know at the time?
* What did I misunderstand?
* What did I expect?
* What actually happened?
* Was the result skill, luck, or market movement?
* What did I learn?
* Would I make the same decision today?

---

## 5.2 Decisions Matter More Than Returns

A profitable investment can still be based on bad reasoning.

A losing investment can still produce an important lesson.

Do not reduce investment stories to:

```text
Bought at X
Sold at Y
Made Z%
```

The reasoning should be part of the story.

---

## 5.3 Evolution Is a Feature

The portfolio strategy will change.

The product must be designed to show that evolution instead of hiding it.

Examples:

```text
Experimentation
      ↓
Individual stocks
      ↓
Learning about diversification
      ↓
Core + thematic framework
```

Historical thinking should remain visible where useful.

Do not rewrite history to make old decisions look smarter.

---

# 6. Current Investment Context

The portfolio contains both Indian and international investments.

Available portfolio data currently includes examples from:

* Indian mutual funds
* US equities
* US ETFs

Current imported portfolio data includes assets such as:

* UTI Nifty 50 Index Fund
* GE Vernova
* NVIDIA
* Vanguard S&P 500 ETF / VOO exposure

Additional Indian equity data may be added separately.

Portfolio files may originate from Tickertape or other exported portfolio reports.

The product architecture must assume portfolio data can grow and change over time.

---

# 7. Emerging Investment Strategy

The author's investment strategy is still developing.

The expected future direction currently consists of two broad buckets.

## 7.1 Core Market Exposure

Primary broad-market exposure:

* Nifty 50 in India
* Vanguard S&P 500 ETF (VOO) globally

This represents long-term diversified market exposure.

---

## 7.2 Thematic Exposure

The author has a growing interest in the **space economy**.

Expected thematic exposure includes:

* Procure Space ETF (UFO)
* an Indian defence ETF as indirect exposure to the Indian defence / aerospace / space ecosystem

Space-related investing is an important long-term interest of this project.

The website may eventually contain dedicated content exploring:

* global space economy
* listed space companies
* space ETFs
* defence/aerospace exposure
* India's space ecosystem
* risks of thematic investing
* what the author learns while researching the sector

Do not assume thematic investments are guaranteed future holdings.

The site should distinguish between:

* current holdings
* planned strategy
* research interests

---

# 8. Portfolio Strategy Classification

Investments should be capable of being classified into strategy buckets.

Initial model:

```text
core
thematic
experimental
```

### Core

Broad-market long-term exposure.

Examples:

* Nifty 50
* VOO

### Thematic

Intentional exposure to a particular long-term theme.

Examples:

* UFO
* Indian defence / aerospace ETF

### Experimental

Early individual-stock investments or decisions made while learning.

This classification is valuable because the site should show how the author's investing framework changes over time.

---

# 9. Portfolio Data Model

Financial data and storytelling data should remain separated.

> **Architecture clarification (2026-08-27):** The sketches in this section capture the original product intent but are not implementation contracts. The canonical model is now defined in [`CONTEXT.md`](./CONTEXT.md) and [`docs/data-contracts.md`](./docs/data-contracts.md). In particular, Instrument identity is separate from dated Holding data, Strategy Bucket belongs to the dated Holding, and Decisions and Reflections form an append-only history rather than one mutable story record per asset.

## 9.1 Financial Asset Data

Conceptual structure:

```text
asset
├── id
├── name
├── ticker
├── assetType
├── market
├── country
├── sector
├── currency
├── quantity
├── averageBuyPrice
├── investedAmount
├── currentValue
├── pnl
├── pnlPercent
├── portfolioWeight
├── strategyBucket
└── investedSince
```

Possible asset types:

```text
indian_stock
us_stock
etf
mutual_fund
```

Additional types may be introduced when genuinely required.

---

## 9.2 Investment Story Data

Conceptual structure:

```text
investmentStory
├── assetId
├── whyIBought
├── whatIKnewAtTheTime
├── whatIDidntUnderstand
├── expectation
├── whatActuallyHappened
├── mistake
├── lesson
├── wouldIBuyAgain
├── confidence
└── reflectionDate
```

Do not mix journal content directly into imported brokerage/portfolio data.

Portfolio exports provide facts.

The investment journal provides interpretation.

---

# 10. Information Architecture

Keep the sitemap intentionally small.

Initial pages:

```text
Home
Portfolio
Learnings
Build Log
About
```

Additional pages should only be introduced when the content genuinely requires them.

Avoid building a large navigation structure during the first version.

---

# 11. Homepage Is the Primary Experience

The homepage should contain the main product journey.

Visitors should be able to understand the project primarily through scrolling.

Secondary pages provide deeper exploration.

The homepage should behave more like a **visual narrative** than a dashboard.

---

# 12. Homepage Narrative

Initial homepage chapter architecture:

## Chapter 1 — Introduction

Establish:

* who the author is
* beginner investor
* frontend developer
* purpose of the project

The hero should be calm and editorial.

Avoid immediately presenting dashboard statistics.

---

## Chapter 2 — Where I Started

Show the beginning of the investment journey.

Possible content:

* first investments
* small starting amounts
* initial assumptions
* what motivated investing
* things that were confusing initially

Visual direction:

* vertical story
* timeline
* journal-like presentation

---

## Chapter 3 — My Portfolio Today

Present current portfolio data.

Potential dimensions:

* India vs global
* asset type
* strategy bucket
* individual holdings
* core vs thematic vs experimental

This is one of the places where sophisticated frontend data visualization can be demonstrated.

Avoid defaulting to a grid of dashboard cards.

Prefer a narrative visualization that evolves while scrolling.

---

## Chapter 4 — How My Strategy Is Evolving

Communicate the transition from scattered experimentation toward a clearer framework.

Conceptually:

```text
Early experimentation
        ↓
Individual stocks
        ↓
Learning
        ↓
Core market exposure + selected themes
```

Current emerging framework:

```text
CORE

Nifty 50
VOO


THEMATIC

UFO
Indian defence / aerospace exposure
```

This section may use scroll-driven transformation to visually reorganize investments.

---

## Chapter 5 — What I Got Wrong

Mistakes should be treated as first-class content.

A useful storytelling pattern:

```text
What I thought
      ↓
What happened
      ↓
What I learned
```

Avoid presenting mistakes in a self-deprecating or gimmicky way.

They should demonstrate reflection.

---

## Chapter 6 — What I'm Learning

Potential topics:

* diversification
* index investing
* valuation
* risk
* thematic investing
* patience
* FOMO
* concentration
* global investing
* market cycles

This should be based on things the author genuinely encounters.

Do not manufacture lessons merely to fill the interface.

---

## Chapter 7 — How I Built This

This section connects the project to the author's frontend engineering portfolio.

Show the development process.

Example phases:

```text
00 Project Harness
01 Product Planning
02 Reference Research
03 Brand / Design System
04 Frontend Architecture
05 Implementation
06 Accessibility
07 Performance
08 Iteration
```

This should link to deeper build logs.

---

## Chapter 8 — Closing

Return to a calmer visual state.

Encourage deeper exploration of:

* Portfolio
* Learnings
* Build Log
* About

The closing should reinforce that this is an ongoing journey.

---

# 13. Homepage Interaction Philosophy

The homepage will make meaningful use of mouse/trackpad scrolling.

However:

## Never Use Scroll-Jacking

Normal browser scrolling must remain natural.

Animations may respond to scroll progress.

Animations must not take control of scrolling.

---

## Motion Hierarchy

### Level 0 — Static

Most content.

### Level 1 — Micro Interaction

Examples:

* hover
* focus
* button feedback
* small state changes

### Level 2 — Scroll Reveal

Examples:

* timeline progression
* text reveals
* image entrances

### Level 3 — Scroll-Driven Transformation

Reserve for a very small number of signature experiences.

Likely candidates:

* Portfolio Today
* Strategy Evolution
* How I Built This

Do not turn every section into a motion experiment.

---

# 14. Desired Homepage Rhythm

The overall experience should roughly feel like:

```text
calm
  ↓
story
  ↓
interactive data
  ↓
visual transformation
  ↓
reflection
  ↓
exploration
  ↓
engineering
  ↓
calm
```

Do not maintain maximum visual intensity throughout the page.

---

# 15. Visual Direction

The final visual system will be defined separately in `design.md`.

Current product-level direction:

* editorial first
* spacious
* illustration-friendly
* personal
* modern
* sophisticated
* financially credible without feeling corporate
* data visualization where useful
* restrained dashboard patterns
* strong typography
* meaningful motion
* generous whitespace

---

# 16. Visual Anti-Patterns

Do not automatically interpret "investment portfolio" as:

* dark navy fintech UI
* black trading terminal
* neon green gains
* glowing charts
* giant pie charts
* endless KPI cards
* glassmorphism
* gradient-heavy layouts
* generic SaaS dashboard
* crypto-style interface
* stock trading application

The product is an **investment journal**, not a brokerage terminal.

---

# 17. Illustration and Image Direction

Illustrations are preferred over excessive generic stock photography.

However, Codex is **not responsible for inventing or generating the project's artwork**.

Images/illustrations may be generated using dedicated image-generation tools or sourced through an approved external workflow.

All generated/sourced visual assets must conform to `design.md`.

Codex should implement approved assets.

Codex should not independently establish a new illustration style.

---

# 18. Iconography

Use **Phosphor Icons** as the standard icon family.

Codex must not:

* invent custom icons without a genuine requirement
* generate decorative SVG icons simply because one is needed
* mix unrelated icon libraries

If an appropriate Phosphor icon exists, use it.

Custom iconography requires an explicit design reason.

---

# 19. External Design References

External references may come from sources such as:

* Godly / Recent Design
* Pinterest
* FreeDesignMD
* other approved design galleries

References are used for inspiration and analysis.

They are **not templates to clone**.

For every important reference, document:

* what is useful
* which section it applies to
* what should be adapted
* what should not be copied

Examples:

```text
Use:
- pacing
- hero composition
- typography hierarchy
- scroll behavior
- image treatment

Do not copy:
- brand identity
- wording
- logo
- proprietary illustrations
- complete page layout
```

---

# 20. Component Inspiration

Individual component inspiration may come from:

* 21st.dev
* Godly / Recent Design references
* Fancy Components
* other deliberately selected component references

These are inspiration sources.

They do not override `design.md`.

A visually impressive component should not be used unless it:

* fits the product
* fits the design system
* works responsively
* remains accessible
* improves the actual experience

Avoid assembling the website from unrelated "cool" components.

---

# 21. Design System Creation Workflow

Three candidate `.md` design systems currently exist under a local/reference `design/` area.

The project should not blindly merge all three.

Expected process:

```text
candidate design files
        +
product.md
        +
visual references
        ↓
Codex comparison
        ↓
gpt-taste evaluation
        ↓
select strongest base
        ↓
borrow specific strengths from others
        ↓
create project design.md
```

`gpt-taste` should evaluate candidates specifically against this product.

Evaluation criteria should include:

* suitability for an investment journal
* editorial quality
* whitespace
* storytelling capability
* illustration compatibility
* financial data compatibility
* scroll experience compatibility
* distinctiveness
* accessibility
* responsive potential
* avoidance of generic AI/SaaS aesthetics

The output should choose a **base system**, not create an average of all candidates.

---

# 22. Design Provenance

The final `design.md` should document where major decisions came from.

Example:

```text
Base:
Design B

Borrowed:
- spacing logic from Design A
- numerical typography from Design C
- section pacing from Reference X

Rejected:
- dashboard card density
- excessive gradients
- glassmorphism
```

This information is useful both for engineering context and future Build Log content.

---

# 23. Development Philosophy

The project is being developed primarily using **Codex CLI**.

AI is part of the development workflow, but the goal is not to demonstrate:

> AI can generate a website.

The goal is to demonstrate:

> The developer can use AI agents while maintaining product judgment, design constraints, engineering verification, and architectural understanding.

Codex should behave as an implementation collaborator, not an autonomous product designer.

---

# 24. Codex Responsibility Boundary

Current explicit boundaries:

Codex should **not**:

* create the brand identity independently
* invent a new design direction when one already exists
* generate project imagery independently
* invent iconography when Phosphor already provides appropriate icons

These boundaries may expand later.

Do not infer additional restrictions unless documented elsewhere.

---

# 25. Portable / Reproducible Development Environment

A major project requirement is **portability and reproducibility**.

The development context should live inside the repository wherever practical.

Desired experience:

```text
clone repository
      ↓
install dependencies
      ↓
launch Codex CLI
      ↓
Codex understands the project
```

Important project knowledge must not exist only in:

* one computer
* one ChatGPT conversation
* developer memory
* global Codex configuration
* undocumented external context

Prefer repo-local:

* agent instructions
* skills
* design context
* product context
* references
* decisions
* progress tracking
* build logs

Secrets must never be committed.

---

# 26. Documentation Architecture

Recommended project documentation structure:

```text
docs/
├── product.md
├── design.md
├── architecture.md
├── references.md
├── roadmap.md
├── progress.md
│
├── decisions/
│
└── build-log/
```

Additional documentation may be added only when useful.

Avoid documentation for documentation's sake.

---

# 27. Build Log / Build in Public

The development process itself is part of the portfolio.

Maintain an engineering/build journal.

Example structure:

```text
docs/build-log/
├── 000-project-harness.md
├── 001-product-definition.md
├── 002-reference-research.md
├── 003-design-system.md
├── 004-homepage.md
└── ...
```

Useful entry structure:

```text
Goal

What I was trying to solve.

Decisions

What was chosen.

Why

Reasoning behind the decision.

Rejected

Relevant alternatives that were intentionally not used.

Implementation

What changed technically.

Verification

How the work was checked.

Learned

What the developer learned.

Next

Logical next step.
```

Keep build logs useful and concise.

---

# 28. Internal vs Public Build Logs

Do not automatically publish raw:

* AI conversations
* Codex transcripts
* command history
* debugging noise
* secrets
* internal configuration

Maintain two conceptual layers.

```text
Internal engineering record
        ↓
Curated public build story
```

For example:

```text
docs/build-log/
```

may contain internal project history.

A future public content area may contain cleaned-up stories such as:

```text
src/content/build/
```

The public website should show thoughtful development decisions, not raw AI logs.

---

# 29. Build Log as Portfolio Evidence

The final site may include a section such as:

* How I Built This
* Build in Public
* Development Journal
* Behind the Build

It should demonstrate the process:

```text
research
   ↓
constraints
   ↓
design
   ↓
implementation
   ↓
critique
   ↓
iteration
   ↓
verification
```

Where useful, preserve:

* before/after screenshots
* important visual iterations
* architectural decisions
* failed ideas worth discussing
* performance improvements
* accessibility fixes

---

# 30. Reference Asset Structure

Reference captures may include:

```text
references/
└── reference-name/
    ├── full-page.png
    ├── hero.png
    ├── sections/
    ├── scroll-animation.mp4
    └── notes.md
```

For scroll interactions, video is preferred when static screenshots cannot communicate:

* timing
* pinning
* transition behavior
* easing
* sequencing

Reference notes should explain what is useful rather than expecting Codex to infer everything from visuals.

---

# 31. Skills

Repo-local/project development may use skills including:

```text
gpt-taste
frontend-quality
accessibility-review
design-compliance
build-log
```

## gpt-taste

Primary UI/UX quality reviewer.

Use for:

* visual hierarchy
* spacing
* composition
* motion restraint
* detecting generic AI aesthetics
* critiquing design decisions
* evaluating candidate design systems

---

## frontend-quality

Use for:

* component quality
* state management quality
* responsiveness
* maintainability
* frontend implementation standards

---

## accessibility-review

Use for:

* semantic structure
* keyboard navigation
* focus states
* contrast
* accessible interactions
* reduced-motion behavior where appropriate

---

## design-compliance

Use to compare implementation against:

```text
docs/design.md
```

Codex should not silently deviate from the project's visual system.

---

## build-log

Use after meaningful development milestones to help maintain the development journal.

The skill should summarize genuine work rather than fabricate design reasoning retrospectively.

---

# 32. Product Content Integrity

The project uses real financial data.

Therefore distinguish clearly between:

```text
real portfolio data
planned investment strategy
personal opinion
investment research
historical reflection
```

Do not represent planned purchases as current holdings.

Do not fabricate returns, investment dates, lessons, or portfolio history.

Missing information should remain missing until supplied.

---

# 33. Financial Disclaimer Direction

The website is educational/personal.

It should eventually communicate that:

* this is a personal investment journey
* the author is learning
* content is not individualized financial advice
* visitors should conduct their own research

This should be handled tastefully.

Avoid filling every screen with legalistic disclaimers.

---

# 34. Content Tone

Desired tone:

* curious
* transparent
* grounded
* personal
* reflective
* beginner-friendly
* technically thoughtful
* confident about engineering without pretending investment expertise

Avoid:

* guru language
* exaggerated financial claims
* hustle culture
* fake certainty
* excessive finance jargon
* corporate marketing language
* generic AI-generated motivational copy

---

# 35. Version-One Product Constraints

V1 should remain intentionally focused.

Prioritize:

* strong homepage narrative
* real portfolio data
* genuine lessons
* a few high-quality interactions
* excellent responsive behavior
* excellent frontend craftsmanship
* build-log visibility

Do not prioritize:

* stock screening
* live trading
* brokerage integration
* social network features
* comments
* authentication
* user portfolios
* complex CMS
* market news aggregation
* dozens of dashboards
* advanced financial modeling

These may only be reconsidered if the product direction changes later.

---

# 36. Success Criteria

The product succeeds when a visitor can understand:

### As an investor

> This is a real beginner documenting how their investment thinking evolves.

### As a recruiter

> This developer can build thoughtful, polished, interactive frontend products rather than generic generated interfaces.

### As another beginner

> I can relate to this journey and learn from how someone else reasons through early investing decisions.

### As the author

> I can continue updating this website for years without redesigning the entire product every time my portfolio changes.

---

# 37. Long-Term Product Evolution

The architecture should allow the website to become richer as the author's investing experience grows.

Future possibilities include:

* deeper investment case studies
* portfolio evolution over multiple years
* thesis vs outcome history
* benchmark comparisons
* historical asset allocation
* space economy research
* investment decision retrospectives
* interactive learning content
* more sophisticated data storytelling

Do not implement these prematurely.

The product should grow alongside the investment journey.

---

# 38. Current Planning State

The project has completed early planning around:

* positioning
* target audience
* beginner narrative
* initial portfolio model
* investment strategy direction
* minimal sitemap
* homepage-first experience
* scroll storytelling
* visual inspiration workflow
* design reference collection
* AI development boundaries
* portable Codex setup
* development/build logging

Current design research includes:

* three candidate design `.md` files
* Godly/Recent Design references
* Pinterest references
* visual reference captures
* scroll references

The next major design task is:

> Evaluate the candidate design systems against this product, select the strongest base using `gpt-taste`, selectively borrow compatible strengths from other references, and create the canonical `design.md`.

Do not begin broad UI implementation until that design direction is sufficiently defined.

---

# 39. Source-of-Truth Hierarchy

When instructions conflict, use the following conceptual hierarchy:

```text
Product intent
    ↓
product.md
    ↓
design.md
    ↓
documented design references
    ↓
component inspiration
    ↓
implementation
```

A flashy component or external reference must never override the product or design system.

---

# 40. Guiding Principle

When uncertain about a product or UI decision, return to this question:

> Does this help tell the story of a beginner becoming a more thoughtful investor while demonstrating excellent frontend craftsmanship?

If not, it probably does not belong in the product.
