# Component Reference

> Repeated DOM patterns detected by structural analysis. Each component appeared 3+ times.

## Detected Components

| Component | Category | Instances | Key Classes |
|-----------|----------|-----------|-------------|
| **Flex** | card | 14× | `.flex`, `.flex-col`, `.h-[66px]` |
| **Flex** | card | 14× | `.flex`, `.h-7`, `.items-center` |
| **Block** | unknown | 14× | `.block`, `.max-h-full`, `.max-w-full` |
| **Absolute** | unknown | 11× | `.absolute`, `.inset-0`, `.m-0!` |
| **Object Center** | unknown | 10× | `.object-center`, `.object-contain`, `.opacity-100` |
| **Inline Block** | unknown | 7× | `.inline-block` |
| **Appearance None** | card | 7× | `.appearance-none`, `.group`, `.inline-flex` |
| **Absolute** | unknown | 7× | `.absolute`, `.inset-0`, `.size-full` |
| **Size Full** | unknown | 7× | `.size-full` |
| **Content Visibility Auto** | unknown | 6× | `.content-visibility-auto`, `.relative`, `.rive-wrapper` |
| **Flex** | card | 5× | `.flex`, `.gap-x-5`, `.items-center` |
| **Size Full** | unknown | 5× | `.size-full` |
| **Block** | unknown | 5× | `.block` |
| **H Auto** | unknown | 4× | `.h-auto`, `.max-w-full`, `.object-center` |
| **Flex** | unknown | 4× | `.flex`, `.relative` |
| **H Auto** | unknown | 4× | `.h-auto`, `.max-w-full` |
| **Absolute** | unknown | 3× | `.absolute`, `.bg-white`, `.border` |
| **Flex 1** | unknown | 3× | `.flex-1`, `.relative`, `.w-full` |
| **Container** | unknown | 3× | `.container` |
| **Flex** | unknown | 3× | `.flex`, `.flex-col`, `.gap-1` |

## Cards

### Flex

**Instances found:** 14

**CSS classes:** `.flex` `.flex-col` `.h-[66px]` `.items-center` `.relative`

**HTML structure:**

```html
<div class="relative flex h-[66px] flex-col items-center"><div class="flex h-7 w-full max-w-[136px] items-center justify-center lg:h-10 lg:w-[136px]"><picture class="block max-h-full max-w-full"><img alt="Logo (2)" loading="lazy" width="62" height="32" decoding="async" data-nimg="1" class="size-full object-contain object-center opacity-100" style="color:transparent" src="https://spadewp.wpenginepowered.com/wp-content/uploads/2026/06/logo-2.svg"></picture></div></div>
```

**Base styles (from design tokens):**

```css
.flex {
  background: #3f7308;
  border-radius: 4px;
  padding: 8px;
}```

### Flex

**Instances found:** 14

**CSS classes:** `.flex` `.h-7` `.items-center` `.justify-center` `.max-w-[136px]` `.w-full`

**HTML structure:**

```html
<div class="flex h-7 w-full max-w-[136px] items-center justify-center lg:h-10 lg:w-[136px]"><picture class="block max-h-full max-w-full"><img alt="Logo (2)" loading="lazy" width="62" height="32" decoding="async" data-nimg="1" class="size-full object-contain object-center opacity-100" style="color:transparent" src="https://spadewp.wpenginepowered.com/wp-content/uploads/2026/06/logo-2.svg"></picture></div>
```

**Base styles (from design tokens):**

```css
.flex {
  background: #3f7308;
  border-radius: 4px;
  padding: 8px;
}```

### Appearance None

**Instances found:** 7

**CSS classes:** `.appearance-none` `.group` `.inline-flex` `.items-center` `.justify-center` `.min-h-9.75`

**HTML structure:**

```html
<div class="group relative inline-flex appearance-none items-center py-2.5 select-none transition-[color] justify-center text-black min-h-9.75 px-4" type="button"><span class="absolute inset-0 rounded-md transition-[background-color,border-color,transform,scale] group-hover:scale-[0.98] origin-center bg-black/5 group-hover:bg-black/8"></span><span class="text-15px-btn relative z-10">Contact sales</span></div>
```

