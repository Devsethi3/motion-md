# MOTION.md - figma.com Motion System
> Reverse-engineered from figma.com (2026)
> Drop into Cursor, Claude Code, v0, Lovable, or Codex for on-brand animations.

---

## Design Philosophy

Figma's motion is **light, airy, and deceptively simple**. It's a white-background
product that uses motion the same way a good designer uses whitespace — intentionally
and sparingly. Nothing fights for attention. Every animation defers to content.

This is one of the hardest motion systems to replicate because it looks like it's
not doing anything. It is. It's just doing it very quietly.

Core principles:
- **White-first** — all motion reads against white or near-white. Shadows are soft.
- **Restraint is the feature** — durations are short, transforms are small
- **Horizontal slide transitions** — tab/product switching slides left or right, not up/down
- **Scale is minimal** — 0.96–0.98, never dramatic
- **Color transitions carry weight** — hover states shift background fill, not just opacity
- **Carousel/slider is primary** — the hero uses a full-bleed slide system with dot indicators
- **Community card grid** — hover lifts with shadow, no border tricks
- **Cursor presence** — Figma's brand uses colored multi-user cursors as a motion element

---

## Color & Background Context

```
Background:           #FFFFFF   (pure white)
Surface:              #F5F5F5   (light grey cards)
Surface hover:        #EBEBEB   (pressed/hover state)
Border:               #E0E0E0   (dividers, card borders)
Border strong:        #C7C7C7   (focused states)
Text primary:         #1A1A1A   (near-black)
Text secondary:       #6B6B6B   (captions, labels)
Text muted:           #9B9B9B   (placeholders)

Brand purple:         #7B61FF   (primary CTA, highlights)
Brand purple dark:    #5546D6   (hover state of CTA)
Brand purple light:   rgba(123, 97, 255, 0.1)  (soft fills)

FigJam yellow:        #FFCB45   (FigJam product accent)
Draw green:           #1BC47D   (Draw product accent)
Slides orange:        #FF7043   (Slides product accent)
Sites blue:           #0D99FF   (Sites product accent)

Multi-cursor red:     #F24822
Multi-cursor blue:    #0FA3FF
Multi-cursor green:   #1BC47D
Multi-cursor pink:    #FF4FD8
```

Motion reads on white. Shadows are the primary depth signal, not borders or
color fills. Everything is gentle — no jarring contrast shifts.

---

## Duration Scale

```css
:root {
  --duration-instant:   60ms;    /* toggle states, checkbox ticks */
  --duration-micro:     100ms;   /* icon swaps, badge updates */
  --duration-fast:      160ms;   /* hover color transitions */
  --duration-base:      240ms;   /* standard UI transitions */
  --duration-medium:    360ms;   /* card reveals, dropdown opens */
  --duration-slow:      500ms;   /* section entrances, hero content */
  --duration-slower:    700ms;   /* hero carousel transitions */
  --duration-carousel: 600ms;    /* slide carousel cross-fade */
}
```

---

## Easing Scale

```css
:root {
  /* Primary — smooth deceleration, used everywhere */
  --ease-out:         cubic-bezier(0.25, 1, 0.5, 1);

  /* Snappy — quick interactions, hover states */
  --ease-out-sharp:   cubic-bezier(0.16, 1, 0.3, 1);

  /* In-out — tab switches, carousel slides */
  --ease-in-out:      cubic-bezier(0.4, 0, 0.2, 1);

  /* Exit — elements leaving */
  --ease-in:          cubic-bezier(0.4, 0, 1, 1);

  /* Gentle bounce — CTA buttons, pill tags */
  --ease-out-back:    cubic-bezier(0.34, 1.2, 0.64, 1);

  /* Linear — progress, continuous scrollers */
  --ease-linear:      linear;
}
```

**Figma uses `--ease-out` (0.25, 1, 0.5, 1) as its primary easing** — slightly
softer and more organic than the sharp expo curves you see in Railway or Clerk.
It matches the brand feeling: friendly, precise, not aggressive.

