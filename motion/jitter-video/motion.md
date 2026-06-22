# MOTION.md — jitter.video Motion System
> Reverse-engineered from jitter.video (2026)
> Built on Gatsby — clean white SaaS design with animated product previews
> Drop into Cursor, Claude Code, v0, Lovable, or Codex for on-brand animations.

---

## Design Philosophy

Jitter's motion is **clean, confident, and self-referential** — a motion design
tool whose own website is a showcase of motion craft. Every section proves the
product works. Animations are purposeful but never distracting, light but never
lazy. This is the most purely "SaaS on white" system in your collection.

Core principles:
- **White-first, no dark sections** — `#FFFFFF` background throughout, no
  dramatic color shifts. Motion must work without color contrast as a crutch.
- **Product previews ARE the animation** — hero and feature sections use
  live Jitter-rendered animation previews and video loops, not static images.
- **Section structure drives the scroll rhythm** — each major section
  (Import → Design → Animate → Collaborate → Export) has its own heading
  entrance, feature list reveal, and visual payload.
- **Typography animates on the hero** — the two-line headline "Super / fast"
  uses size contrast as a design element, with the second word significantly
  larger than the first.
- **Horizontal scrolling template gallery** — the template grid auto-scrolls
  horizontally on loop, showing community work in a controlled marquee.
- **Micro-interactions are the highest craft level** — hover states on nav
  dropdowns, template cards, and feature items are all precisely tuned.
- **Badge system** — "new", "4K", "Official Figma Partner" badges pop in
  with scale bounces next to features.
- **No gimmicks** — no floating images, no cursor trails, no particle effects.
  Motion is always in service of comprehension.

---

## Color & Background Context

```
Background:           #FFFFFF   (pure white — used everywhere)
Surface light:        #F7F7F7   (feature cards, code blocks)
Surface medium:       #F0F0F0   (hover states, tab active)
Border light:         #EBEBEB   (card borders, dividers)
Border medium:        #D4D4D4   (stronger separators, inputs)
Text primary:         #0A0A0A   (near-black headline text)
Text secondary:       #6B6B6B   (body copy, captions)
Text muted:           #9B9B9B   (placeholders, footnotes)
Text on dark:         #FFFFFF   (on dark CTA sections)

Accent purple:        #5B47E0   (primary CTA, links, active states)
Accent purple light:  #7B67FF   (hover on purple)
Accent purple bg:     rgba(91, 71, 224, 0.08)  (soft pill backgrounds)
Accent green:         #22C55E   (success, "new" badges)
Accent orange:        #F97316   (warm badges, export tags)

Dark CTA section:     #0A0A0A   (bottom CTA reverses to near-black)
Dark surface:         #141414   (cards inside dark CTA)
```

Jitter lives on white. The purple accent `#5B47E0` is the only strong
color signal. Every interactive element either goes purple or shifts to
a slightly darker grey — never a full-spectrum color explosion.

---

## Duration Scale

```css
:root {
  --duration-instant:   60ms;     /* toggle, checkbox */
  --duration-micro:     120ms;    /* badge counters */
  --duration-fast:      180ms;    /* hover micro-states */
  --duration-base:      260ms;    /* standard transitions */
  --duration-medium:    400ms;    /* card reveals, dropdown */
  --duration-slow:      550ms;    /* section headings */
  --duration-slower:    720ms;    /* hero content */
  --duration-template:  40000ms;  /* template gallery auto-scroll */
  --duration-preview:   30000ms;  /* hero animation preview loop */
}
```

---

## Easing Scale

```css
:root {
  /* Primary — clean, efficient deceleration */
  --ease-out:           cubic-bezier(0.25, 1, 0.5, 1);

  /* Snappy — nav dropdowns, quick hovers */
  --ease-out-sharp:     cubic-bezier(0.16, 1, 0.3, 1);

  /* In-out — tab panels, content swaps */
  --ease-in-out:        cubic-bezier(0.4, 0, 0.2, 1);

  /* Exit */
  --ease-in:            cubic-bezier(0.4, 0, 1, 1);

  /* Badge bounce — "new", "4K" labels */
  --ease-out-back:      cubic-bezier(0.34, 1.4, 0.64, 1);

  /* Linear — template gallery scroll */
  --ease-linear:        linear;
}
```

**`cubic-bezier(0.25, 1, 0.5, 1)` is Jitter's primary easing** — nearly
identical to Figma's signature. Both are white-background, designer-facing
tools, and both opt for the softer, warmer deceleration over the snappier
expo curves of Railway/Clerk. The curve feels precise but approachable.

---

## Core Keyframes

```css
/* === ENTRANCES === */

@keyframes fadeUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeUpSmall {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeIn {
  from { opacity: 0; }
  to   { opacity: 1; }
}

@keyframes scaleIn {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

/* Badge pop — "new", "4K" labels */
@keyframes badgePop {
  from {
    opacity: 0;
    transform: scale(0.7) translateY(4px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

/* Word size contrast reveal — "Super / fast" hero */
@keyframes wordReveal {
  from {
    opacity: 0;
    transform: translateY(16px) skewY(1deg);
  }
  to {
    opacity: 1;
    transform: translateY(0) skewY(0deg);
  }
}

/* Shimmer — skeleton loading states */
@keyframes shimmer {
  from { background-position: -200% 0; }
  to   { background-position: 200% 0; }
}

/* === EXITS === */

@keyframes fadeOutUp {
  from {
    opacity: 1;
    transform: translateY(0);
  }
  to {
    opacity: 0;
    transform: translateY(-10px);
  }
}

@keyframes fadeOutDown {
  from {
    opacity: 1;
    transform: translateY(0);
  }
  to {
    opacity: 0;
    transform: translateY(8px);
  }
}

/* === CONTINUOUS === */

@keyframes templateScroll {
  from { transform: translateX(0); }
  to   { transform: translateX(-50%); }
}

/* Preview animation counter — the "0.00" ticking timer in hero */
@keyframes counterTick {
  from { opacity: 0; transform: translateY(4px); }
  to   { opacity: 1; transform: translateY(0); }
}
```

