# MOTION.md — contralabs.com Motion System
> Reverse-engineered from contralabs.com (2026)
> Built on Framer — motion primitives extracted and translated to raw CSS + Framer Motion
> Drop into Cursor, Claude Code, v0, Lovable, or Codex for on-brand animations.

---

## Design Philosophy

Contra Labs motion is **editorial, bold, and curatorial**. It feels like a
high-end creative agency site, not a SaaS product. The motion language borrows
from print design and gallery aesthetics — large type that enters with weight,
images that orbit and breathe, video loops that play as texture.

This is the highest-craft motion system in the set. It uses Framer's built-in
spring physics and scroll-linked animations far more aggressively than the others.

Core principles:
- **Type is the primary animation object** — headlines split into lines or words,
  each entering independently with weight and timing
- **Scroll is a scrubber** — many animations are tied to scroll position, not just
  triggered by scroll entry
- **Video as texture** — background videos loop silently, providing ambient depth
- **Image grids orbit and stack** — creative portfolio images float, overlap, and
  shift as you scroll
- **Dark, near-black base** — `#0A0A0A` to `#111111`, with off-white text
- **Horizontal marquees on two rows** — partner/tool names scroll at different speeds
- **Dual-line type splits** — section headings break mid-phrase across two lines,
  the second line staggered slightly after the first
- **Scale-driven reveals** — images scale from 0.92–0.96 into 1.0, not just translate

---

## Color & Background Context

```
Background primary:    #0A0A0A   (near-black, the true base)
Background surface:    #111111   (cards, panels, sections)
Background elevated:   #1A1A1A   (modals, tooltips)
Border subtle:         #222222   (dividers)
Border medium:         #333333   (card edges)
Text primary:          #F5F5F5   (off-white — not pure white)
Text secondary:        #888888   (muted, captions)
Text tertiary:         #555555   (placeholder, footnotes)

Accent warm white:     #FFFFFF   (high-emphasis moments only)
Accent gold:           #C8A96E   (warm highlight, Contra brand warmth)
Accent cream:          #F0EAD6   (softer accent on dark)

Image tint overlay:    rgba(10, 10, 10, 0.4)   (over hero images)
Gradient overlay:      linear-gradient(to bottom, transparent, #0A0A0A)
```

Motion reads on near-black. Off-white text has more warmth than pure white —
key to the editorial/creative feel. Gold accent appears on key interactive moments.

---

## Duration Scale

```css
:root {
  --duration-snap:      80ms;     /* instant state flips */
  --duration-fast:      160ms;    /* hover micro-states */
  --duration-base:      300ms;    /* standard transitions */
  --duration-medium:    500ms;    /* card reveals, image enters */
  --duration-slow:      700ms;    /* section headings, hero text */
  --duration-slower:    900ms;    /* full hero reveals */
  --duration-cinematic: 1200ms;   /* page transitions, large image reveals */
  --duration-marquee-a: 32000ms;  /* top marquee row */
  --duration-marquee-b: 48000ms;  /* bottom marquee row (slower) */
}
```

---

## Easing Scale

```css
:root {
  /* Primary — editorial, smooth, unhurried */
  --ease-out:           cubic-bezier(0.25, 1, 0.5, 1);

  /* Snappy — quick hover states */
  --ease-out-sharp:     cubic-bezier(0.16, 1, 0.3, 1);

  /* In-out — content panel switching */
  --ease-in-out:        cubic-bezier(0.4, 0, 0.2, 1);

  /* Exit */
  --ease-in:            cubic-bezier(0.4, 0, 1, 1);

  /* Framer spring — used on image reveals and cards */
  /* stiffness: 120, damping: 20, mass: 1 */
  --spring-soft:        cubic-bezier(0.34, 1.12, 0.64, 1);

  /* Linear — marquees, video scrub */
  --ease-linear:        linear;
}
```

**Framer spring config that defines the feel:**
```js
// Soft landing — primary spring for all image/card reveals
const softSpring = { type: "spring", stiffness: 120, damping: 20, mass: 1 }

// Snappier spring — hover lifts, tab indicators
const snapSpring = { type: "spring", stiffness: 280, damping: 28, mass: 0.8 }
```

---

## Core Keyframes