---

## Core Keyframes

```css
/* === ENTRANCES === */

@keyframes fadeUp {
  from {
    opacity: 0;
    transform: translateY(12px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeDown {
  from {
    opacity: 0;
    transform: translateY(-8px);
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

@keyframes slideInLeft {
  from {
    opacity: 0;
    transform: translateX(24px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes slideInRight {
  from {
    opacity: 0;
    transform: translateX(-24px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes scaleIn {
  from {
    opacity: 0;
    transform: scale(0.96);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

/* === EXITS === */

@keyframes fadeOutLeft {
  from {
    opacity: 1;
    transform: translateX(0);
  }
  to {
    opacity: 0;
    transform: translateX(-24px);
  }
}

@keyframes fadeOutRight {
  from {
    opacity: 1;
    transform: translateX(0);
  }
  to {
    opacity: 0;
    transform: translateX(24px);
  }
}

@keyframes fadeOutUp {
  from {
    opacity: 1;
    transform: translateY(0);
  }
  to {
    opacity: 0;
    transform: translateY(-8px);
  }
}

/* === CONTINUOUS === */

@keyframes logoScroll {
  from { transform: translateX(0); }
  to   { transform: translateX(-50%); }
}

/* Multi-cursor float — Figma brand signature */
@keyframes cursorFloat {
  0%   { transform: translate(0, 0); }
  25%  { transform: translate(4px, -6px); }
  50%  { transform: translate(-2px, -12px); }
  75%  { transform: translate(-6px, -6px); }
  100% { transform: translate(0, 0); }
}

/* Cursor label pop in */
@keyframes cursorLabelIn {
  from {
    opacity: 0;
    transform: scale(0.85) translateY(4px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

/* Dot indicator pulse (carousel active dot) */
@keyframes dotExpand {
  from { width: 8px; }
  to   { width: 24px; }
}
```

---

## Hero Section

Figma's homepage hero is a **full-width carousel** with 8 slides (1 of 8),
rotating through different product showcases. The headline stays fixed while
slides transition underneath.

```css
/* Hero container — no entrance animation, loads immediately */
.hero {
  background: #FFFFFF;
}

/* Hero headline — loads with a clean fade up */
.hero-headline {
  animation: fadeUp 500ms var(--ease-out) both;
}

/* Hero CTA */
.hero-cta {
  animation: fadeUp 450ms var(--ease-out) 120ms both;
}

/* Logo partner row below CTA */
.hero-partner-logos {
  animation: fadeIn 400ms var(--ease-out) 300ms both;
}

/* === CAROUSEL === */

/* Outgoing slide — exits left */
.hero-slide[data-state="exit-left"] {
  animation: fadeOutLeft 400ms var(--ease-in-out) both;
}

/* Outgoing slide — exits right (going back) */
.hero-slide[data-state="exit-right"] {
  animation: fadeOutRight 400ms var(--ease-in-out) both;
}

/* Incoming slide — enters from right */
.hero-slide[data-state="enter-right"] {
  animation: slideInLeft 500ms var(--ease-out) both;
}

/* Incoming slide — enters from left (going back) */
.hero-slide[data-state="enter-left"] {
  animation: slideInRight 500ms var(--ease-out) both;
}

/* Carousel dot indicators */
.carousel-dot {
  width: 8px;
  height: 8px;
  border-radius: 100px;
  background: #C7C7C7;
  transition:
    width      300ms var(--ease-out),
    background 200ms var(--ease-out);
}

.carousel-dot.active {
  width: 24px;
  background: #1A1A1A;
}

/* Carousel nav arrows */
.carousel-arrow {
  transition:
    background  160ms var(--ease-out),
    transform   120ms var(--ease-out),
    box-shadow  160ms var(--ease-out);
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(8px);
}

.carousel-arrow:hover {
  background: #FFFFFF;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.12);
  transform: scale(1.05);
}

.carousel-arrow:active {
  transform: scale(0.96);
  transition-duration: 60ms;
}
```

---

## Navigation

