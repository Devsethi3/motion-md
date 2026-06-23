import React from "react"
import { Header } from "@/components/landing/header"
import { BorderCross } from "@/components/ui/border-cross"
import { FullWidthDivider } from "@/components/ui/full-width-divider"
import { MarkdownContent } from "@/components/markdown/markdown-content"

const MOTION_MD_FORMAT_GUIDE = `
## What is motion.md?

**motion.md** is a standardized format for documenting motion systems and animation patterns. It's designed to be dropped directly into AI coding tools like Cursor, Claude Code, v0, Lovable, or Codex to generate on-brand animations that match your product's visual identity.

Think of it as a **design system for motion** — just as you have color palettes, typography scales, and spacing systems, motion.md provides the complete motion language for your product.

---

## Why motion.md Matters

When you ask AI to "make it animate nicely," you get generic, forgettable animations. When you provide a motion.md file, you get:

- **Brand-consistent motion** that matches your product's personality
- **Precise timing and easing** — no more "feels off" animations
- **Reusable patterns** that scale across your entire application
- **Developer-friendly specs** that anyone on your team can use
- **AI-ready documentation** that tools can understand and implement

---

## The Complete motion.md Structure

A well-structured motion.md file follows this anatomy, inspired by the DESIGN.md specification:

\`\`\`markdown
# MOTION.md - [brand-name] Motion System
> Reverse-engineered from [domain] (year)
> Drop into Cursor, Claude Code, v0, Lovable, or Codex for on-brand animations.

---

## Design Philosophy

[Brief description of the brand's motion personality]

Core principles:
- **Principle 1** — explanation
- **Principle 2** — explanation
- **Principle 3** — explanation

---

## Color & Background Context

\`\`\`text
Background:         #HEX   (description)
Surface:            #HEX   (description)
Border:             #HEX   (description)
Text primary:       #HEX   (description)
Text secondary:     #HEX   (description)
Accent color:       #HEX   (description)
\`\`\`

---

## Duration Scale

\`\`\`css
:root {
  --duration-instant:   50ms;    /* use case */
  --duration-fast:      150ms;   /* use case */
  --duration-base:      220ms;   /* use case */
  --duration-medium:    350ms;   /* use case */
  --duration-slow:      500ms;   /* use case */
}
\`\`\`

---

## Easing Scale

\`\`\`css
:root {
  --ease-out:         cubic-bezier(0.16, 1, 0.3, 1);
  --ease-in-out:      cubic-bezier(0.4, 0, 0.2, 1);
  --ease-in:          cubic-bezier(0.4, 0, 1, 1);
  --ease-out-back:    cubic-bezier(0.34, 1.4, 0.64, 1);
}
\`\`\`

---

## Core Keyframes

\`\`\`css
@keyframes fadeUp {
  from { opacity: 0; transform: translateY(16px); }
  to   { opacity: 1; transform: translateY(0); }
}

@keyframes fadeIn {
  from { opacity: 0; }
  to   { opacity: 1; }
}
\`\`\`

---

## [Component/Section] Motion

[Detailed motion specifications for specific UI components]

---

## Framer Motion Equivalents

\`\`\`js
export const fadeUp = {
  hidden:  { opacity: 0, y: 16 },
  visible: {
    opacity: 1, y: 0,
    transition: { duration: 0.5, ease: easeOut }
  }
}
\`\`\`

---

## Summary Cheat Sheet

| Element | Duration | Easing | Transform |
|---------|----------|--------|-----------|
| Button hover | 150ms | ease-out | translateY(-2px) |
| Card reveal | 400ms | ease-out | translateY(12px→0) |
\`\`\`
\`\``

export default function MotionMdFormatPage() {
  return (
    <div className="mx-auto min-h-screen max-w-7xl overflow-hidden border-x px-4 lg:overflow-visible">
      <Header />
      <div className="relative">
        <FullWidthDivider position="bottom" className="w-full" />
        <BorderCross className="bottom-0 -left-4 -translate-x-1/2 translate-y-1/2" />
        <BorderCross className="-right-4 bottom-0 translate-x-1/2 translate-y-1/2" />
      </div>

      <div className="py-0 leading-tight">
        <MarkdownContent
          content={MOTION_MD_FORMAT_GUIDE}
          title="motion.md Format Guide"
        />
      </div>
    </div>
  )
}