```css
/* === ENTRANCES === */

@keyframes fadeUp {
  from {
    opacity: 0;
    transform: translateY(24px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeUpSmall {
  from {
    opacity: 0;
    transform: translateY(12px);
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

/* Scale-fade — primary for image reveals */
@keyframes scaleFadeUp {
  from {
    opacity: 0;
    transform: translateY(32px) scale(0.94);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

/* Line reveal — used for split-line headlines */
@keyframes lineReveal {
  from {
    opacity: 0;
    transform: translateY(100%);
    clip-path: inset(0 0 100% 0);
  }
  to {
    opacity: 1;
    transform: translateY(0);
    clip-path: inset(0 0 0% 0);
  }
}

/* Word reveal — used inside staggered headlines */
@keyframes wordReveal {
  from {
    opacity: 0;
    transform: translateY(16px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* === EXITS === */

@keyframes fadeOutUp {
  from {
    opacity: 1;
    transform: translateY(0);
  }
  to {
    opacity: 0;
    transform: translateY(-16px);
  }
}

/* === CONTINUOUS === */

/* Dual-speed marquee rows */
@keyframes marqueeLeft {
  from { transform: translateX(0); }
  to   { transform: translateX(-50%); }
}

/* Slow float for decorative images */
@keyframes floatSlow {
  0%, 100% { transform: translateY(0) rotate(0deg); }
  33%       { transform: translateY(-8px) rotate(0.5deg); }
  66%       { transform: translateY(-4px) rotate(-0.3deg); }
}

/* Video texture ambient — no keyframes needed, just plays */

/* Stat counter roll */
@keyframes countUp {
  from {
    opacity: 0;
    transform: translateY(60%);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```

---

## Hero Section

Contra Labs hero is **full-viewport, dark, with a large editorial headline**
and a looping background video or static image with a gradient overlay.
Text enters in a precise sequence — line by line, not word by word.

```css
/* Full-viewport hero */
.hero {
  position: relative;
  min-height: 100vh;
  background: #0A0A0A;
  overflow: hidden;
}

/* Background image/video layer */
.hero-bg {
  position: absolute;
  inset: 0;
  animation: fadeIn 1200ms var(--ease-out) both;
}

.hero-bg::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to bottom,
    rgba(10, 10, 10, 0.3) 0%,
    rgba(10, 10, 10, 0.6) 60%,
    rgba(10, 10, 10, 0.95) 100%
  );
}

/* Hero content container */
.hero-content {
  position: relative;
  z-index: 2;
}

/* "A frontier human data and evaluation lab" — line 1 */
.hero-line-1 {
  animation: fadeUp 700ms var(--ease-out) 200ms both;
  overflow: hidden;
}

/* "making AI better for creativity." — line 2 */
.hero-line-2 {
  animation: fadeUp 700ms var(--ease-out) 360ms both;
  overflow: hidden;
}

/* CTA buttons row */
.hero-ctas {
  animation: fadeUpSmall 500ms var(--ease-out) 550ms both;
}

/* "Request partnership" primary */
.hero-cta-primary {
  animation: fadeIn 400ms var(--ease-out) 600ms both;
}

/* "Research" secondary */
.hero-cta-secondary {
  animation: fadeIn 400ms var(--ease-out) 680ms both;
}
```

---

## Split-Line Headline Technique

Contra Labs' most distinctive motion — large section headings split
across two lines where the second line stacks below the first.
Each line clips up from behind an invisible overflow mask.

```css
/* The headline wrapper clips overflow */
.split-headline {
  overflow: hidden;
}

/* Line 1 — clips up into view */
.split-headline .line-1 {
  display: block;
  animation: lineReveal 700ms var(--ease-out) both;
}

/* Line 2 — same animation, 120ms after line 1 */
.split-headline .line-2 {
  display: block;
  animation: lineReveal 700ms var(--ease-out) 120ms both;
}

/* Line 3 — 240ms after line 1 */
.split-headline .line-3 {
  display: block;
  animation: lineReveal 700ms var(--ease-out) 240ms both;
}
```

**Example — "The Network of Human Taste":**
```html
<h2 class="split-headline">
  <span class="line-1">The Network</span>
  <span class="line-2">of Human</span>
  <span class="line-3">Taste</span>
</h2>
```

**And the closing line — "Execution is free. Now, judgment is everything.":**
```css
.statement-line-1 {
  animation: lineReveal 800ms var(--ease-out) both;
}

.statement-line-2 {
  animation: lineReveal 800ms var(--ease-out) 160ms both;
}
```

---

## Dual-Speed Marquee (Partner & Tool Names)

Contra Labs uses **two horizontal marquee rows** that scroll at different
speeds, creating a depth parallax effect. Top row is faster, bottom row slower.
Each row contains company names and tool categories interleaved.