Figma nav is clean white with very subtle hover states. The mega-menu
dropdown is the most complex motion element in the nav.

```css
/* Nav — no load animation, appears instantly */
nav {
  background: #FFFFFF;
  border-bottom: 1px solid transparent;
  transition: border-color 200ms var(--ease-out);
}

/* Nav scrolled state — adds a subtle bottom border */
nav.scrolled {
  border-bottom-color: #E0E0E0;
}

/* Nav links */
.nav-link {
  transition:
    color       160ms var(--ease-out),
    background  160ms var(--ease-out);
  color: #1A1A1A;
  border-radius: 6px;
  padding: 6px 10px;
}

.nav-link:hover {
  background: #F5F5F5;
  color: #1A1A1A;
}

/* Active nav link */
.nav-link.active {
  color: #7B61FF;
}

/* Mega menu dropdown */
.nav-mega-menu {
  animation: fadeDown 220ms var(--ease-out) both;
  transform-origin: top center;
  background: #FFFFFF;
  border: 1px solid #E0E0E0;
  border-radius: 12px;
  box-shadow:
    0 4px 6px rgba(0, 0, 0, 0.04),
    0 12px 32px rgba(0, 0, 0, 0.08);
}

.nav-mega-menu[data-state="closed"] {
  animation: fadeOutUp 140ms var(--ease-in) both;
}

/* Mega menu item */
.mega-menu-item {
  transition:
    background 120ms var(--ease-out),
    color      120ms var(--ease-out);
  border-radius: 8px;
}

.mega-menu-item:hover {
  background: #F5F5F5;
}

/* Product icon in mega menu — slight scale on hover */
.mega-menu-icon {
  transition: transform 200ms var(--ease-out-back);
}

.mega-menu-item:hover .mega-menu-icon {
  transform: scale(1.08);
}
```

---

## Buttons

Figma buttons are understated. The primary is dark/black on white, and
the only surprise is the gentle scale on the secondary CTA.

```css
/* Primary CTA — "Get started" */
.btn-primary {
  transition:
    background  160ms var(--ease-out),
    transform   100ms var(--ease-out),
    box-shadow  160ms var(--ease-out);
  background: #1A1A1A;
  color: #FFFFFF;
  border-radius: 8px;
}

.btn-primary:hover {
  background: #000000;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  transform: translateY(-1px);
}

.btn-primary:active {
  transform: scale(0.97) translateY(0);
  transition-duration: 60ms;
}

/* Secondary CTA — "Log in", "Contact sales" */
.btn-secondary {
  transition:
    background   160ms var(--ease-out),
    border-color 160ms var(--ease-out),
    transform    100ms var(--ease-out);
  background: transparent;
  border: 1px solid #C7C7C7;
  border-radius: 8px;
  color: #1A1A1A;
}

.btn-secondary:hover {
  background: #F5F5F5;
  border-color: #9B9B9B;
  transform: translateY(-1px);
}

.btn-secondary:active {
  transform: scale(0.97);
  transition-duration: 60ms;
}

/* Purple CTA variant (product pages) */
.btn-purple {
  transition:
    background  160ms var(--ease-out),
    box-shadow  160ms var(--ease-out),
    transform   100ms var(--ease-out);
  background: #7B61FF;
  color: #FFFFFF;
  border-radius: 8px;
}

.btn-purple:hover {
  background: #5546D6;
  box-shadow: 0 4px 12px rgba(123, 97, 255, 0.3);
  transform: translateY(-1px);
}

.btn-purple:active {
  transform: scale(0.97);
  transition-duration: 60ms;
}
```

---

## Product Tab Switcher
## (Prompt / Design / Draw / Build / Publish / etc.)

The product workflow tabs use a horizontal slide. Content slides
left when advancing forward, right when going back.