---

## Hero Section

Jitter's hero is **white with a large typographic statement** and a live
animation preview playing in a card below. The headline uses extreme size
contrast — "Super" is smaller, "fast" is massive. Below is a rotating
carousel of Jitter animation previews with a "Open in Jitter ↗" link.

```css
/* AI feature announcement banner */
.hero-banner {
  animation: fadeDown 350ms var(--ease-out-sharp) both;
  background: #F7F7F7;
  border: 1px solid #EBEBEB;
  border-radius: 100px;
}

@keyframes fadeDown {
  from { opacity: 0; transform: translateY(-8px); }
  to   { opacity: 1; transform: translateY(0); }
}

.hero-banner-link {
  transition:
    background   160ms var(--ease-out),
    border-color 160ms var(--ease-out);
}

.hero-banner-link:hover {
  background: #F0F0F0;
}

/* "Super" — smaller top word */
.hero-word-1 {
  animation: wordReveal 600ms var(--ease-out) 150ms both;
  display: block;
}

/* "fast" — the oversized hero word */
.hero-word-2 {
  animation: wordReveal 600ms var(--ease-out) 250ms both;
  display: block;
  font-size: clamp(80px, 12vw, 160px);
  line-height: 0.9;
  letter-spacing: -0.04em;
}

/* "motion for every team" — subtitle line */
.hero-subtitle {
  animation: wordReveal 500ms var(--ease-out) 350ms both;
}

/* CTA button */
.hero-cta {
  animation: fadeUpSmall 450ms var(--ease-out) 450ms both;
}

/* "Over 20,000 creative teams use Jitter" */
.hero-social-proof {
  animation: fadeIn 400ms var(--ease-out) 600ms both;
  opacity: 0.65;
}

/* Customer logo strip */
.hero-logo-strip {
  animation: fadeIn 500ms var(--ease-out) 700ms both;
}

/* The live animation preview card */
.hero-preview-card {
  animation: scaleIn 700ms var(--ease-out) 400ms both;
  border: 1px solid #EBEBEB;
  border-radius: 20px;
  overflow: hidden;
  box-shadow:
    0 2px 4px rgba(0, 0, 0, 0.04),
    0 16px 48px rgba(0, 0, 0, 0.08);
}

/* "Open in Jitter ↗" label inside preview */
.hero-preview-link {
  transition:
    opacity   160ms var(--ease-out),
    transform 160ms var(--ease-out);
  opacity: 0.6;
}

.hero-preview-link:hover {
  opacity: 1;
  transform: translateX(2px);
}

/* Timer counter "0.00" inside preview */
.hero-preview-counter {
  animation: counterTick 300ms var(--ease-out) 1000ms both;
  font-variant-numeric: tabular-nums;
  letter-spacing: -0.02em;
}
```

---

## Navigation

Jitter nav is white with a mega-dropdown for Products and Customers.
The dropdown is the most complex nav element — it reveals sub-items
as a grid of image+title pairs with a smooth entrance.

```css
/* Nav bar */
nav {
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(16px);
  border-bottom: 1px solid #EBEBEB;
  transition: box-shadow 200ms var(--ease-out);
}

nav.scrolled {
  box-shadow: 0 1px 0 #EBEBEB, 0 4px 16px rgba(0, 0, 0, 0.04);
}

/* Nav links */
.nav-link {
  transition:
    color       160ms var(--ease-out),
    background  160ms var(--ease-out);
  color: #0A0A0A;
  border-radius: 6px;
  padding: 6px 10px;
}

.nav-link:hover {
  background: #F0F0F0;
  color: #0A0A0A;
}

.nav-link.active {
  color: #5B47E0;
}

/* "Log in" nav link */
.nav-login {
  transition:
    color   160ms var(--ease-out),
    opacity 160ms var(--ease-out);
  color: #6B6B6B;
}

.nav-login:hover {
  color: #0A0A0A;
  opacity: 1;
}

/* "Try for free" CTA in nav */
.nav-cta {
  transition:
    background   160ms var(--ease-out),
    box-shadow   160ms var(--ease-out),
    transform    100ms var(--ease-out);
  background: #0A0A0A;
  color: #FFFFFF;
  border-radius: 8px;
}

.nav-cta:hover {
  background: #1A1A1A;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  transform: translateY(-1px);
}

.nav-cta:active {
  transform: scale(0.97);
  transition-duration: 60ms;
}

/* Mega dropdown panel */
.nav-dropdown {
  animation: dropdownOpen 220ms var(--ease-out) both;
  background: #FFFFFF;
  border: 1px solid #EBEBEB;
  border-radius: 16px;
  box-shadow:
    0 4px 6px rgba(0, 0, 0, 0.04),
    0 16px 40px rgba(0, 0, 0, 0.1);
  transform-origin: top center;
}

@keyframes dropdownOpen {
  from {
    opacity: 0;
    transform: translateY(-8px) scale(0.97);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

.nav-dropdown[data-state="closed"] {
  animation: fadeOutUp 140ms var(--ease-in) both;
}

/* Dropdown menu items (product sub-items) */
.dropdown-item {
  transition:
    background  140ms var(--ease-out),
    border-color 140ms var(--ease-out);
  border: 1px solid transparent;
  border-radius: 12px;
  padding: 12px;
}

.dropdown-item:hover {
  background: #F7F7F7;
  border-color: #EBEBEB;
}

/* Dropdown item icon/image — scale on parent hover */
.dropdown-item-icon {
  transition: transform 200ms var(--ease-out-back);
}

.dropdown-item:hover .dropdown-item-icon {
  transform: scale(1.06);
}

/* "What's new" sidebar in dropdown */
.dropdown-changelog {
  border-left: 1px solid #EBEBEB;
  padding-left: 20px;
}

.dropdown-changelog-item {
  transition:
    color  140ms var(--ease-out),
    opacity 140ms var(--ease-out);
  color: #6B6B6B;
  opacity: 0.8;
}

.dropdown-changelog-item:hover {
  color: #5B47E0;
  opacity: 1;
}
```