```css
/* Marquee wrapper — clips and adds edge fades */
.marquee-wrapper {
  overflow: hidden;
  position: relative;
  mask-image: linear-gradient(
    to right,
    transparent 0%,
    #0A0A0A 5%,
    #0A0A0A 95%,
    transparent 100%
  );
}

/* Each row track — duplicated content for seamless loop */
.marquee-track {
  display: flex;
  width: max-content;
  align-items: center;
  gap: 40px;
}

/* Row 1 — faster */
.marquee-row-1 .marquee-track {
  animation: marqueeLeft 32000ms linear infinite;
}

/* Row 2 — slower, creates parallax depth */
.marquee-row-2 .marquee-track {
  animation: marqueeLeft 48000ms linear infinite;
}

/* Pause all rows on hover */
.marquee-wrapper:hover .marquee-track {
  animation-play-state: paused;
}

/* Individual marquee item — company/tool name */
.marquee-item {
  transition:
    opacity  200ms var(--ease-out),
    color    200ms var(--ease-out);
  opacity: 0.5;
  color: #888888;
  white-space: nowrap;
  font-size: 14px;
  letter-spacing: 0.02em;
}

.marquee-item:hover {
  opacity: 1;
  color: #F5F5F5;
}

/* Separator dot between items */
.marquee-separator {
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: #333333;
  flex-shrink: 0;
}
```

---

## Ecosystem Card Grid (4-up rotating cards)

The "Meet the Contra Labs ecosystem" section uses a **4-card grid**
where each card (Creative Arena, Human Creativity Benchmark, Creative Human Data,
Co-Agents) reveals on scroll with a staggered scale-fade.

```css
/* Card grid */
.ecosystem-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
}

/* Base card */
.ecosystem-card {
  opacity: 0;
  transform: translateY(20px) scale(0.96);
  transition:
    opacity    600ms var(--ease-out),
    transform  600ms var(--ease-out),
    border-color 200ms var(--ease-out),
    box-shadow   200ms var(--ease-out);
  border: 1px solid #222222;
  border-radius: 16px;
  background: #111111;
  overflow: hidden;
}

.ecosystem-card.visible {
  opacity: 1;
  transform: translateY(0) scale(1);
}

/* Stagger each card */
.ecosystem-card:nth-child(1).visible { transition-delay: 0ms; }
.ecosystem-card:nth-child(2).visible { transition-delay: 80ms; }
.ecosystem-card:nth-child(3).visible { transition-delay: 160ms; }
.ecosystem-card:nth-child(4).visible { transition-delay: 240ms; }

/* Card hover */
.ecosystem-card:hover {
  border-color: #333333;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5);
}

/* Card image — scales up on hover */
.ecosystem-card-image {
  transition: transform 500ms var(--ease-out);
  transform-origin: center bottom;
}

.ecosystem-card:hover .ecosystem-card-image {
  transform: scale(1.04);
}

/* Card label — "Public Evaluations", "Research & Insights" */
.ecosystem-card-label {
  transition: opacity 200ms var(--ease-out);
  opacity: 0.5;
  font-size: 11px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.ecosystem-card:hover .ecosystem-card-label {
  opacity: 0.8;
}

/* Card headline — "Creative Arena", "Human Creativity Benchmark" */
.ecosystem-card-title-line1 {
  transition: color 200ms var(--ease-out);
}

.ecosystem-card-title-line2 {
  transition: color 200ms var(--ease-out);
  color: #888888; /* second line starts muted */
}

.ecosystem-card:hover .ecosystem-card-title-line1,
.ecosystem-card:hover .ecosystem-card-title-line2 {
  color: #F5F5F5;
}
```

---

## Floating Creative Profile Images

The section "Built on real-world creative expertise" shows a **floating
grid of creative professional headshots** that drift with subtle vertical
animation at different phases.