```css
/* Tab container */
.product-tab-list {
  position: relative;
}

/* Individual tab */
.product-tab {
  transition:
    color      200ms var(--ease-out),
    background 200ms var(--ease-out),
    opacity    200ms var(--ease-out);
  color: #6B6B6B;
  opacity: 0.7;
  border-radius: 100px;
  padding: 6px 16px;
}

.product-tab:hover {
  color: #1A1A1A;
  opacity: 0.9;
  background: #F5F5F5;
}

.product-tab.active {
  color: #1A1A1A;
  opacity: 1;
  background: #EBEBEB;
}

/* Sliding background pill under active tab */
.tab-pill {
  border-radius: 100px;
  background: #1A1A1A;
  transition: transform 280ms var(--ease-in-out), width 280ms var(--ease-in-out);
}

/* Tab content panels — horizontal slide */
.tab-panel[data-direction="forward"][data-state="enter"] {
  animation: slideInLeft 450ms var(--ease-out) both;
}

.tab-panel[data-direction="forward"][data-state="exit"] {
  animation: fadeOutLeft 220ms var(--ease-in) both;
}

.tab-panel[data-direction="back"][data-state="enter"] {
  animation: slideInRight 450ms var(--ease-out) both;
}

.tab-panel[data-direction="back"][data-state="exit"] {
  animation: fadeOutRight 220ms var(--ease-in) both;
}
```

---

## Scroll-Triggered Section Reveals

Figma keeps scroll reveals very restrained. Small translate distance,
pure opacity fade, and tight stagger spacing.

```css
/* Default hidden state */
.reveal {
  opacity: 0;
  transform: translateY(12px);
  transition:
    opacity   500ms var(--ease-out),
    transform 500ms var(--ease-out);
}

.reveal.visible {
  opacity: 1;
  transform: translateY(0);
}

/* Section eyebrow tag */
.section-eyebrow {
  transition-delay: 0ms;
}

/* Section heading */
.section-heading {
  transition-delay: 60ms;
}

/* Section body */
.section-body {
  transition-delay: 120ms;
}

/* CTA below section */
.section-cta {
  transition-delay: 180ms;
}

/* Grid / feature items — stagger tightly */
.grid-item {
  opacity: 0;
  transform: translateY(10px);
  transition:
    opacity   400ms var(--ease-out),
    transform 400ms var(--ease-out);
}

.grid-item.visible:nth-child(1) { transition-delay: 0ms;   opacity: 1; transform: none; }
.grid-item.visible:nth-child(2) { transition-delay: 60ms;  opacity: 1; transform: none; }
.grid-item.visible:nth-child(3) { transition-delay: 120ms; opacity: 1; transform: none; }
.grid-item.visible:nth-child(4) { transition-delay: 180ms; opacity: 1; transform: none; }
.grid-item.visible:nth-child(5) { transition-delay: 240ms; opacity: 1; transform: none; }
.grid-item.visible:nth-child(6) { transition-delay: 300ms; opacity: 1; transform: none; }
```

---

## Community Card Grid

The gallery cards (user-made projects) use a classic lift-and-shadow hover.
Clean white with shadow depth — no border tricks.

```css
.community-card {
  transition:
    transform   240ms var(--ease-out),
    box-shadow  240ms var(--ease-out);
  border-radius: 12px;
  background: #FFFFFF;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08), 0 1px 2px rgba(0, 0, 0, 0.04);
  overflow: hidden;
}

.community-card:hover {
  transform: translateY(-4px);
  box-shadow:
    0 4px 6px rgba(0, 0, 0, 0.06),
    0 12px 24px rgba(0, 0, 0, 0.1);
}

/* Card image — slight scale on parent hover */
.community-card-image {
  transition: transform 360ms var(--ease-out);
  transform-origin: center;
}

.community-card:hover .community-card-image {
  transform: scale(1.03);
}

/* Card title */
.community-card-title {
  transition: color 160ms var(--ease-out);
}

.community-card:hover .community-card-title {
  color: #7B61FF;
}

/* Author name */
.community-card-author {
  transition: opacity 160ms var(--ease-out);
  opacity: 0.6;
}

.community-card:hover .community-card-author {
  opacity: 1;
}
```

---

## Template Carousel (Websites / Social / Mobile Apps)