**Base styles (from design tokens):**

```css
.appearance-none {
  background: #3f7308;
  border-radius: 4px;
  padding: 8px;
}```

### Flex

**Instances found:** 5

**CSS classes:** `.flex` `.gap-x-5` `.items-center` `.mt-6`

**HTML structure:**

```html
<div class="flex items-center gap-x-5 mt-6 sm:mt-7"><a target="" type="button" button="[object Object]" class="inline-block" href="/contact/"><div class="group relative inline-flex appearance-none items-center py-2.5 select-none transition-[color] justify-center text-lemongrass min-h-10.75 px-4.5" type="button"><span class="absolute inset-0 rounded-md transition-[background-color,border-color,transform,scale] group-hover:scale-[0.98] origin-center bg-forest group-hover:bg-forest/90"></span><span class="text-15px-btn relative z-10">Contact sales</span></div></a></div>
```

**Base styles (from design tokens):**

```css
.flex {
  background: #3f7308;
  border-radius: 4px;
  padding: 8px;
}```

## Other Components

### Block

**Instances found:** 14

**CSS classes:** `.block` `.max-h-full` `.max-w-full`

**HTML structure:**

```html
<picture class="block max-h-full max-w-full"><img alt="Logo (2)" loading="lazy" width="62" height="32" decoding="async" data-nimg="1" class="size-full object-contain object-center opacity-100" style="color:transparent" src="https://spadewp.wpenginepowered.com/wp-content/uploads/2026/06/logo-2.svg"></picture>
```

**Base styles (from design tokens):**

```css
.block {
  background: #3f7308;
  padding: 4px;
}```

### Absolute

**Instances found:** 11

**CSS classes:** `.absolute` `.inset-0` `.m-0!` `.pointer-events-none` `.z-10`

**HTML structure:**

```html
<div class="pointer-events-none absolute inset-0 z-10 m-0!"><div class="cut-corner absolute bg-white" style="top: -1px; left: -1px; clip-path: polygon(0px 0px, 100% 0px, 0px 100%); width: 17px; height: 17px;"></div><div class="cut-corner absolute bg-white" style="top: -1px; right: -1px; clip-path: polygon(0px 0px, 100% 0px, 100% 100%); width: 17px; height: 17px;"></div><div class="cut-corner absolute bg-white" style="bottom: -1px; left: -1px; clip-path: polygon(0px 0px, 0px 100%, 100% 100%); width: 17px; height: 17px;"></div><div class="cut-corner absolute bg-white" style="bottom: -1px; right:
```

**Base styles (from design tokens):**

```css
.absolute {
  background: #3f7308;
  padding: 4px;
}```

### Object Center

**Instances found:** 10

**CSS classes:** `.object-center` `.object-contain` `.opacity-100` `.size-full`

**HTML structure:**

```html
<img alt="Logo (2)" loading="lazy" width="62" height="32" decoding="async" data-nimg="1" class="size-full object-contain object-center opacity-100" style="color:transparent" src="https://spadewp.wpenginepowered.com/wp-content/uploads/2026/06/logo-2.svg">
```

**Base styles (from design tokens):**

```css
.object-center {
  background: #3f7308;
  padding: 4px;
}```

### Inline Block

**Instances found:** 7

**CSS classes:** `.inline-block`

**HTML structure:**

```html
<a target="" type="button" button="[object Object]" class="inline-block" href="/contact/"><div class="group relative inline-flex appearance-none items-center py-2.5 select-none transition-[color] justify-center text-black min-h-9.75 px-4" type="button"><span class="absolute inset-0 rounded-md transition-[background-color,border-color,transform,scale] group-hover:scale-[0.98] origin-center bg-black/5 group-hover:bg-black/8"></span><span class="text-15px-btn relative z-10">Contact sales</span></div></a>
```

**Base styles (from design tokens):**

```css
.inline-block {
  background: #3f7308;
  padding: 4px;
}```

### Absolute

**Instances found:** 7

**CSS classes:** `.absolute` `.inset-0` `.size-full`

**HTML structure:**

