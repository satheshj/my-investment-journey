# Interaction Reference

> Micro-interactions extracted from live DOM. Recreate these exactly for authentic feel.

## Coverage

| Component Type | Count | States Captured |
|----------------|-------|----------------|
| Button | 3 | default, hover, focus |
| Link | 3 | default, hover, focus |
| Input | 1 | default, hover, focus |

## Transition System

These transition declarations were extracted from interactive elements:

```css
transition: color 0.25s cubic-bezier(0.4, 0, 0.2, 1), background-color 0.25s cubic-bezier(0.4, 0, 0.2, 1), border-color 0.25s cubic-bezier(0.4, 0, 0.2, 1), outline-color 0.25s cubic-bezier(0.4, 0, 0.2, 1), text-decoration-color 0.25s cubic-bezier(0.4, 0, 0.2, 1), fill 0.25s cubic-bezier(0.4, 0, 0.2, 1), stroke 0.25s cubic-bezier(0.4, 0, 0.2, 1), --tw-gradient-from 0.25s cubic-bezier(0.4, 0, 0.2, 1), --tw-gradient-via 0.25s cubic-bezier(0.4, 0, 0.2, 1), --tw-gradient-to 0.25s cubic-bezier(0.4, 0, 0.2, 1);
transition: width 0.25s cubic-bezier(0, 0, 0.2, 1);
transition: all;
```

Apply these to all interactive elements. Never invent new durations or easings.

## Button Interactions

### Button 1 — `Solutions`

**States:**

- Default: `../screens/states/button-1-default.png`
- Hover: `../screens/states/button-1-hover.png`
- Focus: `../screens/states/button-1-focus.png`

**On hover:**

```css
/* color: rgb(9, 15, 5) → */ color: rgb(63, 115, 8);
/* border-color: rgb(9, 15, 5) → */ border-color: rgb(63, 115, 8);
/* outline: rgb(9, 15, 5) none 3px → */ outline: rgb(63, 115, 8) none 3px;
/* outline-color: rgb(9, 15, 5) → */ outline-color: rgb(63, 115, 8);
```

**On focus:**

```css
/* color: rgb(9, 15, 5) → */ color: rgb(63, 115, 8);
/* border-color: rgb(9, 15, 5) → */ border-color: rgb(63, 115, 8);
/* outline: rgb(9, 15, 5) none 3px → */ outline: rgb(16, 16, 16) auto 1px;
/* outline-color: rgb(9, 15, 5) → */ outline-color: rgb(16, 16, 16);
```

**Transition:** `color 0.25s cubic-bezier(0.4, 0, 0.2, 1), background-color 0.25s cubic-bezier(0.4, 0, 0.2, 1), border-color 0.25s cubic-bezier(0.4, 0, 0.2, 1), outline-color 0.25s cubic-bezier(0.4, 0, 0.2, 1), text-decoration-color 0.25s cubic-bezier(0.4, 0, 0.2, 1), fill 0.25s cubic-bezier(0.4, 0, 0.2, 1), stroke 0.25s cubic-bezier(0.4, 0, 0.2, 1), --tw-gradient-from 0.25s cubic-bezier(0.4, 0, 0.2, 1), --tw-gradient-via 0.25s cubic-bezier(0.4, 0, 0.2, 1), --tw-gradient-to 0.25s cubic-bezier(0.4, 0, 0.2, 1)`

### Button 2 — `Company`

**States:**

- Default: `../screens/states/button-2-default.png`
- Hover: `../screens/states/button-2-hover.png`
- Focus: `../screens/states/button-2-focus.png`

**On hover:**

```css
/* color: rgb(9, 15, 5) → */ color: rgb(63, 115, 8);
/* border-color: rgb(9, 15, 5) → */ border-color: rgb(63, 115, 8);
/* outline: rgb(9, 15, 5) none 3px → */ outline: rgb(63, 115, 8) none 3px;
/* outline-color: rgb(9, 15, 5) → */ outline-color: rgb(63, 115, 8);
```

**On focus:**