The template category carousel uses horizontal scroll with a slide transition.

```css
/* Template category pills */
.template-pill {
  transition:
    background   160ms var(--ease-out),
    color        160ms var(--ease-out),
    border-color 160ms var(--ease-out),
    transform    120ms var(--ease-out);
  border: 1px solid #E0E0E0;
  border-radius: 100px;
  color: #6B6B6B;
}

.template-pill:hover {
  border-color: #9B9B9B;
  color: #1A1A1A;
  transform: scale(1.02);
}

.template-pill.active {
  background: #1A1A1A;
  color: #FFFFFF;
  border-color: #1A1A1A;
}

/* Template cards row */
.template-card {
  transition:
    transform  240ms var(--ease-out),
    box-shadow 240ms var(--ease-out);
  border-radius: 12px;
  overflow: hidden;
}

.template-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
}
```

---

## Logo Partner Row (AirBnb, Atlassian, Stripe, etc.)

Figma shows a static grid of logos, not a scrolling marquee.
They fade in on scroll as a group.

```css
/* Logo row container */
.partner-logos {
  opacity: 0;
  transition: opacity 500ms var(--ease-out) 200ms;
}

.partner-logos.visible {
  opacity: 1;
}

/* Individual logo */
.partner-logo {
  transition:
    opacity  200ms var(--ease-out),
    filter   200ms var(--ease-out);
  opacity: 0.5;
  filter: grayscale(100%);
}

.partner-logo:hover {
  opacity: 0.85;
  filter: grayscale(0%);
}
```

---

## Multi-Cursor Animation (Brand Signature)

Figma's most distinctive visual element — floating colored cursors with
name labels. Used decoratively in hero and feature sections.

```css
.cursor-presence {
  pointer-events: none;
  position: absolute;
}

/* Each cursor floats with organic movement */
.cursor-1 {
  animation: cursorFloat 6000ms ease-in-out infinite;
  animation-delay: 0ms;
  color: #F24822; /* red cursor */
}

.cursor-2 {
  animation: cursorFloat 7200ms ease-in-out infinite;
  animation-delay: 1200ms;
  color: #0FA3FF; /* blue cursor */
}

.cursor-3 {
  animation: cursorFloat 5800ms ease-in-out infinite;
  animation-delay: 2400ms;
  color: #1BC47D; /* green cursor */
}

.cursor-4 {
  animation: cursorFloat 6600ms ease-in-out infinite;
  animation-delay: 800ms;
  color: #FF4FD8; /* pink cursor */
}

/* Cursor name label */
.cursor-label {
  animation: cursorLabelIn 300ms var(--ease-out-back) both;
  border-radius: 4px;
  padding: 2px 6px;
  font-size: 11px;
  font-weight: 500;
  color: #FFFFFF;
  white-space: nowrap;
  /* background matches cursor color */
}
```

---

## Feature / Bento Cards

Section feature cards (design systems, Dev Mode, Buzz, etc.)
have a clean lift hover with very slight inner shadow.

```css
.feature-card {
  transition:
    transform   240ms var(--ease-out),
    box-shadow  240ms var(--ease-out),
    border-color 200ms var(--ease-out);
  border: 1px solid #E0E0E0;
  border-radius: 16px;
  background: #FFFFFF;
}

.feature-card:hover {
  transform: translateY(-2px);
  border-color: #C7C7C7;
  box-shadow:
    0 2px 4px rgba(0, 0, 0, 0.04),
    0 8px 20px rgba(0, 0, 0, 0.08);
}

/* Feature card image — gentle scale */
.feature-card-media {
  transition: transform 400ms var(--ease-out);
  overflow: hidden;
  border-radius: 12px;
}

.feature-card:hover .feature-card-media {
  transform: scale(1.02);
}
```

---

## Testimonial Quote Block

The large pull quotes from Perplexity, GitHub CEOs etc.
slide up on scroll with a slight delay after their section heading.

