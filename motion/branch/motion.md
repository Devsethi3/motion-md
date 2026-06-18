# MOTION.md — branch.computer Motion System
> Extracted and reverse-engineered from branch.computer
> Drop this file into Cursor, Claude Code, v0, Lovable, or Codex for on-brand animations.

---

## Design Philosophy

Branch's motion language is **terminal-native and precise**. Every animation feels like it belongs
in a CLI or developer tool — fast, purposeful, no decorative flourishes. Motion communicates
system state, not personality. Think: data loading, connections forming, outputs appearing.

Core principles:
- **Speed over softness** — durations are short, nothing lingers
- **Opacity + translate** are the primary animation primitives
- **No bounce, no overshoot** — springs are tight and critically damped
- **Stagger reveals** create the sense of a system assembling itself
- **Dark background (#141210)** means all motion reads against near-black

---

## Color & Background Context

```
Background:     #141210   (near-black, warm undertone)
Surface:        #1c1917   (cards, panels)
Border:         #292524   (subtle separators)
Text primary:   #fafaf9   (off-white)
Text muted:     #a8a29e   (secondary labels)
Accent:         #ffffff   (active states, highlights)
Terminal green: #4ade80   (success states, checkmarks)
```

Motion always reads against dark. Use opacity carefully — low opacity elements
disappear fast on dark backgrounds.

---

## Duration Scale

```
--duration-instant:   80ms    /* state flips, active indicators */
--duration-fast:      150ms   /* hover states, micro-interactions */
--duration-base:      250ms   /* standard UI transitions */
--duration-slow:      400ms   /* section entrances, reveals */
--duration-slower:    600ms   /* hero animations, staggered lists */
--duration-crawl:     900ms   /* full-page transitions, diagram assembly */
```

---

## Easing Scale

```
--ease-out:         cubic-bezier(0.16, 1, 0.3, 1)    /* primary — fast out, soft land */
--ease-in-out:      cubic-bezier(0.4, 0, 0.2, 1)     /* panels sliding in/out */
--ease-in:          cubic-bezier(0.4, 0, 1, 1)        /* elements exiting */
--ease-linear:      linear                             /* progress bars, typing cursors */
--ease-sharp:       cubic-bezier(0.25, 0, 0, 1)       /* CLI output lines appearing */
```

**Primary easing is always `--ease-out`.** This matches the feel of a terminal outputting
results — fast start, precise landing.

---

## Core Animation Primitives

### Fade Up (primary entrance)
Used for: hero text, section headings, card reveals on scroll

```css
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

.fade-up {
  animation: fadeUp 400ms cubic-bezier(0.16, 1, 0.3, 1) both;
}
```

### Fade In (flat entrance)
Used for: badges, labels, secondary content

```css
@keyframes fadeIn {
  from { opacity: 0; }
  to   { opacity: 1; }
}

.fade-in {
  animation: fadeIn 250ms cubic-bezier(0.16, 1, 0.3, 1) both;
}
```

### Fade Down (exit motion)
Used for: tooltips closing, dropdown dismiss

```css
@keyframes fadeDown {
  from {
    opacity: 1;
    transform: translateY(0);
  }
  to {
    opacity: 0;
    transform: translateY(8px);
  }
}
```

---

## Hero Section Motion

The hero headline uses a **character-by-character or word-by-word stagger** —
each word slides up individually with a tight delay between them.

```css
/* Hero headline — staggered word reveal */
.hero-word {
  display: inline-block;
  animation: fadeUp 600ms cubic-bezier(0.16, 1, 0.3, 1) both;
}

.hero-word:nth-child(1)  { animation-delay: 0ms; }
.hero-word:nth-child(2)  { animation-delay: 60ms; }
.hero-word:nth-child(3)  { animation-delay: 120ms; }
.hero-word:nth-child(4)  { animation-delay: 180ms; }
.hero-word:nth-child(5)  { animation-delay: 240ms; }
.hero-word:nth-child(6)  { animation-delay: 300ms; }
.hero-word:nth-child(7)  { animation-delay: 360ms; }

/* Subheading enters after headline completes */
.hero-sub {
  animation: fadeUp 400ms cubic-bezier(0.16, 1, 0.3, 1) 500ms both;
}

/* CTA / install command enters last */
.hero-cta {
  animation: fadeUp 400ms cubic-bezier(0.16, 1, 0.3, 1) 650ms both;
}
```

---

## Terminal / CLI Animation

Branch's most distinctive motion: **simulated terminal output**. Lines appear
one by one as if being typed or printed by a real CLI.

```css
@keyframes terminalLine {
  from {
    opacity: 0;
    transform: translateX(-6px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.terminal-line {
  animation: terminalLine 150ms cubic-bezier(0.25, 0, 0, 1) both;
}

/* Stagger each line by 120–180ms */
.terminal-line:nth-child(1) { animation-delay: 200ms; }
.terminal-line:nth-child(2) { animation-delay: 380ms; }
.terminal-line:nth-child(3) { animation-delay: 560ms; }
.terminal-line:nth-child(4) { animation-delay: 740ms; }
.terminal-line:nth-child(5) { animation-delay: 920ms; }

/* Blinking cursor */
@keyframes cursorBlink {
  0%, 100% { opacity: 1; }
  50%       { opacity: 0; }
}

.cursor {
  display: inline-block;
  width: 2px;
  height: 1em;
  background: currentColor;
  animation: cursorBlink 1000ms linear infinite;
}
```

---

## Checkmark / Status Line Animation
Used in the "Ship" section — pre-flight checks appearing with ✓ marks

```css
@keyframes checkReveal {
  from {
    opacity: 0;
    transform: translateX(-4px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.check-line {
  animation: checkReveal 200ms cubic-bezier(0.16, 1, 0.3, 1) both;
}

/* Each check appears 200ms after the previous */
.check-line:nth-child(1) { animation-delay: 300ms; }
.check-line:nth-child(2) { animation-delay: 500ms; }
.check-line:nth-child(3) { animation-delay: 700ms; }
.check-line:nth-child(4) { animation-delay: 900ms; }

/* The ✓ icon pops in slightly after its line */
.check-icon {
  display: inline-block;
  animation: fadeIn 150ms cubic-bezier(0.16, 1, 0.3, 1) both;
  animation-delay: inherit;
}
```

---

## Hover States

### Interactive element (buttons, links, nav items)

```css
.interactive {
  transition:
    opacity 150ms cubic-bezier(0.16, 1, 0.3, 1),
    color 150ms cubic-bezier(0.16, 1, 0.3, 1);
}

.interactive:hover {
  opacity: 0.7;
}
```

### Card / panel hover

```css
.card {
  transition:
    border-color 200ms cubic-bezier(0.16, 1, 0.3, 1),
    background 200ms cubic-bezier(0.16, 1, 0.3, 1);
  border: 1px solid #292524;
}

.card:hover {
  border-color: #44403c;
  background: #1c1917;
}
```

### Copy button (the npm command copy interaction)

```css
.copy-btn {
  transition:
    opacity 150ms cubic-bezier(0.16, 1, 0.3, 1),
    transform 150ms cubic-bezier(0.16, 1, 0.3, 1);
}

.copy-btn:hover {
  opacity: 0.8;
}

.copy-btn:active {
  transform: scale(0.94);
  transition-duration: 80ms;
}
```

---

## Scroll-Triggered Reveals

Sections and content blocks enter as they scroll into view.
Use IntersectionObserver with a `0.15` threshold.

```css
/* Default hidden state */
.reveal {
  opacity: 0;
  transform: translateY(16px);
  transition:
    opacity 500ms cubic-bezier(0.16, 1, 0.3, 1),
    transform 500ms cubic-bezier(0.16, 1, 0.3, 1);
}

/* JS adds this class when element enters viewport */
.reveal.is-visible {
  opacity: 1;
  transform: translateY(0);
}

/* Staggered children within a revealed section */
.reveal-stagger > * {
  opacity: 0;
  transform: translateY(12px);
  transition:
    opacity 400ms cubic-bezier(0.16, 1, 0.3, 1),
    transform 400ms cubic-bezier(0.16, 1, 0.3, 1);
}

.reveal-stagger.is-visible > *:nth-child(1) { transition-delay: 0ms;   opacity: 1; transform: none; }
.reveal-stagger.is-visible > *:nth-child(2) { transition-delay: 80ms;  opacity: 1; transform: none; }
.reveal-stagger.is-visible > *:nth-child(3) { transition-delay: 160ms; opacity: 1; transform: none; }
.reveal-stagger.is-visible > *:nth-child(4) { transition-delay: 240ms; opacity: 1; transform: none; }
.reveal-stagger.is-visible > *:nth-child(5) { transition-delay: 320ms; opacity: 1; transform: none; }
```

---

## Repository Node / Graph Animation

The connected repo diagram (atlas, phoenix, pegasus, etc.) assembles on scroll.
Each node fades in with a slight scale from below 1.

```css
@keyframes nodeAppear {
  from {
    opacity: 0;
    transform: scale(0.92);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.repo-node {
  animation: nodeAppear 350ms cubic-bezier(0.16, 1, 0.3, 1) both;
}

/* Stagger nodes by 100ms each */
.repo-node:nth-child(1)  { animation-delay: 100ms; }
.repo-node:nth-child(2)  { animation-delay: 200ms; }
.repo-node:nth-child(3)  { animation-delay: 300ms; }
.repo-node:nth-child(4)  { animation-delay: 400ms; }
.repo-node:nth-child(5)  { animation-delay: 500ms; }
.repo-node:nth-child(6)  { animation-delay: 600ms; }

/* Connecting lines draw in after nodes */
@keyframes lineGrow {
  from { stroke-dashoffset: 100%; }
  to   { stroke-dashoffset: 0%; }
}

.connector-line {
  stroke-dasharray: 100%;
  animation: lineGrow 400ms cubic-bezier(0.16, 1, 0.3, 1) 700ms both;
}
```

---

## Tab / Step Switcher (Idea → Plan → Ship)

The content panels switch with a quick fade + subtle translate.

```css
/* Outgoing panel */
.tab-panel[data-state="exit"] {
  animation: fadeDown 150ms cubic-bezier(0.4, 0, 1, 1) both;
}

/* Incoming panel */
.tab-panel[data-state="enter"] {
  animation: fadeUp 250ms cubic-bezier(0.16, 1, 0.3, 1) both;
}

/* Active tab indicator slides */
.tab-indicator {
  transition: transform 200ms cubic-bezier(0.4, 0, 0.2, 1);
}
```

---

## Beta Badge / Label Entrance

Small labels pop in with a subtle scale from 0.9.

```css
@keyframes badgePop {
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.badge {
  animation: badgePop 300ms cubic-bezier(0.16, 1, 0.3, 1) 200ms both;
}
```

---

## Image / Screenshot Entrance

The CLI screenshots and dashboard images fade in with a slight upward float
and very gentle scale.

```css
@keyframes imageReveal {
  from {
    opacity: 0;
    transform: translateY(20px) scale(0.98);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

.screenshot {
  animation: imageReveal 600ms cubic-bezier(0.16, 1, 0.3, 1) both;
}
```

---

## Navigation

Minimal transitions. Nav links use pure opacity change, no movement.

```css
.nav-link {
  transition: opacity 150ms linear;
  opacity: 0.6;
}

.nav-link:hover,
.nav-link.active {
  opacity: 1;
}
```

---

## Reduced Motion

Always include this. Branch's audience is developers — many run with reduced
motion enabled.

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## Framer Motion Equivalent (if using React)

```js
// Primary spring — tight, no bounce
const springConfig = {
  type: "spring",
  stiffness: 400,
  damping: 30,
  mass: 0.8,
}

// Fade up variant
const fadeUpVariant = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] }
  }
}

// Stagger container
const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1
    }
  }
}

// Terminal line variant
const terminalLineVariant = {
  hidden: { opacity: 0, x: -6 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.15, ease: [0.25, 0, 0, 1] }
  }
}

// Node appear (graph/diagram)
const nodeVariant = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] }
  }
}
```

---

## Summary Cheat Sheet

| Element              | Duration  | Easing                        | Transform              |
|----------------------|-----------|-------------------------------|------------------------|
| Nav hover            | 150ms     | linear                        | opacity only           |
| Button hover         | 150ms     | cubic-bezier(0.16, 1, 0.3, 1) | opacity                |
| Button active        | 80ms      | cubic-bezier(0.16, 1, 0.3, 1) | scale(0.94)            |
| Badge entrance       | 300ms     | cubic-bezier(0.16, 1, 0.3, 1) | scale(0.9→1)           |
| Hero word stagger    | 600ms     | cubic-bezier(0.16, 1, 0.3, 1) | translateY(12px→0)     |
| Section reveal       | 500ms     | cubic-bezier(0.16, 1, 0.3, 1) | translateY(16px→0)     |
| Terminal line        | 150ms     | cubic-bezier(0.25, 0, 0, 1)   | translateX(-6px→0)     |
| Check line           | 200ms     | cubic-bezier(0.16, 1, 0.3, 1) | translateX(-4px→0)     |
| Repo node            | 350ms     | cubic-bezier(0.16, 1, 0.3, 1) | scale(0.92→1)          |
| Tab panel exit       | 150ms     | cubic-bezier(0.4, 0, 1, 1)    | translateY(0→8px)      |
| Tab panel enter      | 250ms     | cubic-bezier(0.16, 1, 0.3, 1) | translateY(12px→0)     |
| Screenshot           | 600ms     | cubic-bezier(0.16, 1, 0.3, 1) | translateY(20px)+scale |
| Stagger delay step   | +80ms     | —                             | per child              |
| Terminal stagger     | +160ms    | —                             | per line               |