```css
/* Image grid container */
.creative-profiles {
  position: relative;
}

/* Each profile image */
.profile-img {
  border-radius: 12px;
  overflow: hidden;
  animation: scaleFadeUp 700ms var(--ease-out) both;
}

/* Stagger profile images */
.profile-img:nth-child(1)  { animation-delay: 0ms; }
.profile-img:nth-child(2)  { animation-delay: 80ms; }
.profile-img:nth-child(3)  { animation-delay: 160ms; }
.profile-img:nth-child(4)  { animation-delay: 240ms; }
.profile-img:nth-child(5)  { animation-delay: 320ms; }
.profile-img:nth-child(6)  { animation-delay: 400ms; }
.profile-img:nth-child(7)  { animation-delay: 480ms; }
.profile-img:nth-child(8)  { animation-delay: 560ms; }
.profile-img:nth-child(9)  { animation-delay: 640ms; }
.profile-img:nth-child(10) { animation-delay: 720ms; }

/* Floating drift — applied after entrance completes */
.profile-img.floating {
  animation: floatSlow 6000ms ease-in-out infinite;
}

/* Each floats at a different phase */
.profile-img.floating:nth-child(odd)  { animation-delay: 0ms; }
.profile-img.floating:nth-child(even) { animation-delay: 2000ms; }

/* Hover state — scale up slightly */
.profile-img:hover {
  transform: scale(1.05);
  transition: transform 300ms var(--ease-out);
  z-index: 10;
}
```

---

## Stat Counter Animation

The stat numbers (1.5M+, 400+, $250M+, 26x, 50+) roll up into view
when their section enters the viewport.

```css
/* Stat block container */
.stat-block {
  opacity: 0;
  transform: translateY(16px);
  transition:
    opacity   500ms var(--ease-out),
    transform 500ms var(--ease-out);
}

.stat-block.visible {
  opacity: 1;
  transform: translateY(0);
}

/* Stagger each stat */
.stat-block:nth-child(1) { transition-delay: 0ms; }
.stat-block:nth-child(2) { transition-delay: 100ms; }
.stat-block:nth-child(3) { transition-delay: 200ms; }
.stat-block:nth-child(4) { transition-delay: 300ms; }
.stat-block:nth-child(5) { transition-delay: 400ms; }

/* The number itself — rolls up from below */
.stat-number {
  display: block;
  overflow: hidden;
  line-height: 1;
}

.stat-number-inner {
  animation: countUp 700ms var(--ease-out) both;
}

/* "+" suffix — enters slightly after number */
.stat-suffix {
  animation: fadeIn 300ms var(--ease-out) 400ms both;
}

/* Label beneath number */
.stat-label {
  animation: fadeIn 400ms var(--ease-out) 200ms both;
  opacity: 0.5;
  font-size: 13px;
}
```

---

## Skill Tab Switcher (Creative Human Data page)

The "Designers / Writers / Marketers / Engineers / ..." tabs cycle
automatically with a cross-fade and a sliding content panel.

```css
/* Tab list */
.skill-tabs {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

/* Individual tab pill */
.skill-tab {
  transition:
    background   200ms var(--ease-out),
    color        200ms var(--ease-out),
    border-color 200ms var(--ease-out);
  border: 1px solid #222222;
  border-radius: 100px;
  color: #555555;
  padding: 6px 16px;
  font-size: 13px;
}

.skill-tab:hover {
  border-color: #444444;
  color: #888888;
}

.skill-tab.active {
  border-color: #F5F5F5;
  color: #F5F5F5;
  background: rgba(245, 245, 245, 0.06);
}

/* Content panel for each skill */
.skill-content {
  animation: fadeUpSmall 400ms var(--ease-out) both;
}

.skill-content[data-exiting] {
  animation: fadeOutUp 200ms var(--ease-in) both;
}
```

---

## Feature Comparison Row

"Rank copy for tone and brand fit / Score images for creativity /
Subjective feedback on video / Fine-tune review loops" —
each item slides in from the left on scroll.

```css
.feature-row {
  opacity: 0;
  transform: translateX(-16px);
  transition:
    opacity   500ms var(--ease-out),
    transform 500ms var(--ease-out);
  border-bottom: 1px solid #222222;
  padding: 24px 0;
}

.feature-row.visible {
  opacity: 1;
  transform: translateX(0);
}

.feature-row:nth-child(1) { transition-delay: 0ms; }
.feature-row:nth-child(2) { transition-delay: 80ms; }
.feature-row:nth-child(3) { transition-delay: 160ms; }
.feature-row:nth-child(4) { transition-delay: 240ms; }

/* Screenshot image inside each row */
.feature-row-image {
  transition: transform 400ms var(--ease-out);
}

.feature-row:hover .feature-row-image {
  transform: scale(1.02) translateY(-2px);
}
```

---

## Navigation

Contra Labs nav is minimal — near-transparent over hero, dark sticky on scroll.
Very few elements, ultra-clean transitions.