```css
.testimonial-quote {
  opacity: 0;
  transform: translateY(14px);
  transition:
    opacity   550ms var(--ease-out) 120ms,
    transform 550ms var(--ease-out) 120ms;
}

.testimonial-quote.visible {
  opacity: 1;
  transform: translateY(0);
}

/* Author attribution row */
.testimonial-author {
  opacity: 0;
  transition: opacity 400ms var(--ease-out) 300ms;
}

.testimonial-author.visible {
  opacity: 1;
}

/* Company logo in attribution */
.testimonial-logo {
  transition: opacity 200ms var(--ease-out);
  opacity: 0.7;
}

.testimonial-logo:hover {
  opacity: 1;
}
```

---

## "New" Badge / Product Labels

The "Beta", "New" badges on product links (Figma Sites Beta, Weave New)
pop in with a gentle bounce.

```css
.product-badge {
  display: inline-flex;
  animation: scaleIn 300ms var(--ease-out-back) 100ms both;
  border-radius: 100px;
  font-size: 11px;
  font-weight: 600;
  padding: 2px 8px;
}

.product-badge.beta {
  background: rgba(123, 97, 255, 0.1);
  color: #7B61FF;
}

.product-badge.new {
  background: rgba(27, 196, 125, 0.1);
  color: #1BC47D;
}
```

---

## Prompt Pills (Figma Make page)

The "Onboarding flow / Data dashboard / Gradient gallery" clickable
prompt suggestions on the Make page.

```css
.prompt-pill {
  transition:
    background   160ms var(--ease-out),
    border-color 160ms var(--ease-out),
    transform    120ms var(--ease-out),
    box-shadow   160ms var(--ease-out);
  border: 1px solid #E0E0E0;
  border-radius: 100px;
  color: #6B6B6B;
  background: #FFFFFF;
}

.prompt-pill:hover {
  background: #F5F5F5;
  border-color: #9B9B9B;
  color: #1A1A1A;
  transform: translateY(-1px);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

.prompt-pill:active {
  transform: scale(0.97) translateY(0);
  background: #EBEBEB;
  transition-duration: 60ms;
}

/* Stagger entrance of pills */
.prompt-pill:nth-child(1) { animation: fadeIn 300ms var(--ease-out) 200ms both; }
.prompt-pill:nth-child(2) { animation: fadeIn 300ms var(--ease-out) 280ms both; }
.prompt-pill:nth-child(3) { animation: fadeIn 300ms var(--ease-out) 360ms both; }
```

---

## Footer Links

```css
.footer-link {
  transition: color 120ms var(--ease-out);
  color: #6B6B6B;
}

.footer-link:hover {
  color: #1A1A1A;
}

/* Footer social icons */
.footer-social {
  transition:
    background  160ms var(--ease-out),
    transform   120ms var(--ease-out);
  border-radius: 8px;
  padding: 8px;
}

.footer-social:hover {
  background: #F5F5F5;
  transform: scale(1.08);
}
```

---

## Scroll Behavior & IntersectionObserver Setup

```css
html {
  scroll-behavior: smooth;
}
```