---

## Buttons

```css
/* Primary — "Try Jitter for free", "Get started for free" */
.btn-primary {
  transition:
    background  180ms var(--ease-out),
    box-shadow  180ms var(--ease-out),
    transform   100ms var(--ease-out);
  background: #5B47E0;
  color: #FFFFFF;
  border-radius: 10px;
  font-weight: 500;
}

.btn-primary:hover {
  background: #7B67FF;
  box-shadow:
    0 0 0 3px rgba(91, 71, 224, 0.15),
    0 4px 16px rgba(91, 71, 224, 0.25);
  transform: translateY(-1px);
}

.btn-primary:active {
  transform: scale(0.97) translateY(0);
  box-shadow: none;
  transition-duration: 60ms;
}

/* Secondary — "Explore all the features", "Read customer stories" */
.btn-secondary {
  transition:
    background   180ms var(--ease-out),
    border-color 180ms var(--ease-out),
    color        180ms var(--ease-out),
    transform    100ms var(--ease-out);
  background: transparent;
  border: 1px solid #D4D4D4;
  color: #0A0A0A;
  border-radius: 10px;
}

.btn-secondary:hover {
  background: #F7F7F7;
  border-color: #9B9B9B;
  transform: translateY(-1px);
}

.btn-secondary:active {
  transform: scale(0.97);
  transition-duration: 60ms;
}

/* Dark CTA section button — white on dark */
.btn-dark-cta {
  transition:
    background  180ms var(--ease-out),
    box-shadow  180ms var(--ease-out),
    transform   100ms var(--ease-out);
  background: #FFFFFF;
  color: #0A0A0A;
  border-radius: 10px;
}

.btn-dark-cta:hover {
  background: #F0F0F0;
  box-shadow: 0 4px 20px rgba(255, 255, 255, 0.2);
  transform: translateY(-1px);
}

.btn-dark-cta:active {
  transform: scale(0.97);
  transition-duration: 60ms;
}
```

---

## Feature Section Reveals

Each major section (Import → Design → Animate → Collaborate → Export)
has a consistent reveal pattern — section label, then headline, then
feature grid. Always on white with subtle dividers.

```css
/* Section label — "No learning curve", "Create faster" */
.section-label {
  opacity: 0;
  transform: translateY(10px);
  transition:
    opacity   350ms var(--ease-out),
    transform 350ms var(--ease-out);
  color: #5B47E0;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.section-label.visible {
  opacity: 1;
  transform: translateY(0);
}

/* Section headline */
.section-headline {
  opacity: 0;
  transform: translateY(16px);
  transition:
    opacity   500ms var(--ease-out) 60ms,
    transform 500ms var(--ease-out) 60ms;
}

.section-headline.visible {
  opacity: 1;
  transform: translateY(0);
}

/* Section subheadline / body */
.section-body {
  opacity: 0;
  transform: translateY(12px);
  transition:
    opacity   450ms var(--ease-out) 120ms,
    transform 450ms var(--ease-out) 120ms;
}

.section-body.visible {
  opacity: 1;
  transform: translateY(0);
}
```

---

## Feature List Items (bullet-style feature rows)

Each section has 3–9 feature items listed in a grid or list.

```css
/* Feature list item */
.feature-item {
  opacity: 0;
  transform: translateY(12px);
  transition:
    opacity   400ms var(--ease-out),
    transform 400ms var(--ease-out),
    background 160ms var(--ease-out),
    border-color 160ms var(--ease-out);
  border: 1px solid transparent;
  border-radius: 12px;
  padding: 16px;
}

.feature-item.visible {
  opacity: 1;
  transform: translateY(0);
}

/* Stagger feature items tightly */
.feature-item.visible:nth-child(1) { transition-delay: 0ms; }
.feature-item.visible:nth-child(2) { transition-delay: 60ms; }
.feature-item.visible:nth-child(3) { transition-delay: 120ms; }
.feature-item.visible:nth-child(4) { transition-delay: 180ms; }
.feature-item.visible:nth-child(5) { transition-delay: 240ms; }
.feature-item.visible:nth-child(6) { transition-delay: 300ms; }

/* Hover state */
.feature-item:hover {
  background: #F7F7F7;
  border-color: #EBEBEB;
}

/* Feature icon inside item */
.feature-item-icon {
  transition:
    transform  200ms var(--ease-out-back),
    opacity    160ms var(--ease-out);
  opacity: 0.7;
}

.feature-item:hover .feature-item-icon {
  transform: scale(1.1);
  opacity: 1;
}

/* Feature item title */
.feature-item-title {
  transition: color 160ms var(--ease-out);
}

.feature-item:hover .feature-item-title {
  color: #5B47E0;
}
```