```css
/* Nav base */
nav {
  transition:
    background      300ms var(--ease-out),
    border-color    300ms var(--ease-out),
    backdrop-filter 300ms var(--ease-out);
  background: transparent;
  border-bottom: 1px solid transparent;
}

/* Scrolled state */
nav.scrolled {
  background: rgba(10, 10, 10, 0.85);
  backdrop-filter: blur(20px) saturate(160%);
  border-bottom-color: #222222;
}

/* Logo */
.nav-logo {
  animation: fadeIn 400ms var(--ease-out) both;
  transition: opacity 200ms var(--ease-out);
}

.nav-logo:hover {
  opacity: 0.7;
}

/* Nav links */
.nav-link {
  transition:
    color   160ms var(--ease-out),
    opacity 160ms var(--ease-out);
  color: #888888;
  opacity: 1;
}

.nav-link:hover {
  color: #F5F5F5;
}

.nav-link.active {
  color: #F5F5F5;
}
```

---

## Buttons

Contra Labs uses a very restrained button set — outlined on dark,
with a soft fill-in on hover.

```css
/* Primary CTA — "Request partnership" */
.btn-primary {
  transition:
    background   200ms var(--ease-out),
    border-color 200ms var(--ease-out),
    color        200ms var(--ease-out),
    transform    120ms var(--ease-out),
    box-shadow   200ms var(--ease-out);
  background: #F5F5F5;
  color: #0A0A0A;
  border: 1px solid #F5F5F5;
  border-radius: 100px;
  padding: 10px 24px;
}

.btn-primary:hover {
  background: #FFFFFF;
  border-color: #FFFFFF;
  box-shadow: 0 4px 20px rgba(245, 245, 245, 0.15);
  transform: translateY(-1px);
}

.btn-primary:active {
  transform: scale(0.97) translateY(0);
  transition-duration: 80ms;
}

/* Secondary CTA — "Research" */
.btn-secondary {
  transition:
    background   200ms var(--ease-out),
    border-color 200ms var(--ease-out),
    color        200ms var(--ease-out),
    transform    120ms var(--ease-out);
  background: transparent;
  color: #888888;
  border: 1px solid #333333;
  border-radius: 100px;
  padding: 10px 24px;
}

.btn-secondary:hover {
  background: rgba(245, 245, 245, 0.05);
  border-color: #555555;
  color: #F5F5F5;
  transform: translateY(-1px);
}

.btn-secondary:active {
  transform: scale(0.97);
  transition-duration: 80ms;
}
```

---

## Video Texture Sections

Multiple sections use **looping background videos** (`.webm`) as ambient texture.
The video fades in slowly and plays silently beneath content.

```css
/* Video background */
.video-bg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0;
  animation: fadeIn 1500ms var(--ease-out) 300ms both;
  pointer-events: none;
}

/* Section with video — add a dark overlay */
.video-section::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(
    135deg,
    rgba(10, 10, 10, 0.7) 0%,
    rgba(10, 10, 10, 0.4) 100%
  );
  pointer-events: none;
}

/* Content above video */
.video-section-content {
  position: relative;
  z-index: 2;
}
```

---

## "Feedback that feels creative" — Scroll-Linked Image Stack

The creative-human-data page has an image stack (Feedback / that / feels / creative)
where each word and its associated image reveals on scroll, creating a
story-like reading experience.

```css
/* Wrapper — sticky scroll container */
.story-section {
  position: relative;
}

/* Each story "frame" */
.story-frame {
  opacity: 0;
  transform: translateY(20px) scale(0.97);
  transition:
    opacity   600ms var(--ease-out),
    transform 600ms var(--ease-out);
}

.story-frame.visible {
  opacity: 1;
  transform: translateY(0) scale(1);
}

/* Word label that accompanies each image */
.story-word {
  opacity: 0;
  transform: translateY(12px);
  transition:
    opacity   400ms var(--ease-out) 200ms,
    transform 400ms var(--ease-out) 200ms;
}

.story-frame.visible .story-word {
  opacity: 1;
  transform: translateY(0);
}

/* The image itself */
.story-image {
  border-radius: 16px;
  overflow: hidden;
  transition: transform 600ms var(--ease-out);
}

.story-frame.visible .story-image {
  transform: scale(1);
}
```

---

## Scroll-Triggered Section Reveals