```js
// Figma-style scroll reveal — fires once, tight threshold
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible')
        observer.unobserve(entry.target) // animate once, then done
      }
    })
  },
  {
    threshold: 0.12,
    rootMargin: '0px 0px -24px 0px'
  }
)

document
  .querySelectorAll('.reveal, .grid-item, .feature-card, .testimonial-quote, .testimonial-author, .partner-logos')
  .forEach(el => observer.observe(el))
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

  /* Keep cursor presence visible but static */
  .cursor-presence {
    animation: none;
  }

  /* Carousel transitions — instant */
  .hero-slide {
    animation: none;
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
// Figma's primary easing
const easeOut      = [0.25, 1, 0.5, 1]
const easeOutSharp = [0.16, 1, 0.3, 1]
const easeOutBack  = [0.34, 1.2, 0.64, 1]
const easeInOut    = [0.4, 0, 0.2, 1]
const easeIn       = [0.4, 0, 1, 1]

// === CORE VARIANTS ===

export const fadeUp = {
  hidden:  { opacity: 0, y: 12 },
  visible: {
    opacity: 1, y: 0,
    transition: { duration: 0.5, ease: easeOut }
  }
}

export const fadeIn = {
  hidden:  { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.4, ease: easeOut }
  }
}

export const scaleIn = {
  hidden:  { opacity: 0, scale: 0.96 },
  visible: {
    opacity: 1, scale: 1,
    transition: { duration: 0.36, ease: easeOut }
  }
}

export const badgePop = {
  hidden:  { opacity: 0, scale: 0.85 },
  visible: {
    opacity: 1, scale: 1,
    transition: { duration: 0.3, ease: easeOutBack }
  }
}

// === STAGGER CONTAINERS ===

export const staggerGrid = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.06, delayChildren: 0.05 }
  }
}

export const staggerHero = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.1 }
  }
}

// === CAROUSEL / SLIDE TRANSITIONS ===

export const slideEnterFromRight = {
  hidden:  { opacity: 0, x: 24 },
  visible: {
    opacity: 1, x: 0,
    transition: { duration: 0.5, ease: easeOut }
  }
}

export const slideEnterFromLeft = {
  hidden:  { opacity: 0, x: -24 },
  visible: {
    opacity: 1, x: 0,
    transition: { duration: 0.5, ease: easeOut }
  }
}

export const slideExitToLeft = {
  exit: {
    opacity: 0, x: -24,
    transition: { duration: 0.22, ease: easeIn }
  }
}

// === NAV DROPDOWN ===

export const megaMenuVariant = {
  hidden:  { opacity: 0, y: -6, scale: 0.98 },
  visible: {
    opacity: 1, y: 0, scale: 1,
    transition: { duration: 0.22, ease: easeOut }
  },
  exit: {
    opacity: 0, y: -4,
    transition: { duration: 0.14, ease: easeIn }
  }
}

// === COMMUNITY CARD ===

export const communityCard = {
  rest:  { y: 0, boxShadow: '0 1px 3px rgba(0,0,0,0.08)' },
  hover: {
    y: -4,
    boxShadow: '0 12px 24px rgba(0,0,0,0.1)',
    transition: { duration: 0.24, ease: easeOut }
  }
}

// === CARD IMAGE ZOOM ===

export const cardImageZoom = {
  rest:  { scale: 1 },
  hover: {
    scale: 1.03,
    transition: { duration: 0.36, ease: easeOut }
  }
}

// === BUTTON ===

export const buttonMotion = {
  rest:  { y: 0, scale: 1 },
  hover: {
    y: -1,
    transition: { duration: 0.16, ease: easeOut }
  },
  tap: {
    scale: 0.97, y: 0,
    transition: { duration: 0.06 }
  }
}

// === MULTI-CURSOR FLOAT ===

export const cursorFloat = (delay = 0) => ({
  animate: {
    x: [0, 4, -2, -6, 0],
    y: [0, -6, -12, -6, 0],
    transition: {
      duration: 6,
      repeat: Infinity,
      ease: 'easeInOut',
      delay
    }
  }
})

// === CURSOR LABEL POP ===

export const cursorLabel = {
  hidden:  { opacity: 0, scale: 0.85, y: 4 },
  visible: {
    opacity: 1, scale: 1, y: 0,
    transition: { duration: 0.3, ease: easeOutBack }
  }
}
```

---

## Summary Cheat Sheet