```html
<div class="absolute inset-0 size-full"><div class="size-full"><div class="rive-wrapper content-visibility-auto relative size-full!"><div class="size-full"><div class="" style="width: 100%; height: 100%;"><canvas style="vertical-align: top; width: 0px; height: 0px;"></canvas></div></div></div></div></div>
```

**Base styles (from design tokens):**

```css
.absolute {
  background: #3f7308;
  padding: 4px;
}```

### Size Full

**Instances found:** 7

**CSS classes:** `.size-full`

**HTML structure:**

```html
<div class="size-full"><div class="rive-wrapper content-visibility-auto relative size-full!"><div class="size-full"><div class="" style="width: 100%; height: 100%;"><canvas style="vertical-align: top; width: 0px; height: 0px;"></canvas></div></div></div></div>
```

**Base styles (from design tokens):**

```css
.size-full {
  background: #3f7308;
  padding: 4px;
}```

### Content Visibility Auto

**Instances found:** 6

**CSS classes:** `.content-visibility-auto` `.relative` `.rive-wrapper` `.size-full!`

**HTML structure:**

```html
<div class="rive-wrapper content-visibility-auto relative size-full!"><div class="size-full"><div class="" style="width: 100%; height: 100%;"><canvas style="vertical-align: top; width: 0px; height: 0px;"></canvas></div></div></div>
```

**Base styles (from design tokens):**

```css
.content-visibility-auto {
  background: #3f7308;
  padding: 4px;
}```

### Size Full

**Instances found:** 5

**CSS classes:** `.size-full`

**HTML structure:**

```html
<div class="size-full"></div>
```

**Base styles (from design tokens):**

```css
.size-full {
  background: #3f7308;
  padding: 4px;
}```

### Block

**Instances found:** 5

**CSS classes:** `.block`

**HTML structure:**

```html
<picture class="block"><img alt="Risk Auth Lifestyle" loading="lazy" width="2280" height="1527" decoding="async" data-nimg="1" class="h-auto max-w-full" style="color:transparent" srcset="/_next/image/?url=https%3A%2F%2Fspadewp.wpenginepowered.com%2Fwp-content%2Fuploads%2F2025%2F12%2FRisk-Auth-Lifestyle.jpg&amp;w=1920&amp;q=75 1x" src="/_next/image/?url=https%3A%2F%2Fspadewp.wpenginepowered.com%2Fwp-content%2Fuploads%2F2025%2F12%2FRisk-Auth-Lifestyle.jpg&amp;w=1920&amp;q=75"></picture>
```

**Base styles (from design tokens):**

```css
.block {
  background: #3f7308;
  padding: 4px;
}```

### H Auto

**Instances found:** 4

**CSS classes:** `.h-auto` `.max-w-full` `.object-center` `.object-contain` `.opacity-100`

**HTML structure:**

```html
<img alt="Citizens" loading="lazy" width="290" height="48" decoding="async" data-nimg="1" class="h-auto max-w-full object-contain object-center opacity-100" style="color:transparent" srcset="/_next/image/?url=https%3A%2F%2Fspadewp.wpenginepowered.com%2Fwp-content%2Fuploads%2F2026%2F03%2Fcitizens.png&amp;w=320&amp;q=75 1x, /_next/image/?url=https%3A%2F%2Fspadewp.wpenginepowered.com%2Fwp-content%2Fuploads%2F2026%2F03%2Fcitizens.png&amp;w=640&amp;q=75 2x" src="/_next/image/?url=https%3A%2F%2Fspadewp.wpenginepowered.com%2Fwp-content%2Fuploads%2F2026%2F03%2Fcitizens.png&amp;w=640&amp;q=75">
```

**Base styles (from design tokens):**

```css
.h-auto {
  background: #3f7308;
  padding: 4px;
}```

### Flex

**Instances found:** 4

**CSS classes:** `.flex` `.relative`

**HTML structure:**

```html
<div class="relative flex" style="width:100%;height:100%"><div class="absolute inset-0 size-full"><div class="size-full"><div class="rive-wrapper content-visibility-auto relative size-full!"><div class="size-full"></div></div></div></div></div>
```

**Base styles (from design tokens):**