```css
/* Base hidden state */
.reveal {
  opacity: 0;
  transform: translateY(20px);
  transition:
    opacity   600ms var(--ease-out),
    transform 600ms var(--ease-out);
}

.reveal.visible {
  opacity: 1;
  transform: translateY(0);
}

/* Section eyebrow — "Public Evaluations", "Research & Insights" */
.eyebrow {
  transition-delay: 0ms;
  opacity: 0.5;
  font-size: 11px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

/* Section heading */
.section-heading {
  transition-delay: 80ms;
}

/* Body copy */
.section-body {
  transition-delay: 160ms;
}

/* CTA below body */
.section-cta {
  transition-delay: 240ms;
}

/* Feature list items */
.feature-item {
  opacity: 0;
  transform: translateY(14px);
  transition:
    opacity   500ms var(--ease-out),
    transform 500ms var(--ease-out);
}

.feature-item.visible:nth-child(1) { transition-delay: 0ms;   opacity: 1; transform: none; }
.feature-item.visible:nth-child(2) { transition-delay: 80ms;  opacity: 1; transform: none; }
.feature-item.visible:nth-child(3) { transition-delay: 160ms; opacity: 1; transform: none; }
.feature-item.visible:nth-child(4) { transition-delay: 240ms; opacity: 1; transform: none; }
```

---

## FAQ Accordion

```css
/* FAQ item */
.faq-item {
  border-top: 1px solid #222222;
  transition: border-color 200ms var(--ease-out);
}

.faq-item:hover {
  border-color: #333333;
}

/* Question row */
.faq-question {
  transition: color 200ms var(--ease-out);
  color: #888888;
  cursor: pointer;
}

.faq-question:hover,
.faq-item.open .faq-question {
  color: #F5F5F5;
}

/* Expand icon — rotates on open */
.faq-icon {
  transition: transform 300ms var(--ease-out);
}

.faq-item.open .faq-icon {
  transform: rotate(45deg);
}

/* Answer panel — height animation */
.faq-answer {
  overflow: hidden;
  max-height: 0;
  transition:
    max-height  400ms var(--ease-out),
    opacity     300ms var(--ease-out);
  opacity: 0;
}

.faq-item.open .faq-answer {
  max-height: 500px;
  opacity: 1;
}

/* Answer text */
.faq-answer-inner {
  animation: fadeUpSmall 300ms var(--ease-out) both;
  color: #888888;
  line-height: 1.7;
}
```

---

## Social Icons (Footer)

```css
.social-icon {
  transition:
    opacity   160ms var(--ease-out),
    transform 160ms var(--ease-out);
  opacity: 0.4;
}

.social-icon:hover {
  opacity: 1;
  transform: scale(1.1);
}

.social-icon:active {
  transform: scale(0.94);
  transition-duration: 80ms;
}
```

---

## Footer Link

```css
.footer-link {
  transition:
    color   160ms var(--ease-out),
    opacity 160ms var(--ease-out);
  color: #555555;
}

.footer-link:hover {
  color: #F5F5F5;
  opacity: 1;
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
// Contra Labs-style scroll trigger
// Fire once, fairly generous threshold for the editorial pacing
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
    threshold: 0.08,
    rootMargin: '0px 0px -40px 0px'
  }
)

document
  .querySelectorAll(
    '.reveal, .ecosystem-card, .feature-item, .feature-row, ' +
    '.stat-block, .profile-img, .story-frame'
  )
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

  /* Marquees stop */
  .marquee-track {
    animation: none;
  }

  /* Floating profiles — stop floating */
  .profile-img.floating {
    animation: none;
  }

  /* Videos still play (they're silent ambient) */
  .video-bg {
    opacity: 0.6;
    animation: none;
  }

  html {
    scroll-behavior: auto;
  }
}
```

---

## Framer Motion Equivalents (React)