---

## Feature Visual (Screenshots & UI Previews)

Each section has a large product screenshot or UI preview that
enters with a gentle scale + fade from below.

```css
.feature-visual {
  opacity: 0;
  transform: translateY(24px) scale(0.97);
  transition:
    opacity   600ms var(--ease-out) 100ms,
    transform 600ms var(--ease-out) 100ms;
  border-radius: 16px;
  overflow: hidden;
  border: 1px solid #EBEBEB;
  box-shadow:
    0 2px 4px rgba(0, 0, 0, 0.04),
    0 8px 24px rgba(0, 0, 0, 0.06);
}

.feature-visual.visible {
  opacity: 1;
  transform: translateY(0) scale(1);
}

/* Video/preview inside visual frame */
.feature-visual video,
.feature-visual img {
  display: block;
  width: 100%;
  transition: transform 500ms var(--ease-out);
}

.feature-visual:hover video,
.feature-visual:hover img {
  transform: scale(1.01);
}
```

---

## "New" Badge & Feature Tags

New feature badges pop in with a spring bounce, positioned inline
with feature headings.

```css
.badge-new {
  display: inline-flex;
  animation: badgePop 350ms var(--ease-out-back) 300ms both;
  background: rgba(34, 197, 94, 0.12);
  color: #16A34A;
  border: 1px solid rgba(34, 197, 94, 0.2);
  border-radius: 100px;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  padding: 2px 8px;
  vertical-align: middle;
  margin-left: 8px;
}

.badge-4k {
  animation: badgePop 350ms var(--ease-out-back) 300ms both;
  background: rgba(249, 115, 22, 0.1);
  color: #EA580C;
  border: 1px solid rgba(249, 115, 22, 0.2);
  border-radius: 100px;
  font-size: 10px;
  font-weight: 700;
  padding: 2px 8px;
}

.badge-partner {
  animation: badgePop 350ms var(--ease-out-back) 400ms both;
  background: rgba(91, 71, 224, 0.08);
  color: #5B47E0;
  border: 1px solid rgba(91, 71, 224, 0.15);
  border-radius: 100px;
  font-size: 11px;
  font-weight: 600;
  padding: 4px 12px;
}
```

---

## Template Gallery (Horizontal Auto-Scroll)

The template gallery is a **horizontally scrolling grid** that loops
continuously, showing 300+ community templates. Three duplicate rows
scroll at the same speed.

```css
/* Gallery wrapper */
.template-gallery {
  overflow: hidden;
  position: relative;
  mask-image: linear-gradient(
    to right,
    transparent 0%,
    black 4%,
    black 96%,
    transparent 100%
  );
}

/* Scrolling track — duplicated for seamless loop */
.template-track {
  display: flex;
  width: max-content;
  gap: 16px;
  animation: templateScroll 40000ms linear infinite;
}

/* Pause on hover */
.template-gallery:hover .template-track {
  animation-play-state: paused;
}

/* Individual template card */
.template-card {
  flex-shrink: 0;
  width: 280px;
  border-radius: 16px;
  overflow: hidden;
  background: #FFFFFF;
  border: 1px solid #EBEBEB;
  transition:
    border-color 200ms var(--ease-out),
    box-shadow   200ms var(--ease-out),
    transform    200ms var(--ease-out);
}

.template-card:hover {
  border-color: #D4D4D4;
  box-shadow:
    0 4px 8px rgba(0, 0, 0, 0.06),
    0 12px 28px rgba(0, 0, 0, 0.08);
  transform: translateY(-4px);
}

/* "Open template ↗" overlay — appears on hover */
.template-card-overlay {
  position: absolute;
  inset: 0;
  background: rgba(10, 10, 10, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 200ms var(--ease-out);
  border-radius: 16px;
}

.template-card:hover .template-card-overlay {
  opacity: 1;
}

/* Overlay CTA text */
.template-card-overlay-text {
  color: #FFFFFF;
  font-size: 14px;
  font-weight: 500;
  transform: translateY(6px);
  transition: transform 200ms var(--ease-out);
}

.template-card:hover .template-card-overlay-text {
  transform: translateY(0);
}

/* Template thumbnail */
.template-card-thumb {
  transition: transform 400ms var(--ease-out);
}

.template-card:hover .template-card-thumb {
  transform: scale(1.04);
}

/* Template title below thumb */
.template-card-title {
  padding: 12px 14px 14px;
  font-size: 13px;
  font-weight: 500;
  color: #0A0A0A;
  transition: color 160ms var(--ease-out);
}

.template-card:hover .template-card-title {
  color: #5B47E0;
}

/* Template author */
.template-card-author {
  font-size: 12px;
  color: #9B9B9B;
  padding: 0 14px 12px;
}
```

---

## Customer Logo Strip (Homepage)

The row of 14 customer logos beneath the social proof line.
They fade in as a group and desaturate to grey.

```css
.customer-logo-strip {
  display: flex;
  align-items: center;
  gap: 32px;
  flex-wrap: wrap;
  animation: fadeIn 600ms var(--ease-out) 700ms both;
}

.customer-logo {
  transition:
    opacity  200ms var(--ease-out),
    filter   200ms var(--ease-out);
  opacity: 0.45;
  filter: grayscale(100%);
}

.customer-logo:hover {
  opacity: 0.85;
  filter: grayscale(0%);
}
```