| Element                        | Duration   | Easing                         | Transform / Effect                  |
|--------------------------------|------------|--------------------------------|-------------------------------------|
| Hero headline                  | 500ms      | cubic-bezier(0.25, 1, 0.5, 1) | translateY(12px→0)                  |
| Hero CTA                       | 450ms      | cubic-bezier(0.25, 1, 0.5, 1) | translateY(12px→0) 120ms delay      |
| Hero partner logos             | 400ms      | cubic-bezier(0.25, 1, 0.5, 1) | opacity 0→1                         |
| Carousel slide enter           | 500ms      | cubic-bezier(0.25, 1, 0.5, 1) | translateX(±24px→0)                 |
| Carousel slide exit            | 220ms      | cubic-bezier(0.4, 0, 1, 1)    | translateX(0→±24px)                 |
| Carousel dot active            | 300ms      | cubic-bezier(0.25, 1, 0.5, 1) | width 8px→24px + color              |
| Carousel arrow hover           | 160ms      | cubic-bezier(0.25, 1, 0.5, 1) | scale(1.05) + shadow                |
| Nav link hover                 | 160ms      | cubic-bezier(0.25, 1, 0.5, 1) | background fill                     |
| Nav dropdown open              | 220ms      | cubic-bezier(0.25, 1, 0.5, 1) | fadeDown + scale(0.98→1)            |
| Nav dropdown close             | 140ms      | cubic-bezier(0.4, 0, 1, 1)    | fadeOutUp                           |
| Mega menu icon hover           | 200ms      | cubic-bezier(0.34, 1.2, 0.64) | scale(1.08)                         |
| Nav scrolled border            | 200ms      | cubic-bezier(0.25, 1, 0.5, 1) | border-color transparent→#E0E0E0    |
| Product tab switch             | 450ms      | cubic-bezier(0.25, 1, 0.5, 1) | slideInLeft/Right                   |
| Tab pill slide                 | 280ms      | cubic-bezier(0.4, 0, 0.2, 1)  | transform + width                   |
| Section reveal                 | 500ms      | cubic-bezier(0.25, 1, 0.5, 1) | translateY(12px→0)                  |
| Grid item stagger              | 400ms      | cubic-bezier(0.25, 1, 0.5, 1) | translateY(10px→0) +60ms per child  |
| Community card hover           | 240ms      | cubic-bezier(0.25, 1, 0.5, 1) | translateY(-4px) + shadow           |
| Community card image zoom      | 360ms      | cubic-bezier(0.25, 1, 0.5, 1) | scale(1.03)                         |
| Community card title hover     | 160ms      | cubic-bezier(0.25, 1, 0.5, 1) | color→purple                        |
| Feature card hover             | 240ms      | cubic-bezier(0.25, 1, 0.5, 1) | translateY(-2px) + shadow           |
| Feature card image hover       | 400ms      | cubic-bezier(0.25, 1, 0.5, 1) | scale(1.02)                         |
| Template pill active           | 160ms      | cubic-bezier(0.25, 1, 0.5, 1) | background fill black               |
| Partner logo hover             | 200ms      | cubic-bezier(0.25, 1, 0.5, 1) | grayscale off + opacity 0.5→0.85    |
| Prompt pill hover              | 160ms      | cubic-bezier(0.25, 1, 0.5, 1) | translateY(-1px) + border           |
| Product badge pop              | 300ms      | cubic-bezier(0.34, 1.2, 0.64) | scale(0.85→1)                       |
| Testimonial reveal             | 550ms      | cubic-bezier(0.25, 1, 0.5, 1) | translateY(14px→0) 120ms delay      |
| Testimonial author reveal      | 400ms      | cubic-bezier(0.25, 1, 0.5, 1) | opacity 0→1 300ms delay             |
| Multi-cursor float             | 6000ms ∞   | ease-in-out                    | organic XY path, staggered          |
| Cursor label pop               | 300ms      | cubic-bezier(0.34, 1.2, 0.64) | scale(0.85→1) + translateY          |
| Button primary hover           | 160ms      | cubic-bezier(0.25, 1, 0.5, 1) | translateY(-1px) + shadow           |
| Button press                   | 60ms       | cubic-bezier(0.25, 1, 0.5, 1) | scale(0.97)                         |
| Footer link hover              | 120ms      | cubic-bezier(0.25, 1, 0.5, 1) | color grey→black                    |
| Footer social hover            | 160ms      | cubic-bezier(0.25, 1, 0.5, 1) | background fill + scale(1.08)       |
| Stagger step delay             | +60ms      | —                              | per child                           |