```css
/* color: rgb(9, 15, 5) → */ color: rgb(63, 115, 8);
/* border-color: rgb(9, 15, 5) → */ border-color: rgb(63, 115, 8);
/* outline: rgb(9, 15, 5) none 3px → */ outline: rgb(16, 16, 16) auto 1px;
/* outline-color: rgb(9, 15, 5) → */ outline-color: rgb(16, 16, 16);
```

**Transition:** `color 0.25s cubic-bezier(0.4, 0, 0.2, 1), background-color 0.25s cubic-bezier(0.4, 0, 0.2, 1), border-color 0.25s cubic-bezier(0.4, 0, 0.2, 1), outline-color 0.25s cubic-bezier(0.4, 0, 0.2, 1), text-decoration-color 0.25s cubic-bezier(0.4, 0, 0.2, 1), fill 0.25s cubic-bezier(0.4, 0, 0.2, 1), stroke 0.25s cubic-bezier(0.4, 0, 0.2, 1), --tw-gradient-from 0.25s cubic-bezier(0.4, 0, 0.2, 1), --tw-gradient-via 0.25s cubic-bezier(0.4, 0, 0.2, 1), --tw-gradient-to 0.25s cubic-bezier(0.4, 0, 0.2, 1)`

### Button 3 — `Go to slide 1 of 3`

**States:**

- Default: `../screens/states/button-3-default.png`
- Hover: `../screens/states/button-3-hover.png`
- Focus: `../screens/states/button-3-focus.png`

**On focus:**

```css
/* outline: rgb(9, 15, 5) none 3px → */ outline: rgb(16, 16, 16) auto 1px;
/* outline-color: rgb(9, 15, 5) → */ outline-color: rgb(16, 16, 16);
```

**Transition:** `width 0.25s cubic-bezier(0, 0, 0.2, 1)`

## Link Interactions

### Link 1 — `Back to Home`

**States:**

- Default: `../screens/states/link-1-default.png`
- Hover: `../screens/states/link-1-hover.png`
- Focus: `../screens/states/link-1-focus.png`

**On focus:**

```css
/* outline: rgb(24, 40, 14) none 3px → */ outline: rgb(16, 16, 16) auto 1px;
/* outline-color: rgb(24, 40, 14) → */ outline-color: rgb(16, 16, 16);
```

**Transition:** `all`

### Link 2 — `Customers`

**States:**

- Default: `../screens/states/link-2-default.png`
- Hover: `../screens/states/link-2-hover.png`
- Focus: `../screens/states/link-2-focus.png`

**On hover:**

```css
/* color: rgb(9, 15, 5) → */ color: rgb(63, 115, 8);
/* border-color: rgb(9, 15, 5) → */ border-color: rgb(63, 115, 8);
/* outline: rgb(9, 15, 5) none 3px → */ outline: rgb(63, 115, 8) none 3px;
/* outline-color: rgb(9, 15, 5) → */ outline-color: rgb(63, 115, 8);
```

**On focus:**

```css
/* outline: rgb(9, 15, 5) none 3px → */ outline: rgb(16, 16, 16) auto 1px;
/* outline-color: rgb(9, 15, 5) → */ outline-color: rgb(16, 16, 16);
```

**Transition:** `color 0.25s cubic-bezier(0.4, 0, 0.2, 1), background-color 0.25s cubic-bezier(0.4, 0, 0.2, 1), border-color 0.25s cubic-bezier(0.4, 0, 0.2, 1), outline-color 0.25s cubic-bezier(0.4, 0, 0.2, 1), text-decoration-color 0.25s cubic-bezier(0.4, 0, 0.2, 1), fill 0.25s cubic-bezier(0.4, 0, 0.2, 1), stroke 0.25s cubic-bezier(0.4, 0, 0.2, 1), --tw-gradient-from 0.25s cubic-bezier(0.4, 0, 0.2, 1), --tw-gradient-via 0.25s cubic-bezier(0.4, 0, 0.2, 1), --tw-gradient-to 0.25s cubic-bezier(0.4, 0, 0.2, 1)`