---

## Testimonial / Quote Block

Large pull quotes (Deliveroo, Perplexity) appear with their
attribution — structured exactly the same as Figma's testimonials.

```css
.quote-block {
  opacity: 0;
  transform: translateY(16px);
  transition:
    opacity   550ms var(--ease-out) 80ms,
    transform 550ms var(--ease-out) 80ms;
}

.quote-block.visible {
  opacity: 1;
  transform: translateY(0);
}

/* Quote text */
.quote-text {
  font-size: clamp(20px, 3vw, 32px);
  line-height: 1.3;
  color: #0A0A0A;
}

/* "Quote Image" inline icon (the speech bubble SVG) */
.quote-icon {
  display: inline-block;
  animation: badgePop 300ms var(--ease-out-back) 200ms both;
  vertical-align: middle;
  margin: 0 4px;
}

/* Author row */
.quote-author {
  opacity: 0;
  transition: opacity 400ms var(--ease-out) 250ms;
  display: flex;
  align-items: center;
  gap: 12px;
  margin-top: 20px;
}

.quote-block.visible .quote-author {
  opacity: 1;
}

/* Author avatar */
.quote-avatar {
  border-radius: 50%;
  overflow: hidden;
  transition: transform 200ms var(--ease-out-back);
}

.quote-block:hover .quote-avatar {
  transform: scale(1.06);
}

/* Author name */
.quote-name {
  font-size: 14px;
  font-weight: 600;
  color: #0A0A0A;
}

/* Author role */
.quote-role {
  font-size: 13px;
  color: #6B6B6B;
}
```

---

## Use Cases Tab Switcher (Social / Advertising / Prototyping)

Three use case sections with a tabbed switcher.

```css
/* Tab list */
.usecase-tabs {
  display: flex;
  gap: 4px;
  border-bottom: 1px solid #EBEBEB;
  margin-bottom: 32px;
}

/* Tab button */
.usecase-tab {
  transition:
    color       180ms var(--ease-out),
    border-color 180ms var(--ease-out),
    background  180ms var(--ease-out);
  color: #6B6B6B;
  padding: 10px 16px;
  border-bottom: 2px solid transparent;
  margin-bottom: -1px;
  font-size: 14px;
  font-weight: 500;
}

.usecase-tab:hover {
  color: #0A0A0A;
  background: #F7F7F7;
  border-radius: 8px 8px 0 0;
}

.usecase-tab.active {
  color: #5B47E0;
  border-bottom-color: #5B47E0;
}

/* Tab panel */
.usecase-panel {
  animation: fadeIn 280ms var(--ease-out) both;
}

.usecase-panel[data-state="exit"] {
  animation: fadeOutDown 160ms var(--ease-in) both;
}
```

---

## Section Divider Cards (Release Notes + Pricing)

The two promotional cards near the bottom of the page — dark bordered
cards linking to Changelog and Pricing.

```css
.promo-card {
  opacity: 0;
  transform: translateY(14px);
  transition:
    opacity      450ms var(--ease-out),
    transform    450ms var(--ease-out),
    border-color 200ms var(--ease-out),
    box-shadow   200ms var(--ease-out),
    transform    200ms var(--ease-out);
  border: 1px solid #EBEBEB;
  border-radius: 16px;
  background: #FFFFFF;
}

.promo-card.visible {
  opacity: 1;
  transform: translateY(0);
}

.promo-card:nth-child(2) { transition-delay: 80ms; }

.promo-card:hover {
  border-color: #5B47E0;
  box-shadow: 0 4px 20px rgba(91, 71, 224, 0.1);
  transform: translateY(-2px);
}

/* Arrow icon inside card */
.promo-card-arrow {
  transition: transform 200ms var(--ease-out-back);
  color: #5B47E0;
}

.promo-card:hover .promo-card-arrow {
  transform: translateX(4px);
}
```

---

## Award Badges (Figma Partner, Product Hunt, Contra Award)

The three award badges at the bottom reveal with staggered pop.

```css
.award-badge {
  opacity: 0;
  animation: badgePop 400ms var(--ease-out-back) both;
}

.award-badge:nth-child(1) { animation-delay: 0ms; }
.award-badge:nth-child(2) { animation-delay: 80ms; }
.award-badge:nth-child(3) { animation-delay: 160ms; }

.award-badge:hover {
  transform: scale(1.04);
  transition: transform 200ms var(--ease-out-back);
}
```

---

## Dark CTA Section (Bottom)

The closing "Try Jitter today" section reverses to dark.
Content enters as it scrolls into view.

```css
/* Dark section container */
.cta-dark {
  background: #0A0A0A;
  border-radius: 24px;
  overflow: hidden;
}

/* Headline on dark */
.cta-dark-headline {
  opacity: 0;
  transform: translateY(20px);
  transition:
    opacity   550ms var(--ease-out),
    transform 550ms var(--ease-out);
  color: #FFFFFF;
}

.cta-dark-headline.visible {
  opacity: 1;
  transform: translateY(0);
}

/* Sub text */
.cta-dark-body {
  opacity: 0;
  transition:
    opacity   450ms var(--ease-out) 80ms;
  color: rgba(255, 255, 255, 0.55);
}

.cta-dark-body.visible {
  opacity: 1;
}

/* CTA button on dark */
.cta-dark .btn-dark-cta {
  opacity: 0;
  transform: translateY(10px);
  transition:
    opacity   400ms var(--ease-out) 160ms,
    transform 400ms var(--ease-out) 160ms;
}

.cta-dark .btn-dark-cta.visible {
  opacity: 1;
  transform: translateY(0);
}
```