```js
// Contra Labs easing
const easeOut      = [0.25, 1, 0.5, 1]
const easeOutSharp = [0.16, 1, 0.3, 1]
const easeIn       = [0.4, 0, 1, 1]
const easeInOut    = [0.4, 0, 0.2, 1]

// Framer spring — soft, editorial
const softSpring = { type: "spring", stiffness: 120, damping: 20, mass: 1 }
const snapSpring = { type: "spring", stiffness: 280, damping: 28, mass: 0.8 }

// === CORE VARIANTS ===

export const fadeUp = {
  hidden:  { opacity: 0, y: 24 },
  visible: {
    opacity: 1, y: 0,
    transition: { duration: 0.7, ease: easeOut }
  }
}

export const fadeUpSmall = {
  hidden:  { opacity: 0, y: 12 },
  visible: {
    opacity: 1, y: 0,
    transition: { duration: 0.5, ease: easeOut }
  }
}

export const scaleFadeUp = {
  hidden:  { opacity: 0, y: 32, scale: 0.94 },
  visible: {
    opacity: 1, y: 0, scale: 1,
    transition: softSpring
  }
}

// === SPLIT LINE REVEAL ===
// Wrap each line in overflow:hidden and use this variant

export const lineReveal = {
  hidden:  { opacity: 0, y: "100%" },
  visible: {
    opacity: 1, y: "0%",
    transition: { duration: 0.7, ease: easeOut }
  }
}

export const splitHeadlineContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1
    }
  }
}

// === STAGGER CONTAINERS ===

export const staggerSlow = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.1 }
  }
}

export const staggerCards = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.05 }
  }
}

// === ECOSYSTEM CARD ===

export const ecosystemCard = {
  hidden:  { opacity: 0, y: 20, scale: 0.96 },
  visible: {
    opacity: 1, y: 0, scale: 1,
    transition: { duration: 0.6, ease: easeOut }
  }
}

export const ecosystemCardHover = {
  rest:  { scale: 1 },
  hover: {
    scale: 1.005,
    transition: snapSpring
  }
}

export const cardImageHover = {
  rest:  { scale: 1 },
  hover: {
    scale: 1.04,
    transition: { duration: 0.5, ease: easeOut }
  }
}

// === STAT COUNTER ===

export const statBlock = {
  hidden:  { opacity: 0, y: 16 },
  visible: {
    opacity: 1, y: 0,
    transition: { duration: 0.5, ease: easeOut }
  }
}

export const countRoll = {
  hidden:  { opacity: 0, y: "60%" },
  visible: {
    opacity: 1, y: "0%",
    transition: { duration: 0.7, ease: easeOut }
  }
}

// === FLOAT (profile images) ===

export const profileFloat = (delay = 0) => ({
  animate: {
    y: [0, -8, -4, 0],
    rotate: [0, 0.5, -0.3, 0],
    transition: {
      duration: 6,
      repeat: Infinity,
      ease: 'easeInOut',
      delay
    }
  }
})

// === MARQUEE ===
// Use CSS for marquee — Framer animation for this is expensive
// But if needed:
export const marqueeVariant = (duration = 32) => ({
  animate: {
    x: [0, "-50%"],
    transition: {
      x: { repeat: Infinity, duration, ease: "linear" }
    }
  }
})

// === BUTTON ===

export const btnMotion = {
  rest:  { y: 0 },
  hover: {
    y: -1,
    transition: { duration: 0.2, ease: easeOut }
  },
  tap: {
    scale: 0.97, y: 0,
    transition: { duration: 0.08 }
  }
}

// === FAQ ACCORDION ===

export const faqIcon = {
  closed: { rotate: 0 },
  open:   { rotate: 45, transition: { duration: 0.3, ease: easeOut } }
}

export const faqAnswer = {
  closed: { height: 0, opacity: 0 },
  open: {
    height: "auto", opacity: 1,
    transition: {
      height:  { duration: 0.4, ease: easeOut },
      opacity: { duration: 0.3, ease: easeOut, delay: 0.05 }
    }
  }
}

// === SKILL TAB CONTENT ===

export const skillContent = {
  hidden:  { opacity: 0, y: 8 },
  visible: {
    opacity: 1, y: 0,
    transition: { duration: 0.4, ease: easeOut }
  },
  exit: {
    opacity: 0, y: -8,
    transition: { duration: 0.2, ease: easeIn }
  }
}
```

---

## What Makes Contra Labs Unique vs. Other Sites

| Feature | Contra Labs | Railway | Clerk | Figma |
|---|---|---|---|---|
| Headline split lines | ✅ primary technique | ❌ | ❌ | ❌ |
| Dual-speed marquees | ✅ two rows | ✅ one row | ✅ multi-row | ❌ static logos |
| Video as texture | ✅ background webm | ❌ | ❌ | ❌ |
| Floating image grid | ✅ profiles float | ❌ | ❌ | ❌ cursor float |
| Soft Framer springs | ✅ primary | ❌ CSS only | ❌ CSS only | ❌ CSS only |
| Base color | `#0A0A0A` warm black | `#13111C` purple-black | `#0A0A0F` blue-black | `#FFFFFF` white |
| Easing signature | `(0.25, 1, 0.5, 1)` + spring | `(0.16, 1, 0.3, 1)` | `(0.16, 1, 0.3, 1)` | `(0.25, 1, 0.5, 1)` |
| Translate distance | 20–32px (large) | 16–24px | 12–16px | 10–12px (tiny) |
| Overall craft level | Agency / editorial | SaaS / cinematic | SaaS / secure | Consumer / minimal |

---

## Summary Cheat Sheet

