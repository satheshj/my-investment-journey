# Layout Reference

> Auto-extracted from live DOM. Use this to understand how the site is structured spatially.

## Spacing System

**Base grid:** 4px

**Scale:** `2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 32` px

| Spacing | Semantic Use |
|---------|-------------|
| 4px | Tight — within a component |
| 8px | Medium — between sibling items |
| 16px | Wide — between sections |
| 32px | Vast — major section breaks |

## Flex Layouts

| Element | Direction | Justify | Align | Gap | Children |
|---------|-----------|---------|-------|-----|----------|
| `div.flex.h-full` | row | space-between | center | normal 32px | 4 |
| `div.flex.gap-x-4` | row | — | — | normal 16px | 1 |
| `div.flex.flex-col` | column | — | center | 40px | 2 |
| `div.two-column-content.flex` | row | space-between | end | 40px | 2 |
| `div.flex.w-full` | column | — | center | — | 1 |
| `div.two-column-content.flex` | row-reverse | space-between | end | 40px | 2 |
| `div.two-column-content.flex` | row | space-between | center | 40px | 2 |
| `div.relative.mx-auto` | column | — | center | 40px normal | 4 |
| `div.mx-auto.flex` | column | — | center | — | 4 |
| `div.sticky.top-0` | column | center | center | — | 5 |
| `div.text-card.flex` | column | — | center | — | 4 |
| `div.relative.flex` | row | — | — | — | 1 |
| `div.relative.z-1` | row | — | — | 40px | 2 |
| `div.relative.flex` | column | center | center | — | 3 |
| `div.mt-12.flex` | row | — | start | normal 24px | 2 |

## Grid Layouts

| Element | Template Columns | Gap | Children |
|---------|-----------------|-----|----------|
| `div.grid.w-full` | `168px 168px 168px 168px 168px 168px 168px` | 24px | 14 |

## Structural Containers

### `<header>` (`header.sticky.inset-x-0`)

```
display:          block
children:         1
```

### `<main>` 

```
display:          block
children:         9
```

### `<footer>` (`footer.relative.overflow-hidden`)

```
display:          block
children:         4
```

### `<section>` (`section.relative.overflow-hidden`)

```
display:          block
padding:          0px 32px
children:         4
```

### `<section>` (`section.relative.overflow-hidden`)

```
display:          block
padding:          80px 0px
children:         1
```

### `<section>` (`section.relative.overflow-visible`)

```
display:          block
padding:          0px 32px
children:         1
```

### `<section>` (`section.relative.overflow-hidden`)

```
display:          block
padding:          164px 0px 0px
children:         1
```

### `<section>` (`section.relative.overflow-hidden`)

```
display:          block
padding:          164px 0px 144px
children:         1
```

### `<section>` (`section.relative.overflow-hidden`)

```
display:          block
children:         1
```

### `<section>` (`section.relative.overflow-x-clip`)

```
display:          block
children:         1
```

### `<section>` (`section.relative.overflow-hidden`)

```
display:          block
padding:          128px 0px
children:         1
```

### `<section>` (`section.relative.overflow-hidden`)

```
display:          block
padding:          164px 0px
children:         1
```

## Layout Rules

- **Container max-width:** `1416px` — always center with `margin: auto`
- Primary layout system: **Flexbox**
- Secondary layout system: **CSS Grid** (used for card grids and multi-column layouts)
- Every spacing value must be a multiple of **4px**
- Never use arbitrary margin/padding values outside the spacing scale

