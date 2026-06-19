# MOTION.md — railway.com Motion System
> Reverse-engineered from railway.com (2026)
> Drop into Cursor, Claude Code, v0, Lovable, or Codex for on-brand animations.

---

## Design Philosophy

Railway's motion is **cinematic, warm, and confident**. It feels like a premium consumer
product accidentally built for developers. The aesthetic borrows from retro travel posters
and train station signage — tactile, physical, grounded. Motion is never clinical.

Core principles:
- **Warmth over precision** — easing curves are smooth and organic, not snappy
- **Scroll is the primary driver** — almost everything triggers on scroll entry
- **Horizontal motion matters** — trains, boarding metaphors mean left→right motion
- **Dark purple base (#13111C)** — all motion reads against deep space-like background
- **Stagger everything** — lists, logos, cards all enter sequentially, never all at once
- **Counters and numbers animate** — live deploy counts tick upward on entry

---

## Color & Background Context

```
Background:        #13111C   (deep purple-black)
Surface:           #1A1727   (cards, panels)
Surface elevated:  #221E33   (modals, dropdowns)
Border subtle:     #2D2840   (dividers)
Border strong:     #3D3757   (active borders)
Text primary:      #F0EEFF   (near-white, purple tint)
Text secondary:    #8B82AC   (muted labels)
Text tertiary:     #5C5580   (placeholder, disabled)
Accent purple:     #B39DFF   (highlights, active)
Accent pink:       #FF6B9D   (CTA hover, alert)
Success green:     #4ADE80   (deploy success)
Warning amber:     #FBBF24   (alerts)
```

All motion is tuned for dark purple backgrounds.
Opacity changes are more visible here than on true black — use them generously.

---

## Duration Scale

```css
:root {
  --duration-instant:  60ms;    /* active press states */
  --duration-micro:    120ms;   /* icon swaps, dot indicators */
  --duration-fast:     180ms;   /* hover transitions */
  --duration-base:     280ms;   /* standard UI transitions */
  --duration-medium:   400ms;   /* card reveals, panel slides */
  --duration-slow:     550ms;   /* section entrances */
  --duration-slower:   750ms;   /* hero animations */
  --duration-cinematic:1100ms;  /* full-page train/station scenes */
}
```

---

## Easing Scale

```css
:root {
  /* Primary — used on 80% of all animations */
  --ease-out-expo:    cubic-bezier(0.16, 1, 0.3, 1);

  /* Smooth — panels, drawers sliding in */
  --ease-out-quart:   cubic-bezier(0.25, 1, 0.5, 1);

  /* Exit — elements leaving the screen */
  --ease-in-quart:    cubic-bezier(0.5, 0, 0.75, 0);

  /* In-out — tab switches, content swaps */
  --ease-in-out:      cubic-bezier(0.4, 0, 0.2, 1);

  /* Bounce — playful CTAs, success states */
  --ease-out-back:    cubic-bezier(0.34, 1.56, 0.64, 1);

  /* Linear — counters, progress bars, marquees */
  --ease-linear:      linear;
}
```

**`--ease-out-expo` is Railway's signature easing.** It fires fast and lands
with authority — like a train arriving at a station.

---

## Core Animation Keyframes

```css
/* === ENTRANCES === */

@keyframes fadeUp {
  from { opacity: 0; transform: translateY(20px); }
  to   { opacity: 1; transform: translateY(0); }
}

@keyframes fadeDown {
  from { opacity: 0; transform: translateY(-12px); }
  to   { opacity: 1; transform: translateY(0); }
}

@keyframes fadeIn {
  from { opacity: 0; }
  to   { opacity: 1; }
}

@keyframes fadeLeft {
  from { opacity: 0; transform: translateX(20px); }
  to   { opacity: 1; transform: translateX(0); }
}

@keyframes fadeRight {
  from { opacity: 0; transform: translateX(-20px); }
  to   { opacity: 1; transform: translateX(0); }
}

@keyframes scaleUp {
  from { opacity: 0; transform: scale(0.94); }
  to   { opacity: 1; transform: scale(1); }
}

/* === EXITS === */

@keyframes fadeOutDown {
  from { opacity: 1; transform: translateY(0); }
  to   { opacity: 0; transform: translateY(12px); }
}

@keyframes fadeOutUp {
  from { opacity: 1; transform: translateY(0); }
  to   { opacity: 0; transform: translateY(-12px); }
}

/* === CONTINUOUS === */

@keyframes marquee {
  from { transform: translateX(0); }
  to   { transform: translateX(-50%); }
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50%       { opacity: 0.4; }
}

@keyframes shimmer {
  from { background-position: -200% center; }
  to   { background-position: 200% center; }
}

/* === COUNTER === */
@keyframes countUp {
  from { transform: translateY(100%); opacity: 0; }
  to   { transform: translateY(0);    opacity: 1; }
}
```

---

## Hero Section

Railway's hero has multiple motion layers happening simultaneously.
Background texture, headline, subheadline, CTAs, and the deploy UI
all animate in with different delays — building a layered cinematic reveal.

```css
/* Background hero image — fades in slowly, very subtle */
.hero-bg {
  animation: fadeIn 1100ms var(--ease-out-quart) both;
}

/* Announcement banner at top */
.hero-banner {
  animation: fadeDown 300ms var(--ease-out-expo) 100ms both;
}

/* Main headline — slides up */
.hero-headline {
  animation: fadeUp 650ms var(--ease-out-expo) 200ms both;
}

/* "intelligent" highlight word — slight delay after headline */
.hero-headline-accent {
  animation: fadeUp 650ms var(--ease-out-expo) 280ms both;
}

/* Subheadline */
.hero-sub {
  animation: fadeUp 550ms var(--ease-out-expo) 380ms both;
}

/* CTA buttons — staggered */
.hero-cta-primary {
  animation: fadeUp 450ms var(--ease-out-expo) 480ms both;
}

.hero-cta-secondary {
  animation: fadeUp 450ms var(--ease-out-expo) 540ms both;
}

/* Deploy UI card underneath */
.hero-ui-card {
  animation: scaleUp 700ms var(--ease-out-expo) 650ms both;
}
```

### Hero Deploy UI — Tab Cycling Animation

The Deploy/Network/Scale/Monitor/Evolve tabs cycle automatically.

```css
.deploy-tab {
  transition:
    color      200ms var(--ease-out-expo),
    opacity    200ms var(--ease-out-expo),
    background 200ms var(--ease-out-expo);
  opacity: 0.45;
}

.deploy-tab.active {
  opacity: 1;
  color: var(--text-primary);
  background: rgba(179, 157, 255, 0.1);
}

/* Active indicator line slides under tab */
.deploy-tab-indicator {
  transition: transform 280ms var(--ease-in-out);
}

/* Tab content fades in on switch */
.deploy-tab-content {
  animation: fadeIn 300ms var(--ease-out-expo) both;
}
```

---

## Navigation

```css
/* Nav entrance on page load */
nav {
  animation: fadeDown 300ms var(--ease-out-expo) both;
}

/* Nav links */
.nav-link {
  transition:
    color   180ms var(--ease-out-expo),
    opacity 180ms var(--ease-out-expo);
  opacity: 0.6;
}

.nav-link:hover {
  opacity: 1;
  color: var(--text-primary);
}

/* Dropdown panel */
.nav-dropdown {
  animation: fadeDown 200ms var(--ease-out-expo) both;
  transform-origin: top center;
}

.nav-dropdown[data-state="closed"] {
  animation: fadeOutUp 150ms var(--ease-in-quart) both;
}
```

---

## Scroll-Triggered Section Reveals

Railway uses a **two-phase reveal**:
1. Section label/eyebrow appears first
2. Then headline, body, and features follow with stagger

```css
/* Base hidden state — set via JS on mount */
.reveal {
  opacity: 0;
  transform: translateY(24px);
  transition:
    opacity   550ms var(--ease-out-expo),
    transform 550ms var(--ease-out-expo);
}

.reveal.visible {
  opacity: 1;
  transform: translateY(0);
}

/* Section eyebrow label enters first */
.section-label {
  transition-delay: 0ms;
}

/* Headline follows */
.section-heading {
  transition-delay: 80ms;
}

/* Body text */
.section-body {
  transition-delay: 160ms;
}

/* Feature cards/list stagger */
.feature-item {
  opacity: 0;
  transform: translateY(16px);
  transition:
    opacity   400ms var(--ease-out-expo),
    transform 400ms var(--ease-out-expo);
}

.feature-item.visible:nth-child(1) { transition-delay: 100ms; }
.feature-item.visible:nth-child(2) { transition-delay: 180ms; }
.feature-item.visible:nth-child(3) { transition-delay: 260ms; }
.feature-item.visible:nth-child(4) { transition-delay: 340ms; }
.feature-item.visible:nth-child(5) { transition-delay: 420ms; }
.feature-item.visible:nth-child(6) { transition-delay: 500ms; }
```

---

## Feature Illustration Reveal

Each section (Deploy, Network, Scale, Monitor, Evolve) has a large
SVG illustration. These float in from below with a longer, more
cinematic duration.

```css
.feature-illustration {
  opacity: 0;
  transform: translateY(32px) scale(0.97);
  transition:
    opacity   700ms var(--ease-out-quart),
    transform 700ms var(--ease-out-quart);
  transition-delay: 200ms;
}

.feature-illustration.visible {
  opacity: 1;
  transform: translateY(0) scale(1);
}
```

---

## Logo Marquee (Enterprise Logos)

The competitor/alternative logos scroll horizontally in a seamless loop.
Two copies of the list side by side — when first copy exits left,
second copy has taken its place.

```css
.marquee-track {
  display: flex;
  width: max-content;
  animation: marquee 28000ms linear infinite;
}

/* Pause on hover */
.marquee-wrapper:hover .marquee-track {
  animation-play-state: paused;
}

/* Individual logo item */
.marquee-logo {
  transition: opacity 180ms var(--ease-out-expo);
  opacity: 0.5;
}

.marquee-logo:hover {
  opacity: 1;
}
```

---

## Testimonial / Social Proof Cards

Twitter/X testimonials scroll in a second marquee, vertical or horizontal.

```css
.testimonial-marquee {
  animation: marquee 40000ms linear infinite;
}

/* Each card */
.testimonial-card {
  transition:
    border-color 200ms var(--ease-out-expo),
    background   200ms var(--ease-out-expo),
    transform    200ms var(--ease-out-expo);
  border: 1px solid #2D2840;
}

.testimonial-card:hover {
  border-color: #3D3757;
  background: #1A1727;
  transform: translateY(-2px);
}
```

---

## Live Counter Animation

The "0+ deploys per month" section has rolling digit counters.
Each digit slot flips upward as numbers count to their target.

```css
.counter-digit {
  display: inline-block;
  overflow: hidden;
  height: 1em;
}

.counter-digit-inner {
  animation: countUp 600ms var(--ease-out-expo) both;
}

/* Stagger each digit position */
.counter-digit:nth-child(1) .counter-digit-inner { animation-delay: 0ms;   }
.counter-digit:nth-child(2) .counter-digit-inner { animation-delay: 60ms;  }
.counter-digit:nth-child(3) .counter-digit-inner { animation-delay: 120ms; }
.counter-digit:nth-child(4) .counter-digit-inner { animation-delay: 180ms; }
.counter-digit:nth-child(5) .counter-digit-inner { animation-delay: 240ms; }
```

---

## Button Interactions

Railway CTA buttons have a very specific feel — confident press, slight
glow on hover from the purple accent.

```css
/* Primary CTA */
.btn-primary {
  transition:
    background    180ms var(--ease-out-expo),
    box-shadow    180ms var(--ease-out-expo),
    transform     120ms var(--ease-out-expo),
    opacity       180ms var(--ease-out-expo);
  background: #B39DFF;
  color: #13111C;
}

.btn-primary:hover {
  background: #C4B4FF;
  box-shadow: 0 0 20px rgba(179, 157, 255, 0.35);
  transform: translateY(-1px);
}

.btn-primary:active {
  transform: scale(0.97) translateY(0);
  transition-duration: 60ms;
  box-shadow: none;
}

/* Secondary / ghost CTA */
.btn-secondary {
  transition:
    border-color 180ms var(--ease-out-expo),
    color        180ms var(--ease-out-expo),
    background   180ms var(--ease-out-expo),
    transform    120ms var(--ease-out-expo);
  border: 1px solid #3D3757;
  color: #8B82AC;
}

.btn-secondary:hover {
  border-color: #B39DFF;
  color: #F0EEFF;
  background: rgba(179, 157, 255, 0.08);
  transform: translateY(-1px);
}

.btn-secondary:active {
  transform: scale(0.97);
  transition-duration: 60ms;
}
```

---

## Card / Panel Hover

```css
.card {
  transition:
    border-color 220ms var(--ease-out-expo),
    background   220ms var(--ease-out-expo),
    box-shadow   220ms var(--ease-out-expo),
    transform    220ms var(--ease-out-expo);
  border: 1px solid #2D2840;
  background: #1A1727;
}

.card:hover {
  border-color: #3D3757;
  background: #1E1B2E;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
  transform: translateY(-3px);
}

/* Feature list items within sections */
.feature-card {
  transition:
    border-color 180ms var(--ease-out-expo),
    background   180ms var(--ease-out-expo);
}

.feature-card:hover {
  border-color: #B39DFF;
  background: rgba(179, 157, 255, 0.05);
}
```

---

## Train / Station Scene (CTA Section)

The "Now Boarding" footer CTA has a decorative train platform SVG.
The floor/platform illustration enters as if the camera is panning down.

```css
.station-floor {
  animation: fadeUp 900ms var(--ease-out-quart) 200ms both;
  transform-origin: bottom center;
}

/* "Now Boarding" headline */
.boarding-headline {
  animation: fadeUp 600ms var(--ease-out-expo) both;
}

/* "All Aboard" button */
.boarding-cta {
  animation: scaleUp 500ms var(--ease-out-back) 200ms both;
}
```

---

## Announcement Banner

The top iOS app banner slides down from above.

```css
.announcement-banner {
  animation: fadeDown 350ms var(--ease-out-expo) both;
}

/* Link arrow inside banner */
.banner-arrow {
  display: inline-block;
  transition: transform 180ms var(--ease-out-expo);
}

.announcement-banner:hover .banner-arrow {
  transform: translateX(3px);
}
```

---

## Loading / Skeleton States

Railway uses a shimmer pattern over purple-tinted surfaces.

```css
.skeleton {
  background: linear-gradient(
    90deg,
    #1A1727 25%,
    #2D2840 50%,
    #1A1727 75%
  );
  background-size: 200% 100%;
  animation: shimmer 1500ms var(--ease-linear) infinite;
}
```

---

## Deploy Status Pulse

Active deployment indicators use a pulsing dot.

```css
.status-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #4ADE80;
  animation: pulse 2000ms var(--ease-linear) infinite;
}

/* Outer ring ripple */
.status-dot::after {
  content: '';
  position: absolute;
  inset: -4px;
  border-radius: 50%;
  border: 2px solid #4ADE80;
  animation: pulse 2000ms var(--ease-linear) infinite;
  animation-delay: 300ms;
}
```

---

## Scroll Behavior

```css
html {
  scroll-behavior: smooth;
}

/* Sticky nav transition on scroll */
.nav-sticky {
  transition:
    background    250ms var(--ease-out-expo),
    backdrop-filter 250ms var(--ease-out-expo),
    border-color  250ms var(--ease-out-expo);
}

.nav-sticky.scrolled {
  background: rgba(19, 17, 28, 0.8);
  backdrop-filter: blur(16px);
  border-bottom: 1px solid #2D2840;
}
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
    scroll-behavior: auto !important;
  }

  .marquee-track {
    animation: none;
  }
}
```

---

## Framer Motion Equivalents (React)

```js
// Railway's signature easing
const easeOutExpo = [0.16, 1, 0.3, 1]
const easeOutBack = [0.34, 1.56, 0.64, 1]
const easeInOut   = [0.4, 0, 0.2, 1]

// Fade up — primary entrance
export const fadeUp = {
  hidden:  { opacity: 0, y: 20 },
  visible: {
    opacity: 1, y: 0,
    transition: { duration: 0.55, ease: easeOutExpo }
  }
}

// Scale up — cards, UI elements
export const scaleUp = {
  hidden:  { opacity: 0, scale: 0.94 },
  visible: {
    opacity: 1, scale: 1,
    transition: { duration: 0.5, ease: easeOutExpo }
  }
}

// Bouncy CTA — "All Aboard" button
export const bouncyCta = {
  hidden:  { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1, scale: 1,
    transition: { duration: 0.5, ease: easeOutBack }
  }
}

// Stagger container
export const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1
    }
  }
}

// Hero stagger (slower, more cinematic)
export const heroStagger = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
}

// Marquee (use CSS instead of Framer for perf)
// But if needed in Framer:
export const marqueeVariant = {
  animate: {
    x: [0, "-50%"],
    transition: {
      x: { repeat: Infinity, duration: 28, ease: "linear" }
    }
  }
}

// Tab indicator slide
export const tabIndicator = {
  layout: true,
  transition: { duration: 0.28, ease: easeInOut }
}

// Counter digit roll
export const digitRoll = {
  hidden:  { y: "100%", opacity: 0 },
  visible: {
    y: "0%", opacity: 1,
    transition: { duration: 0.6, ease: easeOutExpo }
  }
}

// Button hover spring
export const buttonHover = {
  rest:  { y: 0, boxShadow: "0 0 0px rgba(179,157,255,0)" },
  hover: {
    y: -1,
    boxShadow: "0 0 20px rgba(179,157,255,0.35)",
    transition: { duration: 0.18, ease: easeOutExpo }
  },
  tap: {
    scale: 0.97,
    transition: { duration: 0.06 }
  }
}
```

---

## IntersectionObserver Setup (JS)

```js
// Railway-style scroll trigger setup
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible')
        // Don't unobserve — Railway keeps elements visible once shown
      }
    })
  },
  {
    threshold: 0.12,       // triggers when 12% visible
    rootMargin: '0px 0px -40px 0px'  // slight bottom offset
  }
)

document.querySelectorAll('.reveal, .feature-item, .feature-illustration')
  .forEach(el => observer.observe(el))
```

---

## Summary Cheat Sheet

| Element                  | Duration   | Easing                        | Transform                    |
|--------------------------|------------|-------------------------------|------------------------------|
| Nav entrance             | 300ms      | cubic-bezier(0.16, 1, 0.3, 1)| translateY(-12px→0)          |
| Nav link hover           | 180ms      | cubic-bezier(0.16, 1, 0.3, 1)| opacity 0.6→1                |
| Nav dropdown open        | 200ms      | cubic-bezier(0.16, 1, 0.3, 1)| fadeDown                     |
| Banner entrance          | 350ms      | cubic-bezier(0.16, 1, 0.3, 1)| translateY(-12px→0)          |
| Hero bg reveal           | 1100ms     | cubic-bezier(0.25, 1, 0.5, 1)| opacity 0→1                  |
| Hero headline            | 650ms      | cubic-bezier(0.16, 1, 0.3, 1)| translateY(20px→0)           |
| Hero CTA                 | 450ms      | cubic-bezier(0.16, 1, 0.3, 1)| translateY(20px→0)           |
| Hero deploy UI           | 700ms      | cubic-bezier(0.16, 1, 0.3, 1)| scale(0.94→1)                |
| Section reveal           | 550ms      | cubic-bezier(0.16, 1, 0.3, 1)| translateY(24px→0)           |
| Feature item stagger     | 400ms      | cubic-bezier(0.16, 1, 0.3, 1)| translateY(16px→0) +80ms ea  |
| Feature illustration     | 700ms      | cubic-bezier(0.25, 1, 0.5, 1)| translateY(32px)+scale(0.97) |
| Card hover               | 220ms      | cubic-bezier(0.16, 1, 0.3, 1)| translateY(-3px) + shadow    |
| Button hover             | 180ms      | cubic-bezier(0.16, 1, 0.3, 1)| translateY(-1px) + glow      |
| Button press             | 60ms       | cubic-bezier(0.16, 1, 0.3, 1)| scale(0.97)                  |
| Marquee logos            | 28000ms    | linear                        | translateX loop              |
| Testimonial marquee      | 40000ms    | linear                        | translateX loop              |
| Counter digits           | 600ms      | cubic-bezier(0.16, 1, 0.3, 1)| translateY(100%→0) +60ms ea  |
| Status dot pulse         | 2000ms     | linear                        | opacity loop                 |
| Skeleton shimmer         | 1500ms     | linear                        | background-position          |
| Station floor reveal     | 900ms      | cubic-bezier(0.25, 1, 0.5, 1)| translateY(up)               |
| Boarding CTA button      | 500ms      | cubic-bezier(0.34, 1.56, 0.64, 1)| scale(0.9→1) bounce      |
| Sticky nav scroll        | 250ms      | cubic-bezier(0.16, 1, 0.3, 1)| background + blur            |
| Stagger step delay       | +80ms      | —                             | per child                    |