### Link 3 — `Docs`

**States:**

- Default: `../screens/states/link-3-default.png`
- Hover: `../screens/states/link-3-hover.png`
- Focus: `../screens/states/link-3-focus.png`

**On hover:**

```css
/* color: rgb(9, 15, 5) → */ color: rgb(63, 115, 8);
/* border-color: rgb(9, 15, 5) → */ border-color: rgb(63, 115, 8);
/* outline: rgb(9, 15, 5) none 3px → */ outline: rgb(63, 115, 8) none 3px;
/* outline-color: rgb(9, 15, 5) → */ outline-color: rgb(63, 115, 8);
```

**On focus:**

```css
/* outline: rgb(9, 15, 5) none 3px → */ outline: rgb(16, 16, 16) auto 1px;
/* outline-color: rgb(9, 15, 5) → */ outline-color: rgb(16, 16, 16);
```

**Transition:** `color 0.25s cubic-bezier(0.4, 0, 0.2, 1), background-color 0.25s cubic-bezier(0.4, 0, 0.2, 1), border-color 0.25s cubic-bezier(0.4, 0, 0.2, 1), outline-color 0.25s cubic-bezier(0.4, 0, 0.2, 1), text-decoration-color 0.25s cubic-bezier(0.4, 0, 0.2, 1), fill 0.25s cubic-bezier(0.4, 0, 0.2, 1), stroke 0.25s cubic-bezier(0.4, 0, 0.2, 1), --tw-gradient-from 0.25s cubic-bezier(0.4, 0, 0.2, 1), --tw-gradient-via 0.25s cubic-bezier(0.4, 0, 0.2, 1), --tw-gradient-to 0.25s cubic-bezier(0.4, 0, 0.2, 1)`

## Input Interactions

### Input 1 — `Email address`

**States:**

- Default: `../screens/states/input-1-default.png`
- Hover: `../screens/states/input-1-hover.png`
- Focus: `../screens/states/input-1-focus.png`

**On hover:**

```css
/* background-color: rgba(0, 0, 0, 0) → */ background-color: oklab(0.999994 0.0000455678 0.0000200868 / 0.03);
```

**On focus:**

```css
/* background-color: rgba(0, 0, 0, 0) → */ background-color: oklab(0.999994 0.0000455678 0.0000200868 / 0.03);
/* border-color: lab(47.7841 -0.393182 -10.0268) → */ border-color: lab(44.0605 29.0279 -86.0352);
/* box-shadow: rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px → */ box-shadow: rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgb(255, 255, 255) 0px 0px 0px 0px, lab(44.0605 29.0279 -86.0352) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px;
/* outline: rgb(255, 255, 255) solid 0px → */ outline: rgba(0, 0, 0, 0) solid 0px;
/* outline-color: rgb(255, 255, 255) → */ outline-color: rgba(0, 0, 0, 0);
```

**Transition:** `color 0.25s cubic-bezier(0.4, 0, 0.2, 1), background-color 0.25s cubic-bezier(0.4, 0, 0.2, 1), border-color 0.25s cubic-bezier(0.4, 0, 0.2, 1), outline-color 0.25s cubic-bezier(0.4, 0, 0.2, 1), text-decoration-color 0.25s cubic-bezier(0.4, 0, 0.2, 1), fill 0.25s cubic-bezier(0.4, 0, 0.2, 1), stroke 0.25s cubic-bezier(0.4, 0, 0.2, 1), --tw-gradient-from 0.25s cubic-bezier(0.4, 0, 0.2, 1), --tw-gradient-via 0.25s cubic-bezier(0.4, 0, 0.2, 1), --tw-gradient-to 0.25s cubic-bezier(0.4, 0, 0.2, 1)`

## Interaction Rules

- Hover effects include **color transitions** — use the extracted values, not approximations
- Focus states use **outline** (not box-shadow) — always match the extracted focus ring
- Transition durations in use: `0.25s`
- Always respect `prefers-reduced-motion` — set all transitions to `0s` when enabled

