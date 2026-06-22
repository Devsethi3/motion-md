# MOTION.md - clerk.com Motion System
> Reverse-engineered from clerk.com (2026)
> Drop into Cursor, Claude Code, v0, Lovable, or Codex for on-brand animations.

---

## Design Philosophy

Clerk's motion is **precise, polished, and quietly confident**. It feels like
a premium developer tool that also passes the design team's eye test. Every
interaction is smooth but never showy. The motion language is built around
trust — security products can't feel janky or chaotic.

Core principles:
- **Subtle over dramatic** — nothing screams, everything whispers
- **Opacity is the primary tool** — most transitions are fade-based, not slide-based
- **Circuit board as metaphor** — the hero background has electrical/flow energy
- **White-on-dark with purple glows** — accent color (#6C47FF) drives all active states
- **Component-level polish** — UI components (SignIn, SignUp) have their own micro-motion layer
- **Horizontal marquees for social proof** — partner logos and testimonials scroll smoothly
- **Stagger feels effortless, not mechanical** — delays are tight (50–70ms), not theatrical

---

## Color & Background Context

```
Background:         #0A0A0F   (near-black, very slight blue)
Surface:            #111118   (cards, panels)
Surface elevated:   #18181F   (dropdowns, modals)
Border subtle:      #1F1F2E   (dividers)
Border strong:      #2D2D42   (active borders, focus rings)
Text primary:       #FFFFFF   (pure white)
Text secondary:     #9898A6   (muted labels)
Text tertiary:      #5C5C6E   (placeholders)
Accent purple:      #6C47FF   (primary brand, CTA, focus)
Accent purple light:#8B6FFF   (hover state of accent)
Accent glow:        rgba(108, 71, 255, 0.3)  (box-shadows, halos)
Circuit teal:       #00D4AA   (circuit board decoration lines)
Success:            #22C55E
Warning:            #F59E0B
Error:              #EF4444
```

Motion always reads against near-black. Purple glows are the signature
visual accent — use them on focus states, active buttons, and key hovers.

---

## Duration Scale

```css
:root {
  --duration-instant:   50ms;    /* checkbox ticks, icon swaps */
  --duration-micro:     100ms;   /* hover color changes */
  --duration-fast:      150ms;   /* button states, nav links */
  --duration-base:      220ms;   /* standard transitions */
  --duration-medium:    350ms;   /* card reveals, panel enters */
  --duration-slow:      500ms;   /* section entrances */
  --duration-slower:    700ms;   /* hero content, large reveals */
  --duration-ambient:  3000ms;   /* circuit board glow pulse */
}
```

---

## Easing Scale

```css
:root {
  /* Primary — used on 75% of all transitions */
  --ease-out:         cubic-bezier(0.16, 1, 0.3, 1);

  /* Smooth enter — panels, drawers */
  --ease-out-smooth:  cubic-bezier(0.25, 1, 0.5, 1);

  /* Standard in-out — tab switches, toggles */
  --ease-in-out:      cubic-bezier(0.4, 0, 0.2, 1);

  /* Exit — elements leaving view */
  --ease-in:          cubic-bezier(0.4, 0, 1, 1);

  /* Gentle bounce — success states, badge pops */
  --ease-out-back:    cubic-bezier(0.34, 1.4, 0.64, 1);

  /* Linear — scrolling marquees, progress bars */
  --ease-linear:      linear;
}
```

**`--ease-out` is Clerk's default for everything.**
The curve fires immediately and decelerates into place — reliable and trustworthy,
exactly the feeling a security product needs.

---

## Core Animation Keyframes

```css
/* === ENTRANCES === */

@keyframes fadeUp {
  from {
    opacity: 0;
    transform: translateY(16px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeDown {
  from {
    opacity: 0;
    transform: translateY(-10px);
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

@keyframes fadeLeft {
  from {
    opacity: 0;
    transform: translateX(16px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
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

/* === EXITS === */

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

@keyframes marquee {
  from { transform: translateX(0); }
  to   { transform: translateX(-50%); }
}

/* Circuit board ambient glow pulse */
@keyframes circuitGlow {
  0%, 100% {
    opacity: 0.4;
    filter: brightness(1);
  }
  50% {
    opacity: 0.7;
    filter: brightness(1.3);
  }
}

/* Gentle float for decorative elements */
@keyframes float {
  0%, 100% { transform: translateY(0); }
  50%       { transform: translateY(-6px); }
}

/* Success check draw */
@keyframes checkDraw {
  from {
    stroke-dashoffset: 100;
    opacity: 0;
  }
  to {
    stroke-dashoffset: 0;
    opacity: 1;
  }
}

/* Badge pop */
@keyframes badgePop {
  from {
    opacity: 0;
    transform: scale(0.8) translateY(4px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

/* Blocked item slide in (fraud detection list) */
@keyframes blockSlide {
  from {
    opacity: 0;
    transform: translateX(-8px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}
```

---

## Hero Section

Clerk's hero has a **layered circuit board background** that breathes
with a slow ambient animation. Content layers enter in a precise sequence.

```css
/* Circuit lines — bottom layer, ambient pulse */
.hero-circuit-lines {
  animation: circuitGlow 3000ms ease-in-out infinite;
  pointer-events: none;
}

/* Circuit components — top decorative layer, offset pulse */
.hero-circuit-components {
  animation: circuitGlow 3000ms ease-in-out 1500ms infinite;
  pointer-events: none;
}

/* Announcement banner */
.hero-banner {
  animation: fadeDown 300ms var(--ease-out) 100ms both;
}

/* Main headline */
.hero-headline {
  animation: fadeUp 600ms var(--ease-out) 200ms both;
}

/* "Complete User Management" secondary line */
.hero-headline-line2 {
  animation: fadeUp 600ms var(--ease-out) 280ms both;
}

/* Subheading paragraph */
.hero-subheading {
  animation: fadeUp 500ms var(--ease-out) 380ms both;
}

/* CTA button */
.hero-cta {
  animation: fadeUp 450ms var(--ease-out) 460ms both;
}

/* "Build with agents" secondary link */
.hero-secondary-link {
  animation: fadeUp 400ms var(--ease-out) 520ms both;
}

/* "Trusted by" label */
.hero-trusted-label {
  animation: fadeIn 400ms var(--ease-out) 620ms both;
}
```

---

## Logo Marquee (Partner Companies)

Clerk uses **multiple parallel horizontal marquee rows** — each row
scrolls at a slightly different speed to create depth.

```css
/* Marquee wrapper clips overflow */
.marquee-wrapper {
  overflow: hidden;
  mask-image: linear-gradient(
    to right,
    transparent 0%,
    black 8%,
    black 92%,
    transparent 100%
  );
}

/* Each row track — duplicate list inside for seamless loop */
.marquee-track {
  display: flex;
  width: max-content;
  gap: 48px;
  animation: marquee var(--marquee-duration, 30000ms) linear infinite;
}

/* Row speed variations */
.marquee-row-1 { --marquee-duration: 28000ms; }
.marquee-row-2 { --marquee-duration: 34000ms; }
.marquee-row-3 { --marquee-duration: 26000ms; }
.marquee-row-4 { --marquee-duration: 38000ms; }

/* Pause on hover */
.marquee-wrapper:hover .marquee-track {
  animation-play-state: paused;
}

/* Individual logo */
.marquee-logo {
  transition: opacity 180ms var(--ease-out);
  opacity: 0.55;
  filter: grayscale(100%);
}

.marquee-logo:hover {
  opacity: 1;
  filter: grayscale(0%);
}
```

---

## Component Tab Switcher (SignUp / SignIn / UserButton / UserProfile)

The component showcase tabs switch with a cross-fade and content slide.

```css
/* Tab button */
.component-tab {
  transition:
    color      150ms var(--ease-out),
    opacity    150ms var(--ease-out),
    background 150ms var(--ease-out);
  opacity: 0.5;
  color: #9898A6;
}

.component-tab:hover {
  opacity: 0.8;
  color: #FFFFFF;
}

.component-tab.active {
  opacity: 1;
  color: #FFFFFF;
  background: rgba(108, 71, 255, 0.12);
}

/* Sliding underline indicator */
.component-tab-indicator {
  height: 2px;
  background: #6C47FF;
  border-radius: 2px;
  transition: transform 250ms var(--ease-in-out), width 250ms var(--ease-in-out);
}

/* Component preview panel — cross-fade on switch */
.component-panel {
  animation: fadeIn 300ms var(--ease-out) both;
}

.component-panel[data-exiting] {
  animation: fadeOutDown 150ms var(--ease-in) both;
}
```

---

## UI Component Cards (SignIn, SignUp, UserButton, UserProfile)

The floating component UI cards in the showcase have a subtle
lift and border glow on hover.

```css
.component-card {
  transition:
    transform    250ms var(--ease-out),
    box-shadow   250ms var(--ease-out),
    border-color 250ms var(--ease-out);
  border: 1px solid #1F1F2E;
  border-radius: 16px;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.4);
}

.component-card:hover {
  transform: translateY(-4px) scale(1.01);
  border-color: rgba(108, 71, 255, 0.3);
  box-shadow:
    0 8px 40px rgba(0, 0, 0, 0.5),
    0 0 0 1px rgba(108, 71, 255, 0.15),
    0 0 24px rgba(108, 71, 255, 0.1);
}
```

---

## Scroll-Triggered Section Reveals

Clerk's sections use a **clean fade-up on scroll**. No dramatic distances,
no complex choreography — just precise, understated entrances.

```css
/* Base hidden state */
.reveal {
  opacity: 0;
  transform: translateY(20px);
  transition:
    opacity   500ms var(--ease-out),
    transform 500ms var(--ease-out);
}

.reveal.visible {
  opacity: 1;
  transform: translateY(0);
}

/* Section eyebrow — first child, no delay */
.section-eyebrow {
  transition-delay: 0ms;
}

/* Section headline */
.section-headline {
  transition-delay: 60ms;
}

/* Section subtext */
.section-body {
  transition-delay: 120ms;
}

/* Feature grid items — stagger with tight 50ms steps */
.feature-item {
  opacity: 0;
  transform: translateY(14px);
  transition:
    opacity   400ms var(--ease-out),
    transform 400ms var(--ease-out);
}

.feature-item.visible:nth-child(1) { transition-delay: 0ms;   opacity: 1; transform: none; }
.feature-item.visible:nth-child(2) { transition-delay: 60ms;  opacity: 1; transform: none; }
.feature-item.visible:nth-child(3) { transition-delay: 120ms; opacity: 1; transform: none; }
.feature-item.visible:nth-child(4) { transition-delay: 180ms; opacity: 1; transform: none; }
.feature-item.visible:nth-child(5) { transition-delay: 240ms; opacity: 1; transform: none; }
.feature-item.visible:nth-child(6) { transition-delay: 300ms; opacity: 1; transform: none; }
```

---

## Bento / Feature Grid Cards

The feature bento grid (User Auth, B2B Auth, Billing sections) has
individual cards that enter with slight scale from below.

```css
.bento-card {
  opacity: 0;
  transform: translateY(12px) scale(0.98);
  transition:
    opacity   450ms var(--ease-out),
    transform 450ms var(--ease-out),
    border-color 200ms var(--ease-out),
    box-shadow   200ms var(--ease-out);
  border: 1px solid #1F1F2E;
}

.bento-card.visible {
  opacity: 1;
  transform: translateY(0) scale(1);
}

.bento-card:hover {
  border-color: #2D2D42;
  box-shadow: 0 0 0 1px rgba(108, 71, 255, 0.1), 0 8px 24px rgba(0,0,0,0.3);
}
```

---

## Navigation

```css
/* Nav container — fades in on load */
nav {
  animation: fadeDown 300ms var(--ease-out) both;
}

/* Sticky nav background on scroll */
.nav-scrolled {
  transition:
    background      250ms var(--ease-out),
    border-color    250ms var(--ease-out),
    backdrop-filter 250ms var(--ease-out);
}

.nav-scrolled.is-scrolled {
  background: rgba(10, 10, 15, 0.85);
  backdrop-filter: blur(20px) saturate(180%);
  border-bottom: 1px solid #1F1F2E;
}

/* Nav links */
.nav-link {
  transition:
    color   150ms var(--ease-out),
    opacity 150ms var(--ease-out);
  opacity: 0.7;
}

.nav-link:hover {
  opacity: 1;
  color: #FFFFFF;
}

/* Active page link */
.nav-link.active {
  opacity: 1;
  color: #FFFFFF;
}

/* Dropdown panel */
.nav-dropdown {
  animation: fadeDown 200ms var(--ease-out) both;
  transform-origin: top center;
  border: 1px solid #1F1F2E;
  border-radius: 12px;
  background: #111118;
  box-shadow: 0 16px 48px rgba(0, 0, 0, 0.6);
}

.nav-dropdown[data-state="closed"] {
  animation: fadeOutUp 120ms var(--ease-in) both;
}

/* Dropdown link items */
.nav-dropdown-item {
  transition:
    background 120ms var(--ease-out),
    color      120ms var(--ease-out);
}

.nav-dropdown-item:hover {
  background: rgba(108, 71, 255, 0.08);
  color: #FFFFFF;
}
```

---

## Button Interactions

Clerk buttons have a purple glow system — the glow intensifies on hover
and collapses on press.

```css
/* Primary CTA */
.btn-primary {
  transition:
    background  180ms var(--ease-out),
    box-shadow  180ms var(--ease-out),
    transform   100ms var(--ease-out),
    opacity     180ms var(--ease-out);
  background: #6C47FF;
  color: #FFFFFF;
  border-radius: 8px;
}

.btn-primary:hover {
  background: #8B6FFF;
  box-shadow:
    0 0 0 1px rgba(108, 71, 255, 0.5),
    0 0 20px rgba(108, 71, 255, 0.3),
    0 4px 12px rgba(108, 71, 255, 0.2);
  transform: translateY(-1px);
}

.btn-primary:active {
  transform: scale(0.97) translateY(0);
  box-shadow: none;
  transition-duration: 50ms;
}

/* Secondary / ghost */
.btn-secondary {
  transition:
    border-color 180ms var(--ease-out),
    background   180ms var(--ease-out),
    color        180ms var(--ease-out),
    transform    100ms var(--ease-out);
  border: 1px solid #2D2D42;
  color: #9898A6;
  border-radius: 8px;
}

.btn-secondary:hover {
  border-color: #6C47FF;
  background: rgba(108, 71, 255, 0.08);
  color: #FFFFFF;
  transform: translateY(-1px);
}

.btn-secondary:active {
  transform: scale(0.97);
  transition-duration: 50ms;
}

/* "Sign in" nav button */
.btn-nav {
  transition:
    color      150ms var(--ease-out),
    opacity    150ms var(--ease-out);
  opacity: 0.7;
}

.btn-nav:hover {
  opacity: 1;
}
```

---

## Form Inputs (SignIn / SignUp Components)

Clerk's auth components have very specific input focus animations —
the border lights up with the brand purple.

```css
.input-field {
  transition:
    border-color 150ms var(--ease-out),
    box-shadow   150ms var(--ease-out),
    background   150ms var(--ease-out);
  border: 1px solid #2D2D42;
  background: #111118;
  border-radius: 8px;
  color: #FFFFFF;
}

.input-field:hover {
  border-color: #3D3D55;
}

.input-field:focus {
  outline: none;
  border-color: #6C47FF;
  box-shadow:
    0 0 0 3px rgba(108, 71, 255, 0.15),
    0 0 0 1px rgba(108, 71, 255, 0.4);
}

/* Error state */
.input-field.error {
  border-color: #EF4444;
  box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.15);
  animation: shake 300ms var(--ease-out);
}

@keyframes shake {
  0%, 100% { transform: translateX(0); }
  20%       { transform: translateX(-4px); }
  60%       { transform: translateX(4px); }
  80%       { transform: translateX(-2px); }
}

/* Label float on focus */
.input-label {
  transition:
    transform  150ms var(--ease-out),
    font-size  150ms var(--ease-out),
    color      150ms var(--ease-out);
}

.input-field:focus ~ .input-label,
.input-field:not(:placeholder-shown) ~ .input-label {
  transform: translateY(-20px);
  font-size: 11px;
  color: #6C47FF;
}
```

---

## Social Sign-On Buttons (Google, GitHub, etc.)

```css
.social-btn {
  transition:
    background   150ms var(--ease-out),
    border-color 150ms var(--ease-out),
    transform    100ms var(--ease-out),
    box-shadow   150ms var(--ease-out);
  border: 1px solid #2D2D42;
  background: #111118;
  border-radius: 8px;
}

.social-btn:hover {
  background: #18181F;
  border-color: #3D3D55;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
  transform: translateY(-1px);
}

.social-btn:active {
  transform: scale(0.98);
  transition-duration: 50ms;
}

/* "Last used" badge on the most recent provider */
.social-btn-badge {
  animation: badgePop 300ms var(--ease-out-back) 200ms both;
}
```

---

## Fraud Detection / Security List Animation

The blocked email list in the "Fraud and Abuse Prevention" section
has entries appearing one by one with timestamps.

```css
.fraud-list-item {
  animation: blockSlide 200ms var(--ease-out) both;
  border-left: 2px solid #EF4444;
  padding-left: 12px;
}

.fraud-list-item:nth-child(1) { animation-delay: 300ms; }
.fraud-list-item:nth-child(2) { animation-delay: 600ms; }
.fraud-list-item:nth-child(3) { animation-delay: 900ms; }
.fraud-list-item:nth-child(4) { animation-delay: 1200ms; }

/* "Blocked" status badge */
.fraud-badge {
  animation: badgePop 200ms var(--ease-out-back) both;
  animation-delay: inherit;
  background: rgba(239, 68, 68, 0.15);
  color: #EF4444;
  border: 1px solid rgba(239, 68, 68, 0.3);
}
```

---

## Session Device Card

The "Device / Browser / Location" session card in the security section.

```css
.session-card {
  animation: scaleIn 400ms var(--ease-out) both;
  border: 1px solid #1F1F2E;
  border-radius: 12px;
  background: #111118;
}

/* "Sign out of device" button inside */
.session-signout-btn {
  transition:
    color        150ms var(--ease-out),
    border-color 150ms var(--ease-out),
    background   150ms var(--ease-out);
  border: 1px solid #2D2D42;
  color: #9898A6;
}

.session-signout-btn:hover {
  color: #EF4444;
  border-color: rgba(239, 68, 68, 0.4);
  background: rgba(239, 68, 68, 0.08);
}
```

---

## UserButton Popover

The floating UserButton dropdown that appears when clicking the avatar.

```css
.userbutton-trigger {
  transition:
    box-shadow  150ms var(--ease-out),
    transform   150ms var(--ease-out);
  border-radius: 50%;
}

.userbutton-trigger:hover {
  box-shadow: 0 0 0 3px rgba(108, 71, 255, 0.25);
  transform: scale(1.05);
}

.userbutton-trigger:active {
  transform: scale(0.97);
}

/* Popover panel */
.userbutton-popover {
  animation: scaleIn 200ms var(--ease-out) both;
  transform-origin: top right;
  border: 1px solid #1F1F2E;
  border-radius: 16px;
  background: #111118;
  box-shadow:
    0 16px 48px rgba(0, 0, 0, 0.6),
    0 0 0 1px rgba(255, 255, 255, 0.04);
}

.userbutton-popover[data-state="closed"] {
  animation: fadeOutUp 150ms var(--ease-in) both;
  transform-origin: top right;
}

/* Account rows within popover */
.userbutton-account-row {
  transition:
    background 120ms var(--ease-out),
    color      120ms var(--ease-out);
  border-radius: 8px;
}

.userbutton-account-row:hover {
  background: rgba(108, 71, 255, 0.08);
}
```

---

## Testimonial Cards

Social proof tweets scroll in a horizontal marquee similar to logos,
but slower. Cards have a hover lift.

```css
.testimonial-marquee {
  animation: marquee 45000ms linear infinite;
}

.testimonial-card {
  transition:
    border-color 200ms var(--ease-out),
    background   200ms var(--ease-out),
    transform    200ms var(--ease-out),
    box-shadow   200ms var(--ease-out);
  border: 1px solid #1F1F2E;
  border-radius: 12px;
  background: #111118;
}

.testimonial-card:hover {
  border-color: #2D2D42;
  background: #18181F;
  transform: translateY(-3px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.4);
}
```

---

## Billing / Checkout Flow

The billing section shows a pricing table and checkout panel.
Step transitions use a slide-and-fade.

```css
/* Pricing card */
.pricing-card {
  transition:
    border-color 200ms var(--ease-out),
    box-shadow   200ms var(--ease-out),
    transform    200ms var(--ease-out);
  border: 1px solid #1F1F2E;
  border-radius: 16px;
}

.pricing-card:hover {
  border-color: rgba(108, 71, 255, 0.4);
  box-shadow: 0 0 0 1px rgba(108, 71, 255, 0.15), 0 8px 32px rgba(108, 71, 255, 0.1);
  transform: translateY(-2px);
}

/* Active/highlighted plan */
.pricing-card.featured {
  border-color: #6C47FF;
  box-shadow:
    0 0 0 1px rgba(108, 71, 255, 0.5),
    0 0 32px rgba(108, 71, 255, 0.15);
}

/* Checkout step transition */
.checkout-step {
  animation: fadeLeft 300ms var(--ease-out) both;
}

.checkout-step[data-exiting] {
  animation: fadeOutUp 150ms var(--ease-in) both;
}

/* Success state */
.checkout-success {
  animation: scaleIn 400ms var(--ease-out-back) both;
}

/* Payment success checkmark */
.success-check {
  stroke-dasharray: 100;
  animation: checkDraw 500ms var(--ease-out) 200ms both;
}
```

---

## Framework / Integration Pills

The framework logos (Next.js, React, Expo, etc.) appear as
interactive pills that scale on hover.

```css
.framework-pill {
  transition:
    background   150ms var(--ease-out),
    border-color 150ms var(--ease-out),
    transform    150ms var(--ease-out),
    box-shadow   150ms var(--ease-out);
  border: 1px solid #1F1F2E;
  border-radius: 100px;
  background: #111118;
}

.framework-pill:hover {
  background: #18181F;
  border-color: #2D2D42;
  transform: scale(1.04);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}

/* Stagger entrance on scroll */
.framework-pill {
  opacity: 0;
  transform: translateY(10px) scale(0.96);
  transition:
    opacity      350ms var(--ease-out),
    transform    350ms var(--ease-out),
    background   150ms var(--ease-out),
    border-color 150ms var(--ease-out),
    box-shadow   150ms var(--ease-out);
}

.framework-pill.visible {
  opacity: 1;
  transform: translateY(0) scale(1);
}

.framework-pill.visible:nth-child(1) { transition-delay: 0ms; }
.framework-pill.visible:nth-child(2) { transition-delay: 50ms; }
.framework-pill.visible:nth-child(3) { transition-delay: 100ms; }
.framework-pill.visible:nth-child(4) { transition-delay: 150ms; }
.framework-pill.visible:nth-child(5) { transition-delay: 200ms; }
.framework-pill.visible:nth-child(6) { transition-delay: 250ms; }
```

---

## Role/Permission Tag Animation (B2B Section)

The floating role badges (Admin, Editor, QA Tester, etc.) that
orbit the person avatars.

```css
.role-badge {
  animation: float 3500ms ease-in-out infinite;
  border: 1px solid #2D2D42;
  border-radius: 100px;
  background: #18181F;
  backdrop-filter: blur(8px);
}

/* Each badge floats at a different phase */
.role-badge:nth-child(1) { animation-delay: 0ms; }
.role-badge:nth-child(2) { animation-delay: 700ms; }
.role-badge:nth-child(3) { animation-delay: 1400ms; }
.role-badge:nth-child(4) { animation-delay: 2100ms; }
.role-badge:nth-child(5) { animation-delay: 2800ms; }
```

---

## Avatar Stack

Overlapping user avatars in the B2B / auto-join section.

```css
.avatar-stack {
  display: flex;
}

.avatar-stack .avatar {
  transition: transform 200ms var(--ease-out);
  border: 2px solid #0A0A0F;
  border-radius: 50%;
  margin-left: -10px;
}

.avatar-stack:hover .avatar {
  margin-left: -4px; /* expand on hover */
}

.avatar-stack .avatar:nth-child(1) { z-index: 4; }
.avatar-stack .avatar:nth-child(2) { z-index: 3; }
.avatar-stack .avatar:nth-child(3) { z-index: 2; }
```

---

## "Secured by Clerk" Badge

The small "Secured by" footer in auth components pulses softly.

```css
.secured-by-badge {
  animation: fadeIn 400ms var(--ease-out) 800ms both;
  opacity: 0.5;
  transition: opacity 150ms var(--ease-out);
}

.secured-by-badge:hover {
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
// Clerk-style scroll trigger
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible')
        observer.unobserve(entry.target) // fire once only
      }
    })
  },
  {
    threshold: 0.1,
    rootMargin: '0px 0px -32px 0px'
  }
)

document
  .querySelectorAll('.reveal, .bento-card, .feature-item, .framework-pill')
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

  .marquee-track,
  .testimonial-marquee {
    animation: none;
  }

  .hero-circuit-lines,
  .hero-circuit-components {
    animation: none;
    opacity: 0.4;
  }

  .role-badge {
    animation: none;
  }
}
```

---

## Framer Motion Equivalents (React)

```js
// Clerk's primary easing
const easeOut     = [0.16, 1, 0.3, 1]
const easeOutBack = [0.34, 1.4, 0.64, 1]
const easeInOut   = [0.4, 0, 0.2, 1]
const easeIn      = [0.4, 0, 1, 1]

// === CORE VARIANTS ===

export const fadeUp = {
  hidden:  { opacity: 0, y: 16 },
  visible: {
    opacity: 1, y: 0,
    transition: { duration: 0.5, ease: easeOut }
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
    transition: { duration: 0.35, ease: easeOut }
  }
}

export const badgePop = {
  hidden:  { opacity: 0, scale: 0.8, y: 4 },
  visible: {
    opacity: 1, scale: 1, y: 0,
    transition: { duration: 0.3, ease: easeOutBack }
  }
}

// === STAGGER CONTAINERS ===

export const staggerFast = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.06, delayChildren: 0.05 }
  }
}

export const staggerHero = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.2 }
  }
}

// === NAV DROPDOWN ===

export const dropdownVariant = {
  hidden:  { opacity: 0, y: -8, scale: 0.97 },
  visible: {
    opacity: 1, y: 0, scale: 1,
    transition: { duration: 0.2, ease: easeOut }
  },
  exit: {
    opacity: 0, y: -6, scale: 0.97,
    transition: { duration: 0.12, ease: easeIn }
  }
}

// === USERBUTTON POPOVER ===

export const popoverVariant = {
  hidden:  { opacity: 0, scale: 0.95, y: -4 },
  visible: {
    opacity: 1, scale: 1, y: 0,
    transition: { duration: 0.2, ease: easeOut }
  },
  exit: {
    opacity: 0, scale: 0.97, y: -4,
    transition: { duration: 0.15, ease: easeIn }
  }
}

// === COMPONENT TAB PANEL ===

export const tabEnter = {
  hidden:  { opacity: 0, y: 8 },
  visible: {
    opacity: 1, y: 0,
    transition: { duration: 0.3, ease: easeOut }
  },
  exit: {
    opacity: 0, y: -6,
    transition: { duration: 0.15, ease: easeIn }
  }
}

// === CIRCUIT GLOW (ambient) ===

export const circuitAmbient = {
  animate: {
    opacity: [0.4, 0.7, 0.4],
    filter: ['brightness(1)', 'brightness(1.3)', 'brightness(1)'],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: 'easeInOut'
    }
  }
}

// === FLOAT (role badges) ===

export const floatBadge = (delay = 0) => ({
  animate: {
    y: [0, -6, 0],
    transition: {
      duration: 3.5,
      repeat: Infinity,
      ease: 'easeInOut',
      delay
    }
  }
})

// === BUTTON ===

export const buttonMotion = {
  rest:  { y: 0, boxShadow: '0 0 0px rgba(108,71,255,0)' },
  hover: {
    y: -1,
    boxShadow: '0 0 20px rgba(108,71,255,0.3)',
    transition: { duration: 0.18, ease: easeOut }
  },
  tap: {
    scale: 0.97, y: 0,
    transition: { duration: 0.05 }
  }
}

// === PRICING CARD ===

export const pricingCard = {
  rest:  { y: 0, scale: 1 },
  hover: {
    y: -2, scale: 1.005,
    transition: { duration: 0.2, ease: easeOut }
  }
}
```

---

## Summary Cheat Sheet

| Element                      | Duration  | Easing                         | Transform / Effect                  |
|------------------------------|-----------|--------------------------------|-------------------------------------|
| Hero circuit ambient         | 3000ms ∞  | ease-in-out                    | opacity + brightness pulse          |
| Hero banner                  | 300ms     | cubic-bezier(0.16, 1, 0.3, 1) | translateY(-10px→0)                 |
| Hero headline                | 600ms     | cubic-bezier(0.16, 1, 0.3, 1) | translateY(16px→0)                  |
| Hero CTA                     | 450ms     | cubic-bezier(0.16, 1, 0.3, 1) | translateY(16px→0)                  |
| Nav link hover               | 150ms     | cubic-bezier(0.16, 1, 0.3, 1) | opacity 0.7→1                       |
| Nav dropdown open            | 200ms     | cubic-bezier(0.16, 1, 0.3, 1) | fadeDown + scale                    |
| Section reveal               | 500ms     | cubic-bezier(0.16, 1, 0.3, 1) | translateY(20px→0)                  |
| Feature item stagger         | 400ms     | cubic-bezier(0.16, 1, 0.3, 1) | translateY(14px→0) +60ms per child  |
| Bento card reveal            | 450ms     | cubic-bezier(0.16, 1, 0.3, 1) | translateY(12px)+scale(0.98→1)      |
| Bento card hover             | 200ms     | cubic-bezier(0.16, 1, 0.3, 1) | border + purple shadow              |
| Component card hover         | 250ms     | cubic-bezier(0.16, 1, 0.3, 1) | translateY(-4px)+scale(1.01)+glow   |
| Tab switch enter             | 300ms     | cubic-bezier(0.16, 1, 0.3, 1) | fadeIn                              |
| Tab indicator slide          | 250ms     | cubic-bezier(0.4, 0, 0.2, 1)  | transform                           |
| Button primary hover         | 180ms     | cubic-bezier(0.16, 1, 0.3, 1) | translateY(-1px) + purple glow      |
| Button press                 | 50ms      | cubic-bezier(0.16, 1, 0.3, 1) | scale(0.97)                         |
| Social SSO button hover      | 150ms     | cubic-bezier(0.16, 1, 0.3, 1) | translateY(-1px) + border           |
| Input focus                  | 150ms     | cubic-bezier(0.16, 1, 0.3, 1) | border + purple ring shadow         |
| Input error shake            | 300ms     | cubic-bezier(0.16, 1, 0.3, 1) | translateX oscillate                |
| UserButton avatar hover      | 150ms     | cubic-bezier(0.16, 1, 0.3, 1) | scale(1.05) + purple ring           |
| UserButton popover           | 200ms     | cubic-bezier(0.16, 1, 0.3, 1) | scaleIn from top-right              |
| Fraud item appear            | 200ms     | cubic-bezier(0.16, 1, 0.3, 1) | translateX(-8px→0) +300ms per item  |
| Role badge float             | 3500ms ∞  | ease-in-out                    | translateY(0↔-6px) staggered        |
| "Last used" badge            | 300ms     | cubic-bezier(0.34, 1.4, 0.64) | scale(0.8→1) + bounce               |
| Framework pill stagger       | 350ms     | cubic-bezier(0.16, 1, 0.3, 1) | translateY(10px)+scale(0.96→1)      |
| Pricing card hover           | 200ms     | cubic-bezier(0.16, 1, 0.3, 1) | translateY(-2px) + purple border    |
| Checkout success             | 400ms     | cubic-bezier(0.34, 1.4, 0.64) | scaleIn + bounce                    |
| Logo marquee                 | 28–38s ∞  | linear                         | translateX loop (multi-row speeds)  |
| Testimonial marquee          | 45000ms ∞ | linear                         | translateX loop                     |
| Stagger delay step           | +60ms     | —                              | per child                           |
| Sticky nav on scroll         | 250ms     | cubic-bezier(0.16, 1, 0.3, 1) | background + blur                   |