---

## Newsletter Signup

```css
.newsletter-form {
  display: flex;
  gap: 8px;
}

.newsletter-input {
  transition:
    border-color 160ms var(--ease-out),
    box-shadow   160ms var(--ease-out);
  border: 1px solid #D4D4D4;
  border-radius: 8px;
  background: #FFFFFF;
  color: #0A0A0A;
}

.newsletter-input:focus {
  outline: none;
  border-color: #5B47E0;
  box-shadow: 0 0 0 3px rgba(91, 71, 224, 0.12);
}

.newsletter-input::placeholder {
  color: #9B9B9B;
}

/* Submit button */
.newsletter-submit {
  transition:
    background  160ms var(--ease-out),
    transform   100ms var(--ease-out);
  background: #0A0A0A;
  color: #FFFFFF;
  border-radius: 8px;
}

.newsletter-submit:hover {
  background: #1A1A1A;
  transform: translateY(-1px);
}

.newsletter-submit:active {
  transform: scale(0.97);
  transition-duration: 60ms;
}

/* "Subscribed!" success state */
.newsletter-success {
  animation: fadeUpSmall 300ms var(--ease-out-back) both;
  color: #16A34A;
}
```

---

## Footer

```css
/* Footer section headings */
.footer-heading {
  font-size: 13px;
  font-weight: 600;
  color: #0A0A0A;
  margin-bottom: 12px;
}

/* Footer links */
.footer-link {
  transition:
    color   160ms var(--ease-out),
    opacity 160ms var(--ease-out);
  color: #6B6B6B;
  font-size: 13px;
}

.footer-link:hover {
  color: #0A0A0A;
}

/* External link arrow */
.footer-link-external {
  transition: transform 160ms var(--ease-out);
  display: inline-block;
  opacity: 0.4;
}

.footer-link:hover .footer-link-external {
  transform: translate(2px, -2px);
  opacity: 0.8;
}

/* Social icons */
.footer-social {
  transition:
    opacity   160ms var(--ease-out),
    transform 160ms var(--ease-out),
    color     160ms var(--ease-out);
  opacity: 0.45;
  color: #0A0A0A;
}

.footer-social:hover {
  opacity: 1;
  transform: scale(1.12);
  color: #5B47E0;
}

.footer-social:active {
  transform: scale(0.94);
  transition-duration: 60ms;
}
```

---

## Scroll Behavior & IntersectionObserver

```css
html {
  scroll-behavior: smooth;
}
```

```js
// Jitter-style scroll trigger — tight threshold, clean fire-once
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible')
        observer.unobserve(entry.target)
      }
    })
  },
  {
    threshold: 0.12,
    rootMargin: '0px 0px -32px 0px'
  }
)

document
  .querySelectorAll(
    '.section-label, .section-headline, .section-body, ' +
    '.feature-item, .feature-visual, .quote-block, ' +
    '.promo-card, .cta-dark-headline, .cta-dark-body, ' +
    '.award-badge'
  )
  .forEach(el => observer.observe(el))

// Sticky nav shadow on scroll
const nav = document.querySelector('nav')
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 20)
}, { passive: true })
```

---

## Reduced Motion

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }

  /* Template gallery stops */
  .template-track {
    animation: none;
  }

  /* Overlay still works but without animation */
  .template-card-overlay {
    transition: none;
  }

  html {
    scroll-behavior: auto;
  }
}
```

---

## Framer Motion Equivalents (React)

```js
// Jitter's primary easing
const easeOut      = [0.25, 1, 0.5, 1]
const easeOutSharp = [0.16, 1, 0.3, 1]
const easeOutBack  = [0.34, 1.4, 0.64, 1]
const easeIn       = [0.4, 0, 1, 1]
const easeInOut    = [0.4, 0, 0.2, 1]

// === CORE VARIANTS ===

export const fadeUp = {
  hidden:  { opacity: 0, y: 20 },
  visible: {
    opacity: 1, y: 0,
    transition: { duration: 0.55, ease: easeOut }
  }
}

export const fadeUpSmall = {
  hidden:  { opacity: 0, y: 10 },
  visible: {
    opacity: 1, y: 0,
    transition: { duration: 0.4, ease: easeOut }
  }
}

export const fadeIn = {
  hidden:  { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.35, ease: easeOut }
  }
}

export const scaleIn = {
  hidden:  { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1, scale: 1,
    transition: { duration: 0.4, ease: easeOut }
  }
}

// === HERO WORD REVEAL ===

export const wordReveal = {
  hidden:  { opacity: 0, y: 16, skewY: 1 },
  visible: {
    opacity: 1, y: 0, skewY: 0,
    transition: { duration: 0.6, ease: easeOut }
  }
}

export const heroStagger = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.15 }
  }
}

// === BADGE POP ===

export const badgePop = {
  hidden:  { opacity: 0, scale: 0.7, y: 4 },
  visible: {
    opacity: 1, scale: 1, y: 0,
    transition: { duration: 0.35, ease: easeOutBack }
  }
}

// === NAV DROPDOWN ===