| Element                    | Duration    | Easing                          | Transform / Effect                     |
|----------------------------|-------------|---------------------------------|----------------------------------------|
| Hero bg reveal             | 1200ms      | cubic-bezier(0.25, 1, 0.5, 1)  | opacity 0→1                            |
| Hero line 1                | 700ms       | cubic-bezier(0.25, 1, 0.5, 1)  | translateY(24px→0) 200ms delay         |
| Hero line 2                | 700ms       | cubic-bezier(0.25, 1, 0.5, 1)  | translateY(24px→0) 360ms delay         |
| Hero CTAs                  | 500ms       | cubic-bezier(0.25, 1, 0.5, 1)  | translateY(12px→0) 550ms delay         |
| Split line reveal (each)   | 700ms       | cubic-bezier(0.25, 1, 0.5, 1)  | clip-path + translateY, +120ms stagger |
| Marquee row 1 (fast)       | 32000ms ∞   | linear                          | translateX loop                        |
| Marquee row 2 (slow)       | 48000ms ∞   | linear                          | translateX loop, slower depth          |
| Marquee item hover         | 200ms       | cubic-bezier(0.25, 1, 0.5, 1)  | opacity 0.5→1 + color                  |
| Ecosystem card reveal      | 600ms       | cubic-bezier(0.25, 1, 0.5, 1)  | translateY(20px)+scale(0.96→1)         |
| Ecosystem card stagger     | +80ms       | —                               | per card                               |
| Ecosystem card hover       | 200ms       | cubic-bezier(0.25, 1, 0.5, 1)  | border + shadow                        |
| Ecosystem card image hover | 500ms       | cubic-bezier(0.25, 1, 0.5, 1)  | scale(1.04)                            |
| Profile image reveal       | 700ms       | cubic-bezier(0.25, 1, 0.5, 1)  | translateY(32px)+scale(0.94→1)         |
| Profile image float        | 6000ms ∞    | ease-in-out                     | translateY(0↔-8px) + subtle rotate     |
| Profile image hover        | 300ms       | cubic-bezier(0.25, 1, 0.5, 1)  | scale(1.05)                            |
| Stat block reveal          | 500ms       | cubic-bezier(0.25, 1, 0.5, 1)  | translateY(16px→0) +100ms stagger      |
| Stat number roll           | 700ms       | cubic-bezier(0.25, 1, 0.5, 1)  | translateY(60%→0)                      |
| Feature row slide in       | 500ms       | cubic-bezier(0.25, 1, 0.5, 1)  | translateX(-16px→0)                    |
| Feature row image hover    | 400ms       | cubic-bezier(0.25, 1, 0.5, 1)  | scale(1.02) + translateY(-2px)         |
| Skill tab active           | 200ms       | cubic-bezier(0.25, 1, 0.5, 1)  | border + background fill               |
| Skill content enter        | 400ms       | cubic-bezier(0.25, 1, 0.5, 1)  | fadeUpSmall                            |
| Story frame reveal         | 600ms       | cubic-bezier(0.25, 1, 0.5, 1)  | translateY(20px)+scale(0.97→1)         |
| Story word reveal          | 400ms       | cubic-bezier(0.25, 1, 0.5, 1)  | translateY(12px→0) 200ms delay         |
| Section reveal             | 600ms       | cubic-bezier(0.25, 1, 0.5, 1)  | translateY(20px→0)                     |
| Nav scrolled state         | 300ms       | cubic-bezier(0.25, 1, 0.5, 1)  | background + blur                      |
| Nav link hover             | 160ms       | cubic-bezier(0.25, 1, 0.5, 1)  | color muted→white                      |
| Button primary hover       | 200ms       | cubic-bezier(0.25, 1, 0.5, 1)  | translateY(-1px) + glow                |
| Button press               | 80ms        | cubic-bezier(0.25, 1, 0.5, 1)  | scale(0.97)                            |
| FAQ open — icon            | 300ms       | cubic-bezier(0.25, 1, 0.5, 1)  | rotate(0→45deg)                        |
| FAQ open — answer          | 400ms       | cubic-bezier(0.25, 1, 0.5, 1)  | height 0→auto + opacity                |
| Social icon hover          | 160ms       | cubic-bezier(0.25, 1, 0.5, 1)  | scale(1.1) + opacity 0.4→1             |
| Video texture reveal       | 1500ms      | cubic-bezier(0.25, 1, 0.5, 1)  | opacity 0→ambient                      |
| Stagger step delay         | +80ms       | —                               | per child                              |