```css
.flex {
  background: #3f7308;
  padding: 4px;
}```

### H Auto

**Instances found:** 4

**CSS classes:** `.h-auto` `.max-w-full`

**HTML structure:**

```html
<img alt="Risk Auth Lifestyle" loading="lazy" width="2280" height="1527" decoding="async" data-nimg="1" class="h-auto max-w-full" style="color:transparent" srcset="/_next/image/?url=https%3A%2F%2Fspadewp.wpenginepowered.com%2Fwp-content%2Fuploads%2F2025%2F12%2FRisk-Auth-Lifestyle.jpg&amp;w=1920&amp;q=75 1x" src="/_next/image/?url=https%3A%2F%2Fspadewp.wpenginepowered.com%2Fwp-content%2Fuploads%2F2025%2F12%2FRisk-Auth-Lifestyle.jpg&amp;w=1920&amp;q=75">
```

**Base styles (from design tokens):**

```css
.h-auto {
  background: #3f7308;
  padding: 4px;
}```

### Absolute

**Instances found:** 3

**CSS classes:** `.absolute` `.bg-white` `.border` `.border-black/15` `.group-hover:bg-lemongrass` `.group-hover:border-lemongrass`

**HTML structure:**

```html
<span class="absolute inset-0 rounded-md transition-[background-color,border-color,transform,scale] group-hover:scale-[0.98] origin-center bg-white border border-black/15 group-hover:bg-lemongrass group-hover:border-lemongrass"></span>
```

**Base styles (from design tokens):**

```css
.absolute {
  background: #3f7308;
  padding: 4px;
}```

### Flex 1

**Instances found:** 3

**CSS classes:** `.flex-1` `.relative` `.w-full`

**HTML structure:**

```html
<div class="relative w-full flex-1 md:max-w-[47.5rem]" style="--corner-size-mobile:13px;--corner-size-desktop:17px"><div class="pointer-events-none absolute inset-0 z-10 m-0!"><div class="cut-corner absolute bg-white" style="top: -1px; left: -1px; clip-path: polygon(0px 0px, 100% 0px, 0px 100%); width: 33px; height: 33px;"></div><div class="cut-corner absolute bg-white" style="top: -1px; right: -1px; clip-path: polygon(0px 0px, 100% 0px, 100% 100%); width: 33px; height: 33px;"></div><div class="cut-corner absolute bg-white" style="bottom: -1px; left: -1px; clip-path: polygon(0px 0px, 0px 100%,
```

**Base styles (from design tokens):**

```css
.flex-1 {
  background: #3f7308;
  padding: 4px;
}```

### Container

**Instances found:** 3

**CSS classes:** `.container`

**HTML structure:**

```html
<div class="container"><div class="pt-20 pb-16 sm:py-20 lg:h-[400vh] lg:py-0"><div class="relative flex flex-col items-center justify-center lg:sticky lg:top-0 lg:h-screen"><h2 class="text-48px-heading mx-auto w-full max-w-108 text-center">Built for every layer of modern finance</h2><div class="relative z-100 mx-auto aspect-[340/360] w-full max-w-[21.25rem] max-lg:hidden"><video class="block h-full w-full object-contain" muted="" playsinline="" preload="auto" src="blob:https://spade.com/be6b40ec-8ba8-44f5-8f86-1b24c38a7acf"></video></div><div class="relative mx-auto -mt-6 flex w-full max-w-[68
```

**Base styles (from design tokens):**

```css
.container {
  background: #3f7308;
  padding: 4px;
}```

### Flex

**Instances found:** 3

**CSS classes:** `.flex` `.flex-col` `.gap-1`

**HTML structure:**

```html
<div class="flex flex-col gap-1"><h3 class="text-20px-heading">Infrastructure for innovation</h3><p class="text-16px-body opacity-80">Power new products, rewards, and AI capa…</p></div>
```

**Base styles (from design tokens):**

```css
.flex {
  background: #3f7308;
  padding: 4px;
}```

## Component Rules

- Match class names exactly from the patterns above
- Each component instance must be visually identical to others of its type
- Do not add extra wrappers or change the DOM structure