export const dropdownVariant = {
  hidden:  { opacity: 0, y: -8, scale: 0.97 },
  visible: {
    opacity: 1, y: 0, scale: 1,
    transition: { duration: 0.22, ease: easeOut }
  },
  exit: {
    opacity: 0, y: -6,
    transition: { duration: 0.14, ease: easeIn }
  }
}

// === FEATURE ITEM STAGGER ===

export const featureStagger = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.06, delayChildren: 0.05 }
  }
}

export const featureItem = {
  hidden:  { opacity: 0, y: 12 },
  visible: {
    opacity: 1, y: 0,
    transition: { duration: 0.4, ease: easeOut }
  }
}

// === FEATURE VISUAL ===

export const featureVisual = {
  hidden:  { opacity: 0, y: 24, scale: 0.97 },
  visible: {
    opacity: 1, y: 0, scale: 1,
    transition: { duration: 0.6, ease: easeOut, delay: 0.1 }
  }
}

// === TEMPLATE CARD ===

export const templateCard = {
  rest:  { y: 0, scale: 1 },
  hover: {
    y: -4,
    transition: { duration: 0.2, ease: easeOut }
  }
}

export const templateOverlay = {
  rest:  { opacity: 0 },
  hover: {
    opacity: 1,
    transition: { duration: 0.2, ease: easeOut }
  }
}

export const templateOverlayText = {
  rest:  { y: 6, opacity: 0 },
  hover: {
    y: 0, opacity: 1,
    transition: { duration: 0.2, ease: easeOut }
  }
}

// === QUOTE BLOCK ===

export const quoteBlock = {
  hidden:  { opacity: 0, y: 16 },
  visible: {
    opacity: 1, y: 0,
    transition: { duration: 0.55, ease: easeOut, delay: 0.08 }
  }
}

// === BUTTON ===

export const buttonMotion = {
  rest:  { y: 0, scale: 1 },
  hover: {
    y: -1,
    transition: { duration: 0.18, ease: easeOut }
  },
  tap: {
    scale: 0.97, y: 0,
    transition: { duration: 0.06 }
  }
}

// === PROMO CARD ===

export const promoCard = {
  rest: {
    borderColor: '#EBEBEB',
    boxShadow: '0 0 0px rgba(91,71,224,0)'
  },
  hover: {
    borderColor: '#5B47E0',
    boxShadow: '0 4px 20px rgba(91,71,224,0.1)',
    y: -2,
    transition: { duration: 0.2, ease: easeOut }
  }
}

export const promoArrow = {
  rest:  { x: 0 },
  hover: {
    x: 4,
    transition: { duration: 0.2, ease: easeOutBack }
  }
}

// === TAB PANEL ===

export const tabPanel = {
  hidden:  { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.28, ease: easeOut }
  },
  exit: {
    opacity: 0,
    y: 8,
    transition: { duration: 0.16, ease: easeIn }
  }
}
```

---

## Jitter vs. the Rest — What's Unique

| Feature | Jitter | Figma | Arc | Contra Labs | Clerk |
|---|---|---|---|---|---|
| Background | `#FFFFFF` white | `#FFFFFF` white | `#0D0D0D` dark | `#0A0A0A` dark | `#0A0A0F` dark |
| Accent | `#5B47E0` purple | `#7B61FF` purple | `#3139FB` cobalt | `#C8A96E` gold | `#6C47FF` purple |
| Hero style | Large word contrast | Carousel slides | Dark editorial | Dark editorial | Dark layered |
| Template gallery | ✅ horizontal auto-scroll | ❌ | ❌ | ❌ | ❌ |
| Badge system | ✅ new / 4K / partner | ✅ beta / new | ❌ | ❌ | ✅ last used |
| Tab hover overlay | ✅ dark scrim | ❌ | ❌ | ❌ | ❌ |
| Nav mega-dropdown | ✅ image grid | ✅ link grid | ❌ minimal | ❌ minimal | ❌ |
| Section labels | ✅ uppercase purple | ❌ | ❌ | ✅ uppercase muted | ✅ eyebrow |
| Easing signature | `(0.25, 1, 0.5, 1)` | `(0.25, 1, 0.5, 1)` | `(0.22, 1, 0.36, 1)` | spring + `(0.25,1,0.5,1)` | `(0.16, 1, 0.3, 1)` |
| Translate distance | 10–20px (tight) | 10–12px (tightest) | 14–48px (range) | 20–32px | 12–16px |
| Dark CTA section | ✅ rounded card | ❌ | ❌ | ❌ | ❌ |

---

## Summary Cheat Sheet

| Element                        | Duration    | Easing                          | Transform / Effect                        |
|--------------------------------|-------------|---------------------------------|-------------------------------------------|
| Hero banner entrance           | 350ms       | cubic-bezier(0.16, 1, 0.3, 1)  | translateY(-8px→0)                        |
| Hero word 1 ("Super")          | 600ms       | cubic-bezier(0.25, 1, 0.5, 1)  | translateY(16px→0) + skewY(1→0) 150ms     |
| Hero word 2 ("fast")           | 600ms       | cubic-bezier(0.25, 1, 0.5, 1)  | translateY(16px→0) + skewY(1→0) 250ms     |
| Hero subtitle                  | 500ms       | cubic-bezier(0.25, 1, 0.5, 1)  | translateY(16px→0) 350ms delay            |
| Hero CTA                       | 450ms       | cubic-bezier(0.25, 1, 0.5, 1)  | translateY(10px→0) 450ms delay            |
| Hero social proof              | 400ms       | cubic-bezier(0.25, 1, 0.5, 1)  | opacity 0→1 600ms delay                   |
| Hero logo strip                | 500ms       | cubic-bezier(0.25, 1, 0.5, 1)  | opacity 0→1 700ms delay                   |
| Hero preview card              | 700ms       | cubic-bezier(0.25, 1, 0.5, 1)  | scale(0.95→1) 400ms delay                 |
| Nav scrolled shadow            | 200ms       | cubic-bezier(0.25, 1, 0.5, 1)  | box-shadow appears                        |
| Nav link hover                 | 160ms       | cubic-bezier(0.25, 1, 0.5, 1)  | background fill light grey               |
| Nav dropdown open              | 220ms       | cubic-bezier(0.25, 1, 0.5, 1)  | translateY(-8px→0) + scale(0.97→1)        |
| Nav dropdown item hover        | 140ms       | cubic-bezier(0.25, 1, 0.5, 1)  | background + border                       |
| Nav dropdown icon hover        | 200ms       | cubic-bezier(0.34, 1.4, 0.64)  | scale(1.06)                               |
| Nav CTA hover                  | 160ms       | cubic-bezier(0.25, 1, 0.5, 1)  | translateY(-1px) + shadow                 |
| Section label reveal           | 350ms       | cubic-bezier(0.25, 1, 0.5, 1)  | translateY(10px→0) purple colour          |
| Section headline reveal        | 500ms       | cubic-bezier(0.25, 1, 0.5, 1)  | translateY(16px→0) 60ms delay             |
| Feature item stagger           | 400ms       | cubic-bezier(0.25, 1, 0.5, 1)  | translateY(12px→0) +60ms per child        |
| Feature item hover             | 160ms       | cubic-bezier(0.25, 1, 0.5, 1)  | background fill + border                  |
| Feature item icon hover        | 200ms       | cubic-bezier(0.34, 1.4, 0.64)  | scale(1.1)                                |
| Feature visual reveal          | 600ms       | cubic-bezier(0.25, 1, 0.5, 1)  | translateY(24px)+scale(0.97→1) 100ms      |
| Feature visual hover           | 500ms       | cubic-bezier(0.25, 1, 0.5, 1)  | scale(1.01) on inner media                |
| Badge "new" pop                | 350ms       | cubic-bezier(0.34, 1.4, 0.64)  | scale(0.7→1) + translateY(4px→0)          |
| Template gallery scroll        | 40000ms ∞   | linear                          | translateX loop                           |
| Template card hover            | 200ms       | cubic-bezier(0.25, 1, 0.5, 1)  | translateY(-4px) + border + shadow        |
| Template overlay reveal        | 200ms       | cubic-bezier(0.25, 1, 0.5, 1)  | opacity 0→1 dark scrim                    |
| Template overlay text          | 200ms       | cubic-bezier(0.25, 1, 0.5, 1)  | translateY(6px→0)                         |
| Template thumbnail hover       | 400ms       | cubic-bezier(0.25, 1, 0.5, 1)  | scale(1.04)                               |
| Customer logo hover            | 200ms       | cubic-bezier(0.25, 1, 0.5, 1)  | grayscale off + opacity 0.45→0.85         |
| Quote block reveal             | 550ms       | cubic-bezier(0.25, 1, 0.5, 1)  | translateY(16px→0) 80ms delay             |
| Quote author reveal            | 400ms       | cubic-bezier(0.25, 1, 0.5, 1)  | opacity 0→1 250ms delay                   |
| Quote avatar hover             | 200ms       | cubic-bezier(0.34, 1.4, 0.64)  | scale(1.06)                               |
| Use case tab active            | 180ms       | cubic-bezier(0.25, 1, 0.5, 1)  | border-bottom + color → purple            |
| Use case panel enter           | 280ms       | cubic-bezier(0.25, 1, 0.5, 1)  | fadeIn                                    |
| Promo card reveal              | 450ms       | cubic-bezier(0.25, 1, 0.5, 1)  | translateY(14px→0) +80ms stagger          |
| Promo card hover               | 200ms       | cubic-bezier(0.25, 1, 0.5, 1)  | translateY(-2px) + purple border          |
| Promo card arrow hover         | 200ms       | cubic-bezier(0.34, 1.4, 0.64)  | translateX(4px)                           |
| Award badge pop                | 400ms       | cubic-bezier(0.34, 1.4, 0.64)  | scale bounce +80ms stagger                |
| Dark CTA headline              | 550ms       | cubic-bezier(0.25, 1, 0.5, 1)  | translateY(20px→0)                        |
| Dark CTA button                | 400ms       | cubic-bezier(0.25, 1, 0.5, 1)  | translateY(10px→0) 160ms delay            |
| Primary btn hover              | 180ms       | cubic-bezier(0.25, 1, 0.5, 1)  | translateY(-1px) + purple glow            |
| Button press                   | 60ms        | cubic-bezier(0.25, 1, 0.5, 1)  | scale(0.97)                               |
| Input focus ring               | 160ms       | cubic-bezier(0.25, 1, 0.5, 1)  | border purple + ring shadow               |
| Newsletter success             | 300ms       | cubic-bezier(0.34, 1.4, 0.64)  | fadeUpSmall + green colour                |
| Footer link hover              | 160ms       | cubic-bezier(0.25, 1, 0.5, 1)  | color grey→black                          |
| Footer social hover            | 160ms       | cubic-bezier(0.25, 1, 0.5, 1)  | scale(1.12) + purple tint                 |
| Stagger step delay             | +60ms       | —                               | per child                                 |